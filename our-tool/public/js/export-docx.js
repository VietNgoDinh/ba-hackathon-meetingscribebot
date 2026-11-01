// FN-04. Builds the Word file in the browser from the library in /vendor/docx.min.js.
// buildMomDocument takes the library as an argument so tests can load the same file in Node.
import { displayText, NOT_STATED } from "./mom-logic.js";

const DECISION_LABEL = { accepted: "Accepted", edited: "Edited", rejected: "Rejected" };

export const DEMO_AUDIT_MODE = "Demo mode: sample data, no AI";
export const EXPORT_ERROR =
  "The Word file could not be created. Your decisions are still on screen. Try again, or select the text on the screen and copy it into a document.";

export function decisionLabel(item) {
  return DECISION_LABEL[item.decision] ?? "Not reviewed";
}

export function fileNameFor(title) {
  const slug = String(title ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug ? `MoM-${slug}.docx` : "MoM-draft.docx";
}

function enteredByBa(item) {
  if (item.owner_entered_by_ba && item.deadline_entered_by_ba) return "Owner and deadline";
  if (item.owner_entered_by_ba) return "Owner";
  if (item.deadline_entered_by_ba) return "Deadline";
  return "No";
}

// data: { title, items, meta: { promptVersion, model, generatedAt, isSample }, exportedAt }
export function buildMomDocument(lib, data) {
  const { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } = lib;
  const { items, meta } = data;

  const p = (text, options = {}) => new Paragraph({ children: [new TextRun({ text, ...options })] });
  const heading = (text, level = HeadingLevel.HEADING_2) => new Paragraph({ text, heading: level });
  const cell = (text, bold = false) =>
    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(text), bold })] })] });
  const table = (head, rows) =>
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ tableHeader: true, children: head.map((h) => cell(h, true)) }),
        ...rows.map((row) => new TableRow({ children: row.map((value) => cell(value)) })),
      ],
    });

  // Rejected items stay out of the body. Not reviewed items are labelled (A-10).
  const inBody = items.filter((item) => item.decision !== "rejected");
  const label = (item) => (item.decision ? displayText(item) : `Not reviewed: ${displayText(item)}`);

  const listSection = (title, type) => {
    const chosen = inBody.filter((item) => item.type === type);
    const children = [heading(title)];
    if (chosen.length === 0) children.push(p("None found."));
    for (const item of chosen) {
      children.push(p(label(item)));
      children.push(p(`"${item.quote}"`, { italics: true }));
    }
    return children;
  };

  const actions = inBody.filter((item) => item.type === "action");
  const actionSection = [heading("Action items")];
  if (actions.length === 0) {
    actionSection.push(p("None found."));
  } else {
    actionSection.push(
      table(
        ["Action", "Owner", "Deadline", "Quote"],
        actions.map((item) => [label(item), item.owner ?? NOT_STATED, item.deadline ?? NOT_STATED, item.quote]),
      ),
    );
  }

  const mode = meta.isSample ? DEMO_AUDIT_MODE : "Live";
  const auditSection = [
    heading("Audit trail"),
    p(`Prompt version: ${meta.promptVersion}`),
    p(`Model: ${meta.model}`),
    p(`Time of the AI run: ${meta.generatedAt}`),
    p(`Time of export: ${data.exportedAt}`),
    p(`Mode: ${mode}`),
    table(
      ["Type", "Item", "Decision", "Time of decision", "Entered by BA"],
      items.map((item) => [
        item.type.replace("_", " "),
        displayText(item),
        decisionLabel(item),
        item.decided_at ?? "",
        enteredByBa(item),
      ]),
    ),
  ];

  return new Document({
    sections: [
      {
        children: [
          heading(data.title?.trim() || "Meeting minutes", HeadingLevel.HEADING_1),
          p("Draft prepared with AI and reviewed by the Business Analyst."),
          ...listSection("Discussion points", "discussion_point"),
          ...listSection("Decisions", "decision"),
          ...actionSection,
          ...auditSection,
        ],
      },
    ],
  });
}

// Browser only. Uses the global `docx` from /vendor/docx.min.js, and saves with the browser's own download.
export async function downloadMom(data) {
  const lib = globalThis.docx;
  if (!lib) throw new Error("Word library not loaded");
  const blob = await lib.Packer.toBlob(buildMomDocument(lib, data));
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileNameFor(data.title);
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
