// Inert parsing example. No SQL/filter fragments are created here.
export function searchInput(url) {
  const params = new URL(url).searchParams;
  const q = (params.get("q") ?? "").trim();
  if (q.length > 120) throw new RangeError("Search must be 120 characters or fewer");
  const pageRaw = params.get("page") ?? "1";
  if (!/^[1-9]\d{0,3}$/.test(pageRaw)) throw new RangeError("Invalid page");
  return { q, page: Number(pageRaw), pageSize: 20 };
}
