Surface container. Use `panel` for white application dashboard panels (soft shadow), and `dark` / `tint` for brand content cards (navy or light-navy with the circular chevron affordance).

```jsx
<Card variant="panel" title="OEE Breakdown">…charts…</Card>
<Card variant="dark" title="Title goes here" chevron onChevron={open}>
  To provide more depth for digital applications, tints of the blue colour are allowed.
</Card>
<Card variant="tint" title="Title goes here" chevron>…</Card>
```

`headerRight` slots a control next to the title. Content cards use the 16px radius; panels use 10px.
