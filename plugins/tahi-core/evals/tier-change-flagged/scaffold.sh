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
write_project '# Tide Surf School — Website
## Levels
risk: 1
craft: 2
process: light
motion: 2
why: "Brochure site; contact form emails the owner. No logins, payments or stored personal data."
## Stack
build: astro
cms: mdx
hosting: cloudflare
backend: none
## Features
- forms → email
## Where data lives
- Code: GitHub tahistudio/tide-surf
- Form submissions: emailed only, not stored'
