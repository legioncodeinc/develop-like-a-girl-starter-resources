# Icons that load predictably and have names

Use this route for a missing accessible name, an icon wrapper, a custom SVG, icon bundle growth or a name supplied by repository content. First inspect the existing icon package, local wrapper, accepted size/stroke/color tokens and bundler configuration. Keep the installed set and wrapper contract.

1. Read [library fit](guides/00-library-fit.md) and [delivery](guides/01-delivery.md).
2. For names stored in content read [allowlisted names](guides/02-dynamic-names.md) and the [worked content example](examples/content-icon-map.md).
3. Apply [the naming contract](guides/03-accessibility-contract.md); use the [typed wrapper](examples/typed-icon-wrapper.md).
4. For custom shapes read [SVG authoring](guides/04-custom-svg.md).
5. Return [a complete audit record](templates/icon-audit.md) when review is requested. Save `YYYY-MM-DD-icon-review.md` in the project's documentation location only when asked.

Tokens and visual identity come from the existing design system. Sprite build configuration and a new package/provider are separate scope decisions. Never fetch arbitrary icon code from a name supplied in content. No installation or external icon service is selected by this Playbook. Source review cannot prove bundle size or a screen reader result.
