import { buildPropertyPayload } from './buildPropertyPayload';
import { generateReferenceId } from './generateReferenceId';
import {
  mapPropertyDocumentsForPayload,
  mapPropertyImagesForPayload,
} from './media/mapMediaForPayload';
import { submitProperty } from './submitProperty';

/**
 * Orchestrates property submission: payload generation → API call.
 * Components should call this instead of wiring build + submit inline.
 */
export async function processPropertySubmission({ formState, customer }) {
  const referenceId = generateReferenceId();
  const payload = buildPropertyPayload({ formState, customer, referenceId });

  const propertyImages = mapPropertyImagesForPayload(formState.propertyImages);
  const propertyDocuments = mapPropertyDocumentsForPayload(formState.propertyDocuments);

  const response = await submitProperty({
    ...payload,
    propertyImages,
    propertyDocuments,
  });

  const propertyReferenceId = response?.data?.property_reference_id ?? referenceId;

  return { referenceId: propertyReferenceId, payload, response };
}
