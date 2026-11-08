# Kickoff agendas and the welcome message

Pick the version that matches the process level. Times are for the call itself; preparation comes first.

## Before any kickoff

- Draft `PROJECT.md` and the trimmed questionnaire (SKILL.md sections 1 and 3).
- Read `get_client_call_brief` and `list_commitments` when the dashboard is connected, so nothing promised in sales surprises the team.
- Prepare a one-screen summary of scope In and Out to share on screen or paste into the message.

## light: async kickoff

One message, sent from the dashboard request thread or by email. Nothing else unless the client asks.

Contents, in order:

1. One line welcoming them and naming the Tahi lead.
2. What we are building, in two lines, and the target launch date.
3. Scope In and Out as two short lists. Ask for a reply confirming it.
4. The questionnaire (8 questions at most).
5. The access and assets list, each item with a "needed by" date.
6. The working agreement, client version.
7. The next step and when it happens.

Draft (follow `tahi:tahi-brand-voice` when it is installed; no dashes, no exclamation marks):

> Hey [Name],
>
> Thanks for signing off. [Tahi lead] will look after your project from here, and we're aiming to launch on [date].
>
> Here's what we're building: [two lines].
>
> **Included:** [list]
> **Not included:** [list]
>
> Can you reply to confirm that's right? We start design once we have your yes.
>
> A few questions we still need answered: [questions]
>
> And the access we need, with the date we need it by: [list]
>
> How we work together is below. The short version: one round of feedback per stage, gathered by one person on your side, and we reply to messages within one to two working days.
>
> [working agreement, client version]
>
> Next: [step] on [date].
>
> Cheers,
> [Name]

## standard: 45 minute kickoff call

Send the questionnaire 3 working days before. Record the call only with everyone's agreement, and say so at the start.

| Time | Item | Output |
|---|---|---|
| 5 min | Introductions. Who decides, who gathers feedback, who supplies content. | People section of `PROJECT.md` |
| 10 min | Goals: what the site is for, how they will know it worked, what happens if it is down for a day. | Audience, risk check |
| 10 min | Scope on screen: In, Out, definition of done. Ask "anything you assumed was included?" | Scope confirmed or questions noted |
| 5 min | Questionnaire gaps: only questions not answered in writing. | Missing fields filled |
| 5 min | Access and content: walk the list, agree owners and dates. | Dated list |
| 5 min | Working agreement: rounds, turnaround, updates, what slows projects down. | Expectations set |
| 5 min | Next steps and dates. | Log entry |

Within one working day, send the written summary: decisions, scope as agreed, who owes what by when, next step.

## full: 90 minute kickoff workshop

Everyone who signs off attends. If a stakeholder cannot make it, name who speaks for them.

| Time | Item | Output |
|---|---|---|
| 10 min | Introductions and roles. Agree the named approver for each stage and the single owner who consolidates feedback. | Approvers recorded |
| 15 min | Goals and success measures. What each stakeholder needs from the site. Where they disagree, note it; do not resolve it by adding scope. | Goals, open questions |
| 15 min | Audience and references: sites they trust, sites that try too hard. | Audience, craft and motion inputs |
| 20 min | Scope In and Out, definition of done, phases and gates. | Scope confirmed or follow-ups |
| 10 min | Risks: deadlines that cannot move, integrations, migration, legal or privacy reviewers. | Risk notes, level check |
| 10 min | Access, content plan and owners. | Dated list |
| 10 min | Working agreement, check-in rhythm, how sign-off is recorded. | Expectations set |

Within one working day, send the written summary and put the scope confirmation request in the dashboard thread so each approver can reply there.

## After every kickoff

- Update `PROJECT.md`, `docs/log.md`, `docs/decisions.md`, `docs/parking.md`.
- When the dashboard is connected and the call was recorded, review suggestions from the transcript before creating anything, so requests are not duplicated.
