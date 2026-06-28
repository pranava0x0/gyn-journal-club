// Generates the static website (index.html) from content/issue.js.
// The same file is the print source for the PDF (build-pdf.sh).
// Run: node build-web.js
const fs = require("fs");
const path = require("path");
const editions = require("./content/editions");

const id = process.argv[2] || "gyn";
const ed = editions.find((e) => e.id === id);
if (!ed) { console.error(`unknown edition: ${id}`); process.exit(1); }
const issue = ed.content;

// Per-edition color theme (defaults = UM red + gold). De-branded editions override via meta.theme.
const T = issue.meta.theme || {};
const C = {
  primary: T.primary || "C8102E", primaryDk: T.primaryDk || "8A0B20", accent: T.accent || "FFD200",
  tint: T.tint || "FBEAEC", tintLine: T.tintLine || "F0C9CF",
};

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { meta, lead, articles, quickHits, disclaimer } = issue;

const resourceLinks = meta.resources
  .map((r) => `<a href="${r.url}">${esc(r.label)}</a>`)
  .join('<span class="dot">·</span>');

const tagHtml = (tags = []) =>
  tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");

const commentsBox = (idPrefix, label = "Discussion / Comments",
  ph = "Click and type to add your notes, questions, or how this changes your practice…") => `
      <div class="comments">
        <div class="comments-label">${esc(label)}</div>
        <div class="comments-body" contenteditable="true" role="textbox" aria-multiline="true"
             aria-label="${esc(label)}" data-ph="${esc(ph)}"></div>
      </div>`;

const articleHtml = (a, i) => `
    <article class="card">
      <h3>${i + 1}. ${esc(a.title)}</h3>
      <div class="meta"><span class="lane">${esc(a.source)}</span> ${tagHtml(a.tags)}
        <span class="metatxt">${esc(a.meta)}</span></div>
      <div class="row"><span class="label">Core finding</span>${esc(a.finding)}</div>
      <div class="row impl"><span class="label">Clinical implications</span>${esc(a.implications)}</div>
      <div class="row caveat"><span class="label">Paywall caveat</span>${esc(a.caveat)}</div>
      <div class="src">Source: <a href="${a.sourceUrl}">${esc(a.sourceLabel)}</a></div>
      ${commentsBox("a" + i)}
    </article>`;

const quickHitHtml = (q) => `
      <li>
        <div class="hn"><span class="qsrc">[${esc(q.src)}]</span> ${esc(q.text)}</div>
        <div class="src"><a href="${q.url}">View source</a></div>
      </li>`;

// Render quick hits flat, or in labeled groups if any item has a `group`.
const renderQuickHits = (items) => {
  if (!items.some((q) => q.group)) {
    return `<ul class="hits">${items.map(quickHitHtml).join("")}</ul>`;
  }
  const labels = [...new Set(items.map((q) => q.group))];
  return labels.map((l) =>
    `<div class="hitgroup">${esc(l)}</div><ul class="hits">` +
    items.filter((q) => q.group === l).map(quickHitHtml).join("") + `</ul>`
  ).join("");
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}${meta.brandTag ? " — " + esc(meta.brandTag) : ""} · ${esc(meta.issueDate)}</title>
<meta name="description" content="${esc(meta.blurb)}">
<style>
  :root{
    --red:#${C.primary};      /* edition primary */
    --red-dk:#${C.primaryDk}; /* deep primary — headings */
    --gold:#${C.accent};      /* secondary accent rule */
    --ink:#1a1a1a;
    --muted:#5a5a5a;
    --rule:#d8d8d8;
    --bg:#f5f4f3;
    --paper:#ffffff;
    --red-tint:#${C.tint};
    --red-line:#${C.tintLine};
    --impl:#3f6b2e; --impl-tint:#eef4ec; --impl-line:#d3e3cb;
    --caveat:#8a5a00; --caveat-tint:#fbf4e5; --caveat-line:#ecd9b6;
    --gray-tint:#f2f2f2;
    --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    --maxw:820px;
  }
  *{box-sizing:border-box}
  [hidden]{display:none}
  html{-webkit-text-size-adjust:100%}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);
    font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
  a{color:var(--red);text-underline-offset:2px}
  a:focus-visible,[contenteditable]:focus-visible{outline:3px solid var(--red);outline-offset:2px;border-radius:2px}

  .utility{background:var(--red-dk);color:#f6dcdf;font-size:12.5px;letter-spacing:.04em}
  .utility .wrap{max-width:var(--maxw);margin:0 auto;padding:7px 22px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .utility strong{color:#fff;font-weight:700;letter-spacing:.12em;text-transform:uppercase}

  .masthead{background:var(--paper);border-bottom:4px solid var(--red)}
  .goldrule{height:3px;background:var(--gold)}
  .masthead .wrap{max-width:var(--maxw);margin:0 auto;padding:22px 22px 16px}
  .masthead h1{margin:0;font-size:38px;letter-spacing:-.01em;color:var(--red-dk);font-weight:800;line-height:1}
  .masthead .org{margin-top:8px;font-size:17px;font-weight:700;color:var(--ink)}
  .masthead .dl{margin-top:6px;font-size:12.5px;color:var(--muted)}
  .masthead .byline{margin-top:7px;font-size:13px;font-weight:700;color:var(--red-dk)}

  main{max-width:var(--maxw);margin:0 auto;padding:18px 22px 40px}

  .blurb{background:var(--red-tint);border:1px solid var(--red-line);border-left:5px solid var(--red);
    border-radius:8px;padding:14px 16px;font-size:15.5px}
  .resources{margin:14px 2px 0;font-size:14.5px}
  .resources b{color:var(--red-dk)}
  .resources a{font-weight:600;white-space:nowrap}
  .resources .dot{color:var(--muted);margin:0 9px}

  .barhead{margin:30px 0 14px;background:var(--red);color:#fff;border-radius:4px;
    padding:7px 13px;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}

  .lead{background:linear-gradient(180deg,var(--red-tint),#fff);border:1px solid var(--red-line);
    border-left:6px solid var(--red);border-radius:8px;padding:18px 20px}
  .lead h2{margin:0 0 8px;font-size:24px;line-height:1.22;color:var(--red-dk);letter-spacing:-.01em}
  .lead p{margin:8px 0 0}
  .lead .why{margin-top:13px;padding-top:12px;border-top:1px dashed var(--red-line);font-size:15.5px}
  .lead .why b{color:var(--red-dk)}
  .lead .src{margin-top:11px;font-size:12.5px}

  .card{background:var(--paper);border:1px solid var(--rule);border-radius:8px;padding:18px 20px;margin-bottom:16px}
  .card h3{margin:0 0 6px;font-size:19px;line-height:1.28;color:var(--ink)}
  .meta{font-size:12.5px;color:var(--muted);margin-bottom:12px}
  .meta .lane{color:var(--red);font-weight:800;text-transform:uppercase;letter-spacing:.03em;font-size:11.5px}
  .meta .tag{display:inline-block;background:var(--red-tint);color:var(--red-dk);border:1px solid var(--red-line);
    border-radius:20px;padding:1px 9px;font-weight:700;font-size:11px;margin:0 4px;vertical-align:1px}
  .meta .metatxt{font-style:italic}
  .row{margin:9px 0}
  .label{display:inline-block;font-weight:800;font-size:11px;letter-spacing:.08em;text-transform:uppercase;
    color:var(--red-dk);margin-right:6px}
  .row.impl{background:var(--impl-tint);border:1px solid var(--impl-line);border-radius:6px;padding:10px 12px}
  .row.impl .label{color:var(--impl)}
  .row.caveat{background:var(--caveat-tint);border:1px solid var(--caveat-line);border-radius:6px;padding:10px 12px}
  .row.caveat .label{color:var(--caveat)}
  .src{font-size:12.5px;margin-top:11px}
  .src a{font-weight:600}

  .comments{margin-top:13px;background:var(--gray-tint);border:1px solid var(--red);border-radius:7px;padding:11px 13px}
  .comments-label{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--red-dk);margin-bottom:6px}
  .comments-body{min-height:64px;background:#fff;border:1px dashed var(--rule);border-radius:5px;padding:8px 10px;font-size:14.5px;line-height:1.55}
  .comments-body:empty::before{content:attr(data-ph);color:var(--muted);font-style:italic}

  .hitgroup{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--red-dk);margin:16px 0 8px}
  .hits{list-style:none;margin:0;padding:0}
  .hits li{background:var(--paper);border:1px solid var(--rule);border-left:4px solid var(--red);
    border-radius:6px;padding:12px 15px;margin-bottom:10px}
  .hits .hn{font-size:14.5px}
  .hits .qsrc{font-weight:800;color:var(--red)}
  .hits .src{margin-top:5px}

  footer{border-top:3px solid var(--red);margin-top:34px;background:var(--paper)}
  footer .wrap{max-width:var(--maxw);margin:0 auto;padding:18px 22px 32px}
  .disclaimer{background:var(--caveat-tint);border:1px solid var(--caveat-line);border-radius:7px;
    padding:12px 14px;font-size:13px;color:#5a4218;line-height:1.55}
  .disclaimer b{color:var(--caveat)}
  .colophon{font-size:12.5px;color:var(--muted);margin-top:14px;line-height:1.6}
  .note{font-size:12px;color:var(--muted);margin-top:6px;font-style:italic}

  @media (max-width:560px){
    body{font-size:16px}
    .masthead h1{font-size:30px}
    .lead h2{font-size:20px}
    .card h3{font-size:17px}
    main{padding:16px}
    .masthead .wrap,.utility .wrap,footer .wrap{padding-left:16px;padding-right:16px}
    .resources a{white-space:normal}
  }

  /* ---- print / PDF ---- */
  @page{size:Letter;margin:14mm 16mm}
  @media print{
    :root{--bg:#fff}
    body{background:#fff;font-size:10.5pt;line-height:1.42}
    .utility{display:none}
    a{color:#000;text-decoration:none}
    .masthead{border-bottom-width:4px}
    main{padding:0;max-width:none}
    .card,.lead,.hits li,.blurb,.comments{break-inside:avoid}
    .card + .card{break-before:page}   /* each breakdown article starts on its own page */
    .barhead{break-after:avoid}
    .comments-body{min-height:54px}
    *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  }
</style>
</head>
<body>

<div class="utility"><div class="wrap">
  <span><strong>${esc(meta.title)}</strong>${meta.brandTag ? " · " + esc(meta.brandTag) : ""}</span>
  <span>${esc(meta.audience)}</span>
</div></div>

<header class="masthead"><div class="wrap">
  <h1>${esc(meta.title)}</h1>
  <div class="org">${esc(meta.org)}</div>
  <div class="dl">Issue · ${esc(meta.issueDate)} &nbsp;|&nbsp; Sources as of ${esc(meta.asOf)} &nbsp;|&nbsp; ${esc(meta.audience)}</div>
  <div class="byline">${esc(meta.byline)}</div>
</div></header>
<div class="goldrule" aria-hidden="true"></div>

<main>
  <div class="blurb">${esc(meta.blurb)}</div>
  <div class="resources"><b>Journal access &amp; resources:</b> ${resourceLinks}</div>

  <div class="barhead">The Lead Story · Big-Picture Trend</div>
  <section class="lead">
    <h2>${esc(lead.title)}</h2>
    <p>${esc(lead.body)}</p>
    <p class="why"><b>Why it matters at the bedside:</b> ${esc(lead.why)}</p>
    <div class="src">Source: <a href="${lead.sourceUrl}">${esc(lead.sourceLabel)}</a></div>
  </section>

  <div class="barhead">The Breakdown · Article Summaries</div>
  ${articles.map(articleHtml).join("")}

  <div class="barhead">Quick Hits · Emerging Data on the Radar</div>
  ${renderQuickHits(quickHits)}

  ${commentsBox("notes", "Journal Club Discussion Notes", "Action items, group consensus, follow-ups…")}
  <p class="note">Comment boxes are editable in the browser and are captured when you print or save as PDF. They are not saved on a server — for a persistent record, print/export after writing.</p>
</main>

<footer><div class="wrap">
  <div class="disclaimer"><b>Editorial note &amp; limitations.</b> ${esc(disclaimer)}</div>
  <div class="colophon">
    <b>${esc(meta.byline)}.</b><br>
    ${esc(meta.title)} — ${esc(meta.org)}. Compiled ${esc(meta.issueDate)}. Sources captured ${esc(meta.asOf)}.<br>
    Available as website, PDF, and Word — all generated from one content source.
  </div>
</div></footer>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, ed.html), html);
console.log(`wrote ${ed.html} (${html.length} bytes) [${id}]`);
