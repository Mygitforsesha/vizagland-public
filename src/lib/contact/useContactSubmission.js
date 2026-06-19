import { useCallback, useState } from 'react';
import { processContactSubmission } from './processContactSubmission';

/**
 * Manages Contact page enquiry submission with loading and success state.
 */
export function useContactSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitEnquiry = useCallback(async (formData, { onSuccess } = {}) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await processContactSubmission(formData);
      setSubmitted(true);
      onSuccess?.();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      // Error toasts are handled in submitContactEnquiry.
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return {
    isSubmitting,
    submitted,
    submitEnquiry,
  };
}
