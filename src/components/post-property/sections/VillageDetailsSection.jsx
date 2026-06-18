import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import { formGridClass } from '@/components/post-property/formStyles';
import { nearbyLocationOptions } from '@/lib/post-property/formOptions';

export default function VillageDetailsSection({ formState, updateField, postMode = 'owner' }) {
  const hideAgentFields = postMode === 'agent';

  return (
    <FormSection title="Village Details">
      <div className={formGridClass}>
        <FormTextField
          label="Village"
          value={formState.village}
          onChange={(event) => updateField('village', event.target.value)}
          placeholder="Enter village name"
        />
        <PropertyTypeSelectField
          label="Nearby Location / Landmark"
          placeholder="Select Nearby Location"
          value={formState.nearbyLocation}
          onValueChange={(value) => updateField('nearbyLocation', value)}
          options={nearbyLocationOptions}
        />
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="Add Nearby Location"
            value={formState.customNearby}
            onChange={(event) => updateField('customNearby', event.target.value)}
            placeholder="Enter nearby location"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="District"
            value={formState.district}
            onChange={(event) => updateField('district', event.target.value)}
            placeholder="Enter district"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="Mandal"
            value={formState.mandal}
            onChange={(event) => updateField('mandal', event.target.value)}
            placeholder="Enter mandal"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="Panchayati / sachivalayam"
            value={formState.panchayati}
            onChange={(event) => updateField('panchayati', event.target.value)}
            placeholder="Enter panchayati"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="GVMC Zone, Ward Number"
            value={formState.gvmc}
            onChange={(event) => updateField('gvmc', event.target.value)}
            placeholder="Enter GVMC zone / ward"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="VMRDA"
            value={formState.vmrda}
            onChange={(event) => updateField('vmrda', event.target.value)}
            placeholder="Enter VMRDA"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="Register office location"
            value={formState.regArea}
            onChange={(event) => updateField('regArea', event.target.value)}
            placeholder="Enter register office"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            label="GVMC / VMRDA"
            value={formState.gvmcVmrda}
            onChange={(event) => updateField('gvmcVmrda', event.target.value)}
            placeholder="Enter GVMC / VMRDA"
          />
        </div>
      </div>
    </FormSection>
  );
}
