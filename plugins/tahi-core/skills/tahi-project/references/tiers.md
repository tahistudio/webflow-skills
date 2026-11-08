# Levels and tags

## Tag syntax

Checklist items in every Tahi skill can carry tags. An item applies only when **every** tag on it applies. Untagged items always apply.

| Tag | Applies when |
|---|---|
| `[R1]` `[R2]` `[R3]` | risk is at least that number |
| `[C2]` `[C3]` | craft is at least that number |
| `[P:standard]` `[P:full]` | process is at least that level (light < standard < full) |
| `[M1]` `[M2]` `[M3]` | motion is at least that number |
| `[webflow]` `[code]` | the build is on Webflow, or on a code stack (Astro, Next.js, ...) |
| `[astro]` `[nextjs]` `[sanity]` `[cloudflare]` `[aws]` | that technology is in the stack |
| `[if:forms]` `[if:cms]` `[if:integrations]` `[if:migration]` `[if:auth]` `[if:payments]` `[if:personal-data]` `[if:i18n]` `[if:ecommerce]` `[if:themes]` | that feature is listed in the profile (`themes` = dark mode or switchable themes) |

Example: `- [ ] [R2] [if:forms] Form submissions alert someone when the integration fails.` applies to risk 2+ projects that have forms.

## Risk

What each tier adds **at the production gate**. Each tier includes everything below it.

**0 Throwaway.** Smoke test: it loads, nothing obviously broken, no secrets in the code. No profile needed.

**1 Brochure.**
- Automated checks: links, accessibility scan, Lighthouse, console errors, headers (`tahi-core:dev-qa`).
- Accessibility basics: contrast, alt text, headings, keyboard focus, form labels.
- SEO basics: titles, descriptions, Open Graph, sitemap, robots, canonical, no staging indexed.
- Forms reach their destination (one real test submission).
- HTTPS on, apex and www resolve to one canonical host.
- Analytics firing, consent if required by the audience's region.

**2 Business-critical.** Adds:
- Full WCAG 2.2 AA pass, including keyboard-only and a screen-reader spot check.
- Performance budget agreed and met (Core Web Vitals passing on mobile).
- Redirect map for every old URL with traffic or links, tested after launch.
- Uptime monitoring and form-failure alerts going to a person.
- Staging environment; production changes go through it.
- Content backups where content lives outside the platform's own backups (for example a scheduled Sanity dataset export).
- Client editor test: a client-role person can edit the parts they own without breaking layout.

**3 Sensitive.** Adds:
- Security review: auth flows, authorisation on every endpoint, input validation, rate limiting, secrets management, least-privilege access.
- Dependency and secret scanning in CI; security updates applied within days.
- Logging and alerting on errors and suspicious activity, with retention set.
- Backups with a **tested restore**.
- Privacy: what personal data is stored, where, for how long, who can see it; privacy policy matches reality.
- Incident plan: who is called, how to roll back, how the client is told.
- Payment flows use the provider's hosted or tokenised components; card data never touches our code.

## Craft

**1 Functional.** On-system (tokens, components), responsive, no broken states. One visual pass at each main breakpoint.

**2 Polished.** Adds: design QA against the design at every breakpoint and the awkward widths in between; every interactive state (hover, focus, active, disabled, loading, empty, error); real and long content; images art-directed per breakpoint.

**3 Showcase.** Adds: typographic finish (widows, orphans, rag, hanging punctuation, optical alignment), motion choreography reviewed frame by frame, a fresh-eyes review against AI tells (`tahi-design:design-consistency`), comparison against reference sites, performance kept high despite the richness.

## Process

**light.** Kickoff profile, one consolidated feedback round per stage, async updates, a one-page handover. Log entries still happen.

**standard.** Adds: a dated plan per phase, sign-off at the end of plan, design and QA, a regular update (weekly or per milestone), editor guide and a training session.

**full.** Adds: a feedback round at each stage with a named approver, formal sign-off recorded in the dashboard, weekly check-ins, a risk and decision register reviewed at each milestone, a launch rehearsal on staging.

## Motion

Defined by `tahi-design:site-animator`. In short: 0 Still (state changes only), 1 Calm (micro-interactions and gentle reveals), 2 Lively (adds staggered sections and one signature moment per page), 3 Expressive (scroll choreography, page transitions, WebGL). `prefers-reduced-motion` drops the site one or two levels; it does not switch everything off.
