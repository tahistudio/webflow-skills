# Stock Lumos 2.2 inventory

What a fresh Lumos 2.2.x project ships. Check this before creating anything: if it is here, reuse it. Exact counts and values may drift between minor versions; treat names and structure as canonical, numbers as defaults to verify in the project.

## Pages

Home, Styleguide (draft), Example Components (draft), Standard Page (draft; duplicate this for new pages), Search Results, 404, Password. No folders, no CMS. Site head and footer code empty; all behaviour ships inside components.

## Variable collections

| Collection | Modes | Contents |
|---|---|---|
| default | Base | `site/viewport-max` 90rem, `site/viewport-min` 20rem, `site/margin`, `site/gutter`, `site/column-count` 12, `site/column-width`; `max-width/small|main|full`; `radius/small|main|round`; `border-width/main`; `focus/width|offset-inner|offset-outer`; swatches `swatch/transparent`, `light-100|200`, `dark-800|900`, `brand-100…900` (mixed from brand-500), `brand-text`; `nav/*` (height, banner height, max width, radius, hamburger); `button-size/medium|large` |
| Theme | Base, Dark, Brand | `background`, `background-2`, `background-skeleton`, `text`, `heading-accent`, `border`, `selection/*`, `button-primary/{background,border,text,+hover}`, `button-secondary/*`, `text-link/*`, `nav/background` — each aliases a swatch and is re-pointed per mode |
| Typography | Base | `font/primary-family`, trim top and bottom, weights regular 400, medium 500, bold 700; `letter-spacing/tight|normal`; `line-height/small|medium|large|huge`; fluid `font-size/text-small|text-main|text-large|h6…h1|display`; `text-transform/*` |
| Text Style | Base + Text Small, Text Large, H6…H1, Display | font-size, line-height, letter-spacing, text-transform, margin top and bottom, family, weight, trim, text-wrap — one mode per type role, consumed by the Typography components' Variant prop and the `u-text-style-*` utilities |
| Spacing | Base | fluid `space/1…8`; `section-space/none|small|main|large|page-top` |
| Column Count | Base + 2…12 | drives the Grid component's column props |
| Gap | Base + 0…8 | drives gap utilities |
| Trigger | Base, Active | `--_trigger---on|off` for hover and focus |
| State | Base, Active | `--_state---true|false` for `.is-active` and data-state |
| Responsive | Base, Medium, Small, xSmall | `--_responsive---large|medium|small|xsmall` flags mirroring the three container thresholds |

Do not edit Column Count, Gap, Trigger, State or Responsive; utilities depend on them. Tune default, Theme, Typography, Text Style and Spacing to the design.

## Global Styles component

A fixed-position block holding one HTML embed: the CSS reset, margin and line-height trim, focus ring, line-clamp, background-slot and alignment helpers, the state manager (`[data-state]`, `.is-active`, `[data-trigger]`), the `--number` table for numeric props, and the responsive engine. The engine is container queries at three thresholds, default `50em` (Medium), `35em` (Small), `20em` (xSmall). Each flips the `--_responsive---*` flags and remaps the keyword variables `--flex-*`, `--none-*`, `--block-*`, `--column-*`, `--row-*`, `--start-*`, `--center-*`, `--end-*`, `--first-*`, `--last-*`, `--unset-*`, `--relative-*`, and drives Grid and Slider per-size column counts through `data-*-columns` attributes. Change thresholds here, and only here, when a project needs different ones.

## Components (about 57)

| Group | Components |
|---|---|
| Global | Global Styles, Global Guides, Nav (Default, Overlap), Footer |
| Wrapper | Section (Theme Inherit/Light/Dark/Brand; Padding Top and Bottom variants; Section Classes, Container Classes, Style, ID, attribute pair; Container slot), Layout (Stack, Stack Centered, Auto Width, Columns, Columns Reversed, Sticky Left, Breakout, Breakout Reversed, Full, Full Reversed, Contain, Contain Reversed, Card; two slots), Grid (Large/Medium/Small/Smallest Screen counts, Minimum Column Size; Default, Self Contained, Autofit, Autofill), Block (Classes, Style, attribute pair, slot), Content Wrapper (Inherit, Left, Center, Right, Center Mobile), Button Wrapper (Margin Top/Bottom, slot), Section Custom (duplicate this) |
| Typography | Typography Heading, Paragraph, Plain (variants Inherit, Text Small, Text Main, Text Large, H6…H1, Display; props Text, Max Width, Margin Bottom, Tidy Text, Classes), Typography Eyebrow, Typography Tag |
| Button | Button Main (Primary, Secondary, Link; Text, Link, chips, Button Type), Button Play, Button Arrow (direction variant), Button Close |
| Form | Contact Form, Form Fieldset (Flex Vertical, Flex Horizontal, Grid 2 Column, Grid 3 Column), Form Input, Textarea, Select, Select Option, Radio, Checkbox, Range, Form Label Text (Visible, Hidden, Bold), Check UI (Checkbox, Radio, Toggle, Button) |
| Card | Card Primary (Default, Cover, Stacked; Heading Tag prop) |
| Visual | Visual Image and Visual Video (Wide 2/1, 16/9, 3/2, 5/4, Square, Tall 4/5, 2/3, Cover; Image Fit, Corners, Loading, Fetch Priority), Media Overlay (Base, Gradient; Overlay Strength), iFrame |
| Interactive | Slider (Slides Per View, Follow Finger, Free Mode, Mousewheel, Speed; Overflow Visible, Overflow Hidden, Crop Left), Accordion List (Close Previous, Close On Second Click, Open On Hover, Open By Default), Accordion Item, Tab (Base, Horizontal; Autoplay, Loop, Pause On Hover), Tab Link (Link, Button), Modal (Small, Side Panel, Full Screen; Show In Designer, Modal ID), Dropdown |
| Miscellaneous | Menu (Mobile, Desktop), Nav Banner, Footer Group, Footer Link |
| SVG | Icon Arrow, Icon Arrow Full (Right, Left, Top, Bottom), Icon X, Icon Search, Logo, Stroke Path |
| Utility | Clickable (Screen Reader Text, Type; focus ring inside or outside), Spacer (None, Even, Small, Main, Large, Page Top), Starter CSS, Starter JS |

Interactive components are dependency-free and driven by the trigger and state system.

Common project additions worth standardising when they recur: Theme Switcher and Space Switcher (variant switchers that expose the theme and spacing scales as dropdowns inside other components), Badge and Pill, Card Testimonial and Card Pricing, Breadcrumbs, FAQs and CTA as closed sections, Filter Button / Search / Sort for listing pages, Icon (generic icon swap) and Icon Tile.

## Utility families (`u-`)

About 380 utilities. Families and the value scales they follow:

- Layout: `u-section`, `u-container`, `u-container-small|full`, `u-layout-wrapper`, `u-layout`, `u-layout-column-1|2`, `u-grid-wrapper`, `u-grid`, `u-grid-autofit`, `u-grid-autofill`, `u-grid-custom`, `u-grid-breakout`, `u-grid-subgrid`, `u-column-span-{full,indent,1…12}`, `u-column-start-{auto,1…12}`, `u-row-span-{1…6}`, `u-row-start-{auto,1…6}`, `u-content-wrapper`, `u-background-slot`, `u-section-spacer`.
- Flex and alignment: `u-flex-horizontal-wrap|nowrap`, `u-flex-vertical-wrap|nowrap`, `u-align-items-*`, `u-justify-content-*`, `u-align-self-*` (each with a `-variable` form bound to the Alignment mode), `u-alignment-center|end`, `u-flex-shrink|grow|noshrink`, `u-order-*`.
- Display and position: `u-display-*` (including `u-display-contents`, `u-display-none`), `u-position-*`, `u-overflow-clip|hidden|visible`, `u-z-index-*`, `u-pointer-*`, `u-sr-only`.
- Spacing: `u-gap-{0…8,gutter,inherit}`, `u-gap-row-*`, `u-padding-{0…8}`, `u-padding-{top,bottom,left,right,block,inline}-{0…8,small,main,large,gutter,sitemargin,pagetop}`, `u-margin-{top,bottom}-*`, `u-margin-bottom-text`, `u-margin-trim`.
- Size: `u-width-*`, `u-max-width-*`, `u-min-width-*`, `u-min-height-*`, `u-ratio-*`, `u-object-fit-*`.
- Type: `u-text-style-{display,h1…h6,large,main,small}`, `u-heading`, `u-text`, `u-weight-*`, `u-line-height-{small,medium,large,huge}`, `u-letter-spacing-{tight,normal}`, `u-text-transform-*`, `u-text-trim`, `u-text-wrap-*`, `u-line-clamp-*`, `u-rich-text`, `u-eyebrow-{wrapper,layout,marker,text}`, `u-heading-accent`.
- Colour and theme: `u-theme-{inherit,light,dark,brand}`, `u-background-*`, `u-border-main`.
- Media: `u-image-wrapper`, `u-image`, `u-video`, `u-iframe-wrapper`, `u-iframe`, `u-overlay`, `u-svg`, `u-icon`.
- Radius: `u-radius-*` (uniform; per-corner variants are a common project addition).
- Code: `u-embed-css`, `u-embed-js`.
- Buttons: `u-button-wrapper`.

Combo classes shipped: `is-1`, `is-2`, `is-active`, `is-main`, `is-textarea`.

## Custom classes shipped

About 270, all internals of the stock components: `accordion_*`, `button_*`, `card_primary_*`, `clickable_*`, `dropdown_*`, `footer_*`, `form_*`, `guide_*`, `modal_*`, `nav_*`, `section_*`, `slider_*`, `tab_*`, `styleguide_*`, plus bare tag-name classes (`h1`…`h6`, `p`, `ul`, `ol`, `li`, `blockquote`, `figure`, `a`, `img`, `label`, `strong`) that act as the default rich-text targets. Pattern: `component_element_part`, underscores between parts, hyphens inside a part.

## Style guide page

`page_wrap` → Global Styles → Global Guides → `main.page_main` → `styleguide_wrap.u-section` → `styleguide_contain.u-container` (nav rail plus swatch sections) → `footer.styleguide_footer`. A hidden rich-text block outside `page_wrap` holds the default rich-text markup (H1 to H6 with paragraphs, lists, blockquote, code, figure) so those tag styles are never purged. Keep this block when extending the page.

## Chrome extension shortcuts

Right arrow on a class field: auto-name from the nearest parent component class. Shift with up or down: switch the styled base class. Typing a number then space converts px to rem; `a/b` then space converts to a percentage. Tab wraps a variable name in `var()`. Data-attribute buttons appear on component fields for attribute values.
