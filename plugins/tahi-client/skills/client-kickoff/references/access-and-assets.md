# Access and assets checklist

Request everything that applies in one list, each item with an owner on the client side and a "needed by" date. Tags follow `tahi-core:tahi-project` › references/tiers.md.

How credentials travel is set in SKILL.md section 4: **invitations first, the client's own password manager share second, never pasted anywhere.** Record in `PROJECT.md` where each account lives and who granted access, never a password.

Ownership principle for every account below: **the client owns the account and pays for it; Tahi is invited as a user.** If an account does not exist yet, the client creates it in their name (Tahi can sit with them on a call to do it) and invites Tahi. The handover confirms this; see `tahi-client:client-handover`.

## Domain and DNS

- [ ] Registrar: which company, whose account, renewal date. Tahi invited as a user, or a named person on the client side who can change records on launch day.
- [ ] DNS host, if different from the registrar (often Cloudflare). Tahi invited.
- [ ] Current DNS records exported or screenshotted before anything changes, especially email (MX, SPF, DKIM, DMARC). Launch must not break their email.
- [ ] Who on the client side must be reachable on launch day for DNS.

## Existing site and CMS [if:migration]

- [ ] Admin or editor access to the current site and CMS (WordPress, Squarespace, Wix, Webflow, other).
- [ ] An export of content: pages, posts, products, media.
- [ ] Forms on the current site and where their submissions go.
- [ ] Redirects, scripts and tracking already in place.
- [ ] When the old hosting contract ends, so the old site is not switched off before launch.

## Analytics and search

- [ ] Google Analytics 4 property: Tahi added as Editor. If none exists, the client creates it under their own Google account.
- [ ] Google Search Console: Tahi added as a Full user on the domain property.
- [ ] Google Tag Manager, if used: Tahi added as a user.
- [ ] Any other tracking (Meta pixel, LinkedIn, Hotjar), and who owns each account.
- [ ] Consent requirements for the audience's region.

## Brand and assets

- [ ] Brand guidelines.
- [ ] Logo files as SVG, plus any marks and favicons.
- [ ] Fonts: names, files or a link to the foundry, and **the licence**. Confirm it covers web use on this domain and the expected traffic. Licences are bought in the client's name.
- [ ] Photography, illustration and video, with confirmation the client holds the rights. Stock images are licensed in the client's name.
- [ ] Icons, patterns, any existing Figma or design files.

## Content

- [ ] Content owner per page or section, and the date each is due.
- [ ] Who writes copy (client, Tahi, or a copywriter they hire). If Tahi, it is in scope and `tahi:tahi-copywriter` may help.
- [ ] Legal pages: privacy policy, terms, cookie policy. The client supplies the wording.
- [ ] [if:cms] Sample of real content for every collection, including the longest realistic item.
- [ ] [if:i18n] Translations: who supplies them and when.

## Integrations [if:integrations]

- [ ] CRM (HubSpot, Salesforce, Pipedrive, other): Tahi invited, or a scoped API key shared through the client's password manager.
- [ ] Newsletter and email marketing tool.
- [ ] Booking, scheduling or chat tools.
- [ ] [if:payments] Payment provider: Tahi invited to the dashboard with the least role that lets us set up the integration. Live keys are entered by the client or into the hosting platform's secrets store, never shared in a message.
- [ ] Who receives form submissions and alerts, by name and email.

## Code stack accounts [code]

The client owns these accounts and the billing; Tahi is a member.

- [ ] Hosting (Cloudflare, Vercel, Netlify, AWS): client account, Tahi invited.
- [ ] [sanity] Sanity project: created under the client's organisation or transferred to it at handover; Tahi as Administrator during the build.
- [ ] Domain email for transactional sending, if the site sends email.
- [ ] Repository: where it lives is a house decision recorded in `tahi-client:client-handover`.

## Webflow [webflow]

- [ ] Which Webflow workspace the site will live in, and who pays for the site plan. The client's card is on the site plan.
- [ ] Tahi's role on the workspace or site, and the client's editors' roles (see `tahi-client:client-handover` › references/editor-guide-webflow.md).
