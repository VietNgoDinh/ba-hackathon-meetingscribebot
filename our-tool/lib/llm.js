// AI adapter. The rest of the tool calls callModel() and never touches a provider directly.
// The provider comes from LLM_PROVIDER, the model from LLM_MODEL, the key from LLM_API_KEY.
import Anthropic from "@anthropic-ai/sdk";

// Models that accept the server-side fallback setting. Haiku does not, so it is left out.
const FALLBACK_MODELS = /^claude-(opus|sonnet|fable)/;

export class LlmError extends Error {}

// Sends one request and returns { text, model }. Throws LlmError on any failure,
// with a message that is safe to log (it never contains the key or the transcript).
export async function callModel({ system, user, schema, maxTokens = 16000 }) {
  const provider = process.env.LLM_PROVIDER ?? "claude";
  if (provider !== "claude") throw new LlmError(`Unsupported LLM_PROVIDER: ${provider}`);

  const model = process.env.LLM_MODEL;
  if (!process.env.LLM_API_KEY || !model) throw new LlmError("AI settings are missing");

  const client = new Anthropic({ apiKey: process.env.LLM_API_KEY });

  const request = {
    model,
    max_tokens: maxTokens,
    output_config: { effort: "medium" },
    system,
    messages: [{ role: "user", content: user }],
  };
  if (schema) request.output_config.format = { type: "json_schema", schema };
  if (FALLBACK_MODELS.test(model)) {
    request.betas = ["server-side-fallback-2026-07-01"];
    request.fallbacks = "default";
  }

  let response;
  try {
    response = await client.beta.messages.create(request);
  } catch (error) {
    const status = error instanceof Anthropic.APIError ? error.status : "network";
    throw new LlmError(`AI request failed (${status})`);
  }

  if (response.stop_reason === "refusal") throw new LlmError("AI refused the request");
  if (response.stop_reason === "max_tokens") throw new LlmError("AI stopped before it finished");

  const block = response.content.find((b) => b.type === "text");
  if (!block) throw new LlmError("AI returned no text");
  return { text: block.text, model: response.model ?? model };
}
