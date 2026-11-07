---
name: nextjs
description: "How Tahi Studio builds app-like sites with the Next.js App Router (Next.js 16): when it is worth it over Astro, project structure, server versus client components, Cache Components ('use cache', cacheLife, cacheTag, revalidateTag, updateTag, ensureStatic), Server Actions and route handlers, proxy.ts (formerly middleware), the metadata API, sitemap, robots and JSON-LD, next/image and next/font, Sanity with next-sanity, auth options at risk 3, and hosting on Vercel versus Cloudflare (vinext, OpenNext). Use when the user says 'build this in Next', 'Next.js app', 'App Router', 'server component', 'client component', 'use client', 'use cache', 'caching is stale', 'revalidate', 'server action', 'route handler', 'API route', 'middleware', 'proxy.ts', 'generateMetadata', 'next/image', 'add login', 'deploy Next to Vercel', 'Next on Cloudflare', 'upgrade Next', or when PROJECT.md says build: nextjs."
---

# Next.js — app-like sites

Read `PROJECT.md` first (`tahi-core:tahi-project`). Its levels decide which checklist items apply. Repo rules (branches, Biome, pnpm, secrets, README) are in `tahi-core:tahi-project` [references/repo-hygiene.md].

## When it is worth it

- **Use Next.js** when the site behaves like an app: logins, dashboards, per-user content, lots of server logic, a React component library to reuse, or a client team that already works in React.
- **Use Astro instead** (`tahi-code:astro`) for a content or marketing site that needs a CMS and forms. Next.js costs more to host, ships more JavaScript and has more moving parts in caching.
- A marketing site plus an app is often two projects: Astro for the site, Next.js for the app on a subdomain.

## Version and baseline

- Current major is **Next.js 16** (16.4 at the time of writing). Node 20.9 or later; use the current LTS. Security releases now come on a regular schedule; apply them at the cadence in repo-hygiene.
- New apps: `pnpm create next-app@latest` with TypeScript, App Router, `src/` directory, and Biome when it asks for a linter (house default). `next lint` no longer exists; lint runs from `package.json` scripts.
- Upgrades: `pnpm dlx next@canary upgrade --agent=latest` or the codemods, on their own branch, checked on a preview.
- Turbopack is the default bundler. Only fall back to `--webpack` for a plugin that truly needs it.

## Project structure

```
src/
  app/
    layout.tsx            root layout: <html lang>, fonts, tokens, metadataBase, motion provider
    (site)/               route group for marketing pages
    (app)/                route group for signed-in pages [if:auth]
    api/                  route handlers (webhooks, public endpoints)
    sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
  components/
    ui/                   primitives (server components by default)
    sections/             page sections, 1:1 with CMS blocks
    client/               the few 'use client' components
  lib/                    data access (server-only), sanity/, auth/, seo.ts
  styles/tokens.css       design tokens as CSS custom properties
  styles/globals.css      reset and base; imports tokens.css
  scripts/motion.ts       the motion primitive
  proxy.ts                request interception (optional)
```

- **Tokens** live in `src/styles/tokens.css`, imported once by `globals.css` in the root layout. Components use CSS Modules that reference tokens only. Rules and names: `tahi-design:design-consistency`.
- **Motion:** the primitive from `tahi-design:site-animator` lives in `src/scripts/motion.ts`, started from one small client component in the root layout. Because App Router navigations do not reload the page, re-scan on pathname change. Components opt in with data attributes.

## Server and client components

- Everything is a Server Component unless it needs state, effects, event handlers or browser APIs. Put `'use client'` on the smallest leaf that needs it, not on a page or layout.
- Data access lives in `src/lib/` and starts with `import "server-only"` so it can never be bundled for the browser.
- Only `NEXT_PUBLIC_` variables reach the browser, and they are baked in at build time. Secrets never get that prefix.
- Props passed from server to client components are serialised and visible in the page. Pass only what the client needs.

## Caching: Cache Components

Next.js 16.4 recommends Cache Components for every app, and new apps have it on. Use it on every new project; the older implicit model is legacy (see [references/caching.md](references/caching.md) if you inherit a 14 or 15 app).

- Enable `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`.
- **Nothing is cached unless you say so.** Mark cached data or UI with `'use cache'` at the top of a function or component, and always pair it with `cacheLife('hours' | 'days' | 'max' | ...)`.
- Tag what content can change: `cacheTag('page:' + slug)`. Invalidate from a webhook route handler with `revalidateTag(tag, 'max')` (serve stale, refresh in the background). In a Server Action that must show the user their own change, use `updateTag(tag)`.
- Request-time data (cookies, headers, search params, per-user data) is not cached: wrap the component that reads it in `<Suspense>` so the rest of the page stays in the static shell.
- **Marketing routes stay static:** add `export const ensureStatic = 'navigation'` to the marketing layout. The build fails if someone adds request-time rendering there by accident.
- Patterns, the profile table and debugging stale content: [references/caching.md](references/caching.md).

## Server Actions and route handlers

- **Server Actions** for forms and mutations from your own UI. Every action is a public POST endpoint: validate input (Zod), check the session and authorisation inside the action, every time.
- **Route handlers** (`app/api/.../route.ts`) for webhooks (Sanity, Stripe), endpoints other clients call, and anything that needs raw request access. Verify webhook signatures before doing anything.
- The form pipeline (Turnstile, Resend, CRM, failure alerts) is `tahi-code:cloudflare` [references/forms.md]; it works the same on Vercel.

## proxy.ts

- Next.js 16 renamed Middleware to **Proxy**: `proxy.ts` at the project root (or in `src/`), exporting a `proxy` function and a `matcher`. It runs on the Node.js runtime. `middleware.ts` still works for the Edge runtime but is deprecated.
- Use it for redirects that need request data, A/B rewrites, locale detection and optimistic auth redirects. It is not an authorisation layer: check permissions where the data is read.
- Simple redirects go in `redirects()` in `next.config.ts`, not in Proxy.

## SEO implementation

- `metadataBase` set to the production origin in the root layout. Static `export const metadata` or `generateMetadata` per route: title (with a `template` in the root), description, `alternates.canonical`, Open Graph. Wording is `tahi:tahi-seo`.
- Non-production deploys: `robots: { index: false, follow: false }` from an environment check, plus `X-Robots-Tag: noindex` from `headers()` or the host.
- `app/sitemap.ts` and `app/robots.ts` generate both files; robots disallows everything outside production.
- JSON-LD: a `<script type="application/ld+json">` in the page or layout with `JSON.stringify(data).replace(/</g, '\\u003c')` to prevent script injection. Types and content: `tahi:tahi-seo`, `tahi:tahi-aeo`.
- Redirects: `redirects()` for the migration map. `permanent: true` sends a 308, the method-preserving equivalent of a 301; that is fine for search engines. For thousands of URLs, follow Next.js's "managing redirects at scale" guide or use the host's redirect feature.

## Images and fonts

- `next/image` for every content image, with `sizes` set and `priority` only on the first-viewport image. Next.js 16 defaults: `qualities` is `[75]`, `minimumCacheTTL` is four hours, local images with query strings need `images.localPatterns`. Remote hosts go in `images.remotePatterns` (`images.domains` is deprecated).
- **Sanity images:** render them through a Sanity CDN loader (`Image` from `next-sanity/image`), so images are not optimised twice (and do not count against the host's image allowance). See [references/sanity-next.md](references/sanity-next.md).
- `next/font/local` for licensed brand fonts, `next/font/google` otherwise, each with `variable: '--font-body'` (the token name) applied on `<html>`.

## Auth at risk 3

Any login makes the project risk 3 (`tahi-core:tahi-project`). Defaults, in order:

1. **A managed identity provider** (Clerk, Auth0, WorkOS or the client's existing one) when the client accepts the cost and the data location. Least for us to secure.
2. **Better Auth** when user data must live in the client's own database. Auth.js (NextAuth) is now maintained by the Better Auth team for security fixes only; do not start new projects on it.

Whichever you use: sessions in `httpOnly`, `secure`, `sameSite` cookies; authorisation checked in every Server Action, route handler and data function, not only in Proxy; rate limits on sign-in and reset; the security review in `tahi-core:dev-qa`.

## Hosting

- **Default: Vercel.** It runs the reference adapter, so every Next.js feature works without translation. Client work needs a **Pro** team: the Hobby plan is for non-commercial personal use only. Preview deploys per branch, Deployment Protection on previews, environment variables per environment, Instant Rollback (how far back depends on the plan).
- **Cloudflare** only when the client wants one platform or has a reason. Cloudflare now recommends **vinext** (a Vite-based reimplementation of the Next.js API, in beta) over the OpenNext adapter for new apps; OpenNext is kept for existing apps. Run `npx vinext check`, then soak the app on a staging Worker before committing. Details: `tahi-code:cloudflare`.
- **AWS** when the client mandates it: `tahi-code:aws`.
- Whatever the host, production deploys need an explicit instruction from a person, and `main` is production (repo-hygiene).

## Gotchas

- `params`, `searchParams`, `cookies()`, `headers()` and `draftMode()` are all async in Next.js 16. Sync access is removed.
- A missing `cacheLife` gives the `default` profile (revalidate every 15 minutes). Be explicit.
- Calling `revalidateTag` with one argument is deprecated; pass a profile (`'max'`).
- Parallel route slots need a `default.tsx` or the build fails.
- Stega characters from Sanity's Visual Editing in `<title>` or meta tags corrupt SEO; pass `stega: false` to metadata queries.
- A webhook route handler that is not excluded from Deployment Protection gets a 401 on previews. Use a bypass secret for preview webhooks.
- `scroll-behavior: smooth` is no longer added automatically; add `data-scroll-behavior="smooth"` on `<html>` if the design wants it (and respect reduced motion).

## Production checklist

- [ ] [R1] [nextjs] Cache Components on; every `'use cache'` has a `cacheLife`; marketing layouts use `ensureStatic`.
- [ ] [R1] [nextjs] `metadataBase`, unique titles and descriptions, canonicals on every route.
- [ ] [R1] [nextjs] `sitemap.ts` and `robots.ts` correct; non-production deploys are `noindex` (meta and header).
- [ ] [R1] [nextjs] No secret has a `NEXT_PUBLIC_` prefix; data modules import `server-only`.
- [ ] [R1] [nextjs] JSON-LD escaped and valid for each template type.
- [ ] [R1] [nextjs] `next/image` with `sizes` everywhere; Sanity images through the Sanity loader.
- [ ] [R1] [nextjs] Fonts through `next/font` mapped to token variables.
- [ ] [R1] [nextjs] [if:forms] Server Action validates input and Turnstile; a real submission arrives.
- [ ] [R1] [nextjs] Hosting plan allows commercial use; production domain and rollback tested once.
- [ ] [R2] [nextjs] [if:cms] Publishing in the CMS updates the live page within the agreed time (tag revalidation or Live API).
- [ ] [R2] [nextjs] Webhook route handlers verify signatures.
- [ ] [R2] [nextjs] Client JavaScript per route reviewed with the bundle analyser; Core Web Vitals pass on mobile.
- [ ] [R2] [nextjs] Previews protected; staging environment with its own variables.
- [ ] [R3] [nextjs] [if:auth] Authorisation checked in every Server Action, route handler and data function; Proxy is not the only check.
- [ ] [R3] [nextjs] [if:auth] Rate limiting on sign-in, sign-up and reset; sessions in secure `httpOnly` cookies.
- [ ] [R3] [nextjs] Error monitoring with alerts to a person; logs retained per the profile.
