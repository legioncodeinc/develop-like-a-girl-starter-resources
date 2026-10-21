# Check the changed journey

Record actual evidence, not inferred readiness. Reuse already passing checks when their inputs have not changed. Keep checks proportional to the changed slice.

- Source: expected pages use reviewed content; placeholders are visible; drafts/private files are excluded; no secrets or fabricated proof appear in client output.
- Framework: run the existing project's type/build check when permitted. A pure helper check does not establish React compilation or Cloudflare compatibility.
- SSR: request homepage, services, contact and one article deep link directly; inspect initial HTML for actual content and metadata, and unknown article status 404. Client hydration must not create duplicate metadata or a broken navigation state.
- Content: change a fictional headline in the repository, then verify the saved value appears in a new server response. Restore only task-created fixture data when needed; preserve user content.
- Lead: valid submission records one receipt, invalid submission records/sends nothing, duplicate same-payload submission reuses receipt, changed-payload replay conflicts, oversize/foreign-origin/selected-abuse failure refuses, persistence failure claims no receipt, notification failure retains receipt with pending/failed wording. Use local mocks for these cases until real effects are authorized.
- Search: title, description and canonical reflect the page; robots and sitemap have correct media types and public URLs; drafts stay absent; JSON-LD matches visible facts and script-closing text stays inert.
- Browser: ask `dlag-starter-core:browser-checks` for desktop 1440x900 and mobile 390x844, plus a keyboard pass, navigation, form labels, focus, pending/error/success announcements, legible contrast, zoom, no horizontal overflow and reduced-motion behavior. Save actual screenshots only if captured. Use local fictional forms; a live lead submission needs approval.

Record any unexecuted area as pending with its prerequisite. Native plugin loading proves discoverability of instructions, not website compilation, browser accessibility or live providers. Do not claim WCAG conformance from this short checklist.
