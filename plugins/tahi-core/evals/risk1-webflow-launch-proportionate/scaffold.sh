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
write_project '# Harbour Physio — Website
## Levels
risk: 1
craft: 2
process: light
motion: 1
why: "Brochure site, contact form to email, booking is a Cliniko link. No logins or payments."
## Stack
build: webflow
framework: lumos
cms: webflow
hosting: webflow
backend: none
environments:
  production: https://harbourphysio.co.nz
  staging: https://harbour-physio.webflow.io
## Features
- forms → email
## Where data lives
- Code: none, Webflow only
- Content: Webflow CMS
- Form submissions: Webflow, emailed to reception
## Platform handles
hosting, ssl, cdn, site backups, uptime
## Scope
In: 6 pages, team CMS
Out: online booking build (Cliniko link only), blog'
