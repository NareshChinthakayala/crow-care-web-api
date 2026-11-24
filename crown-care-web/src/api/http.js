/**
 * Fetch wrapper for the real backend (not used yet — every api/*.js file
 * currently answers from `mockDb`). When an endpoint is ready, replace the
 * mock body of that function with a one-liner such as:
 *   list: () => http("/orders"),
 *   create: (input) => http("/orders", { method: "POST", body: input }),
 *
 * Set the server address in a `.env` file:  VITE_API_URL=https://api.example.com
 */
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function http(path, { method = "GET", body } = {}) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? `Request failed (${res.status})`);
  return data;
}
