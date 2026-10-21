# Model services and environments

Start with one configuration boundary for each independently deployed application. Use environment labels for stages of that same application. A separate service with separate access or release needs gets its own Worker configuration; it should not masquerade as an environment called `backend` under a frontend app.

## Destination inventory

Record this before writing a command:

| Field | Why it matters |
| --- | --- |
| Repository and app directory | A monorepo can contain several Wrangler configurations |
| Source configuration path | Removes ambiguity from the current working directory |
| Environment selector | Distinguishes default, staging and production |
| Resolved Worker name and account | A familiar label is not proof of the target |
| Supabase project, R2 bucket and other bound resource names | A staging Worker can still accidentally point at production resources |
| Binding names, types and consuming operations | Identifies missing names without obtaining values |
| Owner and update mechanism | Prevents dashboard, CI and local files from silently competing |

Wrangler named environments create separate Worker deployments, typically using the application name with the environment suffix. Bindings and variables must be specified for each environment. Secret values also need individual provisioning. There is no inheritance of secret values from a default Worker into staging or production. Read [Wrangler environments](https://developers.cloudflare.com/workers/wrangler/environments/) before resolving a particular configuration.

For a small app, keep the default configuration for local development and add only the named hosted environments that actually exist. Do not create a remote development Worker or preview system just to fill a diagram. A Git branch does not itself define a secret environment. An existing PR preview setup needs its own documented isolation and lifecycle.

## Prevent drift

Maintain a name-only matrix showing which operation requires each binding in each environment. Compare required names against a separately authorized operator's name/type inventory. Presence does not prove a credential is valid or appropriate for that environment. An empty or stale value needs a bounded functional check by the operator, not a value dump.

Current Wrangler can declare `secrets.required` and generate types from those names. Its deploy and version-upload validation detects missing configured names. Verify that the project's locked Wrangler supports this property before adopting it. It does not establish provider permissions, protect browser imports or rotate anything. See the [configuration reference](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets).

## Personal and shared values

An ignored local `.dev.vars` file belongs to that developer. It is plaintext on disk, with no automatic remote synchronization or encrypted offline cache. Use development credentials with the smallest permitted scope. Share names and setup instructions through the repository, and values only through the team's existing approved secure process.

Where two Workers need a credential, first check whether the provider supports a separate restricted credential per consumer. If a shared value is unavoidable, enumerate every consumer and owner in the rotation record. Each per-Worker binding must be updated deliberately. Writing a reference expression into a secret does not create a cross-Worker lookup. No account-wide store or additional service is selected by this Playbook.

## Naming

Use stable, non-sensitive service names with the grouping prefix first. Keep binding names consistent across environments when they represent the same role; the values must remain environment-specific. Do not place client names, acquisition details, incidents or credentials in Worker names. The [worked example](../references/environment-naming-example.md) shows a complete name-only map and configuration fragment.
