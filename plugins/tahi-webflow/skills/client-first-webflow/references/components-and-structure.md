# Client-First V3: structure, template components, components, CMS, library imports

## Template components

V3 ships a page template with three components. They replace the V2 habit of a draft "Base Structure" page to duplicate.

| Component | What it holds | How to use |
|---|---|---|
| `Global / Styles` | `global-styles_default` and `global-styles_custom` embeds | live component on every page, first child of `page-wrapper` |
| `Template / Core Structure` | the full page core structure | place on a new page, unlink, rename and fill |
| `Template / Section` | one section's structure | place inside `main-wrapper`, unlink, rename `section_*` and fill |

- Template components are starting points, never live content. Never edit them to build page content. Editing them changes the starting point for every future page: ask first.
- If the MCP cannot unlink an instance, build the same structure by hand and say so in the report.
- Older V3 projects or projects without the template may still use a draft Base Structure page; follow what the project has.

## Core structure

```
page-wrapper
├─ Global / Styles
├─ Global / Nav                                    directly above main-wrapper
├─ main-wrapper (main)
│   └─ section_placeholder (Section element)       padding from variables
│       └─ container-large
└─ Global / Footer                                 directly below main-wrapper
```

Nav and Footer sit outside `main-wrapper`, never inside it and never before Global Styles.

## Section recipe (default)

```
section.section_features  theme-dark               ← native Section; padding L/R = global-padding,
│                                                     T/B = Section Padding › large; theme via utility
└─ div.container-large
   └─ div.feature_component                        ← the block; a native component if reused
      ├─ div.feature_heading-wrapper
      │  ├─ h2                                      ← tag styles, no class
      │  ├─ div.padding-bottom-small                ← spacing block
      │  └─ p.text-size-medium
      └─ div.feature_list  grid-autofit-small       ← custom class first, grid utility on top
         └─ div.feature_item  (× n)
```

- Heroes may drop `container-*` for full-bleed media; text inside still respects `global-padding`.
- Uneven padding: bind top and bottom to different Section Padding variables. One section with unique padding: set it on that section class.
- Give every section an ID matching its identifier (`features`) for anchor links and interaction targeting.

## Section recipe (alternative, more control)

```
section.section_features
└─ div.padding-global.padding-section-large        ← both on one div
   └─ div.container-large
      └─ …
```

Use only when padding must be its own layer (backgrounds that bleed past the padding, sticky children, a padded inner layer). `padding-global` may also sit inside the container or on both sides of it, depending on the layout. Uneven: `padding-section-top-[size]`, `padding-section-bottom-[size]`.

## Global / Styles

- Two embeds. `global-styles_default`: Finsweet's CSS. `global-styles_custom`: everything project-specific. New CSS goes in custom only.
- Several V3 snippets use Webflow's native custom CSS. Keep both embeds even when one looks empty.
- Snippets on by default: text clarity, focus state (driven by Sizes › Focus and Theme › System), text selection colours, rich text first-child top margin removal, rich text last-child bottom margin removal.
- Off by default: pointer cursor, form element reset, inherit typography (breaks All Links styling; enable only when asked), highlight empty links (Designer-only red outline on empty href).
- To enable: remove the comment tags, keep the note. To restyle focus or selection: change the variables, not the snippet. Per-element focus override: Focused (keyboard) state in the Style panel.
- Reference variables in CSS by their exact CSS names copied from the project.

## Native components in Client-First

The class group `x_component` is the copy-pasteable unit. Anything that repeats also becomes a native component named `Group Name / Component Identifier`, sitting in the matching group in the Components panel.

| Class root | Component name | Group |
|---|---|---|
| (embeds) | Global / Styles | Global |
| `nav_component` | Global / Nav | Global |
| `footer_component` | Global / Footer | Global |
| `cta_component` | Section / CTA | Section |
| `hero_component` | Section / Page Hero | Section |
| `faq_component` | Section / FAQ | Section |
| `testimonial_component` | Section / Testimonials | Section |
| `blog-card_component` | Card / Blog Post | Card |
| `team-card_component` | Card / Team Member | Card |
| `form_component` | Form / Contact, Form / Newsletter | Form |
| `modal_component` | Modal / Video | Modal |
| `button` | Button / Button | Button |
| (skeletons) | Template / Core Structure, Template / Section | Template |

Rules:

- Capitalise each word. A new developer must know what it is without opening it. Rename freely when a name stops making sense; instances do not break.
- The slash is only a naming convention. Create the group in the Components panel and move the component into it. If the MCP cannot, give the user the list: group name, then each component to move into it.
- Description states where it is used and what is editable ("Identical on every page; no content props by design", "Do not place directly on a page").
- Props grouped and tooltipped: Settings group (Visibility, ID) first, then Content in DOM order, then per-nested-component groups. Alt text prop beside every image prop. Heading tag exposed only when the section is used at different levels.
- Classes and Style props only on client sites, never on templates.
- Variants for look (Base, Dark, Tinted, Image Left); `is-` combos for state and the style guide.
- Sub-components carry the client controls: a Card exposes its Button's variant, theme and spacing as dropdowns; helper parts end in ` (dev)`.
- Duplicate a component and its classes together; never share `x_component` classes between two components.

### The button

```
Button / Button  (props: Text, Link, Size variant; description "The only button to use anywhere on the site")
└─ Button / Button Content (dev)  (variants: Primary, Secondary, Light, Outline, Link, Link Alternate; Icon image prop)
   └─ Button / Button Layout (dev)  (variants: Normal, Reversed)
```

Colours bind to Theme › Button Primary and Button Secondary. Sub-parts carry "Do not place directly on a page". Retire competing button classes (`button-1`, `btn`, `button is-white`) once the component exists; leave `button is-*` only on the style guide. Buttons in a row or with an icon get gap on the parent, never `margin-right`.

### Repeaters

- Small, fixed: numbered prop groups (`FAQ 1` … `FAQ 8`) each with Question, Answer and a Show toggle; conditional visibility hides empty items.
- Larger or variable: an open section whose list takes one item component per entry (`Card / FAQ Item`), or a CMS list.
- CMS-driven sections expose Filters, Sort and Max Items as props.

## CMS

- Collection names Title Case with correct singular and plural. Slug singular or plural, consistent across the project.
- Field names sentence case with help text ("Feeds the Open Graph image", "Set by the sync. Do not edit by hand"). Group related fields.
- Meta title, meta description and Open Graph image fields where template pages need them; template pages bind SEO and OG to fields.
- Reference and multi-reference for relationships; option fields for fixed values; required flags on essentials.
- Classes: `blog_list`, `blog_item`, `blog_item-image`, `blog_item-title`; folder is the content type. Every Collection List has a styled empty state.
- Schema-only fields are named `Schema …` and documented as such.
- Unused or empty collection template pages are unpublished.

## Importing library (Relume) sections

Every import runs this procedure before it counts as built:

1. Check whether an existing section on the site already covers the need. Reuse beats import.
2. Paste into a scratch page, never directly into a live page.
3. Rename every class to the grammar: `layout234_item` → `feature_item`; `header54_component` → `hero_component`. Fold duplicates into existing classes where styles match.
4. Strip every Classic interaction. Rebuild only the motion the design needs, natively, named per the convention.
5. Convert to V3: Div sections to the native Section element; `padding-global padding-section-*` wrapper removed and its padding moved to the section through variables (unless the alternative structure is justified); `spacer-*` and two-class wrappers to spacing blocks or gap; `layer` to a custom class.
6. Rebind colours, type, spacing and radius to the project's variables and utilities; snap sizes to tokens.
7. Replace its buttons with the project Button component; headings to tag styles or `heading-style-*`.
8. Remove empty divs and unneeded wrappers; confirm `section_ > container-* > x_component`.
9. If the block will repeat, make it a native component (`Section / …`) in the right group before placing it.
10. Move it onto the page, check at every breakpoint, delete the scratch copy.

## Attributes and code

- Finsweet Attributes V2 loaded once in site head with `defer` on client sites; each solution configured through `fs-*` attributes. Never on templates.
- Own scripts live in the component they serve or on the page that needs them; never global when used on one page. Add `async` or `defer` unless the script breaks with it.
- Project CSS in `global-styles_custom`. Tracking and consent in site head with a dated comment. Nothing else at site level.

## Style guide page

Draft or published with `noindex` (templates follow the template skill). Order: utilities (structure, spacing scale and classes, grid, max widths, typography sizes and styles, colour and theme utilities, buttons and `is-` variants, radius, icons, forms), then variables (swatches and ramps per Theme mode), then components (one instance of each, by group). Every new utility gets an example here or cleanup purges it.
