# Content modelling and GROQ

How to model content so editors can change everything they own and nothing that belongs to the design. Field limits that come from SEO (title and description lengths) are set by `tahi:tahi-seo`; the numbers below are layout limits.

## Contents

1. Document types for a typical marketing site
2. Shared object types
3. A page-builder block
4. The page builder array
5. Rich text (Portable Text) config
6. Images with alt and hotspot
7. Validation rules worth copying
8. Descriptions editors read
9. GROQ patterns

## 1. Document types for a typical marketing site

| Type | Kind | Notes |
|---|---|---|
| `siteSettings` | singleton | Site name, default SEO, social links, organisation details for JSON-LD |
| `navigation`, `footer` | singletons | Links as references to pages, not typed URLs |
| `page` | document | `title`, `slug`, `seo`, `blocks` (page builder) |
| `post` | document | `title`, `slug`, `excerpt`, `publishedAt`, `author` (reference), `body` (rich text), `seo` |
| `person`, `service`, `testimonial`, `caseStudy` | documents | Referenced from blocks and pages |
| `redirect` | document [if:migration] | `from`, `to`, `permanent`; the front end builds `_redirects` or `redirects()` from them |

Model what the content **is**, then decide how pages show it. A testimonial is a document that several blocks can reference, not text typed into each block.

## 2. Shared object types

- `seo`: `title` (with a max), `description` (with a max), `image`, `noindex` toggle. One object, reused on every routable type.
- `link`: a choice of internal (reference to `page` or `post`) or external (URL, validated `https`), plus a label. Every button and nav item uses it. Internal links never become typed URLs, so renaming a slug cannot break them.
- `accessibleImage`: image with hotspot, `alt`, `decorative` (section 6).
- `cta`: `link` plus a `style` from the design's button variants (`primary`, `secondary`).

## 3. A page-builder block

```ts
import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const heroBlock = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      description: "The main heading at the top of the page. Keep it under about 60 characters so it stays on two lines on mobile.",
      validation: (rule) => rule.required().max(80).warning("Long headings wrap onto three lines on mobile."),
    }),
    defineField({ name: "intro", type: "text", rows: 3, description: "One or two sentences under the heading.", validation: (rule) => rule.max(220) }),
    defineField({ name: "image", type: "accessibleImage", description: "Landscape photo, at least 2000px wide. No text in the image." }),
    defineField({
      name: "layout",
      type: "string",
      description: "Where the image sits next to the text on desktop.",
      options: { list: [{ title: "Image right", value: "imageRight" }, { title: "Image left", value: "imageLeft" }], layout: "radio" },
      initialValue: "imageRight",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "ctas", type: "array", of: [{ type: "cta" }], validation: (rule) => rule.max(2), description: "Up to two buttons. The first is the main action." }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({ title: title ?? "Hero", subtitle: "Hero", media }),
  },
});
```

The `Hero` component's props are exactly these fields. The `layout` values match the component's variants. If the design gains a third layout, both sides change in the same PR.

## 4. The page builder array

```ts
defineField({
  name: "blocks",
  title: "Page sections",
  type: "array",
  of: [{ type: "hero" }, { type: "featureGrid" }, { type: "testimonialBand" }, { type: "ctaBand" }, { type: "richTextSection" }],
  options: { insertMenu: { views: [{ name: "grid" }] } },
  description: "Sections appear on the page in this order. Drag to reorder.",
})
```

- Offer only the blocks that suit that document type. A blog post does not get the full page builder.
- Add preview images for the insert menu grid view so editors pick by sight.
- Limit blocks whose second instance would look wrong (one hero per page: custom validation on the array).

## 5. Rich text (Portable Text) config

```ts
defineField({
  name: "body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullets", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
        annotations: [{ type: "link" }],
      },
    }),
    defineArrayMember({ type: "accessibleImage" }),
  ],
})
```

- No `h1` (the title is the `h1`), no underline (looks like a link), no colours.
- Custom blocks inside rich text (callout, video embed) only when the design has a component for them.

## 6. Images with alt and hotspot

```ts
export const accessibleImage = defineType({
  name: "accessibleImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "decorative", type: "boolean", initialValue: false, description: "Turn on only if the image adds nothing for someone who cannot see it." }),
    defineField({
      name: "alt",
      type: "string",
      description: "Describe what the image shows and why it is here, in one sentence.",
      hidden: ({ parent }) => parent?.decorative === true,
      validation: (rule) => rule.custom((alt, ctx) => ((ctx.parent as { decorative?: boolean })?.decorative || alt ? true : "Alt text is required unless the image is decorative.")),
    }),
  ],
});
```

## 7. Validation rules worth copying

- `rule.required()` on anything the layout needs to render.
- `rule.max(n).warning(...)` for soft layout limits; `rule.max(n)` (error) where overflow breaks the design.
- Slugs: `type: "slug"`, `options: { source: "title", maxLength: 96 }`, required. Add a description: "Changing this after launch breaks links; ask Tahi to add a redirect."
- Arrays: `rule.min(1)` and `rule.max(n)` to match the grid (a three-column feature grid takes three or six items).
- URLs: `rule.uri({ scheme: ["https", "mailto", "tel"] })`.
- Dates: `publishedAt` defaults to now with `initialValue: () => new Date().toISOString()`.

## 8. Descriptions editors read

Every field's description answers: where does this appear, what makes a good one, and what is the limit. Write them in plain NZ English, in the client's words for things. The editor guide in `tahi-client:client-handover` builds on them.

## 9. GROQ patterns

```groq
// A page with its blocks, references expanded, links resolved
*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seo,
  blocks[]{
    _type,
    _key,
    _type == "hero" => { heading, intro, layout, image{ ..., asset->{ _id, metadata { dimensions, lqip } } }, ctas[]{ style, link{ label, "href": coalesce(internal->slug.current, external) } } },
    _type == "testimonialBand" => { "items": testimonials[]->{ quote, name, role, company } }
  }
}
```

- `coalesce(a, b)` for fallbacks (SEO title falls back to the page title).
- Conditional projections (`_type == "hero" => {...}`) keep one query for all block types.
- `"slugs": *[_type == "page" && defined(slug.current)].slug.current` for static paths.
- Order explicitly: `| order(publishedAt desc)`. Paginate with slices `[0...12]`, or by the last seen value for large lists.
- Pass values as parameters (`$slug`), never by string concatenation.
