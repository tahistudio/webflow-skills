# What the platform already handles

Read this before spending any time on hosting, SSL, backups, uptime, CDN, scaling or rollbacks. If the platform handles it, it is at most a ten-second "is it on" check at the production gate. The work worth doing is in the right-hand column.

The key question is never "which stack" but **"where does each kind of data live?"** Code, content, uploaded files and form submissions often live in four different places, and each has its own answer to "is it backed up?". The profile's "Where data lives" section answers it per project.

| Platform | Handles for you | Still yours |
|---|---|---|
| **Webflow hosting** | SSL certificates, CDN, DDoS protection, scaling, site backups and version history (restore from Site settings), uptime, image resizing variants | Redirects (you enter them), form data after it leaves Webflow, third-party scripts, accessibility, SEO content, the domain's DNS records |
| **GitHub** | Full history of the code, so the code itself is backed up | Anything not in the repo: CMS content, databases, uploaded media, form submissions, secrets |
| **Cloudflare (Workers / Pages)** | SSL, CDN, DDoS protection, preview deploys per branch, instant rollback to an earlier deployment | D1, KV and R2 data (D1 has point-in-time restore; check the retention on the plan), secrets set in the dashboard or with wrangler, cache rules, redirects, security headers |
| **Vercel** | SSL, CDN, preview deploys per branch, instant rollback | Any database or storage you attach, environment variables, headers, redirects |
| **Sanity** | Hosting the content, document history per document, image CDN | Dataset-level backups (scheduled `sanity datasets export` at risk 2+, or the plan's backup feature if it has one; check the plan), roles for client editors, webhook targets |
| **AWS** | Almost nothing by default | IAM, logging and log retention, alarms, backups (S3 versioning, database snapshots), cost budgets, certificates (ACM is free but you attach it), patching runtimes |
| **CRM / form tools** (HubSpot, Mailchimp, Formspark, ...) | Storing submissions they receive | Making sure submissions reach them, and an alert when they stop arriving (risk 2+) |

## Consequences

- **SSL is never a tier decision.** Every platform above issues and renews certificates for free. Check HTTPS works and HTTP redirects to it; that is all.
- **Backups matter only where data lives outside a platform that keeps it.** A Webflow-only site needs no backup work. A code repo on GitHub needs none for its code. A Sanity dataset, a D1 database or an S3 bucket of uploads might, from risk 2.
- **Uptime monitoring** is about knowing, not preventing. Platforms keep the site up; monitoring tells a person when a form, integration or custom backend breaks. From risk 2.
- **Rollbacks** are free on Webflow, Cloudflare and Vercel. On AWS, plan them (versioned deploys) at risk 2+.
