import { Search, MapPin, Building2, Wallet, SlidersHorizontal } from 'lucide-react';

export function SearchToolbar({
  search,
  onMoreFilters,
  onSearch,
}) {
  const {
    searchFilters,
    priceRange,
    priceRanges,
    availablePropertyTypes,
    districtOptions,
    handleFilterChange,
    updateSearchFilter,
    setCurrentPage,
    triggerLoading,
  } = search;

  const { district, propertyType } = searchFilters;

  const locationValue = district && district !== 'All' ? district : 'Visakhapatnam';
  const typeValue =
    propertyType.length === 1
      ? propertyType[0]
      : propertyType.length > 1
        ? `${propertyType.length} Types`
        : 'All Types';
  const budgetValue =
    priceRange > 0 ? priceRanges[priceRange].label.replace('All Prices', 'All').trim() : 'Any Budget';

  return (
    <div
      className="hidden lg:block bg-white border border-gray-100 rounded-xl shadow-sm p-3 mb-6"
      role="search"
      aria-label="Property search toolbar"
    >
      <div className="flex flex-wrap items-stretch gap-2">
        <ToolbarDropdown
          icon={<MapPin size={16} className="text-accent" aria-hidden />}
          label="Location"
          value={locationValue}
          options={districtOptions.filter((d) => d !== 'All')}
          onChange={(v) => handleFilterChange('district', v || 'Visakhapatnam')}
          fallback="Visakhapatnam"
        />
        <ToolbarDropdown
          icon={<Building2 size={16} className="text-accent" aria-hidden />}
          label="Property Type"
          value={typeValue}
          options={availablePropertyTypes.filter((t) => t !== 'All')}
          onChange={(v) => handleFilterChange('propertyType', v && v !== 'All' ? [v] : [])}
          fallback="All Types"
        />
        <ToolbarDropdown
          icon={<Wallet size={16} className="text-accent" aria-hidden />}
          label="Budget"
          value={budgetValue}
          options={priceRanges.slice(1).map((r) => r.label)}
          onChange={(label) => {
            const idx = priceRanges.findIndex((range) => range.label === label);
            updateSearchFilter('priceRange', label ? (idx >= 0 ? idx : 0) : 0);
            setCurrentPage(1);
            triggerLoading();
          }}
          fallback="Any Budget"
        />
        <button
          type="button"
          onClick={onMoreFilters}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary bg-transparent border border-gray-200 rounded-lg cursor-pointer hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap"
          aria-label="Open more filters"
        >
          <SlidersHorizontal size={16} aria-hidden />
          More Filters
        </button>
        <button
          type="button"
          onClick={onSearch}
          className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-accent border-0 rounded-lg cursor-pointer hover:bg-accent-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ml-auto min-w-[120px]"
        >
          <Search size={16} aria-hidden />
          Search
        </button>
      </div>
    </div>
  );
}

function ToolbarDropdown({
  icon,
  label,
  value,
  options,
  onChange,
  fallback,
}) {
  const id = `toolbar-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="flex-1 min-w-[160px] relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 h-full bg-white hover:border-gray-300 transition-colors">
        {icon}
        <select
          id={id}
          value={value === fallback ? '' : value}
          onChange={(e) => onChange(e.target.value || fallback)}
          className="flex-1 text-sm font-medium text-primary bg-transparent border-0 outline-none cursor-pointer appearance-none pr-6"
          aria-label={label}
        >
          <option value="">{fallback}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
