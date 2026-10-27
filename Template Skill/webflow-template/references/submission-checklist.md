# Marketplace submission checklist

Source: Webflow Submission Guidelines and Grading Rubric, checked 27 Oct 2026 (snapshot in `_research/sources/webflow-guidelines-and-rubric-2026-10-27.txt`).

**Source tag**
- **G**: Submission Guidelines, a Webflow requirement.
- **R**: Grading Rubric, scored Satisfactory, Good or Exceptional.
- **H**: house rule, our QA on top of Webflow's rules. Not on Webflow's pages.

**Check type**
- **API**: structural, via the Webflow MCP or Data API.
- **VISUAL**: browser or Preview.
- **MANUAL**: Designer or site settings; a person must confirm.

Report every item. Never leave one blank.

## 1. Required pages

| # | Requirement | Check | Src |
|---|---|---|---|
| 1.1 | Page names Title Case; each name matches its slug | API | G |
| 1.2 | Style Guide at `/style-guide`; shows every tag: headings, paragraphs, links, buttons, lists, blockquote, figure, forms | API + VISUAL | G |
| 1.3 | Instructions at `/instructions` **only if** advanced or complex interactions, hidden components, GSAP custom code or SVG embeds are used. Explains how to access and edit them; includes GSAP docs if GSAP is used. If none apply, mark PASS as not applicable | API + VISUAL | G |
| 1.4 | Licenses at `/licenses` | API | G |
| 1.5 | Licenses opens with: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below." | VISUAL | G |
| 1.6 | Licenses lists every custom font with licence link; every image, icon and asset with source or licence link | VISUAL | G |
| 1.7 | AI-generated images identified; tool or source named; terms linked, even when no attribution is required | VISUAL | G |
| 1.8 | Footer on every page visibly links to Licenses | API | G |
| 1.9 | Changelog at `/changelog` lists each template version and what changed; V1.0 first | API + VISUAL | G |
| 1.10 | `<meta name="robots" content="noindex">` on Licenses and Changelog. **Optional** per Webflow; we recommend it. Missing is a note, not a fail | API | G (optional) + H |
| 1.11 | Branded 404 with full navigation and CTAs | VISUAL | G |
| 1.12 | Password page is optional. If present, styled to match the template | VISUAL | G |
| 1.13 | Style Guide, Licenses and Changelog linked from the footer or a utility navigation | API + VISUAL | G |
| 1.14 | Real homepage at `/`; no showcase scaffolding at the root | API + VISUAL | H |

## 2. Design system

| # | Requirement | Check | Src |
|---|---|---|---|
| 2.1 | Navbar, Footer and CTA are components on every page | API | G |
| 2.2 | Component and variant names Title Case; concise, consistent, human-readable | API | G |
| 2.3 | Props, slots or variants instead of duplicated structures; components modular; no slider inside a slider, no tabs inside tabs | API + VISUAL | G |
| 2.4 | No unused components (instance count 0) | API | H |
| 2.5 | Prop names spelled correctly; tooltips present | API | H |
| 2.6 | Copy unique and relevant to the niche; no lorem ipsum in headings, paragraphs or CMS; correct spelling and grammar | API + VISUAL | G |
| 2.7 | Line heights percentage or unitless; no text crashing at any breakpoint | API + VISUAL | G |
| 2.8 | Primary font on the Body element; secondary fonts on individual tags and classes | API | G |
| 2.9 | Variables for colours (primary, secondary, background), typography (families, sizes, weights), spacing, radius and shadows; Title Case with spaces; purposeful groups; ramps ordered light-to-dark or small-to-large; no one-off values turned into variables | API | G |
| 2.10 | Variable modes for tablet, mobile landscape and mobile portrait | API | G |
| 2.11 | Tag styles bound to variables: All Headings H1 to H6, All Paragraphs, All Unordered Lists, All Ordered Lists, All Blockquotes, All Figures, All Figure Captions, All Links | API | G |
| 2.12 | Stacked combo classes at most 3 to 4 per element | API | G |
| 2.13 | Unused styles and classes removed; no auto-named classes (Div Block N, Heading 2, Section 3) | API + MANUAL | G + H |
| 2.14 | Hover, pressed and focus states styled on links, buttons and inputs | API + VISUAL | G |
| 2.15 | One class naming format across the template: Default (`Hero Container Element`), snake_case, PascalCase, camelCase, kebab-case or BEM. Premade systems such as Client First, Mast or Knockout are exempt. Combo names match the base format. Combo classes at most 3 levels: `section testimonials dark` passes, `section testimonials dark customers horizontal` fails | API | G |
| 2.16 | No redundant styles (example: `text-align: left` on a paragraph inside a left-aligned container) | API + VISUAL | G |
| 2.17 | Consistent grids and spacing taken from the style guide | VISUAL | G |

## 3. Interactions and GSAP

| # | Requirement | Check | Src |
|---|---|---|---|
| 3.1 | Native interactions only; no Classic (IX2) interactions | API (IX3 list) + VISUAL (`Webflow.require('ix2').store.getState().ixData` empty on the published page) | G |
| 3.2 | Links and buttons have hover states | VISUAL | G |
| 3.3 | Interaction names sentence case and descriptive ("Slide nav down on scroll", not "Show nav") | API | G |
| 3.4 | Hover and press use simple transitions on transform and opacity; complex multi-element interactions only for advanced use | API | G |
| 3.5 | Background videos have pause or skip controls; no autoplay without controls | VISUAL | G |
| 3.6 | No unused interactions | API | G |
| 3.7 | Every breakpoint spot-checked: no overflow, layouts adapt, default font sizes hold | VISUAL | G |
| 3.8 | Images have explicit width and height or aspect-ratio boxes; nothing injected late | API + VISUAL | G |
| 3.9 | Animate only GPU-friendly properties (transform, opacity); never top, left, width, height, filters, shadows or blend modes; minimise the animated area | API | G |
| 3.10 | Durations 150 to 800 ms | API | G |
| 3.11 | Initial Appearance controls visibility, not `display: none`, `visibility: hidden` or `opacity: 0` unless necessary | MANUAL | G |
| 3.12 | Transitions on specific properties, never "All"; consistent timing across elements (input focus and button hover match); every property that changes on hover is transitioned | API | G |
| 3.13 | ScrollTrigger markers off | API | H |
| 3.14 | If GSAP custom code is present: Instructions has "How to Edit GSAP Animations" with an element map, customising key variables (duration, delay, ease, ScrollTrigger), removing animations step by step, and fenced code. Not applicable if none (we do not use GSAP custom code) | VISUAL | G |

## 4. SEO

| # | Requirement | Check | Src |
|---|---|---|---|
| 4.1 | Home title exactly `{Template Name} - Webflow HTML website template` (ecommerce: `{Template Name} - Webflow Ecommerce website template`) | API | G |
| 4.2 | Footer has "Powered by Webflow" linking to webflow.com | API + VISUAL | G |
| 4.3 | Every page, including CMS templates: unique title under 60 characters | API | G |
| 4.4 | Every page: description 150 to 160 characters | API | G |
| 4.5 | Every page: Open Graph title, description and image; image JPEG or PNG, at least 1200×630 at 1.91:1; no WebP | API | G |
| 4.6 | CMS template pages bind title, description and Open Graph to fields | MANUAL (API shows static vs bound) | G |
| 4.7 | One H1 per page (more only inside a `section` or `article`); H2 to H6 in order, no skipped levels | API | G |
| 4.8 | Concise, descriptive slugs | API | G |
| 4.9 | PageSpeed SEO on main pages: Good 70 to 90, Exceptional 90 to 100 | VISUAL | R |
| 4.10 | No JSON-LD schema on any page | API | H |

## 5. Accessibility

| # | Requirement | Check | Src |
|---|---|---|---|
| 5.1 | Core Web Vitals pass on desktop and mobile for main pages | VISUAL | G |
| 5.2 | Logical heading order; Audit Panel clean of skipped levels and missing alt | MANUAL | G |
| 5.3 | WCAG contrast for text, borders, icons and overlays, and for focus, hover and active states | VISUAL | G |
| 5.4 | Semantic HTML; ARIA roles and labels where needed; unique, descriptive link labels; content organised for screen readers and keyboard navigation | API + VISUAL | G |
| 5.5 | Alt text on important images; decorative images marked decorative in the media library | API | G |
| 5.6 | No autoplaying media; keyboard navigable; visible focus | VISUAL | G |
| 5.7 | Follow Webflow's accessibility checklist | MANUAL | G |
| 5.8 | PageSpeed Accessibility: Good 70 to 90, Exceptional 90 to 100 | VISUAL | R |
| 5.9 | Inclusive and plain language | VISUAL | G |

## 6. Images and assets

| # | Requirement | Check | Src |
|---|---|---|---|
| 6.1 | Every image 150 KB or less. Larger images block submission. SVGs and Webflow-generated video posters are exempt. Check the original file size, not a generated variant | API | G |
| 6.2 | No file over 4 MB | API | G |
| 6.3 | Site total under 10 MB (sum of original asset sizes, plus CMS media) | API + MANUAL | G |
| 6.4 | Modern formats (WebP, AVIF, PNG, JPEG); CMS images compressed with Webflow-native tools to AVIF or WebP | API | G |
| 6.5 | Lazy-load below the fold; eager only for above-the-fold essentials; responsive images enabled in Project Settings | API + MANUAL | G |
| 6.6 | Videos compressed; no autoplay without controls | VISUAL | G |
| 6.7 | Assets free for resale or CC0 (sources such as Stock Up, Pexels, Unsplash); licences linked; no premium or trademarked graphics; no brand logos (social media icons excepted) | VISUAL | G |
| 6.8 | High-quality, current imagery; no cutouts, low-resolution files or generic stock | VISUAL | G |
| 6.9 | Nav logo is an image file that matches the template name; distinctive logomark and clean wordmark | API + VISUAL | G |
| 6.10 | Favicon and webclip custom, matching the template's theme, displaying properly | MANUAL | G |

## 7. Layout and content

| # | Requirement | Check | Src |
|---|---|---|---|
| 7.1 | No empty links; every link and button goes somewhere | API | G |
| 7.2 | In repeating grids, the main image is a clickable link | API | G |
| 7.3 | Consistent spacing; nothing crammed or cluttered | VISUAL | G |
| 7.4 | Sections, containers or labelled divs; sections composed from reusable components | API | G |
| 7.5 | `min-height`, not `height`, on sections and heroes | API | G |
| 7.6 | Content aligned with the template's category; appropriate for a general, global audience; no obscene language, nudity, violent imagery, drug references, political or religious bias or culturally insensitive material | VISUAL | G |
| 7.7 | Fluid layouts optimised for mobile (margins, padding, type sizes, button sizes) | VISUAL | G |
| 7.8 | Fluid units; REM for typography; consistent unit type in similar contexts | API | G |
| 7.9 | Responsive spacing that adapts (for example 60px top and bottom on desktop, 20px on mobile) | API | G |
| 7.10 | All elements and components work at every viewport (tabs stack on mobile) | VISUAL | G |
| 7.11 | Rich Text: every child tag styled through tag selectors; unique styling through a class on the Rich Text element | API | G |
| 7.12 | No more than two responsive bugs across screen sizes (Good); none (Exceptional) | VISUAL | R |

## 8. Forms and conversion

| # | Requirement | Check | Src |
|---|---|---|---|
| 8.1 | Success and error messages customised to match the site | VISUAL | G |
| 8.2 | Custom input focus states | VISUAL | G |
| 8.3 | Form text and placeholders legible | VISUAL | G |
| 8.4 | Meaningful names for forms and fields (they appear in notifications and reports); no "Email Form", no "Field 2" | API | G |
| 8.5 | Every field labelled; correct field types (an email field is not text) | API | G |
| 8.6 | Conversion design: clear navigation; CTAs in high-traffic places (nav, hero, repeated); leading headlines; social proof; objection handling; ease of use; results | VISUAL | G + R |

## 9. Custom code and site settings

| # | Requirement | Check | Src |
|---|---|---|---|
| 9.1 | Custom code only in the allowed places: Webflow Way Validator snippet (required), font smoothing, optional noindex on Licenses and Changelog, SVG embeds (with Instructions), documented GSAP custom code. Nothing else in site settings, page settings or embeds | API | G |
| 9.2 | Webflow Way Validator snippet in Site Settings → Custom Code → Head code; its latest run passes 100% on all published pages | MANUAL (run is visible only in the Validator) | G |
| 9.3 | No registered scripts; no third-party attribute libraries | API | H |
| 9.4 | Favicon and webclip set | MANUAL | G |
| 9.5 | Responsive images enabled in Project Settings | MANUAL | G |
| 9.6 | Form notifications settings empty | MANUAL | G |
| 9.7 | Only Google or free OFL fonts; no Typekit or custom fonts | API | G |
| 9.8 | Integrations default; no API token; no third-party integrations | MANUAL | G |
| 9.9 | Site total weight under 10 MB | API + MANUAL | G |
| 9.10 | Minify CSS on | MANUAL | G |
| 9.11 | Maps without an API key | MANUAL | G |
| 9.12 | Paid Workspace plan; submitted from the .webflow.io staging URL; no Site plan needed | MANUAL | G |

## 10. CMS

| # | Requirement | Check | Src |
|---|---|---|---|
| 10.1 | Collection pages for repeatable or relational content; dynamic SEO on each CMS page | API | G |
| 10.2 | Collection names Title Case with correct singular and plural; "This is a Collection of {plural}" and "Create a new {singular}" both read naturally | API | G |
| 10.3 | Collection slugs short, singular and descriptive (for example `/project/...`) | API | G |
| 10.4 | Field names sentence case; each field has a short description and help text | API | G |
| 10.5 | 3 to 7 items per collection, realistic dummy content | API | G |
| 10.6 | Every dynamic page has content and design that fit the category | VISUAL | G |
| 10.7 | Reference or multi-reference fields for relations; option fields for fixed values; required flags on essential fields; conditional visibility on optional fields; pagination for large lists. Field types set correctly (they cannot change later) | API | G |
| 10.8 | CMS media compressed under 4 MB, using Webflow-native AVIF or WebP compression | API | G |

## 11. Ecommerce (when present)

If the template has no ecommerce, mark each item MANUAL with "not applicable; confirm no ecommerce".

| # | Requirement | Check | Src |
|---|---|---|---|
| 11.1 | No business address; no currency, shipping, tax, payment or hosting configured; Setup Guide steps (business address, shipping method, tax settings, payment provider, hosting, checkout) unchecked | MANUAL | G |
| 11.2 | No preloaders on the products template, categories template, checkout or order confirmation | VISUAL | G |
| 11.3 | Cart in the Navbar or visible on every page, with items, subtotal and checkout buttons; functional; regular checkout button and PayPal checkout offered (Webpayments optional) | VISUAL | G |
| 11.4 | Checkout page: checkout form, order items, order summary. PayPal checkout page: PayPal form, order items, order summary. Styling consistent | VISUAL | G |
| 11.5 | Order confirmation page includes the order confirmation element | VISUAL | G |
| 11.6 | Product template: Add to Cart element, description, image. Category template: product categories list and links to product pages | API + VISUAL | G |
| 11.7 | Products and categories: consistent casing, correct spelling, sensible names including custom fields; enough dummy products and categories; some with variants where it makes sense | API | G |

## 12. Listing

| # | Requirement | Check | Src |
|---|---|---|---|
| 12.1 | Name 1 to 2 words (preferably 1); unique; not similar to an existing template; reflects the theme; no keyword stuffing; no symbols, slang or odd capitals; no brand, author or generic names such as "Template 01" | MANUAL | G |
| 12.2 | Up to two categories that accurately represent the template | MANUAL | G |
| 12.3 | Page count declared: one page, multi page, or multi layout (at least three layout variations across three static pages) | MANUAL | G |
| 12.4 | Main thumbnail: homepage or a key page; simple and clear; no complex multi-page views, angled or tiled mockups | MANUAL | G |
| 12.5 | Hover thumbnail: a different section or page; same colours, style and layout tone as the main thumbnail | MANUAL | G |
| 12.6 | Thumbnails have no badges, feature icons, external logos or tool icons, template or category names, CTAs or sales text, and no excessive text | MANUAL | G |
| 12.7 | Short and long descriptions written and proofread | MANUAL | H |

## R. Grading rubric

A template passes only at **Good on every row** in both sets of criteria. Satisfactory is eligible for feedback and revision; failing to reach Good after two rounds of feedback may lead to rejection. Each row is scored Satisfactory, Good or Exceptional.

### Design criteria

| Row | Good means | Exceptional means |
|---|---|---|
| Overall user experience | Better than average; aesthetically draws the user in; free of elements that confuse, strain or distract; typography and legibility meet the guidelines; on trend | Purely delightful; a wow factor or two without confusion; mastery of visual design; sets trends |
| Graphic design | High-quality, relevant, cohesive branding; adds aesthetic and informational value; room for one or two visual design principles | Stunning, innovative visuals; graphics add both aesthetic and informational value; mastery of visual design principles |
| Typography | Legible; good hierarchy; meets the submission guidelines | Hierarchy implemented perfectly; meets all guidelines |
| Interaction design | Interactions help direct the user and reduce cognitive load | Interactions are brand attributes with personality and a pleasant cadence, and still reduce cognitive load |
| Layout and structure: hierarchy | Clear information architecture; content aligns with the category; some placement could improve hierarchy | Fully processing the site feels effortless; visual hierarchy is impeccable |
| Layout and structure: layout design quality | Layout requirements from the guidelines met; good variety from page to page; consistent spacing; not crammed | Everything functional and as expected; mastery of Gestalt principles |
| Responsive design | No more than two bugs across screen sizes | No bugs or hierarchy issues across screen sizes |

### Functionality criteria

| Row | Good means | Exceptional means |
|---|---|---|
| Conversion best practices | Action items (CTAs, carts, form fills) are easy to find with minimal effort; some room to improve the journey | Action items are ubiquitous, placed in high-traffic spots such as the nav or hero, and repeated; persuasion built in (credibility, objection handling, social proof, ease of use, results) |
| Responsive design | No more than two bugs across screen sizes | No bugs or hierarchy issues across screen sizes |
| Site optimisation (PageSpeed) | SEO 70 to 90; Performance 51 to 70; Best practices 51 to 70 | SEO 90 to 100; Performance 70 to 90; Best practices 70 to 90 |
| Accessibility (PageSpeed) | Accessibility 70 to 90; follows Webflow's accessibility checklist | Accessibility 90 to 100; high legibility; passing contrast; unique, meaningful link and button names; near-total adherence to the checklist |

Satisfactory thresholds for PageSpeed are below these: SEO 51 to 70, Performance 51 to 70, Best practices 51 to 70, and Accessibility 51 to 70.

## Process facts

- Review typically takes 3 to 5 days. Low-quality submissions are rejected with feedback [G].
- High-quality submissions with requirement issues get feedback and one opportunity to fix everything. Feedback does not always list every problem, so re-check the whole template before reopening [G].
- Newcomers submit one template at a time [G].
- Minor updates to a published template are made on the source site; major design updates are not accepted after publish; track changes in the Changelog [H, from the research notes (Creator Program Updates, Oct 2025); not on the 27 Oct pages].
