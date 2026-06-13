import FormSection from '@/components/post-property/FormSection';
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
      </div>
    </FormSection>
  );
}
