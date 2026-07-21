import { NextResponse } from 'next/server';
import { parse } from "wellknown";
import proj4 from "proj4";

proj4.defs("EPSG:2180", "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

function transformCoords(coords: any): any {
  if (typeof coords[0] === 'number') {
    return proj4("EPSG:2180", "EPSG:4326", [coords[0], coords[1]]);
  }
  return coords.map(transformCoords);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let parcel_id = searchParams.get('parcel_id');
  const latStr = searchParams.get('lat');
  const lonStr = searchParams.get('lon');

  if (!parcel_id && (!latStr || !lonStr)) {
    return NextResponse.json({ error: 'Missing parcel_id or lat/lon' }, { status: 400 });
  }

  // Strip 'dzialki.' prefix if present to satisfy the ULDK API
  if (parcel_id && parcel_id.startsWith('dzialki.')) {
    parcel_id = parcel_id.replace('dzialki.', '');
  }

  try {
    let url = '';
    
    // If it's a mock parcel or we have explicit lat/lon, try spatial intersection
    if ((parcel_id && parcel_id.includes('mock_') && latStr && lonStr) || (!parcel_id && latStr && lonStr)) {
      url = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${lonStr},${latStr},4326&result=geom_wkt`;
    } else {
      url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${parcel_id}&result=geom_wkt`;
    }
    
    const res = await fetch(url);
    const text = await res.text();
    
    if (text.startsWith('0')) {
      const lines = text.trim().split('\n');
      if (lines.length > 1) {
        let wkt = lines[1];
        if (wkt.includes(';')) {
          wkt = wkt.split(';')[1];
        }
        
        // Parse WKT to GeoJSON on the server as requested
        const geojson = parse(wkt);
        
        if (geojson && (geojson as any).coordinates) {
          (geojson as any).coordinates = transformCoords((geojson as any).coordinates);
          return NextResponse.json(geojson);
        }
      } else {
        // If it starts with '0' but doesn't have a second line, or has invalid data
        return NextResponse.json({ error: 'No parcel found at this location' }, { status: 404 });
      }
    } else if (text.startsWith('-1')) {
      return NextResponse.json({ error: 'No parcel found at this location' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Failed to fetch geometry' }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
