# MOM Dashboard — UI kit

High-fidelity recreation of the CFE / VMA **Manufacturing Operations Management** OEE dashboard (the Power-BI-style analytics view from the application styling guide).

## Screen
- `index.html` — the full interactive dashboard: navy app header (logo, scope search, notification/mail/settings/user), scope + date + period selectors, the OEE gauge with Availability / Performance / Quality KPI tiles, the OEE trendline area chart, and the OEE-breakdown split bars. Footer with VMA contact block.

## Interactions
- **Scope selector** swaps the OEE figures, gauge fill and breakdown split.
- **Date stepper** moves the day; **period** pills toggle This month / This year.

## Files
- `AppShell.jsx` — `AppHeader`, `AppFooter` (exported to `window`).
- `Charts.jsx` — `Gauge` (semicircular SVG) and `Trendline` (dual-series area chart). Bespoke SVG — appropriate for data-viz.
- `OeeDashboard.jsx` — the screen, composing DS primitives (`Card`, `KpiStat`, `MetricBar`, `Tabs`, `Select`, `IconButton`, `Icon`, `Alert`).

Components come from the compiled bundle via `window.CFEDesignSystem_1ee1e2`. The kit does not re-implement primitives.
