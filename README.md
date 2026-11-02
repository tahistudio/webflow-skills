# Webflow Skills

Custom Claude skills encoding how Tahi Studio builds, edits and QAs Webflow sites. The repo is a Claude Code plugin marketplace (`tahi-studio`) with one plugin (`tahi-webflow`) that holds every skill.

| Skill | What it covers | Status |
|---|---|---|
| tahi-webflow-core | Shared rules and workflow for every Webflow build | Draft v0.1 |
| lumos-webflow | Lumos framework, Webflow-side workflow (extends the official lumos-skill) | Draft v0.1 |
| client-first-webflow | Finsweet Client-First V3 builds (V2 legacy and upgrade path), Relume imports, official agent rules, launch checklist | Draft v0.2 |
| webflow-client-site | Figma plus project to a full client site with components, props, slots, schema, QA | Draft v0.1 |
| webflow-template | Build and QA Webflow Marketplace templates against the submission guidelines, including adapting Client-First V3 | Draft v0.2 |
| webflow-ix2-to-gsap | Read Classic interactions from a published page and rebuild them natively | Draft v0.1 |

```
.claude-plugin/marketplace.json          marketplace "tahi-studio"
plugins/tahi-webflow/
  .claude-plugin/plugin.json             plugin "tahi-webflow"
  skills/<skill-name>/SKILL.md           one folder per skill, with optional references/
_research/                               research behind the rules (not loaded by Claude)
```

`_research/` holds framework docs, reference-site analysis, user preference rounds and audits. Skills are self-contained and never depend on it.

## Install (everyone)

In Claude Code (2.1.275 or later):

```
/plugin install tahi-webflow --marketplace tahistudio/webflow-skills
```

Or from a terminal:

```bash
claude plugin marketplace add tahistudio/webflow-skills
```

```bash
claude plugin install tahi-webflow@tahi-studio
```

Then turn on updates once: run `/plugin`, open **Marketplaces**, select **tahi-studio**, choose **Enable auto-update**. Auto-update is off by default for marketplaces outside Anthropic's own.

The repo is private, so Claude Code needs your git credentials to fetch updates in the background. Set them up once:

```bash
gh auth login
```

```bash
gh auth setup-git
```

Skills from the plugin are named with the plugin prefix, for example `/tahi-webflow:client-first-webflow`. Claude also loads them automatically when a task matches their description.

## How updates reach people

- Push to `main`. The plugin has no `version` field on purpose, so Claude Code treats every commit that changes the plugin folder as a new version.
- With auto-update on, Claude Code checks a few minutes after the first message of a session and downloads the new version. It loads at the next session start, or straight away with `/reload-plugins`.
- To update by hand: `claude plugin marketplace update tahi-studio`, then `claude plugin update tahi-webflow@tahi-studio`.

## Editing skills (maintainers)

To see edits immediately without pushing, add your local clone as the marketplace instead of GitHub:

```bash
claude plugin marketplace add ./
```

Edits then apply at the next session start or after `/reload-plugins`. Check the manifests after any structural change:

```bash
claude plugin validate .
```

`install.ps1` is the old method (it links each skill folder into `~/.claude/skills`). Do not use it together with the plugin, or every skill loads twice. If you used it before, delete those links from `~/.claude/skills` after installing the plugin.

For ChatGPT, paste a skill's `SKILL.md` and its `references/` files into a custom GPT's instructions or project files.
