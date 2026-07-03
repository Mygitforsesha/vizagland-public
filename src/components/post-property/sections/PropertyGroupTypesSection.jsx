import FormSection from '@/components/post-property/FormSection';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import { propertyCategoryOptions } from '@/lib/post-property/formOptions';

export default function PropertyGroupTypesSection({ formState, updateField }) {
  return (
    <FormSection title="Property Group & Types">
      <SearchableSelectField
        label="Property Category"
        placeholder="Select Property Category"
        searchPlaceholder="Search property category..."
        value={formState.propertyCategory}
        onValueChange={(value) => updateField('propertyCategory', value)}
        options={propertyCategoryOptions}
      />
    </FormSection>
  );
}
