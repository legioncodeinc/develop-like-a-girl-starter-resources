// Server-only opt-in example. A caller must authorize the actual external send.
import { stableDeliveryKey, requireStringBindings }
  from '../../identity/examples/boundary-helpers.mjs';

// intent has already passed recipient/template/ownership checks and is persisted.
// transport is explicit to keep examples/tests from accidentally sending.
export async function sendPreparedTransaction(intent, env, transport) {
  requireStringBindings(env, ['RESEND_API_KEY', 'TRANSACTIONAL_FROM']);
  if (typeof transport !== 'function') throw new Error('Missing authorized transport');
  const key = stableDeliveryKey(intent.eventId, intent.purpose);
  const response = await transport('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ from: env.TRANSACTIONAL_FROM, to: [intent.to],
      subject: intent.subject, text: intent.text }),
  });
  if (!response.ok) throw new Error(`Resend request failed: ${response.status}`);
  return response.json(); // API acceptance alone does not demonstrate delivery.
}
