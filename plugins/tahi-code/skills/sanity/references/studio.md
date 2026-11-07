# Studio for editors

The Studio is what the client uses every week. Shape it around their tasks. API names below are from Sanity Studio v6; check the Studio docs when an option does not exist in an older project.

## Contents

1. sanity.config.ts
2. Structure
3. Singletons
4. Document actions and badges
5. Presentation tool
6. Roles and tokens
7. Editor-proofing checks

## 1. sanity.config.ts

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { resolve } from "./presentation/resolve";

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  name: "default",
  title: "Client Name",
  projectId: "abc123",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: { initial: process.env.SANITY_STUDIO_PREVIEW_URL, previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    ...(isDev ? [visionTool()] : []),
  ],
  schema: { types: schemaTypes },
  document: {
    singletons: ["siteSettings", "navigation", "footer", "homePage"],
  },
});
```

- Studio environment variables must start with `SANITY_STUDIO_` to reach the browser build.
- Separate Studio workspaces for `production` and `staging` datasets at [R2], with the staging one clearly titled ("Staging, not live") so nobody edits the wrong one.

## 2. Structure

```ts
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().singleton("homePage"),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("post").title("Blog posts"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("person").title("Team"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.listItem().singleton("navigation"),
      S.listItem().singleton("footer"),
      S.listItem().singleton("siteSettings"),
    ]);
```

- List items in the order editors think about them, with the words they use ("Team", not "person").
- Leave out internal types (redirects, legacy types) or put them under a "Developer" item hidden from editor roles.
- `S.documentTypeListItems()` skips registered singletons automatically, if you use it.

## 3. Singletons

- Register singletons in `document.singletons` (config above). The Studio then hides them from create menus, removes duplicate, and badges them.
- Also remove the `delete` action for singletons the site cannot render without:

```ts
document: {
  singletons: [...],
  actions: (prev, context) => (context.singleton ? prev.filter((a) => a.action !== "delete") : prev),
},
```

## 4. Document actions and badges

- Keep the default publish flow. Do not add custom "publish to live" actions; publishing already triggers the rebuild or revalidation.
- Scheduling: scheduled drafts on plans that support them; Content Releases (multi-document scheduling) are Enterprise. Check the plan before promising scheduling.
- A custom badge ("Not on the site yet") for document types the front end does not render yet, so editors are not confused.

## 5. Presentation tool

- `resolve` defines `locations` per document type (which URLs show this document) and `mainDocuments` (which document a URL is about), so opening a page in Presentation selects the right document.
- `previewUrl.initial` points at the preview or staging front end, set per Studio deployment with an environment variable. Never at production for draft previews.
- The front end must be in the project's CORS origins with credentials allowed.

## 6. Roles and tokens

| Who | Role | Why |
|---|---|---|
| Client editors | Editor | Edit and publish content; no project settings |
| Occasional or external writers | Contributor (where the plan has it) | Drafts only; an Editor publishes |
| Client decision-maker who only reviews | Viewer | Read only |
| Tahi developers | Developer or Administrator | Schema, datasets, tokens, webhooks |

- The Free plan has only Administrator and Viewer. A client editing on Free would need Administrator, which can delete datasets and tokens. Use a plan with Editor for any client-edited site (check the plan and its price with the client at kickoff).
- Custom roles (for example, edit only blog posts) are Enterprise.
- Tokens: `frontend-read` (Viewer), `ci-export` (enough to export drafts and assets), `webhook-*` secrets. Named after their use, one per purpose, stored in the host's secret store and the password manager.
- At handover and every retainer check-in: remove people who left, rotate tokens of people who left Tahi.

## 7. Editor-proofing checks

Run these with a test user holding the client's role, at [R2] as part of the client editor test in `tahi-core:dev-qa`:

- Create a page using every block type with the longest realistic content. Nothing overflows; long words wrap.
- Leave optional fields empty. Sections still render (no empty boxes, no "undefined").
- Try to publish with required fields empty. Validation stops it with a message the editor understands.
- Replace an image with a portrait one. Hotspot keeps the subject in frame at every breakpoint.
- Rename a page's slug. The editor sees the warning; Tahi adds the redirect.
