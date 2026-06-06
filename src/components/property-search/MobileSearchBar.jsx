import { Search, SlidersHorizontal, X, MapPin } from 'lucide-react';
import { SortControls } from './SortControls';

export function MobileSearchBar({
  search,
  onOpenFilters,
}) {
  const {
    villageQuery,
    setVillageQuery,
    setSelectedVillage,
    setDistrict,
    setMandal,
    setPanchayati,
    setShowVillageSuggestions,
    showVillageSuggestions,
    villageSuggestions,
    villageInputRef,
    suggestionsRef,
    handleSelectVillage,
    activeFilterCount,
    sortBy,
    setSortBy,
    triggerLoading,
  } = search;

  return (
    <div className="lg:hidden bg-surface px-4 pt-4 pb-3">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden
          />

          <input
            ref={villageInputRef}
            type="search"
            value={villageQuery}
            onChange={(e) => {
              setVillageQuery(e.target.value);
              setShowVillageSuggestions(true);

              if (!e.target.value.trim()) {
                setSelectedVillage('');
                setDistrict('');
                setMandal('');
                setPanchayati('');
              }
            }}
            onFocus={() => setShowVillageSuggestions(true)}
            placeholder="Visakhapatnam"
            className="w-full bg-white rounded-xl pl-10 pr-10 py-3 text-sm border border-gray-100 shadow-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            aria-label="Search location or village"
          />

          {villageQuery && (
            <button
              type="button"
              onClick={() => {
                setVillageQuery('');
                setSelectedVillage('');
                setDistrict('');
                setMandal('');
                setPanchayati('');
                triggerLoading();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-0 bg-transparent cursor-pointer p-0"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          {showVillageSuggestions && villageQuery.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50"
            >
              {villageSuggestions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No villages found
                </div>
              ) : (
                villageSuggestions.slice(0, 6).map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => handleSelectVillage(v)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 border-0 bg-transparent cursor-pointer flex items-center gap-2 text-gray-700"
                  >
                    <MapPin
                      size={12}
                      className="text-gray-400"
                      aria-hidden
                    />
                    {v.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenFilters}
          className="relative w-11 h-11 flex items-center justify-center rounded-lg bg-primary text-white border-0 cursor-pointer hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Open filters${
            activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''
          }`}
        >
          <SlidersHorizontal size={20} aria-hidden />

          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-bold px-1">
              {activeFilterCount}
            </span>
          )}
        </button>

        <SortControls
          sortBy={sortBy}
          onSortChange={(v) => {
            setSortBy(v);
            search.setCurrentPage(1);
            search.triggerLoading();
          }}
          viewMode={search.viewMode}
          onViewModeChange={search.setViewMode}
          compact
        />
      </div>
    </div>
  );
}