# Dev QA checklist

Tags decide what applies (see `tahi-core:tahi-project`, references/tiers.md). Untagged items always apply at the production gate. Items the quick-checks script already covers are marked *(script)*.

## Loading and routing

- [ ] Every page in the sitemap returns 200; no unexpected redirects chains. *(script, --full)*
- [ ] Unknown URLs return a real 404 status with a branded page that has navigation. *(script for status)*
- [ ] HTTPS everywhere; HTTP redirects to HTTPS; one canonical host (apex or www, the other redirects). *(script)*
- [ ] No broken internal links; external links that matter checked. *(script, --full)*
- [ ] Console clean on load and after scrolling and using every interactive element.
- [ ] [if:migration] Every URL in the redirect map returns 301 to the right page, tested on production after launch (dashboard `check_qa_redirect_map` when connected).
- [ ] [if:migration] [R2] Top pages by traffic and backlinks spot-checked one by one.

## Forms and integrations

- [ ] [if:forms] Every form submits on production and the submission arrives where it should (inbox, CRM, sheet). One real test per form.
- [ ] [if:forms] Validation messages are clear; required fields marked; success and error states styled and written.
- [ ] [if:forms] Spam protection in place (Turnstile, honeypot or the platform's own).
- [ ] [if:forms] Notification emails go to a person who expects them; sender domain authenticated (SPF, DKIM, DMARC) when we send email.
- [ ] [if:forms] [R2] A failed delivery alerts someone (monitoring on the endpoint, or the CRM's own alert).
- [ ] [if:integrations] Each integration tested end to end on production with production credentials.
- [ ] [if:integrations] [R2] Each integration's failure behaviour known: what the visitor sees, who is told.

## Accessibility

- [ ] Automated scan clean or each finding explained. *(script, --full: axe)*
- [ ] One h1 per page; headings in order. *(script for home page)*
- [ ] Every image has meaningful alt text or is marked decorative.
- [ ] Text, icon and border contrast meets WCAG AA.
- [ ] Everything works with the keyboard alone; focus is visible and in a sensible order; no keyboard traps; menus and modals close with Escape.
- [ ] Form fields have labels; errors are announced and linked to their field.
- [ ] `<html lang>` set. *(script)*
- [ ] `prefers-reduced-motion` honoured per the motion level (`tahi-design:site-animator`).
- [ ] [R2] Full WCAG 2.2 AA pass, including target size and focus not obscured.
- [ ] [R2] Screen-reader spot check (VoiceOver or NVDA) of navigation, one content page and one form.
- [ ] [R2] Zoom to 200% and 400% (reflow) without loss of content.

## SEO

- [ ] Unique title (under about 60 characters) and meta description on every page. *(script for home page)*
- [ ] Open Graph title, description and image (at least 1200 by 630) on every page. *(script for home page)*
- [ ] Canonical tags correct; no page canonicalised to staging.
- [ ] `robots.txt` allows production; `sitemap.xml` lists every public page and nothing private. *(script)*
- [ ] Staging and previews are noindexed. *(script with --staging)*
- [ ] [if:cms] CMS template pages pull SEO fields from the item, not static text.
- [ ] Structured data (JSON-LD) valid where used (Organization, LocalBusiness, Article, FAQ as relevant). Content and keyword choices are `tahi:tahi-seo`.
- [ ] [R2] Search Console verified and the sitemap submitted (at launch).

## Performance

- [ ] Lighthouse mobile performance recorded; top three causes noted if under 80. *(script, --full)*
- [ ] Images sized for their slots, modern formats, lazy below the fold, the first large image eager and prioritised.
- [ ] Fonts subset or limited to the weights used; `font-display` set; preload the critical one.
- [ ] Third-party scripts listed, each justified, loaded async or deferred.
- [ ] [R2] Core Web Vitals pass on mobile (LCP, INP, CLS) against the agreed budget; field data checked after launch when available.
- [ ] [M2] Motion keeps to transform and opacity and does not hurt INP.

## Analytics and consent

- [ ] Analytics installed on production only, firing once per page view; key events (form submit, booking, purchase) tracked.
- [ ] Consent banner where the audience's region requires it (EU and UK visitors, or the client's policy), defaulting to the privacy-preserving choice; analytics respects it.
- [ ] Privacy policy exists and matches what the site actually collects.

## Content and CMS

- [ ] No placeholder text, lorem ipsum, test entries or "TODO" anywhere, including CMS items and alt text.
- [ ] Legal pages present as required (privacy, terms, cookies).
- [ ] Favicon, app icons and social preview image set.
- [ ] [if:cms] Client editor test: a person with the client's role edits, adds and removes the content they own, and the layout holds (long titles, missing images, many and few items).
- [ ] [if:cms] [R2] Content backups in place where the platform does not keep them (see references/platforms.md in `tahi-core:tahi-project`).

## Browsers and devices

- [ ] Latest Chrome, Safari and Firefox on desktop; Safari on iOS; Chrome on Android.
- [ ] Real phone check of the home page, one content page and every form.
- [ ] [C2] Awkward widths between breakpoints (design QA covers the detail).
- [ ] [R2] One older or lower-end device for performance and layout.

## Security

- [ ] No secrets, API keys or tokens in client-side code, the repo or the page source.
- [ ] Admin, CMS and hosting accounts use two-factor authentication and are owned by the client (Tahi has a seat, not the keys).
- [ ] [R2] Security headers: HSTS, X-Content-Type-Options, Referrer-Policy. *(script)*
- [ ] [R2] Dependency audit clean of high-severity issues (`[code]`: `pnpm audit` or equivalent).
- [ ] [R3] Content-Security-Policy, frame-ancestors and Permissions-Policy set and tested. *(script)*
- [ ] [R3] [if:auth] Authentication: rate limiting, secure session cookies (HttpOnly, Secure, SameSite), password reset flow reviewed, no account enumeration.
- [ ] [R3] Authorisation checked on every endpoint server-side: a user cannot read or change another user's data by changing an ID.
- [ ] [R3] Input validated server-side; output encoded; file uploads restricted by type and size and stored outside the web root.
- [ ] [R3] [if:payments] Card data handled only by the payment provider's hosted fields or checkout; webhooks verified by signature.
- [ ] [R3] Error messages do not leak stack traces or internals; errors are logged with alerts to a person.
- [ ] [R3] Backups tested by actually restoring one.
- [ ] [R3] [if:personal-data] Personal data inventory: what is stored, where, for how long, who can access it; deletion on request is possible.
