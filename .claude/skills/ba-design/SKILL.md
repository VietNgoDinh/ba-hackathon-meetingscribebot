---
name: ba-design
description: Design the chosen solution, to-be workflow, value case, architecture and domain model, then stop at review G3.
disable-model-invocation: true
---

Goal: reach review G3 Design. Lead: A. Decider: B, who checks that it can be built.

1. **Check status.** G2 must be Approved in `STATUS.md`, and section 4.4 of `deliverables/proposal/04-options.md` must name the chosen option. If not, say so and stop.
2. **Design.** Delegate to the `solution-design` subagent.
3. **Model.** After it finishes, delegate to the `domain-modeler` subagent.
4. **Stop at G3.** Show the review card from `CLAUDE.md`. Under "Decide", include the core features, what's out of scope, whether the tool stays at Level 1, and whether B believes it can be built in the time left.

After G3, B can start `/ba-build foundation` while A runs `/ba-spec`.
