import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import {
  AreaUnitSelectField,
  BedroomsSelectField,
  FacingField,
  FloorNumberSelectField,
  FurnishingSelectField,
  PropertyAgeSelectField,
  TotalFloorsSelectField,
} from '@/components/post-property/fields';
import { formGrid4Class } from '@/components/post-property/formStyles';
import {
  lpPlotOptions,
  pricePerSqftOptions,
  priceRangeOptions,
  propertyUnderOptions,
  yearOptions,
} from '@/lib/post-property/formOptions';

export default function PropertyDetailsSection({
  formState,
  updateField,
  dynamicAreaUnitOptions,
}) {
  return (
    <FormSection title="Property Details">
      <div className={formGrid4Class}>
        <FormTextField
          label="Price (value)"
          type="number"
          value={formState.priceValue}
          onChange={(event) => updateField('priceValue', event.target.value)}
          placeholder="Enter value"
        />
        <PropertyTypeSelectField
          label="Price Range"
          placeholder="Select Price"
          value={formState.priceRange}
          onValueChange={(value) => updateField('priceRange', value)}
          options={priceRangeOptions}
        />
        <FormTextField
          label="Area"
          type="number"
          value={formState.areaValue}
          onChange={(event) => updateField('areaValue', event.target.value)}
          placeholder="Enter area"
        />
        <AreaUnitSelectField
          value={formState.areaUnit}
          onValueChange={(value) => updateField('areaUnit', value)}
          options={dynamicAreaUnitOptions}
        />
        <PropertyTypeSelectField
          label="Price per Sq Ft"
          placeholder="Select"
          value={formState.pricePerSqft}
          onValueChange={(value) => updateField('pricePerSqft', value)}
          options={pricePerSqftOptions}
        />
        <PropertyAgeSelectField
          value={formState.propertyAge}
          onValueChange={(value) => updateField('propertyAge', value)}
        />
        <FacingField
          value={formState.facing}
          onValueChange={(value) => updateField('facing', value)}
        />
        <TotalFloorsSelectField
          value={formState.totalFloors}
          onValueChange={(value) => updateField('totalFloors', value)}
        />
        <FloorNumberSelectField
          value={formState.floorNumber}
          onValueChange={(value) => updateField('floorNumber', value)}
        />
        <FurnishingSelectField
          value={formState.furnishing}
          onValueChange={(value) => updateField('furnishing', value)}
        />
        <PropertyTypeSelectField
          label="Property Under"
          placeholder="Select"
          value={formState.propertyUnder}
          onValueChange={(value) => updateField('propertyUnder', value)}
          options={propertyUnderOptions}
        />
        <SearchableSelectField
          label="LP No."
          placeholder="Select LP No."
          searchPlaceholder="Search LP No..."
          value={formState.lpNo}
          onValueChange={(value) => updateField('lpNo', value)}
          options={lpPlotOptions}
        />
        <SearchableSelectField
          label="Plot No."
          placeholder="Select Plot No."
          searchPlaceholder="Search Plot No..."
          value={formState.plotNo}
          onValueChange={(value) => updateField('plotNo', value)}
          options={lpPlotOptions}
        />
        <SearchableSelectField
          label="Year"
          placeholder="Select Year"
          searchPlaceholder="Search Year..."
          value={formState.year}
          onValueChange={(value) => updateField('year', value)}
          options={yearOptions}
        />
        <BedroomsSelectField
          value={formState.bedRooms}
          onValueChange={(value) => updateField('bedRooms', value)}
        />
      </div>
    </FormSection>
  );
}
