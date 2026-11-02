# Status

-   **Use case:** Meeting Minutes Generator
-   **Clock started:** 2026-11-02 03:47
-   **Deployed URL:** https://ba-hackathon-meetingscribebot.vercel.app

## Team

| Role | Name | Owns |
|---|---|---|
| A Proposal lead | Viet | `deliverables/proposal/`, `assumptions.md`, `questions.md`, `STATUS.md` |
| B Tool lead | Phong | `our-tool/`, `deliverables/as-built.md` |
| C Story lead | Ngan | `deliverables/presentation/` |

## Review log

Only `/ba-approve` changes this table.

| Gate | Review | Decider | Status | Time | Approved by | Decisions and accepted flags |
|---|---|---|---|---|---|---|
| G1 | Problem framing | C | Approved | 2026-11-02 03:51 | Viet | Problem statement accepted. Assumptions A-02 to A-07 stay open. Q-01 to Q-03 go to the judges. |
| G2 | Solution choice | A, with the team | Approved | 2026-11-02 03:54 | Viet | Option A, Evidence-linked MoM drafter, because it has the highest score. Scores are team judgement [A-08]. |
| G3 | Design | B | Approved | 2026-11-02 03:59 | Phong | 3 core features (CF-01 to CF-03), Level 1, scope limits kept. Open: A-09 (Word format, pending Q-02), A-10, A-11. Earlier recorded by Viet at 03:58. |
| G4 | Spec freeze | B | Approved | 2026-11-02 04:13 | Viet | Spec frozen: 5 Must functions, 1 screen, Level 1, two samples. Reviewer: Pass with flags, all 10 findings fixed. Accepted: planted quote in sample 02 trips the mechanical check on purpose [A-17]. Open: A-09, A-12, A-15. |
| G5 | Tool freeze | C | Approved | 2026-11-02 07:55 | Viet | Tool frozen at commit a5f6768 (tool code 33a83c1), Level 1, 5 Must functions built, FN-06 to FN-08 cut, model claude-haiku-5-5, prompt v1. Control baseline 12 of 12 Yes. Open: audit trail counts decision, offline and network-log checks not yet confirmed, S07 timing not recorded, A-12, A-15, A-16. |
| G6 | Final pack and go/no-go | A | Approved | 2026-11-02 08:14 | Viet | Go. Final review: Pass with flags, no open Blockers. Accepted with the pack: S07 value slide Pending (no timing registered, SRC register empty), S05 layout differs slightly from S03, audit trail has no removed or replaced counts (L-10), offline, network-log, narrow-window and AI-off checks not itemised in the rehearsal (L-11), one rehearsal run reported with no detail. Open: A-12, A-15, A-16. |
