# Round-four answers (22 Sep 2026)

## Client-First structure
- `padding-section-*` goes ON the `padding-global` div (Finsweet 2.1 style) — one less wrapper. Sites that nest it separately are legacy.
- Navbar instance: after Global Styles, directly above `main-wrapper`. Footer: directly after `main-wrapper`. Always.
- Page-prefixed classes are debt, EXCEPT hyper-specific single-page sections that only ever exist on that page: `contact_form`, `pricing_cards`, `blog_*`, `casestudy_*`. Rule: name by what it is; page prefix only when the thing is inseparable from that page.
- `section_*` classes carry no styling of their own. Scheme/background come from utility combo classes stacked on the section (`color-scheme-dark`, `background-color-*`).
- Nested Button pattern (Button → Button Content → Button Layout, sub-parts marked "do not place directly") is THE button on client sites and templates.
- Brand colour variables: raw hex and shade aliases both allowed.
- Repeaters: no hard prop-count ceiling, no fixed rule. Best practice: numbered prop groups + Show N toggles for small counts; switch to open section with sub-components for repeaters when it gets large.
- CMS slug singular/plural: no preference. Either.

## Lumos
- Multi-brand accents: hard-coded colours inside the variable system (not a mode) unless each brand truly re-colours everything, then modes.
- Container-query thresholds: default 50em/35em/20em usually kept; sometimes changed per project. Skill: keep defaults, allow override.

## Client Site
- JSON-LD ALWAYS via the page-settings schema field (Webflow's JSON-LD placement), never head/body custom code — including CMS templates.
- FAQPage: use best practice (agent's call).

## Template
- Licenses page at ROOT (`/licenses`). Style Guide, Start Here, Changelog inside the Template Pages folder.
- Nav, Footer, CTA as components on every template. Populated Start Here.
- QA flags copy defects. Templates should be quietly good at marketing copy and SEO: real, well-written copy, no keyword stuffing, while meeting Webflow's placeholder rules.
- Subtle attribution: templates include a link back to the agency (e.g. on the Style Guide page) with UTM tags. Not spam; one tasteful credit that survives if the buyer leaves the page on. Skill must implement this generically ("agency credit link + UTM") without hard-coding the agency.
