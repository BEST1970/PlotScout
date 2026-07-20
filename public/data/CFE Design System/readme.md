# CFE Design System

A design system for the **CFE / VMA** manufacturing-operations application — the OEE analytics dashboard and time-registration tooling described in the *VMA CFE Application Styling* guide. It packages the brand foundations (navy + white identity, the teal→blue secondary gradient, Poppins type, the faceted hexagon mark, and the geometric icon set) into tokens, reusable React components, and full-screen UI kits.

> **Brand context.** VMA NV (Sint-Martens-Latem, Belgium) is an industrial-automation & building-technologies firm — tagline *"Smart Technology for Good."* This system styles the **MOM** (Manufacturing Operations Management) application; **CFE** is the customer/brand variant that shares VMA's navy primary and adds its own green-leaning hexagon and categorical palette. Where the two diverge it is noted on the relevant token/asset.

## Source material
- `uploads/VMA_CFE_Application_Styling_v1.pptx` — the application styling guide + extracted pages of the VMA brand book (colours, typography, button/card specimens), real product screenshots (OEE dashboard, "Add registration" form, data grids), the logo lockups, the hexagon marks, and the geometric UI icons. All extracted assets live in `assets/` and `scraps/media/`.
- No codebase or Figma file was provided; recreations are built from the styling-guide screenshots + brand-book pages.

---

## CONTENT FUNDAMENTALS — how CFE writes

- **Voice:** plain, functional, operational. This is industrial software for engineers and operations teams — copy states what a thing *is* and what an action *does*, nothing more. Brand-facing copy (the marketing tagline, brand book) is warmer: *"Smart Technology for Good."*
- **Person:** neutral / imperative in the app. Buttons are verb-first commands: *"Submit and continue", "Submit and clear", "Return", "Add registration"*. Labels are bare nouns: *Customer, Job, Location, Project, Duration, Activity status*.
- **Casing:** **Sentence case** everywhere — headings (*"Add registration", "OEE Breakdown"*), buttons, labels. NOT Title Case. Section eyebrows in the brand book are the one exception: ALL-CAPS, wide letter-spacing (*"04 BRAND ASSETS | 4.3 COLOURS"*).
- **Numbers:** European formatting — decimal **comma** (*41,6 · 109,4 · 54,34%*), and durations spelled as *"200h 50m 48s"*. Dates as *DD-MM-YY* (*12-03-26*) or *D/MM/YYYY*.
- **Language:** primarily English UI, with Dutch in brand/marketing surfaces (*"Onze oplossingen", "Gebouwtechnieken"*). Belgian-Dutch product context.
- **Required fields:** marked with a trailing red asterisk (*Customer\**).
- **Emoji:** **never.** No emoji anywhere. Iconography is the brand's geometric SVG set.
- **Tone of system messages:** direct and slightly urgent for thresholds — *"OEE Below Target! (85.0%)"* — using a single exclamation and the actual value in parentheses.

---

## VISUAL FOUNDATIONS

- **Colour.** Two primaries: deep navy `#00173A` and white. The navy carries the UI — headers, footers, primary buttons, table headers, body text. White/light-grey `#E3E6EE` is the application canvas; white panels sit on it. Depth comes from **derived navy tints** (5/20/60/80%) — *never* used as main colours, only for fills, secondary buttons and zebra rows. The **secondary colour is a gradient** (`#7AC4B3 → #91D4F5 → #00A2DE`) and is *always* used as a gradient, never as separate swatches — it appears as thin accent rules, progress fills and the avatar chip. App data-viz uses a brighter accent set (cyan `#00ADE5`, blue `#0080C8`, teal `#00A781/#008779`) and a broad categorical palette for chart series.
- **Type.** **Poppins** — geometric sans, chosen because its circular forms echo the hexagon logo. Bold (700) for headlines, SemiBold/Medium for titles & emphasis, Regular for body, Light for legal. **Never Black or Thin.** App scale is compact: H1 28 → body 12px. The guide recommends fluid `clamp()` sizing for chrome (`clamp(26px, 3vw, 28px)`) so components scale with the viewport — provided as `--fs-*-fluid` tokens.
- **Backgrounds.** Flat. Light cool-grey canvas, white panels, navy chrome. No photographic or illustrated backgrounds in-app; no noise/grain. The only "gradient" is the brand secondary, used sparingly as an accent — not as a section background.
- **Cards & panels.** Application panels: white, **10px** radius, hairline border `#D7DEEA` + a *soft, cool-tinted shadow* (`0 1px 3px rgba(0,23,58,.08)`). Brand content cards: navy or `navy-05` tint, **16px** radius, no shadow, with a **circular chevron** affordance bottom-right (white circle on navy / navy circle on tint). Data grids: navy header, 6px outer radius, zebra rows (white / `navy-05`).
- **Borders.** Crisp 1px. Inputs use a 1px `navy-20`-ish border that turns **cyan on focus** (with a 3px cyan focus ring); error turns it red.
- **Radii.** 4 (xs) · **6 (controls)** · **10 (panels)** · **16 (content cards)** · pill (chevron buttons, chips, badges).
- **Shadows.** Soft and low-contrast, tinted with the navy (`rgba(0,23,58,…)`) so elevation reads cool on the grey canvas. Dark panels sit flat (no shadow).
- **Buttons.** Navy primary (white text), `navy-05` secondary, white+border outline, transparent ghost, red danger, and a rare gradient accent. ~38px tall, 6px radius. Brand "go" actions carry a trailing **chevron**. Icon-only steppers/add buttons are square navy 38px.
- **Hover / press.** Filled buttons **brighten** slightly on hover (`brightness(1.1)`); outline/ghost darken a touch (`brightness(.97)`). Press nudges **down 1px** (`translateY(1px)`). No scale-bounce.
- **Motion.** Restrained and quick — 120–200ms, standard ease (`cubic-bezier(.2,0,.2,1)`). Fades and small slides; no decorative looping animation. Toggles/switches slide 200ms.
- **Transparency & blur.** Minimal. The header search uses a translucent white fill on navy (`rgba(255,255,255,.08)`); no backdrop blur. Avatar chip uses the brand gradient.
- **Layout rules (from the guide).** Header is **fixed / always in viewport** (~3vw tall). Panels use a **flex layout** that wraps under each other on small screens. Side menus are fixed; sub-menus stack on top of their parent on narrow screens, with up/down scroll arrows when content overflows. Footer is fixed to the bottom with a flex layout. Components scale via `vw` + `clamp()`.
- **Imagery vibe.** The hexagon mark is the hero graphic — faceted, multi-colour (VMA blue/teal; CFE green/purple). Cool palette overall; no warm photography in-app.

---

## ICONOGRAPHY

- **Custom geometric SVG set**, not an off-the-shelf icon font. The brand ships its own bold, geometric glyphs that rhyme with the hexagon/Poppins geometry. The authentic icons extracted from the guide — **menu, user, search, settings, mail, bell, close, chevron-right** — live in `assets/icons/` and are bundled into the React `Icon` component, normalised to `currentColor` so they recolour with text.
- **Usage:** white on navy chrome; navy/secondary on light surfaces; cyan for active/notification accents. Sizes 14–24px in chrome, matched to text via `em` where possible (the guide ties icon height to header height with `clamp`).
- **Chevron** is the signature affordance — trailing on "go" buttons, inside circular card buttons, in date steppers, and as the table-header filter caret.
- **Supplementary glyphs** (`chevron-left/up/down`, `plus`, `calendar`, `filter`) are house-built in the same geometric language to cover app chrome the source set didn't include — **flagged** so they can be replaced with official assets when available.
- **No emoji, no Unicode-glyph icons.** Always the SVG set.

---

## INDEX — what's in here

**Foundations**
- `styles.css` — global entry point (consumers link this); `@import`s only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`, `base.css`.
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `assets/` — `logo-cfe-full.png`, `logo-cfe-white.svg`, `logomark-hexagon.png`, `hexagon-cfe-green.jpg`, and `icons/` (8 brand SVGs).

**Components** (`components/<group>/`, exported under `window.CFEDesignSystem_1ee1e2`)
- core — `Icon`, `Button`, `IconButton`, `Card`
- forms — `Input`, `Select`, `Checkbox`, `Switch`
- feedback — `Badge`, `Alert`
- data — `KpiStat`, `MetricBar`, `DataTable`
- navigation — `Tabs`

**UI kits** (`ui_kits/<product>/`)
- `mom-dashboard/` — the OEE analytics dashboard (gauge, KPI tiles, trendline, breakdown).
- `registration/` — the time-registration form + day grid.

**Other**
- `SKILL.md` — Agent-Skills wrapper for use in Claude Code.
- `scraps/media/` — raw assets extracted from the PPTX (reference).

---

## Caveats / substitutions
- **Fonts** are loaded from Google Fonts (Poppins is genuinely the brand face); no local `.ttf`/`.woff2` binaries were provided — supply them to self-host.
- **CFE-first branding:** the app header and brand cards lead with the CFE green hexagon + a Poppins "CFE" wordmark; VMA appears as "Application by VMA". The CFE mark we have is only a small raster hexagon on a white background (`hexagon-cfe-green.jpg`) — set in a white chip on dark surfaces. **Provide an official CFE vector logo (mark + wordmark)** to finalise the brand surfaces; the VMA vector lockups remain in `assets/` for co-branded contexts.
- `plus / calendar / filter / chevron-left/up/down` icons are **house-built** approximations of the brand's geometric style — replace with official assets when available.
