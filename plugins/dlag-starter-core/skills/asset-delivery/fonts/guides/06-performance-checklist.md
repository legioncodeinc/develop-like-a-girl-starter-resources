# Verify font delivery

Use pass, fail, pending or not applicable with a reason. A local declaration review establishes source facts; actual request, display and layout results require browser evidence. Set budgets from the product's languages and fonts. A 50 kB file or three-request budget can be a starting goal, not a universal correctness threshold.

## Inventory and policy

- [ ] Every relevant face has a known source, license, file size, style, weight/axis range, glyph coverage and explicit display policy.
- [ ] Body and heading text remain readable while the font is delayed or blocked.
- [ ] `optional`'s persistent fallback is an accepted product behavior.
- [ ] Required weights/italics exist; synthetic styles are understood.
- [ ] `swap` faces have a reviewed fallback and measured wrapping/layout, or an explicit calibration gap.

Inspect font-face source CSS directly. A font-display descriptor is not an ordinary inherited property that can be reliably audited solely in an element's computed-style list.

## Discovery and requests

- [ ] Only genuinely critical faces/subsets have preloads; all emitted hints considered together.
- [ ] Exact hint URL matches the source and uses `as="font"`, WOFF2 type and anonymous CORS.
- [ ] No duplicate request caused by version, origin, credentials or repeated hint mismatch.
- [ ] Initial server-rendered head and hydrated document agree.
- [ ] Cross-origin responses satisfy the existing CORS policy; private objects retain their authorization.

Inspect Network initiators and final responses, with cold and warm cache. The scheduler's displayed priority is browser-dependent; correct markup does not promise a specific priority label.

## Bytes and coverage

- [ ] Actual file format and response MIME agree; compare transferred and decoded sizes separately.
- [ ] Subsetting retains supported scripts, punctuation, combining marks, layout features and required axes.
- [ ] Variable versus selected static weights was compared when size matters.
- [ ] Versioned public files use the existing delivery/cache policy; no blanket immutable recommendation for mutable or private objects.
- [ ] Multiscript pages load the required subsets without a preload forcing every script.

## Layout and resilience

- [ ] Record viewport, browser/version, throttling, cache state and test content.
- [ ] Observe FOIT, wrapping and layout shift with delayed fonts.
- [ ] Attribute shifts from actual trace evidence; preserve before/after observations separately.
- [ ] Verify narrow layouts, long labels, translated text, weights/italics, unavailable local fallbacks and failed requests.
- [ ] Keep page-level field measurements distinct from lab traces and from font-specific attribution.

## Completion record

Use [the report format](../reports/README.md). List scoped changes, observed source checks, actual measurements, unresolved prerequisites and the one highest-value remaining correction. A checklist tick is backed by an observation. Do not claim fixed CLS, successful hydration or a delivered font from the existence of CSS.
