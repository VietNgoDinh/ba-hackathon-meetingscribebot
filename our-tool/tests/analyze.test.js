import assert from "node:assert/strict";
import test from "node:test";

import analyze from "../api/analyze.js";
import { MAX_TRANSCRIPT_CHARS, MESSAGES } from "../public/js/mom-logic.js";

function post(transcript, code) {
  return new Request("http://localhost/api/analyze", {
    method: "POST",
    headers: { "content-type": "application/json", ...(code ? { "x-access-code": code } : {}) },
    body: JSON.stringify({ transcript }),
  });
}

test.beforeEach(() => {
  process.env.TOOL_ACCESS_CODE = "test-code";
  // Deliberately no AI key: a request that gets past the checks fails with 502 and never reaches the network.
  delete process.env.LLM_API_KEY;
});

test("wrong or missing access code returns 401, even with an empty transcript", async () => {
  assert.equal((await analyze.fetch(post("", "wrong"))).status, 401);
  assert.equal((await analyze.fetch(post("Some text"))).status, 401);
});

test("empty transcript returns 400 with the agreed message", async () => {
  const response = await analyze.fetch(post("   ", "test-code"));
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.message, MESSAGES.empty);
});

test("transcript above the limit returns 400 with the agreed message", async () => {
  const response = await analyze.fetch(post("a".repeat(MAX_TRANSCRIPT_CHARS + 1), "test-code"));
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.message, MESSAGES.tooLong);
});

test("a transcript at the limit passes the checks and fails safely when the AI is not configured", async () => {
  const response = await analyze.fetch(post("a".repeat(MAX_TRANSCRIPT_CHARS), "test-code"));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error.message, MESSAGES.aiFailed);
});
