const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an Indian mobile number when provided (10 digits, starts with 6–9).
 * Empty values are allowed.
 */
export function validatePhoneNumber(phone = '') {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    return { isValid: true, error: null };
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
 * Validates username or 10-digit mobile for property submission auth.
 */
export function validateUsernameOrMobile(value = '') {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Username or mobile number is required' };
  }

  if (/^\d+$/.test(trimmed)) {
    if (!INDIAN_MOBILE_REGEX.test(trimmed)) {
      return { isValid: false, error: 'Enter a valid 10-digit mobile number' };
    }

    return { isValid: true, error: null };
  }

  return { isValid: true, error: null };
}

/**
 * Validates password for property submission auth.
 */
export function validatePassword(password = '') {
  if (!password.trim()) {
    return { isValid: false, error: 'Password is required' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates auth details from PropertyLeadModal.
 */
export function validatePropertyAuthDetails({
  usernameOrMobile = '',
  password = '',
  email = '',
} = {}) {
  const errors = {};

  const usernameResult = validateUsernameOrMobile(usernameOrMobile);
  if (!usernameResult.isValid) {
    errors.usernameOrMobile = usernameResult.error;
  }

  const passwordResult = validatePassword(password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.error;
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

/** @deprecated Use validatePropertyAuthDetails */
export function validateCustomerDetails(authDetails) {
  return validatePropertyAuthDetails(authDetails);
}
