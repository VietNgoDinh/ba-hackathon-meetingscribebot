// Screen controller for SCR-02 Saved minutes (FN-09). Read only. Text is added with textContent, never as HTML.
import { getMeeting, listMeetings } from "./api-client.js";
import { decisionLabel } from "./export-docx.js";
import { displayText } from "./mom-logic.js";

const $ = (id) => document.getElementById(id);
const nodes = { code: $("access-code"), load: $("load"), list: $("list"), detail: $("detail"), error: $("error"), errorText: $("error-text") };

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "text") node.textContent = value;
    else if (key === "class") node.className = value;
    else if (value != null) node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

const when = (iso) => (iso ? new Date(iso).toLocaleString() : "");
const showError = (message) => {
  nodes.errorText.textContent = message;
  nodes.error.hidden = false;
};
const clearError = () => {
  nodes.error.hidden = true;
};

const GROUPS = [
  ["Discussion points", "discussion_point"],
  ["Decisions", "decision"],
  ["Action items", "action"],
];

function renderList(meetings) {
  if (meetings.length === 0) {
    nodes.list.replaceChildren(el("div", { class: "empty", text: "No minutes have been saved yet." }));
    return;
  }
  nodes.list.replaceChildren(
    ...meetings.map((meeting) => {
      const c = meeting.counts;
      return el("article", { class: "item" },
        el("p", { class: "item-text" }, el("strong", { text: meeting.title || "Meeting minutes" })),
        el("p", { class: "item-meta", text: `Saved ${when(meeting.createdAt)}. ${c.total} items: ${c.accepted} accepted, ${c.edited} edited, ${c.rejected} rejected, ${c.notReviewed} not reviewed.` }),
        el("button", { class: "btn", type: "button", "data-id": meeting.id, text: "Open" }),
      );
    }),
  );
}

function renderDetail(meeting) {
  const parts = [
    el("h2", { text: meeting.title || "Meeting minutes" }),
    el("p", { class: "item-meta", text: `Saved ${when(meeting.createdAt)}. Prompt version ${meeting.promptVersion}, model ${meeting.model}, drafted ${meeting.generatedAt}.` }),
  ];
  const checks = [];
  if (meeting.droppedCount) checks.push(`${meeting.droppedCount} removed by the quote check`);
  if (meeting.replacedCount) checks.push(`${meeting.replacedCount} replaced by the name and date check`);
  if (checks.length) parts.push(el("p", { class: "notice", text: `At drafting: ${checks.join(", ")}.` }));

  for (const [heading, type] of GROUPS) {
    parts.push(el("h2", { text: heading }));
    const chosen = meeting.items.filter((item) => item.type === type);
    if (chosen.length === 0) parts.push(el("p", { text: "None." }));
    for (const item of chosen) {
      const node = el("article", { class: "item" });
      if (item.decision) node.setAttribute("data-decision", item.decision);
      node.append(
        el("div", { class: "item-meta" }, el("span", { class: "badge", text: decisionLabel(item) })),
        el("p", { class: "item-text", text: displayText(item) }),
        el("blockquote", { class: "quote", text: item.quote }),
      );
      if (type === "action") {
        const by = (field) => (item[`${field}_entered_by_ba`] ? " (entered by BA)" : "");
        node.append(el("p", { class: "item-meta", text: `Owner: ${item.owner}${by("owner")}. Deadline: ${item.deadline}${by("deadline")}.` }));
      }
      parts.push(node);
    }
  }
  nodes.detail.replaceChildren(...parts);
}

async function onLoad() {
  clearError();
  nodes.load.disabled = true;
  nodes.list.replaceChildren(el("div", { class: "loading", text: "Loading saved minutes." }));
  try {
    renderList((await listMeetings({ accessCode: nodes.code.value })).meetings);
  } catch (error) {
    nodes.list.replaceChildren();
    showError(error.message);
  } finally {
    nodes.load.disabled = false;
  }
}

async function onOpen(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  clearError();
  nodes.detail.replaceChildren(el("div", { class: "loading", text: "Opening the saved minutes." }));
  try {
    renderDetail(await getMeeting({ accessCode: nodes.code.value, id: button.dataset.id }));
  } catch (error) {
    nodes.detail.replaceChildren();
    showError(error.message);
  }
}

nodes.load.addEventListener("click", onLoad);
nodes.list.addEventListener("click", onOpen);
