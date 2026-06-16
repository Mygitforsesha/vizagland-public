import { INITIAL_SEARCH_FILTERS } from './searchFilterDefaults';

/** Returns true when a location filter value should be applied. */
export function hasActiveLocationValue(value) {
  if (value == null) return false;
  const normalized = typeof value === 'string' ? value.trim() : value;
  return Boolean(normalized) && normalized !== 'All' && normalized !== 'N/A';
}

/**
 * Applies village + district / mandal / panchayati filters.
 * Empty, "All", and "N/A" values are ignored.
 */
export function filterPropertiesByLocation(
  properties,
  { selectedVillage, district, mandal, panchayati },
) {
  let result = properties;

  if (hasActiveLocationValue(selectedVillage)) {
    const village = selectedVillage.trim();
    result = result.filter((property) => property.village === village);
  }
  if (hasActiveLocationValue(district)) {
    result = result.filter((property) => property.district === district);
  }
  if (hasActiveLocationValue(mandal)) {
    result = result.filter((property) => property.mandal === mandal);
  }
  if (hasActiveLocationValue(panchayati)) {
    result = result.filter((property) => property.panchayati === panchayati);
  }

  return result;
}

function hasStructuredLocationFilter({
  selectedVillage,
  district,
  mandal,
  panchayati,
}) {
  return (
    hasActiveLocationValue(selectedVillage)
    || hasActiveLocationValue(district)
    || hasActiveLocationValue(mandal)
    || hasActiveLocationValue(panchayati)
  );
}

/**
 * Applies a free-text location keyword against village, district, mandal,
 * panchayati, and title when structured location filters are not active.
 */
export function filterPropertiesBySearchKeyword(properties, query) {
  const trimmed = typeof query === 'string' ? query.trim() : '';
  if (!trimmed) return properties;

  const lower = trimmed.toLowerCase();

  return properties.filter((property) => {
    const fields = [
      property.village,
      property.district,
      property.mandal,
      property.panchayati,
      property.title,
    ];

    return fields.some(
      (field) => typeof field === 'string' && field.toLowerCase().includes(lower),
    );
  });
}

export function applyLocationOrKeywordFilter(
  properties,
  searchFilters,
  keywordQuery,
) {
  const locationFilters = {
    selectedVillage: searchFilters.selectedVillage,
    district: searchFilters.district,
    mandal: searchFilters.mandal,
    panchayati: searchFilters.panchayati,
  };

  if (hasStructuredLocationFilter(locationFilters)) {
    return filterPropertiesByLocation(properties, locationFilters);
  }

  return filterPropertiesBySearchKeyword(properties, keywordQuery);
}

/**
 * Applies property group / type filters.
 * Empty arrays are ignored; a property matches when its value is in the selection.
 */
export function filterPropertiesByGroupAndType(
  properties,
  { propertyGroup, propertyType },
) {
  let result = properties;

  if (propertyGroup.length > 0) {
    result = result.filter((property) => propertyGroup.includes(property.propertyGroup));
  }
  if (propertyType.length > 0) {
    result = result.filter((property) => propertyType.includes(property.propertyType));
  }

  return result;
}

function parseNumericBound(value) {
  if (value == null) return NaN;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  if (!trimmed) return NaN;
  return parseFloat(trimmed);
}

function parsePriceBound(value) {
  return parseNumericBound(value);
}

function parsePropertyArea(area) {
  return parseFloat(String(area).replace(/,/g, ''));
}

/**
 * Applies min / max price filters.
 * Empty values are ignored.
 */
export function filterPropertiesByPrice(properties, { minPrice, maxPrice }) {
  const minPriceValue = parsePriceBound(minPrice);
  const maxPriceValue = parsePriceBound(maxPrice);

  if (Number.isNaN(minPriceValue) && Number.isNaN(maxPriceValue)) {
    return properties;
  }

  return properties.filter((property) => {
    if (!Number.isNaN(minPriceValue) && property.price < minPriceValue) return false;
    if (!Number.isNaN(maxPriceValue) && property.price > maxPriceValue) return false;
    return true;
  });
}

/**
 * Applies min / max area filters.
 * Empty values are ignored.
 */
export function filterPropertiesByArea(properties, { minArea, maxArea }) {
  const minAreaValue = parseNumericBound(minArea);
  const maxAreaValue = parseNumericBound(maxArea);

  if (Number.isNaN(minAreaValue) && Number.isNaN(maxAreaValue)) {
    return properties;
  }

  return properties.filter((property) => {
    const numericArea = parsePropertyArea(property.area);
    if (!Number.isNaN(minAreaValue) && numericArea < minAreaValue) return false;
    if (!Number.isNaN(maxAreaValue) && numericArea > maxAreaValue) return false;
    return true;
  });
}

function hasActiveSpecValue(value) {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  return Boolean(trimmed) && trimmed !== 'All';
}

function getPropertyBedrooms(property) {
  if (property.bedrooms != null && property.bedrooms !== '') {
    return String(property.bedrooms);
  }

  const match = property.title?.match(/(\d+)\s*BHK/i);
  return match ? match[1] : null;
}

function getPropertySpecValue(property, field) {
  const value = property[field];
  if (value == null || value === '') return null;
  return String(value);
}

function matchesSpecFilter(propertyValue, filterValue) {
  if (propertyValue == null) return false;

  if (filterValue.endsWith('+')) {
    const min = parseInt(filterValue, 10);
    const propertyNumber = parseInt(propertyValue, 10);
    return !Number.isNaN(min) && !Number.isNaN(propertyNumber) && propertyNumber >= min;
  }

  return String(propertyValue) === String(filterValue);
}

/**
 * Applies bedrooms / bathrooms / balconies / parking filters.
 * Empty values are ignored.
 */
export function filterPropertiesByResidentialSpecs(
  properties,
  { bedrooms, bathrooms, balconies, parking },
) {
  let result = properties;

  if (hasActiveSpecValue(bedrooms)) {
    result = result.filter((property) =>
      matchesSpecFilter(getPropertyBedrooms(property), bedrooms),
    );
  }
  if (hasActiveSpecValue(bathrooms)) {
    result = result.filter((property) =>
      matchesSpecFilter(getPropertySpecValue(property, 'bathrooms'), bathrooms),
    );
  }
  if (hasActiveSpecValue(balconies)) {
    result = result.filter((property) =>
      matchesSpecFilter(getPropertySpecValue(property, 'balconies'), balconies),
    );
  }
  if (hasActiveSpecValue(parking)) {
    result = result.filter((property) =>
      matchesSpecFilter(getPropertySpecValue(property, 'parking'), parking),
    );
  }

  return result;
}

/**
 * Applies property age and furnishing filters.
 * Empty values are ignored.
 */
export function filterPropertiesByPropertyDetails(
  properties,
  { propertyAge, furnishing },
) {
  let result = properties;

  if (hasActiveSpecValue(propertyAge)) {
    result = result.filter((property) => property.propertyAge === propertyAge);
  }
  if (hasActiveSpecValue(furnishing)) {
    result = result.filter((property) => property.furnishing === furnishing);
  }

  return result;
}

function matchesTotalFloors(propertyTotalFloors, filterValue) {
  const parsedFloors = parseInt(filterValue, 10);
  if (Number.isNaN(parsedFloors)) return false;
  return propertyTotalFloors === parsedFloors;
}

function matchesFloorNumber(propertyFloorNumber, filterValue) {
  switch (filterValue) {
    case 'Ground Floor':
      return propertyFloorNumber === 0;
    case '1st Floor':
      return propertyFloorNumber === 1;
    case '2nd Floor':
      return propertyFloorNumber === 2;
    case '3rd Floor':
      return propertyFloorNumber === 3;
    case '4+':
      return propertyFloorNumber >= 4;
    default: {
      const parsedFloor = parseInt(filterValue, 10);
      return !Number.isNaN(parsedFloor) && propertyFloorNumber === parsedFloor;
    }
  }
}

/**
 * Applies total floors and floor number filters.
 * Empty values are ignored.
 */
export function filterPropertiesByBuilding(properties, { totalFloors, floorNumber }) {
  let result = properties;

  if (hasActiveSpecValue(totalFloors)) {
    result = result.filter((property) =>
      matchesTotalFloors(property.totalFloors, totalFloors),
    );
  }
  if (hasActiveSpecValue(floorNumber)) {
    result = result.filter((property) =>
      matchesFloorNumber(property.floorNumber, floorNumber),
    );
  }

  return result;
}

function matchesAnySelectedValue(propertyValue, selectedValues) {
  if (!selectedValues.length) return true;
  if (propertyValue == null) return false;

  if (Array.isArray(propertyValue)) {
    return selectedValues.some((value) => propertyValue.includes(value));
  }

  return selectedValues.includes(propertyValue);
}

/**
 * Applies facing, approval, and amenities filters.
 * Empty arrays are ignored; a property matches when it has at least one selected value.
 */
export function filterPropertiesByFeatures(
  properties,
  { facing, approvedBy, amenities },
) {
  let result = properties;

  if (facing.length > 0) {
    result = result.filter((property) => facing.includes(property.facing));
  }
  if (approvedBy.length > 0) {
    result = result.filter((property) =>
      matchesAnySelectedValue(property.approvedBy, approvedBy),
    );
  }
  if (amenities.length > 0) {
    result = result.filter((property) =>
      matchesAnySelectedValue(property.amenities, amenities),
    );
  }

  return result;
}

function getNewestSortKey(property) {
  if (property.createdAt) {
    return new Date(property.createdAt).getTime();
  }

  const idMatch = String(property.id).match(/(\d+)/);
  return idMatch ? parseInt(idMatch[1], 10) : 0;
}

/**
 * Sorts properties by the selected sort option.
 */
export function sortProperties(properties, sortBy) {
  const result = [...properties];

  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'area-asc':
      result.sort(
        (a, b) => parsePropertyArea(a.area) - parsePropertyArea(b.area),
      );
      break;
    case 'newest':
    default:
      result.sort((a, b) => getNewestSortKey(b) - getNewestSortKey(a));
      break;
  }

  return result;
}

/** Resolves Buy/Sell/Rent/Lease from mock data (`category` or `listingType`). */
export function getPropertyListingCategory(property) {
  return property.category ?? property.listingType ?? '';
}

/** Filters by selected listing type against property category. */
export function filterPropertiesByListingType(properties, listingType) {
  if (!listingType || listingType === 'All') return properties;

  return properties.filter(
    (property) => getPropertyListingCategory(property) === listingType,
  );
}

/** Returns a fresh copy of the default search filters object. */
export function createInitialSearchFilters() {
  return {
    ...INITIAL_SEARCH_FILTERS,
    propertyGroup: [...INITIAL_SEARCH_FILTERS.propertyGroup],
    propertyType: [...INITIAL_SEARCH_FILTERS.propertyType],
    amenities: [...INITIAL_SEARCH_FILTERS.amenities],
    facing: [...INITIAL_SEARCH_FILTERS.facing],
    approvedBy: [...INITIAL_SEARCH_FILTERS.approvedBy],
    quickFilters: [...INITIAL_SEARCH_FILTERS.quickFilters],
  };
}