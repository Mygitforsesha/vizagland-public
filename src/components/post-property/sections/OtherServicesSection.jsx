import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import { formGridClass } from '@/components/post-property/formStyles';
import { otherServiceOptions } from '@/lib/post-property/formOptions';

export default function OtherServicesSection({ formState, updateField }) {
  return (
    <FormSection title="Other Services">
      <div className={formGridClass}>
        <PropertyTypeSelectField
          label="Other Services"
          placeholder="Select Service"
          value={formState.selectedOtherService}
          onValueChange={(value) => updateField('selectedOtherService', value)}
          options={otherServiceOptions}
        />
        <FormTextField
          label="YouTube Video Link"
          value={formState.youtubeVideoLink}
          onChange={(event) => updateField('youtubeVideoLink', event.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        <FormTextField
          label="Property Location"
          value={formState.propertyLocationLink}
          onChange={(event) => updateField('propertyLocationLink', event.target.value)}
          placeholder="Paste Google Maps Link"
        />
      </div>
    </FormSection>
  );
}
