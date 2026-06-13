import FormSection from '@/components/post-property/FormSection';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import { formGrid2Class } from '@/components/post-property/formStyles';
import {
  commercialTypeOptions,
  constructionTypeOptions,
  developmentTypeOptions,
  layoutTypeOptions,
  propertyStatusOptions,
  residentialTypeOptions,
} from '@/lib/post-property/formOptions';

export default function PropertyGroupTypesSection({ formState, updateField }) {
  return (
    <FormSection title="Property Group & Types">
      <div className={formGrid2Class}>
        <PropertyTypeSelectField
          label="Select Residential Types"
          placeholder="Select Residential Type"
          value={formState.selectedResidential}
          onValueChange={(value) => updateField('selectedResidential', value)}
          options={residentialTypeOptions}
        />
        <PropertyTypeSelectField
          label="Commercial Types"
          placeholder="Select Commercial Type"
          value={formState.selectedCommercial}
          onValueChange={(value) => updateField('selectedCommercial', value)}
          options={commercialTypeOptions}
        />
        <PropertyTypeSelectField
          label="Developments"
          placeholder="Select Development"
          value={formState.selectedDevelopments}
          onValueChange={(value) => updateField('selectedDevelopments', value)}
          options={developmentTypeOptions}
        />
        <PropertyTypeSelectField
          label="Layout Developers"
          placeholder="Select Layout Developer"
          value={formState.selectedLayout}
          onValueChange={(value) => updateField('selectedLayout', value)}
          options={layoutTypeOptions}
        />
        <PropertyTypeSelectField
          label="House/Villas Developers"
          placeholder="Select House/Villas Developer"
          value={formState.selectedHouseDev}
          onValueChange={(value) => updateField('selectedHouseDev', value)}
          options={propertyStatusOptions}
        />
        <PropertyTypeSelectField
          label="Construction Types"
          placeholder="Select Construction Type"
          value={formState.selectedConstruction}
          onValueChange={(value) => updateField('selectedConstruction', value)}
          options={constructionTypeOptions}
        />
      </div>
    </FormSection>
  );
}
