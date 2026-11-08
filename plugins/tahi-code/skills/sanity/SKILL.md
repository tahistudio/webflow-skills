---
name: sanity
description: "How Tahi Studio uses Sanity as the headless CMS for Astro and Next.js sites: content modelling so clients cannot break the design (structured fields, references, validation, descriptions, defaults, page-builder blocks mapped 1:1 to components), Studio structure and desk customisation for editors, singletons, GROQ patterns, TypeGen, Visual Editing and the Presentation tool, Portable Text, images and hotspots, webhooks that trigger rebuilds or revalidation, datasets and environments, migrations, content backups (scheduled dataset export), and roles for client editors. Use when the user says 'set up Sanity', 'content model', 'schema', 'add a field', 'page builder', 'blocks', 'Studio', 'desk structure', 'singleton', 'GROQ', 'query', 'TypeGen', 'Visual Editing', 'Presentation', 'Portable Text', 'rich text', 'hotspot', 'webhook', 'rebuild on publish', 'staging dataset', 'migration', 'back up Sanity', 'export dataset', 'client editor role', or when PROJECT.md says cms: sanity."
---

# Sanity — headless CMS

Read `PROJECT.md` first (`tahi-core:tahi-project`). A client-edited CMS is a risk 2 flag by itself, so most Sanity projects start at risk 2. The front-end wiring lives in `tahi-code:astro` (references/sanity-astro.md) and `tahi-code:nextjs` (references/sanity-next.md); this skill is the content side.

## When to use it

Per `tahi-core:stack-picker`: a code build with client editors, structured content reused across pages, previews or several editors, or content that must outlive the front end. Not for a site only Tahi edits (Markdown in the repo is simpler) or a Webflow build (Webflow CMS).

## The one rule: clients cannot break the design

Every modelling choice serves this. The client edits content; the design system decides how it looks.

- **Structured fields over rich-text blobs.** A testimonial is `quote`, `person`, `role`, `company`, `photo`, not a paragraph of formatted text. Rich text is only for body copy, with a restricted toolbar.
- **Page-builder blocks map 1:1 to section components.** One block type, one component (`hero` to `Hero.astro` or `Hero.tsx`). Same names on both sides. Adding a block means adding both.
- **Options are a short closed list.** A block offers a `variant` (radio: "Image left", "Image right") or a `theme` from the design's themes. Never a colour picker, free spacing, font size or custom CSS field.
- **References for anything reused:** people, services, testimonials, CTAs, locations. Edit once, update everywhere.
- **Validation and descriptions on every field.** Required where the design needs it, length limits where the layout breaks, a description that says where the field appears and what good looks like.
- **Sensible defaults** with `initialValue`, so a new block looks right before anyone touches it.

Schema patterns, a block example, the rich-text config and the validation rules are in [references/content-modelling.md](references/content-modelling.md).

## Project setup

- Studio in a `studio/` package in the same repo (pnpm workspace), created with `pnpm create sanity@latest --template clean --typescript --output-path studio`. Current Studio major is v6 at the time of writing.
- Deploy the Studio with `sanity deploy` (hosted at `<name>.sanity.studio`), from CI on merge to `main`. Embedding it in the site is the exception (see the front-end skill).
- Use `defineType`, `defineField` and `defineArrayMember` everywhere so schemas are typed.
- Pin `apiVersion` in every client to a date and move it deliberately. From `2025-02-19` the default perspective is `published`, so queries do not return drafts unless you ask.

## Studio for editors

The Studio is the client's product. Structure it around their jobs, not our schema.

- Custom structure with `structureTool`: top-level items in the order editors think (Pages, Blog, Team, Settings), singletons opened directly, internal helper types hidden.
- **Singletons** (site settings, navigation, footer, home page) have a fixed document ID, no "create new" option and no delete or duplicate action.
- Every document type has an icon and a `preview` that reads well in lists (title, subtitle, thumbnail).
- Group long documents with field `groups` (Content, SEO, Settings) so editors see the content tab first.
- Vision (the GROQ playground) only in development builds of the Studio.
- Structure code, singleton set-up, the Presentation tool and roles: [references/studio.md](references/studio.md).

## Queries and types

- All GROQ in one module per front end, wrapped in `defineQuery` from `groq` (or `next-sanity`).
- Project only the fields each template renders; expand references in the query with `->`; resolve internal links to slugs in the query, not in components.
- **TypeGen:** `sanity schema extract` then `sanity typegen generate`, configured in `sanity-typegen.json` (or `typegen` in `sanity.cli.ts`) to scan the front end's query files and write `sanity.types.ts`. Run it in CI and fail when the committed types are stale.
- Common GROQ patterns (slugs, coalesce fallbacks, conditional projections for blocks, ordering) are in [references/content-modelling.md](references/content-modelling.md).

## Images

- Image fields set `options: { hotspot: true }` so editors choose the focal point and crop; the front end must pass hotspot and crop through the image URL builder.
- Every image field has an `alt` string field, required unless a `decorative` toggle is on.
- Upload guidance in the field description (minimum width, aspect ratio, no text baked into images).

## Previews and Visual Editing

- Presentation tool (`sanity/presentation`) with document locations so editors open a document and see the page. Wiring per framework is in the front-end skill.
- Visual Editing needs a server-rendered preview environment and a Viewer token. Worth it at [C2] or [P:standard] when the client edits often; otherwise preview on staging after publish.

## Environments and datasets

- `production` dataset for the live site. A `staging` dataset at [R2] when schema changes or migrations need rehearsing; previews and staging read it.
- Refresh staging from production with `sanity datasets export production prod.tar.gz` then `sanity datasets import prod.tar.gz --dataset staging --replace` (works on every plan; counts against API usage). Cloud Clone (`sanity datasets copy`) is Enterprise-only.
- Schema changes are backward compatible first: add the new field, migrate content, then remove the old field in a later release.
- Details, webhooks, migrations and backups: [references/operations.md](references/operations.md).

## Rebuilds and revalidation

- **Static Astro:** a Sanity document webhook calls the host's deploy hook on publish (drafts off).
- **Next.js:** `next-sanity`'s Live Content API (`defineLive`, `<SanityLive />`) revalidates on publish; or a signed webhook calling `revalidateTag`.
- Webhooks send one request at a time per webhook. Filter them to the document types the site renders.

## Backups: GitHub does not back up Sanity content

The repo holds the schema, not the content. Sanity keeps document history, but dataset-level backups are a paid feature on some Enterprise plans (check the plan). So:

- [R2] A scheduled `sanity datasets export` (with drafts and assets) to storage outside Sanity, at least weekly, kept for an agreed period. The GitHub Action is in [references/operations.md](references/operations.md).
- [R2] Record "Content: Sanity, exported weekly to ..." under "Where data lives" in `PROJECT.md`.
- [R3] Test a restore: import the latest export into a scratch dataset and load the site against it.
- Before every migration: a fresh export, whatever the risk level.

## Roles for client editors

- Plan check first: the Free plan only has Administrator and Viewer roles, so a client editor would have to be an Administrator (able to delete datasets, rotate tokens and edit webhooks). For any client-edited site, use a plan with the Editor role (check the plan).
- Client editors: **Editor** (edit and publish). Junior or external writers: **Contributor** (drafts only) where the plan has it. Tahi developers: Developer or Administrator. Custom roles are Enterprise.
- API tokens: one per purpose (front-end read, CI export, webhook), least permission (Viewer for reads), named after their use, stored as secrets.
- Remove people who leave. Review members at each handover and retainer check-in.

## What Sanity handles

Hosting the content and the Studio, the image CDN, document history per document, global API CDN. Not handled: dataset backups on most plans, CORS origins, webhook targets, roles, and anything the front end does with the content.

## Production checklist

- [ ] [R1] [sanity] Every field has a description; required fields and length limits match the design.
- [ ] [R1] [sanity] Blocks map 1:1 to section components; no free colour, spacing or font fields.
- [ ] [R1] [sanity] Rich text restricted (no `h1`, limited styles and marks); links resolve to routes.
- [ ] [R1] [sanity] Image fields have hotspot and a required `alt` (or decorative toggle).
- [ ] [R1] [sanity] Singletons cannot be duplicated or deleted.
- [ ] [R1] [sanity] Production front end reads published content only; no token in the browser bundle.
- [ ] [R1] [sanity] CORS origins list only real front ends and the Studio; no wildcard.
- [ ] [R2] [sanity] [if:cms] Client editor test: a person with the client's role edits each block type without breaking the layout (`tahi-core:dev-qa`).
- [ ] [R2] [sanity] [if:cms] Publish triggers the rebuild or revalidation; time to live noted in the editor guide.
- [ ] [R2] [sanity] Scheduled dataset export running, stored outside Sanity; last run checked.
- [ ] [R2] [sanity] TypeGen in CI; types committed and current.
- [ ] [R2] [sanity] Plan supports the roles the client needs; members and tokens reviewed.
- [ ] [R3] [sanity] Restore from export tested into a scratch dataset.
- [ ] [R3] [sanity] [if:personal-data] No personal data in the dataset unless the privacy review allows it; public datasets hold none.
