import axios from 'axios';

const CONTACT_US_API_URL =
  'https://api.vizagland.com/api/public/contact-us';

/**
 * GET /api/public/contact-us — HTTP only; no response shaping.
 */
export async function getContactUs() {
  const response = await axios.get(CONTACT_US_API_URL, {
    headers: {
      Accept: 'application/json',
    },
  });

  console.log('Contact Us Response:', response.data);

  return response.data;
}
