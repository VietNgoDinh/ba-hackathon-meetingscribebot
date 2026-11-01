---
name: ba-sync
description: Share your work through GitHub and get your teammates' work, explaining any conflict in plain language.
disable-model-invocation: true
---

Sync this laptop with the team's GitHub repo. The person running this command has asked for a commit and push.

1. Run `git status`. If this isn't a Git repo or it has no remote, explain what's missing and stop.
2. Look at the changed files. Stop and warn the person if any path is a `.env` file other than `.env.example`.
3. If there are changes, commit them with a short message saying what changed, such as `G1 approved` or `Add as-is workflow`. Add only the files that belong to this person's work.
4. Run `git pull --rebase`.
5. If there's a conflict, stop. Explain in plain language which file conflicts, what each side changed, and your recommendation. Don't force anything, and don't discard anyone's work.
6. Run `git push`.
7. Reply with one line saying what was shared and what came in from teammates.
