---
name: ba-preflight
description: Check this laptop, the repo and the accounts, and list anything to fix before a dry run or the event.
disable-model-invocation: true
---

Check whether this laptop is ready. Don't install or change anything.

## Run these checks

| Check | How | Passes when |
|---|---|---|
| Right folder | Look for `CLAUDE.md` and `.claude/` in the working directory | Both exist, so the repo root is open |
| Toolkit loaded | Confirm that `/ba-next` and the `reviewer` subagent are available | Both exist |
| Node.js | `node -v` | Version 22 or later |
| npm | `npm -v` | It runs |
| Git | `git --version` | It runs |
| Repo | `git remote -v` and `git ls-remote` | A remote exists and is reachable |
| Skeleton | `npm test` in `our-tool/` | Tests pass |
| Local settings | Check that `our-tool/.env.local` exists, without opening it | Exists on B's laptop. Not needed elsewhere |
| Live deployment | If `STATUS.md` has a Deployed URL, fetch `<URL>/api/health` | `ok`, `llmKeyConfigured` and `accessCodeConfigured` are true |

## Ask the person to confirm

- Are the role names in `STATUS.md` filled in?
- Has IT or the organizers ruled on the Vercel plan?
- Does the AI key have a spending limit?
- Does the Vercel project use `our-tool` as its Root Directory?
- Have the organizers answered the questions in `RUNBOOK.md`?

## Report

Show one table with Check, Result (Pass, Fail or Skipped) and Fix. Write each fix as a plain instruction for a non-developer, including the official download site where relevant. End with one line: Ready, or how many items to fix.
