// Benign Gynecologic Surgery edition — single source of truth.
// Same shape as issue.js; rendered by the shared builders. Focus: benign GYN surgery only
// (MIS hysterectomy, endometriosis, fibroids, prolapse, adnexal/tubal, perioperative).

module.exports = {
  meta: {
    title: "Benign GYN Surgery Journal Club",
    org: "An independent monthly journal club for gynecologists",
    issueDate: "Friday, June 27, 2026",
    asOf: "2026-06-27",
    audience: "For gynecologists",
    brandTag: "", // de-branded edition — no institutional tag in the utility bar / page title
    // Author/distributor byline — EDIT THIS to your name/title (also editable in the Word doc).
    byline: "Compiled & distributed by Pooja Uppalapati, MD, MBA",
    // Per-edition color theme. This edition is de-branded — neutral navy, no University of Maryland palette.
    theme: { primary: "1F3A5F", primaryDk: "14283F", accent: "4E7CA8", tint: "EEF2F8", tintLine: "CDD9EA" },
    blurb:
      "A clinical digest on benign gynecologic surgery for gynecologists. Each issue distills practice-relevant " +
      "minimally invasive and reconstructive GYN surgery — and the medical management that competes with it — across " +
      "hysterectomy, endometriosis, fibroids, prolapse and urogynecology, drawing on US and European sources, with " +
      "space after every article for your own notes and group discussion.",
    resources: [
      { label: "JMIG", url: "https://www.jmig.org" },
      { label: "AAGL", url: "https://www.aagl.org" },
      { label: "BSGE (UK)", url: "https://www.bsge.org.uk" },
      { label: "Obstetrics & Gynecology (Green)", url: "https://journals.lww.com/greenjournal" },
      { label: "AJOG (Gray)", url: "https://www.ajog.org" },
      { label: "BJOG", url: "https://obgyn.onlinelibrary.wiley.com/journal/14710528" },
      { label: "Int Urogynecology Journal", url: "https://link.springer.com/journal/192" },
      { label: "Eur J Obstet Gynecol (EJOG)", url: "https://www.ejog.org" },
      { label: "JAMA Surgery", url: "https://jamanetwork.com/journals/jamasurgery" },
      { label: "AAFP / Am Fam Physician", url: "https://www.aafp.org/pubs/afp.html" },
    ],
  },

  lead: {
    title: "Outpatient by default: ERAS plus minimally invasive routes make same-day discharge the benchmark for benign hysterectomy",
    body:
      "Benign hysterectomy is one of the most common operations in women’s health, and its standard of care has " +
      "shifted decisively to ambulatory, minimally invasive surgery on an enhanced-recovery (ERAS) pathway. The 2026 " +
      "ERAS Society update and a growing body of same-day-discharge evidence converge on a target of roughly 90% " +
      "same-day discharge for benign minimally invasive cases — without higher complication or readmission rates — " +
      "by omitting bowel prep and routine voiding trials, using multimodal opioid-sparing analgesia, and selecting " +
      "patients deliberately. New route options (vNOTES) and technique refinements (intracorporeal cuff closure) " +
      "widen who qualifies.",
    why:
      "the rate-limiting steps are now operational, not surgical: an ERAS order set, a PACU discharge protocol, " +
      "patient education, and a next-day phone-call safety net. Build those and same-day discharge becomes routine " +
      "rather than exceptional — shorter stays, lower cost, equal safety. Watch the levers that still gate it: late " +
      "OR start, longer operative time, and specific comorbidities (which the data flag as the real predictors of " +
      "failed same-day discharge).",
    sourceUrl: "https://www.sciencedirect.com/science/article/pii/S0090825826019992",
    sourceLabel: "ERAS Society guidelines, 2026 update (ScienceDirect)",
  },

  articles: [
    {
      source: "JMIG · J. Minimally Invasive Gynecology",
      tags: ["Systematic review", "Meta-analysis"],
      title: "Same-day discharge after minimally invasive hysterectomy",
      meta: "Systematic review & meta-analysis · abstract only",
      finding:
        "Same-day discharge after laparoscopic or robotic hysterectomy is feasible and safe versus next-day discharge, " +
        "with no significant increase in complications or readmissions; the predictors of a failed same-day discharge " +
        "are modifiable or identifiable (late OR start, longer operative time, higher age/BMI, specific comorbidities).",
      implications:
        "Default to same-day discharge for benign MIS hysterectomy in appropriately selected patients. Build an ERAS " +
        "order set (no bowel prep, no routine voiding trial), a PACU discharge checklist, and a next-day call — and " +
        "use the known predictors to triage who stays overnight.",
      caveat:
        "Verify the pooled readmission and reoperation rates, how “appropriately selected” was defined, the absolute " +
        "same-day discharge rate achieved, and whether robotic vs laparoscopic differed.",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10803482/",
      sourceLabel: "Same-day discharge meta-analysis (PMC)",
    },
    {
      source: "JMIG · J. Minimally Invasive Gynecology",
      tags: ["Prospective RCT", "Abstract only"],
      title: "vNOTES versus conventional vaginal hysterectomy for benign indications",
      meta: "Prospective randomized controlled trial · abstract only",
      finding:
        "Vaginal natural orifice transluminal endoscopic surgery (vNOTES) was compared head-to-head with conventional " +
        "vaginal hysterectomy for benign disease, evaluating operative time, complications, adnexal access, and recovery.",
      implications:
        "Adds structured evidence to the route decision. vNOTES extends adnexal access and visualization beyond the " +
        "conventional vaginal approach — useful for case selection (e.g., when concurrent salpingectomy or adnexal " +
        "work is planned) and for credentialing discussions as adoption spreads.",
      caveat:
        "Verify operative time, complication and conversion rates, pain/recovery outcomes, and whether the trial was " +
        "single-center with a limited sample (learning-curve and generalizability effects).",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12680420/",
      sourceLabel: "vNOTES vs vaginal hysterectomy RCT (PMC)",
    },
    {
      source: "eClinicalMedicine · Lancet (France)",
      tags: ["Target-trial emulation", "National cohort"],
      title: "Long-term safety of the mid-urethral sling for stress urinary incontinence (French national data)",
      meta: "Target-trial emulation · French national health data system · 2025",
      finding:
        "Across the French national health data system, mid-urethral sling placement carried low long-term mesh " +
        "removal/revision rates, with the transobturator (TOT) route modestly lower than retropubic (TVT) at 5 years " +
        "(≈3.3% vs 4.1% cumulative removal/section).",
      implications:
        "Robust real-world safety data for SUI counseling and consent: serious mesh complications are uncommon and " +
        "route choice modestly shifts revision risk. A current, large-scale counterweight to mesh anxiety carried over " +
        "from the transvaginal-mesh controversy — distinct from POP mesh.",
      caveat:
        "Emulated (non-randomized) design — residual confounding by indication and surgeon experience remains. Verify " +
        "how complications were captured in claims data and the absolute event rates before quoting figures.",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12496164/",
      sourceLabel: "Mid-urethral sling safety, French national data (PMC)",
    },
    {
      source: "DIAMOND · HTA randomized trial",
      tags: ["RCT", "Very small sample"],
      title: "Medical management versus surgery for deep infiltrating endometriosis (DIAMOND)",
      meta: "Health Technology Assessment RCT · January 2026 · abstract only",
      finding:
        "DIAMOND randomized patients with deep infiltrating endometriosis to early planned laparoscopic excision versus " +
        "optimized medical management, assessing clinical and cost-effectiveness — but only 18 patients were randomized, " +
        "so it is severely underpowered.",
      implications:
        "Useful for shared decision-making conversations — it frames surgery and optimized medical therapy as legitimate " +
        "competing first steps for DIE rather than assuming surgery is always superior. Do not let it drive a definitive " +
        "change; use it to support individualized counseling while larger trials mature.",
      caveat:
        "n = 18 is the headline limitation: no reliable effect estimate or non-inferiority claim is possible. Verify " +
        "the primary endpoint, crossover rate, and whether a larger trial is planned before citing it to patients.",
      sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12884356/",
      sourceLabel: "DIAMOND RCT synopsis (PMC)",
    },
    {
      source: "Urogynecology · apical prolapse repair",
      tags: ["Comparative study", "Abstract only"],
      title: "Sacrocolpopexy versus native-tissue repair for apical prolapse",
      meta: "Comparative outcomes study · abstract only",
      finding:
        "Apical suspension by sacrocolpopexy showed a substantially lower surgical failure rate than native-tissue " +
        "repair (reported around 6% vs 21%), with fewer symptomatic and anatomic recurrences over follow-up.",
      implications:
        "Counsel on the durability trade-off: sacrocolpopexy (mesh) offers better anatomic durability, native-tissue " +
        "repair avoids mesh-related risk. Match the procedure to the patient’s priorities, activity, and risk tolerance, " +
        "and document the shared decision — especially given the FDA history on transvaginal mesh.",
      caveat:
        "Much of this evidence is retrospective/observational; verify follow-up duration, mesh-exposure rates (often " +
        "not captured in failure counts), and whether populations were comparable before generalizing.",
      sourceUrl: "https://www.nature.com/articles/s41598-021-82732-0",
      sourceLabel: "Native tissue vs sacrocolpopexy outcomes (Scientific Reports)",
    },
    {
      source: "JMIG · J. Minimally Invasive Gynecology",
      tags: ["Register-based RCT", "Abstract only"],
      title: "Opportunistic salpingectomy at sterilisation and benign hysterectomy (SALSTER; HOPPSA)",
      meta: "Register-based randomized trials · abstract only",
      finding:
        "In SALSTER, opportunistic salpingectomy at laparoscopic sterilisation did not raise peri- or postoperative " +
        "complications beyond the pre-defined non-inferiority margin through 8 weeks; HOPPSA evaluates the same approach " +
        "added to benign hysterectomy for ovarian-cancer risk reduction.",
      implications:
        "Routinely offer opportunistic salpingectomy at sterilisation and benign pelvic surgery in patients who have " +
        "completed childbearing. Add it to surgical consent and counseling as a safe ovarian-cancer-risk-reduction step.",
      caveat:
        "Verify exact complication rates and the margin, added operative time/blood loss, and note the long-term " +
        "ovarian-cancer-incidence endpoint is still maturing — risk reduction is inferred, not yet proven by these trials.",
      sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11838100/",
      sourceLabel: "SALSTER trial (PMC)",
    },
  ],

  quickHits: [
    {
      src: "NEJM · Medical (fibroids)",
      text: "Relugolix combination therapy (LIBERTY) — oral GnRH-antagonist combo cut fibroid-associated heavy bleeding vs placebo, with add-back protecting bone; the medical alternative to weigh before myomectomy.",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2008283",
    },
    {
      src: "Urogynecology · OAB",
      text: "Overactive bladder 5 years after the Mid-Urethral Sling Tensioning (MUST) trial — long-term follow-up on how sling tension relates to persistent/de novo OAB; informs pre-op counseling on storage symptoms.",
      url: "https://pubmed.ncbi.nlm.nih.gov/42149649/",
    },
    {
      src: "AAGL · ERAS",
      text: "Enhanced Recovery & Surgical Optimization for minimally invasive gyn surgery (AAGL White Paper) — the benign-MIGS playbook (no bowel prep, multimodal analgesia, early feeding) behind same-day discharge.",
      url: "https://www.jmig.org/article/S1553-4650(20)30385-X/abstract",
    },
    {
      src: "RCT · Fibroids",
      text: "Transcervical fibroid ablation vs minimally invasive myomectomy (RCT) — head-to-head recovery after each uterine-preserving surgical option for symptomatic fibroids; informs the device-vs-surgery conversation.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12884227/",
    },
    {
      src: "JMIG · Endometriosis",
      text: "Robotic multidisciplinary surgery with multivisceral resection for deep endometriosis — short-term feasibility and safety when a team manages bowel/bladder/ureteral disease in one setting.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12227863/",
    },
  ],

  disclaimer:
    "These summaries are an editorial synthesis drawn from abstracts, conference coverage, and society materials — " +
    "several full texts were paywalled (flagged per item). They are not clinical guidance. Verify every finding against " +
    "the primary source and the applicable society guideline before changing practice. An independent educational " +
    "digest for gynecologists; not affiliated with or endorsed by the named journals or societies.",
};
