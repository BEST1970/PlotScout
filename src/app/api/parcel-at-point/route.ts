import { NextRequest, NextResponse } from "next/server";

const ULDK_ENDPOINT = "https://uldk.gugik.gov.pl/";

export async function GET(request: NextRequest) {
  const x = Number(request.nextUrl.searchParams.get("x"));
  const y = Number(request.nextUrl.searchParams.get("y"));

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return NextResponse.json({ error: "Valid x and y coordinates are required." }, { status: 400 });
  }

  const url = new URL(ULDK_ENDPOINT);
  url.searchParams.set("request", "GetParcelByXY");
  url.searchParams.set("xy", `${x},${y},2180`);
  url.searchParams.set("result", "id");

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

    return NextResponse.json({ parcel_id: lines[1] });
  } catch (error) {
    console.error("Parcel lookup failed:", error);
    return NextResponse.json({ error: "The parcel service is temporarily unavailable." }, { status: 502 });
  }
}
