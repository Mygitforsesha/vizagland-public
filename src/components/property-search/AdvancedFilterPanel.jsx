import FormTextField from '@/components/post-property/FormTextField';
import {
  AmenitiesMultiSelect,
  AreaUnitSelectField,
  BalconiesSelectField,
  BathroomsSelectField,
  BedroomsSelectField,
  FloorNumberSelectField,
  FurnishingSelectField,
  ParkingSelectField,
  PropertyAgeSelectField,
  PropertyGroupMultiSelectField,
  PropertyTypeMultiSelectField,
  TotalFloorsSelectField,
} from '@/components/post-property/fields';
import { ApprovalFilterField } from './ApprovalFilterField';
import { FacingFilterField } from './FacingFilterField';
import { FilterPanelSection } from './FilterPanelSection';
import { filterPanelStackClass } from './filterPanelStyles';

/**
 * Advanced search filters — MoreFiltersDrawer / MobileFilterSheet.
 */
export function AdvancedFilterPanel({
  searchFilters,
  updateSearchFilter,
  updateSearchFilters,
  availableAreaUnits,
  availablePropertyTypes,
  setCurrentPage,
}) {
  const {
    propertyGroup,
    propertyType,
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
  } = searchFilters;

  function commitFilter(fieldName, value) {
    updateSearchFilter(fieldName, value);
    setCurrentPage(1);
  }

  function commitFilters(partialFilters) {
    updateSearchFilters(partialFilters);
    setCurrentPage(1);
  }

  return (
    <div className={filterPanelStackClass}>
      <FilterPanelSection title="Property Details">
        <PropertyGroupMultiSelectField
          value={propertyGroup}
          onChange={(values) =>
            commitFilters({
              propertyGroup: values,
              propertyType: [],
              areaUnit: '',
              minArea: '',
              maxArea: '',
            })
          }
        />
        <PropertyTypeMultiSelectField
          className="lg:hidden"
          value={propertyType}
          onChange={(values) => commitFilter('propertyType', values)}
          options={availablePropertyTypes}
        />
        <PropertyAgeSelectField
          value={propertyAge}
          onValueChange={(value) => commitFilter('propertyAge', value)}
          allowAll
        />
        <FurnishingSelectField
          value={furnishing}
          onValueChange={(value) => commitFilter('furnishing', value)}
          allowAll
        />
      </FilterPanelSection>

      <FilterPanelSection title="Residential Details">
        <div className="grid grid-cols-2 gap-3">
          <BedroomsSelectField
            value={bedrooms}
            onValueChange={(value) => commitFilter('bedrooms', value)}
            allowAll
          />
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

      <FilterPanelSection
        title="Area"
        trailing={
          minArea || maxArea ? (
            <span className="text-xs font-medium text-gray-500 normal-case tracking-normal">
              {minArea || '0'} – {maxArea || '5000+'}
            </span>
          ) : null
        }
      >
        <div className="grid grid-cols-2 gap-3">
          <FormTextField
            label="Min Area"
            type="number"
            value={minArea}
            onChange={(event) => updateSearchFilter('minArea', event.target.value)}
            placeholder="100"
          />
          <FormTextField
            label="Max Area"
            type="number"
            value={maxArea}
            onChange={(event) => updateSearchFilter('maxArea', event.target.value)}
            placeholder="5000"
          />
        </div>
        <AreaUnitSelectField
          value={areaUnit}
          onValueChange={(value) => updateSearchFilter('areaUnit', value)}
          options={availableAreaUnits}
          allowAll
        />
      </FilterPanelSection>

      <FilterPanelSection title="Building">
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
      </FilterPanelSection>

      <FilterPanelSection title="Facing">
        <FacingFilterField
          value={facing}
          onChange={(values) => commitFilter('facing', values)}
        />
      </FilterPanelSection>

      <FilterPanelSection title="Approvals">
        <ApprovalFilterField
          value={approvedBy}
          onChange={(values) => commitFilter('approvedBy', values)}
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
