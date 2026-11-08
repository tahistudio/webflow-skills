# Tahi Studio skills

How Tahi Studio delivers websites, written as Claude Code skills: running the project, working with the client, keeping design consistent and alive, and building on Webflow or code stacks. The repo is a Claude Code plugin marketplace (`tahi-studio`) with five plugins.

Tahi's own marketing skills (brand voice, SEO, copy, CRO) live in the separate `tahi` plugin. This repo is about the work we do for clients.

## The one idea

**Decide how much rigour a project needs once, write it down, and let every skill scale to it.** Each project has a `PROJECT.md` with four levels:

| Level | Scale | Decides |
|---|---|---|
| Risk | 0 throwaway · 1 brochure · 2 business-critical · 3 sensitive | Security, reliability, backups, monitoring, QA depth |
| Craft | 1 functional · 2 polished · 3 showcase | Design QA depth and visual finish |
| Process | light · standard · full | Feedback rounds, sign-offs, updates, handover depth |
| Motion | 0 still · 1 calm · 2 lively · 3 expressive | How much animation, from the audience |

Checklist items carry tags like `[R2]`, `[C3]`, `[if:forms]`, so a brochure site gets a light pass and a portal with logins gets the full one. Development and staging are fast and unguarded; production is the gate. Details: `plugins/tahi-core/skills/tahi-project/`.

## Plugins

| Plugin | Skills | What it covers |
|---|---|---|
| **tahi-core** (start here) | tahi-project, dev-qa, launch, stack-picker, retro | Project profile and levels, lifecycle gates, stop rules, log and decisions, session-start hook, dev QA with a quick-checks script, production launch, stack choice, retros |
| **tahi-client** | client-kickoff, client-delivery, client-handover | Kickoff and intake, updates, feedback rounds, scope changes, sign-off, handover, training, retainers |
| **tahi-design** | design-consistency, site-animator, design-qa | Tokens and rhythm, AI tells, industry and audience starting points, the motion system, design QA |
| **tahi-webflow** | tahi-webflow-core, lumos-webflow, client-first-webflow, webflow-client-site, webflow-template, webflow-ix2-to-gsap | Everything Webflow |
| **tahi-code** | astro, nextjs, sanity, cloudflare, aws | Code stacks and their production checklists |

## Repo layout

```
.claude-plugin/marketplace.json     marketplace "tahi-studio"
plugins/<plugin>/
  .claude-plugin/plugin.json
  skills/<skill>/SKILL.md           one folder per skill; references/ and scripts/ alongside
  hooks/                            tahi-core only: session-start briefing
  evals/                            behaviour tests (claude plugin eval)
templates/project/                  PROJECT.md, CLAUDE.md and docs/ files to copy into each project
_inbox/                             proposed skill changes from projects, reviewed monthly
_research/                          research and question rounds behind the rules (not loaded by Claude)
CHANGELOG.md                        human record of changes to how we work
```

## Install (everyone)

From a terminal:

```bash
claude plugin marketplace add tahistudio/webflow-skills
```

```bash
claude plugin install tahi-core@tahi-studio
```

Then install the others you use: `tahi-client`, `tahi-design`, `tahi-webflow`, `tahi-code` (same command, different name).

Turn on updates once: run `/plugin`, open **Marketplaces**, select **tahi-studio**, choose **Enable auto-update**. The repo is private, so set up git credentials once with `gh auth login` and then `gh auth setup-git`.

Skills are named with their plugin prefix, for example `/tahi-core:launch`. Claude also loads them automatically when a task matches.

## Starting a project

1. Copy `templates/project/` into the project's repo or folder (Webflow projects too).
2. Ask Claude to kick the project off. It runs the intake in `tahi-core:tahi-project` and fills in `PROJECT.md`.
3. From then on, every session starts with a short briefing from the hook (levels, newest log entry, open parking items) and ends with a log entry.

## Keeping the skills tight

- **One rule, one place.** A rule lives in the skill that owns it; others link to it as `plugin:skill`.
- **Short skills.** `SKILL.md` under about 200 lines; depth goes in `references/`.
- **No edits on a hunch.** Lessons from projects go to `_inbox/` (via `tahi-core:retro`) and are reviewed monthly.
- **Test the balance.** Run the evals for any plugin you change: `claude plugin eval plugins/tahi-core --scaffold`.
- **Open questions** for each plugin are in `_research/questions-*.md`. Answer them in a question round, then fold the answers into the skills.

## Editing (maintainers)

To see edits immediately without pushing, add your local clone as the marketplace instead of GitHub:

```bash
claude plugin marketplace add ./
```

Edits apply at the next session start or after `/reload-plugins`. Validate after any structural change:

```bash
claude plugin validate .
```

Updates reach people when you push to `main`: plugins have no `version` field, so every commit that changes a plugin folder is a new version.

`install.ps1` is the old Windows method (links skill folders into `~/.claude/skills`). Do not use it together with the plugins, or every skill loads twice.
