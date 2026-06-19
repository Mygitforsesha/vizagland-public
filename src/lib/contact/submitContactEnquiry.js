import axios from 'axios';

const CONTACT_ENQUIRIES_API_URL =
  'https://trapezoid-reprimand-registry.ngrok-free.dev/api/public/contact-enquiries';

function showContactToast(message, type = 'danger') {
  const existing = document.getElementById('contact-enquiry-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'contact-enquiry-toast';
  toast.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[99999] min-w-[400px] max-w-[calc(100vw-2rem)] rounded-xl shadow-2xl border-l-4 backdrop-blur-md bg-white/95 px-6 py-4 flex items-center gap-3 text-base font-semibold text-gray-900 animate-slide-down ${
    type === 'success' ? 'border-green-600' : 'border-red-600'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/**
 * Submits a contact enquiry payload to the backend.
 */
export async function submitContactEnquiry(payload) {
  console.log('Contact Enquiry Payload:', payload);

  try {
    const response = await axios.post(CONTACT_ENQUIRIES_API_URL, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Contact Enquiry Response:', response.data);

    showContactToast(
      'Your enquiry has been submitted successfully. We will contact you within 24 hours.',
      'success',
    );

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        showContactToast(
          data?.message || 'Validation error. Please check your inputs.',
        );
      } else if (status === 401) {
        showContactToast('Unauthorized. Please log in and try again.');
      } else if (status === 500) {
        showContactToast('Server error. Please try again later.');
      } else {
        showContactToast(
          data?.message || 'Something went wrong. Please try again.',
        );
      }
    } else {
      showContactToast(
        'Unable to connect. Please check your network and try again.',
      );
    }

    throw error;
  }
}
