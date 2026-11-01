---
name: ba-solution
description: Compare solution options for the approved problem and stop at review G2 for the team's choice.
disable-model-invocation: true
---

Goal: reach review G2 Solution choice. The whole team discusses, and A records the decision.

1. **Check status.** G1 must be Approved in `STATUS.md`. If not, say so and stop.
2. **Compare options.** Delegate to the `solution-brainstorming` subagent. Pass on any answers from the judges now recorded in `deliverables/questions.md`.
3. **Stop at G2.** Show the review card from `CLAUDE.md`. Under "Decide", show the options with their weighted scores and your recommendation. Tell the team to approve with `/ba-approve G2 <your name> Option <letter> <reason>`.
