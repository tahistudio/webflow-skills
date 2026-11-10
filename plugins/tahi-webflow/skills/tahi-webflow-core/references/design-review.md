# Design review: five patterns that make a site sell

Use these when we design (templates, the starter, sections with no design source) and when we review a design or a build before handoff. They are strong defaults, not laws. On a client site the approved Figma design decides: if it breaks a pattern, build it as designed and flag the pattern in the report with a one-line suggestion. Break a pattern on purpose when there is a clear reason, and say what the reason is.

## 1. The mirror test (copy on the first screen)

The right visitor should land and feel they are looking in a mirror: their problem, their world, a clear sign they are in the right place. The first screen (hero) answers three questions:

1. **Who is this for?** Name the person or business, not the category. "Create a web page for your business" beats "Businesses grow faster online".
2. **What do I get?** The outcome, not the feature. "Fill your calendar without answering DMs", not "AI-powered scheduling".
3. **What do I do next?** One primary call to action with a specific verb ("Book your free call"). A secondary link is fine; two equal buttons are not.

Also:

- Match the headline's key word to the words customers search with (from the client, Search Console, or keyword research). One matching word can lift sign-ups.
- Images show the visitor's world (their trade, their customers, the real product), never generic stock handshakes.
- On a client build, write these three answers down in discovery and check the hero against them. On a template, the hero copy must pass the test for the template's niche.

## 2. The highlighter rule (one accent, 60-30-10)

Colour is a highlighter. Highlight one thing and it is found in two seconds; highlight everything and nothing stands out.

- One accent colour (in our variable system: Brand/CTA, or the brand colour when there is no separate CTA colour) goes on the things we want clicked: primary buttons, key links, the booking link. It does not go on headings, icons, borders and backgrounds as decoration.
- Proportions, roughly: 60% main (backgrounds: Theme Background), 30% secondary (structure: text, nav, cards, section blocks), 10% accent (calls to action).
- Bind the accent through the Theme tokens (Button Primary, Link), so the rule is enforced by the system, not by memory.
- Allowed exceptions: a brand-led section (a coloured CTA band, a highlighted pricing tier) or a brand whose identity is a strong colour. Keep the button visibly different from the accent surface around it.
- Review check: squint at each screen. If the eye does not land on the primary action first, too much is highlighted.

## 3. Front, middle, back (depth)

Flat pages, where every box, image and button sits on the same level, read as cheap because the eye has nowhere to start. Think of a stage:

- **Back:** something real behind the content: a photo of the work or product, a soft shape, a block of colour that sets the mood. Not an empty white box.
- **Middle:** the content: headline, text, cards.
- **Front:** the one thing we want them to do, lifted with a soft shadow (Shadows collection) so it sits above everything else.

Techniques: let one card or image break a section edge (hang into the next section) so the page is not a stack of boxes; overlap text and image edges deliberately; keep shadows for what matters, not every card. Check that nothing in front covers the primary button at any breakpoint.

A heuristic, not a requirement: plain, flat sections are fine where the design calls for them (utility pages, dense content, legal pages).

## 4. Motion with a job

Motion is the fastest way to make a site feel premium and the fastest way to make it feel generated. Every animation has one job: show the product, point the eye to the next step, or confirm something that just happened. No job, or five jobs, and it goes.

- **One thing moves per screen.** Pick the product, the result or the before-and-after; keep the rest still.
- **Never make them wait for the words.** The first screen's headline, text and button are readable immediately: no fade-in, fly-in or word-by-word reveal above the fold. Reveals start further down the page.
- **Give an off switch.** Honour `prefers-reduced-motion` (conditional playback); on motion-heavy sites add a visible motion toggle if the design allows.
- Exception: when motion is the product or the point of the site (a motion studio, an immersive launch page), heavy motion is the job. Say so in the report and still keep the first screen's words readable and reduced motion honoured.

## 5. The free sample (an interactive tool)

Give visitors a taste of the result before asking for anything: a price estimator, a short quiz that picks the right service, a useful tool (converter, checker, visualiser). People value what they help make, so a finished tool converts well.

- In client discovery, ask: what does every customer ask before they buy? Could a small tool answer it?
- If it can be done well, recommend it, and build it where it fits: native forms and CMS first, then Finsweet Attributes or a small, owned script.
- Use sparingly: one or two per site, not per page. Keep it short enough that people finish it.
- Templates cannot ship one that needs custom code (Marketplace rule). A native-only version (for example a multi-step form that routes to the right service page) is fine.

## How to use this file

- **Designing** (templates, starter, sections without a design): apply all five as defaults.
- **Building from Figma:** build as designed. In the section or page report, list any pattern the design misses with a one-line suggestion. Do not change the design without the user's agreement.
- **Reviewing** (QA, audits): add a "Design review" block to the report: one line per pattern, PASS, FLAG (with the suggestion) or N/A (with the reason).
