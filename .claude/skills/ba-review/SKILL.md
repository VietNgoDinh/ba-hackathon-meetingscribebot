---
name: ba-review
description: Run the mechanical checks and the independent reviewer on the spec or the final pack, with one fix round.
argument-hint: "spec | final"
disable-model-invocation: true
---

Mode: `$ARGUMENTS`. If blank, use `spec` until G4 is Approved in `STATUS.md`, then `final`.

1. **Run the mechanical check.** Run `node .claude/skills/ba-review/scripts/check-docs.mjs <mode>`. An exit code of 1 means it found errors, not that it broke. Keep its output for the next step.
2. **Run the reviewer.** Delegate to the `reviewer` subagent, giving it the mode and the mechanical check output. In `final` mode, also ask for the judge review.
3. **Save the report.** Write what the reviewer returned to `deliverables/reviews/<mode>-review.md`.
4. **Do one fix round.** Fix mechanical errors and each Blocker and Major finding by delegating to the subagent that owns the file, as listed in `CLAUDE.md`, passing the exact finding. If a finding is in `our-tool/` or `as-built.md`, report it to B instead.
5. **Recheck.** Run the mechanical check once more. Don't run the reviewer again, because that's how a review turns into a loop that eats the clock.
6. **Update the report.** Fill in the Fix round table, marking each finding Fixed or Open.
7. **Summarize.** Reply with the verdict and any open findings. These go into the review card's "Reviewer flags".

A reviewer pass is advice. Only `/ba-approve` passes a review.
