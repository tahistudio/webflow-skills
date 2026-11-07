# Motion handoff and QA

## Contents

1. Speccing motion in Figma
2. The motion spec table
3. QA procedure
4. Performance checks

## 1. Speccing motion in Figma

Motion that is not written down gets reinvented by whoever builds it. Spec it where the design lives. Figma file standards (annotations, variables, handoff pages) are in `tahi:tahi-figma`.

- **One Motion page or section in the file** holds the project's motion level, the token table and the moves in use, each named after the library (`Reveal`, `Stagger`, `Split text`, ...).
- **Annotate on the frame, not in a separate doc.** Each animated element gets a note: move name, trigger, delay in stagger steps, and anything unusual. "Stagger, on enter, children in reading order" is a complete spec.
- **Prototype only the signature moment and anything new.** Smart Animate or Figma's motion features are fine for showing feel; the tokens are the source of truth, not the prototype's numbers.
- **Mark what does not move.** At level 1 and 2 most of a page is still. Saying so stops the builder adding motion by habit.
- **Reduced motion:** state what the signature moment becomes (usually: the end state, or a crossfade).
- When a Figma node carries real motion data, implement it with `figma:figma-implement-motion` and map its values onto the nearest tokens; snap rather than copy raw numbers.

## 2. The motion spec table

Per page, in the Figma annotation or the project's `docs/`:

| Element | Move | Trigger | Tokens | Level | Reduced motion |
|---|---|---|---|---|---|
| Hero heading group | Split text | Load | dur-4, ease-out, stagger | 3 | End state, no travel |
| Hero image | Reveal | Load, +2 steps | dur-3, travel-md | 1 | Crossfade |
| Services cards | Stagger | Enter | dur-3, stagger | 2 | Crossfade together |
| Client logos | Marquee | Always | 40px/s | 2 | Static row |
| Primary CTA | Micro + magnetic | Hover, press | dur-1, dur-2 | 0 / 3 | Colour change only |

## 3. QA procedure

Run at the depth the tags say. Record evidence (a screen recording, the `TahiMotion.report()` output, a Performance trace) in the QA notes.

- [ ] Level matches the profile: `document.documentElement.dataset.motion` equals `PROJECT.md`, and `TahiMotion.report()` (or a count of interactions in Webflow) shows no move above the level.
- [ ] Every animation uses the tokens: no stray durations or easings in CSS, GSAP calls or Webflow interactions.
- [ ] Budget: each section and page is within the budget for its level (see SKILL.md section 4). One signature moment per page at level 2 and 3.
- [ ] Purpose: for each move, name which of orient, feedback, relationship or brand it serves. Cut the ones with no answer.
- [ ] First screen readable within the first second; nothing important waits on an animation.
- [ ] Reduced motion: turn on the OS setting (macOS: Accessibility, Display, Reduce motion; or DevTools Rendering panel, emulate `prefers-reduced-motion`). The site drops a level, nothing travels, all content is visible, nothing loops.
- [ ] On-site toggle, if present: same result, remembered on reload.
- [ ] No JavaScript (disable it in DevTools): every element is visible and in place.
- [ ] Throttled load (DevTools, Slow 4G): no flash of hidden content, no content stuck hidden.
- [ ] Reload half-way down a page: content above the viewport is visible, not waiting to reveal.
- [ ] Keyboard: focus states show instantly; nothing magnetic or parallax interferes with focus; marquee pauses on focus and has a pause control.
- [ ] Touch: no stuck hover states; magnetic and cursor effects off.
- [ ] [M2] Stagger order follows reading order; direction consistent across the site.
- [ ] [M2] Counters land on exactly the number in the HTML.
- [ ] [M3] Page transitions: back and forward buttons work, focus lands on the new page's main content, no transition longer than `--motion-dur-4`.
- [ ] [M3] Smooth scroll (if used): keyboard scrolling, Page Down, anchor links, find-in-page and sticky elements all behave.
- [ ] [C3] Signature moment reviewed frame by frame (record the screen, step through): no jumps, no clipped descenders, no overlaps mid-animation, no layout shift at the end.

## 4. Performance checks

- [ ] Only `transform` and `opacity` animate (plus `clip-path` and `filter` sparingly for the signature). In DevTools, Rendering, turn on Paint flashing; scrolling should paint very little.
- [ ] No long tasks during scroll: record a Performance trace while scrolling the busiest page; frames hold near 60fps on desktop.
- [ ] INP stays good (under 200ms) with motion running: interact with menus and forms while marquees and reveals are active.
- [ ] CLS unaffected: reveals use transform, not margin or height; nothing shifts when an animation ends.
- [ ] `will-change` only on elements about to animate, removed after (the script does this); never on large sets of elements in CSS.
- [ ] Heavy effects (WebGL, SplitText, Lottie) are lazy-initialised near their section and paused off-screen.
- [ ] [M2] Test on a mid-range Android phone (or DevTools CPU 4x slowdown plus mobile viewport): no visible jank on the signature moment or parallax. Turn parallax off on small screens if it janks.
