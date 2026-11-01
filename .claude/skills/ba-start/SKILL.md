---
name: ba-start
description: Save the judges' use case, analyze the current state, and stop at review G1.
argument-hint: "[use case text or file path]"
disable-model-invocation: true
---

Goal: reach review G1 Problem framing. Lead: A.

1. **Check status.** Read `STATUS.md`. If G1 is already Approved, say so, point to `/ba-next`, and stop.
2. **Capture the use case.** Save it unedited to `deliverables/inputs/use-case.md`.
   - If `$ARGUMENTS` holds text or a file path, use that.
   - Otherwise, use the files already in `deliverables/inputs/`.
   - If neither exists, ask the person to paste the use case, then stop.
3. **Check the data.** If the use case looks real or confidential, ask the person before continuing, because the analysis sends it to an AI provider.
4. **Start the clock.** In `STATUS.md`, set the use case title and, if it isn't set yet, the clock start from the system time.
5. **Analyze.** Delegate to the `as-is-analyst` subagent.
6. **Stop at G1.** Show the review card from `CLAUDE.md`. Under "Decide", include whether the problem statement is right, and which questions to take to the judges from `deliverables/questions.md`.
