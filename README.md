# AI UP Hackathon Toolkit

A reusable VS Code project that helps a team of 3 Business Analysts produce all four contest deliverables in a 3-hour event: a proposal, a working AI tool, a slide deck, and a live demo with Q&A. Claude Code does the drafting. The team makes the decisions at six human reviews.

## Quick start

1. Install VS Code and the Claude Code extension, then install [Node.js](https://nodejs.org) (version 22 or later) and Git.
2. Open this folder in VS Code. Open this folder itself, not a subfolder, or Claude Code can't see the toolkit.
3. In the Claude Code panel, run `/ba-preflight`. It checks your laptop and lists anything to fix.
4. Read [RUNBOOK.md](RUNBOOK.md). It has the roles, preparation checklist, timeline and fallback plans.

Type `/ba` in the Claude Code panel to see every toolkit command. Run `/ba-next` whenever you aren't sure what to do.

## How it's organized

| Path | What it is |
|---|---|
| `CLAUDE.md` | Rules Claude follows in every session |
| `RUNBOOK.md` | The team's plan for the day |
| `STATUS.md` | Review log, which also proves human control |
| `.claude/agents/` | 9 specialist subagents that each write specific files |
| `.claude/skills/ba-*/` | Slash commands the team runs |
| `.claude/skills/` (other folders) | Methods and templates the subagents follow |
| `.claude/rules/our-tool.md` | Build rules that apply whenever Claude works on the tool |
| `deliverables/` | Everything the team writes for the judges |
| `our-tool/` | The app that gets deployed to Vercel |

`our-tool/` starts as a skeleton: deployment settings, a design system, a placeholder page and a health check. The tool itself is built from the approved spec on the day with `/ba-build`.

## Using it again

Run `/ba-reset` to start a new use case, such as after a dry run. It moves the current work to `archive/` and restores the blank template. The toolkit in `.claude/` and your `our-tool/.env.local` stay in place, so improvements from a dry run carry forward.

## Changing the toolkit

Change a document's structure by editing its template in `.claude/skills/<skill>/templates/`. If a slide should change, update `.claude/skills/deck-writing/` and check that its source section still exists in the proposal template.

To change the blank project itself, edit `.claude/skills/ba-reset/skeleton/`, which is what `/ba-reset` restores.
