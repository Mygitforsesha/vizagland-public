import { usePropertySearch } from '../components/property-search/usePropertySearch';
import { useMediaQuery } from '../components/property-search/useMediaQuery';
import { SearchToolbar } from '../components/property-search/SearchToolbar';
import { FilterSidebar } from '../components/property-search/FilterSidebar';
import { MoreFiltersDrawer } from '../components/property-search/MoreFiltersDrawer';
import { MobileFilterSheet } from '../components/property-search/MobileFilterSheet';
import { MobileSearchBar } from '../components/property-search/MobileSearchBar';
import { MobileBottomNav } from '../components/property-search/MobileBottomNav';
import { ActiveFilters } from '../components/property-search/ActiveFilters';
import { SortControls } from '../components/property-search/SortControls';
import { PropertyGrid } from '../components/property-search/PropertyGrid';
import { SearchPagination } from '../components/property-search/SearchPagination';

export function PropertySearchPage() {
  const search = usePropertySearch();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const {
    filtered,
    paginatedResults,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    activeFilterChips,
    moreFiltersOpen,
    setMoreFiltersOpen,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    wishlist,
    toggleWishlist,
    resetFilters,
    triggerLoading,
  } = search;

  function openFiltersPanel() {
    if (isDesktop) {
      setMoreFiltersOpen(true);
    } else {
      setMobileFiltersOpen(true);
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    triggerLoading();
  }

  return (
    <>
      <MobileSearchBar search={search} onOpenFilters={openFiltersPanel} />

      <div className="bg-surface min-h-[calc(100vh-120px)] pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <SearchToolbar
            search={search}
            onMoreFilters={() => setMoreFiltersOpen(true)}
            onSearch={() => triggerLoading()}
          />

          <div className="flex gap-6 items-start">
            <FilterSidebar search={search} onApply={() => triggerLoading()} />

            <div className="flex-1 min-w-0">
              <div className="hidden lg:block">
                <ActiveFilters chips={activeFilterChips} onClearAll={resetFilters} variant="desktop" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 lg:mb-5">
                <p className="text-sm lg:text-base text-gray-700 m-0">
                  <span className="font-bold text-primary">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'Property' : 'Properties'} Found
                </p>
                <div className="hidden lg:flex items-center gap-4">
                  <SortControls
                    sortBy={sortBy}
                    onSortChange={(v) => {
                      setSortBy(v);
                      setCurrentPage(1);
                      triggerLoading();
                    }}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>
                <div className="lg:hidden flex items-center justify-between gap-2 flex-wrap">
                  {activeFilterChips.length > 0 && (
                    <ActiveFilters
                      chips={activeFilterChips}
                      onClearAll={resetFilters}
                      variant="mobile"
                    />
                  )}
                </div>
              </div>

              <PropertyGrid
                isLoading={isLoading}
                results={paginatedResults}
                totalCount={filtered.length}
                viewMode={viewMode}
                variant={isDesktop ? 'desktop' : 'mobile'}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onResetFilters={resetFilters}
              />

              <SearchPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav />

      {isDesktop ? (
        <MoreFiltersDrawer
          open={moreFiltersOpen}
          onClose={() => setMoreFiltersOpen(false)}
          search={search}
        />
      ) : (
        <MobileFilterSheet
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          search={search}
        />
      )}
    </>
  );
}
