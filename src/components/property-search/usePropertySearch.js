import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  searchProperties,
  villageData,
  priceRanges,
  areaRangesByUnit,
  areaUnits,
  propertyAges,
  facingOptions,
  furnishingOptions,
  propertyGroups,
  listingTypes,
} from '../../lib/searchData';

export const ITEMS_PER_PAGE = 6;



export function usePropertySearch() {
  const [selectedVillage, setSelectedVillage] = useState('');
  const [villageQuery, setVillageQuery] = useState('');
  const [showVillageSuggestions, setShowVillageSuggestions] = useState(false);
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [panchayati, setPanchayati] = useState('');
  const [listingType, setListingType] = useState('All');
  const [propertyGroup, setPropertyGroup] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [areaRange, setAreaRange] = useState(0);
  const [areaUnit, setAreaUnit] = useState('All');
  const [propertyAge, setPropertyAge] = useState('All');
  const [facing, setFacing] = useState('All');
  const [totalFloors, setTotalFloors] = useState('All');
  const [floorNumber, setFloorNumber] = useState('All');
  const [furnishing, setFurnishing] = useState('All');
  const [areaMinInput, setAreaMinInput] = useState('');
  const [areaMaxInput, setAreaMaxInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  const villageInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        villageInputRef.current &&
        !villageInputRef.current.contains(e.target)
      ) {
        setShowVillageSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availablePropertyTypes = useMemo(() => {
    if (propertyGroup === 'All') return ['All'];
    return ['All', ...propertyGroups[propertyGroup]];
  }, [propertyGroup]);

  const villageSuggestions = useMemo(() => {
    if (!villageQuery.trim()) return villageData;
    const q = villageQuery.toLowerCase();
    return villageData.filter((v) => v.name.toLowerCase().includes(q));
  }, [villageQuery]);

  const availableAreaUnits = useMemo(() => {
    if (propertyGroup === 'Agricultural') return ['All', 'sq.yds', 'Acres'];
    if (propertyGroup === 'Residential') return ['All', 'sq.ft'];
    return areaUnits;
  }, [propertyGroup]);

  const uniqueFloors = [...new Set(searchProperties.map((p) => p.totalFloors).filter((f) => f > 0))].sort(
    (a, b) => a - b,
  );
  const uniqueFloorNumbers = [...new Set(searchProperties.map((p) => p.floorNumber).filter((f) => f > 0))].sort(
    (a, b) => a - b,
  );

  const districtOptions = useMemo(
    () => ['All', ...new Set(villageData.map((v) => v.district))],
    [],
  );
  const mandalOptions = useMemo(
    () => ['All', ...new Set(villageData.map((v) => v.mandal))],
    [],
  );
  const panchayatOptions = useMemo(
    () => ['All', ...new Set(villageData.map((v) => v.panchayati))],
    [],
  );

  function triggerLoading() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }

function handleFilterChange(setter, value) {
      setter(value);
    setCurrentPage(1);
    triggerLoading();
  }

  function handlePropertyGroupChange(value) {
    setPropertyGroup(value);
    setPropertyType('All');
    setAreaUnit('All');
    setAreaRange(0);
    setCurrentPage(1);
    triggerLoading();
  }

  function handleSelectVillage(v) {
    setSelectedVillage(v.name);
    setVillageQuery(v.name);
    setDistrict(v.district);
    setMandal(v.mandal);
    setPanchayati(v.panchayati);
    setShowVillageSuggestions(false);
    setCurrentPage(1);
    triggerLoading();
  }

  const resetFilters = useCallback(() => {
    setSelectedVillage('');
    setVillageQuery('');
    setDistrict('');
    setMandal('');
    setPanchayati('');
    setListingType('All');
    setPropertyGroup('All');
    setPropertyType('All');
    setPriceRange(0);
    setAreaRange(0);
    setAreaUnit('All');
    setPropertyAge('All');
    setFacing('All');
    setTotalFloors('All');
    setFloorNumber('All');
    setFurnishing('All');
    setAreaMinInput('');
    setAreaMaxInput('');
    setCurrentPage(1);
    triggerLoading();
  }, []);

  const filtered = useMemo(() => {
    let result = [...searchProperties];

    if (selectedVillage) {
      result = result.filter((p) => p.village === selectedVillage);
    }
    if (district && district !== 'All') {
      result = result.filter((p) => p.district === district);
    }
    if (mandal && mandal !== 'All') {
      result = result.filter((p) => p.mandal === mandal);
    }
    if (panchayati && panchayati !== 'All' && panchayati !== 'N/A') {
      result = result.filter((p) => p.panchayati === panchayati);
    }
    if (listingType !== 'All') {
      result = result.filter((p) => p.listingType === listingType);
    }
    if (propertyGroup !== 'All') {
      result = result.filter((p) => p.propertyGroup === propertyGroup);
    }
    if (propertyType !== 'All') {
      result = result.filter((p) => p.propertyType === propertyType);
    }
    if (priceRange > 0) {
      const range = priceRanges[priceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }
    if (areaRange > 0) {
      const unitKey = areaUnit === 'All' ? 'sq.ft' : areaUnit;
      const ranges = areaRangesByUnit[unitKey];
      if (ranges && ranges[areaRange]) {
        const range = ranges[areaRange];
        result = result.filter((p) => {
          const numericArea = parseFloat(p.area.replace(/,/g, ''));
          return numericArea >= range.min && numericArea <= range.max;
        });
      }
    }
    const minArea = areaMinInput.trim() ? parseFloat(areaMinInput) : NaN;
    const maxArea = areaMaxInput.trim() ? parseFloat(areaMaxInput) : NaN;
    if (!Number.isNaN(minArea) || !Number.isNaN(maxArea)) {
      result = result.filter((p) => {
        const numericArea = parseFloat(p.area.replace(/,/g, ''));
        if (!Number.isNaN(minArea) && numericArea < minArea) return false;
        if (!Number.isNaN(maxArea) && numericArea > maxArea) return false;
        return true;
      });
    }
    if (areaUnit !== 'All') {
      result = result.filter((p) => p.areaUnit === areaUnit);
    }
    if (propertyAge !== 'All') {
      result = result.filter((p) => p.propertyAge === propertyAge);
    }
    if (facing !== 'All') {
      result = result.filter((p) => p.facing === facing);
    }
    if (totalFloors !== 'All') {
      const tf = parseInt(totalFloors);
      result = result.filter((p) => p.totalFloors === tf);
    }
    if (floorNumber !== 'All') {
      const fn = parseInt(floorNumber);
      result = result.filter((p) => p.floorNumber === fn);
    }
    if (furnishing !== 'All') {
      result = result.filter((p) => p.furnishing === furnishing);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area-asc':
        result.sort(
          (a, b) =>
            parseFloat(a.area.replace(/,/g, '')) - parseFloat(b.area.replace(/,/g, '')),
        );
        break;
      default:
        break;
    }

    return result;
  }, [
    selectedVillage,
    district,
    mandal,
    panchayati,
    listingType,
    propertyGroup,
    propertyType,
    priceRange,
    areaRange,
    areaUnit,
    propertyAge,
    facing,
    totalFloors,
    floorNumber,
    furnishing,
    areaMinInput,
    areaMaxInput,
    sortBy,
  ]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedResults = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilterChips = useMemo(() => {
    const chips = [];
    const locationLabel = selectedVillage || (district && district !== 'All' ? district : '');
    if (locationLabel) {
      chips.push({
        id: 'location',
        label: locationLabel,
        onRemove: () => {
          setSelectedVillage('');
          setVillageQuery('');
          if (!district || district === 'All') {
            setDistrict('');
            setMandal('');
            setPanchayati('');
          }
          setCurrentPage(1);
          triggerLoading();
        },
      });
    }
    if (propertyType !== 'All') {
      chips.push({
        id: 'type',
        label: propertyType,
        onRemove: () => handleFilterChange(setPropertyType, 'All'),
      });
    }
    if (priceRange > 0) {
      chips.push({
        id: 'price',
        label: priceRanges[priceRange].label.replace('All Prices', '').trim() || priceRanges[priceRange].label,
        onRemove: () => {
          setPriceRange(0);
          setCurrentPage(1);
          triggerLoading();
        },
      });
    }
    if (listingType !== 'All') {
      chips.push({
        id: 'listing',
        label: listingType,
        onRemove: () => handleFilterChange(setListingType, 'All'),
      });
    }
    if (propertyGroup !== 'All') {
      chips.push({
        id: 'group',
        label: propertyGroup,
        onRemove: () => handlePropertyGroupChange('All'),
      });
    }
    if (mandal && mandal !== 'All' && !chips.some((c) => c.id === 'location')) {
      chips.push({
        id: 'mandal',
        label: mandal,
        onRemove: () => handleFilterChange(setMandal, 'All'),
      });
    }
    if (facing !== 'All') {
      chips.push({
        id: 'facing',
        label: facing,
        onRemove: () => handleFilterChange(setFacing, 'All'),
      });
    }
    if (areaUnit !== 'All') {
      chips.push({
        id: 'unit',
        label: areaUnit,
        onRemove: () => handleFilterChange(setAreaUnit, 'All'),
      });
    }
    return chips;
  }, [
    selectedVillage,
    district,
    mandal,
    propertyType,
    priceRange,
    listingType,
    propertyGroup,
    facing,
    areaUnit,
    handleFilterChange,
    handlePropertyGroupChange,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedVillage || (district && district !== 'All')) count++;
    if (mandal && mandal !== 'All') count++;
    if (panchayati && panchayati !== 'All' && panchayati !== 'N/A') count++;
    if (listingType !== 'All') count++;
    if (propertyGroup !== 'All') count++;
    if (propertyType !== 'All') count++;
    if (priceRange > 0) count++;
    if (areaRange > 0 || areaMinInput || areaMaxInput) count++;
    if (areaUnit !== 'All') count++;
    if (propertyAge !== 'All') count++;
    if (facing !== 'All') count++;
    if (totalFloors !== 'All') count++;
    if (floorNumber !== 'All') count++;
    if (furnishing !== 'All') count++;
    return count;
  }, [
    selectedVillage,
    district,
    mandal,
    panchayati,
    listingType,
    propertyGroup,
    propertyType,
    priceRange,
    areaRange,
    areaMinInput,
    areaMaxInput,
    areaUnit,
    propertyAge,
    facing,
    totalFloors,
    floorNumber,
    furnishing,
  ]);

  const hasActiveFilters = activeFilterCount > 0;

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function applyFiltersAndClose() {
    setMoreFiltersOpen(false);
    setMobileFiltersOpen(false);
    triggerLoading();
  }

  function setListingPreference(value) {
    setListingType(value);
    setCurrentPage(1);
    triggerLoading();
  }

  return {
    selectedVillage,
    setSelectedVillage,
    villageQuery,
    setVillageQuery,
    showVillageSuggestions,
    setShowVillageSuggestions,
    district,
    setDistrict,
    mandal,
    setMandal,
    panchayati,
    setPanchayati,
    listingType,
    setListingType,
    propertyGroup,
    setPropertyGroup,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    areaRange,
    setAreaRange,
    areaUnit,
    setAreaUnit,
    propertyAge,
    setPropertyAge,
    facing,
    setFacing,
    totalFloors,
    setTotalFloors,
    floorNumber,
    setFloorNumber,
    furnishing,
    setFurnishing,
    areaMinInput,
    setAreaMinInput,
    areaMaxInput,
    setAreaMaxInput,
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
    listingTypes,
    propertyGroups,
    priceRanges,
    areaRangesByUnit,
    propertyAges,
    facingOptions,
    furnishingOptions,
    filtered,
    paginatedResults,
    totalPages,
    activeFilterChips,
    activeFilterCount,
    hasActiveFilters,
    triggerLoading,
    handleFilterChange,
    handlePropertyGroupChange,
    handleSelectVillage,
    resetFilters,
    toggleWishlist,
    applyFiltersAndClose,
    setListingPreference,
  };
}


export function extractBhk(title, propertyType) { 
   const match = title.match(/(\d+)\s*BHK/i);
  if (match) return `${match[1]} BHK`;
  if (propertyType.toLowerCase().includes('villa')) return 'Villa';
  if (propertyType.toLowerCase().includes('plot') || propertyType.toLowerCase().includes('land'))
    return 'Plot';
  return null;
}

export function formatPropertyId(id) {
  return id.startsWith('ID:') ? id : `ID: ${id}`;
}
