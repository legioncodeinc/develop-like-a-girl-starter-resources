// Actual inert example used by the fictional fixture. No real R2 client here.
import { authorizeOwnedRecord, requireVerifiedObject,
  finalizePrivateResponse } from '../../identity/examples/boundary-helpers.mjs';

// principal is already validated by Supabase; record came from user-context RLS.
export async function privateDownload(principal, record, bucket) {
  const access = authorizeOwnedRecord(principal, record);
  if (!access.allowed) {
    return finalizePrivateResponse(new Response('Unavailable', { status: access.status }));
  }
  if (typeof bucket?.get !== 'function') {
    return finalizePrivateResponse(new Response('Unavailable', { status: 503 }));
  }
  try {
    const object = requireVerifiedObject(record, await bucket.get(record.objectKey));
    return finalizePrivateResponse(new Response(object.body, { headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="download"',
      'X-Content-Type-Options': 'nosniff',
    } }));
  } catch {
    return finalizePrivateResponse(new Response('Unavailable', { status: 404 }));
  }
}
