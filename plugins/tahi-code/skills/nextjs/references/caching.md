# Caching in Next.js 16 (Cache Components)

The model has changed three times (14, 15, 16). This file is for Next.js 16 with `cacheComponents: true`. If you inherit an older app, read section 6 first and do not mix the two models in one app.

## Contents

1. The mental model
2. cacheLife profiles
3. Patterns for a CMS-driven site
4. Invalidation from a CMS webhook
5. Debugging stale or dynamic pages
6. Inherited apps on the previous model

## 1. The mental model

- Every page renders at request time unless parts of it are marked cacheable. Caching is opt-in.
- `'use cache'` at the top of an async function or component caches its return value. Arguments and captured values become part of the cache key automatically.
- Cached output, plus anything synchronous, forms the **static shell**, served instantly. Request-time parts (`cookies()`, `headers()`, `searchParams`, per-user data) stream in inside `<Suspense>` boundaries.
- Reading request-time data outside a `<Suspense>` boundary shows a "blocking route" warning in the dev overlay. Fix it: wrap in `<Suspense>`, or pass the value into a cached function as an argument.
- `'use cache: private'` gives a lifetime to a function that reads cookies or headers directly (per-user, included in prefetches). `'use cache: remote'` stores entries in a shared remote cache handler. Use them only when you understand why the default is not enough.

## 2. cacheLife profiles

Always set one. Built-in profiles (stale / revalidate / expire):

| Profile | stale | revalidate | expire |
|---|---|---|---|
| `default` (when none is set) | 5m | 15m | never |
| `seconds` | 30s | 1s | 60s |
| `minutes` | 5m | 1m | 1h |
| `hours` | 5m | 1h | 1d |
| `days` | 5m | 1d | 1w |
| `weeks` | 5m | 1w | 30d |
| `max` | 5m | 30d | 1y |

Short-lived caches (`seconds`, `revalidate: 0`, or `expire` under five minutes) are left out of prerendering and become dynamic holes. Custom profiles can be named in `next.config.ts` under `cacheLife`.

## 3. Patterns for a CMS-driven site

```ts
// src/lib/content.ts
import "server-only";
import { cacheLife, cacheTag } from "next/cache";

export async function getPage(slug: string) {
  "use cache";
  cacheLife("max");          // content changes only when someone publishes
  cacheTag(`page:${slug}`, "pages");
  return fetchPageFromCms(slug);
}
```

- Content pages: `cacheLife('max')` plus tags, invalidated on publish. Time-based expiry is the safety net, not the mechanism.
- Navigation, footer, site settings: their own cached function with a `settings` tag, so a footer edit does not invalidate every page body.
- `generateStaticParams` prerenders known slugs at build time; unknown slugs render once and are then cached.
- `export const ensureStatic = 'navigation'` on the marketing layout fails the build if a request-time component sneaks in. Use `'shell'` instead if a page needs a small dynamic part (a signed-in avatar) inside `<Suspense>`.

## 4. Invalidation from a CMS webhook

With Sanity, `next-sanity`'s `defineLive` and `<SanityLive />` handle invalidation for you (see sanity-next.md). For any other source, or if you replace `sanityFetch`:

```ts
// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await verifyAndParse(request); // check the webhook signature first; reject if invalid
  if (!body) return new Response("Unauthorised", { status: 401 });
  revalidateTag(`page:${body.slug}`, "max");
  if (body._type === "siteSettings") revalidateTag("settings", "max");
  return Response.json({ revalidated: true });
}
```

- `revalidateTag(tag, 'max')` serves stale content while the fresh version renders in the background. The one-argument form is deprecated.
- `updateTag(tag)` only works in Server Actions and expires immediately (read-your-own-writes), for an editor or user who must see their change at once.
- `refresh()` in a Server Action refreshes uncached data only.
- Multi-instance hosts need a shared cache handler for tags to propagate (`cacheHandlers` in config). Vercel provides this; self-hosted or other adapters may not. Check before relying on tag invalidation.

## 5. Debugging stale or dynamic pages

1. **Stale after publish:** does the cached function call `cacheTag` with the tag the webhook revalidates? Did the webhook fire (Sanity's webhook log) and return 200? Is the preview deploy protected so the webhook got a 401?
2. **A page you expected to be static is dynamic:** add `ensureStatic = 'navigation'` temporarily; the build error names the component reading request-time data.
3. **Different content per instance:** no shared cache handler on a multi-instance host.
4. Next.js 16.3+ dev overlay explains blocking routes and links to fixes. Read it before guessing.

## 6. Inherited apps on the previous model

Next.js 14 and 15 App Router apps without `cacheComponents` use the previous model, documented in Next.js's "Caching and Revalidating (Previous Model)" guide:

- Route segment config (`export const revalidate`, `export const dynamic`), `fetch(url, { next: { revalidate, tags } })`, `unstable_cache`.
- Next.js 14 cached `fetch` by default; 15 stopped doing that and made GET route handlers uncached by default.
- Moving to Cache Components is planned work, on its own branch, using the official migration guide and agent skills. Do not half-migrate: one model per app.
