import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyContactNumbersSection from '@/components/post-property/sections/PropertyContactNumbersSection';
import { formGridClass } from '@/components/post-property/formStyles';

export default function OtherServicesSection({
  formState,
  updateField,
  contactValidationErrors = {},
  showContactValidation = false,
}) {
  return (
    <FormSection>
      <div className={formGridClass}>
        <FormTextField
          hideLabel
          value={formState.youtubeVideoLink}
          onChange={(event) => updateField('youtubeVideoLink', event.target.value)}
          placeholder="Paste YouTube Video Link"
        />
        <FormTextField
          hideLabel
          value={formState.propertyLocationLink}
          onChange={(event) => updateField('propertyLocationLink', event.target.value)}
          placeholder="Paste Property Location Link"
        />
      </div>

      <PropertyContactNumbersSection
        contacts={formState.propertyContactNumbers}
        updateField={updateField}
        validationErrors={contactValidationErrors}
        showValidation={showContactValidation}
      />
    </FormSection>
  );
}
