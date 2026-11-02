# QA checklist — every build, every framework

Run per section while building, per page when a page is complete, and per site before handoff. Report each item as PASS, FAIL (with evidence), NEEDS VISUAL (you could not render it) or MANUAL (only a person in the Designer or site settings can check it). Specialist skills add their own sections; they never remove these.

## Per section (while building)

- [ ] Built from existing utilities, variables and components; any new class was created as a style first and, if reusable, added to the style guide.
- [ ] Class names are semantic (what it is), not page or block numbers.
- [ ] No empty div blocks; no unnecessary wrappers.
- [ ] No px on type or spacing; grid has at least one row and ratio columns; sections use min-height.
- [ ] Every image has alt text (or is marked decorative), is compressed, and is bound by asset.
- [ ] Every link and button has a real destination and a hover and focus state.
- [ ] Heading level fits the page outline (one h1 per page, no skipped levels).
- [ ] Section rendered and checked at desktop, then at every enabled breakpoint. No horizontal scroll, no text overflow, tap targets at least 44px on touch sizes.
- [ ] Any interaction plays in Preview; markers are off; reduced-motion handled.

## Per page

- [ ] Page name in Title Case; slug matches; folder is correct.
- [ ] SEO title under 60 characters, description 150 to 160, Open Graph title, description and image set (JPEG or PNG, at least 1200 by 630).
- [ ] CMS template pages bind SEO and OG to fields, not static text.
- [ ] One h1; heading order correct across all sections together.
- [ ] Forms: labels on every field, correct field types, custom success and error states, meaningful form and field names.
- [ ] Console has no errors on load and after scrolling the full page.
- [ ] Lighthouse: aim for 80 or above mobile and 90 or above desktop. Record the score and the top three causes if below.
- [ ] Visual pass at every breakpoint, top to bottom, including the navigation open state and any modals, tabs, sliders and accordions.

## Per site

- [ ] Style guide shows every utility and variable in use; components page holds every component; no unused styles, interactions or components left behind.
- [ ] Navigation and footer are components and identical on every page.
- [ ] Components: Title Case names, groups, descriptions; every prop has a tooltip and a group; dev-only components and props carry the ` (dev)` suffix.
- [ ] Variables cover colours, sizes, type, radius and shadow; names are grouped and Title Case.
- [ ] Custom code sits in the right place (page, component, Global Styles, or site) per the placement rules.
- [ ] Accessibility: contrast for text, borders and icons meets WCAG AA; keyboard focus visible and logical; skip link present; decorative images hidden from screen readers; no autoplaying media without controls.
- [ ] Audit panel in the Designer shows no missing alt, skipped headings, empty links or unlabelled fields. Note that it does not inspect inside components, lightboxes or CMS-bound images; check those by hand.
- [ ] Assets: total weight and per-image size reviewed; oversized files compressed.
- [ ] 404 and password pages styled and branded.
- [ ] Nothing published unless the user asked; if published, the user was asked to confirm anything you cannot see (embeds, animation, mobile widths).

## What the API cannot check

Say so explicitly and give the user the exact place to look:

- Site settings: favicon and webclip, responsive images toggle, CSS minification, form notifications, integrations, font uploads.
- Classic (IX2) interactions: run `Webflow.require('ix2').store.getState().ixData` in the browser console on the published page.
- Rendered output on tablet and mobile: Preview, the breakpoint canvas, or a real device.
- Anything inside embeds or custom code.
