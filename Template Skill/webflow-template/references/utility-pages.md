# Template utility pages

## Placement

| Page | Location | Slug | Draft? | noindex |
|---|---|---|---|---|
| Licenses | site root | `/licenses` | published | yes |
| Style Guide | folder "Template Pages" | `/template-pages/style-guide` | published | yes |
| Start Here | folder "Template Pages" | `/template-pages/start-here` | published | yes |
| Changelog | folder "Template Pages" | `/template-pages/changelog` | published | yes |
| Components (optional dump page) | folder "Template Pages" | `/template-pages/components` | draft | yes |
| 404 | system | `/404` | — | — |
| Password | system | `/401` | — | — |
| Base Structure (duplicate-this skeleton) | site root | any | draft | — |

Licenses must publish at exactly `/licenses`; a folder breaks the requirement. The footer on every page links to Licenses. All utility pages carry `<meta name="robots" content="noindex">` in their head code.

## Style Guide

Order: utilities, then variables, then components.

1. Colours: swatches and ramps as variable-bound blocks, semantic scheme demo (light and dark section), text and background colour utilities.
2. Typography: H1 to H6 as tags, `heading-style-*` classes, paragraph sizes, text weights, text styles, text alignment, a Rich Text block with every tag (headings, paragraphs, lists, blockquote, figure with caption, links, code).
3. Buttons in every variant and size, with hover and focus visible.
4. Shadows, radius, spacing scale (paddings, margins, spacers), max widths, containers, icons at each size.
5. Forms: input, textarea, select, checkbox, radio, label, error and success states.
6. UI: tags, badges, cards, dividers.
7. Components: one instance of each, or link to the Components page.

Keep the hidden default rich-text block so tag styles are never purged. The page's SEO description may record the framework and version used, which helps anyone auditing later.

## Start Here (Instructions)

Written for a buyer who has never used the template. Short sections, plain language:

1. Welcome and what the template includes (pages, CMS, components).
2. Getting started: duplicate the Base Structure page for new pages; where the Navbar, Footer and CTA components live and how to edit them once.
3. Colours and fonts: which variables to change; where the font is set (Body tag).
4. Logo and favicon: the nav logo is an image file to replace; favicon and webclip in site settings.
5. Images: compress, set alt text, keep formats modern.
6. CMS: how to add, edit and delete items; which fields feed SEO.
7. Components and props: what each client-facing prop does; do not edit main components unless intended for every instance.
8. Interactions: where they are and how to remove one.
9. SEO checklist for launch: titles, descriptions, Open Graph, sitemap.
10. Support contact and the Changelog link.
11. Agency credit with UTM (see below).

If SVG embeds are used anywhere, add a short section on how to swap an SVG. If complex interactions or hidden components exist, explain how to access and edit them.

## Licenses

Top of page, verbatim: "All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below."

Then:

- Fonts: each family, source, licence name and link (Google Fonts or OFL only).
- Images: each source (for example a CC0 stock site) with link to its licence; AI-generated images listed as such with the tool named and its terms linked, even when the tool does not require attribution.
- Icons and illustrations: set name, source, licence link.
- Any other asset (videos, Lottie files, fonts in graphics).

## Changelog

Entries newest first: `V1.0 — {date}` with bullets. Every update to the published template adds an entry. Major design changes are not accepted post-publish; keep updates to fixes and content.

## Agency credit

One tasteful line on the Style Guide (and optionally Start Here): "Template by {Agency}" linking to the agency site with UTM parameters, for example `?utm_source=webflow-template&utm_medium=style-guide&utm_campaign={template-name}`. Visible text, normal styling, no hidden links, not repeated on marketing pages. If the buyer keeps the utility pages published it remains a real backlink; if they remove it, nothing breaks.

## 404 and password

Branded, using the template's Navbar and Footer components, a heading, a short message, and CTAs back to Home and to the main conversion page. The password page uses the template's form styling.
