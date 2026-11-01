// Screen controller for SCR-01: takes input, runs live or Demo mode, and handles the BA's decisions.
import { analyze } from "./api-client.js";
import { downloadMom, EXPORT_ERROR } from "./export-docx.js";
import {
  checkItems,
  checkTranscript,
  MAX_TRANSCRIPT_CHARS,
  NOT_STATED,
  normalize,
  summarize,
} from "./mom-logic.js";
import { refreshItem, renderDraft, showEmpty, showLoading } from "./render.js";

const $ = (id) => document.getElementById(id);
const nodes = {
  title: $("title"),
  code: $("access-code"),
  codeField: $("code-field"),
  transcript: $("transcript"),
  count: $("count"),
  draft: $("draft"),
  demoToggle: $("demo-toggle"),
  reset: $("reset"),
  resetConfirm: $("reset-confirm"),
  modeLabel: $("mode-label"),
  error: $("error"),
  errorText: $("error-text"),
  errorDemo: $("error-demo"),
  results: $("results"),
  downloadArea: $("download-area"),
  unreviewed: $("unreviewed-notice"),
  download: $("download"),
  audit: $("audit-line"),
};

// All state lives in this page only [A-11]. Reloading loses it.
const state = { demo: false, sampleTranscript: "", sampleName: "", hasDraft: false, items: [], droppedCount: 0, replacedCount: 0, meta: null };

const now = () => new Date().toISOString();
const itemById = (id) => state.items.find((item) => item.id === id);

function showError(message, { offerDemo = true } = {}) {
  nodes.errorText.textContent = message;
  nodes.errorDemo.hidden = !offerDemo || state.demo;
  nodes.error.hidden = false;
}
const clearError = () => {
  nodes.error.hidden = true;
};

function updateCount() {
  const length = nodes.transcript.value.length;
  nodes.count.textContent = `${length.toLocaleString("en-US")} of ${MAX_TRANSCRIPT_CHARS.toLocaleString("en-US")} characters`;
  nodes.count.dataset.over = String(length > MAX_TRANSCRIPT_CHARS);
}

// Download area: notice, audit line, and the button state follow the draft.
function updateDownload() {
  nodes.downloadArea.hidden = !state.hasDraft;
  if (!state.hasDraft) return;
  const counts = summarize(state.items);
  nodes.download.disabled = state.items.length === 0;
  const n = counts.notReviewed;
  nodes.unreviewed.hidden = n === 0;
  nodes.unreviewed.textContent =
    n === 1
      ? "1 item is not reviewed. It will be marked Not reviewed in the file."
      : `${n} items are not reviewed. They will be marked Not reviewed in the file.`;
  nodes.audit.textContent = state.meta.isSample
    ? "Sample data, no AI"
    : `Prompt version ${state.meta.promptVersion}, model ${state.meta.model}, drafted ${state.meta.generatedAt}`;
}

function showDraft(result) {
  state.items = result.items.map((item) => ({ ...item }));
  state.droppedCount = result.droppedCount;
  state.replacedCount = result.replacedCount;
  state.meta = { promptVersion: result.promptVersion, model: result.model, generatedAt: result.generatedAt, isSample: Boolean(result.isSample) };
  state.hasDraft = true;
  renderDraft(nodes.results, state);
  nodes.reset.hidden = false;
  updateDownload();
}

function clearDraft() {
  state.hasDraft = false;
  state.items = [];
  nodes.reset.hidden = true;
  nodes.resetConfirm.hidden = true;
  showEmpty(nodes.results);
  updateDownload();
}

// ---- Demo mode (FN-05): no server, no AI ----

async function fetchSample(name, extension) {
  const response = await fetch(`/samples/${name}.${extension}`);
  if (!response.ok) throw new Error("sample missing");
  return extension.endsWith("json") ? response.json() : response.text();
}

async function enterDemo() {
  const stress = new URLSearchParams(location.search).get("sample") === "stress";
  const name = stress ? "02-quote-check-stress-test" : "01-address-change-review";
  try {
    state.sampleTranscript = await fetchSample(name, "input.txt");
  } catch {
    showError("The sample data could not be loaded. Reload the page and try again.", { offerDemo: false });
    return;
  }
  state.demo = true;
  state.sampleName = name;
  clearError();
  clearDraft();
  nodes.transcript.value = state.sampleTranscript;
  nodes.modeLabel.hidden = false;
  nodes.codeField.hidden = true;
  nodes.demoToggle.textContent = "Exit Demo mode";
  updateCount();
}

function exitDemo() {
  state.demo = false;
  state.sampleTranscript = "";
  clearError();
  clearDraft();
  nodes.transcript.value = "";
  nodes.modeLabel.hidden = true;
  nodes.codeField.hidden = false;
  nodes.demoToggle.textContent = "Use Demo mode";
  updateCount();
}

async function draftFromSample() {
  showLoading(nodes.results);
  let saved;
  try {
    saved = await fetchSample(state.sampleName, "expected.json");
  } catch {
    showEmpty(nodes.results);
    showError("The sample data could not be loaded. Reload the page and try again.", { offerDemo: false });
    return;
  }
  // The saved items go through the same checks as live results, against the sample transcript.
  // Any counts stored in the file are ignored.
  const checked = checkItems(saved.items, state.sampleTranscript);
  showDraft({ ...checked, promptVersion: saved.promptVersion, model: saved.model, generatedAt: saved.generatedAt, isSample: true });
}

// ---- Live mode (FN-01) ----

async function draftLive() {
  const transcript = nodes.transcript.value;
  const problem = checkTranscript(transcript);
  if (problem) {
    showError(problem);
    return;
  }
  showLoading(nodes.results);
  try {
    const result = await analyze({ transcript, accessCode: nodes.code.value });
    showDraft({ ...result, isSample: false });
  } catch (error) {
    showEmpty(nodes.results);
    showError(error.message);
  }
}

async function onDraft() {
  clearError();
  nodes.draft.disabled = true;
  try {
    if (state.demo) await draftFromSample();
    else await draftLive();
  } finally {
    nodes.draft.disabled = false;
  }
}

// ---- Decisions (FN-03) ----

function decide(item, decision) {
  item.decision = decision;
  item.decided_at = now();
  item.editing = false;
}

function onResultsClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = itemById(button.dataset.id);
  if (!item) return;
  const action = button.dataset.action;

  if (action === "accept") decide(item, "accepted");
  else if (action === "reject") decide(item, "rejected");
  else if (action === "edit") item.editing = true;
  else if (action === "cancel-edit") item.editing = false;
  else if (action === "save-edit") {
    const box = nodes.results.querySelector(`#edit-${item.id}`);
    const text = box.value.trim();
    if (text === "") {
      button.closest(".item").querySelector('[data-role="edit-error"]').textContent = "Item text can't be empty. Enter text, or choose Reject.";
      return;
    }
    item.edited_text = text;
    decide(item, "edited");
  } else if (action === "save-gap") {
    const field = button.dataset.field;
    const answer = normalize(nodes.results.querySelector(`#gap-${item.id}-${field}`).value);
    // The tool never fills a gap itself. Only the BA's typed answer does. An empty answer reopens it.
    item[field] = answer === "" ? NOT_STATED : answer;
    item[`${field}_entered_by_ba`] = answer !== "";
  } else return;

  refreshItem(nodes.results, state, item);
  updateDownload();
}

// ---- Download (FN-04) ----

async function onDownload() {
  try {
    await downloadMom({ title: nodes.title.value, items: state.items, meta: state.meta, exportedAt: now() });
  } catch {
    showError(EXPORT_ERROR, { offerDemo: false });
  }
}

// ---- Wiring ----

nodes.transcript.addEventListener("input", updateCount);
nodes.draft.addEventListener("click", onDraft);
nodes.demoToggle.addEventListener("click", () => (state.demo ? exitDemo() : enterDemo()));
nodes.errorDemo.addEventListener("click", enterDemo);
nodes.results.addEventListener("click", onResultsClick);
nodes.download.addEventListener("click", onDownload);
nodes.reset.addEventListener("click", () => {
  nodes.resetConfirm.hidden = false;
});
$("reset-cancel").addEventListener("click", () => {
  nodes.resetConfirm.hidden = true;
});
$("reset-yes").addEventListener("click", () => {
  clearDraft();
  clearError();
  if (state.demo) nodes.transcript.value = state.sampleTranscript;
  else nodes.transcript.value = "";
  updateCount();
});

updateCount();
