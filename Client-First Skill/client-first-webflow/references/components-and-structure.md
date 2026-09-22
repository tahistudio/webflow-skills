# Client-First — structure, components, CMS, library imports

## Base Structure page

Every project keeps a draft page named Base Structure holding the empty skeleton to duplicate:

```
page-wrapper
  [Global Styles]
  [Navbar]
  main-wrapper (main)
    section (section_placeholder)
      padding-global padding-section-large
        container-large
  [Footer]
```

New pages are created by duplicating it, then renaming `section_placeholder` to the real section name. Navbar sits directly above `main-wrapper`; Footer directly below. Never inside `main-wrapper`, never before Global Styles.

## Section recipe

```
section.section_features  color-scheme-dark            ← scheme via utility, no own styles
└─ div.padding-global.padding-section-large             ← both on one div
   └─ div.container-large
      └─ div.feature_component                          ← the block; a native component if reused
         ├─ div.feature_heading-wrapper
         │  ├─ h2                                        ← tag styles, no class
         │  └─ p.text-size-medium
         └─ div.feature_grid                             ← grid with gap, ratio columns, a row
            └─ div.feature_item  (× n)
```

- Heroes may drop `container-large` for full-bleed media, but keep `padding-global` for text.
- Single-page sections still follow the recipe; their folder may be the page name only when hyper-specific (`contact_form`).
- Give every section an ID matching its folder (`features`) for anchor links and for interaction targeting.

## Native components in Client-First

The class group `x_component` is the copy-pasteable unit. Anything that repeats also becomes a native component:

| Class root | Component name | Group |
|---|---|---|
| `nav_component` | Navbar | Global |
| `footer_component` | Footer | Global |
| `cta_component` | CTA Band | Global or Sections |
| `hero_component` | Page Hero | Sections |
| `faq_component` | FAQ Section | Sections |
| `testimonial_component` | Testimonials Section | Sections |
| `card_component` | Card | Cards |
| `button` | Button | Button |

Rules:

- Component name is the folder in Title Case plus what it is. Group by kind: Global, Sections, Cards, Button, Forms, CMS, Utility.
- Description states where it is used and what is editable ("Identical on every page; no content props by design", "Do not place directly on a page").
- Props grouped and tooltipped: a Settings group (Visibility, ID), then Content in DOM order, then per-nested-component groups. Alt text as a prop beside every image prop. Heading tag exposed only when the section is used at different levels.
- Classes and Style props only on client sites, never on templates.
- Variants for look (Base, Dark, Tinted, Image Left); `is-` combos stay for state and for the style guide.
- Sub-components carry the client controls: a Card exposes its Button's variant, its scheme and its spacing as dropdowns; helper parts end in ` (dev)`.
- Duplicate a component and its classes together; never share `x_component` classes between two components.

### The button

```
Button  (props: Text, Link, Size variant; description "The only button to use anywhere on the site")
└─ Button Content  (variants: Primary, Secondary, Light, Outline, Link, Link Alternate; Icon image prop)
   └─ Button Layout  (variants: Normal, Reversed)
```

Button Content and Button Layout carry "Do not place directly on a page" and end in ` (dev)`. Delete or retire any competing button classes (`button-1`, `btn`, `button is-white`) once the component exists; leave `button is-*` only on the style guide page.

### Repeaters

- Small, fixed: numbered prop groups (`FAQ 1` … `FAQ 8`) each with Question, Answer and a Show toggle. Conditional visibility hides empty items.
- Larger or variable: an open section whose grid takes one item component per entry (`FAQ Item`), or a CMS list.
- CMS-driven sections expose Filters, Sort and Max Items as props.

## Variables and modes

Collections: Colors (primitives), Color Scheme (semantic, modes Base and Dark), Typography (families, sizes, weights, line heights, modes per breakpoint), Font Styles (one mode per role if a role engine is used), Sizes (Section Space, Space, Max Width, Container, Site Padding), UI (Radius, Stroke), Shadows (two-layer, size modes). Title Case, foldered, ramps ordered.

`heading-style-*` and tag styles bind to the type variables; do not override line-height or letter-spacing on those classes with literals.

## CMS

- Collection names Title Case with correct singular and plural ("This is a collection of Blog Posts", "Create a new Blog Post"). Slug singular or plural, either is acceptable, but consistent across the project.
- Field names sentence case with help text saying how the field is used ("Feeds the structured data offer", "Set by the sync. Do not edit by hand").
- Reference and multi-reference for relationships; option fields for fixed values; required flags on essentials; conditional visibility for optional fields.
- Classes: `blog_list`, `blog_item`, `blog_item-image`, `blog_item-title` — folder is the content type.
- Schema-only fields are named `Schema …` and documented as such.
- Template pages bind SEO title, description and Open Graph to fields.

## Importing library (Relume) sections

Library sections are raw material. Every import runs this procedure before it counts as built:

1. Check whether an existing section on the site already covers the need. Reuse beats import.
2. Paste into a scratch page, never directly into a live page.
3. Rename every class to the grammar: `layout234_item` → `feature_item`; `header54_component` → `hero_component`. Fold duplicates into existing classes where the styles match.
4. Strip every Classic interaction it carries. Rebuild only the motion the design needs, natively.
5. Rebind colours, type, spacing and radius to the project's variables and utilities; snap sizes to tokens.
6. Replace its buttons with the project Button component; replace its headings with tag styles or `heading-style-*`.
7. Remove empty divs and unneeded wrappers; confirm the `section_ > padding-global padding-section-* > container-*` skeleton.
8. If the block will repeat, make it a native component before placing it.
9. Move it onto the page, check at every breakpoint, delete the scratch copy.

## Attributes and code

- Finsweet Attributes V2 loaded once in site head on client sites; each solution configured through `fs-*` attributes on elements. Never on templates.
- Own scripts, when used instead, live in the component they serve or in Global Styles per the placement rules, hosted as registered scripts with a version.
- Tracking and consent in site head with a dated comment. Nothing else at site level.

## Style guide page

Draft, `noindex`. Sections in this order: utilities (structure classes, spacing, max widths, typography sizes and styles, colour utilities, buttons and `is-` variants, shadows, radius, icons, forms), then variables (swatches and ramps), then components (one instance of each). Keep it current: every new utility gets an example here or cleanup purges it.
