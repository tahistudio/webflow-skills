# Client update templates

Updates are built from `docs/log.md` and the dashboard, never written from memory. Follow `tahi:tahi-brand-voice` when it is installed. No dashes, no exclamation marks. Every update is a draft until the person says send.

## The shape

Always the same three headings, in this order, so the client learns where to look:

1. **Done**: outcomes since the last update, in the client's terms.
2. **Next**: what happens before the next update, with dates.
3. **Needed from you**: each item with a name and a date. Write "Nothing this week" when that is true.

Add **Dates** only when a milestone moved, saying why and what the new date is. Add **Decisions** only when something was decided that they should have on record.

## From log to update

| Log says | Update says |
|---|---|
| "Built hero, features and FAQ sections on Home; responsive pass done" | "The Home page is built and works on phones, tablets and desktops. Have a look: [staging link]" |
| "Wired form to HubSpot, test submission received" | "The enquiry form now sends straight into HubSpot. We tested it with a real submission." |
| "Blocked: no font licence for web" | Needed from you: "A web licence for [font], or a yes to use [alternative]. By [date], or the type will change at launch." |
| "Lighthouse mobile 72, image weight the main cause" | Usually leave it out. Mention performance only when it needs their action (heavy images they supplied) or at the pre-launch review. |

Leave out tool names, class names, internal tasks and anything they cannot act on or see.

## light: milestone message

> Hey [Name],
>
> **Done:** [one or two lines]. You can see it here: [link]
>
> **Next:** [one line], ready by [date].
>
> **Needed from you:** [item] by [date]. [Or: Nothing right now.]
>
> Cheers,
> [Name]

## standard: weekly update

> Hey [Name],
>
> Here's where [project] is this week.
>
> **Done**
> - [outcome]
> - [outcome]
>
> **Next**
> - [what], by [date]
>
> **Needed from you**
> - [item], from [person], by [date]
>
> [Dates: only if one moved. What moved, why, the new date.]
>
> Cheers,
> [Name]

## full: weekly update and check-in

Send the written update the day before the check-in call. The call covers only what is in "Needed from you", any risk, and decisions. Within the same day, send the call notes:

> **Decided:** [decision], approved by [name].
> **Actions:** [action], [owner], [date].
> **Risks we're watching:** [risk], [what we're doing about it].

Record decisions in `docs/decisions.md` and the risk list in the project's risk and decision register (`tahi-core:tahi-project` › references/tiers.md, full process).
