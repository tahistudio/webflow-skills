# AWS baseline: account, access, logging, alarms, cost

What every AWS project gets before the first application resource, scaled by risk. Prices, free-tier terms and quotas change; check the pricing pages and the account's Service Quotas rather than trusting numbers in notes.

## Contents

1. Account set-up (once per client)
2. GitHub OIDC deploy role
3. CDK project layout
4. Budgets and cost
5. Logging and retention
6. Alarms
7. Audit and threat detection [R3]

## 1. Account set-up (once per client)

1. Client creates or nominates the account (or an Organization member account). Billing contact is the client.
2. Root: MFA on, no access keys, alternate contacts (billing, operations, security) set to the client's shared addresses plus Tahi for operations if we support it.
3. IAM Identity Center for people: a Tahi permission set scoped to what the job needs (PowerUser for build, ReadOnly after handover if on retainer). Remove access when the engagement ends.
4. Budget (section 4) before any deploy.
5. `cdk bootstrap aws://<account>/<region>` per account and region used (plus `us-east-1` if CloudFront certificates are created by CDK).
6. Record in `PROJECT.md`: account ID, owner, regions, who receives alarms, log retention, backup policy.

## 2. GitHub OIDC deploy role

Create the GitHub OIDC identity provider once per account, then one deploy role per environment. Trust policy for production:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
        "StringLike": { "token.actions.githubusercontent.com:sub": "repo:tahistudio/client-site:environment:production" }
      }
    }
  ]
}
```

- Scope `sub` to the repo and a GitHub **environment** (`production` with required reviewers at [R2]) or a branch (`repo:org/repo:ref:refs/heads/main`). Never `repo:org/*`.
- The role's permissions: assume the CDK bootstrap roles (`cdk-*-deploy-role`, `cdk-*-file-publishing-role`, ...) and nothing else. CDK does the rest through those.
- In the workflow: `aws-actions/configure-aws-credentials` with `role-to-assume`, and `permissions: id-token: write` on the job.

## 3. CDK project layout

```
infra/
  bin/app.ts              instantiates stages: Staging, Production
  lib/site-stack.ts       S3, CloudFront, certificate, DNS records
  lib/api-stack.ts        Lambda, HTTP API, SES identity, alarms
  lib/baseline-stack.ts   SNS alarm topic, log groups, budget (if not in console)
  cdk.json
```

- One `Stage` class instantiated per environment with its own props (domain, retention, alarm email). Staging and production differ only in props.
- Pin `aws-cdk-lib` and the `aws-cdk` CLI versions in `package.json`; upgrade both together on a branch.
- Removal policies: `RETAIN` for anything holding data (buckets with uploads, tables, log groups), `DESTROY` with `autoDeleteObjects` only for buckets rebuilt from the repo on non-production stages.
- Tags on every stack: `client`, `project`, `environment`, `owner: tahi`. Cost reports filter by them (activate the tags as cost allocation tags).

## 4. Budgets and cost

Always, at every risk level, before the first deploy:

- An AWS Budgets **monthly cost budget** sized to the expected bill with headroom, agreed with the client.
- Alerts at a share of **actual** spend (for example 50%, 80%, 100%) and on **forecast** spend exceeding 100%, to Tahi and the client.
- **Cost Anomaly Detection** monitor for the account with an email or SNS subscription.
- Review the bill at launch plus one month and at each retainer check-in. Surprises are usually log storage, NAT gateways, CloudWatch metrics, or a forgotten resource on a destroyed stack.

Avoid by default: NAT gateways (Lambda outside a VPC does not need one), provisioned concurrency, always-on databases for low-traffic sites.

## 5. Logging and retention

- Lambda: create the log group explicitly and pass it to the function.

```ts
const logGroup = new logs.LogGroup(this, "ContactFnLogs", {
  retention: props.logRetention, // e.g. logs.RetentionDays.ONE_MONTH on staging, longer in production
  removalPolicy: RemovalPolicy.RETAIN,
});
new lambdaNode.NodejsFunction(this, "ContactFn", { entry: "src/contact.ts", logGroup, architecture: lambda.Architecture.ARM_64 });
```

- API Gateway access logs and CloudFront standard logs only at [R2] and above, each with a retention or lifecycle rule.
- Structured JSON logs (Powertools Logger or `console.log(JSON.stringify(...))`) with a request ID; never log form contents, tokens or personal data.
- Retention per environment is a client decision at [R3] (privacy and audit); record it in `PROJECT.md`.

## 6. Alarms [R2]

One SNS topic per environment, subscribed by the people in `PROJECT.md`. Minimum set:

| Alarm | Metric |
|---|---|
| Function errors | Lambda `Errors` above 0 over 5 minutes, per public function |
| Throttles | Lambda `Throttles` above 0 |
| API errors | HTTP API `5xx` above a small threshold |
| Site errors | CloudFront `5xxErrorRate` above a few percent |
| Email reputation [if:forms] | SES `Reputation.BounceRate` and `Reputation.ComplaintRate` above SES's warning levels |
| Form failures [if:forms] | A custom metric the handler emits when sending fails |

Test each alarm once (force an error on staging) and log that it reached a person.

## 7. Audit and threat detection [R3]

- A CloudTrail trail (management events) to a dedicated, retained, encrypted bucket. Event history in the console is on by default but short-lived.
- GuardDuty on; findings to the alarm topic. Agree the cost with the client.
- IAM Access Analyzer for unused access and public resources.
- Security Hub only if the client already uses it.
