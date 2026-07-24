import { NextRequest, NextResponse } from "next/server";
import proj4 from "proj4";

const ULDK_ENDPOINT = "https://uldk.gugik.gov.pl/";
const BUILDINGS_WFS = "https://mapy.geoportal.gov.pl/wss/service/PZGIK/EGIB/WFS/UslugaZbiorcza";
const ASSUMED_FAR = 2.5;
const ASSUMED_FLOORS = 2;

proj4.defs("EPSG:2180", "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs");

type Point = [number, number];

function parseRing(coordinates: string): Point[] {
  return coordinates.split(",").map((pair) => {
    const [x, y] = pair.trim().split(/\s+/).map(Number);
    return [x, y] as Point;
  }).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
}

function parseWktRing(wkt: string) {
  const match = /\(\(([^()]+)\)/.exec(wkt);
  return match ? parseRing(match[1]) : [];
}

function parsePosList(value: string): Point[] {
  const values = value.trim().split(/\s+/).map(Number);
  const points: Point[] = [];
  for (let index = 0; index + 1 < values.length; index += 2) points.push([values[index], values[index + 1]]);
  return points;
}

function ringArea(points: Point[]) {
  if (points.length < 3) return 0;
  let twiceArea = 0;
  for (let index = 0; index < points.length; index++) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    twiceArea += current[0] * next[1] - next[0] * current[1];
  }
  return Math.abs(twiceArea) / 2;
}

function centroid(points: Point[]): Point {
  const total = points.reduce(([x, y], point) => [x + point[0], y + point[1]], [0, 0]);
  return [total[0] / points.length, total[1] / points.length];
}

function pointInRing([x, y]: Point, ring: Point[]) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [xi, yi] = ring[index];
    const [xj, yj] = ring[previous];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function xmlValue(xml: string, field: string) {
  return new RegExp(`<[^:>]+:${field}>([^<]*)<`, "i").exec(xml)?.[1];
}

async function getBuildingMetrics(parcel: Point[]) {
  const xs = parcel.map(([x]) => x);
  const ys = parcel.map(([, y]) => y);
  const url = new URL(BUILDINGS_WFS);
  url.searchParams.set("service", "WFS");
  url.searchParams.set("version", "1.1.0");
  url.searchParams.set("request", "GetFeature");
  url.searchParams.set("typeName", "budynki");
  url.searchParams.set("srsName", "EPSG:2180");
  url.searchParams.set("bbox", `${Math.min(...xs)},${Math.min(...ys)},${Math.max(...xs)},${Math.max(...ys)},urn:ogc:def:crs:EPSG::2180`);

  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(25_000) });
  if (!response.ok) throw new Error(`Building WFS returned HTTP ${response.status}`);
  const xml = await response.text();
  const features = xml.match(/<gml:featureMember>[\s\S]*?<\/gml:featureMember>/g) ?? [];

  let footprint = 0;
  let existingGfa = 0;
  let assumedFloorCount = 0;
  let buildingCount = 0;
  for (const feature of features) {
    const posList = /<gml:posList[^>]*>([^<]+)</.exec(feature)?.[1];
    if (!posList) continue;
    const building = parsePosList(posList);
    if (!building.length || !pointInRing(centroid(building), parcel)) continue;
    const area = ringArea(building);
    const rawFloors = xmlValue(feature, "KONDYGNACJE_NADZIEMNE");
    const parsedFloors = Number(rawFloors);
    const floors = Number.isFinite(parsedFloors) && parsedFloors > 0 ? parsedFloors : ASSUMED_FLOORS;
    if (floors === ASSUMED_FLOORS && (!Number.isFinite(parsedFloors) || parsedFloors <= 0)) assumedFloorCount++;
    footprint += area;
    existingGfa += area * floors;
    buildingCount++;
  }
  return { footprint, existingGfa, buildingCount, assumedFloorCount };
}

async function reverseGeocode(lat: number, lon: number) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("addressdetails", "1");
  const response = await fetch(url, { headers: { "User-Agent": "PlotScout/0.1" }, signal: AbortSignal.timeout(10_000) });
  if (!response.ok) return null;
  const data = await response.json();
  const address = data.address ?? {};
  return {
    address: data.display_name as string | undefined,
    district: address.city_district || address.borough || address.suburb || address.municipality || address.city,
  };
}

export async function GET(request: NextRequest) {
  const x = Number(request.nextUrl.searchParams.get("x"));
  const y = Number(request.nextUrl.searchParams.get("y"));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return NextResponse.json({ error: "Valid x and y coordinates are required." }, { status: 400 });

  const url = new URL(ULDK_ENDPOINT);
  url.searchParams.set("request", "GetParcelByXY");
  url.searchParams.set("xy", `${x},${y},2180`);
  url.searchParams.set("result", "id,geom_wkt");

  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`ULDK returned HTTP ${response.status}`);
    const lines = (await response.text()).trim().split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines[0] !== "0" || !lines[1]) return NextResponse.json({ error: "No parcel found at this location." }, { status: 404 });

    const [parcelId, geometry = ""] = lines[1].split("|", 2);
    const parcel = parseWktRing(geometry.replace(/^SRID=\d+;/, ""));
    if (parcel.length < 3) throw new Error("ULDK returned invalid parcel geometry");
    const plotArea = ringArea(parcel);
    const center = centroid(parcel);
    const [centerLon, centerLat] = proj4("EPSG:2180", "EPSG:4326", center);
    const boundary = parcel.map((point) => {
      const [lon, lat] = proj4("EPSG:2180", "EPSG:4326", point);
      return [lon, lat];
    });

    const [buildingResult, locationResult] = await Promise.allSettled([
      getBuildingMetrics(parcel),
      reverseGeocode(centerLat, centerLon),
    ]);
    const buildings = buildingResult.status === "fulfilled" ? buildingResult.value : null;
    const location = locationResult.status === "fulfilled" ? locationResult.value : null;
    const existingGfa = buildings?.existingGfa ?? null;
    const allowedGfa = plotArea * ASSUMED_FAR;

    return NextResponse.json({
      parcel_id: parcelId,
      plot_area: Math.round(plotArea * 100) / 100,
      boundary: { type: "Polygon", coordinates: [boundary] },
      address: location?.address ?? null,
      district: location?.district ?? null,
      building_count: buildings?.buildingCount ?? null,
      existing_footprint: buildings ? Math.round(buildings.footprint * 100) / 100 : null,
      existing_gfa: existingGfa === null ? null : Math.round(existingGfa * 100) / 100,
      allowed_gfa: Math.round(allowedGfa * 100) / 100,
      gap: existingGfa === null ? null : Math.round((allowedGfa - existingGfa) * 100) / 100,
      zone: `Estimated FAR ${ASSUMED_FAR}`,
      warning: buildings
        ? buildings.buildingCount === 0
          ? `No building footprint was found in the public EGiB response. Allowed GFA uses an assumed FAR of ${ASSUMED_FAR} until live planning-zone data is available.`
          : `Building footprint is approximate; ${buildings.assumedFloorCount} building(s) use an assumed ${ASSUMED_FLOORS} floors. Allowed GFA uses an assumed FAR of ${ASSUMED_FAR} until live planning-zone data is available.`
        : `Building data was unavailable. Allowed GFA uses an assumed FAR of ${ASSUMED_FAR}.`,
      data_quality: "estimate",
    });
  } catch (error) {
    console.error("Parcel analysis failed:", error);
    return NextResponse.json({ error: "The parcel services are temporarily unavailable." }, { status: 502 });
  }
}
