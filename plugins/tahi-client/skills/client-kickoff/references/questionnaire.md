# The client questionnaire

The intake questions in `tahi-core:tahi-project` › references/profile.md decide the levels. Clients should not have to know what a risk level is, so this file words those questions for them and adds the project questions a kickoff needs.

**How to use it**

1. Copy only the questions the brief, the proposal, the sales calls and the dashboard have not answered.
2. Light process: 8 questions at most. Pick the ones that change the levels or the scope first.
3. Keep the wording plain. One question per line. Give an example answer where the question is abstract.
4. Follow `tahi:tahi-brand-voice` when it is installed. No dashes, no jargon (no "risk level", "CMS", "integration" without a plain gloss).
5. When answers come back, copy the facts into `PROJECT.md` and note the field each one set.

## Questions behind the profile

| # | Ask the client | Sets |
|---|---|---|
| 1 | If the site went down for a day, what would that cost you? Lost enquiries, lost sales, or not much? | Risk |
| 2 | Will the site take payments, have logins, or collect personal details we would store (applications, uploads, health or financial details)? A contact form that sends you an email does not count. | Risk 3 flags |
| 3 | Is this replacing a site people already find on Google? If so, can you give us access to its analytics and Search Console? | Migration flag |
| 4 | Who on your team will update the site after launch, and what will they change most? For example news posts, team profiles, case studies, prices. | CMS flag, content model, editor guide |
| 5 | What should the site connect to? Your CRM, newsletter, booking tool, payment provider, chat, anything else. | Integrations flag |
| 6 | Who is the site for? Name two or three sites your audience trusts, and one you think tries too hard. | Audience, motion |
| 7 | How much does the look itself need to impress? Is this a brand moment, or mostly a solid sales tool? Ask only if the proposal does not make it clear. | Craft |
| 8 | Who needs to say yes before something goes live, and who has the final say if they disagree? | Process, approvers |
| 9 | Here is what is not included: [Out list]. Is there anything you assumed was included that we should talk about now? | Scope Out |

## Project questions

Ask the ones that apply.

**Goals**

- What does a good result look like six months after launch? Enquiries, bookings, sign-ups, fewer support calls, something else?
- How will you measure it? (If they do not know, note it; analytics set-up may be in scope.)

**Dates**

- Is there a date the site must be live by? What happens if it moves? (A trade show is a hard date; "end of the quarter" is usually soft.)
- Are there weeks when the people signing off are away?

**Content**

- Who is writing the words for each page, and when will they be ready? Is copywriting part of our scope or yours?
- Do you have photography and video we can use, and do you hold the rights to it?
- How many existing pages, posts or products need to move across? [if:migration]
- Who owns the privacy policy and terms? (We place them; we do not write legal wording.)

**Brand**

- Do you have brand guidelines, a logo as SVG, and the brand fonts? Do the font licences cover use on your website?
- Anything about the brand we should never do?

**People**

- Who will gather feedback from your side into one list?
- Who supplies content, access and decisions if that is someone else?
- Who should receive project updates?

**Anything else**

- Is there anything about how past website projects went that we should know?
