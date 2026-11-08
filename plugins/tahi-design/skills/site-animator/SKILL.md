---
name: site-animator
description: "The motion system for Tahi Studio sites on any stack: motion levels 0 to 3 set from the project profile, motion tokens (durations, easings, travel, stagger), micro versus macro motion, a purpose test and per-page budget, a named library of moves (reveal, stagger, parallax, marquee, counter, split text, magnetic, page transitions, scroll choreography) driven by data attributes and one shared script, reduced-motion handling that drops a level instead of switching off, performance rules, tool choice (CSS, View Transitions, GSAP and ScrollTrigger, Lenis, Motion for React, Webflow interactions), Figma motion specs and motion QA. Use when asked to 'animate this', 'add animations', 'scroll animations', 'make it feel alive', 'add a page transition', 'hover effects', 'micro-interactions', 'GSAP', 'ScrollTrigger', 'SplitText', 'Lenis', 'smooth scroll', 'marquee', 'count up', 'parallax', 'too much motion', 'reduced motion', 'what motion level', 'spec the motion in Figma', or 'QA the animations'."
---

# Site animator — one motion system

Motion on a Tahi site is a system, not decoration added section by section. One level per project, one set of tokens, one library of moves, one shared script. Every animation on the site uses them, so the whole site moves like one thing.

Read `PROJECT.md` first (`tahi-core:tahi-project`). The `motion:` field is the level; the audience line explains it. Do not ask a question the profile answers. If the work asked for needs a higher level than the profile sets, say so and ask; do not quietly exceed it.

## 1. The motion level

| Level | For | What it allows |
|---|---|---|
| **0 Still** | Government services, accessibility-sensitive audiences, pure utility | State changes and crossfades only. Hover, focus and press change colour or opacity; nothing travels. |
| **1 Calm** | Finance, health, legal, government, older audiences, most professional services | Micro motion plus gentle reveals (opacity and small travel). Groups reveal together. Page crossfades. |
| **2 Lively** | SaaS, B2B brands, hospitality, most client work | Adds staggered sections, counters, one marquee, light parallax, and **one signature moment per page**. |
| **3 Expressive** | Agency, portfolio, fashion, launches, Tahi's own site | Adds scroll choreography, choreographed page transitions, split text, magnetic controls, smooth scroll, WebGL. |

Starting points per industry are in `tahi-design:design-consistency` (`references/industries.md`). If the profile has no level, use 1 for conservative audiences and 2 otherwise.

- **Set it once, on the root.** `<html data-motion="2">` (and `--motion-level: 2` in CSS). Every script, CSS rule and component reads it. In Webflow, a custom attribute on the Body or a site-wide setting.
- **Reduced motion drops the level; it does not switch everything off.** With `prefers-reduced-motion: reduce`, level 3 and 2 become 1 with no travel (reveals become crossfades), and 1 becomes 0. Feedback (hover, focus, press, form states) stays, because removing it removes information.
- **An on-site motion toggle** does the same, is remembered, and can only reduce. Add one [M2] when the audience is accessibility-sensitive, and [M3] always.

## 2. Motion tokens

About four durations, three easings, two travel distances and a stagger step, defined once:

| Token | Default | Use |
|---|---|---|
| `--motion-dur-1` to `-4` | 150, 250, 500, 800ms | micro, UI, reveal, macro |
| `--motion-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | entering and responding (the default) |
| `--motion-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | moving while visible, page transitions |
| `--motion-ease-in` | `cubic-bezier(0.32, 0, 0.67, 0)` | leaving for good, never entrances |
| `--motion-travel-sm` / `-md` | 0.5rem / 1.5rem | small and level 1 / sections at level 2 and 3 |
| `--motion-stagger` | 70ms | the step between items; delays are multiples of it |

No animation on the site uses a value that is not a token. CSS, the Webflow and GSAP equivalents, Motion for React and Figma variables: [references/motion-tokens.md](references/motion-tokens.md).

## 3. Micro and macro

- **Micro motion is feedback.** Hover, press, focus, toggles, form validation, menus. It answers something the visitor did. Always present at every level, fast (under 200ms, `--motion-dur-1` or `-2`), small, consistent across every component of the same kind. It lives in the component's CSS.
- **Macro motion is orientation and brand.** Page transitions, hero sequences, scroll storytelling, section reveals. It happens to the visitor, so it is rationed: **one signature moment per page** at level 2 and 3, and everything else quieter than it.

## 4. The purpose test and the budget

Every animation must do one of four jobs:

1. **Orient:** where am I, where did this come from, what changed (page transitions, menus opening from their trigger, reveals that set reading order).
2. **Give feedback:** your action registered (press, hover, focus, form states).
3. **Show a relationship:** these belong together, this follows from that (stagger, shared-element transitions).
4. **Express the brand:** the signature moment, ambient motion at level 2 and 3.

If you cannot name which, cut it. "It looks nice" is only valid for the signature moment.

**Budget**, on top of micro motion (which is unlimited because it is feedback):

| Level | Per section | Per page |
|---|---|---|
| 0 | none | page crossfade at most |
| 1 | one reveal group (heading group or main media) | no signature, no loops, no scroll-linked motion |
| 2 | one stagger group, or up to two reveals | one signature moment; at most one marquee, two counters, two parallax images |
| 3 | as level 2 | one signature moment (often the scroll sequence), one choreographed page transition, split text on one headline, magnetic on one or two actions |

Most elements on a page do not animate. That is what makes the ones that do mean something.

## 5. Primitives, not per-section code

Motion is built from a small library of named moves, applied with data attributes and run by one shared script. No section gets its own bespoke animation code, except the page's signature moment.

```html
<section>
  <div data-anim="reveal">…heading group…</div>
  <ul data-anim-stagger>…cards…</ul>
  <p><span data-anim="counter">1,240</span> projects</p>
</section>
```

The library, each move's level, spec and recipe: [references/library.md](references/library.md). Reveal (1), stagger (2), parallax-lite (2), marquee (2), counter (2), split text (3), magnetic (3), page transition (crossfade 1, choreographed 3), scroll choreography and WebGL (3).

The shared script: [scripts/tahi-motion.js](scripts/tahi-motion.js). Vanilla JS on the Web Animations API, one file, no dependencies. It reads the level and tokens, applies reduced motion and the toggle, skips any move above the level, keeps content visible without JavaScript, and uses GSAP ScrollTrigger and SplitText when they are on the page. `TahiMotion.report()` lists what is animating per section for QA. For code builds; Webflow builds use native interactions (section 9).

## 6. Choreography

- **Hierarchy.** Big things first, then supporting things: heading, then body, then action, then media details. The most important element is never the last to arrive.
- **One direction.** Things enter from below (rising) site-wide unless the signature says otherwise. Sideways entrances only when the content moves sideways (a carousel, a timeline).
- **Stagger from tokens.** Steps of `--motion-stagger`; a group settles within about a second.
- **Readable first.** The first screen is legible in the first second. Never hold the headline back for a preloader or a long sequence.
- **Once.** Reveals play once per page view; they do not replay on scroll back.
- **Nothing moves without a reason** (section 4), and nothing moves the same way everywhere just because it can.

## 7. Alive without noise

- Respond to the visitor rather than to a timer: hover detail, cursor-aware highlights at level 3, controls that answer the press.
- Ambient motion is slow (10 seconds or more), small, one per screen at most, paused off-screen and under reduced motion.
- No pulsing dots, bouncing arrows, "scroll" prompts that loop forever, or floating shapes that mean nothing.
- Loops that carry information (a live status, a loading state) are fine.

## 8. Performance

- Animate `transform` and `opacity` only. `clip-path` and `filter` sparingly, for the signature.
- `will-change` only just before an element animates, removed after. Never in a blanket CSS rule.
- IntersectionObserver for triggers and CSS scroll-driven animations or ScrollTrigger for scroll-linked motion. Never a raw `scroll` listener.
- Protect INP: no heavy work on pointer or input handlers; throttle pointer effects to `requestAnimationFrame`.
- No layout thrash: read layout once, then write; never read `getBoundingClientRect` inside a loop of writes.
- Lazy-initialise heavy effects (WebGL, Lottie, SplitText on long text) as their section approaches; pause them off-screen.
- Test on a mid-range phone (or DevTools 4x CPU slowdown). If the signature janks there, simplify it.

## 9. Tools, in order of preference

1. **CSS transitions and keyframes** for all micro motion and simple reveals.
2. **View Transitions API** for page transitions. Cross-document transitions work in Chromium and Safari 18.2+; Firefox navigates normally, which is fine.
3. **CSS scroll-driven animations** (`animation-timeline: view()`) for simple scroll-linked motion, with a static fallback.
4. **The shared script** for the data-attribute library.
5. **GSAP + ScrollTrigger** for timelines, pinned sequences and anything CSS cannot sequence. GSAP and all its plugins (ScrollTrigger, SplitText, CustomEase and the rest) are free for commercial use under the GSAP Standard License since 30 April 2025, after Webflow acquired GreenSock. The one restriction relevant to agencies: no use inside a no-code visual animation builder that competes with Webflow. Client sites are fine. Use `gsap.matchMedia()` for reduced motion and breakpoints.
6. **Lenis** for smooth scroll, level 3 only, only when the choreography needs it, never hijacking keyboard, anchor or find-in-page behaviour; off under reduced motion.
7. **Motion** (motion.dev, formerly Framer Motion; `npm install motion`, import from `motion/react`) for React and Next.js component motion. Wrap the app in `<MotionConfig reducedMotion="user">`.

**Webflow builds** use native Interactions with GSAP for everything. The rules (transform and opacity, explicit start values, reduced-motion settings, verify in Preview, no custom GSAP unless asked) are in `tahi-webflow:tahi-webflow-core`; migrating Classic interactions is `tahi-webflow:webflow-ix2-to-gsap`. This skill supplies the level, tokens, library and budget those interactions follow.

## 10. Spec and handoff

Motion is specified in the design file, not invented at build time: a Motion page with the level, tokens and moves in use, annotations on each animated element (move, trigger, delay in stagger steps), a prototype of the signature moment only, and a note of what does not move. Format and the per-page spec table: [references/handoff-and-qa.md](references/handoff-and-qa.md). Figma file standards: `tahi:tahi-figma`. To build motion from a Figma node that carries motion data, use `figma:figma-implement-motion` and snap its values to the tokens.

## 11. QA

Full procedure and performance checks: [references/handoff-and-qa.md](references/handoff-and-qa.md). Minimum on every project:

- [ ] Level on `<html>` matches `PROJECT.md`; no move above it.
- [ ] Every duration and easing is a token.
- [ ] Budget met per section and page; one signature moment per page at level 2 and 3.
- [ ] Reduced motion drops a level; nothing travels; all content visible.
- [ ] JavaScript off: everything visible.
- [ ] Only transform and opacity animate; no layout shift when animations end.
- [ ] [M2] Checked on a mid-range phone or with 4x CPU slowdown.
- [ ] [M3] Page transitions keep back and forward, focus and scroll position working.
- [ ] [C3] Signature moment reviewed frame by frame.

## Stop rules

- Build to the level; do not exceed it because a move would be fun. Ideas above the level go in `docs/parking.md`.
- If a client asks for more motion than the level allows, that is a profile change: say which level it moves to and what it costs (time, performance, accessibility), and update `PROJECT.md` only once they agree.
- A move that fails the purpose test is cut, not tuned.
- Three tries at making a sequence smooth on a mid-range phone, then simplify it.

## Reporting

Say the level, which moves are on each page and why (the purpose), the signature moment per page, what reduced motion does, and what was verified (devices, reduced motion, no-JS, performance trace). Name anything unverified and how to check it.
