---
name: ba-closeout
description: Write the closing proposal sections after G4, then match everything to the real tool and assemble the proposal after G5.
argument-hint: "draft | final"
disable-model-invocation: true
---

Lead: A. Mode: `$ARGUMENTS`. If blank, use `draft` until G5 is Approved in `STATUS.md`, then `final`.

## Mode: draft

Requires G4 Approved.

1. Delegate to the `closeout-writer` subagent in `draft` mode.
2. Report what was written, and remind C to run `/ba-deck`, which can now fill S09 to S11 and the backup slides.

## Mode: final

Requires G5 Approved. If it isn't, say so and stop.

1. **Match the documents to the tool.** Delegate to the `closeout-writer` subagent in `final` mode.
2. **Update the deck.** Delegate to the `deck-writer` subagent.
3. **Assemble the proposal.** Run `node .claude/skills/ba-closeout/scripts/assemble-proposal.mjs`.
4. **Review.** Read `.claude/skills/ba-review/SKILL.md` and follow it in `final` mode. Reassemble after the fix round if any proposal section changed.
5. **Report.** Show the verdict, any open findings and the judge review's hardest questions. Tell the team that `/ba-demo` is next. G6 comes after rehearsal.
