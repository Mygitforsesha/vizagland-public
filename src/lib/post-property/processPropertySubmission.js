import { buildPropertyPayload } from './buildPropertyPayload';
import { generateReferenceId } from './generateReferenceId';
import { submitProperty } from './submitProperty';

// FUTURE:
// Persist PropertyImages and PropertyDocuments metadata when media services are available.
//
// import {
//   mapPropertyDocumentsForPayload,
//   mapPropertyImagesForPayload,
// } from './media/mapMediaForPayload';

/**
 * Orchestrates property submission: payload generation → API call.
 * Components should call this instead of wiring build + submit inline.
 */
export async function processPropertySubmission({ formState, customer }) {
  const referenceId = generateReferenceId();
  const payload = buildPropertyPayload({ formState, customer, referenceId });

  // FUTURE:
  // Persist PropertyImages metadata when media services are available.
  //
  // payload.propertyImages = mapPropertyImagesForPayload(formState.propertyImages);

  // FUTURE:
  // Persist PropertyDocuments metadata when media services are available.
  //
  // payload.propertyDocuments = mapPropertyDocumentsForPayload(formState.propertyDocuments);

  const response = await submitProperty({
    ...payload,
    propertyImages: formState.propertyImages,
    propertyDocuments: formState.propertyDocuments,
  });

  const propertyReferenceId = response?.data?.property_reference_id ?? referenceId;

  return { referenceId: propertyReferenceId, payload, response };
}
