# 20: File Uploads & Tree UIs

Use installed project versions. Code fences are focused examples with project imports identified, not complete applications or executed receipts. Additional packages, tools, provider setup and configuration require the applicable user authorization. Starter uses React Router framework SSR, Cloudflare Workers and Supabase; optional library comparisons do not select a service.


The capacity/bundle/community estimates are comparison heuristics, not measured application results or current license grants. Verify exact installed versions, supported APIs, SSR behavior and licensing before choosing. No provider is selected by this comparison.

## Conditional library comparison

| Use case | Pick | Why |
|---|---|---|
| Drop zone + small file uploads | **react-dropzone** | The drop-zone primitive |
| Resumable / chunked / multi-GB uploads | **Uppy** (with **tus** server) | Resume after disconnect; battle-tested |
| Polished single-file upload UX | **FilePond** | Beautiful UX with adapters per backend |
| Starter storage | **Cloudflare R2 via Workers** | Explicit actor/key/limits/read access |
| Virtualized tree (file manager, tag tree) | **React Arborist** | Virtualized + DnD-friendly |
| Static / small tree | **Radix accordion** or custom recursion | Right-sized, no extra dep |

For most teams: **react-dropzone** for the drop zone, **Uppy + tus** for serious file pipelines, R2 for selected storage, **React Arborist** for any tree UI larger than a few dozen nodes.

---

## When to choose each

### react-dropzone (the drop-zone primitive)
- Headless. You write the visual. It handles drag-and-drop, file selection, type validation.
- Pairs with anything (Uppy, Uploadthing, custom uploads): it's just the input surface.
- Use it as the input even when the *upload pipeline* is something else.

### Uppy (the upload pipeline)
- Resumable uploads via tus (`@uppy/tus`), S3 multipart (`@uppy/aws-s3-multipart`), or any custom transport.
- Survives network disconnects; uploads pause and resume from the last chunk.
- Plug-in architecture: webcam, image editor, Google Drive picker, dashboard UI.
- Pair with a tus server (e.g., `tusd`) for true resumability. Without a matching server protocol, no resumability is established.

### FilePond (the polished single-file UX)
- Beautiful, animated drop UX out of the box. Adapters for S3, Cloudinary, custom endpoints.
- Less flexible than Uppy for very large or chunked uploads.
- Use when the UX of the input itself is the point (avatars, hero images, single-file PDFs).

### Managed upload-service comparison, outside Starter selection
- A managed upload product can combine routes, validation and a typed client. This does not select it for Starter.
- Auth-aware (per-user upload permissions, file size limits, mime allowlist).
- Starter already selects R2. Preserve authentication, authorization, byte/type limits, progress/cancel and lifecycle requirements rather than introducing another storage owner.

### React Arborist (the virtualized tree)
- Virtualized tree component: renders thousands of nodes without choking.
- Built-in keyboard navigation, multi-select, drag-and-drop reorder.
- Use for file managers, project navigators, tag trees, org charts.

---

## The chunked / resumable upload story

For files >100 MB or any upload over a flaky network, "send the whole file in one POST" needs explicit network/limit/retry evaluation. The required transport properties:

1. **Chunked transport.** Respect the selected protocol and R2 multipart constraints for minimum part size/count and final part; do not choose arbitrary UI chunks as a server protocol.
2. **Resumability.** If a chunk fails, retry it; if the whole upload fails, resume from the last successful chunk.
3. **Progress.** Per-chunk progress aggregated to a per-file progress bar.
4. **Cancellation.** AbortController on the in-flight chunk(s).
5. **Auth & limits.** Signed URLs, per-user limits, mime allowlist enforced server-side, not only client.

One possible protocol is **tus**. Uppy's `@uppy/tus` plugin + a `tusd` server is the canonical implementation. S3 multipart works too but is more code.

---

## Starter (react-dropzone + Uppy + tus)

```tsx
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';

export function ResumableUpload({ tusEndpoint }: { tusEndpoint: string }) {
  const uppyRef = useRef<Uppy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const uppy = new Uppy({ autoProceed: true, restrictions: { maxFileSize: 5 * 1024 * 1024 * 1024 } })
      .use(Tus, { endpoint: tusEndpoint, chunkSize: 10 * 1024 * 1024, retryDelays: [0, 1000, 3000, 5000] });
    uppy.on('progress', setProgress);
    uppy.on('upload-error', () => setError('Upload failed. Try again or cancel.'));
    uppyRef.current = uppy;
    return () => { uppy.cancelAll(); uppy.destroy(); uppyRef.current = null; }; // verify teardown API against installed Uppy
  }, [tusEndpoint]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      for (const file of files) {
        try { uppyRef.current?.addFile({ name: file.name, type: file.type, data: file }); }
        catch { setError('This file could not be added. Check its size and type.'); }
      }
    },
  });

  return (
    <section aria-label="File uploads">
      <div {...getRootProps()} role="button" tabIndex={0} aria-label="Choose files to upload">
        <input {...getInputProps()} />
        {isDragActive ? 'Drop files here' : 'Drop files or click to browse'}
      </div>
      <progress aria-label="Upload progress" value={progress} max={100} />
      <button type="button" onClick={() => { uppyRef.current?.cancelAll(); setProgress(0); }}>Cancel uploads</button>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
```

This is an optional transport illustration, not an established 5GB service or complete upload UX. Connect Uppy progress/complete/error events to accessible progress, persistent error and cancel controls before treating this as a complete upload UI. Validate both accepted and rejected files; client restrictions are never the server authorization/type/size boundary.

## Selected R2 storage boundary

The browser drop zone is an input surface. The Workers backend authenticates the current actor, authorizes a record-specific object key, enforces byte/type limits and creates the approved upload transport. Never accept an arbitrary bucket/key/owner from the browser as authority. For private reads authorize again and use bounded signed access. Persist an owned file record only after verifying the expected object/size/type and handle cancellation/orphan cleanup.

Use the packaged R2 Storage Playbook for the actual chosen transport. Uppy/tus above is conditional: no tus server or background provider is selected or created. A resumable UI requires a compatible reviewed server endpoint; UI chunkSize does not prove backend resumability, size limits, antivirus or 5GB support. Do not substitute Uploadthing or Supabase Storage for selected R2.

## Starter (React Arborist tree)

```tsx
import { Tree } from 'react-arborist';

type Node = { id: string; name: string; children?: Node[] };
const data: Node[] = [{ id: '1', name: 'src', children: [{ id: '2', name: 'app.tsx' }] }];

export function FileTree() {
  return (
    <Tree data={data} openByDefault width={320} height={480} indent={16}>
      {({ node, style, dragHandle }) => (
        <div style={style} ref={dragHandle}>
          {node.isLeaf ? '📄' : node.isOpen ? '📂' : '📁'} {node.data.name}
        </div>
      )}
    </Tree>
  );
}
```

For trees over a few hundred nodes, virtualization is non-negotiable: Arborist gives it to you for free.

---

## Accessibility floor

- **Drop zones** must be keyboard-operable (`role="button"`, `tabIndex={0}`, Enter/Space triggers the file picker). react-dropzone gives you the props; wire the role + tabIndex.
- **Progress** must be announced via `role="progressbar"` with `aria-valuenow`/`aria-valuemax`, or live-region updates.
- **Cancel** must be focusable per upload, not buried in a dropdown.
- **Trees** must support arrow-key navigation, Home/End, type-ahead, and Enter to activate. Arborist handles this.
- **Errors** ("file too large", "wrong type", "upload failed") go to a live region, not just a red border.

---

## Choice tree

1. **Drop zone surface only** → react-dropzone.
2. **Files >100 MB or flaky network** → Uppy + tus (tusd server).
3. **S3 multipart preferred** → Uppy + `@uppy/aws-s3-multipart`.
4. **Starter storage** → R2 with a reviewed Workers upload/read contract.
5. **Polished single-file UX** → FilePond.
6. **Tree with >100 nodes** → React Arborist.
7. **Tree with <50 static nodes** → Radix Accordion or hand-rolled recursion.

---

## Common findings

> **[Must-fix]** `src/features/upload/Upload.tsx:1`: uploads via single `fetch` POST with no chunking; 200 MB files fail on flaky networks. Migrate to Uppy + tus or S3 multipart. See this guide §chunked-resumable-upload.

> **[Must-fix]** `src/features/files/FileTree.tsx:1`: renders 8,000 nodes with naive recursion; main thread blocks on expand. Move to React Arborist (virtualized).

> **[Should-refactor]** `src/features/upload/Drop.tsx:5`: drop zone is a `<div>` with no role / tabIndex / keyboard handler. Apply react-dropzone's `getRootProps()` + add `role="button"` and `tabIndex={0}`.

> **[Must-fix]** `src/server/upload.ts:1`: file size + mime allowlist enforced only client-side. Re-enforce on the server. See [guides/11-server-components.md §server-actions](11-server-components.md) and `Security Review` handoff.

---

## Handoffs

- **Storage layer (S3 / R2 / GCS), signed URLs, lifecycle policies** → `Cloudflare Platform`.
- **Auth scoping per upload (who can write where)** → `Security Review`.
- **Image transforms / CDN delivery** → image-CDN territory (Cloudinary, Imgix, unpic). Out of scope for this guide; flag for Project Notebook PRD if needed.
- **Visual treatment of drop zones, progress, and tree rows** → `Design Foundation`.
