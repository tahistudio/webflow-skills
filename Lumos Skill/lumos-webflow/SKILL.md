---
name: lumos-webflow
description: "Build and edit Webflow sites on the Lumos framework (Timothy Ricks) inside the Designer or through the Webflow MCP: page structure, native components, props, slots, variants, open versus closed components, variables and modes, u- utilities, the Grid and Layout components, theming and sub-brands, the style guide, and QA. Use whenever a Webflow project uses Lumos, u- classes, breakpointless or container-query layouts, the trigger and state system, or components like Section, Layout, Grid, Block, Typography Heading or Button Main — even if the user just says 'Lumos site', 'the Lumos starter' or shows Lumos-style class names. Also covers producing HTML/CSS to paste into a Lumos project (see references). Read tahi-webflow-core first; this skill adds the Lumos-specific rules."
---

# Lumos in Webflow

Lumos is a component-first, breakpointless framework. Three systems carry everything: **variables** (collections with modes), **components** (nearly every element on a page is a component instance, including headings and paragraphs), and **utility classes** with the `u-` prefix. Layout responds through container queries and CSS custom properties rather than Webflow breakpoints.

Read `tahi-webflow-core` first. This skill adds what is specific to Lumos. Detail lives in:

- [references/designer-workflow.md](references/designer-workflow.md) — components, props, slots, variants, open and closed patterns, naming, prop order, theming, code placement. Read before building or editing any component.
- [references/stock-inventory.md](references/stock-inventory.md) — what a fresh Lumos 2.2 project ships: pages, components, variable collections and modes, utility families, style guide layout. Read before deciding whether something already exists.
- [references/paste-output-rules.md](references/paste-output-rules.md) — the official rules for writing vanilla HTML/CSS/JS that will be pasted into a Lumos project. Read only when producing code for paste rather than building through the Designer or MCP.

## Where things go

```
Body
└─ page_wrap                         overflow clip, min-height 100svh, flex column
   ├─ [Global Styles]                site-wide CSS engine + responsive thresholds
   ├─ [Global Guides]                alignment overlay, hidden on publish
   ├─ [Nav]
   ├─ main.page_main  (page slot)    clients add sections here in Build mode
   │   ├─ [Section] > [Layout] > [Grid] / [Block] > content components   (open)
   │   └─ [FAQs] / [CTA] / [Testimonials] …                              (closed)
   └─ [Footer]
```

Nav sits after Global Styles and directly above `page_main`. Footer sits directly after it. Every page follows this; a page that deviates is a bug.

## Rules that are Lumos-specific

### Utilities first, then variables, then custom classes

1. Reach for an existing `u-` utility. Lumos ships hundreds; the inventory reference lists the families. When a utility exists for a property, do not write a custom class for it.
2. Bind a variable to a native property when no utility fits.
3. Create a new `u-` utility when the need will recur or already has recurred. Create it on a class-less element, give it the broadest sensible name prefix so it sorts with its family (`u-padding-…`, `u-radius-…`, `u-shadow-…`), and place one example on the style guide so cleanup never purges it.
4. Only then a custom class, named `component_element_part` with underscores, defined in one place on the component that owns it. Custom classes never need a style guide entry as long as they live on exactly one component.

Stack at most three or four utilities on an element. Combo classes (`is-active`, `is-reversed`) go on custom component classes, never on utilities.

### Layout

- **Grid first.** Use the Grid component or `u-grid-*` utilities (autofit, autofill, custom, subgrid, breakout, column-span, row-span). Do not hand-write `grid-template-columns` in the Designer when a utility or the Grid component's column props can express it.
- Grid always has a row defined and ratio columns. Column counts per screen size come from the Grid component's Large / Medium / Small / Smallest props (0 inherits the previous size).
- The Layout component covers the common two-column arrangements (Stack, Columns, Columns Reversed, Sticky Left, Breakout, Full, Contain, Card). Choose a Layout variant before inventing a structure.
- No styles on Webflow's tablet or mobile breakpoints. Responsiveness comes from fluid variables, container queries and the `--_responsive---*` flags. The three container thresholds live in the Global Styles component (defaults 50em, 35em, 20em for Medium, Small, xSmall) and may be changed per project; keep the defaults unless the design needs otherwise.
- Prefer flex with wrap for reflowing rows. Never fixed heights on sections.

### Sizing and type

- Everything in rem or fluid `clamp()` variables bound to the viewport-min and viewport-max tokens. No px anywhere except a hairline border.
- Type roles are variants on the Typography Heading, Typography Paragraph and Typography Plain components (Display, H1 to H6, Text Large, Text Main, Text Small, Inherit). The semantic tag is a separate setting; never pick a heading level for its size.
- Adding a type size means: new size variable, new Text Style mode, duplicated `u-text-style-*` utility bound to that mode, new variant on the Typography components. Do all four or the system is incomplete.
- Spacing tokens `space/1` to `space/8` for gaps and margins; `section-space/none|small|main|large|page-top` for section padding, exposed as Padding Top and Padding Bottom variant props on Section. The Space Switcher component exposes the same scale as a dropdown inside other components.

### Colour and theming

- Swatches are primitives. The Theme collection maps them to roles (background, text, border, buttons, links) per mode: Base, Dark, Brand. Components expose this as a Theme variant with an Inherit default; `u-theme-light|dark|brand` utilities do the same on plain elements.
- Sub-brands or product lines that change a few accent colours are additional variables plus `u-accent-*` utilities, not new modes. Use a new mode only when a theme re-colours most of the system.
- Never hex in a class. Every colour goes through a variable.

### Components

The Designer workflow reference covers this in depth. The short version:

- Everything repeated is a component. Headings, paragraphs, buttons, images, icons already are; build sections from them.
- **Open** (Section, Layout, Grid, Block with slots) is the default. **Closed** (a prop-driven static section such as FAQs or a CTA band) when a block is reused verbatim across the site. Lean open.
- Components are named broadest term first in Title Case (`Section Hero`, `Button Main`, `Icon Arrow`, `Card Testimonial`) and filed in groups: Section, Layout, Card, Icon, Form, CMS, Global, Wrapper, Typography, Visual, Interactive, Variant Switcher, Utility.
- Every component has a Settings prop group with Visibility, Classes (accepts `u-` utilities only), ID and Style, then content and variant props in DOM order. Every prop has a tooltip.
- Sub-components carry the decluttering: a Card holds Button, Theme Switcher and Space Switcher instances whose variants surface as dropdown props on the Card. Builder-only components and props end in ` (dev)`.
- Slots hold component instances only. Nested slot wrappers get `u-display-contents` so they do not affect layout.
- Custom elements (DOM element with a chosen tag) are used where a native element blocks a needed attribute; otherwise standard elements.
- No empty div blocks. Flat DOM; stack utilities rather than nest.

### Interactivity

- Native Lumos components (Accordion, Tab, Modal, Dropdown, Slider) are dependency-free and driven by the trigger and state variable system. Use them before building anything custom.
- Hover and state styling uses `data-trigger` and `--_trigger---on|off`, `.is-active` and `--_state---true|false`; never `:hover` selectors or `.is-active` in CSS.
- Motion beyond that is native GSAP-powered Webflow interactions, scoped to the component instance where possible. No animation libraries as custom code.

### Custom code placement

Page-only code in page settings. One-per-page component code inside that component as the last child. Many-per-page component code in Global Styles. Site code is for tracking only. Component CSS embeds use `u-embed-css`, JS embeds `u-embed-js`, and they are made their own component before the parent is unlinked.

## Workflow for a new Lumos build

1. **Audit** the project against the stock inventory: what the starter already provides, what the project has added, which components carry ` (dev)`.
2. **Foundation**: tune the default collection (viewport bounds, margin, gutter, radius, swatches), Themes, Typography and Text Style to the design. Leave Column Count and Alignment collections alone; utilities depend on them. Snap design values to tokens per the core tolerance. Extend the style guide with any new utility.
3. **Sections, one at a time**: pick open or closed; assemble from Section, Layout, Grid, Block and content components; add a section-specific custom class only where utilities cannot express something, and only on the component that owns it. Check live at desktop, then resize the container through the three thresholds.
4. **Interactions** with native GSAP interactions, verified in Preview.
5. **QA** per the core checklist, plus the Lumos-specific items: double the browser font size and check nothing overflows; confirm Global Guides is hidden; confirm no styles landed on Webflow breakpoints; confirm every new utility is on the style guide.

## Building through the MCP

Follow the core playbook. Lumos specifics: Section, Layout, Grid and Block are components, so a page is assembled with the component builder and slot insertion, not raw elements. Set instance props (Theme, Padding Top, Padding Bottom, column counts) rather than classes. Create any new `u-` utility as a style before referencing it in a Classes prop. Interactions target component scope with `[componentId, elementId]`.

## Anti-patterns

- Styling on tablet or mobile breakpoints.
- Hand-written grid CSS where `u-grid-*` or the Grid component would do.
- Custom class for a property a utility already covers; custom class defined on more than one component; "add-on" custom classes on random elements.
- Hex colours, px sizes, `:hover` selectors, `.is-active` in CSS.
- Empty divs, nested wrappers that only exist to hold a class.
- Component names by page (`Home Hero`) instead of by what they are (`Section Hero`).
- Props without tooltips; heading tags exposed as props on single-use sections.
- Regular elements dropped into slots (only component instances work).
- Library or converter sections pasted with their block numbers and Classic interactions left in place.
