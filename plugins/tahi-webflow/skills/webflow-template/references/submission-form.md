# Submission form (webflow.com/templates/submit-a-template)

Learned on a live submission, 8 Nov 2026. The form changes, so treat the field list as a guide and check it against the page. Do this only after the QA report verdict is WOULD PASS.

## Preparation (before opening the form)

- Make the assets first. They have hard specs and the form rejects anything else.
- Profile image (first submission only): WebP, exactly 256×256, under 100 KB.
- Primary thumbnail: WebP, exactly 750×995, under 300 KB. Secondary thumbnail is optional, same spec.
- Gallery: 1 to 5 WebP images, each exactly 1440×900, under 250 KB. No text or badges on any image.
- Produce screenshots with headless Chrome at 1440×900. Scroll through the whole page first so scroll reveals have played, then scroll to each section. Convert with `cwebp` and check sizes and dimensions before uploading. For the portrait thumbnail, capture a 1440×1910 page-top crop and resize to 750×995.
- Write one facts file (page names and count, CMS collections, interaction list, fonts, image formats, version, release date). Generate the listing, Changelog entry and Instructions page from it. The Changelog date is the submission date.
- Get the Webflow preview link from the Webflow dashboard. It must start with `https://preview.webflow.com/preview/`. The Designer's Share dialog gives a `comments.webflow.com` link, which the form rejects.

## Pre-submit pass (do not skip; "Ready to submit" on the form is not a pass)

The form's status only means its own checks passed. Before the owner ticks the final boxes:
1. Custom code is only font smoothing, the Webflow Way Validator snippet and noindex where required.
2. Fonts are Google or OFL through Webflow Fonts; no uploaded fonts, no `@font-face` or `@import`.
3. No registered scripts.
4. Every interaction duration is 800 ms or less (checklist 3.10).
5. The Webflow Way Validator was re-run after the last publish.
6. Licenses names every image source and, for AI-generated images, the exact tool or model (for example Gemini Nano Banana, ChatGPT or Sora) with a link to its terms. Ask the owner where every image came from; do not infer it from how a photo looks.
7. Listing text, Changelog and the live site agree on page count, collections and interactions.
8. Every external link in a component (footer, navbar, CTA, social cards) is a neutral placeholder for the buyer. Only the single "Designed by" credit points to the studio, with no tracking parameters. Social cards often hide in the CTA component, not the footer; list every link in every component.
9. Footer and navbar logos link to Home. Read the link setting; a logo linked to a page id that is not Home publishes as `#`.
10. The Designer's Style Manager "Clean up unused styles" is empty. Starter and showcase classes (for example `template-hero_*`, `template-inclusions_*`, `global-styles`) are the usual leftovers. The API can remove styles that are plainly unused, but a style with a combo-class variant needs the Style Manager.
11. CMS template pages: SEO title bound to the item name. The pages API accepts `{{wf {"path":"name","type":"PlainText"} }} | Site name` as `seo.title`; check the rendered title on one item per collection.
12. Every image on every published page, including CMS pages and the Style Guide, has width and height. Scan the live HTML; only the Designer's image settings can set them.

First reviews check sitewide components first, so a mistake in a component repeats on every page. Webflow's first review of Larkstone (9 Nov 2026) came back with items 8, 9, 10, 11 and 12.

## Expect these, do not chase them

- The required Webflow Way Validator snippet in the head is a render-blocking script (about 1 s in a mobile Lighthouse run) and Webflow's own font loader blocks too. Together with Webflow's server response they dominate Home mobile LCP. Report the score and its causes; remove the snippet only after acceptance, and never to improve a score before submitting.
- The Validator can hang on "Validating…". Reload the Designer fully, reopen Apps, Webflow Validation, Launch App, Run Validator. Two Designer tabs open at once can freeze screenshots; keep one.

## Form flow

1. Open the form. It runs in an iframe at `webflow-template-form.webflow.io/submit`. Open that address directly in its own tab to automate it, because file inputs are not reachable through the parent page. Keep that tab open; the form can reset and lose every field.
2. Step 1, creator profile (one time): country; optional website; primary and Webflow account emails (both verified); preferred and legal name; bio up to 200 characters; profile image; creator terms; bot check. The person ticks the terms and completes the bot check.
3. Step 2, template: name (name check), published `*.webflow.io` URL (runs a site crawl of a few minutes; keep the page open), preview URL, free or paid, up to 2 categories, page count, template type, price tier when paid (set by page count and CMS usage; the person chooses), up to 2 styles, features, short description up to 250 characters, long description, optional notes up to 400 characters, then the assets.
4. Long description: type it into the editor. Setting the editor's `innerHTML` keeps only the first paragraph and leaves broken content behind. Typing `- ` at the start of a line makes a bullet list; a blank line ends the list. Layout used by published templates: intro, an "Ideal for" line, "Key features" bullets, "Pages included" bullets.
5. Final: three confirmations (benchmark reviewed; checklist and fonts; marketplace agreement), bot check, Submit. The person ticks and submits.
6. After submit the form shows a processing receipt id and a status page. Do not resubmit.

## Form automation notes

- Checkboxes and radios have no accessible labels; tick them by matching their visible label text in a script, then confirm by reading the checked list.
- Re-read refs before every use; they go stale after the form re-renders (for example when the price field appears).
- Do not clear a field to test it: the owner may have filled it in the same tab while you worked. Read first.
