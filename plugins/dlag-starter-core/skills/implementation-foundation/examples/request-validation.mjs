// Inert example for a small URL-encoded form. Caller enforces streaming byte limit first.
export function projectInput(form) {
  const keys = [...form.keys()];
  if (keys.some(key => key !== "name") || keys.length !== 1)
    return { ok: false, status: 400, error: "Send one name field" };
  const raw = form.get("name");
  if (typeof raw !== "string") return { ok: false, status: 400, error: "Name must be text" };
  const name = raw.trim();
  if (name.length < 1 || name.length > 120)
    return { ok: false, status: 422, error: "Name must be 1 to 120 characters" };
  return { ok: true, value: { name } }; // Owner comes from the verified session, never form data.
}
