# Feedback rounds: brief, translation and push back

## Round brief

Send before every round. Short enough to read in a minute.

> Hey [Name],
>
> [Design for the Home and About pages / The staging site] is ready for your feedback.
>
> **Please look at:** [pages, sections, what kind of feedback helps: content accuracy, layout, does it feel like your brand].
> **Already settled:** [what was approved earlier, which we won't be changing in this round].
> **Where to comment:** [Figma comments on each frame / the review link, where you can click on the page to leave a comment].
> **By:** [date], from [owner], with everyone's comments in one place. If two people disagree, let us know who has the final say.
>
> This is round [1] of [2] for this stage.
>
> Cheers,
> [Name]

For build rounds, start a dashboard QA round on staging (`start_qa_round`) and add Tahi's own known issues first (`add_qa_comment`) so the client does not report them.

## Making feedback actionable

Every item must answer: **where, what now, what instead, why.** When one is missing, ask one question that offers two concrete options. Do not guess, and do not send a list of ten questions.

| They say | It usually means | Ask |
|---|---|---|
| "Make it pop" | Not enough contrast or hierarchy, or the key action is not obvious | "Is it the headline that needs more weight, or the button that should stand out more?" |
| "It feels a bit off" | Something specific bothers them that they cannot name | "Is it the colours, the spacing, or the images? Point at the part you notice first." |
| "Can it be more modern?" | They have a reference site in mind | "Which site feels right to you? We'll pull out what makes it work." |
| "Make the logo bigger" | Brand presence feels weak | "Would a bigger logo, or the brand colour used more in the header, do it?" |
| "I don't like the font" | Tone mismatch, or readability | "Is it too formal, too casual, or hard to read?" |
| "Too much white space" | Pages feel empty or they worry about scrolling | "Is it the gap between sections, or the page feeling long?" |
| "Can we add more content here?" | Worry the message is thin, or a stakeholder wants their bit | "What should a visitor know here that they don't yet?" Check scope if it is a new section. |
| "My partner/boss/colleague thinks..." | A second opinion arrived outside the owner | "Thanks. Could [owner] fold it into the combined list so we act on one set?" |
| "Can you try a few options?" | Unsure what they want | Offer two options with a recommendation. A third option is a change on light jobs. |

## Pushing back kindly

The shape: **thanks, the reason in their terms, an alternative, their call.**

> Good thought. We'd keep the button in the header, because most of your visitors arrive on their phone and the header is the one place they always see. If you'd like the phone number more visible too, we can add it to the footer and the contact page. Your call, let us know.

> We'd hold off on the auto-playing slider. Visitors tend to see only the first slide, so the other messages get missed. A row of three cards shows all three at once. Happy to go either way.

When it touches the quality floor for the project's risk level:

> We can make the text lighter, but at that shade it would be hard to read for people with low vision and would fall below the accessibility standard we've built the site to. Here's a slightly darker version that keeps the soft look and stays readable: [link]. If you'd still prefer the lighter one, we'll note the decision and go with it.

Record the decision in `docs/decisions.md` either way. If it ships below the risk level's standard, tell Liam first.

## Closing the round

Reply with three short lists:

> **We'll do:** [items, with the date the updated version is ready]
> **We'd suggest not to, and why:** [items, one line each]
> **Needs your decision:** [items, each with two options]

Log the round in `docs/log.md`: round number, items fixed, items pushed back, decisions, what is next.
