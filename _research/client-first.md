# Client-First research report (Finsweet, v2.1)

Sources: finsweet.com/client-first/docs/*, official Quick Guide PDF (v2.1), compiled CSS of the official cloneable (client-first-cloneable.webflow.io, "V2.1"). Third-party sources marked.

## 1. Rules a skill must encode

### 1a. Class taxonomy and naming

| Type | Rule | Examples |
|---|---|---|
| Utility | Dashes only, no underscore. One specific combination of CSS properties, project-wide, always global. | `text-size-large`, `background-color-primary`, `padding-global` |
| Custom | Contains an underscore. `folder-name_element-name`. Text before the underscore is the virtual folder. | `header_background-layer`, `testimonial-slider_headshot`, `team-list_headshot-wrapper` |
| Global | Classification, not syntax. Any class used site-wide. | `faq_item`, `nav_component` |
| Combo | Variant of a base class; must use `is-` prefix; only stacked on its base. | `button is-brand`, `section_header is-home`, `faq_item is-dark` |

- Lowercase, no abbreviations, no shorthand. Quick Guide "No": `col-2-d`, `flex-mobile-a-c`.
- General → specific word order: `text-size-large`.
- Custom anatomy: `[folder]_[element]-[qualifier]`: `team-list_headshot-wrapper`. Siblings: `team-list_component`, `team-list_headshot-image`, `team-list_headshot-texture-layer`, `team-list_headshot-background`.
- Common element words: `component`, `wrapper`, `content`, `layer`, `grid`, `list`, `item`, `mask`, `image`, `heading`, `subtitle`, `link`, `button`, `logo`, `container`, `menu`. Cloneable custom classes: `nav_component`, `nav_container`, `nav_logo`, `nav_button`, `nav_menu_link`, `nav_fixed`, `hero_content`, `hero_grid`, `hero_heading`, `hero_image`, `section_hero`, `form_component`, `form_input`, `form_checkbox`, `form_checkbox-icon`, `form_radio`, `form_radio-icon`, `form_message-success`, `form_message-error`, `utility-page_component`, `utility-page_wrapper`, `utility-page_form`, `utility-page_image`, `button-group`.
- Component keyword (V2): an element is a "component" only if identifier is literally `component`: `client-slider_component`, `team-list_component`, `nav_component`, `form_component`.
- Do NOT create a layout utility system. Discouraged: `grid-3-col`, `gap-large`, `tablet-grid-2`, `mobile-grid-1`, `flex-a-l-j-c`, `col-2-d`. Encouraged: custom `grid_col-2`, `grid_col-3` + `is-` combos.

### 1b. Folders
- One underscore = one folder level; `folder-1_folder-2_element` nests. Utilities auto-group by keyword.
- Renaming a folder prefix renames every class inside it.
- Folder strategy: general folder for reusable components (`slider_arrow`); page prefix only when truly page-exclusive (`home-slider_arrow`); page-inside-component when variant (`slider_culture-pane`). "Just because we have the power of nested folders doesn't mean we should always use them."

### 1c. Core page structure
```
page-wrapper
  navbar (nav_component, <nav>, OUTSIDE main-wrapper)
  global-styles (HTML embed component holding project CSS)
  main-wrapper (<main>)
    section_[identifier] (<section>)
      padding-global + padding-section-[size]   ← same div (v2.1)
        container-[size]
          content
  footer (<footer>, outside main-wrapper)
```
- `page-wrapper`/`main-wrapper`: styles optional.
- `section_[identifier]`: avoid styling; use global add-on like `section-style-dark`.
- `padding-global`: only padding-left/right. Cloneable: 2.5rem desktop, 1.25rem ≤767.
- `container-[size]`: `width:100%; margin:auto; max-width`. `container-small` 48rem, `-medium` 64rem, `-large` 80rem.
- `padding-section-[size]` values (desktop / ≤991 / ≤767): small 3/3/2rem; medium 5/4/3rem; large 8/6/4rem.

### 1d. Spacing
1. Spacing wrapper (2 classes): `padding-[direction]` + `padding-[size]` or `margin-*`. Directions: top, bottom, left, right, vertical, horizontal. Direction class must be created before size class (specificity).
2. Spacing block (1 class): `spacer-[size]` = `width:100%; padding-top:[size]`.

Scale (desktop rem): tiny .125, xxsmall .25, xsmall .5, small 1, medium 2, large 3, xlarge 4, xxlarge 5, huge 6, xhuge 8, xxhuge 12, custom1 1.5, custom2 2.5, custom3 3.5, 0. Responsive scaling built in (medium 2→1.5→1.25; xxhuge 12→8→4.5). `spacing-clean` = margin:0; padding:0.

Rules: responsive combos only on `spacer-` (`spacer-large is-mobile-small`); never a third class on the 2-class wrapper. Custom class when unique/recurring. v2.1: prefer grid/flex `gap` on a parent over spacers; fewer divs.

### 1e. Sizing units
- Everything in rem; root default 16px (no 62.5% trick). Exceptions: borders in px; 0.125rem tiny gaps fine.
- Never vw/vh for sizing. Fluid scaling only via html font-size per breakpoint ("Fluid Responsive", optional).

### 1f. Typography
- HTML tags are default: style h1–h6, p, a on the tag, no class. Classes only for deviations.
- Cloneable defaults: body 1rem/1.5; h1 4rem/1.1; h2 3rem/1.2; h3 2rem/1.2; h4 1.5rem/1.4; h5 1.25rem/1.5; h6 1rem/1.5; weight 700; margin 0. Mobile-L: h1 2.5, h2 2, h3 1.5, h4 1.25, h5 1, h6 .875.
- `heading-style-h1…h6` only to make a semantically-correct tag look like another level.
- `text-size-large` 1.5rem (1.25 mobile), `-medium` 1.25, `-regular` 1, `-small` .875, `-tiny` .75.
- `text-weight-light/normal/medium/semibold/bold/xbold` (300–800).
- `text-style-allcaps/italic/link/muted/nowrap/quote/strikethrough/2lines/3lines`; `text-align-*`; `text-color-primary/secondary/alternate`.
- `text-rich-text` on every Rich Text element.
- Don't stack 3–4 text utilities; make a custom or a new utility.

### 1g. Colors and Variables
- Only color variables shipped ("no breakpoint feature on the variables panel").
- Two tiers, `Folder/Name` → `--folder--name`:
  - Primitives: `--base-color-brand--blue(-light/-dark)`, `--base-color-neutral--black/white/neutral-lightest…darkest`, `--base-color-system--success-green/error-red/warning-yellow/focus-state`.
  - Semantic: `--background-color--background-primary/secondary/tertiary/alternate/success/warning/error`, `--text-color--text-primary/secondary/alternate/…`, `--border-color--border-primary/secondary/alternate`, `--link-color--link-primary/…`.
- Classes bind to semantic tokens only. `.background-color-primary` also sets `color: var(--text-color--text-alternate)`.

### 1h. Combo/stacking rules
- 1–2 ideal, 3 questionable, 4 max, 5+ forbidden → custom class.
- Stack similar classes only (margin with margin, type with type).
- Never add styles while a stack of globals is selected.
- Combo must inherit meaningfully; else flat class (`container-large`, not `container is-large`).
- Escape routes: merge into custom class, merge into combo, nest a div.

### 1i. Responsive
- Webflow default breakpoints only: base, ≤991, ≤767, ≤479. No larger-breakpoint rules in cloneable.
- `hide`, `hide-tablet`, `hide-mobile-landscape`, `hide-mobile-portrait`; `max-width-full-*`. `show-*` removed in V2.
- Responsive tweak to a global → `is-` combo or custom class, never edit the utility at a breakpoint.

### 1j. Other utilities
`max-width-xxlarge` 80rem … `-xxsmall` 12rem, `-full`; `icon-height-small/medium/large` 1/2/3rem; `icon-1x1-*`; `overflow-*`; `z-index-1/2`; `layer`; `align-center`; `pointer-events-*`; `display-inlineflex`; `aspect-ratio-square/portrait/landscape/widescreen`; `button` + `is-secondary/is-text/is-small/is-large/is-icon/is-brand`; `button-group`; `inherit-color`.

### 1k. Global styles embed
HTML Embed (`global-styles`, as component) in `page-wrapper`: font smoothing, `*[tabindex]:focus-visible`, rich-text first/last-child margin reset, `margin:auto !important` on containers, `!important` hide/margin-0/direction classes, `.inherit-color`, Fluid Responsive CSS if used.

### 1l. Semantic HTML / accessibility
`nav_component`→`<nav>`, `main-wrapper`→`<main>`, `section_*`→`<section>`, plus header/footer/article/aside/figure/address. One h1, no skipped levels. Focus states, tabindex, aria-*, `.fs-a11y_visually-hidden`, div-buttons need role + keyboard.

### 1m. CMS
No official CMS naming section. Inference: `team-list_component`, `client-slider_grid`, `faq_item`. `-list`/`-item` suffix guidance is third-party.

### 1n. Interactions naming
`Element [Action State]`, Title Case: `Nav Menu [Open]`, `Button Arrow [Move In]`.

## 2. Version
- Current: 2.1 (9 Jan 2023). No release since. "Client-First v3" does not exist officially.
- 2.1: color variables + Variables page; padding-section on padding-global div; prefer gap; aspect-ratio classes; inherit-color.
- 2.0: page-padding→padding-global; section-[id]→section_[id]; show-* removed; heading-style-h#; folders; component keyword.
- Caleb Raney (Jul 2026): Client-First "lacks native support for ... variable modes and components."
- Attributes V2 (2025, `fs-list-element="list"`), Finsweet Components app: separate products.

## 3. Gaps: native Components, props, slots, variants, Variables
| Topic | Official guidance | Gap |
|---|---|---|
| Native Components | None ("component" = class group `x_component`) | Which groups become Components; naming Component vs class folder |
| Props | None | Prop naming, CMS-bound props, defaults |
| Slots | None | Whether/how to use; nesting with padding-global/container |
| Variants | None; only `is-` combos | Variant vs `is-` policy |
| Variables | Colors only; two tiers; no size/type vars; no modes | Add spacing/type/radius vars? Modes for themes? |
| Larger breakpoints | Nothing | Style 1280/1440/1920? |

## 4. Anti-patterns
1. Deep stacking 4–5+. 2. Adding styles while stack selected. 3. Mixing categories in a stack. 4. Wrong creation order of direction/size. 5. Styling `section_*` heavily; margin on sections. 6. Heading tags chosen for looks; skipped levels. 7. Classes on every heading/paragraph. 8. `container is-large`; `show-*`. 9. Layout utility systems; abbreviations. 10. px / vw/vh. 11. Page-name folders on reusable elements. 12. Wrapper-div bloat; spacer hunting; Relume class names (`header54`) kept. 13. Missing `text-rich-text`, `spacing-clean`.

## 5. Questions for the user (docs can't answer)
1. Baseline: stock 2.1 cloneable, own fork, or Relume starter? padding-section on padding-global div or separate?
2. Relume: used? keep or rename Relume class names?
3. Variables scope: colors only or also spacing/type/radius/containers? Naming? Modes for dark/light/brand?
4. Native Components: which class groups become Components? Naming? Library?
5. Props/slots/variants: prop naming; slots used? native variants vs `is-` combos?
6. Units: strict rem? Fluid Responsive / clamp? px exceptions?
7. Breakpoints: only 4, or 1280/1440/1920 too? `is-mobile-*` combos?
8. Section/component granularity; element vocabulary (wrapper, content, layout, grid, list, item)?
9. Spacing habits: spacers, wrappers, or gap first?
10. CMS naming conventions; template pages?
11. Finsweet Attributes V2 or legacy? Standard solutions?
12. Finsweet Extension / Components app reliance?
13. Global styles embed: stock or extended?
14. Dark sections: add-on class, utilities, or modes?
15. Active deviations: abbreviations tolerated, extra utilities (`radius-*`, `shadow-*`), container sizes?

## URLs
Docs: https://finsweet.com/client-first/docs · core-structure-strategy · classes-strategy-1 · classes-strategy-2 · folders · folders-strategy · spacing-strategy · sizes-and-rem · typography-strategy · utility-class-systems · variables · fluid-responsive · global-styles-embed · css-specificity · semantic-html-tags · accessibility · interactions-naming · changelog · v1-to-v2 · quick-guide. Cloneable: https://client-first-cloneable.webflow.io/ · Attributes: https://finsweet.com/attributes · Raney: https://www.calebraney.com/post/which-webflow-framework-should-i-use-for-my-project · BRIX: https://brixtemplates.com/blog/what-is-the-best-webflow-class-system · digidop 2.1: https://www.digidop.com/blog/version-2-1-of-client-first-whats-new
