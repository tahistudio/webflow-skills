<!-- Official Finsweet Client-First V3 rules for AI agents (client-first.md, beta, released with V3 in October 2026). Kept verbatim so it can be replaced when Finsweet ships a new version. Tahi overrides live in ../SKILL.md, not here. -->

# Client-First

Rules for building Webflow projects with Client-First by Finsweet. This file covers Client-First V3 and is written for AI agents working through the Webflow MCP.

## How to use this file

- Read this entire file before making any change to a Webflow project.
- Treat every rule as a requirement unless it is marked as optional or recommended.
- Read the project before writing to it. List existing classes, variables, and components first. Reuse what exists and create only what is missing.
- Names in this file are Client-First defaults. Projects can rename, add, or remove them. If a name does not exist in the project, use the project's equivalent or ask the user.
- Names marked as examples are illustrative. Do not assume they exist in the project.
- If a direct user instruction conflicts with a rule, follow the user and state which rule was not followed.
- When unsure, ask before creating classes, variables, or components.

## The starter project

- Most projects start from the Client-First starter project. It provides the structure: variable collections and groups, utility classes, the core structure, and `Global / Styles`.
- Its values are placeholders. The colors, fonts, font sizes, spacing values, sizes, and page content are not the project's design.
- Never treat the starter project as the style guide. Take design values from the user's design source, such as a design file, brand guidelines, or direct instructions.
- If no design source is given, ask the user before styling.
- Keep the structure and replace the values. Update variable values to match the design. Never adapt the design to match the starter values.
- Starter classes, variables, and groups the project does not need can be removed or renamed after the user confirms.

## Core principles

Client-First is a class naming and organization system built for the Webflow Designer. It is not a traditional CSS methodology. Every decision favors how Webflow works and how people manage the project after handoff.

- Build for the next person. A developer, client, or marketer with no Client-First knowledge should understand what a class does from its name alone.
- Keep the project scalable, quick to build, and easy to hand off to another developer or agency.
- Use variables for every reused value. Colors, typography, spacing, sizes, and border radius come from variables. Never hardcode a value that already exists as a variable.
- Use utility classes for global, reusable styles. Use custom classes for styles specific to a component, page, or element.
- Do not deep stack. One or two classes on an element is the norm. Three needs a reason. Four is the absolute maximum. If more are needed, create a custom class.
- Keep typography on the defaults. HTML tags carry the default text styles. Add a class only when the text varies from the default.
- Use rem for sizes so the project respects browser font settings and zoom.
- Use semantic HTML and follow accessibility best practices.
- Choose the solution that stays easiest to manage in the Designer, even if it uses more CSS.

## Naming conventions

### Class types

- A custom class contains an underscore: `team-list_headshot`.
- A utility class contains dashes only, with no underscore: `text-color-primary`.
- The underscore is the only thing that separates the two. Never add an underscore to a utility class or leave it out of a custom class.

### General rules

- Write class names in lowercase. Separate words with a dash.
- No abbreviations, no shorthand. Write `background`, not `bg`. Write `button`, not `btn`.
- Order keywords from general to specific: `text-size-large`, not `large-size-text`.
- The name should answer one question: what does this class do in the project?
- Do not spend long on a name. If two names are equally clear, pick one and move on.

### Custom classes and folders

Custom classes follow `[folder]_[element-name]`. Each underscore creates a virtual folder in Finsweet Extension.

- One folder: `footer_link`, `faq_item`, `clients-slider_arrow`.
- Nested folders: `home_testimonials_wrapper`. Each extra underscore adds one folder level.
- Most projects use one or two folder levels. There is no strict limit on depth. Nest only when it adds real organization.
- Name a class by where it is used, not by where it sits in the structure. If an element is reused across sections, pages, or components, give it its own general class instead of tying it to its current parent. This keeps it global and lets the project scale without renaming.
- Keep one folder strategy consistent across the project.

### The component keyword

- Add `_component` to the parent wrapper of a complete UI element that can be copied as a whole: `clients-slider_component`.
- Not every folder is a component. A folder can also group related elements, such as `styleguide_item`.

### Page names in class names

- Add the page name only when the class is used on that page alone: `home-slider_arrow`.
- Never reuse a page-named class on another page. If a class is used on multiple pages, use a general name: `slider_arrow`.
- For a page-specific variation inside a shared folder, put the page or keyword at the start of the element name: `slider_testimonials-arrow`.

### Section classes

- Name every section `section_[section-identifier]`: `section_hero`, `section_pricing`, `section_faq`.
- The identifier describes the section's content so the Navigator reads like a sitemap of the page.

### Combo classes

- A combo class variant always starts with `is-`: `button is-secondary`, `section_header is-home`.
- An `is-` class never works alone. It only works on top of its base class.

### Utility class naming

- Utility classes follow `[first-keyword]-[second-keyword]-[identifier]`: `text-color-primary`, `padding-top-medium`.
- Finsweet Extension groups utility classes into folders by matching keywords in the same position.
- When adding a new utility system, follow the same keyword pattern so it groups correctly: `shadow-box-small`, `shadow-box-medium`, `shadow-box-large`.
- Before creating a utility class, check that it has a reason to be managed globally. If it does not, use a custom class.

## Core structure

Every page follows the same core structure. Use it on all pages unless the user says otherwise.

### Default structure

```
page-wrapper
  [nav component]
  main-wrapper
    section_[section-identifier]
      container-[size]
        [content]
  [footer component]
```

- Global padding and section padding go directly on `section_[section-identifier]` through variables. No extra classes or layers.
- Connect `padding-left` and `padding-right` to the `global-padding` variable in the Spacing group of the Layout collection.
- Connect `padding-top` and `padding-bottom` to a variable in the Section Padding group of the Layout collection: `small`, `medium`, or `large`.
- For uneven spacing, connect `padding-top` and `padding-bottom` to different Section Padding variables.
- Never add `padding-global` or `padding-section-[size]` as combo classes on `section_[section-identifier]`.

### Alternative structure

Use this only when a section needs padding as its own layer for more control.

```
section_[section-identifier]
  padding-global padding-section-[size]
    container-[size]
      [content]
```

- `padding-section-[size]` sits as a combo class on the same element as `padding-global`.
- Use `padding-section-[size]` for equal top and bottom padding. Use `padding-section-top-[size]` or `padding-section-bottom-[size]` for uneven padding.
- `padding-global` can sit as the parent of `container-[size]`, the child of it, or both, depending on the layout.

### page-wrapper

- Wraps every element on the page.
- Keep styling minimal. Use it for page-wide styles instead of styling the `body` tag.
- Limit `body` styles to typography and `background-color`.
- If `overflow: hidden` is added to stop horizontal scroll, it also stops `position: sticky` on every nested element. Warn the user before adding it.

### main-wrapper

- Set the HTML tag to `main`.
- Wraps all main page content. The nav and footer stay outside it.

### section_[section-identifier]

- Use Webflow's native Section element. If a Div Block is used, set its tag to `section`.
- Every section gets its own descriptive identifier so the Navigator reads like a sitemap.
- Beyond padding, keep section styling light.
- For section styles shared across many sections, such as a dark theme, add a global class like `section-style-dark` on top of the section class instead of repeating styles on each section.
- If one section needs unique padding, apply it directly on that section class.

### padding-global

- Only holds `padding-left` and `padding-right`, connected to the `global-padding` variable. Add no other properties.
- Never use it to add padding to content items, cards, or list items.

### container-[size]

- Available sizes: `container-small`, `container-medium`, `container-large`.
- Holds `margin-left: auto`, `margin-right: auto`, `width: 100%`, and a `max-width` connected to the Container group in the Sizes collection.
- Use `container-` classes for the outer content width. Use `max-width-` classes for widths nested inside a container.

### Section padding values

- Section padding has its own scale in the Section Padding group. It is separate from the margin and padding scale. `padding-section-small` and `padding-small` are not the same value.

## Class strategies

### Class types

- **Utility class.** A set of CSS properties applied across the project. Always global. Managed by Client-First and the project's style system.
- **Custom class.** Created for a specific component, page, group of elements, or single element. Most classes in a project are custom classes.
- **Global class.** Any class meant for site-wide management of styles. All utility classes are global. A custom class can also be global, such as `faq_item` used on every FAQ across the site.
- **Combo class.** A variant stacked on a base class with the `is-` prefix. It inherits the base styles and adds its own. It creates a new CSS declaration.

### Variables and classes

- A variable holds a value. A class holds a set of CSS properties.
- Class values should come from variables wherever a matching variable exists.
- Prefer utility classes where they fit. When they do not fit, apply styles to a custom class and connect its values to the same variables.

### When to use a utility class

Use or create a utility class only when it has a clear benefit:

1. It manages an important style globally, such as `container-large` or `text-size-large`.
2. It speeds up building or helps the client, such as `hide-mobile-portrait`.

If neither applies, use a custom class. For example, do not create `position-absolute`. Position needs other properties to be useful, has no reason to be managed globally, and leads to stacking.

### When to use a custom class

- When utility classes cannot or should not style the element.
- When styling the element with utilities would take more than two or three stacked classes.
- When the element needs its own tablet or mobile styles.
- When the element repeats and should be managed as one group, such as `footer_link`.
- Name a class by where it is used, not by where it sits in the structure. If an element is reused across sections, pages, or components, give it its own general class instead of tying it to its current parent. This keeps it global and lets the project scale without renaming.

### Stacking rules

- One or two classes on an element is the norm. Three needs a reason. Four is the absolute maximum.
- Stack classes from the same category: spacing with spacing, typography with typography. Do not mix categories on one element.
- Never add new styles to a stack of utility classes. This creates an unintended combo class and breaks global management.

### Customizing an element that uses utilities

Use these strategies in this order:

1. **Custom class first, utility on top.** Create the custom class, then add the utility class on top. The custom class holds the instance styles. The utility keeps its value under global control. Example: `home-header_text` with `text-size-large`. This is the recommended pattern.
2. **Custom class only.** Put all styles on one custom class and connect values to variables. Example: `home-header_text` with font size and color from variables.
3. **Combo class on utilities.** Add an `is-` class on top of the utilities when certain properties must stay globally controlled. Example: `text-size-large is-home-header` keeps the global desktop size and changes only the mobile size.

### Avoiding deep stacking

- Replace the stack with one custom class.
- Nest another Div Block and move a group of styles to it, the same way the core structure and spacing wrappers separate concerns.
- Replace several stacked classes with one combo class: `section_header is-home-header` instead of `section_header is-mobile-reverse background-color-brand text-color-alternate`.

### Combo class rules

- Create a combo class only when the variant clearly benefits from inheriting the base class styles. Example: every `button` shares padding and font size, and `is-secondary` changes only the colors.
- If the base class has nothing worth managing globally, use a single class instead. Use `container-large`, not `container is-large`.
- Prefer a single class over a combo class when a combo is not needed.

### Layouts

- Client-First has no flex, column, or breakpoint-based layout classes. Build layouts with custom classes using flex or grid.
- Grid utilities are available for responsive columns: `grid-autofit`, `grid-autofit-css`, `grid-autofit-[size]`, `grid-autofill-css`, `grid-autofill-[size]`. Apply a custom class first, then add the grid class on top.
- A project-level layout system is acceptable when it stays clear, such as `grid_col-2` and `grid_col-3` with `is-` combos for responsive exceptions.

### Editing utility classes

- Editing a utility class changes every element that uses it across the project.
- Never edit a utility class to fix a single element. Use a custom class or a combo class instead.
- If a utility class must change globally, tell the user which class is changing and that it affects the whole project.

## Variables

All reused values come from variables. Update a value once in the Variables panel and every class and element using it updates with it.

### Collections

| Collection | Holds | Default groups |
|---|---|---|
| Base | Primitive tokens: raw colors and font values | Brand, Neutral, Others, Font Family, Font Weight, Line Height, Letter Spacing |
| Theme | Semantic color tokens | Background, Border, Link, Text, Button Primary, Button Secondary, System |
| Typography | Semantic typography tokens | Body, H1 to H6, Font Size |
| Layout | Spacing and section padding | Spacing, Section Padding |
| Sizes | Element sizing | Max Width, Container, Grid Columns, Border Radius, Focus, Icon |

Projects can add, rename, or remove groups. Always check the project before relying on a group name.

### Primitive and semantic tokens

- **Primitive tokens** live in Base. They hold raw values and are named by value, not purpose: `blue`, `blue-dark`, `neutral-light`.
- **Semantic tokens** live in Theme and Typography. They reference a primitive and are named by purpose: Background › `primary`, Text › `secondary`.
- Apply semantic tokens to classes. Do not link a primitive directly to a class unless it is used nowhere else and never will be.
- When adding a new color, create the primitive in Base first, then create a semantic variable that references it.

### Using semantic tokens

- Use the group that matches the property: Background tokens for `background-color`, Text tokens for `color`, Border tokens for `border-color`, Spacing tokens for padding, margin, and gap.
- Never use a token from one group on a different property, such as a Text token on a background.

### Naming

- Group names start with a capital letter: Background, Section Padding.
- Variable names are lowercase with dashes: `primary`, `background-hover`.
- Do not repeat the group name in the variable name. Inside Background, use `primary`, not `background-primary`.
- Exception: add the group name when the variable needs context in the Style panel. Typography does this: `h2-font-size`, `body-line-height`.
- Never name a semantic variable after a color. Use `primary`, not `blue`. Color names break when themes or brand colors change.
- If the client has an established color system and naming, follow it.

### Responsive modes

- In Typography, Layout, and Sizes, the default mode is named Desktop. Typography and Layout also have Tablet and Mobile Landscape modes.
- Change responsive values in the Variables panel per mode. Do not add breakpoint styles on elements for values a variable mode already handles.
- Other collections can use breakpoint modes when the project needs it.

### Theme modes

- Theme has a Base mode and a Dark Mode.
- Switch a section or element to another theme through the Style panel, or with a utility class such as `theme-dark`.
- Keep semantic names generic so every theme can reuse them.

### CSS variable names

When a variable is referenced in custom code, copy its exact CSS name from the project. Do not build it by hand. In the default setup:

- Base variables follow `--[group]--[name]`: `--brand--blue`.
- Other collections follow `--_[collection]---[group]--[name]`: `--_theme---text--primary`.

### Before creating a variable

- Check whether a variable with the same purpose or value already exists. Reuse it.
- Place a new variable in the correct collection and group.
- Tell the user about every variable created.

## Spacing

Every spacing value comes from a variable in the Layout collection. Never hardcode a spacing value that exists as a variable.

### Spacing scale

The same size names apply to margin, padding, and gap. A size always means the same value, whichever class uses it.

| Size | Value |
|---|---|
| `0` | 0rem |
| `xxtiny` | 0.25rem |
| `xtiny` | 0.5rem |
| `tiny` | 0.75rem |
| `xxsmall` | 1rem |
| `xsmall` | 1.25rem |
| `small` | 1.5rem |
| `medium` | 2rem |
| `large` | 3rem |
| `xlarge` | 4rem |
| `xxlarge` | 5rem |
| `huge` | 6rem |
| `xhuge` | 8rem |
| `xxhuge` | 12rem |

Values are defaults. Read the project's Spacing group for the current values.

### Spacing classes

- `margin-[size]` and `padding-[size]` apply spacing to all sides.
- `margin-[direction]-[size]` and `padding-[direction]-[size]` apply spacing to one direction or a pair of opposite directions. Directions: `top`, `bottom`, `left`, `right`, `horizontal`, `vertical`.
- `gap-[size]` applies gap to a flex or grid parent.
- `spacing-clean` sets all margin and padding to 0. Use it to remove native Webflow component spacing.
- Direction and size are always one class: `padding-bottom-medium`. Never stack a direction class with a size class.
- Never use `spacer-[size]` classes, even if they exist in the project.

### Responsive spacing

- Spacing variables have breakpoint modes. Spacing scales down on tablet and mobile automatically.
- Do not add breakpoint styles or extra classes to change spacing that a variable mode already handles.
- To change responsive spacing, edit the variable value for that mode in the Variables panel.

### Utility class strategies

**Spacing block.** An empty Div Block with one spacing class, placed between two sibling elements.

```
heading
div.padding-bottom-medium
paragraph
```

**Spacing wrapper.** A Div Block with one spacing class that wraps an element and creates space between it and a sibling.

```
paragraph
div.margin-top-medium
  button
```

- Spacing blocks keep elements visible in the Navigator with less nesting. Prefer them for simple vertical space between two elements.
- Spacing wrappers work well for one exception inside a flex or grid parent.
- Empty spacing blocks have no effect on SEO, accessibility, or performance. Never add content or ARIA attributes to them.

### Custom class strategies

**Custom class on element.** Apply margin or padding directly to a custom class. Connect the value to a spacing variable. Use a fixed value only when no variable fits.

**Flex with gap.** Set the parent to flex and apply gap from a spacing variable or a `gap-[size]` class.

**Grid with gap.** Set the parent to grid and apply row and column gap from a spacing variable or a `gap-[size]` class.

### Which strategy to use

- **Space between headings, paragraphs, and buttons:** spacing blocks or wrappers. Never put spacing classes on text elements.
- **Different spacing per component instance:** spacing blocks or wrappers, so each instance can differ.
- **Equal space between children in a list or card:** flex or grid gap on the parent. Add a spacing wrapper for one child that needs more space.
- **A recurring element managed as one group,** such as every `form_input`: spacing on the custom class.
- **Unique tablet or mobile spacing:** spacing on the custom class, using a different variable at that breakpoint.
- **A one-off value between two sizes:** a custom class with the value. Keep this rare.
- **Buttons in a row, or a button with an icon:** flex or grid gap on the parent. Never add `margin-right` to a button class.
- **Inner padding of cards and items:** padding on the custom class. Do not use utility padding classes for this.

### Heading margins

- Optionally, set `margin-top` and `margin-bottom` on heading tags through variables for a unified typography rhythm.
- Use this only when most headings in the project follow the same spacing.

### Section padding

Section padding is covered in Core structure. It uses its own scale and is not part of the spacing scale above.

## Typography

Keep typography unified. HTML tags carry the default styles, and classes are only for variations.

### Default styles

- Style the `body` and `H1` to `H6` tags first. These are the project defaults.
- Tag styles take their values from the Typography collection: the Body group and the H1 to H6 groups for font size, font weight, line height, and letter spacing.
- A text element that follows the default needs no class.
- Typography variables have breakpoint modes. Do not add breakpoint font sizes to elements when a variable mode already handles it.

### Heading tags

- Choose the heading tag for document structure and SEO. Choose the visual style with a class.
- Use `heading-style-h[1-6]` to make one heading look like another while keeping the correct tag. Example: an `H1` page title styled as `H2` gets `heading-style-h2`.
- `heading-style-h[1-6]` changes only the CSS. It never changes the tag.
- Use heading style classes rarely. Most headings should follow their tag defaults.
- Never use a heading tag on text that is not a heading. If it needs heading styles, use a text element with a `heading-style-h[1-6]` class or a custom class.

### Typography utility classes

| Prefix | Purpose | Default classes |
|---|---|---|
| `heading-style-` | Apply a heading style | `h1` to `h6` |
| `text-size-` | Font size | `large`, `medium`, `regular`, `small`, `tiny` |
| `text-weight-` | Font weight | `xbold`, `bold`, `semibold`, `medium`, `normal`, `light` |
| `text-color-` | Text color | `primary`, `secondary`, `alternate` |
| `text-align-` | Alignment | `left`, `center`, `right` |
| `text-style-` | Text treatments | See below |

`text-style-` classes:

- `allcaps`, `italic`, `strikethrough`, `nowrap`
- `muted`, `link`, `quote`
- `balance` and `pretty` control text wrapping
- `1line`, `2lines`, `3lines` truncate text after that many lines

Inherit classes pass a value down from the parent: `text-color-inherit`, `text-size-inherit`, `text-weight-inherit`, `text-decoration-inherit`. Use them on text, links, or spans that should match their parent.

Class names in the color list are examples. Check the project for the current set.

### Stacking typography classes

- Stack typography classes only with other typography classes. Never add spacing classes to text elements.
- Follow the stacking limits in Class strategies.
- If the same stack repeats across the project, create one grouped class instead, such as `text-style-subtitle`. Connect its values to the same Typography variables so it stays under global control.

### When to use a custom class for text

Custom classes for text should be uncommon. Use one when:

- **The text is unique** and needs a combination the utilities cannot cover cleanly. Example: `footer_copyright-text`.
- **A group of text should be managed together.** Example: `footer_link` on every footer link.
- **The text breaks from the default at certain breakpoints.** Example: a long `H1` that needs a smaller size on mobile only.

Connect custom text classes to Typography variables wherever a matching variable exists.

### Extending the system

- Create new typography utility systems with the same prefix pattern: `text-opacity-low`, `text-opacity-medium`, `text-opacity-high`.
- Add matching variables to a new group in the Typography collection and link them to the new classes.
- New properties can also go inside existing groups, such as `h2-margin-bottom` in the H2 group.

### Rich text

- Style Rich Text content through the `text-rich-text` class and its nested tag selectors.
- Do not add classes to elements inside a Rich Text block.

## Units, semantic HTML, and accessibility

### Units

- Use rem for sizes so layouts respect browser font settings and zoom.
- 1rem equals 16px. Divide a px value by 16 to get rem. Webflow inputs accept math, so `24/16rem` works.
- Follow a 4-point scale with 2-point steps: 2, 4, 8, 12, 16, 20, 24, 32 and so on, in px before converting. Use in-between values only when absolutely needed.
- Prefer rem values that are easy to read, such as 1, 1.5, 2, 2.5, 3. Avoid long decimals.
- 14px (0.875rem) is an accepted font size when 16px is too large.
- Keep 1px values in px, such as borders. Do not convert them to rem.
- Do not use vw or vh for font sizes or spacing. They ignore browser zoom and font settings.

### Fluid responsive

- Client-First supports fluid scaling through root font size, generated with the Finsweet fluid responsive tool or Finsweet Extension.
- It is optional. Add it only when the user asks.

### Semantic HTML

Set tags in the element settings panel.

| Tag | Use for |
|---|---|
| `header` | The site navbar, or the header of a section or article. Never inside a `footer`, `address`, or another `header` |
| `main` | The `main-wrapper`. One per page. No nav, footer, or content repeated across pages |
| `footer` | The site footer, or the footer of a section or article |
| `section` | Every `section_[section-identifier]`. A section should have a heading |
| `article` | Self-contained content that makes sense alone: blog posts, product cards, comments |
| `aside` | Content related to its surroundings: sidebars, related links, tables of contents. Place it inside the section it relates to, or beside `main` if it relates to the whole page |
| `nav` | Groups of navigation links: navbar, sidebar links, table of contents, footer links, breadcrumbs |
| `address` | Contact information for the page or article owner |
| `figure` | Self-contained images, diagrams, or illustrations |

### Headings

- Use one `H1` per page. It is the page title.
- Do not skip heading levels. `H2` covers subtopics of the `H1`, `H3` covers subtopics of an `H2`, and so on.

### Accessibility

- Every clickable element must be reachable and usable with a keyboard.
- Use links to navigate. Use buttons to trigger actions on the page.
- Use a native link or button element whenever possible. If a non-semantic element must act as a button, add `role="button"` and `tabindex="0"`, and make it respond to Enter and Space.
- Every focusable element needs a visible focus state. The Global styles embed provides a default, controlled by the Focus variables.
- Use `tabindex="0"` to add an element to the natural tab order. Use `tabindex="-1"` to remove one. Avoid positive values.
- Add `aria-label` when visible content does not describe the action, such as an icon-only button.
- Add `aria-hidden="true"` to decorative elements, such as icons and decorative SVGs.
- Pair `aria-controls` with `aria-expanded` on toggles that show and hide content, such as accordions and menus.
- Set `aria-current="page"` on links that point to the current page.
- Add alt text to meaningful images. Leave alt text empty on decorative images.
- To show text to screen readers only, hide it visually with CSS instead of `display: none`.
- Do not add ARIA roles to elements whose tag already defines them, such as `role="form"` on a form.
- Webflow's native components include their own ARIA attributes. Do not duplicate them.

## General Webflow guidelines

These are Webflow best practices, not Client-First rules.

- Use native Webflow elements by default: Navbar, Tabs, Slider, Dropdown, Lightbox, Forms, and Collection Lists.
- Build a custom solution only when the native element cannot meet the requirement, a custom build gives a clear benefit, or the user asks for it.

## Utility class reference

Every utility class in a Client-First project. Check the project for the current set before using a class. Values are defaults.

### Covered in other sections

- **Structure:** `page-wrapper`, `main-wrapper`, `padding-global`, `container-[size]`, `padding-section-[size]`, `padding-section-[direction]-[size]`. See Core structure.
- **Spacing:** `margin-[size]`, `padding-[size]`, `margin-[direction]-[size]`, `padding-[direction]-[size]`, `gap-[size]`, `spacing-clean`. See Spacing.
- **Typography:** `heading-style-`, `text-size-`, `text-weight-`, `text-color-`, `text-align-`, `text-style-`, text inherit classes, `text-rich-text`. See Typography.

### Responsive hide

| Class | Hides on |
|---|---|
| `hide` | All breakpoints |
| `hide-tablet` | Tablet and below |
| `hide-mobile-landscape` | Mobile landscape and below |
| `hide-mobile-portrait` | Mobile portrait |

### Max width

Use `container-` classes for the outer content width. Use `max-width-` classes for widths nested inside a container. Values come from the Max Width group in Sizes.

| Class | Default |
|---|---|
| `max-width-xxsmall` | 12rem |
| `max-width-xsmall` | 16rem |
| `max-width-small` | 20rem |
| `max-width-medium` | 32rem |
| `max-width-large` | 48rem |
| `max-width-xlarge` | 64rem |
| `max-width-xxlarge` | 80rem |

`max-width-full` sets `max-width: none`. Breakpoint versions apply from that breakpoint down: `max-width-full-tablet`, `max-width-full-mobile-landscape`, `max-width-full-mobile-portrait`.

### Grid

Grid classes adjust the column count to the available space. One class covers every breakpoint. Apply a custom class first, then add the grid class on top. All grid classes default to a `medium` gap.

| Class | Behavior |
|---|---|
| `grid-autofit` | Auto-fit with Webflow's native setting |
| `grid-autofit-css` | Auto-fit through custom CSS |
| `grid-autofit-[size]` | Auto-fit with a minimum column width from a variable |
| `grid-autofill-css` | Auto-fill through custom CSS. No native version exists |
| `grid-autofill-[size]` | Auto-fill with a minimum column width from a variable |
| `grid-span-full` | Makes a grid child span every column |

- Auto-fit collapses empty columns so the rest stretch to fill the row. Auto-fill keeps empty columns in place.
- `[size]` is `xsmall`, `small`, `medium`, or `large`, from the Grid Columns group in Sizes.
- `grid-autofit` and `grid-autofit-css` use a fixed minimum column width that is intentionally not a variable. Use these two classes when a custom minimum width is needed, and edit the value directly.
- `grid-autofit` is native, so it cannot shrink columns below its minimum width on narrow screens. If columns must fit screens narrower than the minimum, use `grid-autofit-css` or a sized class instead.

### Display

| Class | Sets |
|---|---|
| `display-inline` | `display: inline` |
| `display-inline-flex` | `display: inline-flex`. Use for buttons that need flex inside without filling the full width |
| `display-contents` | `display: contents`. Removes the element's box so its children join the parent's flex or grid |

### Overflow

`overflow-hidden`, `overflow-scroll`, `overflow-auto`, `overflow-clip`, `overflow-visible`. Each sets the matching `overflow` value.

### Icons

Values come from the Icon group in Sizes.

| Class | Sets |
|---|---|
| `icon-height-small`, `icon-height-medium`, `icon-height-large` | Height only |
| `icon-1x1-small`, `icon-1x1-medium`, `icon-1x1-large` | Width and height |

### Background colors

`background-color-primary`, `background-color-secondary`, `background-color-alternate`. Values come from the Background group in Theme. These are examples. Check the project for the current set.

### Buttons

`button` is the base class. Variants are `is-` combo classes on top of it, such as `button is-secondary`. Variant names differ per project. Check the project before applying one.

### Other utilities

| Class | Sets |
|---|---|
| `z-index-1`, `z-index-2` | `z-index` |
| `align-center` | `margin-left` and `margin-right` to `auto` |
| `pointer-events-none` | Blocks click and hover interaction |
| `pointer-events-auto` | Restores click and hover interaction |
| `disable-select` | `user-select: none` |
| `text-area-vertical` | `resize: vertical` on a text area |
| `border-radius-inherit` | `border-radius: inherit` |
| `aspect-ratio-square` | 1 / 1 |
| `aspect-ratio-portrait` | 2 / 3 |
| `aspect-ratio-landscape` | 3 / 2 |
| `aspect-ratio-widescreen` | 16 / 9 |

### Do not use

- `spacer-[size]`. Use spacing blocks with spacing classes instead.
- `margin-custom[n]` and `padding-custom[n]`.
- `layer`. Removed.

## Component and interaction naming

### Component naming

Webflow Components follow `Group Name / Component Identifier`.

- **Group Name** is the type of component.
- **Component Identifier** says what the component is.
- Capitalize the first letter of each word: `Card / Blog Post`, `Form / Newsletter`.
- A new developer should know what a component is from its name without opening it.

Common groups: Global, Template, Card, Form, Section, Modal, Component. Projects can add their own.

Examples:

- `Global / Nav`. The primary site navigation.
- `Global / Footer`. The primary site footer.
- `Card / Team Member`. Team member card used on the about page.
- `Form / Contact`. The main contact form.
- `Modal / Video`. Video modal opened from a video thumbnail.

### Component groups

- The slash is a naming convention only. Webflow does not create a group from it.
- Every component must sit in the group that matches its name. `Card /` components go in the Card group.
- Create the group in the Components panel and move the component into it. If the group cannot be created through the MCP, tell the user which group to create and which components to move.
- Renaming a component does not break its instances. Rename when a name stops making sense.

### Component names vs component classes

- The Webflow Component name (`Card / Blog Post`) and the class on its wrapper (`blog-card_component`) are separate. Follow the naming rules for each.

### Global and template components

- `Global / Styles` holds the global CSS embeds. It goes on every page.
- `Template / Core Structure` holds the page core structure. `Template / Section` holds a section structure.
- Template components are starting points, not live components. Unlink them to use them. Never edit a template component to build page content.
- When building a new page or section, start from the template components if the project has them. If unlinking is not possible through the MCP, build the same structure manually.

### Interaction naming

Interactions follow `Element [Action State]`.

- **Element** is what the interaction applies to.
- **Action** describes what happens. **State** adds context when useful.
- Capitalize the first letter of each word.
- Put the action and state in square brackets.
- Use the fewest words that give full context. Names should not overflow the Interactions panel.

Examples:

- `Nav Menu [Open]` and `Nav Menu [Close]`
- `Button Arrow [Move In]` and `Button Arrow [Move Out]`
- `Image [Show Scroll In]`
- `Jobs Item Modal [Open]`
- `Contact Form Input [Height Increase]`

Common action keywords: Show, Hide, Move, Rotate, Scale.

Common state keywords: In and Out, Open and Close, Increase and Decrease, Expand and Collapse.

- Action and state can be used together or alone: `Element [Action State]`, `Element [Action]`, or `Element [State]`.
- Use general element names for interactions reused across the project, such as `Button Arrow`. Use specific names for one-off interactions, such as `Home Hero Lottie`.

### Trigger keywords

- Do not add the trigger to the name by default. Triggers are set separately from the interaction, and one interaction can run on different triggers. Example: `Nav Dropdown [Open]`, not `Nav Dropdown [Open Hover]`.
- Add a trigger keyword only when it gives essential context: `Discount Modal [Delay On Load]`.
- Common trigger keywords: Click, Hover, Mouse Move, Scroll, While Scrolling, Load.

### Responsive keywords

- When an interaction runs only at certain breakpoints, add the breakpoint in a second set of brackets at the end: `Nav Sidebar Slide [Show] [Mobile]`, `Background Textures [Hover In] [Desktop]`.

### Naming conflicts

If no name is clearly right, pick the clearest option and move on.

## Global styles

### The Global / Styles component

- `Global / Styles` goes on every page.
- It holds two embeds:
  - `global-styles_default` holds the CSS that ships with Client-First.
  - `global-styles_custom` holds CSS specific to the project.
- Add project CSS to `global-styles_custom` only.
- Never edit or delete code in `global-styles_default` unless the user asks. If the purpose of a snippet is unclear, keep it.
- Put custom CSS in the embed, not in Page Settings or Site Settings, so it stays visible in the Designer.

### Default snippets

| Snippet | Default | Purpose |
|---|---|---|
| Text clarity | On | Smoother font rendering |
| Focus state | On | One keyboard focus style for all focusable elements |
| Text selection | On | Brand colors for selected text |
| Pointer cursor | Off | Pointer cursor on interactive elements |
| Form element reset | Off | Removes browser default form styling, mainly on Apple devices |
| Inherit typography | Off | Links, inputs, and Webflow elements inherit color and text decoration from their parent |
| Highlight empty links | Off | Red outline on links with an empty href, in the Designer only |
| Rich Text top margin removal | On | Removes top margin from the first element in Rich Text |
| Rich Text bottom margin removal | On | Removes bottom margin from the last element in Rich Text |

- To turn on a snippet that is off, remove its comment tags. Keep the note inside the snippet.
- Do not turn on Inherit typography unless the user asks. It overrides Webflow base styles, so "All Links" styling stops working.
- Change the focus and selection styles through the Focus variables in Sizes and the System group in Theme. Do not edit the snippets.
- To override the focus style on one element, use the Focused (keyboard) state in the Style panel.
- Reference variables in custom CSS with their exact CSS names from the project.

## Working with the Webflow MCP

### Before making changes

- Confirm the site and page to work on. If more than one is possible, ask.
- Read the project first: styles, variable collections with their groups and modes, and components.
- Check whether the project follows Client-First. If it does not, ask before restructuring anything.

### While building

- Reuse existing classes, variables, and components. Create only what is missing.
- Check that a class name is not already in use before creating it.
- Connect style values to variables. Link the variable itself, not a copy of its value.
- Follow the naming rules for every new class, variable, component, and interaction.
- Use the core structure for every new page and section.
- Set semantic tags on structural elements.
- Handle responsive values through variable modes before adding breakpoint styles.
- When adding a class on top of existing classes, confirm the result follows the stacking rules.

### Ask before

- Renaming or deleting any class, variable, component, or page.
- Editing a utility class, a variable value, `global-styles_default`, or a template component. These change the whole project.
- Restructuring existing pages or sections.
- Publishing. Never publish unless the user asks.

### After making changes

- Report what changed: classes created, variables created or linked, components created, and any change with a global effect.
- If a rule could not be followed, including because of an MCP limitation, say which rule and why.

## Pre-flight checklist

Run this before finishing any task.

- Design values come from the user's design source, not the starter project.
- Native Webflow elements are used where available.
- Core structure is in place, sections use the native Section element, and section padding comes from variables.
- Custom classes have an underscore. Utility classes do not.
- Class names are lowercase, use no abbreviations, and go from general to specific.
- No element has more than four classes. Most have one or two.
- No spacing classes on text elements.
- No `spacer-[size]`, `margin-custom[n]`, or `padding-custom[n]` classes.
- Reused values are connected to semantic variables, not primitives or hardcoded values.
- Text follows the defaults unless it varies.
- One `H1` per page, no skipped heading levels, and semantic tags are set.
- Interactive elements work with a keyboard and have a visible focus state.
- Components follow `Group Name / Component Identifier` and sit in the matching group.
- Interactions follow `Element [Action State]`.
- No utility class, `global-styles_default`, or template component was edited without approval.
- A summary of changes was given to the user.
