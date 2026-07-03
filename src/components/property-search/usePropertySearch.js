import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  applyLocationOrKeywordFilter,
  createInitialSearchFilters,
  filterPropertiesByArea,
  filterPropertiesByBuilding,
  filterPropertiesByFeatures,
  filterPropertiesByGroupAndType,
  filterPropertiesByPrice,
  filterPropertiesByPropertyDetails,
  filterPropertiesByResidentialSpecs,
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
import { fetchPropertySearchResults } from '../../services/propertySearchService';
import { getDynamicAreaUnitOptions } from '../../lib/post-property/formOptions';
import {
  PAGE_QUERY_PARAM,
  buildSyncableUrlUpdates,
  getSyncableUrlSignature,
  mergeSearchParams,
  parseSyncableStateFromUrl,
  resolveSearchQueryToFilters,
} from '../../lib/property-search/searchUrlSync';

export const ITEMS_PER_PAGE = 6;

const EMPTY_CATEGORY_COUNTS = {
  All: 0,
  Buy: 0,
  Sell: 0,
  Rent: 0,
  Lease: 0,
};

const EMPTY_PAGINATION = {
  page: 1,
  limit: ITEMS_PER_PAGE,
  total: 0,
  totalPages: 1,
};

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialUrlState = parseSyncableStateFromUrl(searchParams, villageData);

  const [searchFilters, setSearchFilters] = useState(() => ({
    ...createInitialSearchFilters(),
    listingType: initialUrlState.listingType,
    district: initialUrlState.district,
    mandal: initialUrlState.mandal,
    selectedVillage: initialUrlState.selectedVillage,
    panchayati: initialUrlState.panchayati,
  }));
  const [villageQuery, setVillageQuery] = useState(initialUrlState.villageQuery);
  const [showVillageSuggestions, setShowVillageSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialUrlState.page);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [categoryCounts, setCategoryCounts] = useState(EMPTY_CATEGORY_COUNTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [filtersResetKey, setFiltersResetKey] = useState(0);

  const villageInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const syncedUrlSignatureRef = useRef(getSyncableUrlSignature(searchParams));
  const searchRequestIdRef = useRef(0);

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

  const writeSyncableUrl = useCallback((state, { replace = false } = {}) => {
    setSearchParams((previous) => {
      const next = mergeSearchParams(previous, buildSyncableUrlUpdates(state));
      syncedUrlSignatureRef.current = getSyncableUrlSignature(next);
      return next;
    }, { replace });
  }, [setSearchParams]);

  useEffect(() => {
    const signature = getSyncableUrlSignature(searchParams);
    const urlState = parseSyncableStateFromUrl(searchParams, villageData);

    if (syncedUrlSignatureRef.current !== signature) {
      syncedUrlSignatureRef.current = signature;
      setVillageQuery(urlState.villageQuery);
      setSearchFilters((previous) => {
        const next = {
          ...previous,
          listingType: urlState.listingType,
          district: urlState.district,
          mandal: urlState.mandal,
          selectedVillage: urlState.selectedVillage,
          panchayati: urlState.panchayati,
        };

        return next;
      });
      setShowVillageSuggestions(false);
    }

    setCurrentPage((previous) => (previous === urlState.page ? previous : urlState.page));
  }, [searchParams]);

  const searchPayloadSignature = useMemo(
    () => JSON.stringify(buildSearchPayload(searchFilters, currentPage, ITEMS_PER_PAGE)),
    [searchFilters, currentPage],
  );

  useEffect(() => {
    const requestId = searchRequestIdRef.current + 1;
    searchRequestIdRef.current = requestId;
    const payload = JSON.parse(searchPayloadSignature);

    async function runSearch() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchPropertySearchResults(payload);

        if (searchRequestIdRef.current !== requestId) return;

        setProperties(result.properties);
        setPagination(result.pagination);
        setCategoryCounts(result.categoryCounts ?? EMPTY_CATEGORY_COUNTS);
      } catch (searchError) {
        if (searchRequestIdRef.current !== requestId) return;

        setError(searchError);
        setProperties([]);
        setPagination(EMPTY_PAGINATION);
        setCategoryCounts(EMPTY_CATEGORY_COUNTS);
      } finally {
        if (searchRequestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    }

    runSearch();
  }, [searchPayloadSignature]);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
    setSearchParams(
      (previous) => {
        const next = mergeSearchParams(previous, { [PAGE_QUERY_PARAM]: null });
        syncedUrlSignatureRef.current = getSyncableUrlSignature(next);
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const commitLocationSearch = useCallback((rawQuery, { replace = false } = {}) => {
    const trimmed = rawQuery.trim();
    const { filters } = resolveSearchQueryToFilters(trimmed, villageData);

    setVillageQuery(trimmed);
    setSearchFilters((previous) => {
      const next = {
        ...previous,
        ...filters,
      };

      return next;
    });
    setShowVillageSuggestions(false);
    setCurrentPage(1);

    writeSyncableUrl({
      listingType: searchFilters.listingType,
      district: filters.district,
      mandal: filters.mandal,
      selectedVillage: filters.selectedVillage,
      villageQuery: trimmed,
      page: 1,
    }, { replace });
  }, [searchFilters.listingType, writeSyncableUrl]);

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

    if (fieldName === 'propertyCategory') {
      setSearchFilters((previous) => ({
        ...previous,
        propertyCategory: typeof value === 'string' ? normalizeFilterValue(value) : '',
        areaUnit: value !== previous.propertyCategory ? '' : previous.areaUnit,
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

  const dynamicAreaUnitOptions = useMemo(
    () => getDynamicAreaUnitOptions({ propertyCategory: searchFilters.propertyCategory }),
    [searchFilters.propertyCategory],
  );

  const availableAreaUnits = useMemo(() => {
    if (searchFilters.propertyCategory) {
      return ['All', ...dynamicAreaUnitOptions.map((option) => option.value)];
    }

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
  }, [searchFilters.propertyCategory, dynamicAreaUnitOptions, propertyGroup]);

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

  const handleFilterChange = useCallback((fieldName, value) => {
    updateSearchFilter(fieldName, value);

    if (fieldName === 'listingType' || fieldName === 'district' || fieldName === 'mandal') {
      const normalizedValue = typeof value === 'string' && value === 'All' ? '' : value;

      setCurrentPage(1);
      writeSyncableUrl({
        listingType: fieldName === 'listingType' ? normalizedValue : searchFilters.listingType,
        district: fieldName === 'district' ? normalizedValue : searchFilters.district,
        mandal: fieldName === 'mandal' ? normalizedValue : searchFilters.mandal,
        selectedVillage: searchFilters.selectedVillage,
        villageQuery,
        page: 1,
      });
      return;
    }

    resetToFirstPage();
  }, [
    updateSearchFilter,
    resetToFirstPage,
    writeSyncableUrl,
    searchFilters.listingType,
    searchFilters.district,
    searchFilters.mandal,
    searchFilters.selectedVillage,
    villageQuery,
  ]);

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
    resetToFirstPage();
  }

  const handleSelectVillage = useCallback((village) => {
    commitLocationSearch(village.name);
  }, [commitLocationSearch]);

  const clearLocationFilters = useCallback(() => {
    commitLocationSearch('');
  }, [commitLocationSearch]);

  const resetSearchFilters = useCallback(() => {
    setSearchFilters((previous) => {
      const next = {
        ...createInitialSearchFilters(),
        listingType: previous.listingType,
        sortBy: previous.sortBy,
      };

      return next;
    });
    setVillageQuery('');
    setShowVillageSuggestions(false);
    setCurrentPage(1);
    setFiltersResetKey((previous) => previous + 1);

    writeSyncableUrl({
      listingType: searchFilters.listingType,
      district: '',
      mandal: '',
      selectedVillage: '',
      villageQuery: '',
      page: 1,
    });
  }, [searchFilters.listingType, writeSyncableUrl]);

  function applySidebarFilters() {
    resetToFirstPage();
  }

  const setSortBy = useCallback((value) => {
    updateSearchFilter('sortBy', value);
    resetToFirstPage();
  }, [updateSearchFilter, resetToFirstPage]);

  const toggleQuickFilter = useCallback((id) => {
    setSearchFilters((previous) => ({
      ...previous,
      quickFilters: previous.quickFilters.includes(id)
        ? previous.quickFilters.filter((item) => item !== id)
        : [...previous.quickFilters, id],
    }));
    resetToFirstPage();
  }, [resetToFirstPage]);

  const filteredBeforeQuickFilters = useMemo(() => {
    const {
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

    let result = applyLocationOrKeywordFilter(searchProperties, searchFilters, villageQuery);

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
  }, [searchFilters, villageQuery]);

  const quickFilterChips = useMemo(
    () => buildQuickFilterChips(filteredBeforeQuickFilters, quickFilters),
    [filteredBeforeQuickFilters, quickFilters],
  );

  const paginatedResults = useMemo(
    () => filterPropertiesByQuickFilters(properties, quickFilters),
    [properties, quickFilters],
  );

  const totalPages = pagination.totalPages;

  const removeFilterKeys = useCallback((...keys) => {
    updateSearchFilters(pickInitialFilters(...keys));

    const clearsVillage = keys.includes('selectedVillage');
    const clearsDistrict = keys.includes('district');
    const clearsMandal = keys.includes('mandal');

    if (clearsVillage || clearsDistrict || clearsMandal) {
      if (clearsVillage) {
        setVillageQuery('');
      }

      setCurrentPage(1);
      writeSyncableUrl({
        listingType: searchFilters.listingType,
        district: clearsDistrict ? '' : searchFilters.district,
        mandal: clearsMandal ? '' : searchFilters.mandal,
        selectedVillage: clearsVillage ? '' : searchFilters.selectedVillage,
        villageQuery: clearsVillage ? '' : villageQuery,
        page: 1,
      });
      return;
    }

    resetToFirstPage();
  }, [
    updateSearchFilters,
    resetToFirstPage,
    writeSyncableUrl,
    searchFilters.listingType,
    searchFilters.district,
    searchFilters.mandal,
    searchFilters.selectedVillage,
    villageQuery,
  ]);

  const removeFilterArrayItem = useCallback((key, value) => {
    setSearchFilters((previous) => ({
      ...previous,
      [key]: previous[key].filter((item) => item !== value),
    }));
    resetToFirstPage();
  }, [resetToFirstPage]);

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
    resetToFirstPage();
    setMoreFiltersOpen(false);
    setMobileFiltersOpen(false);
  }

  function handlePageChange(page) {
    setCurrentPage(page);

    writeSyncableUrl({
      listingType: searchFilters.listingType,
      district: searchFilters.district,
      mandal: searchFilters.mandal,
      selectedVillage: searchFilters.selectedVillage,
      villageQuery,
      page,
    }, { replace: true });
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
    properties,
    pagination,
    isLoading,
    error,
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
    handleFilterChange,
    handleSelectVillage,
    clearLocationFilters,
    commitLocationSearch,
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
