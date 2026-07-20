import React from "react";
import { Icon } from "../core/Icon.jsx";

/**
 * CFE DataTable — navy header with per-column filter carets, zebra-striped rows
 * (white / navy-05), and the brand's blue link styling on linked cells.
 * Cosmetic recreation of the application grids; bring your own data.
 */
export function DataTable({ columns = [], rows = [], striped = true, minRows = 0, style, ...rest }) {
  const blanks = Math.max(0, minRows - rows.length);
  return (
    <div style={{ border: "1px solid var(--cfe-navy)", borderRadius: "var(--radius-sm)", overflow: "hidden", fontFamily: "var(--font-sans)", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--fs-h6)" }}>
        <thead>
          <tr style={{ background: "var(--cfe-navy)" }}>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-on-dark)", fontWeight: "var(--fw-semibold)", whiteSpace: "nowrap", width: c.width }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "10px" }}>
                  {c.header}
                  {c.filterable !== false && (
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 16, borderRadius: 3, background: "rgba(255,255,255,0.16)" }}>
                      <Icon name="chevron-down" size={9} style={{ color: "#fff" }} />
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} style={{ background: striped && ri % 2 ? "var(--cfe-navy-05)" : "var(--color-surface)" }}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: "9px 12px", borderTop: "1px solid var(--border)", color: c.link ? "var(--text-link)" : "var(--text-primary)", fontWeight: c.link ? "var(--fw-medium)" : "var(--fw-regular)", whiteSpace: "nowrap" }}>
                  {c.render ? c.render(r[c.key], r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {Array.from({ length: blanks }).map((_, i) => (
            <tr key={"b" + i} style={{ background: striped && (rows.length + i) % 2 ? "var(--cfe-navy-05)" : "var(--color-surface)" }}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: "9px 12px", borderTop: "1px solid var(--border)", height: 18 }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
