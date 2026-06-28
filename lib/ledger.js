// Shared helpers for the "no-repeat" ledger that keeps monthly issues from recycling articles.
// The ledger (content/covered.json) records every item ever published, keyed by a normalized
// title and its source URL, with the issue (asOf date) it first appeared in.
const fs = require("fs");
const path = require("path");

// Each edition has its own ledger so the two newsletters track independently:
//   content/covered.gyn.json, content/covered.benign-surgery.json
const coveredPath = (editionId) =>
  path.join(__dirname, "..", "content", `covered.${editionId}.json`);

// normalize a title/text to a stable comparison key
const norm = (s) =>
  String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// every dedup-able item in an issue: the lead, each breakdown article, each quick hit
function itemsOf(issue) {
  const out = [];
  if (issue.lead) {
    out.push({ kind: "lead", title: issue.lead.title, url: issue.lead.sourceUrl, source: "Lead Story" });
  }
  (issue.articles || []).forEach((a) =>
    out.push({ kind: "article", title: a.title, url: a.sourceUrl, source: a.source }));
  (issue.quickHits || []).forEach((q) =>
    out.push({ kind: "quickhit", title: q.text, url: q.url, source: q.src }));
  return out.map((it) => ({ ...it, tkey: norm(it.title), urlkey: norm(it.url) }));
}

function loadCovered(editionId) {
  const p = coveredPath(editionId);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch { return []; }
}

function saveCovered(editionId, records) {
  fs.writeFileSync(coveredPath(editionId), JSON.stringify(records, null, 2) + "\n");
}

// does a ledger record match an item? (same normalized title OR same URL)
const matches = (rec, it) =>
  (it.tkey && rec.tkey === it.tkey) || (it.urlkey && rec.urlkey === it.urlkey);

module.exports = { coveredPath, norm, itemsOf, loadCovered, saveCovered, matches };
