import React from "react";

/**
 * CFE Badge — compact status / count label. Soft (default) or solid fill in
 * the brand semantic colours.
 */
export function Badge({ tone = "neutral", solid = false, size = "md", style, children, ...rest }) {
  const map = {
    neutral: { c: "var(--cfe-navy-60)", bg: "var(--cfe-navy-05)" },
    info:    { c: "var(--cfe-blue)", bg: "#E1F0FB" },
    success: { c: "var(--cfe-teal-deep)", bg: "#DBF1EA" },
    warning: { c: "#B5531F", bg: "#FCE9DC" },
    danger:  { c: "var(--cfe-danger)", bg: "#FBE0E1" },
    cyan:    { c: "#0A6E8C", bg: "#D8F2FB" },
  };
  const t = map[tone] || map.neutral;
  const pad = size === "sm" ? "2px 8px" : "3px 10px";
  const fs = size === "sm" ? "var(--fs-caption)" : "var(--fs-body)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: pad,
        fontFamily: "var(--font-sans)",
        fontSize: fs,
        fontWeight: "var(--fw-semibold)",
        lineHeight: 1.4,
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        color: solid ? "var(--text-on-dark)" : t.c,
        background: solid ? t.c : t.bg,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
