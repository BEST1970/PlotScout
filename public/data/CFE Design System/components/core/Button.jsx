import React from "react";
import { Icon } from "./Icon.jsx";

/**
 * CFE Button — the primary action control.
 * Navy primary / tinted secondary / outline / ghost / danger, plus a rare
 * gradient accent. Optional brand icon on either side, or a trailing chevron
 * (the brand's signature affordance).
 */
export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  chevron = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  as = "button",
  style,
  children,
  ...rest
}) {
  const heights = { sm: "var(--control-height-sm)", md: "var(--control-height)", lg: "46px" };
  const padding = { sm: "0 12px", md: "0 16px", lg: "0 22px" };
  const fontSize = { sm: "var(--fs-body)", md: "var(--fs-h6)", lg: "var(--fs-h5)" };
  const iconSize = { sm: 14, md: 16, lg: 18 };

  const variants = {
    primary:   { background: "var(--cfe-navy)", color: "var(--text-on-dark)", border: "1px solid var(--cfe-navy)" },
    secondary: { background: "var(--cfe-navy-05)", color: "var(--text-primary)", border: "1px solid var(--cfe-navy-05)" },
    outline:   { background: "var(--color-surface)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" },
    ghost:     { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
    danger:    { background: "var(--cfe-danger)", color: "var(--text-on-dark)", border: "1px solid var(--cfe-danger)" },
    gradient:  { background: "var(--cfe-gradient)", color: "var(--cfe-navy)", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.primary;

  const Tag = as;
  return (
    <Tag
      type={Tag === "button" ? type : undefined}
      disabled={Tag === "button" ? disabled : undefined}
      aria-disabled={disabled || undefined}
      className="cfe-btn"
      data-variant={variant}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: fullWidth ? "100%" : undefined,
        height: heights[size],
        padding: padding[size],
        fontFamily: "var(--font-sans)",
        fontSize: fontSize[size],
        fontWeight: "var(--fw-semibold)",
        lineHeight: 1,
        textDecoration: "none",
        whiteSpace: "nowrap",
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "filter var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(1px)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = variant === "ghost" || variant === "outline" ? "brightness(0.97)" : "brightness(1.1)"; }}
      onFocus={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-focus)"; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={iconSize[size]} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon name={iconRight} size={iconSize[size]} />}
      {chevron && !iconRight && <Icon name="chevron-right" size={iconSize[size]} />}
    </Tag>
  );
}
