import { X } from 'lucide-react';
import { AdvancedFilterPanel } from './AdvancedFilterPanel';
import { getAdvancedFilterProps } from './getAdvancedFilterProps';
import { OverlayPanel } from './shared';

export function MobileFilterSheet({
  open,
  onClose,
  search,
}) {
  const { resetFilters, applyFiltersAndClose, advancedActiveFilterCount, filtersResetKey } = search;

  return (
    <OverlayPanel
      open={open}
      onClose={onClose}
      side="fullscreen"
      ariaLabel="More filters"
    >
      <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="m-0 text-lg font-bold text-primary">More Filters</h2>
            {advancedActiveFilterCount > 0 && (
              <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-bold text-white">
                {advancedActiveFilterCount}
              </span>
            )}
          </div>
          <p className="m-0 mt-0.5 text-xs text-gray-500">
            Property, area, building &amp; amenities
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-100 text-gray-600 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close filters"
        >
          <X size={22} aria-hidden />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-surface px-4 py-5">
        <AdvancedFilterPanel key={filtersResetKey} {...getAdvancedFilterProps(search)} />
      </div>

      <div className="sticky bottom-0 z-10 flex shrink-0 gap-3 border-t border-gray-100 bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={resetFilters}
          className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-primary hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Reset Filters
        </button>

        <button
          type="button"
          onClick={applyFiltersAndClose}
          className="flex-1 cursor-pointer rounded-xl border-0 bg-accent py-3.5 text-sm font-semibold text-white hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </OverlayPanel>
  );
}
