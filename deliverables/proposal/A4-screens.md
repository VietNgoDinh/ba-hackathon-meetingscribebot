## A4. Screens

### A4.1 Screen list

Two screens, within the limit of 3. The whole drafting job (paste, draft, review, download) fits on SCR-01, so it needs no second page. SCR-02 was added after G5 for one reason: to read saved minutes (FN-09). Demo mode is a state of SCR-01, not a separate screen. SCR-02 has no Demo mode and no sample data.

| ID | Screen | Purpose | Actors | Functions |
|---|---|---|---|---|
| SCR-01 | MoM Drafter workspace | Paste a transcript, get a draft MoM with quotes and gap flags, decide on every item, download the Word file, and save the reviewed minutes (live mode only). Also runs in Demo mode | ACT-01 | FN-01, FN-02, FN-03, FN-04, FN-05, FN-09 |
| SCR-02 | Saved minutes | List the saved minutes and open one record read only, with each item's decision and the audit values. No edit, no delete. Available at `/saved.html` | ACT-01 | FN-09 |

### A4.2 Sitemap

```mermaid
flowchart LR
  subgraph SCR01["SCR-01 MoM Drafter workspace"]
    E["Empty: paste transcript"]
    L["Loading"]
    R["Draft ready: review items"]
    X["Error: input kept"]
    D["Demo mode: sample loaded"]
    DR["Demo mode: draft ready"]
  end
  F["Word file on the BA's computer"]

  E -- "Draft MoM" --> L
  L -- "Result valid" --> R
  L -- "Rules, access code or AI failure" --> X
  X -- "Edit input, try again" --> E
  X -- "Use Demo mode" --> D
  E -- "Use Demo mode" --> D
  D -- "Draft MoM, no server" --> DR
  DR -- "Exit Demo mode" --> E
  D -- "Exit Demo mode" --> E
  R -- "Download Word MoM" --> F
  DR -- "Download Word MoM" --> F
  R -- "Start a new transcript" --> E

  subgraph SCR02["SCR-02 Saved minutes"]
    SE["Empty: enter access code"]
    SL["List of saved records"]
    SD["One record, read only"]
    SX["Error: message shown"]
  end
  DB[("Saved minutes in the database")]

  R -- "Save minutes, live mode only" --> DB
  E -- "Saved minutes link" --> SE
  R -- "Saved minutes link" --> SE
  SE -- "Show saved minutes" --> SL
  SL -- "Open" --> SD
  SL -- "Wrong code or database failure" --> SX
  SD -- "Wrong code or database failure" --> SX
  SD -- "Open another" --> SL
  SL -- "Back to drafting" --> E
  SD -- "Back to drafting" --> E
  DB -.-> SL

  classDef demo fill:#fdf3dc,stroke:#8a5a00,color:#1c2430
  classDef err fill:#fbeaea,stroke:#b3261e,color:#1c2430
  class D,DR demo
  class X,SX err
```

Legend: amber is Demo mode and red is the error state. There is no sign-in screen. The access code is a field on SCR-01 and again on SCR-02. "Saved minutes" and "Back to drafting" are links in the header. Demo mode cannot save (the "Save minutes" button is disabled), so no arrow leads from DR to the database. Going from SCR-01 to SCR-02 leaves the page, so an unsaved draft on SCR-01 is lost unless it was downloaded or saved.

### A4.3 Screen specifications

#### SCR-01 MoM Drafter workspace

- **Purpose:** The BA pastes one fictional transcript, gets a draft MoM in which every item has a transcript quote, resolves missing owners and deadlines, accepts, edits or rejects each item, downloads the Word file, and in live mode can save the reviewed minutes. Traces to CF-01, CF-02 and CF-03.
- **Layout:**
  - `.app-header`: the name "MoM Drafter", the tagline "Draft meeting minutes from a transcript. You check and decide every item.", the `.mode-label` slot (empty in live mode), and a "Saved minutes" link to SCR-02.
  - `.page-split`: two columns on wide screens, one column on narrow screens (input first, results second).
  - Left column, a `.panel` titled "Transcript": the fictional data `.notice`, the optional title `.field`, the access code `.field`, the transcript `.field` with a character count, and the buttons.
  - Right column, a `.panel` titled "MoM draft": the `.summary` bar, the `.notice` for removed items, the three groups of `.item` results (Discussion points, Decisions, Action items), and the download area at the foot with "Download Word MoM", "Save minutes" and the save status line.
  - A session `.notice` (`.notice-warn`) sits above the right column whenever a draft is on screen.

| Element | Component | Behavior | Function |
|---|---|---|---|
| Tool name and tagline | `.app-header` | Always visible | FN-01 |
| Mode label "Demo mode: sample data, no AI" | `.mode-label` | Visible only in Demo mode, in every Demo mode state. Hidden in live mode | FN-05 |
| "Saved minutes" link | `a.btn` in the header | Always visible, in both modes. Opens SCR-02 (`/saved.html`) in the same window, so a draft that was not downloaded or saved is lost | FN-09 |
| Fictional data reminder | `.notice` | Always visible above the transcript box. Text: "Use fictional data only. Do not paste real names, company details or confidential content." | FN-01 |
| Meeting title (optional) | `.field` with `input` | Free text. Used as the heading and file name of the Word file. Not sent to the AI | FN-04 |
| Access code | `.field` with `input` (password type) | Required in live mode. Sent as the `x-access-code` header, kept in the page only, never saved. Hidden in Demo mode | FN-01 |
| Transcript box | `.field` with `textarea` | Takes the pasted text. Label "Meeting transcript". Shows a count, for example "12,400 of 20,000 characters" [A-12]. Turns to the error style above the limit. The browser checks empty and too-long text when "Draft MoM" is chosen, before any request | FN-01 |
| "Draft MoM" | `.btn .btn-primary` | The one main action. In live mode it starts FN-01. In Demo mode it loads the saved sample result and makes no server call. Disabled while loading | FN-01, FN-05 |
| "Use Demo mode" | `.btn` | Starts Demo mode: shows the label, loads the sample transcript, hides the access code. Loads the main sample, or the stress-test sample when the page address carries `?sample=stress` (no extra button) | FN-05 |
| "Exit Demo mode" | `.btn` | Replaces "Use Demo mode" while Demo mode is on. Clears the box and the draft, removes the label | FN-05 |
| "Start a new transcript" | `.btn` | Appears when a draft is on screen. Asks "Start over? Your draft and decisions will be lost unless you have downloaded the Word file." with "Cancel" and "Start over" | FN-03 |
| Session warning | `.notice .notice-warn` | Shown while a draft is on screen: "This draft is kept only in this page. Download the Word file before you close or reload." The text does not mention saving. It stays true for anything the BA has not saved | FN-03 |
| Summary bar | `.summary` with `.summary-item` | Counts: Items, Accepted, Edited, Rejected, Not reviewed, Open gaps, Removed by quote check, Replaced by name and date check. Open gaps counts flags, not actions: each `Not stated` owner and each `Not stated` deadline is one gap. Updates after every decision | FN-02, FN-03 |
| Removed-items notice | `.notice` | Shown when `droppedCount` is above zero: "N items were removed because their quote was not found in the transcript." (singular for 1: "1 item was removed because its quote was not found in the transcript.") | FN-02 |
| Replaced-values notice | `.notice` | Shown when `replacedCount` is above zero: "N owner or deadline values were replaced with Not stated because they were not found in the transcript." (singular for 1: "1 owner or deadline value was replaced with Not stated because it was not found in the transcript.") | FN-02 |
| Group headings | Plain headings | "Discussion points", "Decisions", "Action items". A group with no items shows "None found." | FN-01 |
| Result item | `.item` with `data-decision` of `accepted`, `edited` or `rejected` | One MoM item. Not reviewed items have no `data-decision`. Rejected items are dimmed and labelled "Rejected" | FN-03 |
| Source badge | `.badge .badge-ai` or `.badge-rule` | Each item shows "AI". Each gap flag shows "Rule" (set by the rule that the field is `Not stated`) | FN-01, FN-02 |
| Review status badge | `.badge` with text | "Not reviewed", "Accepted", "Edited" or "Rejected". Text always present, never color alone | FN-03 |
| Item text | Plain text, selectable | The one-sentence item. In edit mode it becomes a `textarea` with "Save edit" and "Cancel" | FN-03 |
| Evidence quote | `.quote` | The transcript quote under every item. Never changes after an edit | FN-01, FN-02 |
| Gap flag (owner, deadline) | `.notice .notice-warn` inside the item | Shown on an action when owner or deadline is `Not stated`: "Owner: Not stated" or "Deadline: Not stated", with the suggested question, a `.field` "Answer from attendees" and a "Save answer" `.btn`. After saving, shows the value with the badge "Entered by BA" | FN-03 |
| Decision buttons | `.decision` wrapping three `.btn` | "Accept", "Edit", "Reject" on every item. The chosen one is marked and the others stay available | FN-03 |
| Unreviewed notice | `.notice` | Above the download button when any item is Not reviewed: "N items are not reviewed. They will be marked Not reviewed in the file." | FN-04 |
| "Download Word MoM" | `.btn .btn-primary` | Builds and saves the .docx in the browser, using the library file served by the tool itself, so it works offline and in Demo mode. Disabled when there is no draft | FN-04 |
| "Save minutes" | `.btn` beside the download button | Saves the items and decisions as they stand to the database (FN-09). Disabled when there is no draft with an item, and disabled in Demo mode with the hint "Saving is not available in Demo mode." Disabled while the save runs. Items that are Not reviewed or Rejected do not block it. Uses the access code field on this screen | FN-09 |
| Save status line | `p.item-meta` with `role="status"` | "Saving the minutes." while saving. Then "Saved at <time>. Open Saved minutes to see it. Saving again keeps a new copy." Cleared when a new draft appears. A failed save shows the error notice instead (see Error) | FN-09 |
| Audit line | Plain small text | Under the download button: "Prompt version v1, model <name>, drafted <time>". In Demo mode: "Sample data, no AI" | FN-04, FN-05 |
| Error notice | `.notice .notice-error` | Plain-language message, with a "Use Demo mode" button. For a failed save the same notice shows the save message and the "Use Demo mode" button is hidden | FN-01, FN-02, FN-04, FN-05, FN-09 |
| Empty state | `.empty` | Shown in the right column before a draft exists | FN-01 |
| Loading state | `.loading` | Shown while the draft is being made | FN-01 |

| State | What the user sees |
|---|---|
| Empty | Header without a mode label. Left column: the fictional data notice, the empty title, access code and transcript fields, "Draft MoM" and "Use Demo mode". Right column: `.empty` reading "No draft yet. Paste a transcript on the left and choose Draft MoM, or choose Use Demo mode to see a sample." "Download Word MoM" is disabled |
| Loading | "Draft MoM" is disabled. Right column: `.loading` reading "Reading the transcript and drafting the MoM." The transcript box keeps its text |
| Success | Right column shows the session warning, the summary bar (every item starts as Not reviewed), the removed-items notice and the replaced-values notice if any, and the items grouped as Discussion points, Decisions and Action items. Every item has the AI badge, its text, its quote and Accept, Edit and Reject. Actions with gaps show the flags with the suggested question. "Download Word MoM" is enabled, and in live mode "Save minutes" is enabled too |
| Error | `.notice-error` above the right column, with exact text from FN-01: "Paste a transcript before you draft the MoM." / "This transcript is longer than the 20,000-character limit. Shorten it, for example by removing small talk, then try again." / "The access code is missing or not correct. Enter the code you were given, or use Demo mode." / "The draft could not be created, and nothing was changed. Try again, or use Demo mode to see a sample." / "The AI returned a result in the wrong format, so it was not shown. Try again, or use Demo mode to see a sample." The transcript stays in the box. The empty and too-long messages appear at once, from the browser, with no request sent, and take priority over the access code message. A "Use Demo mode" button is next to the message. A file error (including the Word library file failing to load) shows "The Word file could not be created. Your decisions are still on screen. Try again, or select the text on the screen and copy it into a document." The draft and decisions stay unchanged |
| No items matched | Right column reads "No item could be matched to the transcript. Check the transcript text and try again, or use Demo mode." with the removed-items notice. "Download Word MoM" is disabled |
| Demo mode | The label "Demo mode: sample data, no AI" shows in the header. The sample transcript is in the box, the access code field is hidden, and "Use Demo mode" is replaced by "Exit Demo mode". After "Draft MoM" the sample draft appears with no server call, after the browser has run the same quote check and name and date check as in live mode on the saved items. The removed and replaced counts and notices come from that check, not from the sample file. With `?sample=stress` the transcript box starts with the line "[STRESS-TEST SAMPLE. Fictional data only. Used to show the quote check removing one item. Not the main demo.]", and the draft shows 4 items with the notice "1 item was removed because its quote was not found in the transcript." Everything else (quotes, flags, decisions, download) works as in Success, with no server and no internet connection needed. The audit line reads "Sample data, no AI". "Save minutes" is disabled, so Demo mode makes no database call. If the samples fail to load: "The sample data could not be loaded. Reload the page and try again." |
| Saving | "Save minutes" is disabled and the status line reads "Saving the minutes." The draft and decisions stay on screen. After success the status line shows the saved time. After failure the error notice shows the save message with a reason in brackets, and the status line is cleared |

#### SCR-02 Saved minutes

- **Purpose:** The BA lists the minutes saved earlier and opens one to read it, with the decision on each item and the audit values. It is read only: there is no edit, delete or overwrite. To change minutes, the BA goes back to SCR-01, drafts and reviews again, and saves a new copy. Traces to CF-03 and N-05, through FN-09.
- **Layout:**
  - `.app-header`: the name "MoM Drafter", the tagline "Saved minutes. Read only: to change minutes, draft and review them again.", and a "Back to drafting" link to SCR-01.
  - `.page-split`: two columns on wide screens, one column on narrow screens.
  - Left column, a `.panel` titled "Saved minutes": the access code `.field`, the "Show saved minutes" button and the list.
  - Right column, a `.panel` titled "Minutes": the opened record.
  - An error `.notice` above the columns.

| Element | Component | Behavior | Function |
|---|---|---|---|
| "Back to drafting" | `a.btn` in the header | Returns to SCR-01. A record being read is not affected, since nothing on this screen changes data | FN-09 |
| Access code | `.field` with `input` (password type) | Required. Sent as the `x-access-code` header, kept in the page only, never saved. It is a separate field from SCR-01, so the BA types the code again | FN-09 |
| "Show saved minutes" | `.btn .btn-primary` | Requests the list. Disabled while loading | FN-09 |
| Saved list | `.item` per record | Newest first, up to 50 [A-22]. Each entry shows the title ("Meeting minutes" if none), "Saved <date and time>", and "N items: A accepted, E edited, R rejected, U not reviewed", with an "Open" button. If there are none: "No minutes have been saved yet." | FN-09 |
| "Open" | `.btn` on each list entry | Requests that one record and shows it in the right column | FN-09 |
| Record heading and audit line | `h2` and `.item-meta` | The title, then "Saved <time>. Prompt version <v>, model <name>, drafted <time>." | FN-09 |
| At-drafting line | `.notice` | Shown only when the removed count or the replaced count is above zero: "At drafting: N removed by the quote check, M replaced by the name and date check." Not shown when both are zero | FN-09, FN-02 |
| Item groups | Headings "Discussion points", "Decisions", "Action items" | Each group shows its items. A group with none reads "None." | FN-09 |
| Saved item | `.item` with `data-decision` where a decision exists | Decision badge (Accepted, Edited, Rejected or Not reviewed), the text (the edited text if edited), and the quote. Rejected items are included, with the badge "Rejected". For an action: "Owner: <value> (entered by BA). Deadline: <value>." with "(entered by BA)" only where the BA entered the value | FN-09 |
| Error notice | `.notice .notice-error` | The message from FN-09 (401, 502, 404), with a short reason in brackets on 502. No Demo mode button | FN-09 |
| Empty and loading states | `.empty`, `.loading` | Before loading: "Enter the access code and choose Show saved minutes." and "Choose a saved record on the left to read it." While loading: "Loading saved minutes." and "Opening the saved minutes." | FN-09 |

| State | What the user sees |
|---|---|
| Empty | The access code field, "Show saved minutes", and the empty-state texts in both columns |
| Loading | "Show saved minutes" disabled, with "Loading saved minutes." in the left column |
| List | The saved records, newest first, each with counts and an "Open" button |
| No records | "No minutes have been saved yet." |
| Record open | The record in the right column, read only, as in the table above |
| Error | The error notice. The list or record area is cleared. A wrong code shows "The access code is missing or not correct. Enter the code you were given, or use Demo mode." The "use Demo mode" words are part of the shared message, and SCR-02 has no Demo mode |

**What SCR-02 does not show:** the time of each decision, the suggested question of an item, the open gaps count, and the model in the list. They are stored or returned (A3.3) but not displayed. It has no search, no paging beyond the newest 50, no sort control, no delete and no edit. The page text is added as plain text, never as HTML.

**Item states**

| Item state | What the user sees on the item |
|---|---|
| Not reviewed | Badge "Not reviewed", no `data-decision`, buttons Accept, Edit, Reject |
| Accepted | `data-decision="accepted"`, badge "Accepted" |
| Editing | The text is a `textarea` with "Save edit" and "Cancel". The quote stays visible. An empty save shows "Item text can't be empty. Enter text, or choose Reject." |
| Edited | `data-decision="edited"`, badge "Edited", the new text, the original quote |
| Rejected | `data-decision="rejected"`, dimmed, badge "Rejected". The buttons stay so the BA can change the decision |

**Writing on screen:** Buttons say what happens ("Draft MoM", "Download Word MoM"). No exclamation marks. The screen never says the draft is accurate; the closest wording is the tagline, "You check and decide every item."

**Accessibility:** Keep the visible focus styles. Badges always carry text. Item text and quotes stay selectable so the BA can copy them. The look and click-through were checked by a headless-browser smoke test on a local copy and by hand on the live site for the live path only. A phone or narrow-window layout, and a browser other than the headless one, were not checked (L-11).

**Traceability check:** Every Must function appears on SCR-01 (FN-01 to FN-05), the Should function FN-09 appears on SCR-01 and SCR-02, and every element in the tables names a function.

**SCR-02 checks:** SCR-02 was not part of the headless-browser smoke test or the hand check described above. No person has opened a saved record on the page, and no one checked it on a phone or narrow window (L-15).

Changed after G4: SCR-01 is built as specified, with no change. The accessibility note now says what was checked and what was not. The "Audit line" under the download button is the prompt version, model and time, as specified; the removed and replaced counts are in the summary bar on screen, not in the Word file (L-10), but the Saved minutes page shows them for a saved record (FN-09).

Changed after G5: SCR-02 (Saved minutes) was added, so the tool has 2 screens, within the limit of 3. SCR-01 gained the "Saved minutes" link, the "Save minutes" button and the save status line. Decided by Viet on 2026-11-03. This is not in the spec frozen at G4.
