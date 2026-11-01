## 5. Solution

### 5.1 Solution statement

For Business Analysts who must turn raw meeting transcripts into Minutes of Meeting, MoM Drafter is a web tool that drafts a structured MoM in which every item is backed by a quote from the transcript. Unlike writing the MoM by hand, it shows exactly what the transcript says, marks missing owners and deadlines as "Not stated", and leaves every decision to the BA.

### 5.2 What it does

The BA pastes a fictional English transcript from one meeting [A-07]. The tool returns a draft MoM with discussion points, decisions and action items, each with a short supporting quote. Each action shows its owner and deadline, or "Not stated" with a suggested question the BA can ask the attendees. The BA checks each item against its quote, then accepts, edits or rejects it. The BA downloads the MoM as a Word document (.docx) [A-09] and sends it, as today.

### 5.3 Core features

| ID | Core feature | What the BA gets | Addresses |
|---|---|---|---|
| CF-01 | Structured MoM draft from a pasted transcript | A complete first draft of discussion points, decisions and action items in one consistent layout, without reading and writing everything by hand | P-01, P-02, P-04, N-01, N-02 |
| CF-02 | Evidence quotes and gap flags | A short transcript quote on every item so it can be checked quickly. Missing owners or deadlines show as "Not stated" with a suggested question for attendees | P-01, P-03, N-02, N-03 |
| CF-03 | Review, edit and download | The BA accepts, edits or rejects each item, and downloads the MoM as a Word document that records those decisions | P-04, P-05, N-04, N-05 |

### 5.4 Out of scope

- Audio or video transcription. The challenge starts from a transcript, and speech-to-text adds a second source of errors.
- A fixed company MoM template. None is known (Q-03); the draft uses a standard set of sections [A-03].
- Sending email or sharing the MoM. The BA decides what goes out (N-05), so sending stays outside the tool.
- Saving history, sign-in or multi-meeting search. Level 1 keeps nothing, which lowers data risk.
- Checking a MoM the BA wrote (Option C) and a separate chaser workflow (Option B). Option B's gap flags are folded into CF-02 only.
- Languages other than English, and several meetings in one run [A-07].

### 5.5 Why this option

Option A scored highest in section 4.2 on value for BA work, live demo and ease of defence [A-01, A-08]. It is the only option that produces the complete MoM the judges asked for. Its main weakness, a draft the BA trusts too much, is handled by the quotes, the "Not stated" flags and the BA decision on every item. Option B's gap flags are included in CF-02 so no separate feature is needed.
