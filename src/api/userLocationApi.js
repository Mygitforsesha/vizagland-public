import axios from 'axios';

const USER_LOCATION_API_URL =
  'https://api.vizagland.com/api/user/location';

/**
 * POST /api/user/location — persists the authenticated user's location.
 */
export async function postUserLocation(payload) {
  const token = localStorage.getItem('auth_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';

  if (!token) {
    throw new Error('Authentication token is required to submit location');
  }

  const response = await axios.post(USER_LOCATION_API_URL, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${tokenType} ${token}`,
    },
  });

  console.log('User Location Response:', response.data);

  return response.data;
}
