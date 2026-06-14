import { MULTIPART_FIELDS } from './constants';

// FUTURE:
// Persist PropertyImages and PropertyDocuments metadata when media services are available.
// Current backend flow uses property_images[] and property_documents[] File parts only.
//
// /**
//  * Strips File objects from media arrays for the JSON metadata part of multipart requests.
//  */
// function serializeMediaMetadata(items = []) {
//   return items.map(({ id, name, size, mimeType }) => ({
//     id,
//     name,
//     size,
//     mimeType,
//   }));
// }

/**
 * Builds multipart/form-data for property submission.
 * Compatible with backends that accept a JSON `data` field plus separate file parts.
 *
 * File parts use the client `id` as the third argument so the server can match
 * metadata entries to uploaded blobs.
 */
export function buildPropertyMultipartFormData(_payload) {
  const formData = new FormData();

  // FUTURE:
  // Persist PropertyImages metadata when media services are available.
  //
  // const jsonPayload = {
  //   ...payload,
  //   propertyImages: serializeMediaMetadata(payload.propertyImages),
  //   propertyDocuments: serializeMediaMetadata(payload.propertyDocuments),
  // };
  //
  // formData.append(MULTIPART_FIELDS.data, JSON.stringify(jsonPayload));
  //
  // for (const item of payload.propertyImages ?? []) {
  //   if (item.file instanceof File) {
  //     formData.append(MULTIPART_FIELDS.propertyImages, item.file, item.id);
  //   }
  // }
  //
  // for (const item of payload.propertyDocuments ?? []) {
  //   if (item.file instanceof File) {
  //     formData.append(MULTIPART_FIELDS.propertyDocuments, item.file, item.id);
  //   }
  // }

  return formData;
}
