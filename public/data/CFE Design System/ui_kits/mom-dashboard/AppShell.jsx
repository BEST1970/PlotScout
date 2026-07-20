/* CFE MOM — application shell: navy header (logo, scope search, nav icons) + footer.
   Pulls primitives from the compiled design-system bundle. */
const { Icon, IconButton, Input } = window.CFEDesignSystem_1ee1e2;

function AppHeader({ appName = "Manufacturing Operations", onMenu }) {
  const navIcons = ["bell", "mail", "settings"];
  return (
    <header style={{
      height: "var(--header-height)", flex: "none", background: "var(--cfe-navy-deep)",
      display: "flex", alignItems: "center", gap: "20px", padding: "0 20px", color: "#fff",
      position: "sticky", top: 0, zIndex: 20,
    }}>
      <button onClick={onMenu} aria-label="Menu" style={{ background: "transparent", border: "none", color: "#fff", display: "inline-flex", cursor: "pointer", padding: 6 }}>
        <Icon name="menu" size={20} />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "#fff", borderRadius: 9, padding: 5, boxSizing: "border-box" }}>
          <img src="../../assets/hexagon-cfe-green.jpg" alt="CFE" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
        </span>
        <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: ".05em", color: "#fff" }}>CFE</span>
      </div>
      <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.18)" }} />
      <div style={{ fontSize: "var(--fs-h6)", fontWeight: 600, letterSpacing: ".02em", color: "#cdd8e8" }}>{appName}</div>

      <div style={{ flex: 1 }} />

      <label style={{
        display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 12px",
        background: "rgba(255,255,255,.08)", borderRadius: "var(--radius-pill)",
        border: "1px solid rgba(255,255,255,.14)", width: 280, maxWidth: "32vw",
      }}>
        <Icon name="search" size={15} style={{ color: "#9fb0c8" }} />
        <input placeholder="Type your search here" style={{
          flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
          color: "#fff", fontFamily: "var(--font-sans)", fontSize: "var(--fs-h6)",
        }} />
      </label>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {navIcons.map((n) => (
          <button key={n} aria-label={n} style={{ position: "relative", background: "transparent", border: "none", color: "#cdd8e8", cursor: "pointer", padding: 8, display: "inline-flex" }}>
            <Icon name={n} size={18} />
            {n === "bell" && <span style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, borderRadius: "50%", background: "var(--cfe-cyan)", border: "1.5px solid var(--cfe-navy-deep)" }} />}
          </button>
        ))}
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "var(--cfe-gradient)", color: "var(--cfe-navy)", marginLeft: 6 }}>
          <Icon name="user" size={18} />
        </span>
      </div>
    </header>
  );
}

function AppFooter() {
  const cols = [
    ["Onze oplossingen", ["Gebouwtechnieken", "Industrial Automation", "Energy & Utilities"]],
    ["Application", ["OEE Dashboard", "Time registration", "Reporting"]],
  ];
  return (
    <footer style={{ flex: "none", background: "var(--cfe-navy-deep)", color: "#cdd8e8", padding: "22px 28px", display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>
      {cols.map(([h, items]) => (
        <div key={h} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: "var(--fs-h6)", fontWeight: 700, color: "#fff" }}>{h}</div>
          {items.map((i) => <div key={i} style={{ fontSize: "var(--fs-body)" }}>{i}</div>)}
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "var(--fs-body)" }}>
        <div style={{ fontSize: "var(--fs-h6)", fontWeight: 700, color: "#fff" }}>VMA NV</div>
        <div>Kortrijksesteenweg 14b</div>
        <div>9830 Sint-Martens-Latem</div>
        <div style={{ color: "var(--cfe-cyan)" }}>info@vma.be</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ alignSelf: "flex-end", fontSize: "var(--fs-caption)", color: "#7e93b3" }}>© 2025 CFE — All rights reserved. &nbsp;·&nbsp; Application by VMA</div>
    </footer>
  );
}

window.AppHeader = AppHeader;
window.AppFooter = AppFooter;
