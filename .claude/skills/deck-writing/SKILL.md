---
name: deck-writing
description: Story structure, slide map and templates for writing the slide content and speaker notes from approved proposal sections.
user-invocable: false
---

# Deck writing

Write the content the team pastes into the Claude app to create slides. Tell one story: a BA has a real problem, the tool changes the work, the team proves it live, and AI stays under human control.

## Outputs

| Output | Template |
|---|---|
| `deliverables/presentation/slides.md` | `.claude/skills/deck-writing/templates/slides.md` |
| `deliverables/presentation/speaker-notes.md` | `.claude/skills/deck-writing/templates/speaker-notes.md` |

Write both in the same pass, so slides and notes always match. If the files exist, update them and keep any wording the team changed unless it conflicts with the proposal.

## What you may use

Check `STATUS.md`. Write a slide only when its sources come from a review that's Approved. The exception is sections 10 to 15, which you may use once drafted, and which G6 reviews with the deck.

Leave any other slide in place with this line: `Pending: waiting for G<n>`.

Never add a fact, number or claim that isn't in the proposal. If a slide needs something missing, say so under "Needs attention" in your handoff report.

## Slide map

| Slide | Title | Job | Sources |
|---|---|---|---|
| S01 | Tool summary | Who it helps, what it does, why it matters | 1.1, 1.2 |
| S02 | Problem | One BA persona, the pain, the problem statement | 2.2, 2.4, 2.5 |
| S03 | As-is workflow | Pain points marked on the steps | 3.2, 3.3 |
| S04 | Solution | One statement, three features, why this option | 5.1, 5.3, 5.5 |
| S05 | To-be workflow | Changed steps and human reviews highlighted | 6.1, 6.3 |
| S06 | Live demo | One-line scenario, what to watch for | 7.1, 7.2 |
| S07 | Value for BA work | Before and after, numbers measured or labelled | 8.1, 8.3 |
| S08 | AI under control | One diagram: stack, rules, AI, validation, human decision, data safety | 9.1, 9.2, 9.3, 9.4 |
| S09 | Limitations and risks | Top three, with mitigations | 10.3 |
| S10 | Roadmap | Steps, owners and dependencies for the department | 11.1, 11.2 |
| S11 | Close | One lesson and one clear request | 12.1, 12.2 |
| B01 | Judges' questions | Hardest questions and short answers | 13.3, 13.5 |
| B02 | Tech stack | Diagram and why each part was chosen | 9.2 |
| B03 | How we built it | Process, folder structure, review log | 14.1, 14.2, 14.3 |
| B04 | AI checklist | Status by area | 15 |
| B05 | Options compared | The evaluation table | 4.2 |
| B06 | Assumptions | Register of assumptions and sources | assumptions.md |
| B07 | Appendix | Actors, functions and screens | A1, A3, A4 |

Don't reorder or remove slides. The order is designed so each slide answers the question the previous one raises.

## Writing rules

- **Headlines state the point.** "BAs lose review time to vague requirements", not "Pain points". Each slide has one message.
- **Keep BA language.** Explain any technical word or remove it.
- **Follow one thread.** Once section 7.1 is approved, carry its fictional requirement through S02, S03, S06 and S07, and add 7.1 to those Source lines.
- **Reuse diagrams.** Copy Mermaid from the proposal, so S03 and S05 share one layout.
- **Keep labels.** Every number keeps its `[SRC-xx]` or `[A-xx]` tag, and the visible text says "measured" or "assumption".
- **Keep S06 simple.** It introduces a live demo, so it needs almost no content.

## Speaker notes

Write notes for S01 to S11 so that someone can present from them unprepared. Notes sound spoken, and they end on the slide's link line. The presentation slot isn't known in advance, so if `questions.md` or `assumptions.md` has no slot length, leave timing as a share of the slot. Give the demo at least one third of the slot.

Assign presenters by role. C presents by default, and B drives the demo.

## Quality bar

- Reading only the headlines tells the whole story.
- Every slide has a Source line that cites real sections.
- A BA manager could repeat the value and the control story after one viewing.
