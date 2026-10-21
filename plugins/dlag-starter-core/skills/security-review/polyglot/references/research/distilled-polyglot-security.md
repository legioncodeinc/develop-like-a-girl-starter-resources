# Version-sensitive backend review notes

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.


These dated reference observations preserve review topics and known thin spots. They are not current framework defaults, trusted tool-version approvals, live advisory status or evidence about this application. Confirm a version-sensitive claim from actual supplied source/runtime and current primary documentation before asserting it. Linked primary pages are independently accessible; no research archive or original counterpart is required. Four selected-stack references were checked during authoring; most conditional-framework details remain unverified for current releases.

## 1. Standards used in `refs`

| Fact | Source |
| --- | --- |
| OWASP Top 10:2025 IDs: A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, A10 Mishandling of Exceptional Conditions | [primary reference](https://owasp.org/Top10/2025/) |
| Deserialization of untrusted data is one class (CWE-502) across Python pickle and PyYAML load, PHP unserialize, Java ObjectInputStream and XMLDecoder, .NET BinaryFormatter and Json.NET TypeNameHandling | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) |
| BinaryFormatter "is dangerous and cannot be secured" | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) |
| SSRF minimum block list: 169.254.169.254, 127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 plus IPv6; resolve then validate the IP; disable redirects; encoded IP forms bypass string checks; IMDSv2 | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) |
| Mass assignment is also "autobinding" and "object injection"; the general fix is binding to DTOs or explicit allowlists | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html) |
| Command injection: shell-spawning APIs per language and the safer list-argument APIs; argument injection survives even without a shell | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) |

## 2. Ecosystem facts

### Node.js servers

| Fact | Source |
| --- | --- |
| Express 2.x and 3.x are unmaintained; use helmet; disable x-powered-by; secure, httpOnly session cookies; validate redirect hosts; rate limit login by username plus IP | [primary reference](https://expressjs.com/en/advanced/best-practice-security.html) |
| Node threats with CWE ids: DoS CWE-400 (server timeouts), request smuggling CWE-444 (never `insecureHTTPParser`), timing CWE-208 (`crypto.timingSafeEqual`), malicious modules CWE-1357 (`npm ci`, `--ignore-scripts`), prototype pollution CWE-1321 (`Object.create(null)`, `Object.hasOwn`, schema validation) | [primary reference](https://nodejs.org/en/learn/getting-started/security-best-practices) |
| `npm config set min-release-age` exists from npm v11.10.0 as a dependency cooldown | [primary reference](https://nodejs.org/en/learn/getting-started/security-best-practices) |
| NestJS `ValidationPipe` `whitelist: true` strips undecorated properties; `forbidNonWhitelisted` rejects them | [primary reference](https://docs.nestjs.com/techniques/validation) |
| `child_process.exec` spawns a shell; `execFile` does not | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) |
| `npm audit` needs a lockfile; `--omit=dev`; `audit fix --force` can jump majors; `npm audit signatures` checks provenance | [primary reference](https://docs.npmjs.com/cli/commands/npm-audit) |

Thin spot: Fastify, Hono, and Koa have no dedicated official security page in these reference notes. Their guidance in this skill is the shared Node and OWASP material applied to each framework's routing and body parsing; framework-specific defaults are not asserted.

### Python

| Fact | Source |
| --- | --- |
| Django querysets are parameterized; `raw()`, `extra()`, `RawSQL()` are the injection-prone APIs | [primary reference](https://docs.djangoproject.com/en/stable/topics/security/) |
| Django `mark_safe` and `|safe` bypass autoescape; `@csrf_exempt` removes CSRF; `DEBUG=False`; `ALLOWED_HOSTS`; reading `HTTP_HOST` directly bypasses host validation; `SECURE_*` settings | [primary reference](https://docs.djangoproject.com/en/stable/topics/security/) |
| Flask has no built-in CSRF; `MAX_CONTENT_LENGTH` is not set by default; set `TRUSTED_HOSTS`; `Markup` on user data and unquoted attributes cause XSS | [primary reference](https://flask.palletsprojects.com/en/stable/web-security/) |
| FastAPI protects routes only through dependencies such as `Depends(get_current_active_user)`; tutorial uses PyJWT with an explicit `algorithms=[...]` list and pwdlib Argon2 | [primary reference](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/) |
| pickle "is not secure. Only unpickle data you trust." | [primary reference](https://docs.python.org/3/library/pickle.html) |
| subprocess does not use a shell unless `shell=True` | [primary reference](https://docs.python.org/3/library/subprocess.html#security-considerations) |
| pip-audit `-r` resolves like `pip install -r`; use `--no-deps` on pinned files; exit 1 on findings | [primary reference](https://github.com/pypa/pip-audit) |

### Go

| Fact | Source |
| --- | --- |
| gosec rules: G101 creds, G107 URL from variable, G112 and G114 server timeouts, G201 and G202 SQL building, G204 subprocess, G304 file path, G305 zip slip, G401 to G404 weak crypto, G402 InsecureSkipVerify | [primary reference](https://github.com/securego/gosec) |
| html/template escapes by context; text/template does not; `template.HTML`, `template.JS`, `template.URL` bypass escaping | [primary reference](https://pkg.go.dev/html/template) |
| govulncheck reports only vulnerabilities reachable from called functions | [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck) |

Thin spot: Gin, Echo, and Fiber binding and CSRF defaults were not fetched. Treat their binding of request bodies into structs as a mass assignment candidate and confirm by reading the struct tags; do not assert framework defaults.

### Rust

| Fact | Source |
| --- | --- |
| `sqlx::query!` needs a string literal and binds `$N` or `?`; SQL built with `format!` and passed to `sqlx::query` loses binding | [primary reference](https://docs.rs/sqlx/latest/sqlx/macro.query.html) |
| cargo-audit checks Cargo.lock against RustSec; use `--file` and run outside the project for untrusted code to avoid build scripts | [primary reference](https://github.com/rustsec/rustsec/tree/main/cargo-audit) |
| osv-scanner Rust call analysis is experimental and compiles the code | [primary reference](https://google.github.io/osv-scanner/usage/) |

Thin spot: Axum and Actix extractor and CSRF behavior were not fetched. The Rust guide relies on generic patterns (SQL text building, `std::process::Command` with `sh -c`, path joins with user input, `unsafe` and `unwrap` on request data) and marks framework-default claims as needing manual confirmation.

### Ruby on Rails

| Fact | Source |
| --- | --- |
| `protect_from_forgery with: :exception` default; strong parameters; string-interpolated `where` is SQLi; `system` with one string is command injection; `Kernel#open("| cmd")` runs commands; `raw` / `html_safe` XSS; `redirect_to(params[:url])` open redirect; `send_file` path traversal; `\A` `\z` anchors; credentials.yml.enc; `rate_limit` | [primary reference](https://guides.rubyonrails.org/security.html) |
| `Marshal.load` on untrusted data can lead to RCE | [primary reference](https://ruby-doc.org/core/Marshal.html) |
| bundler-audit checks Gemfile.lock and insecure `http://` / `git://` sources | [primary reference](https://github.com/rubysec/bundler-audit) |

Thin spot: Psych `YAML.load` safety defaults were not in the fetched pages. Treat YAML loading of untrusted input as a manual-read item.

### PHP

| Fact | Source |
| --- | --- |
| Laravel models need `$fillable` or `$guarded`; `$guarded = []` unguards; `is_admin` escalation example; `preventSilentlyDiscardingAttributes` | [primary reference](https://laravel.com/docs/eloquent#mass-assignment) |
| Laravel docs fetched were 12.x with a banner that 13.x is current | [primary reference](https://laravel.com/docs/eloquent#mass-assignment) |
| `unserialize` on untrusted input is unsafe even with `allowed_classes` | [primary reference](https://www.php.net/manual/en/function.unserialize.php) |
| Symfony forms check CSRF by default; per-form `csrf_protection` can be disabled; `isCsrfTokenValid`; stateless tokens from 7.2 | [primary reference](https://symfony.com/doc/current/security/csrf.html) |
| PHP shell functions: exec, system, shell_exec, passthru, popen, backticks | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) |
| `composer audit --locked --format=json` audits the lock file without vendor | [primary reference](https://getcomposer.org/doc/03-cli.md#audit) |

### Java and Kotlin (Spring Boot)

| Fact | Source |
| --- | --- |
| Actuator exposes only `health` over HTTP by default; `exposure.include=*` exposes env, configprops, heapdump, loggers; secure with `EndpointRequest`; `show-values=always` removes sanitizing | [primary reference](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html) |
| Spring Security CSRF is on by default for unsafe methods; `csrf.disable()` is acceptable only for non-browser backends | [primary reference](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html) |
| `Runtime.exec(String)` vs `ProcessBuilder` | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) |
| Spring MVC mass assignment: `@InitBinder` allowlists or DTOs; Jackson `@JsonIgnore` | [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html) |

Thin spot: Spring Data `@Query` native query and JPA criteria injection pages were not fetched; the guide uses the generic "string concatenation into a query string" rule.

### .NET (ASP.NET Core)

| Fact | Source |
| --- | --- |
| MVC filters `[ValidateAntiForgeryToken]`, `[AutoValidateAntiforgeryToken]`, `[IgnoreAntiforgeryToken]`; minimal APIs need `AddAntiforgery` and `UseAntiforgery`; `.DisableAntiforgery()` opt-out; CSRF matters for cookie auth | [primary reference](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery) |
| A `Sec-Fetch-Site` based automatic CSRF middleware is documented for ASP.NET Core 11.0, not GA at fetch time | [primary reference](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery) |
| EF Core `FromSql`, `FromSqlInterpolated`, `ExecuteSql`, `SqlQuery` parameterize; the `Raw` variants do not | [primary reference](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries) |
| `dotnet package list --vulnerable --include-transitive --format json` (.NET 10 naming; `dotnet list package` on 9 or earlier) | [primary reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list) |

## 3. Cross-cutting tools

| Fact | Source |
| --- | --- |
| osv-scanner V2: `osv-scanner scan -r DIR`, `-L lockfile`, `--format json`, offline databases; respects .gitignore; Go call analysis on by default, Rust experimental | [primary reference](https://google.github.io/osv-scanner/usage/) |
| osv-scanner reads npm, pnpm, yarn, bun, Python locks and requirements.txt (best effort), Gemfile.lock, Cargo.lock, go.mod, pom.xml, gradle lockfiles, .NET packages.lock.json and deps.json, composer.lock | [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/) |
| pom.xml transitive resolution uses deps.dev and is off in offline mode | [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/) |
| gitleaks: `gitleaks git` scans history, `gitleaks dir` the tree; `--redact`; exit 1 on leaks; `--max-target-megabytes` skips big files | [primary reference](https://github.com/gitleaks/gitleaks) |
| gitleaks default rule shapes (AWS AKIA, GitHub ghp_, Stripe sk_live_, private key blocks, and more) | [primary reference](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml) |
| trufflehog verifies candidates by calling provider APIs; `--no-verification` disables; `--fail` exits 183 | [primary reference](https://github.com/trufflesecurity/trufflehog) |
| Semgrep `--config auto` contacts the registry with the project URL; `--metrics=off`; named rulesets verified to resolve | [primary reference](https://semgrep.dev/docs/cli-reference) |
| Opengrep is a Semgrep CE fork (LGPL 2.1), runs existing rules with `opengrep scan -f rules DIR` | [primary reference](https://github.com/opengrep/opengrep) |
| Tool versions on 2026-09-30 | [primary reference](https://docs.github.com/en/actions/reference/security/secure-use) |

## 4. CI/CD and infrastructure

| Fact | Source |
| --- | --- |
| Untrusted `${{ github.event.* }}` in `run:` is script injection; pass through `env:` | [primary reference](https://docs.github.com/en/actions/reference/security/secure-use) |
| Pin actions to full commit SHA; default GITHUB_TOKEN to read; `pull_request_target` and `workflow_run` must not check out untrusted code | [primary reference](https://docs.github.com/en/actions/reference/security/secure-use) |
| Pwn request: `pull_request_target` plus checkout of PR head plus build scripts; token in memory even without secrets; split into `pull_request` and `workflow_run` | [primary reference](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/) (2021, timeless, still the reference) |
| zizmor audits: template-injection, dangerous-triggers, unpinned-uses, excessive-permissions, artipacked, cache-poisoning, secrets-inherit, impostor-commit, and more; an installed approved zizmor binary, `--offline` | [primary reference](https://docs.zizmor.sh/audits/) |
| March 2026: Trivy v0.69.4 and trivy-action / setup-trivy tags force-pushed to credential stealers | [primary reference](https://github.com/aquasecurity/trivy/security/advisories) |
| May 2026: actions-cool/issues-helper tags moved to an imposter commit that read runner memory | [primary reference](https://docs.github.com/en/actions/reference/security/secure-use) |
| Docker: pin base by digest, multi-stage, `USER` non-root, `.dockerignore`, prefer COPY over ADD | [primary reference](https://docs.docker.com/build/building/best-practices/) |
| Compose secrets mount at `/run/secrets/<name>`; env vars leak to logs and all processes | [primary reference](https://docs.docker.com/compose/how-tos/use-secrets/) |
| `trivy config DIR` covers Terraform, Dockerfile, Kubernetes, Helm, CloudFormation; needs to download the checks bundle | [primary reference](https://trivy.dev/latest/docs/scanner/misconfiguration/) |

## 5. Generated-code review

Apply all fourteen concrete patterns in the [generated-code catalog](../cross-cutting/ai-failure-patterns.md). Do not predict this app's vulnerability rate or infer authorship from statistical studies. Confirm dependencies from actual manifest/import/lock evidence and separately authorized current registry/advisory receipts. A new name or publisher is a lead, not proof of malware.

## 6. Conflicts and open questions

- Semgrep `--config auto` is convenient but sends the project URL to the registry. This skill always names rulesets and passes `--metrics=off` [primary reference](https://semgrep.dev/docs/cli-reference).
- trufflehog's strength (verification) is a side effect in an audit. This skill defaults to `--no-verification`; verified mode only with user consent [primary reference](https://github.com/trufflesecurity/trufflehog).
- Security scanners were themselves compromised in 2026. Pin versions, use only separately authorized verified existing tools, and never run them with the user's real credentials in the environment [primary reference](https://github.com/aquasecurity/trivy/security/advisories) [primary reference](https://docs.github.com/en/actions/reference/security/secure-use).
- Framework-default thin spots are listed per ecosystem above. Where the reference notes has no source, guides say "confirm by reading the code" instead of asserting a default.
