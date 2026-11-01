## 4. Options compared

### 4.1 Options

No web research was done for this section (not run in this session). The options come from the pain points in section 2.4 and general BA practice, with no external sources cited. All three use one AI call per run on pasted text (fictional transcripts only), and a BA reviews every result before use.

#### Option A: Evidence-linked MoM drafter

- **What it does:** The BA pastes a transcript. The tool produces a structured MoM draft (discussion points, decisions, action items with owner and deadline) where every item carries a short supporting quote from the transcript. Unclear owners or deadlines show as "Not stated". The BA edits and downloads the MoM.
- **BA task improved:** Reading the transcript and writing the MoM (steps 2 to 5; P-02, P-01, P-04).
- **Role of AI:** Reads the whole transcript, drafts the structured MoM, attaches quotes as evidence and flags missing owners or deadlines.
- **What stays with people:** The BA checks each item against its quote, fills gaps by asking attendees (P-03), edits the wording and decides what is sent out (N-05).
- **Main risk:** The draft could omit or misstate an item and the BA trusts it. Quotes and "Not stated" flags make this checkable but do not remove it.

#### Option B: Action and decision register with gap chaser

- **What it does:** The BA pastes a transcript. The tool extracts only decisions and action items into a table, marks each missing owner or deadline, and suggests a clarifying question per gap for the BA to send to attendees. The register downloads as a document.
- **BA task improved:** Finding actions, owners and deadlines (steps 3 and 4; P-01, P-03).
- **Role of AI:** Extracts decisions and actions, detects gaps and drafts follow-up questions.
- **What stays with people:** The BA decides which questions to send, confirms owners and deadlines, and writes the narrative parts of the MoM.
- **Main risk:** It covers only part of the requested MoM (no discussion summary), so it fits the judges' expected outcome less fully.

#### Option C: MoM completeness checker

- **What it does:** The BA pastes the transcript and the MoM they wrote. The tool lists transcript items missing from the MoM, MoM statements the transcript does not support, and unclear owners or deadlines. It produces a downloadable review note.
- **BA task improved:** Checking the draft against the transcript (step 6; P-01, P-05).
- **Role of AI:** Compares two texts and reports differences with quotes.
- **What stays with people:** The BA still reads the transcript and writes the MoM; the BA decides which findings are valid and corrects the MoM.
- **Main risk:** It saves little reading and writing time (P-02, P-04), and the challenge asks for a generated MoM, which this does not produce.

### 4.2 Evaluation

Weights come from the assumed rubric [A-01]. Scores from 1 to 5 are team judgement, not measurements [A-08]. The weighted score is the sum of each score times its weight, divided by 5.

| Criterion | Weight | Option A | Option B | Option C | Reason for the difference |
|---|---|---|---|---|---|
| Value for BA work | 30 | 5 | 3 | 3 | A removes the reading and writing effort and addresses the most pain points (P-01, P-02, P-04). B and C each address part of the task. |
| Working tool and smooth demo | 25 | 5 | 4 | 3 | A shows paste, draft and download in one pass and matches the judges' challenge. B is quick but narrower. C needs a second prepared input (a flawed MoM). |
| AI quality control and data safety | 20 | 4 | 5 | 5 | All keep the BA in review. B and C have a smaller output to check. A has more output, but quotes and "Not stated" flags make checking practical. |
| Presentation and Q&A | 15 | 5 | 3 | 3 | A maps directly to the stated challenge. B and C need an explanation of why they stop short of a full MoM. |
| Creativity | 10 | 3 | 4 | 4 | Drafting a MoM is the expected idea. Gap chasing and cross-checking are less common. |
| **Weighted score** | | **92** | **75** | **70** | |

### 4.3 Recommendation

Recommend Option A. It meets the judges' stated outcome (structured, downloadable MoM with decisions, actions, owners and deadlines), helps the BA the most, and demos in one pass. Its quality-control weakness is handled by design: quotes tie each item to the transcript, gaps show as "Not stated" rather than guesses, and the BA edits before download. Option B's gap flags can be folded into A as part of the draft rather than built separately, which keeps A within 3 core features, 5 Must functions and 3 screens at Level 1.

This would change if the judges say the MoM must follow a fixed company template (the draft would need a template step), or if they value checking BA-written MoMs over generating them (then Option C). It would also change if tests show the draft misses items often enough that review costs more than it saves.

### 4.4 Decision

- **Chosen option:** Option A, Evidence-linked MoM drafter
- **Reason:** It has the highest weighted score.
