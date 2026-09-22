# Lumos gap-check: official docs vs installed lumos-skill (22 Sep 2026)

## 0. Method / caveats
- lumos.timothyricks.com redirects to Notion: https://timothyricks.notion.site/Lumos-Framework-6d1139068f7442d49494ec3b581cf09d
- **The installed SKILL.md is byte-identical to Timothy Ricks' official skill** (https://github.com/lumosframework/skill, Mar 2026). Scope is deliberately "HTML/CSS/JS to paste into a Lumos project". Everything below is Webflow-side coverage it lacks.

## 1. What Lumos is, version, free vs paid, "Clientverse"
- Component-first Webflow framework by Timothy Ricks (docs with Caleb Raney). Three systems: Variables (collections + modes), Components (everything is a component incl. headings/paragraphs/buttons), Utilities (`u-`). Breakpointless; trigger/state CSS-variable system. MIT CSS: https://github.com/lumosframework/lumos
- **Current: v2.2.3 (23 May 2026).** Changelog: https://timothyricks.notion.site/Changelog-2912df07d1a480f58af4f3062fc5e1ca — v2.2.2 Jan 2026, v2.2.0 Oct 2025 (major), v2.1.0 Aug 2025. Frozen per-version docs. **No automatic upgrade path.**
- Free: starter cloneable "Lumos V2" (https://try.webflow.com/tricks?path=lumos-v2-beta); Notion docs (duplicate per project as client docs); Chrome extension v6.4 (https://chromewebstore.google.com/detail/lumos-extension-for-webfl/hclnndibcedglllpoaajibpnoacaolpj); Figma file (https://www.figma.com/community/file/1246177299149729498); GitHub scripts (theme-collector.js, theme-toggle.js, variable-collector.js); custom GPT; Component Converter (https://component-converter.webflow.io/); T.RICKS components preview.
- Paid: Fluid Builder app (freemium); Patreon "Webflow Wizards" $80/mo (Discord, meetups, T.RICKS Component Library, Wizards Course); **Moden.club $30/mo — HTML To Webflow converter** (the intended paste path for AI output), Layout Wizard, CSS Animator. Related: Lumos for Astro, Stacki.
- **"Clientverse" not found publicly.** Closest: docs "Client-Guide" page, Patreon community. Must ask user.

## 2. Docs coverage missing from SKILL.md

### A. Install & setup
1. Clone starter → update Default collection (Swatches, Max Width/Gutter/Margin, Radius), Themes, Typography, Text Style; leave Column Count / Alignment alone. https://timothyricks.notion.site/Variables-28e2df07d1a480ae8ab8e3009d71aa08
2. Add Lumos to existing project via Libraries. Video https://www.youtube.com/watch?v=GF6731jtcQ4
3. Versioning: no auto-upgrade; diff via changelog.
4. Getting started: https://timothyricks.notion.site/Getting-Started-28e2df07d1a4809f828bf42e4c016413

### B. Page structure
5. `page_wrap` (overflow clip, min-height 100svh, flex column) → Global Styles component → Global Guides → Nav → `page_main` page slot (`<main>`, id="main") → Footer. https://timothyricks.notion.site/Page-Structure-28d2df07d1a480a98557fb6f685c4c60

### C. Components as native Webflow components (biggest gap)
6. **Open vs Closed**: open = slot-driven (default), closed = prop-driven (CTA/modal). Build open, wrap, componentise → closed. Nested slots need `u-display-contents`. https://timothyricks.notion.site/Components-28d2df07d1a480a5a176d4fec40a573e
7. **Naming**: broadest term first (`Section Hero`, `Button Main`, `Icon Arrow`, `Form Input`, `CMS …`). Groups: Section / Layout / Card / Icon / Form / CMS / Global / Wrapper / Typography / Visual / Interactive / Variant Switcher / Utility.
8. **Prop order**: Visibility → Variants → Tag → Content (Text, Link, Image, Alt) → Role → Style (Max Width, Classes, Style Attribute) → Other Attributes → Slots. Section prop groups: "Section" folder first then element folders in DOM order.
9. **Variants**: one component + "Variant" dropdown; always name the prop "Variant"; variant name becomes data attribute; duplicate variant to start new.
10. **Slot naming**: after the child component expected ("Tab Links").
11. **Class props**: props named "Class…" accept only `u-` utilities. https://timothyricks.notion.site/Client-Guide-28e2df07d1a48004b841db89bd900916
12. Duplicating components: duplicate custom classes too.
13. **Default inventory v2.2**: Button Main/Play/Arrow/Close; Card Primary; Contact Form + Form Checkbox/Fieldset/Label Text/Input/Radio/Select/Select Option/Textarea/Range; Global Guides/Styles/Nav/Footer; Space/Theme/Input Switcher; Nav Banner, Menu, Footer Group/Link, Check UI; Slider, Accordion List/Item, Modal, Tab, Tab Link, Dropdown; Layout, Button Wrapper, Content Wrapper, Grid, Block, Section; Icon Arrow/Arrow Full/Icon/Logo; Typography Eyebrow/Heading/Paragraph/Plain/Tag; Clickable; Starter CSS/JS; Media Overlay, Visual Image/Video, iFrame. Interactive components dependency-free since Jul 2025.
14. Open-component section recipe: Section → Layout → Column slots → Eyebrow/Heading/Paragraph/Button Wrapper/Button; Visual Image/Video + Overlay.
15. Main vs instance; Build Mode vs Design Mode rules for clients.

### D. Variables, modes, themes
16. Collections: `default` (viewport-max 90rem, viewport-min 20rem, margin, gutter, column-count, column-width, max-width small|main|full, radius small|main|round, border-width main, focus/width, focus/offset-inner|outer, swatches incl. `-o20`), Themes, Typography, Text Style, Column Count, Alignment, Responsive.
17. Variables vs utilities split: typography, colour, structure, sizing, radius/border/hover → variables; display, layout, width/height, opacity/overflow → classes.
18. Unsupported properties go in Custom Properties (`text-transform: var(--_typography---text-transform--uppercase)`).
19. **Typography**: Typography collection + Text Style collection (one mode per text style). Line-height trim via Global Styles; `u-text-style-*` = `display: flow-root`. Adding a size = new size variable → new Text Style mode → duplicate `u-text-style-*` bound to mode → new variant on Heading + Paragraph components. https://timothyricks.notion.site/Typography-28d2df07d1a480569107ec67d110778d
20. **Colour**: Swatches → Theme collection (background/text/border + primary/secondary button per mode); theme via component variants Inherit / Light / Dark; `u-theme-{inherit,light,dark,brand}` + `u-brand-*`; Theme Switcher; GSAP theme animation via theme-collector.js. https://timothyricks.notion.site/Color-28d2df07d1a480298ae4f657d710f8a9

### E. Layout utilities & Grid component
21. **Grid component props**: Large/Medium/Small/Smallest column counts (0 = inherit), Self Contained variant, Autofit/Autofill + Minimum Column Size. https://timothyricks.notion.site/p/Grid-28f2df07d1a48017b9d3e6620d7334b6
22. **Grid utilities**: `u-grid-autofit`, `u-grid-autofill`, `u-grid-custom`, `u-grid-breakout`, `u-grid-subgrid`, `u-column-span-{full,indent,1-12}`, `u-column-start-*`, `u-row-span-*`, `u-row-start-*`. Stacking a grid utility on a component class prevents auto child IDs. https://timothyricks.notion.site/Grid-28d2df07d1a4808da65bd498b9dde337
23. **Flex utilities**: `u-flex-horizontal-wrap|nowrap`, `u-flex-vertical-wrap|nowrap`, `u-align-items-*`, `u-justify-content-*`, `u-align-self-*` (+ `-variable` variants bound to Alignment mode), `u-flex-shrink|grow|noshrink`. https://timothyricks.notion.site/Flexbox-28d2df07d1a48058b11bd1608a39e052
24. Utility inventory skill never names: `u-layout-wrapper`, `u-layout`, `u-layout-column-1|2`, `u-grid-wrapper`, `u-grid`, `u-content-wrapper`, `u-background-slot`, `u-video`, `u-image-wrapper`, `u-image`, `u-iframe-wrapper`, `u-iframe`, `u-overlay`, `u-eyebrow-{wrapper,layout,marker,text}`, `u-section-spacer`, `u-container-{small,full}`, `u-svg`, `u-icon`, `u-embed-{css,js}`, `u-rich-text`, `u-line-height-*`, `u-letter-spacing-*`.

### F. Class naming beyond the skill
25. Slots use `u-display-contents`; max ~4 stacked utilities; utility overrides/renaming; **creating new utilities: create on class-less element, add to the styleguide page so cleanup doesn't purge it, reorder with Finsweet extension** (utilities above custom classes). `is-` combos on component classes only. https://timothyricks.notion.site/Class-Naming-28d2df07d1a480128efbd4541778ec34

### G. Breakpointless in the Designer
26. No styles on tablet/mobile breakpoints; flex-wrap; responsive variables pasted into Custom Properties (per variant; disables native display/gap controls — set those first); thresholds live in Global Styles; `--block-*` variable omitted from skill. https://timothyricks.notion.site/Breakpointless-28d2df07d1a480098d0cc89cfd41ec20
27. `match-container.js` `observeContainer("(width < 40em)", cb)` from cdn.jsdelivr.net/gh/flowtricks/script@v1.0.4.

### H. Sizing & spacing
28. viewport-max/min bound fluid clamps; space 1–8 smaller than smallest section-space; section-space page-top; margin vs gap rationale. https://timothyricks.notion.site/Size-Spacing-28d2df07d1a4801eb2c3d6d885b08c66
29. **Fluid Builder** workflow + font-size accessibility checks (red/yellow). https://timothyricks.notion.site/Fluid-Builder-App-28d2df07d1a48065be4ae5e4ec2c9af7

### I. Trigger & State extras
30. `data-trigger="hover-if-clickable"`; font-weight switching via calc; trigger-OR-state `min(var(--_trigger---off) + var(--_state---false), 1)`. https://timothyricks.notion.site/Trigger-State-28d2df07d1a480b8a549f8184c55bded

### J. Custom code conventions
31. CSS: in-page embed for live preview; site-wide → Global Styles; component-scoped → embed inside component (`u-embed-css`; unlink Starter before editing). JS: CDNs in site footer; component JS as last child of section component; make embed its own component before unlinking. FAQs: https://timothyricks.notion.site/FAQs-28d2df07d1a480c58d02c078c442bb44
32. Embed props / attribute props / number prop pipe props into embeds and data attributes.

### K. Chrome extension
33. Right-arrow auto class name; Shift+Up/Down style base class; `24`+space → 1.5rem; `562/1440`+space → %; Tab wraps var(); auto color-mix; data-attribute buttons. https://timothyricks.notion.site/Chrome-Extension-28d2df07d1a48068af99dc859052e547

### L–O. Media (direct video URLs, SVG Import app + `u-svg`), Figma guidance (10/12-col grid, plan themes, 2–3 section spacings), **QA (thin: double font-size/max-zoom test, Fluid Builder checks, Global Guides, low-power video test)**, AI→Webflow tooling (Moden HTML To Webflow, Component Converter, custom GPT; "Is Webflow MCP 2.0 Good Now?" video). Claude.com and Anthropic.com listed as built on Lumos.

### P. YouTube playlist (21 videos) https://www.youtube.com/playlist?list=PLoXSZEwtbyStInsfWsEO5ouJ7HTfMMLeA — incl. V2.1 Crash Course, Open vs Closed Components, Clean Up Variables/Styles/Components (Aug 2026, https://www.youtube.com/watch?v=DYVyaH49ye8), "How I Setup Webflow Components (So Clients Don't Break Everything)" https://www.youtube.com/watch?v=P3kYOmPYO_A

## 3. Outdated / contradicted in SKILL.md
- Predates v2.2.3; no target version stated.
- Theme classes: omits `u-theme-inherit` and `u-brand-*`; docs say component theme variants start with Inherit.
- Omits `--block-*` responsive variable.
- `data-trigger` list omits `hover-if-clickable`.
- Container-query thresholds hardcoded (50em) — docs say thresholds are project-specific (Global Styles); docs examples use 40em/20em.
- color-mix `in hsl` vs docs `in srgb`.
- Hand-written grid CSS vs docs' Grid component / `u-grid-autofit|autofill|custom` — Webflow-native skill should route to utilities first.
- `getComputedStyle` vs `match-container.js`.
- `--_theme---background-2`, `background-skeleton`, `--nav--height-total` exist in starter but not in public docs list — verify against v2.2.3.
- `<em>`/pseudo-element bans are paste-converter constraints, not Lumos rules — label as such.

## 4. Questions for the user
1. What exactly is "Clientverse"? URL/export? Does it change starter components/variables/naming?
2. Which Lumos version are active projects on? Frozen per client?
3. Clone starter each time or house starter? What is always deleted/renamed first?
4. Open vs closed default for client sites? When closed? `u-display-contents` nested slots?
5. Prop conventions: docs order? House prop names? Standard variant names?
6. Theming: `u-theme-*` only or `u-brand-*` too? theme-collector.js?
7. Handover workflow: Build Mode + Client-Guide, Notion, Loom? What do clients break?
8. QA: viewports / zoom / font-size / devices / browsers; publish checklist?
9. Paste path: Moden, Chrome extension, Component Converter, manual? What breaks on paste?
10. Keep `<style>`/`<script>` in section components or move to Global Styles? Where do CDNs live?
11. Interactions: Webflow IX, trigger/state, CSS-only, GSAP? Boilerplate, reduced-motion, match-container?
12. Grid component + `u-grid-*` or custom grid CSS? Custom utilities added to styleguide? Finsweet extension reorder?
13. Fluid Builder for every size? Text Style modes per style?
14. CMS: wrapping Collection Lists as "CMS" components; CMS-driven variants/data attributes?
15. Deliberate deviations (naming, max 3 underscores, `is-`, `u-` on slots, hex bans)? Enforce vs flexible?
