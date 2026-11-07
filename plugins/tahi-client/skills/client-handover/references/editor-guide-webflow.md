# Editor guide: Webflow

Template for the client's editors on a Webflow site. Rules for writing it are in SKILL.md section 3: task first, only what they will do, real screenshots of this site.

**Check role names before writing.** Webflow renames roles and plan features from time to time. Open the workspace's member settings and the site's role settings, and use the names shown there. The roles below are the ones Tahi uses as of late 2026.

## Choosing roles

| Person | Role | Can | Cannot |
|---|---|---|---|
| Updates text, images and CMS items only | **Content Editor** (editing in the Designer's edit mode, or the legacy Editor on older set-ups) | Edit text and images on pages, add and edit CMS items, publish if allowed | Change layout, styles, components |
| Builds new pages from existing sections | **Marketer**, working in Build mode | Add pages, place and reorder components, fill component props, edit content | Change classes, styles or component definitions |
| Tahi, during support and any monthly plan | Designer or Admin level on the site (collaborator) | Everything needed to fix and update | Billing, unless the client grants it |

Give each person the least role that does their job. The client's account owner keeps billing and member management.

Before handover, confirm with the person that builder-only components and props (named with ` (dev)`) are hidden from Marketers. That is a manual Designer setting; the API cannot set it.

## Template

> # Editing [site name] in Webflow
>
> **Who this is for:** [names or team]. Your role is [Content Editor / Marketer].
>
> **Signing in:** go to [webflow.com/dashboard], sign in with your own Webflow account, and open [site name]. Ask [account owner] to invite you if you don't see it.
>
> ## Change text or an image on a page
> 1. [Steps with screenshots of this site.]
> 2. ...
> 3. Publish: [who publishes, and to which domain].
>
> ## Add a [blog post / case study / team member]
> 1. Open the CMS panel and choose **[collection name]**.
> 2. Click **New [item]**. Fill in each field. [Field notes: image size, alt text, the summary field shows on the listing page, etc.]
> 3. Save as draft, preview, then publish.
>
> ## Build a new page from our sections (Marketers)
> 1. [Duplicate the page template / add a page from the template.]
> 2. Add sections from the **Components** panel, in the **[folder]** folder.
> 3. Each section has settings on the right. Hover over a setting to see what it does.
> 4. Set the page's SEO title and description in page settings.
>
> ## Writing alt text
> One plain sentence saying what the image shows and why it's there. Leave it empty only for purely decorative images, and tick "decorative".
>
> ## Please don't
> - [Rename or delete CMS fields: the pages that use them will break.]
> - [Delete a component from the Components page.]
> - [Change the site settings or custom code.]
>
> ## If something goes wrong
> - Webflow keeps backups. Tell us what happened and roughly when, and we can restore an earlier version.
> - Raise anything at [dashboard link]. We reply within one to two working days.

## Fill it in from the build

- Collection names and every field an editor fills, with the field's help text.
- Component names and their prop tooltips (from the build; see `tahi-webflow:webflow-client-site`).
- Who publishes, and whether staging review is expected first.
- Image sizes and formats that suit each slot.
- Any page or collection the client must never edit (legal pages Tahi placed, for example).
