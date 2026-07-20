Outlined dropdown matching `Input`. Used for activity status, templates, scope pickers.

```jsx
<Select label="Activity status" required clearable
  value={status} onChange={e => setStatus(e.target.value)}
  options={["Executed", "Planned", "Cancelled"]} />
```

Accepts string options or `{ value, label }` objects. `clearable` adds a × when a value is set.
