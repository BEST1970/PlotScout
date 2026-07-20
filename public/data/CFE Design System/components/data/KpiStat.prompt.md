Dashboard KPI tile — the Availability / Performance / Quality pattern.

```jsx
<KpiStat label="Availability %" value="38,1" percent={38} />
<KpiStat label="Performance %" value="109,4" delta="+2%" percent={100} barColor="var(--cfe-teal)" />
```

Set `percent` (0–100) to show the two-tone bar; `delta` for a trend chip; `unit` for a suffix.
