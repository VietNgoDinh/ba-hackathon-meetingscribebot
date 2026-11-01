import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { inflateRawSync } from "node:zlib";

import { buildMomDocument, fileNameFor } from "../public/js/export-docx.js";
import { checkItems, normalize, removedNotice, summarize } from "../public/js/mom-logic.js";

const sample = (name, ext) => readFileSync(new URL(`../public/samples/${name}.${ext}`, import.meta.url), "utf8");
const loadSample = (name) => ({
  transcript: sample(name, "input.txt"),
  saved: JSON.parse(sample(name, "expected.json")),
});

const action = (overrides) => ({
  type: "action",
  text: "Do the thing.",
  quote: "Tomas, can you get us sandbox access by Friday?",
  owner: "Tomas",
  deadline: "by Friday",
  suggested_question: null,
  ...overrides,
});
const TRANSCRIPT = "Elena: Tomas, can you get us sandbox access by Friday?\nKofi:  I will  draft it.";

// ---- The two samples (FN-02, FN-05) ----

test("main sample: all 8 quotes are in the transcript, nothing removed, nothing replaced", () => {
  const { transcript, saved } = loadSample("01-address-change-review");
  const result = checkItems(saved.items, transcript);
  assert.equal(saved.items.length, 8);
  assert.equal(result.items.length, 8);
  assert.equal(result.droppedCount, 0);
  assert.equal(result.replacedCount, 0);
  assert.equal(saved.isSample, true);
});

test("main sample: shows all three item types and gaps for both owner and deadline", () => {
  const { transcript, saved } = loadSample("01-address-change-review");
  const { items } = checkItems(saved.items, transcript);
  assert.deepEqual([...new Set(items.map((item) => item.type))].sort(), ["action", "decision", "discussion_point"]);
  assert.ok(items.some((item) => item.type === "action" && item.owner === "Not stated"));
  assert.ok(items.some((item) => item.type === "action" && item.deadline === "Not stated"));
  assert.equal(summarize(items).openGaps, 2);
});

test("stress sample: exactly one quote is missing, the check drops it and keeps 4", () => {
  const { transcript, saved } = loadSample("02-quote-check-stress-test");
  const missing = saved.items.filter((item) => !normalize(transcript).includes(normalize(item.quote)));
  assert.equal(saved.items.length, 5);
  assert.equal(missing.length, 1);
  assert.equal(missing[0].quote, "We also agreed to include business addresses in the pilot.");

  const result = checkItems(saved.items, transcript);
  assert.equal(result.items.length, 4);
  assert.equal(result.droppedCount, 1);
  assert.equal(result.replacedCount, 0);
  assert.equal(summarize(result.items).openGaps, 2);
  assert.equal(removedNotice(result.droppedCount), "1 item was removed because its quote was not found in the transcript.");
});

// ---- The quote check (FN-02 steps 4 and 5) ----

test("a made-up quote is dropped", () => {
  const result = checkItems([action({ quote: "This sentence was never said." })], TRANSCRIPT);
  assert.equal(result.items.length, 0);
  assert.equal(result.droppedCount, 1);
});

test("a quote that differs only in line breaks or repeated spaces is kept", () => {
  const result = checkItems([action({ quote: "I will\n draft   it.", owner: "Kofi", deadline: "Not stated" })], TRANSCRIPT);
  assert.equal(result.items.length, 1);
  assert.equal(result.droppedCount, 0);
});

test("a quote that differs in one word is dropped", () => {
  const result = checkItems([action({ quote: "Tomas, can you get us sandbox access by Monday?" })], TRANSCRIPT);
  assert.equal(result.droppedCount, 1);
});

test("an empty quote is dropped", () => {
  assert.equal(checkItems([action({ quote: "   " })], TRANSCRIPT).droppedCount, 1);
});

// ---- The name and date check (FN-02 step 6) ----

test("a made-up owner and a made-up deadline are both replaced, replacedCount is 2", () => {
  const result = checkItems([action({ owner: "Marcus", deadline: "by 31 March" })], TRANSCRIPT);
  const [item] = result.items;
  assert.equal(item.owner, "Not stated");
  assert.equal(item.deadline, "Not stated");
  assert.equal(result.replacedCount, 2);
  assert.equal(item.suggested_question, "Who is responsible for this action, and by when?");
});

test("an owner or deadline differing only in case or spacing is kept as returned", () => {
  const result = checkItems([action({ owner: "tomas", deadline: "BY   friday" })], TRANSCRIPT);
  assert.equal(result.items[0].owner, "tomas");
  assert.equal(result.items[0].deadline, "BY   friday");
  assert.equal(result.replacedCount, 0);
});

test("an owner with several names is replaced if any one name is missing", () => {
  const result = checkItems([action({ owner: "Tomas and Priya" })], TRANSCRIPT);
  assert.equal(result.items[0].owner, "Not stated");
  assert.equal(result.replacedCount, 1);
});

test("an existing suggested question is kept when a value is replaced", () => {
  const result = checkItems([action({ owner: "Marcus", suggested_question: "Who owns this?" })], TRANSCRIPT);
  assert.equal(result.items[0].suggested_question, "Who owns this?");
});

test("items get ids and the AI source, and only actions keep an owner or deadline", () => {
  const note = { type: "discussion_point", text: "Talk.", quote: "I will draft it.", owner: "Kofi", deadline: "Friday", suggested_question: "?" };
  const { items } = checkItems([note, action({})], TRANSCRIPT);
  assert.deepEqual(items.map((item) => item.id), ["item-1", "item-2"]);
  assert.ok(items.every((item) => item.source === "AI"));
  assert.equal(items[0].owner, null);
  assert.equal(items[0].deadline, null);
});

// ---- The summary bar (FN-03) ----

test("open gaps count flags, so an action missing both owner and deadline counts as 2", () => {
  const { items } = checkItems([action({ owner: "Not stated", deadline: "Not stated" })], TRANSCRIPT);
  assert.equal(summarize(items).openGaps, 2);
});

test("a saved gap answer closes its flag and an empty answer reopens it", () => {
  const { items } = checkItems([action({ owner: "Not stated", deadline: "by Friday" })], TRANSCRIPT);
  assert.equal(summarize(items).openGaps, 1);
  items[0].owner = "Dana Whitfield";
  assert.equal(summarize(items).openGaps, 0);
  items[0].owner = "Not stated";
  assert.equal(summarize(items).openGaps, 1);
});

test("every item starts as Not reviewed, and decisions move the counts", () => {
  const { items } = checkItems([action({}), action({}), action({})], TRANSCRIPT);
  assert.equal(summarize(items).notReviewed, 3);
  items[0].decision = "accepted";
  items[1].decision = "rejected";
  const counts = summarize(items);
  assert.deepEqual([counts.accepted, counts.rejected, counts.notReviewed], [1, 1, 1]);
});

// ---- The Word file (FN-04), built with the vendored library ----

function loadVendoredDocx() {
  const source = readFileSync(new URL("../public/vendor/docx.min.js", import.meta.url), "utf8");
  return new Function(`${source}\nreturn docx;`)();
}

// Reads word/document.xml out of the .docx zip, using only Node's own zlib.
function documentXml(buffer) {
  const end = buffer.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  let offset = buffer.readUInt32LE(end + 16);
  for (let i = 0; i < buffer.readUInt16LE(end + 10); i += 1) {
    const method = buffer.readUInt16LE(offset + 10);
    const size = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const local = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString("utf8", offset + 46, offset + 46 + nameLength);
    if (name === "word/document.xml") {
      const start = local + 30 + buffer.readUInt16LE(local + 26) + buffer.readUInt16LE(local + 28);
      const data = buffer.subarray(start, start + size);
      return (method === 8 ? inflateRawSync(data) : data).toString("utf8");
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error("document.xml not found");
}

async function exportedText(data) {
  const lib = loadVendoredDocx();
  const buffer = await lib.Packer.toBuffer(buildMomDocument(lib, data));
  assert.equal(buffer.subarray(0, 2).toString(), "PK");
  return [...documentXml(buffer).matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1]).join("\n");
}

const META = { promptVersion: "v1", model: "test-model", generatedAt: "2026-01-01T00:00:00Z", isSample: false };

function fiveItems() {
  const quotes = ["Tomas, can you get us sandbox access by Friday?", "I will draft it."];
  const make = (text, quote, type = "decision") => ({ type, text, quote, owner: null, deadline: null, suggested_question: null, source: "AI" });
  const items = [
    make("Accepted one", quotes[0]),
    make("Accepted two", quotes[1]),
    make("Edited original", quotes[0]),
    make("Rejected one", quotes[1]),
    make("Untouched one", quotes[0]),
  ].map((item, i) => ({ ...item, id: `item-${i + 1}` }));
  items[0].decision = "accepted";
  items[1].decision = "accepted";
  items[2].decision = "edited";
  items[2].edited_text = "Edited new wording";
  items[3].decision = "rejected";
  return items;
}

test("Word file: rejected items are out of the body, unreviewed ones are labelled, all are in the audit trail", async () => {
  const text = await exportedText({ title: "Address review", items: fiveItems(), meta: META, exportedAt: "2026-01-02T00:00:00Z" });
  const body = text.slice(0, text.indexOf("Audit trail"));
  const audit = text.slice(text.indexOf("Audit trail"));

  assert.ok(text.startsWith("Address review"));
  assert.ok(body.includes("Accepted one") && body.includes("Accepted two"));
  assert.ok(body.includes("Edited new wording") && !body.includes("Edited original"));
  assert.ok(body.includes("Not reviewed: Untouched one"));
  assert.ok(!body.includes("Rejected one"));
  assert.ok(audit.includes("Rejected one") && audit.includes("Rejected"));
  assert.ok(audit.includes("Prompt version: v1") && audit.includes("Model: test-model"));
  assert.ok(audit.includes("Time of the AI run: 2026-01-01T00:00:00Z") && audit.includes("Time of export: 2026-01-02T00:00:00Z"));
  assert.ok(audit.includes("Mode: Live"));
});

test("Word file: Demo mode audit trail says sample data, no AI", async () => {
  const text = await exportedText({ title: "", items: fiveItems(), meta: { ...META, isSample: true }, exportedAt: "x" });
  assert.ok(text.includes("Mode: Demo mode: sample data, no AI"));
  assert.ok(text.startsWith("Meeting minutes"));
});

test("Word file: action table shows Not stated and what the BA entered", async () => {
  const { items } = checkItems(
    [action({ owner: "Not stated", deadline: "Not stated" }), action({ owner: "Not stated", deadline: "by Friday" })],
    TRANSCRIPT,
  );
  items[1].owner = "Dana Whitfield";
  items[1].owner_entered_by_ba = true;
  const text = await exportedText({ title: "t", items, meta: META, exportedAt: "x" });
  assert.ok(text.includes("Not stated"));
  assert.ok(text.includes("Dana Whitfield"));
  assert.ok(text.includes("Owner")); // audit trail records who entered the value
});

test("file name comes from the title, or MoM-draft", () => {
  assert.equal(fileNameFor("Address Change Review!"), "MoM-address-change-review.docx");
  assert.equal(fileNameFor("   "), "MoM-draft.docx");
});
