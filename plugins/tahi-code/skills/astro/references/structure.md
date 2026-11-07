# Astro project skeleton

Starting files for a Tahi Astro site. Adapt names to the project; keep the shape. Every snippet assumes the Cloudflare adapter and pnpm.

## Contents

1. astro.config.mjs
2. BaseLayout.astro
3. Seo.astro
4. JsonLd.astro
5. robots.txt endpoint
6. A page that maps CMS blocks to sections
7. Middleware for headers on server-rendered routes

## 1. astro.config.mjs

```js
import { defineConfig, envField, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";

export default defineConfig({
  site: "https://www.example.co.nz",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: "abc123",
      dataset: "production",
      apiVersion: "2026-11-01",
      useCdn: false, // static build: always read fresh content
    }),
    sitemap({
      filter: (page) => !page.includes("/thanks/") && !page.includes("/styleguide/"),
    }),
  ],
  env: {
    schema: {
      SITE_ENV: envField.enum({ context: "server", access: "public", values: ["development", "preview", "staging", "production"], default: "development" }),
      TURNSTILE_SITE_KEY: envField.string({ context: "client", access: "public" }),
      TURNSTILE_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      FORM_TO: envField.string({ context: "server", access: "secret" }),
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Brand Text",
      cssVariable: "--font-body",
      options: { variants: [{ src: ["./src/assets/fonts/brand-text-var.woff2"], weight: "100 900", style: "normal" }] },
    },
  ],
  security: { csp: true }, // risk 2+; check the console on every template
});
```

- Pin `apiVersion` to the date you start; move it deliberately.
- Keep `site` as the production origin even on previews; canonicals should always point at production.

## 2. BaseLayout.astro

```astro
---
import "../styles/global.css"; // imports tokens.css first
import { Font } from "astro:assets";
import Seo from "../components/seo/Seo.astro";
import JsonLd from "../components/seo/JsonLd.astro";
import Header from "../components/sections/Header.astro";
import Footer from "../components/sections/Footer.astro";
import { organisationSchema } from "../lib/seo";

interface Props { seo: { title: string; description: string; image?: string; noindex?: boolean } }
const { seo } = Astro.props;
---
<html lang="en-NZ">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Font cssVariable="--font-body" preload />
    <Font cssVariable="--font-display" preload />
    <Seo {...seo} />
    <JsonLd schema={organisationSchema} />
    <slot name="head" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main"><slot /></main>
    <Footer />
    <script>
      import "../scripts/motion.ts";
    </script>
  </body>
</html>
```

- `lang` matches the audience (`en-NZ`, `en-AU`, `en-GB`). Wording rules are `tahi:tahi-brand-voice`.
- The plain `<script>` is processed and bundled once for the whole site. Never load the motion script from a component.

## 3. Seo.astro

```astro
---
import { SITE_ENV } from "astro:env/server";
interface Props { title: string; description: string; image?: string; noindex?: boolean }
const { title, description, image, noindex = false } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
const ogImage = new URL(image ?? "/og-default.jpg", Astro.site);
const blockIndexing = noindex || SITE_ENV !== "production";
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
{blockIndexing && <meta name="robots" content="noindex, nofollow" />}
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImage} />
<meta name="twitter:card" content="summary_large_image" />
```

Pair the meta tag with an `X-Robots-Tag: noindex` header on previews and staging (`tahi-code:cloudflare`).

## 4. JsonLd.astro

```astro
---
interface Props { schema: Record<string, unknown> | Record<string, unknown>[] }
// Escape "<" so content can never close the script tag (XSS).
const json = JSON.stringify(Astro.props.schema).replace(/</g, "\\u003c");
---
<script type="application/ld+json" set:html={json} />
```

Build schema objects in `src/lib/seo.ts` from CMS data (Organization, LocalBusiness, Article, Service, FAQPage, BreadcrumbList). Only mark up what is visible on the page.

## 5. robots.txt endpoint

`src/pages/robots.txt.ts`:

```ts
import type { APIRoute } from "astro";
import { SITE_ENV } from "astro:env/server";

export const GET: APIRoute = ({ site }) => {
  const body =
    SITE_ENV === "production"
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`
      : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
```

AI crawler rules, if the client wants any, are `tahi:tahi-aeo`.

## 6. A page that maps CMS blocks to sections

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { getPage, getAllPageSlugs } from "../lib/sanity/queries";
import Hero from "../components/sections/Hero.astro";
import FeatureGrid from "../components/sections/FeatureGrid.astro";
import CtaBand from "../components/sections/CtaBand.astro";

export async function getStaticPaths() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}
const page = await getPage(Astro.params.slug!);
const sections = { hero: Hero, featureGrid: FeatureGrid, ctaBand: CtaBand } as const;
---
<BaseLayout seo={page.seo}>
  {page.blocks.map((block) => {
    const Section = sections[block._type as keyof typeof sections];
    return Section ? <Section {...block} /> : null;
  })}
</BaseLayout>
```

An unknown block type renders nothing in production and logs a warning in development, so a new block added in the Studio before the front end supports it cannot break the page.

## 7. Middleware for headers on server-rendered routes

`_headers` does not touch responses rendered by the Worker. `src/middleware.ts`:

```ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
});
```

Prerendered pages are static assets, so they take their headers from `public/_headers`. Set the same baseline in both places, or use one Response Header Transform Rule on the zone for everything.
