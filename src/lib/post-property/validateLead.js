const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a mandatory Indian mobile number (10 digits, starts with 6–9).
 */
export function validatePhoneNumber(phone = '') {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    return { isValid: false, error: 'Mobile number is required' };
  }

  if (!INDIAN_MOBILE_REGEX.test(trimmedPhone)) {
    return { isValid: false, error: 'Enter a valid 10-digit mobile number' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates an optional email address.
 */
export function validateEmail(email = '') {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return { isValid: true, error: null };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { isValid: false, error: 'Enter a valid email address' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates lead/customer details from PropertyLeadModal.
 * Phone is mandatory; name and email are optional.
 */
export function validateCustomerDetails({ name = '', phone = '', email = '' } = {}) {
  const errors = {};

  const phoneResult = validatePhoneNumber(phone);
  if (!phoneResult.isValid) {
    errors.phone = phoneResult.error;
  }

  const emailResult = validateEmail(email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
