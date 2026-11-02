import assert from "node:assert/strict";
import test from "node:test";

import { createMeetings } from "../api/meetings.js";
import { createStore, StoreError } from "../lib/store.js";
import { MAX_SAVED_ITEMS, parseSavedMeeting, SaveRequestError } from "../lib/validate.js";
import { MESSAGES } from "../public/js/mom-logic.js";

const ID = "3f2b8a4e-1c2d-4e5f-8a9b-0c1d2e3f4a5b";

const item = (overrides) => ({
  id: "item-1",
  type: "action",
  text: "Update the checklist template.",
  quote: "Jonas, can you update the checklist template by Wednesday?",
  owner: "Jonas",
  deadline: "by Wednesday",
  suggested_question: null,
  source: "AI",
  decision: "accepted",
  decided_at: "2026-11-03T01:00:00Z",
  ...overrides,
});

const minutes = (overrides) => ({
  title: "Onboarding review",
  items: [item({}), item({ id: "item-2", type: "decision", owner: null, deadline: null, decision: "rejected" })],
  meta: { promptVersion: "v1", model: "claude-haiku-5-5", generatedAt: "2026-11-03T00:59:00Z", isSample: false },
  droppedCount: 1,
  replacedCount: 0,
  ...overrides,
});

// A fake database that keeps rows in memory.
function fakeStore({ broken = false } = {}) {
  const rows = [];
  const guard = () => {
    if (broken) throw new StoreError("Storage request failed (500)");
  };
  return {
    rows,
    async save(row) {
      guard();
      const saved = { ...row, id: ID, created_at: "2026-11-03T01:05:00Z" };
      rows.push(saved);
      return saved;
    },
    async list() {
      guard();
      return rows;
    },
    async get(id) {
      guard();
      return rows.find((row) => row.id === id) ?? null;
    },
  };
}

function request(method, { body, code = "test-code", query = "" } = {}) {
  return new Request(`http://localhost/api/meetings${query}`, {
    method,
    headers: { "content-type": "application/json", "x-access-code": code },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.beforeEach(() => {
  process.env.TOOL_ACCESS_CODE = "test-code";
});

// ---- The endpoint ----

test("save, list and open a saved record", async () => {
  const store = fakeStore();
  const api = createMeetings({ store });

  const saved = await (await api.fetch(request("POST", { body: minutes({}) }))).json();
  assert.equal(saved.id, ID);
  assert.equal(store.rows[0].title, "Onboarding review");
  assert.equal(store.rows[0].mode, "live");
  assert.equal(store.rows[0].dropped_count, 1);

  const { meetings } = await (await api.fetch(request("GET"))).json();
  assert.equal(meetings.length, 1);
  assert.deepEqual([meetings[0].counts.total, meetings[0].counts.accepted, meetings[0].counts.rejected], [2, 1, 1]);
  assert.equal(meetings[0].items, undefined); // the list sends counts only

  const one = await (await api.fetch(request("GET", { query: `?id=${ID}` }))).json();
  assert.equal(one.items.length, 2);
  assert.equal(one.model, "claude-haiku-5-5");
  assert.equal(one.droppedCount, 1);
});

test("every method needs the access code", async () => {
  const store = fakeStore();
  const api = createMeetings({ store });
  for (const method of ["GET", "POST"]) {
    const response = await api.fetch(request(method, { code: "wrong", body: method === "POST" ? minutes({}) : undefined }));
    assert.equal(response.status, 401);
    assert.equal((await response.json()).error.message, MESSAGES.accessCode);
  }
  assert.equal(store.rows.length, 0);
});

test("a bad save request returns 400 and stores nothing", async () => {
  const store = fakeStore();
  const api = createMeetings({ store });
  for (const body of [{}, minutes({ items: [] }), minutes({ items: [item({ type: "risk" })] }), minutes({ title: 5 })]) {
    const response = await api.fetch(request("POST", { body }));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.message, MESSAGES.saveInvalid);
  }
  assert.equal(store.rows.length, 0);
});

test("an unknown or malformed id returns 404 without asking the database for a bad id", async () => {
  const api = createMeetings({ store: fakeStore() });
  assert.equal((await api.fetch(request("GET", { query: `?id=${ID}` }))).status, 404);
  assert.equal((await api.fetch(request("GET", { query: "?id=1;drop" }))).status, 404);
});

test("a database failure returns 502 with plain messages and logs no minutes", async () => {
  const logged = [];
  const original = console.error;
  console.error = (...args) => logged.push(args.join(" "));
  try {
    const api = createMeetings({ store: fakeStore({ broken: true }) });
    const save = await api.fetch(request("POST", { body: minutes({}) }));
    assert.equal(save.status, 502);
    const saveBody = await save.json();
    assert.equal(saveBody.error.message, MESSAGES.saveFailed);
    assert.equal(saveBody.error.reason, "Storage request failed (500)");
    const list = await api.fetch(request("GET"));
    assert.equal(list.status, 502);
    assert.equal((await list.json()).error.message, MESSAGES.loadFailed);
  } finally {
    console.error = original;
  }
  assert.ok(logged.every((line) => !line.includes("checklist") && !line.includes("test-code")));
});

// ---- What gets stored ----

test("only known fields are stored, and the mode is always live", () => {
  const row = parseSavedMeeting(minutes({ items: [item({ editing: true, secret: "x" })], meta: { isSample: true } }));
  assert.equal(row.items[0].editing, undefined);
  assert.equal(row.items[0].secret, undefined);
  assert.equal(row.items[0].source, "AI");
  assert.equal(row.mode, "live");
});

test("save limits are enforced", () => {
  const many = Array.from({ length: MAX_SAVED_ITEMS + 1 }, (_, i) => item({ id: `item-${i}` }));
  assert.throws(() => parseSavedMeeting(minutes({ items: many })), SaveRequestError);
  assert.throws(() => parseSavedMeeting(minutes({ title: "t".repeat(201) })), SaveRequestError);
  assert.throws(() => parseSavedMeeting(minutes({ items: [item({ text: "x".repeat(5001) })] })), SaveRequestError);
  assert.throws(() => parseSavedMeeting(minutes({ items: [item({ decision: "approved" })] })), SaveRequestError);
});

// ---- The database adapter ----

test("the adapter sends the secret key only to the database address and never returns it", async () => {
  process.env.SUPABASE_URL = "https://example.supabase.co/";
  process.env.SUPABASE_SECRET_KEY = "fake-secret";
  const calls = [];
  const fetchFn = async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify([{ id: ID, created_at: "t" }]), { status: 200 });
  };
  const store = createStore({ fetchFn });
  const saved = await store.save({ title: "x" });
  await store.get(ID);

  assert.equal(saved.id, ID);
  assert.equal(calls[0].url, "https://example.supabase.co/rest/v1/meetings");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers.apikey, "fake-secret");
  assert.equal(calls[1].url, `https://example.supabase.co/rest/v1/meetings?id=eq.${ID}&select=*`);
  assert.ok(!JSON.stringify(saved).includes("fake-secret"));
});

test("the adapter fails safely when settings are missing or the database answers with an error", async () => {
  delete process.env.SUPABASE_URL;
  await assert.rejects(createStore({ fetchFn: async () => assert.fail("no call expected") }).list(), StoreError);

  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SECRET_KEY = "fake-secret";
  const store = createStore({ fetchFn: async () => new Response("secret row text", { status: 500 }) });
  await assert.rejects(store.list(), (error) => error instanceof StoreError && !error.message.includes("secret row"));
});
