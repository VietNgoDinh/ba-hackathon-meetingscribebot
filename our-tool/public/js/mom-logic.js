// Shared by the server (live mode) and the browser (Demo mode), so both apply the same rules.
// Foundation holds only the input rules. The quote check and gap flags (FN-02) are added at the full build.

export const MAX_TRANSCRIPT_CHARS = 20000; // [A-12] working limit, not measured

export const MESSAGES = {
  empty: "Paste a transcript before you draft the MoM.",
  tooLong:
    "This transcript is longer than the 20,000-character limit. Shorten it, for example by removing small talk, then try again.",
  accessCode:
    "The access code is missing or not correct. Enter the code you were given, or use Demo mode.",
  aiFailed:
    "The draft could not be created, and nothing was changed. Try again, or use Demo mode to see a sample.",
};

// Returns an error message, or null when the transcript is acceptable.
// Order matters: empty first, then too long.
export function checkTranscript(transcript) {
  if (typeof transcript !== "string" || transcript.trim() === "") return MESSAGES.empty;
  if (transcript.length > MAX_TRANSCRIPT_CHARS) return MESSAGES.tooLong;
  return null;
}
