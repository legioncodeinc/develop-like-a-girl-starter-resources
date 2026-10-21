# 08 .NET (ASP.NET Core)

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../references/review-contract.md) for scope, data and output restrictions.

> **Conditional evidence only.** This language/framework is outside Starter launch support. Read this catalog only when the owner supplied existing code in that ecosystem; do not scaffold, install, choose or deploy it. Version-sensitive defaults require confirmation for the supplied runtime. Otherwise mark this catalog N/A and retain transferable controls in the Workers backend review.


For every path under stack id `dotnet`. Loads [../references/ecosystems/dotnet.md](../references/ecosystems/dotnet.md) and [../references/cross-cutting/tool-commands.md](../references/cross-cutting/tool-commands.md).

## Steps

1. **Identify the project types** from `detect.json.details.dotnet[]`: web projects (`aspnetcore` framework from the Web, Razor, or Blazor SDK), class libraries, workers. Note `target_framework`.
2. **Read startup.** `Program.cs` (and `Startup.cs` on older apps): authentication schemes (cookie vs JWT bearer), `AddAuthorization` and any `FallbackPolicy`, `AddAntiforgery` / `UseAntiforgery`, CORS policy, `UseDeveloperExceptionPage`, `UseHsts`, `UseHttpsRedirection`, JWT `TokenValidationParameters` (D5 to D7, D13 to D15).
3. **Decide the CSRF exposure.** CSRF matters only where authentication rides in a cookie [primary reference](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery). For cookie-auth apps check the global `AutoValidateAntiforgeryTokenAttribute` filter or per-action `[ValidateAntiForgeryToken]`, and every `[IgnoreAntiforgeryToken]` / `.DisableAntiforgery()`. Do not assume the ASP.NET Core 11 automatic middleware for `net10.0` or older targets.
4. **Map endpoints.** Controllers and actions with `[Authorize]` / `[AllowAnonymous]`; minimal API `Map*` calls with `.RequireAuthorization()`; Razor Pages folders with conventions. Without a fallback policy, an endpoint with no attribute is public.
5. **Run the checklist D1 to D16** with the reference's `rg` blocks; read each production hit.
6. **Data access.** `FromSqlRaw`, `ExecuteSqlRaw`, `SqlQueryRaw` with interpolated strings are the key targets; `FromSql` and `FromSqlInterpolated` are safe [primary reference](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries). Also Dapper and ADO.NET string building (D1, D2).
7. **Deserialization.** `BinaryFormatter` and friends, Json.NET `TypeNameHandling` other than `None` (D3) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html).
8. **Binding.** Entities bound from `[FromBody]` / `[FromForm]` and saved (D8) [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html).
9. **Config and secrets.** `appsettings*.json` for real connection strings and keys (D12).
10. **Dependencies.** osv-scanner on packages.lock.json or deps.json; otherwise, only when separate owner execution authorization is present, `dotnet package list --vulnerable --include-transitive --format json` in the copy when the SDK exists (it restores packages and evaluates MSBuild files, which is project code); else a recorded cap (guide 10) [primary reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list).
11. **Write findings** per guide 14 with `tags: ["dotnet", "aspnetcore", "<class>"]`.

## Done when

Startup was read, the CSRF exposure decision is in notes, every endpoint has an auth verdict, every checklist item has a result, and every production hit was read.

## Sources

[primary reference](https://learn.microsoft.com/en-us/aspnet/core/security/anti-request-forgery), [primary reference](https://learn.microsoft.com/en-us/ef/core/querying/sql-queries), [primary reference](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html), [primary reference](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html)
