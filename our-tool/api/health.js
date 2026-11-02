// Deployment check used by /ba-deploy. It reports whether settings exist, never their values.
export default {
  fetch() {
    return Response.json({
      ok: true,
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
      llmKeyConfigured: Boolean(process.env.LLM_API_KEY),
      accessCodeConfigured: Boolean(process.env.TOOL_ACCESS_CODE),
      storageConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY),
    });
  },
};
