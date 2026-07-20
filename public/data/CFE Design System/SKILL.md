---
name: cfe-design
description: Use this skill to generate well-branded interfaces and assets for CFE / VMA (the Manufacturing Operations / OEE application), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key foundations (full detail in README.md):
- **Identity:** deep navy `#00173A` + white primaries; teal→blue secondary that is ALWAYS a gradient (`#7AC4B3 → #91D4F5 → #00A2DE`). Navy tints (5/20/60/80%) for depth only.
- **Type:** Poppins (Bold headlines, Regular body, Light legal — never Black/Thin). Compact app scale H1 28 → body 12px.
- **Shape:** 6px controls, 10px panels, 16px content cards, pill chevrons/chips. Soft cool-tinted shadows. Faceted hexagon logo. Geometric SVG icon set (`assets/icons/`) — no emoji.
- **Copy:** sentence case, verb-first buttons, European number/date formatting, required `*`.
- **Tokens:** `styles.css` (link this) → `tokens/*`. Components under `window.CFEDesignSystem_1ee1e2`; UI kits in `ui_kits/`.
