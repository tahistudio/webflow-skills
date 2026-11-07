# The move library

A small, named set of moves. Every animation on a Tahi site is one of these, configured with tokens. If a design needs something that is not here, it is the page's signature moment (one per page) or it is a new library entry, added here once and reused.

Attributes refer to [../scripts/tahi-motion.js](../scripts/tahi-motion.js). In Webflow, build the same move as a native interaction named after it (see `references/motion-tokens.md` section 4).

## Contents

1. Micro moves (every level)
2. Reveal
3. Stagger
4. Parallax-lite
5. Marquee
6. Counter
7. Split text
8. Magnetic
9. Page transition
10. Scroll choreography and WebGL
11. Ambient and idle motion

| Move | Min level | Purpose | Attribute |
|---|---|---|---|
| Micro (hover, press, focus, toggle, form feedback) | 0 | Feedback | CSS on the component |
| Reveal | 1 | Orient | `data-anim="reveal"` |
| Stagger | 2 (together at 1) | Show a relationship; hierarchy | `data-anim-stagger` on the parent |
| Parallax-lite | 2 | Depth, brand | `data-anim="parallax"` |
| Marquee | 2 | Brand; show breadth (logos, clients) | `data-anim="marquee"` |
| Counter | 2 | Make one number land | `data-anim="counter"` |
| Split text | 3 | Signature headline | `data-anim="split"` |
| Magnetic | 3 | Brand; invite the click | `data-anim="magnetic"` |
| Page transition | crossfade at 1, choreographed at 3 | Orient between pages | View Transitions CSS |
| Scroll choreography, WebGL | 3 | Storytelling, the signature | Per-project, built on GSAP |

## 1. Micro moves (every level)

Feedback the visitor caused. Always present, always fast (`--motion-dur-1`, under 200ms), always `--motion-ease-out`.

- **Hover:** colour, underline or a 2 to 4px nudge of an arrow. Behind `(hover: hover) and (pointer: fine)` so touch devices do not get stuck states. Hover raises contrast, never lowers it. Never change font weight (text reflows).
- **Press:** `scale(0.97)` or `translateY(1px)` on `:active`.
- **Focus:** `:focus-visible` ring appears instantly or within `--motion-dur-1`; never animate it in slowly.
- **Toggles, accordions, tabs:** `--motion-dur-2`. Animate the indicator and the content's opacity; for height, use `interpolate-size: allow-keywords` or `grid-template-rows: 0fr → 1fr`, not a JS height loop.
- **Form feedback:** error and success messages fade in at `--motion-dur-2`; a gentle shake is level 2 and up, once, small (4px).
- **Level 0:** micro moves still happen as colour and opacity changes; no travel.

## 2. Reveal

Content fades and rises once as it enters the viewport.

- **Spec:** opacity 0 to 1, travel `md` (level 2 and 3) or `sm` (level 1), `--motion-dur-3`, `--motion-ease-out`, triggered at about 10 percent into the viewport, once.
- **Use on:** the section's heading group and its main media. Not on every paragraph.
- **Never** replay on scroll back, never leave content hidden if the script fails (the `motion-pending` pattern handles it), never reveal the first screen's headline so slowly it cannot be read in the first second.
- GSAP: `gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.5, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })`.

## 3. Stagger

Items in a group arrive in sequence, showing they belong together and the order to read them in.

- **Spec:** each child a reveal, offset by `--motion-stagger` (70ms). After six items the rest arrive with the sixth; a group never takes more than about a second to settle.
- **Level 1:** the group reveals together, as one.
- **Use on:** card rows, lists, logo sets, the heading then body then action of a hero.
- **Direction is consistent:** the order of reading (left to right, top to bottom). Never random order, never from the centre out unless that is the signature.

## 4. Parallax-lite

A picture drifts a few percent against the scroll.

- **Spec:** translate between -5 and +5 percent of the element (strength 0.1; cap 0.2), linear, scrubbed to scroll. Pictures only, never text.
- **Implementation:** CSS scroll-driven animation (`animation-timeline: view()`, or `ViewTimeline` in the script) where supported; GSAP ScrollTrigger with `scrub: true` otherwise; static if neither. Never a scroll event listener.
- **Off under reduced motion.** Mid-range phones: check it does not jank; turn it off below the tablet breakpoint if it does.

## 5. Marquee

A row of logos or words loops horizontally.

- **Spec:** linear, 30 to 60px per second, content duplicated once (clones `aria-hidden` and `inert`).
- **Rules:** pauses on hover and focus and when off-screen. Content that moves for more than five seconds needs a visible pause control to meet WCAG 2.2.2 (add a button with `data-anim-toggle`), unless it is purely decorative and duplicated in a static list elsewhere. Static under reduced motion, with the original markup restored.
- One marquee per page at most.

## 6. Counter

A key number counts up once when it enters.

- **Spec:** from zero to the value in the element's text, `--motion-dur-4`, ease-out, once. Prefix and suffix kept (`$`, `%`, `+`). The final value is in the HTML, so without JS or with reduced motion it simply shows.
- **Use on:** one or two numbers that matter. A row of five counters is noise.
- Screen readers get the final value, not the ticking digits (the script handles this).

## 7. Split text

A headline rises line by line (or word by word) from behind a mask.

- **Spec:** each line translates from 100 percent to 0 inside an `overflow: hidden` mask, `--motion-dur-4`, `--motion-ease-out`, staggered by `--motion-stagger`. Below level 3 the script falls back to a plain reveal.
- **Use on:** the signature headline only. Never body text, never more than one per page.
- **With GSAP:** `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (self) => gsap.from(self.lines, { yPercent: 100, stagger: 0.07 }) })`. SplitText adds accessible labels and re-splits on resize and font load. Without GSAP the script splits words and keeps the original sentence as the accessible name.
- Watch descenders: the mask needs a little bottom padding (the script adds it).

## 8. Magnetic

A button or link eases a little towards the pointer.

- **Spec:** pull 0.3 (cap 0.4) of the pointer offset, `--motion-dur-2`, ease-out; snaps back on leave. Fine pointers only. Uses the `translate` property so it never fights a component's own `transform`.
- **Use on:** one or two primary actions. Never navigation lists or text links.

## 9. Page transition

- **Crossfade (level 1 and up):** cross-document View Transitions in CSS, no script:

  ```css
  @view-transition { navigation: auto; }
  ::view-transition-old(root), ::view-transition-new(root) {
    animation-duration: var(--motion-dur-2);
    animation-timing-function: var(--motion-ease-in-out);
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
  }
  ```

  Supported in Chromium (126+) and Safari (18.2+); Firefox does not support cross-document transitions yet, so it navigates normally. That is fine: it is an enhancement.
- **Choreographed (level 3):** shared elements with `view-transition-name` (a project card image becoming the case study hero), or a wipe. Total under `--motion-dur-4`. In Astro use `<ClientRouter />` and re-run `TahiMotion.init()` on `astro:page-load`; in Next.js use the framework's view-transition support or Motion's layout animations.
- **Never** block navigation waiting for an exit animation longer than `--motion-dur-2`, never hide the new page's content behind a loader that is purely decorative.

## 10. Scroll choreography and WebGL (level 3)

- **Pinned sequences:** GSAP ScrollTrigger with `pin` and `scrub`. One per page, telling one story (a product assembling, a process unfolding). Content must still read in order with the pin removed (reduced motion and mobile fallback).
- **Smooth scroll:** Lenis, level 3 only, and only if the choreography needs it. Lenis runs on native scroll, so keyboard, anchor links, `position: sticky` and find-in-page keep working; check them anyway. Disable it under reduced motion and on touch devices by default. Webflow's own smooth-scroll setting already respects reduced motion.
- **WebGL** (Three.js, OGL, shaders): lazy-initialised when its section approaches, paused off-screen, with a static image fallback for low-power devices, reduced motion and failed context creation. Budget its JS and GPU cost on a mid-range phone before committing.

## 11. Ambient and idle motion

Making a site feel alive without noise:

- **Ambient motion is slow and small:** a gradient or image drifting over 10 seconds or more, a subtle video loop with a poster frame. At most one ambient element per screen. Pauses off-screen and under reduced motion.
- **Idle states respond to the visitor**, not to a timer: a hover that reveals a detail, a cursor-aware highlight on one hero element at level 3. Never pulsing dots, bouncing arrows or "scroll" prompts that loop forever.
- **Loops that carry meaning are fine:** a live status indicator, a loading state. Loops that mean nothing are cut.
