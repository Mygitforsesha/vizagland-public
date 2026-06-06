import { Map, MapPin } from 'lucide-react';
import { SidebarFacingCheckboxes } from './FilterFormFields';
import { BuyRentToggle, FloatingSelect } from './shared';

export function FilterSidebar({
  search,
  onApply,
}) {
  const {
    district,
    mandal,
    listingType,
    facing,
    areaMinInput,
    areaMaxInput,
    districtOptions,
    mandalOptions,
    resetFilters,
    handleFilterChange,
    setDistrict,
    setMandal,
    setListingPreference,
    setAreaMinInput,
    setAreaMaxInput,
    setFacing,
  } = search;

  return (
    <aside
      className="hidden lg:flex flex-col w-[280px] flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm sticky top-[180px] self-start max-h-[calc(100vh-200px)]"
      aria-label="Search filters"
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-primary m-0">Filters</h2>
            <p className="text-xs text-gray-500 m-0 mt-0.5">
              Refine your search
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="text-accent text-sm font-semibold bg-transparent border-0 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 overflow-y-auto flex-1 space-y-5">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
            <Map size={14} aria-hidden /> District
          </label>
          <FloatingSelect
            label="District"
            value={district || 'All'}
            onChange={(v) => handleFilterChange(setDistrict, v)}
            options={districtOptions}
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
            <MapPin size={14} aria-hidden /> Mandal
          </label>
          <FloatingSelect
            label="Mandal"
            value={mandal || 'All'}
            onChange={(v) => handleFilterChange(setMandal, v)}
            options={mandalOptions}
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500 block mb-2">
            Listing Type
          </span>
          <BuyRentToggle
            value={listingType}
            onChange={setListingPreference}
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500 block mb-2">
            Area Range
          </span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={areaMinInput}
              onChange={(e) => setAreaMinInput(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              aria-label="Minimum area"
            />
            <input
              type="number"
              placeholder="Max"
              value={areaMaxInput}
              onChange={(e) => setAreaMaxInput(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              aria-label="Maximum area"
            />
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500 block mb-2">
            Facing
          </span>
          <SidebarFacingCheckboxes
            selected={facing}
            onChange={(v) => handleFilterChange(setFacing, v)}
          />
        </div>
      </div>

      <div className="p-5 border-t border-gray-100">
        <button
          type="button"
          onClick={onApply}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg border-0 cursor-pointer hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}