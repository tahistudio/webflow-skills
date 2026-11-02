# JSON-LD schema for client sites

Schema goes in Webflow's page-settings JSON-LD field on every page, never in head or body custom code. CMS template pages bind their values to fields and still use the page-settings field. Templates for the Marketplace carry no schema at all.

Goal: valid, complete, and useful for rankings and rich results. Different sites need different depth; the fixed set below is the starting point, and the audit at the end decides what to add or drop for the site in hand.

## Conventions

- One `@graph` per page. Site-wide entities are defined once on the home page and referenced elsewhere by `@id`.
- Stable ids: `https://example.com/#organization`, `https://example.com/#website`, `https://example.com/page/#webpage`, `…#breadcrumb`, `…#service`, `…#article`.
- Absolute URLs everywhere. `inLanguage` set to the site language (for example `en-NZ`, `en-GB`).
- Every page except home has a `BreadcrumbList`; the last item has no `item` URL.
- Populate from CMS fields where the page is a CMS template: name, description, image, dates, price, author.
- Dedicated schema-only CMS fields are named `Schema …` with help text "Feeds structured data only".
- No invented facts: ratings only when real reviews exist, opening hours only when known, prices only when shown on the page.

## Fixed set per page type

| Page type | `@graph` members |
|---|---|
| Home | `Organization` (or a subtype such as `LocalBusiness`, `EducationalOrganization`) with legalName, url, logo, address, contactPoint, sameAs; `WebSite` with `potentialAction: SearchAction` if the site has search; `WebPage` (isPartOf website, about organization, primaryImageOfPage) |
| About | `AboutPage` (mainEntity → organization) + `BreadcrumbList` |
| Contact | `ContactPage` + `LocalBusiness` or `Organization` location detail (telephone, email, PostalAddress, openingHoursSpecification if known) + `BreadcrumbList` |
| Service / product-category landing | `WebPage` + `Service` (name, serviceType, provider → organization, areaServed, description, offers if priced) + `BreadcrumbList` |
| Regional or location landing | `WebPage` + `Service` with `areaServed: AdministrativeArea` or `City` + `BreadcrumbList`; add `LocalBusiness` with address when a physical location exists |
| Pricing | `WebPage` + `OfferCatalog` or `Product` with `offers` + `BreadcrumbList` |
| Blog index | `Blog` or `CollectionPage` + `BreadcrumbList` |
| Blog post (CMS) | `BlogPosting` (headline, description, image, datePublished, dateModified, author → Person or Organization, publisher → organization, articleSection from category, mainEntityOfPage) + `BreadcrumbList` |
| Case study (CMS) | `Article` or `CreativeWork` with client and outcome in description + `BreadcrumbList` |
| Team index | `CollectionPage` + `BreadcrumbList`; individual `Person` entities optional |
| Team member (CMS) | `ProfilePage` with `mainEntity: Person` (name, jobTitle, worksFor, image, sameAs) + `BreadcrumbList` |
| Product (CMS, ecommerce) | `Product` (name, image, description, sku, brand, `offers: Offer` with price, priceCurrency, availability, url) + `BreadcrumbList`; `AggregateRating` only with real reviews |
| Course / event (CMS) | `Course` with `hasCourseInstance` (courseMode, courseWorkload, offers) or `Event` (startDate, endDate, location, offers) + `BreadcrumbList` |
| FAQ page or a page with a FAQ section | `WebPage` + `FAQPage` with `mainEntity: Question[]` (each `acceptedAnswer`) + `BreadcrumbList`. Keep it inside the same `@graph` as the page; questions and answers must match the visible text exactly |
| Legal (privacy, terms) | `WebPage` + `BreadcrumbList` |
| 404, password, utility pages, checkout, order confirmation | none |

Pages that Webflow will not publish (drafts, style guide, components page) get none.

## Audit and generate procedure

1. List every page and its type. Note which are CMS templates and which fields exist.
2. For each page, take the fixed set and adjust: drop entities the site cannot truthfully populate; add ones the content clearly supports (a `VideoObject` for an embedded video, `HowTo` for step content, `Review` for real testimonials with authors and dates).
3. Draft the JSON per page. For CMS templates, write field bindings, not literals.
4. Validate every page's JSON before it goes on the site: it must parse, use the right `@type` for the content, reference ids that exist, and pass a schema validator and a rich-results test. Fix errors; treat warnings as advice.
5. Write to the page-settings JSON-LD field. Confirm by reading it back.
6. After publish, re-test the live URLs of the home page, one service page, one CMS item and the FAQ page.

## Common mistakes to avoid

- Schema in `<head>` or footer code instead of the page-settings field.
- FAQPage as a standalone flat object outside the page's `@graph`.
- `dateModified` equal to `datePublished` on every post; bind it to the real updated field.
- `Product` without `offers`; `Service` without `provider`.
- Missing schema on CMS templates that are indexed (locations, team members, categories).
- Ratings, hours or prices that are not on the page.
- Organization redefined on every page instead of referenced by `@id`.
