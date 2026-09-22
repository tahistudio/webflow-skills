# Webflow Marketplace Templates — requirements, rejections, creator practice, QA (Sept 2026)

Primary sources: Submission Guidelines (SG) https://webflow.com/templates/submission-guidelines · Grading Rubric (GR) https://webflow.com/templates/grading-rubric · Submission Checklist PDF 2025 (CL) · Submit a Template https://webflow.com/templates/submit-a-template · Become a Template Designer https://webflow.com/templates/applications · Marketplace Agreement https://webflow.com/legal/marketplace-agreement · Template Licenses https://webflow.com/templates/template-licenses · Creator Program Updates (Oct 2025) https://webflow.com/updates/template-creator-enhancements · Fulfillment links https://help.webflow.com/hc/en-us/articles/45776524336275 · GSAP vs Classic https://help.webflow.com/hc/en-us/articles/46300264646803 · Audit panel https://help.webflow.com/hc/en-us/articles/33961313088531 · Accessibility checklist https://webflow.com/accessibility/checklist · Logic/User Accounts deprecation https://webflow.com/updates/deprecating-logic-and-user-accounts

## 1. Official requirements

### 1.1 Program / process
- Must be approved as Template creator (application with read-only links). Requirements: flawless class naming, responsive on all breakpoints, deep CMS/Ecommerce knowledge, timely support.
- Two gates: score at least "Good" on ALL rubric sections AND meet all submission requirements + checklist.
- Review 3–5 days. Low quality rejected with feedback. High quality with requirement issues: ONE opportunity to fix. "Feedback does not always capture all template issues" — re-review whole template. After 2 rounds → may be rejected.
- Newcomers: one template at a time.
- Commission 95/5 since Oct 2025. Paid monthly ~15th. Webflow may discount.
- Pricing: Webflow presets; creator picks among 2–3. Reported points (2026): single page $29/$39; multi no CMS $39/$49; multi CMS $59/$79/$99; older: CMS+Ecom $79, UI Kit $79, Memberships $99, up to $149. Verify in form.
- Updates: minor changes made directly to source site propagate to new installs; "not able to accept major design updates to published templates." Track in changelog; notify team of significant changes.
- Support is creator's responsibility. Webflow may remove templates.
- Must be original; no multiple versions of same template.
- Fulfillment links for external sales (only for published templates).

### 1.2 Required pages
- Title Case page names; names match slugs.
- Required pages get `<meta name="robots" content="noindex">` in page head.
- Style Guide page: all tags (headings, paragraphs, links, buttons, etc).
- Instructions page: required if advanced/complex interactions or hidden components; if GSAP custom code (GSAP docs required); if SVG embeds.
- Licenses page: slug `/licenses`. Exact top text: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below." Footer on every page links to Licenses. List every font with license link; every image/icon/asset source + license; AI images identified with tool + terms link.
- Changelog page (noindex). Effectively required.
- Custom branded 404 with full nav and CTAs. Password page not mandated but all top creators style it.

### 1.3 Design system
- Navbars, Footers, CTAs must be Components on each page. Title Case names/variants. No nesting sliders/tabs in each other.
- No lorem ipsum in headings/paragraphs (SG wins over older CL). Percentage line-heights. Primary font on Body; secondary fonts on tags/classes.
- Variables required for colors, typography, spacing (+ radius/shadows). Variable names Title Case with spaces. Use Variable Modes for tablet/mobile-L/mobile-P responsive values. Group; order ramps.
- Tag styles: H1–H6, All Paragraphs, All Unordered/Ordered Lists, All Blockquotes, All Figures, Figure Captions, All Links — using Variables.
- Max 3–4 stacked combo classes. Remove unused styles regularly. Hover/pressed/focus states.
- Naming: ONE format across template (Default, snake_case, PascalCase, camelCase, kebab-case, BEM) — except premade frameworks: "Client First", "Mast", "Knockout" etc. Combo naming matches base format.

### 1.4 Interactions
- GSAP-powered Interactions default from May 1, 2026; avoid legacy/Classic. "No Legacy interactions."
- All links/buttons need hover states. Interaction names sentence case, descriptive.
- CSS transitions on specific properties, never "All"; consistent timing.
- Durations 150–800ms; animate only transform/opacity; never top/left/width/height/filters/shadows/blend. Use Initial Appearance. Delete unused interactions. Background video pause/skip. No preloaders (banned on Ecommerce pages).
- Explicit width/height or aspect-ratio on images (CLS).
- GSAP custom code → Instructions section "How to Edit GSAP Animations": Element Map, Customizing Key Variables, Removing GSAP Animations, fenced code.

### 1.5 SEO
- Homepage title: "{Template Name} - Webflow HTML website template" or "... Webflow Ecommerce website template".
- "Powered by Webflow" footer link to webflow.com.
- Every page incl. CMS templates: unique title <60, description 150–160, OG title/desc/image JPEG/PNG ≥1200x630 (no WebP).
- One H1 per page; H2–H6 in order. Concise slugs.
- PSI: Good = SEO 70–90, Perf 51–70, BP 51–70; Exceptional = 90–100 / 70–90 / 70–90.

### 1.6 Accessibility
- PSI Accessibility 70–90 Good; 90–100 Exceptional. Pass CWV desktop + mobile.
- Audit Panel for skipped headings/alt. WCAG contrast for text, borders, icons, overlays, states. Semantic tags, ARIA, unique link labels, decorative flagged, no autoplay.

### 1.7 Images/assets
- ≤150KB where possible; hard max 4MB; WebP/AVIF/PNG/JPEG; CMS images compressed natively; lazy below fold; responsive images on; site <10MB; minify CSS.
- Resale-safe/CC0 only (Stock Up, Pexels, Unsplash). No trademarked logos/premium stock; fake logos only (social icons exception). AI images with disclosure.
- Nav logo must match template name and be an image file; distinct logomark + wordmark.

### 1.8 Layout/responsive
- No empty links; grid item image is the link; `min-height` not `height` on sections/heroes.
- Fluid layouts, REM type, consistent units; all components work at every viewport (tabs stack on mobile); responsive spacing system.
- "No layout bugs in Desktop, Tablet, Mobile portrait or landscape." Good = ≤2 bugs.
- Multi-layout = ≥3 layout variations across 3 static pages.

### 1.9 Forms
- Custom success messages, custom focus states, legible placeholders, meaningful form/field names, labels, correct types. Form Notifications settings EMPTY.
- Conversion design graded: CTAs in nav/hero, credibility, social proof, objection handling.

### 1.10 Custom code / settings
- Custom code NOT allowed except: GSAP custom code; font-smoothing CSS in project settings; noindex on Licenses/Changelog; SVG embeds (with Instructions page).
- Finsweet Attributes/Components, Swiper, Lenis etc. NOT allowed. Plain HTML attributes fine if no script dependency.
- Custom favicon + webclip; responsive images on; only Google/OFL fonts; Integrations default, no API tokens; Maps without key.

### 1.11 CMS
- Collection pages for repeatable content; dynamic SEO on templates.
- Collection names Title Case, correct plural/singular; slugs singular; field names sentence case; every field has help text.
- 3–7 items per collection, realistic content. All dynamic pages populated.
- Reference/multi-ref, option fields, required flags, conditional visibility, pagination.

### 1.12 Ecommerce
- No business address (permanent disqualifier), currency, shipping, tax, payments; Setup Guide unchecked.
- Cart on every page; product/category/checkout/PayPal/order-confirmation styled; dummy products with variants; no preloaders. Localization incompatible with Ecommerce.

### 1.13 Deprecated
- Logic gone Jun 2025; User Accounts gone Jan 2026; Memberships templates not buildable compliant.

### 1.14 Listing
- Name 1–2 words, unique, no brand/author, no special chars. ≤2 categories + matching tags. Short + long descriptions.
- Thumbnails: Main = homepage/key page, flat; Hover = different section. No badges, tool logos, category names, CTAs, minimal text.

## 2. Common rejection reasons
1. Custom code/third-party scripts. 2. Licenses page wrong (slug, sentence, footer link, missing licenses, trademarks). 3. Bad naming (`div-block-47`, mixed formats, >4 combos). 4. Responsive bugs (overflow, line-height crash, cramped mobile, crops, tiny taps, horizontal scroll). 5. Missing Powered by Webflow / wrong homepage title. 6. H1 issues, skipped headings, missing alt. 7. Blank CMS pages, <3 or >7 items, lorem ipsum, typos. 8. Legacy interactions; unused styles/interactions; preloaders. 9. Missing Variables/Modes; nav/footer/CTA not Components; tag styles unset. 10. Ecommerce business address. 11. Form notifications, integrations, non-OFL fonts. 12. Design below "Good": dated, generic stock, no hierarchy, too similar. 13. Listing errors.

## 3. Creator best practices
- Frameworks: Client-First most recognised by buyers; Lumos more powerful, steeper for buyers. Must reconcile with Title Case Variables + Modes + tag base styles.
- Utility folder `/utility-pages/` or `/template-info/`: Start Here (Instructions), Style Guide, Licenses, Changelog, styled 404 + 401, sometimes Coming Soon; linked from footer.
- Style Guide contents: H1–H6, paragraph sizes, links, lists, blockquote, figure, buttons all states, form inputs + focus, color variables, spacing scale, icons, cards, Rich Text demo. Document class names.
- Instructions page pattern: Getting Started; Colors via Variables; Fonts via Site Settings + variables; Icons; Images; CMS add/delete; Components; Interactions removal; blank starter page; SEO tasks; Support; Important Notes.
- Changelog: V1, V1.1 bullets.
- CMS: 2–4 collections typical (Blog, Categories/Authors, Team, Projects, Services); 3–7 items; dynamic SEO; conditional visibility.
- Page counts: single-page; multi-page 8–15 static + CMS; multi-layout ≥3 variants of ≥3 pages.
- Everything colorable from Variables; body font on body; container size classes; nav/footer/CTA Components with props.
- Fake brand + image logo; realistic niche copy; niche templates outsell generic.
- ~30h for a first simple template.

## 4. QA pass protocol
4.1 Site settings: favicon/webclip; responsive images; Google/OFL fonts only; Custom Code empty except font-smoothing; Forms notifications blank; Integrations default; Ecommerce setup unchecked; language; <10MB; CSS minify.
4.2 Pages: Title Case, slugs match; utility pages present (Style Guide, Instructions, Licenses `/licenses`, Changelog, 404, Password); noindex on required pages; unique title/desc/OG per page; CMS templates dynamic SEO; homepage title pattern.
4.3 Styles/Variables: one format; no `Div Block N`; ≤3–4 combos; unused purged; Variables for colors/type/spacing/radius/shadow, Title Case, grouped; Modes for 3 breakpoints; base tag styles; % line-heights; REM type; specific transitions.
4.4 Components/interactions: nav/footer/CTA Components everywhere; no nested sliders; Interactions set to GSAP; sentence-case names; unused deleted; no preloader; 150–800ms; transform/opacity only; Initial Appearance; bg video controls; GSAP docs if used.
4.5 Per page desktop (1920/1440/1280): real copy; single H1 order; links have destination + hover/focus; card images link; consistent spacing; min-height; forms labels/types/success/error/focus; footer Licenses + Powered by Webflow; image logo; no trademarks; alt text; image dimensions, lazy, ≤150KB.
4.6 Per page tablet/mobile-L/mobile-P (+320px, iOS Safari on staging): no horizontal scroll; no overflow; nav collapses; tabs/sliders/accordions stack; taps ≥44px; spacing scales; crops; heroes grow; forms; footer wraps.
4.7 CMS: naming, plural/singular, singular slug, help text, 3–7 items, required flags, conditional visibility, template pages designed, dynamic SEO/OG, compressed images, alt on CMS images (Audit Panel misses these).
4.8 Ecommerce checks.
4.9 Audit Panel each page (misses Components, Lightboxes, CMS images); contrast; full accessibility checklist (animation, zoom, 44px, no color-only, no zoom disable, aria-hidden, skip link, landmarks, contrast, unique links, states, no autofocus, headings, no text images, no parallax/scrolljacking, keyboard, lists, media, tables).
4.10 Performance: staging PSI on home + 2–3 pages mobile/desktop; targets above; LCP eager, rest lazy.
4.11 Licensing: exact sentence; fonts; assets; AI disclosure; originality.
4.12 Listing: name, categories/tags, descriptions, thumbnails, changelog V1.0, support email.

## 5. Questions for the user
1. Which style system for templates (Client-First / Lumos / house) and how to reconcile with Title Case Variables + combo cap?
2. Variables with breakpoint Modes for spacing/type, or fluid/clamp? Group structure/naming?
3. Templates designed first in own Figma? Figma design system mapping 1:1? Sell Figma file?
4. Standard page inventory (static, CMS, utility) for CMS-tier? One-page / multi-layout?
5. Style Guide + Instructions structure today (folder slug, sections)? Changelog versions?
6. Target price tiers? Ecommerce / UI kits?
7. GSAP native only, or Classic to migrate? Ever ship GSAP custom code?
8. Localization in templates? Memberships ambitions?
9. Asset sources/licenses, icon set, Licenses page documentation method?
10. Current personal QA checklist/tooling; past flags/rejections?
11. Post-publish update workflow; pristine vs working copy?
12. Support workflow; external sales via fulfillment links?
13. Agency-specific conventions beyond Webflow's; existing internal doc?
14. Target niches; check copy realism/conversion or only technical?
15. QA output format: pass/fail checklist by SG section, rubric score, or fix-list by rejection risk?
