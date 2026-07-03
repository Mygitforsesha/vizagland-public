import {
  PROPERTY_DOCUMENT_UPLOAD_DIR,
  PROPERTY_IMAGE_UPLOAD_DIR,
} from './constants';

/**
 * Maps a client upload item to the server/database media record shape.
 * Used when documenting API contracts and when normalizing API responses.
 *
 * @param {object} params
 * @param {string} params.id - Client or server media id
 * @param {string} params.originalName - Original filename from the user's device
 * @param {string} params.fileName - Stored filename on the server (e.g. uuid.jpg)
 * @param {number} params.size
 * @param {string} params.mimeType
 * @param {string} params.uploadDir - e.g. PROPERTY_IMAGE_UPLOAD_DIR
 * @param {string} [params.baseUrl] - API or CDN origin for public URLs
 */
export function mapStoredMediaRecord(params) {
  const {
    id,
    originalName,
    fileName,
    size,
    mimeType,
    uploadDir,
    baseUrl = '',
  } = params;

  const relativePath = `${uploadDir}${fileName}`;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  return {
    id,
    originalName,
    fileName,
    size,
    mimeType,
    relativePath,
    url: normalizedBase ? `${normalizedBase}${relativePath}` : relativePath,
  };
}

/**
 * Preview of how a submitted image will look once persisted by the backend.
 * `fileName` is a placeholder until the server assigns the real stored name.
 */
export function mapImageUploadToStoredRecord(item, { fileName, baseUrl = '' } = {}) {
  return mapStoredMediaRecord({
    id: item.id,
    originalName: item.name,
    fileName: fileName ?? item.file?.name ?? item.name,
    size: item.size,
    mimeType: item.mimeType,
    uploadDir: PROPERTY_IMAGE_UPLOAD_DIR,
    baseUrl,
  });
}

/**
 * Preview of how a submitted document will look once persisted by the backend.
 */
export function mapDocumentUploadToStoredRecord(item, { fileName, baseUrl = '' } = {}) {
  return mapStoredMediaRecord({
    id: item.id,
    originalName: item.name,
    fileName: fileName ?? item.file?.name ?? item.name,
    size: item.size,
    mimeType: item.mimeType,
    uploadDir: PROPERTY_DOCUMENT_UPLOAD_DIR,
    baseUrl,
  });
}
