/**
 * Submits a property listing payload to the backend.
 *
 * Current: logs the full payload (including File references) for debugging.
 *
 * Future multipart integration — replace the body only; components stay unchanged:
 *   import { buildPropertyMultipartFormData } from './media/buildMultipartFormData';
 *   const formData = buildPropertyMultipartFormData(payload);
 *   return await api.post('/property', formData);
 */
export async function submitProperty(payload) {
  console.log(payload);
}
