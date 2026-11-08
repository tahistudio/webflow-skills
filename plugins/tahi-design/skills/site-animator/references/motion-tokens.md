# Motion tokens

Defined once per project, used by every animation on the site. Change the values to suit the brand; keep the names, the count and the roles.

## Contents

1. The tokens
2. CSS
3. Level and reduced motion in CSS
4. Webflow
5. GSAP
6. Motion for React
7. Figma

## 1. The tokens

| Token | Default | Role |
|---|---|---|
| `--motion-dur-1` | 150ms | Micro: hover, press, focus, toggles, small state changes |
| `--motion-dur-2` | 250ms | UI: menus, accordions, tooltips, form feedback, tabs |
| `--motion-dur-3` | 500ms | Reveals: sections and their parts entering |
| `--motion-dur-4` | 800ms | Macro: hero sequences, page transitions, the signature moment |
| `--motion-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Anything entering or responding. The default. |
| `--motion-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things that move from one place to another while visible; page transitions |
| `--motion-ease-in` | `cubic-bezier(0.32, 0, 0.67, 0)` | Things leaving the screen for good. Never for entrances or UI responses. |
| `--motion-travel-sm` | 0.5rem (8px) | Small elements, level 1 reveals, micro nudges |
| `--motion-travel-md` | 1.5rem (24px) | Section and block reveals at level 2 and 3 |
| `--motion-stagger` | 70ms | The step between items in a group; delays are whole or half multiples of it |

Rules:

- **Leaving is faster than arriving.** Exits use the next duration down, or about 70 percent of the entrance.
- **Linear is not an easing token.** Use it only for constant travel: marquees, progress bars, scroll-scrubbed motion.
- **No bounce or elastic** on UI. A spring is allowed on the signature moment at level 3 if it is the brand.
- **Durations stay within 150 to 800ms** apart from scrubbed and looping motion. That matches the range in `tahi-webflow:tahi-webflow-core`.

## 2. CSS

```css
:root {
  --motion-level: 2;                  /* mirror of <html data-motion="2"> */
  --motion-dur-1: 150ms;
  --motion-dur-2: 250ms;
  --motion-dur-3: 500ms;
  --motion-dur-4: 800ms;
  --motion-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --motion-ease-in: cubic-bezier(0.32, 0, 0.67, 0);
  --motion-travel-sm: 0.5rem;
  --motion-travel-md: 1.5rem;
  --motion-stagger: 70ms;
}

/* Micro motion, always on: name the properties, never transition: all. */
.button {
  transition:
    background-color var(--motion-dur-1) var(--motion-ease-out),
    color var(--motion-dur-1) var(--motion-ease-out),
    transform var(--motion-dur-1) var(--motion-ease-out);
}
.button:active { transform: scale(0.97); }
@media (hover: hover) and (pointer: fine) {
  .button:hover { background-color: var(--color-accent-strong); }
}
```

## 3. Level and reduced motion in CSS

The level lives on `<html data-motion="N">`, written once from `PROJECT.md`. The shared script ([../scripts/tahi-motion.js](../scripts/tahi-motion.js)) reads it, applies reduced motion and the on-site toggle, and writes the result to `data-motion-effective`. CSS-only motion keys off the same attributes:

```css
/* Level 1: shorter travel, nothing macro-length. */
html[data-motion="1"] {
  --motion-travel-md: var(--motion-travel-sm);
  --motion-dur-4: var(--motion-dur-3);
}
/* Level 0, and reduced motion at any level: no travel. Opacity and colour changes still run. */
html[data-motion="0"],
html[data-motion-reduced] {
  --motion-travel-sm: 0px;
  --motion-travel-md: 0px;
}
@media (prefers-reduced-motion: reduce) {
  :root { --motion-travel-sm: 0px; --motion-travel-md: 0px; }
}
```

Reduced motion **drops the level, it does not switch motion off**: 3 and 2 become 1 with no travel (reveals become crossfades), 1 becomes 0. Hover, focus and pressed states still change, because that is feedback, not decoration; they just do not move far. The on-site toggle (`TahiMotion.setReduced(true)`) does the same and is remembered in `localStorage`. It can only reduce; it never adds motion back over an OS setting.

Head snippet so content never stays hidden if the script is slow or fails:

```html
<script>
  document.documentElement.classList.add('motion-pending');
  setTimeout(function () { document.documentElement.classList.remove('motion-pending'); }, 2500);
</script>
<style>
  .motion-pending [data-anim="reveal"],
  .motion-pending [data-anim-stagger] > *,
  .motion-pending [data-anim="split"] { opacity: 0; }
</style>
```

## 4. Webflow

Webflow builds use native Interactions with GSAP; the build rules (transform and opacity only, explicit start values, verify in Preview) are in `tahi-webflow:tahi-webflow-core`. For tokens:

- Interactions take typed values rather than variables, so put the motion token table on the Style Guide page and use only those values in every interaction. Check whether the panel can bind variables before each new project; if it can, bind them.
- Durations are in seconds in the panel: 0.15, 0.25, 0.5, 0.8. Stagger 0.07.
- Easing: `power4.out` for ease-out, `power2.inOut` for ease-in-out, `power2.in` for ease-in. These are the closest named GSAP eases to the CSS curves. Use a custom cubic-bezier only if the panel offers it and the design needs an exact match.
- Travel: 8px and 24px (0.5rem and 1.5rem if the panel accepts rem).
- Reduced motion: set the interaction's reduced-motion behaviour in the panel for every scroll and load interaction; the site-wide smooth scroll setting already respects the OS preference.
- Name interactions after the move, not the page: `Reveal / Section`, `Stagger / Cards`, `Signature / Home hero`. Reuse one interaction across elements by class rather than building one per section.

## 5. GSAP

```js
const tokens = getComputedStyle(document.documentElement);
const ms = (name) => parseFloat(tokens.getPropertyValue(name)) / 1000;

gsap.defaults({ duration: ms('--motion-dur-3'), ease: 'power4.out' });

const motion = {
  dur: [0, ms('--motion-dur-1'), ms('--motion-dur-2'), ms('--motion-dur-3'), ms('--motion-dur-4')],
  stagger: ms('--motion-stagger'),
  ease: { out: 'power4.out', inOut: 'power2.inOut', in: 'power2.in' }
};

// Reduced motion and levels in one place.
const mm = gsap.matchMedia();
mm.add(
  { full: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' },
  (ctx) => {
    const { reduced } = ctx.conditions;
    // build timelines here; when reduced, use opacity only and skip scroll-scrubbed moves
  }
);
```

To match the CSS curves exactly, register them with CustomEase (`CustomEase.create('tahi-out', '0.22,1,0.36,1')`). GSAP and all its plugins, including CustomEase, ScrollTrigger and SplitText, are free for commercial use under the GSAP Standard License (effective 30 April 2025, after Webflow acquired GreenSock). The licence prohibits using GSAP inside a no-code visual animation builder that competes with Webflow; client websites are fine. Re-check the licence page if that matters for a project.

## 6. Motion for React

Motion (motion.dev, formerly Framer Motion): `npm install motion`, import from `motion/react`.

```tsx
import { MotionConfig } from 'motion/react';

export const motionTokens = {
  dur: [0, 0.15, 0.25, 0.5, 0.8],
  ease: {
    out: [0.22, 1, 0.36, 1],
    inOut: [0.65, 0, 0.35, 1],
    in: [0.32, 0, 0.67, 0]
  },
  travel: { sm: 8, md: 24 },
  stagger: 0.07
} as const;

// Wrap the app once. "user" follows prefers-reduced-motion: transforms are skipped, opacity still animates.
<MotionConfig reducedMotion="user" transition={{ duration: motionTokens.dur[3], ease: motionTokens.ease.out }}>
  {children}
</MotionConfig>
```

Read the level from the same `data-motion` attribute (or a site config value) and gate components with it, so a level 1 site never mounts a level 3 move.

## 7. Figma

Mirror the tokens as Figma variables (`motion/dur/1` to `motion/dur/4`, `motion/ease/out`, `motion/travel/sm`, `motion/stagger`) where the file supports it, and name them in prototype transitions and annotations. File standards: `tahi:tahi-figma`.
