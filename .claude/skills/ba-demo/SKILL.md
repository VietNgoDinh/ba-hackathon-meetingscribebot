---
name: ba-demo
description: Write the demo script, prepare the rehearsals, and stop at review G6 Final pack and go/no-go.
disable-model-invocation: true
---

Goal: reach review G6 Final pack and go/no-go. Lead: C. Decider: A.

1. **Check status.** G5 must be Approved in `STATUS.md`, and `deliverables/reviews/final-review.md` must exist. If the review doesn't exist, tell the team to run `/ba-closeout final` first, and stop.
2. **Write the script.** Delegate to the `demo-writer` subagent in `script` mode.
3. **Rehearse.** Ask the team to run the script twice on the deployed URL, and once in Demo mode on the presenting laptop if time allows. Stop here until they report back.
4. **Record results.** When they report, add each run to the Rehearsal log in `deliverables/presentation/demo-script.md`. Add any timing results to the Sources table in `deliverables/assumptions.md`. If a rehearsal failed, help fix only that blocker.
5. **Stop at G6.** Once a rehearsal has passed, show the review card from `CLAUDE.md`. Under "Decide", ask whether to present live or from Demo mode, and include any open findings from the final review.
