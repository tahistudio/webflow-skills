# Wrangler config, environments and bindings

Patterns for `wrangler.jsonc` on Tahi projects. Check option names against the current Wrangler docs when something does not behave; the config schema (`node_modules/wrangler/config-schema.json`) is the source of truth for the installed version.

## Contents

1. A typical site Worker
2. Previews block
3. Staging as a Wrangler environment
4. Secrets per environment
5. Bindings we use
6. CI and Workers Builds

## 1. A typical site Worker

Astro generates sensible defaults and can run without a `wrangler.jsonc`; add one as soon as the project has bindings, environments or a custom domain.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "client-site",
  // Astro adapter entrypoint; other frameworks set their own `main`
  "main": "@astrojs/cloudflare/entrypoints/server",
  "compatibility_date": "2026-11-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "binding": "ASSETS", "directory": "./dist" },
  "observability": { "enabled": true },
  "workers_dev": false,
  "routes": [{ "pattern": "www.example.co.nz", "custom_domain": true }],
  "vars": { "SITE_ENV": "production" },
  "secrets": { "required": ["RESEND_API_KEY", "TURNSTILE_SECRET_KEY"] },
  "previews": {
    "vars": { "SITE_ENV": "preview" }
  }
}
```

- Set `compatibility_date` to the day you start the project and move it forward deliberately (in its own commit, tested on a preview).
- An assets-only site (no server code) has no `main`; just `assets.directory`.
- `assets.run_worker_first` sends matching requests to the Worker before static files. Only use it when you need it (auth checks, headers on assets); it means `_headers` and `_redirects` no longer apply to those paths.

## 2. Previews block

Previews never inherit production `vars` or bindings. The `previews` block is required (it can be empty) when you use `npx wrangler preview` or Workers Builds preview builds.

- Point every storage binding (KV, D1, R2, queue producers) at a staging resource under `previews`, using the same binding name.
- `compatibility_date`, `compatibility_flags` and `assets` stay top level.
- Shared preview secrets: `npx wrangler preview base-config secret put NAME`. One preview only: `npx wrangler preview secret put NAME --name <branch>`.
- Delete stale previews with `npx wrangler preview delete --name <preview-name>`. Older ones are also removed automatically when the per-Worker limit is reached (check the plan).

## 3. Staging as a Wrangler environment [R2]

A persistent staging site that mirrors production (same variable names, same integrations in test mode) on its own subdomain.

```jsonc
{
  "name": "client-site",
  "env": {
    "staging": {
      "routes": [{ "pattern": "staging.example.co.nz", "custom_domain": true }],
      "vars": { "SITE_ENV": "staging" },
      "d1_databases": [{ "binding": "DB", "database_name": "client-site-staging", "database_id": "..." }]
    }
  }
}
```

- An environment deploys as its own Worker, named `<name>-<env>` (`client-site-staging`).
- `vars` and bindings are not inherited; repeat every one per environment.
- Deploy with `npx wrangler deploy --env staging`, or `CLOUDFLARE_ENV=staging` when the framework builds through the Cloudflare Vite plugin (Astro does).
- Put staging behind Cloudflare Access or send `X-Robots-Tag: noindex` from it.

## 4. Secrets per environment

| Where | How |
|---|---|
| Local | `.dev.vars` or `.env` beside `wrangler.jsonc` (not both). Per environment: `.dev.vars.staging` (replaces `.dev.vars` entirely) |
| Previews | `wrangler preview base-config secret put` |
| Staging | `wrangler secret put NAME --env staging` |
| Production | `wrangler secret put NAME` (deploys immediately) or `wrangler versions secret put NAME` (new version, deploy later) |

Keep the canonical list of names in `.dev.vars.example` and the README. Values live in the password manager and in Cloudflare, nowhere else.

## 5. Bindings we use

- **KV** `kv_namespaces`: config, feature flags, Astro sessions (the Astro adapter provisions a `SESSION` namespace automatically unless `session: false`).
- **D1** `d1_databases`: relational data. Keep migrations in `migrations/` and apply with `wrangler d1 migrations apply <db> --remote` per environment, staging first. Before a risky migration, note the current Time Travel bookmark (`wrangler d1 time-travel info <db>`) in the log; restore with `wrangler d1 time-travel restore <db> --bookmark=<id>` (or `--timestamp`).
- **R2** `r2_buckets`: uploads, exports, backup targets. Buckets are private unless you attach a public domain on purpose.
- **Queues** `queues.producers` and `queues.consumers`: retries for CRM and email hand-offs. Queue consumers cannot target a preview.
- **Images** `images`: the Astro adapter's default image service uses an `IMAGES` binding.

## 6. CI and Workers Builds

- Workers Builds runs the build and deploy commands on Cloudflare. Production branch: `main`. Preview builds: on for all other branches (default preview command `npx wrangler preview`).
- Production deploy command: `npx wrangler deploy` on merge to `main`. The merge is the release and needs an explicit instruction. Staging uses `npx wrangler deploy --env staging` (a second Workers Builds connection, or a GitHub Action on the `staging` branch).
- Deploy hooks (Settings, Builds, Deploy Hooks) rebuild a branch on a POST with no auth header; the URL itself is the credential. One hook per content source, named after it.
- `npx wrangler versions upload` plus `npx wrangler versions deploy` (upload now, promote later) suits a backend-only Worker with no CMS rebuilds. Do not use it on a CMS-driven static site: the next content rebuild would deploy over it.
- If CI is GitHub Actions instead, use an API token scoped to the one account and the Workers permissions it needs, stored as a GitHub Actions secret.
- Build logs are kept for a limited time; record the deployed version ID in `docs/log.md` for every production release so a rollback target is always known.
