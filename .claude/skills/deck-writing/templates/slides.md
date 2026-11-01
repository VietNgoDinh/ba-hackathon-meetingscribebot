# Deck brief

Build a 16:9 presentation from this file for BA managers.

- **Style:** clean and professional, with plenty of white space, large readable text and one accent color. One message per slide.
- **Headline:** use each slide's Headline as its title.
- **Diagrams:** redraw Mermaid code as clean diagrams. S03 and S05 must share one layout so that the differences stand out.
- **Numbers:** keep each number's visible "measured" or "assumption" label. Drop the bracket tags from the slide itself.
- **Hidden lines:** don't show the Source or Link lines on the slides. They're for the team.
- **Content:** use only what's in this file. Don't add facts, numbers, logos or quotes.
- **Order:** keep the slide order. Backup slides go at the end, after a divider titled "Backup".

---

## S01 Tool summary

**Headline:** {{one sentence: who it helps and what changes}}

**Content:**
{{tool name and one-line promise}}

**Visual:** {{tool name large, with the promise beneath it}}

**Source:** 1.1, 1.2

**Link:** "Here's the problem behind it."

---

## S02 Problem

**Headline:** {{the pain, stated as a finding}}

**Content:**
{{one persona, the top pain points, and the problem statement}}

**Visual:** {{persona, with the fictional requirement that the deck follows once section 7.1 exists}}

**Source:** 2.2, 2.4, 2.5

**Link:** "Here's where it happens today."

---

## S03 As-is workflow

**Headline:** {{where the work goes wrong}}

**Content:**
{{one short note per marked pain point}}

**Visual:**

```mermaid
{{diagram copied from section 3.3}}
```

**Source:** 3.2, 3.3

**Link:** "What if those steps worked differently?"

---

## S04 Solution

**Headline:** {{what the tool does for a BA}}

**Content:**
{{solution statement, three core features, and one line on why this option}}

**Visual:** {{three feature blocks}}

**Source:** 5.1, 5.3, 5.5

**Link:** "Here's how the work changes."

---

## S05 To-be workflow

**Headline:** {{how the work changes and what stays human}}

**Content:**
{{changed steps and human reviews}}

**Visual:**

```mermaid
{{diagram copied from section 6.3}}
```

**Source:** 6.1, 6.3

**Link:** "Let's run it."

---

## S06 Live demo

**Headline:** {{one-line scenario}}

**Content:**
Watch for:
1. {{what to watch for}}
2. {{what to watch for}}
3. {{what to watch for}}

**Visual:** {{none, this slide stays simple}}

**Source:** 7.1, 7.2

**Link:** "What did that change for a BA?"

---

## S07 Value for BA work

**Headline:** {{the change for a BA, without unsupported figures}}

**Content:**
{{impact on users and a before-and-after comparison, each number labelled}}

**Visual:** {{before-and-after comparison}}

**Source:** 8.1, 8.3

**Link:** "Why should you trust the output?"

---

## S08 AI under control

**Headline:** {{how people stay in charge}}

**Content:**
{{what rules check, what AI does, what validation removes, what people decide, and how data stays safe}}

**Visual:**

```mermaid
{{diagram copied from section 9.2}}
```

**Source:** 9.1, 9.2, 9.3, 9.4

**Link:** "Where does it still fall short?"

---

## S09 Limitations and risks

**Headline:** {{an honest statement of the limits}}

**Content:**
{{top three limitations or risks, each with its mitigation}}

**Visual:** {{three rows: limit or risk, and mitigation}}

**Source:** 10.3

**Link:** "What would a wider rollout need?"

---

## S10 Roadmap

**Headline:** {{what it takes to reach the whole department}}

**Content:**
{{stages, owners and key dependencies}}

**Visual:** {{stages from left to right}}

**Source:** 11.1, 11.2

**Link:** "Here's what we're asking for."

---

## S11 Close

**Headline:** {{the request, stated clearly}}

**Content:**
{{one lesson and one clear request}}

**Visual:** {{the request, large}}

**Source:** 12.1, 12.2

---

## B01 Judges' questions

**Headline:** {{the hardest questions, answered}}

**Content:**
{{top questions and short answers}}

**Source:** 13.3, 13.5

---

## B02 Tech stack

**Headline:** {{why this stack suits the tool}}

**Content:**
{{each part and why it was chosen}}

**Visual:**

```mermaid
{{diagram copied from section 9.2}}
```

**Source:** 9.2

---

## B03 How we built it

**Headline:** {{how the team controlled the work}}

**Content:**
{{process, folder structure and the review log}}

**Source:** 14.1, 14.2, 14.3

---

## B04 AI checklist

**Headline:** {{where the tool stands on responsible AI}}

**Content:**
{{status by area, including anything Partial or No}}

**Source:** 15

---

## B05 Options compared

**Headline:** {{why the team chose this option}}

**Content:**
{{evaluation table}}

**Source:** 4.2

---

## B06 Assumptions

**Headline:** {{which assumptions the proposal rests on}}

**Content:**
{{key assumptions and sources}}

**Source:** assumptions.md

---

## B07 Appendix

**Headline:** {{what the tool is made of}}

**Content:**
{{actors, functions and screens}}

**Source:** A1, A3, A4
