## 14. How we built it

### 14.1 Process

We treated this as BA work, with AI doing the drafting and people making the decisions. The proposal came first, then the tool and slides were built from the approved proposal. Specialist subagents each wrote named documents from templates, and an independent reviewer checked the spec and the final pack. Six human reviews controlled the work.

This section is written at spec stage. Four of the six reviews (G1 to G4) are approved. The tool review (G5) and the final pack review (G6) are still pending, so the tool is not yet built and nothing here describes a running tool. The reviewer's advice is not an approval: only a named person approved each gate, in `STATUS.md`.

### 14.2 Project structure

```text
ba-hackathon-meetingscribebot/
├─ CLAUDE.md          Rules every AI session follows
├─ RUNBOOK.md         Our timeline, roles and scope-cut rules
├─ STATUS.md          Review log
├─ .claude/           Subagents, skills, templates and tool build rules
├─ deliverables/      Proposal, assumptions, slides, notes, reviewer reports
└─ our-tool/          The deployed tool
```

### 14.3 Review log

Copied from `STATUS.md`. G5 and G6 are pending.

| Gate | Review | Decider | Approved at | Decisions and accepted flags |
|---|---|---|---|---|
| G1 | Problem framing | C (Ngan), approved by Viet | 2026-11-02 03:51 | Problem statement accepted. Assumptions A-02 to A-07 stay open. Q-01 to Q-03 go to the judges |
| G2 | Solution choice | A, with the team (approved by Viet) | 2026-11-02 03:54 | Option A, Evidence-linked MoM drafter, because it has the highest score. Scores are team judgement [A-08] |
| G3 | Design | B (Phong) | 2026-11-02 03:59 | 3 core features (CF-01 to CF-03), Level 1, scope limits kept. Open: A-09 (Word format, pending Q-02), A-10, A-11. Earlier recorded by Viet at 03:58 |
| G4 | Spec freeze | B (approved by Viet) | 2026-11-02 04:13 | Spec frozen: 5 Must functions, 1 screen, Level 1, two samples. Reviewer: Pass with flags, all 10 findings fixed. Accepted: planted quote in sample 02 trips the mechanical check on purpose [A-17]. Open: A-09, A-12, A-15 |
| G5 | Tool freeze | C (Ngan) | Pending | Not yet reviewed |
| G6 | Final pack and go/no-go | A (Viet) | Pending | Not yet reviewed |

For G1, G2 and G4 the person who approved in `STATUS.md` (Viet) is not the decider named in the gate table. We record this as it stands and do not describe it as an independent review by the decider. G3 was approved by its decider (Phong).

### 14.4 Where people changed the AI's work

This table lists only changes recorded in `STATUS.md` and `deliverables/reviews/spec-review.md` at the time of writing. It is short because the tool is not built, and we do not invent overrides. `STATUS.md` does not record who made each fix, so we do not claim which person typed which edit. After G5 the closeout adds the changes made while building.

| Review | What the AI proposed | What people changed | Why |
|---|---|---|---|
| G2 | A scored comparison of three options, with Option A highest | People accepted Option A and recorded the scores as team judgement [A-08], with no web research behind them | So the scores are read as judgement, not as measurements |
| G4 | The spec said the tool "never guesses" an owner or deadline | The independent reviewer found only the prompt prevented guessing, so the spec gained a name and date check and the claims were reworded; people approved the frozen spec | A prompt instruction is not a control. The check is [A-16] |
| G4 | The reviewer suggested measuring the 20,000-character limit, or raising it and tagging it | People accepted the limit as an open flag (A-12) and chose to record a long-meeting limitation (L-01) instead of measuring | The limit was not measured before the freeze. The flag stays open and is stated in the proposal, not hidden |
| G4 | Sample result with the quote check removing nothing (0 removed) | A second, hand-prepared stress-test sample with one planted quote was added, and people accepted that it trips the mechanical check on purpose [A-17] | So the quote check is visible in Demo mode |
| G4 | Option C scored 72 in the options table | Corrected to 70 after review; the ranking did not change | Arithmetic error found by the reviewer |

### 14.5 Prepared beforehand and built on the day

| Prepared before the event | Built on the day |
|---|---|
| Toolkit: subagents, skills, templates, review process, deployment skeleton and design system | Use case analysis, proposal, tool, slides, speaker notes and demo |

Detail at this stage:

- **Built on the day so far:** Sections 1 to 9, A1 to A4 and the two hand-prepared samples (the proposal and spec at G1 to G4), and the closeout sections 10 to 15 in draft. The commit log also shows a foundation commit after G4 (an AI adapter and an access-code-protected analyze endpoint with an input limit). We have not tested it for this document, so we make no claim about it.
- **Not yet built:** The screen, the checks, the Word export and Demo mode. They are specified in A3 and A4 and are not built or tested.
- **Prepared by hand, not captured from a live AI run:** Both saved samples [A-15, A-17].
