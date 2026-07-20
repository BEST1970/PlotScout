import React from "react";

/** CFE Checkbox — square control with navy fill + white check when selected. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, id, style, ...rest }) {
  const cid = id || (label ? "cb-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <label htmlFor={cid} style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-h6)", color: "var(--text-primary)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{ position: "relative", display: "inline-flex", flex: "none" }}>
        <input
          id={cid}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          style={{ position: "absolute", opacity: 0, width: 18, height: 18, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          aria-hidden="true"
          className="cfe-checkbox-box"
          style={{
            width: 18, height: 18, borderRadius: "var(--radius-xs)",
            border: "1.5px solid var(--border-strong)", background: "var(--color-surface)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            transition: "background var(--dur-fast), border-color var(--dur-fast)",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" style={{ opacity: 0 }} className="cfe-checkbox-tick">
            <path d="M2 6.2 5 9 10 3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      {label && <span>{label}</span>}
      <style>{`
        .cfe-checkbox-box:has(+ *) {}
        input[type=checkbox]:checked + .cfe-checkbox-box { background: var(--cfe-navy); border-color: var(--cfe-navy); }
        input[type=checkbox]:checked + .cfe-checkbox-box .cfe-checkbox-tick { opacity: 1; }
        input[type=checkbox]:focus-visible + .cfe-checkbox-box { box-shadow: var(--shadow-focus); }
      `}</style>
    </label>
  );
}
