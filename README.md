# Webflow Skills

Custom AI skills (Claude / ChatGPT) encoding how Tahi Studio builds, edits and QAs Webflow sites.

| Folder | Skill | Status |
|---|---|---|
| Core Skill/tahi-webflow-core | Shared rules + workflow for every Webflow build | Draft v0.1 |
| Lumos Skill | Lumos framework, Webflow-side workflow (extends the official lumos-skill) | Planned |
| Client-First Skill | Finsweet Client-First builds | Planned |
| Client Site Skill | Figma + blank project → full client site with components, props, slots, QA | Planned |
| Template Skill | Build + QA Webflow Marketplace templates | Planned |

`_research/` holds the research behind the rules (framework docs, reference-site analysis, user preference rounds, a template pre-QA calibration run). Skills are self-contained and never depend on it.

Each skill is a folder with `SKILL.md` (frontmatter + instructions) and optional `references/`.

## Install into Claude Code

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

Links every skill folder into `~/.claude/skills` as a junction, so edits in this repo apply immediately. For ChatGPT, paste a skill's `SKILL.md` (and its `references/` files) into a custom GPT's instructions or project files.
