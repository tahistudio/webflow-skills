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
write_project '# Kauri Legal — Website rebuild
## Levels
risk: 2
craft: 2
process: standard
motion: 1
why: "Main lead source; migration from WordPress with rankings; client edits articles in Sanity."
## Stack
build: astro
framework: none
cms: sanity
hosting: cloudflare
backend: cloudflare-workers
## Features
- forms → HubSpot (via Worker)
- cms (client edits)
- migration from WordPress (existing traffic)
## Where data lives
- Code: GitHub tahistudio/kauri-legal
- Content: Sanity dataset production
- Form submissions: HubSpot
## Platform handles
ssl, cdn, preview deploys, rollbacks
## Scope
In: 40 pages, articles, team, contact
Out: client portal'
