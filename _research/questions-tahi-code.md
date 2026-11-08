# Open questions: tahi-code

Each has the default the `tahi-code` skills currently use and why. Answer in a question round, then fold the answer into the owning skill and delete the question. Formatter (Biome) and package manager (pnpm) are already asked in `questions-tahi-core.md`.

1. **Cloudflare account ownership.** Default: production runs in a Cloudflare account the client owns, with Tahi invited as a member; one account per client. Why: the client keeps the domain, DNS and site if they leave, and access is easy to revoke. Alternative: Tahi-owned accounts per client, transferred at handover. (`tahi-code:cloudflare`, references/dns-and-redirects.md)

2. **Next.js hosting.** Default: Vercel Pro for production Next.js. Why: Vercel runs the reference adapter, so every feature works; Cloudflare now recommends vinext (beta) over OpenNext, and neither is a verified adapter yet. Sub-question: does the client own the Vercel team (they pay, Tahi is a member) or does Tahi host on its own Pro team and bill it on? Default: client owns it, same reasoning as question 1. (`tahi-code:nextjs`)

3. **Infrastructure as code on AWS.** Default: AWS CDK v2 in TypeScript. Why: AWS's own tool with frequent releases. SST is now v4 (Pulumi-based) and quicker to start, but its commit and release activity has slowed noticeably in 2026 and it ties the client to a small vendor. Alternative: SST for full-stack apps if the team prefers its developer experience. (`tahi-code:aws`)

4. **Email for forms on Cloudflare and Vercel.** Default: Resend from a verified sending subdomain. Why: simple API, works from Workers and Vercel, good DKIM set-up, idempotency keys. Alternatives: Postmark (strong deliverability reputation for transactional mail), or SES everywhere for one provider. (`tahi-code:cloudflare` references/forms.md)

5. **Styling approach in code.** Default: plain CSS with tokens as custom properties in `tokens.css`, scoped `<style>` in Astro and CSS Modules in Next.js. Why: matches the token system in `tahi-design:design-consistency` one to one and keeps the output readable. Alternative: Tailwind v4 with its theme generated from `tokens.css` (faster for some developers; `create-next-app` defaults to it). (`tahi-code:astro`, `tahi-code:nextjs`)

6. **Where the Sanity Studio lives.** Default: a separate `studio/` package in the same repo, deployed with `sanity deploy` to `<name>.sanity.studio`. Why: keeps React out of the Astro build and deploys independently. Alternative: embedded at `/admin` or `/studio` in the site when the client wants one URL. (`tahi-code:sanity`)

7. **Sanity plan and billing for client-edited sites.** Default: the client pays for a Sanity plan that includes the Editor role whenever they edit content. Why: the Free plan only has Administrator and Viewer, so a client editor on Free can delete datasets and tokens. Who owns the Sanity organisation: default the client, with Tahi as Developer or Administrator. (`tahi-code:sanity`)

8. **Sanity backup cadence and retention.** Default at risk 2: weekly `sanity datasets export` from GitHub Actions to a private R2 bucket in the client's Cloudflare account, keeping 12 weekly exports; daily at risk 3. Why: dataset backups on Sanity's side are Enterprise-only, and exports count against API usage. Is 12 weeks right, and should the bucket be Tahi's instead? (`tahi-code:sanity` references/operations.md)

9. **When Visual Editing is worth setting up.** Default: at craft 2+ or standard process and above, when the client edits often; otherwise preview on staging after publishing. Why: on Astro it needs a separate server-rendered preview environment and a Viewer token, which is real set-up and upkeep. (`tahi-code:sanity`, `tahi-code:astro`)

10. **Auth for risk-3 Next.js projects.** Default: a managed identity provider (Clerk, Auth0, WorkOS or the client's existing one); Better Auth when user data must stay in the client's own database. Do not start new projects on Auth.js (now in security-fix-only maintenance under Better Auth). Which managed provider should be the house default? (`tahi-code:nextjs`)

11. **AWS region for NZ clients.** Default: `ap-southeast-2` (Sydney); `ap-southeast-6` (Auckland) only when NZ data residency is required and every needed service is offered there. Why: Sydney has every service (SES was not listed for Auckland when checked on 2026-11-08). (`tahi-code:aws`)

12. **Protecting previews.** Default: Cloudflare Access (or Vercel Deployment Protection) in front of previews that show unreleased client content at risk 2+; at risk 1, `noindex` is enough. Is the extra sign-in step acceptable for clients reviewing previews, or should previews use shareable bypass links? (`tahi-code:cloudflare`, `tahi-code:nextjs`)

13. **Error monitoring for code projects.** Default: the platform's own logs and alerts (Workers Logs, Vercel logs, CloudWatch alarms), with a third-party tool (Sentry or similar) only at risk 3. Is there a house tool and account to use? (all stack skills)

14. **Islands framework in Astro.** Default: no UI framework; plain `.astro` components and small scripts, React only when an island or Sanity Visual Editing needs it. Alternative: Preact or Svelte for lighter islands. (`tahi-code:astro`)
