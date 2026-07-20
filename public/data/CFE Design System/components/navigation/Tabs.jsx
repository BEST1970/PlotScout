import React from "react";

/**
 * CFE Tabs — section navigation. "underline" tabs (active gets a gradient
 * underline) or "pill" filter chips (active = navy). Used for the application's
 * filter rows and view switchers.
 */
export function Tabs({ items = [], value, onChange, variant = "underline", style, ...rest }) {
  const active = value != null ? value : (items[0] && (typeof items[0] === "string" ? items[0] : items[0].value));
  const norm = items.map((i) => (typeof i === "string" ? { value: i, label: i } : i));

  if (variant === "pill") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontFamily: "var(--font-sans)", ...style }} {...rest}>
        {norm.map((i) => {
          const on = i.value === active;
          return (
            <button key={i.value} type="button" onClick={() => onChange && onChange(i.value)}
              style={{
                height: "var(--control-height-sm)", padding: "0 16px", borderRadius: "var(--radius-pill)",
                fontFamily: "var(--font-sans)", fontSize: "var(--fs-body)", fontWeight: "var(--fw-semibold)",
                cursor: "pointer", transition: "background var(--dur-fast), color var(--dur-fast)",
                background: on ? "var(--cfe-navy)" : "var(--cfe-navy-05)",
                color: on ? "var(--text-on-dark)" : "var(--text-secondary)",
                border: "1px solid " + (on ? "var(--cfe-navy)" : "transparent"),
              }}>
              {i.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {norm.map((i) => {
        const on = i.value === active;
        return (
          <button key={i.value} type="button" onClick={() => onChange && onChange(i.value)}
            style={{
              position: "relative", padding: "10px 14px 12px", background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: "var(--fs-h6)", fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
              color: on ? "var(--text-primary)" : "var(--text-secondary)",
            }}>
            {i.label}
            <span style={{ position: "absolute", left: 8, right: 8, bottom: -1, height: 3, borderRadius: "var(--radius-pill)", background: on ? "var(--cfe-gradient)" : "transparent" }} />
          </button>
        );
      })}
    </div>
  );
}
