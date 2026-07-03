import { SlidersHorizontal } from 'lucide-react';
import SearchableSelectField from '@/components/post-property/SearchableSelectField';
import {
  BudgetSelectField,
  DistrictSelectField,
  MandalSelectField,
} from '@/components/post-property/fields';
import { toEmptySelectValue, withAllOption } from '@/components/post-property/fields/selectFieldUtils';
import { propertyCategoryOptions } from '@/lib/post-property/formOptions';

/**
 * Essential search filters — desktop sidebar only.
 */
export function SidebarFilterFields({
  searchFilters,
  updateSearchFilter,
  handleFilterChange,
  districtOptions,
  mandalOptions,
  priceRanges,
  priceRange,
  setCurrentPage,
  onMoreFilters,
  advancedActiveFilterCount = 0,
}) {
  const { district, mandal, propertyCategory } = searchFilters;

  const budgetOptions = priceRanges.map((range, index) => ({
    label: range.label,
    value: String(index),
  }));

  function commitFilter(fieldName, value) {
    if (fieldName === 'district' || fieldName === 'mandal') {
      handleFilterChange(fieldName, value);
      return;
    }

    updateSearchFilter(fieldName, value);
    setCurrentPage(1);
  }

  return (
    <div className="space-y-4">
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

      <SearchableSelectField
        label="Property Category"
        placeholder="Select Property Category"
        searchPlaceholder="Search property category..."
        value={propertyCategory}
        onValueChange={(value) => commitFilter('propertyCategory', value)}
        options={propertyCategoryOptions}
        clearable
      />

      <BudgetSelectField
        value={priceRange}
        onValueChange={(value) => commitFilter('priceRange', value)}
        options={budgetOptions}
      />

      <button
        type="button"
        onClick={onMoreFilters}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-primary text-sm font-semibold bg-white cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Open more filters${
          advancedActiveFilterCount > 0 ? `, ${advancedActiveFilterCount} active` : ''
        }`}
      >
        <SlidersHorizontal size={16} aria-hidden />
        More Filters
        {advancedActiveFilterCount > 0 && (
          <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-bold text-white">
            {advancedActiveFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}
