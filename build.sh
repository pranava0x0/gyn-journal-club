#!/usr/bin/env bash
# Build every edition (see content/editions.js) in all three formats from one content source:
#   1. <html>            (website)
#   2. <base>-<date>.pdf (exportable PDF, rendered from the website via headless Chrome)
#   3. <base>-<date>.docx(exportable Word)
# Per edition: dedup-check against prior issues, build, archive to issues/<id>/, record the ledger.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
IDS=$(node -e "require('./content/editions').forEach(e=>console.log(e.id))")

for ID in $IDS; do
  # pull this edition's output names + issue date from the registry
  read -r HTML BASE DATE <<<"$(node -e "const e=require('./content/editions').find(x=>x.id==='$ID');process.stdout.write(e.html+' '+e.base+' '+e.content.meta.asOf)")"
  echo "════ edition: $ID ($DATE) ════"

  echo "→ dedup check"
  node dedup-check.js "$ID"

  echo "→ website"
  node build-web.js "$ID"

  echo "→ word"
  node build-docx.js "$ID"

  echo "→ pdf (headless chrome)"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="${BASE}-${DATE}.pdf" "file://$(pwd)/${HTML}" 2>/dev/null
  echo "wrote ${BASE}-${DATE}.pdf ($(wc -c < "${BASE}-${DATE}.pdf") bytes)"

  echo "→ archive"
  mkdir -p "issues/${ID}"
  cp "${HTML}" "issues/${ID}/${DATE}.html"
  cp "${BASE}-${DATE}.pdf" "issues/${ID}/${DATE}.pdf"
  cp "${BASE}-${DATE}.docx" "issues/${ID}/${DATE}.docx"

  echo "→ record ledger"
  node record-issue.js "$ID"
done

echo "→ archive index"
node build-archive.js

echo "✓ done — editions: $(echo $IDS | tr '\n' ' ')"
