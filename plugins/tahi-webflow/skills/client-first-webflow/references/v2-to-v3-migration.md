# Client-First V2 to V3

Finsweet has not published a V2 to V3 guide. This is the change list from the V3 release notes and the V3 agent rules, with how to act on each.

## Default: work in the project's version

Many live sites are V2 (2.1). Do not convert them piecemeal. New sections on a V2 site follow V2 patterns so the project stays consistent. Converting is a restructure: ask, agree the scope (whole site, or a page at a time with a deadline to finish), then follow the steps below. Never leave a page half converted.

## What changed

| Area | V2 | V3 |
|---|---|---|
| Variables | colour only, prefixed names (`--base-color-brand--blue`, `--text-color--text-primary`) | five collections (Base, Theme, Typography, Layout, Sizes), prefixes removed except where the Style panel needs context, breakpoint and theme modes |
| Section element | Div Block with tag `section` | native Section element |
| Section padding | `padding-global padding-section-*` wrapper inside every section | padding on `section_*` bound to `global-padding` and Section Padding variables; wrapper only as the alternative structure |
| Uneven section padding | custom class | `padding-section-top-[size]`, `padding-section-bottom-[size]`, or different variables on the section |
| Spacing classes | two classes: `padding-bottom` + `padding-medium` | one class: `padding-bottom-medium`; `padding-[size]` and `margin-[size]` for all sides |
| Spacer blocks | `spacer-[size]` | removed from the docs; never use. Spacing block with a spacing class, or gap |
| Custom spacing | `custom1`, `custom2`, `custom3` | removed. Use a custom class |
| New sizes | `tiny` .125 at the bottom | scale rebuilt: `xxtiny` .25, `xtiny` .5, `tiny` .75 … `xxhuge` 12, in Layout › Spacing |
| Gap | not a utility | `gap-[size]` |
| Grid | none | `grid-autofit`, `grid-autofit-css`, `grid-autofit-[size]`, `grid-autofill-css`, `grid-autofill-[size]`, `grid-span-full` |
| Text | none | `text-style-1line`, `-balance`, `-pretty`; `text-color-inherit`, `text-size-inherit`, `text-weight-inherit`, `text-decoration-inherit` |
| Other utilities | `layer`, `display-inlineflex`, `inherit-color` | `layer` removed; `display-inline`, `display-inline-flex`, `display-contents`, `overflow-clip`, `text-area-vertical`, `disable-select`, `border-radius-inherit` |
| Class strategy | combo on utilities | custom class first, utility on top, recommended; combo still valid |
| Component names | free | `Group Name / Component Identifier`, groups created by hand |
| Page start | duplicate a Base Structure page | unlink `Template / Core Structure`; sections from `Template / Section` |
| Global CSS | one `global-styles` embed | `Global / Styles` with `global-styles_default` and `global-styles_custom`; some snippets use native custom CSS |
| Dark sections | `color-scheme-dark` or `section-style-dark` add-ons | Theme collection Dark Mode switched through the Style panel or `theme-dark` |
| Launch | none | Client-First launch checklist (see launch-checklist.md) |
| AI | none | `client-first.md` agent rules (beta), for setting up structure, not for launch-ready output |

## Upgrade order (after the user agrees)

1. **Inventory**. List every class with usage counts, every variable, every component, every embed. Note custom spacing, spacers, `layer` and any page-prefixed folders.
2. **Variables**. Build the five collections and their modes. Move V2 colour primitives into Base and semantics into Theme, keeping values. Add Typography, Layout and Sizes values from the current tag styles and classes. Re-link every class and tag style to the new variables, then delete the old ones only when nothing references them.
3. **Global styles**. Create `Global / Styles` with the two embeds. Move project CSS out of the old embed into `global-styles_custom`, update its variable references to the new CSS names, place it on every page, remove the old embed.
4. **Template components**. Add `Template / Core Structure` and `Template / Section`. Retire the Base Structure page after the user confirms.
5. **Sections, page by page**. Swap Div sections for native Sections (or confirm the `section` tag), move padding onto `section_*` through variables, remove the `padding-global padding-section-*` layer unless the alternative structure is justified, keep IDs and interaction targets intact.
6. **Spacing**. Replace two-class wrappers with the single V3 class; replace `spacer-*` with a spacing block or parent gap; replace `custom[n]` with a custom class; replace `layer` with a custom class.
7. **Components**. Rename to `Group / Identifier`, create the groups, move components in.
8. **Interactions**. Rename to `Element [Action State]`. If any are Classic, use the `webflow-ix2-to-gsap` skill.
9. **Clean up**. Remove unused classes (after the user approves), re-run the style guide, run QA and the launch checklist.

Report each step's changes before moving to the next. Anything with a global effect (variable values, utility classes, embeds) needs the user's approval first.
