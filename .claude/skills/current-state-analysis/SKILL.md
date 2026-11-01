---
name: current-state-analysis
description: Method and templates for documenting the current context, needs, pain points, as-is workflow, assumptions and clarifying questions for a BA use case.
user-invocable: false
---

# Current-state analysis

Build an evidence-based picture of how the work happens today, so the team solves the real problem.

## Outputs

| Output | Template |
|---|---|
| `deliverables/proposal/02-current-context.md` | `.claude/skills/current-state-analysis/templates/02-current-context.md` |
| `deliverables/proposal/03-as-is-workflow.md` | `.claude/skills/current-state-analysis/templates/03-as-is-workflow.md` |

## Method

1. **Separate fact from inference.** A fact is stated in the use case, so mark its evidence "Stated". Anything else you add is an inference, so register it as an assumption and cite its `A-xx`.
2. **Find the BA task.** Identify who does the work, what triggers it, what goes in, what comes out, and who receives it.
3. **Name the target users.** Include the person who does the task and the person who depends on its result.
4. **List needs and pain points.** Keep them separate: a need is what people want to achieve, and a pain point is what gets in the way today. Tie each pain point to a workflow step.
5. **Rank the pain points.** Put the ones that hurt BA work most first. Don't state a size or frequency unless the use case gives one.
6. **Write one problem statement.** Use this shape: [who] needs [what] because [why], but today [obstacle], which causes [impact].
7. **Write the as-is workflow.** Use the steps table first, then draw the diagram from it with the `workflow-diagram` skill.

## Assumptions

Add a row to `deliverables/assumptions.md` for each inference. Word it so a person can confirm or reject it. Keep `A-01`, the assumed scoring rubric.

## Clarifying questions

Add a row to `deliverables/questions.md` for each question. Ask at most 5, and only questions whose answer would change the solution. Give every question a working assumption so that work can continue without an answer.

## Quality bar

- A BA who knows this process would recognize it as accurate.
- Every pain point names a workflow step, and every workflow pain marker exists in section 2.4.
- Nothing describes a solution.
- Each file fits on about one page.
