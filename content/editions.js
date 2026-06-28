// Registry of newsletter editions (journal clubs). Each edition is one content file rendered into
// all three formats and tracked by its own no-repeat ledger (content/covered.<id>.json).
// Each issue's web page is written to issues/<id>/<date>.html; the homepage hub (index.html) lists them.
// `base` is the download-filename prefix. To add a club: write content/<name>.js + add a row here.
module.exports = [
  {
    id: "gyn",
    content: require("./issue"),
    base: "GYN-Journal-Club",
  },
  {
    id: "benign-surgery",
    content: require("./benign-surgery"),
    base: "Benign-GynSurg-Journal-Club",
  },
];
