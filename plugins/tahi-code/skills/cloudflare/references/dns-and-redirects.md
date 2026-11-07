# DNS, domain cutover and redirects on Cloudflare

The launch-day order (freeze, deploy, cut over, smoke test, Search Console) is owned by `tahi-core:launch`. This file is the Cloudflare mechanics behind it.

## Contents

1. Who owns the account and the domain
2. Bringing a domain onto Cloudflare
3. Pointing the domain at the Worker
4. Redirects: which tool for which job
5. Email records survive the move

## 1. Who owns the account and the domain

- The domain stays registered to the client. Tahi never becomes the registrant.
- Production runs in a Cloudflare account the client owns, with Tahi invited as a member (default; see the open questions file). Record the account owner and every member in `PROJECT.md` under People.
- Use one Cloudflare account per client, never a shared Tahi account holding many clients' production sites.

## 2. Bringing a domain onto Cloudflare

Workers custom domains need the zone in the same Cloudflare account. Plan this days before launch, not on the day.

1. **Add the zone** in the client's account. Cloudflare scans existing DNS records; compare the import against the current DNS host record by record. Scans miss records (especially TXT, CAA, SRV and subdomains nobody remembers).
2. **Export the old zone** (zone file or screenshots) and save it to `docs/` before changing anything.
3. **Lower TTLs at the old DNS host** a day or more ahead, so the switch propagates quickly and can be undone quickly.
4. **Change nameservers at the registrar** to the two Cloudflare gives. This is a production change: explicit instruction only. If DNSSEC is on at the registrar, turn it off first and re-enable it through Cloudflare after the zone is active, or the domain stops resolving.
5. Wait for the zone to show **Active**, then check every record resolves (`dig`, or the DNS checks in `tahi-core:dev-qa`).

Moving nameservers can happen well before launch: with the same records, the old site keeps serving and nothing visible changes.

## 3. Pointing the domain at the Worker

- Attach the hostname as a **custom domain** on the Worker (`routes` with `custom_domain: true`). Cloudflare creates the DNS record and issues the certificate.
- If the hostname already has an A or CNAME record pointing at the old site, the custom domain cannot be attached until that record is removed. That removal is the cutover moment; do it on launch day, on instruction.
- Apex and www: attach the canonical one to the Worker and redirect the other with a redirect rule (section 4). Both need a DNS record (proxied) so the redirect can run.
- Keep the old host running for at least a week after cutover in case of rollback.

## 4. Redirects: which tool for which job

| Job | Tool | Notes |
|---|---|---|
| A few hundred old paths to new paths, static site | `_redirects` in `public/` | Max 2,000 static plus 100 dynamic rules; first match wins; static rules before dynamic. Not applied to Worker-rendered responses |
| Old paths on a server-rendered site | Framework config (Astro `redirects`, Next.js `redirects()`) | Lives in the repo, reviewed in PRs |
| Thousands of URLs, or a whole old domain | Bulk Redirects (account level) | Upload a CSV; supports preserving query strings and path suffixes |
| apex to www, http to https, one-off domain rules | Single redirect rule (zone level) | "Always Use HTTPS" covers http to https |

- Use `301` for permanent moves. `_redirects` defaults to `302` when no code is given, so always write the code.
- Keep the redirect map as a CSV in the repo (`docs/redirects.csv`: old URL, new URL, reason). It is the source of truth; generated files come from it.
- [if:migration] Test every row after cutover: each old URL returns one 301 hop to a 200 page. `tahi-core:launch` has the check.

## 5. Email records survive the move

The most common launch failure is broken email, not a broken site.

- Before switching nameservers, confirm MX, SPF (TXT), DKIM (TXT or CNAME), DMARC (TXT on `_dmarc`) and any verification TXT records exist in the Cloudflare zone exactly as before.
- MX and mail-related records must be **DNS only** (grey cloud), never proxied.
- Adding a sending service for forms (Resend, SES) adds its own DKIM and SPF records. Add them; do not replace the client's existing SPF record, merge into it (one SPF record per name).
