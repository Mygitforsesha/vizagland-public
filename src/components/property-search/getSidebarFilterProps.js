/** Props bridge from usePropertySearch → sidebar filter fields. */
export function getSidebarFilterProps(search) {
  const {
    searchFilters,
    updateSearchFilter,
    handleFilterChange,
    districtOptions,
    mandalOptions,
    priceRanges,
    priceRange,
    setCurrentPage,
  } = search;

  return {
    searchFilters,
    updateSearchFilter,
    handleFilterChange,
    districtOptions,
    mandalOptions,
    priceRanges,
    priceRange,
    setCurrentPage,
  };
}
