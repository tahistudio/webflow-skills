# Open questions — tahi-design plugin

House preferences the `tahi-design` skills had to assume. Each has the default now written into the skills and why. Answer any of them and the relevant skill gets a one-line edit.

1. **Spacing scale base and steps.** Default: 4px base, steps 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, named by index (`--space-1` to `--space-11`). Why: common, divides cleanly, works with Lumos and Client-First style scales. Does Tahi already have a house scale or naming (for example size names like `small`, `medium`) that Lumos or Client-First projects should keep instead?

2. **Section spacing steps.** Default: three fluid steps, `section-sm` 48 to 80px, `section-md` 64 to 128px, `section-lg` 96 to 160px. Why: three is enough for rhythm without inviting one-offs. Are these close to what Tahi designs use, and should the names match Client-First's `padding-section-small/medium/large`?

3. **Token naming across Figma, CSS and Webflow.** Default: `group/role/modifier` in Figma, `--group-role-modifier` in CSS, `Group / Role Modifier` folders in Webflow (for example `color/text/muted`, `--color-text-muted`, `Color / Text Muted`). Why: one name in three spellings. Should this be reconciled with whatever `tahi:tahi-figma` and the Lumos and Client-First variable conventions already use, and which one wins if they differ?

4. **Snap tolerance lives in two places.** Default: `design-consistency` restates the tolerance from `tahi-webflow:tahi-webflow-core` (4px or about 5 percent, whichever is greater). Why: the cross-stack skill needs it and I could not edit webflow-core. Should the rule move to `design-consistency` only, with webflow-core linking to it?

5. **Default radius character.** Default: "soft" (4, 8, 16px plus full) as the starting token set, with a rule to choose square, soft or round once per site. Why: soft suits most client work; it is a starting point, not a house look. Does Tahi have a preferred default?

6. **Drift audit thresholds.** Default healthy ranges: 5 to 8 font sizes, 1 to 2 families, 4 to 6 neutrals (flag above 7), 2 to 4 radii (flag above 5), 0 to 3 shadows, zero off-scale spacing. Why: typical of well-run design systems. Are these the right bars for craft 2, and should craft 3 be stricter?

7. **Motion token values.** Default: durations 150, 250, 500, 800ms; easings ease-out `cubic-bezier(0.22, 1, 0.36, 1)`, ease-in-out `cubic-bezier(0.65, 0, 0.35, 1)`, ease-in `cubic-bezier(0.32, 0, 0.67, 0)`; travel 8px and 24px; stagger 70ms. GSAP equivalents `power4.out`, `power2.inOut`, `power2.in`. Why: sits inside webflow-core's 150 to 800ms range and maps to named GSAP eases Webflow's panel offers. Does Tahi have house curves it already uses in Webflow interactions?

8. **Reduced-motion mapping.** Default: level 3 and 2 drop to 1 with no travel; level 1 drops to 0. Why: the brief said drop one or two levels rather than switch off; this keeps crossfades for orientation and removes all movement, which is what vestibular sensitivity needs. Is dropping level 2 and 3 to the same place right, or should 3 drop to 2 with travel removed?

9. **On-site motion toggle.** Default: required at motion 3, recommended at motion 2 for accessibility-sensitive audiences, stored in `localStorage` under `tahi-motion`. Why: level 3 sites carry the most motion. Should Tahi ship a standard toggle component (Webflow component and code version) so it looks the same on every site?

10. **Motion budget numbers.** Default: level 1, one reveal group per section; level 2, one stagger group or two reveals per section, one signature per page, at most one marquee, two counters and two parallax images per page; level 3 adds one choreographed page transition, one split headline, magnetic on one or two actions. Why: makes "rationed" concrete and checkable. Are these the right limits?

11. **Where the motion level is set in Webflow.** Default: a `data-motion` custom attribute on the Body element, mirrored as a `--motion-level` variable. Why: one place every script and interaction condition can read. Is there a better Webflow home for it (site settings, a Global Styles component)?

12. **Webflow interactions and variables.** Default: the skill says interactions take typed values, so the motion token table goes on the Style Guide page and values are typed in, with a note to check whether binding variables has become possible. Why: I could not confirm variable binding in the GSAP interactions panel. Can someone confirm current behaviour?

13. **Shared motion script on Webflow.** Default: `tahi-motion.js` is for code builds; Webflow builds use native interactions only, per webflow-core. Why: webflow-core says no custom GSAP unless asked. Should the script be an allowed exception for level 3 Webflow sites (registered script), or stay code-only?

14. **Smooth scroll default.** Default: Lenis only at motion 3 and only when the choreography needs it, off under reduced motion and on touch by default. Why: smooth scroll is the most common source of scroll-feel complaints. Does Tahi want it on by default for level 3 sites, or Webflow's native smooth-scroll setting instead of Lenis on Webflow builds?

15. **QA widths.** Default: craft 1 checks 1440, 1280, 768, 390; craft 2 adds 1366, 1180, 1024, 992, 991, 834, 767, 480, 430, 375, 360; craft 3 adds 1920, 1600, 820, 320 and 200 percent zoom. Why: covers Webflow's breakpoint edges and the common devices. Is 1180 or 1366 more useful for Tahi's clients' audiences, and is 360 enough as the small-phone floor at craft 2?

16. **Dark mode tag.** Default: the dark mode pass is written as "only if the site has dark mode or themes", untagged. Why: the tag list in `tiers.md` has no themes flag. Should `tahi-core` add `[if:themes]` (or `[if:dark-mode]`) to the tag syntax and the profile's features list?

17. **Where design QA findings live without the dashboard.** Default: `docs/qa/design-qa-YYYY-MM-DD.md` with screenshots in `docs/qa/shots/`. Why: keeps the project folder the engineering truth, per `tahi-core:tahi-project`. Is that the right path, and should screenshots be committed or kept out of git?

18. **Severity for client-visible rounds.** Default: blocker, major, minor, polish, written into each dashboard comment body as `[Major] …` because the QA comment tool has no severity field. Why: the brief named those four. Should the dashboard get a severity field so rounds can be filtered by it?

19. **Industry defaults for motion.** Default: finance, health, legal, government and older audiences at motion 1; SaaS, hospitality and most client work at 2; agency, fashion and launches at 3; government services and accessibility-sensitive audiences 0 to 1. Why: from the brief, extended to the other industries in `references/industries.md`. Any sectors where Tahi's experience says otherwise?

20. **Third-party anti-slop skills.** Default: `design-consistency` mentions `design-taste-frontend` and `redesign-existing-projects` as optional extras and does not depend on them. Why: teammates will not have them installed. Should Tahi vendor any of their checks (for example a lint for banned copy words) into this plugin?
