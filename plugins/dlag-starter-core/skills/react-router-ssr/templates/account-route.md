# One account route

This is an adaptation recipe. Supply the application's Supabase/auth and persistence services before compiling it. Their contract is explicit below; no placeholder grants access or returns invented success.

```tsx
import { data, Form, useNavigation } from "react-router";
import type { Route } from "./+types/account";
import { requireAccount, saveOwnDisplayName } from "../services/account.server";

export async function loader({ request, context }: Route.LoaderArgs) {
  // requireAccount validates identity, owns cookie refresh and returns safe account fields.
  const account = await requireAccount(request, context.cloudflare.env);
  return data({ displayName: account.displayName }, { headers: account.headers });
}

export async function action({ request, context }: Route.ActionArgs) {
  const account = await requireAccount(request, context.cloudflare.env);
  const headers = account.headers;
  headers.set("Cache-Control", "private, no-store");
  const origin = request.headers.get("Origin");
  if (request.method !== "POST" || origin !== new URL(request.url).origin) {
    throw new Response("Request refused", { status: 403, headers });
  }
  const form = await request.formData();
  const raw = form.get("displayName");
  const displayName = typeof raw === "string" ? raw.trim() : "";
  if (!displayName || displayName.length > 80) {
    return data({ error: "Enter a name from 1 to 80 characters.", displayName },
      { status: 400, headers });
  }
  // Query must use the verified account ID and preserve RLS. Never trust a form user ID.
  await saveOwnDisplayName(account, displayName);
  return data({ error: null, displayName }, { headers });
}

export default function Account({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const pending = navigation.state === "submitting";
  const error = actionData?.error;
  return <Form method="post" aria-busy={pending}>
    <label htmlFor="display-name">Display name</label>
    <input id="display-name" name="displayName" required maxLength={80}
      defaultValue={actionData?.displayName ?? loaderData.displayName}
      aria-invalid={Boolean(error)} aria-describedby={error ? "name-error" : undefined} />
    {error ? <p id="name-error" role="alert">{error}</p> : null}
    <button disabled={pending}>{pending ? "Saving..." : "Save"}</button>
  </Form>;
}
```

Required service contract: requireAccount returns verified identity, safe displayName and response Headers with private/no-store plus refreshed cookies. On denied/expired identity it throws a safe response with the same header policy. saveOwnDisplayName enforces ownership on the database operation, validates its result and throws a safe failure response carrying those headers. Add the route's ErrorBoundary and headers export using the project's generated types, preserving loader/action headers and repeated cookies; see [route boundaries](../guides/route-boundaries.md). Use the project's stronger CSRF token policy where selected; the Origin check here addresses this same-origin form recipe only. The host must adapt and typecheck this incomplete integration in the actual project.
