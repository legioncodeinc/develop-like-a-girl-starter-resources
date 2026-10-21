---
name: asset-delivery
description: "Improve native React image and font delivery for React Router SSR using real asset dimensions, responsive sizes, loading priority and licensed font files."
license: AGPL-3.0-or-later
compatibility: Claude Code
---

# Font and Image Delivery Playbook

Read [the delivery procedure](guides/deliver-assets.md), [the inventory](templates/asset-inventory.md), [current references](references/current-docs.md), and [edition boundaries](../../references/edition-boundaries.md).

Use [the complete font procedure](fonts/playbook.md) for font work and [the complete image procedure](images/playbook.md) for image work. Their local guide maps, full templates and worked examples are in [font delivery](fonts/README.md) and [image delivery](images/README.md).

Inspect actual asset files, markup, layout width, font declarations and any existing R2 delivery paths. Use real dimensions and variants. The [responsive image example](examples/responsive-image.tsx) and [font example](examples/font-face.css) illustrate plain platform APIs. Placeholder URLs do not establish that an asset exists.

When scoped local markup/CSS changes are requested, save those changes with Write/Edit and read them back. Reuse existing files or transformations; propose missing derivatives rather than inventing a successful conversion. Treat R2 storage and image transformation as separate capabilities. Do not enable Cloudflare products, upload files, install image tooling or expose private object URLs.

Return before/after source findings, actual modified paths, available assets, missing prerequisites and checks observed. Do not report speed scores, zero layout shift, MIME correctness or successful downloads without measurements. The [paired Specialist](../../agents/asset-delivery.md) can follow this method directly.
