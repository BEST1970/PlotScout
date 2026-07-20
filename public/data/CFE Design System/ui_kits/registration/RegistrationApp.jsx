/* CFE — Time Registration screen. Add-registration form + the day's registration grid.
   Composes DS primitives from the compiled bundle. */
const { Card, Button, IconButton, Input, Select, DataTable, Badge, Icon, Tabs } = window.CFEDesignSystem_1ee1e2;

function FieldRow({ children, cols = "1fr 1fr" }) {
  return <div style={{ display: "grid", gridTemplateColumns: cols, gap: 16 }}>{children}</div>;
}

function RegistrationApp() {
  const [day, setDay] = React.useState(12);
  const [form, setForm] = React.useState({ customer: "VMA", job: "SC", location: "VMA", project: "", activity: "", reference: "", description: "", duration: "0", status: "Executed" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const [rows, setRows] = React.useState([
    { customer: "Fromunion", project: "Upgrade Momentum 18.0", resource: "Simon Reynaert", hours: "3,0", status: "Executed" },
    { customer: "Fromunion", project: "Upgrade Momentum 18.0", resource: "Andrei Pashkov", hours: "2,5", status: "Executed" },
    { customer: "VMA", project: "SC — Internal", resource: "Jeroen De Cuyper", hours: "1,0", status: "Planned" },
  ]);
  const total = rows.reduce((s, r) => s + parseFloat(r.hours.replace(",", ".")), 0);

  function submit(clear) {
    if (!form.project || !form.description) return;
    setRows((r) => [...r, { customer: form.customer, project: form.project, resource: "You", hours: String(form.duration).replace(".", ",") || "0", status: form.status }]);
    if (clear) setForm((f) => ({ ...f, project: "", activity: "", reference: "", description: "", duration: "0" }));
  }

  return (
    <div style={{ padding: 20, display: "grid", gridTemplateColumns: "minmax(420px, 1fr) minmax(380px, 0.85fr)", gap: 16, alignItems: "start" }}>
      {/* form */}
      <Card variant="panel" title="Add registration">
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <Select label="Select template" options={["Daily — Service call", "Weekly — Project work", "Maintenance round"]} placeholder="Select template" />
          </div>
          <IconButton icon="plus" label="New template" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FieldRow cols="200px 1fr">
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Input label="Date" value={`${String(day).padStart(2, "0")}-03-26`} readOnly rightSlot={<Icon name="calendar" size={15} style={{ color: "var(--text-secondary)" }} />} style={{ flex: 1 }} />
              <IconButton icon="chevron-left" label="Previous day" onClick={() => setDay((d) => Math.max(1, d - 1))} />
              <IconButton icon="chevron-right" label="Next day" onClick={() => setDay((d) => d + 1)} />
            </div>
            <div />
          </FieldRow>
          <FieldRow>
            <Input label="Customer" required value={form.customer} onChange={set("customer")} />
            <Input label="Job" required value={form.job} onChange={set("job")} />
          </FieldRow>
          <FieldRow>
            <Input label="Location" required value={form.location} onChange={set("location")} />
            <Input label="Project" required value={form.project} onChange={set("project")} placeholder="e.g. Upgrade Momentum 18.0" />
          </FieldRow>
          <FieldRow>
            <Input label="Activity" value={form.activity} onChange={set("activity")} />
            <Input label="Reference" value={form.reference} onChange={set("reference")} />
          </FieldRow>
          <Input label="Description" required value={form.description} onChange={set("description")} placeholder="What did you work on?" />
          <FieldRow>
            <Input label="Duration (already 0 / 8h today)" required value={form.duration} onChange={set("duration")} />
            <Select label="Activity status" required clearable value={form.status} onChange={set("status")} options={["Executed", "Planned", "Cancelled"]} />
          </FieldRow>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          <Button variant="secondary" iconLeft="chevron-left">Return</Button>
          <Button variant="outline" onClick={() => submit(false)}>Submit and return</Button>
          <Button variant="outline" iconLeft="close" onClick={() => submit(true)}>Submit and clear</Button>
          <Button variant="primary" chevron onClick={() => submit(true)}>Submit and continue</Button>
        </div>
      </Card>

      {/* day overview */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card variant="dark">
          <div style={{ fontSize: "var(--fs-h6)", color: "rgba(255,255,255,.7)", fontWeight: 600 }}>Registered today</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, color: "#fff" }}>{total.toFixed(1).replace(".", ",")}</span>
            <span style={{ color: "rgba(255,255,255,.7)" }}>/ 8,0 h</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.16)", marginTop: 14, overflow: "hidden" }}>
            <div style={{ width: Math.min(100, (total / 8) * 100) + "%", height: "100%", background: "var(--cfe-gradient)" }} />
          </div>
        </Card>

        <Card variant="panel" title="Day registrations" headerRight={<Badge tone="info">{rows.length}</Badge>}>
          <DataTable
            columns={[
              { key: "project", header: "Project", link: true },
              { key: "resource", header: "Resource" },
              { key: "hours", header: "Hours", filterable: false, width: 64 },
              { key: "status", header: "Status", filterable: false, render: (v) => <Badge size="sm" tone={v === "Executed" ? "success" : v === "Planned" ? "info" : "neutral"}>{v}</Badge> },
            ]}
            rows={rows}
            minRows={6}
          />
        </Card>
      </div>
    </div>
  );
}

window.RegistrationApp = RegistrationApp;
