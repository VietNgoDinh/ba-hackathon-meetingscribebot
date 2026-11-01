---
name: ba-deploy
description: Test the tool, push it to GitHub so Vercel deploys it, and check the live site.
disable-model-invocation: true
---

Deploy the current tool. The person running this command has asked for a commit and push. Vercel deploys automatically from GitHub.

1. **Test.** Run `npm test` in `our-tool/`. If anything fails, stop, because failing code doesn't get deployed.
2. **Protect secrets.** Check the changed files. Stop if any is a `.env` file other than `.env.example`, or if any changed file contains something that looks like a key.
3. **Share.** Commit the changes in `our-tool/` and any tool-related records, then run `git pull --rebase` and `git push`. If there's a conflict, follow the conflict step in `.claude/skills/ba-sync/SKILL.md`.
4. **Find the URL.** Read Deployed URL in `STATUS.md`. If it's not set, ask B for the production URL from the Vercel dashboard, and save it there.
5. **Check the live site.** Fetch `<URL>/api/health` until its `commit` matches the commit you pushed, for up to about 3 minutes. Then confirm that `ok`, `llmKeyConfigured` and `accessCodeConfigured` are true. If `commit` is `unknown`, say the version can't be confirmed, and ask B to check the Vercel dashboard.
6. **Report.** Reply with the URL, the commit, and Pass or Fail. If a setting isn't configured, tell B where to add it: Vercel, Settings, Environment Variables, followed by a redeploy.
