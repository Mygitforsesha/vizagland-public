import { ActiveFilters } from './ActiveFilters';
import { SortControls } from './SortControls';

export function ResultsHeader({
  count,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFilterChips = [],
  onClearAllFilters,
}) {
  const hasActiveChips = activeFilterChips.length > 0;

  return (
    <header className="mb-3 lg:mb-5">
      <div className="flex items-center justify-between gap-3 lg:gap-6">
        <p
          className="m-0 min-w-0 text-lg sm:text-xl lg:text-2xl font-bold leading-tight tracking-tight"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-primary">{count}</span>
          <span className="ml-1.5 text-gray-600 font-medium">Properties Found</span>
        </p>

        <div className="hidden lg:flex shrink-0 items-center">
          <SortControls
            sortBy={sortBy}
            onSortChange={onSortChange}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
        </div>
      </div>

      {hasActiveChips && (
        <div className="mt-2.5 lg:hidden">
          <ActiveFilters
            chips={activeFilterChips}
            onClearAll={onClearAllFilters}
            variant="mobile"
          />
        </div>
      )}
    </header>
  );
}
