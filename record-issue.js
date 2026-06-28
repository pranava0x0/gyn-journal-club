// Records an edition's current items into content/covered.<id>.json so future months won't
// repeat them. Idempotent. Run: node record-issue.js <editionId>   (build.sh runs it per edition).
const editions = require("./content/editions");
const { itemsOf, loadCovered, saveCovered, matches } = require("./lib/ledger");

const id = process.argv[2] || "gyn";
const ed = editions.find((e) => e.id === id);
if (!ed) { console.error(`unknown edition: ${id}`); process.exit(1); }

const issue = ed.content;
const D = issue.meta.asOf;
const covered = loadCovered(id);
const items = itemsOf(issue);

let added = 0;
for (const it of items) {
  if (covered.some((rec) => matches(rec, it))) continue;
  covered.push({ firstIssue: D, source: it.source, title: it.title, url: it.url, tkey: it.tkey, urlkey: it.urlkey });
  added++;
}

saveCovered(id, covered);
console.log(`ledger [${id}]: +${added} new, ${covered.length} total (issue ${D}).`);
