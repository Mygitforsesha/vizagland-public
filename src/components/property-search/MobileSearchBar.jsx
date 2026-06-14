import { SlidersHorizontal } from 'lucide-react';
import { SortControls } from './SortControls';
import { VillageSearchField } from './VillageSearchField';

export function MobileSearchBar({
  search,
  onOpenFilters,
}) {
  const {
    advancedActiveFilterCount,
    sortBy,
    setSortBy,
  } = search;

  return (
    <div className="lg:hidden bg-surface px-4 pt-3 pb-1">
      <div className="flex items-center gap-2.5">
        <VillageSearchField search={search} variant="mobile" />

        <button
          type="button"
          onClick={onOpenFilters}
          className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white border-0 cursor-pointer shadow-sm hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Open filters${
            advancedActiveFilterCount > 0 ? `, ${advancedActiveFilterCount} active` : ''
          }`}
        >
          <SlidersHorizontal size={20} aria-hidden />

          {advancedActiveFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-bold px-1">
              {advancedActiveFilterCount}
            </span>
          )}
        </button>

        <SortControls
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={search.viewMode}
          onViewModeChange={search.setViewMode}
          compact
        />
      </div>
    </div>
  );
}
