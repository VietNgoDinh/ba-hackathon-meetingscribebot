## 5. Solution

### 5.1 Solution statement

For Business Analysts who must turn raw meeting transcripts into Minutes of Meeting, MoM Drafter is a web tool that drafts a structured MoM in which every item is backed by a quote from the transcript. Unlike writing the MoM by hand, it shows exactly what the transcript says, marks missing owners and deadlines as "Not stated", and leaves every decision to the BA.

### 5.2 What it does

The BA pastes a fictional English transcript from one meeting [A-07]. The tool returns a draft MoM with discussion points, decisions and action items, each with a short supporting quote. Each action shows its owner and deadline, or "Not stated" with a suggested question the BA can ask the attendees. The BA checks each item against its quote, then accepts, edits or rejects it. The BA downloads the MoM as a Word document (.docx) [A-09] and sends it, as today. In live mode the BA can also save the reviewed minutes, with every decision, and open them again later on a read-only Saved minutes page (FN-09, a Should function added after G5). The transcript itself is not saved. Saved minutes are shared by everyone who has the access code, because there is no per-user sign-in (L-12).

### 5.3 Core features

| ID | Core feature | What the BA gets | Addresses |
|---|---|---|---|
| CF-01 | Structured MoM draft from a pasted transcript | A complete first draft of discussion points, decisions and action items in one consistent layout, without reading and writing everything by hand | P-01, P-02, P-04, N-01, N-02 |
| CF-02 | Evidence quotes and gap flags | A short transcript quote on every item so it can be checked quickly. Missing owners or deadlines show as "Not stated" with a suggested question for attendees | P-01, P-03, N-02, N-03 |
| CF-03 | Review, edit and download | The BA accepts, edits or rejects each item, and downloads the MoM as a Word document that records those decisions. In live mode the BA can also save the reviewed minutes and read them again (FN-09, read only) | P-04, P-05, N-04, N-05 |

### 5.4 Out of scope

- Audio or video transcription. The challenge starts from a transcript, and speech-to-text adds a second source of errors.
- A fixed company MoM template. None is known (Q-03); the draft uses a standard set of sections [A-03].
- Sending email or sharing the MoM. The BA decides what goes out (N-05), so sending stays outside the tool.
- Per-user sign-in, editing or deleting a saved record, retention rules, and search across meetings. The tool saves reviewed minutes (FN-09) but only as a shared, read-only list of the 50 newest records. Everything else stays out, and the next step is described in section 11.
- Saving the raw transcript. The transcript is never stored.
- Checking a MoM the BA wrote (Option C) and a separate chaser workflow (Option B). Option B's gap flags are folded into CF-02 only.
- Languages other than English, and several meetings in one run [A-07].

### 5.5 Why this option

Option A scored highest in section 4.2 on value for BA work, live demo and ease of defence [A-01, A-08]. It is the only option that produces the complete MoM the judges asked for. Its main weakness, a draft the BA trusts too much, is handled by the quotes, the "Not stated" flags and the BA decision on every item. Option B's gap flags are included in CF-02 so no separate feature is needed.

Changed after G5: FN-09 (save reviewed minutes) was added to CF-03 by a decision of Viet on 2026-11-03, and "Saving history ... Level 1 keeps nothing" was removed from the out-of-scope list because it is no longer true of saved minutes. There are still 3 core features. Option A's scoring in section 4.2 was not redone for this change.
