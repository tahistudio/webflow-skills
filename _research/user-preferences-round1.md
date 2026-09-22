# Round-one answers (22 Sep 2026) — confirmed rules

Companion to user-preferences.md. Each line is a rule for the skills unless marked ⚠ (still open).

## Corrections / clarifications
- "Clientverse" = Client-First (https://finsweet.com/client-first/docs). Nothing else.
- Naming confirmed: Client-First = `section_hero`; Lumos = `hero_wrap`. User's `Hero_section` was a slip.
- Reference sites are for LEARNING only. Skills must not depend on any site being reachable. Learn from them, then encode the learned patterns inside the skill.
- Skills are separate files the user uploads per site as needed. Not attached as Webflow Agent Instructions (user hasn't used that feature).
- Ultimate template QA source: https://webflow.com/templates/submission-guidelines (read in full when writing the Template skill).

## Reference sites (learn from, never cite in a skill)
- Lumos: Giant Group (light/dark base + 4 sub-brands under one umbrella → `u-accent-*`; adapt Lumos native theming; skill should teach how to adapt).
- Client-First, good: Flowout Assignment "and other sites on there". Templates-folder sites = very good Client-First / very good template sites (unfinished, unpublished — grain of salt).
- Client-First, imperfect: Meditrain — model for JSON-LD schema on every page; some sections weak (QA out of scope). ⚠ Meditrain not in the MCP site list — find it.
- Some templates still run IX2 — find them.

## Schema / custom code policy
- Templates: no site schema (JSON-LD), no custom code at all.
- Client sites: JSON-LD schema is a MUST on every page (Meditrain as model).

## Props and client-facing decluttering
- Likes props but must not overwhelm clients.
- Slot restrictions and Marketer visibility are NOT settable via MCP (verified) → name dev-only components with a `(dev)` marker so the user can hide them manually before handoff.
- Tooltips on every prop. Be deliberate about what is exposed.
- Sub-component pattern: master component (Card) contains child components (Button, Theme switcher, Spacing switcher). Their variants surface as dropdown props on the master → client "click, click, click". Child components then hidden from Marketers.
- Never exposed to clients: heading tags (unless the section is genuinely reused in multiple ways).
- Roles: client = Marketer in Build mode; user = Editor; sometimes swapped.
- Conditional visibility inside components encouraged (plural "s" toggles, if-this-hide-that). Prefer nested components + conditionals over duplicate components (FAQs / FAQs Alt acceptable but second choice).
- Component decision: appears more than once → native component with props/slots/variants. If it cannot be edited the way needed across sections (e.g. iframe with too many knobs) → copy-paste instead.

## Must-haves on every build
- Alt text on every image. Compressed images.
- Client sites: JSON-LD on all pages.

## Structure and DOM
- No empty div blocks inside components.
- Keep DOM flat and minimal (esp. Lumos): stack utility classes rather than nesting deeper. Exceptions: native Block + slots where flexibility genuinely needs it.
- Lumos: heavy use of custom elements (DOM element with custom tag) instead of div/grid, because custom elements accept ID, class, style, list order etc. as attributes that Grid/Div can't.
- Custom classes defined in ONE place across the site (card classes live on the Card component) → need not appear on the Style Guide. Ad-hoc "add-on" custom classes are disliked; if unavoidable, define them on the Style Guide.
- Style Guide order: utilities → variables → components. Components get their own dump page.

## Figma → Webflow mapping
- Snap to the nearest existing spacing / class / heading style when within close range instead of minting a new value for something a few px off. Consistency and maintainability beat pixel fidelity. New tokens only when genuinely outside range.
- Foundation first: scan every Figma page, then set up Style Guide, Components page, variables and framework so it is 1:1 with the Figma file before building any section. Long-term vision before build.
- Build one section at a time with long deliberate steps. Each section must be high quality alone, in page context, and in site context. Pasting many frames at once → muddled, low-effort output.
- Per section: check live. Per page: Lighthouse + zero console errors.

## Relume
- Relume MCP is used to pull sections. They usually carry IX2 → strip/convert carefully. Always rename (`layout234` is useless). Reuse an existing section elsewhere on the site instead of pulling a new one when possible.
- Starter: user's own fork of the Relume starter for clients. Separate fork for templates with zero custom code.

## Open vs closed components (Lumos; apply to Client-First too)
- Open = Section → Block → Grid, slot-driven, adaptable (most Giant Group pages). Preferred default, especially for features.
- Closed = unique static component for things reused verbatim across the site (e.g. FAQs).
- Most sites are a mix; decide per section.

## Lumos specifics
- Prop order: follow the docs; no fixed house order, just organised and grouped in folders.
- Theming: Lumos native (light/dark + brand), then adapt per client (Giant Group: 4 sub-brands).
- `u-grid-*` utilities / Grid component first, not hand-written grid CSS.
- MCP direct build preferred over paste tools.
- Code placement: page-only CSS/JS → page settings. One-per-page component (FAQs) → inside that component. Multi-instance components (buttons) → Global Styles component. Site-wide custom code → tracking only.

## Client-First specifics
- Variables for everything (colours, spacing, type, radius…). More is better.
- Native components for anything appearing more than once; expose props/slots/variants as needed.
- Units: strict rem. Client sites may use clamp(); templates use stock standard.
- Finsweet Attributes V2 on client sites (or own code). Never on templates.
- Finsweet Extension acceptable for class reordering.
- CMS naming: `blog_list`, `blog_item` pattern confirmed.

## Breakpoints and native elements
- Four defaults + 1280/1440/1920 for full design control.
- Native Navbar, Slider, Tabs: pause for human-in-the-loop; keep native where possible. Heavy sliders may use Swiper JS (client sites only). Tabs: likes the Lumos implementation. Navbar: keep native.
- Lumos = container/variable breakpoints; Client-First = standard Webflow breakpoints.

## Interactions
- GSAP-native Webflow interactions for everything. No custom GSAP code as first choice.
- Reduced motion: honour prefers-reduced-motion where native supports it (IX3 conditionalPlayback does); native-first is the priority.

## Templates
- Built in Client-First. Pages: Style Guide, Start Here, Licenses, Changelog. Entry-level CMS tier typical. Sometimes ecommerce. No UI kits.
- Licenses page: AI images listed as AI; icon sets with license links. Research best-practice examples.
- Nothing submitted yet → no pass/fail history.
- QA output: pass/fail per guideline item at section / page / site level + rubric score + fix-list ordered by rejection likelihood.

## User's open question
- Worth a shared base "Tahi Webflow" skill for the groundwork common to all four? → Yes (see plan in chat).
