# Sanity in an Astro site

The Astro side of a Sanity build. Content modelling, Studio, roles, webhooks setup and backups are `tahi-code:sanity`.

## Contents

1. Install and configure
2. Queries and types
3. Images
4. Portable Text
5. Rebuild on publish
6. Visual Editing and preview
7. Where the Studio lives

## 1. Install and configure

```bash
pnpm astro add @sanity/astro
pnpm add @sanity/image-url @portabletext/astro groq
```

- Configure `sanity({ projectId, dataset, apiVersion, useCdn: false })` in `astro.config.mjs` (skeleton in structure.md). `useCdn: false` for static builds so a rebuild never reads stale cached content.
- Add `/// <reference types="@sanity/astro/module" />` to `src/env.d.ts` so `sanity:client` is typed.
- Project ID and dataset are not secrets. Read tokens are.
- A public dataset returns published documents without a token. Keep the production dataset public unless it holds content that must not be public; drafts are never public.

## 2. Queries and types

- All GROQ lives in `src/lib/sanity/queries.ts`, wrapped in `defineQuery` (from `groq`) so TypeGen can type the results.
- Wrap `sanityClient.fetch` in small functions (`getPage(slug)`, `getAllPageSlugs()`); pages never write GROQ inline.
- Project only the fields a template uses. Expand references in the query (`"author": author->{name, role}`) rather than fetching twice.
- Generate types with `sanity schema extract` then `sanity typegen generate` (run from the Studio package or the repo root, depending on the monorepo layout; patterns in `tahi-code:sanity`).

## 3. Images

```ts
// src/lib/sanity/image.ts
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source).auto("format").fit("max");
```

- Use the named `createImageUrlBuilder`; the default export is deprecated.
- A `SanityImage.astro` component builds `srcset` from a fixed list of widths, sets `width` and `height` from the asset's dimensions (query `asset->metadata.dimensions`), passes `alt` from the image field, and respects the editor's **hotspot and crop** (the builder applies them when the query includes `hotspot` and `crop`).
- Query `asset->metadata.lqip` if the design wants a blurred placeholder.
- Sanity's CDN does the resizing and format conversion. Do not also send these through `astro:assets`.

## 4. Portable Text

- Render with `PortableText` from `@portabletext/astro` (the maintained fork of `astro-portabletext`, which older examples use). Pass `value` and a `components` map.
- Map every custom block and annotation to a component: internal links resolve to real routes, external links get `rel="noopener"`, inline images use `SanityImage`. An unmapped type renders nothing and warns in development.
- Headings inside rich text start at `h2`. The page's `h1` comes from the title field, never from the editor.
- Use `toPlainText` from the same package for meta description fallbacks and reading time.

## 5. Rebuild on publish

Static pages only change when the site rebuilds.

1. In the Cloudflare dashboard, create a deploy hook for `main` (`tahi-code:cloudflare`).
2. In Sanity (manage, API, Webhooks), add a document webhook to that URL. Filter to the types that appear on the site; leave drafts and versions off so only publishes trigger it. HTTP method POST.
3. Publish a test change and confirm the build runs and the change is live. Note the typical time from publish to live in the editor guide (`tahi-client:client-handover`).

Several publishes in a row trigger several builds. That is fine for small sites. If builds queue up, add a short debounce in a tiny Worker between Sanity and the hook.

## 6. Visual Editing and preview

Click-to-edit in the Studio's Presentation tool needs server rendering: draft mode depends on a per-request cookie, and static pages cannot encode stega strings. Production stays static.

- **Pattern:** the staging (or a dedicated preview) environment builds with `output: "server"`, reads drafts with a Viewer token, and renders `<VisualEditing />`; production builds static with no token. Switch on an environment variable in `astro.config.mjs` (`process.env`, since `astro:env` is not available there).
- Install `@sanity/visual-editing`, `@sanity/preview-url-secret` and the React integration for that environment. Sanity's current Astro guide uses a custom `SanityVisualEditing` component and a `/api/draft-mode/enable` route; follow it rather than older blog posts.
- Astro has no Live Content API equivalent. An edit in the Studio reloads the preview page.
- Keep stega out of `<title>`, meta tags, JSON-LD, URLs and `alt` attributes (`stega: false` on those queries, or clean the values).
- Add the preview origin to the Sanity project's CORS origins with credentials allowed.
- This is worth the setup at [C2] or [P:standard] when the client edits often. For a small site with occasional edits, previewing on the staging build after publish is enough.

## 7. Where the Studio lives

Default: a separate Studio package in the same repo (`studio/`), deployed with `sanity deploy` to a `*.sanity.studio` host. It keeps React out of the site build and deploys independently. Embedding the Studio in the Astro site (`studioBasePath`) needs React and an on-demand route; only do it when the client wants one URL for everything.
