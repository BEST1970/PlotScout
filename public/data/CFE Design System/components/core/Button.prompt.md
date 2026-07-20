Primary action control for CFE apps — use for form submits, navigation and toolbar actions; the trailing `chevron` is the brand's signature "go" affordance.

```jsx
<Button variant="primary" chevron>Submit and continue</Button>
<Button variant="secondary" iconLeft="chevron-left">Return</Button>
<Button variant="outline">Cancel</Button>
```

Variants: `primary` (navy, default) · `secondary` (light navy tint) · `outline` (white + border) · `ghost` (transparent) · `danger` (red, destructive) · `gradient` (rare brand accent). Sizes `sm | md | lg`. Icons come from the brand `Icon` set via `iconLeft` / `iconRight`; `chevron` adds a trailing chevron when no `iconRight` is set. Never use a tint colour as a primary button background other than via `secondary`.
