---
name: ba-next
description: Show where the team is, how the clock looks, and what each person should do next.
disable-model-invocation: true
---

Read `STATUS.md` and the timeline and scope cuts in `RUNBOOK.md`, then see which files exist in `deliverables/`. Get the current time from the system.

The next review is the first one in `STATUS.md` that isn't Approved. Reply briefly in this format:

```text
Next review: G<n> <name>
Elapsed: <time since the clock started, or Not started>, <on time or how far behind the RUNBOOK timeline>
A <name>: <what to do now>
B <name>: <what to do now>
C <name>: <what to do now>
Watch out: <a scope cut that's triggered, open questions, or None>
```

Use this guide for what each person does:

| Next review | A Proposal lead | B Tool lead | C Story lead |
|---|---|---|---|
| Not started | `/ba-start` | Read the use case | Read the use case |
| G1 | Finish `/ba-start` | Challenge the as-is | Decide G1 with `/ba-approve` |
| G2 | `/ba-solution`, lead the team decision | Check each option can be built | Bring ideas on what would land with judges |
| G3 | `/ba-design` | Check feasibility, then decide G3 | `/ba-deck` from approved sections |
| G4 | `/ba-spec` | `/ba-build foundation`, then decide G4 | `/ba-deck`, then time the task by hand |
| G5 | `/ba-closeout draft` | `/ba-build` and `/ba-deploy` | `/ba-deck`, then test the tool and decide G5 |
| G6 | `/ba-closeout final` first, then rehearse and decide G6 | Fix blockers only, then rehearse | `/ba-demo`, then rehearse |
| All approved | Submit the deliverables | Keep the deployment untouched | Prepare to present |

Change nothing. If `STATUS.md` looks wrong, say so.
