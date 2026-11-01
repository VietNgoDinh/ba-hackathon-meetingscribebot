---
name: ba-build
description: Build the tool from the approved spec in slices, deploying as it grows, and stop at review G5 Tool freeze.
argument-hint: "[foundation]"
disable-model-invocation: true
---

Goal: reach review G5 Tool freeze with a working tool on the deployed URL. Lead: B. Decider: C, who has to demo it.

This runs in the main conversation, because building is a back-and-forth with B. Explain what you're doing in plain language, and ask B to look at the result after each slice.

Read `.claude/rules/our-tool.md` first, then use the `screen-design` skill for every screen.

## If the argument is `foundation`

Requires G3 Approved. This work doesn't depend on the spec, so B can start while A finishes it.

1. Read `deliverables/proposal/09-how-it-works.md`.
2. Add the AI package to `our-tool/`, and create `lib/llm.js` and `api/analyze.js` with the access code check and input limit.
3. Prove the AI connection with one small fictional request, using the settings already in `.env.local` or on Vercel.
4. Add tests, then run `/ba-deploy`, or ask B to.
5. Report what works, and stop. The screens wait for G4.

## Full build

Requires G4 Approved in `STATUS.md`. If it isn't, say so and stop.

Read these files in `deliverables/proposal/`: `A3-functions.md`, `A4-screens.md`, `07-demo-plan.md` and `09-how-it-works.md`. Then read the samples in `our-tool/public/samples/`.

Show B a short plan of the slices below, using the real Function IDs, and start once B agrees.

1. **Demo path:** load the sample, show the expected result, then Accept / Edit / Reject and export. This needs no AI, and it's the team's fallback, so it comes first.
2. **Live path:** connect rules, the prompt, the schema, validation and the quote check to the screen.
3. **Remaining Must functions.**
4. **Should functions,** only if time remains and B agrees.

After each slice:

- Run `npm test` in `our-tool/`.
- Check that the slice works on screen.
- Ask B to run `/ba-deploy`, so a working version is always live.

When the clock reaches a scope cut in `RUNBOOK.md`, tell B and recommend the cut.

## Freeze

1. Check every item in the control baseline in `.claude/rules/our-tool.md`, and run the demo plan on the deployed URL.
2. Write `deliverables/as-built.md` from `.claude/skills/ba-build/templates/as-built.md`. Record every function as Built, Partial or Cut, honestly.
3. Add timing results from the "Measuring value" section of `RUNBOOK.md` to the Sources table in `deliverables/assumptions.md`, if B has them.
4. Stop at G5. Show the review card from `CLAUDE.md`. Ask C to try the demo path and the live path on the deployed URL before approving.

After G5, only blockers get fixed.
