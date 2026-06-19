import { buildContactEnquiryPayload } from './buildContactEnquiryPayload';
import { submitContactEnquiry } from './submitContactEnquiry';

/**
 * Orchestrates contact enquiry submission: payload generation → API call.
 */
export async function processContactSubmission(formData) {
  const payload = buildContactEnquiryPayload(formData);
  const response = await submitContactEnquiry(payload);
  return { payload, response };
}
