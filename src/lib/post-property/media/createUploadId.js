/**
 * Generates a stable client-side id for an upload item.
 * Matches the id stored in the payload and future database records.
 */
export function createUploadId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
