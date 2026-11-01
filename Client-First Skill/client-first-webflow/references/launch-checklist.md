# Client-First launch checklist

Finsweet's launch checklist for delivering a launch-ready Webflow project, adapted for agent use. Run it after the build QA (core checklist and Client-First pre-flight), before handoff or go-live. It applies to client sites; templates follow the Marketplace rules instead, and the last column says how an item changes for a template.

Columns:

- **Pri**: I important, R recommended, O optional (Finsweet's rating).
- **Where**: D Designer, PS project settings, Pre before launch, Post after launch.
- **Check**: API (the Webflow MCP can verify or fix it), VISUAL (browser, Preview or device), MANUAL (a person in settings or an external tool).
- **Template**: what to do on a Marketplace template. "same" means it applies unchanged.

Report each item PASS, FAIL (with evidence), NEEDS VISUAL or MANUAL, as in the core QA format. Do not publish, connect domains or change hosting unless the user asks.

## General

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Favicon added | I | PS | MANUAL | same; custom, matches the template |
| Webclip added | I | PS | MANUAL | same |
| Client's local time zone set | I | PS | MANUAL | skip |
| Language attribute set to the client's language | I | PS | MANUAL | same (site language) |
| Webflow branding and badge disabled | I | PS | MANUAL | skip; templates need "Powered by Webflow" in the footer |

## Publishing

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Webflow hosting added | I | PS | MANUAL | skip |
| Minify HTML, CSS and JS | I | PS | MANUAL | minify CSS required |
| SSL enabled | I | PS | MANUAL | skip |
| Required 301 redirects set (old URLs from the previous site) | I | PS | MANUAL | skip |
| Custom domains added, root and www both present, one set as default (usually www) | I | PS | MANUAL | skip |
| Sensible staging URL (`client-name.webflow.io`) | I | PS | API (site info) | same |
| "Use secure frame headers" on | I | PS | MANUAL | skip |
| "Per page CSS" on | I | PS | MANUAL | default |
| "Asynchronously load JS" on where nothing breaks | I | PS | MANUAL + VISUAL | default |

## Forms

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Success and error states styled | I | D | API + VISUAL | same |
| Every form has a unique, meaningful name | I | D | API | same |
| Fields clearly named | I | D | API | same |
| No duplicate field names or IDs | I | D | API | same |
| Fields have focus states | I | D | API + VISUAL | same |
| Spam protection on | I | PS | MANUAL | default |
| reCAPTCHA if needed | O | PS | MANUAL | skip |
| Notifications: client email, subject, reply-to, email template | I | PS | MANUAL | must stay empty |
| Test submissions on the published site | I | PS | MANUAL | same on staging |

## Fonts

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Custom uploaded fonts, WOFF2 preferred (gets `font-display: swap`); convert with transfonter.org | I | PS | MANUAL | not allowed; Google or OFL fonts only |
| Unused fonts removed | I | PS | API (fonts) + MANUAL | same |
| Font subset to cut file size | R | PS | MANUAL | skip |

## Apps and integrations

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| GA4 tracking added | I | PS | MANUAL | not allowed |
| Other integrations per client (Meta Pixel, Maps, Hotjar, HubSpot) | O | PS | MANUAL | not allowed |
| Consent Pro or the client's CMP, ideally through Google Tag Manager | I | Pre | MANUAL | not allowed |
| All integrations working | I | Pre, Post | MANUAL | n/a |
| CMP tested with Google Tag Assistant | I | Post | MANUAL | n/a |

Tracking and consent live in site head with a dated comment (core placement rules).

## SEO

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Meta title and description on every page; title pattern consistent (`Webflow Services \| Brand`, `Post Title \| Blog \| Brand`); title 50 to 60 characters, description 150 to 160 | I | D | API | same; home title has the fixed Marketplace format |
| Open Graph image on every page, 1200 by 630, PNG or JPG | I | D | API | same |
| Unwanted pages drafted or deleted | I | D | API | same |
| Unwanted pages excluded from the sitemap (page setting "Sitemap indexing" off) | I | D | API + MANUAL | utility pages noindex |
| Proper slugs on static and CMS pages | I | D | API | same |
| Unused or blank CMS template pages unpublished | I | D | API | same |
| Schema on key pages (Home, Product, Contact or Book Demo; Blog, Author, News, Article, Report templates) | I | D | API | not allowed |
| FAQ structured data on FAQ components | I | D | API | not allowed |
| No broken or empty links (check with Ahrefs or a dead link checker; the "Highlight empty links" Global Styles snippet shows them in the Designer) | I | D | API + MANUAL | same |
| Semantic HTML for headings and wrappers | I | D | API | same |
| No errors in the Webflow Audit panel on any page | I | D | MANUAL | same |
| Google Search Console verification, verification key preferred | I | PS | MANUAL | skip |
| Global canonical URL set | I | PS | MANUAL | skip |
| robots.txt set if pages must be blocked (`User-agent: *`, `Disallow: /path`, `Sitemap: https://www.domain.com/sitemap.xml`) | I | PS | MANUAL | skip |
| Auto-generated sitemap on | I | PS | MANUAL | default |
| Webflow subdomain indexing disabled | I | PS | MANUAL | skip |
| Search Console errors fixed | I | Post | MANUAL | n/a |
| New sitemap submitted, old one removed | I | Post | MANUAL | n/a |
| Re-indexing requested | I | Post | MANUAL | n/a |

Tahi rule on schema: JSON-LD always goes in the page settings schema field (CMS templates included), never in head or body custom code. Finsweet recommends microdata for FAQs; either is acceptable, but use one method per page and never mark the same FAQ up twice.

## AEO (answer engines and AI agents)

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Schema on key pages and FAQ structured data (as in SEO) | I | D | API | not allowed |
| `llms.txt` uploaded (Webflow site settings supports it) | I | Pre | MANUAL | skip |
| robots.txt does not unintentionally block AI crawlers (GPTBot, Claude-Web, PerplexityBot) | I | Pre | MANUAL | skip |
| All markup passes Google's Rich Results Test and the Schema.org validator | I | Pre | MANUAL | n/a |
| Site checked with isitagentready.com | R | Pre | MANUAL | skip |

## CMS

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Open Graph image field where template pages need it | I | D | API | same |
| Meta title and description fields where needed | I | D | API | same |
| Empty or unwanted collection templates unpublished | I | D | API | same |
| Help text on fields that need it | I | D | API | same |
| Fields grouped where possible | R | D | API | same |
| Empty state on every Collection List | I | D | API + VISUAL | same |

## Performance and optimisation

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Every image has explicit width and height or an aspect ratio (prevents CLS) | I | D | API + VISUAL | same |
| Every asset compressed (tinypng or Webflow's compression); Lottie JSON converted to dotLottie | I | D | API (asset sizes) | same; under 150 KB each, site under 10 MB |
| Unused classes removed | I | D | API + MANUAL (Clean Up) | same |
| Unused interactions removed | I | D | API | same |
| Scripts in page or site settings use `async` or `defer` (remove if the script breaks) | I | D, PS | API (scripts) | no scripts allowed |
| Unused JavaScript and custom code removed or disabled | I | D, PS | API + MANUAL | no custom code allowed |
| Page-only code stays on that page, never global | I | D | API | n/a |
| Images in the first section of every page load eagerly | I | D | API | same |
| Final scan of custom code in head and before `</body>` | I | PS | MANUAL | must be empty except the allowed exceptions |
| Font subset (as in Fonts) | R | PS | MANUAL | skip |
| Per page CSS and async JS (as in Publishing) | I | PS | MANUAL | default |
| No horizontal scroll at any width | I | Pre | VISUAL | same |
| PageSpeed Insights, Lighthouse or GTmetrix run; suggested SEO, accessibility and performance fixes made | I | Pre | MANUAL | same |
| GTmetrix detailed analysis (feed the data to an AI chatbot to pinpoint issues) | R | Pre | MANUAL | optional |

## Mobile

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Unnecessary interactions disabled on tablet and mobile | I | Pre | API + VISUAL | same |
| Checked on Android phone and tablet, bugs fixed | I | Pre | VISUAL | same |
| Checked on iPhone and iPad, bugs fixed | I | Pre | VISUAL | same |
| Text readable on mobile: body 16px, small text 14px minimum | I | Pre | API + VISUAL | same |
| Buttons easy to tap on touch devices (at least 44px targets) | I | Pre | VISUAL | same |

## Browsers

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Chrome and Edge | I | Pre | VISUAL | same |
| Safari | I | Pre | VISUAL | same |
| Firefox | I | Pre | VISUAL | same |

## Accessibility

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Alt text on every image in the Assets panel (the client can supply descriptions; AI alt-text generators work in bulk) | I | D | API | same |
| ARIA where needed: `role="button"` with `tabindex="0"` on non-button elements acting as buttons, `role="link"` on divs acting as links, `aria-label` on links without text | I | D | API | same |
| `aria-label` on links without visible text (social icons, image links); find them with PageSpeed Insights and the Audit panel | I | D | API | same |
| Hover-only effects removed or neutralised on touch devices | I | D | API + VISUAL | same |
| Keyboard focus state set up | I | D | API + VISUAL | same |
| Buttons, links, accordions and inputs all have focus states | I | D | API + VISUAL | same |
| Finsweet Accessibility Attributes script in site head (`@finsweet/attributes-a11y`, `defer`) | R | D | API | not allowed |

Note: Finsweet's checklist writes `aria-role`; the real attribute is `role`. Use `role`, and do not add a role a tag already provides.

## Organise

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| 404 and password pages match the design | I | D | VISUAL | same; both branded |
| Assets organised into folders in the Assets panel | I | D | MANUAL | same |
| Complete style guide matching the design: fonts, colours, buttons, extra utilities | R | D | API + VISUAL | required |
| Components grouped in the Components panel, names matching groups (`Group / Identifier`) | I | D | API + MANUAL | same |

## Training and handoff

| Item | Pri | Where | Check | Template |
|---|---|---|---|---|
| Client helped to add guests or team members | R | PS | MANUAL | n/a |
| Knowledge transfer recorded (Loom tutorials on editing pages, components and CMS) | I | Pre | MANUAL | Start Here page instead |

## Agent notes

- Most PS and Post items are outside the MCP. List them for the user with the exact setting location instead of guessing their state.
- The Audit panel does not look inside components, lightboxes or CMS-bound images; check those by hand.
- Never connect domains, change hosting, publish, or submit sitemaps on your own. These are the user's actions.
