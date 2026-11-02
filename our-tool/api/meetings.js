// /api/meetings (FN-09). POST saves reviewed minutes. GET lists them, or returns one with ?id=.
// Same access code as /api/analyze. The database key stays here on the server.
import { createStore, StoreError } from "../lib/store.js";
import { accessCodeProblem } from "../lib/rules.js";
import { parseSavedMeeting, SaveRequestError } from "../lib/validate.js";
import { MESSAGES, summarize } from "../public/js/mom-logic.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fail(status, message) {
  return Response.json({ error: { message } }, { status });
}

const detail = (row) => ({
  id: row.id,
  title: row.title,
  createdAt: row.created_at,
  promptVersion: row.prompt_version,
  model: row.model,
  generatedAt: row.generated_at,
  droppedCount: row.dropped_count,
  replacedCount: row.replaced_count,
  items: row.items,
});

const summary = (row) => ({
  id: row.id,
  title: row.title,
  createdAt: row.created_at,
  model: row.model,
  counts: summarize(row.items),
});

// The store is passed in so tests can use a fake one and never reach the network.
export function createMeetings({ store }) {
  return {
    async fetch(request) {
      const codeProblem = accessCodeProblem(request.headers.get("x-access-code"), process.env.TOOL_ACCESS_CODE);
      if (codeProblem) return fail(401, codeProblem);

      try {
        if (request.method === "POST") {
          let row;
          try {
            row = parseSavedMeeting(await request.json());
          } catch (error) {
            if (error instanceof SaveRequestError || error instanceof SyntaxError) return fail(400, MESSAGES.saveInvalid);
            throw error;
          }
          const saved = await store.save(row);
          return Response.json({ id: saved.id, createdAt: saved.created_at });
        }

        if (request.method === "GET") {
          const id = new URL(request.url).searchParams.get("id");
          if (id === null) return Response.json({ meetings: (await store.list()).map(summary) });
          if (!UUID.test(id)) return fail(404, MESSAGES.notFound);
          const row = await store.get(id);
          return row ? Response.json(detail(row)) : fail(404, MESSAGES.notFound);
        }

        return fail(405, "Use GET or POST.");
      } catch (error) {
        // Log the safe reason only. Never log minutes, the key or the access code.
        console.error(error instanceof StoreError ? error.message : "Unexpected error");
        return fail(502, request.method === "POST" ? MESSAGES.saveFailed : MESSAGES.loadFailed);
      }
    },
  };
}

export default createMeetings({ store: createStore() });
