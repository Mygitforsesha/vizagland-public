import { useCallback, useState } from 'react';
import { processPropertySubmission } from './processPropertySubmission';

/**
 * Manages the Post Property submission flow:
 * lead modal → payload → API → success modal.
 */
export function usePropertySubmissionFlow(getFormState) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submissionReferenceId, setSubmissionReferenceId] = useState('');

  const openLeadModal = useCallback(() => {
    setIsLeadModalOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsLeadModalOpen(false);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
    window.location.href = '/';
  }, []);

  const handleLeadSubmit = useCallback(
    async (customer) => {
      const { referenceId } = await processPropertySubmission({
        formState: getFormState(),
        customer,
      });

      setSubmissionReferenceId(referenceId);
      setIsLeadModalOpen(false);
      setIsSuccessModalOpen(true);
    },
    [getFormState],
  );

  return {
    isLeadModalOpen,
    isSuccessModalOpen,
    submissionReferenceId,
    openLeadModal,
    closeLeadModal,
    closeSuccessModal,
    handleLeadSubmit,
  };
}
