# Template QA report format

Use this exact structure for every template QA pass. It mirrors Webflow's guideline sections so a reviewer's feedback maps straight onto it.

```
# {Template Name} — Marketplace QA
Site: {name}  ·  Pages: {n}  ·  Components: {n}  ·  Styles: {n}  ·  CMS collections: {n}  ·  Assets: {n} ({MB})
Published: {date or "stale — last publish before latest edits"}
Verdict: WOULD PASS / WOULD NOT PASS  ·  Blocking items: {n}  ·  Fix-list items: {n}

## Tier 1 — near-certain rejection
1. {item id} {one-sentence finding} — {evidence: page, element, count, value}
…

## Tier 2 — likely feedback
…

## Tier 3 — polish
…

## Checklist results
### 1 Required pages
| # | Item | Result | Evidence |
| 1.1 | Title Case names, slug = name | PASS | 20/20 |
| 1.4 | Licenses at /licenses | FAIL | publishes at /template-pages/licenses |
…
### 2 Design system … through 12 Listing

## Per-page results
| Page | SEO title | Description | OG image | H1 | Empty links | Alt gaps | Breakpoints | Notes |
| Home | PASS 58 | FAIL 215 | PASS | PASS | FAIL 8 | FAIL 14 | NEEDS VISUAL | root is showcase page |
…

## Per-section notes (only sections with findings)
| Page › Section | Finding | Fix |

## Rubric estimate
| Row | Estimate | Why |
| Typography | Good | … |
| Interaction design | Below Good | markers on; unused interaction |
…

## Could not be checked from here
- Site settings: favicon, responsive images, minify, form notifications, integrations, fonts, site weight → Designer › Site settings
- Classic interactions → console on published page: Webflow.require('ix2').store.getState().ixData
- Tablet and mobile rendering → Preview or breakpoint canvas
- Hover, focus, form states → Preview

## Passes worth keeping
- {things that are clean, so nobody "fixes" them}
```

Rules for writing it:

- Every checklist item gets one of PASS, FAIL, NEEDS VISUAL, MANUAL. Never blank.
- Evidence is concrete: page names, element or class names, counts, measured values (a description length, a file size, an interaction id).
- Tiers are ordered by how Webflow treats them: Tier 1 is a listed requirement breached (custom code, licences, required pages, SEO structure, CMS counts, ecommerce address, placeholder content at the root); Tier 2 is a requirement partly met or a rubric row at risk (responsive bugs, hover states, naming, copy defects); Tier 3 is polish (typos in prop names, minor spacing).
- Copy defects count: typos, mismatched names or roles across pages, duplicated bios, mixed spelling conventions, keyword-stuffed headings, any lorem ipsum.
- Rubric estimate covers every row, with "cannot assess without rendering" where that is true.
- After fixes, re-run and append a second results block rather than editing the first, so the delta is visible.
