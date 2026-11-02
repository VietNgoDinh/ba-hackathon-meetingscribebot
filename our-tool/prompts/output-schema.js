// What the AI must return (A3.3). Sent to the AI as the response format, and re-checked by lib/validate.js.
export const ITEM_TYPES = ["discussion_point", "decision", "action"];

const textOrNull = { anyOf: [{ type: "string" }, { type: "null" }] };

export const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          quote: { type: "string" },
          type: { type: "string", enum: ITEM_TYPES },
          text: { type: "string" },
          owner: textOrNull,
          deadline: textOrNull,
          suggested_question: textOrNull,
        },
        required: ["quote", "type", "text", "owner", "deadline", "suggested_question"],
        additionalProperties: false,
      },
    },
  },
  required: ["items"],
  additionalProperties: false,
};
