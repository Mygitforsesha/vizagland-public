import { SidebarFilterFields } from './SidebarFilterFields';
import { getSidebarFilterProps } from './getSidebarFilterProps';

export function FilterSidebar({ search, onMoreFilters }) {
  const {
    resetFilters,
    applySidebarFilters,
    advancedActiveFilterCount,
    filtersResetKey,
  } = search;

  return (
    <aside
      className="hidden lg:flex flex-col w-[280px] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm sticky top-28 self-start max-h-[calc(100vh-8rem)]"
      aria-label="Property search"
    >
      <div className="shrink-0 px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-primary m-0">Search</h2>
        <p className="text-xs text-gray-500 m-0 mt-0.5">Buy, rent, location &amp; budget</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <SidebarFilterFields
          key={filtersResetKey}
          {...getSidebarFilterProps(search)}
          onMoreFilters={onMoreFilters}
          advancedActiveFilterCount={advancedActiveFilterCount}
        />
      </div>

      <div className="shrink-0 sticky bottom-0 px-4 py-4 border-t border-gray-100 bg-white flex gap-3">
        <button
          type="button"
          onClick={resetFilters}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-primary text-sm font-semibold bg-white cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Reset Filters
        </button>
        <button
          type="button"
          onClick={applySidebarFilters}
          className="flex-1 py-3 rounded-xl border-0 bg-primary text-white text-sm font-semibold cursor-pointer hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
