# Astro gotchas

Things that cost time on Astro 7 projects. Each one says what goes wrong and what to do.

## Astro 7 changes

- **The Rust compiler is the only compiler, and it is strict.** Unclosed non-void tags and unterminated attributes are build errors, and invalid nesting (a `<div>` inside a `<p>`) is no longer silently corrected. Fix the markup; do not look for a flag.
- **`compressHTML` defaults to `'jsx'`.** Whitespace between inline elements can disappear ("Read<a>more</a>"). Add `{' '}` where a space matters, or set `compressHTML: true` for the old behaviour.
- **Markdown uses Sätteri by default.** remark and rehype plugins only run if you install `@astrojs/markdown-remark` and set `markdown.processor: unified()`.
- **`src/fetch.ts` is reserved** for advanced routing. Rename any file with that name, or set `fetchFile`.
- **`@astrojs/db` is gone.** Use D1 through the Cloudflare binding, or another database library.
- **Route caching moved out of `experimental`**: `cache` and `routeRules` are top level. Old config under `experimental` is ignored.
- **Zod 4** powers schemas. Import `z` from `astro/zod`. Zod 3 code may need small changes (error maps, some string helpers).
- **Node 22.22 or later.** Pin it in `.nvmrc` and the Workers Builds environment.
- `astro:transitions` internal constants (`TRANSITION_AFTER_SWAP` and friends) are removed; listen for the event names (`astro:after-swap`) directly.

## Cloudflare runtime

- `astro dev` runs on `workerd`, so dev matches production. Node-only libraries fail in dev too, which is good: you find out early. Add `nodejs_compat` when a library needs Node APIs.
- `Astro.locals.runtime` is gone. Read bindings and secrets with `import { env } from "cloudflare:workers"` or through `astro:env`. Request geolocation is `Astro.request.cf`; the execution context is `Astro.locals.cfContext`.
- KV-backed sessions are eventually consistent: a write can take up to 60 seconds to be visible everywhere. Do not use sessions for anything that must be read back instantly from another location.
- `_headers` and `_redirects` only affect prerendered pages and assets. On-demand routes need middleware.
- Building per environment: `CLOUDFLARE_ENV=staging astro build`, then deploy. Each environment needs its own build.
- `@astrojs/cloudflare` does its own prerendering, so `experimental.parallelPrerender` has no effect there.

## Scripts and islands

- Processed `<script>` tags run once per full page load. With `<ClientRouter />`, wrap set-up in `document.addEventListener("astro:page-load", ...)` and make it idempotent.
- `<script>` with any attribute (including `type="module"` or `is:inline`) is not bundled or de-duplicated. Only use `is:inline` for tiny head snippets that must run before paint (a theme class).
- Framework islands ship their framework runtime. One React island on a page costs React; count it against the performance budget.
- Server island props travel in the URL. Over 2,048 bytes they switch to POST and lose browser caching. Pass IDs, not objects.

## Content and data

- Content collections' data store is regenerated on build. A Markdown edit that does not show in dev usually needs a dev restart after changing `content.config.ts`.
- Live collections are not optimised for images and cannot render MDX.
- `getStaticPaths` runs once per build; it is the place to fetch all slugs, not every page's data twice.

## SEO

- Without `site` in the config, canonical URLs and the sitemap silently use wrong or empty origins.
- Astro's `redirects` config on a static build writes meta-refresh pages, which are not true 301s. Use `public/_redirects` or Bulk Redirects for SEO-critical moves and verify with `curl -I`.
- Trailing slashes: pick `trailingSlash: "never"` or `"always"` at the start, match the old site on a migration, and keep canonicals, sitemap and internal links consistent with it.
