import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  searchProperties,
  villageData,
  priceRanges,
  areaRangesByUnit,
  areaUnits,
  propertyAges,
  furnishingOptions,
  propertyGroups,
} from '../../lib/searchData';
import {
  createInitialSearchFilters,
  filterPropertiesByArea,
  filterPropertiesByBuilding,
  filterPropertiesByFeatures,
  filterPropertiesByGroupAndType,
  filterPropertiesByListingType,
  filterPropertiesByLocation,
  filterPropertiesByPrice,
  filterPropertiesByPropertyDetails,
  filterPropertiesByResidentialSpecs,
  getPropertyListingCategory,
  sortProperties,
} from '../../lib/property-search/searchFilterUtils';
import {
  ADVANCED_FILTER_KEYS,
  SIDEBAR_FILTER_KEYS,
  countActiveFiltersForKeys,
  countActiveSearchFilters,
} from '../../lib/property-search/searchFilterLayers';
import { buildActiveFilterChips } from '../../lib/property-search/activeFilterChips';
import {
  buildQuickFilterChips,
  filterPropertiesByQuickFilters,
} from '../../lib/property-search/quickFilterUtils';
import { buildSearchPayload } from '../../lib/property-search/buildSearchPayload';

export const ITEMS_PER_PAGE = 6;

const LISTING_CATEGORIES = ['Buy', 'Sell', 'Rent', 'Lease'];

function logSearchPayload(searchFilters, page) {
  const payload = buildSearchPayload(searchFilters, page, ITEMS_PER_PAGE);
  console.log('Search Payload:', payload);
  return payload;
}

function pickInitialFilters(...keys) {
  const initial = createInitialSearchFilters();
  return Object.fromEntries(keys.map((key) => [key, initial[key]]));
}

function findMatchingPricePreset(minPrice, maxPrice) {
  if (!minPrice && !maxPrice) return null;

  const min = minPrice ? Number(minPrice) : 0;
  const max = maxPrice ? Number(maxPrice) : Infinity;

  return priceRanges.find(
    (range, rangeIndex) =>
      rangeIndex > 0 &&
      range.min === min &&
      (range.max === max || (!maxPrice && range.max === Infinity)),
  );
}

function findMatchingAreaPreset(areaUnit, minArea, maxArea) {
  if (!minArea && !maxArea) return null;

  const unitKey = areaUnit || 'sq.ft';
  const ranges = areaRangesByUnit[unitKey] || areaRangesByUnit['sq.ft'];
  const min = minArea ? Number(minArea) : 0;
  const max = maxArea ? Number(maxArea) : Infinity;

  return ranges.find(
    (range, rangeIndex) =>
      rangeIndex > 0 &&
      range.min === min &&
      (range.max === max || (!maxArea && range.max === Infinity)),
  );
}

function getPriceRangeIndex(minPrice, maxPrice) {
  if (!minPrice && !maxPrice) return 0;

  const preset = findMatchingPricePreset(minPrice, maxPrice);
  if (!preset) return 0;

  const index = priceRanges.indexOf(preset);
  return index >= 0 ? index : 0;
}

function getAreaRangeIndex(areaUnit, minArea, maxArea) {
  if (!minArea && !maxArea) return 0;

  const unitKey = areaUnit || 'sq.ft';
  const ranges = areaRangesByUnit[unitKey] || areaRangesByUnit['sq.ft'];
  const preset = findMatchingAreaPreset(areaUnit, minArea, maxArea);
  if (!preset) return 0;

  const index = ranges.indexOf(preset);
  return index >= 0 ? index : 0;
}

function applyPriceRangeIndex(index) {
  const rangeIndex = Number(index);
  if (!rangeIndex) {
    return { minPrice: '', maxPrice: '' };
  }

  const range = priceRanges[rangeIndex];
  if (!range) {
    return { minPrice: '', maxPrice: '' };
  }

  return {
    minPrice: String(range.min),
    maxPrice: range.max === Infinity ? '' : String(range.max),
  };
}

function applyAreaRangeIndex(areaUnit, index) {
  const rangeIndex = Number(index);
  if (!rangeIndex) {
    return { minArea: '', maxArea: '' };
  }

  const unitKey = areaUnit || 'sq.ft';
  const ranges = areaRangesByUnit[unitKey] || areaRangesByUnit['sq.ft'];
  const range = ranges[rangeIndex];
  if (!range) {
    return { minArea: '', maxArea: '' };
  }

  return {
    minArea: String(range.min),
    maxArea: range.max === Infinity ? '' : String(range.max),
  };
}

function normalizeFilterValue(value) {
  return value === 'All' ? '' : value;
}

function normalizePartialFilters(partialFilters) {
  const normalized = { ...partialFilters };

  if (Object.prototype.hasOwnProperty.call(normalized, 'priceRange')) {
    const { priceRange, ...rest } = normalized;
    Object.assign(normalized, rest, applyPriceRangeIndex(priceRange));
    delete normalized.priceRange;
  }

  if (Object.prototype.hasOwnProperty.call(normalized, 'areaRange')) {
    const { areaRange, areaUnit, ...rest } = normalized;
    Object.assign(
      normalized,
      rest,
      applyAreaRangeIndex(areaUnit ?? '', areaRange),
    );
    delete normalized.areaRange;
  }

  Object.keys(normalized).forEach((key) => {
    const value = normalized[key];
    if (key === 'propertyGroup' || key === 'propertyType') {
      normalized[key] = Array.isArray(value) ? value : value && value !== 'All' ? [value] : [];
      return;
    }
    if (key === 'facing' || key === 'approvedBy') {
      normalized[key] = Array.isArray(value) ? value : [];
      return;
    }
    if (typeof value === 'string') {
      normalized[key] = normalizeFilterValue(value);
    }
  });

  return normalized;
}

function getPriceFilterLabel(minPrice, maxPrice) {
  if (!minPrice && !maxPrice) return '';

  const preset = findMatchingPricePreset(minPrice, maxPrice);
  if (preset) {
    return preset.label.replace('All Prices', '').trim() || preset.label;
  }

  return `${minPrice || '0'} – ${maxPrice || '∞'}`;
}

function getAreaFilterLabel(areaUnit, minArea, maxArea) {
  if (!minArea && !maxArea) return '';

  const preset = findMatchingAreaPreset(areaUnit, minArea, maxArea);
  if (preset) return preset.label;

  return `${minArea || '0'} – ${maxArea || '5000+'}`;
}

export function usePropertySearch() {
  const [searchFilters, setSearchFilters] = useState(createInitialSearchFilters);
  const [villageQuery, setVillageQuery] = useState('');
  const [showVillageSuggestions, setShowVillageSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [filtersResetKey, setFiltersResetKey] = useState(0);

  const villageInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const {
    selectedVillage,
    district,
    mandal,
    panchayati,
    listingType,
    propertyGroup,
    propertyType,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    areaUnit,
    propertyAge,
    bedrooms,
    bathrooms,
    balconies,
    parking,
    facing,
    totalFloors,
    floorNumber,
    furnishing,
    approvedBy,
    amenities,
    quickFilters,
    sortBy,
  } = searchFilters;

  const priceRange = useMemo(
    () => getPriceRangeIndex(minPrice, maxPrice),
    [minPrice, maxPrice],
  );

  const areaRange = useMemo(
    () => getAreaRangeIndex(areaUnit, minArea, maxArea),
    [areaUnit, minArea, maxArea],
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        villageInputRef.current &&
        !villageInputRef.current.contains(event.target)
      ) {
        setShowVillageSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateSearchFilters = useCallback((partialFilters) => {
    setSearchFilters((previous) => ({
      ...previous,
      ...normalizePartialFilters(partialFilters),
    }));
  }, []);

  const updateSearchFilter = useCallback((fieldName, value) => {
    // Legacy preset indices from budget / area dropdowns map to min/max fields.
    if (fieldName === 'priceRange') {
      setSearchFilters((previous) => ({
        ...previous,
        ...applyPriceRangeIndex(value),
      }));
      return;
    }

    if (fieldName === 'areaRange') {
      setSearchFilters((previous) => ({
        ...previous,
        ...applyAreaRangeIndex(previous.areaUnit, value),
      }));
      return;
    }

    if (fieldName === 'facing' || fieldName === 'approvedBy') {
      value = Array.isArray(value) ? value : [];
    } else if (fieldName === 'amenities' && !Array.isArray(value)) {
      value = [];
    } else if (fieldName === 'propertyGroup' || fieldName === 'propertyType') {
      if (!Array.isArray(value)) {
        value = value && value !== 'All' ? [value] : [];
      }
    } else if (fieldName === 'quickFilters') {
      value = Array.isArray(value) ? value : [];
    } else if (typeof value === 'string') {
      value = normalizeFilterValue(value);
    }

    setSearchFilters((previous) => ({
      ...previous,
      [fieldName]: value,
    }));
  }, []);

  const availablePropertyTypes = useMemo(() => {
    const types = new Set();

    if (propertyGroup.length > 0) {
      propertyGroup.forEach((group) => {
        if (propertyGroups[group]) {
          propertyGroups[group].forEach((type) => types.add(type));
        }
      });
    } else {
      Object.values(propertyGroups).forEach((groupTypes) => {
        groupTypes.forEach((type) => types.add(type));
      });
    }

    return ['All', ...types];
  }, [propertyGroup]);

  const villageSuggestions = useMemo(() => {
    if (!villageQuery.trim()) return villageData;
    const query = villageQuery.toLowerCase();
    return villageData.filter((village) => village.name.toLowerCase().includes(query));
  }, [villageQuery]);

  const availableAreaUnits = useMemo(() => {
    if (propertyGroup.length === 0) return areaUnits;

    const units = new Set(['All']);
    propertyGroup.forEach((group) => {
      if (group === 'Agricultural') {
        units.add('sq.yds');
        units.add('Acres');
      } else if (group === 'Residential') {
        units.add('sq.ft');
      }
    });

    if (units.size === 1) return areaUnits;

    return [...units];
  }, [propertyGroup]);

  const uniqueFloors = [...new Set(searchProperties.map((property) => property.totalFloors).filter((floor) => floor > 0))].sort(
    (a, b) => a - b,
  );
  const uniqueFloorNumbers = [...new Set(searchProperties.map((property) => property.floorNumber).filter((floor) => floor > 0))].sort(
    (a, b) => a - b,
  );

  const districtOptions = useMemo(
    () => ['All', ...new Set(villageData.map((village) => village.district))],
    [],
  );
  const mandalOptions = useMemo(
    () => ['All', ...new Set(villageData.map((village) => village.mandal))],
    [],
  );
  const panchayatOptions = useMemo(
    () => ['All', ...new Set(villageData.map((village) => village.panchayati))],
    [],
  );

  function triggerLoading() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }

  const handleFilterChange = useCallback((fieldName, value) => {
    updateSearchFilter(fieldName, value);
    setCurrentPage(1);
    triggerLoading();
  }, [updateSearchFilter]);

  function handlePropertyGroupChange(value) {
    const groups = Array.isArray(value)
      ? value
      : value && value !== 'All'
        ? [value]
        : [];

    updateSearchFilters({
      propertyGroup: groups,
      ...pickInitialFilters('propertyType', 'areaUnit', 'minArea', 'maxArea'),
    });
    setCurrentPage(1);
    triggerLoading();
  }

  const handleSelectVillage = useCallback((village) => {
    const locationUpdate = {
      selectedVillage: village.name,
      district: village.district || '',
      mandal: village.mandal || '',
      panchayati: village.panchayati || '',
    };

    console.log(
      'Search Payload:',
      buildSearchPayload({ ...searchFilters, ...locationUpdate }, 1, ITEMS_PER_PAGE),
    );

    setSearchFilters((previous) => ({
      ...previous,
      ...locationUpdate,
    }));
    setVillageQuery(village.name);
    setShowVillageSuggestions(false);
    setCurrentPage(1);
    triggerLoading();
  }, [searchFilters]);

  const clearLocationFilters = useCallback(() => {
    const clearedLocation = pickInitialFilters(
      'selectedVillage',
      'district',
      'mandal',
      'panchayati',
    );

    console.log(
      'Search Payload:',
      buildSearchPayload({ ...searchFilters, ...clearedLocation }, 1, ITEMS_PER_PAGE),
    );

    setSearchFilters((previous) => ({
      ...previous,
      ...clearedLocation,
    }));
    setCurrentPage(1);
    triggerLoading();
  }, [searchFilters]);

  const resetSearchFilters = useCallback(() => {
    setSearchFilters((previous) => {
      const next = {
        ...createInitialSearchFilters(),
        listingType: previous.listingType,
        sortBy: previous.sortBy,
      };

      console.log('Search Payload:', buildSearchPayload(next, 1, ITEMS_PER_PAGE));

      return next;
    });
    setVillageQuery('');
    setShowVillageSuggestions(false);
    setCurrentPage(1);
    setFiltersResetKey((previous) => previous + 1);
    triggerLoading();
  }, []);

  function applySidebarFilters() {
    logSearchPayload(searchFilters, currentPage);
    setCurrentPage(1);
    triggerLoading();
  }

  const setSortBy = useCallback((value) => {
    updateSearchFilter('sortBy', value);
    setCurrentPage(1);
    logSearchPayload({ ...searchFilters, sortBy: value }, 1);
    triggerLoading();
  }, [updateSearchFilter, searchFilters]);

  const toggleQuickFilter = useCallback((id) => {
    setSearchFilters((previous) => ({
      ...previous,
      quickFilters: previous.quickFilters.includes(id)
        ? previous.quickFilters.filter((item) => item !== id)
        : [...previous.quickFilters, id],
    }));
    setCurrentPage(1);
    triggerLoading();
  }, []);

  const filteredBeforeQuickFilters = useMemo(() => {
    const {
      selectedVillage: activeVillage,
      district: activeDistrict,
      mandal: activeMandal,
      panchayati: activePanchayati,
      propertyGroup: activePropertyGroup,
      propertyType: activePropertyType,
      minPrice: activeMinPrice,
      maxPrice: activeMaxPrice,
      minArea: activeMinArea,
      maxArea: activeMaxArea,
      bedrooms: activeBedrooms,
      bathrooms: activeBathrooms,
      balconies: activeBalconies,
      parking: activeParking,
      propertyAge: activePropertyAge,
      furnishing: activeFurnishing,
      totalFloors: activeTotalFloors,
      floorNumber: activeFloorNumber,
      facing: activeFacing,
      approvedBy: activeApprovedBy,
      amenities: activeAmenities,
    } = searchFilters;

    let result = filterPropertiesByLocation(searchProperties, {
      selectedVillage: activeVillage,
      district: activeDistrict,
      mandal: activeMandal,
      panchayati: activePanchayati,
    });

    result = filterPropertiesByGroupAndType(result, {
      propertyGroup: activePropertyGroup,
      propertyType: activePropertyType,
    });

    result = filterPropertiesByPrice(result, {
      minPrice: activeMinPrice,
      maxPrice: activeMaxPrice,
    });

    result = filterPropertiesByArea(result, {
      minArea: activeMinArea,
      maxArea: activeMaxArea,
    });

    result = filterPropertiesByResidentialSpecs(result, {
      bedrooms: activeBedrooms,
      bathrooms: activeBathrooms,
      balconies: activeBalconies,
      parking: activeParking,
    });

    result = filterPropertiesByPropertyDetails(result, {
      propertyAge: activePropertyAge,
      furnishing: activeFurnishing,
    });

    result = filterPropertiesByBuilding(result, {
      totalFloors: activeTotalFloors,
      floorNumber: activeFloorNumber,
    });

    result = filterPropertiesByFeatures(result, {
      facing: activeFacing,
      approvedBy: activeApprovedBy,
      amenities: activeAmenities,
    });

    return result;
  }, [searchFilters]);

  const filteredBeforeCategory = useMemo(() => {
    return filterPropertiesByQuickFilters(
      filteredBeforeQuickFilters,
      searchFilters.quickFilters,
    );
  }, [filteredBeforeQuickFilters, searchFilters.quickFilters]);

  const activeListingType = searchFilters.listingType || 'Buy';

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(LISTING_CATEGORIES.map((category) => [category, 0]));

    filteredBeforeCategory.forEach((property) => {
      const category = getPropertyListingCategory(property);
      if (Object.prototype.hasOwnProperty.call(counts, category)) {
        counts[category] += 1;
      }
    });

    return counts;
  }, [filteredBeforeCategory]);

  const filtered = useMemo(() => {
    const result = filterPropertiesByListingType(
      filteredBeforeCategory,
      activeListingType,
    );
    return sortProperties(result, searchFilters.sortBy);
  }, [filteredBeforeCategory, activeListingType, searchFilters.sortBy]);

  const quickFilterChips = useMemo(
    () => buildQuickFilterChips(filteredBeforeQuickFilters, quickFilters),
    [filteredBeforeQuickFilters, quickFilters],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedResults = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const removeFilterKeys = useCallback((...keys) => {
    updateSearchFilters(pickInitialFilters(...keys));
    setCurrentPage(1);
    triggerLoading();
  }, [updateSearchFilters]);

  const removeFilterArrayItem = useCallback((key, value) => {
    setSearchFilters((previous) => ({
      ...previous,
      [key]: previous[key].filter((item) => item !== value),
    }));
    setCurrentPage(1);
    triggerLoading();
  }, []);

  const activeFilterChips = useMemo(
    () =>
      buildActiveFilterChips(
        searchFilters,
        {
          removeKeys: removeFilterKeys,
          removeArrayItem: removeFilterArrayItem,
        },
        {
          getPriceFilterLabel,
          getAreaFilterLabel,
        },
      ),
    [searchFilters, removeFilterKeys, removeFilterArrayItem],
  );

  const sidebarActiveFilterCount = useMemo(
    () => countActiveFiltersForKeys(searchFilters, SIDEBAR_FILTER_KEYS),
    [searchFilters],
  );

  const advancedActiveFilterCount = useMemo(
    () => countActiveFiltersForKeys(searchFilters, ADVANCED_FILTER_KEYS),
    [searchFilters],
  );

  const activeFilterCount = useMemo(
    () => countActiveSearchFilters(searchFilters),
    [searchFilters],
  );

  function toggleWishlist(id) {
    setWishlist((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function applyFiltersAndClose() {
    logSearchPayload(searchFilters, currentPage);
    setMoreFiltersOpen(false);
    setMobileFiltersOpen(false);
    triggerLoading();
  }

  function handlePageChange(page) {
    logSearchPayload(searchFilters, page);
    setCurrentPage(page);
    triggerLoading();
  }

  return {
    searchFilters,
    priceRange,
    areaRange,
    updateSearchFilter,
    updateSearchFilters,
    resetSearchFilters,
    resetFilters: resetSearchFilters,
    applySidebarFilters,
    villageQuery,
    setVillageQuery,
    showVillageSuggestions,
    setShowVillageSuggestions,
    currentPage,
    setCurrentPage,
    isLoading,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    moreFiltersOpen,
    setMoreFiltersOpen,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    wishlist,
    villageInputRef,
    suggestionsRef,
    availablePropertyTypes,
    villageSuggestions,
    availableAreaUnits,
    uniqueFloors,
    uniqueFloorNumbers,
    districtOptions,
    mandalOptions,
    panchayatOptions,
    propertyAges,
    furnishingOptions,
    filtered,
    paginatedResults,
    totalPages,
    activeFilterChips,
    sidebarActiveFilterCount,
    advancedActiveFilterCount,
    activeFilterCount,
    quickFilterChips,
    categoryCounts,
    filtersResetKey,
    toggleQuickFilter,
    triggerLoading,
    handleFilterChange,
    handleSelectVillage,
    clearLocationFilters,
    toggleWishlist,
    applyFiltersAndClose,
    handlePageChange,
    priceRanges,
    areaRangesByUnit,
  };
}

export function extractBhk(title, propertyType) {
  const match = title.match(/(\d+)\s*BHK/i);
  if (match) return `${match[1]} BHK`;
  if (propertyType.toLowerCase().includes('villa')) return 'Villa';
  if (propertyType.toLowerCase().includes('plot') || propertyType.toLowerCase().includes('land')) {
    return 'Plot';
  }
  return null;
}

export function formatPropertyId(id) {
  return id.startsWith('ID:') ? id : `ID: ${id}`;
}
