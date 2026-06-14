/**
 * Search filter UI layers — sidebar (essential) vs more-filters (advanced).
 * All values still live in a single searchFilters object from usePropertySearch.
 */

import { INITIAL_SEARCH_FILTERS } from './searchFilterDefaults';

/** Filters shown in the desktop sidebar. */
export const SIDEBAR_FILTER_KEYS = [
  'district',
  'mandal',
  'propertyType',
  'minPrice',
  'maxPrice',
];

/** Filters shown in MoreFiltersDrawer / MobileFilterSheet. */
export const ADVANCED_FILTER_KEYS = [
  'selectedVillage',
  'panchayati',
  'propertyGroup',
  'minArea',
  'maxArea',
  'areaUnit',
  'bedrooms',
  'bathrooms',
  'balconies',
  'parking',
  'propertyAge',
  'furnishing',
  'amenities',
  'totalFloors',
  'floorNumber',
  'facing',
  'approvedBy',
];

const SEARCH_FILTER_COUNT_KEYS = Object.keys(INITIAL_SEARCH_FILTERS).filter(
  (key) => key !== 'sortBy',
);

function isActiveBound(value) {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  return Boolean(trimmed);
}

function isActiveStringFilter(key, value) {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  if (!trimmed || trimmed === 'All') return false;
  if (key === 'panchayati' && trimmed === 'N/A') return false;
  return true;
}

function isActiveFilterValue(key, value) {
  if (key === 'sortBy') return false;

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'string') {
    return isActiveStringFilter(key, value);
  }

  return Boolean(value);
}

/** Count active filters for a given layer or the full searchFilters object. */
export function countActiveFiltersForKeys(filters, keys) {
  let count = 0;

  keys.forEach((key) => {
    if (key === 'sortBy') return;

    if (key === 'minPrice' || key === 'maxPrice') {
      if (key === 'minPrice' && (isActiveBound(filters.minPrice) || isActiveBound(filters.maxPrice))) {
        count++;
      }
      return;
    }

    if (key === 'minArea' || key === 'maxArea') {
      if (key === 'minArea' && (isActiveBound(filters.minArea) || isActiveBound(filters.maxArea))) {
        count++;
      }
      return;
    }

    if (isActiveFilterValue(key, filters[key])) {
      count++;
    }
  });

  return count;
}

/** Count all active search filters (excludes sortBy). */
export function countActiveSearchFilters(filters) {
  return countActiveFiltersForKeys(filters, SEARCH_FILTER_COUNT_KEYS);
}
