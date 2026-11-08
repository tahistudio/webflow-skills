# Fix list format

Save as `docs/qa/design-qa-YYYY-MM-DD.md` when there is no dashboard round. When there is one, the same fields go into each `add_qa_comment` body, and this file holds only the summary and a link to the round.

## Template

```markdown
# Design QA — {Client} {Project} — {YYYY-MM-DD}

**Verdict:** not ready | ready with minors | ready
**Build:** {staging URL} · **Design:** {Figma link} · **Round:** {dashboard link or "none"}
**Levels:** craft {n}, motion {n} · **Checked by:** {name}

**Scope checked:** {pages} at {widths} in {browsers}; states {all | basic}; drift audit {yes | no}; tells pass {yes | no}; dark mode {yes | n/a}
**Not checked:** {what, and how to check it}

| | Blocker | Major | Minor | Polish |
|---|---|---|---|---|
| Count | 0 | 0 | 0 | 0 |

## Blockers

1. **{What is wrong; what right looks like.}**
   Where: {URL} · {section} · `{selector or class}` · {width / state}
   Evidence: ![build]({screenshot path}) · Figma: {frame link or token}
   Owner: {design | build}

## Major
...

## Minor
...

## Polish
...

## Drift audit
{page}: {n} font sizes, {n} neutrals, {n} radii, {n} shadows, {n} off-scale spacing values. {What was fixed or why the exception stands.}

## Parked
- {Item} — {why it matters} (moved to docs/parking.md)
```

## Example items

1. **[Blocker] Service cards overlap at 1024: the grid holds four columns until 992.** Should drop to two columns below 1180.
   Where: /services · Services grid · `.services_grid` · 1024 to 1179
   Evidence: `docs/qa/shots/services-1024.png` · Figma: Services / Desktop (four columns), Tablet (two columns)
   Owner: build

2. **[Major] Primary button has no focus-visible style; the default ring is removed.** Should show the 2px focus ring in `--color-focus` with a 2px offset.
   Where: all pages · `.button.is-primary` · keyboard focus
   Evidence: `docs/qa/shots/button-focus.png` · Token: `--color-focus`

3. **[Minor] Case study hero heading leaves "us" alone on the second line at 390.** Should balance the two lines.
   Where: /work/example · hero · `h1` · 390
   Evidence: `docs/qa/shots/case-hero-390.png`

4. **[Polish] [C3] Pull quote opening mark is not hung; the text edge is pushed in.** Should hang the quote mark outside the text column.
   Where: /about · quote section · `blockquote` · all widths

## Writing good findings

- **One problem per item.** Two problems in one item means one gets forgotten.
- **Say what right looks like**, with the token, Figma frame or rule, so the fixer does not have to guess.
- **Name the narrowest location:** the selector or class and the width where it starts.
- **Screenshots are cropped to the problem**, with the width in the filename.
- **No blame and no adjectives.** "Off by one spacing step", not "spacing is messy".
