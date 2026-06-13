/**
 * Maps form upload items into the property submission payload media shape.
 * Preserves original File objects — never base64, never filenames-only.
 */

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
  if (!item?.file || !(item.file instanceof File)) {
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
