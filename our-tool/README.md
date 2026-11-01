# Our Tool

{{One or two sentences on what the tool does and who it's for. `/ba-build` fills this in at G5.}}

## Run it

1. Install Node.js 22 or later.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env.local` and fill in the values.
4. Link this folder to the Vercel project the first time, by running `npx vercel link`.
5. Run `npm run dev`.

## Test it

Run `npm test`. Tests also run as the first step of `/ba-deploy`.

## Deploy it

Run `/ba-deploy` in Claude Code. It tests the tool, pushes to GitHub, then confirms that the live site runs the new version. Vercel deploys automatically from GitHub, with `our-tool` as the Root Directory. Only `public/` is served to browsers.

## Settings

Add these in Vercel, under Settings, then Environment Variables, and in `.env.local`. They're listed without values in `.env.example`.

| Setting | Purpose |
|---|---|
| `LLM_PROVIDER` | Which AI provider `lib/llm.js` uses |
| `LLM_MODEL` | Which AI model to call |
| `LLM_API_KEY` | AI provider key. Server only |
| `TOOL_ACCESS_CODE` | Code a person must enter to run the analysis |
| `SUPABASE_URL` | Level 2 only |
| `SUPABASE_PUBLISHABLE_KEY` | Level 2 only. Safe to use in the browser |
| `SUPABASE_SECRET_KEY` | Level 2 only. Server only |
