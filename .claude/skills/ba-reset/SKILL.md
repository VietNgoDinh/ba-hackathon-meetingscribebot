---
name: ba-reset
description: Archive the current use case and restore the blank template, ready for a new use case or dry run.
disable-model-invocation: true
---

Move the current use case aside and restore the blank template. Nothing is deleted. Work moves to `archive/`, which stays on this laptop only.

1. Run `node .claude/skills/ba-reset/scripts/reset.mjs --dry-run` and show the person what would move.
2. Warn them that this affects `deliverables/`, `STATUS.md` and most of `our-tool/` on this laptop. Say that the toolkit in `.claude/`, plus `our-tool/.env.local`, stays where it is.
3. Ask them to confirm, and stop until they do.
4. Run `node .claude/skills/ba-reset/scripts/reset.mjs`.
5. Report the archive folder, and remind them to run `/ba-sync` so teammates get the reset too.
