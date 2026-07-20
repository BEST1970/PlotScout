import React from "react";

/**
 * CFE Alert — inline status message (e.g. "OEE Below Target! (85.0%)").
 * Left accent bar + soft tint, in the brand semantic colours.
 */
export function Alert({ tone = "warning", title, style, children, ...rest }) {
  const map = {
    info:    { c: "var(--cfe-blue)", bg: "#EAF4FC" },
    success: { c: "var(--cfe-teal-deep)", bg: "#E4F4EF" },
    warning: { c: "#B5531F", bg: "#FCEEE3" },
    danger:  { c: "var(--cfe-danger)", bg: "#FCE7E8" },
  };
  const t = map[tone] || map.warning;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "var(--radius-sm)",
        background: t.bg,
        borderLeft: "4px solid " + t.c,
        color: "var(--text-primary)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-h6)",
        lineHeight: "var(--lh-body)",
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ color: t.c, fontWeight: "var(--fw-bold)", flex: "none" }}>!</span>
      <div>
        {title && <div style={{ fontWeight: "var(--fw-semibold)", marginBottom: children ? "2px" : 0 }}>{title}</div>}
        {children && <div style={{ color: "var(--text-secondary)" }}>{children}</div>}
      </div>
    </div>
  );
}
