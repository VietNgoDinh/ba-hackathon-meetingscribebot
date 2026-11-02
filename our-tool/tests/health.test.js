import assert from "node:assert/strict";
import test from "node:test";

import health from "../api/health.js";

test("health reports whether settings exist, never their values", async () => {
  process.env.LLM_API_KEY = "fake-test-value";
  delete process.env.TOOL_ACCESS_CODE;
  delete process.env.SUPABASE_URL;
  process.env.SUPABASE_SECRET_KEY = "fake-storage-value";
  process.env.VERCEL_GIT_COMMIT_SHA = "abc123";

  const response = await health.fetch();
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    ok: true,
    commit: "abc123",
    llmKeyConfigured: true,
    accessCodeConfigured: false,
    storageConfigured: false,
  });
  assert.ok(!JSON.stringify(body).includes("fake-test-value") && !JSON.stringify(body).includes("fake-storage-value"));
});
