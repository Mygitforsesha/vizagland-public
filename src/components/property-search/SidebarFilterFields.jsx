import {
  BudgetSelectField,
  DistrictSelectField,
  MandalSelectField,
  PropertyTypeMultiSelectField,
} from '@/components/post-property/fields';
import { toEmptySelectValue, withAllOption } from '@/components/post-property/fields/selectFieldUtils';
import { BuyRentToggle } from './shared';

/**
 * Essential search filters — desktop sidebar only.
 */
export function SidebarFilterFields({
  searchFilters,
  updateSearchFilter,
  districtOptions,
  mandalOptions,
  availablePropertyTypes,
  priceRanges,
  priceRange,
  setCurrentPage,
  triggerLoading,
}) {
  const { district, mandal, propertyType, listingType } = searchFilters;

  const budgetOptions = priceRanges.map((range, index) => ({
    label: range.label,
    value: String(index),
  }));

  function commitFilter(fieldName, value) {
    updateSearchFilter(fieldName, value);
    setCurrentPage(1);
    triggerLoading();
  }

  return (
    <div className="space-y-4">
      <BuyRentToggle
        value={listingType || 'All'}
        onChange={(value) => commitFilter('listingType', value)}
      />

      <div className="rounded-xl border border-gray-100 bg-surface p-4 space-y-4">
        <DistrictSelectField
          value={toEmptySelectValue(district, '')}
          onValueChange={(value) => commitFilter('district', value)}
          options={withAllOption(districtOptions, 'All Districts')}
        />
        <MandalSelectField
          value={toEmptySelectValue(mandal, '')}
          onValueChange={(value) => commitFilter('mandal', value)}
          options={withAllOption(mandalOptions, 'All Mandals')}
        />
      </div>

      <PropertyTypeMultiSelectField
        value={propertyType}
        onChange={(values) => commitFilter('propertyType', values)}
        options={availablePropertyTypes}
      />

      <BudgetSelectField
        value={priceRange}
        onValueChange={(value) => commitFilter('priceRange', value)}
        options={budgetOptions}
      />
    </div>
  );
}
