# Speaker notes

- **Slot length:** Not confirmed. Timing below is a share of the slot, and the demo gets at least one third.
- **Presenter:** Ngan (C)
- **Demo driver:** Phong (B)
- **Q&A lead:** Viet (A), proposed. The team confirms.

Six honesty rules for every slide.
1. The tool was built and deployed to the frozen spec at Level 1 (model claude-haiku-5-5, prompt v1). After the freeze, saving reviewed minutes (FN-09) was added, so it is now Level 1 plus storage: a database, no sign-in. It has been tried only on a few short fictional transcripts. Do not say it is proven or ready. Never say "the tool stores nothing" or "there is no database".
2. Say which mode is on screen during the demo. Demo mode shows the saved sample as written, and the saved samples were prepared by hand.
3. A live run may differ from the saved sample. In one live check, the lookup-service deadline read "ideally before the design review" where the saved sample reads "before the design review". The same two gaps were flagged. Do not promise the saved result in a live run.
4. Do not claim offline use, network-log checks, failure with the AI switched off, other browsers or a narrow-window layout. They were not confirmed on the live site. Do not point to removed or replaced counts in the Word file: they are on screen only. There is no timing measurement, so give no figure for time saved.
5. Be exact about saving. Only reviewed minutes are saved, and only when the BA chooses Save minutes. The raw transcript is never saved, but each item's quote is a short extract of the transcript, so extracts are stored, and so are rejected and not reviewed items. Saving works in live mode only, and Demo mode cannot save. There is no per-user sign-in, so everyone with the access code shares one workspace and can read every saved record. The tool cannot edit or delete a record.
6. Do not claim what nobody has confirmed. Saving was confirmed by a person on the branch's Vercel preview only. Opening a saved record, the Saved minutes list page and production after the merge are not confirmed. Saving is not on production until the branch is merged. The five Must functions are unchanged, and FN-09 is a Should function that no review has approved.

## S01 Tool summary

- **Presenter:** Ngan (C)
- **Time:** Short
- **Say:** "This is MoM Drafter. It's built for Business Analysts who turn meeting transcripts into minutes. You paste a raw transcript and get a structured draft, where every item is backed by a quote from that transcript. So the BA reviews and decides, instead of reading and writing everything by hand. Why does that matter? BA teams need accurate minutes, and today that effort costs time and risks missed decisions, actions and owners. The tool is built, and we've tried it only on a few short fictional transcripts. We built it to a frozen spec. After that freeze we added one thing: in live mode the BA can choose to save the reviewed minutes, never the transcript, and read them again on a read-only page. That makes it Level 1 plus storage, a database with no sign-in. Saving works on a preview of that branch, and it isn't on the production site until the branch is merged. We haven't measured the time saving yet, and we won't claim one."
- **Transition:** "To see why we built it, let's look at the problem behind it."

## S02 Problem

- **Presenter:** Ngan (C)
- **Time:** Short
- **Say:** "Meet Elena Marsh. She's a fictional Business Analyst at a fictional company, Tallowfield Mutual. She's just run a meeting called the Address change requirements review, about letting customers change their home address in the customer portal. She has the raw transcript, attendees expect minutes they can act on, and she's accountable for them. Three problems hurt most. Decisions, actions or discussion points get missed. Reading the whole transcript by hand takes a lot of time. And owners and deadlines are often unclear, so she has to chase them. The first two come straight from the judges' brief. The third is our assumption about how BAs work, and we label it that way. Put together: BAs need accurate, structured minutes, but today they read and write everything by hand, which costs time and misses things."
- **Transition:** "Let's see exactly where this happens in Elena's day."

## S03 As-is workflow

- **Presenter:** Ngan (C)
- **Time:** Short
- **Say:** "Here's Elena's process today. The red steps are where it goes wrong. She reads the transcript start to end, and that's the time sink. She picks out decisions and actions by hand, and that's where items get missed. She works out the owner and deadline of each action, and that's where she has to chase people. She writes the minutes by hand, so the layout and wording vary. And when attendees report corrections, she goes back and rewrites. Red steps are the pain points. Everything else works fine, so we leave it alone."
- **Transition:** "So what if those red steps worked differently?"

## S04 Solution

- **Presenter:** Ngan (C)
- **Time:** Medium
- **Say:** "Here's our answer. MoM Drafter drafts a structured set of minutes in which every item is backed by a quote from the transcript. It marks missing owners and deadlines as 'Not stated', and it leaves every decision to the BA. It has three core features. One, a structured draft from a pasted transcript, in one consistent layout. Two, evidence quotes and gap flags, so the BA can check any item in seconds and sees what's missing. Three, review, edit and download, where the BA accepts, edits or rejects each item and downloads a Word file that records those decisions. In live mode, the BA can also save the reviewed minutes and read them again on a read-only page. We compared three options. This one scored highest. Those scores are our own judgement, not measurements, and we did not redo them for the saving change. It's the only option that produces the complete minutes the judges asked for. Now the honest part about status. The five must-have functions are built to the spec we froze, with no changes to them, and we cut three optional ones to protect the build window. After the freeze, Viet decided to add saving as one extra should-have function, with a second screen. So it's still five must-haves, three core features, and now two screens. No review has approved that change. It works on a preview and isn't on production until the branch is merged."
- **Transition:** "Now let's see how Elena's work changes."

## S05 To-be workflow

- **Presenter:** Ngan (C)
- **Time:** Short
- **Say:** "Same layout as before, so the differences stand out. Blue steps are changed or new. Elena pastes the transcript instead of reading it line by line, and at the end she downloads one Word file. Purple is the AI step: the tool drafts the items, each with a quote. Amber steps are human decisions, and there are several. Elena resolves the 'Not stated' gaps with the attendees. She checks each item against its quote and accepts, edits or rejects it. The old 'check against the transcript' step now happens inside that review. In live mode she can also choose to save the reviewed minutes. That choice isn't drawn on this diagram. Saving is never automatic, nothing is stored if she doesn't choose it, and the Word download works either way. If attendees report corrections, she decides what changes. And she decides what is sent. The tool sends nothing."
- **Transition:** "Enough slides. Let's run it."

## S06 Live demo

- **Presenter:** Ngan (C) introduces. Phong (B) drives the demo.
- **Time:** At least one third of the slot
- **Say:** "Elena Marsh has the Address change requirements review transcript. We'll turn it into a checked Word document. Three things to watch for. First, every item has a quote from the transcript, and in our saved sample two actions show 'Not stated' with a suggested question. Second, any name or date on screen has to appear in the transcript, otherwise the tool shows 'Not stated'. Third, Elena decides on every item, and the Word file records those decisions. Phong, over to you."
- **Driver (Phong):**
  - Say whether you are in live mode or Demo mode. In Demo mode, say "sample data, no AI", and say the saved samples were prepared by hand.
  - Demo mode shows the saved sample exactly as written. A live run may differ. In one check, the lookup-service deadline read "ideally before the design review" where the saved sample reads "before the design review". If you run live, the same two gaps were flagged, but the wording may differ. Say so, and do not promise the saved result. The wording is in the transcript, so the name and date check allows it.
  - Follow the demo story in section 7: show the draft with quotes and the gaps, reject the text-message item because nobody committed to it, edit one action, type the owner Elena got from the attendees into a 'Not stated' field, then download the Word file and show that it records the decisions.
  - Point to the removed and replaced counts on screen only. The Word audit trail shows prompt version, model, times, mode and each decision, but not those counts.
  - Do not claim offline use, network-log checks or failure with the AI off. If the AI or network fails, choose 'Use Demo mode' and say so. Keep one rehearsal Word file as a last resort, and call it a rehearsal file.
  - The stress-test sample (open the page with `?sample=stress`, then choose 'Use Demo mode') is optional and only if time allows. It shows 4 items and the notice that 1 item was removed because its quote was not found. Say it is hand-prepared and that the fifth quote was planted on purpose.
  - **If you demo saving:** saving is not part of the section 7 demo story, so it is an optional extra. It must be in live mode, with the access code typed in. Demo mode cannot save: the 'Save minutes' button is disabled there, with the hint "Saving is not available in Demo mode." Do not try to save from Demo mode and do not suggest the button is broken. If you are in Demo mode, say it is disabled by design.
  - Use the address that has the feature. Saving works on the branch's Vercel preview. Production does not have it until the branch is merged, and nobody has confirmed production after the merge. Before the slot, the tool lead checks that the address you use can save (the health check reports whether storage settings exist).
  - The confirmed part is the save itself: the line "Saved at <time>. Open Saved minutes to see it. Saving again keeps a new copy." appears. Opening a saved record and the Saved minutes list page are not confirmed by anyone. Only show them if the tool lead has checked them on the address you use before the slot, and still do not claim they are verified. If they fail, say plainly that this part is not yet confirmed.
  - Say what saving does while you do it: only the reviewed items and decisions are stored, never the transcript. Each item's quote is stored, and rejected items too. Everyone with the access code can read every saved record, and the tool cannot edit or delete one. Fictional data only.
  - Saving again keeps a new copy, so do not save twice on stage unless you want two records in the list. A wrong access code on a save shows the shared message that ends "or use Demo mode", but Demo mode cannot save.
  - The on-screen draft warning still says only "Download the Word file before you close or reload". It does not mention saving. Do not read it as a statement that saving is unavailable.
- **Transition:** "So what did that change for a BA?"

## S07 Value for BA work

- **Presenter:** Ngan (C)
- **Time:** Short
- **Status:** Pending: waiting for a rehearsal timing. Nothing is measured yet, and the register of sources is empty. Do not state any figure.
- **Say:** "What changes for Elena? She spends her effort reviewing a draft, not reading line by line and writing from a blank page. Every item points back to the transcript, gaps are listed up front, and corrections happen in the tool instead of a rewrite. She's still accountable for what goes out. In live mode she can also save the reviewed minutes and read them again, but that page is read only. It keeps a record. It doesn't make corrections cheaper, and we have no measurement that a saved record helps a BA. Now the honest part. Look at the table. Time to a ready MoM, items found, owners and deadlines: all 'to be measured'. We recorded no timing during the build, so we make no claim about hours saved. What we can say from the design is that every item carries a quote and the layout is always the same. We'll time one person on one sample, by hand and with the tool, and a pilot would measure more people."
- **Transition:** "A fast draft is only useful if you can trust it, so how do we keep the AI under control?"

## S08 AI under control

- **Presenter:** Ngan (C)
- **Time:** Medium
- **Say:** "Follow the diagram left to right. Rules come first: empty or oversized text and a wrong access code are rejected before any AI is involved. Then the AI drafts items with quotes, and it's told not to guess owners or deadlines. Then validation: a result in the wrong format is not shown, an item whose quote isn't in the transcript is removed, and any owner or deadline that isn't in the transcript becomes 'Not stated'. The counts show on screen. Then the person: the BA accepts, edits or rejects each item, and the tool sends nothing. The Word file records each decision with the prompt version, model and time. It does not show how many items the checks removed or replaced. Those counts are on screen, and the Saved minutes page is built to show them for a saved record. We list the missing counts in the Word file as a limit. Now the branch at the bottom of the diagram. Saving is optional, live mode only, and it is the BA's choice, never automatic. Demo mode cannot save. There's no AI on that path. The server checks the access code and the size and shape of the data, then stores the reviewed items and decisions. It can't re-run the quote check, because it doesn't have the transcript. On data: fictional data only. The raw transcript is never saved and no transcript text is logged. What is stored, only when the BA saves, is the reviewed items and decisions, including rejected and not reviewed items, and each item's quote, which is a short extract of the transcript. The AI key and the database key stay on the server, and an access code is required. But there is no per-user sign-in. Everyone with the access code shares one workspace and can read every saved record, and the tool can't edit or delete one. So real data waits for approval of the provider and hosting, including the database, a data classification, per-user sign-in, and a retention and delete rule. Now, what these checks don't prove. A quote proves the text exists, not that the item means it, and a missed item can't be seen. A saved record is what the browser sent, so it isn't proof that its quotes are real. So the BA review stays the main control. The tool is built with the claude-haiku-5-5 model and prompt version 1. We've tried only that model, on a few short fictional transcripts. Saving was confirmed on a preview. We haven't confirmed opening a saved record, the list page or production, and we haven't confirmed offline use, network-log checks or failure with the AI switched off, so we don't claim them."
- **Transition:** "That leads to the honest question: where does it still fall short?"

## S09 Limitations and risks

- **Presenter:** Ngan (C)
- **Time:** Medium
- **Say:** "We'll give you three limits ourselves. One: the tool cannot see what the AI left out. A quote only proves the text exists. So the BA reads each quote, decides every item and stays accountable, and the pilot counts missed items. Two: someone could paste real confidential content into an outside AI service. And if they then save the minutes, extracts of that content are stored in a list that everyone with the access code can read, with no delete in the tool and no per-user sign-in. The tool is for fictional data only for now, and saving is the BA's choice. Real use waits for approval of the provider, hosting and data classification, per-user sign-in, and a retention and delete rule. Three: our transcript limit is a working figure and we haven't measured it. We don't claim the tool handles a full-length meeting. Long meetings need shortening or several runs today, and the pilot would measure realistic lengths. More we state openly. The Word audit trail doesn't show how many items the checks removed or replaced. A saved record is taken from what the browser sends, so the server doesn't check its quotes or audit values, and a saved record could be mistaken for final minutes. That's why the page labels every decision and why the Word file is what the BA sends. The database key sits in Vercel settings, including the preview, and we haven't checked who can see them. Saving was confirmed on the preview only. Opening a saved record, the list page and production after the merge are not confirmed. And several behaviours were not confirmed on the live site: offline use, network-log checks, failure with the AI off, other browsers and a narrow-window layout."
- **Transition:** "So what would a wider rollout need?"

## S10 Roadmap

- **Presenter:** Ngan (C)
- **Time:** Short
- **Say:** "Three stages, in order. First a pilot, owned by a BA manager as sponsor. A small group of BAs tests whether reviewing a draft costs less than writing by hand, on realistic fictional material, with measurements recorded and a written rule that only approved data is pasted. We'd also ask that per-user sign-in, a retention rule and delete for saved minutes are part of the pilot's entry conditions. Second, hardening, owned by a tool owner we'd need to name, with Security. We fix what the pilot shows, such as the transcript limit, the name and date check and the Word layout. For saved minutes that means per-user sign-in so a BA sees only the records they may see, a retention rule, delete, a decision on whether a saved record may be edited, paging and search, limits set from measured sizes, a decision on whether the server should check saved content, and a security review that includes who can see the Vercel settings and the database key. Security signs off. Third, department rollout, owned by the BA department head, with a named owner, support, training and quality monitoring. Rollout depends on approved hosting, for the web host and for the separate database, an approved AI provider with data terms, and a data classification decision that covers whether minutes may be saved in a database. We give no durations or costs, because we have no basis for them. The pilot would estimate cost. Everything on this slide is still proposal. Nothing has been started."
- **Transition:** "Here's what we're asking for."

## S11 Close

- **Presenter:** Ngan (C)
- **Time:** Short
- **Say:** "One lesson from building this. Our first spec said the tool never guesses an owner or deadline. The independent review showed that only the AI prompt prevented it. So we added a rule check, then rewrote our claims to say only what the check proves. The build repeated the lesson: the live AI result differed from our hand-prepared sample, and the Word audit trail doesn't show the removed and replaced counts. And saving was one more case. When it was added after the freeze, our claim that nothing is stored had to be corrected. We list these as limits, not features. For BA work, the lesson is: state what a control proves and what it doesn't, and put the weak points in the document yourself. Our request: sponsor a small, time-boxed pilot. A BA manager sponsors it and picks a small group of BAs. IT and Security review the provider, hosting and data class in parallel. The pilot measures time to a ready MoM, items edited, rejected and missed, and how long a transcript the tool can take, so the next decision rests on measurements, not on our claims. We are not asking for approval to use real client data. The prototype was frozen at Level 1. After the freeze we added saving of reviewed minutes to a database that everyone with the access code can read, so it's now Level 1 plus storage, and the pilot would not start with real data on it. It has so far been tried only on a few short fictional transcripts, so a pilot is the next step to test it, not a claim that it's ready. We'd ask that per-user sign-in, a retention rule and delete for saved minutes are part of the pilot's entry conditions. Thank you. We're happy to take questions."
- **Transition:** None. Hand to the Q&A lead. Backup slides B01 to B07 are ready if a question needs them.
