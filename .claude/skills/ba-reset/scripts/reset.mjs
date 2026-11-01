#!/usr/bin/env node
// Archives the current use case and restores the blank template. Deletes nothing.
// Usage: node .claude/skills/ba-reset/scripts/reset.mjs [--dry-run]

import { cpSync, existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../../..");
const skeleton = resolve(here, "../skeleton");
const dryRun = process.argv.includes("--dry-run");

// Local-only items in our-tool that stay in place.
const KEEP_IN_TOOL = new Set([".env.local", ".vercel", "node_modules"]);

const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
let archive = join("archive", stamp);
for (let copy = 2; existsSync(join(root, archive)); copy += 1) {
  archive = join("archive", `${stamp}-${copy}`);
}

const moves = ["deliverables", "STATUS.md"].filter((item) => existsSync(join(root, item)));
const tool = join(root, "our-tool");
if (existsSync(tool)) {
  moves.push(
    ...readdirSync(tool)
      .filter((item) => !KEEP_IN_TOOL.has(item))
      .map((item) => join("our-tool", item)),
  );
}

console.log(`${dryRun ? "Would move" : "Moving"} ${moves.length} items to ${archive}:`);
for (const item of moves) console.log(`  ${item}`);
console.log(`Staying in place: ${[...KEEP_IN_TOOL].map((item) => `our-tool/${item}`).join(", ")}, .claude/`);

if (dryRun) process.exit(0);

for (const item of moves) {
  const target = join(root, archive, item);
  mkdirSync(dirname(target), { recursive: true });
  renameSync(join(root, item), target);
}

cpSync(skeleton, root, { recursive: true, force: false, errorOnExist: false });
console.log(`Restored the blank template. Archive: ${archive}`);
