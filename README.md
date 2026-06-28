# GYN Journal Clubs

**Monthly**, clinically-rigorous journal-club newsletters for OB/GYN and Family Medicine colleagues.
There are two **editions**, each its own content file rendered into three formats:

| Edition | Content file | Website | Focus |
|---|---|---|---|
| **GYN** (general) | `content/issue.js` | `index.html` | Broad gynecology — screening, menopause, medical + procedural |
| **Benign GYN Surgery** | `content/benign-surgery.js` | `benign-gyn-surgery.html` | MIS hysterectomy, endometriosis, fibroids, prolapse, perioperative |

Source priority: **JMIG**, the **Green Journal** (Obstetrics & Gynecology), and **Menopause** (The Menopause
Society); issues also scan **AJOG** (Gray Journal), **JAMA**, **NEJM**, **AAGL**, and **AAFP** for current
content. (There is no "White Journal" in OB/GYN; the recognized color names are Green = Obstet Gynecol and
Gray = AJOG.) The author/distributor byline is the `byline` field in each content file (also editable directly
in the Word doc).

Every issue is produced in **three formats from one content source** — a website, an exportable PDF, and an
exportable Word file. Edit content in **one place** per edition; all three regenerate identically (no drift).

## Editions → three outputs each

```
content/editions.js   ← registry of editions (id, content file, html name, output basename)
content/issue.js            content/benign-surgery.js     ← EDIT CONTENT HERE ONLY
   │                              │
   ├─ build-web.js  → index.html │  ├─ build-web.js  → benign-gyn-surgery.html      (website)
   ├─ Chrome        → ...gyn.pdf │  ├─ Chrome        → ...benign...pdf              (PDF)
   └─ build-docx.js → ...gyn.docx│  └─ build-docx.js → ...benign...docx             (Word)
```

Build **all editions, all formats** at once:

```bash
./build.sh                 # builds every edition in content/editions.js
node build-web.js <id>     # rebuild one edition's website (id = gyn | benign-surgery)
```

**Add a new edition:** write `content/<name>.js` (copy an existing one's shape), add a row to
`content/editions.js`, and run `./build.sh`. No other changes needed.

Requirements: Node.js (with the local `docx` dependency, already installed) and Google Chrome (for the PDF).

## Issue structure

1. **The Lead Story / Big-Picture Trend** — the single most practice-impactful trend, with a "why it matters
   at the bedside" line.
2. **The Breakdown** — per article: *Core Finding*, *Clinical Implications*, *Paywall Caveat*, a source link,
   and an **editable Discussion / Comments box**.
3. **Quick Hits** — 2–3 more titles worth tracking, each with a source link.
4. A closing **Journal Club Discussion Notes** box + editorial-limitations disclaimer.

## Comments boxes

- **Word & PDF:** shaded boxes you write into directly (Word) or fill before printing (PDF).
- **Website:** the boxes are `contenteditable` — type in the browser, then print/save as PDF to capture your
  notes. They are *not* saved to a server (static site by design); export for a persistent record.

## Editorial rules (locked)

- Every item carries its source link and a capture date ("as of YYYY-MM-DD").
- Abstract-only or unretrieved full texts are flagged with a concrete list of what to verify.
- **Synthesis, not guidance** — findings must be checked against primary sources and society guidelines before
  changing practice. AI-synthesized summaries are provisional until full texts are reviewed.
- Facts, clinical implications, and caveats stay in separate lanes.

## Monthly update workflow

1. Paste new article titles / abstracts / news snippets into the chat (paywalled is fine — note it).
2. Claude auto-sources recent GYN articles from the priority journals plus AJOG / JAMA / NEJM / AAFP.
3. Bump `meta.asOf` + `meta.issueDate` and replace the articles in `content/issue.js`, then run `./build.sh`.
   The build **checks the no-repeat ledger first** and warns if anything was already covered. Archive copies
   land in `issues/YYYY-MM-DD.{html,pdf,docx}` automatically.

## No-repeat ledger (so monthly issues never recycle articles)

Each edition keeps its **own** append-only ledger — `content/covered.<id>.json` (e.g. `covered.gyn.json`,
`covered.benign-surgery.json`) — recording every item ever published in that edition (the lead, every
breakdown article, every quick hit), keyed by normalized title **and** source URL, tagged with the issue
(`asOf` date) it first appeared in. The two editions are independent: the same article may appear in both.

- `./build.sh` runs **`dedup-check.js`** before building: if the current issue repeats anything from a prior
  issue, it prints which items and which past issue they came from. It's a *warning*, not a failure — swap
  the flagged items, then rebuild.
- After a successful build it runs **`record-issue.js`**, which adds the current issue's items to the ledger
  (idempotent — rebuilding the same issue never double-records, and an item keeps its original `firstIssue`).
- Run the check on its own any time: `node dedup-check.js <id>`.

So next month: change the date and articles, run `./build.sh`, and any accidental repeat is caught before it
ships. Do **not** hand-edit the `content/covered.<id>.json` files (they're the source of truth for what's
been covered).

## Design

Each edition has its own neutral color theme via `meta.theme` (GYN = teal, Benign Surgery = navy), on a clean
institutional sans (system fonts, zero web-font requests). Mobile-first (tested to 375px) and print-friendly:
in PDF, each breakdown article starts on its own page (room to write under each comment box). Independent
educational digests; not affiliated with or endorsed by the named journals or societies.

## Files

- `content/editions.js` — edition registry
- `content/issue.js`, `content/benign-surgery.js` — content (single source of truth per edition)
- `content/covered.<id>.json` — per-edition no-repeat ledgers (generated; don't hand-edit)
- `build-web.js`, `build-docx.js`, `build-archive.js`, `build.sh` — generators
- `dedup-check.js`, `record-issue.js`, `lib/ledger.js` — no-repeat machinery
- `index.html`, `benign-gyn-surgery.html`, `*.pdf`, `*.docx` — generated outputs
- `issues/<id>/<date>.*` + `issues/index.html` — archive
- `security.md` — supply-chain advisory sweep cache
- `.claude/launch.json` — local preview server config
