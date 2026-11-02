---
name: tahi-webflow-core
description: "Shared rules and workflow for building, editing and QA-ing any Webflow site to a professional agency standard. Load this whenever the user works on a Webflow project in any way — building sections or pages from Figma, editing classes, components, props, slots or variants, setting up variables or a style guide, using the Webflow MCP or CLI, migrating interactions to GSAP, or reviewing a site for quality. Also load it before any Lumos, Client-First, client-site or Webflow-template task; those specialist skills build on this one. Trigger even if the user only says 'Webflow', 'MCP', 'Designer', 'style guide', 'component', 'breakpoint' or 'QA' without naming a framework."
---

# Webflow Core — how we build

This skill holds the rules that apply to every Webflow build regardless of framework. Framework-specific skills (Lumos, Client-First) and job-specific skills (client site, template) add to it and never contradict it. When a specialist skill is loaded, read this one first.

Two things sit above every other rule:

1. **Everything must be visible and editable in the Designer.** A class that only exists as text in an HTML attribute, a style hidden in an embed, or a value that only lives in code is a bug. If a person opening the Style panel cannot see it, it does not exist.
2. **Consistency beats fidelity.** A site built from a small set of reusable tokens, utilities and components is worth more than one that matches a Figma frame to the pixel. Snap to what exists; create new things only when the system genuinely lacks them.

## Workflow

Every job, large or small, runs through the same four phases. Do not skip ahead to building.

### Phase 0 — Audit what exists

Before creating anything, read the site:

- Pages and folders, including the style guide and components pages.
- Variable collections, their groups and modes.
- All utility classes and the custom class prefixes already in use.
- All components, with their props, variants, slots and instance counts.
- Custom code at site and page level, and registered scripts.
- Existing interactions.

Write down the framework in use, the naming pattern, the token scale, and the reusable components. Every later decision reuses these first. If a fitting utility, variable or component exists, use it. Never create a near-duplicate.

### Phase 1 — Foundation before sections

For a new build, or a build from a Figma file, set up the whole system before building a single content section:

1. Scan every page and frame of the design. List every colour, type style, spacing value, radius, shadow, and every repeated block. This is the long-term view; a section built before this scan will be rebuilt.
2. Map the design values onto tokens. Snap to the nearest existing value when the difference is within about 5 percent of the larger value or 4px, whichever is greater. So 141px and 145px both snap to a 140px token; 8px and 13px do not merge. Only mint a new token when the design value is genuinely outside that range and will recur.
3. Create or extend variables (colour, size, type, radius, shadow) with clear grouped names.
4. Create utility classes for anything that will recur. Prefer being utility-forward over custom-forward: if a value shows up twice, it is a utility.
5. Build the Style Guide page and the Components page so the system is complete and visible. Order on the style guide: utilities, then variables, then components. Components get their own page so they can be dumped there freely.
6. Set up the page skeleton, navigation and footer as components.

Only then move to sections.

### Phase 2 — Build one section at a time

Work in long, deliberate steps. One section per pass. Never paste many frames at once; that produces muddled, low-effort output. For each section:

1. Decide whether it is a new component, an instance of an existing component, or a one-off section (see Components below).
2. Build the structure with real elements and real classes. Create every class as a Webflow style before referencing it anywhere. Never define a class only through an HTML class attribute or an embed.
3. Style through the Style panel (native properties bound to variables), never through embed `<style>` blocks or the CSS parameter of an HTML builder. Only properties Webflow cannot model (for example `backdrop-filter`, container queries) go in custom properties or a dedicated embed.
4. Attach real content: images by asset, alt text on every image, real links.
5. Check the section live at the desktop breakpoint, then every other breakpoint, before starting the next section. A section must be high quality on its own, in the context of its page, and in the context of the whole site.

### Phase 3 — QA before calling anything done

After each page: visual pass at every breakpoint, Lighthouse, console clean. After the site: full checklist in [references/qa-checklist.md](references/qa-checklist.md). Never report "done" for something you could not see rendered; say exactly what is unverified and how the user can check it.

## Rules

### Units and layout

- Never use px for anything that affects layout or type. Use rem for type and spacing, percentages and fr for widths, vw or vh only for viewport-relative effects. Borders may be 1px.
- Grids always define at least one row. Column widths are ratios (`1fr`, `1.5fr`, `2fr`) rather than fixed widths, so the grid re-balances itself. Use `minmax(0, 1fr)` rather than bare `1fr` when content could overflow.
- Prefer flex with wrap for rows of items that should reflow. Use grid for true two-dimensional layouts.
- Sections use `min-height`, never fixed `height`, so they grow with content.
- Desktop-first: base styles on the main breakpoint, override downward. When the design has no tablet or mobile frames, decide the responsive behaviour yourself from judgement and visual feedback; do not stop to ask.
- Enable the three larger breakpoints (1280, 1440, 1920) when the design needs control there. They cannot be removed once added, so decide once at the start.

### Classes

Order of preference for any styling need:

1. An existing utility class.
2. An existing variable bound to a native property.
3. A new utility class, added to the style guide, if the need will recur.
4. A custom class, defined in exactly one place.

Naming is semantic: a class says what the thing is (`hero`, `feature`, `cta`, `card`, `testimonial`), never which page it sits on (`page1`, `home2`) and never a library block number (`layout234`). Page-prefixed names are acceptable only for things inseparable from a single page, such as `contact_form` or `pricing_cards`. Rename anything that arrives with a generic or numbered name before styling it.

Custom classes live in one place. A card's classes are defined on the Card component and nowhere else; they do not need to appear on the style guide. Avoid "add-on" custom classes bolted onto random elements. When one is unavoidable, define it on the style guide so cleanup does not purge it.

Keep stacking shallow: one to two classes ideal, three acceptable, four is the ceiling. Stack utilities of the same kind (spacing with spacing, type with type). Never add styles while several utilities are selected; that silently creates an unwanted combo.

### DOM

- Flat and minimal. Stack utility classes instead of nesting wrappers. Add a wrapper only when layout genuinely needs it or when a slot needs a home.
- No empty div blocks inside components. If a div has no content and no purpose, delete it.
- Use semantic tags: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`. Exactly one `h1` per page; heading levels never skip.
- Custom elements (a DOM element with a custom tag) are for cases where a standard element blocks a needed attribute such as a class attribute, list order or style. Use `div` or the most natural tag when you do.

### Variables

- More is better. Colours, sizes, type, radius, shadows, spacing all live in variables so a client change is one edit.
- Group with folders (`Brand Colors/Primary`, `Space/Medium`). Title Case names with spaces when the platform shows them to clients.
- Primitives feed semantic aliases where a theme or mode is needed. Raw hex on a primitive is fine.
- Use variable modes for responsive values (one mode per breakpoint) and for themes (light, dark, brand). A sub-brand accent that only changes a few colours is a set of extra variables, not a mode; use a mode only when a theme re-colours most of the system.

### Components, props, slots, variants

Make something a component when it appears more than once, or when it must be edited safely by a client. When a repeated block cannot be edited the way the site needs across contexts, copy and paste instead of forcing a component.

- **Open versus closed.** An open component is slot-driven (a Section holding a Layout holding a Grid, with content dropped into slots); it is flexible and lets a client rearrange. A closed component is prop-driven and static; it fits things reused verbatim across the site, such as an FAQ block or a CTA band. Most sites are a mix. Lean open; go closed when reuse is exact.
- **Props** are for per-instance values: text, rich text, image, alt text, link, video, number, toggle. Every prop gets a tooltip that says what it controls and any constraint. Group props in folders that match the component's structure. Never expose heading tags to clients unless the section is genuinely reused in different hierarchy positions.
- **Sub-components with exposed variants** are the main decluttering tool. A Card contains a Button component, a Theme switcher component and a Spacing switcher component; their variants surface on the Card as dropdown props, so the client changes colour or spacing with one click and cannot drift off-system. The canonical example is the button: a Button component wraps a Button Content component (the visual variants) which wraps a Button Layout component (icon position). Sub-parts carry the description "Do not place directly on a page."
- **Variants** are for the same structure with a different look. One variant axis per component; name the prop "Variant" unless the axis has an obvious name (Theme, Size).
- **Slots** are for structural variety. Name a slot after what it expects ("Buttons", "Media"). Only component instances go into slots.
- **Repeaters.** For small fixed counts, numbered prop groups (FAQ 1, FAQ 2) each with a Show toggle are fine. When the count grows or varies, use an open section with a sub-component per item instead.
- **Conditional visibility** inside components is encouraged: show or hide elements from a toggle, pluralise a label when a count is above one, hide a block when a prop is empty.
- **Hiding from clients.** Components and props meant only for the builder get the suffix ` (dev)`, for example `Badge Core (dev)`. The user hides these from Marketers in the Designer before handoff. Never put the marker on pages.
- Components have a name in Title Case, a group (folder) and a one-line description of where it is used and how it is edited.

### Images and assets

- Every image has alt text. Decorative images are marked decorative. Alt text is a prop on any component that has an image prop.
- Compress everything. Aim under 150 KB per image, modern formats, lazy loading below the fold, eager only on the first viewport image.
- Logos and icons are inline SVG, not raster.

### Interactions

- Use Webflow's native GSAP-powered interactions for all motion. Do not add GSAP or other animation libraries as custom code unless the user asks.
- Animate transform and opacity only. Durations between 150 and 800 ms. Reveals carry an explicit start value so they play from the API; the API cannot set Initial Appearance.
- Honour `prefers-reduced-motion` through the interaction's conditional playback when the platform supports it.
- Legacy (Classic) interactions imported with library sections are stripped and rebuilt natively. See the migration procedure in [references/mcp-playbook.md](references/mcp-playbook.md).
- A saved interaction is not proof it plays. Verify in Preview or on the published page.

### Custom code placement

- CSS or JS needed on one page only: that page's settings.
- Code for a component that appears once per page (an FAQ block): inside that component.
- Code for a component that appears many times per page (buttons): the site-wide Global Styles component.
- Site-level code is reserved for tracking and consent.
- Templates for the Webflow Marketplace carry no custom code at all except the standard font-smoothing snippet. The template skill governs that.

### Native elements that need a person

The API cannot create Webflow's native Navbar, Slider, Tabs, Dropdown or Lightbox. When a build needs one, pause, tell the user exactly what to add in the Designer and where, then continue once it exists. Keep these native; do not substitute a scripted equivalent unless the user chooses to.

### Working through the Webflow MCP

The MCP is the preferred build path. Its gotchas are collected in [references/mcp-playbook.md](references/mcp-playbook.md). The rules that matter most:

- Call the guide tool once per session before anything else, and audit the site (Phase 0) before writing.
- Create styles before referencing them. Apply properties through the style tool bound to variables, never through the HTML builder's CSS parameter or an embed.
- Build inside a component definition by scoping to the component; insert instances into slots with the component builder; bind props to element settings.
- Snapshots need the Designer open and in the foreground and show desktop only. Use Preview or the published page for other breakpoints.
- Never publish without an explicit instruction.

## Quality bar and reporting

Lighthouse targets are 80 or above on mobile and 90 or above on desktop. They are a goal, not a gate; report the score and the top causes rather than stalling on them.

When reporting a build or a QA pass, state:

- What was built or checked, per section and per page.
- What was verified visually and at which breakpoints.
- What could not be verified and exactly how the user can check it.
- Any rule in this skill that was knowingly bent, and why.

Never describe something as finished if it has not been seen rendered.
