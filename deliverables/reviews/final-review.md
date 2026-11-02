# Review report: final (before G6)

**Verdict (advice only, nothing approved):** Pass with flags. One factual error repeated across the pack. The honesty constraints hold: no claim that the audit trail shows removed or replaced counts (L-10), no claim of offline, network-log or AI-off checks (L-11), and S07 reads Pending with no timing figure.

Mechanical check (final): 2 errors, 2 warnings. The missing `demo-script.md` is expected, because `/ba-demo` writes it next. The planted quote in sample 02 was accepted at G4 [A-17]. The two number warnings in `06-to-be-workflow.md` are step numbers, not figures.

## Findings

| # | Severity | Finding | Fix round |
|---|---|---|---|
| 1 | Major | The pack said a live Haiku run gave a deadline where the saved sample shows `Not stated`. The saved sample already has the deadline "before the design review". The real difference was wording only ("ideally before the design review"), with the same two gaps flagged. The error began in the build conversation and spread to as-built, A-15, 7.4, L-02, L-05, 13.6, S06, B01, B06 and the speaker notes | Fixed. Every copy now states the true difference. The "one gap, not two" prediction is removed |
| 2 | Major | `deliverables/presentation/demo-script.md` does not exist | Open. `/ba-demo` writes it. Recheck it against S06 and 7.4 afterwards |
| 3 | Major | "12 of 12 Yes" overstates against the proposal's own Partial ratings in section 15 | Fixed in `as-built.md`: Honest failure and Audit trail now read "Yes (code and tests only)", with a note pointing to section 15, L-10 and L-11. `STATUS.md` and section 14.3 still say "12 of 12". Only `/ba-approve` changes the log |
| 4 | Minor | S05 does not reuse S03's layout exactly: it drops the "Check against transcript" node | Open. Story lead decides whether to add a "merged" annotation |
| 5 | Minor | The pack is not committed, and `proposal.md` was untracked | Open until `/ba-sync` |
| 6 | Minor | The pack cites passing tests that had not been re-run | Fixed. `npm test` was run on 2026-11-02 at 08:07: 36 of 36 passed, recorded in `as-built.md` |
| 7 | Minor | 14.4 override rows rest on `spec-review.md` | No change needed. It is cited and is in `deliverables/reviews/` |

## Judge review

Estimates are against the assumed rubric [A-01]. They are an estimate, not a result.

| Criterion (weight) | Estimate | Evidence |
|---|---|---|
| Value for BA work (30) | Strong, with the caveat that no timing exists | Pain points P-01 to P-05 trace to features. S07 says "to be measured" |
| Working tool and smooth demo (25) | Strong | Deployed, with a live path and a Demo mode fallback. The demo script is missing |
| AI quality control and data safety (20) | Very strong | Rules before AI, format check, quote check, name and date check, human decision. Weaknesses are stated openly |
| Presentation and Q&A (15) | Strong | Section 13 and B01 are candid |
| Creativity (10) | Moderate | The idea is the expected one. The stress test and audit trail add some distinction |

**Hardest questions section 13 does not answer well yet**
1. How long does a BA take with and without the tool? No timing exists. One rehearsal timing registered as an SRC would help most.
2. Which behaviour actually differed live? Now answered with the true example (wording only).
3. Does it work on a real hour-long meeting? Unmeasured. One long fictional run would turn the admission into evidence.
4. Why trust "Yes" on the checklist when the checks ran on short transcripts and one cheap model? The pack says Yes means "exists in code". No second model or varied transcripts were tried.
5. Why does the Word file not show what the checks removed, and why do rejected items' text stay in the audit trail? The pack calls these a roadmap item or undecided. Deciding now to add the two audit lines would be cheap and visible.

Also unanswered: how the tool beats a general AI chat. Section 13.1 admits no comparison was done.

Limits of the review: it did not open `questions.md`, `spec-review.md`, `lib/validate.js` or `lib/llm.js`, skimmed A3 and A4, did not read `proposal.md` past A2, and ran no code.
