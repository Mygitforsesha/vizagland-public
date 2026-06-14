import { usePropertySearch } from '../components/property-search/usePropertySearch';
import { useMediaQuery } from '../components/property-search/useMediaQuery';
import { FilterSidebar } from '../components/property-search/FilterSidebar';
import { MoreFiltersDrawer } from '../components/property-search/MoreFiltersDrawer';
import { MobileFilterSheet } from '../components/property-search/MobileFilterSheet';
import { MobileSearchBar } from '../components/property-search/MobileSearchBar';
import { MobileBottomNav } from '../components/property-search/MobileBottomNav';
import { ResultsHeader } from '../components/property-search/ResultsHeader';
import { PropertyGrid } from '../components/property-search/PropertyGrid';
import { SearchPagination } from '../components/property-search/SearchPagination';
import PropertyCategoryTabs from '../components/property-search/PropertyCategoryTabs';
import { QuickFilterChips } from '@/components/property-search/QuickFilterChip';
import { VillageSearchField } from '../components/property-search/VillageSearchField';



export function PropertySearchPage() {
  const search = usePropertySearch();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const {
    filtered,
    paginatedResults,
    totalPages,
    currentPage,
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
    handlePageChange,
  } = search;

  function openFiltersPanel() {
    if (isDesktop) {
      setMoreFiltersOpen(true);
    } else {
      setMobileFiltersOpen(true);
    }
  }

  return (
    <>
      <MobileSearchBar search={search} onOpenFilters={openFiltersPanel} />

      <div className="bg-surface min-h-[calc(100vh-120px)] pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 pt-0 pb-4 lg:py-6">
          <div className="mt-3 lg:mt-0 bg-white rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-4 pt-1.5 pb-0 lg:px-6 lg:pt-3">
              <div className="lg:flex lg:justify-between lg:items-center lg:gap-4">
                <div className="min-w-0 flex-1">
                  <PropertyCategoryTabs search={search} />
                </div>
                <VillageSearchField
                  search={search}
                  variant="desktop"
                  className="hidden lg:block"
                />
              </div>
            </div>

            <div className="mx-4 lg:mx-6 border-t border-gray-100" />

            <div className="px-4 py-1.5 lg:px-6 lg:py-3">
              <QuickFilterChips
                chips={search.quickFilterChips}
                onToggle={search.toggleQuickFilter}
                onClear={search.resetSearchFilters}
              />
            </div>
          </div>

          <div className="mt-3 lg:mt-6 flex gap-8 items-start">
            <FilterSidebar
              search={search}
              onMoreFilters={() => setMoreFiltersOpen(true)}
            />

            <div className="flex-1 min-w-0">
              <ResultsHeader
                count={filtered.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                activeFilterChips={activeFilterChips}
                onClearAllFilters={resetFilters}
              />

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


              <div className='mt-6'>
                <SearchPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>

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
