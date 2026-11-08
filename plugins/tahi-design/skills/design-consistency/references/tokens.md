# Default token set and naming

A starting point for a new site. Change the values to suit the brand; keep the structure and the names so every Tahi project reads the same way. Motion tokens are defined in `tahi-design:site-animator` (`references/motion-tokens.md`) and only referenced here.

## Contents

1. Naming across Figma, CSS and Webflow
2. Type
3. Spacing and sections
4. Colour
5. Radius, border, shadow
6. Layout
7. Starter `tokens.css`

## 1. Naming across Figma, CSS and Webflow

One name, three spellings. The path is always `group / role / modifier`.

| Figma variable | CSS custom property | Webflow variable (folder / name) |
|---|---|---|
| `color/text/muted` | `--color-text-muted` | `Color / Text Muted` |
| `color/accent/default` | `--color-accent` | `Color / Accent` |
| `space/6` | `--space-6` | `Space / 6` |
| `section/md` | `--section-md` | `Section / Medium` |
| `radius/md` | `--radius-md` | `Radius / Medium` |
| `font/size/h2` | `--text-h2` | `Type / H2 Size` |
| `shadow/float` | `--shadow-float` | `Shadow / Float` |

- Spacing steps use their index (`space/6`), not their pixel value, so a rescale does not make the name lie.
- Type uses semantic step names (`display`, `h1` to `h6`, `lead`, `body-lg`, `body`, `small`, `caption`), not sizes.
- Webflow-only conventions (Title Case with spaces, folders, modes) come from `tahi-webflow:tahi-webflow-core`; Figma file conventions from `tahi:tahi-figma`.

## 2. Type

**Scale.** Pick one ratio. About 1.2 (minor third) for calm, text-heavy sites; 1.25 (major third) as the default; 1.333 (perfect fourth) for expressive display-led sites. Generate the steps, then round to whole pixels at both ends.

**Fluid sizes.** Each step has a mobile size (at 360px) and a desktop size (at 1440px) joined by `clamp()`:

```css
--text-h1: clamp(2.5rem, 1.83rem + 2.96vw, 4.5rem); /* 40px at 360 → 72px at 1440 */
```

Use a fluid type calculator rather than hand maths. In Webflow, use variable modes per breakpoint or `clamp()` in the variable value, per the framework in use.

**Each step carries four values:** size, line height, letter spacing, weight. Defaults:

| Step | Line height | Tracking | Notes |
|---|---|---|---|
| display, h1 | 1.0 to 1.1 | -0.02em to -0.04em | Tighter as size grows |
| h2, h3 | 1.1 to 1.2 | -0.01em to -0.02em | |
| h4 to h6 | 1.2 to 1.3 | 0 | Often the same size as lead or body-lg, heavier |
| lead, body-lg | 1.4 to 1.5 | 0 | |
| body | 1.5 to 1.6 | 0 | 16px minimum, 18px common for reading sites |
| small, caption | 1.4 | 0 to 0.01em | 14px minimum for anything a person must read |

**Weights.** Two or three per family (for example 400, 500, 700). Load only those.

## 3. Spacing and sections

**Base scale (4px base):**

| Token | px | rem |
|---|---|---|
| `--space-1` | 4 | 0.25 |
| `--space-2` | 8 | 0.5 |
| `--space-3` | 12 | 0.75 |
| `--space-4` | 16 | 1 |
| `--space-5` | 24 | 1.5 |
| `--space-6` | 32 | 2 |
| `--space-7` | 48 | 3 |
| `--space-8` | 64 | 4 |
| `--space-9` | 96 | 6 |
| `--space-10` | 128 | 8 |
| `--space-11` | 160 | 10 |

**Section steps (fluid):**

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--section-sm` | 48 | 80 | Bands that belong to the section above; CTA strips |
| `--section-md` | 64 | 128 | Default section padding |
| `--section-lg` | 96 | 160 | Hero, the one moment that needs air |

**Inside a section:** heading to body `--space-4` or `--space-5`; body to action `--space-6`; header block to content `--space-7` or `--space-8`. Write the pairings down once and reuse them.

## 4. Colour

**Primitives** are the palette: one or two neutral ramps (tinted towards the brand's warm or cool side, never both), the brand colours, and status colours. Raw values live only here.

**Roles** are what components use:

| Role | Purpose |
|---|---|
| `--color-bg` | Page background |
| `--color-surface` | Raised or inset areas one tone step from the background |
| `--color-surface-alt` | The alternate field colour for deliberate band changes |
| `--color-text` | Running text and headings |
| `--color-text-muted` | Secondary text; must still pass 4.5:1 on its background |
| `--color-border` | Dividers and input borders; 3:1 against the background for inputs |
| `--color-accent` | Primary action and at most one other emphasis |
| `--color-on-accent` | Text and icons on the accent |
| `--color-focus` | Focus ring; 3:1 against everything it sits on |
| `--color-success`, `--color-warning`, `--color-error` | Form and status feedback, each with an `on-` partner |

- **One accent.** A second accent needs a job the first cannot do.
- **Dark sections and dark mode** redefine the roles in a scope (`[data-theme="dark"]` or a Webflow mode); components do not change.
- **Neutral count.** Four to six neutrals cover almost every site. If the drift audit finds more, two of them are doing the same job.

## 5. Radius, border, shadow

| Token | Default | Notes |
|---|---|---|
| `--radius-sm` | 4px | Inputs, tags |
| `--radius-md` | 8px | Cards, media |
| `--radius-lg` | 16px | Large panels |
| `--radius-full` | 999px | Pills and round buttons, only if the brand is round |

Choose the site's character once: square (0 to 2px everywhere), soft (the table above) or round (pill buttons, large card radii). Nested corners use outer radius minus the padding between the edges.

Borders are 1px in `--color-border`. Shadows:

| Token | Use |
|---|---|
| `--shadow-float` | Menus, popovers, sticky bars |
| `--shadow-overlay` | Dialogs and drawers |

Tint shadows towards the background hue rather than pure black. Cards at rest get a tone step, not a shadow.

## 6. Layout

| Token | Default |
|---|---|
| `--container-max` | 80rem (1280px) for content; a wider `--container-wide` (90rem) for media-led sections |
| `--page-margin` | `clamp(1rem, 0.5rem + 2.22vw, 2.5rem)` |
| `--gutter` | `clamp(1rem, 0.67rem + 1.48vw, 2rem)` |
| `--measure` | 65ch (text blocks), 45ch for large lead text |
| Columns | 12 on desktop, 8 on tablet, 4 on mobile |

## 7. Starter `tokens.css`

```css
:root {
  /* type */
  --font-display: "Brand Display", system-ui, sans-serif;
  --font-body: "Brand Text", system-ui, sans-serif;
  --text-display: clamp(3rem, 2rem + 4.44vw, 6rem);
  --text-h1: clamp(2.5rem, 1.83rem + 2.96vw, 4.5rem);
  --text-h2: clamp(2rem, 1.58rem + 1.85vw, 3.25rem);
  --text-h3: clamp(1.5rem, 1.33rem + 0.74vw, 2rem);
  --text-lead: clamp(1.25rem, 1.17rem + 0.37vw, 1.5rem);
  --text-body: 1.0625rem;
  --text-small: 0.875rem;

  /* space */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem; --space-8: 4rem;
  --space-9: 6rem; --space-10: 8rem; --space-11: 10rem;
  --section-sm: clamp(3rem, 2.33rem + 2.96vw, 5rem);
  --section-md: clamp(4rem, 2.67rem + 5.93vw, 8rem);
  --section-lg: clamp(6rem, 4.67rem + 5.93vw, 10rem);

  /* colour: primitives */
  --stone-50: #f6f5f2; --stone-200: #dedbd4; --stone-500: #77736a;
  --stone-700: #45423c; --stone-900: #1c1b19;
  --brand-500: #0f6e5c;

  /* colour: roles */
  --color-bg: var(--stone-50);
  --color-surface: #ffffff;
  --color-surface-alt: var(--stone-900);
  --color-text: var(--stone-900);
  --color-text-muted: var(--stone-700);
  --color-border: var(--stone-200);
  --color-accent: var(--brand-500);
  --color-on-accent: #ffffff;
  --color-focus: var(--brand-500);

  /* shape */
  --radius-sm: 0.25rem; --radius-md: 0.5rem; --radius-lg: 1rem; --radius-full: 999px;
  --shadow-float: 0 0.5rem 1.5rem -0.5rem rgb(28 27 25 / 0.18);
  --shadow-overlay: 0 1.5rem 3rem -1rem rgb(28 27 25 / 0.28);

  /* layout */
  --container-max: 80rem;
  --page-margin: clamp(1rem, 0.5rem + 2.22vw, 2.5rem);
  --gutter: clamp(1rem, 0.67rem + 1.48vw, 2rem);
  --measure: 65ch;
}
```

The colours are placeholders to show the structure; they are not a Tahi palette.
