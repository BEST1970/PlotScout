import React from "react";

/** CFE Switch — pill toggle; navy track when on. */
export function Switch({ label, checked, defaultChecked, onChange, disabled = false, id, style, ...rest }) {
  const sid = id || (label ? "sw-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  return (
    <label htmlFor={sid} style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", fontSize: "var(--fs-h6)", color: "var(--text-primary)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{ position: "relative", display: "inline-flex", flex: "none" }}>
        <input
          id={sid}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          style={{ position: "absolute", opacity: 0, width: 40, height: 22, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span aria-hidden="true" className="cfe-switch-track" style={{
          width: 40, height: 22, borderRadius: "var(--radius-pill)",
          background: "var(--cfe-navy-20)", display: "inline-block", position: "relative",
          transition: "background var(--dur-base) var(--ease-standard)",
        }}>
          <span className="cfe-switch-thumb" style={{
            position: "absolute", top: 2, left: 2, width: 18, height: 18, borderRadius: "50%",
            background: "#fff", boxShadow: "var(--shadow-xs)",
            transition: "transform var(--dur-base) var(--ease-standard)",
          }} />
        </span>
      </span>
      {label && <span>{label}</span>}
      <style>{`
        input[role=switch]:checked + .cfe-switch-track { background: var(--cfe-navy); }
        input[role=switch]:checked + .cfe-switch-track .cfe-switch-thumb { transform: translateX(18px); }
        input[role=switch]:focus-visible + .cfe-switch-track { box-shadow: var(--shadow-focus); }
      `}</style>
    </label>
  );
}
