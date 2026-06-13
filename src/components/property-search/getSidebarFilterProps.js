/** Props bridge from usePropertySearch → sidebar filter fields. */
export function getSidebarFilterProps(search) {
  const {
    searchFilters,
    updateSearchFilter,
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
    districtOptions,
    mandalOptions,
    availablePropertyTypes,
    priceRanges,
    priceRange,
    setCurrentPage,
    triggerLoading,
  };
}
