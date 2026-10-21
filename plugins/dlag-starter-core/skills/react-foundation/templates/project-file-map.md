# Starter file map

Adapt the existing generated project rather than replacing it. This map is an example, not a complete scaffold.

```text
app/
  root.tsx                  # document shell, global styles, root failure boundary
  routes.ts                 # framework route configuration
  routes/profile.tsx        # loader, action, component, route failure boundary
  components/ui/            # existing shadcn/ui React primitives
  features/profile/         # only when this feature needs multiple modules
  services/profile.server.ts # private service, request identity passed explicitly
workers/app.ts              # request delegation and Cloudflare context
react-router.config.ts      # framework SSR enabled
vite.config.ts              # framework + Cloudflare integration from scaffold
```

Keep existing Cloudflare configuration and generated types consistent with the pinned framework scaffold. The current framework's development command, build command and type-generation command belong to package.json; do not guess script names or use a deploy command as a local check.
