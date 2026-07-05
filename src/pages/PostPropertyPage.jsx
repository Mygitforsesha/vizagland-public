import { useState } from 'react';
import { Building, Phone } from 'lucide-react';
import PropertyLeadModal from '@/components/modals/PropertyLeadModal';
import PropertySuccessModal from '@/components/modals/PropertySuccessModal';
import PostPropertyForm from '@/components/post-property/PostPropertyForm';
import ThemedSearchableDropdown, {
  VILLAGE_DROPDOWN_TRIGGER_CLASS,
} from '@/components/shared/ThemedSearchableDropdown';
import { formHelpLinkClass, formPageClass } from '@/components/post-property/formStyles';
import {
  getPostModeFromRegistrationType,
  registrationTypeOptions,
} from '@/lib/registration/registrationTypeOptions';
import { usePostPropertyForm } from '@/lib/post-property/usePostPropertyForm';
import { usePropertySubmissionFlow } from '@/lib/post-property/usePropertySubmissionFlow';
import { validatePropertyContactNumbers } from '@/lib/post-property/validatePropertyContacts';

export function PostPropertyPage() {
  const [registrationType, setRegistrationType] = useState('');
  const [postMode, setPostMode] = useState('owner');
  const [contactValidationErrors, setContactValidationErrors] = useState({});
  const [showContactValidation, setShowContactValidation] = useState(false);
  const { formState, updateField, getFormState, dynamicAreaUnitOptions } = usePostPropertyForm();

  function handleRegistrationTypeChange(value) {
    setRegistrationType(value);
    setPostMode(getPostModeFromRegistrationType(value));
  }

  const {
    isLeadModalOpen,
    isSuccessModalOpen,
    submissionReferenceId,
    openLeadModal,
    closeLeadModal,
    closeSuccessModal,
    handleLeadSubmit,
  } = usePropertySubmissionFlow(getFormState);

  function handleSubmitClick() {
    const validation = validatePropertyContactNumbers(getFormState().propertyContactNumbers);

    if (!validation.isValid) {
      setContactValidationErrors(validation.errors);
      setShowContactValidation(true);
      document.getElementById('property-contact-numbers')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    setContactValidationErrors({});
    setShowContactValidation(false);
    openLeadModal();
  }

  return (
    <>
      <div className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-white text-xl font-bold m-0 flex items-center gap-2">
                <Building size={20} /> Post Property
              </h2>
              <p className="text-blue-200 text-[13px] mt-1 mb-0">
                List your property across Visakhapatnam GVMC &amp; VMRDA area
              </p>
            </div>
            <ThemedSearchableDropdown
              id="post-property-registration-type"
              ariaLabel="Registration Type"
              hideLabel
              value={registrationType}
              onValueChange={handleRegistrationTypeChange}
              options={registrationTypeOptions}
              placeholder="Select Registration Type"
              searchPlaceholder="Search registration type..."
              triggerClassName={VILLAGE_DROPDOWN_TRIGGER_CLASS}
              className="w-full sm:max-w-xs"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-[12px] text-gray-500">
            <a href="/" className="text-gray-500 no-underline hover:text-accent">
              Home
            </a>
            <span className="mx-1.5">/</span>
            <span className="text-gray-800 font-medium">Post Property</span>
          </nav>
        </div>
      </div>

      <section className={formPageClass}>
        <PostPropertyForm
          formState={formState}
          updateField={updateField}
          dynamicAreaUnitOptions={dynamicAreaUnitOptions}
          onSubmitClick={handleSubmitClick}
          postMode={postMode}
          contactValidationErrors={contactValidationErrors}
          showContactValidation={showContactValidation}
        />
      </section>

      <a href="tel:9618170406" className={formHelpLinkClass}>
        <Phone size={14} className="sm:size-4" aria-hidden />
        <span className="hidden sm:inline">Need Help?</span> 9618170406
      </a>

      <PropertyLeadModal
        isOpen={isLeadModalOpen}
        onClose={closeLeadModal}
        onSubmit={handleLeadSubmit}
      />

      <PropertySuccessModal
        isOpen={isSuccessModalOpen}
        referenceId={submissionReferenceId}
        onClose={closeSuccessModal}
      />
    </>
  );
}
