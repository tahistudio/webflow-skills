---
name: webflow-template
description: "Build, finish and QA Webflow Marketplace templates so they pass Webflow's Submission Guidelines and Grading Rubric on the first review: the Webflow Way Validator, required pages and slugs, licences, design system and naming, native GSAP interactions, SEO, accessibility, the 150 KB image rule, CMS and ecommerce rules, the custom-code exceptions, copy quality, listing assets, and a pass/fail report with a fix-list. Use whenever the user mentions a Webflow template, the Marketplace, template submission, template QA, a style guide or licenses page for a template, a free cloneable, or asks whether a site is 'submittable'. Also use to develop a new template from a Figma file or from the Client-First V3 starter, and to adapt Client-First V3 (Global / Styles embeds, lowercase variables, Template components, launch checklist) to Marketplace rules. Read tahi-webflow-core and client-first-webflow first; this skill adds the Marketplace rules."
---

# Webflow Marketplace templates

A template is a client site that a stranger will buy, install and edit without you. Webflow reviews it against its Submission Guidelines and its Grading Rubric. Every submission requirement must be met, every rubric row must score "Good", and the submission form will not accept a template without a 100% Webflow Way Validator run. Most rejections are guideline breaches, not design.

**Source of truth.** Webflow's pages win over this skill:
- Submission Guidelines: https://webflow.com/templates/submission-guidelines
- Grading Rubric (design and functionality criteria): https://webflow.com/templates/grading-rubric

The rules below reflect the Submission Guidelines as updated 6 Nov 2026 and the Grading Rubric (design and functionality criteria, unchanged since the 27 Oct 2026 check). The last saved snapshot is `_research/sources/webflow-guidelines-and-rubric-2026-10-27.txt` (27 Oct 2026). The 6 Nov changes were read from the live page and no snapshot file was saved for them. The live page renders client-side: read it in a browser, because curl returns an empty shell. Every rule below is tagged **[G]** (Submission Guidelines), **[R]** (Grading Rubric) or **[H]** (house rule: our own QA on top of Webflow's). When a live page changes, update this skill and save a new snapshot together. When a user asks for "the latest guidelines", re-read the live page and diff it against the checklist before relying on this copy.

Read `tahi-webflow-core` and `client-first-webflow` first (templates are built in Client-First). This skill adds what the Marketplace requires and how we QA against it. References:

- [references/submission-checklist.md](references/submission-checklist.md): every requirement as a checkable item, tagged G, R or H, grouped like Webflow's guidelines, plus the Validator's twelve blocking issues and the grading rubric. Read in full before any template QA or build.
- [references/qa-report.md](references/qa-report.md): the report format: pass/fail per item at section, page and site level, validator status, rubric estimate, fix-list by rejection risk.
- [references/utility-pages.md](references/utility-pages.md): the Style Guide, Instructions, Licenses, Changelog and error pages: exact root slugs, contents, the single footer credit.

## Non-negotiables

These alone get a template rejected. Check them first and last.

1. **Custom code only in the exceptions [G].** Site settings, page settings and embeds carry no custom code except:
   - the **Webflow Way Validator** snippet in Site Settings → Custom Code → Head code, required for submission (rule 15);
   - font-smoothing CSS in Project Settings;
   - `<meta name="robots" content="noindex">` on the Licenses and Changelog pages, required there since 6 Nov 2026; allowed on the other utility pages but not asked for;
   - inline SVG embeds, which then require an Instructions page;
   - GSAP custom code, which then requires an Instructions page with a "How to Edit GSAP Animations" section. We do not use it; native interactions only.

   No Finsweet Attributes, sliders, libraries or analytics, and strip leftover attributes such as `fs-*` from elements [H]. Open question for Webflow: the guidelines do not say whether the validator snippet can stay in the listed template after approval. Do not remove it from a submitted template without confirming.
2. **No JSON-LD schema** anywhere [H]. The buyer adds their own.
3. **Required pages, all at the site root with exact slugs [G].** Style Guide at `/style-guide`; Changelog at `/changelog`, listing each template version and what changed; Licenses at `/licenses`, opening with the exact sentence in rule 4; Instructions at `/instructions`, required when advanced or complex interactions, hidden components, GSAP custom code or SVG embeds are used [G] (we always build it [H]); a branded 404 with the site navbar, footer and CTAs. The password page is optional; if present, style it. Page names Title Case, each name matching its slug. Style Guide, Licenses and Changelog are linked from the footer or a utility navigation on every page. No "Template Pages" folder: a folder breaks the slugs. The page is called "Instructions"; the old "Start Here" name is retired.
4. **Licenses page [G]** opens with: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below." It lists every custom font with its licence link, every image, icon and asset with its source or licence link, and identifies AI-generated images with the tool and its terms, even when the tool asks for no attribution. A visible link to it sits in the footer or utility navigation on every page.
5. **Navbar, Footer and CTA are components** on every page [G]. Component and variant names Title Case.
6. **Variables [G]** for colours, type, spacing, radius and shadows: Title Case with spaces, grouped, ramps ordered, Modes for Tablet, Mobile Landscape and Mobile Portrait. Tag styles on H1 to H6, All Paragraphs, lists, blockquotes, figures, figure captions and links, all bound to variables.
7. **Native interactions only [G]**: Webflow Interactions, powered by GSAP, which became the default for templates on 1 May 2026. No Classic interactions, no unused interactions, sentence-case names. Markers off [H].
8. **SEO on every page, CMS templates included [G].** Unique title under 60 characters; description 150 to 160; Open Graph title, description and a JPEG or PNG image of at least 1200×630 at 1.91:1 (no WebP). Home title exactly `{Template Name} - Webflow HTML website template` (ecommerce: `Webflow Ecommerce website template`). "Powered by Webflow" in the footer, linking to webflow.com.
9. **Images and assets [G].** Every image must be **150 KB or less**. Larger images block the submission (SVGs and Webflow-generated video posters are exempt). Hard limit 4 MB per file. Site under 10 MB. Width and height set on every image in its image settings. Autoplay and background videos carry a visible play/pause control. Resale-safe or CC0 only, with licences linked. No trademarked logos (social media icons excepted). Custom favicon and webclip; Webflow's defaults are rejected. The nav logo is an image file whose name matches the template.
10. **CMS [G].** 3 to 7 realistic items per collection; dynamic SEO on every template page; collection names Title Case with correct singular and plural; collection slugs singular (`/article/…`, `/event/…`); field names sentence case with help text.
11. **Forms [G].** Custom success and error messages written and styled for every form; Webflow's defaults ("Thank you! Your submission has been received!" and "Oops! Something went wrong while submitting the form.") are rejected. Meaningful form and field names everywhere, the password page form included. A label on every field; correct field types.
12. **The template is about the buyer's business, not yours [G].** No "Buy", "Get template" or pricing buttons or links; no "More templates" or "All templates" links; no links to your other templates; no floating badges, bars, banners or pop-ups; no offers for customisation, support, Figma files or other paid services, in the pages or on the Instructions page. No ® or ™ in copy. The one exception is a single "Designed by" credit in the footer (see Agency credit).
13. **Site settings [G].** Responsive images on; CSS minified; form notifications empty; integrations default with no API tokens; Google or OFL fonts only; no Maps key.
14. **Ecommerce templates [G].** Never add a business address or any store setting; Setup Guide steps stay unchecked; cart, product, category, checkout, PayPal checkout and order confirmation pages styled; no preloaders on those pages.
15. **Submission gate [G].** A paid Workspace plan (the Starter plan's page limit is too small). Install the Webflow Way Validator through the Private Link in the guidelines' Start Here tab, paste its snippet into Site Settings → Custom Code → Head code, and publish. Run it on all published pages, not just the current one, until you get 100%, and re-run it before every submit. Submit from the .webflow.io staging URL; no Site plan is needed. The form checks your latest run and will not accept a template without a full 100% pass. Remove nothing else from the head to make room for the snippet [H]. Since 6 Nov 2026 the Validator blocks on twelve issues reviewers kept sending back:
    - default form success or error messages;
    - default form and field names;
    - images without width and height;
    - autoplay video without a play/pause control;
    - a 404 without the site navbar and footer;
    - Licenses not linked from the footer or navigation;
    - a missing or default favicon or webclip;
    - ® or ™ in copy;
    - links that promote the author or their other templates;
    - a Licenses page without the required opening text;
    - GSAP custom code without an Instructions page;
    - a footer without a "Powered by Webflow" link to webflow.com.

    Checklist section 13 maps each one to its checklist item.

## Quality rubric [R]

Each row is rated Satisfactory, Good or Exceptional. A template passes only at Good on every row, in both the design criteria and the functionality criteria. Satisfactory gets feedback and a revision; failing to reach Good after two rounds of feedback may lead to rejection. Thresholds and the full row text are in the checklist, section R.

## Client-First V3 on a template

Templates are built in Client-First V3 (structure, naming, variables, components, template components). Five V3 defaults clash with the Marketplace and are changed on every template:

| V3 default | On a template |
|---|---|
| `Global / Styles` with `global-styles_default` and `global-styles_custom` embeds | Embeds count as custom code. Move what can be native into native styles and variables (focus states via the Focused state, selection and rich text margins via tag and class styles, text clarity via the allowed font-smoothing CSS in site head). Then delete the embeds and the component (an empty, unused component fails the unused-components check). Note anything lost on the Instructions page. |
| Variable names lowercase with dashes (`primary`, `background-hover`, `h2-font-size`) | Title Case with spaces (`Primary`, `Background Hover`, `H2 Font Size`). Groups and collections keep their V3 structure. |
| Interaction names `Element [Action State]` | Sentence case, descriptive, per Webflow's GSAP guidance: "Open nav menu", "Reveal hero image on scroll". |
| Finsweet Attributes, Accessibility Attributes script, `global-styles_custom` CSS | Not allowed. Native features only. |
| Launch checklist items for tracking, consent, schema, custom fonts, form notifications, domains, robots.txt, llms.txt | Not allowed or not applicable. The launch checklist's Template column says which; use this skill's checklist instead. |

What carries over unchanged: core structure with the native Section element and padding from variables, combined spacing classes and gap, grid utilities, `Group / Identifier` component names in matching groups (Title Case, so they pass), `Template / Core Structure` and `Template / Section` as the buyer's starting points (explain them on the Instructions page), and the non-template rows of the launch checklist (forms, CMS, performance, mobile, browsers, accessibility, organise).

## Copy and content

Templates are judged as marketing sites. Every heading and paragraph is real, relevant copy for the template's niche, well written, no lorem ipsum, no keyword stuffing, correct spelling and grammar, consistent names and roles across the site (a team member's name and title match on every page). Content is inclusive and safe for a global audience [G]. Fake brand and logos only [G]. The template should quietly demonstrate good conversion design: obvious CTAs in nav and hero, social proof, objection handling, clear paths to contact or purchase [G and R].

## Agency credit [G]

The 6 Nov 2026 guidelines treat any credit outside the footer as self-promotion, so the old credit on the Style Guide and Instructions pages is gone. The only permitted credit is one "Designed by {Agency}" link in the footer, visible text, linking to the agency site or creator profile [G]. UTM parameters on that single link are fine [H]. Nothing else points at the agency anywhere: not the Instructions page, not the listing description (no links, no support email; buyers use the Support tab), not the thumbnails [G].

## Workflow: build a template

1. **Start** from the agency's no-code template starter (Client-First, Relume-style style guide, zero scripts). If that starter is not yet on V3 with the table above applied, or you start from Finsweet's V3 starter, apply the table first and check it with the MCP: no embeds, Title Case variables. Confirm site settings are default and custom code is empty (apart from the Validator snippet and font smoothing) before doing anything else. Confirm a paid Workspace plan.
2. **Foundation** per the client-site skill: scan the design, tokens with breakpoint modes, utilities, style guide, Navbar, Footer, Button, CTA components. Fill the Style Guide with every tag and utility.
3. **Pages** from `Template / Core Structure` (or a duplicate-this base structure on older starters) with full SEO. Home is the real homepage at `/`. Style Guide, Licenses, Changelog and Instructions sit at the root at their required slugs. No showcase or "buy" landing page anywhere in the template: the listing and thumbnails do that job.
4. **Sections** one at a time, Client-First skeleton, real copy, compressed assets (150 KB or less, width and height set) with alt text, checked at every breakpoint. Library sections are renamed and stripped of Classic interactions.
5. **CMS** with 3 to 7 items each, singular collection slugs, dynamic SEO, help text.
6. **Forms** with custom success and error messages and meaningful form and field names.
7. **Motion** natively, sparingly, verified in Preview. Agree the reveal style with the owner before building interactions, keep every duration at 800 ms or less (checklist 3.10), and use the staggered section-reveal recipe in `tahi-webflow-core/references/mcp-playbook.md`.
8. **Utility pages** per the reference, at the root. Licenses complete. Changelog lists each version and what changed, starting at V1.0, dated the day you submit. Keep one facts file (page names and count, CMS collections, interactions, fonts, image formats, version, date) and write the listing, Changelog and Instructions from it so they cannot disagree. The footer or a utility navigation links Style Guide, Licenses and Changelog; the footer carries "Powered by Webflow" and the single "Designed by" credit.
9. **QA** per the checklist and report format. Fix everything in tiers 1 and 2, including every image over 150 KB and every Validator blocking issue. Re-run the whole template, not just the items you changed.
10. **Validate.** Install the Webflow Way Validator, publish, and run it on all published pages until it reports 100%. Re-run QA after any fix.
11. **Listing**: name of one or two words, up to two categories, page count type declared, thumbnails without badges, text or CTAs, short and long descriptions with no links and no support email. Make the listing assets (profile image, 750×995 thumbnail, 1440×900 gallery) before opening the form; specs and flow are in [references/submission-form.md](references/submission-form.md).
12. **Submit.** Never tell the owner a template is ready, and never let them tick the final confirmations, until the QA report verdict is WOULD PASS and the pre-submit pass in the submission-form reference is done. The form's "Ready to submit" only means the form's own checks passed.

## Workflow: QA an existing template

1. Read the full checklist. Audit the site through the MCP: pages, slugs and SEO, custom code (including any `Global / Styles` embeds), components and groups, styles, variables and their name casing, interactions, forms and their messages and names, CMS, assets, file sizes and image dimensions, fonts, outbound and self-promoting links, schema (must be empty).
2. Check visually what the API cannot: every page at every breakpoint, hover and focus states, forms, navigation, interactions playing, video controls, markers off. Use the browser for legacy interactions (`Webflow.require('ix2').store.getState().ixData` must be empty on the published page).
3. Confirm the Webflow Way Validator snippet is in head code and its latest run is 100% on every published page. The API cannot see the run; mark it MANUAL until a person confirms. Check the twelve blocking issues (checklist section 13) before anything else.
4. List site-settings items the user must confirm in the Designer.
5. Write the report per the format: PASS, FAIL, NEEDS VISUAL or MANUAL per item at section, page and site level; a rubric estimate per row; a fix-list ordered by rejection likelihood.
6. Fix through the MCP what can be fixed, one tier at a time, re-checking each. Hand the user the exact manual steps for the rest.

## Anti-patterns

Custom code outside the exceptions above; Client-First `Global / Styles` embeds left in; lowercase V3 variable names; scripts or attribute libraries; schema; a showcase or "buy" page anywhere in the template; any utility page inside a folder or at a non-standard slug (`/template-pages/...`, `/start-here`); any image over 150 KB (blocked at submission); images without width and height; autoplay video without a play/pause control; a validator snippet that is missing or not at 100%; static SEO on CMS template pages; placeholder images or lorem ipsum anywhere; more than 7 CMS items; markers on; Classic interactions; empty links (`#`) in nav or buttons; a second H1 outside a section or article; competing button classes; Webflow's default favicon, or the agency's, left in place of the template's; forms all named "Email Form"; default form success and error messages; a "Buy Template", "View More" or "Request Figma file" link; agency credit anywhere but the footer; ® or ™; typos in prop names visible to buyers.
