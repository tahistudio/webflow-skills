---
name: design-qa
description: "Design QA for Tahi Studio builds on any stack: checks the built site against the Figma design and the design system at every breakpoint and the awkward widths in between, every interactive and content state, typography, motion against the project's motion level, consistency (drift audit), AI and template tells, and dark mode where it exists, then writes a fix list ranked blocker, major, minor and polish with screenshots and locations, filed in the Tahi dashboard QA round when connected. Depth scales with the project's craft level. Use when asked to 'design QA', 'QA the build', 'check it against Figma', 'does it match the design', 'visual QA', 'pixel check', 'check the breakpoints', 'check all the states', 'review before the client sees it', 'make a fix list', 'start a QA round', or 'is this ready to show'. Functional and technical QA (links, forms, accessibility scans, performance, SEO) is tahi-core:dev-qa."
---

# Design QA — does the build match the design and the system

Design QA answers two questions: **does the build look and behave the way it was designed**, and **does it hold together as one system**. It does not cover whether forms submit, links resolve, or the site is fast and accessible at a technical level; that is `tahi-core:dev-qa`. Run both before a client review or the production gate (`tahi-core:launch`).

Read `PROJECT.md` first (`tahi-core:tahi-project`). Craft sets the depth; motion sets what the motion pass checks against; the stack tells you which tools apply. Tagged items follow the tag rules in `tahi-core:tahi-project` (`references/tiers.md`): skip what does not apply and do not mention it unless asked.

## Before you start

1. **Gather:** the Figma file and the frames for each page, the staging or preview URL (never QA on production first), the page list, and the token table.
2. **Pick the pages.** Every template (home, a standard page, each CMS template with a real item, forms, 404, legal) plus any page with a one-off section. For a large CMS, two or three items per template, including the longest and the emptiest.
3. **Tools.** A real browser you can resize and screenshot (Playwright, the Claude browser pane, Chrome DevTools device mode). Figma screenshots via the Figma MCP (`get_screenshot`) for side-by-side comparison. [scripts/capture-widths.mjs](scripts/capture-widths.mjs) takes full-page screenshots of a list of URLs at every width below in one run. The drift audit script lives in `tahi-design:design-consistency` (`scripts/drift-audit.js`).
4. **Open a QA round** in the Tahi dashboard if the connector is available (see Filing below), so findings land where the team tracks them.

## Widths

Compare against Figma at the widths it was designed for, then check the widths nobody designed.

| Range | Widths to check | Craft |
|---|---|---|
| Large desktop | 1920, 1600 | [C3], or any craft if the design has 1920 frames |
| Desktop (designed) | 1440, 1280 | all |
| Awkward laptop and small desktop | 1366, 1180, 1024 | [C2] |
| Tablet edge | 992 and 991 (Webflow's switch), 834, 820 | [C2] |
| Tablet (designed) | 768 | all |
| Large phone and phone edge | 767, 480, 430 | [C2] |
| Phone (designed) | 390 | all |
| Small phone | 375, 360 | [C2] |
| Tiny and zoomed | 320, or 1280 at 200% browser zoom | [C3] |

Between designed widths, drag the window slowly from wide to narrow and watch for the moment things break: text that wraps to one orphan word, cards that squeeze before they stack, images that crop a face, navigation that collides with the logo. That drag catches more than any fixed list.

## The passes

Run them in this order; earlier passes make later ones cheaper. The full tagged checklist for each pass is in [references/checklist.md](references/checklist.md).

1. **Layout and fidelity.** Side by side with Figma at each designed width: structure, spacing, alignment, sizes, colours, imagery, crops. Values should match the tokens, not the pixels: a 2px difference that snaps to the system is correct. [C2] then the awkward widths.
2. **States.** Every interactive component in every state: hover, focus-visible, active, disabled, loading, empty, error, success, current page. Plus content states: long content, short content, real content, missing image, missing optional fields. [C2] all of them; [C1] hover and focus on links, buttons and inputs.
3. **Typography.** Scale steps used correctly, line lengths 45 to 75 characters, no orphans in headings at common widths, fonts loading (no fallback face showing). [C3] widows, rag, hanging punctuation, optical alignment, tracking on display sizes, tabular figures in tables and prices.
4. **Motion.** Against the profile's motion level using `tahi-design:site-animator`: level respected, tokens used, budget met, reduced motion drops a level, nothing hidden without JS. [C3] the signature moment frame by frame.
5. **Consistency.** Run the drift audit on each template page and compare counts with the healthy ranges in `tahi-design:design-consistency`. Look for the same component styled two ways on different pages.
6. **AI and template tells.** [C2] Run `tahi-design:design-consistency` `references/ai-tells.md` over each template page. [C3] The fresh-eyes review in that file.
7. **Dark mode and themes**, only if the site has them: every page in each theme, contrast in each, images and logos that work on both, no hard-coded colours that ignore the theme.

## Severity

Every finding gets exactly one severity. Rank by impact on the visitor and the client, not by effort.

| Severity | Meaning | Examples |
|---|---|---|
| **Blocker** | Cannot go to the client or production like this | Layout broken at a common width; content unreadable or hidden; wrong brand colour or logo; a state that traps the user; text overlapping; content stuck invisible after an animation |
| **Major** | Clearly wrong; a client or visitor will notice | Section noticeably off the design; missing hover or focus states; image crop cutting faces; off-system component; a font fallback showing; motion above the level |
| **Minor** | Wrong on inspection | Spacing off by one step; inconsistent radius; heading orphan at one width; stagger out of reading order |
| **Polish** | Would make it better; not wrong | Rag and widows [C3], optical alignment, tightening tracking, refining an easing |

Fix order: blockers, then majors, then minors. Polish only at [C3] or when time is left after everything else.

## The fix list

One list per QA pass, ranked by severity, each item with:

- **What:** one sentence on what is wrong and what right looks like ("Card titles wrap to three lines at 1024; should be two, reduce to H4 step or widen the column").
- **Where:** page URL, section, element (a CSS selector or Webflow class), and the width or state.
- **Evidence:** a screenshot of the build, and the Figma frame or token it should match.
- **Severity** and **owner** (design or build), if the team splits that way.

Template and an example: [references/fix-list.md](references/fix-list.md). Save it as `docs/qa/design-qa-YYYY-MM-DD.md` in the project folder when there is no dashboard round, and link it from the log.

## Filing in the Tahi dashboard

When the Tahi dashboard connector is available:

1. Find the site with `list_qa_sites`; start a round with `start_qa_round` against **staging**, choosing browsers (chromium, firefox, webkit) at the depth the risk and craft tiers call for. Add pages if the snapshot missed any.
2. File each finding with `add_qa_comment` on the round page, pinned to the element's CSS selector and the viewport (`xl`, `desktop`, `tablet`, `mobile_l`, `mobile_p`) where it shows. Start the body with the severity in brackets (`[Major] …`), then what is wrong, what right looks like, and the Figma reference.
3. Pull the summary with `get_qa_round_report` for the log entry and the client update.

Never share a round or message a client from here without being asked.

## Stop rules

- **Reach the craft level's bar, then stop.** Craft 1: designed widths and basic states, no blockers or majors. Craft 2: adds awkward widths, every state, drift audit and the tells pass, no blockers or majors, minors listed. Craft 3: adds typographic finish, the fresh-eyes review and frame-by-frame motion; polish items worked through until the agreed time runs out.
- Anything outside the scope you were asked to QA, or that would take more than a few minutes and nobody asked for, goes in `docs/parking.md` with one line on why it matters.
- A finding that is really a design change (the design does not work at 1024, not the build) is raised with the designer, not quietly redesigned in the build.
- Report done only with evidence: screenshots per width, the drift audit output, the round report or fix list.

## Reporting

Lead with the verdict (ready, ready with minors, not ready), then the counts by severity, then the blockers and majors in one line each, then what was checked (pages, widths, browsers, states) and what was not. Name the craft level when it explains a skipped pass.
