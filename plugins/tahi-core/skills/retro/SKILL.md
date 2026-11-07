---
name: retro
description: "Close out a Tahi website project and feed what was learned back into the Tahi skills: a short retro (what went well, what slowed us down, what the client struggled with, estimates versus actuals), repo clean-up and archiving, and proposed changes to the skills filed for review instead of edited mid-project. Use when the user says 'retro', 'wrap up the project', 'post-mortem', 'what did we learn', 'close out', 'archive the repo', 'update the skills from this project', or 'this rule was wrong'."
---

# Retro — get better every project

Read `PROJECT.md`, `docs/log.md`, `docs/decisions.md` and `docs/parking.md` first. The retro is short and specific; its main output is a change to how we work, not a document.

## 1. Write the retro

Create `docs/retro.md`, under one screen:

```markdown
# Retro · {project} · {date}
Levels: risk {n} · craft {n} · process {level} · motion {n}. Were they right? {yes / no, and what they should have been}
Estimate vs actual: {from the dashboard's time entries when connected}
Went well: 2–4 bullets
Slowed us down: 2–4 bullets, each with the cause, not the symptom
Client side: what they found hard, what we would explain earlier next time
Skill changes: see below
```

Pull facts from the log and the dashboard (time, requests, QA rounds) rather than memory.

## 2. Propose skill changes

For each lesson that should change how every project runs, write a proposal:

```markdown
## {date} · {project} · {skill name}
Problem: what happened, with the evidence.
Proposed change: the rule to add, change or delete, word for word.
Scope: which levels or stacks it applies to (tags).
```

Where it goes:

- **The user has a local clone of the skills repo** (`tahistudio/webflow-skills`): add the file to its `_inbox/` folder as `YYYY-MM-DD-{project}-{topic}.md`. Do not edit the skills directly from a project.
- **Otherwise:** draft it as a GitHub issue for `tahistudio/webflow-skills` and show it to the user. File it only when they say so.

Proposals are reviewed and merged or deleted in a monthly pass (see the repo's README). That keeps the skills tight: one place per rule, nothing added on a hunch.

## 3. Clean up

- Parking list: every item becomes a task, an offer to the client, or is deleted.
- Repo: follow "Ending a project" in references/repo-hygiene.md of `tahi-core:tahi-project`.
- Dashboard: project status updated; time logged.
- Final log entry in `docs/log.md` pointing to the retro.
