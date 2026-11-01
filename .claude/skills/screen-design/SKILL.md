---
name: screen-design
description: Design system for our-tool screens, covering layout, components, states and on-screen wording. Use when specifying or building any screen.
user-invocable: false
---

# Screen design

The tool should look calm, trustworthy and made for work. All styling lives in `our-tool/public/css/styles.css`. Use its classes, and add a class only when no component fits.

## Layout

- `.app-header` holds the tool name, a short tagline and any mode label.
- `.page` holds the content. `.page-split` gives two columns on wide screens, with input left and results right, and one column on narrow screens.
- `.panel` is the standard content card.

## Components

| Component | Class | Use |
|---|---|---|
| Primary button | `.btn .btn-primary` | The one main action on a screen |
| Secondary button | `.btn` | Other actions |
| Field | `.field` wrapping `label` and `input`, `select` or `textarea` | Any input, and always with a visible label |
| Notice | `.notice`, plus `.notice-warn` or `.notice-error` | Fictional data reminder, errors, dropped findings |
| Mode label | `.mode-label` | Shows "Demo mode: sample data, no AI" |
| Result item | `.item`, with `data-decision` of `accepted`, `edited` or `rejected` | One finding or generated result |
| Quote | `.quote` | The source text that a result refers to |
| Severity badge | `.badge .badge-high`, `.badge-medium` or `.badge-low` | How serious a finding is |
| Source badge | `.badge .badge-ai` or `.badge-rule` | Where a result came from |
| Decision buttons | `.decision` wrapping three `.btn` | Accept, Edit, Reject |
| Summary bar | `.summary` wrapping `.summary-item` | Counts and progress |
| Empty state | `.empty` | What to do when there's nothing to show yet |
| Loading state | `.loading` | Work in progress |

## Required on screen

- The input screen shows a `.notice` reminding users to use fictional data only.
- Every result shows a source badge and, for AI results, its quote.
- Every result has Accept, Edit and Reject.
- Demo mode always shows the mode label.
- If validation dropped any findings, a `.notice` says how many.

## Writing on screen

- Use the words a BA would use, such as "requirement" and "finding".
- Button labels say what happens, such as "Analyze requirements".
- Errors say what happened and what to do next. Offer Demo mode when the live path fails.
- Don't use exclamation marks, and don't claim accuracy the tool can't prove.

## Accessibility and quality

- Keep the visible focus styles.
- Don't rely on color alone. Badges always include text.
- Keep the text selectable, so a BA can copy findings.
- Check the screen at presentation zoom before G5.
