# Changelog

Newest first. One line per change that alters how we work. Plugin versions follow commits (no `version` field), so this file is the human record.

## 2026-11-10 (Larkstone first review)
- `webflow-template`: new Running checklist section (rows per page, section, component, breakpoint, with evidence); pre-submit pass gains items 8 to 12 from Webflow's first review (placeholder social links, logo links to Home, unused-style cleanup, bound CMS page titles, image width and height on every page).

## 2026-11-08 (Larkstone retro)
- `webflow-template`: new `references/submission-form.md` (form flow, asset specs, preview-link source, pre-submit pass); workflow now makes listing assets before the form, keeps one facts file for listing, Changelog and Instructions, and adds step 12: never call a template ready until the QA verdict is WOULD PASS, because the form's "Ready to submit" only reflects its own checks.
- `tahi-webflow-core`: staggered section-reveal recipe for IX3 (section-scoped `wf:selector` with a `within` filter, stagger `amount`, 800 ms cap) and "agree the reveal style first".

## 2026-11-08
- Repo grows from Webflow-only into the Tahi delivery marketplace: new `tahi-core`, `tahi-client`, `tahi-design` and `tahi-code` plugins alongside `tahi-webflow`.
- `tahi-core`: project profile (risk, craft, process, motion levels), tag syntax for scaling checklists, platform responsibilities table, lifecycle gates, stop rules, log / decisions / parking files, session-start hook, dev QA with a quick-checks script, launch gate, stack picker, retro, evals.
- `tahi-webflow`: Marketplace template skill updated to the 6 Nov 2026 guidelines (Validator blocking issues, footer-only credit, root slugs, forms, self-promotion). Core now links to the project profile; publishing to `.webflow.io` staging no longer needs confirmation, custom-domain publishing goes through `tahi-core:launch`.
