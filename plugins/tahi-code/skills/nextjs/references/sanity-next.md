# Sanity in a Next.js app

The Next.js side of a Sanity build, using `next-sanity` (v13 or later at the time of writing). Content modelling, Studio, roles and backups are `tahi-code:sanity`. Follow Sanity's current "Visual Editing with Next.js (App Router)" guide for exact file contents; this is the shape and the decisions.

## Contents

1. Packages and environment
2. Client and live fetching
3. Draft mode and Visual Editing
4. Images with a Sanity loader
5. Portable Text
6. Where the Studio lives

## 1. Packages and environment

```bash
pnpm add next-sanity @sanity/image-url
```

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...   # Viewer role; server only
SANITY_REVALIDATE_SECRET=... # if you write your own webhook handler
```

The project ID and dataset are public on purpose (live subscriptions run in the browser). The read token is server-only; `defineLive` shares it with the browser only while draft mode is on.

## 2. Client and live fetching

- `createClient` from `next-sanity` with `projectId`, `dataset`, a pinned `apiVersion`, `useCdn: true`, and `stega: { studioUrl }`.
- `defineLive` from `next-sanity/live` returns `sanityFetch` and `<SanityLive />`. Use `sanityFetch` in Server Components instead of `client.fetch`.
- Render `<SanityLive />` in the root layout on every request. When someone publishes, it triggers revalidation so the live site updates without a rebuild or a hand-written webhook.
- Pass `stega: false` to `sanityFetch` in `generateMetadata`, `generateStaticParams`, JSON-LD and anything that becomes a URL or attribute. Use `perspective: 'published'` in `generateStaticParams`.
- If the project needs finer control than the Live API (custom `cacheLife`, tag fan-out), replace `sanityFetch` with your own cached helper and a webhook route handler that verifies the signature with `parseBody` from `next-sanity/webhook` (pattern in caching.md).

## 3. Draft mode and Visual Editing

- `app/api/draft-mode/enable/route.ts` exports `GET` from `defineEnableDraftMode` (`next-sanity/draft-mode`), which verifies the request came from an authenticated Studio session.
- A disable route and a visible "Exit preview" button for editors.
- In the root layout, render `<VisualEditing />` from `next-sanity/visual-editing` only when `(await draftMode()).isEnabled`.
- In the Studio, `presentationTool` with `previewUrl.initial` set to the site origin per environment, `previewMode.enable: '/api/draft-mode/enable'`, and `resolve` locations mapping document types to routes.
- Add the site origins (local, preview, staging) to the Sanity project's CORS origins with credentials allowed.
- If previews are behind Vercel Deployment Protection, the Studio iframe needs a protection bypass for that deployment.

## 4. Images with a Sanity loader

- Build the base URL with `createImageUrlBuilder` (named export from `@sanity/image-url`), so crop and hotspot are applied.
- Render it with `Image` from `next-sanity/image`: a client wrapper around `next/image` with a Sanity CDN loader built in (it is marked alpha; pin the version and check it on upgrade). If you need your own loader, write a small `'use client'` wrapper around `next/image` instead; loader functions cannot be passed from Server Components.
- Set `width` and `height` from `asset->metadata.dimensions`, `alt` from the field, `sizes` from the layout.
- Add `cdn.sanity.io` to `images.remotePatterns` only if some images still go through Next's optimiser.

## 5. Portable Text

- `PortableText` from `next-sanity` (re-exports `@portabletext/react`) with a `components` map for every custom block and annotation.
- Internal link annotations resolve to `next/link`; inline images use `SanityImage`.
- Headings inside rich text start at `h2`.

## 6. Where the Studio lives

Default: a separate `studio/` package deployed with `sanity deploy`. Embedding the Studio at `/studio` in the Next.js app (`NextStudio` from `next-sanity/studio`) is fine when the client wants one URL; exclude the route from `ensureStatic` layouts, `noindex` it, and keep it out of the sitemap.
