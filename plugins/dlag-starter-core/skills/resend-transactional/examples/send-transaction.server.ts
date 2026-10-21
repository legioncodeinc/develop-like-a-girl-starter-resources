// Explicitly choose fetch only after actual sending has been authorized.
export { sendPreparedTransaction } from './send-transaction.mjs';
// Call after server recipient/template authorization and durable intent creation.
// Timeout means unknown: reconcile and retain the same event/payload/key.
