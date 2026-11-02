# Client-First V3 research notes (November 2026)

Sources: finsweet.com/client-first/docs/whats-new (V3 release notes, linked from Finsweet's October 2026 product email); Finsweet's `client-first.md` agent rules (beta), supplied by the user and kept verbatim in the skill at `plugins/tahi-webflow/skills/client-first-webflow/references/finsweet-client-first-v3.md`; the Client-First launch checklist at finsweet.notion.site/client-first-launch-checklist (raw dump in `sources/client-first-launch-checklist.txt`). Supersedes the V2.1 notes in `client-first.md` where they conflict.

## What's new in V3 (release notes)

- Variables underpin everything, in five collections: Base (primitives), Theme (semantic colour), Typography (semantic type), Layout (spacing, section padding), Sizes (element sizing). Name prefixes removed except where the Style panel needs context.
- Native Section element instead of a Div Block. Global and section padding set directly on `section_[identifier]` through variables; padding wrappers no longer needed. Recommended stack: `section_ > container- > component`. The layered structure remains for more control. New `padding-section-[direction]-[size]`.
- Spacing direction and size merged: `padding-bottom-medium` replaces `padding-bottom padding-medium`. `padding-[size]` and `margin-[size]` for all sides. New sizes `xtiny`, `xxtiny`. Values in Layout. Spacer classes no longer documented or recommended.
- New utilities: `text-style-1line`, `-balance`, `-pretty`; `text-color-inherit`, `text-size-inherit`, `text-weight-inherit`, `text-decoration-inherit`, `border-radius-inherit`; `grid-autofit`, `grid-autofit-css`, `grid-autofit-[size]`, `grid-autofill-css`, `grid-autofill-[size]`, `grid-span-full`; `gap-[size]`; `overflow-clip`, `display-contents`, `display-inline`, `display-inline-flex`, `text-area-vertical`, `disable-select`. Removed: `layer`.
- New "custom class + utility class" strategy: custom class first, utility on top. Combo strategy still valid.
- Component naming `Group Name / Component Identifier`; groups created by hand.
- Page template with `Global / Styles`, `Template / Section`, `Template / Core Structure` (unlink to use).
- Global CSS: several snippets use Webflow's native custom CSS; default and custom code split into two embeds.
- Launch checklist (Notion). `client-first.md` for AI agents via the Webflow MCP, beta, for setting up structure, not for launch-ready projects.
- No V2 to V3 migration guide published.

## Decisions taken when updating the skills

- V3 is the default for new builds; V2 projects stay V2 unless the user approves an upgrade (migration reference written from the change list).
- Round-four preference "padding-section on the padding-global div" is superseded by V3's padding-on-section default; the wrapper form remains as V3's alternative structure.
- Round-four preference on page-prefixed folders kept as a Tahi override of Finsweet's looser rule.
- Round-four "scheme from `color-scheme-dark` utility" replaced by V3 Theme modes and `theme-dark`.
- Component names move from "Testimonial" style to `Section / Testimonials` style, which is still Title Case for the Marketplace.
- Templates: V3's lowercase variable names conflict with the Marketplace's Title Case rule; V3's Global / Styles embeds conflict with the no-custom-code rule. Both handled in the template skill.
- Launch checklist adapted with check type and a template column. Kept Tahi's JSON-LD-in-page-settings rule beside Finsweet's microdata-for-FAQ advice. Corrected Finsweet's `aria-role` to `role`.
