// Checks that need no AI. They run before any AI call (FN-01 steps 2 to 4).
import { createHash, timingSafeEqual } from "node:crypto";
import { checkTranscript, MESSAGES } from "../public/js/mom-logic.js";

// Compares hashes so the comparison takes the same time whatever the guess is.
export function accessCodeOk(given, expected) {
  if (!expected || typeof given !== "string") return false;
  const hash = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(given), hash(expected));
}

export const accessCodeProblem = (given, expected) => (accessCodeOk(given, expected) ? null : MESSAGES.accessCode);

// Empty first, then too long. Returns a message, or null when the transcript can go to the AI.
export const transcriptProblem = checkTranscript;
