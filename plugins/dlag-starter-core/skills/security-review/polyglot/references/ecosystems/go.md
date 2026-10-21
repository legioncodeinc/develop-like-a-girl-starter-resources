# Go reference (net/http, Gin, Echo, Fiber)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.

> **Conditional reference.** These concrete pairs explain security mechanisms in existing supplied code. They do not select this runtime for Starter or grant execution. Framework defaults must be checked for the installed version.


Loaded by [guides/03-go.md](../../guides/03-go.md). Stack id `go`. `$RG` is defined in [../cross-cutting/tool-commands.md](../cross-cutting/tool-commands.md). Library names in sink tables are search hints; a hit becomes a finding only after the call site is read.

## Checklist

| # | Check | gosec rule | Refs |
| --- | --- | --- | --- |
| G1 | SQL is never built with `fmt.Sprintf` or `+` and passed to `Query`, `Exec`, `QueryRow`, `Raw`, `Where` | G201, G202 | CWE-89 |
| G2 | `exec.Command` is not given `sh -c` plus user data, and the binary name is not user controlled | G204 | CWE-78 |
| G3 | File paths from requests are cleaned and confined (`filepath.Clean` alone does not confine); archive extraction checks entry names | G304, G305 | CWE-22 |
| G4 | `http.Get(userURL)` and clients with user URLs are allowlisted and do not follow redirects blindly | G107 | CWE-918 |
| G5 | `http.Server` sets `ReadHeaderTimeout` (and read/write timeouts); no bare `http.ListenAndServe` in production | G112, G114 | CWE-400 |
| G6 | `tls.Config{InsecureSkipVerify: true}` is absent outside tests | G402 | CWE-295 |
| G7 | `math/rand` is not used for tokens, ids, or secrets; no MD5/SHA1/DES/RC4 for security | G401 to G404 | CWE-338, CWE-327 |
| G8 | HTML is rendered with `html/template`, not `text/template`; no `template.HTML(userInput)` | none | CWE-79 |
| G9 | Every handler group that needs auth is wrapped by auth middleware; ownership is checked per object | none | CWE-862, CWE-639 |
| G10 | Request binding (`c.Bind`, `c.ShouldBindJSON`, `c.BodyParser`, `json.NewDecoder`) targets a request DTO, not the database model with role or owner fields | none | CWE-915 |
| G11 | Cookie sessions on state-changing routes use CSRF middleware or SameSite plus origin checks | none | CWE-352 |
| G12 | No hard-coded credentials | G101 | CWE-798 |
| G13 | Errors from security-relevant calls are handled | G104 | OWASP A10:2025 |

Sources: [primary reference](https://github.com/securego/gosec), [primary reference](https://pkg.go.dev/html/template), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html).

Thin spot: Gin, Echo, and Fiber CSRF and binding defaults are not in these reference notes. Confirm in the code which middleware is registered; do not assume a framework default [version-sensitive research notes](../research/distilled-polyglot-security.md).

## Sources of untrusted input

`r.URL.Query()`, `r.FormValue`, `r.PostForm`, `r.Body`, `r.Header`, `r.Cookie`, `mux.Vars(r)`, `chi.URLParam`; Gin `c.Param`, `c.Query`, `c.PostForm`, `c.Bind*`; Echo `c.Param`, `c.QueryParam`, `c.FormValue`, `c.Bind`; Fiber `c.Params`, `c.Query`, `c.FormValue`, `c.BodyParser`.

## Sinks

| Class | Sink |
| --- | --- |
| SQL | `db.Query`, `db.Exec`, `db.QueryRow`, `sqlx` `Select` / `Get`, gorm `Raw`, `Exec`, `Where(string)`, `Order(string)` with built strings |
| Command | `exec.Command`, `exec.CommandContext`, `syscall.Exec` |
| Path | `os.Open`, `os.ReadFile`, `http.ServeFile`, `filepath.Join(base, user)`, `archive/zip` and `archive/tar` extraction |
| SSRF | `http.Get`, `http.Post`, `client.Do(req)` with user URL |
| Template | `text/template` for HTML, `template.HTML(`, `template.JS(`, `template.URL(` |
| Redirect | `http.Redirect(w, r, userURL, ...)`, `c.Redirect(...)` |

## ripgrep patterns

```bash
# SQL building
$RG -t go -e '(Query|QueryRow|Exec|QueryContext|ExecContext|Raw|Select|Get)\(\s*fmt\.Sprintf' -e '(Query|Exec|Raw)\([^)]*"\s*\+\s*\w' -e '\.(Where|Order|Group|Having)\(\s*fmt\.Sprintf'
# Command execution
$RG -t go -e 'exec\.Command(Context)?\(' -e '"(sh|bash|cmd)"\s*,\s*"(-c|/c)"'
# Paths and archives
$RG -t go -e 'http\.ServeFile\(' -e 'os\.(Open|ReadFile|Create|OpenFile)\([^)]*(r\.|c\.)' -e 'filepath\.Join\([^)]*(r\.|c\.)' -e '(zip\.OpenReader|tar\.NewReader)\('
# SSRF
$RG -t go -e 'http\.(Get|Post|Head)\(\s*\w' -e 'http\.NewRequest(WithContext)?\([^)]*(url|target|r\.URL\.Query)'
# Server timeouts
$RG -t go -e 'http\.ListenAndServe(TLS)?\(' -e 'ReadHeaderTimeout'
# TLS and crypto
$RG -t go -e 'InsecureSkipVerify\s*:\s*true' -e '"math/rand"' -e '"crypto/(md5|sha1|des|rc4)"'
# Templates
$RG -t go -e '"text/template"' -e 'template\.(HTML|JS|URL|HTMLAttr|CSS)\('
# Binding into models
$RG -t go -e '\.(Bind|ShouldBind|ShouldBindJSON|BindJSON|BodyParser)\(\s*&' -e 'json\.NewDecoder\(r\.Body\)\.Decode\(\s*&'
# CSRF middleware presence
$RG -t go -e '(gorilla/csrf|csrf\.Protect|middleware\.CSRF|fiber/v\d/middleware/csrf|gin-contrib/csrf|CrossOriginProtection)'
# Hard-coded secrets
$RG -t go -e '(?i)(secret|password|apikey|api_key|token)\s*(:=|=)\s*"[^"]{12,}"'
```

## Vulnerable vs fixed mechanism pairs

These excerpts isolate individual mechanisms and omit project imports, full request validation and deployment configuration. They are conditional review knowledge, not Starter defaults or complete runnable apps. Review the actual fixed path and neighboring permission/error controls before accepting remediation. No example execution or current framework-default verification is implied.

**SQL**

```go
// vulnerable
rows, err := db.Query(fmt.Sprintf("SELECT * FROM users WHERE email = '%s'", r.FormValue("email")))
// fixed
rows, err := db.Query("SELECT * FROM users WHERE email = $1", r.FormValue("email"))
```

**Command**

```go
// vulnerable
out, _ := exec.Command("sh", "-c", "git log "+r.URL.Query().Get("ref")).Output()
// fixed: no shell, refuse option-like values
ref := r.URL.Query().Get("ref")
if ok, _ := regexp.MatchString(`^[a-f0-9]{40}$`, ref); !ok { http.Error(w, "bad ref", 400); return }
out, err := exec.CommandContext(ctx, "git", "log", "-1", ref, "--").Output()
// ctx must have an actual deadline; cap stdout/stderr in the real handler.
```

**Path traversal**

```go
// vulnerable
http.ServeFile(w, r, filepath.Join("/srv/files", r.URL.Query().Get("name")))
// fixed
base := "/srv/files"
p := filepath.Join(base, filepath.Clean("/"+r.URL.Query().Get("name")))
if !strings.HasPrefix(p, base+string(os.PathSeparator)) { http.NotFound(w, r); return }
http.ServeFile(w, r, p)
```

**Server timeouts**

```go
// vulnerable
log.Fatal(http.ListenAndServe(":8080", mux))
// fixed
srv := &http.Server{Addr: ":8080", Handler: mux, ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout: 15 * time.Second, WriteTimeout: 15 * time.Second, IdleTimeout: 60 * time.Second}
log.Fatal(srv.ListenAndServe())
```

**Binding into a model (mass assignment)**

```go
// vulnerable: User has Role and IsAdmin fields
var u models.User
c.ShouldBindJSON(&u); db.Model(&current).Updates(u)
// fixed
type UpdateProfile struct { Name string `json:"name" binding:"max=80"` }
var in UpdateProfile
if err := c.ShouldBindJSON(&in); err != nil { c.AbortWithStatus(400); return }
db.Model(&current).Updates(map[string]any{"name": in.Name})
```

**Templates**

```go
// vulnerable
t := texttemplate.Must(texttemplate.New("x").Parse(`<p>{{.}}</p>`)); t.Execute(w, comment)
// fixed
t := htmltemplate.Must(htmltemplate.New("x").Parse(`<p>{{.}}</p>`)); t.Execute(w, comment)
```

Host-path examples do not by themselves close symlink/concurrent-path races. Confirm the actual stable canonical base and no-follow handling, with a fresh authorization check before file delivery. Command examples still require fixed binaries, validated argument formats, option semantics, timeout/output bounds and handled failures. These APIs are not Workers defaults.

## Dependency audit for this ecosystem

1. `osv-scanner scan -r .` can read go.mod; actual-version call-analysis defaults must be verified and disabled unless separate project-evaluation approval exists [primary reference](https://google.github.io/osv-scanner/usage/).
2. Fallback or second opinion: `govulncheck ./...` (reachability built in), `govulncheck -json ./...` for raw output [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck).
3. Static analysis: `gosec -fmt json -out gosec.json ./...` [primary reference](https://github.com/securego/gosec).
4. A vulnerability govulncheck reports as called is `confirmed` reachability; one only in go.mod is `possible` and capped at `medium` unless you trace a call.

## Sources

[primary reference](https://github.com/securego/gosec), [primary reference](https://pkg.go.dev/html/template), [primary reference](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck), [primary reference](https://google.github.io/osv-scanner/usage/), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)
