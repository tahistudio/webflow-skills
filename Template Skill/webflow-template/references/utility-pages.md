# Template utility pages

## Placement

Webflow fixes these slugs [G]. Keep the Style Guide, Licenses, Changelog and Instructions pages at the **site root**. A folder changes the URL (for example `/template-pages/style-guide`) and fails the requirement [G, with a house rule to keep them at the root, H].

| Page | Location | Slug | Published? | noindex | Source |
|---|---|---|---|---|---|
| Style Guide | site root | `/style-guide` | published | optional (house: yes) | G |
| Licenses | site root | `/licenses` | published | optional (house: yes) | G |
| Changelog | site root | `/changelog` | published | optional (house: yes) | G |
| Instructions | site root | `/instructions` | published when required | optional | G (required only when a trigger applies; see below) |
| 404 | system | `/404` | not applicable | not applicable | G (branded, full navigation, CTAs) |
| Password | system | `/401` | optional | not applicable | G (optional; style it if present) |
| Components dump page (optional) | folder "Template Pages" | `/template-pages/components` | draft | yes | H |
| Base Structure (duplicate-this skeleton) | folder "Template Pages" | any | draft | not applicable | H |

The Style Guide, Licenses and Changelog pages must be linked from the footer or a utility navigation [G]. The footer on every page must link visibly to Licenses [G].

## Style Guide

Slug `/style-guide` [G]. It must include every tag: headings, paragraphs, links, buttons, lists, blockquote, figure, forms [G].

Order: utilities, then variables, then components.

1. Colours: swatches and ramps as variable-bound blocks, semantic scheme demo (light and dark section), text and background colour utilities.
2. Typography: H1 to H6 as tags, `heading-style-*` classes, paragraph sizes, text weights, text styles, text alignment, a Rich Text block with every tag (headings, paragraphs, lists, blockquote, figure with caption, links, code).
3. Buttons in every variant and size, with hover and focus visible.
4. Shadows, radius, spacing scale (paddings, margins, spacers), max widths, containers, icons at each size.
5. Forms: input, textarea, select, checkbox, radio, label, error and success states.
6. UI: tags, badges, cards, dividers.
7. Components: one instance of each, or link to the Components page.

Keep the hidden default rich-text block so tag styles are never purged [H]. The page's SEO description may record the framework and version used, which helps anyone auditing later [H]. Its SEO description must not be left at a starter default (the snapshot case: "Relume Style Guide v3.0").

## Instructions

Slug `/instructions` [G]. **Required only if** any of these apply [G]:
- advanced or complex interactions are used;
- hidden components are used;
- GSAP custom code is used. Then it must include "How to Edit GSAP Animations" with an element map, key variables, and removal steps;
- SVG embeds are used.

The page explains how to access and edit those components [G]. House rule [H]: include one whenever a template has hidden components or SVG embeds, and keep it short for a buyer who has never used the template. If none of the triggers apply, the page is not required.

Contents, written for a buyer, short sections in plain language [H]:
1. Welcome and what the template includes (pages, CMS, components).
2. Getting started: duplicate the base structure page for new pages; where the Navbar, Footer and CTA components live and how to edit them once.
3. Colours and fonts: which variables to change; where the font is set (Body tag).
4. Logo and favicon: the nav logo is an image file to replace; favicon and webclip in site settings.
5. Images: compress to 150 KB or less, set alt text, keep formats modern.
6. CMS: how to add, edit and delete items; which fields feed SEO.
7. Components and props: what each client-facing prop does; do not edit main components unless intended for every instance.
8. Interactions: where they are and how to remove one.
9. SEO checklist for launch: titles, descriptions, Open Graph, sitemap.
10. Support contact and the Changelog link.
11. Agency credit with UTM (see below).

If SVG embeds are used anywhere, add a short section on how to swap an SVG [G]. If complex interactions or hidden components exist, explain how to access and edit them [G]. If GSAP is used, add the "How to Edit GSAP Animations" section [G].

## Licenses

Slug `/licenses` [G]. Top of the page, exact text [G]: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below."

Then:
- Fonts: each family, source, licence name and link (Google Fonts or OFL only) [G].
- Images: each source (for example a CC0 stock site) with a link to its licence [G].
- AI-generated images: each one identified, with the tool or source named and its terms linked, even when the provider does not require attribution [G].
- Icons and illustrations: set name, source, licence link [G].
- Any other asset (videos, Lottie files, fonts inside graphics) [H].

noindex is optional on this page [G]; the house recommends it [H].

## Changelog

Slug `/changelog` [G]. It lists each template version and what changed [G]. House format [H]: newest first, each entry `V1.0 — {date}` with bullets. Every update to the published template adds an entry. Major design changes are not accepted post-publish; keep updates to fixes and content (see the process facts in the checklist).

noindex is optional [G]; the house recommends it [H].

## Agency credit [H]

One tasteful line on the Style Guide (and optionally Instructions): "Template by {Agency}" linking to the agency site with UTM parameters, for example `?utm_source=webflow-template&utm_medium=style-guide&utm_campaign={template-name}`. Visible text, normal styling, no hidden links, not repeated on marketing pages. If the buyer keeps the utility pages published it remains a real backlink; if they remove it, nothing breaks. Webflow's guidelines neither require nor forbid it.

## Error and password pages

- **404**: branded, with full navigation and CTAs [G]. Use the template's Navbar and Footer components, a heading, a short message, and CTAs back to Home and to the main conversion page [H].
- **Password** (optional) [G]: if the template has one, style it to match the template, using its form styling [G].
