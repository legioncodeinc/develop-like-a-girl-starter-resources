// Server-only boundary example. No provider, environment or filesystem access.
// Adapt the type to the project's existing generated Worker types.
export type StarterEnv = {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  RESEND_API_KEY?: string;
  TRANSACTIONAL_FROM?: string;
};

type BindingName = keyof StarterEnv;

function requiredString(env: StarterEnv, name: BindingName): string {
  const value = env[name];
  if (typeof value !== 'string' || value.trim().length === 0) {
    // The name is a fixed application constant; never include the value.
    throw new Error(`Missing or invalid binding: ${name}`);
  }
  return value;
}

// This example supports hosted *.supabase.co projects and modern publishable
// keys only. It intentionally rejects legacy JWTs, secret keys and custom hosts.
// Verify the exact project is owner-approved separately; shape is not ownership.
export function publicSupabaseConfig(env: StarterEnv) {
  const rawUrl = requiredString(env, 'SUPABASE_URL');
  const publishableKey = requiredString(env, 'SUPABASE_PUBLISHABLE_KEY');
  if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(publishableKey)) {
    throw new Error('Invalid public Supabase key configuration');
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error('Invalid public Supabase URL configuration');
  }
  if (
    parsed.protocol !== 'https:' ||
    !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.supabase\.co$/.test(parsed.hostname) ||
    parsed.username !== '' || parsed.password !== '' || parsed.port !== '' ||
    parsed.pathname !== '/' || parsed.search !== '' || parsed.hash !== '' ||
    (rawUrl !== parsed.origin && rawUrl !== `${parsed.origin}/`)
  ) {
    throw new Error('Invalid public Supabase URL configuration');
  }
  return { url: parsed.origin, publishableKey };
}

// Keep this return value inside the server operation. Never serialize or log it.
// Presence checks do not prove sender verification or provider authorization.
export function requireTransactionalBindings(env: StarterEnv) {
  return {
    apiKey: requiredString(env, 'RESEND_API_KEY'),
    sender: requiredString(env, 'TRANSACTIONAL_FROM'),
  };
}
