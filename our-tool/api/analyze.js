// POST /api/analyze (FN-01, FN-02). Order: access code, input limits, one AI call, format check, quote check.
import { callModel as realCallModel, LlmError } from "../lib/llm.js";
import { accessCodeProblem, transcriptProblem } from "../lib/rules.js";
import { FormatError, parseAiResult } from "../lib/validate.js";
import { buildPrompt, PROMPT_VERSION } from "../prompts/main.prompt.js";
import { OUTPUT_SCHEMA } from "../prompts/output-schema.js";
import { checkItems, MESSAGES } from "../public/js/mom-logic.js";

function fail(status, message) {
  return Response.json({ error: { message } }, { status });
}

// The AI call is passed in so tests can use a fake one and never reach the network.
export function createAnalyze({ callModel }) {
  return {
    async fetch(request) {
      if (request.method !== "POST") return fail(405, "Use POST.");

      // 1. Access code first, whatever the body holds.
      const codeProblem = accessCodeProblem(request.headers.get("x-access-code"), process.env.TOOL_ACCESS_CODE);
      if (codeProblem) return fail(401, codeProblem);

      // 2. Spending guard: empty, then too long, before any AI call.
      let body;
      try {
        body = await request.json();
      } catch {
        return fail(400, MESSAGES.empty);
      }
      const problem = transcriptProblem(body?.transcript);
      if (problem) return fail(400, problem);
      const transcript = body.transcript;

      // 3. One AI call per run, no retry. Log the safe reason only, never the transcript, the key or the access code.
      try {
        const { system, user } = buildPrompt(transcript);
        const { text, model } = await callModel({ system, user, schema: OUTPUT_SCHEMA });
        const generatedAt = new Date().toISOString();

        // 4. Format check, then the quote check and the name and date check.
        const result = checkItems(parseAiResult(text), transcript);
        return Response.json({ ...result, promptVersion: PROMPT_VERSION, model, generatedAt });
      } catch (error) {
        if (error instanceof FormatError) {
          console.error(`Wrong format: ${error.message}`);
          return fail(502, MESSAGES.wrongFormat);
        }
        console.error(error instanceof LlmError ? error.message : "Unexpected error");
        return fail(502, MESSAGES.aiFailed);
      }
    },
  };
}

export default createAnalyze({ callModel: realCallModel });
