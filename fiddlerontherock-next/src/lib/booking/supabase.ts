type SupabaseOptions = { method?: string; body?: unknown; prefer?: string };
export function supabaseConfigured() { return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY); }
export async function supabaseRest<T>(resourcePath: string, options: SupabaseOptions = {}): Promise<T> { const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY; if (!url || !key) throw new Error("Supabase is not configured."); const response = await fetch(url + "/rest/v1/" + resourcePath, { method: options.method ?? "GET", headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json", ...(options.prefer ? { Prefer: options.prefer } : {}) }, body: options.body ? JSON.stringify(options.body) : undefined, cache: "no-store" }); if (!response.ok) throw new Error(await response.text()); return response.status === 204 ? ([] as T) : ((await response.json()) as T); }

export async function supabaseRpc<T>(functionName: string, body: unknown): Promise<T> {
  return supabaseRest<T>("rpc/" + functionName, { method: "POST", body });
}

export async function supabasePatch<T>(resourcePath: string, body: unknown): Promise<T> {
  return supabaseRest<T>(resourcePath, { method: "PATCH", body, prefer: "return=representation" });
}
