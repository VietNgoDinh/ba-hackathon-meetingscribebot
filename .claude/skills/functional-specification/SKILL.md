---
name: functional-specification
description: Method and templates for the function list, function specifications, data contract, screen list, sitemap and screen specifications that a small AI tool is built from.
user-invocable: false
---

# Functional specification

Write a spec that can be built without further questions. Once approved at G4, this spec is what the tool is built against.

## Outputs

| Output | Template |
|---|---|
| `deliverables/proposal/A3-functions.md` | `.claude/skills/functional-specification/templates/A3-functions.md` |
| `deliverables/proposal/A4-screens.md` | `.claude/skills/functional-specification/templates/A4-screens.md` |

## Method

1. **Derive functions from workflows.** Each step a tool performs in section A2 becomes a function or part of one.
2. **Prioritize strictly.** Must means the demo fails without it. Everything else is Should or Could, and it gets built only if time remains. Stay within 5 Must functions.
3. **Trace every function.** Each `FN-xx` names a core feature and at least one `P-xx` or `N-xx`.
4. **Specify every Must function.** Should and Could functions need only their row in the list.
5. **Include the standard controls.** The spec must cover a clearly labelled Demo mode, the quote check, Accept / Edit / Reject, export with an audit trail, input limits, and the access code. Reuse the wording of the control baseline in `.claude/rules/our-tool.md`.
6. **Define the data contract.** Section A3.3 lists every field the AI must return, and it becomes the output schema in code. Each AI finding needs a `quote` field holding exact text from the input.
7. **Write testable acceptance criteria.** Use Given, When, Then, with observable results.
8. **Group functions into screens.** Use the fewest screens that work, at most 3. A single page with clear states usually beats several pages.
9. **Draw the sitemap with the screen list.** It shows which screens exist and how they connect, including Demo mode.
10. **Specify every screen.** Use components from the `screen-design` skill by name, and cover every state.

## Quality bar

- Every Must function appears on a screen, and every screen element traces to a function.
- A tester could check each acceptance criterion by looking at the screen.
- The error and Demo mode states say exactly what the user sees.
- Names match the domain model exactly.
