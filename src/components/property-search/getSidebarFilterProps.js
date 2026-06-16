/** Props bridge from usePropertySearch → sidebar filter fields. */
export function getSidebarFilterProps(search) {
  const {
    searchFilters,
    updateSearchFilter,
    handleFilterChange,
    districtOptions,
    mandalOptions,
    availablePropertyTypes,
    priceRanges,
    priceRange,
    setCurrentPage,
    triggerLoading,
  } = search;

  return {
    searchFilters,
    updateSearchFilter,
    handleFilterChange,
    districtOptions,
    mandalOptions,
    availablePropertyTypes,
    priceRanges,
    priceRange,
    setCurrentPage,
    triggerLoading,
  };
}
