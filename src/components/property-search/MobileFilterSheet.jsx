import { X } from 'lucide-react';
import { FilterFormFields } from './FilterFormFields';
import { OverlayPanel } from './shared';

export function MobileFilterSheet({
  open,
  onClose,
  search,
}) {
  const { resetFilters, applyFiltersAndClose } = search;

  return (
    <OverlayPanel
      open={open}
      onClose={onClose}
      side="bottom"
      ariaLabel="Filters"
    >
      <div
        className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 flex-shrink-0"
        aria-hidden
      />

      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center text-gray-600 border-0 bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          aria-label="Close filters"
        >
          <X size={22} aria-hidden />
        </button>

        <h2 className="text-lg font-bold text-primary m-0">
          Filters
        </h2>

        <button
          type="button"
          onClick={() => {
            resetFilters();
          }}
          className="text-accent text-sm font-semibold bg-transparent border-0 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
          aria-label="Reset filters"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <FilterFormFields search={search} showExtended />
      </div>

      <div className="flex-shrink-0 p-5 border-t border-gray-100 bg-white pb-8">
        <button
          type="button"
          onClick={applyFiltersAndClose}
          className="w-full py-3.5 rounded-full border-0 bg-accent text-white font-bold text-base cursor-pointer hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </OverlayPanel>
  );
}