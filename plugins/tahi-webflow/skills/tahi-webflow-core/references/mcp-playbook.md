# Webflow MCP playbook

Read this before building or editing through the Webflow MCP. It records what the tools can do, what silently goes wrong, and the exact order that avoids rework. Tool names below are the MCP 2.x names; if a name differs in your session, use the guide tool's list.

## Session setup

1. Call `webflow_guide_tool` once. Keep the issued session id and your agent id constant for the whole task.
2. `data_sites_tool list_sites` to find the site. Never guess a site id.
3. `data_pages_tool list_pages` for page ids. Every element, style and component call needs a site id and a page id.
4. If the site has Agent Instructions, search them and read the relevant ones; they are site-specific rules.

## Audit sequence (Phase 0)

Run these before any write:

- `data_pages_tool list_pages` — pages, folders, drafts, SEO/OG presence.
- `data_variable_tool get_variable_collections` then `get_variables` — collections, groups, modes.
- `data_style_tool query_styles` with name filters (`u-`, `_`, `is-`, `section`) rather than `get_styles all`; the full dump can exceed response limits.
- `data_component_tool get_all_components` with props, variants and instance counts.
- `data_scripts_tool get_site_freeform_code` and `get_page_freeform_code` plus registered scripts.
- `data_interactions_tool list_interactions` — native (IX3) interactions only.

Large responses are saved to a file by the harness. Parse them with a script; do not read them raw.

## Styles

- `create_style` before the class is referenced anywhere. Webflow drops class names that do not exist as styles, leaving unstyled markup with no error.
- Use `update_style` with `variable_as_value` to bind a variable. Raw `var(--…)` strings do not produce the native variable pill.
- Longhand properties only (`padding-top`, not `padding`). Emit `grid-row-gap` and `grid-column-gap` even for flex.
- Breakpoint ids: `xxl`, `xl`, `large`, `main`, `medium` (≤991), `small` (≤767), `tiny` (≤479). Desktop-first: set `main`, then override downward.
- `set_style` on an element replaces its whole class list. Pass every class you intend to keep.
- Combo classes: `create_style` with `parent_style_names`. Prefer one standalone class when a combo would be ambiguous.
- `calc()`, `clamp()`, `min()`, `max()` may be dropped from native properties. Put fluid values into a variable with a custom CSS value instead, then bind the variable.
- Variable modes on a style: `set_style_variable_mode` scoped by combo, variant, breakpoint or pseudo.

## Elements

- `data_element_builder` builds nested trees from a schema; only container-type elements accept children; deep trees may need several passes.
- `data_whtml_builder` accepts one root element per action and up to a handful of actions per call. Use it for structure only. Its CSS parameter lands in Custom Properties, not native controls, and can create duplicate styles. Do not use it for styling.
- Element ids are `{component, element}` where `component` is the page id for page-level elements, or the component id inside a definition. Pass ids verbatim.
- `query_elements` style filters are substring matches; filter results by exact class before acting.
- Images: bind by asset id (`set_image_asset`), never a raw `src`. Upload with the two-step asset flow and confirm a non-zero size before placing.
- Logos and icons: HTML embed containing the SVG, with backgrounds stripped.
- `remove_element` and `unregister_component` are irreversible. Confirm with the user first.

## Components

- Create: `create_blank_component` or `transform_element_to_component` (optionally keeping the original).
- Build inside a definition by passing `scope_component_id` to element, style and settings calls.
- Slots: `data_element_builder` with type `ComponentSlot` inside the definition. Only component instances go into slots (`data_component_builder insert_in_slot`).
- Props: `data_component_props_tool create_prop` supports textContent, string, richText, image, link, video, number, boolean, id, altText. Give every prop a group and a tooltip. Bind a prop to an element setting with `data_element_settings_tool set_settings` using a prop binding.
- Variants: `data_component_variants_tool create_variant`, then `set_variant_styles` per breakpoint and pseudo. Base variant id is `base`.
- Instances: `insert_component_instance` (by id) or `data_component_builder` (by name, with nested slot content). Set instance values with `set_component_instance_prop_values`.
- Not exposed by the API: slot restrictions, Marketer visibility, style props, Collection List curated-item props. Name dev-only components with the ` (dev)` suffix so a person can hide them.

## Variables

- Types: color, size, number, percentage, font family. Collections hold groups (`Group/Name`) and modes.
- Values: a static value, an alias to another variable, or a custom CSS expression. CSS functions in custom values have been flaky; verify the variable reads back correctly.
- Modes: create per collection; apply to styles with `set_style_variable_mode`.

## Interactions (native GSAP, IX3)

- Call the interactions `guide` action before the first write. The write path enforces rules the schema cannot express.
- Triggers available: click, hover, load, scroll, mouse-move, custom. Not available: navbar, dropdown, focus, blur, change.
- Targets: `wf:inst` for one element (`[pageId, elementId]` at page scope, `[componentId, elementId]` at component scope), `wf:class` for every element with a class (must be a real style, not an attribute-only class).
- Opacity lives under `wf:transform`. Durations: `"400ms"` or `0.4`; a bare `400` is 400 seconds.
- Reveals must carry a start value (`["0%", "100%"]`) because the API cannot set Initial Appearance. A click or hover trigger must sit on an element that stays visible.
- Scroll reveals: `start` around `"top 85%"` and duration at least 0.5s so the motion happens where people look. Turn markers off before handoff.
- Conditional playback: `[{type: "prefers-reduced-motion", behavior: "dont-animate"}]`.
- A successful write proves nothing about playback. Check in Preview or on the published page.

### Migrating legacy (Classic, IX2) interactions

The API cannot list or delete Classic interactions. Read them from the published page in a browser console:

```js
Webflow.require('ix2').store.getState().ixData
```

That object holds `events` (trigger type, target element or style ids, action list id) and `actionLists` (title, ordered `actionItemGroups`, each item with an action type such as move or opacity plus duration, delay, easing and value, and a flag marking the first group as the initial state). Procedure:

1. Dump `ixData` and list every event by type and target.
2. Map each to a native interaction: scroll-into-view becomes a scroll trigger; click and hover map directly; navbar and dropdown events cannot be recreated by the API and need a manual native setup or a CSS state.
3. Translate the initial-state group into explicit start values on the new actions.
4. Create the native interaction, verify in Preview, then delete the Classic interaction in the Designer (the API cannot).
5. Library sections imported from block libraries usually arrive with Classic interactions. Strip them all and rebuild only the motion the design needs.

## Pages and SEO

- `create_page` accepts title, slug, folder, draft, a page to duplicate, SEO and Open Graph in one call.
- JSON-LD belongs in the page-settings schema field (`bulk_update_pages_schema_markup`), never in head or body code.
- Templates for the Marketplace carry no schema at all.

## Verification

- `element_snapshot_tool` needs the Designer tab open and in the foreground, renders desktop only, and does not run embeds or custom code. First snapshot may show fallback fonts; re-snapshot.
- Full-page composites catch overlay and layering problems that isolated section snapshots hide.
- Published `.webflow.io` pages cannot be fetched by the agent's fetch tools; use a browser tool or ask the user to check.
- Never publish by default. Offer the staging domain first and only on explicit confirmation.
