# Repo hygiene (code projects)

Stack-specific setup lives in the `tahi-code` skills. This file is what every code repo shares. Anything marked *default* is the house default until the team decides otherwise.

## Branches and environments

- `main` is production. It is only changed through a merged pull request (risk 2+: branch protection on, CI must pass).
- Work happens on short-lived branches named `type/short-description` (`feat/case-study-template`, `fix/form-validation`).
- Every branch gets a preview deploy (Cloudflare and Vercel do this automatically). Push to branches and previews freely; that is what they are for.
- Risk 2+: a `staging` environment that mirrors production config (same env var names, same integrations in test mode). Production releases go through it.
- Never point a preview or staging deploy at production data or production integrations unless the profile says so.
- Staging and previews are not indexed: `noindex` header or meta, and blocked in `robots.txt`.

## Commits and pull requests

- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), so the changelog can be generated.
- A PR says what changed, why, how it was verified, and what is not verified. Link the dashboard request if there is one.
- Keep PRs to one concern. A tidy-up found along the way goes on the parking list or in its own PR.

## Tooling (every starter repo ships with these)

- Formatter and linter run on save and in CI. *Default:* Biome for new projects; keep a project's existing ESLint and Prettier setup if it has one.
- TypeScript in strict mode.
- One package manager per repo, recorded by its lockfile. *Default:* pnpm.
- `.editorconfig`, `.nvmrc` or `engines` pinning the Node version.
- CI runs install, typecheck, lint, build and the scripted QA checks from `tahi-core:dev-qa` against the preview URL.

## Secrets

- `.env` files are never committed. `.env.example` lists every variable name with a comment, no values.
- Secrets live in the host's secret store (Cloudflare, Vercel, AWS Secrets Manager or Parameter Store) and in a password manager. Never in chat, logs, issues or the repo.
- Risk 2+: secret scanning in CI (gitleaks or GitHub secret scanning).
- If a secret is ever committed, rotate it first, then clean history. Rotation is what matters.

## Dependencies

Scale updates with risk. Use Renovate or Dependabot with grouping so updates arrive as one PR, not twenty.

| Risk | Routine updates | Security updates |
|---|---|---|
| 0 | none | none |
| 1 | monthly, grouped, while there is a retainer | when flagged as critical |
| 2 | monthly, grouped | within a week |
| 3 | weekly, grouped | within days; CI fails on known high-severity vulnerabilities |

Major version upgrades are planned work with their own branch and a check on staging, never bundled into routine updates.

## README

Every repo's README answers, in this order: what this is and who the client is; how to run it locally; environments and URLs; how to deploy and roll back; where content and data live; who owns it at Tahi; link to `PROJECT.md`.

## Ending a project

- Delete merged branches. Close or park stale PRs with a reason.
- Make sure `main` builds from a clean clone with only the README's instructions.
- No retainer: archive the repo on GitHub (read-only, still searchable). Note it in the dashboard.
- Retainer: keep active; Renovate or Dependabot keeps running at the risk level's cadence.
