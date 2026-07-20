Application data grid — navy header with filter carets and zebra rows.

```jsx
<DataTable
  columns={[
    { key: "customer", header: "Customer", link: true },
    { key: "project", header: "Project", link: true },
    { key: "resource", header: "Resource" },
  ]}
  rows={[{ customer: "Fromunion", project: "Upgrade Momentum 18.0", resource: "Simon Reynaert" }]}
  minRows={8}
/>
```

`link: true` styles a column as brand blue. `render` for custom cells. `minRows` pads empty striped rows like the real grids.
