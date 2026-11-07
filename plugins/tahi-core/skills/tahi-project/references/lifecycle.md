# Lifecycle and gates

Each phase ends at a gate. A gate is a short list of things that must be true before the next phase starts. Items are tagged; apply only those that match the profile.

## 1. Kickoff → `tahi-client:client-kickoff`

- [ ] `PROJECT.md` written; levels and the `why:` line agreed.
- [ ] Scope in and out written down.
- [ ] Access and assets received, or requested with a date.
- [ ] Dashboard client and project records exist and are linked from the profile.
- [ ] [P:standard] Kickoff call held; notes in `docs/log.md`.

## 2. Plan

- [ ] Stack chosen (`tahi-core:stack-picker`) and recorded as a decision.
- [ ] Sitemap agreed.
- [ ] [if:cms] Content model drafted: collections or document types, fields, who edits what.
- [ ] [if:migration] URL inventory of the old site with traffic, links and rankings; redirect plan started.
- [ ] [if:integrations] Every integration listed with its owner, credentials route and failure behaviour.
- [ ] [P:standard] Dated plan in `docs/plans/`.
- [ ] [P:standard] Client sign-off on sitemap and scope.

## 3. Design → `tahi-design:*`

- [ ] Design system first: tokens, type scale, spacing, components, motion level.
- [ ] Industry and audience starting point reviewed (`tahi-design:design-consistency`, industries reference).
- [ ] [C2] Every page designed at desktop and mobile; key components at tablet.
- [ ] [C3] Motion and interaction specified for signature moments.
- [ ] Client sign-off on designs (one consolidated feedback round per stage on light process).

## 4. Build → stack skills

- [ ] Foundation before sections: tokens, utilities or base CSS, layout, nav and footer components.
- [ ] One section at a time, checked on staging at each breakpoint before the next.
- [ ] Work happens on dev and staging; production untouched.
- [ ] Log entries kept current.

## 5. QA → `tahi-design:design-qa`, `tahi-core:dev-qa`

- [ ] Design QA at the craft level's depth; fix-list cleared to "polish" items only.
- [ ] Dev QA at the risk level's depth; automated checks pass or each failure is explained.
- [ ] [if:cms] Client editor test done.
- [ ] [P:standard] Client QA round on staging; feedback consolidated and resolved.

## 6. Launch → `tahi-core:launch`

- [ ] Production gate passed with evidence recorded.
- [ ] Launch-day runbook followed; post-launch checks done.

## 7. Handover → `tahi-client:client-handover`

- [ ] Client owns domain, hosting and billing accounts.
- [ ] Editor guide and training delivered at the process level's depth.
- [ ] Parking list reviewed with the client: offered, scheduled or dropped.
- [ ] Support window and retainer (if any) agreed.

## 8. Retro → `tahi-core:retro`

- [ ] Retro written; proposed skill changes filed.
- [ ] Repo cleaned and, if no retainer, archived.
