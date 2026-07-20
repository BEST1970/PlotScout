Compact single-icon control for steppers, "add" (+) actions, table-header tools, and the circular chevron on content cards. Always pass `label` for accessibility.

```jsx
<IconButton icon="plus" label="Add template" />
<IconButton icon="chevron-left" variant="secondary" label="Previous day" />
<IconButton icon="chevron-right" variant="primary" shape="round" label="Open" />
```

Variants `primary | secondary | outline | ghost`; sizes `sm | md | lg`; `shape="round"` for the card chevron affordance.
