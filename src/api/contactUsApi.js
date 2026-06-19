import axios from 'axios';

const CONTACT_US_API_URL =
  'https://trapezoid-reprimand-registry.ngrok-free.dev/api/public/contact-us';

/**
 * GET /api/public/contact-us — HTTP only; no response shaping.
 */
export async function getContactUs() {
  const response = await axios.get(CONTACT_US_API_URL, {
    headers: {
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  console.log('Contact Us Response:', response.data);

  return response.data;
}
