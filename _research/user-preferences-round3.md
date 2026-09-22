# Round-three answers (22 Sep 2026)

- **Snap tolerance**: 5% of the larger value, with a 4px floor. So 141→140 snaps, 145→140 snaps, 13 vs 8 does not.
- **Schema**: propose a fixed default set per page type, applied to every page on client sites, and VALIDATED (Rich Results / schema.org validator) before it goes on the site. But sites differ in what they need, so the skill should frame schema as a judgement-driven SEO/schema audit-and-generate procedure with the fixed set as the starting point, not a copy of Meditrain.
- **Self-contained skills (hard requirement)**: the skills will be handed to other people who have no access to the user's sites. Every convention, preference and learned pattern must be baked into the skill files themselves. No references to Giant Group, Meditrain, Flowout, Nexus, Larkstone etc. inside a skill. Learn from them → encode as rules/examples with generic names.
- **How skills work (to explain to user)**: a skill = folder with SKILL.md (frontmatter name + description that triggers it, then instructions) and optional `references/` files loaded on demand, `scripts/`, `assets/`. Claude loads SKILL.md when triggered; ChatGPT gets the same markdown pasted as a custom-GPT instruction or project file. Keep SKILL.md < ~500 lines; push detail to references.
- Follow-up questions: deliver as one batch once remaining research reports are in.
