Outlined text field with the perched label used across CFE registration and settings screens.

```jsx
<Input label="Customer" required defaultValue="VMA" />
<Input label="Reference" placeholder="Optional" />
<Input label="Duration" error="Exceeds 8h for this day" />
```

Pass `rightSlot` for an inline calendar icon / clear button. `hint` shows helper text; `error` overrides it and turns the field red.
