# Open questions: tahi-client plugin

House preferences the `tahi-client` skills needed but could not know. Each has the default written into the skills and why. Answer any of these and the change goes in one place, named under "Lives in".

Drafted 8 November 2026.

## Kickoff

1. **Is kickoff a call or a form?**
   Default: light is async (one welcome message with the questionnaire, access list and working agreement; a 15 minute call only if asked). Standard is a questionnaire sent 3 working days ahead, then a 45 minute video call. Full is a 90 minute workshop with everyone who signs off.
   Why: tiers.md says light jobs get async updates; a call for a one-decision-maker job adds a meeting without adding information.
   Lives in: `client-kickoff` SKILL.md section 2, references/agenda.md.

2. **Are kickoff calls recorded and transcribed into the dashboard?**
   Default: record only with everyone's agreement, said at the start; review dashboard call suggestions before creating requests.
   Why: the dashboard reads transcripts and suggests requests, which is useful, but recording a client needs consent.
   Lives in: `client-kickoff` references/agenda.md.

3. **Which password manager does Tahi use, and which Tahi identity is invited to client accounts?**
   Default: the client invites named Tahi people as users wherever the platform allows; passwords that must be shared arrive as a share from the client's own password manager and are kept in "the Tahi team vault" (product not named).
   Why: invitations are auditable and revocable; shared studio logins break when people change.
   Lives in: `client-kickoff` SKILL.md section 4.

## Working agreement

4. **How many feedback rounds are included per stage?**
   Default: light 1 consolidated round; standard 2; full 2, each signed off by the named approver. Extra rounds are a change request.
   Why: tiers.md fixes light at one round; two is the common studio norm and keeps standard jobs moving.
   Lives in: `client-kickoff` references/working-agreement.md.

5. **How long does the client get to return feedback and decisions?**
   Default: 3 working days for a feedback round (5 on full process, more people to consolidate); 2 working days for a single decision, approval, file or access.
   Why: long enough to gather a team's comments, short enough that the schedule holds.
   Lives in: `client-kickoff` references/working-agreement.md.

6. **Working hours and time zone for client work.**
   Default: Monday to Friday, New Zealand business hours, excluding NZ public holidays. Reply to existing clients within 1 to 2 working days at most (taken from `tahi:tahi-brand-voice`, not invented).
   Why: the brand voice already sets the reply standard; hours and holidays were not stated anywhere. UK and AU clients may need a note on overlap.
   Lives in: `client-kickoff` references/working-agreement.md.

7. **Update cadence and day.**
   Default: light at each milestone and whenever blocked; standard a weekly written update; full a weekly written update plus a 30 minute check-in call. No fixed weekday set.
   Why: matches tiers.md ("weekly or per milestone"; full adds weekly check-ins). A fixed day (Friday?) would help clients know when to look.
   Lives in: `client-kickoff` references/working-agreement.md.

8. **What happens when Tahi waits on the client?**
   Default: one reminder when the turnaround passes; a personal message 2 working days later; dates re-planned at 10 working days (launch moves by at least the delay); project formally paused at 20 working days.
   Why: the dashboard already sends one automatic nudge; the rest makes the effect on dates explicit early. Whether a pause has contract or invoicing consequences is for Liam.
   Lives in: `client-kickoff` references/working-agreement.md; wording in `client-delivery` references/conversations.md.

9. **Does silence ever count as approval (a "deemed approval" clause)?**
   Default: no. Silence moves dates; it never approves.
   Why: deemed approval causes arguments at launch. If Tahi's terms include one, the skills should say so.
   Lives in: `client-kickoff` references/working-agreement.md; `client-delivery` SKILL.md section 4.

## Scope and money

10. **Where is the line between a tweak and a change request?**
    Default: a tweak is under 30 minutes and inside the agreed intent; tweaks are absorbed and logged up to about 2 hours per stage, then grouped into a change request.
    Why: small goodwill keeps relationships easy; a cap stops it silently eating the margin.
    Lives in: `client-kickoff` references/working-agreement.md.

11. **How are change requests priced: hourly, or a fixed quote per change?**
    Default: a fixed quote per change, figures taken from the dashboard doc "Services and Pricing" or from Liam; drafts carry [PRICE: confirm with Liam] when unknown.
    Why: the brand voice keeps prices out of skills; a fixed quote is easier for clients to say yes to.
    Lives in: `client-delivery` references/scope-changes.md.

12. **When should Tahi warn a client about budget?**
    Default: at about 75 percent of the budget used.
    Why: early enough to trim scope instead of asking for more money at the end.
    Lives in: `client-delivery` references/conversations.md.

13. **How is sign-off recorded on full-process projects?**
    Default: a written yes from the named approver in the dashboard request thread, the approver set as a participant with the Approver role, and a line in docs/decisions.md. No separate signed document.
    Why: tiers.md asks for formal sign-off recorded in the dashboard; the dashboard already has an Approver role.
    Lives in: `client-delivery` SKILL.md section 4.

## Handover and ownership

14. **How long is the post-launch support window?**
    Default: 30 days from launch, for defects against the agreed definition of done, at Tahi's cost.
    Why: a common studio norm; long enough for real use to surface problems.
    Lives in: `client-handover` SKILL.md section 5.

15. **Where do Webflow sites live: the client's workspace, or Tahi's?**
    Default: the client's own workspace (or transferred there at launch), the client's card on the site plan, Tahi invited as a collaborator.
    Why: "Everything we make for you is yours (projects once paid)" and the client owns billing.
    Lives in: `client-handover` SKILL.md section 2; `client-kickoff` references/access-and-assets.md.

16. **Where do code repositories live after launch?**
    Default: in the Tahi GitHub organisation while Tahi maintains the site, with client read access; transferred to the client's organisation on request once the project is paid.
    Why: keeps CI, secrets and updates simple during a monthly plan while honouring ownership.
    Lives in: `client-handover` SKILL.md section 2.

17. **Does Tahi keep access after the support window when there is no monthly plan?**
    Default: no. Tahi offers the client a written list of its access and removes it on their yes; it keeps nothing without written OK.
    Why: least access, and it makes ownership real.
    Lives in: `client-handover` SKILL.md section 2.

18. **Training format and tooling.**
    Default: every handover gets a 5 to 8 minute recorded walkthrough; standard adds one 60 minute live session (recorded); full adds one session per editor group. Recording tool not named.
    Why: tiers.md puts training at standard and up; a short video costs little and saves light-job clients a support request.
    Lives in: `client-handover` SKILL.md section 1, references/training.md.

## Monthly plans

19. **What does each monthly plan cover by risk level, and how often do code updates run?**
    Default: risk 1, quarterly dependency updates and a monthly health glance; risk 2, monthly updates, uptime and form-failure alerts to a named person, monthly Search Console check; risk 3, security updates within days, weekly alert review, quarterly restore test and access review.
    Why: follows the risk tiers in tiers.md. Whether Maintain and Scale differ in coverage or only in capacity is unknown.
    Lives in: `client-handover` references/monthly-plans.md.

20. **Which uptime and alerting tools, and who receives alerts?**
    Default: not named; whatever `tahi-core:launch` sets up. Alerts go to a named person on the client side or under a monthly plan, never to nobody.
    Why: tool choice belongs with the launch skill.
    Lives in: `client-handover` SKILL.md handover gate, references/monthly-plans.md.

21. **When is the monthly report sent, and to which plans?**
    Default: drafted in the first week of the month for the month before, Maintain and Scale clients only, sent on a yes.
    Why: a predictable rhythm; one-off project clients have nothing to report on.
    Lives in: `client-handover` references/monthly-plans.md.

22. **When does a monthly plan request become a new project?**
    Default: when it needs its own design and sign-off, raises a profile level, needs more than about 15 hours or would fill the task list for more than a month, or has a hard deadline the queue cannot meet.
    Why: the task list works for steady, small work; big pieces need a plan, a price and gates.
    Lives in: `client-handover` SKILL.md section 7.

23. **Do sites without a monthly plan get any monitoring after the support window?**
    Default: none. The handover pack says what stops being watched and who should watch it on the client side.
    Why: monitoring without an agreement creates an implied promise.
    Lives in: `client-handover` references/monthly-plans.md.
