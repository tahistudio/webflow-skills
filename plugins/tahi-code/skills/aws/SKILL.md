---
name: aws
description: "How Tahi Studio works on AWS when a client mandates it or a job needs it: account and environment set-up, AWS CDK as the infrastructure-as-code tool, IAM least privilege and GitHub OIDC deploys, static hosting on S3 and CloudFront with origin access control, Lambda (function URLs versus API Gateway HTTP APIs, Web Functions), SES for form email (sandbox exit, SPF, DKIM, DMARC), Secrets Manager and Parameter Store, CloudWatch logs with retention and alarms, budgets and cost alarms, backups and rollbacks. On AWS nothing is handled by default; this skill scales what we own by risk. Use when the user says 'deploy to AWS', 'the client wants AWS', 'S3 and CloudFront', 'Lambda', 'function URL', 'API Gateway', 'SES', 'out of the SES sandbox', 'IAM role', 'GitHub OIDC', 'Secrets Manager', 'Parameter Store', 'CloudWatch', 'log retention', 'alarms', 'AWS budget', 'cost alert', 'CDK', 'SST', 'infrastructure as code', or when PROJECT.md says hosting: aws or backend: aws-lambda."
---

# AWS — when the client needs it

Read `PROJECT.md` first (`tahi-core:tahi-project`). A custom backend on Lambda is a risk 3 flag by itself, so most AWS jobs with server code are risk 3. A static site on S3 and CloudFront can be risk 1 or 2.

## When to use it (and when not)

- **Use AWS** when the client mandates it or already runs there, for long-running or heavy backend work, or for compliance the client has met on AWS (`tahi-core:stack-picker`).
- **Do not choose AWS** for a marketing site because it is familiar. Cloudflare (`tahi-code:cloudflare`) or Vercel handle SSL, CDN, previews, rollbacks and logs for us; on AWS every one of those is our work and the client's ongoing cost.

## The rule: on AWS, you own everything

`tahi-core:tahi-project` [references/platforms.md] says it plainly: AWS handles almost nothing by default. Logging, log retention, alarms, backups, rollbacks, certificates, cost control and access are all ours to set up, and all scale with risk. Before building, write in `PROJECT.md` who owns the AWS account, who pays, and who gets the alarms.

## Account and environments

- **The client owns the AWS account** (or an account in their AWS Organization). Tahi works through IAM Identity Center users or a role the client grants, never root and never long-lived IAM user keys.
- Root user: MFA on, no access keys, contact details set to the client's shared address.
- **Region:** `ap-southeast-2` (Sydney) by default for NZ and AU clients. Use `ap-southeast-6` (Auckland) when the client needs New Zealand data residency, after checking every service you need is offered there (SES was not, at the time of writing). CloudFront certificates live in `us-east-1` regardless.
- **Environments:**
  - [R1] One account; `staging` and `production` as separate CDK stages with prefixed resource names.
  - [R3] Separate accounts for production and non-production in the client's Organization, so a staging mistake cannot touch production.
- Development and staging deploys are fast and unguarded. Production deploys need an explicit instruction from a person (`tahi-core:launch`).

## Infrastructure as code: AWS CDK

- **Default: AWS CDK v2 in TypeScript**, in an `infra/` folder of the project repo. It is AWS's own tool, released frequently, and needs no third-party service.
- SST (now v4, built on Pulumi) is faster to start for full-stack apps, but its release activity has slowed and it adds a dependency on a small vendor; use it only if the client already does (see the open questions file).
- Nothing is created by hand in the console except the bootstrap (`cdk bootstrap`), the OIDC provider if the client's policy requires it, and the budget. Anything clicked into existence is recorded in `docs/decisions.md`.
- `cdk diff` before every deploy; the diff goes in the PR description for production changes.
- `cdk-nag` (AwsSolutions rules) in the synth step at [R3]; suppressions carry a reason.

## Access: least privilege

- **Deploys from GitHub Actions use OIDC**: an IAM role trusted for `token.actions.githubusercontent.com`, conditioned on this repo and branch (or GitHub environment). No AWS keys in GitHub secrets.
- One role per environment; the production role can only be assumed from `main` or the `production` GitHub environment with required reviewers [R2].
- Lambda execution roles grant exactly the actions and resources the function uses (CDK `grant*` methods, not `*`).
- Details and the trust policy: [references/baseline.md](references/baseline.md).

## Static sites: S3 and CloudFront

Private S3 bucket, CloudFront in front with **origin access control** (OAC, not the legacy origin access identity), ACM certificate in `us-east-1`, a CloudFront Function for directory indexes and redirects, a response headers policy for security headers. Patterns, cache settings, redirects at scale and rollback: [references/static-site.md](references/static-site.md).

## Lambda

| Need | Use |
|---|---|
| A form handler or small public API with throttling and a custom domain | API Gateway HTTP API in front of Lambda |
| A webhook receiver or internal endpoint | Lambda function URL (auth `NONE` plus signature check, or `AWS_IAM`) |
| An endpoint behind the site's own CloudFront domain | Function URL with CloudFront OAC, but POST bodies then need an `x-amz-content-sha256` header from the browser; an HTTP API origin avoids that |
| A full SSR framework server | Consider Lambda Web Functions (new in 2026, runs a normal HTTP server) or a managed host; evaluate on staging first |

- Node.js on the current Lambda LTS runtime, `arm64`, bundled with `NodejsFunction`.
- Timeouts and memory set deliberately; reserved concurrency as a cost and abuse ceiling on public functions [R2].
- Wiring, SES set-up and the form handler: [references/lambda-and-email.md](references/lambda-and-email.md). The form pipeline itself (Turnstile, validation, CRM, failure handling) is `tahi-code:cloudflare` [references/forms.md]; on AWS, SES replaces Resend.

## Secrets

- **Parameter Store `SecureString`** for config secrets that do not rotate (API keys for Turnstile, CRM). **Secrets Manager** when rotation, cross-account access or database credentials are involved.
- Read at cold start and cache in memory (Powertools parameters utility or the Parameters and Secrets Lambda extension); never put secret values in Lambda environment variables in plain text or in CDK code.
- Repo rules for secrets are in repo-hygiene; they apply here too.

## Logging, alarms, cost

- **Every log group has a retention period.** CloudWatch Logs keep data forever by default, and the bill grows quietly. In CDK, create a `logs.LogGroup` with `retention` and pass it as the function's `logGroup` (`logRetention` is deprecated). Retention per environment is agreed with the client and written in `PROJECT.md`.
- **Always set a budget alarm**, on every account, at every risk level, before the first deploy: an AWS Budgets monthly cost budget with alerts on actual and forecast spend, going to Tahi and the client. Turn on Cost Anomaly Detection too.
- Alarms to a person through an SNS topic (email or chat) [R2]: Lambda errors and throttles, API 5xx, CloudFront 5xx rate, SES bounce and complaint rates.
- Baseline, alarm list and dashboards: [references/baseline.md](references/baseline.md).

## Backups and rollback

- S3 buckets holding anything not rebuilt from the repo (uploads, exports): versioning on, lifecycle rule for old versions [R2].
- DynamoDB: point-in-time recovery on [R2]. RDS or Aurora: automated backups with a tested restore [R3]. AWS Backup for a single policy across services [R3].
- Rollback: static sites deploy each release to its own prefix and switch the CloudFront origin path; Lambda code rolls back by redeploying the previous commit through the pipeline, or by aliases and versions at [R3]. Test it once before launch.

## Gotchas

- New SES accounts are in the **sandbox** per region: only verified recipients, low sending limits. Request production access early; approval can take days.
- CloudFront with an S3 REST origin does not serve `index.html` for `/about/`. Add the CloudFront Function or every subpage 403s.
- ACM certificates for CloudFront must be in `us-east-1`; certificates elsewhere are invisible to it.
- CloudFront changes take minutes to deploy; invalidations are not instant either. Do not debug a fix before it has propagated.
- `cdk destroy` keeps retained buckets and log groups (good) and you pay for them (remember them).
- Free-tier and credit offers differ by account age and plan; never promise a client that AWS hosting is free. Check the pricing pages and the budget.

## Production checklist

- [ ] [R1] [aws] Client owns the account; root has MFA and no keys; Tahi access is through Identity Center or a role.
- [ ] [R1] [aws] Budget alarm on actual and forecast spend, to Tahi and the client.
- [ ] [R1] [aws] All infrastructure in CDK; `cdk diff` reviewed for the production deploy.
- [ ] [R1] [aws] Deploys use GitHub OIDC; no long-lived AWS keys anywhere.
- [ ] [R1] [aws] S3 buckets private; CloudFront uses OAC; HTTPS only; certificate in `us-east-1` auto-renewing.
- [ ] [R1] [aws] Every log group has a retention period.
- [ ] [R1] [aws] Security headers through a CloudFront response headers policy.
- [ ] [R1] [aws] [if:forms] SES out of the sandbox; SPF, DKIM and DMARC pass; a real submission arrives.
- [ ] [R1] [aws] Rollback path written in the README and tried once.
- [ ] [R2] [aws] Staging stage mirrors production; production deploy role restricted to `main` or a protected environment.
- [ ] [R2] [aws] Alarms (errors, 5xx, throttles, SES reputation) reach a person through SNS.
- [ ] [R2] [aws] Versioning on data buckets; point-in-time recovery on DynamoDB tables.
- [ ] [R2] [aws] Reserved concurrency or API throttling caps public endpoints.
- [ ] [R3] [aws] Separate production account; `cdk-nag` clean or suppressions justified.
- [ ] [R3] [aws] CloudTrail trail to a retained bucket; GuardDuty on (check the cost with the client).
- [ ] [R3] [aws] Backups restored once into a scratch resource; result logged.
- [ ] [R3] [aws] WAF with rate-based rules in front of public APIs.
- [ ] [R3] [aws] Incident plan names who receives alarms out of hours and how the client is told.
