/** Props bridge from usePropertySearch → advanced filter panel. */
export function getAdvancedFilterProps(search) {
  const {
    searchFilters,
    updateSearchFilter,
    updateSearchFilters,
    availableAreaUnits,
    availablePropertyTypes,
    setCurrentPage,
  } = search;

  return {
    searchFilters,
    updateSearchFilter,
    updateSearchFilters,
    availableAreaUnits,
    availablePropertyTypes,
    setCurrentPage,
  };
}
