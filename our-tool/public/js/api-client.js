// The only browser file that calls /api. It never stores the access code.
import { MESSAGES } from "./mom-logic.js";

// Returns the parsed result, or throws an Error whose message is safe to show to the BA.
export async function analyze({ transcript, accessCode }) {
  let response;
  try {
    response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json", "x-access-code": accessCode },
      body: JSON.stringify({ transcript }),
    });
  } catch {
    throw new Error(MESSAGES.aiFailed);
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    // Handled below.
  }
  if (!response.ok) throw new Error(body?.error?.message ?? MESSAGES.aiFailed);
  if (!body || !Array.isArray(body.items)) throw new Error(MESSAGES.wrongFormat);
  return body;
}
