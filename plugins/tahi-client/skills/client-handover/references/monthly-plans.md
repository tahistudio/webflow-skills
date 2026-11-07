# Monthly plans: what is covered, the report, the offer

Internal reference. In client-facing words the plans are **Maintain** and **Scale**, a "monthly plan" with a "task list". Never "retainer", never "track", never "unlimited". Prices and terms live in the dashboard doc "Services and Pricing"; the 7 day promise is used word for word with its qualifier, or not at all (`tahi:tahi-brand-voice`).

## What the plan covers, by risk

Each level includes everything above it. Tags follow `tahi-core:tahi-project` › references/tiers.md. Tooling and alert set-up happen at launch (`tahi-core:launch`); the plan keeps them running.

**Every plan**

- Requests queued on the client's task list in the dashboard, worked in order.
- Monthly report (below).
- Platform health glance: Webflow or hosting status, SSL valid, domain and plan renewal dates more than 30 days away.
- Forms: one test submission per month reaches its destination.

**[R1] Brochure**

- [code] Dependency updates quarterly, on a branch, deployed after a smoke test.
- [webflow] Review Webflow product changes that affect the site (interactions, components, deprecations) monthly.

**[R2] Business-critical**

- Uptime monitoring and form-failure alerts going to a named person.
- Search Console checked monthly: coverage errors, manual actions, sudden drops.
- [code] Dependency updates monthly; staging first, then production.
- [if:migration] Redirects re-checked for the first three months after launch.
- [sanity] Scheduled dataset export confirmed running.
- Accessibility spot check on any page changed that month.

**[R3] Sensitive**

- Error and security alerting reviewed weekly.
- Security updates applied within days of release; everything else monthly.
- Dependency and secret scanning in CI kept green.
- Backup restore tested quarterly, with the result recorded.
- Access review quarterly: who has access to what, remove leavers.

## Monthly report outline

Drafted by Tahi in the first week of the month for the month before. Sent only on a yes. Under one screen.

**Sources** (when the dashboard is connected):

- `get_retainer_health`: hours used against the plan, request throughput, capacity and any warning signs.
- `list_requests` for the client: delivered, in progress, waiting on the client.
- `get_engagement_delivery_status`: on track or not.
- Monitoring results, Search Console, analytics.

**Outline**

> # [Site name]: [month] report
>
> **In short:** [one or two lines: the most useful thing that happened, and anything that needs them.]
>
> **Done this month:** [delivered requests, in outcome terms]
> **In progress:** [requests, expected dates]
> **Waiting on you:** [items, names, dates]
>
> **Site health:** uptime [n]%, forms tested [date], [updates applied], [any incident and what was done].
> **Search and traffic:** [two or three numbers with the period and source, and one line on what they mean.]
> [R3] **Security:** updates applied, alerts reviewed, restore test result.
>
> **Next month:** [top of the task list]
> **Worth considering:** [one suggestion, at most, tied to their goals.]

Internally, if `get_retainer_health` shows the plan is consistently over or under capacity, raise it with Liam before the client sees the report; a plan change is a sales conversation, not a report line.

## The offer at handover

Start from the "project to monthly plan" scenario in `tahi:tahi-brand-voice`. The shape: most of the gain from a new site comes after launch; fixes, tests and small improvements sit in one task list; no price in the first email. Mention the plan that fits the site's risk level and what it would watch for them. Draft only; Liam sends or approves.

If the client says no, record it in `docs/decisions.md`, tell them in the handover pack what is no longer monitored after the support window, and who should watch it on their side.

## Setting up the plan in the dashboard

On a yes from the client and Liam: the client's plan type is `maintain` or `scale`, with the agreed tracks. Create the first requests from the parked ideas the client chose (`create_request`, client-visible, so after a yes). Add renewal dates and the first report date as commitments (`add_commitment`). Log the decision in `docs/decisions.md`.
