---
name: domain-model
description: Method and templates for actors, business objects, the data model and feature workflows of a small AI tool.
user-invocable: false
---

# Domain model

Define the tool's people, information and flows so the spec has a firm base.

## Outputs

| Output | Template |
|---|---|
| `deliverables/proposal/A1-domain-model.md` | `.claude/skills/domain-model/templates/A1-domain-model.md` |
| `deliverables/proposal/A2-feature-workflows.md` | `.claude/skills/domain-model/templates/A2-feature-workflows.md` |

## Method

1. **Actors:** list every person and external system that interacts with the tool, including the AI provider as a system. Skip anyone who only benefits indirectly.
2. **Business objects:** list the things the tool handles, in business language, such as "Requirement" or "Finding". Include a record of each human decision, because the audit trail depends on it.
3. **Data model:** draw the objects and their relationships with a Mermaid `erDiagram`. At Level 1, this is a conceptual model, so state where each object lives while the tool runs. Mark a table design only at Level 2.
4. **Feature workflows:** write one workflow per core feature. Follow the `workflow-diagram` skill, and show where AI acts and where a person decides.

## Quality bar

- Every core feature has a workflow, and every workflow actor is defined.
- Every object in a workflow exists in the object table.
- A person's decision is visible in each workflow that uses AI.
- Names match sections 5 and 6 exactly.
