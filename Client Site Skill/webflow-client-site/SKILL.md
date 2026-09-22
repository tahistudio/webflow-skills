---
name: webflow-client-site
description: "Take a Figma design and a blank or starter Webflow project and deliver a complete client website: scan the design, set up the whole system first (variables, utilities, style guide, components), break every page into sections and components, build one section at a time with props, slots and variants, add native GSAP interactions, JSON-LD schema on every page, and QA each section, page and breakpoint. Use whenever the user gives a Figma link plus a Webflow site, says 'build this site', 'build this page', 'break down this design', 'client site', 'convert this Figma', or asks how to plan a Webflow build. Works with Lumos or Client-First; load the matching framework skill alongside tahi-webflow-core."
---

# Client site — Figma to finished Webflow build

This skill is the job plan for a full client build. It assumes `tahi-webflow-core` is loaded and one framework skill (`lumos-webflow` or `client-first-webflow`) is loaded. The framework skill decides how things are named and structured; this skill decides the order of work, how a design is broken down, how content and SEO are handled, and what "done" means for a client.

References:

- [references/figma-breakdown.md](references/figma-breakdown.md) — the scan and the section and component decision procedure. Read before touching a design.
- [references/schema.md](references/schema.md) — the JSON-LD set per page type and how to validate it. Read before writing schema.

## Principles

- **Whole system first, then sections.** A section built before the token, utility and component system is complete gets rebuilt. Scan every page of the design before building any of it.
- **One section at a time, slowly.** Each section must be high quality on its own, in the context of its page, and in the context of the site. Never batch many frames into one pass.
- **Snap to the system.** Design values within the core tolerance snap to existing tokens. New tokens only for genuinely new, recurring values.
- **The client will edit this.** Every repeated block is a component with tooltipped props; controls come through sub-component variants; builder-only parts end in ` (dev)`; nothing is exposed that lets a client drift off-system.
- **SEO and schema are part of the build**, not a follow-up.

## Phase 0 — Intake

Collect before starting:

- Figma file and which pages and frames are in scope; which breakpoints the designer drew.
- Webflow site, framework, starter used, and anything already built.
- Pages list and sitemap, CMS needs (what repeats, what the client will add), forms and their destinations, integrations, languages.
- Brand assets: logo as SVG, fonts and licences, image sources.
- Who edits after launch (Marketer in Build mode, Editor, both).

Audit the Webflow site per the core workflow. Read the framework skill's inventory to know what already exists.

## Phase 1 — Design scan and system setup

1. **Scan** every frame per the breakdown reference. Produce: colour list, type roles, spacing values, radii, shadows, breakpoints drawn, a section inventory per page, and a first pass at which blocks repeat.
2. **Tokens**: map colours, type, spacing, radius, shadow onto variables, snapping per tolerance. Create modes for responsive values and for any theme or dark sections.
3. **Utilities**: extend the framework's utilities for any recurring value the scan found. Add each to the style guide.
4. **Components list**: from the repeat analysis, write a spec per component before building it: name, group, description, open or closed, props with groups and tooltips, variants, slots, nested components, which parts are ` (dev)`.
5. **Style guide and components page** complete and visible. Navbar, Footer, Button and CTA components built and placed on the Base Structure page.
6. **Pages** created from Base Structure with title, slug, folder, SEO title and description, Open Graph.

Only when all of this exists does section building start.

## Phase 2 — Build, section by section

For each section, in page order, top to bottom:

1. Decide: instance of an existing component, new component (repeats elsewhere), or one-off section. Reuse first. Check whether a section already built elsewhere on the site covers it.
2. Build structure with the framework's skeleton and real classes created as styles first. Flat DOM, no empty divs.
3. Content: real copy from the design or client, images by asset with alt text, real links. Placeholder text is a bug.
4. Props and variants: expose per-instance values; group and tooltip; expose colour and spacing through sub-component variants only.
5. Responsive: desktop first, then every enabled breakpoint. Where the design has no tablet or mobile frame, decide from judgement and visual feedback and note the decision.
6. Check live: render the section at desktop, then each breakpoint. Fix before moving on.

After the last section of a page: heading outline check, Lighthouse, console, then the page-level QA list from the core checklist.

## Phase 3 — Motion

Native GSAP interactions only, added after a page's structure is stable. Component-scoped where the block is a component. Reveals carry start values; scroll reveals start around 85 percent of the viewport with at least half a second duration; markers off; reduced-motion honoured. Verify in Preview. Library sections' Classic interactions are stripped, never kept.

## Phase 4 — SEO, schema, settings

- Every page: unique title under 60 characters, description 150 to 160, Open Graph title, description and a 1200 by 630 image. CMS templates bind these to fields.
- JSON-LD on every page in the page-settings schema field, never in head or body code, per the schema reference. Validate before it goes on the site.
- Sitemap, canonical and index settings; redirects for any changed URLs; favicon and webclip; 404 and password pages designed.
- Forms wired to real destinations, notifications set, success and error states designed.
- Tracking and consent in site head only.

## Phase 5 — QA and handoff

Run the core checklist per page and per site. Add for client sites:

- Every breakpoint walked top to bottom on every page, navigation open state included.
- Lighthouse per page; console clean.
- Schema validates on every page.
- All ` (dev)` components and props hidden from Marketers; slot restrictions set where needed.
- Client-facing components have descriptions; a short client guide is written (where to add sections, what each prop does, what not to touch).
- Publish only to staging first and only when asked; the user confirms embeds, animation and mobile before any custom domain publish.

## Reporting

Per section, per page and at the end, report what was built, what was verified at which breakpoints, what could not be verified and how to check it, and any snap or breakpoint decisions made without a frame to follow.
