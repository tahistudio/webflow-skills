# Logs, decisions, plans and the parking list

Four small files in `docs/`, plus dated plans. Plain markdown, newest first, short. Templates are in `templates/project/docs/` of the skills repo.

## docs/log.md — what happened

Newest entry at the top. One entry per working session or meaningful milestone. Five to ten lines.

```markdown
## 2026-11-08 · Liam (with Claude)
- Done: Built hero, services and FAQ sections on staging. Nav component variants for light/dark.
- Decided: Blog stays on Webflow CMS (see D-004).
- Verified: Sections checked at 1440, 991, 767, 390 on staging; Lighthouse mobile 86.
- Next: Case study template, then forms.
- Blocked: Waiting on client for team photos (dashboard request #212).
```

Rules:
- Write it at the end of a session or when a piece is done, not after every small change.
- "Verified" lists evidence, not hopes. If nothing was verified, say so.
- Link dashboard requests, PRs and decisions instead of repeating them.
- When the file gets long (more than about a year), move old entries to `docs/log-archive/YYYY.md`.

## docs/decisions.md — why it is like this

Anything someone could reasonably question later: a stack choice, a tier change, a scope call, a design trade-off, a rule knowingly bent. Numbered so they can be referenced.

```markdown
## D-004 · 2026-11-08 · Blog stays on Webflow CMS
Context: Client wanted Sanity for the blog only.
Decision: Keep the blog on Webflow CMS.
Why: One editor, about two posts a month; a second CMS doubles training and cost.
Revisit if: They add a second content type that needs reuse across channels.
```

Never edit an old decision to say something different. Add a new one that supersedes it.

## docs/parking.md — noticed, not now

Things found that are out of scope or not worth doing now. One line each, with why it matters and roughly how big it is. Reviewed at the end of each phase and at handover; items either become tasks, get offered to the client as extra work, or are deleted.

```markdown
- [ ] 2026-11-08 · Old /services-2019 page still indexed; add redirect at launch. (small)
- [ ] 2026-11-08 · Client's logo SVG has embedded raster; ask for a clean vector. (small, client)
```

## docs/plans/YYYY-MM-DD-name.md — how we will do it

For standard and full process, or any piece of work bigger than a day. Goal, approach, steps with how each is verified, risks, what is out. Mark steps done as you go. A plan is finished when its last step is verified; then the log records it.

## What does not go in the repo

- Client messages, time, invoices, task status: the Tahi dashboard.
- Credentials and secrets: a password manager or the platform's secret store. `.env.example` lists names only.
- Personal data about anyone.

## The session-start hook

The `tahi-core` plugin runs a session-start hook. In a folder with a `PROJECT.md`, it prints the levels and stack lines from the profile, the newest log entry, and the open parking-list count, and warns when the newest log entry is older than the newest git commit (the log has fallen behind). In any other folder it prints nothing.
