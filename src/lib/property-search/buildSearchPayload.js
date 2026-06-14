import { hasActiveLocationValue } from './searchFilterUtils';

const FLOOR_NUMBER_MAP = {
  'Ground Floor': 0,
  '1st Floor': 1,
  '2nd Floor': 2,
  '3rd Floor': 3,
  '4+': 4,
};

function isNonEmptyString(value) {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  return Boolean(trimmed) && trimmed !== 'All';
}

function pickString(value) {
  if (!isNonEmptyString(value)) return undefined;
  return typeof value === 'string' ? value.trim() : String(value).trim();
}

function pickLocationValue(value) {
  if (!hasActiveLocationValue(value)) return undefined;
  return typeof value === 'string' ? value.trim() : String(value).trim();
}

function pickArray(value) {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  return [...value];
}

function pickNumber(value) {
  if (value == null || value === '') return undefined;

  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  if (!trimmed || trimmed === 'All') return undefined;

  const number = Number(trimmed);
  if (!Number.isFinite(number)) return undefined;

  return number;
}

function pickParking(value) {
  if (value == null || value === '') return undefined;

  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  if (!trimmed || trimmed === 'All') return undefined;
  if (trimmed === '4+') return 4;

  return pickNumber(trimmed);
}

function pickFloorNumber(value) {
  if (value == null || value === '') return undefined;

  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  if (!trimmed || trimmed === 'All') return undefined;

  if (Object.prototype.hasOwnProperty.call(FLOOR_NUMBER_MAP, trimmed)) {
    return FLOOR_NUMBER_MAP[trimmed];
  }

  return pickNumber(trimmed);
}

function toPositiveInteger(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 1) return fallback;
  return Math.floor(number);
}

/** Removes empty strings, empty arrays, and empty nested objects. */
function compactObject(object) {
  const result = {};

  Object.entries(object).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (value.length > 0) result[key] = value;
      return;
    }

    if (typeof value === 'object') {
      const nested = compactObject(value);
      if (Object.keys(nested).length > 0) result[key] = nested;
      return;
    }

    if (typeof value === 'string' && value.trim() === '') return;

    result[key] = value;
  });

  return result;
}

/**
 * Transforms searchFilters state into a clean payload for POST /api/properties/search.
 * Omits empty strings, empty arrays, and empty nested objects.
 */
export function buildSearchPayload(searchFilters, page, limit) {
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
    bedrooms,
    bathrooms,
    balconies,
    parking,
    propertyAge,
    furnishing,
    totalFloors,
    floorNumber,
    facing,
    approvedBy,
    amenities,
    sortBy,
  } = searchFilters;

  return compactObject({
    property_village: pickLocationValue(selectedVillage),
    property_district: pickLocationValue(district),
    property_mandal: pickLocationValue(mandal),
    property_panchayati: pickLocationValue(panchayati),
    listing_type: pickString(listingType),
    property_group: pickArray(propertyGroup),
    property_type: pickArray(propertyType),
    property_price_min: pickNumber(minPrice),
    property_price_max: pickNumber(maxPrice),
    property_area_min: pickNumber(minArea),
    property_area_max: pickNumber(maxArea),
    property_area_unit: pickString(areaUnit),
    property_bedrooms: pickNumber(bedrooms),
    property_bathrooms: pickNumber(bathrooms),
    property_balconies: pickNumber(balconies),
    property_parking: pickParking(parking),
    property_age: pickString(propertyAge),
    property_furnishing: pickString(furnishing),
    property_total_floors: pickNumber(totalFloors),
    property_floor_number: pickFloorNumber(floorNumber),
    property_facing: pickArray(facing),
    property_approval_authority: pickArray(approvedBy),
    property_amenities: pickArray(amenities),
    sort_by: pickString(sortBy) ?? 'newest',
    page: toPositiveInteger(page, 1),
    limit: toPositiveInteger(limit, 1),
  });
}
