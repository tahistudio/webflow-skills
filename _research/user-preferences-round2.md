# Round-two answers (22 Sep 2026) — confirmed rules

## Shared core
- Dev marker: suffix ` (dev)` on components and component props only. Never on pages.
- Figma snap tolerance is proportional, not absolute: 140px vs 145px → snap; 8px vs 13px → do not. Rule of thumb: snap when the difference is roughly ≤4px for small values or a small percentage for large values (propose ~5–10% and confirm). "Close enough" judgement.
- Lighthouse targets: ≥80 mobile, ≥90 desktop. Nice-to-have, not a gate.

## Lumos
- Custom elements (DOM element with tag) only where a normal element blocks needed attributes (class attribute, list order, style…). Use `div` or whatever tag is most natural there.
- Closed sections (FAQs, CTA, Testimonials, Banner in Giant Group) are examples, not a standard. Judgement call per section with a slight lean to OPEN.
- Add a custom utility class whenever something might recur or has recurred multiple times — prefer utility-forward over custom-forward.
- Stock baseline site: "Lumos 2.2.3" (site_id 6996a19da4278634fbc7976d) cloned fresh for out-of-the-box comparison.

## Client-First
- Template Relume-style-guide fork: "Tahi Template Style Guide" (site_id 685a8de8d94de8e829e633c4, tahi-template-style-guide.webflow.io).
- Relume sections: strip ALL IX2 and rebuild motion in GSAP-native interactions.
- Native components: class `component-name_component`, Webflow component "Component Name". Prop groups similar to Lumos (Settings: Visibility, ID…). Classes prop only on client sites; templates get nothing hyper-technical.

## Client Site
- JSON-LD: fixed schema per page type, populated from CMS fields where possible. Goal: valid + boosts rankings/visibility.
- No tablet/mobile frames in Figma → AI decides from judgement and visual feedback; do not stop to ask.

## Templates (all Client-First, none submitted yet)
- Larkstone Campground (68920498eac06888f67a1f16, larkstone-campground.webflow.io) — closest to done. **First calibration QA pass runs on this one.**
- Loom & Ember (6a996fd01e6bc8438710938d, loom-and-ember.webflow.io) — ecommerce template.
- Marrow Interiors (69d631999fa473d5a63716b0, marrow-interiors.webflow.io) — template; runs IX2 (223 events).
- Prism Productions (69b0313cea62bd29824d8385, prism-productions.webflow.io) — template.
- Goal: ship these 4 with the Template skill.
- Nexus Law Template — abandoned by another dev; reference only.
- TechPulse (687617b6949067ae2d31eeff, techpulse-summit.webflow.io) — free one-page cloneable; template rules + some client allowances. Future "cloneables" skill.

## Skill set agreed
1. tahi-webflow-core (shared groundwork)
2. lumos (extends official lumos-skill with Webflow-side workflow)
3. client-first
4. client-site (Figma + blank project → full build + QA)
5. template (build + Marketplace QA)
6. ix2-to-gsap (migration helper)
Future: cloneables.
