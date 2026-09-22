# Client-First reference sites: what the developer actually does

Read-only analysis via the Webflow MCP (Data API + Designer bridge) of three Tahi Studio sites, 22 Sep 2026.
No site was modified. Evidence is quoted with real class, component, variable and page names.

| Site | Site ID | Role in this research |
|---|---|---|
| Flowout Assignment | `67ab6faab1d2bbf8fb83d895` | The "good Client-First" client-style reference (small, 4 pages, published) |
| Nexus Law Template | `689a39b5d744fc4c2c597b80` | Marketplace template in Client-First + Relume Style Guide v3.0, with `template-pages` folder |
| Meditrain | `6a600a607a4c74cf47858881` | Live client site, Client-First, model for JSON-LD on every page; 42 pages, ecommerce, CMS-heavy |

Scope caveats: `get_all_elements` was run at depth 3-6 on home, Style Guide, Base Structure, a CMS template and one regional page per site; classes were pulled via `get_styles all` (names only) and `query_styles` (properties for structural classes); components via `get_all_components` with props/variants/instance counts; variables via `get_variable_collections` + `get_variables` on every collection (Flowout, Nexus) and the Theme/Colors/Sizes collections (Meditrain); custom code via site freeform, registered scripts, and page freeform on 4-6 pages per site. Nexus Law "Practice Areas Template" returned an empty Body (template page has no static elements yet).

---

## A. Per-site findings

### A1. Flowout Assignment

**Pages (4)**

| Page | Slug | Draft | SEO title | SEO desc | OG | Notes |
|---|---|---|---|---|---|---|
| Home | `/` | no | none | none | titleCopied=false, no image | Only content page. `seo: {}` |
| Style Guide | `style-guide` | **yes** | "Style Guide" | none | copied | Relume-era guide (`rl-styleguide_*`) |
| 404 | `404` | no | "Not Found" | none | copied | Webflow default |
| Password | `401` | no | "Protected page" | none | copied | Webflow default |

No folders, no CMS collections, no CMS templates. Home has no SEO meta at all.

**Home structure (depth 5)**

```
Body
└─ .page-wrapper (div)
   ├─ [Component] Global Styles                     ← first child, always
   ├─ HtmlEmbed .gsap-observer
   ├─ NavbarWrapper .navbar_component  [fs-scrolldisable-element="smart-nav"]
   │  └─ .navbar_container > .navbar_logo-link > img.navbar_logo | .navbar_menu > .navbar_menu-wrapper | .navbar_button-wrapper > a.button.is-small + .navbar_menu-button
   ├─ .main-wrapper (tag: main)
   │  ├─ .section_header      (tag: header)  > .padding-global > .container-large
   │  ├─ .section_testimonial (tag: section) > .padding-global > .container-large
   │  └─ .section_cta         (tag: section, id="smooth-wrapper") > .padding-global > .container-large
   └─ .footer_component (tag: footer) > .padding-global > .container-large > .padding-vertical.padding-xxlarge
```

Semantic tags are set: `main`, `header` (hero), `section`, `footer`. Nav is a native Webflow Navbar element, **not** a component; footer is also inline (not a component). Only one component exists on the whole site.

**Classes** (600 styles: 314 global, 259 combos, 0 library)

| Bucket | Count | Evidence |
|---|---|---|
| Custom (`_`) | 139 | Prefix histogram: `rl-styleguide` 40, `testimonial` 18, `form` 15, `stylesystem` 12, `footer` 11, `navbar` 9, `navbar-dropdown` 9, `header` 6, `utility` 4, `menu-icon` 4, `section` 3, `toggle` 2, `cta` 2, `new-feature`/`new-feat` 1 each, `button-toggle` 1 |
| Utility (no `_`) | 175 | `text-*` 29, `padding-*` 25, `margin-*` 22, `icon-*` 21, `max-width-*` 11, `spacer-*` 11, `shadow-*` 7, `heading-style-*` 6, `background-color-*` 6, `container-*` 3 |
| `is-` combos | 56 | `.button.is-secondary.is-small.is-icon-only`, `.button.is-tertiary`, `.button.is-link.is-alternate`, `.button.is-wide`, `.button-group.is-center`, `.cta_floating-img.is-blue-shape` etc. |
| Other combos | 203 | Almost all Client-First spacing stacks (`.margin-bottom.margin-small`, `.padding-vertical.padding-xxlarge`) |

Deviations / extras vs Finsweet stock:
- Colour utilities are the Relume flavour: `text-color-{alternate,black,primary,secondary,white}`, `background-color-{alternative,black,primary,secondary,tertiary,white}` (note `alternative` vs `alternate` mismatch, and `background-color-black` exists 3 times as duplicates).
- Extra shadow scale: `shadow-xxsmall` to `shadow-xxlarge` (7 sizes).
- Extra spacer scale: `spacer-tiny` to `spacer-xxhuge` (11 sizes) mirroring the padding/margin scale.
- `text-size-tiny` added; `text-size-medium` and `-small`/`-regular` bound to Responsive Typography variables, `-large`/`-tiny` hard-coded.
- `section_*` classes DO carry a style: `overflow: clip; overflow-y: visible` on all three sections (used for GSAP floating images).
- `padding-section-*` classes exist as globals **and** as combos on `.padding-global` (`.padding-global.padding-section-medium`) with empty properties: this is the Relume "padding-section on padding-global" pattern applied but left as empty combos. The actual footer spacing used `.padding-vertical.padding-xxlarge` instead, so `padding-section-*` placement is inconsistent on this site.
- `container-large` is `max-width: 70rem` (Finsweet default is 80rem). `container-small` exists twice (one empty duplicate).
- Non-standard attribute namespace: `miller-colour-toggle`, `miller-parallax` (custom attributes prefixed with a personal/brand namespace).
- `button-toggle__text` uses BEM double underscore (one-off).

**Variables**

| Collection | Modes | Content |
|---|---|---|
| Base | Base | `Base Font/primary font` (Manrope), `Base Font/new feature font` (Nanum Pen Script); `Base Color - Brand/{black,white,purple,pink,blue,deep blue}`; `Base Color - Neutral/{black,white,neutral lightest ... neutral darkest}`; `Base Color - System/{success green, success green light, error red, error red light}` |
| Colours - Alias | Base | `Background Colour/{background primary,secondary,tertiary,alternate,success,error}`, `Border Colour/{border primary,secondary,alternate}`, `Link Colour/{link primary,secondary,alternate}`, `Text Colour/{text primary,secondary,new feature,highlight,alternate,success,error}` — all alias to Base tokens |
| Sizes | Base | Only `Radius/radius-medium` = 0.5em |
| Responsive Typography | Base, Tablet, Mobile (L), Mobile | `Body Text/{medium,regular,small}`, `Heading / h1`, `Heading/h2` (note the stray space in "Heading / h1") with per-breakpoint values (h1 4.5→4→3.5→3rem) |

Two-tier token system (primitive "Base" → semantic "Alias"), British spelling ("Colour"), slash-groups for folders. Dark mode is implemented in JS by rewriting CSS custom props (`--color--background`, `--color--text`, `--color--text-highlight`, `--color--border`) to point at alias variables; it is **not** done with Webflow variable modes.

**Components**: one component, `Global Styles` (instanceCount 2, no props, no group). Nav, footer and CTA are not componentised.

**Custom code**
- Site head: font-smoothing CSS only (`-webkit-font-smoothing: antialiased` etc. plus `-webkit-appearance:none`).
- Site footer: empty. Registered scripts: none.
- Home head: GSAP 3.12.2 core + ScrollTrigger (cdnjs), Finsweet Attributes **V1** `attributes-scrolldisable@1`.
- Home footer: two inline scripts — `initDarkMode()` (localStorage `dark-mode`, `prefers-color-scheme`, toggles `.dark-mode` on `<html>`, animates `.toggle_inner` with GSAP, `[miller-colour-toggle]` attribute hooks) and `initSmoothFloatingElements()` (GSAP Observer + ScrollTrigger parallax on `.header_floating-img, .cta_floating-img` using `[miller-parallax]`). Note `gsap.registerPlugin(ScrollTrigger, Observer)` but the Observer plugin script is not loaded in the head (it may come via the `.gsap-observer` embed).
- No JSON-LD anywhere.

**CMS**: none.

**Style Guide page** (`rl-styleguide_*`, Relume-era Finsweet Client-First guide). Order: sticky nav (`rl-styleguide_nav`) with anchors → header ("Gold star for digging this deep... easter egg") → `#typography` (HTML heading tags h1-h6, `heading-style-h1..h6` classes, other HTML tags: paragraphs, links, blockquotes, ul/ol; `text-size-large..tiny`; `text-weight-xbold..light`; `text-style-italic/strikethrough/allcaps`) → `#colors` → `#effects` → `#UI-elements` (buttons, forms) → structure classes. No variables or components section.

### A2. Nexus Law Template

**Pages (15)**

| Page | Slug / path | Type | Draft | SEO title | SEO desc | OG |
|---|---|---|---|---|---|---|
| Home | `/` | static | no | "Nexus Law - Webflow HTML website template" | none | copied |
| Template Starter Page | `/old-home` | static | no | "Tahi Studio Style Guide" | none | copied + **OG image set** |
| Base Structure | `/static-template-slug-1752419720852` | static | **yes** | none | none | copied |
| Style Guide | `/template-pages/style-guide` | static, folder `template-pages` | **yes** | "Style Guide" | "Relume Style Guide v3.0" | copied |
| Components | `/template-pages/components` | static, folder | **yes** | "Components" | "Relume Style Guide v3.0" | copied |
| Start Here | `/template-pages/start-here` | static, folder | no | "Start Here" | none | copied |
| Licenses | `/template-pages/licenses` | folder | no | "Licenses" | none | copied |
| Changelog | `/template-pages/changelog` | folder | no | "Changelog" | none | copied |
| 404 / Password | `/404`, `/401` | utility | no | defaults | none | copied |
| Partners Template | `detail_partners` → `/partners` | CMS | no | none | none | not copied |
| Practice Areas Template | `detail_practice-areas` | CMS | no | none | none | not copied |
| Sectors Template | `detail_sectors` | CMS | no | none | none | not copied |
| Insights Hubs Template | `detail_insights-hub` | CMS | no | none | none | not copied |
| Case Studies Template | `detail_case-studies` | CMS | no | none | none | not copied |

Folder `template-pages` (id `689a39b5d744fc4c2c597bea`) holds Style Guide, Components, Start Here, Licenses, Changelog. Style Guide and Components are drafts; Start Here/Licenses/Changelog are published. **Start Here has an empty `main-wrapper`** (skeleton only). Leftover pages: "Template Starter Page" at `/old-home` (SEO title "Tahi Studio Style Guide", the only page with an OG image) and the draft "Base Structure" page (a bare `page-wrapper > Global Styles > main-wrapper > section > padding-global > container-large > padding-section-large` skeleton, section has no class).

**Home structure (depth 5)**

```
Body
└─ .page-wrapper
   ├─ [Component] Global Styles
   └─ .main-wrapper (main)
      ├─ Section .section_home-hero.color-scheme-dark       > .home-hero_component.overflow-hidden > TabsWrapper .home-hero_tabs
      ├─ Section .section_features-main.color-scheme-dark   > .padding-global > .container-large
      ├─ Section .section_features-asym.color-scheme-dark   > .padding-global > .container-large
      ├─ Section .section_bento                             > .padding-global > .container-large
      └─ Section .section_team                              > .padding-global > .container-large
```

Observations: native Webflow `Section` element type is used (not Block with tag=section). **No navbar and no footer on the home page at all** (they were not built or were removed; there is no Navbar/Footer component in the component list either). The hero skips `padding-global > container-large` in favour of a bespoke `home-hero_component` wrapper. `color-scheme-dark` is applied as a combo on section classes (`.section_home-hero.color-scheme-dark`).

**Classes** (693 styles: 396 global, 270 combos, 0 library)

| Bucket | Count | Evidence |
|---|---|---|
| Custom (`_`) | 217 | `styleguide` 51, `home-hero` 17, `template-inclusions` 17, `form` 15, `footer` 13, `navbar` 13, `stylesystem` 12, `template-hero` 9, `section` 9, `style-guide` 9, `team` 9, `bento` 9, `template-pages` 8, `utility` 4, `menu-icon` 4, `features-main` 3, `layout9` 3, `features-asym` 3, `button-text` 2, `cta-content` 2, `cta-container` 1, `section-heading` 1 |
| Utility | 179 | Stock Finsweet/Relume set plus `background-color-*` 8, `text-color-*` 4, `shadow-*` 5, `color-scheme-{light,dark}`, `text-style-*` 7 (`-link`, `-muted`, `-nowrap`, `-quote` added), `pointer-events-{auto,none,off}`, `truncate`, `divider`, `css`, `tabs`, `tab` |
| `is-` combos | 45 | `.form_input.is-select-input.is-alternate`, `.tag.is-text.is-alternate`, `.slider-arrow.is-centre-next`, `.navbar_menu.is-page-height-tablet`, `.styleguide_shade-wrapper.is-brand-200`, `.template-inclusions_item.is-start/-middle/-end` |
| Other combos | 225 | Spacing stacks, `.bento_card-large.color-scheme-dark`, `.home-hero_tab-link.text-style-muted`, `.template-inclusions_item.is-end.shadow-medium` |

Property evidence:
- `section_*` classes **carry styles**: `background-color: var(color-scheme-1-background); color: var(color-scheme-1-text)` on `section_features-main`, `section_features-asym`, `section_bento`, `section_team` (+ `overflow:hidden`), `section_styleguide`, `section_template-pages`, `section_template-inclusions`. `section_home-hero` and `section_template-hero` are empty.
- `color-scheme-light` / `color-scheme-dark` are real utilities that set background/text **and switch the variable mode** (`---mode--collection-139f4ef2… : base | mode-1dff52ab…`). This is the Relume v3 scheme-switch pattern via Webflow variable modes.
- `padding-section-{small,medium,large}` are bound to `Section Space/{Small,Medium,Large}` variables (3/5/7rem). Empty combos `.padding-global.padding-section-*` also exist (inherited from the same base as Flowout).
- `container-{small,medium,large}` bound to `Container/{Small,Medium,Large}` variables (48/64/80rem). Duplicate empty `container-small` exists.
- `heading-style-h1..h6` are fully token-driven: font-family/size/line-height/weight all point to the `Font Styles` collection and each class sets a **variable mode** (`---mode--collection-cecf2675… : H1..H6`). One class = one mode switch.
- `shadow-xsmall..xlarge`: `box-shadow` bound to shadow tokens plus mode switch on the `Shadows` collection.
- Naming slips: `styleguide_radius-round ` (trailing space), both `styleguide_*` and `style-guide_*` prefixes coexist, `layout9_item` (Relume generic name left in), `features-main_item_row-1` (double underscore segment), `cta-container_row-2`.
- Custom spacing sizes: `padding-custom1/2/3`, `margin-custom1/2/3` present (stock Client-First).

**Variables**

| Collection | Modes | Content (naming) |
|---|---|---|
| Color Schemes | Base, Dark | `Color Scheme Primary/{Text, Text Secondary, Text Alt, Background, Foreground, Border, Accent, Button Background}` – each aliases a Colors token per mode (e.g. Text: Neutral Darkest → White in Dark) |
| Colors | Base | `Brand Colors/{Primary,Secondary,Tertiary,CTA}` (alias to shades), `Primary Shades/Primary {Lightest..Darkest}` (6), `Secondary Shades/…`, `Tertiary Shades/…`, `CTA Shades/…`, `Neutral Colors/{Transparent,White,Neutral Lightest..Darkest}`, `Neutral Colors/Opacity/{White 15, White 20, Neutral Dark 15, Neutral Dark 20}` (nested folder) |
| Typography | Base, Tablet, Mobile (L), Mobile | `Font Family/{Heading,Body}` (Teachers / Jost Variable), `Font Size/{H1..H6, Text Large..Small}`, `Font Weight/{Heading Primary, Heading Secondary, Light, Normal, Medium, Semi Bold}` (Number), `Font Height/{Heading, Body}` (Number). Breakpoint modes exist but values queried at base only |
| Font Styles | Base, Font Small, Font Large, H1..H6, Tag | Four variables only: `Font Size`, `Font Weight`, `Font Height`, `Font Family` – each mode re-points them (H1 mode → Font Size/H1, Font Weight/Heading Primary, Font Height/Heading, Font Family/Heading). This is the engine behind `heading-style-*` |
| UI Styles | Base | `Radius/{Small 0.25rem, Medium 0.5rem, Large 0.75rem, Round 100%}`, `Stroke/{Border Width 1px, Divider Width 2px}` |
| Sizes | Base, Tablet, Mobile (L), Mobile | `Section Space/{Small 3, Medium 5, Large 7}rem`, `Space/{XXSmall .5 … XXLarge 5}rem`, `Site/Global Padding 5%`, `Max Width/{XXSmall 20 … XXLarge 80}rem` (one named `Max Width/ Small` with stray space), `Container/{Large 80, Medium 64, Small 48}rem` |
| Shadows | Base, XSmall, Small, Large, XLarge | `Layer One/{X,Y,Blur,Size,Color}`, `Layer Two/{X,Y,Blur,Size,Color}` per mode |

Types used: Color, Size, Number, FontFamily. Naming is Title Case with `/` folders; CSS names come out as `--_colors---brand-colors--primary`. Variable IDs are prefixed `relume-variable-…` for the stock ones, confirming the Relume Style Guide v3.0 base.

**Components (11)**

| Component | Group | Instances | Props (groups) | Variants | Notes |
|---|---|---|---|---|---|
| Global Styles | – | 10 | none | Base | on every page |
| Button | Button | 36 | Link, Size(variant), Variant, Layout, Text | Small / Medium / Large | description "The Button component" |
| Button Content | Button | 36 | Variant, Layout, Text, Icon(image) | Primary, Secondary, Alternate, Secondary Alternate, Link, Link Alternate | sub-component |
| Button Layout | Button | 36 | Layout(variant), Text | Normal / Reversed | sub-component (3-level nested button) |
| Home Hero Section | Sections | **0** | `1st Tab` (tooltip "Enter the title that best describes the screen") | Base | unused |
| Main Feature Card | Cards | 5 | 15 props in groups Content / Visibility / Button; tooltips on ~5 | Base | long marketing description |
| Asymmetric Feature Card | Cards | 3 | Layout / Content / Visibility / Functional (`HTML Heading Tag` headingTag prop, default h3) | 0% / 25% / 50% From Top | tooltip explains heading-tag SEO rationale |
| Bento Card Large | Cards | 1 | Button / Content (incl. Background Image) | Base | |
| Feature List | Slots | 2 | `Number Of Columns` variant, `Slot`, `Slot 2`, `Slot 3`, `Scroll Reveal ('active' or none)` string in group Animations | 2 columns / 3 columns | slot-based layout |
| Section Heading | Utility Components | 4 | Content / Visibility / Functional (`HTML Heading Tag`, default h2) / Button | Base | |
| Tag | Utility Components | 4 | Variant, Text | Primary / Alternative | |
| CTA Content | CTA | 1 | two props both named `Slot`, Variant | Base / Alignment Right | duplicate prop names |

No Navbar or Footer component. Prop typos: `Icon Visiblity` (sic) appears in Main Feature Card and Bento Card Large. No component name carries "(dev)" or similar. Groups used: Button, Sections, Cards, Slots, Utility Components, CTA.

**Custom code**: site head = font-smoothing CSS only (`-webkit/-moz/-o-font-smoothing`, no `appearance`); site footer empty; **0 registered scripts**; page head/footer empty on Home, Start Here, Style Guide, Practice Areas Template. **Template rule "no custom code" is confirmed** (the head CSS snippet is the only exception, and it is CSS not JS).

**CMS (5 collections)**: Partners, Practice Areas, Sectors, Insights Hubs, Case Studies. Title Case plural display names, singular names set (`Practice Area`, `Case Study`, `Insights Hub`), slugs plural (`practice-areas`, `case-studies`) except `insights-hub`. Field evidence:
- Practice Areas: `Icon` (Image, required), `Short Description` (PlainText, maxLength 280), `Detailed Overview` (RichText, minLength 500), `Lead Partner(s)` (MultiReference). Every custom field has 2-3 sentence help text ("Keep it under 280 characters"). **Bug**: `Lead Partner(s)` references collection `68af66869c4c0addb49a3c0a` = Practice Areas itself, not Partners.
- Case Studies: `Client Name`, `Featured Image`, `Short Quote / Testimonial` (max 300), `Key Stat / Outcome`, `Full Case Study Content`, `Related Practice Area(s)` (MultiRef → Practice Areas), `Related Sector(s)` (MultiRef → Sectors), `Featured Case Study?` (Switch), Name renamed to `Case Study Title` with help text. All required except the switch. No field groups.

**Style Guide page** (`section_styleguide > padding-global > …`, Relume Style Guide v3.0 markup `styleguide_*`). Anchor order: `#colors` (headings "Color Scemes" [sic], "Neatral Colors" [sic], "Brand Colors" with `is-brand-200..800` and `is-secondary-200..800` shade cards, then `background-color-{cta,primary,foreground,accent}` and `is-text`/`is-border` cards) → `#typography` (Heading HTML Tags, Heading Classes, Other HTML Tags, Text Sizes, Text Colors, Text Weights, Text Styles, Text Alignment, Rich Text) → `#buttons` → `#shadows` → `#UI-elements` (Other UI Elements, Tags, Form Elements light + `is-alternate`, Icons (Image), Icons (Embed)) → `#radius` (Radiuses) → `#spaces` (Paddings, Margins, Spacers) → `#classes` (Structure Classes, Max Widths, Utility Classes). No variables or components section on the Style Guide itself.

**Components page** (`section_styleguide` again, `style-guide_title` h5 labels): Button, Button Secondary, Button Link, Button Alternate, Button Secondary Alternate, Button Link Alternate, Tab Link, Category Filter Link, Slider Arrow, Tag, Tag Alternate, Form Label/Input/Text Area/Select/Checkbox/Radio/Submit (+ Alternate set), Icon XXSmall..XLarge, Icon 1x1 XXSmall..XLarge, Icon Embed XXSmall..XLarge. It documents element-level UI, not the Webflow components (Cards, Section Heading etc. are not showcased).

### A3. Meditrain

**Pages (42)**

| Type | Count | Pages | SEO title/desc | OG image |
|---|---|---|---|---|
| Static marketing | 10 | Home, About, Why MediTrain, FAQs, Shop, For Business, For Schools, Contact, Courses, Blog | all set, pattern `Page | MediTrain` / `… | NZQA Approved | MediTrain` | set on all (mostly `6a603c1c…` hero image; Blog/Courses/For Schools/For Business/Why have page-specific images) |
| Regional landing | 13 | Auckland, Northland, Waikato, Bay of Plenty, Central Plateau, Manawatu & Whanganui, Taranaki, Wellington, Nelson Marlborough & Tasman, Christchurch, Dunedin, Southland | all set (`First Aid Courses in X | NZQA Approved | MediTrain`) | set (same hero) |
| Legal / compliance | 3 | Privacy Policy, Terms of Service, NZQA Code Self-Review Report 2025 | set | set |
| Ecommerce utility | 3 | Checkout, Checkout (PayPal), Order Confirmation | **none** | none |
| CMS templates | 10 | Courses, Blog Posts, Products, Categories, SKUs, Locations, Regions, Team Members, Sub Categories, Blog Categories | Courses/Posts/Products/Categories bind `{{wf …}}` fields (`seo-title`, `seo-description`/`meta-description`, `name`, `description`/`paragraph`); Blog Categories binds `seo-title`/`description`; SKUs, Locations, Regions, Team Members, Sub Categories = none | Courses/Posts/Products/Categories set; others none |
| Utility | 5 | 404, 401, Base Structure (draft), Style Guide (draft, folder `template-pages`) | defaults | none |

`shouldPublish: false` on Team Members, Regions, Locations, Sub Categories, Blog Categories templates (collections exist but their template pages are excluded from publish). Folder `template-pages` exists (id `6a600a607a4c74cf47858860`) but only Style Guide is in it; Base Structure sits at root as a draft. Style Guide SEO description is still "Relume Style Guide v3.0".

**JSON-LD schema (query_pages_schema_markup on all 42 pages)**

| Page type | Structure | Types |
|---|---|---|
| Home | `@graph` of 3 nodes | `Organization` + `EducationalOrganization` (array `@type`) with `@id …/#organization`, legalName, slogan, foundingDate 1991, logo ImageObject, address PostalAddress, areaServed Country, contactPoint[], sameAs[]; `WebSite` `@id …/#website` with publisher ref; `WebPage` with `isPartOf`, `about`, `primaryImageOfPage` |
| Regional (13) | `@graph` of 3 | `WebPage` (isPartOf, about, breadcrumb refs) + `Service` (`@id …#service`, serviceType "First aid training", provider ref, `areaServed: AdministrativeArea` – array for Nelson/Marlborough/Tasman, `availableChannel: ServiceChannel → /courses`) + `BreadcrumbList` (Home → Region) |
| For Business / For Schools | `@graph` of 3 | `WebPage` + `Service` with `audience` (`BusinessAudience` / `EducationalAudience`), `areaServed: Country NZ`, channel → /contact + `BreadcrumbList`. WebPage here lacks `about`/`publisher` |
| About | 2 | `AboutPage` (mainEntity → #organization) + `BreadcrumbList` |
| Contact | 3 | `ContactPage` + `LocalBusiness` (`@id …/#head-office`, parentOrganization ref, telephone, email, address) + `BreadcrumbList` |
| Courses, Shop | 2 | `CollectionPage` + `BreadcrumbList` |
| Blog | 2 | `Blog` + `BreadcrumbList` |
| Why MediTrain, Privacy, Terms, NZQA report | 2 | `WebPage` (+ description, publisher/about) + `BreadcrumbList` |
| FAQs | **flat object, not @graph** | `FAQPage` with 12 `Question`/`Answer` mainEntity; no WebPage, no BreadcrumbList, no `@id`s |
| CMS templates (Courses, Blog Posts, Products, Categories) | **Page head custom code**, not page-settings schema | Course: `Course` + `hasCourseInstance: CourseInstance` + `offers` (price from `price-nzd`, courseMode/courseWorkload from `schema-course-mode`/`schema-workload` fields) + `BreadcrumbList`; Post: `BlogPosting` (author/publisher → #organization, articleSection from `blog-category:name`, datePublished = dateModified = post-date) + `BreadcrumbList`; Product: `Product` (sku/image from `default-sku:*`) + `BreadcrumbList`, plus a `<script type="application/json" id="mt-commerce">` price payload; Category: `CollectionPage` + `BreadcrumbList` |
| No schema at all | – | Checkout, PayPal Checkout, Order Confirmation, 404, 401, Base Structure, Style Guide, and CMS templates for SKUs, Locations, Regions, Team Members, Sub Categories, Blog Categories |

Cross-page conventions: `@context https://schema.org`; every node has a stable `@id` (`/#organization`, `/#website`, `<url>#breadcrumb`, `<url>#service`, `<url>#course`, `<url>#post`, `<url>#product`); `inLanguage: en-NZ` everywhere; entity references by `@id` only (Organization is defined once on Home and referenced elsewhere); last breadcrumb ListItem has no `item`; canonical URLs are absolute `https://www.meditrain.co.nz/…`. A registered `schema_enhancer` script (footer, v1.0.0, added 21 Sep 2026) exists alongside – its content was not retrievable (hosted file) so its role is unknown.

**Home structure (depth 5)**

```
Body
└─ .page-wrapper
   ├─ [Component] Navbar        props: Variant=base, Show Utility Bar=true   ← Navbar BEFORE Global Styles
   ├─ [Component] Global Styles
   ├─ .main-wrapper (main)
   │  ├─ [Component] Page Hero            (Heading, Intro Text, Image, Image Alt Text, Primary/Secondary Label+Link, Show Secondary Button, Show Stats, Stat 1-3 Label, Stat 2 Value)
   │  ├─ [Component] Region Chips         (Heading, Intro Text)
   │  ├─ [Component] Courses              (Variant=Tinted, Filters, Sort=home-order asc, Heading, Intro Text, Max Courses=6)
   │  ├─ [Component] Onsite Band          (Heading, Body Text, Image, Image Alt Text, Button Label, Button Link)
   │  ├─ [Component] Why MediTrain        (Heading, Intro Text, Feature 1-3 Title/Text, Show Feature 2/3, Image, Image Alt Text)
   │  ├─ [Component] Testimonials Section (Quote 1-10, Author 1-10, Show 1-10, Heading)
   │  ├─ [Component] Blog                 (Filters, Sort=post-date desc, Visibility, Visibility section, Size/Variant/Layout, Icon Visiblity, Icon, Title, Text, Heading, "Intro Text"=link prop, Posts To Show=3)
   │  ├─ [Component] FAQ Section          (Question/Answer/Show 1-8, Subtext, Heading)
   │  └─ [Component] CTA Band             (Image ×2, Heading, Text, Primary/Secondary Label+Link)
   └─ [Component] Footer
```

The home page is **100 % component instances** inside `main-wrapper`; there are no page-level `section_*` blocks. Inside components the chain is Client-First: `Page Hero` root = `Section .section_home-header > .padding-global > .container-large > .padding-section-small.home-hero_pad > .home-header_grid`; `CTA Band` root = `Section .section_cta > .padding-global > .container-large > .padding-section-large.cta_pad > .cta_card`; `Footer` root = `footer.section_footer > .padding-global > .container-large > .footer_top` + `.footer_credits > .footer_ecg-wrap > svg.footer_ecg` + second `.padding-global > .container-large`; `Navbar` root = `nav.navbar > HtmlEmbed.hide + .navbar_top > .navbar_top-inner (util links, CommerceCartWrapper .navbar_cart, [Button]) + .navbar_main > .navbar_container (.navbar_logo, .navbar_menu, .navbar_cta-wrap, .navbar_burger[role=button aria-label]) + .navbar_mobile (links, .navbar_mobile-ctas, .navbar_mobile-phone)`.

Course template page: `page-wrapper > Global Styles > main-wrapper > [Navbar] > Section.ccms_hero > Section.ccms_content > Section.ccms_why > Section.ccms_related > [CTA Band] > [Footer]` — here **Navbar and Footer sit inside `main-wrapper`** and sections use a page-abbreviation prefix `ccms_` instead of `section_*`. Auckland regional page: `page-wrapper > [Navbar utility bar off] > Global Styles > main-wrapper > HtmlEmbed.hide > [Page Hero] > [Generic Section] > [Course Dates (Cademy)] > [Courses filtered by region] > [Locations Section filtered by region-ref] > [Specialists Band] > [Team Section CMS] > [Testimonials Section] > [Onsite Band] > [FAQ Section] > [Accreditation Band] > [Footer]`.

**Classes** (1553 styles: 1117 global, 397 combos, 0 library)

| Bucket | Count | Evidence |
|---|---|---|
| Custom (`_`) | 923 | Top prefixes: `whym` 91, `ccms` 54, `styleguide` 52, `pdp` 45, `shop` 44, `sch` 39, `navbar` 38, `cart` 34, `section` 28, `aboutus` 26, `biz` 25, `cntc` 24, `footer` 23, `locations` 17, `template-inclusions` 17, `form` 15, `home-header` 15, `blog` 15, `footer1` 14, `crs` 14, `whychoose` 14, `why` 13, `dates` 13, `post` 13, `course` 13, `specialists` 12, `navbar1` 11, `faqp` 11, `team` 10, `blg` 10, `nzqa` 10, `plp` 9, `cdet` 9, `faq` 8, `accreditation` 8, `testimonials` 8, `filter` 8, `cta` 7, `onsite` 7, `shopbar` 5, `checkout` 5 |
| Utility | 194 | Same stock set as Nexus + `text-color-red`, `text-size-tiny`, `button-1`, `button-grou` (typo), `button-icon`, `btn`, `error`, `success`, `line`, `media`, `empty`, `text-style-tagline parent` (space in name) |
| `is-` combos | 59 | `.button-1.is-navy`, `.button.is-white`, `.button-group.is-center` **and** `.button-group.is-centered`, `.filter_chip.is-list-active`, `.shop_page-number.is-list-active`, `.shop_page-arrow.is-list-pagination-disabled` (Finsweet List states), `.padding-section-large.shop_pad.is-small-top`, `.text-rich-text.is-post-body`, `.aboutus_grid.is-generic` |
| Other combos | 338 | 64 are utility+custom stacks (`.heading-style-h2.courses_heading`, `.padding-section-large.onsite_pad`, `.text-size-large.crs_hero-desc`, `.button-group.ccms_hero-buttons`, `.text-rich-text.ccms_overview`); 22 are `._w-input`/`._w-form` Webflow-internal combos (`.cntc_input-email._w-input`, `.biz_form._w-form`) |

Property evidence:
- `section_*` (28) carry background colour, mostly as **raw `var()` strings or hex**, not variable bindings: `section_team`/`section_banner`/`section_faq`/`section_blog`/`section_regions` = `var(--_colors---neutral-colors--white)`, `section_home-header`/`section_onsite` = `var(--_colors---primary-shades--darker)`, `section_locations` = `#0E1E40`, `section_specialists`/`section_accreditation` = `#ffffff`, `section_dates` = `#ffffff` + leftover grid props, `section_courses` = `display:none`, `section_footer` = brand primary + white text, `section_why` = `padding-bottom` var + white. Only the Relume-inherited ones (`section_styleguide`, `section_template-*`) use proper variable bindings.
- `padding-section-*`, `container-*`, `heading-style-*` are token-bound like Nexus (same IDs = same Relume base). Heading classes additionally hard-code `line-height` (1.1/1.15/1.2/1.25/1.3) and `letter-spacing` (-0.02em … 0em), overriding the Font Styles tokens. `container-medium` here = `Max Width/XLarge` (64rem) and `container-small` = `Max Width/Large` (48rem), i.e. bound to Max Width tokens rather than the `Container/*` tokens (this site has no `Container/*` variables).
- 45 custom classes end in a digit: `whym_section-1 … whym_section-16`, `sch_section-1..7`, `shop_section-1..5`, `crs_section-1..4`, `blg_section-1..3`, `biz_section-1/2`, `aboutus_grid-1`, `aboutus_stat-1`, `aboutus_stat-label-1` — numbered generic sections and Webflow auto-duplicate suffixes.
- Parallel naming systems for the same page: `why`/`whym`/`whychoose` (three prefixes for Why MediTrain), `blog`/`blg`/`post`, `course`/`courses`/`crs`/`ccms`/`cdet`, `faq`/`faqp`, `footer`/`footer1`, `navbar`/`navbar1`, `button`/`button-1`/`btn`/`btn_navy`/`btn_light`/`btn_secondary`, `aboutus`/`abt`.

**Variables**

| Collection | Modes | Content |
|---|---|---|
| Theme (renamed from Relume "Color Schemes", same collection id) | Base, Dark | `UI Colors/{Background, Foreground, Border, Icon}`, `Text/{Primary, Secondary, Body}`, `Button/{Background, Text, Border}`. Dark mode values are a mix of aliases and raw hex (`#0E1E40`, `#D32D45`, `#C8C9CD`) |
| Colors | Base | `Brand Colors/{Primary #1E376C, Secondary #CE202F, CTA #D32D45}` (raw hex, not aliased to shades), `Neutral Colors/{Transparent, White, Lightest, Lighter, Light, Neutral, Dark, Darker, Darkest, Black}`, `Primary Shades/{Lightest..Darkest}`, `Secondary Shades/{Lightest..Darkest}`. No Tertiary/CTA shade groups, no Opacity subgroup |
| Font Styles | Base, Font Small, Font Large, H1-H6 (no Tag mode) | same 4-variable engine as Nexus |
| Typography | Base, Tablet, Mobile (L), Mobile | same structure as Nexus (not re-queried) |
| Sizes | Base, Tablet, Mobile (L), Mobile | `Radius/{Small .5, Medium .75, Large 1.125rem, Round}`, `Space/*`, `Stroke/*` (in rem here), `Max Width/*`, `Section Space/*`, `Site/Margin 5%` (Nexus calls it `Site/Global Padding`). Radius/Stroke live in Sizes here, in `UI Styles` on Nexus |
| Shadows | Base, XSmall, Small, Large, XLarge | as Nexus |

**Components (24)** — all with descriptions, most with tooltips on every prop

| Component | Group | Inst. | Props / tooltips | Variants | Description (excerpt) |
|---|---|---|---|---|---|
| Navbar | Global | 32 | 2 / 1 (`Show Utility Bar` in group Layout) | Base, Dark | "Global site navigation. Sticky… Two variants: Base (white) and…" |
| Footer | Global | 32 | 0 | Base | "Identical on every page, so it has no content props by design. Edit it once here" |
| Global Styles | – | 32 | 0 | Base | (site-wide CSS lives here, per head comment) |
| CTA Band | Global | 15 | 8 / 7 (Content, Buttons, Image) | Base | "Sits directly above the Footer on every page" — has a duplicate `Image` prop (one ungrouped, one in Image) |
| FAQ Section | Global | 18 | 26 / 26 (Content, FAQ 1..FAQ 8) | Base | "Eight question slots, the first four on by default" |
| Testimonials Section | Global | 14 | 31 / 31 (Content, Testimonial 1..10) | Base | "Ten quote slots… Use real reviews only" |
| Button | Button | 227 | 8 / 3 | Small, Medium, Large | "The only button to use anywhere on the site. Set Size, Variant and Layout on the instance" |
| Button Content | Button | 227 | 5 / 2 | Primary, Secondary (Navy), Light, Outline (on dark), Link, Link (on dark) | "Internal… Do not place this on a page directly" |
| Button Layout | Button | 227 | 4 / 2 | Normal, Reversed | "Internal… Do not place this on a page directly" |
| Page Hero | Sections | 13 | 14 / 14 (Content, Image, Buttons, Stats) | Base | H1 guidance "under about 60 characters" |
| Courses | Sections | 16 | 6 / 3 (Collection: `Filters`, `Sort`, `Max Courses`) | Base, Tinted | CMS-list props exposed |
| Locations Section | Sections | 8 | 13 / 7 (Filters/Sort/Image/Button/Content) | Base | region-filtered venue list |
| Course Dates (Cademy) | Sections | 9 | 10 / 10 (Content, Template row) | Base | embed + template row props |
| Team Section CMS | Sections | 2 | 5 / 3 (`Select items`, `Select items 2` = selectedItems) | Base | replaces… |
| Team Section | Sections | **0** | 0 | Base | superseded, unused |
| Why MediTrain, Onsite Band, Accreditation Band (Base/Image left), Specialists Band, Photo Band, Region Chips | Sections | 12 / 13 / 10 / 1 / 3 / 1 | all props tooltipped | | |
| Blog | Sections | 2 | 14 / 5, groups incl. `Button/Content`, `Button/Icon` (nested prop groups) | Base | `Intro Text` prop is a **link** type (mis-typed) |
| Shop Category Bar | Shop | 2 | 0 | Base | |
| Generic Section | – | 12 | 26 / 6 (`Text 1..Text 7`, `stats visibility`, duplicated Button prop sets) | Base | no description, no group |

No component names carry "(dev)". Prop-name typos repeat from the Relume base: `Icon Visiblity`. Component descriptions are written as operator instructions (who may place it, what to edit, real-content rules).

**Custom code**
- Site head (dated comment "Added 21 Sep 2026"): Google Consent Mode v2 defaults (EEA/UK/CH denied, elsewhere granted, `wait_for_update:500`), re-apply from `localStorage.mt_consent`, `dataLayer.push({env: production|staging})`, GTM `GTM-W8B77C2`, Microsoft Clarity `jjd5ie5ane` gated on consent, then a comment that "All site-wide CSS now lives in the Global Styles component", then Finsweet Attributes **V2** loader `@finsweet/attributes@2/attributes.js` with `fs-list` (kept in head because it matches its own `<script>` by src).
- Site footer: Cademy sync worker `meditrain-cademy-sync.adrian-5a8.workers.dev/site.js` (defer; runs only where `.ccms_dates-slot` exists); inline mobile-nav toggle (`.navbar_mobile.is-open`, `.navbar_burger.is-active`, Escape key, `matchMedia(min-width: 992px)`); testimonials scroller (`[data-tslider="track"]`, `[data-tslide]`); CMS card equal-height CSS (`.courses_grid .w-dyn-item{display:flex}`); NZQA tag splitter (`.course_card-tags` → `.course_tag` pills); commerce theming CSS for `.w-commerce-*` with hard-coded `#0e1e40`, `#d32d45`, `"Libre Franklin"`; shopbar active-state script (`.shopbar_cell-active`).
- Registered scripts (6, all hosted v1.0.0): `meditrain_interactions`, `cademy_iframe_helper`, `cookie_consent`, `schema_enhancer` (applied site-wide, footer); `faq_accordion` and `faq_accordions` registered but **not applied** (duplicate pair).
- Page code: CMS templates carry JSON-LD in page head (see schema table); static pages (Home, Courses, FAQs, Auckland) have none. `get_page_scripts` returns 404 on all pages checked (no page-level registered scripts).

**CMS (10 collections)**: Blog Posts, Courses, Categories, Products, SKUs, Locations, Regions, Team Members, Sub Categories, Blog Categories. Title Case plural display, singular set, slugs **singular** (`post`, `course`, `category`, `product`, `location`, `region`, `team-member`, `sub-category`, `blog-category`).
- Courses (30 fields, none required except name/slug): `Duration`, `Summary`, `Overview`, `NZQA Tags` ("Comma separated…"), `Price`, `Main Image`, `Cademy ID` ("set by the sync. Do not edit by hand."), `Cademy Slug`, `Cademy URL`, `SEO Title`/`SEO Description` ("Bind in the template page SEO settings"), `Rating`, `Rating Count`, `What You Learn`, `NZQA Credits`, `Course Requirements`, `Page Link` ("Internal URL… /course/slug. Used by card Book now buttons"), `Home Order`, `Show In Nav`, `Nav Order` ("Webflow's default order is reverse creation order, so this must be set"), `Category` (Option, slug `category-2`), `Course Group` (Option; help text says it "Replaces the older Category field, which is still wired to the nav until that binding is moved"), `Locations`/`Regions` (MultiRef, no help text), `Cademy Book URL`, `Cademy Group Booking URL`, `Price NZD` ("Feeds the structured data offer… Keep it matching the Price field"), `Schema Workload` (ISO 8601), `Schema Course Mode`. Help text is present on ~75 % of fields and is operational ("Feeds structured data only, not shown on the site").
- Blog Posts: `Category (text mirror)` (legacy, help text says delete after chips are rebound), `Post Date`, `Excerpt`, `Main Image`, `Body`, `Read Time` ("e.g. 4 min read"), `Post Link` (slug `post-link-2`), `SEO Title`, `Meta Description`, `Blog Category` (Reference → Blog Categories). No field groups on either.

**Style Guide page**: identical Relume v3.0 structure and anchor order as Nexus (`#colors` → `#typography` → `#buttons` (+ "Buttons With Icons") → `#shadows` → `#UI-elements` → `#radius` → `#spaces` → `#classes`), same "Color Scemes"/"Neatral Colors" typos, neutral swatches renamed `is-color-neutral-darkest … -lightest`, brand shades `is-brand-50/200/400/600/700/800`. It is a draft and does not reflect the 900+ custom classes or the 24 components.

---

## B. The developer's Client-First conventions (rules derived from evidence)

Legend: F = Flowout, N = Nexus Law, M = Meditrain.

**Page skeleton**
1. Every page starts `Body > div.page-wrapper > [Global Styles component] > main.main-wrapper`. `page-wrapper` is a plain div, `main-wrapper` gets tag `main`. (F, N, M; Style Guide pages leave `main-wrapper` as div — F, N, M)
2. `Global Styles` is a props-less component instanced on every page and is the home for site-wide CSS embeds; the site head explicitly says CSS belongs there, not in project settings. (F, N, M; explicit in M head comment)
3. Sections follow `section_[name] > .padding-global > .container-large > .padding-section-[size] > content`. `padding-section-*` is applied on its own div inside the container, not on `padding-global` (the empty `.padding-global.padding-section-*` combos are unused leftovers). (N Base Structure; M Page Hero, CTA Band, Footer; F uses `.padding-vertical.padding-xxlarge` in the footer instead)
4. Semantic tags are set on wrappers: `header` for the hero section, `section` for others, `footer` for the footer, `nav` for the navbar component root. Newer sites use the native Webflow `Section` element rather than Block+tag. (F: Block+tag; N, M: Section element)
5. The hero is the one section allowed to break the container pattern (`home-hero_component` on N; `padding-section-small.home-hero_pad` on M).

**Class naming**
6. Custom classes are `[component]_[element]` with a lowercase, hyphenated element part: `navbar_logo-link`, `footer_link-column`, `testimonial_card-quote-img`, `home-hero_tab-image-wrapper`. Prefix = the section/component name; `section_[name]` for the outer wrapper. (F, N, M)
7. Variants are `is-` combos on the base class, stacked when needed: `.button.is-secondary.is-small.is-icon-only`, `.form_input.is-select-input.is-alternate`, `.tag.is-text.is-alternate`. `is-alternate` is the standard "on dark" variant name. (F, N, M)
8. Utility classes are the stock Finsweet Client-First + Relume v3 set: `padding-*`/`margin-*` (with `-custom1/2/3`), `spacer-*`, `max-width-*` (with `-full-tablet/-mobile-landscape/-mobile-portrait`), `icon-1x1-*`, `icon-embed-*`, `icon-height-*`, `heading-style-h1..h6`, `text-size-*`, `text-weight-*`, `text-style-*`, `text-align-*`, `text-color-*`, `background-color-*`, `shadow-*`, `hide-*`, `overflow-*`, `z-index-1/2`, `pointer-events-*`, `align-center`. (F, N, M)
9. Approved additions beyond stock: `color-scheme-light`/`color-scheme-dark` (mode-switching utilities), `shadow-xsmall..xlarge`, `text-style-link/-muted/-nowrap/-quote`, `text-size-tiny`, `text-color-red` (M only), `truncate`, `divider`. (N, M; F has its own `shadow-xxsmall..xxlarge`, `spacer-tiny..xxhuge`)
10. `section_*` classes are allowed to carry styles, but only surface-level ones: background colour + text colour (N, M) or `overflow` (F). Layout never lives on `section_*`.
11. Utilities combine with custom classes in a fixed order, utility first: `.heading-style-h2.courses_heading`, `.padding-section-large.cta_pad`, `.button-group.ccms_hero-buttons`, `.text-rich-text.is-post-body`. (M, 64 instances; N `.bento_card-large.color-scheme-dark`)
12. Custom attributes use a namespace prefix rather than `data-*`: `miller-colour-toggle`, `miller-parallax` (F); `data-tslider`, `data-tslide` (M). Finsweet attributes appear as `fs-scrolldisable-element` (F, V1) and `fs-list` (M, V2).

**Variables**
13. Two-tier tokens: primitive collection (`Colors` / `Base`) → semantic collection with modes (`Color Schemes` / `Theme` / `Colours - Alias`). Semantic tokens alias primitives, never raw hex, on the reference sites (F, N). Names are Title Case with `/` folders (`Brand Colors/Primary`, `Primary Shades/Primary Darkest`). (F, N, M)
14. Colour scale per brand colour is a 6-step `Lightest, Lighter, Light, Dark, Darker, Darkest`, with the base colour aliased into `Brand Colors/…`. Neutrals are `Transparent, White, Neutral Lightest … Neutral Darkest` (+ `Opacity/White 15|20, Neutral Dark 15|20` on N). (N, M)
15. Typography is driven by a 4-variable `Font Styles` collection whose modes are the type scale (`Font Small, Font Large, H1..H6, Tag`); `heading-style-hN` simply sets the mode. `Typography` holds the raw `Font Family/Font Size/Font Weight/Font Height` tokens with Tablet/Mobile (L)/Mobile modes. (N, M; F has a simpler `Responsive Typography` with breakpoint modes)
16. Spacing tokens: `Section Space/{Small 3, Medium 5, Large 7}rem` feed `padding-section-*`; `Space/{XXSmall .5 … XXLarge 5}rem`; `Max Width/{XXSmall 20 … XXLarge 80}rem`; `Site/Global Padding` (or `Site/Margin`) = 5% feeds `padding-global`; `Container/{Small 48, Medium 64, Large 80}rem`. (N; M without Container)
17. Shadows are 2-layer (`Layer One/Two × X,Y,Blur,Size,Color`) with size modes; `shadow-*` utilities switch the mode. Radius tokens `Small/Medium/Large/Round`. (N, M)
18. Dark/alternate sections are done with variable modes via `color-scheme-dark`, not duplicated colour utilities. (N, M utilities exist; F does dark mode with JS instead)

**Components**
19. Client sites componentise every section: Navbar, Footer, CTA Band, FAQ Section, Testimonials Section, Page Hero, plus content bands. Pages become a stack of instances; nothing on the page is a loose section. (M; F pre-dates this)
20. Component groups: `Global` (Navbar, Footer, CTA Band, FAQ, Testimonials), `Sections`, `Button`, `Shop` / `Cards` / `Slots` / `Utility Components` / `CTA`. (N, M)
21. Buttons are a 3-level nested component: `Button` (Size variants Small/Medium/Large, Link, Text) → `Button Content` (colour variants) → `Button Layout` (Normal/Reversed icon order). Internal parts are described "Do not place this on a page directly". (N, M identical architecture)
22. Every component prop gets a group and a tooltip written for the editor, with concrete constraints ("under about 60 characters", "Landscape, at least 1200px wide", "Numbers only, no suffix", "Use real reviews only"). Repeating items are exposed as numbered prop groups with a `Show N` boolean (`FAQ 1..8`, `Testimonial 1..10`, `Feature 1..3`). (M; N tooltips are sparser and marketing-toned)
23. Component descriptions state where the component is used and what is editable ("Sits directly above the Footer on every page", "Identical on every page, so it has no content props by design"). (M)
24. CMS-driven sections expose Webflow's `Filters`, `Sort`, and a count (`Max Courses`, `Posts To Show`) as props so instances can be filtered per page (region pages filter `regions contains <id>`). (M)
25. Heading level is a prop where SEO matters (`HTML Heading Tag`, headingTag type, default h2 for section headings, h3 for cards). (N)
26. Alt text is a dedicated `altText` prop next to each `image` prop (`Image Alt Text`). (M)

**Pages, SEO, schema**
27. Every published page has SEO title in the form `Primary phrase | Qualifier | Brand` (`First Aid Courses in Auckland | NZQA Approved | MediTrain`) and a meta description; OG copies SEO and sets a site-wide default OG image; CMS templates bind SEO fields (`seo-title`, `seo-description`/`meta-description`). (M; N template only sets the Home title; F has no SEO at all)
28. JSON-LD lives in Page Settings (schema field) for static pages and in page head custom code for CMS templates (because it needs `{{wf}}` bindings). Structure: `@context` + `@graph`, one `Organization` (+ `WebSite`) defined on Home with `@id …/#organization` and `…/#website`; every other page adds `WebPage` (or `AboutPage`/`ContactPage`/`CollectionPage`/`Blog`) + `BreadcrumbList` + a page-type entity (`Service`, `LocalBusiness`, `Course`, `BlogPosting`, `Product`) that references the organization by `@id`. `inLanguage: en-NZ` on every node; last breadcrumb has no `item`. (M)
29. Schema-only CMS fields are named `Schema …` and documented as "Feeds structured data only, not shown on the site" (`Schema Workload`, `Schema Course Mode`, `Price NZD`). (M)

**CMS**
30. Collections: Title Case plural display name, singular name set, **singular slug** on client sites (`course`, `post`, `region`), plural on the template (`practice-areas`). Fields Title Case; help text on nearly every field, written as operating instructions including which template binding uses it and what an external sync owns ("set by the sync. Do not edit by hand."). Reference fields are `Reference`/`MultiReference` to sibling collections; legacy fields are labelled `(text mirror)` with a deletion condition. (M, N)

**Custom code**
31. Templates: no JS at all, only the font-smoothing CSS in the head. (N)
32. Client sites: analytics/consent/GTM/Clarity in site head with dated comments explaining order; third-party module loaders (Finsweet Attributes V2) in head; behaviour scripts in site footer as small IIFEs with a one-line HTML comment header each; reusable scripts registered as hosted `registered scripts` v1.0.0 and applied site-wide in footer. (M) F still uses Finsweet V1 and page-level GSAP.
33. Template utility pages live in a `template-pages` folder: Style Guide, Components, Start Here, Licenses, Changelog; Style Guide and Components are drafts, the others publish. (N; M kept the folder with only Style Guide)

---

## C. Client-site pattern (Flowout / Meditrain) vs template pattern (Nexus Law)

| Dimension | Client sites | Template (Nexus Law) |
|---|---|---|
| Custom code | Heavy: GTM, Consent Mode, Clarity, Finsweet V2, Cloudflare worker, 6 registered scripts, inline behaviour scripts (M); GSAP + FS V1 on page (F) | None (only head font-smoothing CSS). 0 registered scripts, empty page code |
| Componentisation | Whole page is component instances; Navbar/Footer/CTA are components; props tooltipped and grouped (M). F: only Global Styles | Reusable Cards / Section Heading / Button / Feature List (slots) / Tag; **no Navbar/Footer component**; home built from raw `section_*` blocks |
| Section naming | `section_[page-topic]` + page-abbreviation prefixes (`ccms_`, `whym_`, `sch_`) and numbered sections | `section_[layout-name]` (`section_features-asym`, `section_bento`) + `color-scheme-*` combos |
| Colour system | `Theme` with Base/Dark, raw hex leaks into tokens and `section_*` classes (M); Base→Alias with JS dark mode (F) | Clean `Colors` → `Color Schemes` aliasing, 4 brand colours × 6 shades, opacity tokens, mode-switch utilities |
| Style Guide | Relume v3 draft, not updated for site-specific classes/components (M); Relume-era `rl-styleguide_*` (F) | Relume v3 Style Guide + separate Components page + Start Here / Licenses / Changelog in `template-pages` |
| SEO / schema | Full SEO on every published page, OG image, JSON-LD graph everywhere (M); none (F) | Only Home title; CMS templates unbound; no schema |
| CMS | Slug singular, operational help text, sync-owned fields, `Schema *` fields (M) | Slug plural, marketing-style help text with examples, all fields required, MultiRef self-reference bug |
| Props | Numbered slot props with `Show N` toggles; `Filters`/`Sort` exposed | Slot props (`Slot`, `Slot 2`, `Slot 3`), `HTML Heading Tag` props, animation string prop |
| Wrapper order | Navbar as first child of `page-wrapper` (before Global Styles) on static pages; inside `main-wrapper` on CMS template (M) | Global Styles first, no nav |
| Leftovers | Duplicate class families, unused `Team Section`, unapplied `faq_accordion(s)` scripts | Unused `Home Hero Section` component, `/old-home` page, draft `Base Structure` at root |

---

## D. Inconsistencies and weaknesses

**Meditrain (most)**
1. Class explosion: 1117 global classes, 923 custom. Three-to-five parallel prefixes for the same page (`why`/`whym`/`whychoose`, `blog`/`blg`/`post`, `course`/`courses`/`crs`/`ccms`/`cdet`, `faq`/`faqp`, `footer`/`footer1`, `navbar`/`navbar1`, `aboutus`/`abt`). 45 classes end in a digit (`whym_section-1…-16`, `sch_section-1…-7`, `aboutus_stat-label-1`), i.e. Webflow auto-suffixes and numbered generic sections were never renamed.
2. Button system fractured: `Button` component (227 instances) coexists with `button-1.is-navy`, `button-1.is-small`, `button.is-white`, `btn`, `btn_navy`, `btn_light`, `btn_secondary`, `button-grou` (typo), `button-icon`, `.button-content.secondary-navy` (variant as a non-`is-` combo).
3. `button-group.is-center` and `button-group.is-centered` both exist.
4. `section_*` classes hard-code colours (`#0E1E40`, `#ffffff`, `#FFFFFF`) or paste `var(--_colors---…)` strings instead of binding variables; `section_dates` carries leftover grid properties; `section_courses` is `display:none`.
5. `Theme` dark-mode values are raw hex (`#0E1E40`, `#D32D45`) instead of aliases; `Brand Colors/*` are raw hex rather than aliasing shades (Nexus aliases them).
6. `heading-style-*` override the token engine with hard-coded `line-height` and `letter-spacing`.
7. `container-small/medium` bound to `Max Width/*` tokens because the `Container/*` tokens were deleted or never created.
8. `Blog` component: `Intro Text` prop is of type `link`; `Title`/`Heading`/`Text` naming is muddled; nested group paths `Button/Content`, `Button/Icon`. `CTA Band` has two `Image` props. `Generic Section` has 26 props named `Text 1..Text 7` and `stats visibility` with no description or group. `Team Section` (0 instances) not deleted.
9. Navbar placement is inconsistent: first child of `page-wrapper` on Home/Auckland, but inside `main-wrapper` on the Course template (Footer also inside `main` there). Home has Navbar *before* Global Styles; Auckland has Navbar, then Global Styles.
10. Schema gaps: FAQs page uses a flat `FAQPage` without `@graph`, `WebPage`, breadcrumb or `@id`, breaking the site pattern (and its 12 questions differ from the 8 in the FAQ Section component). For Business / For Schools `WebPage` nodes lack `about`/`publisher`. No schema on Checkout/Order Confirmation (acceptable) but also none on Locations, Regions, Team Members, Sub Categories, Blog Categories templates, and none on SKU template. `BlogPosting.dateModified` = `datePublished`. Product schema has no `offers` (price is pushed to a separate `#mt-commerce` JSON blob instead). `schema_enhancer` registered script's purpose is undocumented.
11. Two FAQ scripts registered (`faq_accordion`, `faq_accordions`), neither applied.
12. Commerce theming CSS in site footer hard-codes `#0e1e40`, `#d32d45`, `#f2f4f7`, `#e5e6e9`, `"Libre Franklin"` instead of `var(--…)`.
13. Courses CMS still has both `Category` (slug `category-2`) and `Course Group`; Blog Posts still has `Category (text mirror)`; `Post Link` slug is `post-link-2`. Migration debt is documented in help text but not resolved.
14. Style Guide page is a stale Relume draft ("Color Scemes", "Neatral Colors", SEO desc "Relume Style Guide v3.0") that documents none of the site's real components or classes; Base Structure page sits at root instead of `template-pages`.
15. Five CMS templates have `shouldPublish:false` (Team Members, Regions, Locations, Sub Categories, Blog Categories) while their collections are referenced from live pages.
16. 22 `._w-input`/`._w-form` combo classes (`.cntc_input-email._w-input`) indicate styling applied on Webflow's internal classes.

**Nexus Law**
17. No Navbar/Footer on the home page or in components — a marketplace template without navigation is incomplete.
18. `Lead Partner(s)` MultiReference points at Practice Areas itself instead of Partners.
19. Only Home has an SEO title; CMS templates have no SEO bindings; no OG image except on the leftover `/old-home` page whose SEO title is "Tahi Studio Style Guide".
20. `Start Here` page is an empty `main-wrapper`; `Home Hero Section` component has 0 instances; `Base Structure` draft has a class-less `section`.
21. Style Guide typos ("Color Scemes", "Neatral Colors"), `styleguide_radius-round ` with trailing space, mixed `styleguide_` / `style-guide_` prefixes, `layout9_item` Relume generic name, `features-main_item_row-1` double-underscore, `Max Width/ Small` stray space, `Icon Visiblity` typo in two components, two props both named `Slot` on `CTA Content`.
22. `section_*` classes set background/text colour directly; combined with `color-scheme-dark` combos this is redundant (`.section_features-main.color-scheme-dark` has empty properties).

**Flowout**
23. Home has no SEO title/description or OG image; Style Guide is a draft.
24. `padding-section-*` defined but the footer uses `padding-vertical.padding-xxlarge`; empty `.padding-global.padding-section-*` combos; three duplicate `background-color-black` classes; duplicate `container-small`; `background-color-alternative` vs `text-color-alternate`.
25. `Heading / h1` variable has stray spaces; `Sizes` collection holds a single radius token.
26. Finsweet Attributes V1 (`scrolldisable@1`) and GSAP loaded from cdnjs per page; `Observer` plugin registered without a visible loader; dark mode via JS rewriting `--color--*` custom props rather than variable modes.
27. Nav and footer are not components (only 1 page, so tolerable, but it diverges from M).

---

## E. Follow-up questions for the developer

1. Which is the canonical section skeleton: `section_x > padding-global > container-large > padding-section-large` (Nexus Base Structure, Meditrain components) or `section_x > padding-global > container-large > padding-vertical.padding-xxlarge` (Flowout footer)? Should `padding-section-*` ever be a combo on `padding-global`?
2. Where should the Navbar instance live: first child of `page-wrapper` before `Global Styles` (Meditrain Home), after it (Auckland), or inside `main-wrapper` (Course template)? Same question for Footer.
3. Are `section_*` classes allowed to carry background/text colour (Nexus, Meditrain) or should surface colour always come from `color-scheme-*` / `background-color-*` utilities, leaving `section_*` empty or overflow-only (Flowout)?
4. Is the intended dark/alternate mechanism Webflow variable modes via `color-scheme-dark` (Nexus/Meditrain) or the JS `--color--*` rewrite (Flowout)? Is the Flowout approach retired?
5. Page-abbreviation prefixes (`ccms_`, `whym_`, `sch_`, `crs_`, `cntc_`, `biz_`, `blg_`) on Meditrain: are these an intentional convention for page-scoped classes (and if so what is the abbreviation rule), or legacy from a rushed build to be renamed to `section_*`/component prefixes?
6. Button system: is the 3-level `Button > Button Content > Button Layout` component the only permitted button on client sites (as its description claims), and should `button.is-*` utility combos be removed entirely, or kept for Style Guide / non-component contexts?
7. Variables: is the 6-shade `Lightest…Darkest` scale plus `Brand Colors/*` aliases mandatory, and should `Brand Colors/*` always alias a shade (Nexus) rather than hold raw hex (Meditrain)? Should `Container/*` tokens exist separately from `Max Width/*`?
8. Should `heading-style-*` be allowed to override the `Font Styles` engine with per-class `line-height`/`letter-spacing`, or should those become tokens/modes?
9. JSON-LD placement: page-settings schema for static pages and head code for CMS templates is the observed split. Is that the rule, and what does `schema_enhancer` do (e.g. inject `Organization` on non-Home pages, fix FAQPage)? Should FAQPage be wrapped in `@graph` with `WebPage` + `BreadcrumbList` like every other page?
10. Which CMS templates are supposed to have schema (Locations, Team Members, Regions currently have none) and should `Product` carry `offers` rather than the separate `#mt-commerce` JSON blob?
11. CMS slug convention: singular (`course`, `post`) on client sites vs plural (`practice-areas`) on the template. Which is the rule, and when should fields be required (Nexus: everything required; Meditrain: nothing)?
12. Component prop conventions: numbered slot props with `Show N` booleans (FAQ 1..8, Testimonial 1..10) vs Webflow slots (Nexus `Feature List`). When is each preferred, and is there a hard cap on prop count (Generic Section has 26, Testimonials 31)?
13. For templates, is "no custom code" absolute, or is a Style Guide / Components page allowed to document recommended attributes (Finsweet V2) without loading them? Should Start Here be populated, and should Navbar/Footer be components in the template?
14. Style Guide: should client sites maintain the Relume v3 Style Guide at all, and if so must it be updated with site-specific components and classes, or is the Components page the intended living document?
