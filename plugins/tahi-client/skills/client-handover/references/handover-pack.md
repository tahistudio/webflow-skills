# Handover pack templates

The pack is a client document. Follow `tahi:tahi-brand-voice` when it is installed: plain, no dashes, sentence case headings, "monthly plan", never "retainer". It lists where each login lives and who owns it. It never contains a password.

Store it where the client can find it again: a dashboard doc shared with them, or a PDF attached to the handover request. Keep a copy in the project folder as `docs/handover.md` with anything client-confidential removed.

## light: one page

> # [Site name]: your website, handed over
>
> **Your site:** [production URL]. Launched [date].
>
> **What you own.** Everything below is in your name and on your billing.
>
> | What | Where | Renews |
> |---|---|---|
> | Domain | [registrar], [account owner] | [date] |
> | Website and hosting | [Webflow site plan / Vercel / Cloudflare], [account owner] | [date] |
> | Analytics | Google Analytics, [account] | |
> | Forms send to | [email / CRM] | |
>
> **Editing your site.** [Three or four tasks, each with three to five steps. See the editor guide template for your platform.]
>
> **Please don't change:** [two or three items, each with a reason].
>
> **Training video:** [link], [length] minutes.
>
> **If something's not right.** For the first [30] days after launch, anything that isn't working as agreed, we fix at no cost: raise it at [dashboard link] or reply to this message. We reply within one to two working days.
>
> **Our access.** We still have [list] so we can fix things quickly during the first [30] days. After that, [we keep it for your monthly plan / we'll remove it once you say so].
>
> **What's next.** [One line: the monthly plan offer or "nothing planned; we're here if you need us".]

## standard and full: the full pack

Sections, in order. Skip any that do not apply to the project.

1. **Summary.** The site, the launch date, the stack in one plain line, the Tahi lead.
2. **What you own.** The ownership table from SKILL.md section 2, filled for this project: account, owner of record, billing, renewal date, how to sign in (by role, not by password).
3. **Our access, and why.** Each Tahi access with its reason and when it ends.
4. **How the site is built,** in client terms: page templates, CMS collections or Sanity document types, reusable sections, forms and where they send, integrations.
5. **Editing your site.** Link to the editor guide (or guides per editor group on full process).
6. **Training.** Session recording and the short video.
7. **What we checked before launch.** A plain summary of the `tahi-core:launch` evidence: pages, devices, forms tested, accessibility target, performance. No claim without the evidence behind it.
8. **Support window.** Dates, what counts as a defect, how to raise one, reply time.
9. **Looking after the site.** What is monitored and by whom, what needs renewing when (domain, plans, licences), what happens if no monthly plan is in place.
10. **Next steps.** The monthly plan offer, any parked ideas from `docs/parking.md` worth a next phase.
11. [P:full] **Sign-off.** The approver confirms the handover in the dashboard request thread.

## Before sending

- [ ] Every renewal date checked in the account itself, not guessed.
- [ ] No password, API key or recovery code anywhere in the pack.
- [ ] Every claim in "What we checked" matches recorded evidence.
- [ ] Parked ideas reviewed with the person before they appear in a client document.
