# Spec review

- **Reviewed at:** 2026-11-02, before G4
- **Verdict:** Pass with flags
- **Summary:** The spec is complete and fits the scope limits: 3 core features, 5 Must functions, 1 screen, Level 1. Every control in the build-rules baseline is covered, every quote in the sample appears in the input, and the demo arithmetic is consistent. The 5 Major findings need fixing before the spec freezes.

Mechanical check: 0 errors, 2 warnings. Both warnings are at `06-to-be-workflow.md` lines 10-11. They are step labels, not figures, so they are false positives.

## Findings

| # | Severity | Location | Finding | Suggested fix |
|---|---|---|---|---|
| 1 | Major | `A3-functions.md` FN-02 and A3.3; `07-demo-plan.md` 7.2; `09-how-it-works.md` 9.4; `A2` WF-02 | The quote check validates only the item's quote. `owner` and `deadline` are not checked against the transcript, so the AI could return an invented name or date with a valid quote. The docs say "the tool never guesses" as fact, but only the prompt prevents it. | Add an FN-02 step. If `owner` is not `Not stated` and the name does not appear in the transcript, or the `deadline` wording does not appear, replace it with `Not stated` and count it. Add an acceptance criterion and a test case. Reword the "never guesses" claims. |
| 2 | Major | `A3-functions.md` A3.1, FN-02, FN-05; `07-demo-plan.md` 7.3; `.claude/rules/our-tool.md` | A3.1 says FN-02 runs on the server. FN-05 says Demo mode needs no server. The spec doesn't say where the id, source and gap-flag logic lives for Demo mode. | Put the shared logic in a browser module under `public/js/` that the server also imports, and update A3.1, FN-02 and FN-05. |
| 3 | Major | `A3-functions.md` FN-01 and A3.4 [A-12]; `assumptions.md` A-12 | The 20,000-character limit is unmeasured and may be too small for a realistic transcript. The error message tells a user who already pasted one meeting to paste one meeting. | Test one realistic fictional transcript and record it as an SRC-xx, or raise the limit and tag it. Fix the error wording. Add a limitation (L-xx) at closeout. |
| 4 | Major | `07-demo-plan.md` 7.3 and 7.4; `A3-functions.md` FN-05; `expected.json` | The sample cannot show the quote check dropping anything (`droppedCount` is 0). The strongest AI-quality-control story appears only as "0 removed". | Add a second, clearly labelled stress-test sample with one item whose quote is not in the transcript. |
| 5 | Major | `A3-functions.md` FN-04 step 2, FN-05; `.claude/rules/our-tool.md` | The .docx is built in the browser, including in Demo mode with the server off, but the spec doesn't say where the library comes from. A CDN breaks the offline path. The file-error fallback points to FN-07, which is only a Could. | State that the library is a vendored file in `public/`. Add an acceptance criterion that the download works offline. Fix the fallback. |
| 6 | Minor | `01-summary.md` 1.3; `08-value.md` 8.3 row 4 | 1.3 says the team "built" the tool, which states a plan as a result. 8.3 says "Not available by hand", which is unsupported. | Change 1.3 to "is building". Change the 8.3 cell to "To be measured". |
| 7 | Minor | `04-options.md` 4.2 | The Option C weighted score is 70, not 72. Criterion names differ from the rubric in A-01. The ranking is unchanged. | Correct Option C to 70. Align the criterion names with A-01. |
| 8 | Minor | `questions.md` Q-01, Q-02 | Q-02 cites A-03 where A-09 is right. Q-01 mentions a .txt file, but the spec supports pasted text only. | Cite A-09 in Q-02. Change Q-01 to pasted text with no file upload. |
| 9 | Minor | `07-demo-plan.md` 7.3 | The planted-issues cell says a decision was agreed "by a show of hands", but the transcript has no show of hands. | Reword to "agreed after the chair asks for objections". |
| 10 | Minor | `A3-functions.md` FN-01 and A3.3; `expected.json` | `isSample` is in the sample file but not in the A3.3 contract. FN-01's check order puts the access code before the empty-input check, which conflicts with the empty-box acceptance criterion. | Add `isSample` to A3.3. State the check order, or run the empty and oversize checks in the browser first. |

## Fix round

| # | Result | Note |
|---|---|---|
| 1 | Fixed | FN-02 now checks owner and deadline against the transcript and counts replacements (`replacedCount`). "Never guesses" wording changed in A3, A2, 06, 07 and 09. |
| 2 | Fixed | Shared logic moved to `public/js/mom-logic.js`, used by the server and by Demo mode in the browser. |
| 3 | Fixed | A-12 stays an unmeasured assumption. Error wording fixed. A long-meeting limitation is flagged for closeout to record as an L-xx. |
| 4 | Fixed | Added stress-test sample 02 with one planted quote. FN-05 now re-checks saved samples at run time, so the removed-items notice shows. |
| 5 | Fixed | Vendored `public/vendor/docx.min.js`, no CDN, offline criterion added, fallback no longer points to FN-07. |
| 6 | Fixed | 1.3 now says "is building". 8.3 row 4 now says "To be measured". |
| 7 | Fixed | Option C corrected to 70 and criterion names aligned with A-01. |
| 8 | Fixed | Q-02 cites A-09. Q-01 says pasted text, no file upload. |
| 9 | Fixed | Reworded to "agreed after the chair asks for objections". |
| 10 | Fixed | `isSample` added to A3.3 and check order stated for browser and server. |

Mechanical recheck: 1 error, 2 warnings. The error is the planted quote in `02-quote-check-stress-test.expected.json`, which is there on purpose (A-17). The 2 warnings are the same step-label false positives as before. Follow-ups for B: add `public/js/mom-logic.js` and `public/vendor/docx.min.js` to the file map in `.claude/rules/our-tool.md`, and write the made-up owner and deadline test.

## Judge review

Final mode only. Not applicable in spec mode.

## Checks passed (for the decider)

- **Completeness:** all template headings are present in 01-09, A1-A4 and 07, with no placeholders.
- **Traceability:** every function traces to P-xx and N-xx. CF-01 to CF-03 each have functions. FN-01 to FN-05 all appear on SCR-01.
- **Controls:** all 12 baseline controls are specified and mapped in A3.1.
- **Demo arithmetic:** 8 items, and 6 Accepted, 1 Edited, 1 Rejected, 1 open gap after the decisions. The Word body has 7 items.
- **Honesty:** the sample is labelled as hand-prepared (A-15). Section 8 uses "To be measured" and makes no savings claim.
