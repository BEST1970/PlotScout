import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * CFE IconButton — a compact square (or round) control carrying a single brand
 * icon. Used for date steppers, "add" (+) actions, table-header tools and the
 * circular chevron affordance on content cards.
 */
export function IconButton({
  icon = "plus",
  variant = "primary",
  size = "md",
  shape = "square",
  label,
  disabled = false,
  type = "button",
  style,
  ...rest
}) {
  const dims = { sm: 30, md: 38, lg: 46 };
  const iconSize = { sm: 14, md: 18, lg: 20 };
  const variants = {
    primary:   { background: "var(--cfe-navy)", color: "var(--text-on-dark)", border: "1px solid var(--cfe-navy)" },
    secondary: { background: "var(--cfe-navy-05)", color: "var(--text-primary)", border: "1px solid var(--cfe-navy-05)" },
    outline:   { background: "var(--color-surface)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" },
    ghost:     { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims[size],
        height: dims[size],
        flex: "none",
        borderRadius: shape === "round" ? "var(--radius-pill)" : "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "filter var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = variant === "primary" || variant === "secondary" ? "brightness(1.1)" : "brightness(0.97)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.boxShadow = "none"; }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-focus)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...rest}
    >
      <Icon name={icon} size={iconSize[size]} />
    </button>
  );
}
