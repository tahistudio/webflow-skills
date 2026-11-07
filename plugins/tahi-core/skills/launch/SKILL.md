---
name: launch
description: "The production gate and launch runbook for any Tahi website, on any stack, scaled by risk level: what must be true before production, the launch-day sequence (DNS and domain cutover, redirects, publishing or deploying, smoke tests, Search Console, analytics), rollback, and the post-launch checks at one day and one week. Use when the user says 'launch', 'go live', 'ship to production', 'publish to the live domain', 'switch the DNS', 'cut over', 'is it ready to launch', 'launch checklist', or 'roll back'. Deploying or publishing to production always needs an explicit instruction from a person."
---

# Launch — the production gate

Read `PROJECT.md` first (`tahi-core:tahi-project`). Development and staging are fast and unguarded; this is where the rigour sits, once.

**Never deploy, publish or change DNS for production without an explicit instruction from a person in this conversation.** Preparing everything up to that point is fine.

## 1. Gate: before launch day

Tagged items apply per the profile.

- [ ] Design QA passed at the craft level (`tahi-design:design-qa`); remaining items are polish only.
- [ ] Dev QA passed at the risk level (`tahi-core:dev-qa`); automated checks run against staging; evidence in `docs/log.md`.
- [ ] Client has signed off on staging. [P:full] Sign-off recorded in the dashboard.
- [ ] Production environment variables, secrets and integration credentials set; integrations switched from test to live mode.
- [ ] Analytics, consent and Search Console ready for the production domain.
- [ ] Domain access confirmed: who controls the registrar and DNS, and they are reachable on launch day.
- [ ] [if:migration] Redirect map complete and loaded (or ready to load); old site's sitemap saved; top pages and their rankings recorded as a baseline.
- [ ] [if:migration] Old site kept available (export or staging copy) until the new one has been live a week.
- [ ] [R2] DNS TTL lowered to about 5 minutes a day before cutover, if moving hosts.
- [ ] [R2] Uptime and form monitoring configured, alerts going to a named person.
- [ ] [R2] Rollback plan written in one paragraph: how, who, how long.
- [ ] [R3] Backups taken immediately before launch; restore tested within the project.
- [ ] [R3] Incident contact list and client communication plan agreed.
- [ ] [P:full] Launch rehearsed on staging.
- [ ] Launch time chosen: a weekday morning in the client's time zone, never a Friday afternoon or before a holiday, with someone able to watch for two hours.

## 2. Launch day

1. **Announce the window** to the client (draft the message; send only when asked).
2. **Deploy or publish** to production as the stack skill describes (`tahi-webflow:tahi-webflow-core`, `tahi-code:*`).
3. **Connect the domain** if new: DNS records per the host's instructions; SSL is issued by the platform (see references/platforms.md in `tahi-core:tahi-project`).
4. **Load redirects** [if:migration].
5. **Smoke test production** with the quick checks script (no `--staging`), then by hand: home page, navigation, one page of each template, every form with a real submission, any login or checkout [if:auth] [if:payments].
6. **Search and analytics:** submit the sitemap in Search Console, check analytics is receiving visits, remove any leftover noindex.
7. **Log it:** a launch entry in `docs/log.md` with the time, what was checked, and anything outstanding.

## 3. Rollback

If something serious breaks and cannot be fixed within about 30 minutes, roll back first and fix second.

- Webflow: restore the previous published version from site backups, or republish the previous version.
- Cloudflare and Vercel: promote the previous deployment.
- DNS cutover: point the records back to the old host (fast if TTL was lowered).
- AWS: redeploy the previous version per the project's rollback paragraph.

Log what happened and why in `docs/log.md` and a decision if anything changes.

## 4. After launch

- **Same day:** re-run quick checks; watch the console, forms and analytics; check redirects on real old URLs [if:migration].
- **Day 1–2:** Search Console coverage and errors; form submissions arriving; [R2] uptime and error alerts quiet.
- **Week 1:** [if:migration] traffic and rankings against the baseline; 404s in Search Console redirected; [R2] Core Web Vitals field data once available.
- Review `docs/parking.md` and move on to `tahi-client:client-handover`.
