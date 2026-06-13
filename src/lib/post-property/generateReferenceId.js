/**
 * Generates a unique Vizag Land property reference id.
 * Format: VL-XXXXXXXX (8 uppercase alphanumeric characters)
 */
export function generateReferenceId() {
  const suffix = Math.random().toString(36).substring(2, 10).toUpperCase().padEnd(8, '0');
  return `VL-${suffix.slice(0, 8)}`;
}
