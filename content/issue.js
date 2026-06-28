// Single source of truth for the current issue.
// Consumed by build-web.js (website + PDF) and build-docx.js (Word).
// Edit content HERE only — never in the generated index.html / .docx.

module.exports = {
  meta: {
    title: "GYN Journal Club",
    org: "An independent monthly women’s health journal club",
    issueDate: "Friday, June 27, 2026",
    asOf: "2026-06-27",
    audience: "For OB/GYN & Family Medicine colleagues",
    brandTag: "", // de-branded edition — no institutional tag in the utility bar / page title
    // Per-edition color theme (de-branded — neutral teal, no University of Maryland palette).
    theme: { primary: "16646E", primaryDk: "0E454C", accent: "4E9AA4", tint: "EAF4F5", tintLine: "C9E2E5" },
    // Author/distributor byline — EDIT THIS to your name/title. Shows in the masthead + footer
    // of all three formats. (You can also just edit the Word doc directly before sending.)
    byline: "Compiled & distributed by Pooja Uppalapati, MD, MBA",
    blurb:
      "A clinical digest for OB/GYN and Family Medicine colleagues. Each issue " +
      "distills practice-relevant gynecology — medical and surgical, including urogynecology — from the leading " +
      "US and European journals into bedside takeaways, with space after every article for your own notes and " +
      "group discussion.",
    // US + European sources scanned each issue.
    resources: [
      { label: "JMIG", url: "https://www.jmig.org" },
      { label: "Obstetrics & Gynecology (Green)", url: "https://journals.lww.com/greenjournal" },
      { label: "AJOG (Gray)", url: "https://www.ajog.org" },
      { label: "BJOG", url: "https://obgyn.onlinelibrary.wiley.com/journal/14710528" },
      { label: "Human Reproduction", url: "https://academic.oup.com/humrep" },
      { label: "Eur J Obstet Gynecol (EJOG)", url: "https://www.ejog.org" },
      { label: "Menopause", url: "https://journals.lww.com/menopausejournal" },
      { label: "EMAS (Eur Menopause)", url: "https://www.emas-online.org" },
      { label: "JAMA", url: "https://jamanetwork.com/journals/jama" },
      { label: "NEJM", url: "https://www.nejm.org" },
      { label: "NICE", url: "https://www.nice.org.uk" },
      { label: "AAFP / Am Fam Physician", url: "https://www.aafp.org/pubs/afp.html" },
    ],
  },

  lead: {
    title: "Non-hormonal hot-flash therapy comes of age: NK-receptor antagonists reshape menopause care",
    body:
      "Menopause care now has a mechanism-based, hormone-free option class. Elinzanetant (Lynkuet, Bayer) " +
      "is FDA-approved as the first dual NK1/NK3 receptor antagonist for moderate-to-severe vasomotor symptoms, " +
      "joining the NK3 antagonist fezolinetant (Veozah). Across the OASIS phase-3 program, treatment cut " +
      "moderate-to-severe hot-flash frequency by roughly 74% by week 12, with parallel gains in sleep and " +
      "quality of life — and OASIS-4 extends the evidence to women on endocrine therapy for HR+ breast cancer.",
    why:
      "this is a real answer for patients who can’t or won’t take estrogen — breast cancer survivors, " +
      "those with VTE risk, or anyone who declines MHT. Practical caveats decide uptake: fezolinetant carries a " +
      "hepatotoxicity boxed warning requiring LFT monitoring, both agents need cost/prior-authorization navigation, " +
      "and counseling should set expectations (partial, not complete, VMS relief). Know which option fits which " +
      "patient before the visit.",
    sourceUrl: "https://www.pharmacytimes.com/view/fda-approves-elinzanetant-as-first-nonhormonal-therapy-for-menopause-vasomotor-symptoms",
    sourceLabel: "FDA approval coverage (Pharmacy Times)",
  },

  articles: [
    {
      source: "Menopause Society · Menopause",
      tags: ["Phase 3 RCT", "Abstract only"],
      title: "Elinzanetant for vasomotor symptoms in women on endocrine therapy for HR+ breast cancer (OASIS-4)",
      meta: "Phase 3 RCT · abstract / coverage only",
      finding:
        "The dual NK1/NK3 receptor antagonist elinzanetant significantly reduced the frequency and severity of " +
        "moderate-to-severe vasomotor symptoms versus placebo in women taking adjuvant endocrine therapy for " +
        "hormone-receptor–positive breast cancer.",
      implications:
        "Gives GYN and oncology a mechanism-based, hormone-free option for the population in whom systemic MHT is " +
        "contraindicated. Coordinate with oncology, and use it as a concrete alternative to SSRIs/SNRIs or gabapentin " +
        "when those fail or aren’t tolerated.",
      caveat:
        "Verify the absolute placebo-adjusted VMS reduction, durability beyond 12 weeks, the hepatic/adverse-event " +
        "profile in this group, and whether tamoxifen vs aromatase-inhibitor subgroups differed.",
      sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0960977626001220",
      sourceLabel: "NK pathway antagonists in breast cancer (ScienceDirect)",
    },
    {
      source: "Green Journal · Obstetrics & Gynecology",
      tags: ["Cross-sectional", "Abstract only"],
      title: "National acceptability and preference for HPV self-collection",
      meta: "Cross-sectional · ACOG ACSM late-breaker (May 1–3, 2026) · abstract only",
      finding:
        "In a nationally representative sample of US women 21–49, 71.5% were open to HPV self-collection and " +
        "42.9% preferred it over clinician collection — with acceptability reaching ~9.7 million under- or " +
        "never-screened women.",
      implications:
        "Offer self-collection proactively to patients overdue for screening or who decline pelvic exams (trauma " +
        "history, disability, cultural barriers). Demand for an alternative route is now a majority position; build " +
        "the mail-out and in-clinic workflow now.",
      caveat:
        "Verify the weighted sampling frame, exact item wording (“open to” vs “prefer”), whether " +
        "preference held across age/race/insurance strata, and any data linking stated intent to actual uptake.",
      sourceUrl: "https://www.patientcareonline.com/view/more-than-7-in-10-us-women-open-to-hpv-self-collection-for-cervical-cancer-screening-new-study-shows",
      sourceLabel: "Study coverage (Patient Care Online)",
    },
    {
      source: "NICE · UK guideline (Europe)",
      tags: ["Guideline", "Medical management"],
      title: "LNG-IUS as first-line medical therapy for heavy menstrual bleeding (NICE)",
      meta: "NICE guideline NG88 · UK · medical management",
      finding:
        "NICE recommends the 52 mg levonorgestrel-releasing intrauterine system (LNG-IUS) as the first-choice " +
        "treatment for heavy menstrual bleeding when there is no identified pathology, fibroids <3 cm not distorting " +
        "the cavity, or adenomyosis.",
      implications:
        "Reach for the LNG-IUS before tranexamic acid/NSAIDs or surgery in eligible patients — it outperforms other " +
        "medical options and reduces ablation/hysterectomy referrals. Set expectations on the 3–6 month spotting " +
        "settling-in period up front to protect continuation.",
      caveat:
        "Confirm current NICE wording and the cavity-size/pathology criteria, and that structural causes (polyp, " +
        "larger/submucosal fibroid, malignancy) are excluded first. UK guidance — reconcile with US (ACOG) framing " +
        "where they differ.",
      sourceUrl: "https://www.nice.org.uk/guidance/ng88",
      sourceLabel: "NICE NG88 — heavy menstrual bleeding",
    },
    {
      source: "JMIG · J. Minimally Invasive Gynecology",
      tags: ["Register-based RCT", "Abstract only"],
      title: "Opportunistic salpingectomy for ovarian-cancer risk reduction (SALSTER; HOPPSA)",
      meta: "Register-based randomized trials · abstract only",
      finding:
        "In SALSTER, opportunistic salpingectomy at laparoscopic sterilisation did not raise peri- or postoperative " +
        "complications beyond the pre-defined non-inferiority margin through 8 weeks; HOPPSA evaluates the same approach " +
        "added to benign hysterectomy.",
      implications:
        "Supports routinely offering opportunistic salpingectomy at sterilisation and benign pelvic surgery as a safe " +
        "ovarian-cancer-risk-reduction strategy. Add it to surgical consent and counseling for patients who have " +
        "completed childbearing.",
      caveat:
        "Verify the exact complication rates and margin, added operative time/blood loss, and note that the long-term " +
        "ovarian-cancer-incidence endpoint is still maturing — risk reduction is inferred, not yet proven by these trials.",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11838100/",
      sourceLabel: "SALSTER trial (PMC)",
    },
    {
      source: "eClinicalMedicine · Lancet (France)",
      tags: ["Target-trial emulation", "National cohort"],
      title: "Long-term safety of the mid-urethral sling for stress urinary incontinence (French national data)",
      meta: "Target-trial emulation · French national health data system · 2025",
      finding:
        "Across the French national health data system, mid-urethral sling placement showed low long-term mesh " +
        "removal/revision rates, with the transobturator (TOT) route modestly lower than retropubic (TVT) at 5 years " +
        "(≈3.3% vs 4.1% cumulative removal/section).",
      implications:
        "Large real-world safety data to counsel SUI patients weighing a sling: serious mesh complications are " +
        "uncommon, and route choice modestly affects revision risk. A useful, current counterweight to mesh anxiety " +
        "lingering from the transvaginal-mesh controversy.",
      caveat:
        "Emulated (non-randomized) design — residual confounding by indication and surgeon experience is possible. " +
        "Verify how complications were captured in claims data and the absolute event rates before quoting figures.",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12496164/",
      sourceLabel: "Mid-urethral sling safety, French national data (PMC)",
    },
    {
      source: "JMIG · J. Minimally Invasive Gynecology",
      tags: ["Prospective RCT", "Abstract only"],
      title: "vNOTES versus conventional vaginal hysterectomy for benign indications (prospective RCT)",
      meta: "Prospective randomized controlled trial · abstract only",
      finding:
        "Vaginal natural orifice transluminal endoscopic surgery (vNOTES) was compared head-to-head with conventional " +
        "vaginal hysterectomy for benign disease, evaluating operative time, complications, and recovery.",
      implications:
        "Adds structured evidence to the minimally invasive route decision. Relevant for surgeons weighing vNOTES " +
        "adoption for its adnexal access and visualization against the established, low-cost vaginal approach — " +
        "useful for credentialing and case-selection discussions.",
      caveat:
        "Verify operative time, intra/postoperative complication and conversion rates, pain/recovery outcomes, and " +
        "whether the trial was single-center with a limited sample (generalizability and learning-curve effects).",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12680420/",
      sourceLabel: "vNOTES vs vaginal hysterectomy RCT (PMC)",
    },
  ],

  // Quick hits carry a `group` label so this edition renders them in labeled sections.
  quickHits: [
    {
      group: "Medical",
      src: "Menopause Society",
      text: "MHT benefit–risk and continuation beyond age 65 — VMS often persists past 60; continuation can be considered in healthy women via shared decision-making, favoring transdermal estradiol when VTE/cardiometabolic risk is elevated.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12652300/",
    },
    {
      group: "Medical",
      src: "ESHRE · Europe",
      text: "ESHRE endometriosis guideline — endorses clinical (non-laparoscopic) diagnosis and medical therapy as first-line, downgrading diagnostic laparoscopy; a European counterpart to the new ACOG guidance.",
      url: "https://www.eshre.eu/guideline/endometriosis",
    },
    {
      group: "Medical",
      src: "NEJM · Fibroids",
      text: "Relugolix combination therapy (LIBERTY) — oral GnRH-antagonist combo cut fibroid-associated heavy menstrual bleeding vs placebo, with estradiol/norethindrone add-back protecting bone; a medical alternative before myomectomy.",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2008283",
    },
    {
      group: "Medical",
      src: "Systematic review",
      text: "Endocrine therapy for endometriosis (systematic review & meta-analysis) — pooled data support estrogen–progestin, progestin-only, GnRH agonists/antagonists, relugolix, and estetrol for pelvic pain; reinforces medical-first management.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13078990/",
    },
    {
      group: "Medical",
      src: "Menopause Society",
      text: "Fezolinetant (Veozah) hepatotoxicity boxed warning (Dec 2024) — baseline and periodic LFT monitoring required; counsel patients to report signs of liver injury.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12401328/",
    },
    {
      group: "Surgical",
      src: "JMIG",
      text: "Same-day discharge after minimally invasive hysterectomy (systematic review & meta-analysis) — identifies modifiable barriers (late OR start, longer operative time, comorbidities); a concrete enhanced-recovery lever.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10803482/",
    },
    {
      group: "Surgical",
      src: "JMIG",
      text: "Robotic multidisciplinary endometriosis surgery with multivisceral resection — short-term feasibility and safety data for complex deep-infiltrating disease managed by a team model.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12227863/",
    },
    {
      group: "Surgical",
      src: "RCT · Fibroids",
      text: "Transcervical fibroid ablation vs minimally invasive myomectomy (RCT) — head-to-head recovery after each uterine-preserving option for symptomatic fibroids; informs the device-vs-surgery conversation.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12884227/",
    },
  ],

  disclaimer:
    "These summaries are an editorial synthesis drawn from abstracts, conference coverage, and society materials — " +
    "several full texts were paywalled (flagged per item). They are not clinical guidance. Verify every finding against " +
    "the primary source and the applicable society guideline before changing practice. An independent educational " +
    "digest; not affiliated with or endorsed by the named journals or societies.",
};
