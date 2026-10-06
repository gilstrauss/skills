# Tailoring Methodology

The process for producing a tailored CV from the base CV + master document, given a specific job description.

## Knowledge architecture — evergreen vs. application-specific

Two tiers. Keep them separate; never conflate. This is a standing rule.

**Tier 1 — Evergreen (lives in the skill, reused for every application).**
`master_cv.md`, `base_cv.md`, `principles.md`, this `methodology.md`, and
`interview_prep.md`. Interview answers here are *reusable templates*: the generic
form of the answer plus a "customize per company" slot. The tenure answer ("Why
are you looking?"), "how hands-on are you," "DORA," etc. all live here in generic
form. Never write a company-specific detail into a Tier-1 file.

**Tier 2 — Application-specific (lives in the CV working dir, one per company).**
For each opportunity, a `<company>_dossier.md` sits alongside the tailored CV in
`Tailored CVs/`. It holds everything specific to that JD: the fit assessment
(strong matches + gaps), the gaps-to-manage list, the company-specific pull
("why this role"), and the *customized* version of each interview answer (the
company-specific closing line grafted onto the Tier-1 generic answer). The
dossier is the entry point when that company calls; it references Tier-1 files
for the reusable parts.

Rule of thumb: if a sentence would be true for any application, it belongs in
Tier 1. If it names the company, the JD, or this specific fit, it belongs in the
dossier.

**Sources for a position review or a new tailoring.** Work from Tier 1 only
(`master_cv.md`, `base_cv.md`), plus `Knowledge/` for domain detail. Do not read
other companies' tailored CVs or dossiers in `Tailored CVs/`. Each one carries
another JD's cuts and emphasis, and older ones may predate corrections made to
the master. The only Tier-2 file to open is the dossier for the company being
worked on, if one exists. Exception: when Gil explicitly asks to reuse a specific
earlier variant ("reuse the Factify framing"), read that file and nothing else
from the folder.

## Phase 1 — Understand the JD

Before changing anything, read the JD with these questions in mind:

1. **What's the role title and seniority?** (CTO / VP R&D / Architect / Head of Engineering / something else)
2. **What's the company stage and size?** (Series A startup / scale-up / enterprise / public company)
3. **What's the industry?** (SaaS / fintech / ed-tech / health-tech / etc.)
4. **What's the primary mandate of the role?** (Build new / scale existing / modernize legacy / transform culture / lead AI initiative / something else)
5. **Which of Gil's four core claims does this role most reward?**
   - Org-building (60-person scaling)
   - Engineering excellence (DORA transformation)
   - AI-augmented engineering culture
   - Modern hands-on practice
6. **What does the JD ask for that Gil has?** (List 5–10 items.)
7. **What does the JD ask for that Gil lacks?** (Be honest. Flag for Gil if substantial.)

Output of Phase 1: a one-paragraph internal characterization of the role. Do not produce this for Gil unless asked; it's working notes.

## Phase 2 — Pick the summary variant

The master document has five summary versions:
- **A — first-person, distinctive** (default; matches base CV)
- **B — third-person, executive register**
- **C — AI-forward CTO framing**
- **D — VP R&D / org-builder framing**
- **E — architect-focused framing**

Pick the one that best matches the JD's mandate. If none fits, *adjust* an existing one — don't write from scratch.

Adjustment rules:
- Keep the opening line ("I build the engineering organizations behind mission-critical systems...") whenever possible. It's distinctive.
- Adjust the *middle* of the summary to emphasize the right claim.
- Keep the closing line ("Hands-on in the modern sense...") in nearly every variant.

## Phase 3 — Adjust the experience bullets

The master document contains alternative bullet sets for each role.

### CET role
- For AI-forward roles: foreground AI Products + AI Culture bullets.
- For modernization-focused roles: foreground Cloud Modernization + Legacy Modernization.
- For org-builder roles: emphasize the 60-person cross-functional scope description, lighter on initiative details.

### CG Solutions role
The DORA bullet always stays. The other two bullets can be swapped:
- For platform-scale roles: keep "Greenfield to mission-critical" and "Modernization at scale."
- For org-builder roles: replace one with the "Built the engineering organization from 10 to 60 people across R&D, DevOps, IT, NOC, and Product" bullet from the master doc's alternatives.
- For cost-conscious roles: emphasize the AWS cost optimization detail.

Three bullets per role maximum. Four if the role description paragraph is very short.

## Phase 4 — Adjust the skills section

The base CV has three lines:
- Engineering & Architecture
- Cloud & Data
- Languages & AI

Within each line, reorder to lead with terms the JD emphasizes. Don't add skills Gil doesn't have. If the JD asks for a skill that's a stretch, flag it for Gil instead of including it.

## Phase 5 — Sanity check

Before producing the tailored output, verify:

- [ ] Voice still distinctive (first-person summary preserved or adapted, not generic)
- [ ] All four core claims still present (org scale, DORA, AI culture, hands-on)
- [ ] No language banned by `principles.md` ("highly experienced," "online gaming," "Strangler Fig" by name, etc.)
- [ ] Nothing invented
- [ ] Length still on target (1 page, max 1.5)
- [ ] The strongest claim (the four-core for this JD) is in the first third of the document

## Phase 6 — Produce

Output sequence:
1. **Tailored markdown.** Edit a copy of `source/base_cv.md` named for the target (e.g., `tailored_for_acme.md`). Preserve the strict format described in `source/FORMAT.md`.
2. **Brief note for Gil:** "Here's what I changed and why — [3-5 bullets explaining choices]."
3. **Ask Gil to review the markdown.** Don't build the docx yet.
4. **When Gil approves**, run the build script:
   ```
   node source/build_base_cv.js tailored_for_acme.md tailored_for_acme.docx
   ```
5. **Build the PDF** in the same step: `source/docx_to_pdf.sh tailored_for_acme.docx`. It uses Word, so the PDF keeps the docx design, and it warns when the result runs past one page. Final send-format is this PDF; never a Typora or Markdown export.

## Phase 6.5 — Write the application dossier

Alongside the tailored CV, create (or update) `Tailored CVs/<company>_dossier.md`
— the Tier-2 application-specific file. Include:
- The role facts (company, stage, title, location, JD link, headline culture ask).
- The fit assessment: strong matches, and gaps to manage (be honest).
- The company-specific pull ("why this role") — ask Gil if not yet known; leave a
  clear TODO rather than inventing one.
- Customized interview answers: the company-specific closing line grafted onto
  the Tier-1 generic answers in `interview_prep.md` (reference them, don't copy).
- Risks to manage in conversation (tenure, any flagged gap).
- Artifact pointers: tailored CV path, tracker entry, CV emphasis chosen.

This dossier is what gets re-opened if the company calls for an interview. Keep
all company-specific detail here, not in the Tier-1 skill files.

## Phase 7 — Capture

After Gil reviews, ask: "Anything from this tailored version that's worth saving back to the master document — a new phrasing, a new framing, a stronger version of a bullet?"

If yes, append to the appropriate section of `source/master_cv.md`. The master document is meant to grow.

Capture rule by tier: reusable phrasings/framings/bullets go back to Tier-1
(`master_cv.md` / `interview_prep.md`); anything company-specific stays in the
dossier.

---

## Special workflows

### Cover letter
1. Read JD.
2. Pick the most relevant 1–2 core claims for this role.
3. Draft 3–4 paragraphs:
   - **Opening:** Why this company / role specifically. Distinctive, not generic. Avoid "I am writing to apply for."
   - **Middle 1:** The most relevant career-arc claim for this role (with one specific number).
   - **Middle 2:** The current work at CET and why it makes Gil a fit *now*.
   - **Closing:** What he'd like to discuss; one sentence on availability.
4. Match the voice of the base CV summary — first-person, direct, not corporate.

### LinkedIn refresh
See `linkedin_package.md` for the standing recommendations on headline, About, and Experience corrections. Update those files in place rather than producing one-off LinkedIn drafts.

### Interview prep
Read `interview_prep.md`. For specific JD-driven questions, draft answers using the master document as raw material. Always ground in real experience; never speculate.

### Updating the master document
When Gil reports new work or accomplishments:
1. Confirm what's shipped vs. in-flight vs. planned.
2. Add to the appropriate role section.
3. Add new alternative bullets if the new work warrants them.
4. Ask whether the base CV should also be updated.
