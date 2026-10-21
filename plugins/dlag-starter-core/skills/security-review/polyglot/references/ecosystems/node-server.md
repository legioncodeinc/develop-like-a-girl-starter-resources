# Node.js servers reference (Express, Fastify, NestJS, Hono, Koa)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.


Loaded by [the backend procedure](../../guides/01-node-server.md). Workers and React Router server loaders/actions require these same boundary checks even if a manifest classifier calls the app React. Conditional Node/Express/Fastify/Nest/Koa APIs below apply only to existing supplied code, not Starter runtime selection. The same registered Security Review owner handles this method and the local React method.

Run every `rg` below from the scoped path with the shared exclusions from [../cross-cutting/tool-commands.md](../cross-cutting/tool-commands.md) (`$RG` = `rg -n --no-heading -S` plus the dependency-folder globs).

## Checklist

| # | Check | Finding id hint | Refs |
| --- | --- | --- | --- |
| N1 | Every route that reads or changes user data passes an auth middleware, guard, or hook before the handler | SEC-POLY authz | OWASP A01:2025, CWE-862 |
| N2 | Object lookups by id also check ownership or tenant (`where: { id, ownerId }`), not id alone | IDOR | CWE-639 |
| N3 | No SQL or NoSQL query is built by string concatenation or template literal with request data | SQLi | CWE-89, CWE-943 |
| N4 | No `child_process.exec` / `execSync` / `spawn(..., {shell: true})` with request data | command injection | CWE-78 |
| N5 | No `eval`, `new Function`, `vm.runIn*`, or template compile of user strings | code injection | CWE-94 |
| N6 | File paths from requests are resolved and checked against a base directory | path traversal | CWE-22 |
| N7 | Outbound fetches with user-supplied URLs use an allowlist or IP check, no redirects | SSRF | CWE-918 |
| N8 | Request bodies are validated (zod, joi, class-validator with `whitelist`) before reaching the ORM; no `create(req.body)` or `Object.assign(model, req.body)` | mass assignment | CWE-915 |
| N9 | Deep merges of request JSON guard `__proto__`, `constructor`, `prototype` | prototype pollution | CWE-1321 |
| N10 | Cookie sessions: `httpOnly`, `secure`, `sameSite`; state-changing routes have CSRF protection or rely only on bearer tokens | CSRF | CWE-352 |
| N11 | JWT verify pins `algorithms`, never uses `jwt.decode` for auth, secret not a literal | auth | CWE-347, CWE-798 |
| N12 | CORS does not reflect arbitrary origins with credentials | CORS | CWE-942 |
| N13 | helmet (or equivalent headers), `x-powered-by` disabled, body size limits | headers | OWASP A02:2025 |
| N14 | Login and reset endpoints rate limited | brute force | CWE-307 |
| N15 | Error handler does not return stack traces in production | info leak | CWE-209, OWASP A10:2025 |
| N16 | Express version is not 2.x or 3.x; no `insecureHTTPParser` | outdated / smuggling | CWE-1104, CWE-444 |
| N17 | Secrets come from env or a secret manager, not committed `.env` or literals | secrets | CWE-798 |

Sources: [primary reference](https://expressjs.com/en/advanced/best-practice-security.html), [primary reference](https://nodejs.org/en/learn/getting-started/security-best-practices), [primary reference](https://docs.nestjs.com/techniques/validation), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html).

## Sources of untrusted input

| Framework | Sources |
| --- | --- |
| Express / Koa | `req.body`, `req.query`, `req.params`, `req.headers`, `req.cookies`, `ctx.request.body`, `ctx.query`, `ctx.params` |
| Fastify | `request.body`, `request.query`, `request.params`, `request.headers` |
| NestJS | `@Body()`, `@Query()`, `@Param()`, `@Headers()`, `@Req()` |
| Hono | `c.req.json()`, `c.req.query()`, `c.req.param()`, `c.req.header()`, `c.req.parseBody()` |
| Any | WebSocket messages, queue payloads, webhook bodies, uploaded file names |

## Sinks

| Class | Sink |
| --- | --- |
| SQL | `query(` / `raw(` / `$queryRawUnsafe` / `$executeRawUnsafe` / `sequelize.query` / `knex.raw` with a built string |
| NoSQL | `find(req.body)`, `$where`, operators passed straight from JSON (`{ "$ne": null }`) |
| Command | `exec`, `execSync`, `spawn(..., { shell: true })` |
| Code | `eval`, `new Function`, `vm.runInNewContext`, `vm.runInThisContext`, `_.template` / `ejs.render` / `pug.compile` / `handlebars.compile` on user templates |
| Path | `fs.readFile`, `createReadStream`, `res.sendFile`, `res.download`, `path.join(base, userValue)` |
| SSRF | `fetch`, `axios`, `got`, `http.request`, `undici.request` with a user URL |
| Redirect | `res.redirect(req.query.x)` |
| Deserialization | `node-serialize` `unserialize`, `js-yaml` `load` with non-default schemas, `funcster` |
| Merge | `_.merge`, `_.defaultsDeep`, `$.extend(true, ...)`, hand-written recursive merge |

## ripgrep patterns

```bash
# SQL built from strings or template literals
$RG -t js -t ts -e '(query|raw|execute)\s*\(\s*`[^`]*\$\{' -e '\$(queryRawUnsafe|executeRawUnsafe)\(' -e 'sequelize\.query\(\s*[`"\x27][^`"\x27]*(\+|\$\{)'
# Command execution
$RG -t js -t ts -e '\b(exec|execSync)\s*\(' -e 'shell\s*:\s*true' -e 'require\(\s*[\x27"]child_process[\x27"]\s*\)'
# Code execution
$RG -t js -t ts -e '\beval\s*\(' -e 'new\s+Function\s*\(' -e '\bvm\.(runIn|compileFunction|Script)'
# Path traversal candidates
$RG -t js -t ts -e '(sendFile|download|createReadStream|readFile(Sync)?)\s*\([^)]*req\.(query|params|body)' -e 'path\.(join|resolve)\([^)]*req\.'
# SSRF candidates
$RG -t js -t ts -e '(fetch|axios(\.get|\.post)?|got|request|undici\.request)\s*\(\s*req\.(query|body|params)' -e '(fetch|axios\.get)\s*\(\s*(url|target|href|link)\b'
# Mass assignment
$RG -t js -t ts -e '\.(create|update|insert|save|upsert|findOneAndUpdate|updateOne)\s*\(\s*(req|ctx\.request)\.body\s*\)' -e 'Object\.assign\([^,]+,\s*req\.body' -e '\.\.\.req\.body' -e 'data\s*:\s*(req|ctx\.request)\.body\b'
# NestJS ValidationPipe without whitelist
$RG -t ts -e 'new\s+ValidationPipe\s*\(\s*\)' -e 'ValidationPipe\(\{(?![^}]*whitelist)'  --pcre2
# Prototype pollution
$RG -t js -t ts -e '_\.(merge|defaultsDeep|set)\s*\([^)]*req\.' -e '\[\s*key\s*\]\s*=' -e '__proto__'
# JWT misuse
$RG -t js -t ts -e 'jwt\.decode\(' -e 'jwt\.verify\([^)]*\)\s*$' -e 'algorithms\s*:\s*\[[^\]]*none'
# CORS reflecting origin with credentials
$RG -t js -t ts -e 'origin\s*:\s*(true|\*|\(origin)' -e 'credentials\s*:\s*true'
# Express hardening
$RG -t js -t ts -e 'helmet\(' -e 'x-powered-by' -e 'insecureHTTPParser' -e 'express\.(json|urlencoded)\(\s*\{[^}]*limit'
# CSRF: state-changing routes with cookie sessions and no csrf middleware
$RG -t js -t ts -e '(express-session|cookie-session|@fastify/session|@fastify/secure-session)' -e '(csurf|csrf-csrf|@fastify/csrf-protection|lusca)'
# Hard-coded secrets
$RG -t js -t ts -e '(secret|apiKey|api_key|password|token)\s*[:=]\s*[\x27"][^\x27"]{12,}[\x27"]'
```

A pattern hit is `confidence: possible` until you read the call site and trace the value back to a source.

## Conditional Node mechanism pairs

These small pairs isolate individual mechanisms. They are not complete handlers or copy-ready authorization, validation, filesystem, process or SSRF implementations. Read [the selected-stack Workers pairs](../workers-boundaries.md) for concrete Supabase/R2/default boundaries. Any helper named `safeName`, schema, model or database client below requires the real project implementation. Host filesystem and shell APIs do not become Starter backend defaults.

**SQL injection (pg)**

```js
// vulnerable
const r = await db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
// fixed
const r = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
```

**Command injection**

```js
// vulnerable: exec spawns a shell
exec(`convert ${req.query.file} out.png`);
// fixed: no shell, argument array, and validate the name
execFile('convert', ['--', safeName(req.query.file), 'out.png']);
```

**Path traversal**

```js
// vulnerable
res.sendFile(path.join(UPLOADS, req.params.name));
// fixed
const p = path.resolve(UPLOADS, req.params.name);
if (!p.startsWith(UPLOADS + path.sep)) return res.status(400).end();
res.sendFile(p);
```

The lexical prefix pair above does not stop symlinks or concurrent filesystem changes. An actual host-filesystem implementation needs stable canonical-directory and no-follow/race controls; otherwise it remains an unresolved traversal boundary. Workers uses owner-resolved R2 keys.

**Mass assignment (Prisma)**

```ts
// vulnerable: role, isAdmin, ownerId all writable
await prisma.user.update({ where: { id }, data: req.body });
// fixed: validate and pick allowed fields
const { name, bio } = UpdateProfile.parse(req.body);
await prisma.user.update({ where: { id: session.userId }, data: { name, bio } });
```

**Missing ownership check (IDOR)**

```js
// vulnerable
app.get('/invoices/:id', auth, async (req, res) => res.json(await Invoice.findById(req.params.id)));
// fixed
app.get('/invoices/:id', auth, async (req, res) => {
  const inv = await Invoice.findOne({ _id: req.params.id, ownerId: req.user.id });
  if (!inv) return res.sendStatus(404);
  res.json(inv);
});
```

**SSRF**

```js
// vulnerable
const r = await fetch(req.query.url);
// fixed: allowlisted hosts, no redirects (resolve and check IPs too when hosts are user-chosen)
const u = new URL(req.query.url);
if (!ALLOWED_HOSTS.has(u.hostname)) return res.sendStatus(400);
const r = await fetch(u, { redirect: 'manual' });
if (r.status >= 300 && r.status <= 399) { await r.body?.cancel(); throw new Error('redirect-refused'); }
```

**NestJS validation**

```ts
// vulnerable: extra fields pass through to the entity
app.useGlobalPipes(new ValidationPipe());
// fixed
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
```

**Prototype pollution**

```js
// vulnerable
function merge(t, s) { for (const k in s) t[k] = typeof s[k] === 'object' ? merge(t[k] || {}, s[k]) : s[k]; return t; }
// fixed
function merge(t, s) {
  for (const k of Object.keys(s)) {
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
    t[k] = s[k] && typeof s[k] === 'object' ? merge(Object.hasOwn(t, k) ? t[k] : Object.create(null), s[k]) : s[k];
  }
  return t;
}
```

The URL pair also needs scheme, credential, port, approved-origin, DNS/private-network and response/time controls for its actual runtime. It is not a general URL-fetching security solution. The Workers pair uses a fixed server-selected origin.

## Dependency audit for this ecosystem

1. `osv-scanner scan -r .` covers package-lock.json, pnpm-lock.yaml, yarn.lock, bun.lock [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/).
2. Fallback: `npm audit --omit=dev --json` (needs package-lock.json); never `npm audit fix` [primary reference](https://docs.npmjs.com/cli/commands/npm-audit).
3. `npm audit signatures` only when packages are installed in the throwaway copy [primary reference](https://docs.npmjs.com/cli/commands/npm-audit).
4. Flag `npm install` in CI or Dockerfiles where `npm ci` should be used, and missing lockfiles [primary reference](https://nodejs.org/en/learn/getting-started/security-best-practices).

## Sources

[primary reference](https://expressjs.com/en/advanced/best-practice-security.html), [primary reference](https://nodejs.org/en/learn/getting-started/security-best-practices), [primary reference](https://docs.nestjs.com/techniques/validation), [primary reference](https://docs.npmjs.com/cli/commands/npm-audit), [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html), [primary reference](https://owasp.org/Top10/2025/)
