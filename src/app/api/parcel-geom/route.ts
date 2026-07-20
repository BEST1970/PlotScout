import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parcel_id = searchParams.get('parcel_id');

  if (!parcel_id) {
    return NextResponse.json({ error: 'Missing parcel_id' }, { status: 400 });
  }

  try {
    const url = `https://uldk.gugik.gov.pl/?request=GetParcelById&id=${parcel_id}&result=geom_wkt`;
    const res = await fetch(url);
    const text = await res.text();
    
    if (text.startsWith('0')) {
      const lines = text.trim().split('\n');
      if (lines.length > 1) {
        let wkt = lines[1];
        if (wkt.includes(';')) {
          wkt = wkt.split(';')[1];
        }
        return NextResponse.json({ wkt });
      }
    }
    
    return NextResponse.json({ error: 'Failed to fetch geometry' }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
