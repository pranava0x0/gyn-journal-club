// Generates the homepage hub (root index.html): a list of journal clubs, each with its issues.
// Scans issues/<editionId>/<date>.{html,pdf,docx} and links Website / PDF / Word per issue.
const fs = require("fs");
const path = require("path");
const editions = require("./content/editions");

const root = path.join(__dirname, "issues");
const fmt = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US",
  { weekday: "long", year: "numeric", month: "long", day: "numeric" });

function clubSection(ed) {
  const dir = path.join(root, ed.id);
  let dates = [];
  if (fs.existsSync(dir)) {
    dates = [...new Set(fs.readdirSync(dir)
      .map((f) => (f.match(/^(\d{4}-\d{2}-\d{2})\./) || [])[1]).filter(Boolean))]
      .sort().reverse();
  }
  const has = (d, ext) => fs.existsSync(path.join(dir, `${d}.${ext}`));
  const rows = dates.map((d, i) => {
    const links = [
      has(d, "html") ? `<a href="issues/${ed.id}/${d}.html">Read online</a>` : "",
      has(d, "pdf") ? `<a href="issues/${ed.id}/${d}.pdf">PDF</a>` : "",
      has(d, "docx") ? `<a href="issues/${ed.id}/${d}.docx">Word</a>` : "",
    ].filter(Boolean).join(' <span class="dot">·</span> ');
    const badge = i === 0 ? '<span class="badge">Latest</span>' : "";
    return `        <li><span class="d">${fmt(d)} ${badge}</span><span class="lk">${links}</span></li>`;
  }).join("\n");
  const focus = ed.content.meta.blurb.split(".")[0] + ".";
  return `      <section class="club">
        <h2>${ed.content.meta.title}</h2>
        <p class="focus">${focus}</p>
        <ul>
${rows || '          <li class="empty">No issues yet.</li>'}
        </ul>
      </section>`;
}

const sections = editions.map(clubSection).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GYN Journal Clubs</title>
<meta name="description" content="A directory of monthly GYN journal-club issues — read online, or download PDF / Word.">
<style>
  :root{--accent:#16646E;--accent-dk:#0E454C;--ink:#1a1a1a;--muted:#5a6a6c;--rule:#dbe4e5;--bg:#f4f7f7;
    --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.6}
  a{color:var(--accent);font-weight:600;text-underline-offset:2px}
  a:focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:2px}
  .wrap{max-width:760px;margin:0 auto;padding:0 22px 52px}
  header{background:#fff;border-bottom:4px solid var(--accent)}
  header .wrap{padding:26px 22px 20px}
  h1{margin:0;font-size:31px;color:var(--accent-dk);font-weight:800;letter-spacing:-.01em}
  .tagline{margin-top:7px;color:var(--muted);font-size:15px}
  .club{margin-top:30px}
  h2{font-size:20px;color:var(--ink);margin:0 0 4px}
  .focus{margin:0 0 12px;color:var(--muted);font-size:14.5px}
  ul{list-style:none;margin:0;padding:0}
  li{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:baseline;
    background:#fff;border:1px solid var(--rule);border-left:4px solid var(--accent);border-radius:7px;
    padding:13px 16px;margin-bottom:10px}
  .d{font-weight:700}
  .badge{display:inline-block;background:var(--accent);color:#fff;font-size:11px;font-weight:800;
    letter-spacing:.05em;text-transform:uppercase;border-radius:20px;padding:1px 8px;margin-left:6px;vertical-align:1px}
  .lk{font-size:14.5px}
  .dot{color:var(--muted);margin:0 6px}
  .empty{color:var(--muted);font-style:italic}
  footer{max-width:760px;margin:0 auto;padding:0 22px;color:var(--muted);font-size:12.5px}
</style>
</head>
<body>
<header><div class="wrap">
  <h1>GYN Journal Clubs</h1>
  <div class="tagline">Monthly clinical journal clubs for OB/GYN &amp; Family Medicine. Pick a club, then an issue — read online or download the PDF / Word.</div>
</div></header>
<div class="wrap">
${sections}
</div>
<footer><div>Independent educational digests; not affiliated with or endorsed by the named journals or societies.</div></footer>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "index.html"), html);
console.log(`wrote index.html (hub · ${editions.length} journal clubs)`);
