// Displays the draft: summary, notices, grouped items, and the buttons on each item.
// Text is always added with textContent, never as HTML, so transcript text cannot inject markup.
import { displayText, gapsOf, NOT_STATED, removedNotice, replacedNotice, summarize } from "./mom-logic.js";
import { decisionLabel } from "./export-docx.js";

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "text") node.textContent = value;
    else if (key === "class") node.className = value;
    else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

const badge = (text, kind) => el("span", { class: kind ? `badge ${kind}` : "badge", text });

const TYPE_LABEL = { discussion_point: "Discussion point", decision: "Decision", action: "Action" };
const GROUPS = [
  ["Discussion points", "discussion_point"],
  ["Decisions", "decision"],
  ["Action items", "action"],
];

function valueLine(item, field, label) {
  const entered = item[`${field}_entered_by_ba`];
  const line = el("p", { class: "item-meta" }, el("strong", { text: `${label}: ` }), document.createTextNode(item[field]));
  if (!entered) return line;
  line.append(badge("Entered by BA"));
  // The BA can change or clear a saved answer. An empty answer reopens the gap.
  const inputId = `gap-${item.id}-${field}`;
  const box = el("div", {}, line);
  box.append(
    el("div", { class: "field" }, el("label", { for: inputId, text: "Answer from attendees" }), el("input", { id: inputId, type: "text", autocomplete: "off", value: item[field] })),
    el("button", { class: "btn", type: "button", "data-action": "save-gap", "data-id": item.id, "data-field": field, text: "Save answer" }),
  );
  return box;
}

function gapFlag(item, field, label, showQuestion) {
  const inputId = `gap-${item.id}-${field}`;
  const box = el("div", { class: "notice notice-warn" });
  box.append(el("p", {}, el("strong", { text: `${label}: ${NOT_STATED} ` }), badge("Rule", "badge-rule")));
  if (showQuestion && item.suggested_question) {
    box.append(el("p", { text: `Suggested question: ${item.suggested_question}` }));
  }
  box.append(
    el("div", { class: "field" }, el("label", { for: inputId, text: "Answer from attendees" }), el("input", { id: inputId, type: "text", autocomplete: "off" })),
    el("button", { class: "btn", type: "button", "data-action": "save-gap", "data-id": item.id, "data-field": field, text: "Save answer" }),
  );
  return box;
}

export function renderItem(item) {
  const node = el("article", { class: "item", "data-id": item.id });
  if (item.decision) node.setAttribute("data-decision", item.decision);

  node.append(
    el("div", { class: "item-meta" }, badge("AI", "badge-ai"), badge(decisionLabel(item)), badge(TYPE_LABEL[item.type] ?? item.type)),
  );

  if (item.editing) {
    node.append(
      el("div", { class: "field" }, el("label", { for: `edit-${item.id}`, text: "Item text" }), el("textarea", { id: `edit-${item.id}`, rows: "3", text: displayText(item) })),
      el("p", { class: "item-meta", "data-role": "edit-error", role: "alert" }),
      el("div", { class: "decision" },
        el("button", { class: "btn btn-primary", type: "button", "data-action": "save-edit", "data-id": item.id, text: "Save edit" }),
        el("button", { class: "btn", type: "button", "data-action": "cancel-edit", "data-id": item.id, text: "Cancel" }),
      ),
    );
  } else {
    node.append(el("p", { class: "item-text", text: displayText(item) }));
  }

  node.append(el("blockquote", { class: "quote", text: item.quote }));

  if (item.type === "action") {
    const gaps = gapsOf(item);
    if (!gaps.owner) node.append(valueLine(item, "owner", "Owner"));
    if (!gaps.deadline) node.append(valueLine(item, "deadline", "Deadline"));
    if (gaps.owner) node.append(gapFlag(item, "owner", "Owner", true));
    if (gaps.deadline) node.append(gapFlag(item, "deadline", "Deadline", !gaps.owner));
  }

  node.append(
    el("div", { class: "decision" },
      el("button", { class: "btn", type: "button", "data-action": "accept", "data-id": item.id, text: "Accept" }),
      el("button", { class: "btn", type: "button", "data-action": "edit", "data-id": item.id, text: "Edit" }),
      el("button", { class: "btn", type: "button", "data-action": "reject", "data-id": item.id, text: "Reject" }),
    ),
  );
  return node;
}

function summaryBar(state) {
  const counts = summarize(state.items);
  const cells = [
    ["Items", counts.total],
    ["Accepted", counts.accepted],
    ["Edited", counts.edited],
    ["Rejected", counts.rejected],
    ["Not reviewed", counts.notReviewed],
    ["Open gaps", counts.openGaps],
    ["Removed by quote check", state.droppedCount],
    ["Replaced by name and date check", state.replacedCount],
  ];
  const bar = el("div", { class: "summary", "data-role": "summary" });
  for (const [label, value] of cells) {
    bar.append(el("div", { class: "summary-item" }, el("strong", { text: String(value) }), document.createTextNode(label)));
  }
  return bar;
}

// Draws the whole result panel. Used when a draft first appears.
export function renderDraft(container, state) {
  container.replaceChildren();
  container.append(el("div", { class: "notice notice-warn", text: "This draft is kept only in this page. Download the Word file before you close or reload." }));
  container.append(summaryBar(state));

  for (const text of [removedNotice(state.droppedCount), replacedNotice(state.replacedCount)]) {
    if (text) container.append(el("div", { class: "notice", "data-role": "check-notice", text }));
  }

  if (state.items.length === 0) {
    container.append(el("div", { class: "empty", text: "No item could be matched to the transcript. Check the transcript text and try again, or use Demo mode." }));
    return;
  }

  for (const [heading, type] of GROUPS) {
    container.append(el("h2", { text: heading }));
    const chosen = state.items.filter((item) => item.type === type);
    if (chosen.length === 0) container.append(el("p", { text: "None found." }));
    for (const item of chosen) container.append(renderItem(item));
  }
}

// Redraws one item and the summary bar, so text typed into other items is not lost.
export function refreshItem(container, state, item) {
  const old = container.querySelector(`.item[data-id="${item.id}"]`);
  if (old) old.replaceWith(renderItem(item));
  const bar = container.querySelector('[data-role="summary"]');
  if (bar) bar.replaceWith(summaryBar(state));
}

export function showEmpty(container) {
  container.replaceChildren(
    el("div", { class: "empty", text: "No draft yet. Paste a transcript on the left and choose Draft MoM, or choose Use Demo mode to see a sample." }),
  );
}

export function showLoading(container) {
  container.replaceChildren(el("div", { class: "loading", text: "Reading the transcript and drafting the MoM." }));
}
