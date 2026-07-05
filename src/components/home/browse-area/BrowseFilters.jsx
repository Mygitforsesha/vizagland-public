import VillageSearch from './VillageSearch';
import MandalFilter from './MandalFilter';

export default function BrowseFilters({
  searchQuery,
  onSearchChange,
  selectedMandal,
  mandalOptions,
  onMandalChange,
  onClear,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
      <VillageSearch value={searchQuery} onChange={onSearchChange} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end lg:shrink-0">
        <MandalFilter value={selectedMandal} options={mandalOptions} onChange={onMandalChange} />
        <button
          type="button"
          onClick={onClear}
          className="h-9 w-full shrink-0 rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 hover:border-primary hover:text-primary sm:w-auto"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
