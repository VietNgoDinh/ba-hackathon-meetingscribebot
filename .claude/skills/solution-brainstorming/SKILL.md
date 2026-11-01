---
name: solution-brainstorming
description: Method and template for generating, filtering and scoring AI solution options for one BA task, then recommending one for human selection.
user-invocable: false
---

# Solution brainstorming

Give the team a clear choice between realistic options.

## Output

Write `deliverables/proposal/04-options.md` from `.claude/skills/solution-brainstorming/templates/04-options.md`.

## Method

1. **Start from the top pain points.** Each option must improve one specific BA task from section 2.4.
2. **Research briefly.** If web tools work, run up to 5 searches for how teams handle this task with AI, and record useful sources as `SRC-xx`. Without web access, continue from what you know and say so in section 4.1.
3. **Generate 3 genuinely different options.** Vary the approach, such as reviewing existing work, generating a first draft, converting between formats, or checking consistency across documents. Three variants of one idea don't count.
4. **Apply the feasibility filter.** Remove any option that fails it, and replace it.
5. **Score the options.** Use the criteria in the template. Scores are judgement calls, so say so, and give each a short reason.
6. **Recommend one.** State what would change your recommendation.

## Feasibility filter

An option passes only if all of these are true:

- Three non-developers can build it from the skeleton within the build window, using Claude Code.
- It fits in 3 core features, 5 Must functions and 3 screens.
- It works from text the user provides, with one AI call per run.
- It needs no connection to company systems, and no real data.
- A person reviews every AI result before it's used.
- A live demo can show its value quickly.

## Quality bar

- A BA manager would see each option as a serious choice.
- Each option says what stays with people.
- No score or claim is presented as a measurement.
- Section 4.4 stays blank for the human decision.
