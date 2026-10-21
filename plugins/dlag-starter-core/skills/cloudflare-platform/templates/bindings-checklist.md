# Bindings and local configuration checklist

Record names and status without values:

| Need | Location | Check before application work |
| --- | --- | --- |
| Supabase URL and publishable key | Server configuration; deliberately public subset only if needed | Correct environment and server client/RLS strategy |
| Resend API key | Worker secret | Server-only import; sender authorization belongs to separate provider setup |
| R2 bucket | Worker R2 binding | Environment-specific binding and object ownership contract |
| Private S3 signing credentials, if required | Worker secrets | Only for approved presigned URL flow; do not add when binding proxy suffices |
| Assets | Existing framework client build output | Public files only; preserve SSR route execution |
| Compatibility date and flags | Existing Worker configuration | Pinned date, installed dependency requirements and runtime verification |

Never put keys into plain vars examples, source control, fixture data, screenshots or logs. List missing names as pending instead of reading secret files. Configuration for an environment may have non-inherited fields; verify each target explicitly when the owner later requests configuration changes. This checklist does not create secrets, buckets, accounts or deployments.
