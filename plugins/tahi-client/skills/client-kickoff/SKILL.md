---
name: client-kickoff
description: "Takes a Tahi Studio website project from signed deal to a written PROJECT.md and a client who knows what happens next. Runs the kickoff (a call or async, by process level), the client questionnaire (asking only what is not already known), the access and assets checklist (domain registrar and DNS, existing site and CMS, analytics and Search Console, brand assets and font licences, content owners and deadlines, integration logins shared through the client's own password manager), agrees scope in and out and the definition of done, sets expectations on feedback rounds and reply times, and sets up the Tahi dashboard records. Use when a deal is signed or won, or when asked to 'kick off the project', 'onboard the client', 'plan the kickoff call', 'write the client questionnaire', 'what do we need from the client', 'what access do we need', 'agree the scope', 'draft the welcome email', or 'set the project up in the dashboard'."
---

# Client kickoff: from signed deal to PROJECT.md

Kickoff turns what was sold into what will be built. It is done when the client has confirmed the scope in writing, the profile is written, the client knows how we work, and access is on its way.

This skill runs the conversation. The profile fields, the intake questions behind them and the level rules belong to `tahi-core:tahi-project` › references/profile.md. Do not redefine them here; word them for clients and fill them in.

**Anything a client will see is drafted first and sent only on a yes.** The full client contact rules are in `tahi-client:client-delivery`, section "Client contact rules".

## 1. Gather what is already known

Read before asking the client anything:

1. The signed proposal or contract: scope lines, deliverables, dates, the number of feedback rounds quoted.
2. The deal notes and any call notes. When the dashboard is connected: `get_client` (contacts, plan type), `get_client_call_brief` (what was said on sales calls) and `list_commitments` (promises already made). Every commitment becomes a scope line or a date in PROJECT.md. None get dropped.
3. The brief, the Figma file, the existing site, any existing `PROJECT.md` or project folder.

Draft `PROJECT.md` from these using the template in `templates/project/`. Mark each intake question as answered or missing. Only the missing ones go to the client.

## 2. Pick the kickoff format

Set by the process level in the draft profile.

| Process | Format | Who |
|---|---|---|
| **light** | Async. One welcome message with the short questionnaire, the access list and the working agreement. Offer a 15 minute call only if something is unclear or the client asks. | The decision-maker |
| **standard** | Questionnaire sent 3 working days ahead, then a 45 minute video call. | Decision-maker, content owner, Tahi lead |
| **full** | Questionnaire first, then a 90 minute workshop. Name the approver for each stage in the room. | Everyone who signs off, content owner, Tahi lead and designer |

Agendas and the welcome message draft: [references/agenda.md](references/agenda.md).

## 3. The client questionnaire

Use [references/questionnaire.md](references/questionnaire.md). It rewords the profile intake for clients and adds the project questions (goals, deadlines, content, sign-off).

- **Delete every question the brief, the proposal or the dashboard already answers.** A client asked something they told us in the sales call stops trusting the process.
- **Light: no more than 8 questions.** Standard and full can run longer, grouped under plain headings.
- Send it through the dashboard request thread where possible, so the answers sit with the project. Copy the facts into `PROJECT.md`; leave the raw answers in the dashboard.

## 4. Access and assets

Request everything on [references/access-and-assets.md](references/access-and-assets.md) that applies, in one list, with a date for each.

**Credentials never travel in the clear.** This rule lives here; other Tahi skills point to it.

- **Prefer invitations over passwords.** Ask the client to invite Tahi as a user on the registrar, DNS host, Webflow workspace, analytics, Search Console, CRM and hosting. Shared logins are the last resort.
- **When a password must be shared,** the client sends it as a share from their own password manager (an expiring 1Password or Bitwarden share link, or similar). Tahi keeps it in the Tahi team vault.
- **Never** paste, ask for, repeat or store a secret in chat (this one included), email bodies, Slack, dashboard messages, the repo, `PROJECT.md`, `docs/` or commit history. API keys for builds go into the platform's environment variables or secrets store, never into code.
- **If a client pastes a secret anyway,** do not repeat it or copy it anywhere. Tell the person, suggest the client rotates it once Tahi has access through an invitation or a share, and carry on.
- `PROJECT.md` records **where** access lives and who granted it ("DNS: client's Cloudflare, Tahi invited 3 Nov"), never the secret.

## 5. Scope in, scope out, definition of done

1. **Write In from the proposal,** word for word where the proposal is specific (page count, templates, integrations, rounds).
2. **Write Out explicitly.** Check each of these and list the ones that are not included: copywriting, photography and illustration, stock image licences, content entry beyond a set number of items, blog or CMS migration, translations, extra integrations, email templates, ongoing SEO or ads, privacy policy and terms wording, new brand or logo work, accessibility remediation of third-party tools, training beyond what is quoted.
3. **Write a definition of done per deliverable,** in plain words. Example: "Home page: built to the signed-off design at every breakpoint, real content in, passes `tahi-core:dev-qa` at this project's risk level, approved by the named approver." The project as a whole is done when it is live on production, the handover is delivered (`tahi-client:client-handover`) and the support window has started.
4. **Get the client's written yes on scope** before plan or design work starts. On light jobs a one-line "Yes, that's right" in the thread is enough. This is the first sign-off; record it as `tahi-client:client-delivery` section 4 describes.

Anything the client raises that sits outside scope goes on `docs/parking.md` with one line on why it matters, and is named back to them as "not in this project, noted for later".

## 6. Set expectations

The house numbers (feedback rounds per stage, turnaround times, reply times, update rhythm, what happens when we wait on the client, what slows projects down) live in one place: [references/working-agreement.md](references/working-agreement.md). Every other Tahi skill links there. Send the client version with the welcome message and walk through it on the call.

## 7. Dashboard records

When the dashboard is connected, list what you will create and get a yes for anything the client can see. Internal records can be created once offered.

| Record | Tool | Client sees it? |
|---|---|---|
| Client and contacts current: approver, contributors | `get_client` | Yes, if you change contacts |
| One request per phase or milestone, with participants: Tahi owner, client approver, client contributors | `create_request` | Yes |
| Schedule with milestones and the feedback windows from the working agreement | `create_schedule` | Only once shared |
| A commitment for every date or promise made to the client | `add_commitment` | No |
| Internal set-up tasks (Webflow site or repo, Figma file via `tahi:tahi-figma`) | `create_task` | No |
| Kickoff notes, if longer than a log entry | `create_doc` | No |

Link the dashboard records from the Links section of `PROJECT.md`. Do not copy their contents into the repo.

## 8. Write it down

- `PROJECT.md` complete, with the `why:` line for the levels.
- `docs/log.md`: first entry. Kickoff done, what was agreed, what is missing, what is next.
- `docs/decisions.md`: the agreed scope, the levels, and any sales promise that was clarified or reinterpreted.
- `docs/parking.md`: out-of-scope ideas raised at kickoff.

## Kickoff gate

- [ ] `PROJECT.md` written: levels with `why:`, stack (or `tahi-core:stack-picker` scheduled), audience, people, links.
- [ ] Scope In and Out written and confirmed in writing by the client decision-maker.
- [ ] Definition of done written for each deliverable.
- [ ] One client-side owner named for feedback and approvals.
- [ ] [P:full] A named approver for each stage, recorded on the dashboard requests.
- [ ] Working agreement sent.
- [ ] Access and assets requested, with dates; anything still missing listed in the log.
- [ ] [if:migration] Access to the existing site, its analytics and Search Console in hand before planning starts.
- [ ] Content owner and content deadlines agreed.
- [ ] Font licences confirmed to cover web use on this domain.
- [ ] Every sales commitment carried into scope or the schedule.
- [ ] Dashboard records created or drafted for a yes.
- [ ] [P:standard] Kickoff call summary sent to the client in writing, within one working day of the call.

## Stop rules for kickoff

- **The answers raise a level.** The client now wants logins, payments, or a migration nobody quoted. Stop, tell the person which level moves and why (`tahi-core:tahi-project` stop rule 4), and treat the extra work as a scope change (`tahi-client:client-delivery` section 3) before agreeing to it.
- **No written yes on scope, no design or build.** Set-up work (repo, Webflow project, Figma file) can start.
- **Missing access does not block planning,** but it goes in the log with the date it is needed by.
