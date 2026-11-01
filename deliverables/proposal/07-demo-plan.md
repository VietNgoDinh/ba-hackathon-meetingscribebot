## 7. Demo plan

### 7.1 Demo story

- **Persona:** Elena Marsh, a fictional Business Analyst at Tallowfield Mutual, a fictional company. She has just run the "Address change requirements review" meeting and has the raw transcript. Attendees expect a MoM they can act on (A-05), and she is accountable for it (A-04).
- **The thread:** The Address change requirements review meeting, about letting customers change their home address in the customer portal. Every slide and the live demo follow this one transcript, from the paste to the Word file.
- **Moment of proof:** The draft appears. In one screen the judges see discussion points, decisions and actions, each with a transcript quote under it, and two actions flagged "Not stated" (one with no owner, one with no deadline) with a suggested question. Every other name and date on screen appears in the transcript. This is the answer to P-01 (missed items) and P-03 (unclear owners and deadlines) in one view, and it comes straight after "Draft MoM".
- **Human control moment:** Elena rejects the text-message item because nobody committed to it, edits the wording of one action, and types an owner she got from the attendees into a "Not stated" field. A gap stays `Not stated` until the BA enters a value (FN-03). The Word file then shows these decisions.

### 7.2 What judges should watch for

1. **Every item has a quote.** Each item carries a short transcript quote, so the BA can check it in seconds instead of re-reading the meeting (CF-02, FN-02).
2. **Gaps are shown, and names and dates must come from the transcript.** "Owner: Not stated" and "Deadline: Not stated" appear with a "Rule" badge and a suggested question. The AI is told not to guess, and names and dates must appear in the transcript. The tool replaces any owner or deadline not found in the transcript with `Not stated` and counts it (`replacedCount`) (CF-02, FN-01, FN-02).
3. **The BA decides.** Accept, Edit and Reject on every item, and the downloaded Word file records each decision plus the prompt version, model and time (CF-03, FN-03, FN-04).

### 7.3 Sample data

All sample data is fictional: the people (Elena Marsh, Tomas Brandt, Ines Calloway, Kofi Adeyemi), the company (Tallowfield Mutual) and the requirement.

| File | Purpose | Planted issues | Functions exercised |
|---|---|---|---|
| `our-tool/public/samples/01-address-change-review.input.txt` | The fictional transcript of one meeting, short enough to read aloud. Loaded into the transcript box in Demo mode and used for the live run | An action with an owner and a deadline (clear). An action with an owner but no deadline. An action with a deadline but no owner ("Someone needs to..."). A casual remark that sounds like a plan but is not a decision ("Someday we might add text message confirmations..."). Two decisions, one stated as a rule and one agreed after the chair asks for objections. Background talk that is a discussion point and not an action | FN-01, FN-02, FN-03, FN-04, FN-05 |
| `our-tool/public/samples/01-address-change-review.expected.json` | The saved result for the transcript, in the A3.3 format. Demo mode reads this file with no server and no AI. The automated tests check it against the transcript | Eight items of all three types. Two gaps: one `Not stated` deadline, one `Not stated` owner. Every quote is copied exactly from the transcript, and every owner and deadline other than `Not stated` ("Tomas", "by Friday", "Kofi Adeyemi", "before the design review") appears in the transcript, so no value is replaced and `replacedCount` is 0. It is marked as sample data (`model` is `sample-data-no-ai`, `generatedAt` is "Sample data, not a live run", `isSample` is `true`) | FN-02, FN-03, FN-04, FN-05 |
| `our-tool/public/samples/02-quote-check-stress-test.input.txt` | Optional stress-test sample. A short fictional follow-up meeting of the same team (Elena Marsh, Tomas Brandt, Ines Calloway, Kofi Adeyemi). Its first line labels it as a stress-test sample. Not the main demo | A clear action (owner and deadline). An action with no owner and no deadline. One decision, and one discussion point | FN-01, FN-02 |
| `our-tool/public/samples/02-quote-check-stress-test.expected.json` | The saved AI answer for the stress-test transcript, in the A3.3 format. It holds 5 items. Item 3 ("Business addresses will also be included in the pilot") has the planted quote "We also agreed to include business addresses in the pilot.", which is not in the transcript and also contradicts the home-address-only decision. The other 4 quotes are exact copies of transcript lines, and its owner and deadline ("Kofi Adeyemi", "by Wednesday") appear in the transcript. Marked as sample data like the main file, with `generatedAt` naming the stress test | FN-02, FN-03, FN-05 |

The expected file holds the AI part of each item as defined in A3.3 (`type`, `text`, `quote`, `owner`, `deadline`, `suggested_question`), plus `droppedCount`, `promptVersion` and `model` as sample values. The tool adds `id`, `source` and the gap flags when it handles the file, as it does for a live result (FN-02). For the main sample, `droppedCount` is 0 because every quote matches the transcript, and no item is dropped [A-15]. In the same way, `replacedCount` is 0 because every owner and deadline wording appears in the transcript. The dropped-item behaviour is shown by the stress-test sample in 7.4 and by the automated test with a made-up quote (FN-02). The stress-test file keeps the planted item inside it, so Demo mode must run the saved items through the same quote check as a live result (FN-02) and work out the dropped count then, rather than read it from the file. FN-05 in A3 must state this rule.

### 7.4 Expected result

For the sample transcript the tool should show 8 items, grouped as follows.

| Group | Item | Quote (start) | Notes |
|---|---|---|---|
| Discussion points | Customers phone the call centre for every address change | "Right now customers phone the call centre..." | Background |
| Discussion points | The postcode lookup check is the harder part to build | "The harder part is checking the new address..." | Background |
| Discussion points | Text message confirmations might come someday | "Someday we might add text message confirmations..." | AI reads it as a discussion point, not a decision, because "nobody is committing to that". The BA rejects it in the demo |
| Decisions | A confirmation letter goes to the old address on every change | "Compliance needs a confirmation letter..." | Stated as a requirement and agreed |
| Decisions | Home addresses only for this release | "Okay, so we go with home addresses only..." | Agreed by the group |
| Action items | Get access to the vendor sandbox. Owner: Tomas. Deadline: by Friday | "Tomas, can you get us sandbox access by Friday?" | Complete, no gap |
| Action items | Draft the confirmation letter wording. Owner: Kofi Adeyemi. Deadline: Not stated | "I will draft the wording..." | Deadline gap with a suggested question |
| Action items | Document what the form does when the lookup service is down. Owner: Not stated. Deadline: before the design review | "Someone needs to write down what the form does..." | Owner gap with a suggested question |

**Summary bar when the draft first appears:** 8 items, 0 Accepted, 0 Edited, 0 Rejected, 8 Not reviewed, 2 open gaps, 0 removed by quote check.

**What a rule catches:** The `Not stated` flags on the two actions (the "Rule" badge), the quote check that drops any item whose quote is not in the transcript (FN-02), the name and date check that replaces any owner or deadline not found in the transcript with `Not stated` and counts it (`replacedCount`, FN-02), and the input rules (empty box, oversized transcript, wrong access code), which stop a run before any AI call (FN-01).

**What only AI catches:** Finding the actions in casual speech ("Someone needs to write down...", "Tomas, can you get us sandbox access by Friday?"), telling a decision from a loose remark ("Someday we might add..."), telling a decision ("we go with home addresses only") from a discussion point, and writing each item as one clear sentence.

**Planned review decisions in the demo (the human control moment):**

| Item | What Elena does | Result |
|---|---|---|
| Customers phone the call centre... | Accept | Accepted |
| The postcode lookup check... | Accept | Accepted |
| Text message confirmations... | Reject, because nobody committed to it | Rejected |
| Confirmation letter decision | Accept | Accepted |
| Home addresses only | Accept | Accepted |
| Sandbox access (Tomas) | Accept | Accepted |
| Letter wording (Kofi) | Accept. Leave the deadline as `Not stated` to show the gap stays visible | Accepted, 1 open gap remains |
| Lookup service down | Type "Ines Calloway" in "Answer from attendees" and choose "Save answer" (the fictional answer from the attendees). Then Edit the text to "Document the fallback behaviour of the address form when the postcode lookup service is down." and choose "Save edit" | Edited, owner "Ines Calloway" with the badge "Entered by BA" |

**Summary bar after these decisions:** 8 items, 6 Accepted, 1 Edited, 1 Rejected, 0 Not reviewed, 1 open gap.

**Word file after download (title typed: "Address change requirements review"):** File name `MoM-address-change-requirements-review.docx`. The body has 7 items. The rejected text-message item is absent from the body and listed only in the Audit trail, labelled Rejected. The Action items table shows Kofi's deadline as `Not stated` and Ines Calloway as the owner of the lookup action, and the audit table notes that the owner was entered by the BA. In Demo mode the Audit trail reads "Demo mode: sample data, no AI".

**Optional variation:** To show the unreviewed notice, leave one item without a decision before downloading. The notice "1 item is not reviewed..." wording follows FN-04, and the file marks the item "Not reviewed".

**Optional proof of the quote check (stress-test sample):** Use this only if time allows, after the main demo. It shows the control that stops invented items. It is hand-prepared sample data, and the presenter says so.

1. Open the page with `?sample=stress` added to the address, then choose "Use Demo mode". This loads the stress-test sample (`02-quote-check-stress-test`) instead of the main one, with no new button on the screen. The transcript box shows its labelled first line.
2. Choose "Draft MoM". The draft shows 4 items, not 5: 1 discussion point, 1 decision and 2 actions. The notice "1 item was removed because its quote was not found in the transcript." appears above the items.
3. The presenter says: the saved AI answer had a fifth item, "Business addresses will also be included in the pilot", with a quote nobody said. The tool checked every quote against the transcript and removed that item before the BA saw it. It would also have contradicted the home-addresses-only decision.
4. What judges should see: the summary bar reads 4 items, 0 Accepted, 0 Edited, 0 Rejected, 4 Not reviewed, 2 open gaps (the call centre action has both a `Not stated` owner and a `Not stated` deadline), 1 removed by quote check.

This sample is for the quote check only. The main demo story stays on the Address change requirements review.

**Live mode:** A live AI run on the same transcript may word items differently, or count them differently, from the saved result. Every item must still carry a quote found in the transcript, every name and date shown must appear in the transcript (the tool replaces any that do not with `Not stated`), and the two gaps should show as `Not stated`. The presenter says which mode is on screen. The saved result is the reference for the script and the slides.

**Check before the event (Tool lead):** Run the sample in Demo mode with the server off, then once in live mode. Confirm that `npm test` passes with this file and that a made-up quote is reported as dropped. Also run the stress-test sample in Demo mode and confirm that exactly 1 item is removed (4 shown) and the notice appears.

### 7.5 Fallback

If the AI or network fails, the presenter chooses "Use Demo mode", which shows the expected result from the sample with no AI call. The screen labels it "Demo mode: sample data, no AI", and the presenter tells the judges. The story, the moment of proof and the human control moment are the same, because Demo mode runs the same review, edit, reject and download steps (FN-05). If the Word download fails, the presenter shows the summary bar and the items on screen, and says that the file records the same decisions. Keep one Word file from a rehearsal run on the presenter's computer as a last resort, and call it a rehearsal file.
