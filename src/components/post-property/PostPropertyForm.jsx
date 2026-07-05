import { Send } from 'lucide-react';
import VillageDetailsSection from './sections/VillageDetailsSection';
import PropertyGroupTypesSection from './sections/PropertyGroupTypesSection';
import PropertyDetailsSection from './sections/PropertyDetailsSection';
import OtherServicesSection from './sections/OtherServicesSection';
import MediaDocumentsSection from './sections/MediaDocumentsSection';
import { formContainerClass, formPrimaryButtonClass } from './formStyles';

/**
 * Presentational Post Property form — no submission or validation logic.
 */
export default function PostPropertyForm({
  formState,
  updateField,
  dynamicAreaUnitOptions,
  onSubmitClick,
  postMode = 'owner',
  contactValidationErrors = {},
  showContactValidation = false,
}) {
  return (
    <div className={formContainerClass}>
      <VillageDetailsSection formState={formState} updateField={updateField} postMode={postMode} />
      <PropertyGroupTypesSection formState={formState} updateField={updateField} />
      <PropertyDetailsSection
        formState={formState}
        updateField={updateField}
        dynamicAreaUnitOptions={dynamicAreaUnitOptions}
      />
      <OtherServicesSection
        formState={formState}
        updateField={updateField}
        contactValidationErrors={contactValidationErrors}
        showContactValidation={showContactValidation}
      />
      <MediaDocumentsSection formState={formState} updateField={updateField} />

      <div className="flex justify-center sm:justify-end">
        <button type="button" onClick={onSubmitClick} className={formPrimaryButtonClass}>
          <Send size={16} aria-hidden /> Submit Property
        </button>
      </div>
    </div>
  );
}
