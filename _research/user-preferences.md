# User preferences (word-dump, 22 Sep 2026) — applies across skills unless noted

Raw source: user's spoken notes. Each line is a draft rule; ⚠ = needs clarification before it goes in a skill.

## Style guide is the source of truth (Client-First + Lumos)
- Observed problem: Webflow MCP/CLI adds a class name to an element but never creates it as a real Webflow style, and never places it on the Style Guide page. Especially bad with Lumos custom classes.
- Rule: every class the AI introduces must (1) exist as a real Webflow style and (2) be represented visually on the Style Guide page.
- Order on the Style Guide: custom classes first, then everything else. ⚠ confirm exact section order (custom → utilities → variables → components?).
- Rule: never rely on a raw `class` attribute string (WHTML class list / attribute) as the way a class "exists". The style must be created at the base (data_style_tool create_style) so it shows in the Style panel. ⚠ confirm reading: "I don't want custom classes added using an attribute; I want it at the base."

## Reference site
- "Giant Group" — a site reachable through the user's Webflow MCP. Good example of the Lumos structure the user wants. Pull real class names, style guide layout and component patterns from it.

## Animation
- Use Webflow native GSAP interactions (IX3, data_interactions_tool) — treat as a skill Webflow now supports. ⚠ default for all builds or only when the design asks?

## Layout rules (Client-First, Lumos, templates)
- Grids: always at least one row defined.
- Never set pixel values on anything. Use rem, %, vw, fr, etc. (responsive by nature).
- Grid column widths as ratios: `1fr` / `1.5fr`, not `4rem`. Set the ratio and let it flow.
- Likes flex-wrap.
- "There are a lot more minute whatevers" — ⚠ mine these in the interview.

## Class strategy
- Prefer seeing what already exists before creating anything (audit existing classes/utilities/variables first).
- Utility classes first. If no fitting utility exists, then a custom class.
- Variables first for values. Everything should be easily updatable and tweakable.

## Client-First additions (second word-dump)
- Read ALL of the Client-First docs (not a summary) when building that skill.
- Use the **Relume MCP** for sections where possible. User likes that Relume "topped up" the Client-First naming system. ⚠ confirm which Relume MCP (Relume's official MCP server?) and whether Relume class names are kept or renamed.
- Semantic names for everything: section names say what the section IS, e.g. `Hero_section`, `Feature_section`, `CTA_section` — never `page1_section`, `page2_section`. ⚠ user wrote `Hero_section`; Client-First canonical is `section_hero`. Confirm which casing/order they actually want (this decides folder grouping in the Style panel).

## IX2 → IX3 (GSAP) migration — verified 22 Sep 2026
- Webflow MCP `data_interactions_tool` is IX3-only: `list_interactions` on Nexus Law returned just 2 IX3 interactions; no legacy items.
- Legacy IX2 IS readable from any published page at runtime: `Webflow.require('ix2').store.getState().ixData` → `{events, actionLists, ...}`. Marrow Interiors: 223 events, 40 action lists. Event types seen: SCROLL_INTO_VIEW, SCROLL_OUT_OF_VIEW, SCROLLING_IN_VIEW, PAGE_START, MOUSE_CLICK, MOUSE_SECOND_CLICK, MOUSE_OVER, MOUSE_OUT, NAVBAR_OPEN/CLOSE, DROPDOWN_OPEN/CLOSE. Action lists have `title`, `actionItemGroups[]` (each item: actionTypeId e.g. TRANSFORM_MOVE / STYLE_OPACITY, config {duration, delay, easing, value}), `useFirstGroupAsInitialState`. Targets: `pageId|elementId` (maps to MCP `{component: pageId, element}`) or `styleBlockIds` (maps to `wf:class`).
- Not in inline HTML any more (no `Webflow.require('ix2').init({...})` block); the engine lives in `webflow.schunk.*.js`, data is injected at runtime — so read via browser JS, not by fetching HTML.
- IX3 cannot author NAVBAR/DROPDOWN triggers (rejected set) — those IX2 events need a different treatment (native navbar animation, CSS, or trigger/state).
- IX3 cannot set Initial Appearance via API; IX2 `useFirstGroupAsInitialState` must be translated into FromTo (`tt:2`) start values or resting class opacity.
- Plan: a "migrate-ix2-to-gsap" skill/script: dump ixData → normalise → map to IX3 payloads → create → verify in Preview → delete IX2 in Designer (no API for IX2 deletion).
