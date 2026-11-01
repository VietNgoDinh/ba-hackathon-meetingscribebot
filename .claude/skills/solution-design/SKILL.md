---
name: solution-design
description: Method and templates for the proposal summary, solution overview, to-be workflow, value case and architecture of a small AI tool for BAs.
user-invocable: false
---

# Solution design

Turn the chosen option into a design that BA managers can evaluate and the team can build.

## Outputs

| Output | Template in `.claude/skills/solution-design/templates/` |
|---|---|
| `deliverables/proposal/05-solution.md` | `05-solution.md` |
| `deliverables/proposal/06-to-be-workflow.md` | `06-to-be-workflow.md` |
| `deliverables/proposal/08-value.md` | `08-value.md` |
| `deliverables/proposal/09-how-it-works.md` | `09-how-it-works.md` |
| `deliverables/proposal/01-summary.md` | `01-summary.md` |

Write the summary last, from the other four.

## Method

1. **Design only the chosen option.** Section 4.4 is the human decision.
2. **Keep it small.** Stay within the limits in `CLAUDE.md`. List tempting extras under "Out of scope", because a clear boundary shows judgement.
3. **Give each core feature a job.** Each `CF-xx` must address at least one `P-xx` or `N-xx`.
4. **Draw the to-be as an edit of the as-is.** Follow the comparison rules in the `workflow-diagram` skill. Mark every human decision.
5. **Be precise about AI's role.** State what AI does, what simple rules do, what the validator checks, and what a person decides.
6. **Make the value case honest.** Use evidence from the use case. Mark anything else `[A-xx]`, or "To be measured" for what the rehearsal timing will provide. Never write an estimate as a result.
7. **Use the default architecture.** The template already contains the stack and the reasons for it. Change it only if the chosen option requires that, and explain why.

## Levels

Level 1 is the default: no login and no database, with results kept in the browser and exported by the user. Level 2 adds Supabase for sign-in and history. Recommend Level 2 only if a core feature can't work without it, and flag that in your handoff report.

## Quality bar

- A BA manager understands the solution from section 5 alone.
- Sections 6 to 9 contain nothing that contradicts section 5.
- Every human decision in the to-be workflow also appears in section 9.4.
- Technical words are explained or avoided.
