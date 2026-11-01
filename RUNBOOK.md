# Runbook

The team's plan for the hackathon. All times here are planning assumptions until your dry runs replace them with measurements.

## Roles

Assign these before the event and enter the names in `STATUS.md`.

| Role | Leads | Owns |
|---|---|---|
| **A Proposal lead** | Proposal, reviewer runs, final reconciliation | `deliverables/proposal/`, `assumptions.md`, `questions.md`, `STATUS.md` |
| **B Tool lead** | Tool build and deployment | `our-tool/`, `deliverables/as-built.md` |
| **C Story lead** | Deck, speaker notes, demo script, presenting | `deliverables/presentation/` |

Each person works on their own laptop and edits only their own area, which avoids Git conflicts. Run `/ba-sync` after each review so the others get your files.

## Before the event

### Ask the organizers

- [x] Is the presentation inside the 3 hours? How long is each team's slot? No, the presentation is not inside the 3 hours
- [ ] What are the official scoring criteria? Update `A-01` in `deliverables/assumptions.md`.
- [x] Will there be internet access, and can we use personal laptops? Yes to both questions.
- [x] May use case content go to external AI and hosting services? Yes
- [x] Are the judges available for clarifying questions? Yes
### Prepare every laptop

- [ ] Install VS Code, the Claude Code extension, Node.js 22 or later, and Git.
- [ ] Clone the repo, open the repo folder itself, and approve the workspace trust prompt.
- [ ] Run `/ba-preflight` and fix everything it reports.

### Prepare the accounts

- [ ] **GitHub:** create one private repo and give all three people access.
- [ ] **Vercel:** create a project from the repo and set **Root Directory** to `our-tool`.
- [ ] **Vercel plan:** Hobby is limited to "non-commercial personal use", and Vercel's definition of commercial use includes a paid employee writing the code. Ask IT for a ruling, or use a Pro seat.
- [ ] **AI key:** get an API key for the tool and set a low spending limit. Claude subscriptions bill API usage separately. If you use Gemini's free tier, Google says not to submit sensitive, confidential or personal information.
- [ ] **Vercel settings:** add `LLM_PROVIDER`, `LLM_MODEL`, `LLM_API_KEY` and `TOOL_ACCESS_CODE`, then add the same names to `our-tool/.env.local` on B's laptop.
- [ ] **First deployment:** run `/ba-deploy` and confirm `/api/health` reports both settings as configured.
- [ ] **Supabase (Level 2 only):** free projects pause after 7 days of low activity, and built-in auth email is capped at 2 per hour. Resume the project the day before, and pre-create a demo user.

### Run two timed dry runs

- [ ] Use two different use cases, including one that fits the tool shape poorly.
- [ ] Record how long each review takes, then correct the timeline below.
- [ ] Check that the tool can be built in the build window. **This is the biggest risk in the plan,** because the tool is built from nothing on the day.
- [ ] Check Claude usage limits with three people working at once.
- [ ] Run `/ba-reset` after each dry run.

## On the day

| Time | Work | Lead | Ends with |
|---|---|---|---|
| 0:00–0:30 | `/ba-start`: use case intake, as-is, assumptions, questions | A | G1 Problem framing |
| 0:30–0:45 | `/ba-solution`: compare options and choose one | All | G2 Solution choice |
| 0:45–1:00 | `/ba-design`: solution, to-be, value, architecture, data model | A | G3 Design |
| 1:00–1:15 | `/ba-spec`: functions, screens, demo plan, sample data, reviewer | A | G4 Spec freeze |
| 1:00–1:15 | `/ba-build foundation`: AI connection and secure endpoint | B | Deployed foundation |
| 1:15–2:05 | `/ba-build`: slices, deploying after each one | B | G5 Tool freeze |
| 0:45–2:05 | `/ba-deck`: run after each review; it fills what's approved | C | Reviewed at G6 |
| 1:15–2:05 | `/ba-closeout draft`: risks, roadmap, Q&A, AI checklist | A | Reviewed at G6 |
| 2:05–2:20 | `/ba-closeout final`: match everything to the real tool, assemble, reviewer | A | Reviewed at G6 |
| 2:20–2:50 | `/ba-demo`: script, then two rehearsals on the deployed URL | All | G6 Final pack and go/no-go |
| 2:50–3:00 | Buffer and submission | All | Done |

If the presentations fall inside the 3 hours, shift everything earlier by the time they need.

### What each person does

**Before G2,** B and C read the use case, challenge the as-is, and bring ideas to the solution choice.

**After G2,** C starts `/ba-deck` from the approved sections, and B checks that the chosen option can really be built.

**At each review,** the decider reads the card, not every line. They approve with `/ba-approve`, or reply with what to change.

**After G4,** nobody changes the spec. If the tool has to differ, B records it in `deliverables/as-built.md`.

## Scope cuts

Agree these now so you don't debate them under pressure.

| Trigger | Action |
|---|---|
| G4 isn't approved by 1:30 | Cut the tool to one core feature |
| The foundation isn't deployed by 1:30 | Cut Should functions, and put live AI ahead of everything else except Demo mode |
| Live AI isn't stable by 2:05 | Present from the labelled Demo mode, and say so to the judges |
| A review goes past its time | The decider decides with what's known, and open points become assumptions |
| The judges don't answer a question in time | Record the working answer as an assumption and continue |

## If something fails

| Failure | Do this |
|---|---|
| AI provider or network is down | Switch to Demo mode, which needs no AI |
| Deployment is broken | Open the last working deployment in the Vercel dashboard and promote it |
| Claude usage limit reached | Continue on another teammate's laptop after `/ba-sync` |
| Git conflict | Stop and run `/ba-sync`, which explains the conflict and asks before changing anything |
| A session gets confused | Start a new conversation and run `/ba-next`. All the state is in files |

## Measuring value

Slide S07 needs real evidence, and this test gives you a sourced number.

1. After G4, C times one person doing the task by hand on the sample.
2. At G5, B times the same task with the tool, including human review.
3. Add both results to the Sources table in `deliverables/assumptions.md` as `SRC-xx`.
4. Describe it honestly: one person, fictional data, one sample.

## Making the slides

1. Run `/ba-deck` until no slide says Pending.
2. Open Artifact in the Claude app, paste `deliverables/presentation/slides.md`, and ask Claude to build the deck from the brief at the top.
3. Style the deck in the Claude app. Make content changes in `slides.md` first and copy them across, because the reviewer checks `slides.md`, not the Claude app.

## Command reference

| Command | Use it to |
|---|---|
| `/ba-next` | See where the team is and what each person should do |
| `/ba-preflight` | Check a laptop and the accounts |
| `/ba-start` | Save the use case and analyze the current state, up to G1 |
| `/ba-solution` | Compare solution options, up to G2 |
| `/ba-design` | Design the solution and domain model, up to G3 |
| `/ba-spec` | Write functions, screens, demo plan and samples, up to G4 |
| `/ba-build` | Build the tool, up to G5. Use `foundation` after G3 |
| `/ba-deploy` | Test, push and check the live deployment |
| `/ba-deck` | Write or update slides and speaker notes |
| `/ba-closeout` | Write the closing sections. Use `draft` after G4 and `final` after G5 |
| `/ba-demo` | Write the demo script and prepare rehearsals, up to G6 |
| `/ba-review` | Rerun the reviewer. Use `spec` or `final` |
| `/ba-approve` | Record a human approval, such as `/ba-approve G1 Your Name` |
| `/ba-sync` | Share your work through GitHub and get your teammates' work |
| `/ba-reset` | Archive the current use case and restore the blank template |
