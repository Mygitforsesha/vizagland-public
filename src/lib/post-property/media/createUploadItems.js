import { createUploadId } from './createUploadId';

/**
 * Creates a property image upload item with the original File preserved.
 * @returns {{ id: string, name: string, size: number, mimeType: string, previewUrl: string, file: File }}
 */
export function createPropertyImageUploadItem(file) {
  return {
    id: createUploadId(),
    name: file.name,
    size: file.size,
    mimeType: file.type || '',
    previewUrl: URL.createObjectURL(file),
    file,
  };
}

/**
 * Creates a property document upload item with the original File preserved.
 * @returns {{ id: string, name: string, size: number, mimeType: string, file: File }}
 */
export function createPropertyDocumentUploadItem(file) {
  return {
    id: createUploadId(),
    name: file.name,
    size: file.size,
    mimeType: file.type || '',
    file,
  };
}
