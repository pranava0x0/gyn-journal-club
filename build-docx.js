// Builds an edition's newsletter as an editable .docx (content + theme from content/editions.js)
// Content comes from content/issue.js (single source of truth).
// Run: node build-docx.js <editionId>  -> writes "<base>-<date>.docx"
const fs = require("fs");
const editions = require("./content/editions");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, BorderStyle, WidthType,
  ShadingType, ExternalHyperlink, PageNumber, Footer,
} = require("docx");

// ---- non-brand palette ----
const INK = "1A1A1A", GRAY = "5A5A5A", RULE = "CCCCCC", TINT_GRAY = "F2F2F2";
const TINT_IMPL = "EEF4EC", IMPL = "3F6B2E", CAVEAT = "8A5A00";
const CONTENT_W = 9360; // US Letter, 1" margins

const id = process.argv[2] || "gyn";
const ed = editions.find((e) => e.id === id);
if (!ed) { console.error(`unknown edition: ${id}`); process.exit(1); }
const issue = ed.content;
const { meta, lead, articles, quickHits, disclaimer } = issue;
const OUT = `${ed.base}-${meta.asOf}.docx`;

// ---- brand palette (per-edition theme; UM red+gold defaults) ----
const T = meta.theme || {};
const RED = T.primary || "C8102E", RED_DK = T.primaryDk || "8A0B20",
      GOLD = T.accent || "FFD200", TINT_RED = T.tint || "FBEAEC";

// ---- builders ----
const label = (text, color) =>
  new TextRun({ text: text + "  ", bold: true, color, size: 18, allCaps: true });
const body = (runs) =>
  new Paragraph({ spacing: { after: 80 }, children: Array.isArray(runs) ? runs : [runs] });
const spacer = (h = 80) => new Paragraph({ spacing: { after: h }, children: [] });

function box(children, fill, borderColor) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: borderColor || RULE };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      borders: { top: b, bottom: b, left: b, right: b },
      shading: { fill, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 }, children,
    })] })],
  });
}

function sectionBar(text) {
  const none = { style: BorderStyle.NONE };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      borders: { top: none, bottom: none, left: none, right: none },
      shading: { fill: RED, type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 160, right: 160 },
      children: [new Paragraph({ children: [
        new TextRun({ text, bold: true, color: "FFFFFF", size: 22, allCaps: true }) ] })],
    })] })],
  });
}

function commentsBox(title, ph) {
  return box([
    new Paragraph({ spacing: { after: 40 }, children: [
      new TextRun({ text: title, bold: true, color: RED_DK, size: 17, allCaps: true }) ] }),
    new Paragraph({ children: [new TextRun({ text: ph, italics: true, color: GRAY, size: 19 })] }),
    new Paragraph({ children: [new TextRun({ text: " ", size: 19 })] }),
    new Paragraph({ children: [new TextRun({ text: " ", size: 19 })] }),
  ], TINT_GRAY, RED);
}

function sourceLine(url, lbl) {
  return new Paragraph({ spacing: { before: 40, after: 0 }, children: [
    new TextRun({ text: "Source: ", bold: true, size: 17, color: GRAY }),
    new ExternalHyperlink({ link: url, children: [new TextRun({ text: lbl, style: "Hyperlink", size: 17 })] }),
  ] });
}

function article(a, idx) {
  const out = [];
  out.push(new Paragraph({ spacing: { before: 200, after: 30 }, children: [
    new TextRun({ text: `${idx + 1}. `, bold: true, size: 24, color: RED_DK }),
    new TextRun({ text: a.title, bold: true, size: 24, color: INK }) ] }));
  out.push(new Paragraph({ spacing: { after: 100 }, children: [
    new TextRun({ text: a.source, bold: true, size: 17, color: RED, allCaps: true }),
    new TextRun({ text: "   " + a.meta, size: 17, color: GRAY, italics: true }) ] }));
  out.push(body([label("Core finding", RED_DK), new TextRun({ text: a.finding, size: 21, color: INK })]));
  out.push(box([new Paragraph({ children: [
    label("Clinical implications", IMPL), new TextRun({ text: a.implications, size: 21, color: INK }) ] })],
    TINT_IMPL, "CFE0C7"));
  out.push(spacer(40));
  out.push(box([new Paragraph({ children: [
    label("Paywall caveat", CAVEAT), new TextRun({ text: a.caveat, size: 21, color: INK }) ] })],
    "FBF4E5", "ECD9B6"));
  out.push(sourceLine(a.sourceUrl, a.sourceLabel));
  out.push(spacer(40));
  out.push(commentsBox("Discussion / Comments",
    "Click here to add your notes, questions, or how this changes your practice…"));
  return out;
}

// ---- assemble ----
const children = [];

children.push(new Paragraph({ spacing: { after: 0 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 6 } },
  children: [new TextRun({ text: meta.title.toUpperCase(), bold: true, size: 44, color: RED_DK })] }));
children.push(new Paragraph({ spacing: { before: 80, after: 20 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 4 } },
  children: [new TextRun({ text: meta.org, bold: true, size: 24, color: INK })] }));
children.push(new Paragraph({ spacing: { after: 40 }, children: [new TextRun({
  text: `Issue · ${meta.issueDate}   |   Sources as of ${meta.asOf}   |   ${meta.audience}`,
  size: 18, color: GRAY })] }));
children.push(new Paragraph({ spacing: { after: 160 }, children: [new TextRun({
  text: meta.byline, bold: true, size: 19, color: RED_DK })] }));

children.push(box([new Paragraph({ children: [new TextRun({ text: meta.blurb, size: 20, color: INK })] })],
  TINT_RED, RED));
children.push(spacer(60));

const resRuns = [new TextRun({ text: "Journal access & resources:  ", bold: true, size: 19, color: RED_DK })];
meta.resources.forEach((r, i) => {
  if (i) resRuns.push(new TextRun({ text: "   ·   ", size: 19, color: GRAY }));
  resRuns.push(new ExternalHyperlink({ link: r.url,
    children: [new TextRun({ text: r.label, style: "Hyperlink", size: 19 })] }));
});
children.push(new Paragraph({ spacing: { after: 60 }, children: resRuns }));
children.push(spacer(120));

children.push(sectionBar("The Lead Story · Big-Picture Trend"));
children.push(spacer(60));
children.push(new Paragraph({ spacing: { after: 80 },
  children: [new TextRun({ text: lead.title, bold: true, size: 28, color: RED_DK })] }));
children.push(body([new TextRun({ text: lead.body, size: 21, color: INK })]));
children.push(box([new Paragraph({ children: [
  new TextRun({ text: "Why it matters at the bedside:  ", bold: true, size: 21, color: RED_DK }),
  new TextRun({ text: lead.why, size: 21, color: INK }) ] })], TINT_RED, RED));
children.push(sourceLine(lead.sourceUrl, lead.sourceLabel));
children.push(spacer(140));

children.push(sectionBar("The Breakdown · Article Summaries"));
articles.forEach((a, i) => article(a, i).forEach((el) => children.push(el)));
children.push(spacer(160));

children.push(sectionBar("Quick Hits · Emerging Data on the Radar"));
children.push(spacer(60));
const qhGrouped = quickHits.some((q) => q.group);
const qhGroups = qhGrouped
  ? [...new Set(quickHits.map((q) => q.group))].map((l) => ({ label: l, items: quickHits.filter((q) => q.group === l) }))
  : [{ label: null, items: quickHits }];
qhGroups.forEach((g) => {
  if (g.label) children.push(new Paragraph({ spacing: { before: 120, after: 50 },
    children: [new TextRun({ text: g.label, bold: true, size: 19, color: RED_DK, allCaps: true })] }));
  g.items.forEach((q) => {
    children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 30 },
      children: [
        new TextRun({ text: `[${q.src}]  `, bold: true, size: 20, color: RED }),
        new TextRun({ text: q.text, size: 20, color: INK }) ] }));
    children.push(new Paragraph({ spacing: { after: 70 }, indent: { left: 460 }, children: [
      new ExternalHyperlink({ link: q.url, children: [new TextRun({ text: "View source", style: "Hyperlink", size: 17 })] }) ] }));
  });
});
children.push(spacer(80));

children.push(commentsBox("Journal Club Discussion Notes", "Action items, group consensus, follow-ups…"));
children.push(spacer(120));

children.push(box([new Paragraph({ children: [
  new TextRun({ text: "Editorial note & limitations.  ", bold: true, size: 17, color: CAVEAT }),
  new TextRun({ text: disclaimer, size: 17, color: INK }) ] })], "FBF4E5", "ECD9B6"));

// ---- document ----
const doc = new Document({
  creator: meta.org, title: `${meta.title}${meta.brandTag ? " — " + meta.brandTag : ""} — ${meta.issueDate}`,
  styles: { default: { document: { run: { font: "Calibri", size: 21, color: INK } } } },
  numbering: { config: [{ reference: "bullets",
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 460, hanging: 260 } } } }] }] },
  sections: [{
    properties: { page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: `${meta.byline} · Page `, size: 16, color: GRAY }),
      new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRAY }) ] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log(`wrote ${OUT} (${buf.length} bytes) [${id}]`);
});
