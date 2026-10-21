// Inert example. Integrate with an owner-scoped bounded export route.
// Mitigates common formula prefixes; does not guarantee every spreadsheet/save cycle.
export function csvCell(value) {
  const raw = String(value ?? "");
  const dangerous = /^[\t\r\n]/.test(raw) || /^[\s]*[=+@-]/u.test(raw);
  const safe = dangerous ? `\t${raw}` : raw;
  return `"${safe.replaceAll('"', '""')}"`;
}
export function csvRows(rows) {
  return rows.map(row => row.map(csvCell).join(",")).join("\r\n");
}
export function validateImportRow(value, rowNumber) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { row: rowNumber, field: "row", message: "Expected a row object" };
  const name = typeof value.name === "string" ? value.name.trim() : "";
  if (!name || name.length > 120)
    return { row: rowNumber, field: "name", message: "Use a name from 1 to 120 characters" };
  if (Object.keys(value).some(key => key !== "name"))
    return { row: rowNumber, field: "row", message: "Unexpected field" };
  return { row: rowNumber, data: { name } }; // Owner is supplied separately by verified server session.
}
