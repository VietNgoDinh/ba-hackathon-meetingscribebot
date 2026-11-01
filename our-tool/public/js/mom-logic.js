// Shared by the server (live mode) and the browser (Demo mode), so both apply the same rules.
// No page code in here: it must run in Node and in the browser unchanged. (FN-01 input rules, FN-02 steps 4 to 8, FN-03 counts)

export const MAX_TRANSCRIPT_CHARS = 20000; // [A-12] working limit, not measured
export const NOT_STATED = "Not stated";
export const FIXED_QUESTION = "Who is responsible for this action, and by when?";

export const MESSAGES = {
  empty: "Paste a transcript before you draft the MoM.",
  tooLong:
    "This transcript is longer than the 20,000-character limit. Shorten it, for example by removing small talk, then try again.",
  accessCode:
    "The access code is missing or not correct. Enter the code you were given, or use Demo mode.",
  aiFailed:
    "The draft could not be created, and nothing was changed. Try again, or use Demo mode to see a sample.",
  wrongFormat:
    "The AI returned a result in the wrong format, so it was not shown. Try again, or use Demo mode to see a sample.",
};

// Returns an error message, or null when the transcript is acceptable.
// Order matters: empty first, then too long.
export function checkTranscript(transcript) {
  if (typeof transcript !== "string" || transcript.trim() === "") return MESSAGES.empty;
  if (transcript.length > MAX_TRANSCRIPT_CHARS) return MESSAGES.tooLong;
  return null;
}

// Every run of spaces, tabs and line breaks becomes one space. Nothing else changes.
export function normalize(text) {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

function present(value) {
  return typeof value === "string" && normalize(value) !== "";
}

// FN-02 steps 4 to 8. Takes items that already match the schema, and the transcript.
// Returns the kept items (with id, source and gap flags) and the two counts.
export function checkItems(items, transcript) {
  const text = normalize(transcript);
  const lower = text.toLowerCase();
  const kept = [];
  let droppedCount = 0;
  let replacedCount = 0;

  for (const raw of items) {
    const quote = normalize(raw.quote);
    // Quote check: no matching quote, no item.
    if (quote === "" || !text.includes(quote)) {
      droppedCount += 1;
      continue;
    }

    const item = { ...raw, source: "AI" };
    if (item.type === "action") {
      let replaced = false;

      // Name check: every name in the owner must appear in the transcript.
      if (!present(item.owner)) {
        item.owner = NOT_STATED;
      } else if (item.owner !== NOT_STATED) {
        const names = item.owner.split(/,|&|\band\b/i).map(normalize).filter(Boolean);
        if (names.length === 0 || !names.every((name) => lower.includes(name.toLowerCase()))) {
          item.owner = NOT_STATED;
          replacedCount += 1;
          replaced = true;
        }
      }

      // Date check: the deadline wording must appear in the transcript.
      if (!present(item.deadline)) {
        item.deadline = NOT_STATED;
      } else if (item.deadline !== NOT_STATED && !lower.includes(normalize(item.deadline).toLowerCase())) {
        item.deadline = NOT_STATED;
        replacedCount += 1;
        replaced = true;
      }

      if (replaced && !present(item.suggested_question)) item.suggested_question = FIXED_QUESTION;
    } else {
      item.owner = null;
      item.deadline = null;
      item.suggested_question = null;
    }
    kept.push(item);
  }

  kept.forEach((item, index) => {
    item.id = `item-${index + 1}`;
  });
  return { items: kept, droppedCount, replacedCount };
}

// Gap flags are worked out from the current values, so a saved answer clears its flag.
export function gapsOf(item) {
  if (item.type !== "action") return { owner: false, deadline: false };
  return { owner: item.owner === NOT_STATED, deadline: item.deadline === NOT_STATED };
}

// FN-03 step 6. Open gaps count flags, not actions: an action missing both counts as 2.
export function summarize(items) {
  const count = (decision) => items.filter((item) => item.decision === decision).length;
  const openGaps = items.reduce((sum, item) => {
    const gaps = gapsOf(item);
    return sum + (gaps.owner ? 1 : 0) + (gaps.deadline ? 1 : 0);
  }, 0);
  return {
    total: items.length,
    accepted: count("accepted"),
    edited: count("edited"),
    rejected: count("rejected"),
    notReviewed: items.filter((item) => !item.decision).length,
    openGaps,
  };
}

export function removedNotice(droppedCount) {
  if (droppedCount === 0) return null;
  return droppedCount === 1
    ? "1 item was removed because its quote was not found in the transcript."
    : `${droppedCount} items were removed because their quote was not found in the transcript.`;
}

export function replacedNotice(replacedCount) {
  if (replacedCount === 0) return null;
  return replacedCount === 1
    ? "1 owner or deadline value was replaced with Not stated because it was not found in the transcript."
    : `${replacedCount} owner or deadline values were replaced with Not stated because they were not found in the transcript.`;
}

export function displayText(item) {
  return item.edited_text ?? item.text;
}
