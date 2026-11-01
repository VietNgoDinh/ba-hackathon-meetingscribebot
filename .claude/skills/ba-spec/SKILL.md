---
name: ba-spec
description: Write functions, screens, the demo plan and sample data, run the reviewer, and stop at review G4 Spec freeze.
disable-model-invocation: true
---

Goal: reach review G4 Spec freeze. Lead: A. Decider: B, who must be able to build from this spec.

1. **Check status.** G3 must be Approved in `STATUS.md`. If not, say so and stop.
2. **Write the spec.** Delegate to the `spec-writer` subagent.
3. **Plan the demo.** After it finishes, delegate to the `demo-writer` subagent in `plan` mode. The demo comes first so the team builds only what it needs.
4. **Review.** Read `.claude/skills/ba-review/SKILL.md` and follow it in `spec` mode.
5. **Stop at G4.** Show the review card from `CLAUDE.md`. Under "Decide", include the Must functions, the demo's moment of proof, and any open findings. Say that the spec freezes once this is approved.

After G4, A runs `/ba-closeout draft`, B runs `/ba-build`, and C continues with `/ba-deck`.
