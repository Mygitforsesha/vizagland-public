import axios from 'axios';

const MASTER_LOCATION_SEARCH_URL =
  'https://api.vizagland.com/api/master/locations/search';

/**
 * GET /api/master/locations/search — HTTP only; no response shaping.
 */
export async function searchMasterLocations(query, { limit = 20, page } = {}) {
  const response = await axios.get(MASTER_LOCATION_SEARCH_URL, {
    params: {
      q: query,
      ...(limit != null && { limit }),
      ...(page != null && { page }),
    },
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data?.data ?? [];
}
