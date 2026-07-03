/** Props bridge from usePropertySearch → advanced filter panel. */
export function getAdvancedFilterProps(search) {
  const {
    searchFilters,
    updateSearchFilter,
    availableAreaUnits,
    setCurrentPage,
  } = search;

  return {
    searchFilters,
    updateSearchFilter,
    availableAreaUnits,
    setCurrentPage,
  };
}
