## 1. Summary

### 1.1 The tool

- **Name:** MoM Drafter
- **One-line promise:** For Business Analysts, MoM Drafter turns a raw meeting transcript into a structured Minutes of Meeting draft where every item is backed by a transcript quote, so that the BA reviews and decides instead of reading and writing everything by hand.

### 1.2 Why it matters

BA teams need accurate MoMs, but today each transcript is read and written up by hand, which costs time and risks missed decisions, actions and owners (section 2.5). The tool targets that effort and keeps the BA in control, and the gain in time and accuracy is to be measured in rehearsal (section 8).

### 1.3 What we're proposing

The team built and deployed a web tool with three core features: a MoM draft, evidence quotes with gap flags, and review with Word download. At the G5 freeze it was Level 1 (no sign-in, no database) and matched the frozen spec. It uses `claude-haiku-5-5` with prompt v1, and has been tried only on a few short fictional transcripts. After G5, Viet decided to add one Should function: in live mode the BA can save the reviewed minutes and open them again on a read-only page (FN-09). That makes the tool Level 1 plus storage (a database, no sign-in), with everyone who has the access code sharing one workspace. The transcript is not saved. The saving feature works on its branch preview and is not on production until the branch is merged. Wider use would need approval of the AI provider and hosting for real data, testing on real transcripts, and decisions on per-user sign-in, retention and delete for saved minutes.

Changed after G4: "is building" became "built and deployed", with the model, prompt version and the size of testing so far. The proposal itself is unchanged.

Changed after G5: added FN-09 (saved minutes), the second screen, and the Level 1 plus storage wording. The frozen G4 spec did not include it, and no review has approved it.
