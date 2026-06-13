import { buildPropertyPayload } from './buildPropertyPayload';
import { generateReferenceId } from './generateReferenceId';
import { submitProperty } from './submitProperty';

/**
 * Orchestrates property submission: payload generation → API call.
 * Components should call this instead of wiring build + submit inline.
 */
export async function processPropertySubmission({ formState, customer }) {
  const referenceId = generateReferenceId();
  const payload = buildPropertyPayload({ formState, customer, referenceId });

  await submitProperty(payload);

  return { referenceId, payload };
}
