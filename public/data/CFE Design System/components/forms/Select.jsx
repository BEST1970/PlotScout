import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * CFE Select — outlined dropdown matching Input's perched-label treatment, with
 * a trailing brand caret and an optional clear affordance.
 */
export function Select({
  label,
  required = false,
  options = [],
  placeholder = "Select…",
  value,
  onChange,
  clearable = false,
  error,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const selId = id || (label ? "sel-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const borderColor = error ? "var(--cfe-danger)" : "var(--border-strong)";
  const hasValue = value !== undefined && value !== null && value !== "";
  return (
    <div style={{ fontFamily: "var(--font-sans)", ...style }}>
      <div
        style={{
          position: "relative",
          height: "var(--control-height)",
          background: disabled ? "var(--color-surface-sunken)" : "var(--color-surface)",
          border: "1px solid " + borderColor,
          borderRadius: "var(--radius-sm)",
        }}
      >
        {label && (
          <label
            htmlFor={selId}
            style={{
              position: "absolute", top: "-8px", left: "10px", padding: "0 4px",
              background: "var(--color-surface)", fontSize: "var(--fs-caption)",
              fontWeight: "var(--fw-medium)", color: error ? "var(--cfe-danger)" : "var(--text-secondary)", pointerEvents: "none",
            }}
          >
            {label}{required && <span style={{ color: "var(--cfe-danger)" }}> *</span>}
          </label>
        )}
        <select
          id={selId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          style={{
            width: "100%", height: "100%",
            padding: "0 56px 0 12px",
            border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--fs-h6)",
            color: hasValue ? "var(--text-primary)" : "var(--text-muted)",
            appearance: "none", WebkitAppearance: "none", cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
        <div style={{ position: "absolute", top: 0, right: 0, height: "100%", display: "flex", alignItems: "center", gap: "6px", padding: "0 10px", pointerEvents: "none" }}>
          {clearable && hasValue && (
            <button
              type="button"
              aria-label="Clear"
              onClick={() => onChange && onChange({ target: { value: "" } })}
              style={{ pointerEvents: "auto", display: "inline-flex", border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}
            >
              <Icon name="close" size={12} />
            </button>
          )}
          <Icon name="chevron-down" size={14} style={{ color: "var(--text-secondary)" }} />
        </div>
      </div>
      {error && <div style={{ marginTop: "4px", fontSize: "var(--fs-caption)", color: "var(--cfe-danger)" }}>{error}</div>}
    </div>
  );
}
