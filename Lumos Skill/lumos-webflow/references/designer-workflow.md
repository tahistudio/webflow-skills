# Lumos Designer workflow — components, props, slots, variants

Read before creating or editing any component in a Lumos project.

## Open and closed components

**Open component**: structure is fixed, content is not. A Section instance holds a Layout instance in its Container slot; the Layout's column slots hold a Grid or Block; those hold Typography, Button Wrapper, Visual and Card instances. A client can add, remove and reorder content inside slots in Build mode. This is the default for most sections, especially feature, content and marketing blocks.

**Closed component**: structure and content are both fixed; only props change. A FAQ block, a CTA band, a testimonials strip, a breadcrumb bar. Used when the block appears verbatim across many pages and must stay identical. A closed section still exposes Theme, Padding Top, Padding Bottom, Height and Visibility plus its content props.

Building a closed component from an open one: assemble the open structure, wrap it, turn the wrapper into a component, then expose the per-instance values (heading text, link) as props while leaving global values (type style, theme) as variants.

Decision: lean open. Go closed when the same block would otherwise be rebuilt identically three or more times, or when the client should not be able to change its structure.

## Naming and groups

Component names: Title Case, broadest term first, so search filters well.

| Group | Examples |
|---|---|
| Section | Section Hero, Section Features, Section CTA, FAQs, Testimonials, Banner, Breadcrumbs |
| Layout / Wrapper | Section, Layout, Grid, Block, Content Wrapper, Button Wrapper, Position Wrapper |
| Card | Card Primary, Card Testimonial, Card Product, Card Pricing |
| Typography | Typography Heading, Typography Paragraph, Typography Plain, Typography Eyebrow, Typography Tag |
| Button | Button Main, Button Arrow, Button Play, Button Close |
| Visual | Visual Image, Visual Video, Media Overlay, Badge, Pill, Icon Tile |
| Icon / SVG | Icon Arrow, Icon Arrow Full, Icon, Logo |
| Form | Contact Form, Form Input, Form Select, Form Checkbox, Form Fieldset, Form Label Text |
| Interactive | Accordion List, Accordion Item, Tab, Tab Link, Slider, Modal, Dropdown |
| Variant Switcher | Theme Switcher, Space Switcher, Input Switcher |
| Global | Global Styles, Global Guides, Nav, Footer |
| Utility | Clickable, Starter CSS, Starter JS |
| CMS | CMS List Blog, CMS Item Blog |

Variants of a component get a suffix, not a new group: `Accordion Item Alt`. Builder-only components and props end in ` (dev)`. Never name a component after a page.

## Props

Every prop has a group and a tooltip. Tooltips state what the prop controls and any constraint ("Utilities only, type u- to search", "Leave empty to hide the eyebrow").

Standard order and groups:

1. **Visibility** (boolean) — on the root, in a Settings group.
2. **Variant** dropdowns — always named "Variant" unless the axis has an obvious name (Theme, Size, Direction). One variant axis per component; if two axes are needed, the second is a nested component's variant surfaced as a prop.
3. **Tag** — only on components that legitimately sit at different heading levels (Typography Heading exposes it; a single-use section does not).
4. **Content** — Text, Rich Text, Link, Image, Alt Text, Video, in DOM order.
5. **Role / attributes** — for accessibility or list semantics.
6. **Style** — Max Width, Margin Bottom, Classes, Style attribute. Classes accepts `u-` utilities only.
7. **Other attributes** — Attribute Name and Attribute Value pairs for data attributes.
8. **Slots** — named after what they expect: "Buttons", "Media", "Column 1".

On a section-level component, the first prop folder is the section's own settings (Theme, Padding Top, Padding Bottom, Height, ID, Container Classes); the following folders are one per nested component, in DOM order, each named after that component ("Typography Heading", "Button Main", "Button Main 2").

Prop types available through the API: textContent, string, richText, image, altText, link, video, number, boolean, id. Variant and slot props are created by adding variants or Slot elements. Visibility, style and colour props do not exist as prop types; expose colour and spacing through nested switcher components.

## Sub-components as the client-facing control surface

The pattern that keeps clients on-system:

```
Card Testimonial
├─ Theme Switcher      → surfaces as "Theme: Inherit / Light / Dark / Brand"
├─ Space Switcher      → surfaces as "Spacing: None / Small / Main / Large"
├─ Typography Heading  → "Heading", "Heading Variant"
├─ Typography Paragraph→ "Quote"
├─ Visual Image        → "Photo", "Photo Alt"
└─ Button Main         → "Button Text", "Button Link", "Button Variant"
```

The client sees a short, grouped list of dropdowns and text fields. They cannot invent a colour, a spacing value or a type size. The nested switchers and any internal helper components (a Badge Core, a Button Chip) are marked ` (dev)` and hidden from Marketers before handoff.

The canonical example is the button: **Button Main** wraps a **Clickable** (link, screen-reader text, focus ring variant) and optional chip components; Button Main's own Variant prop (Primary, Secondary, Link, sizes) is the only thing a client touches. Helper parts carry the description "Do not place directly on a page."

## Variants

Variants override styles on the component's own classes per breakpoint and pseudo state. Use them for:

- Theme (Inherit, Light, Dark, Brand) on any section or card. Inherit is the default and means "no theme class; take the parent's".
- Type role on Typography components.
- Aspect ratio on Visual Image and Visual Video (Wide 16:9, 3:2, Square, Tall 4:5, Cover, and so on).
- Layout arrangement on Layout, Grid, Content Wrapper.
- Button style and size.
- Section padding (Padding Top and Padding Bottom variants bound to section-space tokens).

The variant name becomes a data attribute on the element, so custom code can target it. Duplicate an existing variant to start a new one so all overrides carry across.

## Slots

- Add a Slot element inside the component definition. Name it after what it expects.
- Only component instances can be dropped in. A plain heading cannot; a Typography Heading instance can.
- Nested slot wrappers get `u-display-contents` so they are invisible to layout.
- Slots cannot live inside Lists, Collection Lists or Links.
- Deleting a slot deletes its contents in every instance.
- Slot restrictions (allowed components per slot) and Marketer visibility are set by a person in the Designer; the API cannot. The ` (dev)` suffix marks what needs hiding.

## Conditional visibility

Use it inside components freely: hide the eyebrow when its text is empty; show a pluralised label when a count is above one; hide the second button when its link is empty; show a different icon per variant. Prefer one component with conditionals over two near-identical components.

## Repeaters

Small fixed counts (a FAQ block with up to eight questions): numbered prop groups "FAQ 1" to "FAQ 8", each with Question, Answer and Show toggle. When the count grows or varies per page, switch to an open section: a Section holding a Grid whose slot takes one Accordion Item instance per entry. The open form is faster to edit and cleaner in the props panel.

## Editing existing components

- Edit the main component in its own canvas; changes propagate to every instance. Check the instance count first so you know the blast radius.
- Adding a prop to a component with many instances: give it a sensible default so existing instances do not change.
- Duplicating a component: duplicate its custom classes too, or the copy shares styles with the original and edits leak.
- Unlinking an instance turns props into static settings, variants into styles and slots into elements. Do it only when a one-off truly needs to diverge, and rename the classes it leaves behind.
- Renaming a component or its group is safe and encouraged when the name is not broadest-term-first.

## Style guide and components page

- The style guide page shows utilities, then variables, then components. Every new `u-` utility gets one example element there.
- A separate Components page holds one instance of every component so the whole library is visible and nothing gets purged as unused.
- Both pages are drafts (unpublished) and carry no index tag.

## Custom code placement

| Scope | Where |
|---|---|
| One page only | Page settings head or footer |
| One instance per page (FAQs, Modal) | HtmlEmbed as the last child inside that component, class `u-embed-css` or `u-embed-js` |
| Many instances per page (Button, Card) | Global Styles component |
| Tracking, consent | Site settings |

Make an embed its own component before unlinking the parent component, or the embed becomes an orphan.

## Handoff

- All builder-only components and props end in ` (dev)`; the user hides them from Marketers.
- Global Guides is off. Style guide and Components pages are drafts.
- Component descriptions state where the component is used and how to edit it.
- A client guide (Build mode only, add sections inside `page_main`, type `u-` in a Classes prop to search utilities, never edit a main component) accompanies the site.
