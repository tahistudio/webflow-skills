# Scope change wording

Classification is in SKILL.md section 3; the tweak threshold is in `tahi-client:client-kickoff` › references/working-agreement.md. Prices come from the dashboard doc "Services and Pricing" or from Liam. If no price is known, write [PRICE: confirm with Liam] in the draft and say so to the person.

Every reply does four things: **acknowledge the idea, name it as outside the current scope, give the cost and date effect, ask for a yes.** It never sounds like a refusal or a telling-off.

## Tweak (logged, no reply needed)

Do it. Log it in `docs/log.md` with its time against the stage's tweak allowance. When the allowance is close to used:

> Quick heads up: we've made [n] small changes this stage on top of the agreed design, and we're happy to. From here, further changes for this stage would be grouped and priced together before we start. Nothing to do now, just so it's not a surprise.

## Change request

> Hey [Name],
>
> Adding [a team page] makes sense, especially with [reason they gave]. It wasn't part of the original scope, so here's what it would take:
>
> **What:** [one or two lines]
> **Cost:** [price] [PRICE: confirm with Liam]
> **Timing:** [adds n working days; launch moves to date / fits without moving the launch]
>
> If you'd like to go ahead, reply "yes" here and we'll start. If it can wait until after launch, we'll keep it on the list for then.
>
> Cheers,
> [Name]

An extra feedback round:

> We've finished the [two] rounds of feedback included for [design]. Happy to do another. It would be [price] and add about [n] working days. Or, if the remaining changes are small, send them as one list and we'll tell you whether they fit as small tweaks.

Reopening approved work:

> The [Services page] design was approved on [date], so we've built from it. We can change it. Because it's built, it's now a change rather than feedback: [cost and timing]. Want us to go ahead?

## New phase

> This is a good idea, and big enough that it deserves its own plan: [member logins / a booking system / the second brand]. It would change how the site is built and tested, so rather than squeeze it in, we'd suggest finishing and launching what we're building now, then scoping [it] as a next phase. We'll send a short proposal by [date].

Then draft the proposal (`create_proposal`, unpublished) and add the item to `docs/parking.md`. If the new work raises a profile level, flag it under `tahi-core:tahi-project` stop rule 4.

## Recording

`docs/decisions.md`, one entry per change:

```
## [date] Change: [short name]
Class: tweak | change request | new phase
Asked by: [name], [link to thread]
Effect: [cost], [date effect]
Answer: approved [date] by [name] | declined | parked
```

When the dashboard is connected, the request carries the scope creep flag (`flag_scope_creep`) from the moment the change is spotted, so it shows up in project and profitability views.
