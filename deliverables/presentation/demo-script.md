# Demo script

- **Scenario:** Elena Marsh, a fictional BA at Tallowfield Mutual (fictional), turns the Address change requirements review transcript into a checked Word MoM (section 7.1).
- **Presenter:** Ngan (C), introduces and talks. Confirm at rehearsal.
- **Demo driver:** Phong (B)
- **Backup driver:** Viet (A), proposed. The team confirms.
- **URL:** https://ba-hackathon-meetingscribebot.vercel.app
- **Access code holder:** Phong (B), proposed. The driver types the code by hand. The code is never written in any file, slide or chat.

Counts below (8 items, 2 gaps, 4 items, 1 removed) come from the hand-prepared saved samples [A-15] and from section 7.4. Slide S06 and this script say the same three things to watch for.

## Before we start

- [ ] Deployed URL is open, and `/api/health` reports `ok`
- [ ] Access code is typed by the driver into the access code field (live path only)
- [ ] Sample input is ready to paste: `our-tool/public/samples/01-address-change-review.input.txt`
- [ ] Browser zoom is readable from the back of the room
- [ ] Notifications are off
- [ ] Demo mode has been tested on this laptop
- [ ] A second network option is ready (phone hotspot)
- [ ] One Word file from a rehearsal run is saved on the laptop, named as a rehearsal file
- [ ] Meeting title to type: "Address change requirements review"
- [ ] Second tab ready with `https://ba-hackathon-meetingscribebot.vercel.app/?sample=stress`

Not yet confirmed (L-11). To be checked at rehearsal. Do not claim any of these on stage until they are ticked with a real run:

- [ ] To be checked at rehearsal: Demo mode keeps working with the internet switched off after the page has loaded
- [ ] To be checked at rehearsal: browser network log shows no call to `/api/analyze` in Demo mode, and no key or access code in any request or page
- [ ] To be checked at rehearsal: layout in a narrow window and in a second browser
- [ ] To be checked at rehearsal: what the screen shows when the AI is switched off (the plain messages are tested in code only)

## Steps

Say which mode is on screen at every step. The saved samples were prepared by hand, and Demo mode shows them as written.

### Part 1. Main path in Demo mode (reach the moment of proof first)

| Step | Screen | Do | Say | Judges should see | If it fails |
|---|---|---|---|---|---|
| 1 | SCR-01 Empty | Open the URL. Point to the fictional data notice. Choose "Use Demo mode" | "This is Demo mode: sample data, no AI. The transcript is fictional, a meeting about customers changing their home address." | Label "Demo mode: sample data, no AI" in the header. Sample transcript in the box. Access code field hidden. Button now reads "Exit Demo mode" | Reload the page and choose "Use Demo mode" again. If samples will not load, switch to the backup driver's laptop |
| 2 | SCR-01 Demo | Type "Address change requirements review" in the title field. Choose "Draft MoM" | "No server and no AI call. The browser still runs the same quote check as the live path." | Draft appears at once. Summary bar: 8 items, 8 Not reviewed, 2 open gaps, 0 removed. Three groups: Discussion points, Decisions, Action items | Reload, repeat steps 1 and 2. Use the stress path or the rehearsal file as a last resort |
| 3 | SCR-01 Draft ready (moment of proof) | Scroll slowly through the items. Stop on the two action items with gap flags | "Every item has a quote from the transcript under it, so Elena can check it in seconds. Two actions show 'Not stated' with a suggested question: one has no deadline, one has no owner. The tool does not guess." | AI badge on each item, quote under each item, "Rule" badge on the two flags (Deadline: Not stated for the letter wording, Owner: Not stated for the lookup-service action), each with a suggested question | Nothing to recover. If the page looks wrong, reload and redo steps 1 and 2 |
| 4 | SCR-01 | On "Someday we might add text message confirmations", choose "Reject" | "Nobody committed to this. It is a loose remark, so Elena rejects it. The BA decides, not the AI." | Item dimmed with the badge "Rejected". Summary bar updates | Choose "Reject" again. The buttons stay available |
| 5 | SCR-01 | Accept the remaining items one by one, but leave the letter wording action's deadline as "Not stated". On the lookup-service action, type "Ines Calloway" in "Answer from attendees" and choose "Save answer" | "Elena asked the attendees who owns this. She types the answer in. Until she does, it stays 'Not stated'." | Owner shows "Ines Calloway" with the badge "Entered by BA". The letter wording deadline gap stays visible | If the answer does not save, retype and choose "Save answer" again |
| 6 | SCR-01 | On the lookup-service action choose "Edit". Change the text to "Document the fallback behaviour of the address form when the postcode lookup service is down." Choose "Save edit" | "Elena rewrites the wording. The quote underneath does not change, so the evidence stays." | Badge "Edited", new text, original quote unchanged | Choose "Cancel" and repeat. An empty save shows a plain message |
| 7 | SCR-01 | Point to the summary bar | "Six accepted, one edited, one rejected, none left unreviewed, and one gap still open." | Summary bar: 8 items, 6 Accepted, 1 Edited, 1 Rejected, 0 Not reviewed, 1 open gap | If the numbers differ, read out what the screen shows. Do not quote the script |
| 8 | SCR-01 | Choose "Download Word MoM". Open the file `MoM-address-change-requirements-review.docx` | "The file keeps what Elena decided. The rejected item is not in the body but is listed in the audit trail. The audit trail shows prompt version, model, the times, the mode and each decision. In Demo mode it says sample data, no AI." | Word file with sections, quotes, the action table (Kofi's deadline "Not stated", Ines Calloway as owner), and the audit trail. Rejected item only in the audit trail | If the download fails, stay on screen and say the file records the same decisions. Open the rehearsal file and call it a rehearsal file |

Do not point to removed or replaced counts in the Word file. The audit trail does not show them (L-10). They appear on screen only, in the summary bar and notices.

### Part 2. Stress sample (optional, only if time allows)

| Step | Screen | Do | Say | Judges should see | If it fails |
|---|---|---|---|---|---|
| 9 | SCR-01 | Switch to the second tab: `/?sample=stress`. Choose "Use Demo mode", then "Draft MoM" | "This is a hand-prepared stress test. We planted a fifth item with a quote nobody said, on purpose, to show the quote check." | Transcript starts with the line labelled as a stress-test sample. 4 items. Notice: "1 item was removed because its quote was not found in the transcript." Summary bar: 4 items, 4 Not reviewed, 2 open gaps, 1 removed by quote check | Skip this part. Say it is optional and move on |
| 10 | SCR-01 | Point to the notice and the summary bar | "The tool removed that item before the BA saw it. This count is on screen only. It is not in the Word file." | Removed notice and the summary bar | None needed |

### Part 3. Live path (typed access code)

| Step | Screen | Do | Say | Judges should see | If it fails |
|---|---|---|---|---|---|
| 11 | SCR-01 | Open the main page (not Demo mode), or choose "Exit Demo mode". Paste the main sample transcript. The driver types the access code into the access code field, out of sight of the projector where possible | "Now the live path. This sends the transcript to the AI, behind an access code. The code stays in the page only." | No Demo mode label. Access code field shown (hidden characters). Transcript in the box with its character count | If the field is missing, you are still in Demo mode. Choose "Exit Demo mode" |
| 12 | SCR-01 Loading | Choose "Draft MoM" | "A live run may word items a little differently from the saved sample. We will see the same kind of gaps." | "Reading the transcript and drafting the MoM." then a draft | Go to the fallback below |
| 13 | SCR-01 Draft ready | Compare with the saved sample. Point to the quotes and the gap flags | "In one live check, a deadline read 'ideally before the design review' where the saved sample says 'before the design review'. That wording is in the transcript, so the name and date check allows it. I am not promising the saved result." | AI-drafted items with quotes. Gap flags of the same kind as the saved sample, with "Rule" badges. Removed or replaced notices only if the checks found something | If a gap is worded differently, say so plainly and carry on. Do not claim the saved result |
| 14 | SCR-01 | Make one decision (Reject or Edit an item). Choose "Download Word MoM" | "Same controls as before. The Word file records the decisions." | Word file with the audit trail: prompt version v1, model claude-haiku-5-5, time of the AI run, time of export, mode "live", and each decision. No removed or replaced counts | If the download fails, show the screen and use the rehearsal file |

## Fallback

Switch to Demo mode as soon as the live path fails (wrong code message, a plain error notice, a long wait, or no network). Click "Use Demo mode" on the error notice, or in the left column. Then say:

"The live AI is not available right now. This is Demo mode: sample data, no AI. It shows the same review, edit, reject and download steps on a saved sample that our team prepared by hand."

Continue from Part 1, step 2. If the Word download fails, stay on screen and say the file records the same decisions, then open the rehearsal file and call it a rehearsal file. Do not claim offline use, a clean network log, a narrow-window layout, or behaviour with the AI switched off until the rehearsal checks above are ticked.

## Rehearsal log

Fill after real runs only. Leave blank until a run has happened.

| Run | Time | Presenter | Mode | Result | Issue and fix |
|---|---|---|---|---|---|
| 1 | 2026-11-02 08:14 (reported) | Not stated | Not stated | Pass, as reported ("everything ok") | No detail given. Runs, modes, timings and the L-11 checks (offline, network log, narrow window, AI-off) were not itemised, so none of them is recorded as confirmed |
| 2 | | | Live or Demo | Pass or Fail | |
| 3 | | | Live or Demo | Pass or Fail | |
