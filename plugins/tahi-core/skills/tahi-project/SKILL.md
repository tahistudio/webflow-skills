---
name: tahi-project
description: "The spine of every Tahi Studio website project, on any stack (Webflow, Astro, Next.js, Sanity, Cloudflare, AWS). Holds the project profile (PROJECT.md) that sets how much rigour a job needs (risk, craft, process and motion levels), the lifecycle and its gates, the dev-versus-production rule, the stop rules that keep work proportionate, and the project log, decisions and parking list. Load this at the start of any client or studio website work, whenever a repo or folder has a PROJECT.md, when the user asks 'where are we', 'what's next', 'how thorough should this be', 'does this matter for this site', to start or kick off a project, to log what was done, or to record a decision. Every other Tahi skill reads the profile this skill sets."
---

# Tahi project — how we run a job

Every website job runs on one idea: **decide how much rigour the job needs once, write it down, and let every skill scale to it.** Nothing is asked twice. Nothing is over-engineered for a site that does not need it, and nothing is skimped on a site that does.

You wear two hats the whole way through:

- **Project manager.** Where are we, what is next, what is blocked, what did we agree, what is out of scope. Keep the client's time, the budget and the plan in view.
- **Engineer.** Is it actually working, how do I know, what breaks if this is wrong. Nothing is done without evidence.

## 1. The project profile

Every project has a `PROJECT.md` at the root of its repo or project folder. The template is in `templates/project/` of the skills repo and its fields are explained in [references/profile.md](references/profile.md).

- **No profile yet and this is client or studio work?** Run the kickoff intake in [references/profile.md](references/profile.md) before building anything. It takes about five minutes. Fill in what the conversation, the brief, the repo and the Tahi dashboard already answer; ask only for the rest, in one batch.
- **Profile exists?** Read it before anything else and treat its answers as settled. Do not ask a question the profile answers. If the work you are asked to do contradicts it, say so and ask which is right; do not quietly follow one.
- **Quick one-off with no project behind it** (a throwaway prototype, a question, a snippet)? Skip the profile. Treat it as risk 0.

The profile sets four levels. Full definitions and what each one switches on are in [references/tiers.md](references/tiers.md).

| Level | Scale | Set by |
|---|---|---|
| **Risk** | 0 Throwaway, 1 Brochure, 2 Business-critical, 3 Sensitive | The single highest risk flag (payments, logins, personal data, migration, ...), never the budget |
| **Craft** | 1 Functional, 2 Polished, 3 Showcase | How much the visual detail matters to this client and to us |
| **Process** | light, standard, full | Size of the job and how many people sign off |
| **Motion** | 0 Still to 3 Expressive | The audience; see `tahi-design:site-animator` |

Risk and craft are separate on purpose. A portfolio piece can be risk 1, craft 3. A member portal can be risk 3, craft 1.

### Applying the levels

Checklist items across all Tahi skills carry tags such as `[R2]`, `[C3]`, `[P:full]`, `[code]`, `[webflow]`, `[if:forms]`. An item applies only when every tag on it applies; an untagged item always applies. The tag syntax is in [references/tiers.md](references/tiers.md). Skip what does not apply, and do not mention skipped items unless asked.

Before checking anything about hosting, SSL, backups, uptime, CDN or rollbacks, read [references/platforms.md](references/platforms.md). If the platform handles it, it is a ten-second "is it on" check at most, never a task.

## 2. Development is fast; production is the gate

- **Local, preview, staging, branch deploys and the `.webflow.io` subdomain are for moving fast.** Push, deploy and publish there freely when it helps you see or test the work. No checklist, no confirmation, rough edges allowed.
- **Production is where rigour lives.** Before anything reaches the production domain, the risk tier's checks run once and their evidence is recorded (see `tahi-core:dev-qa` and `tahi-core:launch`). Deploying or publishing to production always needs an explicit instruction from a person.
- If a project has no staging environment and it is risk 2 or above, set one up before the first production release.

## 3. Lifecycle

Not every job has every phase (a retainer change starts at Build). Each phase ends at a gate; gates get heavier with the process level. Details and the gate checklist per phase are in [references/lifecycle.md](references/lifecycle.md).

1. **Kickoff.** Profile written, scope and out-of-scope agreed. `tahi-client:client-kickoff`.
2. **Plan.** Sitemap, content model, stack (`tahi-core:stack-picker`), component inventory, a dated plan in `docs/plans/` for standard and full process.
3. **Design.** System first (tokens, type, spacing, motion level), then pages. `tahi-design:*` skills. Client sign-off.
4. **Build.** On dev and staging, fast. One section at a time. Stack skills (`tahi-webflow:*`, `tahi-code:*`).
5. **QA.** Design QA and dev QA at the depth the tiers set. `tahi-design:design-qa`, `tahi-core:dev-qa`.
6. **Launch.** The production gate and launch runbook. `tahi-core:launch`.
7. **Handover.** Editor guide, training, ownership, retainer. `tahi-client:client-handover`.
8. **Retro.** What to keep, what to change in these skills. `tahi-core:retro`.

## 4. Stop rules

Thorough is not the same as endless. These keep the work proportionate:

1. **Automate the thorough part, scale the attention.** Scripted checks (links, accessibility, Lighthouse, headers, screenshots at each breakpoint) are cheap, so they run on every project at the production gate. Human and AI judgement time scales with the tiers.
2. **Every check has a "good enough" bar for its tier.** Reach it, record the evidence, move on. Do not gold-plate a risk-1 site's security headers or a craft-1 site's kerning.
3. **Out of scope goes on the parking list.** Something noticed that the profile puts out of scope, or that would take more than a few minutes and nobody asked for it, goes in `docs/parking.md` with one line on why it matters. Not done now.
4. **Tier changes are flagged, not absorbed.** If you find something that would raise a level (the contact form actually stores personal data in a spreadsheet; the client now wants logins), stop, tell the user what you found and which level it moves, and update the profile only once they agree.
5. **Settled is settled.** If the profile or `docs/decisions.md` answers it, act on it. Reopen a decision only when new information changes it, and say what changed.
6. **Three tries, then ask.** If the same fix has failed three times, stop and report what you tried and what you think is wrong, instead of looping.
7. **Never report done without evidence.** A screenshot, a script's output, a URL, a passing check. Say exactly what is unverified and how to verify it.

## 5. Logs, decisions and the parking list

Two sources of truth, no overlap. Formats are in [references/logging.md](references/logging.md).

- **The project repo or folder is the engineering truth:** what was built, how, and why. `PROJECT.md`, `docs/log.md`, `docs/decisions.md`, `docs/parking.md`, `docs/plans/`.
- **The Tahi dashboard is the project-management truth:** tasks, time, requests, client messages, QA rounds, invoices. When the dashboard connector is available, link to it from the log rather than copying.

**Start of every session on a project** (the plugin's session-start hook surfaces this automatically when a `PROJECT.md` exists):

1. Read `PROJECT.md`, the newest entry or two in `docs/log.md`, open items in `docs/parking.md`, and any plan in progress.
2. Say in three lines: where the project stands, what is next, what is blocked.

**End of a working session**, or when a meaningful piece is done:

1. Add a log entry at the top of `docs/log.md`: what was done, what was decided, what is next, evidence links.
2. Record any decision that someone could reasonably question later in `docs/decisions.md`.
3. Offer to log time or update the task in the Tahi dashboard if it is connected. Never message a client from here without being asked.

Keep logs short. A log entry is five to ten lines, not a diary.

## 6. Repos and folders

- Code projects follow [references/repo-hygiene.md](references/repo-hygiene.md): branch and environment model, commits, dependency updates scaled by risk, secrets, README, archiving.
- Webflow projects still get a small project folder (ideally a git repo) holding `PROJECT.md`, `docs/`, exported embeds and assets, so every project is logged the same way.

## Reporting

When reporting progress, lead with what is now true, then what was verified and how, then what is not done or not verified. Name the levels that shaped your choices when it explains a skipped check ("risk 1, so no uptime monitoring").
