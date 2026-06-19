import axios from 'axios';

const PROPERTY_SEARCH_API_URL =
  'https://trapezoid-reprimand-registry.ngrok-free.dev/api/properties/search';

/**
 * POST /api/properties/search — HTTP only; no response shaping.
 */
export async function postPropertySearch(payload) {
  const response = await axios.post(PROPERTY_SEARCH_API_URL, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  return response.data;
}
