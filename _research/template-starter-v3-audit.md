# Final audit: Tahi Template Style Guide (Client-First V3 template starter)

Site 685a8de8d94de8e829e633c4. Auditor agent claude-sonnet-5-5|claude-code|a7f3q. Audited live through the Webflow MCP against the skill files (finsweet-client-first-v3.md pre-flight, class-reference.md, components-and-structure.md, submission-checklist.md, utility-pages.md, core SKILL and qa-checklist). Nothing published. No variables changed, no components deleted, no pages deleted. Working files in `final/` (vars.json, styles.json, styles_props.json, sg_raw.json, start_here_*.json).

## Short answers to the owner's questions

1. **Is this now Client-First V3?** Yes in structure, naming, variables and utilities. It is a faithful V3 build with template overrides. It is not a pixel-perfect V3: seven deviations remain (section vertical padding on a wrapper instead of on the section, component names without the `Group / ` prefix, about 25 helper classes with no underscore, tag styles routed through the Font Styles extension, some tokens bound to the wrong group, 17 unused V2 style guide classes, and `spacing-clean` missing). See the gaps list.
2. **Nothing missing?** Missing or incomplete: `spacing-clean` and `text-style-2lines/3lines` utilities, OG images on 8 of 9 pages, an image logo, real links instead of `#`, a complete Licenses page, meaningful form names, and any section-level components (hero, features, FAQ and so on).
3. **Good use of components?** The Button system is good and follows the core skill closely. Nav, Footer and CTA are sound but thin closed components. As a template starter the component set is too small and has no open (slot based) components and no sub-component variants. Detail in section C.
4. **Should templates have a components page?** Yes, as a draft, noindex page in Template Pages, and it should hold an instance of every component including both Template components. Detail in section D.

## A and B. Verdict table

| Area | Verdict | Evidence |
|---|---|---|
| A1 Five collections and groups vs V3 table | PASS | Base (Brand, Neutral, Others, Font Family, Font Weight, Line Height, Letter Spacing, plus Primary Shades and Secondary Shades), Theme (Background, Border, Link, Text, Button Primary, Button Secondary, System, plus Icon), Typography (Body, H1 to H6, Font Size), Layout (Spacing incl. Global Padding, Section Padding), Sizes (Max Width, Container, Grid Columns, Border Radius, Focus, Icon, plus Stroke). Extensions Font Styles and Shadows accepted. All 172 alias targets resolve. |
| A2 Modes | PARTIAL | Theme has Base mode and Dark. Typography, Layout, Sizes have 4 modes. Names are not V3 yet: Base mode, Mobile (L), Mobile, Dark (known manual list). Empty Colors collection still present (known). |
| A3 Variable names | PASS | Every collection, group and variable is Title Case (script check, 0 lowercase words). Not named after colours except the primitive ramps. |
| A4 Semantic not primitive | PARTIAL | Structure classes (nav, footer, cta, section, button content) bind semantic tokens. 79 bindings point at Base primitives, mostly style guide swatches, but also `.tag`, `.tab-link`, `.form_checkbox`, `.form_radio`, `.form_input.is-alternate`, `.button.is-alternate`, `.text-rich-text code`, and utilities `background-color-black/white/cta`, `text-color-black/white`. |
| A5 Right group on right property | FAIL (minor) | Border Radius token used as margin on `.text-rich-text li`, as padding on `.text-rich-text code`, as gap on `.category-filter-menu`. Text tokens used as background or border on `background-color-accent`, `styleguide_*` demo blocks, `form_radio-icon`, `form_checkbox-icon`, `blockquote`, `text-style-quote`. |
| A6 Hard-coded values | PARTIAL | Form success and error messages use hex (#ECFDF3, #027A48, #FEF3F2, #B42318). Rich text tag margins, `ol`, `li`, `figure`, `figcaption` margins are literal rem. `text-weight-*` use literal numbers although Base Font Weight exists. No px font sizes, no vw/vh, no fixed heights. |
| A7 Typography defaults | PARTIAL | Body and H1 to H6 tags are bound, but through the Font Styles extension (mode per tag), which aliases Typography H1 to H6 and Body groups (verified per mode). Values still originate in Typography. Heading and body defaults used with no classes on most text. Style guide title no longer hard-codes Exo (fixed by me). |
| A8 Class naming, underscores, lowercase | PARTIAL | 402 no-underscore classes, 157 custom, 103 combos. No spacer, layer, margin-custom, padding-custom. Custom-intent classes with no underscore: button-wrapper, button-content, button-layout, button-text, button-icon, button-group, tab-link, tabs-menu, tag, slider-arrow, slider-arrow-icon, category-filter-link, category-filter-menu, class-label-column, class-label-row, divider-horizontal, hidden-ui-elements, icon-embed-*, text-style-tagline. `is-centre-*` mixes British spelling. `pointer-events-off` is not a V3 name. |
| A9 Stacking at most 4 | PASS | Max 3 classes on any element (Style Guide scan of 1587 nodes, Home read by eye, components read). |
| A10 No spacing classes on text | PASS | 0 spacing classes on Paragraph, Heading, Link or Button elements in Style Guide, Home, Start Here. Spacing blocks and wrappers used. |
| A11 No custom or spacer classes | PASS | None found. |
| A12 Utility coverage vs class-reference.md | PARTIAL | Present: full margin, padding, gap scales, padding-section incl. top and bottom, container-*, max-width-* incl. full and breakpoint versions, grid-autofit/autofill families and grid-span-full, hide-*, display-*, overflow-*, icon-*, aspect-ratio-*, z-index-*, pointer-events-*, text-* families, heading-style-h1 to h6, theme-dark and theme-light. Missing: `spacing-clean` (new finding), `text-style-2lines`, `text-style-3lines` (known). |
| A13 Core structure on every page | PARTIAL | page-wrapper, Nav before main-wrapper (tag main), Footer after, on Home, Style Guide, Start Here, Licenses, Changelog, 404, Components. Password has Nav and Footer in Body with no page-wrapper or main-wrapper. 404 has no section_ element. Global / Styles absent by design. Section vertical padding: 6 of 8 `section_*` classes have only left and right padding from the variable, and the vertical padding comes from a `padding-section-medium/large/small` div nested inside `container-large`. V3 wants top and bottom Section Padding variables on the section itself. `section_cta` and `section_placeholder` are correct. |
| A14 Semantic tags | PASS | Sections `section` or `header`, main-wrapper `main`, Footer `footer`, native Navbar. |
| A15 One H1 and heading order | PARTIAL | Home, Licenses, Changelog, Start Here, Components: one H1, ordered after my fixes (Start Here, Licenses, Changelog jumped H1 to H3; Components had no H1). Style Guide has 3 H1 (title and two heading demos) and 205 H5 used as class and swatch labels, so it skips levels many times (ten distinct skips reported). |
| A16 Keyboard and focus | PARTIAL | `a` tag, `.button`, `.form_input` have focus-visible outlines bound to System / Focus. Checkbox, radio, tab-link, slider-arrow have none. Outline width and offset are static (known). |
| A17 Component naming `Group / Identifier` | FAIL (minor) | Live names are bare: Nav, Footer, CTA, Section, Core Structure, Button, Button Content (dev), Button Layout (dev), with the group stored separately (Global, Section, Template, Button). The Components page labels them `Global / Nav` etc. but the components themselves are not renamed. Pre-flight says the name is `Group Name / Component Identifier`. Instances do not break on rename. |
| A18 Interaction naming | PASS (n/a) | 0 interactions on the site. |
| A19 Template components | PASS | Template / Core Structure and Template / Section exist, described as do-not-edit, explained on Start Here. Each has instance count 1 (Core Structure only through the draft Base Structure page). |
| B1 No custom code | PASS | Registered scripts 0. Site head holds only the font smoothing CSS. Site footer empty. Page head holds only `<meta name="robots" content="noindex">` on Style Guide, Start Here, Licenses, Changelog, Components, Base Structure. 13 HtmlEmbed elements on Style Guide are inline SVG icons (allowed), and Start Here now has the SVG swap instructions (added by me). |
| B2 No JSON-LD | PASS | 0 of 8 queried pages have schema. |
| B3 Required pages and slugs | PASS | Style Guide, Start Here, Changelog in Template Pages folder; Licenses at `/licenses` root; 404 and Password present. Components in the folder as draft. Base Structure slug `static-template-slug-1752419720852` does not match its name (draft, redundant). |
| B4 Licenses content | PARTIAL | Opening sentence exact. Footer links Licenses on every page. Fonts list now names Montserrat and Open Sans with Google Fonts links (fixed by me). Images and icons still template placeholders: claims "sourced from Unsplash" while the site holds SVG placeholders, `{Icon Set Name}`, `{License Type}`, and a link to a Google search for `{link-to-icon-license}`. No AI-image statement. |
| B5 noindex | PASS | On all utility pages. 404 and Password have none (not required). |
| B6 SEO lengths | PASS | Titles 8 to 45 characters. Descriptions 152 to 158. Home title is `Template Name - Webflow HTML website template`. |
| B7 Open Graph | FAIL | OG title and description copied on all pages. OG image set only on Home. The asset is 3.96 MB (under the 4 MB hard limit, far over the 150 KB target), size in pixels not verifiable by API. The other 8 pages have no OG image. |
| B8 Footer "Powered by Webflow" | PASS | Present in Footer component, links to webflow.com. |
| B9 Components on every page | PASS | Nav and Footer on all 9 pages, CTA on Home and 404. |
| B10 Title Case names | PASS | Variables, groups, collections Title Case. Components Title Case (but see A17). Pages Title Case. |
| B11 Tag styles bound | PARTIAL | body, h1 to h6, a, ul bound to variables. p, ol, li, figure, figcaption, blockquote, label are partly or fully literal. |
| B12 No unused components | PASS | All 8 components have instance count at least 1 (Nav 10, Footer 10, CTA 3, Button 29). Core Structure depends on the draft Base Structure page. |
| B13 No unused styles | FAIL | 17 leftover V2 style guide classes, 0 elements use them: `styleguide_margins`, `styleguide_spacers`, `styleguide_spacing-all`, `styleguide_spacing-directions`, `styleguide_spacing-sizes`, and 12 `stylesystem_*`. Also `padding-global` and `padding-section-top/bottom-*` have no demo left (utility library, acceptable). Style guide combos `is-brand-50` to `is-brand-800` are used. Known undeletable: global-styles, css-styles, duplicate empty container-small. |
| B14 No Classic interactions | MANUAL | IX3 list is empty. Classic cannot be read by API. Check `Webflow.require('ix2').store.getState().ixData` on the published page. |
| B15 Transitions | PARTIAL | `transition-property: all` removed from `.button-content` and `.button` (fixed by me). Still `all` on `.form_checkbox-icon` and `.slider-arrow`. |
| B16 Links | FAIL | `#` links: Home hero buttons (Buy Template, View More), Home inclusion item links, Home page thumbnail links, Button default and Components page Button. 7 demo links on Style Guide have no href at all. Button link props can only hold URL paths (known). |
| B17 Images and alt | PARTIAL | All 13 assets had null alt. Informative ones now have alt (Tahi Logo.svg, Placeholder Image.png, set by me). Other images treated as decorative or placeholders. One Style Guide icon image (asset 624380709031626fc14aee84) points at an asset that no longer exists in the asset list. Only one asset over 150 KB (the OG image). |
| B18 Forms | FAIL | All 5 forms are named "Email Form", fields are "Field", "Checkbox", "Checkbox 2", "Radio 2" and one is blank. Needs Designer. |
| B19 Fonts | PASS | 0 uploaded fonts. Montserrat and Open Sans are Google fonts. |
| B20 CMS | PASS (n/a) | No collections. |
| B21 Branded 404 and password | PASS | 404 snapshot shows heading, message, Go Home button, Nav, CTA, Footer. Password form named "Email Form". |
| B22 Nav logo | PARTIAL | Nav and Footer logo is the text "Logo", not an image file named for the template. |
| Site settings (favicon, webclip, responsive images, minify, notifications, integrations) | MANUAL | Not readable by API. |

## C. Components judgement

Inventory (live): Nav (Global), Footer (Global), CTA (Section), Section and Core Structure (Template), Button, Button Content (dev), Button Layout (dev) (Button group).

What is good:
- The Button follows the core skill exactly: Button wraps Button Content (dev) with six Variants (Primary, Secondary, Alternate, Secondary Alternate, Link, Link Alternate) wraps Button Layout (dev) (Normal, Reversed). Sub-parts carry the (dev) suffix and "Do not place directly on a page". Size variant (Small, Medium, Large), Text, Icon, Link props. Text, Icon and Link props have group and tooltip. Variant colours bind to Theme Button tokens (fixed in phase 3). 29 instances, no stray button classes.
- Nav is built on the native Navbar so the mobile menu works, and is identical on every page. Footer carries Licenses and Powered by Webflow. CTA is a closed, prop driven component (Heading, Text, Button Text, Button Link, all grouped with tooltips) with `section_cta`, a native section, padding from variables, and correct `section > container-large > cta_component` shape. All have descriptions saying where used and how edited.
- Template / Core Structure and Template / Section are correctly described and explained to buyers.

What is weak or missing:
- No open (slot) component exists at all. Every content section on Home, Licenses and the rest is hand-built divs. The core skill says "lean open". There is no Section or Layout shell with a Slot.
- No sub-component variants are exposed. CTA has no Theme (light or dark) or Spacing variant and does not surface the Button variant, so the "decluttering" pattern from the core skill is not used outside the Button.
- Prop gaps: `Icon Visiblity` typo and Size, Variant, Layout, Icon Visiblity have no tooltip or group (known, API cannot set). The Button Icon image prop has no alt text prop (decorative today, but the rule says every image prop gets one). Footer copyright text and the Nav and Footer logo have no props, so a buyer must edit the main component for every rebrand (acceptable for closed components, but a Logo image prop would help).
- Names lack the `Group / ` prefix (A17).
- No form components, so form names cannot be controlled per instance.

Verdict: a good foundation, a thin starter. It is the correct small base for a template build, but it will not let a builder assemble pages from components yet.

Recommended further default components for a template starter (keep to what every template reuses, name per `Group / Identifier`):
1. `Section / Page Hero` with variants Centered and Left, props Eyebrow, Heading, Text, Image and alt, and a Slot named Buttons. Needed on every template and Home currently hand-builds it.
2. `Layout / Section` (open): native section with `Theme` (Light, Dark, Secondary) and `Spacing` (Small, Medium, Large) variants and one Slot named Content. Becomes the shell for every other section and exposes the theme and spacing dropdowns the core skill describes.
3. `Section / Feature Grid` (open): heading group plus a Slot named Items that takes `Card / Feature`, using `grid-autofit-small`.
4. `Card / Feature` (icon or image plus alt prop, heading, text, optional Button) and `Card / Blog Post` or `Card / Team Member` as the first card pattern.
5. `Section / FAQ` using the native accordion pattern or numbered prop groups with Show toggles.
6. `Form / Contact` and `Form / Newsletter` with meaningful form and field names, labels, styled success and error states.
7. Two builder helpers marked (dev): `Theme Switch (dev)` and `Spacing Switch (dev)` so cards and sections expose colour and spacing as dropdowns.
8. Optionally `Section / Logo Strip` and `Section / Testimonials` if the starter is meant to be a marketing site; leave them to each template otherwise.
Do not add pricing, team and so on to the starter itself; add them per template.

## D. Components page

Exists: Components, ID 6ae81c5cb61d7dfda50008ca, `/template-pages/components`, draft, noindex in head, folder Template Pages, SEO title and a 156 character description. Matches the utility-pages.md row exactly.

Recommendation: **yes, templates should have one, kept as a draft noindex page.** Citations:
- `tahi-webflow-core/SKILL.md` Phase 1 step 5: "Build the Style Guide page and the Components page so the system is complete and visible... Components get their own page so they can be dumped there freely."
- `tahi-webflow-core/references/qa-checklist.md` per site: "style guide shows every utility and variable in use; components page holds every component; no unused styles, interactions or components left behind."
- `webflow-template/references/utility-pages.md` placement table: "Components (optional dump page), folder Template Pages, /template-pages/components, Draft, noindex", and Style Guide step 7: "Components: one instance of each, or link to the Components page."
- `client-first-webflow/references/components-and-structure.md` Style guide page: order "utilities, then variables, then components (one instance of each, by group)."
- Practical reason specific to this site: the Template components only stay "used" (Marketplace 2.4, instance count above 0) if an instance lives somewhere. Today Core Structure survives only because of the redundant draft Base Structure page, and Section only because it sits inside Core Structure. Draft pages do not publish, so the buyer never sees them, and it is also where a builder tests a new component before placing it.

What the current page still lacks:
- It does not show the Template components as instances (names and descriptions only), so Core Structure and Section rely on Base Structure.
- It shows one default Button, not the variant and size matrix.
- It has Nav and Footer twice each (page chrome plus labelled demo).
- No spacing between demo blocks (see snapshot), tight heading stack, all headings default tag styles.
- Start Here and the Style Guide do not mention or link to it.
- It lists 5 of 8 components (the two (dev) button parts are fine to omit).

Do next: add Template / Core Structure and Template / Section instances to it, show Button variants, then retire the Base Structure page (the template skill says Base Structure is only for starters without the template components).

## Gaps list, ranked, with who can fix

1. **Placeholder `#` and empty links** (Home hero buttons, inclusion links, page thumbnail links, Button default, 7 null links on Style Guide). Marketplace 7.1. Owner decides targets; MCP can set page links on Link elements, but Button and CTA link props accept only URL paths (known), so use paths such as `/template-pages/style-guide`. MCP plus owner.
2. **Licenses page placeholders** (icon set, licence type, junk Google search link, Unsplash claim, no AI statement). Marketplace 1.5 to 1.7. MCP can write the text once the owner states the real asset sources.
3. **OG image on 8 pages** and the Home OG image is 3.96 MB. Marketplace 4.5. MCP can assign an asset (`imageAssetId`) to every page; owner must supply or compress a 1200 by 630 image under about 300 KB.
4. **Section vertical padding on `padding-section-*` wrapper divs** (section_template-hero, -inclusions, -pages, -header, -content, section_styleguide). V3 core structure. MCP can move top and bottom padding to the section classes (Section Padding variables) and remove the wrappers. This is a restructure, so it needs owner approval.
5. **Component names without the `Group / ` prefix** (A17). MCP `set_component_metadata` renames in one call without breaking instances. Needs owner approval (rename). Then the owner confirms the four groups in the Components panel.
6. **Unused styles**: 17 V2 style guide classes (list in B13). MCP `remove_style` after approval. Owner can run Style Cleaner in the Designer.
7. **Forms**: names "Email Form" and field names "Field", "Checkbox 2" and so on (5 forms). Owner in Designer (form name and field name settings); MCP cannot rename forms.
8. **Logo**: Nav and Footer use the text "Logo". Owner adds an SVG or image named for the template; Footer logo likewise.
9. **Variable hygiene**: wrong-group tokens, primitives bound on form and tag classes, hex on form messages, literal tag margins. MCP can rebind. Needs a decision on tint variables for success and error backgrounds.
10. **Style Guide semantics**: 3 H1 and 205 H5 labels. Owner or MCP rebuild of labels as text blocks. Low impact (noindex page), but the Audit panel will flag it.
11. **Naming**: ~20 custom-intent classes with no underscore, `is-centre-*`, `pointer-events-off`. MCP `rename_style` after approval (also updates every use).
12. **Missing utilities**: `spacing-clean` (MCP can create), `text-style-2lines` and `text-style-3lines` (known; need line-clamp, owner in Designer).
13. **Remaining `transition-property: all`** on `.form_checkbox-icon` and `.slider-arrow`. MCP.
14. **Component quality**: no open components, no sub-component variants, no alt prop on Button Icon, Size/Variant/Layout/Icon Visiblity tooltips and the typo (known; Designer).
15. **Base Structure page**: slug mismatch and redundant. Owner or MCP (rename slug or delete) after the Template instances move to the Components page.
16. **Focus states** missing on checkbox, radio, tab and slider-arrow classes; static focus width and offset (known). Designer or MCP.
17. **Password page** has no page-wrapper or main-wrapper; 404 body has no `section_` element. Low.
18. **Style Guide broken image**: one icon image references a deleted asset. Replace in Designer.
19. **Cosmetics**: Nav content starts further in than Footer content at a 1428 px canvas; truncated swatch labels (known); Components page spacing.
20. **Known owner list unchanged**: Colors collection deletion, mode renames, Navbar current-link colour, Button link props, brand shades as static hex, duplicate container-small, global-styles and css-styles, Visiblity typo and tooltips. Plus site settings and Classic interactions (MANUAL).

## Fixes made during this audit (all reversible, nothing published)

Start Here (6863cb3c28190c188a0bab00)
- Variables section rewritten for V3: intro paragraph, six collection headings and paragraphs reworded (Base, Theme, Typography, Layout, Sizes, Font Styles and Shadows as extensions), six new lists inserted (Base, Theme, Typography, Layout, Sizes, Font Styles and Shadows) and the five old V2 lists removed. Plain sentences, no em or en dashes (verified by script). No mention of UI Colors, Colors Collection, Space Group or Font Height remains.
- Heading levels fixed so the page no longer jumps H1 to H3 and H3 to H5: 5 H3 to H2, 12 H4 to H3 in the main rich text; FAQ block H3 to H2, H5 to H3, "Need More Help?" H3 to H2. Outline is now H1, H2, H3 only.
- Added H3 "Swapping an icon" with one paragraph (SVG embed instructions required by the template skill because the Style Guide uses inline SVG embeds).

Licenses (6863cae3734f9b52c4876e5c): H3 to H2 and five H4 to H3; placeholder font list replaced with Montserrat and Open Sans plus their Google Fonts links.

Changelog (6863cb59fac014e4fd5dd918): two H3 version headings to H2.

Home (685a8de8d94de8e829e63426): lorem ipsum paragraph replaced with a brace placeholder in the same style as the other placeholders; typo "Request Figma FIle" to "Request Figma file" (Button Text prop override); removed leftover Relume `blocks-name`, `blocks-slot-item-canonical`, `blocks-slot-children`, `blocks-non-deletable` attributes from 5 elements (one still named `layout9_item`).

Components page (6ae81c5cb61d7dfda50008ca): added missing H1 "Components" at the top of the first section.

Style Guide: removed hard-coded `font-family: Exo` and `font-weight: 500` from `styleguide_title` (title now follows the H1 tag style from variables).

Button styles: `.button-content` and `.button` `transition-property` changed from `all` to `background-color, color, border-color, box-shadow` (hover state confirmed intact).

Assets: alt text set on Tahi Logo.svg ("Tahi Studio logo") and Placeholder Image.png ("Placeholder image used to demonstrate the figure element").

## F. Visual check (Designer snapshots)

- **Home** (page-wrapper): renders cleanly. Hero with two buttons, clipped image strip (original design), three inclusion cards, Figma file card, six "Home Page" thumbnails, CTA, Footer. Nothing overlaps or breaks. The Montserrat headings show tiny gaps in the snapshot ("Tem plate"), which is a snapshot font kerning artefact, not a layout bug. The six thumbnails all say "Home Page" (placeholder copy).
- **Style Guide**: header renders (title now uses the H1 font). **Grid block `grid-autofit-small` with 6 sample items renders 3 columns in 2 rows** at the snapshot width of about 1180 px. The class binds `repeat(auto-fit, minmax(min(<Grid Columns Small 15rem>, 100%), 1fr))` to the variable, so the count follows container width. The earlier phase 4 snapshot reported 2 columns; today it is 3. Colour block renders all swatches. Cosmetic: long swatch labels are cut off ("Background/Secon", "Background/Alterna", "Button Primary/Backgroun"), already known.
- **Components page**: renders, but cramped. Headings stack with no spacing, and only one default Button is shown. Not broken.
- **404** (extra check): heading, message, Go Home button, Nav, CTA, Footer all render. Nav content sits further in than the Footer content at 1428 px.
- Not verified visually: tablet and mobile breakpoints, hover and focus states, dark mode, Preview behaviour of the native Navbar, the Password page.
