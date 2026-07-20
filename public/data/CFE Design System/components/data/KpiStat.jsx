import React from "react";

/**
 * CFE KpiStat — the dashboard KPI tile: a label, a large value (optionally with
 * a unit), an optional delta chip, and an optional two-tone progress bar
 * (as used for Availability / Performance / Quality).
 */
export function KpiStat({ label, value, unit, delta, deltaTone = "success", percent, barColor = "var(--cfe-cyan)", align = "left", style, ...rest }) {
  const toneColor = { success: "var(--cfe-teal-deep)", danger: "var(--cfe-danger)", neutral: "var(--text-secondary)" }[deltaTone];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", textAlign: align, fontFamily: "var(--font-sans)", ...style }} {...rest}>
      <div style={{ fontSize: "var(--fs-h6)", fontWeight: "var(--fw-medium)", color: "var(--text-secondary)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", justifyContent: align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start" }}>
        <span style={{ fontSize: "var(--fs-agenda)", lineHeight: 1, fontWeight: "var(--fw-bold)", color: "var(--text-primary)", letterSpacing: "var(--ls-tight)" }}>{value}</span>
        {unit && <span style={{ fontSize: "var(--fs-h3)", fontWeight: "var(--fw-semibold)", color: "var(--text-secondary)" }}>{unit}</span>}
        {delta != null && (
          <span style={{ fontSize: "var(--fs-h6)", fontWeight: "var(--fw-semibold)", color: toneColor }}>{delta}</span>
        )}
      </div>
      {percent != null && (
        <div style={{ height: 8, borderRadius: "var(--radius-pill)", background: "var(--cfe-navy)", overflow: "hidden" }}>
          <div style={{ width: Math.max(0, Math.min(100, percent)) + "%", height: "100%", background: barColor, borderRadius: "var(--radius-pill)" }} />
        </div>
      )}
    </div>
  );
}
