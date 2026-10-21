// Inert recipe. Replace this fixed fictional host only for an explicitly selected provider.
// Caller supplies approved credentials and validates the returned unknown value.
export async function readProviderRecord(id: string, token: string): Promise<unknown> {
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(id)) throw new Error("Invalid record ID");
  const url = new URL(`/v1/records/${encodeURIComponent(id)}`, "https://api.fictional-provider.invalid");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    redirect: "manual", signal: AbortSignal.timeout(5000),
  });
  // Workers does not implement redirect:"error". Refuse every 3xx response
  // before following a destination or forwarding the Authorization header.
  if (response.status >= 300 && response.status < 400) {
    await response.body?.cancel();
    throw new Error("Provider redirect refused");
  }
  if (!response.ok) throw new Error(`Provider request failed: ${response.status}`);
  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error("Unexpected provider response type");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Empty provider response");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const chunk = await reader.read(); if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 64 * 1024) { await reader.cancel(); throw new Error("Provider response too large"); }
      chunks.push(chunk.value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  const value: unknown = JSON.parse(new TextDecoder().decode(bytes));
  return value;
}
