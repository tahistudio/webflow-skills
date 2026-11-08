# Sanity operations: datasets, webhooks, migrations, backups, TypeGen

CLI commands use the current plural forms (`sanity datasets ...`, `sanity migrations ...`). Older CLI versions used the singular (`sanity dataset export`); upgrade the CLI rather than mixing.

## Contents

1. Datasets and environments
2. Webhooks
3. Schema changes and migrations
4. Scheduled backups
5. Restoring
6. TypeGen in CI

## 1. Datasets and environments

| Environment | Dataset | Studio | Front end |
|---|---|---|---|
| Local and previews | `staging` (or `production` read-only at risk 1) | local Studio | dev server, branch previews |
| Staging [R2] | `staging` | "Staging" workspace | staging deploy |
| Production | `production` | deployed Studio | production |

- Create datasets with `sanity datasets create staging`. Keep `staging` private if it may hold unpublished client material.
- Refresh staging from production before rehearsing anything:

```bash
sanity datasets export production prod.tar.gz
sanity datasets import prod.tar.gz --dataset staging --replace
```

- Every export counts against the project's API usage; do not refresh on every build.
- Dataset aliases (hot swapping a `~production` alias to a prepared dataset) are for large content launches. Webhooks, Studios and the Live Content API need the real dataset name, so each swap means updating them. Rarely worth it for our sites.

## 2. Webhooks

Set them up in manage.sanity.io (API, Webhooks) or as code with Blueprints.

- **Document webhook**, trigger on create, update and delete.
- **Filter** to the types the site renders: `_type in ["page", "post", "siteSettings", "navigation", "footer"]`.
- **Drafts and versions off** (the default), so only publishes fire. Turning drafts on fires on almost every keystroke.
- **Projection** with what the receiver needs: `{ _type, "slug": slug.current }`.
- **Secret** set, and verified by the receiver: `parseBody` from `next-sanity/webhook` in Next.js, `isValidSignature` from `@sanity/webhook` elsewhere. Deploy hooks (Cloudflare, Vercel) cannot verify signatures; their URL is the credential, so keep it secret.
- Webhooks are limited to one concurrent request each, and failed deliveries show in the webhook's attempt log. Check it first when "publishing does nothing".

## 3. Schema changes and migrations

Schema lives in code; content lives in the dataset. Changing the schema does not change existing documents.

1. **Additive first.** Add the new field or type. Deploy the Studio. The front end reads the new field with a fallback to the old one.
2. **Migrate content** with a migration script:

```bash
sanity migrations create "rename hero subtitle to intro"
sanity migrations run <id> --dataset staging          # dry run is the default
sanity migrations run <id> --dataset staging --no-dry-run
# check staging, then
sanity datasets export production pre-migration.tar.gz
sanity migrations run <id> --dataset production --no-dry-run
```

3. **Remove the old field** in a later release, once nothing reads it.

- Always export production immediately before a production migration, whatever the risk level, and note the file location in `docs/log.md`.
- A production migration is a production change: explicit instruction only.
- Renaming a document type or a block `_type` is a migration plus a front-end change in the same release.

## 4. Scheduled backups [R2]

Dataset backups on Sanity's side are a paid feature on some Enterprise plans, enabled per dataset and taken at most daily. For everyone else, export on a schedule to storage outside Sanity.

`.github/workflows/sanity-backup.yml`:

```yaml
name: Sanity backup
on:
  schedule:
    - cron: "0 15 * * 0" # Sunday 15:00 UTC, early Monday in NZ
  workflow_dispatch:

jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - name: Export dataset (documents, drafts and assets)
        working-directory: studio
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_EXPORT_TOKEN }}
        run: pnpm exec sanity datasets export production "../sanity-production-$(date -u +%F).tar.gz"
      - name: Upload to R2
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: auto
        run: aws s3 cp sanity-production-*.tar.gz "s3://${{ vars.BACKUP_BUCKET }}/sanity/" --endpoint-url "https://${{ vars.R2_ACCOUNT_ID }}.r2.cloudflarestorage.com"
```

- The bucket is private, in the client's Cloudflare (or AWS) account, with a lifecycle rule that keeps an agreed number of weekly exports (record the retention in `PROJECT.md`).
- The R2 token can write to that bucket only. The Sanity token can read the dataset including drafts, nothing more.
- A failed run must reach a person. GitHub sends scheduled-workflow failure notices to the person who last changed the workflow's schedule, which may be someone who has left; add an explicit failure step (Slack or email webhook) at [R2].
- Weekly is the floor at risk 2. Risk 3 or high-churn content: daily.
- On AWS projects, upload to S3 with an OIDC role instead of R2 keys (`tahi-code:aws`).

## 5. Restoring

- Single documents: the Studio's history panel restores earlier revisions; deleted documents can be found and restored through the History API. Try this first.
- Whole dataset: import the export into a **new** dataset, check it, then point the front end at it or import over production with `--replace` (production change: explicit instruction only).
- [R3] Restore drill before launch: import the latest export into `restore-test`, run the site's build against it, confirm pages and images, delete the dataset.

## 6. TypeGen in CI

`sanity-typegen.json` in `studio/` (or `typegen` in `sanity.cli.ts`):

```json
{
  "path": "../src/**/*.{ts,tsx,astro}",
  "schema": "schema.json",
  "generates": "../src/lib/sanity/sanity.types.ts"
}
```

- `sanity schema extract` then `sanity typegen generate`, wired as one `typegen` script.
- CI runs the script and fails if `git diff` shows the types changed, so stale types never merge.
- Queries must be wrapped in `defineQuery` (or `groq` tagged templates) and assigned to a variable for TypeGen to find them.
- Check `.astro` files are picked up by the installed TypeGen version; if not, keep queries in `.ts` modules (the house pattern anyway).
