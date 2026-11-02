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
