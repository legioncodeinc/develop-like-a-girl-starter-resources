# Optional local image processing recipes

The Asset Delivery Specialist authors source and instructions; it does not run commands. Use these recipes only with an already installed, approved toolchain and authorization for local derivative creation. No installation, remote download, upload, provider configuration or build hook is implied. Sharp is a Node/native preprocessing option, not a browser bundle dependency or assumed Workers runtime module.

## Select the existing tool

| Tool | Appropriate use | Important limit |
|---|---|---|
| Sharp | Local resize, AVIF/WebP, crop, thumbnails and metadata | Check installed version/codec support; constrain input and preserve originals |
| Squoosh | Existing local one-off visual comparison | Check current maintainer support and exact tool; do not silently install the CLI |
| ImageOptim | Existing macOS workflow for PNG/JPEG optimization | Can alter metadata or use configured lossy modes; operate on derivatives |
| Existing approved image service | Its documented transformation contract | Requires an established provider, privacy and cost decision |

Do not choose a new tool solely to execute this guide. A missing encoder is a named prerequisite.

## Core operations on an approved local buffer

```javascript
import sharp from 'sharp';
const base = sharp(approvedInputBuffer, { limitInputPixels: 40000000 }).rotate();
const avif = await base.clone().resize({ width: 800, withoutEnlargement: true })
  .avif({ quality: 55 }).toBuffer({ resolveWithObject: true });
const webp = await base.clone().resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
// Use avif.info.width/height and webp.info.width/height, not the requested width.
```

Rotation normalizes EXIF orientation before producing metadata/markup. Inspect output color and alpha. Sharp normally removes metadata unless requested; retain original files and verify the policy for derivatives. Animated input requires a distinct reviewed pipeline; do not silently convert its first frame and claim equivalent output.

## Complete bounded batch recipe

This inert `.mjs` recipe processes at most 20 explicitly named local raster inputs. It never scans recursively or fetches a URL. Use a trusted project directory not writable by an adversary during execution. Both roots must already exist and be explicitly approved; replace the plan from actual supplied files. Output goes into a new unique subdirectory, leaving source and prior derivatives intact. It needs existing Sharp and Node; it is not invoked by the Playbook.

```javascript
import sharp from 'sharp';
import { open, realpath, stat, lstat, mkdtemp, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const inputRoot = await realpath('./approved-image-input');
const outputParent = await realpath('./approved-image-output');
const plan = [
  { id: 'hero', file: 'hero.jpg', widths: [640, 1024, 1920] },
  { id: 'product', file: 'product.png', widths: [320, 640, 960] },
];
if (!(await stat(inputRoot)).isDirectory() || !(await stat(outputParent)).isDirectory()) {
  throw new Error('Expected approved local directories');
}
if (!plan.length || plan.length > 20) throw new Error('Batch outside bounds');
const ids = new Set();
for (const item of plan) {
  if (!/^[a-z0-9-]{1,60}$/.test(item.id) || ids.has(item.id)) throw new Error('Invalid or duplicate ID');
  ids.add(item.id);
  if (!/^[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp|avif)$/i.test(item.file)) throw new Error('Expected one local raster filename');
  if (!item.widths.length || item.widths.length > 10 || item.widths.some(w => !Number.isInteger(w) || w < 16 || w > 3840)) {
    throw new Error('Widths outside bounds');
  }
}
const outputRoot = await mkdtemp(path.join(outputParent, 'derivatives-'));
const manifest = [];
for (const item of plan) {
  const source = path.join(inputRoot, item.file);
  if (await realpath(source) !== source || !(await lstat(source)).isFile()) {
    throw new Error('Expected a regular file without symlinks');
  }
  const file = await open(source, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  let input;
  try {
    const info = await file.stat();
    if (!info.isFile() || info.size < 1 || info.size > 32 * 1024 * 1024) throw new Error('Input outside bounds');
    // A fixed-length read prevents concurrent growth from causing an unbounded read.
    input = Buffer.alloc(info.size);
    let offset = 0;
    while (offset < input.length) {
      const part = await file.read(input, offset, input.length - offset, offset);
      if (!part.bytesRead) throw new Error('Input changed during read');
      offset += part.bytesRead;
    }
  } finally { await file.close(); }
  const metadata = await sharp(input, { limitInputPixels: 40000000 }).metadata();
  if (!['jpeg', 'png', 'webp', 'avif', 'heif'].includes(metadata.format) || (metadata.pages ?? 1) !== 1) {
    throw new Error('Unsupported or animated input');
  }
  const written = new Set();
  for (const requestedWidth of [...new Set(item.widths)].sort((a, b) => a - b)) {
    for (const format of ['avif', 'webp']) {
      const pipeline = sharp(input, { limitInputPixels: 40000000 }).rotate()
        .resize({ width: requestedWidth, withoutEnlargement: true });
      const result = await pipeline[format]({ quality: format === 'avif' ? 55 : 80 })
        .toBuffer({ resolveWithObject: true });
      if (result.data.length > 32 * 1024 * 1024) throw new Error('Output exceeds budget');
      const name = `${item.id}-${result.info.width}.${format}`;
      if (written.has(name)) continue;
      written.add(name);
      await writeFile(path.join(outputRoot, name), result.data, { flag: 'wx' });
      manifest.push({ file: name, width: result.info.width, height: result.info.height,
        bytes: result.data.length, format });
    }
  }
}
await writeFile(path.join(outputRoot, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
console.log(`Prepared ${manifest.length} derivative records in a new local output directory`);
```

The manifest records output facts; it does not publish URLs. Connect only reviewed files to the existing delivery map. A failed batch may leave partial derivatives in its new directory; do not call it complete or delete original input. Review the partial result before an authorized retry. Per-image size limits constrain work but are not a sandbox for hostile image decoders; use the approved processing environment for untrusted uploads.

## Deliberate crop operation

For an already approved buffer, a known crop and dimensions the source can support:

```javascript
const square = await sharp(approvedInputBuffer, { limitInputPixels: 40000000 })
  .rotate().resize({ width: 960, height: 960, fit: 'cover', position: 'centre' })
  .avif({ quality: 55 }).toBuffer({ resolveWithObject: true });
```

Check source dimensions and subject focus before selecting a crop or allowing enlargement. Repeat for each approved crop/format, inspect actual output dimensions, and provide a real fallback. An undefined `generate-variants.ts` command is not a conversion pipeline.

## Existing one-off and build workflows

When Squoosh or ImageOptim is already present, use its actual installed interface on copies and compare dimensions, alpha, orientation, metadata, visual quality and bytes. Do not assume all modes are lossless or that a GUI validates every supported format. Use the existing reviewed build step if one already prepares derivatives; do not introduce an automatic prebuild hook. Store LQIP/dominant-color metadata from [the placeholder recipes](03-placeholders.md) beside the approved public asset manifest. Avoid request-time file reads or conversion in React rendering.

References: [Sharp output](https://sharp.pixelplumbing.com/api-output/), [resize](https://sharp.pixelplumbing.com/api-resize/) and [security](https://sharp.pixelplumbing.com/security/).
