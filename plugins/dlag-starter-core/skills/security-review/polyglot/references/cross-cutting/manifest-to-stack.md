# Manifest to stack id map

> **Read-only method.** Security Review uses Read, Grep, Glob and Skill only. Commands below are inert reference for a separately authorized caller with the required tools. Do not execute, save files, install, browse, read credentials, contact providers, or alter Git from this role. Return findings in chat. Use the local [review contract](../review-contract.md) for scope, data and output restrictions.


Loaded by [guides/00-scoping-and-ecosystem-detection.md](../../guides/00-scoping-and-ecosystem-detection.md). This table is what `scripts/detect_ecosystems.py` implements. Use it to check the script's output by hand, or to classify a folder when the script cannot run.

## Stack ids

| Stack id | Detected from | Version reported | Framework details recorded |
| --- | --- | --- | --- |
| `nextjs` | `package.json` with `next` in any dependency section | resolved `next` version from the nearest lockfile, else the cleaned spec | `next`, `react` |
| `react` | `package.json` with `react`, without `next` and without `@sveltejs/kit` | resolved `react` | react-native, expo, vite, remix, react-router, tanstack-start, gatsby |
| `sveltekit` | `package.json` with `@sveltejs/kit` | resolved `@sveltejs/kit` | `svelte` |
| `svelte` | `package.json` with `svelte`, without `@sveltejs/kit` | resolved `svelte` | |
| `node-server` | `package.json` with a server framework (express, fastify, @nestjs/core, hono, koa, @hapi/hapi, and others), or a non-frontend package with runtime dependencies or an entry point; `deno.json` / `deno.jsonc` without `package.json` | Node version from `engines.node`, `volta.node`, `.nvmrc`, or `.node-version` | server frameworks with resolved versions; `runtime` node, bun, or deno |
| `python` | `pyproject.toml` with `[project]`, `[tool.poetry]`, or `[build-system]`; `requirements*.txt` / `.in`; `setup.py`; `setup.cfg`; `Pipfile`; `manage.py`; `environment.yml` | `requires-python`, poetry `python`, `.python-version`, or `runtime.txt` | django, djangorestframework, django-ninja, fastapi, flask, starlette, litestar, celery, sqlalchemy, jinja2, others; versions from uv.lock, poetry.lock, pdm.lock, Pipfile.lock |
| `go` | `go.mod` | `toolchain` or `go` directive | gin, echo, fiber, chi, gorilla/mux, grpc, gorm, sqlx; `net/http` when no framework and a `.go` file imports it |
| `rust` | `Cargo.toml` with `[package]` (pure `[workspace]` roots are skipped; members are found on their own) | `rust-version`, else `rust-toolchain(.toml)` channel | axum, actix-web, rocket, warp, poem, tonic, sqlx, diesel, sea-orm, tokio, tower-http; versions from Cargo.lock |
| `ruby` | `Gemfile` (or a `.gemspec`) | `ruby` line in Gemfile, else `.ruby-version` | rails, sinatra, hanami, grape, roda, devise, pundit, cancancan; versions from Gemfile.lock |
| `php` | `composer.json`; or `.php` files outside any composer project (reported per top-level folder as `plain-php`) | `require.php` | laravel, lumen, symfony, slim, cakephp, yii2, codeigniter, laminas, drupal, wordpress, twig; versions from composer.lock |
| `java-kotlin` | `pom.xml`, `build.gradle`, `build.gradle.kts` | `java.version`, `maven.compiler.release`, Gradle toolchain, `sourceCompatibility`, `jvmToolchain` | spring-boot (version from parent or plugin), spring-security, quarkus, micronaut, ktor, vertx, dropwizard, javalin; `languages` Java or Kotlin |
| `dotnet` | `*.csproj`, `*.fsproj`, `*.vbproj` | first `TargetFramework(s)` (for example `net10.0` reported as `10.0`) | aspnetcore (Web, Razor, Blazor SDKs), efcore, newtonsoft-json, dapper, microsoft-identity-web; versions from PackageReference or Directory.Packages.props |
| `other` | `mix.exs`, `pubspec.yaml`, `Package.swift`, `CMakeLists.txt`, `meson.build`, `build.zig`, `stack.yaml`, `dune-project`, `Project.toml`, `DESCRIPTION`, `cpanfile`, `build.sbt`, `deps.edn`, `project.clj`; or source files with no manifest at all | none | `language` |

A folder can hold several ids: a Next.js app with a custom Express server is both `nextjs` and `node-server`.

## Skipped while walking

`node_modules`, `vendor`, `.git`, `dist`, `build`, `target` (required), plus `.venv`, `venv`, `__pycache__`, `.tox`, `.nox`, tool caches, `.next`, `.nuxt`, `.svelte-kit`, `.turbo`, `coverage`, `.terraform`, `.gradle`, `obj`, `out`, `.output`, `.vercel`, `.serverless`, IDE folders, `Pods`, `bower_components`. Symlinked folders are never followed. Agent/credential-store folders and child folders with any `.git` entry are skipped without reading their Git config or pointer. This includes embedded repositories and submodules; review them only as separately supplied explicit scopes. Human library/notes and root notes are excluded; technical library/knowledge/private and src/private source remain eligible. Add owner-selected directory exclusions with `--exclude NAME`. Byte/file/entry limits and actual misses appear as coverage caps/warnings.

## Output contract

- `stacks`: exactly `[{"id", "version", "paths"}]`, matching `supplied scope evidence`. Paths are repo-relative POSIX; `.` is the root. Nested paths of the same id collapse to the outermost. `version` is the most common version across that id's paths.
- `details.<id>[]`: per folder `path`, `version`, `version_source`, `frameworks[{name, version, spec, source}]`, `manifests`, plus `runtime`, `languages`, `target_framework`, or `note` when relevant. `source: manifest` means the version came from a spec, not a lockfile. Only bounded numeric versions reach output; URL/path/arbitrary version specs become unknown and module values are omitted.
- `routing.security-review`: local `framework_paths` and conditional `backend_stacks` hints for the same registered owner. Unsupported runtimes remain scope differences; this does not dispatch another agent or select a framework.
- `infra`: source-file locators for Dockerfiles, compose, workflows, Terraform, Helm and Kubernetes. Credential/env paths are intentionally not inventoried; an empty `env_files` value is not proof that no such files exist.
- `languages`, `language_file_counts`, `coverage`, `warnings`.

Sources: [primary reference](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/) (which lockfiles carry exact versions), [primary reference](https://docs.github.com/en/actions/reference/security/secure-use).
