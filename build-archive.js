// Generates issues/index.html — an archive listing every past issue of every edition.
// Scans issues/<editionId>/<date>.html and links the html/pdf/docx for each date.
const fs = require("fs");
const path = require("path");
const editions = require("./content/editions");

const root = path.join(__dirname, "issues");
const fmt = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US",
  { weekday: "long", year: "numeric", month: "long", day: "numeric" });

function sectionFor(ed) {
  const dir = path.join(root, ed.id);
  let dates = [];
  if (fs.existsSync(dir)) {
    dates = [...new Set(fs.readdirSync(dir)
      .map((f) => (f.match(/^(\d{4}-\d{2}-\d{2})\./) || [])[1]).filter(Boolean))]
      .sort().reverse();
  }
  const has = (d, ext) => fs.existsSync(path.join(dir, `${d}.${ext}`));
  const rows = dates.map((d) => {
    const links = [
      has(d, "html") ? `<a href="${ed.id}/${d}.html">Website</a>` : "",
      has(d, "pdf") ? `<a href="${ed.id}/${d}.pdf">PDF</a>` : "",
      has(d, "docx") ? `<a href="${ed.id}/${d}.docx">Word</a>` : "",
    ].filter(Boolean).join(' <span class="dot">·</span> ');
    return `      <li><span class="d">${fmt(d)}</span><span class="lk">${links}</span></li>`;
  }).join("\n");
  return `    <h2>${ed.content.meta.title}</h2>\n    <ul>\n${rows || '      <li class="empty">No issues yet.</li>'}\n    </ul>`;
}

const sections = editions.map(sectionFor).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GYN Journal Clubs — Past Issues</title>
<style>
  :root{--red:#C8102E;--red-dk:#8A0B20;--gold:#FFD200;--ink:#1a1a1a;--muted:#5a5a5a;--rule:#d8d8d8;--bg:#f5f4f3;
    --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.6}
  a{color:var(--red);font-weight:600}
  .wrap{max-width:760px;margin:0 auto;padding:0 22px 48px}
  header{background:#fff;border-bottom:4px solid var(--red);box-shadow:0 3px 0 0 var(--gold)}
  header .wrap{padding:22px 22px 18px}
  h1{margin:0;font-size:30px;color:var(--red-dk);font-weight:800}
  .org{margin-top:6px;font-weight:700}
  h2{font-size:18px;color:var(--ink);margin:30px 0 10px;border-bottom:1px solid var(--rule);padding-bottom:6px}
  ul{list-style:none;margin:0;padding:0}
  li{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:baseline;
    background:#fff;border:1px solid var(--rule);border-left:4px solid var(--red);border-radius:6px;
    padding:12px 15px;margin-bottom:10px}
  .d{font-weight:700}
  .lk{font-size:14.5px}
  .dot{color:var(--muted);margin:0 6px}
  .empty{color:var(--muted);font-style:italic}
</style>
</head>
<body>
<header><div class="wrap">
  <h1>GYN Journal Clubs</h1>
  <div class="org">Past Issues</div>
</div></header>
<div class="wrap">
${sections}
</div>
</body>
</html>
`;

if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true });
fs.writeFileSync(path.join(root, "index.html"), html);
console.log(`wrote issues/index.html (${editions.length} edition${editions.length === 1 ? "" : "s"})`);
