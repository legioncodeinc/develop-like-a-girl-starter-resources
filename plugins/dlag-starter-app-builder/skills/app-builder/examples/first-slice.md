# Fictional first slice

A garden club member signs in, creates a project and sees only their projects. The server verifies the session on list/create/edit/delete routes, rejects owner fields supplied by the browser, and queries through an owner-scoped request client. Member B cannot access member A's record by changing a URL or form ID. File download checks the same record owner before issuing a link. A requested notification records a separate delivery outcome after the project save. Use a clearly labelled mock adapter locally; do not claim Supabase, R2 or Resend operated from that result.

Build list/create first, then edit/delete, then requested files/mail. Expected observations: signed-out page redirects safely; invalid form shows an inline error; duplicate submission does not create a second record; private result uses no-store caching. Run and record these cases before calling them proven.
