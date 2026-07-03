import FormTextField from '@/components/post-property/FormTextField';
import PropertyTypeSelectField from '@/components/post-property/PropertyTypeSelectField';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import {
  AmenitiesMultiSelect,
  ApprovalField,
  AreaUnitSelectField,
  BalconiesSelectField,
  BathroomsSelectField,
  BedroomsSelectField,
  FacingField,
  FloorNumberSelectField,
  FurnishingSelectField,
  ParkingSelectField,
  PropertyAgeSelectField,
  TotalFloorsSelectField,
} from '@/components/post-property/fields';
import { FilterPanelSection } from './FilterPanelSection';
import { filterPanelStackClass } from './filterPanelStyles';
import {
  lpPlotOptions,
  nearbyLocationOptions,
  otherServiceOptions,
  pricePerSqftOptions,
  priceRangeOptions,
  propertyCategoryOptions,
  propertyUnderOptions,
  yearOptions,
} from '@/lib/post-property/formOptions';

/**
 * Advanced search filters — MoreFiltersDrawer / MobileFilterSheet.
 */
export function AdvancedFilterPanel({
  searchFilters,
  updateSearchFilter,
  availableAreaUnits,
  setCurrentPage,
}) {
  const {
    propertyCategory,
    nearbyLocation,
    customNearby,
    panchayati,
    gvmc,
    vmrda,
    regArea,
    gvmcVmrda,
    lpNo,
    year,
    pricePerSqft,
    priceValue,
    propertyPriceRange,
    plotNo,
    propertyFlatDoorNo,
    propertyUnder,
    propertyAge,
    furnishing,
    bedrooms,
    bathrooms,
    balconies,
    parking,
    minArea,
    maxArea,
    areaUnit,
    totalFloors,
    floorNumber,
    facing,
    approvedBy,
    amenities,
    selectedOtherService,
  } = searchFilters;

  function commitFilter(fieldName, value) {
    updateSearchFilter(fieldName, value);
    setCurrentPage(1);
  }

  return (
    <div className={filterPanelStackClass}>
      <FilterPanelSection title="Property Group & Types">
        <SearchableSelectField
          label="Property Category"
          placeholder="Select Property Category"
          searchPlaceholder="Search property category..."
          value={propertyCategory}
          onValueChange={(value) => commitFilter('propertyCategory', value)}
          options={propertyCategoryOptions}
          clearable
        />
      </FilterPanelSection>

      <FilterPanelSection title="Location">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormTextField
            label="Panchayati / sachivalayam"
            value={panchayati}
            onChange={(event) => updateSearchFilter('panchayati', event.target.value)}
            placeholder="Enter panchayati"
          />
          <PropertyTypeSelectField
            label="Nearby Location / Landmark"
            placeholder="Select Nearby Location"
            value={nearbyLocation}
            onValueChange={(value) => commitFilter('nearbyLocation', value)}
            options={nearbyLocationOptions}
          />
          <FormTextField
            label="Add Nearby Location"
            value={customNearby}
            onChange={(event) => updateSearchFilter('customNearby', event.target.value)}
            placeholder="Enter nearby location"
          />
          <FormTextField
            label="GVMC Zone, Ward Number"
            value={gvmc}
            onChange={(event) => updateSearchFilter('gvmc', event.target.value)}
            placeholder="Enter GVMC zone / ward"
          />
          <FormTextField
            label="VMRDA"
            value={vmrda}
            onChange={(event) => updateSearchFilter('vmrda', event.target.value)}
            placeholder="Enter VMRDA"
          />
          <FormTextField
            label="Register office location"
            value={regArea}
            onChange={(event) => updateSearchFilter('regArea', event.target.value)}
            placeholder="Enter register office"
          />
          <FormTextField
            label="GVMC / VMRDA"
            value={gvmcVmrda}
            onChange={(event) => updateSearchFilter('gvmcVmrda', event.target.value)}
            placeholder="Enter GVMC / VMRDA"
          />
        </div>
      </FilterPanelSection>

      <FilterPanelSection title="Property Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SearchableSelectField
            label="LP Number"
            placeholder="Select LP Number"
            searchPlaceholder="Search LP Number..."
            value={lpNo}
            onValueChange={(value) => commitFilter('lpNo', value)}
            options={lpPlotOptions}
            clearable
          />
          <SearchableSelectField
            label="LP No. Year"
            placeholder="Select LP No. Year"
            searchPlaceholder="Search LP No. Year..."
            value={year}
            onValueChange={(value) => commitFilter('year', value)}
            options={yearOptions}
            clearable
          />
          <PropertyTypeSelectField
            label="Price per Sq Ft"
            placeholder="Select"
            value={pricePerSqft}
            onValueChange={(value) => commitFilter('pricePerSqft', value)}
            options={pricePerSqftOptions}
          />
          <FormTextField
            label="Price (Value)"
            type="number"
            value={priceValue}
            onChange={(event) => updateSearchFilter('priceValue', event.target.value)}
            placeholder="Enter value"
          />
          <PropertyTypeSelectField
            label="Price Range"
            placeholder="Select Price"
            value={propertyPriceRange}
            onValueChange={(value) => commitFilter('propertyPriceRange', value)}
            options={priceRangeOptions}
          />
          <FormTextField
            label="Area"
            type="number"
            value={minArea}
            onChange={(event) => updateSearchFilter('minArea', event.target.value)}
            placeholder="Min area"
          />
          <FormTextField
            label="Max Area"
            type="number"
            value={maxArea}
            onChange={(event) => updateSearchFilter('maxArea', event.target.value)}
            placeholder="Max area"
          />
          <AreaUnitSelectField
            value={areaUnit}
            onValueChange={(value) => updateSearchFilter('areaUnit', value)}
            options={availableAreaUnits}
            allowAll
          />
          <TotalFloorsSelectField
            value={totalFloors}
            onValueChange={(value) => commitFilter('totalFloors', value)}
            allowAll
          />
          <FloorNumberSelectField
            value={floorNumber}
            onValueChange={(value) => commitFilter('floorNumber', value)}
            allowAll
          />
          <PropertyAgeSelectField
            value={propertyAge}
            onValueChange={(value) => commitFilter('propertyAge', value)}
            allowAll
          />
          <FormTextField
            label="Flat No./Door No."
            value={propertyFlatDoorNo}
            onChange={(event) => updateSearchFilter('propertyFlatDoorNo', event.target.value)}
            placeholder="Enter flat or door number"
          />
          <BedroomsSelectField
            value={bedrooms}
            onValueChange={(value) => commitFilter('bedrooms', value)}
            allowAll
          />
          <FacingField
            allowAll
            value={Array.isArray(facing) ? facing[0] ?? '' : facing}
            onValueChange={(value) => commitFilter('facing', value && value !== 'All' ? [value] : [])}
          />
          <SearchableSelectField
            label="Plot No."
            placeholder="Select Plot No."
            searchPlaceholder="Search Plot No..."
            value={plotNo}
            onValueChange={(value) => commitFilter('plotNo', value)}
            options={lpPlotOptions}
            clearable
          />
          <FurnishingSelectField
            value={furnishing}
            onValueChange={(value) => commitFilter('furnishing', value)}
            allowAll
          />
          <PropertyTypeSelectField
            label="Property Under"
            placeholder="Select"
            value={propertyUnder}
            onValueChange={(value) => commitFilter('propertyUnder', value)}
            options={propertyUnderOptions}
          />
          <ApprovalField
            allowAll
            value={Array.isArray(approvedBy) ? approvedBy[0] ?? '' : approvedBy}
            onValueChange={(value) => commitFilter('approvedBy', value && value !== 'All' ? [value] : [])}
          />
        </div>
      </FilterPanelSection>

      <FilterPanelSection title="Residential Details">
        <div className="grid grid-cols-2 gap-3">
          <BathroomsSelectField
            value={bathrooms}
            onValueChange={(value) => commitFilter('bathrooms', value)}
            allowAll
          />
          <BalconiesSelectField
            value={balconies}
            onValueChange={(value) => commitFilter('balconies', value)}
            allowAll
          />
          <ParkingSelectField
            value={parking}
            onValueChange={(value) => commitFilter('parking', value)}
            allowAll
          />
        </div>
      </FilterPanelSection>

      <FilterPanelSection title="Other Services">
        <PropertyTypeSelectField
          label="Property Service"
          placeholder="Select service"
          value={selectedOtherService}
          onValueChange={(value) => commitFilter('selectedOtherService', value)}
          options={otherServiceOptions}
        />
      </FilterPanelSection>

      <FilterPanelSection title="Amenities">
        <AmenitiesMultiSelect
          value={amenities}
          onChange={(items) =>
            updateSearchFilter('amenities', items.map((item) => item.value))
          }
        />
      </FilterPanelSection>
    </div>
  );
}
