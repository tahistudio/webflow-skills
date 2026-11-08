---
name: dev-qa
description: "Development and functional QA for any Tahi website, on any stack, scaled by the project's risk level: automated quick checks (HTTPS, canonical host, indexing, robots and sitemap, head tags, 404, security headers, mixed content, plus optional broken links, axe accessibility and Lighthouse), then the tagged manual checklist for forms, integrations, accessibility, SEO, performance, analytics and consent, CMS editing, browsers and devices, and security. Use when asked to 'QA the site', 'test the build', 'check it's ready', 'run checks', 'is it secure enough', 'check performance', 'accessibility check', 'check the forms', or before any production launch. Reads the risk level from PROJECT.md so a brochure site gets a light pass and a site with logins or payments gets the full one. Design and visual QA is tahi-design:design-qa."
---

# Dev QA — does it work, and how do we know

Read `PROJECT.md` first (see `tahi-core:tahi-project`). Its risk level and feature list decide which checks apply. Visual and design checks are `tahi-design:design-qa`; this skill is function, accessibility, SEO, performance and security.

## When to run what

- **While building, on dev and staging:** only what helps you build. No checklist. Run the quick checks against staging when it is useful.
- **At the production gate:** the full pass for the risk level, once, with evidence recorded in `docs/log.md`. Then `tahi-core:launch`.
- **After launch:** the post-launch checks in `tahi-core:launch`.

## Step 1: automated checks (every project, minutes)

Run the bundled script against the URL. It needs only `curl`; `--full` adds broken-link, axe and Lighthouse runs through `npx`.

```bash
bash "${CLAUDE_PLUGIN_ROOT}/skills/dev-qa/scripts/quick-checks.sh" https://staging.example.com --risk 2 --staging
bash "${CLAUDE_PLUGIN_ROOT}/skills/dev-qa/scripts/quick-checks.sh" https://example.com --risk 2 --full
```

If `CLAUDE_PLUGIN_ROOT` is not set in your shell, find the script under the installed `tahi-core` plugin, or in the skills repo at `plugins/tahi-core/skills/dev-qa/scripts/`.

- The `--risk` flag decides what is a FAIL and what is a WARN. A missing Content-Security-Policy fails at risk 3 and is only a warning below that.
- Use `--staging` on staging and preview URLs: they must be noindexed, and canonical-host checks are skipped.
- When the Tahi dashboard is connected, its own checks complement the script: `run_qa_site_checks`, `run_qa_pagespeed`, `crawl_qa_site`, `check_qa_round_links`, `check_qa_redirect_map` (migrations).
- Paste the summary line and every FAIL into the log as evidence.

A FAIL is fixed or explained in one line in the log. A WARN is read, then fixed or left. Do not chase a WARN that the risk level does not care about.

## Step 2: the tagged checklist

Work through [references/checklist.md](references/checklist.md). Apply only the items whose tags match the profile (see the tag rules in `tahi-core:tahi-project`, references/tiers.md). Report each as PASS, FAIL (with evidence), NEEDS VISUAL or MANUAL (only a person can check; say exactly where).

Stack skills add their own checks: `tahi-webflow:tahi-webflow-core` (references/qa-checklist.md) for Webflow, and the production checklists in `tahi-code:*` for code stacks. Run those alongside, do not duplicate them.

## Step 3: report

```
Dev QA · {site} · {date} · risk {n}
Automated: {passed} passed, {warnings} warnings, {failed} failed  (script output in docs/log.md)
Checklist: {n} items applied, {n} pass, {n} fail, {n} manual
FAILS
- {item}: {evidence} → {fix or owner}
MANUAL (needs a person)
- {item}: {where to look}
Not checked, and why
- {item}: {reason, e.g. risk 1, no logins}
```

## Stop rules

- The risk level's bar is the bar. A risk-1 brochure site does not need a CSP, penetration testing or uptime alerts. A risk-3 portal does.
- Fix FAILs, record WARNs, move on. Anything bigger than the job allows goes on `docs/parking.md`.
- If QA reveals a feature the profile does not list (a hidden login, a form writing to a spreadsheet), stop and flag the risk change before carrying on.
