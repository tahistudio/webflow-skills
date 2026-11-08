#!/usr/bin/env bash
# Tahi session-start hook. In a project with a PROJECT.md, prints a short briefing that is added to
# Claude's context: levels and stack, the newest log entry, open parking items, and a warning when
# the log has fallen behind git. Prints nothing anywhere else.
set -u
DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
ROOT=$(git -C "$DIR" rev-parse --show-toplevel 2>/dev/null || echo "$DIR")
PROFILE=""
for d in "$DIR" "$ROOT"; do [ -f "$d/PROJECT.md" ] && { PROFILE="$d/PROJECT.md"; ROOT="$d"; break; }; done
[ -z "$PROFILE" ] && exit 0

echo "Tahi project detected ($PROFILE). Follow tahi-core:tahi-project: treat the profile as settled, scale checks to its levels, log at the end of the session."
echo
head -1 "$PROFILE"
grep -E '^(risk|craft|process|motion|why|build|framework|cms|hosting|backend):' "$PROFILE" | sed -E 's/ +# .*//; s/^/  /'

LOG="$ROOT/docs/log.md"
if [ -f "$LOG" ]; then
  echo
  echo "Newest log entry:"
  awk '/^## /{n++} n==1{print "  " $0} n>1{exit}' "$LOG" | head -15
  LOG_DATE=$(grep -m1 -oE '^## [0-9]{4}-[0-9]{2}-[0-9]{2}' "$LOG" | cut -c4-)
  GIT_DATE=$(git -C "$ROOT" log -1 --format=%cs 2>/dev/null || true)
  if [ -n "$LOG_DATE" ] && [ -n "$GIT_DATE" ] && [[ "$GIT_DATE" > "$LOG_DATE" ]]; then
    echo "  ! The log ($LOG_DATE) is behind the latest commit ($GIT_DATE). Catch it up from git log before starting new work."
  fi
else
  echo "No docs/log.md yet. Create it from the template when this session does real work."
fi

PARK="$ROOT/docs/parking.md"
if [ -f "$PARK" ]; then
  OPEN=$(grep -c '^- \[ \]' "$PARK" || true)
  [ "${OPEN:-0}" -gt 0 ] && echo && echo "Parking list: $OPEN open item(s) in docs/parking.md."
fi
PLANS=$(ls "$ROOT/docs/plans" 2>/dev/null | tail -1)
[ -n "$PLANS" ] && echo "Latest plan: docs/plans/$PLANS"
exit 0
