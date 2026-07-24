import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { data: ArrayBuffer; contentType: string; ts: number }>();
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_CACHE_TILES = 500;
const failCache = new Map<string, number>();
const FAIL_TTL_MS = 60 * 1000;
const inFlight = new Map<string, Promise<Tile | null>>();
const brokenUntil = new Map<string, number>();
const BREAK_MS = 60 * 1000;

type Tile = { data: ArrayBuffer; contentType: string };

const UPSTREAMS: {
  base: string;
  rewrite: (p: URLSearchParams) => URLSearchParams;
}[] = [
  {
    base: "https://mapa.um.warszawa.pl/mapviewer/wms",
    rewrite: (p) => {
      if (p.get("layers") === "wlasnosc") p.set("layers", "WLASNOSC_MAPA");
      p.set("datasource", "dane_wawa");
      return p;
    },
  },
  {
    base: "https://wms.um.warszawa.pl/serwis",
    rewrite: (p) => p,
  },
];

function cacheTile(key: string, tile: Tile) {
  if (cache.size >= MAX_CACHE_TILES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, { ...tile, ts: Date.now() });
}

async function fetchTile(search: string): Promise<Tile | null> {
  for (const { base, rewrite } of UPSTREAMS) {
    if ((brokenUntil.get(base) ?? 0) > Date.now()) continue;
    try {
      const params = rewrite(new URLSearchParams(search));
      const res = await fetch(`${base}?${params.toString()}`, {
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "PlotScout/1.0" },
      });
      if (!res.ok) continue;
      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.startsWith("image/")) continue;
      const tile = { data: await res.arrayBuffer(), contentType };
      cacheTile(search, tile);
      return tile;
    } catch {
      brokenUntil.set(base, Date.now() + BREAK_MS);
    }
  }
  failCache.set(search, Date.now());
  return null;
}

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.toString();
  const cached = cache.get(search);
  if (cached && Date.now() - cached.ts < TTL_MS) {
    return new NextResponse(cached.data, {
      headers: { "Content-Type": cached.contentType, "X-Cache": "HIT", "Cache-Control": "public, max-age=604800" },
    });
  }
  const failedAt = failCache.get(search);
  if (failedAt && Date.now() - failedAt < FAIL_TTL_MS) return new NextResponse(null, { status: 503 });
  let pending = inFlight.get(search);
  if (!pending) {
    pending = fetchTile(search).finally(() => inFlight.delete(search));
    inFlight.set(search, pending);
  }
  const tile = await pending;
  if (!tile) return new NextResponse(null, { status: 503 });
  return new NextResponse(tile.data, { headers: { "Content-Type": tile.contentType, "X-Cache": "MISS", "Cache-Control": "public, max-age=604800" } });
}
