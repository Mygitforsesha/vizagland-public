import { useMemo } from 'react';
import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import { formGridClass } from '@/components/post-property/formStyles';
import { nearbyLocationOptions } from '@/lib/post-property/formOptions';
import {
  applyMasterLocationToForm,
  clearLocationFields,
  resolveNearbyLocationOptions,
} from '@/lib/post-property/mapMasterLocationToForm';
import { useMasterLocationSearch } from '@/lib/post-property/useMasterLocationSearch';

export default function VillageDetailsSection({ formState, updateField, postMode = 'owner' }) {
  const hideAgentFields = postMode === 'agent';
  const { setQuery, options, loading, error } = useMasterLocationSearch();
  const nearbyOptions = useMemo(
    () => resolveNearbyLocationOptions(nearbyLocationOptions, formState.nearbyLocation),
    [formState.nearbyLocation],
  );

  function handleVillageChange(value) {
    if (!value) {
      clearLocationFields(updateField);
      return;
    }

    updateField('village', value);
  }

  function handleVillageSelect(option) {
    if (option?.location) {
      applyMasterLocationToForm(updateField, option.location);
    }
  }

  return (
    <FormSection>
      <div className={formGridClass}>
        <SearchableSelectField
          hideLabel
          placeholder="Select Village"
          searchPlaceholder="Type to search village..."
          value={formState.village}
          onValueChange={handleVillageChange}
          onOptionSelect={handleVillageSelect}
          onSearchChange={setQuery}
          options={options}
          loading={loading}
          errorMessage={error}
          emptyMessage="No villages found"
          clearable
        />
        <PropertyTypeSelectField
          hideLabel
          placeholder="Select Nearby Location"
          value={formState.nearbyLocation}
          onValueChange={(value) => updateField('nearbyLocation', value)}
          options={nearbyOptions}
        />
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.customNearby}
            onChange={(event) => updateField('customNearby', event.target.value)}
            placeholder="Enter Nearby Location"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.district}
            onChange={(event) => updateField('district', event.target.value)}
            placeholder="Enter District"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.mandal}
            onChange={(event) => updateField('mandal', event.target.value)}
            placeholder="Enter Mandal"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.panchayati}
            onChange={(event) => updateField('panchayati', event.target.value)}
            placeholder="Enter Panchayati / Sachivalayam"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.gvmc}
            onChange={(event) => updateField('gvmc', event.target.value)}
            placeholder="Enter GVMC Zone / Ward Number"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.vmrda}
            onChange={(event) => updateField('vmrda', event.target.value)}
            placeholder="Enter VMRDA"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.regArea}
            onChange={(event) => updateField('regArea', event.target.value)}
            placeholder="Enter Register Office Location"
          />
        </div>
        <div className={hideAgentFields ? 'hidden' : undefined}>
          <FormTextField
            hideLabel
            value={formState.gvmcVmrda}
            onChange={(event) => updateField('gvmcVmrda', event.target.value)}
            placeholder="Enter GVMC / VMRDA"
          />
        </div>
      </div>
    </FormSection>
  );
}
