# Client-First V3 class and variable reference

Every utility family V3 ships, with the default scale, the variable collections they bind to, and the grammar for custom classes. Values are stock defaults in rem at a 16px root. Projects retune them through variables and may rename, add or remove names, so always read the project before relying on one. V2 names that no longer apply are listed at the end and in [v2-to-v3-migration.md](v2-to-v3-migration.md).

## Structure

| Class | Purpose | Default |
|---|---|---|
| `page-wrapper` | wraps everything in Body; page-wide styles live here, not on `body` | minimal |
| `main-wrapper` | tag `main`; all main content; nav and footer outside it | minimal |
| `section_[identifier]` | native Section element (or a Div with tag `section`); Navigator reads like a sitemap | padding left and right from Layout › Spacing › `global-padding`; top and bottom from Layout › Section Padding |
| `container-small / medium / large` | `width: 100%`, `margin-left` and `margin-right: auto`, `max-width` | bound to Sizes › Container |
| `padding-global` | alternative structure only; padding left and right from `global-padding`, nothing else | none |
| `padding-section-small / medium / large` | alternative structure only; combo on `padding-global` for equal top and bottom | Section Padding scale |
| `padding-section-top-[size]`, `padding-section-bottom-[size]` | alternative structure only; uneven section padding (new in V3) | Section Padding scale |

- `container-*` for the outer content width; `max-width-*` for widths nested inside a container.
- Section Padding is its own scale. `padding-section-small` is not `padding-small`.
- A shared section look (dark theme) is a global class stacked on the section: `theme-dark` or `section-style-dark`.

## Spacing

Scale (Layout › Spacing, desktop defaults, variable modes scale down at tablet and mobile landscape):

| Size | rem | Size | rem |
|---|---|---|---|
| `0` | 0 | `medium` | 2 |
| `xxtiny` | .25 | `large` | 3 |
| `xtiny` | .5 | `xlarge` | 4 |
| `tiny` | .75 | `xxlarge` | 5 |
| `xxsmall` | 1 | `huge` | 6 |
| `xsmall` | 1.25 | `xhuge` | 8 |
| `small` | 1.5 | `xxhuge` | 12 |

Classes, each one class carrying direction and size together:

- `margin-[size]`, `padding-[size]`: all sides.
- `margin-[direction]-[size]`, `padding-[direction]-[size]`: `top`, `bottom`, `left`, `right`, `horizontal`, `vertical`. Example `padding-bottom-medium`, `margin-top-large`.
- `gap-[size]`: gap on a flex or grid parent.
- `spacing-clean`: zero margin and padding, for native Webflow element spacing.

Strategies:

- **Spacing block**: empty div with one spacing class between two siblings (`heading`, `div.padding-bottom-medium`, `paragraph`). Default for vertical space between text elements. No content or ARIA in it.
- **Spacing wrapper**: div with one spacing class wrapping an element (`div.margin-top-medium > button`). Good for one exception inside a flex or grid parent.
- **Gap**: flex or grid parent with gap from a variable or `gap-[size]`. Default for lists, cards, button rows and icon plus text.
- **Custom class**: margin or padding on the custom class, bound to a spacing variable. For recurring elements managed as a group (`form_input`), inner padding of cards, and unique breakpoint spacing.

## Typography

Tag defaults come from the Typography collection (Body, H1 to H6 groups: font size, weight, line height, letter spacing), with Desktop, Tablet and Mobile Landscape modes. A text element following the default has no class. Optional heading margins through variables (`h2-margin-bottom`) when most headings share a rhythm.

| Prefix | Classes |
|---|---|
| `heading-style-` | `h1` to `h6` (changes CSS only, never the tag) |
| `text-size-` | `large`, `medium`, `regular`, `small`, `tiny` |
| `text-weight-` | `xbold`, `bold`, `semibold`, `medium`, `normal`, `light` |
| `text-color-` | `primary`, `secondary`, `alternate` (examples; check the project) |
| `text-align-` | `left`, `center`, `right` |
| `text-style-` | `allcaps`, `italic`, `strikethrough`, `nowrap`, `muted`, `link`, `quote`, `balance`, `pretty`, `1line`, `2lines`, `3lines` |
| inherit | `text-color-inherit`, `text-size-inherit`, `text-weight-inherit`, `text-decoration-inherit` |
| rich text | `text-rich-text` on every Rich Text element; style children through nested tag selectors |

- `balance` and `pretty` control wrapping; `1line`, `2lines`, `3lines` truncate.
- A repeated typography stack becomes one grouped class bound to the same variables (`text-style-subtitle`).
- New typography systems keep the prefix pattern (`text-opacity-low / medium / high`) with a matching new group in Typography.
- 14px (`.875rem`) is the accepted small font size.

## Colour and theme

- `background-color-primary / secondary / alternate`, bound to Theme › Background (examples; check the project).
- `text-color-*` bound to Theme › Text; borders to Theme › Border; links to Theme › Link; buttons to Theme › Button Primary and Button Secondary; focus and selection to Theme › System.
- Theme modes: Base and Dark Mode. Switch a section or element with the Style panel's mode setting or a `theme-dark` utility. Keep semantic names generic so every mode reuses them.

## Grid

Apply a custom class first, then a grid class on top. All default to a `medium` gap. One class covers every breakpoint.

| Class | Behaviour |
|---|---|
| `grid-autofit` | auto-fit with Webflow's native setting; fixed minimum width (not a variable), cannot shrink below it |
| `grid-autofit-css` | auto-fit through custom CSS; fixed minimum width you edit directly |
| `grid-autofit-[size]` | auto-fit with a minimum column width from Sizes › Grid Columns |
| `grid-autofill-css` | auto-fill through custom CSS (no native version) |
| `grid-autofill-[size]` | auto-fill with a minimum width from Sizes › Grid Columns |
| `grid-span-full` | grid child spans every column |

`[size]` is `xsmall`, `small`, `medium` or `large`. Auto-fit collapses empty columns so items stretch; auto-fill keeps empty columns so items hold their size. If columns must fit screens narrower than the minimum, use `grid-autofit-css` or a sized class, not `grid-autofit`.

## Sizing and other utilities

- `max-width-xxsmall` 12, `-xsmall` 16, `-small` 20, `-medium` 32, `-large` 48, `-xlarge` 64, `-xxlarge` 80rem (Sizes › Max Width); `max-width-full` (none); `max-width-full-tablet / -mobile-landscape / -mobile-portrait` apply from that breakpoint down.
- `icon-height-small / medium / large` (height), `icon-1x1-small / medium / large` (width and height), Sizes › Icon.
- `hide`, `hide-tablet`, `hide-mobile-landscape`, `hide-mobile-portrait`.
- `display-inline`, `display-inline-flex` (buttons that need inner flex without full width), `display-contents` (children join the parent's flex or grid).
- `overflow-hidden / scroll / auto / clip / visible`.
- `z-index-1`, `z-index-2`; `align-center` (auto side margins); `pointer-events-none / auto`; `disable-select`; `text-area-vertical`; `border-radius-inherit`.
- `aspect-ratio-square` 1/1, `-portrait` 2/3, `-landscape` 3/2, `-widescreen` 16/9.
- `button` base with `is-` variants (`button is-secondary`); names differ per project. On built pages use the Button component; keep `button is-*` for the style guide.
- Project additions keep the family grammar: `shadow-box-small / medium / large`, `radius-small / medium / large`, bound to Sizes or a new group.

## Do not use

`spacer-[size]`, `margin-custom[n]`, `padding-custom[n]`, `layer` (removed), V2 two-class spacing wrappers (`padding-bottom padding-medium`), `display-inlineflex` (V2 spelling; V3 is `display-inline-flex`), `inherit-color` (V2; V3 is `text-color-inherit`). If a project still has them, do not add new uses; replace them only when the user approves the cleanup.

## Variable collections and naming

| Collection | Groups (default) | Modes | Notes |
|---|---|---|---|
| Base | Brand, Neutral, Others, Font Family, Font Weight, Line Height, Letter Spacing | none | primitives, named by value (`blue`, `blue-dark`, `neutral-light`) |
| Theme | Background, Border, Link, Text, Button Primary, Button Secondary, System | Base, Dark Mode | semantic colour, named by purpose |
| Typography | Body, H1 to H6, Font Size | Desktop, Tablet, Mobile Landscape | names carry context (`h2-font-size`, `body-line-height`) |
| Layout | Spacing (incl. `global-padding`), Section Padding (`small`, `medium`, `large`) | Desktop, Tablet, Mobile Landscape | |
| Sizes | Max Width, Container, Grid Columns, Border Radius, Focus, Icon | Desktop | other collections may add breakpoint modes when needed |

- Groups Title Case; names lowercase with dashes; no group name repeated in the variable name; never colour-named semantics; follow the client's own colour system if they have one.
- CSS names (copy from the project, never hand-build): Base `--[group]--[name]` (`--brand--blue`); others `--_[collection]---[group]--[name]` (`--_theme---text--primary`).
- Tahi starters (template, client-site, white-label): variable names are Title Case with spaces (`Primary`, `Background Hover`, `H2 Font Size`). Outside projects keep their own convention.

## Custom class grammar

`[folder]_[element]-[qualifier]`, nested folders with extra underscores (`nav_dropdown_link`).

- Folder: what the block is. `hero`, `feature`, `cta`, `testimonial`, `pricing`, `faq`, `team`, `blog`, `nav`, `footer`, `form`, `card`, `slider`. Page names only when inseparable from the page (Tahi rule: `contact_form`, `pricing_cards`, `blog_list`).
- Element words: `component`, `wrapper`, `content`, `grid`, `list`, `item`, `card`, `image`, `image-wrapper`, `heading`, `text`, `link`, `button`, `icon`, `mask`.
- Qualifier: `-wrapper`, `-inner`, `-top`, `-bottom`, `-left`, `-right`; `-1`, `-2` only for genuinely ordered siblings.
- Page or variant inside a shared folder goes at the start of the element name: `slider_testimonials-arrow`.
- `_component` on the parent of a complete UI element that can be copied as a whole. Not every folder is a component (`styleguide_item`).
- A repeated `_component` becomes a native component named `Group / Identifier`: `testimonial_component` → `Section / Testimonials`, `blog-card_component` → `Card / Blog Post`.

Examples: `hero_component`, `hero_content`, `hero_heading-wrapper`, `hero_image-wrapper`, `feature_grid`, `feature_item`, `feature_item-icon`, `testimonial_card`, `testimonial_card-quote`, `faq_component`, `faq_item`, `faq_item-trigger`, `nav_component`, `nav_menu`, `nav_link`, `footer_component`, `footer_link`.

## Combo classes

- `is-` prefix, always on its base, never alone: `faq_item is-open`, `button is-secondary`, `section_header is-home`.
- Only when the variant inherits something worth managing globally; else a flat class.
- Replace a deep stack with one combo: `section_header is-home-header` instead of `section_header is-mobile-reverse background-color-brand text-color-alternate`.
- On the built site, prefer a component variant for a visual switch; keep `is-` for state and the style guide.

## Interaction names

`Element [Action State]`, Title Case, brackets around action and state, fewest words that give full context.

- Actions: Show, Hide, Move, Rotate, Scale. States: In and Out, Open and Close, Increase and Decrease, Expand and Collapse. Either can stand alone.
- Triggers only when essential (Click, Hover, Mouse Move, Scroll, While Scrolling, Load): `Discount Modal [Delay On Load]`.
- Breakpoint-only: second bracket at the end, `Nav Sidebar Slide [Show] [Mobile]`.
- General names for reused interactions (`Button Arrow [Move In]`), specific for one-offs (`Home Hero Lottie [Show]`).
- Templates: Webflow's sentence-case GSAP names instead ("Open nav menu").
