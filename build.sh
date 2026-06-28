#!/usr/bin/env bash
# Build every journal club (see content/editions.js) in all three formats from one content source.
# Per edition: dedup-check, render the issue web page to issues/<id>/<date>.html, print a PDF and
# build a Word doc (both as root download files + archived copies), record the no-repeat ledger.
# Finally build the homepage hub (index.html) that lists all clubs and their issues.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
IDS=$(node -e "require('./content/editions').forEach(e=>console.log(e.id))")

for ID in $IDS; do
  read -r BASE DATE <<<"$(node -e "const e=require('./content/editions').find(x=>x.id==='$ID');process.stdout.write(e.base+' '+e.content.meta.asOf)")"
  ISSUE_HTML="issues/${ID}/${DATE}.html"
  echo "════ ${ID} (${DATE}) ════"

  echo "→ dedup check"
  node dedup-check.js "$ID"

  echo "→ issue web page"
  mkdir -p "issues/${ID}"
  node build-web.js "$ID"            # writes ${ISSUE_HTML}

  echo "→ word"
  node build-docx.js "$ID"           # writes ${BASE}-${DATE}.docx (root download)

  echo "→ pdf (headless chrome)"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="${BASE}-${DATE}.pdf" "file://$(pwd)/${ISSUE_HTML}" 2>/dev/null
  echo "wrote ${BASE}-${DATE}.pdf ($(wc -c < "${BASE}-${DATE}.pdf") bytes)"

  echo "→ archive copies"
  cp "${BASE}-${DATE}.pdf" "issues/${ID}/${DATE}.pdf"
  cp "${BASE}-${DATE}.docx" "issues/${ID}/${DATE}.docx"

  echo "→ record ledger"
  node record-issue.js "$ID"
done

echo "→ homepage hub"
node build-hub.js

echo "✓ done — clubs: $(echo $IDS | tr '\n' ' ')"
