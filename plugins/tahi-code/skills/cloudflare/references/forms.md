# The Tahi form pipeline (any code stack)

One pipeline for contact, enquiry and booking-request forms on Astro, Next.js or a plain Worker. It is kept here because Turnstile is a Cloudflare product; it works the same on Vercel or AWS. On AWS, send with SES instead of Resend (`tahi-code:aws`). Copy and labels for forms are `tahi:tahi-cro` and `tahi:tahi-copywriter`; form accessibility checks are in `tahi-core:dev-qa`.

## Contents

1. The flow
2. Turnstile
3. Validation
4. Sending with Resend
5. CRM hand-off
6. Failure handling by risk
7. Dev and preview
8. Stack wiring

## 1. The flow

```
browser form (+ Turnstile widget)
  -> server handler (Astro Action, Next.js Server Action or Route Handler, Worker route)
     1. verify Turnstile token with siteverify      -> reject if not success
     2. validate fields with a schema               -> return field errors
     3. send the notification email (Resend)        -> to the client's inbox, replyTo = submitter
     4. hand off to the CRM (if the profile lists one)
     5. return success; the page shows a clear confirmation
```

- **Do not store submissions yourself by default.** Email plus the CRM is enough. Storing personal data in something we build or control (D1, KV, a spreadsheet) makes the project risk 3; flag it first (`tahi-core:tahi-project`, stop rule 4).
- The handler never trusts the browser: Turnstile and validation both run server-side even when the client also validates.

## 2. Turnstile

- One widget per site, created in the client's Cloudflare account, with the production and staging hostnames listed. Managed mode by default.
- **Verify every token server-side** by POSTing `secret` and `response` (and optionally `remoteip`) to `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Reject unless `success` is true. At [R2] also check `hostname` matches the site.
- Tokens are **valid for 300 seconds and single-use**. A replayed token fails with `timeout-or-duplicate`. If the form can sit open longer (long enquiry forms), reset the widget on expiry or before submit.
- With client-side navigation (Astro `<ClientRouter />`, Next.js), render the widget explicitly when the form mounts; the implicit render only runs on full page loads.
- Use Cloudflare's published test site keys and secret keys on local and preview builds (always-pass and always-fail pairs are listed in the Turnstile docs), so previews do not need real hostnames.

```ts
export async function verifyTurnstile(token: string, secret: string, ip?: string) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success: boolean; hostname?: string; "error-codes"?: string[] };
  return data;
}
```

## 3. Validation

- One schema per form (Zod; Astro re-exports it as `astro/zod`). Required fields, lengths, email format, an allow-list for select values.
- Return field-level errors the form can show next to each input, and keep what the person typed.
- Strip or escape anything that goes into an HTML email.
- A hidden honeypot field is a cheap extra filter; Turnstile is the real one.

## 4. Sending with Resend

Default sender for code sites (see the open questions file).

- Verify the client's sending domain in Resend (a subdomain such as `mail.example.co.nz` keeps it separate from their main mailbox reputation). Add Resend's DKIM and SPF records; make sure the domain has a DMARC record (`p=none` to start, tighten later with the client's IT).
- Send from an address on that domain (`website@mail.example.co.nz`), **to** the client's chosen inbox, with `replyTo` set to the submitter so a reply goes to the person, not the robot.
- Pass an `idempotencyKey` (for example a hash of the Turnstile token) so a retried request does not send twice.
- The API key is a secret per environment. Use a separate restricted key for staging and previews, sending only to Tahi test addresses.

```ts
import { Resend } from "resend";
const resend = new Resend(env.RESEND_API_KEY);
const { error } = await resend.emails.send(
  { from: "Website <website@mail.example.co.nz>", to: [env.FORM_TO], replyTo: data.email, subject: `Website enquiry from ${data.name}`, text },
  { idempotencyKey },
);
if (error) throw new Error(error.message);
```

## 5. CRM hand-off

- Send to the CRM's own submission or contact API (HubSpot, Pipedrive, Mailchimp, ...) from the same handler, with the API token as a secret.
- The person should not wait on the CRM. At [R1] a direct call after the email is fine. At [R2] put the hand-off on a queue (Cloudflare Queues, or SQS on AWS) or a retried background task (`ctx.waitUntil` / Next.js `after()`), with retries and a dead-letter destination.
- Consent: only add someone to a marketing list when the form has an explicit, unticked opt-in. Record the consent wording in the CRM field.

## 6. Failure handling by risk

- [R1] If sending fails, the person sees an error that offers another way to reach the client (email address or phone), never a fake success. The error is logged.
- [R2] A failure alerts a person (Workers Logs alert, a Slack or email webhook from the handler, or the monitoring tool in `tahi-core:dev-qa`). A weekly or launch-time test submission proves the whole path end to end.
- [R2] The CRM path has retries and a dead-letter queue someone checks.
- [R3] Rate limiting on the endpoint, logging of rejected submissions without storing their personal data, and the privacy policy says where submissions go.

## 7. Dev and preview

- Turnstile test keys; Resend test key and test recipient addresses; CRM sandbox or a test pipeline.
- Never point a preview at the client's real inbox or CRM unless the profile says so.

## 8. Stack wiring

- **Astro:** an Action with `accept: "form"` in `src/actions/index.ts`; secrets through `astro:env/server`. A plain HTML form posting to the action needs the page rendered on demand (`export const prerender = false`); calling the action from a client script works on a prerendered page. See `tahi-code:astro`.
- **Next.js:** a Server Action (`"use server"`) called from the form, or a Route Handler for non-React clients. See `tahi-code:nextjs`.
- **Plain Worker:** a `POST /api/contact` route in the Worker; static pages post to it.
