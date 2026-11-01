#!/usr/bin/env node
// Mechanical checks behind /ba-review. Needs no AI and no packages.
// Usage: node .claude/skills/ba-review/scripts/check-docs.mjs spec|final
// Exit codes: 0 no errors, 1 errors found, 2 wrong usage.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const docs = join(root, "deliverables");
const samples = join(root, "our-tool", "public", "samples");

const SPEC_FILES = [
  "proposal/01-summary.md", "proposal/02-current-context.md", "proposal/03-as-is-workflow.md",
  "proposal/04-options.md", "proposal/05-solution.md", "proposal/06-to-be-workflow.md",
  "proposal/07-demo-plan.md", "proposal/08-value.md", "proposal/09-how-it-works.md",
  "proposal/A1-domain-model.md", "proposal/A2-feature-workflows.md",
  "proposal/A3-functions.md", "proposal/A4-screens.md",
  "assumptions.md", "questions.md",
];
const FINAL_FILES = [
  ...SPEC_FILES,
  "proposal/10-limitations-risks.md", "proposal/11-roadmap.md", "proposal/12-closing.md",
  "proposal/13-qa.md", "proposal/14-how-we-built.md", "proposal/15-ai-checklist.md",
  "as-built.md", "presentation/slides.md", "presentation/speaker-notes.md",
  "presentation/demo-script.md",
];
const LIMITS = { "core features": 3, "Must functions": 5, screens: 3 };

const ID = /\b(?:CF|ACT|OBJ|WF|FN|SCR|SRC|P|N|L|R|A|Q)-\d{2,3}\b/g;
const NUMBER_TAG = /\[(?:A|SRC)-\d{2,3}\]/;
const QUANTITY = new RegExp(
  "[$€£]\\s?\\d|\\b\\d[\\d,.]*\\s?(?:%|percent\\b|x\\b|times\\b|seconds?\\b|secs?\\b|minutes?\\b|mins?\\b" +
    "|hours?\\b|hrs?\\b|days?\\b|weeks?\\b|months?\\b|years?\\b|users?\\b|people\\b|BAs?\\b|analysts?\\b" +
    "|teams?\\b|requirements?\\b|stories\\b|defects?\\b|errors?\\b|documents?\\b|projects?\\b|tickets?\\b" +
    "|USD\\b|EUR\\b|VND\\b)",
  "i",
);

const mode = process.argv[2];
if (mode !== "spec" && mode !== "final") {
  console.error("Usage: check-docs.mjs spec|final");
  process.exit(2);
}

const findings = [];
const report = (level, rule, where, message) => findings.push({ level, rule, where, message });

function load(rel) {
  const lines = [];
  let fenced = false;
  readFileSync(join(docs, rel), "utf8").split(/\r?\n/).forEach((text, index) => {
    const fence = text.trimStart().startsWith("```");
    if (fence) fenced = !fenced;
    lines.push({ no: index + 1, text, fenced: fenced || fence });
  });
  return { rel, lines };
}

// Lines under the heading that matches, up to the next heading of the same or higher level.
function section(doc, heading) {
  const start = doc.lines.findIndex((line) => !line.fenced && heading.test(line.text));
  if (start === -1) return [];
  const level = doc.lines[start].text.match(/^#+/)[0].length;
  const rest = doc.lines.slice(start + 1);
  const end = rest.findIndex((line) => {
    const next = line.text.match(/^(#+)\s/);
    return !line.fenced && next && next[1].length <= level;
  });
  return end === -1 ? rest : rest.slice(0, end);
}

const idRows = (lines) => lines.filter((l) => !l.fenced && /^\|\s*[`*]*[A-Z]+-\d{2,3}/.test(l.text));
const firstId = (text) => text.match(ID)?.[0];
const idsIn = (doc) => new Set(doc.lines.flatMap((line) => line.text.match(ID) ?? []));

const required = mode === "spec" ? SPEC_FILES : FINAL_FILES;
const loaded = new Map();
for (const rel of required) {
  if (existsSync(join(docs, rel))) loaded.set(rel, load(rel));
  else report("ERROR", "missing-file", `deliverables/${rel}`, "Required file doesn't exist");
}
const scanned = [...loaded.values()];

// Unfilled template fields.
for (const doc of scanned) {
  for (const { no, text } of doc.lines) {
    const where = `deliverables/${doc.rel}:${no}`;
    if (text.includes("{{")) report("ERROR", "placeholder", where, `Unfilled field: ${text.trim().slice(0, 70)}`);
    if (/\b(?:TBD|TODO|FIXME)\b/.test(text)) report("WARN", "unfinished", where, text.trim().slice(0, 70));
  }
}

// IDs: every reference must point to a definition.
const defined = new Set();
for (const doc of scanned) {
  for (const { text, fenced } of doc.lines) {
    if (fenced) continue;
    const id =
      text.match(/^\|\s*[`*]*([A-Z]+-\d{2,3})[`*]*\s*\|/)?.[1] ??
      text.match(/^#{2,6}\s+[`*]*([A-Z]+-\d{2,3})\b/)?.[1];
    if (id) defined.add(id);
  }
}
for (const doc of scanned) {
  for (const { no, text, fenced } of doc.lines) {
    if (fenced) continue;
    for (const [id] of text.matchAll(ID)) {
      if (!defined.has(id)) report("ERROR", "unknown-id", `deliverables/${doc.rel}:${no}`, `${id} isn't defined anywhere`);
    }
  }
}

// Traceability from needs to functions to screens.
const functions = loaded.get("proposal/A3-functions.md");
const screens = loaded.get("proposal/A4-screens.md");
if (functions && screens) {
  const functionIds = idsIn(functions);
  const screenIds = idsIn(screens);
  const functionRows = idRows(section(functions, /^#{2,4}\s+A3\.1\b/));
  const screenRows = idRows(section(screens, /^#{2,4}\s+A4\.1\b/));
  const mustRows = functionRows.filter((row) => /\|\s*Must\s*\|/i.test(row.text));
  const coreFeatures = [...defined].filter((id) => id.startsWith("CF-"));
  const where = `deliverables/${functions.rel}`;

  if (functionRows.length === 0) report("ERROR", "trace", where, "The function list in A3.1 has no FN rows");
  for (const row of functionRows) {
    const id = firstId(row.text);
    if (!/\b[PN]-\d/.test(row.text)) report("ERROR", "trace", `${where}:${row.no}`, `${id} doesn't trace to a P-xx or N-xx`);
    if (!/\bCF-\d/.test(row.text)) report("ERROR", "trace", `${where}:${row.no}`, `${id} doesn't name a core feature`);
  }
  for (const row of mustRows) {
    const id = firstId(row.text);
    if (!screenIds.has(id)) report("ERROR", "trace", `deliverables/${screens.rel}`, `Must function ${id} isn't on any screen`);
  }
  for (const id of coreFeatures) {
    if (!functionIds.has(id)) report("ERROR", "trace", where, `Core feature ${id} has no function`);
  }
  for (const row of screenRows) {
    if (!/\bFN-\d/.test(row.text)) report("ERROR", "trace", `deliverables/${screens.rel}:${row.no}`, `${firstId(row.text)} has no functions`);
  }
  for (const id of [...defined].filter((item) => /^[PN]-/.test(item))) {
    if (!functionIds.has(id)) report("WARN", "trace", where, `${id} isn't addressed by any function`);
  }

  const counts = { "core features": coreFeatures.length, "Must functions": mustRows.length, screens: screenRows.length };
  for (const [name, limit] of Object.entries(LIMITS)) {
    if (counts[name] > limit) report("WARN", "scope", where, `${counts[name]} ${name} exceeds the limit of ${limit}`);
  }
}

// Samples: expected results must quote the input exactly.
const normalize = (text) => text.replace(/\s+/g, " ").trim();
function quotesIn(value) {
  if (Array.isArray(value)) return value.flatMap(quotesIn);
  if (value === null || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) =>
    key === "quote" && typeof item === "string" ? [item] : quotesIn(item),
  );
}
const expectedFiles = existsSync(samples)
  ? readdirSync(samples).filter((name) => name.endsWith(".expected.json"))
  : [];
if (expectedFiles.length === 0) report("ERROR", "sample", "our-tool/public/samples/", "No .expected.json sample exists");
for (const name of expectedFiles) {
  const where = `our-tool/public/samples/${name}`;
  const inputPath = join(samples, name.replace(".expected.json", ".input.txt"));
  if (!existsSync(inputPath)) {
    report("ERROR", "sample", where, "Its matching .input.txt file doesn't exist");
    continue;
  }
  let expected;
  try {
    expected = JSON.parse(readFileSync(join(samples, name), "utf8"));
  } catch (error) {
    report("ERROR", "sample", where, `Invalid JSON: ${error.message}`);
    continue;
  }
  const input = normalize(readFileSync(inputPath, "utf8"));
  for (const quote of quotesIn(expected)) {
    if (!input.includes(normalize(quote))) report("ERROR", "sample", where, `Quote not in the input: ${quote.slice(0, 60)}`);
  }
}

// Numbers: candidates for the reviewer to confirm, so these are warnings.
const unregistered = scanned.filter((doc) => !["assumptions.md", "questions.md"].includes(doc.rel));
for (const doc of unregistered) {
  for (const { no, text, fenced } of doc.lines) {
    const skip = fenced || /^\s*#/.test(text) || /^\|[\s:|-]+\|$/.test(text) || /^\s*- \*\*Time:\*\*/.test(text);
    if (!skip && QUANTITY.test(text) && !NUMBER_TAG.test(text)) {
      report("WARN", "number", `deliverables/${doc.rel}:${no}`, `No [SRC-xx] or [A-xx] tag: ${text.trim().slice(0, 70)}`);
    }
  }
}

// Final pack: the deck, notes and assembled proposal.
const deck = loaded.get("presentation/slides.md");
if (mode === "final" && deck) {
  const sectionNumbers = new Set();
  for (const doc of scanned.filter((item) => item.rel.startsWith("proposal/"))) {
    for (const { text, fenced } of doc.lines) {
      const number = !fenced && text.match(/^#{2,4}\s+((?:\d{1,2}|A\d)(?:\.\d{1,2})?)[.\s]/);
      if (number) sectionNumbers.add(number[1]);
    }
  }

  const slides = new Map();
  let current;
  for (const line of deck.lines) {
    const heading = !line.fenced && line.text.match(/^##\s+([SB]\d{2})\b/);
    if (heading) {
      current = [];
      slides.set(heading[1], current);
    } else if (current) {
      current.push(line);
    }
  }

  const where = `deliverables/${deck.rel}`;
  for (let number = 1; number <= 11; number += 1) {
    const id = `S${String(number).padStart(2, "0")}`;
    if (!slides.has(id)) report("ERROR", "slide", where, `Slide ${id} is missing`);
  }
  for (const [id, lines] of slides) {
    const pending = lines.find((line) => /^Pending:/.test(line.text.trim()));
    if (pending) report("ERROR", "slide", `${where}:${pending.no}`, `${id} is still Pending`);
    const source = lines.find((line) => /\*\*Source:\*\*/.test(line.text));
    if (!source) {
      report("ERROR", "slide", where, `${id} has no Source line`);
      continue;
    }
    const tokens = source.text.split("**Source:**")[1].split(",").map((token) => token.trim()).filter(Boolean);
    if (tokens.length === 0) report("ERROR", "slide", `${where}:${source.no}`, `${id} has an empty Source line`);
    for (const token of tokens) {
      const known = sectionNumbers.has(token) || defined.has(token) || existsSync(join(docs, token));
      if (!known) report("ERROR", "slide", `${where}:${source.no}`, `${id} cites ${token}, which doesn't exist`);
    }
  }

  const notes = loaded.get("presentation/speaker-notes.md");
  if (notes) {
    for (const id of [...slides.keys()].filter((key) => key.startsWith("S"))) {
      const present = notes.lines.some((line) => new RegExp(`^##\\s+${id}\\b`).test(line.text));
      if (!present) report("ERROR", "notes", `deliverables/${notes.rel}`, `No speaker notes for ${id}`);
    }
  }

  const proposal = join(docs, "proposal.md");
  if (!existsSync(proposal)) {
    report("ERROR", "missing-file", "deliverables/proposal.md", "The proposal hasn't been assembled");
  } else {
    const assembled = statSync(proposal).mtimeMs;
    const stale = scanned.filter(
      (doc) => doc.rel.startsWith("proposal/") && statSync(join(docs, doc.rel)).mtimeMs > assembled,
    );
    if (stale.length > 0) report("WARN", "stale", "deliverables/proposal.md", `Older than ${stale.length} section file(s), so reassemble it`);
  }
}

const errors = findings.filter((finding) => finding.level === "ERROR");
const warnings = findings.filter((finding) => finding.level === "WARN");

console.log(`Mechanical check: ${mode}`);
console.log(`Errors: ${errors.length}, warnings: ${warnings.length}`);
for (const { level, rule, where, message } of [...errors, ...warnings]) {
  console.log(`${level.padEnd(5)} ${rule.padEnd(12)} ${where}  ${message}`);
}

process.exit(errors.length > 0 ? 1 : 0);
