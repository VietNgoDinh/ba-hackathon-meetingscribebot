// Saves and reads reviewed minutes in Supabase, through its web (REST) interface. No extra package.
// The secret key stays on the server. The fetch function is passed in so tests never reach the network.
export class StoreError extends Error {}

export function createStore({ fetchFn = fetch } = {}) {
  const base = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;

  async function call(path, { method = "GET", body, prefer } = {}) {
    if (!base || !key) throw new StoreError("Storage settings are missing");
    let response;
    try {
      response = await fetchFn(`${base}/rest/v1/meetings${path}`, {
        method,
        headers: {
          apikey: key,
          authorization: `Bearer ${key}`,
          "content-type": "application/json",
          ...(prefer ? { prefer } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new StoreError("Storage request failed (network)");
    }
    // Log the status only. The response text could hold saved minutes.
    if (!response.ok) throw new StoreError(`Storage request failed (${response.status})`);
    return response.json();
  }

  return {
    async save(row) {
      const [saved] = await call("", { method: "POST", body: row, prefer: "return=representation" });
      return saved;
    },
    list: () => call("?select=*&order=created_at.desc&limit=50"),
    async get(id) {
      const [row] = await call(`?id=eq.${encodeURIComponent(id)}&select=*`);
      return row ?? null;
    },
  };
}
