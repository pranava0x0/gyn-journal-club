// Warns if an edition's current issue repeats anything already published in a PRIOR issue of the
// SAME edition, per content/covered.<id>.json. Non-fatal: prints a report and exits 0.
// Run: node dedup-check.js <editionId>   (defaults to "gyn"; build.sh runs it per edition).
const editions = require("./content/editions");
const { itemsOf, loadCovered, matches } = require("./lib/ledger");

const id = process.argv[2] || "gyn";
const ed = editions.find((e) => e.id === id);
if (!ed) { console.error(`unknown edition: ${id}`); process.exit(1); }

const issue = ed.content;
const D = issue.meta.asOf;
const covered = loadCovered(id);
const items = itemsOf(issue);

const repeats = [];
for (const it of items) {
  const prior = covered.find((rec) => rec.firstIssue !== D && matches(rec, it));
  if (prior) repeats.push({ it, prior });
}

if (repeats.length === 0) {
  console.log(`✓ dedup [${id}]: no repeats — all ${items.length} items in ${D} are new vs the ledger (${covered.length} recorded).`);
  process.exit(0);
}

console.log(`✗ dedup [${id}]: ${repeats.length} item(s) in ${D} already appeared in a prior issue:`);
for (const { it, prior } of repeats) {
  console.log(`  • [${it.source}] "${(it.title || "").slice(0, 70)}…" — first published ${prior.firstIssue}. Swap before distributing.`);
}
console.log("  (build continues; warning, not a failure.)");
process.exit(0);
