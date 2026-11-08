# Static sites on S3 and CloudFront

For a built Astro (or static Next.js export) site on AWS. If the client does not require AWS, `tahi-code:cloudflare` does all of this for us.

## Contents

1. The shape
2. CDK sketch
3. Directory indexes and redirects
4. Security headers
5. Caching and invalidation
6. Releases and rollback
7. Previews and staging

## 1. The shape

```
Route 53 (or client DNS) -> CloudFront distribution (ACM cert in us-east-1, HTTP to HTTPS)
  default behaviour  -> private S3 bucket via origin access control (OAC)
  /api/*             -> API Gateway HTTP API -> Lambda   (if the site has forms)
  viewer request     -> CloudFront Function: www redirect, directory index, redirect map
  response headers   -> response headers policy (security headers)
```

- The bucket is private, with Block Public Access on. Never use the S3 website endpoint; it cannot use OAC and is HTTP-only to the origin.
- OAC, not the legacy origin access identity (OAI): AWS recommends OAC and it supports every Region and SSE-KMS.

## 2. CDK sketch

```ts
const bucket = new s3.Bucket(this, "SiteBucket", {
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  enforceSSL: true,
  versioned: props.stage === "production",
  removalPolicy: RemovalPolicy.RETAIN,
});

const viewerRequest = new cloudfront.Function(this, "ViewerRequest", {
  code: cloudfront.FunctionCode.fromFile({ filePath: "functions/viewer-request.js" }),
  runtime: cloudfront.FunctionRuntime.JS_2_0,
});

const distribution = new cloudfront.Distribution(this, "Site", {
  defaultBehavior: {
    origin: origins.S3BucketOrigin.withOriginAccessControl(bucket, { originPath: `/releases/${props.releaseId}` }),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
    functionAssociations: [{ function: viewerRequest, eventType: cloudfront.FunctionEventType.VIEWER_REQUEST }],
  },
  domainNames: [props.domain],
  certificate: props.certificate, // created in us-east-1
  errorResponses: [{ httpStatus: 404, responseHttpStatus: 404, responsePagePath: "/404.html" }],
});
```

Check construct names against the installed `aws-cdk-lib` version; the CloudFront L2 constructs have changed more than most.

## 3. Directory indexes and redirects

An S3 REST origin has no notion of `index.html` for `/about/`. A CloudFront Function on viewer request fixes that and handles redirects in the same pass:

```js
// functions/viewer-request.js (cloudfront-js-2.0)
const REDIRECTS = { "/old-services": "/services/", "/contact-us": "/contact/" };

function handler(event) {
  const req = event.request;
  const host = req.headers.host && req.headers.host.value;
  if (host && host.startsWith("example.co.nz")) {
    return { statusCode: 301, statusDescription: "Moved Permanently", headers: { location: { value: `https://www.example.co.nz${req.uri}` } } };
  }
  const target = REDIRECTS[req.uri];
  if (target) {
    return { statusCode: 301, statusDescription: "Moved Permanently", headers: { location: { value: target } } };
  }
  if (req.uri.endsWith("/")) req.uri += "index.html";
  else if (!req.uri.includes(".")) req.uri += "/index.html";
  return req;
}
```

- Functions have a small code size limit. For more than a few dozen redirects, keep the map in **CloudFront KeyValueStore** and look it up from the function; the map then updates without redeploying code.
- Generate the map from the repo's `docs/redirects.csv` at build time, so there is one source of truth.
- Query strings: decide whether to preserve them on redirects and test with a tracking parameter.

## 4. Security headers

- The managed `SECURITY_HEADERS` response headers policy covers HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `X-XSS-Protection`. Create a custom policy when you need `Permissions-Policy` or a Content Security Policy [R2].
- Non-production distributions add `X-Robots-Tag: noindex` through their own response headers policy.

## 5. Caching and invalidation

- Upload hashed assets (`/_astro/*`) with `Cache-Control: public, max-age=31536000, immutable`; HTML with `public, max-age=0, must-revalidate`.
- Use the managed `CachingOptimized` cache policy for the S3 behaviour; do not forward cookies or query strings to S3.
- With the release-prefix pattern (section 6), switching `originPath` changes what CloudFront fetches, but cached HTML stays until it expires or is invalidated. Invalidate `/*` after a release (one invalidation path, regardless of how many objects).

## 6. Releases and rollback

- Each build uploads to `s3://bucket/releases/<git-sha>/`. The deploy then updates the distribution's origin path to that prefix and invalidates.
- **Rollback** is the same deploy with the previous SHA: no rebuild, live in minutes. Keep the last few releases; a lifecycle rule removes older prefixes.
- Record the live release SHA in `docs/log.md` on every production deploy.

## 7. Previews and staging

- AWS has no built-in per-branch previews. Options, cheapest first: preview builds on Cloudflare or Vercel (if the client allows non-production elsewhere), a single staging distribution that `staging` deploys to, or per-PR prefixes on the staging bucket with a path-based rewrite.
- Default: one staging distribution on `staging.example.co.nz`, `noindex`, deployed on every push to the `staging` branch without ceremony. Production deploys only on explicit instruction.
