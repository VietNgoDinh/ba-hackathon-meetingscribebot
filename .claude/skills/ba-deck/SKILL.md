---
name: ba-deck
description: Write or update the slide content and speaker notes from whatever proposal sections are ready. Run it after each review.
disable-model-invocation: true
---

Goal: keep `deliverables/presentation/slides.md` and `speaker-notes.md` current. Lead: C. G6 reviews them.

1. **Delegate.** Run the `deck-writer` subagent. It fills every slide whose sources are ready, and marks the rest Pending.
2. **Report.** Reply with which slides are complete, and which are Pending and what they're waiting for. Don't show a review card, because the deck is reviewed at G6.

Remind C to make content changes in `slides.md` first, then copy them to the Claude app.
