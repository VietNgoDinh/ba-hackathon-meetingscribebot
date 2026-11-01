---
name: ba-approve
description: Record a person's approval of a review in STATUS.md. Only a human runs this.
argument-hint: "G1 [your name] [note]"
disable-model-invocation: true
---

The person running this command is approving a review: `$ARGUMENTS`

1. **Identify the gate.** It's the first word. If there's no gate, or no decider's name in the arguments or `STATUS.md`, ask and stop.
2. **Check order.** Every earlier gate must be Approved in `STATUS.md`. If not, say which one is missing and stop.
3. **Check the outputs.** Confirm the files in the table below exist and aren't blank. If something's missing, say what and stop.
4. **Handle G2's decision.** The arguments must name the chosen option. Fill in section 4.4 of `deliverables/proposal/04-options.md` with the option and the reason given. If no option is named, ask and stop.
5. **Handle open flags.** If the review's report in `deliverables/reviews/` has open Blocker findings, list them and ask the person to confirm they accept them. Record accepted findings in the note.
6. **Update `STATUS.md`.** In the gate's row, set Status to Approved, and fill in Time (from the system clock), Approved by, and the decisions and accepted flags. Change nothing else.
7. **Say what's next.** Reply with one confirmation line, then the next step from the table in `.claude/skills/ba-next/SKILL.md`. Remind the person to run `/ba-sync`.

| Gate | Required outputs |
|---|---|
| G1 | `deliverables/proposal/02-current-context.md`, `03-as-is-workflow.md` |
| G2 | `deliverables/proposal/04-options.md` |
| G3 | `deliverables/proposal/01-summary.md`, `05-solution.md`, `06-to-be-workflow.md`, `08-value.md`, `09-how-it-works.md`, `A1-domain-model.md`, `A2-feature-workflows.md` |
| G4 | `deliverables/proposal/A3-functions.md`, `A4-screens.md`, `07-demo-plan.md`, at least one sample in `our-tool/public/samples/`, `deliverables/reviews/spec-review.md` |
| G5 | `deliverables/as-built.md`, and a Deployed URL in `STATUS.md` |
| G6 | `deliverables/proposal.md`, `deliverables/presentation/slides.md`, `speaker-notes.md`, `demo-script.md` with a passed rehearsal, `deliverables/reviews/final-review.md` |

Never run these steps unless a person typed this command.
