# 06 PHP (Laravel, Symfony, plain PHP)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.

> **Conditional evidence only.** This language/framework is outside Starter launch support. Read this catalog only when the owner supplied existing code in that ecosystem; do not scaffold, install, choose or deploy it. Version-sensitive defaults require confirmation for the supplied runtime. Otherwise mark this catalog N/A and retain transferable controls in the Workers backend review.


For every path under stack id `php`. Loads [../references/ecosystems/php.md](../references/ecosystems/php.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md).

## Steps

1. **Identify the flavor** from `detect.json.details.php[].frameworks`: laravel, symfony, another framework, or `plain-php` (PHP files without composer). Plain PHP gets the full checklist with extra weight on PH5 to PH8 and PH14 to PH16, since there is no framework doing escaping or CSRF for you.
2. **Read the entry and config.**
   - Laravel: `routes/web.php`, `routes/api.php`, `bootstrap/app.php` (middleware and CSRF exceptions), `app/Http/Middleware`, `.env.example` vs any committed `.env`, `config/app.php` debug setting.
   - Symfony: `config/packages/security.yaml` (firewalls, `access_control`), `config/packages/framework.yaml` (`csrf_protection`), controllers with `#[Route]` and `#[IsGranted]` [primary reference](https://symfony.com/doc/current/security/csrf.html).
   - Plain PHP: every file reachable from the web root; there is no router, so each `.php` file is an entry point.
3. **Map routes and auth.** Route table with middleware (`auth`, `auth:sanctum`, `can:`), Symfony `access_control` and voters, or plain-PHP session checks at the top of each file (PH13).
4. **Run the checklist PH1 to PH16** with the reference's `rg` blocks; read each production hit.
5. **SQL.** Raw query builders and string-built SQL (PH1, PH2). In Laravel, `whereRaw` with `?` bindings is fine; interpolation is not.
6. **Mass assignment.** Models with `$guarded = []` and controllers passing `$request->all()` to `create`, `fill`, `update` (PH3, PH4) [primary reference](https://laravel.com/docs/eloquent#mass-assignment).
7. **Execution and inclusion.** `unserialize` on user data (PH6) [primary reference](https://www.php.net/manual/en/function.unserialize.php); `include` with user paths, `eval`, shell functions (PH5, PH7) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html).
8. **Output escaping.** Blade `{!! !!}`, Twig `|raw`, plain `echo $_GET[...]` (PH10).
9. **CSRF.** Laravel CSRF exceptions; Symfony forms with `csrf_protection` false; plain PHP state-changing POST handlers without a token (PH11) [primary reference](https://symfony.com/doc/current/security/csrf.html).
10. **Debug and secrets.** `APP_DEBUG=true` in a committed env file or production config; committed `.env` (PH12).
11. **Dependencies.** osv-scanner on composer.lock, or `composer audit --locked --format=json`; plain PHP without composer gets a NOT RUN cap (guide 10) [primary reference](https://getcomposer.org/doc/03-cli.md#audit).
12. **Write findings** per guide 14 with `tags: ["php", "<framework>", "<class>"]`.

## Done when

Routes or entry files have auth verdicts, CSRF configuration was read, every checklist item has a result in notes, and every production hit was read.

## Sources

[primary reference](https://laravel.com/docs/eloquent#mass-assignment), [primary reference](https://www.php.net/manual/en/function.unserialize.php), [primary reference](https://symfony.com/doc/current/security/csrf.html), [primary reference](https://getcomposer.org/doc/03-cli.md#audit), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)
