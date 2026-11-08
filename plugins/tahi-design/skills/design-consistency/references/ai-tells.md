# AI and template tells

A tell is a choice that makes a site read as generated or off-the-shelf. Most tells started as good ideas; they became tells by being used everywhere, by default, without a reason. That is the test for every item here: **did someone decide this for this client, or did it arrive by default?** A tell the brand genuinely calls for can stay; write down why.

Removing tells is half the job. A page with every tell stripped out and nothing put in their place is empty, and that reads as generic too. Each "instead" below replaces the default with a decision, usually one taken from the client's own material: their product, place, people, numbers, history.

Untagged items apply at every craft level. Deeper checks carry `[C2]` or `[C3]`.

## Contents

1. Visual
2. Layout
3. Typography
4. Copy
5. Imagery
6. Motion
7. Interaction
8. Proof and trust
9. The fresh-eyes review

## 1. Visual

| Tell | Instead |
|---|---|
| Purple-to-blue (or violet, indigo, neon) gradients on the hero, buttons or text | A palette from the brand and its world. Flat fields of colour. If a gradient is part of the brand, use it once, on purpose. |
| Gradient blob or glow behind the hero | A real image, a field of solid colour, or type set large enough to carry the screen. |
| Glassmorphism everywhere: blurred translucent cards, frosted nav, glass buttons | Opaque surfaces one tone step from the background. Blur only where something genuinely floats over moving content. |
| Soft grey drop shadow under every card | A tone step between surfaces, or no box at all. Shadows only on things that float. |
| One medium radius (12 to 16px) on everything | Decide the site's character once: square, soft or round. Inner radii smaller than outer. |
| Near-black page with one neon accent and glows | A dark palette with real tonal steps and an accent from the brand; no glow. |
| Cream background with terracotta or rust accent as the shortcut to "warm and editorial" | Warmth from the client's actual materials, photography or brand colours. |
| [C2] More than one accent colour fighting for attention | One accent, on the primary action and at most one other emphasis. |
| [C2] Warm and cool greys mixed on one page | One neutral ramp, tinted one way. Run the drift audit. |
| [C2] Decorative dot grids, noise, mesh and abstract shapes filling empty space | Fill space with scale, content or a picture; or leave it empty on purpose once per page. |
| [C3] Pure `#000` on pure `#fff` everywhere, no tonal depth | Off-black and off-white from the neutral ramp; a deliberate surface step. |

## 2. Layout

| Tell | Instead |
|---|---|
| Centred hero: small pill badge, headline, subhead, two buttons (filled and ghost), screenshot below | A hero composed for this client: left-anchored, media-led, type-led or split. One primary action; the secondary as a text link if needed. |
| Three-card feature grid with an icon in a rounded square on each card | Fewer, larger points with real images or product detail; a split layout; a list; a single strong statement. If there really are three equal things, give them a composition that is not three boxes. |
| Bento grid of rounded tiles as the default feature section | Use a bento only when the content is genuinely tiles of different weight, and make the sizes mean something. |
| Every section the same height, same padding, same centred stack | Section rhythm from `design-consistency` section 2: three spacing steps, neighbours that differ in composition. |
| Stock section order: hero, logo strip, features, testimonial, pricing, CTA | Order sections by the argument the page makes to its audience. Delete sections with no claim. |
| Perfect symmetry everywhere | One grid, used asymmetrically: offset columns, mixed media ratios, large things running to the edge. |
| Everything centred | Left-aligned by default; one centred moment per page at most. |
| Logo strip of greyed-out logos directly under the hero, regardless of whether they are real or meaningful | Proof placed next to the claim it supports, with names the audience recognises (see section 8). |
| [C2] Eyebrow label above every heading ("OUR SERVICES", "WHY US") | Put the information in the heading, or drop it. An eyebrow used once, with real information, is fine. |
| [C2] Index numbering on everything (01 / 02 / 03) when the order means nothing | Numbers only where order matters, in a real ordered list. |
| [C2] Floating pill-shaped navigation with blur | A plain bar: logo, a few links, one action. |
| [C2] Footer link farm of four columns of links nobody uses | A footer that closes the page: contact, the few useful links, legal, the name. |
| [C3] The first screen is distinctive, then every section below is a stock block | Carry the idea through pricing, FAQ and footer. |

## 3. Typography

| Tell | Instead |
|---|---|
| Inter (or one default system sans) for everything, at regular and bold only | A typeface chosen for the brand. If the brand uses a common sans, give it character through scale, weight range and tracking. |
| Headline as a whole sentence over three or four lines at display size | A short headline (about five to eight words); the rest in the supporting line. |
| One word of the headline in a gradient, italic serif or highlight colour | One face, one colour; the words carry the emphasis. Use it only if it is a brand device used consistently. |
| Nine nearly equal font sizes | The type scale. Five visible sizes, clearly apart. |
| Tiny uppercase letter-spaced labels scattered around | Sentence case at a readable size, placed with what it describes. |
| Title Case On Every Heading | Sentence case, unless the brand's style guide says otherwise. |
| [C2] Grey body text on white that fails contrast and reads unfinished | Running text in the full text colour; muted only for secondary notes, still passing 4.5:1. |
| [C3] Orphans, widows, bad rag, unhung quotes, default tracking on large type | `text-wrap: balance` on headings and `pretty` on paragraphs; tighter tracking on display sizes; hanging punctuation where supported. |

## 4. Copy

| Tell | Instead |
|---|---|
| "Unlock", "Elevate", "Seamless", "Supercharge", "Empower", "Effortless", "Next-gen", "Cutting-edge", "Game-changer", "Revolutionise", "Unleash" | Plain verbs describing what the client actually does. "We build Webflow sites for NZ law firms", not "Elevate your digital presence". |
| "Not just X, it's Y" and three-part slogans ("Fast. Simple. Powerful.") | One specific claim with its proof. |
| Generic buttons: "Get started", "Learn more", "Discover more" | Name the action: "Book a call", "See pricing", "Read the case study". |
| "Welcome to our website" or "We are passionate about..." | Lead with what the visitor came for. |
| Emoji bullets and emoji in headings | Words, real icons from one consistent set, or nothing. |
| Lorem ipsum or obviously filler copy in a review build | Real or realistic draft copy, marked for the client to confirm. |
| [C2] Exclamation marks in UI messages; "Oops!" errors | Calm, direct messages: "That email looks incomplete." |
| [C2] Every paragraph the same length, every heading the same shape | Vary with the content. Some sections need one line. |

Tahi's own wording rules live in `tahi:tahi-brand-voice`; client copy follows the client's voice.

## 5. Imagery

| Tell | Instead |
|---|---|
| Generic 3D illustrations (glossy blobs, floating isometric devices, clay characters) | The client's own photography, product, place and people. If nothing exists, plan a shoot or use type and colour. |
| Stock photos of diverse teams laughing at laptops, handshakes, people pointing at screens | Real team and client photos, even if simpler. Candid beats posed. |
| AI-generated images with the giveaways: waxy skin, extra fingers, warped text, impossible light | Real photography. If generated imagery is used, it is art-directed, checked at full size and never presented as real people or real places. |
| Fake product dashboard in the hero made of grey bars and donut charts | A real cropped interface, or no interface. |
| No real photography anywhere on the site | At least the hero, the team and one piece of real work or place. |
| Icon in a coloured circle for every point | Icons only where they help scanning; one consistent set and stroke width. |
| [C2] Mixed image treatments: some rounded, some square, different crops and colour grades | One treatment for the site: ratios, corners, grade. |
| [C2] Same avatar or same stock photo reused across different people or pages | Every person has their own image or none. |
| [C3] Images placed, not art-directed: faces cropped at the eyes on mobile, focal point lost | Art-direct crops per breakpoint (`object-position`, `<picture>` sources, or Webflow focal point). |

## 6. Motion

Motion rules live in `tahi-design:site-animator`. The tells:

| Tell | Instead |
|---|---|
| The same fade-up on every element, every section, same timing | Choreography by hierarchy; most elements do not animate at all. |
| Everything animates on load, nothing can be read for two seconds | The first screen is readable within the first frame; motion supports it. |
| Bounce and elastic easing on UI | The project's easing tokens. |
| Infinite pulsing dots, floating shapes and loops that mean nothing | Ambient motion only within the level's limits and with a purpose. |
| Scroll-jacked smooth scroll on a site that is not level 3 | Native scrolling. |
| [C2] Reveals that fail and leave a blank band when a script is slow | Content visible by default; the hidden state only applies once the script is ready. |
| [C3] Hover lift and shadow on every card | One consistent, small response; most cards do not need one. |

## 7. Interaction

| Tell | Instead |
|---|---|
| Buttons and links with no hover, focus or pressed state | Every control has its full set of states (see `tahi-design:design-qa`). |
| Default browser focus ring removed with nothing in its place | A visible focus ring in `--color-focus`, 3:1 contrast. |
| Buttons linking to `#` | Real destinations, or the button is not there. |
| Accordion FAQ by default, even with three questions | Show short answers; use an accordion when there are many. |
| [C2] Carousel of three testimonials with dots | One strong quote, or a set shown at once. |
| [C2] Modals for everything | Inline expansion or a dedicated page. |
| [C2] Cookie banner, chat bubble, newsletter pop-up and sticky bar all at once on first load | One interruption at most, never over the first headline. |

## 8. Proof and trust

| Tell | Instead |
|---|---|
| Testimonials with first name only, a stock headshot and five gold stars | Full name, role, organisation and a real photo, with permission. Quotes that say something specific. |
| "Trusted by 10,000+ teams" with no source | Real numbers with a source, or none. Tahi copy goes through `tahi:tahi-evidence-check`. |
| Logo wall of famous brands with no real relationship | Only logos the client has permission to show. |
| Round, too-perfect stats (99.9%, 10x, 500+) | The real figure, with what it measures and when. |
| [C2] Awards, badges and certifications as a decorative strip | Placed where they answer a doubt, linked to the source. |

## 9. The fresh-eyes review [C3]

Do this once per template page before the client sees it.

1. Take full-page screenshots at 1440 and 390.
2. Look at them as if they were a competitor's site. Do not read the code.
3. For each section ask: which tell is this? What did someone decide here?
4. Name the one thing on the page that belongs only to this client. The competitor test: swap in the nearest competitor's name. If the page still works, it has no idea yet.
5. List the three weakest sections and fix those first. Stop after three rounds.
