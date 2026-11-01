---
name: demo-pack
description: Method and templates for the demo plan, fictional sample data with expected results, and the step-by-step demo script.
user-invocable: false
---

# Demo pack

The demo is decided before the tool is built, because the team builds only what the demo needs.

## Mode: plan

Runs during `/ba-spec`, before G4.

Read these files in `deliverables/proposal/`: `02-current-context.md`, `05-solution.md`, `06-to-be-workflow.md`, `A3-functions.md` and `A4-screens.md`.

Write:

- `deliverables/proposal/07-demo-plan.md`, from `.claude/skills/demo-pack/templates/07-demo-plan.md`
- `our-tool/public/samples/01-<short-name>.input.txt`, the fictional sample input
- `our-tool/public/samples/01-<short-name>.expected.json`, the result the tool should give

Method:

1. **Tell one story.** Choose one fictional BA and one fictional requirement or document that the whole deck can follow.
2. **Find the moment of proof.** Decide the single moment when a judge sees the value. Everything else exists to reach it quickly.
3. **Show human control on screen.** The demo must include a person rejecting or editing an AI result.
4. **Design the sample.** Plant issues so each Must function has something to do, and include something a rule catches and something only AI would catch. Keep it short enough to read aloud.
5. **Write the expected result.** Follow the data contract in section A3.3 exactly, and make every `quote` an exact copy of text in the input file. Demo mode and the tests use this file.
6. **Plan the fallback.** Demo mode tells the same story without AI.

All names, companies and details must be invented and clearly fictional.

## Mode: script

Runs during `/ba-demo`, after G5.

Read `deliverables/proposal/07-demo-plan.md`, `deliverables/as-built.md` and `deliverables/proposal/A4-screens.md`. Read `deliverables/presentation/slides.md` too, so that the script matches slide S06.

Write `deliverables/presentation/demo-script.md` from `.claude/skills/demo-pack/templates/demo-script.md`.

Script only what the tool really does according to `as-built.md`. Every step says what to do, what to say, what judges should see, and what to do if it fails. Keep the access code out of the script.

## Quality bar

- A teammate could run the demo from the script alone.
- The sample contains nothing real.
- Every quote in the expected result can be found in the input.
- The demo reaches the moment of proof early.
