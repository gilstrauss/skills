---
name: cv-tailoring
description: "Use this skill whenever Gil asks for help with his CV, resume, or LinkedIn — including tailoring his CV to a specific job description, updating it after new accomplishments, writing cover letters, prepping interview answers, or refreshing his LinkedIn profile. Triggers include phrases like 'tailor my CV', 'CV for this role', 'update my resume', 'this JD just came in', 'help me apply for', 'refresh my LinkedIn', 'cover letter for', or any uploaded job description PDF/text alongside CV-related discussion. The skill contains Gil's master source document, the editorial principles developed over careful work, the base CV, and methodology for producing tailored variants without losing the voice. Do NOT use for someone else's CV — this skill is specifically calibrated to Gil Strauss."
---

# CV Tailoring — Gil Strauss

This skill is Gil's personal CV system. It contains everything needed to produce a tailored CV for any specific opportunity without redoing the foundational work each time.

## What this skill contains

- **`source/master_cv.md`** — The full source document. Every defensible claim, multiple phrasings, full role detail, interview-prep material. This is the *reservoir*, never sent anywhere.
- **`source/base_cv.md`** — The lean, universal CV (~1 page) in markdown. **This is the editable single source of truth for the CV.** Always edit this file when tailoring.
- **`source/base_cv.docx`** — A polished Word document, *regenerated from* `base_cv.md` by running the build script. Never edited directly.
- **`source/FORMAT.md`** — The strict markdown format that `base_cv.md` must follow. Read this before editing the markdown.
- **`source/docx_to_pdf.sh`** — Converts a built docx to PDF through Microsoft Word (AppleScript), next to the docx, and warns if it runs past one page.
- **`source/build_cover_letter.js`** — Builds a one-page cover letter docx in the CV's design: `node build_cover_letter.js letter.txt out.docx "Company · Role"`. Body paragraphs separated by blank lines, last block is the signature; salutation and sign-off are added. Then run `docx_to_pdf.sh` on it. Same `NODE_PATH` prefix as below.
- **`source/build_base_cv.js`** — The build script: `node build_base_cv.js base_cv.md base_cv.docx`. Requires `docx` npm package (`npm install -g docx`). The `docx` package is installed globally on Gil's machine, so the build command must be prefixed with `NODE_PATH=/opt/homebrew/lib/node_modules` (or whatever `npm root -g` returns) for Node to resolve it.
- **`principles.md`** — The editorial principles. Read this before writing anything.
- **`methodology.md`** — Step-by-step process for tailoring to a specific JD.
- **`interview_prep.md`** — Stock answers to expected interview questions.
- **Applications tracker** (lives outside the skill at `/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/applications_tracker.html`) — interactive HTML dashboard listing every application, the CV version used, contact details, channel, current status, last/next action, and notes. Status, channel, and company are filterable; all columns are sortable; there is a global text filter. Data lives in an inline `<script type="application/json" id="data">` block; update it directly when tailoring or when status changes (new outreach, reply received, interview scheduled, etc.).

## When invoked

Read `principles.md` first. Then read `methodology.md` to confirm the right workflow for the request type. The master document is large; read it section-by-section as needed rather than all at once.

## Default behavior

If Gil asks to tailor the CV to a specific job description:
1. Read `principles.md` and `methodology.md`.
2. Ask Gil for the JD (paste, link, or file).
3. Run the tailoring workflow from `methodology.md`.
4. Edit a *copy* of `source/base_cv.md` and write it into Gil's working CV directory under `Tailored CVs/` (i.e. `/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/Tailored CVs/tailored_for_<company>.md`), preserving the format described in `source/FORMAT.md`. Do not write tailored variants back into the skill's `source/` directory — that's reserved for the master and base.
5. Show Gil the tailored markdown and ask him to confirm content.
6. When approved, regenerate the docx alongside the markdown in `Tailored CVs/`:
   ```
   NODE_PATH=/opt/homebrew/lib/node_modules node /Users/gil/.claude/skills/cv-tailoring/source/build_base_cv.js \
     "/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/Tailored CVs/tailored_for_<company>.md" \
     "/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/Tailored CVs/tailored_for_<company>.docx"
   ```
7. Build the PDF from the docx in the same step, with Microsoft Word, so it keeps the CV design:
   ```
   /Users/gil/.claude/skills/cv-tailoring/source/docx_to_pdf.sh \
     "/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/Tailored CVs/tailored_for_<company>.docx"
   ```
   It writes `tailored_for_<company>.pdf` next to the docx and prints the page count. **If it reports more than one page, fix the length before handing over** (a section spilling alone onto page 2 is the usual failure). Read the PDF to check it, then tell Gil the PDF path: that is the file to upload. Never send a Typora or other Markdown export; it loses the design.
8. **Update the applications tracker.** Append a new entry to the JSON in `<script id="data">` inside `/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/applications_tracker.html`. Fields: `date`, `company`, `role`, `status`, `channel`, `contact`, `cv` (relative path to the .docx), `jd` (relative path to the JD), `lastAction`, `nextAction`, `notes`. Status vocabulary: Researching, CV tailored, Outreach drafted, Outreach sent, Reply received, CV sent, Interview scheduled, Interviewing, Offer received, Closed (rejected), Closed (withdrew), Closed (declined). After tailoring, default `status` to "CV tailored" unless outreach was also drafted/sent in the same round.

If Gil asks to update the master document (new accomplishment, change of role, new metric):
1. Read `principles.md`.
2. Edit `source/master_cv.md` to add the new material.
3. Ask whether the base CV (`source/base_cv.md`) should also be updated; if yes, edit it and rebuild the docx.

If Gil asks for a cover letter:
1. Read `principles.md` and `interview_prep.md`.
2. Read the JD (ask Gil for it if not provided).
3. Draft a cover letter that pulls from the source document. Aim for 3–4 paragraphs, distinctive voice (match the base CV's first-person summary tone), no generic openings.

If Gil reports a status change on an existing application (outreach sent, reply received, CV forwarded, interview scheduled, rejection, withdrawal, etc.):
1. Open `/Users/gil/Library/CloudStorage/Dropbox-Strauss/Gil Strauss/CV/applications_tracker.html`.
2. Find the matching entry in the inline JSON `<script id="data">` block.
3. Update `status`, `lastAction` (prefix with today's date), and `nextAction`. Add to `notes` if substantive context emerged.
4. Don't rebuild any CV — the tracker is the only artifact touched.

If Gil asks for a LinkedIn update:
1. Read `principles.md`.
2. Refer to the existing `linkedin_package.md` if present; if not, produce one (headline, About section, Experience entry corrections to match the base CV).

## What not to do

- Don't paraphrase the master document into the CV directly. The base CV represents *deliberate cuts*; reintroducing detail dilutes it.
- Don't invent new claims. Everything in any tailored CV must trace back to a verified claim in `source/master_cv.md`.
- Don't change Gil's voice. The first-person summary is intentional and distinctive.
- Don't tailor to the point of dishonesty. Cutting irrelevant bullets is tailoring; reordering emphasis is tailoring; inventing experience is not.
- Don't propose changes that violate `principles.md` without flagging that you're doing so and explaining why.

## Maintenance

This skill is intended to evolve. After every tailored CV, ask Gil:
- "Should I save anything from this round (a new phrasing, a new metric, a new framing) back to the master document?"

If yes, append to the appropriate section of `source/master_cv.md`.
