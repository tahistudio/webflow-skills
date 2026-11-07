---
name: webflow-ix2-to-gsap
description: "Read a Webflow site's legacy Classic (IX2) interactions and rebuild them as native GSAP-powered Webflow interactions (IX3), then remove the legacy ones. Use whenever the user mentions IX2, Classic interactions, legacy interactions, 'migrate animations to GSAP', a template or library section that arrived with old interactions, or when a Marketplace template QA finds Classic interactions. Works alongside tahi-webflow-core and the Webflow MCP interactions tool."
---

# Classic (IX2) to native GSAP (IX3)

Webflow's API can list, create and delete native GSAP interactions but cannot see Classic interactions at all. Classic interactions are still fully readable from any published page at runtime. This skill turns that dump into native interactions without breaking the animation.

## Procedure

### 1. Dump the legacy data

Open the published page (staging domain is fine) in a browser tool and run:

```js
(() => {
  const d = Webflow.require('ix2').store.getState().ixData;
  const events = Object.values(d.events || {});
  const lists = d.actionLists || {};
  return {
    events: events.map(e => ({
      id: e.id, type: e.eventTypeId,
      target: e.target,                 // {appliesTo: ELEMENT|CLASS|PAGE, id: "pageId|elementId", styleBlockIds: [...]}
      actionListId: e.action?.config?.actionListId,
      config: e.config
    })),
    actionLists: Object.values(lists).map(a => ({
      id: a.id, title: a.title,
      useFirstGroupAsInitialState: a.useFirstGroupAsInitialState,
      groups: a.actionItemGroups.map(g => g.actionItems.map(i => ({
        type: i.actionTypeId, target: i.config?.target, config: i.config
      })))
    }))
  };
})()
```

Repeat per page that has its own interactions (page-scoped data can differ). Save the JSON.

### 2. Inventory

Table every event: page, trigger type, target (element or class), action list title, number of steps, whether the first group is an initial state. Group identical action lists reused across many elements; those become one class-targeted native interaction.

### 3. Map triggers

| Classic event | Native trigger |
|---|---|
| MOUSE_CLICK, MOUSE_SECOND_CLICK | `wf:click` with two grouped timelines (first click plays group A, second click plays group B), or a toggle control |
| MOUSE_OVER, MOUSE_OUT | `wf:hover` split form: enter and leave timelines |
| SCROLL_INTO_VIEW, SCROLL_OUT_OF_VIEW | `wf:scroll` with `start` around `"top 85%"`, `enter: "play"`; out-of-view maps to `leave` or `leaveBack` toggles |
| SCROLLING_IN_VIEW (scrub) | `wf:scroll` with `scrub` and explicit `start` and `end` |
| PAGE_START, PAGE_FINISH | `wf:load` (no target) |
| MOUSE_MOVE | `wf:mouse-move` with `mouseX` and `mouseY` timelines |
| NAVBAR_OPEN / CLOSE, DROPDOWN_OPEN / CLOSE, TAB_ACTIVE, SLIDER_ACTIVE | **Not available through the API.** Options: keep the native element's built-in animation, restyle the open state with CSS on the element's open class, or ask the user to author it in the Designer |
| PAGE_SCROLL_UP / DOWN (sticky nav hide) | `wf:scroll` scrub or a Designer-authored interaction; flag for the user |

### 4. Map actions

| Classic action | Native property |
|---|---|
| TRANSFORM_MOVE (x, y, z) | `wf:transform` `x`, `y` (prefer `xPercent`, `yPercent` when the value was a percentage) |
| TRANSFORM_SCALE | `scale`, `scaleX`, `scaleY` |
| TRANSFORM_ROTATE | `rotation`, `rotationX`, `rotationY` |
| TRANSFORM_SKEW | `skewX`, `skewY` |
| STYLE_OPACITY | `opacity` under `wf:transform` (never `wf:style`) |
| STYLE_SIZE (width, height) | `width`, `height` under `wf:transform`; prefer redesigning to a transform |
| STYLE_BACKGROUND_COLOR, STYLE_BORDER, STYLE_TEXT_COLOR | `wf:style` `backgroundColor`, `borderColor`, `color` |
| GENERAL_DISPLAY | Set action (`tt: 3`) `display` |
| Easing names | preset index (linear 0, ease-in-out variants as power1–power4, back, bounce, elastic, expo, sine) |
| Duration and delay | `timing.duration` as `"Nms"`; delay via `timing.position` on the timeline, not on the action |

Steps within one action item group play together; successive groups play in sequence. Rebuild that ordering with timeline positions.

### 5. Handle the initial state

Classic often uses the first group as the initial state (element starts at opacity 0, offset 40px). The native API cannot set Initial Appearance, so carry the start value into the action: `opacity: ["0%", "100%"]`, `yPercent: [20, 0]` with `tt: 2`. A click or hover trigger must live on an element that stays visible; move the trigger to a parent or sibling if the old trigger element was itself hidden at rest.

### 6. Create and verify

- Call the interactions guide action once, then `create_interaction` per rebuilt interaction. Scope to the component when the target lives in a component definition; otherwise page or site scope with `[pageId, elementId]` targets.
- Name in sentence case: "Reveal cards on scroll", "Open mobile menu".
- Add `conditionalPlayback` for reduced motion.
- Verify each one in Preview or on the published page. A successful write is not proof it animates.

### 7. Remove the legacy interactions

The API cannot delete Classic interactions. In the Designer, open the Interactions panel, remove every legacy trigger from its elements and delete the legacy animations, then confirm the runtime dump returns no events. Check that the element's resting styles are still correct once the Classic initial state no longer applies (the Classic engine set them; the native FromTo now must).

## Report

List every legacy event with its mapping outcome: rebuilt natively (interaction id), rebuilt differently (why), or needs a person (navbar, dropdown, scroll-direction). Note anything whose resting appearance changed and had to be corrected with styles.
