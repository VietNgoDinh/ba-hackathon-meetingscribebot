# Assumptions and sources

Every number in the proposal, slides and notes must cite an entry here as `[A-xx]` or `[SRC-xx]`.

## Assumptions

| ID | Assumption | Used in | Owner | Status |
|---|---|---|---|---|
| A-01 | The scoring rubric is Value for BA work 30, Working tool and smooth demo 25, AI quality control and data safety 20, Presentation and Q&A 15, Creativity 10, until the organizers publish official criteria | 4.2, reviews | Team | Open |
| A-02 | The process starts when a meeting ends and a raw text transcript (for example from a meeting platform) is handed to the BA | 3.1, 3.2 | Team | Open |
| A-03 | The BA works from the transcript and personal notes, and writes the MoM by hand in a word-processing document with no fixed company template | 2.4, 3.2 | Team | Open |
| A-04 | The BA is accountable for the MoM and decides what is sent out | 2.3 | Team | Open |
| A-05 | Meeting attendees review the draft MoM and report corrections to the BA, and they carry out the action items | 2.2, 2.4, 3.2 | Team | Open |
| A-06 | Transcripts often leave owners or deadlines unclear, so the BA asks attendees; the final MoM is emailed to attendees and stakeholders outside the meeting | 2.2, 2.4, 3.1, 3.2 | Team | Open |
| A-07 | The transcript is in English and covers a single meeting | 2.1 | Team | Open |
| A-08 | The 1 to 5 option scores in section 4.2 are team judgement, not measurements, and no web research backed them | 4.2, 4.3 | Team | Open |
| A-09 | The downloadable MoM is a Word (.docx) file, pending the judges' answer to Q-02 | 5.2, 6.2 | Team | Open |
| A-10 | In the downloaded MoM, rejected items are left out and items the BA has not yet decided are marked "Not reviewed". Accepted and edited items appear normally, and every decision is recorded | A2 WF-03, 9.4 | Team | Open |
| A-11 | At Level 1 the transcript, draft, quotes, gap flags and BA decisions are held only in the browser page for the session. Closing or reloading the page loses them, and the BA keeps the downloaded Word file | A1.3 | Team | Open |
| A-12 | The input limit is 20,000 characters of transcript per run. It is a working figure chosen to keep one run to one meeting and one short AI call; it was not measured against real transcripts and may be too small for a long meeting. It is set in one place, the shared file `public/js/mom-logic.js`, used by both browser and server. The long-meeting limitation is recorded as L-01. Still not tested on a real long transcript after the build | A3.2 FN-01, A3.4, A4 | Team | Open |
| A-13 | The Word file's Audit trail section lists every item the AI produced, including rejected ones (labelled Rejected, with the decision and time), while the body sections leave rejected items out. This is how A-10 ("rejected items are left out" and "every decision is recorded") is applied together | A3.2 FN-04 | Team | Open |
| A-14 | Pasted transcripts are plain text and often carry speaker names and timestamps. The tool keeps the text as pasted, and the quote check works on that text after spaces are normalized | A3.2 FN-01, FN-02 | Team | Open |
| A-15 | The saved sample result in `our-tool/public/samples/` was prepared by hand to show the expected behaviour, not captured from a live AI run. Its `droppedCount` is 0, and its model and time values say it is sample data. A live run on the same transcript may word or count items differently. After the build this was seen: in one live Haiku run the wording of an item differed from the sample (the lookup-service action read "ideally before the design review" where the saved sample reads "before the design review", and the same two gaps were flagged) | 7.3, 7.4, A3.2 FN-05 | Team | Open |
| A-16 | The name and date check (A3.2 FN-02 step 6) is exact-text matching after spaces are normalized and case is ignored; a multi-name owner passes only if every name appears. It was not tested on real transcripts, so it may replace a correctly reworded name or date with "Not stated". That is the safe direction, because the BA can enter the value. It cannot prove the AI picked the right person, so the BA still checks each owner against the quote | A3.2 FN-02 | Team | Open |
| A-17 | The stress-test sample (`02-quote-check-stress-test`) was prepared by hand, like A-15. Its saved item 3 has a planted quote that is not in its transcript so that the quote check visibly removes one item in Demo mode. The stored `droppedCount` of 0 in both sample files is ignored: Demo mode works out the dropped and replaced counts by running the shared checks. It is loaded with `?sample=stress` and is labelled as a stress test in its first transcript line. It is not a live AI result and the presenter says so | 7.3, 7.4, A3.2 FN-05, A4 | Team | Open |
| A-18 | The three rollout stages in section 11 (Pilot, Hardening, Department rollout) and their exit criteria are the team's proposal. No durations, headcounts or thresholds are given. The pilot sponsor sets the pilot group, the length of the pilot and the acceptable edit and rejection rates before the pilot starts | 11.1, 12.2 | Team | Open |
| A-19 | No running cost has been estimated. AI provider pricing, hosting terms and support effort were not researched for this proposal, so section 11.3 gives no figures. Cost per run, hosting and support are to be estimated during the pilot | 11.3, 13.4, 15 | Team | Open |
| A-20 | The company has approval routes for an AI provider, for hosting, and for classifying meeting transcripts, and BA management can name an owner for the tool. We have not confirmed any of these, so the dependencies in section 11.2 are our reading of what a rollout would need | 11.2, 15 | Team | Open |
| A-21 | The likelihood and impact ratings in section 10.2 are team judgement, not measurements. They were not tested on real transcripts or with real BAs | 10.2 | Team | Open |
| A-22 | Saving reviewed minutes (FN-09, added after G5) uses working limits chosen by the team, not measured: at most 100 items per saved record, a title of up to 200 characters, and up to 5,000 characters per item field. Saved records are shared by everyone who has the access code (no per-user sign-in), and only the server can read or write the table. The raw transcript is not saved | as-built.md, FN-09 | Team | Open |

## Sources and measurements

| ID | Source or measurement | Value | Date | Collected by |
|---|---|---|---|---|
