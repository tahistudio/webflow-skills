# Lambda endpoints and SES email

The AWS version of the Tahi form pipeline and small APIs. The pipeline itself (Turnstile verification, validation, CRM hand-off, failure handling by risk) is in `tahi-code:cloudflare` [references/forms.md]; this file covers the AWS pieces.

## Contents

1. Choosing the front door
2. A form handler on Lambda
3. SES set-up
4. Sending from Lambda
5. Bounces and complaints
6. Webhook receivers

## 1. Choosing the front door

| Option | Good for | Watch out for |
|---|---|---|
| **API Gateway HTTP API** | Public form handlers and small APIs; custom domain, CORS, throttling, access logs | One more resource; behind CloudFront on `/api/*` it shares the site's domain and avoids CORS |
| **Lambda function URL, auth NONE** | Webhooks (Sanity, Stripe) that verify their own signatures | No throttling except reserved concurrency; public URL on `*.lambda-url.*.on.aws` |
| **Function URL, auth AWS_IAM, behind CloudFront OAC** | GET endpoints on the site's own domain | POST and PUT need the browser to send an `x-amz-content-sha256` header with the body's SHA-256; Lambda does not accept unsigned payloads |
| **Lambda Web Functions** | Running an existing HTTP server or framework without an adapter | New in 2026; check CDK support, regional availability and limits on staging before relying on it |

Default for forms: HTTP API behind the site's CloudFront distribution on `/api/*`.

## 2. A form handler on Lambda

- `NodejsFunction`, `arm64`, the current Node.js LTS runtime, a short timeout (a few seconds is plenty for verify-and-send), memory sized by measuring.
- Secrets (Turnstile secret, CRM token) from Parameter Store `SecureString`, read once per cold start and cached. Grant `ssm:GetParameter` on those parameter ARNs only, plus `kms:Decrypt` if a customer-managed key is used.
- Permissions: `ses:SendEmail` on the one identity and configuration set; nothing else.
- [R2] Reserved concurrency as a ceiling; HTTP API route throttling.
- [R2] A custom metric (`FormSendFailed`) on failure, alarmed (baseline.md).
- [R3] WAF rate-based rule on the CloudFront distribution or API.

## 3. SES set-up

SES is regional, and so is its sandbox. Set it up in the Region the Lambda sends from (Sydney by default; at the time of writing SES was not offered in the Auckland Region, so a NZ-resident stack still sends from Sydney or another SES Region).

1. **Verify a domain identity** for a sending subdomain (`mail.example.co.nz`) with **Easy DKIM**. Add the three DKIM CNAME records.
2. **Custom MAIL FROM domain** (`bounce.mail.example.co.nz`) with its MX and SPF TXT records, so SPF aligns too. DKIM alone satisfies DMARC; MAIL FROM is the belt with the braces.
3. **DMARC record** on the organisational domain if there is none: start with `p=none` and a reporting address the client controls; tighten with the client's IT. Do not set strict SPF alignment (`aspf=s`), which breaks SES alignment.
4. **Request production access** (out of the sandbox) for that Region as soon as the domain is verified. In the sandbox you can only send to verified addresses, at low volume. Describe the use case honestly: transactional notifications from a website form to the business's own inbox.
5. A **configuration set** with event publishing for bounces, complaints and rejects.

Merge, never replace, the client's existing SPF record if SES ever sends from the main domain.

## 4. Sending from Lambda

```ts
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
const ses = new SESv2Client({});

await ses.send(new SendEmailCommand({
  FromEmailAddress: "Website <website@mail.example.co.nz>",
  Destination: { ToAddresses: [formTo] },
  ReplyToAddresses: [data.email],
  ConfigurationSetName: "site-forms",
  Content: { Simple: { Subject: { Data: `Website enquiry from ${data.name}` }, Body: { Text: { Data: text } } } },
}));
```

- Plain text (or escaped HTML) built from validated fields only.
- `ReplyToAddresses` is the submitter; `From` is always our verified domain, never the submitter's address.

## 5. Bounces and complaints

- Publish configuration set events to SNS (or EventBridge) and alarm on rising bounce or complaint rates; SES can pause sending for an account with poor reputation.
- A form that only sends to the client's own inbox rarely bounces. If it starts to, the client's inbox address changed: fix the parameter, not SES.
- Keep the account-level suppression list on.

## 6. Webhook receivers

- Function URL (auth NONE) or an HTTP API route.
- Verify the signature first (Sanity: `isValidSignature` from `@sanity/webhook`; Stripe: their SDK), reject anything else with 401, and keep the handler idempotent: webhooks retry.
- Do slow work asynchronously (SQS queue to a second function) and return quickly.
