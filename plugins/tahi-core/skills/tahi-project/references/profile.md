# The project profile (PROJECT.md)

`PROJECT.md` sits at the root of the project repo or folder. It is short, it changes rarely, and every Tahi skill reads it. The blank template is `templates/project/PROJECT.md` in the skills repo.

## Fields

```markdown
# {Client} — {Project name}

## Levels
risk: 1          # 0 throwaway · 1 brochure · 2 business-critical · 3 sensitive
craft: 2         # 1 functional · 2 polished · 3 showcase
process: light   # light · standard · full
motion: 2        # 0 still · 1 calm · 2 lively · 3 expressive
why: "Marketing site, contact form to HubSpot, client edits blog. No logins or payments."

## Stack
build: webflow            # webflow · astro · nextjs · other
framework: lumos          # lumos · client-first · none · ...
cms: webflow              # webflow · sanity · mdx · none
hosting: webflow          # webflow · cloudflare · vercel · aws · other
backend: none             # none · cloudflare-workers · aws-lambda · ...
environments:
  production: https://example.com
  staging: https://example.webflow.io

## Features   (only list what is true)
- forms → HubSpot
- cms (client edits)
- migration from WordPress (existing traffic)

## Where data lives
- Code: GitHub tahistudio/example (or "none, Webflow only")
- Content: Webflow CMS
- Form submissions: HubSpot (Webflow keeps a copy)

## Platform handles   (see platforms.md; no work needed on these)
hosting, ssl, cdn, site backups, uptime

## Audience
Who the site is for, in one or two lines. Industry. Anything about their tolerance for motion or novelty.

## Scope
In: ...
Out: ...

## People
Client contacts and who signs off. Tahi lead. Dashboard client and project links.

## Links
Figma · repo · staging · production · dashboard · analytics
```

Keep it to one screen. Detail belongs in `docs/`.

## Kickoff intake

Fill in everything the brief, the conversation, the repo, the Figma file and the Tahi dashboard already answer. Then ask the user only for what is missing, in **one** batch, in plain language. These are the questions behind the fields:

1. **What is the site for, and what happens if it is down for a day?** (sets risk: "nothing much" is 1; "we lose leads" is 2; "customers cannot pay or log in" is 3)
2. **Does it take payments, have logins, or store personal data anywhere we build or control?** (any yes is risk 3; a third-party widget that holds the data, such as a booking or payment provider's embed, does not count)
3. **Is it replacing a site that already gets traffic?** (migration flag; risk 2)
4. **Will the client edit content themselves? Which parts?** (cms flag; content model)
5. **What does it connect to?** Forms, CRM, booking, email, analytics, APIs. (integrations flag)
6. **Who is the audience, and how adventurous can it be?** (motion and craft)
7. **Is this a showcase piece for us, or a solid workhorse?** (craft)
8. **How many people sign off, and how big is the job?** (process)
9. **What is explicitly out of scope?**

If a stack is not yet chosen, run `tahi-core:stack-picker` after the intake.

## Deriving the levels

**Risk: take the highest flag that applies.**

| Flag | Minimum risk |
|---|---|
| Prototype, pitch, internal experiment, never on a public domain | 0 |
| Public marketing site; contact form only | 1 |
| Main lead source for the business; or client edits CMS content; or integrations that would silently lose leads; or migration of a site with existing traffic or search rankings | 2 |
| Payments; user accounts or logins; personal data stored in something we build or control; a custom backend or API (Workers, Lambda); the site itself collects or shows regulated data (health information, financial accounts, children's data) | 3 |

A regulated industry on its own does not raise the risk. A law firm's or clinic's brochure site is risk 1 or 2; its booking widget or client portal is the provider's responsibility unless we build or host it.

**Craft.** 1 if the client wants it working and on-brand and nobody will study it. 2 is the default for client work. 3 for award-level, showcase or brand-launch work, and for Tahi's own site.

**Process.** light: one decision-maker, a handful of pages, under about two weeks. full: several stakeholders, formal sign-offs, or more than about six weeks. standard: everything else.

**Motion.** From the audience; see `tahi-design:site-animator`. If unsure, 1 for conservative audiences, 2 otherwise.

Write one line under `why:` explaining the levels. It is what stops the question being reopened.

## Changing the profile

The profile changes only when the facts change. When they do, update it, add a line to `docs/decisions.md` saying what changed and why, and re-check anything the new level switches on.
