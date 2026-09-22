# Webflow native Components + Webflow MCP 2.1.0 capabilities (22 Sep 2026)

Legend: [Confirmed] official doc / live MCP guide. [Announced] not verified live. [Contradiction] official sources disagree.

## A. Native components & platform

### A1. Props
- Designer prop types [Confirmed]: Text, Rich text, Image (+ alt), Link, Video, Number, Switch (boolean, used for visibility), Collection List props (filter/sort/pagination/limit/curated). Props can be grouped, reordered, tooltipped, disconnected, reset. Webflow auto-suggests props. https://help.webflow.com/hc/en-us/articles/33961219350547
- MCP `create_prop` types [Confirmed]: textContent, string, richText, image, link, video, number, boolean, id, altText. Type/id immutable after creation.
- No colour/size/"style" props today. Announced Conf 2026 "later this year" [Announced]. https://webflow.com/blog/2026-builder-keynote
- Variant prop: created automatically; ONE variant prop per component, unlimited variants. Conditional visibility can key off variant.
- MCP gap: Collection List `selectedItems` not writable (mcp-server issue #145).

### A2. Variants
- Per-component style/layout overrides, not structural. Base cascades; variant overrides. Component Canvas shows variants side-by-side [Confirmed]. MCP: per breakpoint + pseudo. Official: "start with 2–3 purposeful variants". https://help.webflow.com/hc/en-us/articles/51307110086547

### A3. Slots
- Create in main component → Add panel → Slot. Renders as div (tag changeable), wrapper can carry classes. Slot prop auto-generated. https://help.webflow.com/hc/en-us/articles/33961195339923
- Nested slots allowed. Cannot bind slot prop to parent slot prop.
- Limits: not inside Lists, Collection Lists, or Links. Deleting a slot deletes its contents in all instances. Slot content styling belongs to inserted component.
- Slot restrictions (whitelist components per slot) live 28 Aug 2026 [Confirmed]. https://webflow.com/updates/introducing-slot-restrictions
- Default components for slots — Sept 2026 [Announced].
- Native elements in slots [Contradiction]: third-party says yes; Help Center + MCP guide say components only. **Treat as component-only for automation.**

### A4. Main/instance/unlink/organisation
- Instance edits only via props/slots/variant. Unlink: props→static, variants→styles, slots→elements. Library/Code components can't be unlinked.
- Components have name, group (folder), description. Marketer visibility controls (hide dev components in Build mode) live. Components in CMS rich text rolling out 2 Sep 2026. "Presets" is not a component concept.

### A5. Variables
- 5 types: Color, Size, Number, Percentage, Font family. Collections; groups via `Group/Name`; aliases (same type; cross-collection alias = base-mode value). https://help.webflow.com/hc/en-us/articles/33961268146323
- Modes: Manual (theming, applied to class/element/page) and Automatic/responsive (one mode per breakpoint per collection). https://webflow.com/updates/variable-modes
- MCP values: static_value | existing_variable_id alias | custom_value CSS (`clamp()`, `calc()`, `color-mix()`) — issue #146 reports errors for CSS functions. `set_style_variable_mode` scoped by combo/variant/breakpoint/pseudo.
- Variables drive GSAP "Animate variable" action.

### A6. Classes, folders, style guide
- No native class folders; underscore convention rendered by Finsweet extension / Clean Styles app.
- Official naming: lowercase-dash, prefixes (`u-`, `cc-`), ≤3–4 combos, prefer variants/modes over utility sprawl. https://webflow.com/webflow-way/design-systems/styles
- Design-system checklist: build a style-guide page and use it as Library source. https://university.webflow.com/resources/design-system-checklist

### A7. Libraries
- Share components, variables (incl. modes), fonts, assets across Workspace sites; updates accepted per site. Max 5 libraries/site; components with Collection Lists/reCAPTCHA/ecommerce hidden; library components editable only on source. https://help.webflow.com/hc/en-us/articles/33961343551763

### A8. Breakpoints
- Base ≥992; Tablet ≤991; Mobile-L ≤767; Mobile-P ≤479; optional 1280/1440/1920 (min-width, cascade up, **cannot be removed once added**). MCP ids: xxl, xl, large, main, medium, small, tiny. WHTML CSS only 991/767/479 queries.
- Breakpoint canvas (all breakpoints side by side) rolling out 2 Sep 2026. https://webflow.com/updates/see-every-breakpoint-while-you-edit
- Units: no official ruling. figma-to-webflow skill defaults px and warns clamp/calc may drop in native styles → use variables with custom_value for fluid values.

### A9. Audit panel, SEO
- Audit panel: missing alt, skipped headings, empty links, missing form labels. Page settings: SEO title, meta desc (CMS-bindable), OG, sitemap toggle, custom code, JSON-LD (MCP bulk_update_pages_schema_markup).

### A10. Interactions
- Interactions with GSAP default since 10 Jul 2025: trigger/target/action, timeline, easing, SplitText, staggers, ScrollTrigger, reduced-motion, component-instance-scoped, presets. Classic IX2 still available; Classic-only: navbar/dropdown/tab/slider events, page branching, DevLink. Marketplace requires GSAP. https://help.webflow.com/hc/en-us/articles/46300264646803
- 2026: Rive binding; Mouse move trigger (Jul 2026); Animate Variable; Spline.

### A11. Localize / Optimize / Analyze / AI / Cloud
- Localize: per-locale content/styles/assets/visibility; prop translation controls. Optimize: A/B + personalization. Analyze: cookieless analytics; MCP data_analyze_tool. Webflow AI: Assistant, AI code components, alt text/SEO, **Agent Instructions** (site-specific rules consumed by MCP data_agent_instructions_tool). Webflow Cloud GA.

### A12. Figma → Webflow app
- Does: Figma variables → Webflow variables (multiple collections + modes, aliases kept); text/effect styles → classes; auto-layout → flexbox; layer names → classes; assets; Figma components → Webflow components; Design System Sync with conflict handling; responsive target choice. https://help.webflow.com/hc/en-us/articles/33961260854675
- Does NOT: Figma variants, instances, non-auto-layout/absolute, grid, advanced effects, interactions, full pages. Slots/props not generated from Figma props. Sync a few components at a time.

### A13. Webflow Way best practice
- Component-first: atoms → molecules → sections; **section is max component scope**. Component when UI repeats. Props for per-instance values; variants for same structure/different look; slots for structural variety. Separate marketer-facing "design components" from "development components". Title-case names ("Pricing Card"), context prefix for child atoms ("Card Call to Action"). https://webflow.com/webflow-way/design-systems/components

## B. MCP 2.1.0 capability table

MCP 2.0 (Jul 2026) made element/style/variable/component work headless (needs siteId + pageId). Bridge only for snapshots, canvas state/selection/navigation, page folders, upload_image_by_url. 2.1 added data_interactions_tool. https://developers.webflow.com/mcp/reference/how-it-works

| Capability | Headless | Bridge | Caveat |
|---|---|---|---|
| data_element_builder (nested) | Yes; scope_component_id | — | Only Container/Section/DivBlock take children; older docs: max 3 levels/call |
| data_whtml_builder | Yes; ≤5 insertions/call; single root; CSS only 991/767/479; no @keyframes/<style> | — | CSS lands in Custom properties; silently duplicates styles (#142); uncreated classes dropped |
| Native Navbar/Slider/Tabs/Dropdown/Lightbox | **No** | — | Human step or custom CSS-only equivalent |
| Edit elements (text, link, image asset, attrs, heading level, move, remove) | Yes | select only | remove irreversible |
| Element settings/bindings incl. bind setting → prop | Yes | — | Only `prop` bindings on data surface |
| Styles: create/update/rename, combos, breakpoints xxl…tiny, pseudo, variable_as_value | Yes | — | set_style replaces class list; clamp/calc may drop; combo/global same-name bug (#135) |
| Variables: 5 types, collections, modes, aliases, custom_value | Yes | — | CSS-function values error (#146) |
| Apply variable mode to style (scoped) | Yes | — | — |
| Components: create blank, transform element, duplicate, metadata, delete, query | Yes | open_canvas / open_component_view | unregister removes all instances |
| Insert instances incl. into slots (data_component_builder insert_in_slot) | Yes | — | Only component instances in slots |
| Create Slot (data_element_builder type "ComponentSlot" + scope_component_id) | Yes | — | Slot restrictions not exposed |
| Props: create/update/remove (10 types), get/set instance values, reset | Yes | — | No colour/style props; selectedItems not writable |
| Variants: create/duplicate/delete/rename/reorder, per-variant styles per breakpoint/pseudo | Yes | — | base id 'base' undeletable |
| Unlink instance | Yes | — | Not Library/Code components |
| Interactions IX3/GSAP (click, hover, load, scroll, mouse-move, custom) | Yes (call guide first) | — | "successful write is not proof it runs" — verify in Preview. No Classic |
| Pages: create (SEO/OG/duplicateOf), settings, sitemap, JSON-LD | Yes | **Folders: Bridge only** | — |
| Assets: create (S3 2-step), folders, compress, fonts | Yes | upload_image_by_url | Folders can't be deleted |
| Scripts: registered + freeform head/footer | Yes | — | Inline ≤2000 chars |
| element_snapshot_tool | No | **Yes, tab foregrounded** | Desktop only; no embeds/WebGL/backdrop-filter; fonts fallback first shot |
| designer_tool (page/mode/selection/breakpoints) | No | Yes | — |
| Localization writes | Yes (secondary only) | — | — |
| Publish | Yes | — | *.webflow.io robots-blocked to agents |
| Agent Instructions (site-specific skills) | Yes | — | Drafts; inspect before trusting |

Operational: every call needs agent_id, session_id, context; actions sequential, non-transactional, no ID passing between actions; element ids `{component, element}` where component = page id; query_elements style filters are substring matches. Bridge drops when Designer tab backgrounded.

Official skills repo: github.com/webflow/webflow-skills (local cache v1.0.7, 31 skills). figma-to-webflow gates worth copying: create classes before referencing; style only via data_style_tool; no ::before/::after or <style> for layout; SVG logos as HtmlEmbed; images by asset id; desktop-first main→medium→small→tiny; never done without visual verification; no publish by default.

## C. Recommended Figma → Webflow breakdown process (14 steps)
1. Inventory Figma (get_metadata, get_variable_defs, get_design_context per frame): pages, frames per breakpoint, components + variants/props, variable collections/modes, text styles. Flag non-auto-layout / variant / instance usage (won't plugin-sync).
2. Tooling split: Figma-to-Webflow app for tokens + primitives only; MCP/Designer for sections, slots, props, variants, interactions. Never plugin-sync whole pages.
3. Design system first in Webflow: variable collections (Primitives → Semantic aliases), responsive modes for spacing/type (or custom_value clamp), manual mode for themes; fonts; naming convention recorded in Agent Instructions.
4. Breakpoint policy before styling (1280/1440/1920 irreversible); map Figma frame widths to 992/767/479 cutoffs.
5. Build style-guide page with real classes; Library source if multi-site.
6. Atomise component list (Button, Tag, Icon wrapper, Cards, Form field, Nav, Footer, Section header, CTA band, Testimonial, Pricing card, FAQ item, Blog card). Used once = plain section. Section = largest component.
7. Per-component spec before build: name/group/description, DOM order, props (types, defaults, groups, tooltips), variants (2–3, one axis), slots (structural variety + restrictions), nested components. Mapping: Figma boolean → Switch; text → Text prop; instance-swap → Slot or Variant; variant axis → Webflow variant (style) or separate component (structure).
8. Build atoms → molecules → sections; create_style before use; build inside definitions via scope_component_id; add ComponentSlot; create props and bind via set_settings; create variants + per-breakpoint styles.
9. Assemble pages from instances (nested + insert_in_slot); set prop values, variants; one-offs as raw elements. Page SEO/OG at creation.
10. Native-only elements (Navbar, Slider, Tabs, Dropdown, Lightbox) = human step or CSS-only equivalent; list in handoff.
11. Responsive pass desktop-first main → medium → small → tiny (+ large/xl/xxl if enabled); variants per breakpoint; responsive modes where values change at every breakpoint.
12. Interactions via data_interactions_tool (guide first), component-instance-scoped; verify in Preview.
13. QA loop: structural (query_elements/query_styles, duplicate-class check), visual (full-page composite snapshot, Designer foregrounded; desktop only → Breakpoint canvas / Preview for mobile), Audit panel, a11y, link check, Marketer prop-edit dry run.
14. Handoff: component descriptions, Marketer-visible set, Agent Instructions updated, style guide current, publish only on approval, Library if multi-site.

## D. Questions for the user
1. Threshold for one component + variant/slot vs two components vs plain section? Real example.
2. Which Figma signals mark "component": component status, layer naming, repeat count, designer notes?
3. Mapping Figma variant axes (Size × State × Theme) onto Webflow's single variant prop?
4. Prop vs slot for media (image/video/Lottie in hero)? Rich text props exposed to clients?
5. What is never exposed as a prop? Who edits — Marketer in Build mode, Editor, or you?
6. Slot restrictions / Marketer visibility already used? Default locked-down or permissive?
7. Naming framework; underscore class folders; Title-case component names with group scheme?
8. Units: rem/px; fluid clamp in variables vs stepped responsive modes; base font-size?
9. Breakpoints enabled; 1280/1440/1920; desktop design canvas width vs 992 base?
10. Variables: primitives → semantic alias layer; manual modes for dark sections vs classes/variants?
11. Interactions: GSAP only or some Classic; should the agent author animations?
12. Native elements: CSS-only nav/tabs/slider OK, or always native (human step)?
13. Definition of done: Audit panel clean, every breakpoint, Lighthouse, link check, Marketer edit test? What do you always catch that tools miss?
14. Single-site or Library source site? Plan tier?
15. Figma-to-Webflow app: used for tokens/atoms or avoided? Known pain?

Key URLs: see inline. Also https://developers.webflow.com/mcp/tools/data-tools · https://developers.webflow.com/mcp/faqs · https://developers.webflow.com/designer/reference/components-overview · https://github.com/webflow/mcp-server/issues
