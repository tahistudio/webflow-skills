# Changelog

Newest first. One line per change that alters how we work. Plugin versions follow commits (no `version` field), so this file is the human record.

## 2026-11-08
- Repo grows from Webflow-only into the Tahi delivery marketplace: new `tahi-core`, `tahi-client`, `tahi-design` and `tahi-code` plugins alongside `tahi-webflow`.
- `tahi-core`: project profile (risk, craft, process, motion levels), tag syntax for scaling checklists, platform responsibilities table, lifecycle gates, stop rules, log / decisions / parking files, session-start hook, dev QA with a quick-checks script, launch gate, stack picker, retro, evals.
- `tahi-webflow`: Marketplace template skill updated to the 6 Nov 2026 guidelines (Validator blocking issues, footer-only credit, root slugs, forms, self-promotion). Core now links to the project profile; publishing to `.webflow.io` staging no longer needs confirmation, custom-domain publishing goes through `tahi-core:launch`.
