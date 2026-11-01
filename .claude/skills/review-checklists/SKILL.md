---
name: review-checklists
description: Checklists and report format for the independent reviewer in spec mode and final mode, including the judge review.
user-invocable: false
---

# Review checklists

Your report helps a busy person decide. Find what would embarrass the team in front of judges, and skip style preferences.

## Rules

- Report at most 10 findings, ranked by importance.
- Rate each finding **Blocker** (the deliverable is wrong or fails a hard rule), **Major** (a judge would likely notice), or **Minor**.
- Cite the file and the ID or section for every finding, and suggest a specific fix.
- Report only what you confirmed by reading the files. The mechanical check output is a starting point: its number warnings are candidates, so confirm each one before reporting it.
- Never soften a finding to give a pass.
- Your verdict is advice. Only a person approves a review.

## Mode: spec

Runs before G4. Read every section file in `deliverables/proposal/`, plus `deliverables/assumptions.md` and `deliverables/questions.md`.

- **Completeness:** every template section is filled in, with no placeholder text.
- **Traceability:** each function traces to a real need or pain point, each core feature has functions, and each Must function appears on a screen.
- **Consistency:** names and facts agree across sections, and the to-be workflow matches the functions and screens.
- **Buildability:** the scope fits the limits in `CLAUDE.md`, and someone could build each Must function without further questions.
- **Testability:** acceptance criteria are observable, and the data contract is complete.
- **Demo:** the sample exercises every Must function, and each expected quote exists in the input file in `our-tool/public/samples/`.
- **Controls:** the spec covers every item of the control baseline in `.claude/rules/our-tool.md`.
- **Honesty:** every number has a source or assumption tag, and no estimate reads as a result.

## Mode: final

Runs before G6. Read everything in spec mode, plus `deliverables/as-built.md`, `deliverables/proposal.md`, `STATUS.md`, and the files in `deliverables/presentation/`. Open code in `our-tool/` to confirm claims.

- **Tool and documents agree:** nothing claims a feature that `as-built.md` shows as Cut or Partial.
- **Slides trace to the proposal:** each slide's claims appear in its Source sections.
- **Numbers:** every number on a slide, in the notes and in the proposal has a real source or a visible assumption label. Measured results match the Sources table.
- **AI checklist:** every Yes is true of the code and names evidence.
- **Demo script:** it matches the real screens and slide S06, and the sample is fictional.
- **Secrets:** no key or access code appears in any document or source file.
- **Review evidence:** the review log in section 14.3 matches `STATUS.md`.

## Judge review

Add this to every final report. Read as a skeptical BA manager.

1. Score the team against the assumed rubric in `A-01`, with one line of evidence per criterion. State that this is an estimate.
2. List the 5 hardest questions the judges could ask that section 13 doesn't yet answer well.

## Report format

Use `.claude/skills/review-checklists/templates/review-report.md`.
