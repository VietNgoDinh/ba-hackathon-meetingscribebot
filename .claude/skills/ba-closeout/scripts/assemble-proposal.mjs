#!/usr/bin/env node
// Assembles deliverables/proposal.md from the section files and registers.
// Usage: node .claude/skills/ba-closeout/scripts/assemble-proposal.mjs

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const docs = join(root, "deliverables");

const SECTIONS = [
  "01-summary", "02-current-context", "03-as-is-workflow", "04-options", "05-solution",
  "06-to-be-workflow", "07-demo-plan", "08-value", "09-how-it-works",
  "10-limitations-risks", "11-roadmap", "12-closing", "13-qa", "14-how-we-built",
  "15-ai-checklist", "A1-domain-model", "A2-feature-workflows", "A3-functions", "A4-screens",
];
const REGISTERS = ["assumptions.md", "questions.md"];

// The registers start at heading level 1, so move them under the proposal title.
function demoteHeadings(text) {
  let fenced = false;
  return text
    .split("\n")
    .map((line) => {
      if (line.trimStart().startsWith("```")) fenced = !fenced;
      return !fenced && /^#{1,5} /.test(line) ? `#${line}` : line;
    })
    .join("\n");
}

const missing = [];
const parts = [];

for (const name of SECTIONS) {
  const path = join(docs, "proposal", `${name}.md`);
  if (existsSync(path)) parts.push(readFileSync(path, "utf8").trim());
  else missing.push(`proposal/${name}.md`);
}

for (const name of REGISTERS) {
  const path = join(docs, name);
  if (existsSync(path)) parts.push(demoteHeadings(readFileSync(path, "utf8").trim()));
  else missing.push(name);
}

const contents = parts
  .map((part) => part.match(/^## (.+)$/m)?.[1])
  .filter(Boolean)
  .map((title) => `- ${title}`);

const header = [
  "# Proposal",
  "",
  "Assembled from `deliverables/proposal/`. Edit the section files, then reassemble.",
  "",
  "## Contents",
  "",
  ...contents,
].join("\n");

const output = join(docs, "proposal.md");
writeFileSync(output, `${[header, ...parts].join("\n\n")}\n`);

console.log(`Assembled ${parts.length} parts into deliverables/proposal.md`);
if (missing.length > 0) {
  console.log(`Missing: ${missing.join(", ")}`);
  process.exit(1);
}
