# Lumos 2.2.3 Stock Inventory, Giant Group Diff, and Tahi Template Style Guide Conventions

Sources: Webflow MCP (read-only), site `6996a19da4278634fbc7976d` (Lumos 2.2.3 stock), site `685a8de8d94de8e829e633c4` (Tahi Template Style Guide), and local files `_research/giant-group-components.json` (90 components) and `_research/giant-group-classes.json` (custom/utility/combo class lists) for the Giant Group diff. Raw pulls saved to `_research/_tmp_lumos_components.json`, `_research/_tmp_lumos_styles.json`, `_research/_tmp_tahi_styles.json`.

---

## A) Stock Lumos v2.2.3 canonical inventory

### A1. Pages

7 pages, no folders, no CMS collections:

| Page | Slug | Draft | Notes |
|---|---|---|---|
| Home | `/` | no | main landing page |
| Styleguide | `/styleguide` | yes (unpublished) | canonical style guide |
| Example Components | `/example-components` | yes | component gallery/sandbox |
| Standard Page | `/static-template-slug-...` | yes | generic page template to duplicate |
| Search Results | `/search` | no | search template |
| 404 | `/404` | no | |
| Password | `/401` | no | |

Site head/footer custom code: **empty** (both blocks `""`). No registered scripts. All interactivity ships as component-embedded HTML/JS (e.g. "Starter JS"/"Starter CSS" utility components), not site-level custom code.

### A2. Components — full list (57 total)

Grouped by Designer group. Instance counts are from this clone's current usage, not a spec.

**Global (4):** Global Styles (embed only, thresholds — see A5), Global Guides, Nav (props: Nav Position‑variant; variants: Default, Overlap), Footer (no props; variant: Base)

**Wrapper (7):** Section (13 props incl. Padding Top/Bottom variants, Section/Container Classes, Style, ID Attribute Name/Value, Container Slot, Slot; variants: Inherit/Light/Dark/Brand), Button Wrapper, Content Wrapper (variants: Inherit/Left/Center/Right/Center Mobile), Grid (Large/Medium/Small/Smallest Screen column-count numbers, Minimum Column Size, Role; variants: Default/Self Contained/Autofit/Autofill), Block, Layout (13 variants: Stack, Stack Centered, Auto Width, Columns, Columns Reversed, Sticky Left, Breakout, Breakout Reversed, Full, Full Reversed, Contain, Contain Reversed, Card — 2 content slots), `[Section Custom (duplicate this)]` (16-prop scratch template for building new sections; variants Inherit/Light/Dark/Brand + Padding Top/Bottom)

**Typography (5):** Typography Eyebrow, Typography Heading, Typography Paragraph, Typography Plain, Typography Tag — Heading/Paragraph/Plain share the same 11-variant scale: Inherit, Text Small, Text Main, Text Large, H6, H5, H4, H3, H2, H1, Display

**Button (5):** Button Main (11 props: Arrow chip / Left chip booleans, Clickable Visibility, Button Type, Type "button/submit/reset"; 3 variants Primary/Secondary/Link), Button Play (4 variants: Primary/Secondary × Medium/Large), Button Arrow (Arrow Direction variant; 4 variants), Button Close (dual Attribute Name/Value pairs; 4 variants)

**Form (12):** Contact Form, Form Fieldset (Legend Variant, Slot Role "list"; 4 variants: Flex Vertical/Horizontal, Grid 2/3 Column), Form Input, Form Textarea, Form Select, Form Select Option, Form Radio, Form Checkbox, Form Range (Min/Max/Step/Output Unit), Form Label Text (variants: Visible/Hidden/Bold), Check UI (variants: Checkbox/Radio/Toggle/Button)

**Card (1):** Card Primary (14 props incl. Heading Tag, Content Classes; variants: Default/Cover/Stacked)

**Visual (3):** Visual Image, Visual Video (both 8 aspect-ratio variants: Wide 2/1, 16/9, 3/2, 5/4, Square 1/1, Tall 4/5, 2/3, Cover), Media Overlay (Overlay Strength number; variants Base/Gradient), iFrame

**Interactive (8):** Slider (Swiper-based: Slides Per View, Follow Finger, Free Mode, Mousewheel, Speed; variants Overflow Visible/Hidden/Crop Left), Accordion List (Close Previous/On Second Click, Open On Hover, Open By Default Item#), Accordion Item, Tab (Slide Tabs, Autoplay Duration, Loop/Pause on Hover; variants Base/Horizontal), Tab Link (variants Link/Button), Modal (Show In Designer, Modal ID; variants Small/Side Panel/Full Screen), Dropdown (Open/Close On Hover), 

**Miscellaneous (4):** Menu (variants Mobile/Desktop), Nav Banner, Footer Group, Footer Link

**SVG (6):** Icon Arrow (variants Right/Left/Top/Bottom), Icon Arrow Full (same 4), Icon X, Icon Search, Logo, Stroke Path (Path string prop; used 99×, the most-instanced component in stock)

**Utility (3):** Clickable (Screen Reader Text, Type, 2 Focus Ring variants), Spacer (variants: None/Even/Small/Main/Large/Page Top), Starter JS, Starter CSS (0 instances each — inert scaffolding placeholders)

Full prop-level detail (name/type/group/tooltip) for all 57 components is in `_tmp_lumos_components.json`.

### A3. Variable collections (canonical token list)

9 collections + 1 default:

| Collection | Modes | Key variables |
|---|---|---|
| `default` | Base only | site/viewport-max=90, site/viewport-min=20, site/margin, site/gutter, site/column-count=12, site/column-width, max-width/small(50rem)/main/full, radius/small(.5rem)/main(1rem)/round(100vw), border-width/main(.094rem), focus/width(.125rem)/offset-inner/offset-outer(.1875rem), swatch/transparent, light-100(white), light-200(#ebebeb), dark-800(#2f2b2d), dark-900(#1f1d1e), brand-100…900 (color-mix chain off brand-500=`#c6fb50`), brand-text, nav/* (height 4rem, banner-height 2.4rem, max-width, radius, hamburger-thickness/gap), button-size/medium(3rem)/large(5rem) |
| `Theme` | Base, Dark mode, Brand mode | background, background-2, background-skeleton, text, heading-accent, border, selection/background+text, button-primary/{background,border,text,+hover}, button-secondary/{...}, text-link/{text,border,+hover}, nav/background — all alias to `default` swatches, re-pointed per mode |
| `Typography` | Base only | font/primary-family(system-ui), primary-trim-top/bottom, primary-regular(400)/medium(500)/bold(700), letter-spacing/tight(-.03em)/normal, line-height/small(1)/medium(1.1)/large(1.3)/huge(1.5), font-size/text-small,text-main,text-large,h6…h1,display (all fluid `clamp()` tied to viewport-min/max), text-transform/none,uppercase,capitalize,lowercase |
| `Text Style` | Base + 9 named modes (Text Small, Text Large, H6…H1, Display) | font-size, line-height, letter-spacing, text-transform, margin-top/bottom, font-family, font-weight, trim-top/bottom, text-wrap — a mode-switched "typography role" abstraction consumed by Typography Heading/Paragraph's variant prop |
| `Spacing` | Base only | space/1(8px)…8(64px) fluid, section-space/none, small(80px), main(112px), large(160px), page-top(224px) — all fluid clamps |
| `Column Count` | Base + modes "2".."12" | drives Grid component's column props via mode switching |
| `Gap` | Base + modes "0".."8" | drives grid/flex gap utilities via mode switching |
| `Trigger` | Base, Active | interaction state modes (hover/focus/click abstraction) |
| `State` | Base, Active | is-active / data-state abstraction |
| `Responsive` | Base, Medium, Small, xSmall | mirrors the 3 container-query breakpoints (see A5) as a variable-mode axis |

### A4. Utility (`u-`) and custom class inventory

383 unique `u-` utility class names (categories: alignment, background, column-span/start, container, display, eyebrow, flex, gap/gap-row, grid, heading/text, layout, letter-spacing, line-clamp, line-height, margin (top/bottom + block/inline padding variants), max/min width/height, object-fit, order, overflow, overlay, padding (all sides + block/inline, at 0–8 scale plus sitemargin/gutter/small/main/large/pagetop), pointer, position, radius, ratio, rich-text, row-span/start, section, sr-only, svg, text-style (h1–h6/display/small/main/large), text-transform, text-trim, text-wrap, theme (inherit/light/dark/brand), video, weight, width, z-index) plus a small `is-` combo-class set (`is-1`, `is-2`, `is-active`, `is-main`, `is-textarea`).

270 custom (`_`-delimited BEM-ish) classes cover component internals: accordion_*, button_*, card_primary_*, clickable_*, dropdown_*, footer_*, form_*, guide_*, hero_utility-page_*, modal_*, nav_* (desktop/mobile/dropdown/banner/search variants), section_*, slider_*, styleguide_* (nav/card/flex/font/list — style guide chrome), swiper/swiper-wrapper (Swiper.js hooks), tab_*, plus bare tag-name classes (`h1`–`h6`, `p`, `li`, `ol`, `ul`, `blockquote`, `figure`, `strong`, `a`, `body`, `img`, `label`) used as default rich-text targets. Full list in `_tmp_lumos_styles.json`.

### A5. Styleguide page structure (depth 4)

`Body > .page_wrap` containing, in order:
1. `Global Styles` component instance (fixed-position, invisible — injects the reset/utility CSS, see below)
2. `Global Guides` component instance (design-mode column/baseline overlay)
3. `main#main.page_main > .styleguide_wrap.u-section > .styleguide_contain.u-container` (content continues past depth 4 — nav rail, type/color/component swatch sections)
4. `footer.styleguide_footer.u-section > .styleguide_contain.u-container` (footer content)

A separate, hidden (`visibility:false`) `RichText.u-rich-text` block sits outside `.page_wrap` holding the canonical default rich-text markup Webflow renders for un-classed CMS rich text: H1→H6 + paragraph pairs, an `<ol>`, a `<blockquote>`, a `<ul>`, a `CodeBlock`, a closing paragraph, and a `Figure > Image`. This is the rich-text "answer key" a style guide always ships with — order is heading+paragraph descending H1→H6, then lists, quote, code, image.

### A6. Global Styles component / responsive thresholds

The `Global Styles` component (group "Global", 7 instances — one per real page) is a single fixed-position `Block` wrapping one `HtmlEmbed`. Its embedded `<style>` block is the framework's CSS reset + utility engine and is where Lumos's responsive system lives. Key contents:
- Base reset (box-sizing, richtext/embed pseudo-element clearing, button/video/svg normalization, `html { background-color: var(--_theme---background) }`)
- Margin-trim, line-height-trim (`::before`/`::after` table hacks tied to `--_text-style---trim-top/bottom`), line-clamp, background-slot, alignment, hide-if-empty utilities
- Focus-visible ring styling from `--focus--*` variables
- A **container-query-based responsive engine**, not media queries: `@container (width < 50em)`, `(width < 35em)`, `(width < 20em)` — these three thresholds are Lumos's Medium/Small/xSmall breakpoints (mapped 1:1 to the `Responsive` variable collection's 3 non-base modes and to Grid's `data-*-columns` attribute-selector system). Each threshold flips a `--_responsive---*` flag and remaps `--flex-*/--none-*/--column-*/--row-*/--start-*/--center-*/--end-*` custom properties for that tier, and drives the Grid/Slider components' per-breakpoint column/slide counts via `[data-{large,medium,small,xsmall}-columns="N"]` attribute selectors.
- A generic `--number` custom-property table for `[data-number="0..100"]` (used by Grid/Slider numeric props)
- A generic state manager (`[data-state]`, `.is-active`, `[data-trigger~="hover|focus|group|mobile"]`) that powers Accordion/Tab/Dropdown/Modal interactivity purely via CSS custom properties and attribute selectors, no per-component JS state.

---

## B) Giant Group vs stock diff

Computed from `giant-group-components.json` (90 components) and `giant-group-classes.json` against the stock 57-component / 653-style inventory above. The Giant Group classes JSON appears to be a **curated/used subset** (175 utility + 200 custom + 11 combo), not an exhaustive class-panel dump — so "removed" utility/custom findings below are not reliable; only "added" findings are.

### B1. Components added by Giant Group (38, none of which exist in stock)

Badge, Badge Core, Banner, Breadcrumbs, Button Chip, CTA, Card Product, Card Product Pricing, Card Service, Card Service Header, Card Testimonial, Card Trustpilot, FAQs, Filter Button, Filter Search, Filter Sort, Icon, Icon Tile, Input Switcher, Pill, Position Wrapper, Products and Services List, Scoop, Space Switcher, Stacked short form, Star Rating, Tag Colour, Tag Size, Tag Text, Testimonial Card, Testimonial Track, Testimonials, Testimonials Header, Theme Switcher, Trustpilot Rating, Umbrella Calculator, Accordion Item Alt, Accordion List Alt.

Themes: a pricing/marketing card system (Card Product/Pricing/Service/Testimonial/Trustpilot), a review/social-proof kit (Star Rating, Trustpilot Rating, Testimonial Track/Header), tag/badge primitives (Badge, Badge Core, Pill, Tag Colour/Size/Text), a filter/search UI kit (Filter Button/Search/Sort — implies a filterable listing page not in stock Lumos), and infra helpers (Position Wrapper, Space Switcher, Theme Switcher, Icon/Icon Tile as a generic icon-swap layer replacing ad hoc per-use SVG components). "Umbrella Calculator" is a bespoke business-logic component, clearly client-specific rather than a template addition.

### B2. Components present in stock but absent from Giant Group's 90

Icon Search, Icon X, Stroke Path, Spacer, and the `[Section Custom (duplicate this)]` scratch template. Icon/Icon Tile likely subsumed Icon Search/Icon X (generalized icon component replacing named ones). Stroke Path (99 stock instances — animated SVG line-draw) and Spacer being absent suggests those effects/utilities were either renamed, inlined, or genuinely dropped — worth confirming directly in the Giant Group file rather than assuming removal, since a name/group rename would also show as "missing" here.

### B3. Utility classes (`u-`) added by Giant Group (27, confirmed not in stock)

`u-accent-finance-funding`, `u-accent-pay-employ`, `u-accent-screening`, `u-accent-workforce` (four business-line accent-color utilities — strong evidence of a multi-vertical brand system), `u-border-main`, `u-font-alt`, `u-font-heading` (extra font-family utilities beyond stock's single `--_typography---font--primary-family`), `u-icon`, `u-min-height-30/45/60/85`, `u-min-width-0`, `u-padding-bottom-pagetop`, `u-padding-none-medium`, `u-padding-top-navheight`, `u-padding-top-pagetop`, `u-radius-bottom-right`, `u-radius-large`, `u-radius-main-bottom-right`, `u-radius-none-bottom-left/right`, `u-radius-none-top-left`, `u-radius-top-left/right` (per-corner radius overrides — stock only ships uniform `u-radius-*`), `u-ratio-auto`, `u-shadow-m` (stock ships no shadow utilities at all — Giant Group added a shadow scale).

### B4. Combo (`is-`) classes added by Giant Group

`is-drag`, `is-pinned`, `is-round-top-left`, `is-search`, `is-start`, `is-wrap-medium` (stock only has `is-1`, `is-2`, `is-active`, `is-main`, `is-textarea`).

### B5. Custom (`_`) classes added by Giant Group (91)

Almost entirely internals of the B1 added components (`badge_*`, `breadcrumbs_*`, `card_pricing_*`, `card_product_*`, `card_service_*`, `card_testimonial_*`, `card_trustpilot_*`, `faq_*`/`faqs_*`, `filter_*`, `pill_*`, `tag_colour_wrap`, `tag_size_wrap`, `testimonial_*`, `testimonials_*`, `trustpilot_rating_*`, `star_rating_wrap`) plus a **logo carousel/marquee kit** not represented in components (`logos_track`, `logos_wrap`, `logos_card_frame`, `logos_popover_*` — a hover-popover-on-logo pattern), a bespoke **404 page kit** (`notfound_badge_ring`, `notfound_confetti_dot`, `notfound_digits`, `notfound_eyebrow`, `notfound_face_img`, `notfound_reset_btn`, `notfound_score_text` — a game-ified 404, well beyond stock's plain 404 page), `hero_notch_*`/`scoop_shape` (a notch/scoop decorative shape system), `cta_visual_face`, `search_title`, `logo_dot`/`logo_wrap`, `icon_tile_wrap`.

**Net read:** Giant Group's fork is not a light reskin — it added a full marketing-card/testimonial/pricing system, a filter/search UI, a multi-brand accent-color layer, a shadow scale, and bespoke logo-marquee and gamified-404 kits, while trimming a few single-purpose stock utility components (icons, stroke-path, spacer) in favor of more generic replacements (Icon/Icon Tile, Space Switcher).

---

## C) Tahi Template Style Guide inventory and Client-First conventions

Site `685a8de8d94de8e829e633c4`, confirmed by its Style Guide page SEO description: `"Relume Style Guide v3.0"`.

### C1. Pages and folders

8 pages. One folder, **"Template Pages"** (id `685a8ee4882928073dd285e3`), containing: Style Guide (`/template-pages/style-guide`), Licenses, Start Here, Changelog. Outside the folder: Home (`/`), Base Structure (draft, a duplicatable static-page skeleton — Lumos's "Standard Page" equivalent), 404, Password (401). **No CMS collections exist** (`get_collection_list` → empty) — fully static, as expected for a Relume/Client-First marketplace template.

### C2. Custom code — not fully zero

Registered scripts: none. Site freeform footer: empty. **Site freeform head is not empty** — it carries a small inline font-smoothing snippet:
```html
<!-- This code helps improve the font quality -->
<style>* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -o-font-smoothing: antialiased; }</style>
```
This is a common Webflow/Relume boilerplate snippet, not app logic, but it is technically custom code and should be flagged if the skill's assumption is "zero custom code."

### C3. Components (only 3 — minimal componentization)

Button Layout (group Button, 15 instances; variants Normal/Reversed — icon+text layout wrapper), Button Content (15 instances; 6 variants: Primary/Secondary/Alternate/Secondary Alternate/Link/Link Alternate), Button (15 instances; composes Layout+Content; variants Small/Medium/Large via a Size variant prop, plus nested Variant/Layout). This is the **entire component library** — everything else in the template (heroes, cards, nav, footer, FAQ, etc.) is built from raw elements + classes, not Webflow components. This is the single biggest structural difference from Lumos, which componentizes almost everything.

### C4. Variable collections and naming

6 collections, mode-per-breakpoint pattern (not container-query text-style-role pattern like Lumos):

| Collection | Modes |
|---|---|
| Theme | Base, Dark |
| Colors | Base only (flat palette, no theme-aliasing layer distinct from Theme) |
| Font Styles | Base + Font Small, Font Large, H1…H6 (mirrors Lumos's Text Style collection concept but named "Font Styles") |
| Typography | Base, Tablet, Mobile (L), Mobile (three explicit breakpoint modes — media-query driven, not container-query) |
| Sizes | Base, Tablet, Mobile (L), Mobile |
| Shadows | Base, XSmall, Small, Large, XLarge |

Naming convention: plain English words, no BEM-token or double-hyphen private-variable prefixing (contrast Lumos's `--_theme---background` / `--_typography---font--primary-family` underscore-prefixed "private token" convention).

### C5. Class inventory and prefix histogram

606 total style names. Histogram of recognizable prefixes:

| Prefix / pattern | Count |
|---|---|
| unprefixed / kebab-case utility or element (`padding-*`, `margin-*`, `max-width-*`, `button`, `h1`...) | 413 |
| `styleguide_*` | 60 |
| `is-*` (combo classes) | 45 |
| `template-inclusions_*` | 17 |
| `form_*` | 15 |
| `stylesystem_*` | 12 |
| `style-guide_*` | 10 |
| `template-hero_*` | 9 |
| `template-pages_*` | 8 |
| `section_*` | 6 |
| `utility_*` | 4 |
| `layout9_*` (numbered section-block class, e.g. Relume block "Layout9") | 3 |

This is **Client-First convention**, not Lumos convention: utilities are bare kebab-case with no `u-` prefix (`padding-medium`, `max-width-large`, `margin-bottom`, `overflow-hidden`, `hide-tablet`), combo/state classes use `is-` (`is-active` analog set), and section-level blocks are named after the Relume block ID (`layout9_item`, `layout9_item-icon-wrapper`). Icon-sizing utilities follow a `icon-{1x1|embed|height}-{xsmall..xlarge}` naming scale not present in Lumos at all. `form_*` classes (`form_input`, `form_radio-icon`, `form_message-error-wrapper`) mirror Client-First's canonical form block naming.

### C6. Style Guide page (content + order)

`Body > .page-wrapper > .main-wrapper > section.section_styleguide` (single top-level section wrapping all style-guide content — flatter than Lumos's Styleguide page, which nests nav rail + content + separate footer section at the top level). Deeper content wasn't expanded past depth 3 in this pass; the single-section structure itself is a notable convention (everything under one `section_styleguide`, vs. Lumos's `main > wrap > contain` + separate `footer.styleguide_footer` split).

### C7. Home page structure (depth 4)

`Body > .page-wrapper > .main-wrapper` containing, in document order:
1. `header.section_template-hero > .padding-global` (hero)
2. `header.section_template-inclusions > .padding-global` (a "what's included" band — template-marketing content, not end-client content)
3. `section.section_template-pages > .padding-global` (a "browse template pages" band linking to Style Guide/Licenses/etc.)

Every section wraps its content in `.padding-global` immediately inside the section tag — this is the canonical Client-First "section > padding-global > container-*" nesting pattern (only 2 of 3 levels visible at depth 4; the `container-*` level is one level deeper).

### C8. SEO / OG presence per page

All 8 pages carry an SEO title. Only Home has an explicit `openGraph.imageAssetId` set; all pages have `titleCopied`/`descriptionCopied` = true (SEO fields inherited rather than custom-written per page) except where noted above. Style Guide's SEO description doubles as version-pinning documentation (`"Relume Style Guide v3.0"`) — a useful convention: **the style guide's own SEO description field is being used to record the template framework + version**, which an AI skill could rely on to fingerprint which Relume/Client-First release a fork is built from.

### C9. Template-starter conventions as explicit rules

1. **No `u-` prefix.** Utilities are bare kebab-case (`padding-medium`, `margin-bottom`, `hide-tablet`), unlike Lumos's `u-` namespace.
2. **Minimal componentization.** Only reusable atoms (here: Button + its 2 sub-parts) become Webflow components; sections/blocks stay as plain elements + classes so template buyers can freely edit them without fighting component boundaries.
3. **Section nesting is `section > .padding-global > .container-*`**, consistently, immediately inside every top-level section/header tag.
4. **Block classes are named after the source block ID** (`layout9_*`, mirroring Relume's library numbering) rather than semantic component names — a giveaway that a page was assembled from a Relume block library rather than custom-built.
5. **Variable modes track literal breakpoints** (Base/Tablet/Mobile(L)/Mobile) via media queries, not Lumos's container-query + role-mode abstraction — so responsive overrides live as explicit per-breakpoint variable modes, not CSS custom-property flags.
6. **A "Template Pages" folder** houses buyer-facing meta content (Start Here, Licenses, Changelog, Style Guide) separate from the real site pages (Home, 404, 401) — this folder should be stripped/ignored when treating the fork as a "starter" rather than a shippable site.
7. **No CMS collections ship by default** — CMS structure is added per-project, not templated.
8. **The style guide's SEO description field records template name + version** — read it first when fingerprinting an unknown fork.
9. **A small head-code font-smoothing snippet is normal/expected**, not a violation of "zero custom code" — the "zero custom code" assumption should be scoped to *scripts/behavior*, not to the one-line CSS reset snippet Webflow/Relume ships by default.

---

## D) Follow-up questions

1. **Giant Group's Stroke Path / Spacer / Icon Search / Icon X absence** — confirm directly against the live component list (not just the static JSON) whether these were renamed/merged into `Icon`/`Icon Tile`/`Space Switcher`, or genuinely deleted. A rename would currently misreport as "removed" in this diff.
2. **Is `giant-group-classes.json` a full class-panel export or a curated/used-only subset?** The 191 stock `u-` classes it appears to "lack" (e.g. common ones like `u-grid`, `u-display-none`, `u-heading`) are almost certainly still present in Giant Group's actual site — worth re-pulling live via `query_styles` to get a trustworthy utility diff instead of relying on the static file.
3. **What collection do the four `u-accent-{finance-funding,pay-employ,screening,workforce}` utilities belong to**, and is there a corresponding `Theme`/`Colors`-collection mode per business line, or are they hard-coded hex overrides? This determines whether Giant Group runs one theme with accent utilities or a true multi-brand variable-mode system.
4. **Is the "Umbrella Calculator" component genuinely bespoke business logic**, or does it reuse a shared calculator pattern seen on other Giant Group sites? If reusable, it may deserve its own skill entry rather than being filed under "diffs."
5. **For the Tahi fork, does every Relume/Client-First project in the agency's library keep the identical 3-component set (Button/Button Layout/Button Content)**, or does component usage grow as sections get customized per client? This determines whether "minimal componentization" is a hard rule or just this template's current state.
6. **Should the font-smoothing site-head snippet be added to the "expected default code" allowlist** for the custom-code-audit skill so it doesn't false-positive on every Client-First fork?
7. **Does Tahi's Style Guide page nest a `container-*` and full content tree below the depth-3 cutoff captured here** that mirrors Lumos's nav-rail + swatch-section pattern, or is it organized completely differently? Worth a follow-up `depth: -1` pull scoped to `.section_styleguide` alone.
8. **Are the Text Style (Lumos) and Font Styles (Tahi) collections' mode-per-role values numerically aligned** (e.g. does Tahi's H1 mode roughly match Lumos's H1 text-style values), which would indicate both frameworks converged on the same type scale despite different plumbing?
9. **Confirm whether "Base Structure" (Tahi, draft) and "Standard Page" (Lumos, draft) are conceptually the same "duplicate-this" page template** so an AI skill can treat them as equivalent anchors across both frameworks.
10. **Pull `Global Styles`-equivalent embed CSS for Tahi** (if one exists under a differently named component/embed) to confirm whether Client-First forks also centralize their reset/utility CSS in one embed, or scatter it across page-level freeform code.
