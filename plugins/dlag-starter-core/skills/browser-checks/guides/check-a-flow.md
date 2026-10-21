# Check one affected flow

## Set the boundary

Record the local URL, page/flow, revision or file hashes, fixture data, browser tool/version, actual browser channel/version, viewport and whether JavaScript is enabled. Confirm existing browser availability. Installation is a separate owner action; never silently download a browser. Prefer semantic role/name/label locators with bounded waits and meaningful conditions. Avoid arbitrary sleeps and user-authenticated profiles.

Use only the requested target. Block or record off-origin requests. Keep all fixture persistence and email mocked. If a real integration is requested, identify its authorization and the resulting external effect explicitly. A local mock pass cannot prove Supabase persistence, Resend delivery, R2 access or Cloudflare production deployment.

## One focused batch

- Successful path: load the page, follow its primary link, complete the requested interaction and assert the actual outcome. For SSR inspect the raw response before browser execution, then verify a client interaction; server HTML alone does not prove hydration.
- Invalid path: check associated validation text, real HTTP status, entered-value handling and no unintended save/send. Test the changed failure boundary, including safe retry or idempotency when relevant.
- Empty path: show the intended empty collection or no-results state. If the affected flow has no empty state, say not applicable with a reason.
- Missing page: verify the real 404 response and useful page content. A 200 containing “not found” is a failure.
- Mobile: use a narrow viewport, check readable content, touch targets, navigation and horizontal overflow. State that emulation is not a physical-device test.
- Keyboard: Tab through the affected controls, confirm visible focus and logical order, operate a link/button without a mouse and verify focus after errors where relevant. Do not infer keyboard operation from markup.
- Basic accessibility heuristics: check document language/title, heading sequence, meaningful link text, programmatic labels, image alternatives, visible focus and error associations. Record exactly which were checked. Presence checks cannot establish the meaning of alt text, complete contrast coverage or every WCAG success criterion.
- Forms: test JavaScript behavior and a no-JavaScript submission when the feature promises progressive enhancement. Report saved, queued, pending and delivered according to observed evidence; a saved lead or accepted provider request is not delivery confirmation.

## Evidence and limits

Save a screenshot at desktop and mobile sizes, and a failure screenshot plus the relevant error when a check fails. Record page errors and unexpected failed requests, redacting private values. Do not hide the first failure with a passing rerun. After a fix repeat only affected checks, plus anything invalidated by that change.

Keep performance claims separate. A browser screenshot or fast local load supplies no Lighthouse score or field Core Web Vitals result. A lab run is a controlled observation tied to its device, throttling and cache settings; field data describes actual users and its aggregation window. A good lab TBT does not establish good field INP. Use an already available and authorized measurement tool only when the task needs it, and otherwise mark performance measurement pending.

The accessibility output is a bounded automated-plus-heuristic check. It is not a full manual accessibility audit, assistive-technology user test or legal conformance determination. Do not assign an AA/AAA compliance badge or percentage from this small check.
