# Design QA checklist

Tags follow `tahi-core:tahi-project` (`references/tiers.md`). An item applies only when every tag on it applies; untagged items always apply. Each finding goes on the fix list with a severity (see SKILL.md).

## Contents

1. Layout and fidelity
2. States
3. Content stress
4. Typography
5. Imagery
6. Motion
7. Consistency
8. AI and template tells
9. Dark mode and themes
10. Cross-browser

## 1. Layout and fidelity

- [ ] Each section matches its Figma frame at each designed width: structure, order, alignment, relative sizes.
- [ ] Spacing uses the scale: section padding is one of the three section steps; gaps inside sections are smaller than gaps between them.
- [ ] Colours are the right roles (accent on the primary action, muted text where designed) and come from tokens.
- [ ] Container widths and page margins are consistent page to page; nothing touches the viewport edge unless designed to bleed.
- [ ] No horizontal scroll at any width (check 320 to 1920).
- [ ] Navigation: logo, links and action never collide; the mobile menu opens, scrolls if long, closes, and traps nothing.
- [ ] Footer matches the design and holds at every width.
- [ ] [C2] Awkward widths (1366, 1180, 1024, 991, 834, 820, 767, 480, 430, 375, 360): no squeezed cards, no orphan words in headings, no collisions, no awkward single items on a row.
- [ ] [C2] Grids reflow sensibly: four columns go to two before one; uneven last rows look deliberate.
- [ ] [C2] Sticky elements (header, sidebars) do not cover content or anchors; anchor links land with the heading visible.
- [ ] [C2] [webflow] Layout values come from classes and variables visible in the Designer, per `tahi-webflow:tahi-webflow-core`.
- [ ] [C3] Large desktop (1600, 1920): content does not float in a sea of space unless designed; large images do not pixelate.
- [ ] [C3] 200% browser zoom at 1280: layout reflows, nothing clipped.

## 2. States

For every interactive component (buttons, links, inputs, selects, checkboxes, toggles, tabs, accordions, cards that link, menus, sliders):

- [ ] Hover (on fine pointers only; no stuck hover on touch).
- [ ] Focus-visible: clear ring in the focus colour, 3:1 contrast, not clipped by `overflow: hidden`.
- [ ] Active or pressed.
- [ ] [C2] Disabled: visibly disabled, not just lighter text that fails contrast; cursor and semantics match.
- [ ] [C2] Current or selected: the current page in navigation, the selected tab, the open accordion item.
- [ ] [C2] Loading: buttons that submit show progress and cannot double-submit; skeletons match the final layout.
- [ ] [C2] [if:forms] Error: inline, next to the field, in words, not colour alone; the summary appears for long forms.
- [ ] [C2] [if:forms] Success: a designed confirmation, not the platform default message.
- [ ] [C2] Empty: CMS lists, search results and filters with nothing to show have a designed empty state.
- [ ] [C2] [if:cms] Pagination and "load more" states.
- [ ] [C3] Visited links where the design uses them; selection colour (`::selection`); caret colour in inputs.

## 3. Content stress

- [ ] Real content in place of placeholders; no lorem ipsum.
- [ ] [C2] Long content: the longest real title, name, button label, price and paragraph. Headings at two lines max where designed; buttons do not wrap awkwardly; cards align.
- [ ] [C2] Short content: one-word titles, a card with no description, a single item in a list.
- [ ] [C2] [if:cms] Missing optional fields: no image, no summary, no author; the layout holds with no empty boxes or stray labels.
- [ ] [C2] Missing or failed image: alt text shows sensibly, layout does not collapse (aspect-ratio set).
- [ ] [C2] [if:i18n] Longest language: German or te reo Māori strings are longer; check they fit.
- [ ] [C3] Rich text: every element the editor can produce (H2 to H6, lists, nested lists, quotes, images, captions, embeds, tables, code) is styled.

## 4. Typography

- [ ] Fonts load; no fallback face rendering; no flash of invisible text longer than a moment.
- [ ] Each text element uses the right scale step; no in-between sizes (the drift audit lists them).
- [ ] Body line length 45 to 75 characters at every width.
- [ ] Contrast: body 4.5:1, large text 3:1, including text over images.
- [ ] [C2] Headings balance (`text-wrap: balance`) and paragraphs avoid single-word last lines (`text-wrap: pretty`) where supported.
- [ ] [C2] Heading and body pairings use the same spacing everywhere.
- [ ] [C2] Numbers that align (prices, tables, stats) use tabular figures.
- [ ] [C3] Widows and orphans fixed at the common widths for display text; non-breaking spaces where a break would read badly (before units, in names).
- [ ] [C3] Rag is even on left-aligned text blocks; no rivers in justified text (avoid justified text).
- [ ] [C3] Hanging punctuation on large quotes; optical alignment of large headings and icons.
- [ ] [C3] Tracking tightened on display sizes, loosened on small caps; correct quotes, apostrophes and dashes (’ “ ” – —).

## 5. Imagery

- [ ] Images match the design's crops and treatment at each width.
- [ ] No distorted images (`object-fit` set), no upscaled blurry images.
- [ ] [C2] Art direction per breakpoint: faces and focal points stay in frame on mobile.
- [ ] [C2] One treatment site-wide: ratios, corners, colour grade.
- [ ] [C2] Icons from one set, one stroke width, aligned to text.
- [ ] [C3] Image quality checked at 2x on a retina screen.

## 6. Motion

Against the profile's level, using `tahi-design:site-animator` (`references/handoff-and-qa.md` has the full procedure).

- [ ] Level on `<html>` (or the Webflow interactions in use) matches `PROJECT.md`; nothing above it.
- [ ] Durations and easings are the tokens.
- [ ] Reduced motion drops a level and keeps all content visible.
- [ ] With JavaScript off, nothing is hidden.
- [ ] [M2] Budget per section and page met; one signature moment per page.
- [ ] [M2] Stagger order follows reading order.
- [ ] [M3] Page transitions keep back, forward and focus working.
- [ ] [C3] Signature moment reviewed frame by frame from a screen recording.

## 7. Consistency

- [ ] [C2] Drift audit run on each template page (`tahi-design:design-consistency`, `scripts/drift-audit.js`); counts within the healthy ranges or the exceptions explained.
- [ ] [C2] The same component looks and behaves the same on every page (buttons, cards, form fields, section headers).
- [ ] [C2] No one-off overrides on component instances.
- [ ] [C3] Figma and build token tables agree; differences are logged and fixed on the side that drifted.

## 8. AI and template tells

- [ ] [C2] Each template page checked against `tahi-design:design-consistency` `references/ai-tells.md`; tells fixed or the reason recorded.
- [ ] [C3] Fresh-eyes review from full-page screenshots at 1440 and 390, including the competitor test.

## 9. Dark mode and themes

Only if the site has a dark mode or multiple themes.

- [ ] Every template page in each theme.
- [ ] Contrast passes in each theme, including muted text and borders.
- [ ] Logos, icons and illustrations have versions that work on both.
- [ ] No hard-coded colours that ignore the theme (the drift audit run in each theme shows them).
- [ ] The theme follows the OS setting by default and any toggle is remembered.
- [ ] Images are not too bright on dark backgrounds; shadows still read or are replaced by tone steps.

## 10. Cross-browser

- [ ] Latest Chrome and Safari (desktop and iOS).
- [ ] [C2] Firefox and Edge.
- [ ] [C2] Safari specifics: `backdrop-filter`, sticky inside overflow, `100vh` on iOS (use `dvh`), font rendering weight.
- [ ] [R2] An older iPhone and a mid-range Android for the home page and one content page.
