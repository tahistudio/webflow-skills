---
name: cloudflare
description: "How Tahi Studio hosts and runs code sites on Cloudflare: Workers with static assets (not Pages) for new projects, wrangler config, preview URLs per branch, staging and production environments, secrets, deploys and rollbacks, DNS and domain cutover, redirects (_redirects, Bulk Redirects, redirect rules), security headers (_headers versus Worker responses), caching, Turnstile and form handling (Resend, CRM hooks), and KV, D1, R2 and Queues when a site needs data. Use when the user says 'deploy to Cloudflare', 'set up wrangler', 'Workers or Pages', 'preview URL', 'add a secret', 'roll back', 'move the domain to Cloudflare', 'DNS cutover', 'set up redirects', 'security headers', 'cache rules', 'Turnstile', 'contact form', 'send form emails', 'D1 backup', 'Time Travel', or when PROJECT.md says hosting: cloudflare."
---

# Cloudflare — hosting and edge

Read `PROJECT.md` first (`tahi-core:tahi-project`). Its risk level decides which items below apply. Shared repo rules (branches, secrets, dependency updates, README) are in `tahi-core:tahi-project` [references/repo-hygiene.md]; what Cloudflare already handles is in [references/platforms.md] of the same skill. Do not redo either here.

## When to use it

- **Default host for every Astro or static code site**, and for small backends: form handlers, webhooks, light APIs (see `tahi-core:stack-picker`).
- **Not the default for production Next.js.** See `tahi-code:nextjs` for why Vercel is the default there.
- **Not when the client mandates AWS** or already runs there: `tahi-code:aws`.

## Workers, not Pages

Cloudflare's own docs now say: start new projects with Workers. Pages still works and existing Pages projects can stay until there is a reason to move, but new features land on Workers, and the Astro Cloudflare adapter dropped Pages support in v13.

- **Every new Tahi project is a Worker with static assets.** Static-only sites are an assets-only Worker; sites with forms or server routes add a Worker script.
- **Moving an old Pages project** is planned work on its own branch; follow Cloudflare's "Migrate from Pages to Workers" guide. Watch for: custom domains must be on a zone in the Cloudflare account (Pages allowed outside domains), and Pages Functions' file-based routing has no direct equivalent.

## Project setup

- `wrangler.jsonc` at the repo root, committed. Set `name`, a pinned `compatibility_date`, and `compatibility_flags: ["nodejs_compat"]` when the framework or a library needs Node APIs.
- Run `wrangler types` (the Astro adapter's scripts do this) so bindings are typed. Commit the generated types or regenerate in CI; pick one per repo.
- Keep `wrangler` as a dev dependency so every command uses the project's version, not a global one.
- Read bindings and secrets with `import { env } from "cloudflare:workers"`. On Astro, prefer `astro:env` for typed access (`tahi-code:astro`).
- Full config patterns, environments and bindings are in [references/wrangler.md](references/wrangler.md).

## Environments: dev and previews are fast, production is the gate

| Environment | How | Data it touches |
|---|---|---|
| Local | Framework dev server on `workerd` (Astro 6+ does this), or `wrangler dev` | Local bindings; `.dev.vars` or `.env` secrets |
| Preview per branch | Workers Builds on every non-production branch, or `npx wrangler preview` | Staging resources, never production |
| Staging [R2] | A Wrangler environment (`env.staging`) on its own subdomain | Staging resources, integrations in test mode |
| Production | `main`, deployed only on an explicit instruction from a person | Production resources |

- Push to branches freely. Previews are what they are for.
- **Previews are public by default.** `workers.dev` preview URLs send `X-Robots-Tag: noindex`; previews on a custom domain need Cloudflare Access or a `noindex` header [R1]. Put Access in front of previews whenever they show unreleased client content [R2].
- **Previews do not inherit production settings.** Configure them in the `previews` block of the Wrangler config and bind them to staging KV, D1 and R2. KV, D1 and R2 are only isolated if you bind a separate resource.
- **Bindings and `vars` are not inherited by Wrangler environments.** Declare them in every environment block.

## Secrets

- Non-secret config goes in `vars`. Secrets go in with `wrangler secret put NAME` (per environment with `--env`), or `wrangler versions secret put` when you do not want to deploy yet. **`wrangler secret put` creates and deploys a new version immediately**, so on production it is a production change.
- Local secrets live in `.dev.vars` or `.env` (one or the other, never both), both gitignored. Commit a `.dev.vars.example` with names only.
- Declare required secret names with the `secrets` config property so a missing one fails loudly.

## Deploy and roll back

- **Git integration:** connect the Worker to the GitHub repo with Workers Builds. The Worker name in the dashboard must match `name` in `wrangler.jsonc` or builds fail.
- **`main` is production, and merging is the release.** A merge to `main` deploys, so it needs an explicit instruction from a person and, at risk 2+, a pass on staging first (`tahi-core:launch`). Keep it that way: content rebuilds (below) redeploy whatever is on `main`, so nothing unreleased may sit there.
- **Content rebuilds.** A static site with a CMS rebuilds when content is published: create a Workers Builds **deploy hook** for `main` and call it from the CMS webhook (`tahi-code:sanity`). The hook URL is a credential; store it like a secret. A content rebuild is the client's normal publishing, not a code release.
- **Roll back** with `npx wrangler rollback` (or Deployments in the dashboard). You can roll back to the 100 most recent versions. A rollback does not change bindings or data, and is blocked if a bound KV, R2 or queue has since been deleted. If a release changed data shape, plan the data rollback separately.
- [R3] Use gradual deployments (a percentage of traffic on the new version) for risky backend changes.

## Domains, DNS and redirects

- Domain moves, nameserver changes and TTL timing are in [references/dns-and-redirects.md](references/dns-and-redirects.md). The launch-day sequence is `tahi-core:launch`.
- **`_redirects`** (in `public/`) handles static redirects: up to 2,000 static and 100 dynamic rules per file. **It is not applied to responses rendered by Worker code**, so on server-rendered routes do redirects in the framework (Astro `redirects` config, Next.js `redirects()`) or with Cloudflare rules.
- **Bulk Redirects** for large migration maps and domain-level redirects; **a single redirect rule** for apex to www (or the reverse).

## Headers and caching

- **`_headers` only applies to static asset responses.** For server-rendered pages, set headers in code (Astro middleware, Next.js `headers()` or `proxy.ts`) or with a Response Header Transform Rule on the zone. Check them with the quick checks in `tahi-core:dev-qa`.
- Baseline on every production site [R1]: `Strict-Transport-Security` (once HTTPS is confirmed on every host), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `frame-ancestors 'self'` (or `X-Frame-Options: SAMEORIGIN`), a `Permissions-Policy` that turns off what the site does not use. A real Content Security Policy at [R2]; Astro generates one (`security.csp`).
- Static assets are served with `Cache-Control: public, max-age=0, must-revalidate` and an `ETag` by default. Give hashed build files (`/_astro/*`, `/_next/static/*`) a long `immutable` cache in `_headers`. Because HTML keeps the revalidating default, a deploy needs no cache purge.
- Do not cache HTML from server routes at the edge unless the page is identical for everyone. If you add a Cache Rule for it, write down what purges it.

## Forms

The Tahi form pipeline (Turnstile, server validation, Resend, CRM hand-off, failure alerts) is in [references/forms.md](references/forms.md). It applies to every code stack, not just Cloudflare.

## Data: only when the site needs it

| Need | Use | Backup |
|---|---|---|
| Config, flags, sessions, small lookups | KV (eventually consistent; writes can take up to 60 seconds to reach every location) | Re-creatable, or export on a schedule [R2] |
| Relational data | D1 | Time Travel, always on: restore to any minute in the window (check the plan; Free is shorter than Paid). Restore drill before launch [R3] |
| Uploads, exports, backups | R2 | Keep a second copy elsewhere if it is the only copy [R2] |
| Slow or flaky hand-offs (CRM, email) | Queues, with retries and a dead-letter queue [R2] | n/a |

Storing personal data in any of these raises the project to risk 3 (`tahi-core:tahi-project`, stop rule 4). Flag it before building.

## What Cloudflare handles (do not spend time here)

SSL certificates and renewal, CDN, DDoS protection, preview URLs, version history and rollback, D1 point-in-time restore. A ten-second "is it on" check at the production gate is enough.

## Gotchas

- `_redirects` and `_headers` silently do nothing for Worker-rendered responses.
- `wrangler secret put` on production deploys immediately.
- Preview URLs are public and, on custom domains, indexable unless you stop it.
- Workers custom domains need the zone in the same Cloudflare account.
- Turn off the production Worker's `workers.dev` route once the custom domain is live (`workers_dev: false`), so the site has one public host.
- Turnstile tokens expire after 300 seconds and are single-use; a form left open too long fails verification. Show a clear retry message.

## Production checklist

- [ ] [R1] [cloudflare] Worker with static assets (or a recorded reason for Pages).
- [ ] [R1] [cloudflare] `compatibility_date` pinned; `wrangler` version pinned in `package.json`.
- [ ] [R1] [cloudflare] Production deploys from `main` only; who can deploy is written in the README.
- [ ] [R1] [cloudflare] Secrets set per environment; none in `wrangler.jsonc`, the repo or the build log.
- [ ] [R1] [cloudflare] Custom domain attached; apex and www resolve to one canonical host; `workers.dev` off for production.
- [ ] [R1] [cloudflare] Previews and staging are `noindex`.
- [ ] [R1] [cloudflare] Baseline security headers present on static and server-rendered responses.
- [ ] [R1] [cloudflare] [if:forms] Turnstile verified server-side; one real submission reaches its destination (references/forms.md).
- [ ] [R1] [cloudflare] Rollback tested once: you know the previous version ID and the command.
- [ ] [R2] [cloudflare] Staging environment with its own bindings; production releases go through it.
- [ ] [R2] [cloudflare] Previews bound to staging resources; Access in front of previews with client content.
- [ ] [R2] [cloudflare] [if:migration] Redirect map loaded (`_redirects` or Bulk Redirects) and tested against the old URL list.
- [ ] [R2] [cloudflare] Content Security Policy in place and tested with the browser console open.
- [ ] [R2] [cloudflare] Workers Logs on (`observability.enabled`); errors alert a person.
- [ ] [R2] [cloudflare] [if:forms] Form-failure alert goes to a person.
- [ ] [R2] [cloudflare] Branch protection on `main`; every production merge went through staging first.
- [ ] [R2] [cloudflare] [if:cms] Deploy hook fires on publish and a test publish reached production.
- [ ] [R3] [cloudflare] Rate limiting on every public endpoint (WAF rule or the Workers rate limiting binding; check the plan).
- [ ] [R3] [cloudflare] D1 restore tested from a Time Travel bookmark into a scratch database.
- [ ] [R3] [cloudflare] API tokens scoped to one account and the permissions they need; Cloudflare account members reviewed.
