---
name: client-handover
description: "Hands a launched Tahi Studio website over to the client and sets up what happens next: the handover pack (logins and ownership, where the client owns domains, hosting and billing, and what Tahi keeps access to and why), an editor guide written for the client's actual editors (Webflow Marketer and Content Editor roles, Sanity Studio), a training session agenda and a short training video script, the post-launch support window, the maintenance or monthly plan scaled by risk (what is monitored, how often updates happen, a monthly report built from the dashboard's retainer health), and when a monthly-plan request becomes a new project. Use after launch, or when asked to 'hand over the site', 'write the handover', 'write the editor guide', 'how does the client edit the site', 'plan the training session', 'script a training video', 'who owns the domain', 'what access do we keep', 'support period', 'set up a retainer', 'care plan', 'monthly report', or 'is this request a new project'."
---

# Client handover: after launch

Handover is done when the client owns everything they pay for, their editors can do their job without us, they know what happens if something breaks, and the next step (a monthly plan or a clean exit) is agreed.

It starts once the site is live and `tahi-core:launch` has recorded its evidence. Launch checks do not belong here. The build-side preparation for editing (hiding ` (dev)` components, tooltips on props) belongs to the stack skills, for example `tahi-webflow:webflow-client-site` Phase 5.

**Anything a client will see is drafted first and sent only on a yes.** The client contact rules are in `tahi-client:client-delivery`. In client-facing words, the monthly plans are **Maintain** and **Scale**; never call them a retainer.

## 1. Scale by process level

| Process | Handover pack | Editor guide | Training |
|---|---|---|---|
| **light** | One page | A section of the one page: the three or four jobs the editor actually does | A short recorded walkthrough video, no live session |
| **standard** | Full pack | Full guide for the stack | One live session, recorded, plus the video |
| **full** | Full pack, walked through in a handover meeting and signed off | One guide per editor group (for example marketing and HR) | One session per editor group, recorded, plus the video |

Templates: [references/handover-pack.md](references/handover-pack.md).

## 2. Ownership and logins

**The client owns every account the site depends on, in their name, on their billing.** "Everything we make for you is yours (projects once paid)." Tahi is a user on those accounts, never the owner of record.

| Account | Owner and billing | Tahi keeps | Why |
|---|---|---|---|
| Domain registrar and DNS | Client | User access, during support and any monthly plan | DNS fixes and email-safe changes |
| [webflow] Webflow site and site plan | Client's workspace, client's card | A collaborator role able to design and publish | Fixes, updates, monthly plan work |
| [code] Hosting (Cloudflare, Vercel, Netlify, AWS) | Client account | Member | Deploys, monitoring, rollbacks |
| [code] Repository | See below | Admin while Tahi maintains the site | Updates and fixes |
| [sanity] Sanity project | Client organisation | Administrator | Schema changes, backups, access support |
| Analytics, Search Console, Tag Manager | Client's Google account | Editor or Full user | Reporting, monitoring search health |
| [if:integrations] CRM, newsletter, booking, payments | Client | The least role that lets us support the integration | Fixing broken connections |
| Font and image licences | Client's name | Nothing | Licences are the client's |

**Repository default:** stays in the Tahi GitHub organisation while Tahi maintains the site, with the client given read access; transferred to the client's own organisation on request once the project is paid. Record where it lives in `PROJECT.md`.

**What Tahi keeps, and when it ends.** Tahi keeps the access above for the support window and for as long as a monthly plan runs. When neither applies, offer the client a written list of Tahi's access and remove it on their yes; keep nothing without their written OK. Removing access is offered, never done unannounced.

**Before handover:** confirm every account in the table is in the client's name. If any is in Tahi's name (a Sanity project or Webflow site created during the build), transfer it first. Credentials rules: `tahi-client:client-kickoff` section 4. The handover pack lists where each login lives, never a password.

## 3. The editor guide

Write it for the **actual editors**: ask who they are, what they will change most, and how comfortable they are with tools like this. A guide for a marketing lead who lives in HubSpot reads differently from one for an office manager who updates the team page twice a year.

- **Task first.** Headings are jobs ("Add a blog post", "Change a team member's photo"), not features.
- **Only what they will do.** Three to eight tasks covers most sites. Link to the platform's own help for anything else.
- **Say what not to touch** and why, in one short list.
- **Screenshots of this site,** not generic ones. Real collection names, real component names.
- **Who to ask.** Where to raise a request, and the reply time from the working agreement.

Stack templates:

- [webflow] [references/editor-guide-webflow.md](references/editor-guide-webflow.md): roles (Content Editor, Marketer in Build mode), CMS, components and props, publishing.
- [sanity] [references/editor-guide-sanity.md](references/editor-guide-sanity.md): Studio, documents, drafts and publishing, images, how long until changes appear on the site.
- [code] with no CMS (content in code or MDX): no editor guide. The pack says content changes come to Tahi as requests.

Before handing over, run the editor test from `tahi-core:tahi-project` › references/tiers.md (risk 2): a person with the client's role does each task in the guide on staging or production without help.

## 4. Training

Agenda for the live session and the script for the short video: [references/training.md](references/training.md). Train on the real site with the client's real content. Record live sessions with everyone's agreement and link the recording in the handover pack.

## 5. Support window

The default window is **30 days from launch** for defects: anything that does not meet the agreed definition of done or behaves differently from what was approved. This is a house default; record the project's actual window in `PROJECT.md` if the proposal says otherwise.

- **Defect** (inside the window): fixed at Tahi's cost. Raised as a dashboard request.
- **Change** (anything new, or different from what was approved): a monthly plan task, or priced as a change (`tahi-client:client-delivery` section 3).
- After the window: everything goes through the monthly plan or a quote.

Log the window's start and end dates in `docs/log.md` and add the end date as a commitment (`add_commitment`) when the dashboard is connected.

## 6. Maintenance and monthly plans

Offer a monthly plan to every client at handover; recommend one firmly from risk 2 up, where something silently breaking costs the client money. In the dashboard, monthly plan clients are on plan type `maintain` or `scale`, with tracks that queue their requests. Client-facing words: "monthly plan" and "task list", per `tahi:tahi-brand-voice`. Its "project to monthly plan" email scenario is the starting draft; do not price in the first email. Prices come from the dashboard doc "Services and Pricing".

What the plan covers scales with risk: at risk 1, a monthly health glance and quarterly code updates; at risk 2, uptime and form-failure alerts to a named person and monthly updates; at risk 3, security updates within days and tested restores. The full list per level, the monthly report outline, the offer and the dashboard set-up: [references/monthly-plans.md](references/monthly-plans.md).

**The monthly report** is drafted from `get_retainer_health` (hours, requests, capacity), `list_requests` (what was delivered), `get_engagement_delivery_status`, analytics and the monitoring results. It goes to the client only on a yes.

## 7. When a monthly plan request becomes a new project

A request leaves the task list and becomes its own project (a proposal via `create_proposal`, as a draft) when any of these hold:

- It needs its own design stage and sign-off: a new page type or template, a redesign of a section of the site.
- It adds a feature or integration that raises a profile level (logins, payments, personal data, a migration).
- It needs more than about 15 hours, or would fill the client's task list for more than a month.
- It has a hard external deadline that the queue cannot meet.

Say so when the request arrives, not after the work has started. Wording: `tahi-client:client-delivery` › references/scope-changes.md, "New phase".

## Handover gate

- [ ] Every account the site depends on is in the client's name and billing; transfers done.
- [ ] Handover pack sent and acknowledged.
- [ ] [if:cms] Editor guide written for the named editors; editor test passed.
- [ ] Training video recorded and linked.
- [ ] [P:standard] Live training session held and recorded.
- [ ] Support window dates in `docs/log.md` and the dashboard.
- [ ] Monthly plan offered; the client's answer recorded in `docs/decisions.md`.
- [ ] [R2] Monitoring and alerts go to a named person on the client side or under a monthly plan, never to nobody.
- [ ] Tahi's ongoing access listed in the pack, with the reason for each.
- [ ] [P:full] Handover signed off by the named approver in the dashboard.
- [ ] Final log entry; `tahi-core:retro` booked.
