#!/usr/bin/env node
/**
 * build_cover_letter.js
 *
 * Builds a one-page cover letter docx in the same visual design as the CV
 * (see build_base_cv.js). The header (name, title line, contact line) is read
 * from base_cv.md so the two documents never drift apart.
 *
 * Usage:
 *   node build_cover_letter.js <letter.txt> <output.docx> "<Company · Role>" [date]
 *
 * letter.txt: body paragraphs separated by blank lines. The last block is the
 * signature name. No salutation or sign-off; the script adds both.
 * date defaults to today, written as "6 October 2026".
 */

const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');

// ---------- style constants (keep in step with build_base_cv.js) ----------

const DARK = "161616";
const MUTED = "5A5A5A";
const FONT = "Helvetica Neue";

const SIZE_BODY = 21;       // 10.5pt: a letter has room the CV does not
const SIZE_NAME = 48;       // 24pt
const SIZE_TITLE = 22;      // 11pt
const SIZE_CONTACT = 20;    // 10pt

// ---------- inputs ----------

const [,, inTxt, outDocx, recipientLine, dateArg] = process.argv;
if (!inTxt || !outDocx || !recipientLine) {
  console.error('Usage: node build_cover_letter.js <letter.txt> <output.docx> "<Company · Role>" [date]');
  process.exit(1);
}

const baseLines = fs.readFileSync(path.join(__dirname, 'base_cv.md'), 'utf8').split('\n').filter((l) => l.trim());
const name = baseLines[0].replace(/^#\s+/, '').trim();
const titleLine = baseLines[1].replace(/^\*\*(.+)\*\*$/, '$1').trim();
const contactLine = baseLines[2].trim();

const date = dateArg || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const blocks = fs.readFileSync(inTxt, 'utf8').trim().split(/\n\s*\n/).map((b) => b.replace(/\s*\n\s*/g, ' ').trim());
const signature = blocks.pop();

// ---------- document ----------

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: SIZE_BODY, color: DARK, ...opts });
const para = (children, after = 200, extra = {}) => new Paragraph({ spacing: { before: 0, after, line: 288 }, children, ...extra });

const children = [
  new Paragraph({ spacing: { before: 0, after: 0 }, children: [run(name, { bold: true, size: SIZE_NAME })] }),
  new Paragraph({ spacing: { before: 40, after: 0 }, children: [run(titleLine, { bold: true, size: SIZE_TITLE })] }),
  new Paragraph({ spacing: { before: 40, after: 480 }, children: [run(contactLine, { color: MUTED, size: SIZE_CONTACT })] }),
  para([run(date, { color: MUTED })], 240),
  para([run(recipientLine, { bold: true })], 240),
  para([run(`Dear ${recipientLine.split(/\s+·\s+/)[0]} hiring team,`)]),
  ...blocks.map((b) => para([run(b)])),
  para([run('Best regards,')], 80),
  para([run(signature, { bold: true })], 0),
];

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: SIZE_BODY, color: DARK } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 720, right: 1080, bottom: 720, left: 1080 } } },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outDocx, buf);
  console.log(`Built ${outDocx}`);
});
