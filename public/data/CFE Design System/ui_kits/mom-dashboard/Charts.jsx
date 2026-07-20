/* CFE MOM — data-viz charts (SVG): semicircular OEE gauge + OEE trendline area chart.
   Charts are bespoke SVG (appropriate for data-viz, not icons). */

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arcPath(cx, cy, r, startDeg, endDeg) {
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, endDeg);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
}

function Gauge({ value = 41.6, target = 85, size = 220 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 16, w = 18;
  const v = Math.max(0, Math.min(100, value));
  const startA = 180, endA = 360;            // top semicircle, left → right
  const valA = startA + (endA - startA) * (v / 100);
  const tgtA = startA + (endA - startA) * (target / 100);
  const [tx, ty] = polar(cx, cy, r, tgtA);
  return (
    <svg width={size} height={size / 2 + 28} viewBox={`0 0 ${size} ${size / 2 + 28}`}>
      <path d={arcPath(cx, cy, r, startA, endA)} fill="none" stroke="var(--cfe-navy-05)" strokeWidth={w} strokeLinecap="round" />
      <path d={arcPath(cx, cy, r, startA, valA)} fill="none" stroke="var(--cfe-cyan)" strokeWidth={w} strokeLinecap="round" />
      <line x1={polar(cx, cy, r - w, tgtA)[0]} y1={polar(cx, cy, r - w, tgtA)[1]} x2={tx} y2={ty} stroke="var(--cfe-navy)" strokeWidth={2.5} />
      <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 40, fontWeight: 700, fill: "var(--cfe-navy)" }}>
        {String(v).replace(".", ",")}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, fill: "var(--text-secondary)" }}>OEE %</text>
    </svg>
  );
}

function Trendline({ width = 560, height = 230 }) {
  const days = 31;
  const thisYear = [0,0,0,2,16,64,86,45,0,44,0,52,0,0,47,88,101,89,0,0,0,57,0,0,0,90,89,88,91].slice(0, days);
  while (thisYear.length < days) thisYear.push(Math.round(40 + Math.random() * 50));
  const prevYear = thisYear.map((_, i) => 88 + Math.round(Math.sin(i) * 3));
  const pad = { l: 28, r: 12, t: 16, b: 24 };
  const W = width - pad.l - pad.r, H = height - pad.t - pad.b;
  const max = 120;
  const x = (i) => pad.l + (i / (days - 1)) * W;
  const y = (v) => pad.t + H - (v / max) * H;
  const line = (arr) => arr.map((v, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = (arr) => `${line(arr)} L ${x(days - 1)} ${pad.t + H} L ${x(0)} ${pad.t + H} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      {[0, 30, 60, 90, 120].map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={width - pad.r} y1={y(g)} y2={y(g)} stroke="var(--border)" strokeWidth={1} />
          <text x={4} y={y(g) + 3} style={{ fontFamily: "var(--font-sans)", fontSize: 9, fill: "var(--text-muted)" }}>{g}</text>
        </g>
      ))}
      <path d={area(prevYear)} fill="var(--cfe-sky)" opacity={0.5} />
      <path d={line(prevYear)} fill="none" stroke="var(--cfe-cyan)" strokeWidth={2} />
      <path d={area(thisYear)} fill="var(--cfe-navy)" opacity={0.18} />
      <path d={line(thisYear)} fill="none" stroke="var(--cfe-navy)" strokeWidth={2} />
      {thisYear.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={2} fill="var(--cfe-navy)" />)}
    </svg>
  );
}

window.Gauge = Gauge;
window.Trendline = Trendline;
