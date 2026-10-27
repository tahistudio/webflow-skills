---
name: webflow-template
description: "Build, finish and QA Webflow Marketplace templates so they pass Webflow's Submission Guidelines and Grading Rubric on the first review: the Webflow Way Validator, required pages and slugs, licences, design system and naming, native GSAP interactions, SEO, accessibility, the 150 KB image rule, CMS and ecommerce rules, the custom-code exceptions, copy quality, listing assets, and a pass/fail report with a fix-list. Use whenever the user mentions a Webflow template, the Marketplace, template submission, template QA, a style guide or licenses page for a template, a free cloneable, or asks whether a site is 'submittable'. Also use to develop a new template from a Figma file. Read tahi-webflow-core and client-first-webflow first; this skill adds the Marketplace rules."
---

# Webflow Marketplace templates

A template is a client site that a stranger will buy, install and edit without you. Webflow reviews it against its Submission Guidelines and its Grading Rubric. Every submission requirement must be met, every rubric row must score "Good", and the submission form will not accept a template without a 100% Webflow Way Validator run. Most rejections are guideline breaches, not design.

**Source of truth.** Webflow's pages win over this skill:
- Submission Guidelines: https://webflow.com/templates/submission-guidelines
- Grading Rubric (design and functionality criteria): https://webflow.com/templates/grading-rubric

Checked 27 Oct 2026. The saved snapshot is `_research/sources/webflow-guidelines-and-rubric-2026-10-27.txt`. Every rule below is tagged **[G]** (Submission Guidelines), **[R]** (Grading Rubric) or **[H]** (house rule: our own QA on top of Webflow's). When a live page changes, update this skill and the snapshot together.

Read `tahi-webflow-core` and `client-first-webflow` first (templates are built in Client-First). This skill adds what the Marketplace requires and how we QA against it. References:

- [references/submission-checklist.md](references/submission-checklist.md): every requirement as a checkable item, tagged G, R or H, grouped like Webflow's guidelines, plus the grading rubric. Read in full before any template QA or build.
- [references/qa-report.md](references/qa-report.md): the report format: pass/fail per item at section, page and site level, validator status, rubric estimate, fix-list by rejection risk.
- [references/utility-pages.md](references/utility-pages.md): the Style Guide, Instructions, Licenses, Changelog and error pages: exact slugs, placement, contents.

## Non-negotiables

These alone get a template rejected. Check them first and last.

1. **Custom code only in the exceptions [G].** Site settings, page settings and embeds carry no custom code except:
   - the **Webflow Way Validator** snippet in Site Settings → Custom Code → Head code, required for submission;
   - font-smoothing CSS in Project Settings;
   - `<meta name="robots" content="noindex">` on the Licenses and Changelog pages (optional);
   - inline SVG embeds, which then require an Instructions page;
   - GSAP custom code, which then needs a documented "How to Edit GSAP Animations" section. We do not use it; native interactions only.

   No Finsweet Attributes, sliders, libraries or analytics [H]. Open question for Webflow: the guidelines do not say whether the validator snippet can stay in the listed template after approval. Do not remove it from a submitted template without confirming.
2. **No JSON-LD schema** anywhere [H]. The buyer adds their own.
3. **Required pages [G].** Style Guide at `/style-guide`; Changelog at `/changelog`, listing each template version and what changed; Licenses at `/licenses`, opening with the exact sentence in rule 4; a branded 404 with full navigation and CTAs; Instructions at `/instructions` only when advanced or complex interactions, hidden components, GSAP custom code or SVG embeds are used. The password page is optional; if present, style it. Page names Title Case, each name matching its slug. Style Guide, Licenses and Changelog are linked from the footer or a utility navigation. House rule [H]: utility pages sit at the site root so their slugs stay exact.
4. **Licenses page [G]** opens with: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below." It lists every font with its licence link, every image, icon and asset with its source and licence link, and identifies AI-generated images with the tool and its terms. The footer on every page links to it.
5. **Navbar, Footer and CTA are components** on every page [G]. Component and variant names Title Case.
6. **Variables [G]** for colours, type, spacing, radius and shadows: Title Case with spaces, grouped, ramps ordered, Modes for Tablet, Mobile Landscape and Mobile Portrait. Tag styles on H1 to H6, All Paragraphs, lists, blockquotes, figures, figure captions and links, all bound to variables.
7. **Native interactions only [G]**: Webflow Interactions, powered by GSAP, which became the default for templates on 1 May 2026. No Classic interactions, no unused interactions, sentence-case names. Markers off [H].
8. **SEO on every page, CMS templates included [G].** Unique title under 60 characters; description 150 to 160; Open Graph title, description and a JPEG or PNG image of at least 1200×630 at 1.91:1 (no WebP). Home title exactly `{Template Name} - Webflow HTML website template` (ecommerce: `Webflow Ecommerce website template`). "Powered by Webflow" in the footer, linking to webflow.com.
9. **Images and assets [G].** Every image must be **150 KB or less**. Larger images block the submission (SVGs and Webflow-generated video posters are exempt). Hard limit 4 MB per file. Site under 10 MB. Resale-safe or CC0 only, with licences linked. No trademarked logos (social media icons excepted). Custom favicon and webclip. The nav logo is an image file whose name matches the template.
10. **CMS [G].** 3 to 7 realistic items per collection; dynamic SEO on every template page; collection names Title Case with correct singular and plural; collection slugs singular; field names sentence case with help text.
11. **Site settings [G].** Responsive images on; CSS minified; form notifications empty; integrations default with no API tokens; Google or OFL fonts only; no Maps key.
12. **Ecommerce templates [G].** Never add a business address or any store setting; Setup Guide steps stay unchecked; cart, product, category, checkout, PayPal checkout and order confirmation pages styled; no preloaders on those pages.
13. **Submission gate [G].** A paid Workspace plan (the Starter plan's page limit is too small). Install the Webflow Way Validator using the Private Link Webflow gives you, paste its snippet into Site Settings → Custom Code → Head code, and publish. Run it on all published pages, not just the current one, until you get 100%. Submit from the .webflow.io staging URL; no Site plan is needed. The form checks your latest run and will not accept a template without a full 100% pass.

## Quality rubric [R]

Each row is rated Satisfactory, Good or Exceptional. A template passes only at Good on every row, in both the design criteria and the functionality criteria. Satisfactory gets feedback and a revision; failing to reach Good after two rounds of feedback may lead to rejection. Thresholds and the full row text are in the checklist, section R.

## Copy and content

Templates are judged as marketing sites. Every heading and paragraph is real, relevant copy for the template's niche, well written, no lorem ipsum, no keyword stuffing, correct spelling and grammar, consistent names and roles across the site (a team member's name and title match on every page). Content is inclusive and safe for a global audience [G]. Fake brand and logos only [G]. The template should quietly demonstrate good conversion design: obvious CTAs in nav and hero, social proof, objection handling, clear paths to contact or purchase [G and R].

## Agency credit [H]

A single, tasteful credit link to the agency belongs on the Style Guide page (and may sit in the Instructions page), carrying UTM parameters so traffic is attributable. Webflow's guidelines do not require or forbid it. It is not repeated on client-facing pages and is never hidden text. The buyer can remove it; if they leave the utility page published it stays a genuine backlink.

## Workflow: build a template

1. **Start** from the agency's no-code template starter (Client-First, Relume-style style guide, zero scripts). Confirm site settings are default and custom code is empty before doing anything else. Confirm a paid Workspace plan.
2. **Foundation** per the client-site skill: scan the design, tokens with breakpoint modes, utilities, style guide, Navbar, Footer, Button, CTA components. Fill the Style Guide with every tag and utility.
3. **Pages** from a duplicate-this base structure with full SEO. Home is the real homepage at `/`. Style Guide, Licenses and Changelog sit at the root at their required slugs. A template-showcase page, if wanted, lives in a folder and never takes a required slug.
4. **Sections** one at a time, Client-First skeleton, real copy, compressed assets (150 KB or less) with alt text, checked at every breakpoint. Library sections are renamed and stripped of Classic interactions.
5. **CMS** with 3 to 7 items each, dynamic SEO, help text.
6. **Motion** natively, sparingly, verified in Preview.
7. **Utility pages** per the reference. Licenses complete. Changelog lists each version and what changed, starting at V1.0.
8. **QA** per the checklist and report format. Fix everything in tiers 1 and 2, including every image over 150 KB. Re-run the whole template, not just the items you changed.
9. **Validate.** Install the Webflow Way Validator, publish, and run it on all published pages until it reports 100%.
10. **Listing**: name of one or two words, up to two categories, page count type declared, thumbnails without badges, text or CTAs, short and long descriptions.

## Workflow: QA an existing template

1. Read the full checklist. Audit the site through the MCP: pages, slugs and SEO, custom code, components, styles, variables, interactions, forms, CMS, assets and file sizes, fonts, schema (must be empty).
2. Check visually what the API cannot: every page at every breakpoint, hover and focus states, forms, navigation, interactions playing, markers off. Use the browser for legacy interactions (`Webflow.require('ix2').store.getState().ixData` must be empty on the published page).
3. Confirm the Webflow Way Validator snippet is in head code and its latest run is 100% on every published page. The API cannot see the run; mark it MANUAL until a person confirms.
4. List site-settings items the user must confirm in the Designer.
5. Write the report per the format: PASS, FAIL, NEEDS VISUAL or MANUAL per item at section, page and site level; a rubric estimate per row; a fix-list ordered by rejection likelihood.
6. Fix through the MCP what can be fixed, one tier at a time, re-checking each. Hand the user the exact manual steps for the rest.

## Anti-patterns

Custom code outside the exceptions above; scripts or attribute libraries; schema; a showcase page at the root instead of the real home; Style Guide, Licenses or Changelog inside a folder (the slug breaks); Instructions at any slug other than `/instructions`; any image over 150 KB (blocked at submission); a validator snippet that is missing or not at 100%; static SEO on CMS template pages; placeholder images or lorem ipsum anywhere; more than 7 CMS items; markers on; Classic interactions; empty links (`#`) in nav or buttons; a second H1 outside a section or article; competing button classes; agency favicon left in place of the template's; forms all named "Email Form"; typos in prop names visible to buyers.
