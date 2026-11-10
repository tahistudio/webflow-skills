---
name: client-first-webflow
description: "Build and edit Webflow sites on Finsweet's Client-First V3 (with V2 legacy and upgrade path), including projects from the Client-First starter or assembled from Relume sections: core structure, native Section with padding from variables, class naming and folders, utility versus custom classes, combined spacing classes and gap, typography, the Base, Theme, Typography, Layout and Sizes variable collections, Global / Styles and Template components, Group / Identifier component names, interactions, Relume imports, QA and the Client-First launch checklist. Use whenever a project shows Client-First classes (page-wrapper, main-wrapper, section_, container-large, padding-bottom-medium, text-size-, heading-style-, grid-autofit, is- combos), or the user says 'Client-First', 'Finsweet', 'Relume', 'launch checklist' or asks how to structure or name things in Webflow without a framework named. Read tahi-webflow-core first; this skill adds the Client-First rules."
---

# Client-First in Webflow (V3)

Client-First is a naming and structure system built for the Webflow Designer. V3 puts Webflow Variables underneath everything, flattens the core structure, merges spacing direction and size into one class, and adds template components for pages and sections. This skill is the official V3 rule set plus the way Tahi extends it with native components, Relume sections and agency QA.

Read `tahi-webflow-core` first. Detail lives in:

- [references/finsweet-client-first-v3.md](references/finsweet-client-first-v3.md): Finsweet's official V3 rules for agents, verbatim. It is the base rule set. Read it in full before the first change to any Client-First project. Where this SKILL.md states a Tahi override, the override wins.
- [references/class-reference.md](references/class-reference.md): every V3 utility family, scales, variable collections and naming grammar. Read before creating or renaming any class or variable.
- [references/components-and-structure.md](references/components-and-structure.md): core structure, template components, Global / Styles, native components and props, the nested button, CMS, Relume import procedure. Read before building a page or component.
- [references/v2-to-v3-migration.md](references/v2-to-v3-migration.md): how to recognise a V2 project, what changed, and how to work in or upgrade one. Read whenever the project shows V2 markers.
- [references/launch-checklist.md](references/launch-checklist.md): Finsweet's Client-First launch checklist, adapted for MCP checks. Run it before any client handoff or go-live.

## First: which version is this project?

Read the project before writing to it (styles, variable collections with groups and modes, components).

- **V3 markers**: variable collections named Base, Theme, Typography, Layout, Sizes; `padding-bottom-medium` style classes; `gap-*` and `grid-autofit*` utilities; components named `Global / Styles`, `Template / Section`, `Template / Core Structure`; sections built from the native Section element with padding on `section_*`.
- **V2 markers**: `spacer-*` classes; two-class spacing wrappers (`padding-bottom padding-medium`); `layer`; colour-only variables named `Base Color Brand/...` or `--base-color-brand--blue`; a single `global-styles` embed; `padding-global padding-section-*` on every section.

Work in the version the project uses. Never mix V2 and V3 patterns inside one project. Upgrading a V2 project is a restructure: ask first, then follow the migration reference.

## The starter is structure, not design

Starter values (colours, fonts, sizes, spacing, content) are placeholders. Keep the structure, replace the values from the user's design source (Figma, brand guidelines, instructions). If no design source is given, ask before styling. Never bend the design to fit starter values.

## Core structure

Default V3 structure, used on every page unless the user says otherwise:

```
page-wrapper
├─ Global / Styles                 component, two embeds (default + custom)
├─ Global / Nav                    component, directly above main-wrapper
├─ main-wrapper  (<main>)
│   ├─ section_hero                native Section element (<section>, or <header> for a page header)
│   │   └─ container-large
│   │       └─ hero_component …
│   ├─ section_features
│   └─ section_cta
└─ Global / Footer                 component, directly below main-wrapper
```

- Padding goes directly on `section_[identifier]` through variables: `padding-left` and `padding-right` bound to Layout › Spacing › `global-padding`; `padding-top` and `padding-bottom` bound to Layout › Section Padding › `small`, `medium` or `large` (different variables for uneven top and bottom).
- Never stack `padding-global` or `padding-section-*` as combos on a `section_*` class.
- Alternative structure, only when a section needs padding as its own layer: `section_x > padding-global padding-section-[size] > container-[size]`. `padding-section-[direction]-[size]` handles uneven padding there.
- Start new pages by unlinking `Template / Core Structure` and new sections by unlinking `Template / Section`. Never edit the template components themselves. If unlinking is not possible through the MCP, build the same structure by hand.
- Beyond padding, keep section styling light. Shared section looks (a dark theme) come from a global class stacked on the section (`theme-dark`, `section-style-dark`), not repeated styles.
- `page-wrapper` holds page-wide styles; `body` keeps only typography and background colour. Warn before adding `overflow: hidden` to `page-wrapper`; it breaks `position: sticky` everywhere inside.

## Naming grammar

| Kind | Form | Examples |
|---|---|---|
| Utility | dashes only, no underscore | `text-size-large`, `padding-bottom-medium`, `hide-tablet` |
| Custom | `folder_element-name` | `hero_component`, `hero_heading-wrapper`, `testimonial_card-image` |
| Component root | `folder_component` | `nav_component`, `faq_component`, `clients-slider_component` |
| Combo | `is-` prefix, only on its base | `button is-secondary`, `faq_item is-open` |
| Section | `section_identifier` | `section_hero`, `section_pricing`, `section_faq` |

- Lowercase, dashes between words, no abbreviations (`background`, not `bg`; `button`, not `btn`), general to specific (`text-size-large`).
- Name a class by where it is used, not where it sits. An element reused across sections, pages or components gets its own general class.
- One underscore per folder level; usually one level, occasionally two. One folder strategy across the project.
- Rename anything that arrives generic (`Div Block 47`) or numbered (`layout234_item`) before styling it.

**Tahi override, page names in folders.** Finsweet allows a page-prefixed folder whenever a class is used on one page only (`home-slider_arrow`). We are stricter: name by what the thing is (`hero_`, `slider_`, `testimonial_`). A page name is allowed only when the thing is inseparable from that page and hyper-specific: `contact_form`, `pricing_cards`, `blog_list`, `casestudy_*`. Never `home_`, `about_` or library block numbers.

## Class strategy

Order of preference:

1. **Existing utility** where it fits.
2. **Custom class first, utility on top** (V3 recommended pattern): `home-header_text text-size-large`. The custom class holds the instance styles; the utility stays under global control.
3. **Custom class only**, every value bound to a variable.
4. **Combo on utilities** (`text-size-large is-home-header`) when certain properties must stay globally controlled.
5. **New utility** only when it manages an important style globally or speeds up building. Follow the family's keyword pattern so Finsweet Extension groups it (`shadow-box-small / medium / large`). Add it to the style guide.

Stacking: one or two classes is the norm, three needs a reason, four is the hard maximum. Stack like with like (spacing with spacing, type with type). Never add a style while a stack of utilities is selected (it creates an accidental combo). Never edit a utility to fix one element; if a utility must change globally, say which class and that it affects the whole project, and ask first.

Combos only when the variant inherits something worth managing globally (`button is-secondary`). Otherwise a flat class (`container-large`, not `container is-large`). On built pages prefer a component variant over an `is-` combo for a visual switch; keep `is-` for state (`is-open`, `is-active`) and the style guide.

Layouts: no flex, column or breakpoint layout utilities. Custom classes with flex or grid, plus the V3 grid utilities on top of a custom class (`team_list grid-autofit-small`). A clear project layout system (`grid_col-2`, `grid_col-3` with `is-` exceptions) is acceptable.

## Spacing

- Every value comes from Layout › Spacing variables. Scale: `0`, `xxtiny` .25, `xtiny` .5, `tiny` .75, `xxsmall` 1, `xsmall` 1.25, `small` 1.5, `medium` 2, `large` 3, `xlarge` 4, `xxlarge` 5, `huge` 6, `xhuge` 8, `xxhuge` 12rem (defaults; read the project). Variable modes scale it down on tablet and mobile; never add breakpoint spacing styles for what a mode already handles.
- Classes: `margin-[size]`, `padding-[size]`, `margin-[direction]-[size]`, `padding-[direction]-[size]` (one class: `padding-bottom-medium`), `gap-[size]`, `spacing-clean`. Directions: top, bottom, left, right, horizontal, vertical.
- Between headings, paragraphs and buttons: a spacing block (empty div with one spacing class) or a spacing wrapper. Never spacing classes on text elements.
- Equal space between children, button rows, a button with an icon: gap on the parent. Inner padding of cards and items: padding on the custom class.
- Never `spacer-[size]`, `margin-custom[n]`, `padding-custom[n]` or `layer`, even if the project still has them.
- Section padding has its own scale (Section Padding group) separate from this one.

## Typography

- Body and H1 to H6 tag styles are the defaults, bound to the Typography collection (Body and H1 to H6 groups). Most text has no class.
- Choose the heading tag for document structure; `heading-style-h1…h6` only to make a correct tag look like another level. Never a heading tag on non-heading text.
- Deviations: `text-size-*`, `text-weight-*`, `text-color-*`, `text-align-*`, `text-style-*` (including V3 `balance`, `pretty`, `1line`, `2lines`, `3lines`), and the inherit classes (`text-color-inherit`, `text-size-inherit`, `text-weight-inherit`, `text-decoration-inherit`).
- A typography stack that repeats becomes one grouped class bound to the same variables (`text-style-subtitle`). Custom text classes are uncommon and bound to Typography variables.
- `text-rich-text` on every Rich Text element; style its content through nested tag selectors, never classes inside it.
- rem everywhere (`24/16rem` works in inputs); 1px borders stay px; no vw or vh for type or spacing. Fluid responsive only when the user asks.

## Variables

Five collections, each value set once and linked (not copied):

| Collection | Holds | Modes |
|---|---|---|
| Base | primitives: Brand, Neutral, Others colours; Font Family, Font Weight, Line Height, Letter Spacing | none |
| Theme | semantic colour: Background, Border, Link, Text, Button Primary, Button Secondary, System | Base, Dark Mode |
| Typography | Body, H1 to H6, Font Size | Desktop, Tablet, Mobile Landscape |
| Layout | Spacing, Section Padding | Desktop, Tablet, Mobile Landscape |
| Sizes | Max Width, Container, Grid Columns, Border Radius, Focus, Icon | Desktop |

- Classes bind to semantic tokens (Theme, Typography), not primitives. New colour: primitive in Base first, then a semantic variable that references it.
- Use the group that matches the property (Background on `background-color`, Text on `color`, Spacing on padding, margin and gap).
- Groups Title Case; variable names lowercase with dashes, no repeated group name (`Background › primary`, not `background-primary`), except where the Style panel needs context (`h2-font-size`). Never name a semantic variable after a colour.
- Responsive values change per mode in the Variables panel, not with breakpoint styles. Theme switches through the Style panel or a `theme-dark` utility.
- Custom code references a variable by its exact CSS name copied from the project (`--brand--blue`, `--_theme---text--primary` by default). Never hand-build it.
- Before creating a variable, check one with the same purpose or value does not exist. Report every variable created.

**Tahi override, variable names.** Variable names are Title Case with spaces on every Tahi starter (template, client-site and white-label), not V3's lowercase: `Primary`, `Background Hover`, `H2 Font Size`. The Marketplace requires it for templates, and keeping all three starters identical lets fixes and components copy between them without renaming. When working on an outside project that already uses V3 lowercase names, keep its convention.

## Components and interactions

- Webflow components are named `Group Name / Component Identifier`, each word capitalised: `Global / Nav`, `Global / Footer`, `Global / Styles`, `Card / Blog Post`, `Form / Contact`, `Modal / Video`, `Section / CTA`. Common groups: Global, Template, Card, Form, Section, Modal, Component, plus Tahi's Button group.
- The slash does not create a group. Create the group in the Components panel and move the component into it; if the MCP cannot, tell the user exactly which groups to create and what goes in each.
- The component name and its wrapper class are separate: `Card / Blog Post` wraps `blog-card_component`.
- Anything appearing more than once becomes a native component. Props, slots and variants follow the core rules and the components reference. The nested button (Button › Button Content › Button Layout) is the only button. A Classes prop is exposed on client sites only.
- Interactions: `Element [Action State]`, Title Case, actions and states in brackets: `Nav Menu [Open]`, `Button Arrow [Move In]`, `Image [Show Scroll In]`. No trigger in the name unless essential (`Discount Modal [Delay On Load]`). Breakpoint-only interactions get a second bracket: `Nav Sidebar Slide [Show] [Mobile]`. Templates use Webflow's sentence-case GSAP names instead (see the template skill).

## Global styles

- `Global / Styles` sits on every page with two embeds: `global-styles_default` (Finsweet's CSS) and `global-styles_custom` (project CSS). Add project CSS to the custom embed only. Never edit or delete default snippets unless the user asks.
- Default snippets: text clarity, focus state, text selection, rich text first and last margin removal (on); pointer cursor, form reset, inherit typography, highlight empty links (off). Enable an off snippet by removing its comment tags, keeping its note. Do not enable inherit typography unless asked; it breaks All Links styling.
- Change focus and selection looks through Sizes › Focus and Theme › System variables, not by editing snippets.
- Templates cannot ship these embeds; see the template skill.

## Semantic HTML and accessibility

`main` on `main-wrapper` (one per page), `section` on every section (each with a heading), `header`, `footer`, `nav`, `article`, `aside`, `address`, `figure` where they fit. One H1, no skipped levels. Native links to navigate, buttons for actions. Visible focus on every focusable element. `aria-label` on icon-only controls, `aria-hidden="true"` on decorative icons and SVGs, `aria-expanded` with `aria-controls` on toggles, `aria-current="page"` on current-page links. Do not duplicate ARIA that a tag or native Webflow component already provides. Native Webflow elements (Navbar, Tabs, Slider, Dropdown, Lightbox, Forms, Collection Lists) by default.

## Relume and library sections

Library sections are raw material. On import: rename every class to the grammar, strip every Classic interaction, convert any V2 patterns (spacers, two-class wrappers, `layer`, padding wrappers) to V3, rebind values to the project's variables, replace buttons with the project Button component, and check whether an existing section already covers the need. Procedure in the components reference.

## Attributes and code

- Finsweet Attributes V2 on client sites, loaded once in site head with `defer`. Own code may replace it. Never on templates.
- Project CSS goes in `global-styles_custom`, not Page or Site Settings, so it stays visible in the Designer. Page-only scripts stay on that page.
- Code placement otherwise follows the core rules.

## MCP working rules

- Confirm the site and page. Read the project first. Reuse classes, variables and components; check a class name is free before creating it.
- Ask before: renaming or deleting any class, variable, component or page; editing a utility class, a variable value, `global-styles_default` or a template component; restructuring existing pages or sections; publishing.
- After changes, report classes created, variables created or linked, components created, and anything with a global effect. If a rule could not be followed (including an MCP limitation), say which and why.

## Workflow for a new Client-First build

1. Audit: version, collections and modes, utilities, components and groups, what the starter provides.
2. Foundation: replace starter variable values with the design's, extend utilities and the style guide, build `Global / Nav`, `Global / Footer`, the Button and `Section / CTA` components, confirm `Global / Styles` and the template components.
3. Pages from `Template / Core Structure`; sections one at a time from `Template / Section`: `section_name > container-* > name_component`, padding from variables, built from components where repeated, checked live at every breakpoint.
4. Interactions native GSAP, named per the convention, verified in Preview.
5. QA per the core checklist and the pre-flight list below.
6. Before go-live or handoff, run the [launch checklist](references/launch-checklist.md).

## Pre-flight (every task)

- Design values come from the design source, not the starter.
- Core structure in place; native Section element; section padding from variables.
- Custom classes have an underscore, utilities do not; lowercase, no abbreviations, general to specific; no page-prefixed folders outside the allowed cases.
- No element over four classes; no spacing classes on text; no `spacer-*`, `*-custom[n]` or `layer`.
- Values linked to semantic variables, not primitives or hard-coded.
- One H1, no skipped levels, semantic tags set, keyboard and focus work.
- Components follow `Group / Identifier` and sit in the matching group; interactions follow `Element [Action State]`.
- No utility, `global-styles_default` or template component edited without approval.
- A summary of changes given to the user.

## Anti-patterns

- Mixing V2 and V3 patterns in one project; upgrading without asking.
- Treating the starter as the style guide.
- `padding-global padding-section-*` combos on `section_*`; Div Block sections without the `section` tag.
- `spacer-*`, two-class spacing wrappers in V3, `layer`, margin on buttons for spacing, spacing classes on text.
- Editing a utility for one element; restyling a utility at a breakpoint; five-class stacks; mixed-category stacks; accidental combos.
- Primitives linked directly to classes; colour-named semantic variables; breakpoint styles for values a mode handles; hand-built CSS variable names.
- Page-prefixed or numbered folders (`home_hero`, `layout9_item`); parallel prefixes for one thing.
- Tag chosen for size; classes on every heading; classes inside Rich Text.
- Layout utility systems (`grid-3-col`, `flex-center`); abbreviations.
- Component names without a group, or in a group that does not match; editing template components to build content.
- Library sections kept with their block numbers, V2 spacing or Classic interactions.
