// Registry of newsletter editions. Each edition is one content file rendered into all three
// formats and tracked by its own no-repeat ledger (content/covered.<id>.json).
// To add an edition: write content/<name>.js (same shape as issue.js) and add a row here.
module.exports = [
  {
    id: "gyn",
    content: require("./issue"),
    html: "index.html",
    base: "GYN-Journal-Club",
  },
  {
    id: "benign-surgery",
    content: require("./benign-surgery"),
    html: "benign-gyn-surgery.html",
    base: "Benign-GynSurg-Journal-Club",
  },
];
