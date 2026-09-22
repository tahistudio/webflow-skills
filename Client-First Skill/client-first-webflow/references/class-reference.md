# Client-First class reference

Every utility family the system ships, with the default scale, plus the grammar for custom classes. Values are the stock defaults in rem at 16px root; a project may retune them through variables, but the names stay.

## Structure

| Class | Purpose | Default |
|---|---|---|
| `page-wrapper` | outermost div in Body | no styles required |
| `main-wrapper` | `<main>`, holds all sections | no styles required |
| `section_[name]` | `<section>` or `<header>` wrapper; Navigator label and anchor target | no styles; scheme via utility combos |
| `padding-global` | left and right page padding | 2.5rem desktop, 1.25rem at ≤767 |
| `padding-section-small / medium / large` | vertical section padding, stacked on `padding-global` | 3 / 5 / 8rem desktop; 3 / 4 / 6 at ≤991; 2 / 3 / 4 at ≤767 (some starters use 3 / 5 / 7) |
| `container-small / medium / large` | width 100%, margin auto, max-width | 48 / 64 / 80rem |
| `global-styles` | HTML embed component holding site CSS | — |

## Spacing

Scale (desktop rem, scaling down at ≤991 and ≤767): `tiny` .125, `xxsmall` .25, `xsmall` .5, `small` 1, `medium` 2, `large` 3, `xlarge` 4, `xxlarge` 5, `huge` 6, `xhuge` 8, `xxhuge` 12, `custom1` 1.5, `custom2` 2.5, `custom3` 3.5, `0`.

- Spacer block (one class, empty div): `spacer-[size]` = width 100%, padding-top size. Responsive combos allowed: `spacer-large is-mobile-small`.
- Spacing wrapper (two classes on a wrapping div): `padding-[direction] padding-[size]` or `margin-[direction] margin-[size]`. Directions: `top`, `bottom`, `left`, `right`, `vertical`, `horizontal`. Direction class must be created before size class or the pair breaks; the Finsweet extension reorders if needed. Never a third class.
- `spacing-clean` zeroes margin and padding on native elements.
- Prefer gap on the parent over spacers wherever the layout is grid or flex.

## Typography

- Tag defaults (no class): body 1rem/1.5; h1 4rem/1.1; h2 3rem/1.2; h3 2rem/1.2; h4 1.5rem/1.4; h5 1.25rem/1.5; h6 1rem/1.5; weight 700; margins 0. Mobile landscape: h1 2.5, h2 2, h3 1.5, h4 1.25, h5 1, h6 .875. Line heights unitless or percentage.
- `heading-style-h1 … h6` mirror the tag values; only for a correct tag that must look like another level.
- `text-size-large` 1.5 (1.25 mobile), `-medium` 1.25, `-regular` 1, `-small` .875, `-tiny` .75.
- `text-weight-light / normal / medium / semibold / bold / xbold` = 300 to 800.
- `text-style-allcaps / italic / link / muted / nowrap / quote / strikethrough / 2lines / 3lines`.
- `text-align-left / center / right`.
- `text-color-primary / secondary / alternate` and project additions (`text-color-brand`, `text-color-white`), each bound to a semantic colour variable.
- `text-rich-text` on every Rich Text element; the global embed trims its first and last child margins.

## Colour and scheme

- `background-color-primary / secondary / tertiary / alternate` and project additions, bound to semantic variables. `background-color-primary` also sets text to the alternate text colour.
- `color-scheme-light / color-scheme-dark`: switch the Color Scheme variable mode and set background and text from the scheme aliases. Stack on `section_*` or on cards.
- Variables (Title Case, foldered): `Brand Colors/Primary | Secondary | Tertiary | CTA`; `Neutral Colors/Transparent | White | Lightest | Lighter | Light | Dark | Darker | Darkest | Black`; optional `Neutral Colors/Opacity/…`; per-brand shade ramps `Primary Shades/Lightest … Darkest`; semantic `Color Scheme/Text | Text Secondary | Background | Foreground | Border | Accent | Button Background` with Base and Dark modes.

## Sizing and misc utilities

- `max-width-xxsmall` 12, `-xsmall` 16, `-small` 20, `-medium` 32, `-large` 48, `-xlarge` 64, `-xxlarge` 80rem, `-full`; `max-width-full-tablet / -mobile-landscape / -mobile-portrait`.
- `icon-height-small / medium / large` 1 / 2 / 3rem; `icon-1x1-small / medium / large`; `icon-embed-*` for embedded SVG sizes.
- `aspect-ratio-square / portrait / landscape / widescreen`.
- `overflow-hidden / scroll / auto / visible`; `z-index-1 / 2`; `layer` (absolute, inset 0); `align-center`; `pointer-events-none / auto`; `display-inlineflex`; `inherit-color`.
- `hide`, `hide-tablet`, `hide-mobile-landscape`, `hide-mobile-portrait`.
- `shadow-xsmall … xlarge` (project addition, two-layer shadow variables with size modes); `radius-small / medium / large / round` bound to Radius variables.
- `button` + `is-secondary / is-tertiary / is-text / is-link / is-small / is-large / is-icon / is-alternate`; `button-group` (flex, gap 1rem) + `is-center`. These exist for the style guide; on built pages use the Button component.

## Custom class grammar

`[folder]_[element]-[qualifier]`

- Folder: what the block is. `hero`, `feature`, `cta`, `testimonial`, `pricing`, `faq`, `team`, `blog`, `nav`, `footer`, `form`, `card`. Page names only when inseparable from the page (`contact_form`, `pricing_cards`).
- Element words: `component` (root of a copy-pasteable block), `wrapper`, `content`, `grid`, `list`, `item`, `card`, `image`, `image-wrapper`, `heading`, `text`, `link`, `button`, `icon`, `layer`, `mask`.
- Qualifier: `-wrapper`, `-inner`, `-top`, `-bottom`, `-left`, `-right`, `-1`, `-2` only when the design genuinely has ordered siblings.
- One underscore per folder level. Two levels at most (`nav_dropdown_link`).
- Root of a repeated block ends in `_component` and becomes the native component of the same name in Title Case.

Examples: `hero_component`, `hero_content`, `hero_heading-wrapper`, `hero_image-wrapper`, `feature_grid`, `feature_item`, `feature_item-icon`, `testimonial_card`, `testimonial_card-quote`, `faq_component`, `faq_item`, `faq_item-trigger`, `nav_component`, `nav_menu`, `nav_link`, `footer_component`, `footer_column`, `footer_link`.

## Combo classes

- `is-` prefix, always stacked on its base, never alone: `faq_item is-open`, `button is-secondary`, `section_hero is-short`.
- Must give a real inheritance benefit; otherwise a flat class (`container-large`, not `container is-large`).
- On the built site, prefer a component variant over an `is-` combo for the same visual switch; keep `is-` for state (`is-open`, `is-active`) and for style-guide demonstration.

## Global styles embed

The `global-styles` component's embed holds: font smoothing, `*[tabindex]:focus-visible` ring, rich-text first and last child margin reset, container `margin: auto !important`, `!important` forms of `hide-*` and the direction utilities, `.inherit-color`, and any fluid type CSS if used. Nothing else site-wide lives anywhere else.

## Interaction names

`Element [Action State]` in Title Case for legacy, or sentence case for native GSAP interactions per Marketplace rules: "Nav menu [Open]" → "Open nav menu". Actions: show, hide, move, rotate, scale, fade. States: in, out, open, close, expand, collapse.
