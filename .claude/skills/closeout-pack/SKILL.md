---
name: closeout-pack
description: Method and templates for limitations, risks, roadmap, closing, judges' Q&A, how-we-built and the AI checklist, plus matching the proposal to the real tool.
user-invocable: false
---

# Closeout pack

Prepare the team for scrutiny, and make sure every claim is true of the tool that was really built.

## Outputs

Each output in `deliverables/proposal/` has a template of the same name in `.claude/skills/closeout-pack/templates/`: `10-limitations-risks.md`, `11-roadmap.md`, `12-closing.md`, `13-qa.md`, `14-how-we-built.md` and `15-ai-checklist.md`.

## Mode: draft

Runs after G4, before the tool exists.

1. Read the proposal sections, `deliverables/assumptions.md`, `deliverables/questions.md` and `STATUS.md`.
2. Write all six sections from the approved spec.
3. Word claims about the tool as planned, because the tool isn't built yet.
4. In the AI checklist, set Status to `Planned` until there's evidence.

## Mode: final

Runs after G5. The tool decides what's true now.

1. Read `deliverables/as-built.md` and `STATUS.md`. Open code in `our-tool/` when you need to confirm a claim, but don't change it.
2. Rewrite the six sections to describe the real tool.
3. Correct every statement in sections 1, 5, 6, 7, 8, 9, A3 and A4 that's no longer true. Change facts only, and end each corrected section with a line: `Changed after G4: <what and why>`.
4. Put measured results into section 8.3, citing their `SRC-xx`. If a measurement is missing, keep the label "To be measured", and flag it in your handoff report.
5. Copy the real review log from `STATUS.md` into section 14.3, and show real human changes in section 14.4.
6. Set each AI checklist Status to Yes, Partial or No. A Yes needs evidence that you opened.

## Method notes

**Limitations and risks:** a limitation is true today, while a risk might happen. State them plainly. Choose the three that matter most to a BA manager for section 10.3.

**Roadmap:** describe what a rollout across the BA department needs, in stages, with owners and dependencies. Include approved hosting, approved AI provider and data terms, a data classification decision, ownership, BA guidance and training, quality monitoring, and support. Mark durations and costs as `[A-xx]` or leave them out.

**Closing:** end with one lesson and one clear request that a judge could say yes to, such as approving a small pilot.

**Q&A:** keep the seeded questions and add ones specific to this tool. Answers fit in two or three spoken sentences, and each cites a section number or ID.

**How we built it:** show that the team controlled the process, using evidence from `STATUS.md`. Be open about what was prepared before the event and what was built on the day.

## Quality bar

- A skeptical BA manager would find the weakest points already named here.
- No answer claims something that section 9 or `as-built.md` doesn't support.
- Nothing says "Planned" after final mode, except items that really are planned for later.
