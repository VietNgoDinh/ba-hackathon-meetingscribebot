## 14. How we built it

### 14.1 Process

We treated this as BA work, with AI doing the drafting and people making the decisions. The proposal came first, then the tool and slides were built from the approved proposal. Specialist subagents each wrote named documents from templates, and an independent reviewer checked the spec and the final pack. Six human reviews control the work.

All six reviews (G1 to G6) are approved in `STATUS.md`, the last at 2026-11-02 08:14. The reviewer's advice is not an approval: only a named person approved each gate, in `STATUS.md`.

The tool was built in slices against the frozen spec: a demo path with review, quote check and Word export, then a live path with the prompt, schema, format check and a real analyze endpoint. The as-built record (`deliverables/as-built.md`) shows all five Must functions built, FN-06 to FN-08 cut, and no changes from the spec at G5.

**A change after G5 and G6:** on 2026-11-03 Viet (role A) decided to add saving of reviewed minutes to a database (FN-09, a Should function, and a second screen, SCR-02). It is built on branch `feature/save-minutes`. The change came after the freeze and after the final go decision, and no gate has reviewed it: G5 froze the tool without it and G6 approved a pack that said "nothing is stored". `STATUS.md` does not record whether the tool lead (Phong) or the story lead (Ngan) agreed to it, and we do not claim they did. The proposal sections and the as-built record were updated to match, and each corrected section ends with a "Changed after G5" line. Until a person approves it through the review process, it stands as a decision by one person, not a reviewed change. It works on the branch's Vercel preview (a person confirmed saving) and is not on production until the branch is merged.

### 14.2 Project structure

```text
ba-hackathon-meetingscribebot/
├─ CLAUDE.md          Rules every AI session follows
├─ RUNBOOK.md         Our timeline, roles and scope-cut rules
├─ STATUS.md          Review log
├─ .claude/           Subagents, skills, templates and tool build rules
├─ deliverables/      Proposal, assumptions, slides, notes, reviewer reports, as-built record
└─ our-tool/          The deployed tool
```

### 14.3 Review log

Copied from `STATUS.md`. It has no row for the post-G5 change (FN-09), because only `/ba-approve` changes that table and no gate was run for it.

| Gate | Review | Decider | Approved at | Decisions and accepted flags |
|---|---|---|---|---|
| G1 | Problem framing | C (Ngan), approved by Viet | 2026-11-02 03:51 | Problem statement accepted. Assumptions A-02 to A-07 stay open. Q-01 to Q-03 go to the judges |
| G2 | Solution choice | A, with the team (approved by Viet) | 2026-11-02 03:54 | Option A, Evidence-linked MoM drafter, because it has the highest score. Scores are team judgement [A-08] |
| G3 | Design | B (Phong) | 2026-11-02 03:59 | 3 core features (CF-01 to CF-03), Level 1, scope limits kept. Open: A-09 (Word format, pending Q-02), A-10, A-11. Earlier recorded by Viet at 03:58 |
| G4 | Spec freeze | B (approved by Viet) | 2026-11-02 04:13 | Spec frozen: 5 Must functions, 1 screen, Level 1, two samples. Reviewer: Pass with flags, all 10 findings fixed. Accepted: planted quote in sample 02 trips the mechanical check on purpose [A-17]. Open: A-09, A-12, A-15 |
| G5 | Tool freeze | C (Ngan), approved by Viet | 2026-11-02 07:55 | Tool frozen at commit a5f6768 (tool code 33a83c1), Level 1, 5 Must functions built, FN-06 to FN-08 cut, model claude-haiku-5-5, prompt v1. Control baseline 12 of 12 Yes. Open: audit trail counts decision, offline and network-log checks not yet confirmed, S07 timing not recorded, A-12, A-15, A-16 |
| G6 | Final pack and go/no-go | A (Viet) | 2026-11-02 08:14 | Go. Final review: Pass with flags, no open Blockers. Accepted with the pack: S07 value slide Pending (no timing registered, SRC register empty), S05 layout differs slightly from S03, audit trail has no removed or replaced counts (L-10), offline, network-log, narrow-window and AI-off checks not itemised in the rehearsal (L-11), one rehearsal run reported with no detail. Open: A-12, A-15, A-16 |

For G1, G2, G4 and G5 the person who approved in `STATUS.md` (Viet) is not the decider named in the gate table. We record this as it stands and do not describe it as an independent review by the decider. G3 was approved by its decider (Phong). G6 was approved by its decider (Viet), who also owns the proposal and made the later FN-09 decision. The "12 of 12 Yes" baseline is the tool lead's own as-built record, and several of its Yes entries rest on tests and a headless-browser run, not on a person watching the live site (L-11).

### 14.4 Where people changed the AI's work

This table lists changes recorded in `STATUS.md`, `deliverables/reviews/spec-review.md` and `deliverables/as-built.md`. `STATUS.md` does not record who made each fix, so we do not claim which person typed which edit. We do not invent overrides.

| Review | What the AI proposed | What people changed | Why |
|---|---|---|---|
| G2 | A scored comparison of three options, with Option A highest | People accepted Option A and recorded the scores as team judgement [A-08], with no web research behind them | So the scores are read as judgement, not as measurements |
| G4 | The spec said the tool "never guesses" an owner or deadline | The independent reviewer found only the prompt prevented guessing, so the spec gained a name and date check and the claims were reworded; people approved the frozen spec | A prompt instruction is not a control. The check is [A-16] |
| G4 | The reviewer suggested measuring the 20,000-character limit, or raising it and tagging it | People accepted the limit as an open flag (A-12) and chose to record a long-meeting limitation (L-01) instead of measuring | The limit was not measured before the freeze. The flag stays open and is stated in the proposal, not hidden |
| G4 | Sample result with the quote check removing nothing (0 removed) | A second, hand-prepared stress-test sample with one planted quote was added, and people accepted that it trips the mechanical check on purpose [A-17] | So the quote check is visible in Demo mode |
| G4 | Option C scored 72 in the options table | Corrected to 70 after review; the ranking did not change | Arithmetic error found by the reviewer |
| G5 (as-built) | Three optional functions in the spec: click a quote to highlight it (FN-06), copy accepted items as text (FN-07), add a missed item (FN-08) | People cut all three | To protect the build window. The five Must functions were built |
| G5 | The built Word audit trail does not show the removed and replaced counts | Left as it is, and recorded as an open decision. The proposal states it as a limitation (L-10), not as a feature | The spec did not ask for it, and the team has not decided whether to add it |
| G5 (as-built) | The deployed model setting is `claude-haiku-5-5` while `.env.example` lists a different sample value | Recorded in `as-built.md` as a known issue. The example file holds no secret | So nobody reads the example file as the deployed setting |

The tool followed the frozen spec with no changes, so no spec-level override happened during the build.

After G5 and G6, one change was made by a person, not proposed by a reviewer:

| When | What changed | Decided by | Why | Reviewed? |
|---|---|---|---|---|
| 2026-11-03, after G5 and G6 | Added FN-09 (save reviewed minutes and open them again, live mode only, Should) and SCR-02 (Saved minutes, read only). Level changed from Level 1 to Level 1 plus storage (database, no sign-in). Must functions stay at 5, core features at 3, screens at 2 | Viet (role A) | The team wants stored minutes in the event demo (`as-built.md`) | No. No gate covered it. It is an open scope decision to be accepted or reversed by a person through the review process. It was not recorded in `STATUS.md` |

This change moved claims in the proposal: "nothing is stored" (A-11 and others) became "the transcript is not stored, and saved minutes are", and the Level 1 claims were reworded. The tool lead's as-built record, the proposal sections and the assumptions were updated together. The slides, speaker notes and demo script were not part of this update and still carry the earlier wording (see the handoff report).

### 14.5 Prepared beforehand and built on the day

| Prepared before the event | Built on the day |
|---|---|
| Toolkit: subagents, skills, templates, review process, deployment skeleton and design system | Use case analysis, proposal, tool, slides, speaker notes and demo |

Detail:

- **Built the day after:** The saving of reviewed minutes (FN-09), its migration file (`supabase/migrations/0001_meetings.sql`), the Saved minutes page and its tests (`tests/meetings.test.js`), on branch `feature/save-minutes`, with commits that follow the commit recording the G5 and G6 approvals. The migration file says to run it by hand in the Supabase SQL editor, so the database and its settings live outside the repository. The code is in the repository, the database is not.
- **Built on the day:** Sections 1 to 15 and A1 to A4 of the proposal, the two hand-prepared samples, the tool (demo path, then live path), the as-built record, and the draft slides and speaker notes. The commit log shows the order: spec stage, demo path, slides and notes draft, closeout draft, live path, as-built record.
- **Prepared by hand, not captured from a live AI run:** Both saved samples [A-15, A-17].
- **Checked, and how:** Automated tests in `our-tool/tests/` and a headless-browser smoke test on a local copy, as recorded in `as-built.md`. The team also ran the live path by hand on the deployed site. We have not re-run the tests for this document. After the FN-09 change the team reports 45 automated tests passing, which we have not re-run either. A person confirmed on the branch's Vercel preview that saving works.
- **Not confirmed on the live site:** Offline use, the network-log checks, failure with the AI switched off, a browser other than the headless one, and a narrow-window layout (L-11). No timing measurement exists (L-09). For FN-09: opening a saved record, the list page and the production deployment (L-15).

Changed after G4: this section described a spec-stage pack, with the tool unbuilt and G5 pending. It now shows G5 approved, the tool built, FN-06 to FN-08 cut, and the open items from `as-built.md`.

Changed after G5: the section said G6 was pending, but `STATUS.md` shows G6 approved on 2026-11-02 at 08:14, so 14.1 and 14.3 were corrected. Added the post-G5 decision to add FN-09 (Viet, 2026-11-03), stated as not reviewed by any gate, with the new build and checks in 14.4 and 14.5.
