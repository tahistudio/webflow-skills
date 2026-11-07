---
name: client-delivery
description: "Runs the client side of a Tahi Studio website project between kickoff and launch: the update rhythm and drafting client updates from docs/log.md (what's done, what's next, what we need from you), feedback rounds (consolidated, one owner, turning vague feedback into actionable items, pushing back kindly with reasons, dashboard QA rounds), scope changes (spotting them against PROJECT.md, tweak versus change request versus new phase, wording, flagging scope creep), sign-off at each gate, waiting on the client (hand-offs, nudges, what happens to dates), and difficult conversations (delays on either side, bad news, design disagreements). Use when asked to 'write a client update', 'what do I tell the client', 'reply to this feedback', 'the client wants to change', 'is this in scope', 'scope creep', 'they haven't sent the content', 'chase the client', 'nudge', 'get sign-off', 'is this approved', 'we're going to be late', 'the client hates the design', or 'how do I push back'."
---

# Client delivery: the middle of the project

The middle of a project goes well when the client always knows three things: what is done, what is next, and what we need from them. This skill keeps that true, handles feedback and change without drama, and records every approval so nothing is argued about later.

Read `PROJECT.md` first. The process level sets the rhythm; the scope In and Out lists decide what is a change. The house numbers (rounds, turnarounds, reply times, update rhythm, waiting timebox) live in `tahi-client:client-kickoff` › references/working-agreement.md. Use them; do not restate them.

## Client contact rules

These apply to every Tahi skill that drafts anything a client will see. This is where they live.

1. **Draft, show, then send on a yes.** Emails, dashboard messages (`post_request_message`), nudges (`send_nudge`), shared schedules and proposals, and any dashboard record the client can see are drafted and shown to the person first. Nothing that emails or messages a client, sends money or deletes data happens without an explicit yes. Internal tasks, time logs and docs can be created once offered.
2. **House voice.** Follow `tahi:tahi-brand-voice` when it is installed. Without it: plain, specific, warm; one person writing to one person; no dashes, no exclamation marks, no hype; "monthly plan", never "retainer"; "task list", never "track".
3. **One thread per piece of work.** The dashboard request thread is home. When a decision is made by email or on a call, summarise it back into the thread.
4. **No invented specifics.** No dates not checked against the schedule, no prices not taken from the dashboard doc "Services and Pricing" or from Liam, no credentials (`tahi-client:client-kickoff` section 4).
5. **Bad news the same working day you know it.** See section 6.

## 1. Rhythm and updates

| Process | Rhythm | Format |
|---|---|---|
| **light** | At each milestone, and whenever something is blocked | A short written message in the request thread |
| **standard** | Weekly | Written update, same day each week |
| **full** | Weekly | Written update, plus a 30 minute check-in call with notes sent the same day |

**Drafting an update from `docs/log.md`:**

1. Read the log entries since the last update, the open items in `docs/parking.md`, and the next milestone in the schedule.
2. When the dashboard is connected, add `get_engagement_delivery_status` (on track or not) and `list_requests_waiting_on_clients` (what we need from them).
3. Translate engineering into outcomes. "Refactored the card component" becomes "Case study cards now work the same everywhere, so your team can add new ones without help."
4. Use the template in [references/updates.md](references/updates.md): **Done, Next, Needed from you** (each item with an owner and a date), then **Dates** only if one moved.
5. Light: under 120 words. Standard and full: under 250. Link to staging rather than describing it.

## 2. Feedback rounds

**Before the round,** send a round brief ([references/feedback.md](references/feedback.md)): what to review, what is already settled, where to leave comments, the deadline, and the one person consolidating.

- **Design:** comments in Figma, or a single list.
- **Build:** a dashboard QA round on staging (`start_qa_round`) so comments are pinned to the page and breakpoint. Tahi adds its own known issues first (`add_qa_comment`) so the client does not spend time reporting them.

**Rules for every round:**

- **One consolidated set from one owner.** If several people comment, the owner merges them first. Contradictions go back to the owner to decide, not to Tahi to guess.
- **Rounds per stage follow the working agreement.** Light jobs get one. An extra round is a change request.
- **Approved work is not reopened in a later round.** It becomes a change.

**During the round, make every item actionable.** Each item needs: where (page, section, breakpoint), what is there now, what they want instead, and why. Vague feedback ("make it pop", "feels off", "can it be more modern") gets one clarifying question that offers two concrete options. The translation table is in [references/feedback.md](references/feedback.md).

**Triage every item into one of four:**

| Triage | Means | Reply |
|---|---|---|
| **Fix** | In scope and clear | "Done" or "Doing, ready by [date]" |
| **Clarify** | Not clear enough to act on | One question, with two options |
| **Push back** | We recommend against it | Reason tied to their goal, an alternative, their call |
| **Change** | Outside scope, or reopens approved work | Section 3 |

**Pushing back kindly.** Give the reason in terms of their goal, audience or evidence, not Tahi's taste. Offer an alternative. Then let them decide, and record the decision in `docs/decisions.md`. The client decides matters of brand and taste. The quality floor for the project's risk level (for example the WCAG 2.2 AA target, a working form, performance at risk 2 and up) is not traded away quietly: explain the consequence, offer a compliant alternative, and if they still want it, record it and tell Liam before it ships. Wording in [references/feedback.md](references/feedback.md).

**After the round,** pull the summary (`get_qa_round_report` for build rounds), reply with what we will do, what we will not and why, and what needs their decision. Log the round in `docs/log.md`.

## 3. Scope changes

**Spot them** by checking every request against `PROJECT.md` In, Out and the definition of done. Signals: "while you're at it", "quick one", "can it also", a new page type, a new integration, a new stakeholder with new needs, an extra round.

| Class | Test | What happens |
|---|---|---|
| **Tweak** | Under the tweak threshold in the working agreement, inside the agreed intent | Do it, log it. Count it against the per-stage tweak allowance. |
| **Change request** | Bigger than a tweak but fits the current project: an extra page from an existing template, a new section, an extra round, reopening approved work | Price it and give the date effect before starting. Starts only after a written yes. |
| **New phase** | New templates or features, a new integration, anything that raises a profile level, or work that needs its own design and sign-off | A separate proposal (`create_proposal`, as a draft). Goes on `docs/parking.md` until agreed. |

**Steps, every time:**

1. Classify it and say which class to the person.
2. Draft the reply from [references/scope-changes.md](references/scope-changes.md): acknowledge the idea, name it as outside the current scope, give the cost and date effect, ask for a yes.
3. When the dashboard is connected, flag the request with `flag_scope_creep`. If it turns out to be in scope after all, `unflag_scope_creep`.
4. Record the change and the client's answer in `docs/decisions.md`. Update `PROJECT.md` In or Out once it is agreed.
5. If it raises a level, apply `tahi-core:tahi-project` stop rule 4 before anything else.

Never absorb a change silently. Even tweaks are logged, so a pattern is visible before it costs the project. Prices come from the "Services and Pricing" doc or from Liam, never from this skill.

## 4. Sign-off

Which gates apply comes from the working agreement. What "approved" means at each:

| Gate | Approved means | After approval |
|---|---|---|
| **Scope** | In, Out and definition of done are right | Changes follow section 3 |
| **Plan** [P:standard] | Sitemap, page list, content model and dates are agreed | New pages or content types are changes |
| **Design** | Layout, content structure and visual system are agreed for the approved pages | Reopening a page's design is a change; build-stage polish is not |
| **Pre-launch** | The client has reviewed staging, content is correct, it is ready to go live | `tahi-core:launch` runs; go-live still needs an explicit instruction from a person |
| **Handover** [P:standard] | The handover pack and training have been received | The support window starts (`tahi-client:client-handover`) |

**Recording an approval:**

- A written yes from the named approver, in the dashboard request thread. An approval by email or on a call is summarised back into the thread and confirmed there.
- A line in `docs/decisions.md`: gate, date, who approved, link to the thread.
- [P:full] The approver is a participant on the request with the Approver role, and the approval is recorded in the dashboard before the next stage starts.
- Silence is never approval. A partial approval ("approved apart from the footer") is recorded with its exceptions.

## 5. Waiting on the client

1. **Hand it to a named person** with one clear reason: approval, content, access, a decision or a file. When the dashboard is connected, use `hand_off_request` so it shows in their "Waiting on you" list.
2. **Check what is waiting** at the start of each week or session: `list_requests_waiting_on_clients`.
3. **Follow the timebox** in the working agreement: one reminder, then a personal message, then re-dating, then a pause. Draft each one; send on a yes. Wording in [references/conversations.md](references/conversations.md).
4. **Say what it does to the dates at the moment the turnaround passes,** not at the end of the project.
5. **Keep moving on what is not blocked.** Placeholder content is fine on staging; nothing launches with it.
6. Log the wait in `docs/log.md` as blocked, with the date it started. The dashboard holds the status.

## 6. Difficult conversations

- **Early.** Bad news goes out the same working day it is known, with what happened, what we are doing, and the new date or options.
- **Facts, options, recommendation.** In that order. One recommendation.
- **Own Tahi's part plainly,** without grovelling and without blaming a person on either side.
- **The right channel.** Light: written is fine. Standard and full: a call for anything that moves a date by more than a week or changes cost, then a written summary the same day.
- **Escalate to Liam** before replying when it involves money, refunds, the contract, a client threatening to leave, or anything legal.

Scripts for Tahi running late, the client running late, design disagreements, a late stakeholder reopening work, a client unhappy with quality, and budget running out: [references/conversations.md](references/conversations.md).

## Reporting

After any client-facing step, say what was drafted, what was sent (only with a yes), what was recorded where (`docs/log.md`, `docs/decisions.md`, dashboard), and what is now waiting on whom.
