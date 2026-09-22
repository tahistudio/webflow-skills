---
name: client-first-webflow
description: "Build and edit Webflow sites on Finsweet's Client-First system, including projects started from a Relume-style starter or assembled from Relume library sections: page structure, section skeleton, class naming and folders, utility versus custom classes, spacing and typography systems, variables and modes, native components with props, slots and variants, CMS naming, Finsweet Attributes, and QA. Use whenever a Webflow project shows Client-First classes (page-wrapper, main-wrapper, section_, padding-global, container-large, padding-section-, text-size-, heading-style-, is- combos), whenever the user says 'Client-First', 'Clientverse', 'Relume', 'Finsweet' or asks how to structure or name things in Webflow without a framework named. Read tahi-webflow-core first; this skill adds the Client-First rules."
---

# Client-First in Webflow

Client-First is a naming and structure system, not a stylesheet. It gives every class a readable, client-safe name, standardises the page and section skeleton, and separates global utilities from component-specific custom classes. This skill encodes the official system plus the way we extend it with native components, variables, modes and Relume sections.

Read `tahi-webflow-core` first. Detail lives in:

- [references/class-reference.md](references/class-reference.md) — every utility family with its scale and the naming grammar. Read before creating or renaming any class.
- [references/components-and-structure.md](references/components-and-structure.md) — page skeleton, section recipe, native components in Client-First, the nested button, repeaters, CMS, Relume import procedure. Read before building a page or component.

## Page skeleton

```
Body
└─ page-wrapper
   ├─ [Global Styles]              HTML embed component with site-wide CSS
   ├─ [Navbar]                     component, directly above main-wrapper
   ├─ main-wrapper  (<main>)
   │   ├─ section_hero  (<header> or <section>)
   │   │   └─ padding-global padding-section-large
   │   │       └─ container-large
   │   │           └─ hero_component …
   │   ├─ section_features
   │   └─ section_cta
   └─ [Footer]                     component, directly below main-wrapper
```

- `padding-section-*` sits on the same div as `padding-global`. One wrapper, not two.
- `section_*` classes carry no styles of their own. Colour schemes and backgrounds come from utility combos stacked on the section (`section_hero color-scheme-dark`, `section_cta background-color-secondary`).
- Navbar and Footer are components, in those positions, on every page. The CTA band is a component too.
- Global Styles is a component holding one HTML embed. Site-wide CSS lives there, never in page or site code.

## Naming grammar

| Kind | Form | Examples |
|---|---|---|
| Utility | hyphens only, no underscore | `text-size-large`, `padding-section-medium`, `hide-tablet` |
| Custom | `folder_element-qualifier` | `hero_component`, `hero_heading-wrapper`, `testimonial_card-image` |
| Component root | `folder_component` | `nav_component`, `faq_component`, `card_component` |
| Combo | `is-` prefix, stacked on its base | `button is-secondary`, `faq_item is-open` |
| Section wrapper | `section_name` | `section_hero`, `section_pricing`, `section_faq` |

- Lowercase. No abbreviations. Words in general-to-specific order (`text-size-large`, not `large-text`).
- Folder is what the thing is: `hero`, `feature`, `cta`, `testimonial`, `pricing`, `faq`, `nav`, `footer`, `blog`. Never a page (`home_`, `about_`) and never a library block number (`layout234_`). A page name is allowed only when the thing is inseparable from that page and hyper-specific: `contact_form`, `pricing_cards`, `blog_list`.
- One underscore per folder level. Keep it to one, occasionally two, levels.
- Rename anything that arrives generic (`Div Block 47`, `Heading 3`) or numbered before styling it.

## Utilities, then variables, then custom

1. Existing utility. The reference lists every family. If a utility does the job, no custom class.
2. Variable bound to a native property.
3. New utility, added to the style guide, when the value will recur. Keep the family's grammar (`shadow-medium`, `radius-small`, `text-color-brand`).
4. Custom class defined on one component only.

Stacking: one to two classes ideal, three fine, four maximum. Stack like with like (spacing with spacing, type with type). Never add a style while several utilities are selected. Never restyle a utility at a breakpoint; use an `is-` combo or a custom class instead.

## Spacing

- Section padding: `padding-section-small | medium | large` on the `padding-global` div, values from the Section Space variables.
- Inside sections: gap on the parent (`grid` or `flex` gap) first. Spacer blocks (`spacer-small` and so on) or padding wrappers (`padding-bottom padding-medium`) only when gap cannot express it.
- Wrapper pattern is exactly two classes, direction then size. Responsive tweaks only on single-class spacers via combos (`spacer-large is-mobile-small`).
- All values rem. Borders may be 1px.

## Typography

- Tags carry the default styles: H1 to H6, All Paragraphs, lists, blockquote, figure, links, bound to variables. Most headings have no class at all.
- `heading-style-h1…h6` exist only to make a semantically correct tag look like another level. Never pick a tag for its size.
- `text-size-*`, `text-weight-*`, `text-style-*`, `text-align-*`, `text-color-*` for deviations. Three or more type utilities on one element means make a custom class or a new utility.
- `text-rich-text` on every Rich Text element; unique rich text styling via a class on the Rich Text and its tag selectors.
- Units rem. Fluid `clamp()` values are allowed on client sites via variables; templates stay on stock stepped values.

## Variables and colour

- Variables for everything: colours, spacing, section space, container widths, max widths, type sizes and weights, radius, shadows. More tokens beat fewer.
- Two tiers where theming matters: primitives (`Brand Colors/Primary`, `Neutral Colors/Lightest`) and semantic aliases (`Color Scheme/Background`, `Color Scheme/Text`). Raw hex on a primitive is fine; shades may alias a base colour or be set directly.
- Title Case names with folders. Ramps ordered light to dark, small to large.
- Responsive values use variable modes bound to Tablet, Mobile Landscape and Mobile Portrait.
- Alternate schemes use a mode switch on a `color-scheme-dark` (or `-light`) utility that sets background and text from the scheme aliases. That utility is the only sanctioned dark-section mechanism; no JavaScript theme toggles.

## Native components

Client-First's "component" (`x_component`) is a class group. On top of that, anything appearing more than once becomes a native Webflow component with the same name in Title Case: class `testimonial_component`, component "Testimonial". Props, slots and variants follow the core rules and the reference. The nested button (Button holds Button Content holds Button Layout) is the only button. A Classes prop is exposed on client sites only; templates get nothing hyper-technical.

## Responsive

- Webflow's standard breakpoints. Desktop-first; override downward at Tablet (≤991), Mobile Landscape (≤767), Mobile Portrait (≤479). Enable 1280, 1440 and 1920 when the design needs control there; decide once.
- Utilities pre-scale at the breakpoints. Responsive changes to a global element go on an `is-` combo or a custom class, never on the utility.
- `hide`, `hide-tablet`, `hide-mobile-landscape`, `hide-mobile-portrait` for visibility.
- Native Navbar breakpoint set to match; Navbar, Slider and Tabs stay native and need a person to place them.

## Relume and library sections

Library sections are raw material, not finished work. When one is pulled in: rename every class to the semantic grammar, remove every Classic interaction it carries, re-bind values to the project's variables, snap sizes to the project's tokens, replace its buttons with the project Button component, and check whether an existing section on the site already covers the need before adding a new one. Procedure in the reference.

## Attributes and code

- Finsweet Attributes V2 for lists, filters, sliders and similar on client sites, loaded once in site head. Own code may replace it. Never on templates.
- Class ordering in the stylesheet can be fixed with the Finsweet extension when a direction and size utility pair stops applying.
- Code placement follows the core rules: page settings, the owning component, Global Styles, or site settings for tracking only.

## Workflow for a new Client-First build

1. Audit against the reference: which utilities and variables the starter provides, what the project added, existing components.
2. Foundation: variables and modes to the design, snap values per the core tolerance, extend utilities and the style guide, build Navbar, Footer, Button and CTA components, set the Base Structure page.
3. Sections one at a time, each `section_name > padding-global padding-section-* > container-* > name_component`, built from components where repeated, checked live at every breakpoint.
4. Interactions native GSAP, verified in Preview.
5. QA per the core checklist plus: no utility restyled at a breakpoint, no class stacks over four, no page-prefixed folders, every `_component` that repeats is a native component.

## Anti-patterns

- Page-prefixed or numbered folders (`home_hero`, `whym_section-1`, `layout9_item`); parallel prefixes for one thing (`blog_`, `blg_`, `post_`).
- Styling `section_*` directly; margin on sections.
- Restyling a utility at a breakpoint; four-plus stacks; mixed-category stacks; accidental combos from multi-select.
- Tag chosen for size; skipped heading levels; classes on every heading.
- `container is-large` style combos where a flat class exists (`container-large`).
- Layout utility systems (`grid-3-col`, `flex-center`); abbreviations (`col-2-d`).
- Hex in classes; px on type or spacing; vw or vh for sizing.
- Competing button classes alongside the Button component.
- Library sections kept with their block numbers or Classic interactions.
