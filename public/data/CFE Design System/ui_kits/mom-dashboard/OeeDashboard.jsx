/* CFE MOM — OEE Dashboard screen. Composes DS primitives + the bespoke charts. */
const { Card, KpiStat, MetricBar, Tabs, Select, IconButton, Icon, Alert } = window.CFEDesignSystem_1ee1e2;

function Selector({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--fs-caption)", fontWeight: 600, color: "var(--cfe-cyan)" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--cfe-cyan)" }} />{label}
      </div>
      {children}
    </div>
  );
}

function DateField({ value, onPrev, onNext }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 12px", background: "#fff", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)", fontSize: "var(--fs-h6)", color: "var(--text-primary)" }}>
        {value}<Icon name="calendar" size={15} style={{ color: "var(--text-secondary)" }} />
      </div>
      <IconButton icon="chevron-left" size="md" label="Previous" onClick={onPrev} />
      <IconButton icon="chevron-right" size="md" label="Next" onClick={onNext} />
    </div>
  );
}

function PanelHead({ children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "var(--fs-h4)", fontWeight: 700, marginBottom: 14 }}>{children}</div>;
}

function OeeDashboard() {
  const scopes = [
    "Enterprise + Sint-Martens-Latem + Hall 2",
    "Enterprise + Sint-Martens-Latem + Hall 1",
    "Enterprise + Kortrijk + Line A",
  ];
  const [scope, setScope] = React.useState(scopes[0]);
  const [tab, setTab] = React.useState("This year");
  const [day, setDay] = React.useState(31);

  // scope-dependent demo figures
  const data = {
    [scopes[0]]: { oee: 41.6, a: 38.1, p: 109.4, q: 100.0, run: "282h 50m 48s", down: "461h 9m 11s", split: 38 },
    [scopes[1]]: { oee: 62.3, a: 71.0, p: 92.4, q: 95.0, run: "402h 12m 03s", down: "341h 47m", split: 54 },
    [scopes[2]]: { oee: 78.9, a: 86.2, p: 95.1, q: 96.2, run: "511h 30m", down: "232h 30m", split: 69 },
  }[scope];

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* selectors */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-end" }}>
        <Selector label="Scope selector">
          <div style={{ width: 360, maxWidth: "60vw" }}>
            <Select value={scope} onChange={(e) => setScope(e.target.value)} options={scopes} placeholder="Select scope" />
          </div>
        </Selector>
        <Selector label="Date selector"><DateField value={`${day}/05/2025`} onPrev={() => setDay((d) => Math.max(1, d - 1))} onNext={() => setDay((d) => Math.min(31, d + 1))} /></Selector>
        <Selector label="Period"><Tabs variant="pill" items={["This month", "This year"]} value={tab} onChange={setTab} /></Selector>
      </div>

      {/* top row */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(380px, 1fr) minmax(380px, 1.2fr)", gap: 16 }}>
        <Card variant="panel">
          <PanelHead><Icon name="settings" size={18} style={{ color: "var(--cfe-cyan)" }} />% Overall Equipment Effectiveness</PanelHead>
          {data.oee < 85 && <Alert tone="warning" title={`OEE Below Target! (85.0%)`} style={{ marginBottom: 14 }} />}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
            <Gauge value={data.oee} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <KpiStat label="Availability %" value={String(data.a).replace(".", ",")} percent={data.a} />
              <KpiStat label="Performance %" value={String(data.p).replace(".", ",")} percent={Math.min(100, data.p)} barColor="var(--cfe-teal)" delta="+2%" />
              <KpiStat label="Quality %" value={String(data.q).replace(".", ",")} percent={data.q} barColor="var(--cfe-teal-deep)" />
            </div>
          </div>
        </Card>

        <Card variant="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <PanelHead><Icon name="chevron-right" size={14} style={{ color: "var(--cfe-cyan)" }} />Trendline OEE (%)</PanelHead>
            <div style={{ display: "flex", gap: 14, fontSize: "var(--fs-caption)", color: "var(--text-secondary)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--cfe-navy)" }} />This year</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--cfe-cyan)" }} />Previous year</span>
            </div>
          </div>
          <Trendline />
        </Card>
      </div>

      {/* breakdown */}
      <Card variant="panel">
        <PanelHead><Icon name="settings" size={18} style={{ color: "var(--cfe-cyan)" }} />OEE Breakdown</PanelHead>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28 }}>
          <MetricBar leftLabel="Running time" leftValue={data.run} rightLabel="Downtime" rightValue={data.down} percent={data.split} fill="var(--cfe-teal)" />
          <MetricBar leftLabel="Total output" leftValue="1.86M" rightLabel="Planned output" rightValue="4.46M" percent={41.6} fill="var(--cfe-cyan)" />
          <MetricBar leftLabel="Good output" leftValue="1.86M" rightLabel="Bad output" rightValue="0.00" percent={100} fill="var(--cfe-blue)" />
        </div>
      </Card>
    </div>
  );
}

window.OeeDashboard = OeeDashboard;
