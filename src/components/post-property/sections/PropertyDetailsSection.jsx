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
} from '@/components/post-property/fields';
import { formGrid4Class } from '@/components/post-property/formStyles';
import {
  lpPlotOptions,
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
    <FormSection>
      <div className={formGrid4Class}>
        <FormTextField
          hideLabel
          value={formState.projectName}
          onChange={(event) => updateField('projectName', event.target.value)}
          placeholder="Enter Project / Property Name"
        />
        <SearchableSelectField
          hideLabel
          placeholder="Select LP No / B.P.A No"
          searchPlaceholder="Search LP No / B.P.A No..."
          value={formState.lpNo}
          onValueChange={(value) => updateField('lpNo', value)}
          options={lpPlotOptions}
        />
        <SearchableSelectField
          hideLabel
          placeholder="Select LP No / B.P.A No Year"
          searchPlaceholder="Search LP No / B.P.A No Year..."
          value={formState.year}
          onValueChange={(value) => updateField('year', value)}
          options={yearOptions}
        />
        <FormTextField
          hideLabel
          type="number"
          value={formState.totalFloors}
          onChange={(event) => updateField('totalFloors', event.target.value)}
          placeholder="Enter Total Floors / Total Plots"
        />
        <FormTextField
          hideLabel
          value={formState.blockPhase}
          onChange={(event) => updateField('blockPhase', event.target.value)}
          placeholder="Enter Block No / Phase (1-10)"
        />
        <FormTextField
          hideLabel
          value={formState.plotNo}
          onChange={(event) => updateField('plotNo', event.target.value)}
          placeholder="Enter Plot No / D.No. / Flat No"
        />
        <FloorNumberSelectField
          hideLabel
          placeholder="Select Floor No"
          value={formState.floorNumber}
          onValueChange={(value) => updateField('floorNumber', value)}
        />
        <FacingField
          hideLabel
          placeholder="Select Facing"
          value={formState.facing}
          onValueChange={(value) => updateField('facing', value)}
        />
        <FormTextField
          hideLabel
          type="number"
          value={formState.areaValue}
          onChange={(event) => updateField('areaValue', event.target.value)}
          placeholder="Enter Area"
        />
        <AreaUnitSelectField
          hideLabel
          placeholder="Select Area Unit"
          value={formState.areaUnit}
          onValueChange={(value) => updateField('areaUnit', value)}
          options={dynamicAreaUnitOptions}
        />
        <FormTextField
          hideLabel
          type="number"
          value={formState.priceValue}
          onChange={(event) => updateField('priceValue', event.target.value)}
          placeholder="Enter Price"
        />
        <PropertyTypeSelectField
          hideLabel
          placeholder="Select Price Range"
          value={formState.priceRange}
          onValueChange={(value) => updateField('priceRange', value)}
          options={priceRangeOptions}
        />
        <PropertyAgeSelectField
          hideLabel
          placeholder="Select Property Age"
          value={formState.propertyAge}
          onValueChange={(value) => updateField('propertyAge', value)}
        />
        <BedroomsSelectField
          hideLabel
          placeholder="Select Bed Room"
          value={formState.bedRooms}
          onValueChange={(value) => updateField('bedRooms', value)}
        />
        <FurnishingSelectField
          hideLabel
          placeholder="Select Furnishing"
          value={formState.furnishing}
          onValueChange={(value) => updateField('furnishing', value)}
        />
        <PropertyTypeSelectField
          hideLabel
          placeholder="Select Property Falls Under"
          value={formState.propertyUnder}
          onValueChange={(value) => updateField('propertyUnder', value)}
          options={propertyUnderOptions}
        />
        <ApprovalField
          hideLabel
          placeholder="Select Approved By"
          value={formState.approvedBy}
          onValueChange={(value) => updateField('approvedBy', value)}
        />
        <SearchableSelectField
          hideLabel
          placeholder="Select Document No"
          searchPlaceholder="Search Document No..."
          value={formState.documentNo}
          onValueChange={(value) => updateField('documentNo', value)}
          options={lpPlotOptions}
        />
        <SearchableSelectField
          hideLabel
          placeholder="Select Document Year"
          searchPlaceholder="Search Document Year..."
          value={formState.documentYear}
          onValueChange={(value) => updateField('documentYear', value)}
          options={yearOptions}
        />
        <FormTextField
          hideLabel
          value={formState.registrationOfficeArea}
          onChange={(event) => updateField('registrationOfficeArea', event.target.value)}
          placeholder="Enter Registered Office Area"
        />
      </div>
    </FormSection>
  );
}
