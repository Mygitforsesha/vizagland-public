/**
 * Post Property module — public API surface for debugging and integration.
 *
 * Layers:
 * - formDefaults / formOptions — field definitions and select data
 * - usePostPropertyForm — form state
 * - usePropertySubmissionFlow — submission orchestration
 * - buildPropertyPayload — request body shape
 * - submitProperty — API call
 * - validateLead — customer validation
 * - media/* — upload item factories and multipart helpers
 */

export { INITIAL_POST_PROPERTY_FORM_STATE } from './formDefaults';
export * from './formOptions';
export { buildPropertyPayload } from './buildPropertyPayload';
export { generateReferenceId } from './generateReferenceId';
export { processPropertySubmission } from './processPropertySubmission';
export { submitProperty } from './submitProperty';
export {
  validateCustomerDetails,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePropertyAuthDetails,
  validateUsernameOrMobile,
} from './validateLead';
export { usePostPropertyForm } from './usePostPropertyForm';
export { usePropertySubmissionFlow } from './usePropertySubmissionFlow';
