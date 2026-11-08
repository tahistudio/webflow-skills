# Template utility pages

## Placement

Webflow fixes these slugs, and since the 6 Nov 2026 update every utility page sits at the **site root** [G]. A folder changes the URL (for example `/template-pages/style-guide`) and fails the requirement, so there is no "Template Pages" folder. The page is called "Instructions" (slug `/instructions`); the old "Start Here" name is retired.

| Page | Location | Slug | Published? | noindex | Source |
|---|---|---|---|---|---|
| Style Guide | site root | `/style-guide` | published | optional | G |
| Licenses | site root | `/licenses` | published | required | G |
| Changelog | site root | `/changelog` | published | required | G |
| Instructions | site root | `/instructions` | published | optional | G (required only when a trigger applies; see below). H: we always build it |
| 404 | system | `/404` | not applicable | not applicable | G (branded, site navbar, footer, CTAs) |
| Password | system | `/401` | optional | not applicable | G (optional; style it if present) |
| Components dump page (optional) | site root | `/components` | draft | not applicable | H |
| Base Structure (duplicate-this skeleton) | site root | any | draft | not applicable | H |

The footer or a utility navigation on every page links Style Guide, Licenses and Changelog [G]. The Validator blocks a template whose Licenses page is not linked from the footer or navigation [G]. `<meta name="robots" content="noindex">` in the page head code is required on Licenses and Changelog [G]; adding it to the other utility pages is allowed but not asked for.

## Style Guide

Slug `/style-guide`, at the site root [G]. It must include every tag: headings, paragraphs, links, buttons, lists, blockquote, figure, forms [G].

Order: utilities, then variables, then components.

1. Colours: swatches and ramps as variable-bound blocks, semantic scheme demo (light and dark section), text and background colour utilities.
2. Typography: H1 to H6 as tags, `heading-style-*` classes, paragraph sizes, text weights, text styles, text alignment, a Rich Text block with every tag (headings, paragraphs, lists, blockquote, figure with caption, links, code).
3. Buttons in every variant and size, with hover and focus visible.
4. Shadows, radius, spacing scale (padding, margin and gap classes; section padding sizes), grid utilities, max widths, containers, icons at each size.
5. Forms: input, textarea, select, checkbox, radio, label, error and success states.
6. UI: tags, badges, cards, dividers.
7. Components: one instance of each, or link to the Components page.

Keep the hidden default rich-text block so tag styles are never purged [H]. The page's SEO description may record the framework and version used, which helps anyone auditing later [H]. Its SEO description must not be left at a starter default (the snapshot case: "Relume Style Guide v3.0"). No agency credit on this page [G]; see Agency credit.

## Instructions

Slug `/instructions`, at the site root [G]. **Required by Webflow only if** any of these apply [G]:
- advanced or complex interactions are used;
- hidden components are used;
- GSAP custom code is used. Then it must include "How to Edit GSAP Animations" with an element map, key variables, and removal steps. The Validator blocks GSAP custom code without an Instructions page;
- SVG embeds are used.

The page explains how to access and edit those components [G]. House rule [H]: we always build it, whether or not a trigger applies, and keep it short for a buyer who has never used the template.

Contents, written for a buyer, short sections in plain language [H]:
1. Welcome and what the template includes (pages, CMS, components).
2. Getting started: for a new page, drop in `Template / Core Structure` and unlink it; for a new section, drop in `Template / Section` and unlink it (or duplicate the base structure page on older starters); where the Navbar, Footer and CTA components live and how to edit them once.
3. Colours and fonts: which variables to change; where the font is set (Body tag).
4. Logo and favicon: the nav logo is an image file to replace; favicon and webclip in site settings.
5. Images: compress to 150 KB or less, set width, height and alt text, keep formats modern.
6. CMS: how to add, edit and delete items; which fields feed SEO.
7. Components and props: what each client-facing prop does; do not edit main components unless intended for every instance.
8. Interactions: where they are and how to remove one.
9. SEO checklist for launch: titles, descriptions, Open Graph, sitemap.
10. Changelog link.

No self-promotion on this page [G]: no support contact, no agency links, no offers for customisation, paid services or Figma files. Buyers reach the author from the template's Support tab.

If SVG embeds are used anywhere, add a short section on how to swap an SVG [G]. If complex interactions or hidden components exist, explain how to access and edit them [G]. If GSAP custom code is used, add the "How to Edit GSAP Animations" section [G].

## Licenses

Slug `/licenses`, at the site root [G]. Top of the page, exact text [G]: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below." The Validator blocks a Licenses page without it [G].

Then:
- Fonts: each custom family, source, licence name and link (Google Fonts or OFL only) [G].
- Images: each source (for example a CC0 stock site) with a link to its licence [G].
- AI-generated images: each one identified, with the tool or source named and its terms linked, even when the provider does not require attribution [G].
- Icons and illustrations: set name, source, licence link [G].
- Any other asset (videos, Lottie files, fonts inside graphics) [H].

noindex is required on this page [G].

## Changelog

Slug `/changelog`, at the site root [G]. It lists each template version and what changed [G]. House format [H]: newest first, each entry `V1.0 — {date}` with bullets. Every update to the published template adds an entry. Major design changes are not accepted post-publish; keep updates to fixes and content (see the process facts in the checklist).

noindex is required on this page [G].

## Agency credit [G]

One "Designed by {Agency}" link in the footer, visible text, linking to the agency site or creator profile [G]. It is the only self-credit permitted anywhere in the template [G]. UTM parameters on that single link are fine, for example `?utm_source=webflow-template&utm_medium=footer&utm_campaign={template-name}` [H]. The old Style Guide and Start Here credit is gone: the 6 Nov 2026 guidelines reject any self-promotion in the template, Instructions page included [G].

## Error and password pages

- **404**: branded, with the full site navbar, footer and CTAs [G]. The Validator blocks a 404 without the navbar and footer [G]. Use the template's Navbar and Footer components, a heading, a short message, and CTAs back to Home and to the main conversion page [H].
- **Password** (optional) [G]: if the template has one, style it to match the template, using its form styling, with a meaningful form and field name, not "Email Form" [G].
