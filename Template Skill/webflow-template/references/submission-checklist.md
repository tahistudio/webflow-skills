# Marketplace submission checklist

Every item Webflow's Submission Requirements and Quality Rubric make checkable, grouped the way Webflow groups them. Check type: **API** (structural, via the Webflow MCP or Data API), **VISUAL** (browser or Preview), **MANUAL** (Designer or site settings, a person must confirm). Report every item.

## 1. Required pages

| # | Requirement | Check |
|---|---|---|
| 1.1 | Page names in Title Case; slug matches name | API |
| 1.2 | Style Guide page exists, shows all tags: headings, paragraphs, links, buttons, lists, blockquote, figure, forms | API + VISUAL |
| 1.3 | Instructions / Start Here page exists if complex interactions, hidden components or SVG embeds are used; populated | API + VISUAL |
| 1.4 | Licenses page at slug exactly `/licenses` at site root | API |
| 1.5 | Licenses opens with: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below." | VISUAL |
| 1.6 | Licenses lists every custom font with licence link; every image, icon, asset with source or licence link | VISUAL |
| 1.7 | AI-generated images identified with tool named and terms linked | VISUAL |
| 1.8 | Footer on every page links visibly to Licenses | API |
| 1.9 | Changelog page exists with a first entry | API + VISUAL |
| 1.10 | `<meta name="robots" content="noindex">` in head code of Style Guide, Start Here, Licenses, Changelog (and any other utility page) | API |
| 1.11 | Branded 404 with full navigation and CTAs; branded password page | VISUAL |
| 1.12 | Real homepage at `/`; no showcase scaffolding at root | API + VISUAL |

## 2. Design system

| # | Requirement | Check |
|---|---|---|
| 2.1 | Navbar, Footer, CTA are components on every page | API |
| 2.2 | Component and variant names Title Case, concise, human-readable | API |
| 2.3 | Props, slots or variants used instead of duplicated structures; no slider inside slider or tabs inside tabs | API + VISUAL |
| 2.4 | No unused components (instance count 0) | API |
| 2.5 | Prop names spelled correctly, tooltips present | API |
| 2.6 | No lorem ipsum in headings, paragraphs or CMS; copy unique and relevant to the niche; spelling and grammar correct | API + VISUAL |
| 2.7 | Line heights percentage or unitless; no text crashing at any breakpoint | API + VISUAL |
| 2.8 | Primary font on Body; secondary fonts on tags or classes | API |
| 2.9 | Variables for colours, typography, spacing, radius, shadows; Title Case with spaces; grouped; ramps ordered | API |
| 2.10 | Variable modes for Tablet, Mobile Landscape, Mobile Portrait | API |
| 2.11 | Tag styles on H1–H6, All Paragraphs, Unordered Lists, Ordered Lists, Blockquotes, Figures, Figure Captions, Links, bound to variables | API |
| 2.12 | Stacked combo classes at most 3–4 per element | API |
| 2.13 | No unused styles; no auto-named classes (Div Block N, Heading 2, Section 3) | API + MANUAL |
| 2.14 | Hover, pressed and focus states styled on links, buttons, inputs | API + VISUAL |
| 2.15 | One class naming format across the template (Client-First counts as one); combo names match base format | API |
| 2.16 | No redundant styles | VISUAL |

## 3. Interactions and GSAP

| # | Requirement | Check |
|---|---|---|
| 3.1 | Native GSAP interactions only; no Classic (IX2) interactions | API (IX3 list) + VISUAL (`Webflow.require('ix2').store.getState().ixData` empty on published page) |
| 3.2 | All links and buttons have hover states | VISUAL |
| 3.3 | Interaction names sentence case and descriptive | API |
| 3.4 | Hover and press use simple transitions on transform and opacity | API |
| 3.5 | Background videos have pause or skip controls; no autoplay without controls | VISUAL |
| 3.6 | No unused interactions | API |
| 3.7 | Every breakpoint spot-checked: no overflow, layouts adapt, default sizes hold | VISUAL |
| 3.8 | Images have width and height or aspect-ratio boxes; nothing injected late | API + VISUAL |
| 3.9 | Only transform and opacity animated; no top, left, width, height, filter, shadow, blend | API |
| 3.10 | Durations 150–800 ms | API |
| 3.11 | Initial Appearance used for hidden-then-shown elements rather than display none or opacity 0 hacks | MANUAL |
| 3.12 | Transitions on specific properties, never "all"; consistent timings; every property that changes on hover is transitioned | API |
| 3.13 | ScrollTrigger markers off | API |
| 3.14 | If GSAP custom code is present (we avoid it): Instructions page has "How to Edit GSAP Animations" with element map, key variables, removal steps | VISUAL |

## 4. SEO

| # | Requirement | Check |
|---|---|---|
| 4.1 | Home title `{Template Name} - Webflow HTML website template` or `… Webflow Ecommerce website template` | API |
| 4.2 | Footer has "Powered by Webflow" linking to webflow.com | API |
| 4.3 | Every page incl. CMS templates: unique title < 60 chars | API |
| 4.4 | Every page: description 150–160 chars | API |
| 4.5 | Every page: Open Graph title, description, image JPEG or PNG ≥ 1200×630 | API |
| 4.6 | CMS template pages bind title, description, OG to fields | MANUAL (API shows static vs bound) |
| 4.7 | One H1 per page (more only inside section or article); H2–H6 in order, no skipped levels | API |
| 4.8 | Concise descriptive slugs | API |
| 4.9 | PageSpeed SEO ≥ 70 (aim 90+) on main pages | VISUAL |
| 4.10 | No JSON-LD schema on any page | API |

## 5. Accessibility

| # | Requirement | Check |
|---|---|---|
| 5.1 | Core Web Vitals pass on desktop and mobile for main pages | VISUAL |
| 5.2 | Heading order logical; Audit Panel clean of skipped headings and missing alt | MANUAL |
| 5.3 | WCAG contrast for text, borders, icons, overlays, and for focus, hover, active states | VISUAL |
| 5.4 | Semantic tags; ARIA where needed; unique descriptive link labels | API + VISUAL |
| 5.5 | Alt text on informative images; decorative images marked decorative | API |
| 5.6 | No autoplaying media; keyboard navigable; visible focus | VISUAL |
| 5.7 | PageSpeed Accessibility ≥ 70 (aim 90+) | VISUAL |

## 6. Images and assets

| # | Requirement | Check |
|---|---|---|
| 6.1 | Images ≤ 150 KB where possible; none over 4 MB; site under 10 MB | API + MANUAL (site weight) |
| 6.2 | Modern formats (WebP, AVIF, PNG, JPEG); CMS images compressed natively | API |
| 6.3 | Lazy load below the fold; eager only above; responsive images enabled | API + MANUAL |
| 6.4 | Videos compressed; no autoplay without controls | VISUAL |
| 6.5 | Assets resale-safe or CC0 with licences linked; no premium stock; no trademarked logos (social icons excepted) | VISUAL |
| 6.6 | High-quality, current imagery; no cutouts, low-res or generic stock | VISUAL |
| 6.7 | Nav logo is an image file named for the template; distinct logomark and wordmark | API + VISUAL |
| 6.8 | Favicon and webclip custom, matching the template (not the agency's) | MANUAL |

## 7. Layout and content

| # | Requirement | Check |
|---|---|---|
| 7.1 | No empty links (`#` or blank) | API |
| 7.2 | In repeating grids, the main image is a link | API |
| 7.3 | Consistent spacing; nothing crammed | VISUAL |
| 7.4 | Sections composed from components; labelled structure | API |
| 7.5 | min-height, never height, on sections and heroes | API |
| 7.6 | Content fits the category; inclusive; no obscene, violent, political or religious material | VISUAL |
| 7.7 | Fluid layouts; rem type; consistent units | API |
| 7.8 | All components function at every viewport (tabs stack on mobile) | VISUAL |
| 7.9 | Responsive spacing system | API |
| 7.10 | Rich text styled via tag selectors; unique rich text via a class on the Rich Text element | API |

## 8. Forms and conversion

| # | Requirement | Check |
|---|---|---|
| 8.1 | Custom success and error messages styled | VISUAL |
| 8.2 | Custom input focus states | VISUAL |
| 8.3 | Legible text and placeholders | VISUAL |
| 8.4 | Meaningful form and field names (no "Email Form", no "Field 2") | API |
| 8.5 | Labels on every field; correct field types | API |
| 8.6 | Clear navigation; CTAs in nav and hero and repeated; social proof and objection handling present | VISUAL |

## 9. Custom code and site settings

| # | Requirement | Check |
|---|---|---|
| 9.1 | No custom code in site settings, page settings or embeds, except font-smoothing CSS, noindex on utility pages, and SVG embeds (with Instructions page) | API |
| 9.2 | No registered scripts; no attributes libraries | API |
| 9.3 | Favicon and webclip set | MANUAL |
| 9.4 | Responsive images enabled | MANUAL |
| 9.5 | Form notifications empty | MANUAL |
| 9.6 | Google or OFL fonts only; no uploaded commercial fonts | API |
| 9.7 | Integrations default; no API tokens | MANUAL |
| 9.8 | Site weight under 10 MB | MANUAL |
| 9.9 | Minify CSS on | MANUAL |
| 9.10 | Maps without API key | MANUAL |

## 10. CMS

| # | Requirement | Check |
|---|---|---|
| 10.1 | Collection pages for repeatable content; dynamic SEO on each | API |
| 10.2 | Collection names Title Case with correct singular and plural | API |
| 10.3 | Slugs short and descriptive | API |
| 10.4 | Field names sentence case with help text | API |
| 10.5 | 3 to 7 items per collection with realistic content | API |
| 10.6 | All dynamic pages designed and populated | VISUAL |
| 10.7 | Reference fields for relationships; option fields for fixed values; required flags; conditional visibility for optional fields | API |
| 10.8 | CMS media compressed under 4 MB | API |

## 11. Ecommerce (when present)

| # | Requirement | Check |
|---|---|---|
| 11.1 | No business address, currency, shipping, tax, payment or hosting configured; setup guide unchecked | MANUAL |
| 11.2 | No preloaders on product, category, checkout, order confirmation | VISUAL |
| 11.3 | Cart visible on every page with items, subtotal, checkout; PayPal checkout offered | VISUAL |
| 11.4 | Checkout page: form, order items, summary; PayPal checkout page styled to match | VISUAL |
| 11.5 | Order confirmation element present | VISUAL |
| 11.6 | Product template: add to cart, description, image; category template: categories list, product links | API + VISUAL |
| 11.7 | Enough dummy products and categories, consistent casing, some with variants | API |

## 12. Listing

| # | Requirement | Check |
|---|---|---|
| 12.1 | Name 1–2 words, unique, relevant, no keywords, no symbols, no author or brand name | MANUAL |
| 12.2 | Up to two accurate categories | MANUAL |
| 12.3 | Main thumbnail: homepage or key page, flat, simple; hover thumbnail: different section, consistent style; no badges, tool logos, category names, CTAs, heavy text | MANUAL |
| 12.4 | Short and long descriptions written and proofread | MANUAL |
| 12.5 | Page count type declared correctly (one page, multi page, multi layout = 3 layouts across 3 static pages) | MANUAL |

## Quality rubric (must reach "Good" on every row)

| Row | Good means |
|---|---|
| Overall UX | better than average, on trend, nothing confusing or straining |
| Graphic design | high quality, relevant, cohesive branding, adds aesthetic and informational value |
| Typography | legible, good hierarchy, meets guidelines |
| Interaction design | interactions direct the user and reduce cognitive load |
| Hierarchy | information easy to process; clear intention in information architecture |
| Layout | guideline requirements met; variety page to page; consistent spacing; not crammed |
| Responsive | no more than 2 bugs across screen sizes |
| Conversion | CTAs ubiquitous and obvious in nav and hero; easy to convert |
| Site optimisation | PageSpeed SEO 70–90, Performance 51–70, Best Practices 51–70 |
| Accessibility | PageSpeed Accessibility 70–90 |

Exceptional is SEO and Accessibility 90+, Performance and Best Practices 70–90, zero responsive bugs.

## Process facts

Review takes 3 to 5 days. Low quality is rejected with feedback. High quality with requirement issues gets one chance to fix everything, and the feedback may not list every problem, so re-check the whole template before reopening. Newcomers submit one template at a time. Minor updates to a published template are made directly on the source site; major design changes are not accepted post-publish; track changes in the Changelog.
