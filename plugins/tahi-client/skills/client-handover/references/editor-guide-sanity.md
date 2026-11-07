# Editor guide: Sanity Studio

Template for the client's editors on an Astro or Next.js site with Sanity. Rules for writing it are in SKILL.md section 3.

**Check before writing:** the Studio URL, the plan's available roles, whether visual editing (the Presentation tool) is set up, whether scheduled publishing is on, and how long a published change takes to appear on the live site (instant with live content, or a rebuild of about [n] minutes triggered by a webhook).

## Choosing roles

Use the role names shown in the Sanity project's member settings. Default mapping:

| Person | Role | Why |
|---|---|---|
| Client account owner | Administrator | Manages members and billing |
| Content editors | Editor | Create, edit and publish content |
| Reviewers who only read | Viewer | No accidental changes |
| Tahi | Administrator (or Developer where available) during support and any monthly plan | Schema changes, access support, backups |

## Template

> # Editing [site name] in Sanity Studio
>
> **Who this is for:** [names or team].
>
> **Signing in:** go to [studio URL] and sign in with [Google / email]. Ask [account owner] to invite you if you can't get in.
>
> ## How the Studio is organised
> The left column lists your content types: [Pages, Blog posts, Team, Settings]. Click one to see its items.
>
> ## Drafts and publishing
> Every change saves automatically as a **draft**. Nothing reaches the live site until you click **Publish**. After publishing, the change appears on the site [straight away / within about n minutes].
>
> ## Add a [blog post]
> 1. Open **[Blog posts]** and click the pencil icon to create one.
> 2. Fill in each field. [Field notes: title shows in Google results, keep it under 60 characters; the slug is the web address, set it once and leave it.]
> 3. Add images with alt text: one plain sentence describing the image.
> 4. Click **Publish**.
>
> ## Edit a page
> 1. [Open the page in Presentation and click the text to edit / open Pages and choose the page.]
> 2. Sections are listed in order. Drag to reorder, or add a section with **Add item**.
>
> ## Images
> Upload the largest version you have. Use the crop and hotspot tool to choose what stays visible on smaller screens.
>
> ## Undo a mistake
> Open the item, click the history icon, choose an earlier version and restore it. Then publish.
>
> ## Please don't
> - [Change a slug on a published page: links to it will break.]
> - [Delete an item that other pages reference, such as an author.]
> - [Edit the Settings document unless you've talked to us.]
>
> ## If something goes wrong
> Raise it at [dashboard link]. We reply within one to two working days.

## Fill it in from the build

- Every document type and field an editor touches, with the description set in the schema.
- Validation rules the editor will meet (required fields, character limits) and what the error means.
- Which content is shared across pages (settings, navigation, footer), and who should change it.
- [R2] Where content backups run and how often (the scheduled dataset export set up at launch).
