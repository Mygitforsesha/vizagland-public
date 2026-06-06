import { X } from 'lucide-react';
import { FilterFormFields } from './FilterFormFields';
import { OverlayPanel } from './shared';

export function MoreFiltersDrawer({
  open,
  onClose,
  search,
}) {
  const { resetFilters, applyFiltersAndClose } = search;

  return (
    <OverlayPanel
      open={open}
      onClose={onClose}
      side="right"
      ariaLabel="More filters"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-bold text-primary m-0">
          More Filters
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close more filters"
        >
          <X size={20} aria-hidden />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <FilterFormFields search={search} showExtended />
      </div>

      <div className="flex-shrink-0 p-5 border-t border-gray-100 bg-white flex gap-3">
        <button
          type="button"
          onClick={() => {
            resetFilters();
            onClose();
          }}
          className="flex-1 py-3 rounded-lg border border-gray-300 text-primary font-semibold bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Reset Filters
        </button>

        <button
          type="button"
          onClick={applyFiltersAndClose}
          className="flex-1 py-3 rounded-lg border-0 bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </OverlayPanel>
  );
}