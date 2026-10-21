# Csv Xlsx Import Export routing

Use **Application Data UI** for the bounded decisions below. Check [scope and tool limits](../scope-and-tools.md) first. A route is a proposed handoff until actual availability, authorization and a dispatch receipt are established. Implementation, provider operations and tests remain unperformed unless the capable caller supplies their evidence.

The selected stack is React with React Router SSR, Cloudflare Workers, Supabase database and Auth, Cloudflare secrets and R2, transactional Resend and optional hosted Stripe Checkout. Framework/provider-specific recipes that require another stack are unavailable. Reuse the decision criteria, inputs, negative routing and output requirements only inside that selected scope; consult the current owner's Playbook before any concrete API or configuration recipe.



## Domain
Implements and audits the "upload your spreadsheet" feature surface for React products: CSV/XLSX parsing (papaparse, SheetJS, exceljs), large-file streaming via the Web Worker + chunk pattern, column-mapping UX (the 5-stage wizard, managed importers like OneSchema/Flatfile/dromo vs self-hosted react-spreadsheet-import), per-row Zod validation with structured error objects, CSV injection prevention (CWE-1236), encoding edge cases (UTF-8 BOM, CP1252), and styled XLSX export via ExcelJS WorkbookWriter.


## Trigger phrases
- "build a CSV import for this app"
- "add XLSX upload with column mapping"
- "we need a column-mapping wizard"
- "export this data to Excel"
- "stream-parse a large CSV without freezing the browser"
- "is our CSV export safe from injection"
- "handle UTF-8 BOM and CP1252 encoding on import"
- "compare OneSchema vs Flatfile vs a self-hosted importer"

## Do NOT route when
- The request is the file drop-zone UI component itself; that is Design Foundation. This Specialist owns the parse/validate/export logic behind it.
- The request is database bulk-insert performance once rows are validated; that is Data Foundation.
- The request is a security audit of the upload endpoint; that is Security Review, and this Specialist explicitly hands off to it before any upload endpoint reaches production.
- File size exceeds 500 MB, requiring a server-side pipeline with object storage; this Specialist does not own that background-job architecture.
- The user needs HIPAA compliance with a managed importer; verify BAA availability or the self-hosted path before proceeding, don't assume.

## Inputs the Specialist needs
- Format(s) in scope (CSV, XLSX, or both), max expected file size, and whether column mapping is needed.
- Validation rules and the output target (React state, API, or DB).
- Export requirements, if the request includes generating downloadable files.

## Outputs
- Parse/streaming code (papaparse/SheetJS/exceljs) with a Web Worker strategy for files over 5 MB.
- A column-mapping wizard (managed or self-hosted) and a Zod validation layer with row-level error objects.
- Sanitized CSV/XLSX export code and a findings report at the current owner's local Playbook covering library decisions and the sanitization checklist.

## Commonly sequenced with
- Design Foundation: builds the drop-zone and wizard UI shell this Specialist's logic plugs into.
- Data Foundation: handles bulk-insert performance for validated rows this Specialist produces.
- Security Review: audits the upload endpoint before production, mandatory handoff every time.
