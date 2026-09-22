# Larkstone Campground — Webflow Marketplace Pre-QA (read-only, structural)

- Site: `Larkstone Campground` / `larkstone-campground` — site_id `68920498eac06888f67a1f16`
- Workspace `64c8b1f2f99e7b87ac6a98cb`, timezone Pacific/Auckland, no custom domains, single locale (English, primary, `enabled:false`)
- Last published 2026-03-16T21:20:40Z. Designer edits since then (pages last-updated up to 2026-07-22) are **not** on the published `.webflow.io` site.
- Method: Webflow Data/Designer MCP (read-only list/get/query only) + WebFetch/curl of the two guideline pages. Nothing was modified.
- Sources read in full: `https://webflow.com/templates/submission-guidelines`, `https://webflow.com/templates/grading-rubric` (WebFetch returned "Parse Error: Header overflow" on both; retrieved via `curl` and stripped to text — full page text read).

Legend for check type: **[M]** MCP-checkable (structural) · **[B]** browser/visual-only · **[H]** manual (Designer panel / Site settings / submission form).

---

# A) Extracted guideline checklist

## A1. Required Pages
1. Page names use Title Case. **[M]**
2. Page name matches its slug. **[M]**
3. All required pages carry `<meta name="robots" content="noindex">` in page custom head code. **[M]**
4. Style Guide page exists and includes all tags (headings, paragraphs, links, buttons, etc.). **[M]** structure / **[B]** completeness
5. Instructions page exists **if** advanced/complex interactions, hidden components, SVG embeds or GSAP are used; documents how to access/edit them. **[M]** existence / **[B]** content
6. If GSAP in custom code: Instructions page section "How to Edit GSAP Animations" with Element Map, Customizing Key Variables, Removing GSAP Animations. **[B]**
7. License page exists with slug set to `/licenses`. **[M]**
8. Licenses page begins with the exact mandated paragraph ("All graphical assets in this template are licensed for personal and commercial use…"). **[B]**
9. Footer on **every** page includes a visible link to the Licenses page. **[B]**
10. Licenses page lists every custom-installed font with a license link. **[B]**
11. Licenses page lists all images/icons/assets as free for personal + commercial use with source/license links. **[B]**
12. AI-generated images identified on Licenses page: which images, which tool/source, link to its terms. **[B]**
13. (Implied by custom-code rule) Changelog page exists and is noindexed. **[M]**
14. Custom branded 404 page with full navigation and CTAs. **[M]** existence / **[B]** content
15. 401 / Password page present and styled. **[M]** existence / **[B]** styling

## A2. Design Systems — Components
16. Navbars, Footers and CTAs are set up as Components on every template page. **[M]**
17. Component names and variant names in Title Case, concise, consistent, human-readable. **[M]**
18. Expose props/slots/variants instead of duplicating structures. **[M]**
19. Components kept modular/reusable. **[M]** (proxy: instance counts)
20. No nesting of components like sliders or tabs inside each other. **[M]**
21. Unused components removed (instanceCount 0). **[M]**

## A3. Design Systems — Typography
22. All copy uses unique, relevant wording; no "lorem ipsum" or placeholder text. **[M]** (CMS/props) / **[B]** (page copy)
23. Percentage-based line heights. **[M]**
24. No text crashing on itself at any breakpoint. **[B]**
25. Primary font set on Body; secondary fonts applied to tags/classes. **[M]**
26. Correct spelling and grammar throughout. **[M]** partially / **[B]**

## A4. Design Systems — Variables
27. Variables defined for colors (primary/secondary/background). **[M]**
28. Variables for typography (families, sizes, weights). **[M]**
29. Variables for spacing (margins, paddings). **[M]**
30. Variables for brand specifics (radius, shadows). **[M]**
31. Variable names Title Case, words separated by spaces. **[M]**
32. Variable Modes covering tablet, mobile landscape, mobile portrait. **[M]**
33. No one-off/rarely used values as Variables; variables organised into purposeful groups; ramps ordered light→dark / small→large. **[M]** partial / **[H]**

## A5. Design Systems — Styles & naming
34. Baseline tag styles applied to: H1–H6, All Paragraphs, All Unordered Lists, All Ordered Lists, All Blockquotes, All Figures, All Figure Captions, All Links. **[M]**
35. Overrides done via separate classes, not by restyling the tag. **[M]** partial
36. Tag baseline styles use Variables. **[M]**
37. Stacked combo classes limited to 3–4 per element. **[M]**
38. Unused styles/classes cleaned up. **[M]** partial / **[H]** (Designer "unused" indicator)
39. Hover / pressed / focus states styled. **[M]**
40. Consistent grids and spacing from the style guide. **[B]**
41. One consistent class naming format across the template (Default / snake / Pascal / camel / kebab / BEM), unless a named framework (Client-First, Mast, Knockout) is used. **[M]**
42. Descriptive class names reflecting element purpose. **[M]**
43. Combo classes max 3 levels; combo naming matches base format. **[M]**
44. No redundant styles (e.g. `text-align:left` inside a left-aligned parent). **[M]** partial

## A6. Interactions and GSAP
45. Use Webflow Interactions powered by GSAP (IX3); avoid legacy IX2 (default for Marketplace from 1 May 2026). **[M]** (IX3 list) + **[B]** (IX2 only visible in browser)
46. Links and buttons have hover states. **[M]**
47. Interaction names in sentence case and descriptive ("Slide nav down on scroll"). **[M]**
48. Simple CSS transitions for hover/press; complex interactions reserved for advanced cases. **[M]**
49. Pause/skip controls for background videos. **[B]**
50. Unused interactions deleted. **[M]**
51. Every breakpoint spot-checked: no text overflow, layouts adapt, default font sizes. **[B]**
52. Explicit width/height or aspect-ratio boxes on all images; no late image injection. **[M]** partial / **[B]**
53. Animate GPU-friendly properties only (transform, opacity); avoid top/left/width/height/filters/shadows/blend modes. **[M]**
54. Minimise affected animation area. **[M]**
55. Animation durations 150–800 ms. **[M]**
56. Use Initial Appearance rather than `display:none` / `visibility:hidden` / `opacity:0`. **[M]** partial
57. Transitions target specific properties, never `all`. **[M]**
58. Consistent transition behaviour/timings across elements. **[M]**
59. Transitions set on every property that changes on hover. **[M]**

## A7. SEO
60. Homepage SEO title exactly `{Template Name} - Webflow HTML website template` (Ecommerce variant for ecommerce). **[M]**
61. "Powered by Webflow" in the footer linking to webflow.com. **[B]**
62. Passing SEO score on PageSpeed Insights for main pages. **[B]**
63. Every page **and CMS template** has a unique meta title under 60 characters. **[M]**
64. Every page and CMS template has a meta description of 150–160 characters. **[M]**
65. Open Graph metadata on every page: title, description, and a JPEG/PNG image ≥1200×630, 1.91:1. **[M]** (presence) / **[B]** (dimensions)
66. Custom branded 404 page with full navigation and CTAs. **[M]/[B]**
67. Meta tags written naturally for users. **[B]**
68. Concise descriptive slugs. **[M]**
69. OG tags tested; no unsupported formats such as WebP. **[M]**
70. One `<h1>` per page (multiple allowed only when nested in `<section>`/`<article>`); `<h2>`–`<h6>` in correct order, no skipped levels. **[M]**
71. (Template rule, enforced at review) No JSON-LD schema markup shipped on template pages. **[M]**

## A8. Accessibility
72. Passing Core Web Vitals on desktop + mobile (PageSpeed Insights). **[B]**
73. Logical heading order, one H1 per page, no skipped levels (Webflow Audit panel). **[M]**
74. Follow Webflow's accessibility checklist; zero accessibility errors. **[B]**
75. WCAG colour contrast for text, borders, icons, overlays — including focus/hover/active states. **[B]**
76. Content organised for screen readers and keyboard navigation. **[B]**
77. Semantic HTML tags; ARIA roles/labels where needed. **[M]** partial
78. Inclusive, plain language. **[B]**
79. Unique, descriptive link labels. **[M]** partial / **[B]**
80. Alt text on important images; decorative images marked as decorative in the media library. **[M]**
81. No autoplaying media. **[B]**

## A9. Images and Assets
82. High-quality, current imagery; no cut-outs, low-res graphics or generic overused stock. **[B]**
83. Compress images to ≤150 KB where possible. **[M]**
84. Max file size 4 MB. **[M]**
85. Modern formats only (WebP, AVIF, PNG, JPEG). **[M]**
86. CMS images compressed with Webflow-native AVIF/WebP compression. **[M]**
87. Lazy-load below-the-fold images; eager only above the fold. **[M]** partial / **[H]**
88. Responsive images enabled in Project Settings. **[H]**
89. Videos compressed. **[M]/[B]**
90. No autoplay video without controls. **[B]**
91. All assets resale-safe / CC0 (Stock Up, Pexels, Unsplash etc.) with licenses linked. **[B]/[H]**
92. No premium or trademarked graphics; no brand logos (except social icons linking to real accounts). **[B]**
93. AI-generated images: provider terms permit resale + buyer use; disclosed on Licenses page. **[B]/[H]**
94. Nav logo matches template name and is an image file for easy replacement. **[M]**
95. Logo is modern: distinctive logomark + clean wordmark. **[B]**

## A10. Layout and Content
96. All links/buttons link somewhere — no empty links. **[M]**
97. In repeating grid items the main image is a clickable link, not just a hidden text link. **[M]**
98. Consistent spacing; no crammed/cluttered layouts. **[B]**
99. Structure with sections/containers/labelled divs; sections composed from reusable components. **[M]**
100. `min-height` rather than `height` on sections, especially heroes. **[M]**
101. Content aligns with the template category. **[B]**
102. Content appropriate for a global audience; no obscenity, nudity, violence, drugs, political/religious bias. **[B]**
103. Layouts fluid and responsive across all viewports. **[B]**
104. Mobile-optimised margins, padding, type sizes, button sizes. **[B]**
105. Fluid units rather than absolute px; REM for typography. **[M]**
106. Consistent unit types across similar scenarios. **[M]**
107. All elements function across media queries (e.g. tabs stack on mobile). **[B]**
108. Responsive spacing system that scales with screen size. **[M]**
109. Text inside Rich Text styled via Tag selectors; unique Rich Text styling via a class on the Rich Text. **[M]**

## A11. Forms and Conversion Design
110. Template designed to convert per the rubric; clear navigation and conversion paths. **[B]**
111. CTAs in high-traffic, easy-to-find locations. **[B]**
112. Leading headlines with space for credibility, objection handling, social proof, ease-of-use, results. **[B]**
113. Success messages customised to the site design. **[B]**
114. Input focus states customised. **[M]**
115. Form text and placeholders legible. **[B]**
116. Meaningful, descriptive names for forms **and fields** in form settings. **[M]**
117. All forms include field labels for accessibility. **[M]**
118. Correct field types (email fields typed Email, etc.). **[M]**

## A12. Custom Code and Site Settings
119. No custom code in site settings, embeds or page settings, except: GSAP custom code; font-smoothing CSS in project settings; `noindex` meta on Licensing and Changelog pages; SVG embeds (which then require an Instructions page). **[M]**
120. Favicon and webclip included, custom, on-theme, displaying correctly. **[H]**
121. Responsive images enabled in Project Settings. **[H]**
122. Form Notifications settings empty. **[H]**
123. Only Google Fonts or free OFL fonts — no Typekit, no custom uploads. **[M]** (uploads) / **[H]** (which Google fonts)
124. All Integration settings default; no API token generated; no third-party integrations. **[H]**
125. Total site weight under 10 MB. **[M]** (approx) / **[H]**
126. Minify CSS enabled. **[H]**
127. Maps have no API key added. **[H]**

## A13. CMS
128. Collection pages used for repeatable/relational content. **[M]**
129. Every CMS template page has **dynamic** SEO metadata. **[M]**
130. CMS media compressed (<4 MB), responsive, Webflow-native compression. **[M]**
131. Collection names in Title Case with correct singular/plural. **[M]**
132. Names read naturally in "This is a Collection of {{plural}}" / "Create a new {{singular}}". **[M]**
133. Collection slugs short, singular, descriptive (article, project, member, client, event). **[M]**
134. Collection field names in sentence case. **[M]**
135. Collection fields include a short description / clear help text. **[M]**
136. 3–7 items per collection, realistic dummy content. **[M]**
137. All dynamic pages have content and design fitting the template category. **[B]**
138. Field types chosen correctly (reference/multi-reference for relationships, option fields for fixed values). **[M]**
139. Large lists paginated. **[M]/[B]**
140. Essential fields marked required. **[M]**
141. Conditional visibility used for optional fields. **[M]/[B]**

## A14. Ecommerce
142–150. Business address not added; Setup Guide steps (address, shipping, tax, payment provider, hosting, checkout) unchecked; no preloaders on Products/Categories/Checkout/Order-confirmation; cart in navbar and functional with items/subtotal/checkout; payment methods; checkout, PayPal checkout and order-confirmation page contents; product template (add-to-cart, description, image); category template (categories list, links); product naming/casing; sufficient dummy products and categories; some products with variants. **[H]** — **N/A: this site has no Ecommerce.**

## A15. Template listing
151. Name 1–2 words (preferably 1). **[H]**
152. Distinctive, not similar to existing templates, not misspelled. **[H]**
153. Relevant to theme. **[H]**
154. No keyword gaming. **[H]**
155. Professional tone, no slang/symbols/odd caps. **[H]**
156. No brand/author name in the template name. **[H]**
157. Up to 2 accurate categories. **[H]**
158. Page-count classification (one page / multi page / multi layout; multi-layout = ≥3 layout variations across 3 static pages). **[H]**
159. Main thumbnail shows homepage or key page, simple, no tiled/angled mockups. **[H]**
160. Second thumbnail shows a different section/page, visually consistent with the first. **[H]**
161. No badges, external logos/tool icons, template/category names, CTAs or excessive text on thumbnails. **[H]**

## A16. Grading rubric (pass = "Good" on every section)
**Design criteria:** Overall user experience · Graphic Design · Typography · Interaction Design · Hierarchy · Layout Design Quality · Responsive design (Good = ≤2 responsive bugs).
**Functionality criteria:** Conversion best practices · Responsive design · Site optimization (Good = PSI SEO 70–90, Performance 51–70, Best practices 51–70) · Accessibility (Good = PSI accessibility 70–90).
All rubric scoring is **[B]** except where the structural findings below feed into it.

---

# B) Larkstone results per checklist item

## B1. Required Pages

20 pages total. Full inventory (id · title · slug · publishedPath · draft):

| Page id | Title | Slug | Published path | Draft |
|---|---|---|---|---|
| 68920498eac06888f67a1ef3 | Home (Start Page) | *(none)* | `/` | no |
| 68a5c8350d0a729b6588bc68 | Home | home | `/home` | no |
| 68b2c3d7c6bc26fb51f2af22 | About | about | `/about` | no |
| 68b2ee41d3a1758bdfe0bdaa | Accommodation | accommodation | `/accommodation` | no |
| 68e52e78f050ce059c9c524c | Willow Creek Cabins | willow-creek-cabins | `/accommodation/willow-creek-cabins` | no |
| 68b2ee59db293a604e1a8776 | Events | events | `/events` | no |
| 68b2ee31af033e748b3d83bd | Contact | contact | `/contact` | no |
| 68b2ee20d038f04e5d4950da | Plan Your Visit | plan-your-visit | `/plan-your-visit` | no |
| 68b1cdedab5ebc36b5e6b5c4 | Blog | blog | `/blog` | no |
| 68920ae332d853c6cff1c6a9 | Blogs Template (CMS) | detail_blog | `/blog` | no |
| 68920b02d1c7ac1c708143e8 | Events Template (CMS) | detail_event | `/event` | no |
| 68b1d2244c8652c4f90cc528 | Team Members Template (CMS) | detail_team | `/team` | no, `shouldPublish:false` |
| 68b1d101fa36053bbfa0d448 | Blog Topics Template (CMS) | detail_blog-topic | `/blog-topic` | no, `shouldPublish:false` |
| 68920498eac06888f67a1ef6 | Style Guide | style-guide | `/template-pages/style-guide` | no |
| 68920498eac06888f67a1ef9 | Start Here | start-here | `/template-pages/start-here` | no |
| 68920498eac06888f67a1ef8 | Licenses | licenses | `/template-pages/licenses` | no |
| 68920498eac06888f67a1efa | Changelog | changelog | `/template-pages/changelog` | no |
| 68920498eac06888f67a1ef5 | 404 | 404 | `/404` | no |
| 68920498eac06888f67a1ef4 | Password | 401 | `/401` | no |
| 68920498eac06888f67a1efb | Base Structure | static-template-slug-1752419720852 | `/static-template-slug-1752419720852` | **yes** |

1. **PASS with exceptions** — Title Case holds for all real pages. Exceptions: `Base Structure` is fine but its slug is machine-generated; `Password` is Webflow's built-in name.
2. **FAIL** — name ≠ slug on: `Base Structure` / `static-template-slug-1752419720852`; `Password` / `401` (system page, usually tolerated); all four CMS template pages (`Blogs Template` / `detail_blog`, `Events Template` / `detail_event`, `Team Members Template` / `detail_team`, `Blog Topics Template` / `detail_blog-topic`). The `detail_` prefix is a Relume/Flowbase convention, not a name match.
3. **FAIL** — `<meta name="robots" content="noindex">` found on only **2 of 6** required pages: Changelog (`68920498eac06888f67a1efa`) and Licenses (`68920498eac06888f67a1ef8`). **Missing on Style Guide, Start Here, 404 and 401.** All other 14 pages have empty head+footer code (verified page-by-page via `get_page_freeform_code`).
4. **PASS (structure)** — Style Guide exists, 210 heading elements, covers H1–H6 explicitly plus paragraph/list/blockquote/form/slider samples; 13 SVG `HtmlEmbed` icon-size samples. Visual completeness → NEEDS VISUAL.
5. **PASS (existence)** — `Start Here` page exists and serves as the Instructions page. Content coverage of SVG embeds and the parallax interaction → NEEDS VISUAL.
6. **N/A / MANUAL** — no GSAP in custom code (site head contains only font-smoothing CSS; zero registered scripts; zero page-level code). The site does use IX3 which is GSAP-backed, but the custom-code GSAP documentation rule does not apply.
7. **FAIL (high rejection risk)** — Licenses page slug is `licenses` but it sits inside a page folder (`parentId 68920498eac06888f67a1ef7`), so the published path is **`/template-pages/licenses`**, not `/licenses`. The guideline requires the slug set to `/licenses`. Same folder nesting applies to Style Guide, Start Here and Changelog (less strictly required, but the Licenses one is explicit).
8. **MANUAL/NEEDS VISUAL** — exact mandated paragraph not verifiable via MCP.
9. **NEEDS VISUAL** — Footer is a component (`861fc451-…`, 11 instances) so a Licenses link would propagate, but the link target cannot be confirmed structurally; also the Footer component has only 11 instances against 20 pages (see B2/16).
10–12. **NEEDS VISUAL/MANUAL** — Licenses content. Note assets `a_profile_image_for__male_who_is_an_adventure_guide_55cd5c.jpeg` (Team Members → Alex Rivers) is clearly AI-generated and **must** be disclosed with tool + terms link.
13. **PASS** — Changelog exists and is noindexed.
14. **PASS (existence)** — `/404` exists with SEO title "Page Not Found | Larkstone Campground". Navigation/CTA content → NEEDS VISUAL.
15. **PASS (existence)** — `/401` exists; SEO title "Protected page" (Webflow default, no description). Styling → NEEDS VISUAL.

### B1-extra. Two homepages / the site root is a template-showcase page — **CRITICAL FAIL**
The published root `/` is `Home (Start Page)` (`68920498eac06888f67a1ef3`). Its element tree is **not** the campground homepage: classes are `template-hero_image`, `template-inclusions_item-link`, `template-inclusions_image`, `template-pages_item-link`, `template-pages_image`. The real campground homepage is the separate page `Home` at `/home`.

On that root page:
- **13 Link elements, 8 with no link target at all** (no `settings.link`): `6336512a-…67e5`, `ab61126a-…5aa9`, `8b1e96e9-…b30b`, `0f2adf16-…0cda`, `43b64429-…500d`, `a37046b2-…b0a6`, `b86c9edd-…2ac3`, `bceceb1a-…2ced`, `bceceb1a-…2cfb`. Violates item 96 outright.
- **14 Image elements all pointing at the generic placeholder SVG** `68920498eac06888f67a1f32` (`placeholder-landscape.svg`) and **all with no alt text**. Violates items 22, 80, 82.
- Only 5 links resolve (to `/home`, `/about`, `/blog` ×2).

Reviewers open the root URL first. This alone is a likely immediate rejection.

## B2. Components (items 16–21)

13 components, all in groups (`Button`, `Global`, `Sections`, `Hero`):

| Component | Group | Instances | Variants | Props |
|---|---|---|---|---|
| Button Layout | Button | 72 | Normal, Reversed | 4 |
| Button Content | Button | 72 | Primary, Secondary, Alternate, Secondary Alternate, Link, Link Alternate | 5 |
| Button | Button | 70 | Small, Medium, Large | 7 |
| Navbar | Global | 14 | Base | 0 |
| Footer | Global | 11 | Base | 0 |
| CTA Secondary | Sections | 11 | Base | 0 |
| Hero (Wide Image) | Hero | 6 | Base | 3 |
| Testimonials | Sections | 5 | Base | 0 |
| FAQs | Sections | 4 | Base | 0 |
| List Features | Sections | 2 | Image Right, Image Left | 23 |
| CTA Primary | Sections | 2 | Base | 9 |
| Highlight | Sections | 2 | Base | 2 |
| Parallax Image | Sections | 1 | Base | 1 |

16. **PASS with caveat** — Navbar, Footer and both CTAs are components. But Navbar has 14 instances and Footer only **11** across 20 pages — at least 3 published pages carry a Navbar without a Footer (or an unlinked footer). Identify and fix. NEEDS VISUAL to confirm which pages.
17. **FAIL (minor)** — names and variant names are Title Case and readable, **but** five components expose a prop misspelled **`Icon Visiblity`** (should be `Icon Visibility`): Button Layout, Button Content, Button, List Features (Button group), CTA Primary (Button group). Spelling is an explicit requirement (item 26).
18. **PASS** — heavy prop/variant use (23 props on List Features, 9 on CTA Primary, 6 variants on Button Content).
19. **PASS** — no duplicated structures detected; all sections reused.
20. **PASS (no evidence of violation)** — no slider-in-slider or tab-in-tab found via component queries. Confirm visually on Testimonials (slider) → NEEDS VISUAL.
21. **PASS** — zero components with instanceCount 0.
22-adjacent. **FAIL** — `Highlight` component default prop text is literal placeholder boilerplate: *"Describe what your company is building towards in the future. This vision statement should serve the purpose of selling the dream of the company to hiring talent, investors and partners."* If any of its 2 instances leave the default in place this ships as visible lorem-equivalent copy. NEEDS VISUAL on the 2 instances.
Additional: `List Features` has two distinct props both literally named `Title` (one ungrouped, one in group `List Item #1`) — confusing in the props panel. No prop has a tooltip set (all `tooltip` fields absent).

## B3. Styles / naming (items 34–44)

962 styles total: 634 global, 300 combo, 28 tag styles. Saved: `_tmp_larkstone_styles.json`.

34. **PASS** — tag styles present for `body, h1, h2, h3, h4, h5, h6, p, a, ul, ol, li, blockquote, figure, figcaption, img, label` (several appear twice, i.e. a base + a scoped/inherited entry). Every required baseline tag from the guideline is covered.
36. **PASS** — sampled tag/class properties bind to variables (`relume-variable--color-scheme-1-text`, `relume-variable--radius-small`, `variable-e9db52f0-…` font family, `variable-da42971f-…` font size, `variable-21efa12f-…` font weight). Variables are used for colour, radius, border width, font family/size/weight.
37 & 43. **PASS** — combo depth distribution: 1 selector at depth 1, 287 at 2, 11 at 3, **1 at 4** (`.button.is-link.is-icon.color-scheme-dark` = base + 3 combos). Within the 3–4 allowance.
38. **NEEDS DESIGNER CHECK** — 962 styles is large; MCP cannot report "unused". One obvious orphan: **`text-size-small 2`** (auto-duplicated class with a trailing space+2) — delete it.
39. **PASS (partial)** — hover/focus pseudo styles exist (queried pseudo support present); full coverage → NEEDS VISUAL.
41. **PASS** — one consistent system: Client-First (`block_element-name` + kebab utilities). Breakdown of global class names: 301 Client-First (`snake_kebab`), 180 pure kebab utility (`background-color-accent`, `aspect-ratio-square`, `text-size-small`), 149 snake, 3 single-word, 1 with a space. Combos: 291 kebab (`is-link`, `is-icon`, `color-scheme-dark`), 8 Client-First. Zero Pascal/camel. This is an accepted premade framework, so the single-format rule is satisfied.
42. **FAIL (minor)** — Relume library numbering leaks into class names: `blog10_item`, `blog10_featured-list`, `blog42_component`, `blog42_meta-wrapper` etc. These are not descriptive of purpose. Rename to e.g. `blog-featured_item`.
44. **NEEDS DESIGNER CHECK** — redundant-style detection not feasible at scale via MCP.

### Transitions (items 57–59) — **FAIL**
Four styles use `transition-property: all`:
- `.form_checkbox-icon` — `all` / 200ms / ease
- `.button-content` — `all` / 300ms / ease-in-out
- `.slider-arrow` — `all` / 300ms / ease-in-out
- `.button` — `all` / 300ms / ease-in-out

Guideline is explicit: "Apply transitions to specific properties, not 'All'." Also note timing inconsistency (200ms/ease on the checkbox vs 300ms/ease-in-out elsewhere) against item 58.

### Units (items 105–106) — **PASS**
- `font-size` in px: **0 matches**.
- `line-height` in px: **0 matches**.
- `padding-top` in px: **1 match** — `.form_message-success-wrapper`. Convert to rem/em.
Typography and spacing are rem/em throughout.

### Section height (item 100) — **FAIL (minor)**
Styles declaring `height` with a `vh` value (rather than `min-height`): `.section_parallax`, `.utility_component`, `.parallax_img`, `.timeline_progress-line`, `.timeline_progress-line-cover`. `.section_parallax` is a content section and should use `min-height`. `.utility_component` is the 404/401 wrapper (acceptable). The timeline/parallax image ones are decorative.

## B4. Variables (items 27–33)

6 collections:

| Collection | Modes |
|---|---|
| Color Schemes | Base mode, Dark |
| Colors | Base mode only |
| Typography | Base mode, **Tablet, Mobile (L), Mobile** |
| Font Styles | Base mode, Font Small, Font Large, H1, H2, H3, H4, H5, H6 |
| Sizes | Base mode, **Tablet, Mobile (L), Mobile** |
| Shadows | Base mode, XSmall, Small, Large, XLarge |

27–30. **PASS** — colours, typography, sizes/spacing and shadows all covered. Border radius via `relume-variable--radius-small/large`.
31. **PASS** — all collection and mode names are Title Case with spaces (`Color Schemes`, `Mobile (L)`, `Font Small`).
32. **PASS** — Typography and Sizes both carry Tablet / Mobile (L) / Mobile modes, i.e. tablet + mobile landscape + mobile portrait as required.
33. **PASS (structure)** — purposeful grouping is evident. Ramp ordering (light→dark, small→large) inside each collection → NEEDS DESIGNER CHECK.

## B5. Interactions (items 45–59)

`list_interactions` returns **3** IX3 interactions:

| id | Name | Page | Scope | Trigger | Timelines |
|---|---|---|---|---|---|
| `i-b96dda7f` | **Hero Load** | `/home` | site | `wf:load` | `t-1a585d97` |
| `i-3a70d8d6` | **Parallax Scroll** | Willow Creek Cabins | site | `wf:scroll` on class `5e73cae5-…` (`.section_parallax`) | `t-e0f200fb` |
| `i-e8560bc3` | **Custom event interaction** | `/home` | pages:[home] | `wf:custom` on `wf:body` | **[] — none** |

45. **PASS (IX3 present)** / **NEEDS BROWSER CHECK for IX2** — the Data API cannot enumerate IX2. See section E.
47. **FAIL** — names are Title Case noun phrases, not sentence-case descriptive phrases. `Hero Load` → "Fade hero in on page load"; `Parallax Scroll` → "Move image on scroll".
50. **FAIL** — `Custom event interaction` (`i-e8560bc3`) is an empty, auto-named, unused interaction with zero timelines. Delete it.
53–56. **NEEDS DEEPER CHECK** — animated properties/durations live inside timelines `t-1a585d97` / `t-e0f200fb`; `get_interaction` would resolve them. Not fetched in this pass (see E).

### **CRITICAL: ScrollTrigger debug markers are enabled in production**
`i-3a70d8d6` ("Parallax Scroll") has `scrollTriggerConfig.showMarkers: **true**`. GSAP ScrollTrigger renders visible `start`/`end`/`scroller-start`/`scroller-end` debug labels on the live page when this is on. This is a visible defect on the Willow Creek Cabins page and a near-certain rejection trigger. Set it to `false`.

## B6. SEO (items 60–71)

60. **PASS** — root page SEO title is exactly `Larkstone Campground - Webflow HTML website template` (52 chars).
63. **PASS** — all 20 titles under 60 characters (max 52, the homepage). All unique except the two blog-path collisions noted below.
64. **FAIL — 20 of 20 pages.** Not a single page falls in the 150–160 character window:

| Page | Title len | Desc len |
|---|---|---|
| Home (Start Page) | 52 | **215** (too long) |
| Home | 27 | 141 |
| About | 28 | 138 |
| Accommodation | 36 | 137 |
| Willow Creek Cabins | 42 | 137 |
| Events | 29 | 127 |
| Contact | 30 | 108 |
| Plan Your Visit | 38 | 145 |
| Blog | 27 | 130 |
| Blogs Template | 32 | 120 |
| Events Template | 28 | 122 |
| Team Members Template | 31 | 110 |
| Blog Topics Template | 33 | 128 |
| Style Guide | 34 | 136 |
| Start Here | 33 | 126 |
| Licenses | 31 | 88 |
| Changelog | 32 | 74 |
| 404 | 37 | 104 |
| Password (401) | 14 | **0** |
| Base Structure (draft) | 15 | 0 |

65. **FAIL** — Open Graph image set on only 9 of 20 pages (`imageAssetId: 68920733740745ee5113fdde`, i.e. `larkstone-og-image.png`, 640 KB). **No OG image on:** Blog, Blogs Template, Events Template, Team Members Template, Blog Topics Template, Style Guide, Start Here, Licenses, Changelog, 404, 401. All pages use `titleCopied:true` / `descriptionCopied:true`, so OG title/description inherit the SEO fields — acceptable. Image dimensions (≥1200×630, 1.91:1) → NEEDS VISUAL.
  - Format is PNG → **PASS** on item 69 (no WebP OG image).
68. **PASS with exception** — slugs are concise and descriptive, except `static-template-slug-1752419720852` (draft page) and the `detail_*` CMS page slugs.
70. **MIXED**:
  - Root `/` (Home Start Page): 18 headings, exactly 1 `h1`, then h2→h3 only. **PASS.**
  - `/home`: H1 supplied by the `Hero (Wide Image)` component (`22770e10-…9875`, `tag:h1`). **PASS.**
  - `/about`: page-level headings are h2, h4, h4, h4, h4, h2, h3, h3, h3, h2. With the component H1 the order is h1 → h2 → **h4 (h3 skipped)**. **FAIL.**
  - `/accommodation`: h2, h3×6 + component H1. **PASS.**
  - `/blog` CMS template: h1, h2, h3. **PASS.**
  - Style Guide: **at least 3 `h1` elements** (`288a5118-…98f3`, `336be75c-…621e`, `336be75c-…6326`) on one page. **FAIL** unless each is wrapped in its own `<section>`/`<article>` — verify, or noindex the page (which is also required anyway, see item 3).
  - CMS Rich Text: every **Events** `description` body begins with an `<h1>` (`<h1>Stargazing Night</h1>` etc.) while the template page already renders an `h1`. That is **two H1s on every published event page**. **FAIL** — demote those to `h2` in the CMS items.
71. **PASS** — `query_pages_schema_markup` across all 20 pages returns `jsonLdSchema: null` and `rawJsonLdSchema: null` everywhere. No schema markup shipped.

### Route collision
`Blog` (static, `/blog`) and `Blogs Template` (CMS, publishedPath `/blog`) share the same published path. The CMS collection slug is `blog`, so item URLs are `/blog/<slug>` — that is fine — but confirm in the Designer that the static `/blog` page and the collection prefix do not collide. **NEEDS CHECK.**

## B7. Accessibility (items 72–81)

73. See item 70 — **FAIL on About (skipped h3) and Style Guide (3× h1) and every Events CMS page (2× h1).**
77. **PASS (partial)** — semantic tags in use; Section/Header/Footer element types present via components.
80. **FAIL** — 38 of 111 assets carry `altText: null`. All 38 are SVGs (icons, social icons, decorative frames, placeholders). Under the guideline decorative images must be *marked* decorative in the media library, which Webflow stores as an explicit empty alt, not as `null`. List: `forest.svg.svg, circle-parking.svg.svg, car.svg.svg, camera.svg.svg, mountain.svg.svg, glass.svg.svg, fire.svg.svg, trees.svg.svg, sparkles.svg.svg, volume-off.svg.svg, trash.svg.svg, signal-low.svg.svg, vault.svg.svg, snail.svg.svg, glass-water.svg.svg, lock.svg.svg, route.svg.svg, frame-decorative.svg, camping.svg, trees-alt.svg, backpack.svg, icon.svg.svg, facebook.svg.svg, instagram.svg.svg, youtube.svg, linkedin.svg, coffee.svg, bed-double.svg, user-round.svg, dog.svg, flame-kindling.svg, footprints.svg, bird.svg, footprints-alt.svg, link-text.svg, check.svg, placeholder-icon.svg, placeholder-icon-alt.svg`.
  Additionally the **14 placeholder images on the site root have no element-level alt text** (see B1-extra).
72, 74–76, 78, 81. **NEEDS VISUAL / PageSpeed.**

## B8. Images and Assets (items 82–95)

**111 assets.** Formats: 57 WebP, 41 SVG, 1 JPEG, 1 PNG (+ the second page of 11: 3 WebP, 8 SVG). **PASS** on item 85.

84. **PASS** — no asset exceeds 4 MB (largest 1.05 MB).
83. **FAIL** — **26 assets exceed 150 KB**:

| Asset | Size |
|---|---|
| campground-restroom-building.webp | 1047 KB |
| tent-mossy-forest-sunset.webp | 857 KB |
| family-campfire-forest.jpg | 840 KB |
| campfire-laughter-forest.webp | 694 KB |
| larkstone-og-image.png | 640 KB |
| aerial-forest-campsite.webp | 585 KB |
| forest-path-sunlit.webp | 578 KB |
| campground-directional-sign.webp | 471 KB |
| outdoor-picnic-friends.webp | 466 KB |
| foggy-evergreen-forest.webp | 441 KB |
| camping-forest-mountains.webp | 399 KB |
| tent-campsite-forest.webp | 382 KB |
| frame-decorative.svg | 376 KB |
| footprints-alt.svg | 372 KB |
| camper-vans-forest.webp | 312 KB |
| parallax-forest-cabin.webp | 305 KB |
| outdoor-group-gathering.webp | 287 KB |
| park-visitor-center.webp | 239 KB |
| aframe-cabin-forest-mossy.webp | 238 KB |
| campfire-heart-friends.webp | 224 KB |
| hikers-mountain-trail.webp | 213 KB |
| person-walking-dog-forest.webp | 196 KB |
| child-foraging-forest.webp | 178 KB |
| hikers-red-cliffs.webp | 159 KB |
| tent-mountain-clearing.webp | 158 KB |
| tents-hillside-sunrise.webp | 147 KB (borderline) |

Two SVGs (`frame-decorative.svg` 376 KB, `footprints-alt.svg` 372 KB) are almost certainly traced bitmaps — re-export or replace.

125. **FAIL (likely)** — asset bytes alone total **~12.96 MB** (first 100 assets) + ~0.04 MB (remaining 11) ≈ **13.0 MB**, already above the 10 MB site-weight ceiling before CSS/JS/fonts. Compressing the 26 oversize assets is the direct fix.
86. **FAIL (partial)** — CMS images are still `.jpeg` on the CDN (`…_image20.jpeg`, `…placeholder_image_4_a64acd.jpeg`). Guideline asks for Webflow-native AVIF/WebP compression on CMS media.
94. **PASS** — nav logo is an image asset: `larkstone-logo.svg` (`68920498eac06888f67a1f4c`, alt "Larkstone Campground logo").
Asset hygiene (not a numbered rule but reviewer-visible): 17 assets have a **doubled extension** (`forest.svg.svg`, `facebook.svg.svg`, …); the favicon assets are named **`tahi-favicon-dark.webp` / `tahi-favicon-light.webp`** with alt text *"White number 1 partially covered by a green leaf"* and *"Green recycling symbol with three arrows"* — that is the author's own (Tahi) branding, not Larkstone's. See item 120.
93. **FAIL (needs Licenses entry)** — `a_profile_image_for__male_who_is_an_adventure_guide_55cd5c.jpeg` (Team Members → Alex Rivers) is an AI-generated image; many CMS assets are named `placeholder_image_*`. AI-generated assets must be disclosed on the Licenses page with tool name and terms link.

## B9. Layout and Content (items 96–109)

96. **FAIL** — 8 empty links on the site root (B1-extra) **plus** every Events CMS item has `rsvp-link-2: "#"` (all 5 items: Stargazing Night, Family Camping Weekend, Nature Photography Workshop, Campfire Story Night, Wildlife Observation Day). `#` is an empty link. Also `Button` component default prop `Link` is `{mode:url, to:"#"}` and `CTA Primary` → `Button` → `Link` default is `#` — any instance left on the default ships a dead button. **NEEDS VISUAL** to count live instances.
97. **NEEDS VISUAL.**
99. **PASS** — sections composed from components; section_* class family present.
100. See B3 — `.section_parallax` uses `height` not `min-height`.
105–106, 108. **PASS** — rem/em throughout; responsive spacing driven by the `Sizes` variable collection with Tablet/Mobile (L)/Mobile modes.
109. **PASS (structure)** — Rich Text tag styles exist globally; verify per-Rich-Text class overrides visually.
101–104, 107. **NEEDS VISUAL.**

### Content / copy defects found in CMS data
- Team Members: **two people share the job title "Camp Chef"** (James Lin, Jamie Lee) with near-identical bios, and **James Lin's bio text refers to "Jamie"** ("With 10+ years of experience, **Jamie** serves up hearty…"). Clear copy-paste error.
- Team Members: Sam Torres's bio references **"Wild Trails"** — a different/previous brand name, not Larkstone.
- Blogs: field is spelled **`Short Exerpt`** (slug `short-exerpt`) — should be "Excerpt".
- Blogs help text: *"Setting and Author helps with SEO"* — should be "Setting an Author".
- Events: all 5 events are located at other campgrounds ("Clear Skies Campground", "Sunny Meadows Campground", "Mountain View Campground", "Lakeside Campground", "Greenwood Campground") rather than at Larkstone. Content coherence issue for a campground template.
- Mixed en-GB/en-US spelling: blogs use "behaviour"/"colour"/"centre"-style British forms; events use "favorite". Pick one.
- Blog item **"Hiking Trail Essentials"** uses the same asset (`68b1d83ec66770aade761cf8`) for both thumbnail and main image, and that asset is also the main image of **"Kayaking for Beginners"** — with three mutually contradictory alt texts ("Close-up of hiking boots on a forest path", "Hiking backpack with essential gear laid out on a trail", "Group of beginners learning proper kayaking technique"). Same for events `image16.jpeg`, used as the main image of both "Campfire Story Night" and "Wildlife Observation Day" with different alts.

## B10. Forms (items 113–118)

**20 forms.** 

116. **FAIL — the most reviewer-visible form issue.**
  - **14 forms are all named `Email Form`** (on Home, About, Blog, Blogs Template, Events, Events Template, Contact, Accommodation ×2, Plan Your Visit, Willow Creek Cabins, Base Structure, Style Guide ×2, Template Pages ×2). Identical names make notifications and reports unusable.
  - Only 3 have meaningful names: `Blog Page Newsletter`, `Events Page Newsletter`, and `Contact 1 Form`.
  - The contact form is named **`Contact 1 Form`** but its fields are named **`Contact 7 Name`, `Contact 7 Email`, `Contact 7 Message`, `Contact 7 Checkbox`** — mismatched leftover library numbering.
  - Style Guide / Template Pages forms have fields with **empty display names (`""`)** plus generic `Field`, `Field`, `Checkbox`, `Radio`, `Checkbox 2`, `Radio 2`, and placeholders that are literally CSS class names: **`.form_input`** and **`.form_input.textarea`**, plus `Placeholder`.
118. **PASS** — field types are correct: all email captures are `type: Email`; message is `Plain`; select/checkbox/radio typed correctly.
117. **NEEDS VISUAL** — label elements: a `label` tag style exists, but per-field label presence must be confirmed in the Designer.
113–115. **NEEDS VISUAL.**
122 (Form Notifications empty). **MANUAL** — Site settings only. `responseSettings.sendEmailConfirmation` is `false` on all forms, which is a good sign but is not the same setting.

Note: forms are attached to `pageId 68920498eac06888f67a1ef7` ("Template Pages"), which is the **folder** that Style Guide/Start Here/Licenses/Changelog live under and which does not appear in `list_pages`. Worth verifying there is no stray page there.

## B11. Custom Code and Site Settings (items 119–127)

119. **PASS** — site head contains only:
```
<!-- This code helps improve the font quality -->
<style>
  * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -o-font-smoothing: antialiased; }
</style>
```
  Site footer empty. **Zero registered scripts.** `get_site_scripts` → 404 "Custom code block not found" (i.e. none applied). Per-page head/footer code is empty on all 20 pages except the two `noindex` metas. Fully compliant.
  SVG `HtmlEmbed` elements do exist (13 on Style Guide, 1 on the Blogs CMS template, and likely more inside components) — allowed **only because** an Instructions page (`Start Here`) exists. Confirm Start Here actually documents them (item 5).
123. **PASS (uploads)** — `list_fonts` returns **zero** custom fonts. Which Google fonts are selected is **[H]** (Site settings → Fonts).
120, 121, 124, 126, 127. **MANUAL** — not exposed by the Data API. Note the favicon **assets** in the library are named `tahi-favicon-*` (author branding) — high risk that the live favicon/webclip is not Larkstone-themed.
125. **FAIL (likely)** — ~13 MB of assets vs the 10 MB ceiling (see B8).

## B12. CMS (items 128–141)

4 collections:

| Collection | Singular | Slug | Items | Fields (excl. Name/Slug) |
|---|---|---|---|---|
| Blogs | Blog | `blog` | **10** | 8 |
| Events | Event | `event` | 5 | 9 |
| Blog Topics | Blog Topic | `blog-topic` | 5 | **0** |
| Team Members | Team Member | `team` | 6 | 3 |

128. **PASS.**
129. **FAIL** — all four CMS template pages carry **static** SEO titles/descriptions ("Blog Post | Larkstone Campground", "Event | Larkstone Campground", "Our Team | …", "Blog Topic | …") with no field bindings. Every blog post would publish the identical title and description. Bind to `Name` / `Short Exerpt` / `Short Description`. (Caveat: the Data API returns resolved strings; confirm in Designer → Page settings that no dynamic tokens are present. The literal values strongly indicate static.)
130. **FAIL (partial)** — see item 86; CMS media still JPEG.
131–132. **PASS** — Title Case, correct singular/plural, reads naturally ("a Collection of Blogs", "create a new Blog Topic").
133. **PASS with a nit** — slugs `blog`, `event`, `blog-topic` are singular. `team` for singular "Team Member" is collective rather than singular; `member` would match the guideline's own example list.
134. **FAIL** — field names are Title Case, not sentence case: `Thumbnail Image`, `Main Image`, `Short Exerpt`, `Short Description`, `RSVP Link`, `Event Manager`, `Past Event`, `Profile Picture`, `Bio Summary`, `Job Title`. Only `Minutes to read` is sentence case — so it is also internally inconsistent. Rename to `Thumbnail image`, `Main image`, `Short excerpt`, etc.
135. **FAIL (partial)** — missing help text on: Events → `Date/Time`, `Body`, `Event Manager`; Team Members → `Bio Summary`, `Job Title`; Blogs → none missing. Blog Topics has no custom fields at all.
136. **FAIL** — **Blogs has 10 items; maximum is 7.** Events 5 ✓, Blog Topics 5 ✓, Team Members 6 ✓. Delete 3 blog posts.
138. **PASS** — `Reference` used for Author / Topic / Event Manager; `Switch` for Feature / Past Event; `DateTime` for the event date; `Link` for RSVP.
140. **PARTIAL** — Blogs marks 5 fields required; Events marks only `Date/Time` (+Name/Slug); Team Members marks none of its content fields required.
141. **NEEDS VISUAL.**

Field-slug drift worth cleaning: Events `Main Image` → slug `image`; `Body` → slug `description`; `RSVP Link` → slug **`rsvp-link-2`** (leftover duplicate suffix); Blogs `Short Exerpt` → slug `short-exerpt`.

## B13. Ecommerce
**N/A** — no Ecommerce collections or pages on this site.

## B14. Listing
All **[H]** — outside MCP. Note: "Larkstone" is a good 1-word name; "Larkstone Campground" as the marketplace name would be 2 words and still acceptable. Page-count classification: 8 static content pages + 4 CMS templates → **multi page** (not multi layout — there are no 3 layout variants of Home/About/Pricing).

---

# C) Fix list, ordered by rejection likelihood

### Tier 1 — near-certain rejection if submitted as-is
1. **The published root `/` is a template-showcase page, not the campground homepage.** It ships 8 empty links and 14 generic `placeholder-landscape.svg` images with no alt text. Either make `/home`'s content the root page, or rebuild the Start Page as a real homepage. (items 96, 80, 82, 22)
2. **ScrollTrigger debug markers are on in production.** Interaction `i-3a70d8d6` "Parallax Scroll", `scrollTriggerConfig.showMarkers: true` → set to `false`. (item 48/51)
3. **Licenses page is not at `/licenses`.** It publishes to `/template-pages/licenses`. Move it out of the `Template Pages` folder. (item 7)
4. **Meta descriptions are out of the 150–160 range on all 20 pages** (homepage 215, most others 104–145, 401 empty). (item 64)
5. **Blogs collection has 10 items; max is 7.** (item 136)
6. **Missing `noindex`** on Style Guide, Start Here, 404 and 401. (item 3)
7. **Open Graph image missing on 11 pages** including Blog, all four CMS templates, Style Guide, Start Here, Licenses, Changelog, 404, 401. (item 65)
8. **CMS template pages have static SEO metadata** — every blog post / event / team member would publish the same title and description. (item 129)
9. **Site weight ~13 MB of assets vs the 10 MB ceiling**, with 26 assets over 150 KB (largest 1.05 MB). (items 83, 125)

### Tier 2 — very likely flagged in feedback
10. **Empty `#` links**: `rsvp-link-2: "#"` on all 5 Events items; `Button`/`CTA Primary` default link prop is `#`. (item 96)
11. **Multiple H1s**: every Events CMS body starts with an `<h1>` on a page that already has one; Style Guide has 3× `h1`. (items 70, 73)
12. **Skipped heading level on `/about`** (h2 → h4). (items 70, 73)
13. **`transition-property: all`** on `.button`, `.button-content`, `.slider-arrow`, `.form_checkbox-icon`; plus inconsistent 200ms/ease vs 300ms/ease-in-out. (items 57, 58)
14. **Form naming**: 14 forms named "Email Form"; `Contact 1 Form` with `Contact 7 *` fields; Style Guide/Template Pages fields with empty names and `.form_input` as a placeholder. (item 116)
15. **CMS field names in Title Case, not sentence case**, and inconsistently so (`Minutes to read` is the odd one out). (item 134)
16. **Copy defects**: "Short Exerpt" typo; "Setting and Author helps with SEO"; James Lin's bio says "Jamie"; two identical "Camp Chef" roles; Sam Torres references "Wild Trails"; mixed en-GB/en-US spelling. (items 22, 26)
17. **Unused/empty interaction** `i-e8560bc3` "Custom event interaction" — delete. (item 50)
18. **Interaction names not sentence-case descriptive** — "Hero Load", "Parallax Scroll". (item 47)
19. **Prop typo `Icon Visiblity`** on 5 components. (items 17, 26)
20. **38 SVG assets with `altText: null`** — mark decorative explicitly. (item 80)
21. **AI-generated imagery not disclosed** (at minimum `a_profile_image_for__male_who_is_an_adventure_guide_*.jpeg`). (items 12, 93)
22. **Favicon assets carry the author's Tahi branding** (`tahi-favicon-dark/light.webp`) — confirm the live favicon and webclip are Larkstone-themed. (item 120)

### Tier 3 — polish, low individual risk
23. Footer component has 11 instances vs 14 Navbar instances — find the pages missing a Footer. (items 9, 16)
24. `Highlight` component's default prop text is lorem-equivalent boilerplate; confirm both instances override it. (item 22)
25. Delete the draft `Base Structure` page (SEO title `| Tahi Template`, slug `static-template-slug-1752419720852`). (items 1, 2)
26. Delete the stray class `text-size-small 2`. (item 38)
27. Rename Relume-numbered classes `blog10_*`, `blog42_*` to purpose-descriptive names. (item 42)
28. `.section_parallax` uses `height: vh` → switch to `min-height`. (item 100)
29. `.form_message-success-wrapper` uses px padding → rem. (item 105)
30. Fix CMS field-slug drift: `rsvp-link-2`, `image` (for "Main Image"), `description` (for "Body"), `short-exerpt`. (item 133)
31. Add help text to Events `Date/Time`, `Body`, `Event Manager` and Team Members `Bio Summary`, `Job Title`. (item 135)
32. Rename the 17 assets with doubled `.svg.svg` extensions; rename `placeholder_image_*` CMS assets descriptively. (item 82)
33. Reconcile contradictory alt text on reused assets (`68b1d83ec66770aade761cf8`, `image16.jpeg`). (item 80)
34. Relocate event locations to Larkstone-owned sites rather than five other campgrounds. (item 101)
35. Consider renaming collection slug `team` → `member`. (item 133)
36. Add tooltips to component props. (item 18 best practice)
37. Consider `shouldPublish:false` on Team Members Template and Blog Topics Template — verify this is intentional; if those templates are meant to be live, enable them. (item 128)
38. Resolve the `/blog` path shared by the static Blog page and the Blogs CMS template.
39. **Republish** — the site was last published 2026-03-16 but pages have been edited through 2026-07-22, so the live `.webflow.io` URL does not reflect current state.

---

# D) Rubric-style estimate

Scores are Satisfactory / Good / Exceptional, per the grading rubric. Anything below "Good" on any row blocks publication.

## Design criteria

| Rubric row | Estimate | Basis |
|---|---|---|
| Overall user experience | **Cannot score without visual review — at risk** | The root URL is a placeholder-laden showcase page; ScrollTrigger markers visibly render. Both are UX-breaking. |
| Graphic Design | Needs visual | Imagery is WebP, well-described, on-theme. 26 oversize files suggest quality is there. Two 370 KB traced SVGs are a quality smell. |
| Typography | **Good (likely)** | Complete tag-style coverage (h1–h6, p, a, ul, ol, li, blockquote, figure, figcaption), all bound to variables, zero px font sizes or line heights, Typography variable collection with tablet/mobile modes. Held back only by copy typos. |
| Interaction Design | **Below Good** | 3 IX3 interactions total for a full multi-page template, one of which is empty and one of which ships debug markers. Non-descriptive names. `transition: all` on the primary button. |
| Hierarchy | **Satisfactory** | Skipped heading level on About; 3× H1 on Style Guide; 2× H1 on every event page. |
| Layout Design Quality | Needs visual | Structure is sound (Client-First, components, variable-driven spacing). `.section_parallax` on fixed vh height is the one structural deviation. |
| Responsive design | Needs visual | Structurally strong: fluid units throughout, Tablet/Mobile (L)/Mobile variable modes. Good odds of ≤2 bugs, but the bug count itself is browser-only. |

## Functionality criteria

| Rubric row | Estimate | Basis |
|---|---|---|
| Conversion best practices | Needs visual | CTA components exist (CTA Primary ×2, CTA Secondary ×11) and are well placed structurally. Undermined by `#` links on all RSVP buttons and on button defaults. |
| Responsive design | Needs visual | As above. |
| Site optimization | **Below Good on SEO; Performance at risk** | SEO: no page has a compliant meta description, 11 pages lack OG images, CMS templates are static — these are exactly what PSI's SEO audit and the reviewer's manual SEO check penalise. Performance: ~13 MB of assets with a 1.05 MB hero-class image will hurt LCP. |
| Accessibility | **Satisfactory at best** | 38 assets with null alt, 14 unaltted images on the root page, heading-order failures on three surfaces, `transition: all`. Contrast and focus states not verified. |

**Overall:** as of the current state this would not pass. Tier-1 items 1, 2, 3, 4, 5, 6, 7, 8 are each individually sufficient grounds for a "requirements issues" return; items 1 and 2 read as low-quality-submission signals rather than fixable nits.

---

# E) What could not be checked via MCP, and exactly how to check it

## E1. Browser checks on `https://larkstone-campground.webflow.io` (republish first — the live build is from 2026-03-16)

**Legacy IX2 interactions** — the Data API exposes IX3 only. In the browser console on any published page:
```js
const ix = Webflow.require('ix2').store.getState().ixData;
console.log('IX2 events:', Object.keys(ix?.events || {}).length);
console.log('IX2 actionLists:', Object.keys(ix?.actionLists || {}).length);
console.table(Object.values(ix?.events || {}).map(e => ({ id: e.id, type: e.eventTypeId, target: e.target?.selector })));
```
Any non-zero `actionLists` count means legacy IX2 is present and should be migrated to IX3 before 1 May 2026.

**ScrollTrigger markers** — load `/accommodation/willow-creek-cabins`, scroll, and look for coloured `start`/`end`/`scroller-start`/`scroller-end` labels pinned to the viewport edges. Or:
```js
document.querySelectorAll('.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start').length
```

**Empty links across the whole site** (catches the 8 on `/` and any `#` buttons):
```js
[...document.querySelectorAll('a')]
  .filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#')
  .map(a => ({ text: a.innerText.trim().slice(0,40), cls: a.className }));
```

**Images missing alt / with empty alt**:
```js
[...document.images].filter(i => !i.hasAttribute('alt')).map(i => i.currentSrc);
```

**Heading order per page**:
```js
[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.tagName + ' · ' + h.innerText.trim().slice(0,50));
```
Run on `/`, `/home`, `/about`, `/accommodation`, `/events`, `/contact`, `/plan-your-visit`, `/blog`, a blog post, an event, `/template-pages/style-guide`, `/404`.

**"Powered by Webflow" and the Licenses footer link** (item 9, 61):
```js
[...document.querySelectorAll('footer a, .footer a')].map(a => a.innerText.trim() + ' → ' + a.href);
```
Run on every page — this also confirms which pages are missing the Footer component (Footer has 11 instances vs Navbar's 14).

**noindex verification** after fixing item 3:
```js
document.querySelector('meta[name="robots"]')?.content
```
on `/template-pages/style-guide`, `/template-pages/start-here`, `/404`, `/401`.

**OG image dimensions** (item 65) — read `meta[property="og:image"]`, open the URL, confirm ≥1200×630 and 1.91:1.

**PageSpeed Insights** (items 62, 72, rubric "Site optimization"/"Accessibility") — run `https://pagespeed.web.dev/` on `/`, `/home`, `/about`, `/accommodation`, `/blog`, a blog post, `/contact`, mobile **and** desktop. Record SEO / Performance / Best Practices / Accessibility per the rubric bands.

**Contrast, focus and hover states** (items 39, 75) — tab through each page; check focus rings exist and pass contrast; check hover states on every link/button; check `:active`/pressed.

**Breakpoint sweep** (items 24, 51, 103, 104, 107) — 1920 / 1440 / 991 / 767 / 479 px on all 8 static pages plus a blog post and an event: text overflow, self-crashing line heights, tabs/sliders stacking, mobile tap-target sizes.

**Visible placeholder / lorem copy** (item 22) — specifically the two `Highlight` component instances and the whole of `/`.

## E2. Designer-only checks

- **Unused styles** — Style Manager → "Clean Up" / the unused-class indicator. MCP cannot report usage. 962 styles is worth a sweep.
- **Initial Appearance vs display:none** (item 56) — Interactions panel per interaction.
- **Timeline internals of `t-1a585d97` and `t-e0f200fb`** (items 53–55) — either open them in the Designer or call `data_interactions_tool > get_interaction` with ids `i-b96dda7f` and `i-3a70d8d6` to read animated properties, durations (must be 150–800 ms) and easing. Not fetched in this pass.
- **Form field labels** (item 117) — Navigator on `/contact` and every newsletter form; confirm a real `<label>` per input, not just a placeholder.
- **Form success/error message styling** (item 113) — select the Success/Error states in the Designer.
- **Conditional visibility on CMS fields** (item 141) — Settings panel on the CMS template pages.
- **Whether CMS SEO fields use dynamic bindings** (item 129) — Page settings on the four `detail_*` pages; the purple binding chip is the definitive signal.
- **Variable ramp ordering** (item 33) — Variables panel, visually confirm light→dark / small→large.
- **`Template Pages` folder (`68920498eac06888f67a1ef7`)** — forms are attached to it although it does not appear in `list_pages`; confirm there is no stray page.

## E3. Site settings (Project Settings) — none of these are in the Data API

- **Favicon + webclip** (item 120): Settings → General → Favicon. The library assets are named `tahi-favicon-*` with unrelated alt text — verify the live favicon is Larkstone's mark.
- **Responsive images enabled** (items 88, 121): Settings → Publishing (or Advanced) → "Responsive images".
- **Minify CSS** (item 126): Settings → Publishing → Minify.
- **Form Notifications empty** (item 122): Settings → Forms → Notifications. Must have no recipients.
- **Integrations default, no API token** (item 124): Settings → Integrations and Settings → Apps & Integrations → API access.
- **Google Fonts only** (item 123): Settings → Fonts. Zero custom uploads confirmed via MCP; confirm every family listed is Google/OFL and that no Adobe/Typekit account is connected.
- **Maps API key** (item 127): Settings → Integrations → Google Maps — must be blank.
- **Total site weight** (item 125): Settings → General → "Site usage", or the asset panel total. MCP-derived asset bytes ≈ 13.0 MB against a 10 MB ceiling.

## E4. Submission-form items (A15, 151–161)
Template name, categories, page-count classification, and both thumbnails are entered on the submission form and cannot be inspected from the site. Structural note for classification: 8 static content pages + 4 CMS templates → **multi page**, not multi layout.

---

## Intermediate data saved
- `C:\Users\Work\Projects\Webflow Skills\_research\_tmp_larkstone_assets1.json` — assets, page 1 of 2 (100 of 111)
- `C:\Users\Work\Projects\Webflow Skills\_research\_tmp_larkstone_styles.json` — all 962 styles
- `C:\Users\Work\Projects\Webflow Skills\_research\_tmp_wf_submission-guidelines.txt` / `.html`
- `C:\Users\Work\Projects\Webflow Skills\_research\_tmp_wf_grading-rubric.txt` / `.html`
