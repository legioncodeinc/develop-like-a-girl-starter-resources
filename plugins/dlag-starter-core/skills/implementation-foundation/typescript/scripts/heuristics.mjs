/** Pure line triage over bounded, supplied strings. No file, config, import or network reads. */
const BUILTINS = ['fs','path','url','crypto','os','child_process','http','https','stream','util','events'];
export const modes = ['boundaries','queries','secrets','catch','schema','esm'];
function emptyCatch(line) {
  if(!line.includes('catch'))return false;
  // Precompute the next delimiters and non-whitespace positions once. Nested
  // candidate starts must remain observable without rescanning a shared suffix.
  const end=line.length,nextClose=new Uint32Array(end+1),nextText=new Uint32Array(end+1);
  let close=end,text=end;nextClose[end]=end;nextText[end]=end;
  for(let at=end-1;at>=0;at--){if(line[at]===')')close=at;if(!/\s/.test(line[at]))text=at;nextClose[at]=close;nextText[at]=text;}
  let offset=0;
  while(offset<end) {
    const found=line.indexOf('catch',offset);if(found<0)return false;
    let at=nextText[found+5];
    if(line[at]==='('){const closing=nextClose[at+1];if(closing===end){offset=found+5;continue;}at=nextText[closing+1];}
    if(line[at]==='{'){at=nextText[at+1];if(line[at]==='}')return true;}
    offset=found+5;
  }
  return false;
}
function secretLog(line) {
  const calls = /console\.\w+\(/g;let match;
  while ((match = calls.exec(line))) {
    const start=calls.lastIndex,end=line.indexOf(')',start);
    if (/\b(token|secret|apiKey|api_key|password|bearer|authorization)\b/i.test(line.slice(start,end<0?undefined:end))) return true;
    if(end<0)return false;
    calls.lastIndex=end+1;
  }
  return false;
}
function authLiteral(line) {
  const start=/(Authorization|Bearer)\s*[:=]/i.exec(line);
  return start!==null && /['"][^'"]+['"]/.test(line.slice(start.index+start[0].length));
}
export function scanText(mode, text, context = 'bundler') {
  if (!modes.includes(mode) || typeof text !== 'string' || Buffer.byteLength(text) > 262144 || !['bundler','node','worker'].includes(context)) throw new Error('Invalid scan input');
  const lines = text.split('\n'), findings = []; let loopDepth = 0;
  const add = (line, rule, severity = 'review') => { if (findings.length >= 512) throw new Error('Finding bound exceeded'); findings.push({line, rule, severity}); };
  lines.forEach((line, i) => {
    const n = i + 1;
    if (mode === 'boundaries') {
      if (/\bas\s+any\b/.test(line)) add(n,'TYPE_ANY_CAST');
      if (/:\s*any\b/.test(line) && !/\/\//.test(line.split(':')[0] ?? '')) add(n,'TYPE_ANY_ANNOTATION');
      // JSON.parse is not validator.parse: keep the parse lead even when a nearby method has the same spelling.
      if (/JSON\.parse\(/.test(line) && !/(?:\b\w+Schema|\bz)\.(?:parse|safeParse)\s*\(/.test(line)) add(n,'JSON_REQUIRES_VALIDATION');
    }
    if (mode === 'queries') {
      if (/\b(for|while)\b|\.map\(|\.forEach\(/.test(line)) loopDepth++;
      if (loopDepth > 0 && /await\s+\w+\.(?:query|select|rpc)\(/.test(line)) add(n,'LOOP_QUERY_REVIEW');
      if (/fetch\(/.test(line) && /(?:rest\/v1|\/rpc\/)/.test(line)) add(n,'DIRECT_DATA_FETCH_REVIEW');
      if (/^\s*\}/.test(line) && loopDepth > 0) loopDepth--;
    }
    if (mode === 'secrets') {
      if (/(sk-[A-Za-z0-9]{16,}|ghp_[A-Za-z0-9]{20,}|eyJ[A-Za-z0-9_-]{20,})/.test(line)) add(n,'CREDENTIAL_LITERAL');
      else if (authLiteral(line)) add(n,'AUTH_LITERAL_REVIEW');
      else if (/['"][A-Za-z0-9_\-]{32,}['"]/.test(line) && /(token|key|secret|password|auth)/i.test(line)) add(n,'OPAQUE_SECRET_REVIEW');
      if (secretLog(line)) add(n,'SECRET_LOG_REVIEW');
    }
    if (mode === 'catch') {
      if (emptyCatch(line)) {add(n,'EMPTY_CATCH');return;}
      const match = line.match(/catch\s*\(\s*(\w+)\s*\)\s*\{/);
      if (match) {
        if (match[1].length > 128) throw new Error('Catch binding bound exceeded');
        const body = lines.slice(i + 1, i + 5).join('\n');
        const used = new RegExp(`\\b${match[1]}\\b`).test(body);
        const comment = /\/\//.test(line) || /\/\//.test(lines[i + 1] ?? '');
        if ((/^\s*\}/.test(lines[i + 1] ?? '') || !used) && !comment) add(n,'UNUSED_CATCH_REVIEW');
      }
    }
    if (mode === 'schema') {
      if (/ALTER\s+TABLE/i.test(line)) add(n,'RUNTIME_DDL_REVIEW');
      if (/ADD\s+COLUMN/i.test(line)) add(n,'RUNTIME_COLUMN_REVIEW');
      // Column copies require comparison with the supplied actual schema; no invented canonical table names.
    }
    if (mode === 'esm') {
      if (/\brequire\(/.test(line) || /module\.exports/.test(line)) add(n,'CJS_IN_ESM_REVIEW');
      if (/\b__dirname\b|\b__filename\b/.test(line)) add(n,'CJS_LOCATION_REVIEW');
      const rel = line.match(/from\s+['"](\.\.?\/[^'"]+)['"]/);
      if (context === 'node' && rel && !/\.(js|json|mjs)$/.test(rel[1])) add(n,'NODE_RELATIVE_EXTENSION_REVIEW');
      if (/from\s+['"]node-fetch['"]/.test(line)) add(n,'FETCH_POLYFILL_REVIEW');
      const bare = line.match(/from\s+['"](fs|path|url|crypto|os|child_process|http|https|stream|util|events)['"]/);
      if (bare && BUILTINS.includes(bare[1])) add(n,'NODE_BUILTIN_PREFIX_REVIEW');
      if (context === 'worker' && /from\s+['"](?:node:)?(?:fs|child_process|net|tls)['"]/.test(line)) add(n,'WORKER_RUNTIME_IMPORT_REVIEW');
    }
  });
  return findings;
}
export function scanPacket(mode, packet) {
  if (!packet || typeof packet !== 'object' || !Array.isArray(packet.sources) || packet.sources.length < 1 || packet.sources.length > 64 || !['bundler','node','worker'].includes(packet.context)) throw new Error('Invalid packet');
  let bytes = 0, all = [];
  for (const [index, item] of packet.sources.entries()) {
    if (!item || typeof item.text !== 'string') throw new Error('Invalid source');
    bytes += Buffer.byteLength(item.text); if (bytes > 8 * 1024 * 1024) throw new Error('Source bytes exceeded');
    const findings = scanText(mode, item.text, packet.context).map(f => ({sourceIndex:index, ...f}));
    all.push(...findings); if (all.length > 2048) throw new Error('Finding bound exceeded');
  }
  return {kind:'heuristic-review', mode, context:packet.context, suppliedSources:packet.sources.length, bytes, completeForSuppliedInputs:true, findings:all};
}
