import { NextRequest, NextResponse } from "next/server";

const ULDK_ENDPOINT = "https://uldk.gugik.gov.pl/";

function ringArea(coordinates: string) {
  const points = coordinates.split(",").map((pair) => {
    const [x, y] = pair.trim().split(/\s+/).map(Number);
    return { x, y };
  }).filter(({ x, y }) => Number.isFinite(x) && Number.isFinite(y));

  if (points.length < 3) return 0;
  let twiceArea = 0;
  for (let index = 0; index < points.length; index++) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    twiceArea += current.x * next.y - next.x * current.y;
  }
  return Math.abs(twiceArea) / 2;
}

function calculatePolygonArea(wkt: string) {
  const rings = [...wkt.matchAll(/\(([^()]+)\)/g)].map((match) => ringArea(match[1]));
  if (!rings.length) return null;
  return Math.max(0, rings[0] - rings.slice(1).reduce((sum, area) => sum + area, 0));
}

export async function GET(request: NextRequest) {
  const x = Number(request.nextUrl.searchParams.get("x"));
  const y = Number(request.nextUrl.searchParams.get("y"));

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return NextResponse.json({ error: "Valid x and y coordinates are required." }, { status: 400 });
  }

  const url = new URL(ULDK_ENDPOINT);
  url.searchParams.set("request", "GetParcelByXY");
  url.searchParams.set("xy", `${x},${y},2180`);
  url.searchParams.set("result", "id,geom_wkt");

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      throw new Error(`ULDK returned HTTP ${response.status}`);
    }

    const lines = (await response.text())
      .trim()
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines[0] !== "0" || !lines[1]) {
      return NextResponse.json({ error: "No parcel found at this location." }, { status: 404 });
    }

    const [parcelId, geometry = ""] = lines[1].split("|", 2);
    const wkt = geometry.replace(/^SRID=\d+;/, "");
    const plotArea = calculatePolygonArea(wkt);

    return NextResponse.json({
      parcel_id: parcelId,
      plot_area: plotArea === null ? null : Math.round(plotArea * 100) / 100,
    });
  } catch (error) {
    console.error("Parcel lookup failed:", error);
    return NextResponse.json({ error: "The parcel service is temporarily unavailable." }, { status: 502 });
  }
}
