# Breaking a Figma design into a Webflow build

## 1. Scan (read everything before building anything)

Walk every page and every frame in scope. Record:

| What | How | Output |
|---|---|---|
| Pages and frames | list frames per page; note which breakpoints exist (desktop only? tablet? mobile?) | page inventory |
| Colours | every fill, text and border colour with usage count | colour list → primitives and semantic roles |
| Type | every text style: family, size, weight, line height, letter spacing, case; group into roles (Display, H1–H6, Large, Main, Small, Eyebrow, Tag) | type roles |
| Spacing | gaps, paddings, section paddings, container widths; cluster values | spacing scale |
| Radius, shadow, borders | distinct values | UI tokens |
| Sections | one row per section per page: name (what it is), content elements, layout (columns, grid, media position), scheme (light, dark, accent) | section inventory |
| Repeats | which sections or blocks appear on more than one page or more than once on a page; how they differ (content only, look only, structure) | component candidates |
| Interactive | navigation, dropdowns, tabs, accordions, sliders, modals, forms, filters | native-element list |
| Motion | any animation the designer indicated | interaction list |
| Assets | logos, icons (vector), photos, illustrations, videos | asset list with formats |

Also read the Figma variables and text styles if the file has them; they are the designer's intended tokens.

## 2. Snap values to tokens

For every design value, find the nearest existing token. Snap when the difference is within about 5 percent of the larger value or 4px, whichever is greater. 141 snaps to 140; 145 snaps to 140; 13 does not snap to 8. When a value is outside tolerance and appears twice or more, create a token. When it appears once, ask whether it matters; usually it snaps to the nearest token anyway and the designer will not notice.

Type roles: fit the design's styles into the framework's role set. Two styles within tolerance of each other are one role. A style that fits no role and recurs becomes a new role, created fully (variable, mode, utility, component variant).

## 3. Decide sections and components

For each row in the section inventory:

- **Appears once, unique structure** → one-off section built from the framework's skeleton and existing components (headings, buttons, images are still components).
- **Appears on several pages with only content changing** → closed component with props (a CTA band, an FAQ block, a testimonials strip).
- **Appears several times with the same structure but different look** → one component with a variant axis (Light, Dark, Tinted; Image Left, Image Right).
- **Appears several times with structural variety** (sometimes two columns, sometimes three; sometimes a video, sometimes an image) → open component: the framework's Section, Layout, Grid and Block with slots, filled per instance.
- **Repeats but needs edits the component model cannot express** → copy and paste, named consistently, noted in the handoff.

Mapping Figma constructs:

| Figma | Webflow |
|---|---|
| Boolean property | Switch (boolean) prop or conditional visibility |
| Text property | Text or Rich Text prop |
| Instance swap | Slot (structural) or Variant (look) |
| Variant axis that changes look | Component variant |
| Variant axis that changes structure | Separate component or slot |
| Auto layout with wrap | Flex with wrap |
| Grid of cards | Grid with ratio columns and a defined row |
| Component set with many axes | Collapse to one axis plus nested sub-component variants |

A section is the largest thing that becomes a component. Pages are assembled from section instances; they are never components.

## 4. Write the component spec before building

For each component:

```
Name:        Card Testimonial            Group: Cards
Open/closed: closed
Description: Quote card used in Testimonials sections. Edit text and photo via props; pick scheme and spacing from the dropdowns.
Props:
  Settings   Visibility (bool)  ·  ID
  Content    Quote (rich text) · Name (text) · Role (text) · Photo (image) · Photo Alt (alt)
  Style      Scheme (variant via Theme Switcher) · Spacing (variant via Space Switcher)
Variants:    Base, Compact
Slots:       —
Nested:      Typography Paragraph, Typography Plain ×2, Visual Image, Theme Switcher (dev), Space Switcher (dev)
```

Tooltip every prop. Mark what is ` (dev)`.

## 5. Order of build

1. Tokens, utilities, style guide, components page.
2. Global components: Navbar, Footer, Button, CTA.
3. Atoms and molecules that the section inventory needs: cards, tags, badges, form fields, icon wrappers.
4. Pages from Base Structure with SEO filled.
5. Sections page by page, top to bottom, one at a time, checked live at each breakpoint before the next.
6. Native elements that need a person (Navbar, Slider, Tabs) placed when their section is reached; pause and hand over the exact spot.
7. Motion.
8. Schema, settings, QA.

## 6. Breakpoints without frames

When the designer drew desktop only: stack columns at the tablet cutoff for three-plus column grids, at the mobile-landscape cutoff for two-column layouts; keep type on the fluid or stepped scale the framework provides; increase touch targets to at least 44px; hide decorative media that would sit above the fold on mobile; test the navigation open state. Decide, build, look, adjust. Do not stop to ask; report the decisions instead.

## 7. Quality checks per section

Before leaving a section: heading level correct in the page outline; every image has alt; every link has a destination; no px on type or spacing; grid has a row and ratio columns; no empty divs; classes named by what they are; props tooltipped; rendered at desktop and every enabled breakpoint with no overflow.
