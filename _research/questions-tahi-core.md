# Open questions: tahi-core

Each has the default the skills currently use. Answer in a question round, then fold the answers into the owning skill and delete the question.

1. **Risk thresholds.** Is "main lead source for the business" the right line between risk 1 and 2, or should any client-edited CMS alone stay at risk 1? Default: either makes it risk 2.
2. **Webflow project folders.** Should every Webflow project get its own small git repo for `PROJECT.md` and `docs/`, or one folder per client somewhere shared (Drive, the dashboard's docs)? Default: a small git repo per project.
3. **Formatter and linter.** Default for new code projects: Biome. Alternative: ESLint and Prettier.
4. **Package manager.** Default: pnpm.
5. **Dependency bot.** Renovate (more control, grouping) or Dependabot (built into GitHub)? Default: either, grouped; Renovate preferred.
6. **Staging for Webflow.** Is the `.webflow.io` subdomain always the staging environment, or do some clients get a separate staging site? Default: `.webflow.io`.
7. **Launch timing.** Default: weekday morning in the client's time zone, never Friday afternoon. Any house rule beyond that?
8. **Time logging.** Should Claude offer to log time to the dashboard at the end of each session, or never touch time? Default: offer, never log without a yes.
9. **Inbox review.** Who reviews `_inbox/` monthly, and when? Default: Liam, first week of the month.
10. **Lighthouse bar.** Webflow core uses 80 mobile / 90 desktop as a goal. Should risk 2+ code projects have a hard Core Web Vitals gate instead? Default: CWV passing on mobile is the gate at risk 2+.
11. **Evals in CI.** Run `claude plugin eval` in GitHub Actions on every PR to this repo, or by hand before merging? Default: by hand for now (each run costs model usage).
