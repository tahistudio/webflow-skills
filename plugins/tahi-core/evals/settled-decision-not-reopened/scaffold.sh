#!/usr/bin/env bash
set -e
write_project() { # $1 = PROJECT.md body
  mkdir -p docs/plans
  printf '%s\n' "$1" > PROJECT.md
  printf '# Project log\n\n## 2026-11-05 · Liam\n- Done: All pages built on staging.\n- Next: Launch prep.\n' > docs/log.md
  printf '# Decisions\n' > docs/decisions.md
  printf '# Parking list\n' > docs/parking.md
  git init -q && git add -A && git -c user.email=eval@tahi.studio -c user.name=eval commit -qm init
}
write_project '# Ponga Cafe — Website
## Levels
risk: 1
craft: 2
process: light
motion: 2
why: "Brochure site with menu and blog. One editor."
## Stack
build: webflow
cms: webflow
hosting: webflow'
cat >> docs/decisions.md <<'D'

## D-002 · 2026-10-20 · Blog stays on Webflow CMS
Context: We considered Sanity for the blog.
Decision: Keep the blog on Webflow CMS.
Why: One editor, about two posts a month; a second CMS doubles training and cost.
Revisit if: They add a second content type that needs reuse across channels.
D
git add -A && git -c user.email=eval@tahi.studio -c user.name=eval commit -qm decision
