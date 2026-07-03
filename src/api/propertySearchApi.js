import axios from 'axios';

const PROPERTY_SEARCH_API_URL =
  'https://api.vizagland.com/api/properties/search';

/**
 * POST /api/properties/search — HTTP only; no response shaping.
 */
export async function postPropertySearch(payload) {
  const response = await axios.post(PROPERTY_SEARCH_API_URL, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}
