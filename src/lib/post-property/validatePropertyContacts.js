import { validatePhoneNumber } from './validateLead';

/**
 * Validates contact phone format when a value is entered.
 * Empty registration type and phone values are allowed.
 */
export function validatePropertyContactNumbers(contacts = []) {
  const errors = {};
  let isValid = true;

  contacts.forEach((row, index) => {
    const rowErrors = {};
    const phone = row?.phoneNumber?.trim() ?? '';

    if (phone) {
      const phoneResult = validatePhoneNumber(phone);
      if (!phoneResult.isValid) {
        rowErrors.phoneNumber = phoneResult.error;
        isValid = false;
      }
    }

    if (Object.keys(rowErrors).length > 0) {
      errors[index] = rowErrors;
    }
  });

  return { isValid, errors };
}
