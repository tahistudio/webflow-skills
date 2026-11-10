# Starter projects

Every new Webflow build starts by duplicating one of three starter sites. All three share one Client-First V3 system: the same variable collections and names, utility classes, Template components, Button system, Nav, Footer and section components. They differ only in what each kind of job needs. Keep them in step: a fix to the shared system is made in the template starter first, then copied into the other two.

| | Template starter | Client-site starter (Tahi Studio) | White-label starter |
|---|---|---|---|
| Webflow site | Tahi Template Style Guide | Tahi Client Starter | White Label Starter |
| Used for | Webflow Marketplace templates | Tahi Studio client sites | Sites we build for partner agencies under their name |
| Custom code | None (Marketplace rule); font smoothing in site head only | `Global / Styles` with `global-styles_default` (Finsweet V3 snippets) and `global-styles_custom` | Same as client-site |
| Schema | None | JSON-LD in each page's schema field; FAQ microdata in `Section / FAQ` | Same as client-site |
| Finsweet Attributes, scripts | Not allowed | Allowed, loaded once in site head with `defer` | Same as client-site |
| Utility pages | Style Guide, Start Here, Licenses at `/licenses`, Changelog, Components (draft), 404, Password | Style Guide (draft), Components (draft), Client Guide (draft, replaces Start Here), 404, Password. No Licenses or Changelog | Same as client-site |
| Footer credit | "Powered by Webflow" plus Licenses link | "Site by Tahi Studio" link with UTM | None, or the partner's credit if they want one |
| Agency credit | One link with UTM on the Style Guide | Footer credit | None anywhere |
| Tahi branding (logo, shapes, mentions) | Only the Style Guide credit link | Tahi logo in the footer credit and on the Style Guide and Client Guide | None anywhere: generic placeholders only |
| Component props | Nothing hyper-technical; no Classes or Style props | Classes prop allowed on section components | Same as client-site |
| Variable names | Title Case with spaces (Marketplace rule) | Title Case with spaces (kept so all three stay in step) | Same |
| Interaction names | Sentence case ("Open nav menu") | `Element [Action State]` | Same as client-site |
| Default components | Nav, Footer, CTA, Page Hero, Layout / Section, Feature Grid, Feature and Blog cards, FAQ, Contact and Newsletter forms, Theme and Spacing switches | Template set plus the client-site extras the job needs | Same as client-site |

## Duplicating a starter

1. Duplicate the starter site in the Webflow dashboard and rename it.
2. Follow the duplicate checklist on the starter's Start Here or Client Guide page: brand colours and shades in Base, fonts in Base Font Family, logo, favicon, webclip, Open Graph images, every "Template Name" placeholder, site settings.
3. Build pages from `Template / Core Structure` and sections from `Template / Section`; reuse the section components before building new ones.
4. Run the matching QA: template submission checklist, or the client-site QA plus the Client-First launch checklist.

## Making the client-site and white-label starters from the template starter

1. Duplicate the template starter twice.
2. Client-site starter: add `Global / Styles` (two embeds, V3 default snippets) to every page and inside `Template / Core Structure`; remove Licenses and Changelog; turn Start Here into a draft Client Guide; swap the footer's "Powered by Webflow" for the "Site by Tahi Studio" credit; rename interactions to `Element [Action State]`; add FAQ microdata to `Section / FAQ`; add a JSON-LD Organization block to Home's schema field.
3. White-label starter: duplicate the finished client-site starter; remove every Tahi logo, shape, credit and mention (pages, components, alt text, SEO, assets); leave neutral placeholders.
4. Run the Client-First V3 audit on each and fix what differs from this table.
