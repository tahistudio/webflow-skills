---
name: astro
description: "How Tahi Studio builds content and marketing sites in Astro (Astro 7): project structure, layouts and components, where design tokens and the motion script live, content collections and loaders, Sanity integration, islands and server islands, Actions for forms, astro:env, images and the Fonts API, view transitions, SEO (Seo component, canonical, sitemap, robots, JSON-LD, redirects), the Cloudflare adapter, previews and deploys, gotchas and a production checklist scaled by risk. Use when the user says 'build this in Astro', 'new Astro site', 'Astro component', 'Astro layout', 'content collection', 'add a page', 'island', 'server island', 'Astro action', 'contact form in Astro', 'astro:env', 'Astro image', 'add fonts', 'view transitions', 'sitemap', 'meta tags', 'schema', 'Astro on Cloudflare', 'upgrade Astro', or when PROJECT.md says build: astro."
---

# Astro — content and marketing sites

Read `PROJECT.md` first (`tahi-core:tahi-project`). Its levels decide which checklist items apply. Repo setup (branches, Biome, pnpm, secrets, README) is in `tahi-core:tahi-project` [references/repo-hygiene.md]; do not repeat it here.

## When to use it

- **Use Astro** for content and marketing sites that Tahi or a developer maintains: fast, mostly static, a CMS (`tahi-code:sanity`) or Markdown, a few dynamic parts (forms, search, a personalised block).
- **Use Webflow instead** when the client's team must build new page layouts without a developer.
- **Use Next.js instead** (`tahi-code:nextjs`) for logins, dashboards, heavy per-user rendering or a React app inside the site.
- The choice is made by `tahi-core:stack-picker` and recorded; do not reopen it here.

## Version and baseline

- Current major is **Astro 7** (7.4 at the time of writing). It needs Node 22.22 or later. Start new projects on the latest 7.x with `pnpm create astro@latest`, then add the Cloudflare adapter with `pnpm astro add cloudflare` (`tahi-code:cloudflare`). Commands here use pnpm, the house default.
- Upgrades: `pnpm dlx @astrojs/upgrade` on its own branch, checked on a preview. Upgrade `@astrojs/cloudflare` alongside `astro`; their versions are coupled.
- TypeScript strict. No UI framework by default; plain `.astro` components and small `<script>` blocks. Add React (or another framework) only for an island that genuinely needs it, or for Sanity's Visual Editing.

## Project structure

```
src/
  pages/                 routes and endpoints (robots.txt.ts, api/*)
  layouts/BaseLayout.astro   <html>, <head>, tokens, fonts, motion script, header, footer
  components/
    ui/                  primitives: Button, Link, Media, Icon
    sections/            page sections, one per Sanity block type
    seo/                 Seo.astro, JsonLd.astro
  styles/tokens.css      design tokens as CSS custom properties
  styles/global.css      reset and base element styles; imports tokens.css
  scripts/motion.ts      the motion primitive, loaded once
  lib/sanity/            client wrappers, GROQ queries, image URL builder
  actions/index.ts       form handlers (Astro Actions)
  middleware.ts          headers and request logic for server-rendered routes
  content.config.ts      build-time content collections (Markdown, data files)
astro.config.mjs
public/                  _redirects, _headers, favicons; files served as-is
```

The full layout, the `Seo` and `JsonLd` components and the robots endpoint are in [references/structure.md](references/structure.md).

- **Sections map 1:1 to CMS blocks.** `components/sections/Hero.astro` renders a `hero` block and nothing else. Its props are the block's fields. See `tahi-code:sanity` for the modelling side.
- **Pages are thin.** A page fetches data and maps blocks to sections; layout and styling live in components.
- **One `BaseLayout`.** Variants (landing page with no nav, legal page) are props or a thin layout that wraps it.

## Design tokens and motion

- **Tokens** live in `src/styles/tokens.css` as CSS custom properties on `:root`, imported once through `global.css` in `BaseLayout`. Names, scales and the starter file come from `tahi-design:design-consistency`; do not invent values here.
- Component styles are scoped `<style>` blocks that use only tokens (`var(--space-6)`, `var(--color-text-muted)`). A raw hex or px value in a component is drift; snap it.
- **The motion primitive** from `tahi-design:site-animator` goes in `src/scripts/motion.ts` and is loaded once, in `BaseLayout`, with a processed `<script>` (`<script> import "../scripts/motion.ts"; </script>`). Astro bundles and de-duplicates it. Components opt in with data attributes; they never load their own animation library. Motion rules, tokens and reduced-motion behaviour belong to site-animator.
- With `<ClientRouter />`, bundled scripts run once per full load only. Initialise motion on `astro:page-load` instead.

## Rendering: static first

- Every page is prerendered by default. Install the Cloudflare adapter anyway (forms nearly always need it) and opt individual routes into on-demand rendering with `export const prerender = false`.
- Opt a route into on-demand rendering only for: an HTML form posting to an Action, a page that must be fresh per request, an API endpoint, or Sanity Visual Editing on the preview environment.
- **Islands:** a framework component hydrates only with a `client:*` directive. Prefer `client:visible` or `client:idle`; `client:load` only for above-the-fold interaction.
- **Server islands:** `server:defer` on a component renders it after the static page, with `slot="fallback"` content meanwhile. Use for a small personalised or live block on an otherwise static page. Keep props small: over 2,048 bytes of props switches the request to POST, which browsers do not cache.

## Content

- **Sanity** through `@sanity/astro` (`import { sanityClient } from "sanity:client"`), queried at build time in `getStaticPaths` and page frontmatter. Set `useCdn: false` for static builds. Wiring, images, Portable Text and preview: [references/sanity-astro.md](references/sanity-astro.md). Modelling and Studio: `tahi-code:sanity`.
- **Markdown and data files** in build-time collections: `src/content.config.ts`, `defineCollection` with the `glob()` or `file()` loader from `astro/loaders`, schemas with `z` from `astro/zod` (Zod 4), `reference()` for relations, `getCollection`, `getEntry` and `render` from `astro:content`.
- **Live collections** (`src/live.config.ts`, `defineLiveCollection`, `getLiveEntry`) fetch at request time. Rarely needed on marketing sites; prefer a rebuild on publish.

## Forms

Use an Astro Action: `defineAction` with `accept: "form"` and a Zod `input` in `src/actions/index.ts`; throw `ActionError` for failures, check `isInputError` for field errors. An HTML form posting to `action={actions.contact}` needs the page rendered on demand. The pipeline itself (Turnstile, Resend, CRM, failure alerts) is `tahi-code:cloudflare` [references/forms.md].

## Environment variables

- Declare every variable in `env.schema` in `astro.config.mjs` with `envField`: `context: "client"` and `access: "public"` for browser-safe values, `context: "server"` and `access: "secret"` for keys. Import from `astro:env/client` or `astro:env/server`.
- `astro:env` is not available inside `astro.config.mjs`; use `process.env` there.
- On Cloudflare, secrets come from `.dev.vars` locally and `wrangler secret put` remotely (`tahi-code:cloudflare`).

## Images and fonts

- Local images go in `src/assets/` and render with `<Image />` or `<Picture />` from `astro:assets` (width, height and `alt` required; `loading="eager"` and `fetchpriority="high"` on the first-viewport image only). Images in `public/` are not optimised.
- Sanity images are transformed by Sanity's image CDN through `@sanity/image-url`, not by Astro's image service. Do not process them twice.
- The Cloudflare adapter's default image service uses the Cloudflare Images binding at runtime; check the plan's Images allowance on image-heavy on-demand pages.
- **Fonts:** the Fonts API. Register families in the `fonts` array of `astro.config.mjs` (`name`, `cssVariable`, `provider: fontProviders.local()` for licensed brand files, or `fontProviders.fontsource()` / `fontProviders.google()`). Render `<Font cssVariable="--font-body" preload />` from `astro:assets` in the head. Use the token names (`--font-display`, `--font-body`) as the `cssVariable` so tokens and fonts are one system. Astro self-hosts the files and generates fallbacks.

## View transitions

- Default: none, or native cross-document transitions in CSS when the motion level allows it (rules in `tahi-design:site-animator`). No JavaScript, no lifecycle changes.
- `<ClientRouter />` from `astro:transitions` only when state must persist across pages (an audio player, `transition:persist`). It changes script behaviour: listen for `astro:page-load`, guard globals, and re-render Turnstile widgets explicitly.

## SEO implementation

- Set `site` in `astro.config.mjs` to the production origin. Canonicals and the sitemap depend on it.
- One `Seo` component in the head of `BaseLayout`: title, description, canonical, Open Graph and Twitter tags, and `noindex` on every non-production build. Titles and descriptions come from the CMS with fallbacks; wording is `tahi:tahi-seo`.
- Sitemap: `@astrojs/sitemap`, filtered to exclude `noindex` pages, drafts and utility routes.
- `robots.txt` from an endpoint that disallows everything outside production (template in references/structure.md).
- JSON-LD through one `JsonLd` component (Organization or LocalBusiness site-wide, plus Article, Service, FAQPage, BreadcrumbList as pages need). Which types and what they say is `tahi:tahi-seo` and `tahi:tahi-aeo`.
- Redirects: on a prerendered site, Astro's `redirects` config writes meta-refresh HTML pages unless the adapter writes host redirects. Put SEO-critical 301s in `public/_redirects` (or Bulk Redirects) and confirm each returns a real 301 with `curl -I`.

## Environments, deploy and rollback

Hosting, previews per branch, staging, secrets, the deploy hook for CMS rebuilds and rollback are all `tahi-code:cloudflare`. Build with `astro build`, check with `astro preview` (runs on `workerd`). Per-environment builds use `CLOUDFLARE_ENV=staging astro build`.

## Gotchas

[references/gotchas.md](references/gotchas.md) covers Astro 7's stricter compiler, whitespace changes, Markdown processor change, reserved files, Cloudflare runtime differences and script lifecycle. Read it before an upgrade or when something works in dev and not in the build.

## Production checklist

- [ ] [R1] [astro] `site` set; canonical tags correct on every template; one canonical host.
- [ ] [R1] [astro] Every template has a unique title and description from content, with fallbacks.
- [ ] [R1] [astro] Sitemap generated, excludes drafts and `noindex` pages; `robots.txt` blocks non-production builds.
- [ ] [R1] [astro] Non-production builds send `noindex` (meta and header).
- [ ] [R1] [astro] JSON-LD validates in the Rich Results Test for each template type used.
- [ ] [R1] [astro] Tokens only in component styles; the drift audit in `tahi-design:design-consistency` is clean enough for the craft level.
- [ ] [R1] [astro] Motion script loaded once from `BaseLayout`; reduced motion respected.
- [ ] [R1] [astro] Images: `alt` on every image, first-viewport image eager, everything else lazy; no unoptimised large files in `public/`.
- [ ] [R1] [astro] Fonts through the Fonts API, preloaded only where above the fold.
- [ ] [R1] [astro] No secrets in `astro:env/client` or the client bundle (search the build output for key prefixes).
- [ ] [R1] [astro] [if:forms] Action validates input and Turnstile server-side; a real submission arrives.
- [ ] [R1] [astro] 404 page exists, is `noindex`, and returns status 404.
- [ ] [R2] [astro] [if:migration] Every old URL returns a real 301 (not meta refresh) to a 200 page.
- [ ] [R2] [astro] [if:cms] Publishing in the CMS triggers a rebuild and the change is live within the agreed time.
- [ ] [R2] [astro] Core Web Vitals pass on mobile for the main templates; JavaScript shipped per page is justified island by island.
- [ ] [R2] [astro] Content Security Policy on (`security.csp`) with no console violations.
- [ ] [R3] [astro] Every on-demand route and Action checks authorisation and validates input; rate limited.
