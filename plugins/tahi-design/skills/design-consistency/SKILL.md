---
name: design-consistency
description: "Makes every page of a Tahi Studio site look like it came from the same hands, on any stack (Webflow, Astro, Next.js). Holds the token rules (type scale, spacing scale, colour roles, radius, shadow, layout grid), section rhythm, component discipline, Figma-to-code token parity, how to snap off-system values, a browser drift audit script that counts the font sizes, colours, radii, shadows and spacing in use, a list of AI and template tells, and a per-industry starting playbook. Use when asked to 'make it consistent', 'this page looks off', 'it looks like different people built it', 'set up tokens', 'type scale', 'spacing scale', 'section spacing', 'how many greys are we using', 'run a drift audit', 'snap to the system', 'does this look AI-generated', 'it looks templated or generic', 'make it look less like every other site', 'what should a law firm or SaaS site look like', 'match Figma variables in code', or before designing a new page on an existing system."
---

# Design consistency — one pair of hands

A site feels designed when every value on it was chosen once and reused. It feels assembled when each page made its own choices. This skill keeps the first and finds the second.

Read `PROJECT.md` first (see `tahi-core:tahi-project`). Craft sets how deep you go; the audience line points at a starting direction in [references/industries.md](references/industries.md). Do not ask anything the profile answers.

## 1. Tokens are the only source of values

Every colour, size, space, radius, shadow and duration on the site comes from a token. A raw value in a component is a bug. The only exceptions are `0`, `1px` borders, `100%`, and values that are maths on tokens (`calc(var(--space-6) * -1)`).

| Group | Default shape | Rule |
|---|---|---|
| **Type scale** | 7 to 9 steps on one ratio (about 1.2 for calm sites, up to 1.333 for expressive ones), fluid between a mobile and desktop size | Each step has a size, line height, tracking and weight. Five sizes visible on a page is plenty. |
| **Font families** | One or two, plus mono only for real code | Roles, not names: `--font-display`, `--font-body`. |
| **Spacing scale** | 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160 | Padding, margin and gap only ever use a step. |
| **Colour roles** | Primitives (the palette) feed semantic roles | Components use roles only: background, surface, text, text-muted, border, accent, on-accent, focus, success, warning, error. |
| **Radius** | Three or four values, one character | Pick square, soft or round once. Inner radius = outer radius minus the padding between them. |
| **Shadow** | Two or three elevations | Only for things that float (menus, dialogs, sticky bars). Surfaces at rest are separated by a tone step. |
| **Layout** | Container widths, columns, gutter, page margin | One grid per site. Text measure 45 to 75 characters. |
| **Motion** | Owned by `tahi-design:site-animator` | Never invent a duration or easing here. |

Full default token set, naming and the Figma / CSS / Webflow name map: [references/tokens.md](references/tokens.md).

- **Primitives feed roles.** `--color-stone-900` is a primitive; `--color-text` points at it. Themes and dark mode swap the roles, never the components.
- **Name by role, not by look.** `--color-accent`, not `--color-orange`. A rebrand is then one edit.
- **Fluid, not breakpoint-jumped.** Type and section spacing scale with `clamp()` (or variable modes per breakpoint in Webflow) so the in-between widths are designed too.

## 2. Section rhythm

Rhythm is what makes a page read as one piece instead of a stack of blocks.

- **Three section spacing steps.** `section-sm`, `section-md`, `section-lg`, each mapped to the spacing scale and fluid. Default to `md`; `lg` for the hero and the one moment that needs air; `sm` for bands that belong to the section above. The gap between sections is always clearly larger than any gap inside one.
- **A small set of section types.** Most sites need six to ten: hero, statement, split (media and text), list or grid, proof, process, CTA band, FAQ, long-form text, footer. Every page is assembled from these. A new type needs a reason that would hold for a second page.
- **Neighbours differ.** Two adjacent sections never share a composition. Vary layout, scale or field colour, not the spacing.
- **Fixed heading and body pairings.** H1 with lead text, H2 with large body, H3 with body. The same pairing always carries the same spacing between heading and text, taken from the scale.
- **Field colour changes are deliberate.** Background roles alternate in a pattern you could explain (the proof band is always dark, say), never a random dark section in a light page.
- **Two or three left edges per page.** Text blocks line up on the grid; centred text is one moment per page at most.
- **Bottom padding can run optically larger** than top padding. If you do it, do it in the section token, everywhere.

## 3. Component discipline

- **Variant before new.** Before building anything, check whether an existing component with a new variant does the job. A new component needs a structural difference, not a cosmetic one.
- **Three repeats is a component.** The third time a pattern appears, stop and make it one, then replace the first two.
- **States belong to the component.** Hover, focus-visible, active, disabled, loading, empty and error are designed with it, not patched in at QA.
- **Keep a component inventory** in the project (`docs/components.md`, or the Components page in Webflow and Figma): name, variants, where used. Read it before building.
- **No one-off overrides.** A component that needs a tweak on one page gets a variant or a prop. A class bolted on to fix one instance is drift.

Webflow specifics (props, slots, variants, `(dev)` naming) live in `tahi-webflow:tahi-webflow-core`.

## 4. Figma and code use the same names

The same token has the same name in Figma, in CSS and in Webflow, give or take each tool's casing. When a designer says "text muted" and a developer says `--color-text-muted`, they mean the same value.

- Figma file standards (variable collections, text styles, spacing scale, naming, handoff): `tahi:tahi-figma`.
- Webflow variables (folders, modes, binding): `tahi-webflow:tahi-webflow-core`.
- Code: CSS custom properties in one `tokens.css` (or the Tailwind theme generated from it). Components import nothing else.
- [C2] When the Figma file and the code disagree, the token table in the project is the tie-breaker. Fix the side that drifted and note it in `docs/decisions.md`.
- [C3] [code] Use Code Connect (`figma:figma-code-connect`) when the component library is shared across projects.

## 5. Snapping off-system values

Designs arrive with values a few pixels off the system. Snap them; consistency beats fidelity.

1. **Within tolerance, snap.** A value within 4px or about 5 percent of the larger value (whichever is greater) of an existing token becomes that token. 141px and 145px both snap to a 140px token; 8px and 13px do not merge. This is the same tolerance `tahi-webflow:tahi-webflow-core` uses.
2. **Outside tolerance and it recurs, mint a token.** Add it to the scale in Figma and code together, and log it in `docs/decisions.md`.
3. **Outside tolerance and it appears once, ask whether it is intent.** If the designer meant it (an optical tweak, a signature moment), make it a named one-off token in the component. If not, snap to the nearest step.
4. **Colours snap by role, not by hex.** A grey that is "nearly" the muted text grey is the muted text grey. Two greys that do the same job are one grey.
5. Tell the user what you snapped when the difference is visible; do not ask permission for each one.

## 6. The drift audit

[scripts/drift-audit.js](scripts/drift-audit.js) walks the rendered page and counts every distinct font size, family, weight, line height, text colour, background colour, border colour, radius, shadow and spacing value, with examples of where each is used. It also flags values that are not on any token it can read from `:root`. It makes drift visible: "14 greys, 11 font sizes, 3 shadows".

- **Browser:** paste the file into the DevTools console on the page. It prints tables and leaves the result on `window.__driftAudit`.
- **Playwright or Chrome automation:** read the file and evaluate it in the page; it returns the result object. Run it on each template page (home, a content page, a CMS item, a form page), not on every page.
- **Scope it** with `window.DRIFT_AUDIT_ROOT = 'main'` before running, to leave out third-party widgets.

What good looks like, per page:

| Measure | Healthy | Investigate |
|---|---|---|
| Font sizes | the type scale's steps in use, usually 5 to 8 | more than 9, or two within 2px of each other |
| Font families | 1 or 2 (plus mono in code blocks) | 3 or more, or a fallback font rendering |
| Neutral colours (text and background) | 4 to 6 | more than 7: "14 greys" is the classic drift |
| Radii | 2 to 4 | more than 5 |
| Shadows | 0 to 3 | more than 3, or any on surfaces at rest |
| Spacing values off the scale | 0 | any, apart from computed centring margins |

Fix drift at the source: replace the raw value with the token in the component or class that produced it, never page by page. Re-run the audit to show the counts dropped.

## 7. Distinctive, not generic

Consistent is not the same as good. A site can be perfectly on-system and still look like every other template. [references/ai-tells.md](references/ai-tells.md) lists the visual, layout, copy, imagery, motion and interaction tells of AI-generated and template sites, each with what to do instead.

- [C2] Before a design is shown to the client, run the tells list over it. Fix what applies.
- [C3] Fresh-eyes review: look at full-page screenshots at desktop and phone with the tells list beside you, as if it were a competitor's site. Name the one thing on each page that belongs only to this client. If you cannot, the page needs an idea, not more polish.

For a new site, start from the industry block in [references/industries.md](references/industries.md): what the audience expects to see, the clichés of the sector and where there is room to stand out. It is a nudge, not a rule; the brief and the brand win every time.

Optional extras for people who have them installed: the third-party `design-taste-frontend` and `redesign-existing-projects` skills go further on art direction. This skill does not depend on them.

## Checklist

- [ ] Every value in components comes from a token; no raw hex, px or ms in component styles.
- [ ] Token names match across Figma, code and Webflow.
- [ ] Section spacing uses the three section steps; gaps inside sections are smaller than gaps between them.
- [ ] Adjacent sections differ in composition.
- [ ] Repeated patterns (three or more) are components; one-offs are variants.
- [ ] [C2] Drift audit run on each template page; counts within the healthy column, or the exceptions explained.
- [ ] [C2] AI-tells pass done; fixes made or reasons recorded.
- [ ] [C2] Every interactive component has its full set of states.
- [ ] [C3] Fresh-eyes review against the tells list and two reference sites the client likes.
- [ ] [C3] Optical adjustments (icon alignment, bottom padding, hanging punctuation) are tokens or component rules, not one-off nudges.

## Stop rules

- Reach the craft level's bar and stop. Craft 1 needs on-system and no broken states; it does not need a tells review.
- Drift found outside the page you were asked to work on goes in `docs/parking.md`, unless it is the same component, in which case fixing the component fixes both.
- A token change that would visibly alter pages the client has signed off is flagged, not made quietly.

## Reporting

Say what is now on-system, what the drift audit counts were before and after, what was snapped and by how much where visible, and which tells were found and fixed. Name the craft level when it explains a skipped check.
