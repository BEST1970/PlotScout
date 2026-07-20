import React from "react";
import { IconButton } from "./IconButton.jsx";

/**
 * CFE Card / Panel.
 *  - "panel" (default): white surface, soft shadow — the application dashboard panel.
 *  - "dark": navy surface with white text — brand content card.
 *  - "tint": light navy-05 surface — secondary brand content card.
 * Pass `chevron` to add the brand's circular chevron affordance bottom-right.
 */
export function Card({
  variant = "panel",
  title,
  headerRight,
  chevron = false,
  onChevron,
  padding,
  style,
  children,
  ...rest
}) {
  const variants = {
    panel: { background: "var(--color-surface)", color: "var(--text-primary)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border)" },
    dark:  { background: "var(--cfe-navy)", color: "var(--text-on-dark)", boxShadow: "none", border: "1px solid var(--cfe-navy)" },
    tint:  { background: "var(--cfe-navy-05)", color: "var(--text-primary)", boxShadow: "none", border: "1px solid var(--cfe-navy-05)" },
  };
  const v = variants[variant] || variants.panel;
  const pad = padding != null ? padding : "var(--space-6)";
  const isContent = variant === "dark" || variant === "tint";

  return (
    <div
      className="cfe-card"
      data-variant={variant}
      style={{
        position: "relative",
        borderRadius: isContent ? "var(--radius-lg)" : "var(--radius-md)",
        padding: pad,
        ...v,
        ...style,
      }}
      {...rest}
    >
      {(title || headerRight) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "var(--space-3)" }}>
          {title && (
            <div style={{ fontSize: "var(--fs-h4)", fontWeight: "var(--fw-bold)", lineHeight: "var(--lh-heading)" }}>{title}</div>
          )}
          {headerRight}
        </div>
      )}
      {children}
      {chevron && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--space-5)" }}>
          <IconButton
            icon="chevron-right"
            shape="round"
            variant={variant === "dark" ? "outline" : "primary"}
            label="Open"
            onClick={onChevron}
            style={variant === "dark" ? { background: "var(--cfe-white)", color: "var(--cfe-navy)", border: "1px solid var(--cfe-white)" } : undefined}
          />
        </div>
      )}
    </div>
  );
}
