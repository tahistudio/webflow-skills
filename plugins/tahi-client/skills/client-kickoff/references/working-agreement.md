# Working agreement: the house numbers

**This file is the one place these numbers live.** Kickoff sends them to the client; `tahi-client:client-delivery` and `tahi-client:client-handover` apply them. To change a number, change it here and nowhere else. If a signed proposal says something different, the proposal wins for that project; note the difference in `docs/decisions.md`.

These are house defaults chosen while drafting the skills. They are open questions for the studio, listed in `_research/questions-tahi-client.md` in the skills repo.

## The numbers

| What | light | standard | full |
|---|---|---|---|
| Feedback rounds included per stage | 1 consolidated round | 2 rounds | 2 rounds, each signed off by the named approver |
| Client turnaround for a feedback round | 3 working days | 3 working days | 5 working days |
| Client turnaround for a single decision, approval, file or access | 2 working days | 2 working days | 2 working days |
| Tahi reply to client messages | Within 1 to 2 working days at most | same | same |
| Project updates | At each milestone, and whenever something is blocked | Weekly written update | Weekly written update and a 30 minute check-in call |
| Sign-off gates | Scope, design, pre-launch | Adds plan, handover | Every gate, recorded in the dashboard |

- **Working days** are Monday to Friday, excluding New Zealand public holidays. Tahi works New Zealand business hours.
- **The 1 to 2 working day reply standard is for existing clients** and comes from `tahi:tahi-brand-voice`. It is never published. The 24 hour reply standard is for new enquiries only; do not promise it to project clients.
- **Extra feedback rounds** beyond those included are a change request (`tahi-client:client-delivery` section 3).

## Waiting on the client

Counted in working days from the day the request was handed to the client.

| Day | What happens |
|---|---|
| Turnaround passes | One reminder (the dashboard's automatic nudge, or `send_nudge` after a yes). |
| +2 working days | A personal message from the Tahi lead: what is waiting, what it holds up, the new date if it does not arrive. |
| 10 working days | The plan is re-dated. The launch moves by at least the delay, and may move further if Tahi has to re-slot the work. |
| 20 working days | The project is formally paused. Restarting means agreeing a new start date with Tahi. |

Silence is never approval. A late reply moves dates; it never counts as a yes.

## Small changes

- **A tweak** is under 30 minutes and inside the agreed intent of the work. Tweaks are absorbed and logged, up to about 2 hours in total per stage. Past that, further tweaks are grouped into a change request.
- Anything bigger is a change request or a new phase. Classification is in `tahi-client:client-delivery` section 3.

## What slows projects down

Tell the client this at kickoff, plainly. Each item is a cause we have seen; none is a criticism.

1. Content arriving late. The most common cause of a late launch.
2. Feedback from several people sent separately, or contradicting each other.
3. A new decision-maker joining late and reopening approved work.
4. Reopening something already signed off.
5. Waiting on access to the domain, analytics or a third-party tool.
6. New ideas added mid-stage instead of noted for later.

## Client version

Paste this into the welcome message or kickoff summary. Fill the numbers from the table for the project's process level. Follow `tahi:tahi-brand-voice` when it is installed.

> **How we'll work together**
>
> **Feedback.** Each stage gets [one round / two rounds] of feedback. Please gather everyone's comments into one list, from one person, within [3] working days. If two people disagree, let us know who has the final say.
>
> **Replies.** We reply to messages within one to two working days, usually sooner. We work New Zealand business hours.
>
> **Updates.** [You'll hear from us at each milestone / You'll get a written update every week / You'll get a written update and a 30 minute check-in every week.] Each one says what's done, what's next, and anything we need from you.
>
> **Approvals.** When we ask you to approve something, a written "approved" in the project thread is enough. Once approved, changes to that part become new work, which we'll always price before starting.
>
> **When we're waiting on you.** We'll remind you once, then get in touch personally. If something we need is more than two weeks late, we'll agree new dates with you.
>
> **What keeps projects on time.** Content arriving on the dates we agree, one combined set of feedback, and keeping new ideas on a list for after launch.
