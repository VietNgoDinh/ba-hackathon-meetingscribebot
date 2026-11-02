// FN-02 steps 2 and 3: read the AI's answer and check it against the data contract (A3.3).
// The checks on the items themselves (quote, names, dates) are in public/js/mom-logic.js.
import { ITEM_TYPES } from "../prompts/output-schema.js";

export class FormatError extends Error {}

const isText = (value) => typeof value === "string";
const isTextOrNull = (value) => value === null || isText(value);

// Returns the list of items, or throws FormatError. Nothing from an invalid answer is returned.
export function parseAiResult(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new FormatError("AI answer is not valid JSON");
  }

  if (data === null || typeof data !== "object" || !Array.isArray(data.items)) {
    throw new FormatError("AI answer has no items list");
  }

  data.items.forEach((item, index) => {
    const where = `item ${index + 1}`;
    if (item === null || typeof item !== "object") throw new FormatError(`${where} is not an object`);
    if (!ITEM_TYPES.includes(item.type)) throw new FormatError(`${where} has an unknown type`);
    if (!isText(item.quote)) throw new FormatError(`${where} has no quote`);
    if (!isText(item.text) || item.text.trim() === "") throw new FormatError(`${where} has no text`);
    for (const field of ["owner", "deadline", "suggested_question"]) {
      if (!isTextOrNull(item[field])) throw new FormatError(`${where} has a wrong ${field}`);
    }
  });

  return data.items;
}

// ---- Saved minutes (FN-09) ----

export class SaveRequestError extends Error {}

// Working limits for one saved record [A-22].
export const MAX_SAVED_ITEMS = 100;
export const MAX_TITLE_CHARS = 200;
export const MAX_FIELD_CHARS = 5000;

const ITEM_TEXT_FIELDS = ["id", "text", "quote", "owner", "deadline", "suggested_question", "edited_text", "decided_at"];
const DECISIONS = ["accepted", "edited", "rejected"];

const short = (value) => typeof value === "string" && value.length <= MAX_FIELD_CHARS;
const shortOrNull = (value) => value === null || value === undefined || short(value);

// Keeps only the known fields of each item, so nothing else can be stored. Throws SaveRequestError.
export function parseSavedMeeting(body) {
  const bad = (why) => new SaveRequestError(why);
  if (!body || typeof body !== "object" || !Array.isArray(body.items)) throw bad("no items list");
  if (body.items.length === 0 || body.items.length > MAX_SAVED_ITEMS) throw bad("item count out of range");

  const title = body.title ?? "";
  if (typeof title !== "string" || title.length > MAX_TITLE_CHARS) throw bad("bad title");

  const items = body.items.map((raw) => {
    if (!raw || typeof raw !== "object") throw bad("item is not an object");
    if (!ITEM_TYPES.includes(raw.type)) throw bad("unknown item type");
    if (!short(raw.text) || !short(raw.quote)) throw bad("bad item text");
    for (const field of ITEM_TEXT_FIELDS) if (!shortOrNull(raw[field])) throw bad(`bad ${field}`);
    if (raw.decision != null && !DECISIONS.includes(raw.decision)) throw bad("bad decision");
    const item = { type: raw.type, source: "AI" };
    for (const field of ITEM_TEXT_FIELDS) item[field] = raw[field] ?? null;
    item.decision = raw.decision ?? null;
    item.owner_entered_by_ba = raw.owner_entered_by_ba === true;
    item.deadline_entered_by_ba = raw.deadline_entered_by_ba === true;
    return item;
  });

  const meta = body.meta ?? {};
  const count = (value) => (Number.isInteger(value) && value >= 0 && value <= 1000 ? value : 0);
  return {
    title: title.trim(),
    mode: "live",
    prompt_version: short(meta.promptVersion) ? (meta.promptVersion ?? "") : "",
    model: short(meta.model) ? (meta.model ?? "") : "",
    generated_at: short(meta.generatedAt) ? (meta.generatedAt ?? "") : "",
    dropped_count: count(body.droppedCount),
    replaced_count: count(body.replacedCount),
    items,
  };
}
