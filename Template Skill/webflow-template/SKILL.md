---
name: webflow-template
description: "Build, finish and QA Webflow Marketplace templates so they pass Webflow's submission requirements and quality rubric on the first review: required pages, licences, design system and naming, native GSAP interactions, SEO, accessibility, assets, CMS and ecommerce rules, the no-custom-code rule, copy quality, listing assets, and a pass/fail report with a fix-list. Use whenever the user mentions a Webflow template, the Marketplace, template submission, template QA, a style guide or licenses page for a template, a free cloneable, or asks whether a site is 'submittable'. Also use to develop a new template from a Figma file. Read tahi-webflow-core and client-first-webflow first; this skill adds the Marketplace rules."
---

# Webflow Marketplace templates

A template is a client site that a stranger will buy, install and edit without you. Webflow reviews it against a published checklist and a quality rubric, and every section must score at least "Good". The most common rejection reasons are guideline breaches, not design.

Read `tahi-webflow-core` and `client-first-webflow` first (templates are built in Client-First). This skill adds what the Marketplace requires and how we QA against it. References:

- [references/submission-checklist.md](references/submission-checklist.md) — every requirement as a checkable item, grouped like Webflow's guidelines, with how to check it. Read in full before any template QA or build.
- [references/qa-report.md](references/qa-report.md) — the report format: pass/fail per item at section, page and site level, rubric estimate, fix-list by rejection risk.
- [references/utility-pages.md](references/utility-pages.md) — what Style Guide, Start Here, Licenses and Changelog contain, folder placement, the agency credit link.

## Non-negotiables

These alone get a template rejected. Check them first and last.

1. **No custom code.** Not in site settings, page settings or embeds. Exceptions: the font-smoothing CSS in site head, `<meta name="robots" content="noindex">` in the head of utility pages, and inline SVG embeds (which then require an Instructions page). No Finsweet Attributes, no sliders or libraries, no analytics, no schema. GSAP custom code is technically allowed with a documented guide; we do not use it. Native GSAP interactions only.
2. **No JSON-LD schema** anywhere. The buyer adds their own.
3. **Required pages**: Style Guide, Start Here (Instructions), Licenses at exactly `/licenses` (root, not in a folder), Changelog, a branded 404 and a branded password page. Title Case names, slugs matching names, `noindex` on every utility page.
4. **Licenses page** opens with the exact sentence Webflow specifies, lists every font with its licence link, every image, icon and asset source with licence, and identifies AI-generated images with the tool and its terms. Footer on every page links to it.
5. **Navbar, Footer and CTA are components** on every page. Component and variant names Title Case.
6. **Variables** for colours, type, spacing, radius and shadows, Title Case with spaces, grouped, with modes for Tablet, Mobile Landscape and Mobile Portrait. Tag styles on Body, H1 to H6, paragraphs, lists, blockquote, figure and figure caption, links, all bound to variables.
7. **Native GSAP interactions only**; no Classic interactions; no unused interactions; debug markers off; sentence-case names.
8. **SEO on every page including CMS templates**: unique title under 60 characters, description 150 to 160, Open Graph title, description and a JPEG or PNG image of at least 1200 by 630. Home title is exactly `{Template Name} - Webflow HTML website template` (or `Webflow Ecommerce website template`). Footer has "Powered by Webflow" linking to Webflow.
9. **Assets**: under 150 KB each where possible, hard limit 4 MB, site under 10 MB, resale-safe or CC0 only, no real brand logos, custom favicon and webclip, nav logo is an image file whose name matches the template.
10. **CMS**: 3 to 7 realistic items per collection, dynamic SEO on every template page, Title Case collection names, sentence-case fields with help text.
11. **Site settings**: responsive images on, CSS minified, form notifications empty, integrations default, no API tokens, Google or OFL fonts only, no Maps key.
12. **Ecommerce templates**: never add a business address or any store setting; setup guide stays unchecked; cart, product, category, checkout, PayPal checkout and order confirmation pages styled; no preloaders on those pages.

## Copy and content

Templates are judged as marketing sites. Every heading and paragraph is real, relevant copy for the template's niche, well written, no lorem ipsum, no keyword stuffing, correct spelling and grammar, consistent names and roles across the site (a team member's name and title match on every page). Content is inclusive and safe for a global audience. Fake brand and logos only. The template should quietly demonstrate good conversion design: obvious CTAs in nav and hero, social proof, objection handling, clear paths to contact or purchase.

## Agency credit

A single, tasteful credit link to the agency belongs on the Style Guide page (and may sit in the Start Here page), carrying UTM parameters so traffic is attributable. It is not repeated on client-facing pages and is never hidden text. The buyer can remove it; if they leave the utility page published it stays a genuine backlink.

## Workflow: build a template

1. **Start** from the agency's no-code template starter (Client-First, Relume-style style guide, zero scripts). Confirm site settings are default and custom code is empty before doing anything else.
2. **Foundation** per the client-site skill: scan the design, tokens with breakpoint modes, utilities, style guide, Navbar, Footer, Button, CTA components. Fill the Style Guide with every tag and utility.
3. **Pages** from Base Structure with full SEO. Home is the real homepage at `/`; a template-showcase page, if wanted, lives in the Template Pages folder.
4. **Sections** one at a time, Client-First skeleton, real copy, compressed assets with alt text, checked at every breakpoint. Library sections are renamed and stripped of Classic interactions.
5. **CMS** with 3 to 7 items each, dynamic SEO, help text.
6. **Motion** natively, sparingly, verified in Preview.
7. **Utility pages** per the reference. Licenses complete. Changelog at V1.0.
8. **QA** per the checklist and report format. Fix everything in the rejection-risk tiers. Re-run.
9. **Listing**: name of one or two words, up to two categories, thumbnails without badges or text, short and long descriptions.

## Workflow: QA an existing template

1. Read the full checklist. Audit the site through the MCP: pages and SEO, custom code, components, styles, variables, interactions, forms, CMS, assets, fonts, schema (must be empty).
2. Check visually what the API cannot: every page at every breakpoint, hover and focus states, forms, navigation, interactions playing, markers off. Use the browser for legacy interactions (`Webflow.require('ix2').store.getState().ixData` must be empty).
3. List site-settings items the user must confirm in the Designer.
4. Write the report per the format: PASS, FAIL, NEEDS VISUAL or MANUAL per item at section, page and site level; a rubric estimate; a fix-list ordered by rejection likelihood.
5. Fix through the MCP what can be fixed, one tier at a time, re-checking each. Hand the user the exact manual steps for the rest.

## Anti-patterns

Scripts or attributes libraries; schema; a showcase page at the root instead of the real home; Licenses inside a folder; static SEO on CMS template pages; placeholder images or lorem ipsum anywhere; more than 7 CMS items; markers on; Classic interactions; empty links (`#`) in nav or buttons; two H1s from rich text bodies; assets over 150 KB left uncompressed; competing button classes; agency favicon left in place of the template's; forms all named "Email Form"; typos in prop names visible to buyers.
