---
name: workflow-diagram
description: Conventions for drawing as-is, to-be and feature workflows as Mermaid flowcharts so they stay readable and comparable.
user-invocable: false
---

# Workflow diagrams

Every workflow has a steps table and a Mermaid diagram. Write the table first, because it's the source and the diagram is its picture.

## Rules

- Use `flowchart LR`, with one `subgraph` lane per actor.
- Give nodes the IDs `S1`, `S2` and so on, matching the step numbers in the table.
- Keep to 12 steps or fewer. Merge detail into one step when you can.
- Keep labels to about 5 words, always in double quotes, with no quote marks or line breaks inside.
- Use `{"Label?"}` for a decision and `["Label"]` for an action.
- Label decision branches, such as `S3 -- "No" --> S2`.

## Comparing as-is and to-be

The to-be diagram must look like an edited copy of the as-is diagram:

- Use the same lanes in the same order.
- Keep the same node ID for a step that continues to exist, and add new IDs after the highest as-is number.
- Keep the same left-to-right order.

## Highlight classes

Include these lines at the end of every diagram, and apply only the classes you use.

```mermaid
flowchart LR
  subgraph L1["Business Analyst"]
    S1["Receive notes"] --> S2["Draft requirements"]
  end
  subgraph L2["BA Lead"]
    S3{"Good enough?"}
  end
  S2 --> S3
  S3 -- "No" --> S2

  classDef pain fill:#fbeaea,stroke:#b3261e,color:#1c2430
  classDef changed fill:#e8eefb,stroke:#2f5fd0,color:#1c2430
  classDef human fill:#fdf3dc,stroke:#8a5a00,color:#1c2430
  classDef ai fill:#efeafb,stroke:#6241b8,color:#1c2430
  class S2 pain
```

| Class | Use it for | Used in |
|---|---|---|
| `pain` | A step with a pain point | As-is |
| `changed` | A step the tool changes or adds | To-be |
| `human` | A human decision or review | To-be |
| `ai` | A step AI performs | To-be, feature workflows |

Add a one-line legend under each diagram that uses these colors.
