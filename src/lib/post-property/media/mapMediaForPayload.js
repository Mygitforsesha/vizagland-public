/**
 * Maps form upload items into the property submission payload media shape.
 * Preserves original File objects — never base64, never filenames-only.
 */

// TEMPORARY (Development only)
// Base64 upload flow.
// This should not be used now that backend supports file uploads.

// TEMPORARY (Development only)
// Blob URL handling.
// previewUrl is only for frontend preview and must never be sent to backend.

// TEMPORARY (Development only)
// JSON string serialization of media.
// Backend now expects actual File objects.

function resolveMimeType(item) {
  return item.mimeType ?? item.type ?? item.file?.type ?? '';
}

function resolveName(item) {
  return item.name ?? item.file?.name ?? '';
}

function resolveSize(item) {
  return item.size ?? item.file?.size ?? 0;
}

function warnIfFileMissing(kind, item) {
  const file = item?.file;
  const isUploadable = file instanceof File || file instanceof Blob;

  if (!file || !isUploadable) {
    console.warn(
      `[mapMediaForPayload] ${kind} item "${item?.id ?? resolveName(item)}" is missing a File object.`,
    );
  }
}

/**
 * @param {Array} items - Image upload items from ImageUploadField state
 */
export function mapPropertyImagesForPayload(items = []) {
  return items.map((item) => {
    warnIfFileMissing('Image', item);

    return {
      id: item.id,
      name: resolveName(item),
      size: resolveSize(item),
      mimeType: resolveMimeType(item),
      previewUrl: item.previewUrl ?? '',
      file: item.file,
    };
  });
}

/**
 * @param {Array} items - Document upload items from DocumentUploadField state
 */
export function mapPropertyDocumentsForPayload(items = []) {
  return items.map((item) => {
    warnIfFileMissing('Document', item);

    return {
      id: item.id,
      name: resolveName(item),
      size: resolveSize(item),
      mimeType: resolveMimeType(item),
      file: item.file,
    };
  });
}
