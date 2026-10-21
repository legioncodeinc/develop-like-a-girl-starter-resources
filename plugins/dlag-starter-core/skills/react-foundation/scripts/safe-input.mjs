/** Bounded local data reads only. No project config/import discovery or raw error logging.
 * Node path APIs cannot atomically pin all ancestor directories. Caller must own
 * the selected root/ancestors and exclude concurrent hostile directory renames.
 * File descriptors still verify regular type, inode, links and changed-file metadata. */
import { constants } from 'node:fs';
import { lstat, realpath, open, opendir } from 'node:fs/promises';
import { resolve, relative, isAbsolute, join, sep, parse } from 'node:path';
const PRIVATE = /^(?:\.env(?:\..*)?|\.dev\.vars(?:\..*)?|\.git|node_modules|\.npmrc|\.netrc|\.ssh|\.aws|\.wrangler|\.codex|\.claude|\.cursor|\.agents|credentials?(?:[-_.].*)?|credential[-_]store(?:[-_.].*)?|secrets?(?:[-_.].*)?|id_rsa|id_ed25519|keychain(?:[-_.].*)?)$/i;
function deniedParts(parts) {
  return parts.some(p => PRIVATE.test(p) || p.length > 160 || /[\x00-\x1f\x7f]/.test(p)) || parts.some((p, i) => p.toLowerCase() === 'library' && /^(?:notes|journal|journals|personal|memories)$/i.test(parts[i + 1] ?? ''));
}
export async function inputRoot(value) {
  const root = resolve(value);
  const base = parse(root).root;
  const components = root.slice(base.length).split(sep).filter(Boolean);
  if (deniedParts(components)) throw new Error('Private input root');
  let current = base;
  for (const part of components) {
    current = join(current, part); const info = await lstat(current);
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('Unsafe input root');
  }
  const canonical = await realpath(root);
  if (canonical !== root) throw new Error('Noncanonical input root');
  return canonical;
}
function partsFor(root, value) {
  const absolute = resolve(root, value), rel = relative(root, absolute);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error('Unsafe input');
  const parts = rel.split(sep);
  if (deniedParts([...root.split(sep).filter(Boolean), ...parts])) throw new Error('Unsafe input');
  return { absolute, parts };
}
export async function readBounded(root, value, maxBytes) {
  const { absolute, parts } = partsFor(root, value);
  let current = root;
  for (let i = 0; i < parts.length - 1; i++) {
    current = join(current, parts[i]); const info = await lstat(current);
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('Unsafe input');
  }
  const before = await lstat(absolute);
  if (!before.isFile() || before.isSymbolicLink() || before.nlink !== 1 || before.size > maxBytes) throw new Error('Unsafe input');
  if (constants.O_NOFOLLOW === undefined || constants.O_NONBLOCK === undefined) throw new Error('Unsupported input platform');
  const file = await open(absolute, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const opened = await file.stat();
    if (!opened.isFile() || opened.nlink !== 1 || opened.dev !== before.dev || opened.ino !== before.ino || opened.size > maxBytes) throw new Error('Unsafe input');
    const chunks = []; let count = 0;
    while (true) {
      const chunk = Buffer.alloc(Math.min(65536, maxBytes + 1 - count));
      const { bytesRead } = await file.read(chunk, 0, chunk.length, null);
      if (!bytesRead) break;
      count += bytesRead; if (count > maxBytes) throw new Error('Oversized input');
      chunks.push(chunk.subarray(0, bytesRead));
    }
    const after = await file.stat();
    if (after.nlink !== 1 || after.size !== count || after.mtimeMs !== opened.mtimeMs || after.ctimeMs !== opened.ctimeMs) throw new Error('Changed input');
    return Buffer.concat(chunks, count);
  } finally { await file.close(); }
}
export async function sourceInputs(root) {
  const result = []; let total = 0, entries = 0;
  async function walk(dir, depth) {
    if (depth > 12) throw new Error('Input depth exceeded');
    const directory = await opendir(dir, { bufferSize: 32 });
    for await (const item of directory) {
      if (++entries > 4096) throw new Error('Input count exceeded');
      if (item.name.startsWith('.') || deniedParts([...dir.split(sep).filter(Boolean), item.name])) continue;
      const path = join(dir, item.name), info = await lstat(path);
      if (info.isSymbolicLink()) throw new Error('Unsafe input');
      if (info.isDirectory()) await walk(path, depth + 1);
      else if (/\.(?:[cm]?jsx?|tsx?)$/.test(item.name)) {
        if (result.length >= 256) throw new Error('Input count exceeded');
        const bytes = await readBounded(root, relative(root, path), 1024 * 1024);
        total += bytes.length; if (total > 32 * 1024 * 1024) throw new Error('Input bytes exceeded');
        result.push({ name: relative(root, path), text: bytes.toString('utf8') });
      }
    }
  }
  await walk(root, 0); return result;
}
/** Only canonical numeric versions with optional semver prerelease/build; arbitrary refs never echo. */
export function versionLabel(value) {
  if (typeof value !== 'string' || value.length > 128) return '(reference omitted)';
  const match = value.match(/^([~^]?)(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?)?((?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$/);
  if (!match || (match[5] && match[4] === undefined)) return '(reference omitted)';
  return `${match[1]}${match[2]}${match[3] === undefined ? '' : '.' + match[3]}${match[4] === undefined ? '' : '.' + match[4]}${match[5] ? ' (prerelease/build metadata omitted)' : ''}`;
}
