---
name: stack-picker
description: "Choose the stack for a Tahi website project: Webflow versus Astro versus Next.js, Webflow CMS versus Sanity versus Markdown or MDX, and hosting on Webflow, Cloudflare, Vercel or AWS, from the project profile (who edits, what it connects to, risk level, budget for hosting, who maintains it). Use when the user asks 'what should we build this in', 'Webflow or code', 'Astro or Next', 'do we need Sanity', 'where should we host it', 'should this be headless', or at the Plan phase of a new project. Records the choice as a decision so it is not reopened."
---

# Stack picker

Read `PROJECT.md` first (`tahi-core:tahi-project`). The choice follows from who edits, what the site must do, and who maintains it, not from what is fashionable. The defaults below are a starting point; any project can override them with a recorded reason.

## 1. Build platform

| Choose | When | Avoid when |
|---|---|---|
| **Webflow** (default for marketing sites) | Client's marketing team edits pages and CMS themselves; layout changes without a developer; no custom backend; Tahi's Webflow skills apply | App-like features, logins with custom data, heavy integrations, or the client will not pay Webflow hosting |
| **Astro** | Content and marketing sites maintained by Tahi or a developer; top performance and low hosting cost; structured content in Sanity or Markdown; a few dynamic bits (forms, search) | The client's team needs to build new page layouts themselves without a developer |
| **Next.js** | App-like behaviour: logins, dashboards, personalisation, lots of server-side logic, a React component library to reuse | A content site that only needs a CMS and forms (Astro does it lighter) |

## 2. Content

| Choose | When |
|---|---|
| **Webflow CMS** | The build is Webflow and content is page-shaped collections (blog, team, case studies) |
| **Sanity** | Code build with client editors; structured content reused across pages or channels; editorial workflow, previews or many editors; content that must outlive the front end |
| **Markdown / MDX in the repo** | Developers or Tahi edit it; docs, changelogs, small sites |
| **None** | Static site whose content changes rarely and Tahi makes the changes |

## 3. Hosting and backend

| Choose | When |
|---|---|
| **Webflow hosting** | Webflow builds |
| **Cloudflare** (default for code) | Astro and static sites; Workers for forms, small APIs and edge logic; D1, KV and R2 for light data |
| **Vercel** (default for Next.js) | Next.js projects; client sites need a paid (Pro) plan. Cloudflare's Next.js support is still maturing (check `tahi-code:nextjs`) |
| **AWS** | The client mandates AWS or already runs there; heavy or long-running backend work; compliance requirements the client has met on AWS |

## 4. Check the choice against the profile

- **Risk 3** on a code stack raises the maintenance commitment: who patches it in a year? If nobody, reconsider.
- **Who maintains it after handover?** A client team without developers should not be handed a code stack unless a retainer covers it.
- **Hosting cost over three years**, not just build cost.
- **Migration:** whatever is chosen must support the redirect map and keep URLs where possible.

## 5. Record it

Write the choice as a decision in `docs/decisions.md` (context, decision, why, revisit if) and fill in the Stack section of `PROJECT.md`. Then load the matching stack skills: `tahi-webflow:*` or `tahi-code:*`.
