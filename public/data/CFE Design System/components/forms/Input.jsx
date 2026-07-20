import React from "react";

/**
 * CFE Input — outlined text field with the brand's perched label sitting on the
 * top border (as seen across the registration screens). Required fields show a
 * trailing asterisk; error state turns the border and label red.
 */
export function Input({
  label,
  required = false,
  error,
  hint,
  type = "text",
  disabled = false,
  rightSlot,
  id,
  style,
  ...rest
}) {
  const inputId = id || (label ? "in-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const borderColor = error ? "var(--cfe-danger)" : "var(--border-strong)";
  return (
    <div style={{ fontFamily: "var(--font-sans)", ...style }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "var(--control-height)",
          padding: "0 12px",
          background: disabled ? "var(--color-surface-sunken)" : "var(--color-surface)",
          border: "1px solid " + borderColor,
          borderRadius: "var(--radius-sm)",
          transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
        }}
        onFocusCapture={(e) => { if (!error) e.currentTarget.style.boxShadow = "var(--shadow-focus)"; e.currentTarget.style.borderColor = error ? "var(--cfe-danger)" : "var(--cfe-cyan)"; }}
        onBlurCapture={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = borderColor; }}
      >
        {label && (
          <label
            htmlFor={inputId}
            style={{
              position: "absolute",
              top: "-8px",
              left: "10px",
              padding: "0 4px",
              background: "var(--color-surface)",
              fontSize: "var(--fs-caption)",
              fontWeight: "var(--fw-medium)",
              color: error ? "var(--cfe-danger)" : "var(--text-secondary)",
              pointerEvents: "none",
            }}
          >
            {label}{required && <span style={{ color: "var(--cfe-danger)" }}> *</span>}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={!!error}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-h6)",
            color: "var(--text-primary)",
          }}
          {...rest}
        />
        {rightSlot}
      </div>
      {(error || hint) && (
        <div style={{ marginTop: "4px", fontSize: "var(--fs-caption)", color: error ? "var(--cfe-danger)" : "var(--text-secondary)" }}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
