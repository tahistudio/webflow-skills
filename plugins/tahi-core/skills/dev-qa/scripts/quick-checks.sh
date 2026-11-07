#!/usr/bin/env bash
# Tahi quick checks: fast, dependency-free checks of a live URL.
# Usage: quick-checks.sh <url> [--risk 0-3] [--staging] [--full]
#   --risk     project risk level from PROJECT.md (default 1). Decides what is a FAIL vs a WARN.
#   --staging  the URL is a staging or preview deploy: it SHOULD be noindexed.
#   --full     also run linkinator, axe and Lighthouse through npx (downloads those tools on first use).
# Output: one line per check, PASS / WARN / FAIL / INFO, then a summary. Exit code 1 if any FAIL.

set -u
URL=""; RISK=1; STAGING=0; FULL=0
while [ $# -gt 0 ]; do
  case "$1" in
    --risk) RISK="$2"; shift 2 ;;
    --staging) STAGING=1; shift ;;
    --full) FULL=1; shift ;;
    -h|--help) sed -n 2,7p "$0"; exit 0 ;;
    *) URL="$1"; shift ;;
  esac
done
[ -z "$URL" ] && { echo "usage: $0 <url> [--risk 0-3] [--staging] [--full]"; exit 2; }
case "$URL" in http://*|https://*) ;; *) URL="https://$URL" ;; esac
URL="${URL%/}"
HOST=$(echo "$URL" | sed -E 's#^https?://##; s#/.*$##')
ORIGIN="https://$HOST"
UA="tahi-quick-checks/1.0"
P=0; W=0; F=0
pass() { echo "PASS  $1"; P=$((P+1)); }
warn() { echo "WARN  $1"; W=$((W+1)); }
fail() { echo "FAIL  $1"; F=$((F+1)); }
info() { echo "INFO  $1"; }
# fail at or above a risk level, otherwise warn
need() { if [ "$RISK" -ge "$1" ]; then fail "$2"; else warn "$2"; fi; }

TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
fetch() { curl -sS -L -A "$UA" --max-time 20 -D "$TMP/h" -o "$TMP/b" -w '%{http_code}' "$1" 2>/dev/null; }

echo "Tahi quick checks: $URL  (risk $RISK$( [ $STAGING = 1 ] && echo ', staging'))"
echo "------------------------------------------------------------"

# 1. Page loads
CODE=$(fetch "$URL/")
if [ "$CODE" = "200" ]; then pass "Page returns 200"; else fail "Page returns $CODE"; fi
cp "$TMP/h" "$TMP/home_h"; cp "$TMP/b" "$TMP/home_b"
H() { grep -i "^$1:" "$TMP/home_h" | tail -1 | cut -d: -f2- | tr -d '\r' | sed 's/^ *//'; }

# 2. HTTPS and canonical host
LOC=$(curl -sS -o /dev/null -A "$UA" --max-time 15 -w '%{redirect_url}' "http://$HOST/" 2>/dev/null)
case "$LOC" in https://*) pass "HTTP redirects to HTTPS" ;; *) fail "HTTP does not redirect to HTTPS (got: ${LOC:-no redirect})" ;; esac
case "$HOST" in
  www.*) ALT="${HOST#www.}" ;;
  *.*.*) ALT="" ;;  # subdomain such as x.webflow.io or staging.x.com: skip apex/www check
  *) ALT="www.$HOST" ;;
esac
if [ -n "$ALT" ] && [ $STAGING = 0 ]; then
  FINAL=$(curl -sS -L -o /dev/null -A "$UA" --max-time 15 -w '%{url_effective}' "https://$ALT/" 2>/dev/null | sed -E 's#^https?://##; s#/.*$##')
  ALTCODE=$(curl -sS -L -o /dev/null -A "$UA" --max-time 15 -w '%{http_code}' "https://$ALT/" 2>/dev/null)
  if [ "$FINAL" = "$HOST" ]; then pass "$ALT redirects to $HOST"
  elif [ "$ALTCODE" = "200" ]; then need 1 "$ALT serves its own copy of the site instead of redirecting to $HOST (duplicate host)"
  else warn "$ALT does not resolve or errors ($ALTCODE); fine if intentional, otherwise add DNS and a redirect"; fi
fi

# 3. Indexing: production should be indexable, staging should not
ROBOTS_META=$(grep -io '<meta[^>]*name=["'"'"']robots["'"'"'][^>]*>' "$TMP/home_b" | head -1)
XROBOTS=$(H x-robots-tag)
NOINDEX=0; echo "$ROBOTS_META $XROBOTS" | grep -qi noindex && NOINDEX=1
if [ $STAGING = 1 ]; then
  if [ $NOINDEX = 1 ]; then pass "Staging is noindexed"; else fail "Staging is indexable (no noindex meta or X-Robots-Tag)"; fi
else
  if [ $NOINDEX = 1 ]; then fail "Production is noindexed"; else pass "Production is indexable"; fi
  RC=$(fetch "$ORIGIN/robots.txt")
  if [ "$RC" = "200" ]; then
    if grep -qiE '^disallow:[[:space:]]*/[[:space:]]*$' "$TMP/b"; then fail "robots.txt disallows everything"; else pass "robots.txt present"; fi
    grep -qi '^sitemap:' "$TMP/b" && pass "robots.txt points to a sitemap" || warn "robots.txt has no Sitemap: line"
  else need 1 "robots.txt missing ($RC)"; fi
  SC=$(fetch "$ORIGIN/sitemap.xml")
  if [ "$SC" = "200" ] && grep -qi '<urlset\|<sitemapindex' "$TMP/b"; then pass "sitemap.xml present"; else need 1 "sitemap.xml missing or invalid ($SC)"; fi
fi

# 4. Head basics
TITLE=$(tr '\n' ' ' < "$TMP/home_b" | grep -io '<title[^>]*>[^<]*</title>' | head -1 | sed -E 's/<[^>]+>//g; s/^ +| +$//g')
TL=${#TITLE}
if [ $TL -eq 0 ]; then fail "No <title>"; elif [ $TL -gt 60 ]; then warn "Title is $TL characters (aim under 60): $TITLE"; else pass "Title ($TL chars): $TITLE"; fi
DESC=$(tr '\n' ' ' < "$TMP/home_b" | grep -io '<meta[^>]*name=["'"'"']description["'"'"'][^>]*>' | head -1 | sed -E 's/.*content=["'"'"']([^"'"'"']*).*/\1/')
DL=${#DESC}
if [ $DL -eq 0 ]; then need 1 "No meta description"; elif [ $DL -lt 70 ] || [ $DL -gt 160 ]; then warn "Meta description is $DL characters (aim 120 to 160)"; else pass "Meta description ($DL chars)"; fi
grep -qi 'property=["'"'"']og:image' "$TMP/home_b" && pass "Open Graph image set" || need 1 "No og:image"
grep -qi 'rel=["'"'"']canonical' "$TMP/home_b" && pass "Canonical link set" || warn "No canonical link"
grep -qi '<html[^>]*lang=' "$TMP/home_b" && pass "<html lang> set" || need 1 "No lang attribute on <html>"
H1=$(grep -io '<h1[ >]' "$TMP/home_b" | wc -l | tr -d ' ')
if [ "$H1" = "1" ]; then pass "One <h1>"; else need 1 "$H1 <h1> elements on the page (expect 1)"; fi
grep -qi 'name=["'"'"']viewport' "$TMP/home_b" && pass "Viewport meta set" || fail "No viewport meta"

# 5. 404 behaviour
NC=$(fetch "$ORIGIN/tahi-qa-$(date +%s)-not-a-page")
if [ "$NC" = "404" ]; then pass "Unknown URLs return 404"; else need 1 "Unknown URLs return $NC, not 404"; fi

# 6. Security headers (scaled by risk)
[ -n "$(H strict-transport-security)" ] && pass "HSTS set" || need 2 "No Strict-Transport-Security header"
[ -n "$(H x-content-type-options)" ] && pass "X-Content-Type-Options set" || need 2 "No X-Content-Type-Options header"
[ -n "$(H referrer-policy)" ] && pass "Referrer-Policy set" || need 2 "No Referrer-Policy header"
if [ -n "$(H x-frame-options)" ] || H content-security-policy | grep -qi frame-ancestors; then pass "Clickjacking protection set"; else need 3 "No X-Frame-Options or CSP frame-ancestors"; fi
[ -n "$(H content-security-policy)" ] && pass "Content-Security-Policy set" || need 3 "No Content-Security-Policy"
[ -n "$(H permissions-policy)" ] && pass "Permissions-Policy set" || need 3 "No Permissions-Policy"
SRV=$(H x-powered-by); [ -n "$SRV" ] && warn "X-Powered-By exposes: $SRV"

# 7. Mixed content
if grep -Eio '(src|href)=["'"'"']http://[^"'"'"']+' "$TMP/home_b" | grep -viE 'http://(www\.)?w3\.org|xmlns' | head -1 | grep -q .; then
  need 1 "Page references http:// resources (mixed content)"
else pass "No http:// resources on the page"; fi

# 8. Weight
BYTES=$(wc -c < "$TMP/home_b" | tr -d ' ')
info "HTML size: $BYTES bytes"

# 9. Heavy checks
if [ $FULL = 1 ]; then
  echo "------------------------------------------------------------"
  echo "Full checks (npx; first run downloads the tools)"
  npx -y linkinator "$URL" --recurse --skip "^(?!$ORIGIN)" --silent >"$TMP/links" 2>&1 && pass "linkinator: no broken links" || { fail "linkinator found broken links:"; grep -E '\[[0-9]{3}\]|BROKEN' "$TMP/links" | head -20; }
  npx -y @axe-core/cli "$URL" --exit >"$TMP/axe" 2>&1 && pass "axe: no violations" || { fail "axe reported violations:"; tail -25 "$TMP/axe"; }
  if npx -y lighthouse "$URL" --quiet --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$TMP/lh.json" >/dev/null 2>&1; then
    node -e 'const r=require(process.argv[1]).categories;for(const k in r)console.log("INFO  Lighthouse "+r[k].title+": "+Math.round(r[k].score*100))' "$TMP/lh.json"
  else warn "Lighthouse could not run (needs Chrome installed)"; fi
fi

echo "------------------------------------------------------------"
echo "$P passed, $W warnings, $F failed"
[ $F -eq 0 ]
