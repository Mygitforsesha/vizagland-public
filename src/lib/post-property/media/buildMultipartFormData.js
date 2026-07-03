import { MULTIPART_FIELDS } from './constants';

// TEMPORARY (Development only)
// Base64 upload flow.
// This should not be used now that backend supports file uploads.

// TEMPORARY (Development only)
// Blob URL handling.
// previewUrl is only for frontend preview and must never be sent to backend.

// TEMPORARY (Development only)
// JSON string serialization of media.
// Backend now expects actual File objects.
//
// formData.append(MULTIPART_FIELDS.data, JSON.stringify(jsonPayload));

function isUploadableBinary(value) {
  return value instanceof File || value instanceof Blob;
}

function appendNestedFormData(formData, data, prefix = '') {
  if (data === null || data === undefined) {
    if (prefix) {
      formData.append(prefix, '');
    }
    return;
  }

  if (
    typeof data === 'object' &&
    !(data instanceof File) &&
    !(data instanceof Blob) &&
    !Array.isArray(data)
  ) {
    for (const [key, value] of Object.entries(data)) {
      const fieldKey = prefix ? `${prefix}[${key}]` : key;
      appendNestedFormData(formData, value, fieldKey);
    }
    return;
  }

  formData.append(prefix, data ?? '');
}

/**
 * Builds multipart/form-data for property submission.
 * Flattens nested payload keys (e.g. property_owner[property_owner_name])
 * and appends original File objects for media.
 */
export function buildPropertyMultipartFormData(payload) {
  console.group('STEP 2 - buildPropertyMultipartFormData');

  console.log('Incoming Payload:', payload);

  console.log('Images:', payload.propertyImages);

  console.log('Documents:', payload.propertyDocuments);

  console.groupEnd();

  const {
    propertyImages = [],
    propertyDocuments = [],
    ...businessPayload
  } = payload;

  const formData = new FormData();
  appendNestedFormData(formData, businessPayload);

  console.group('STEP 3 - Images');

  console.log('Images Count:', propertyImages.length);

  propertyImages.forEach((item, index) => {
    console.log(index, item);
    console.log(item.file);
    console.log(item.file instanceof File);
  });

  console.groupEnd();

  for (const image of propertyImages) {
    if (isUploadableBinary(image.file)) {
      const filename = image.name ?? image.file?.name ?? 'image';
      formData.append(MULTIPART_FIELDS.propertyImages, image.file, filename);
    } else {
      console.warn(
        '[buildPropertyMultipartFormData] Image is missing a File object:',
        image,
      );
    }
  }

  console.group('STEP 4 - Documents');

  console.log('Documents Count:', propertyDocuments.length);

  propertyDocuments.forEach((item, index) => {
    console.log(index, item);
    console.log(item.file);
    console.log(item.file instanceof File);
  });

  console.groupEnd();

  for (const document of propertyDocuments) {
    if (isUploadableBinary(document.file)) {
      const filename = document.name ?? document.file?.name ?? 'document';
      formData.append(MULTIPART_FIELDS.propertyDocuments, document.file, filename);
    } else {
      console.warn(
        '[buildPropertyMultipartFormData] Document is missing a File object:',
        document,
      );
    }
  }

  console.group('STEP 5 - Final FormData');

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  console.groupEnd();

  return formData;
}
