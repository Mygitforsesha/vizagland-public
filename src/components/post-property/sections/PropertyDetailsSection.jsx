import FormSection from '@/components/post-property/FormSection';
import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import {
  ApprovalField,
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
        <SearchableSelectField
          label="LP Number"
          placeholder="Select LP Number"
          searchPlaceholder="Search LP Number..."
          value={formState.lpNo}
          onValueChange={(value) => updateField('lpNo', value)}
          options={lpPlotOptions}
        />
        <SearchableSelectField
          label="LP No. Year"
          placeholder="Select LP No. Year"
          searchPlaceholder="Search LP No. Year..."
          value={formState.year}
          onValueChange={(value) => updateField('year', value)}
          options={yearOptions}
        />
        <PropertyTypeSelectField
          label="Price per Sq Ft"
          placeholder="Select"
          value={formState.pricePerSqft}
          onValueChange={(value) => updateField('pricePerSqft', value)}
          options={pricePerSqftOptions}
        />
        <FormTextField
          label="Price (Value)"
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
        <TotalFloorsSelectField
          value={formState.totalFloors}
          onValueChange={(value) => updateField('totalFloors', value)}
        />
        <FloorNumberSelectField
          value={formState.floorNumber}
          onValueChange={(value) => updateField('floorNumber', value)}
        />
        <PropertyAgeSelectField
          value={formState.propertyAge}
          onValueChange={(value) => updateField('propertyAge', value)}
        />
        <FormTextField
          label="Flat No./Door No."
          value={formState.propertyFlatDoorNo}
          onChange={(event) => updateField('propertyFlatDoorNo', event.target.value)}
          placeholder="Enter flat or door number"
        />
        <BedroomsSelectField
          value={formState.bedRooms}
          onValueChange={(value) => updateField('bedRooms', value)}
        />
        <FacingField
          value={formState.facing}
          onValueChange={(value) => updateField('facing', value)}
        />
        <SearchableSelectField
          label="Plot No."
          placeholder="Select Plot No."
          searchPlaceholder="Search Plot No..."
          value={formState.plotNo}
          onValueChange={(value) => updateField('plotNo', value)}
          options={lpPlotOptions}
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
        <ApprovalField
          value={formState.approvedBy}
          onValueChange={(value) => updateField('approvedBy', value)}
        />
      </div>
    </FormSection>
  );
}
