import React from "react";

/**
 * CFE MetricBar — the OEE-breakdown split bar. A full-width two-tone bar split
 * at `percent`, with a left and right label/value pair above (left in the fill
 * colour, right in navy). Mirrors "Running time / Downtime", "Total / Planned
 * output", etc.
 */
export function MetricBar({
  leftLabel, leftValue, rightLabel, rightValue,
  percent = 50,
  fill = "var(--cfe-cyan)",
  track = "var(--cfe-navy)",
  showPercent = true,
  style, ...rest
}) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div style={{ fontFamily: "var(--font-sans)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "6px" }}>
        <div>
          <div style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)" }}>{leftLabel}</div>
          <div style={{ fontSize: "var(--fs-h5)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{leftValue}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)" }}>{rightLabel}</div>
          <div style={{ fontSize: "var(--fs-h5)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{rightValue}</div>
        </div>
      </div>
      <div style={{ position: "relative", height: 18, borderRadius: "var(--radius-xs)", background: track, overflow: "hidden", display: "flex" }}>
        <div style={{ width: p + "%", background: fill, height: "100%" }} />
        {showPercent && (
          <>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-bold)", color: "var(--cfe-navy)" }}>{p.toFixed(1)}%</span>
            <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: "var(--fs-caption)", fontWeight: "var(--fw-bold)", color: "#fff" }}>{(100 - p).toFixed(1)}%</span>
          </>
        )}
      </div>
    </div>
  );
}
