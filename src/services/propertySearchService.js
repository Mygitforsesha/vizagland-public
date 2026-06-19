import { postPropertySearch } from '../api/propertySearchApi';

const LISTING_CATEGORIES = ['Buy', 'Sell', 'Rent', 'Lease'];

const EMPTY_CATEGORY_COUNTS = Object.fromEntries(
  ['All', ...LISTING_CATEGORIES].map((category) => [category, 0]),
);

function pickString(...values) {
  for (const value of values) {
    if (value == null) continue;
    const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function pickNumber(...values) {
  for (const value of values) {
    if (value == null || value === '') continue;
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return 0;
}

function pickBoolean(...values) {
  for (const value of values) {
    if (typeof value === 'boolean') return value;
    if (value === 1 || value === '1' || value === 'true') return true;
    if (value === 0 || value === '0' || value === 'false') return false;
  }
  return false;
}

function formatPriceLabel(price, fallback) {
  if (fallback) return fallback;
  if (!price) return '';

  if (price >= 10000000) {
    const crores = price / 10000000;
    return `${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2).replace(/\.?0+$/, '')} Cr`;
  }

  if (price >= 100000) {
    const lakhs = price / 100000;
    return `${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2).replace(/\.?0+$/, '')} Lakh`;
  }

  return String(price);
}

function getRecordSection(raw, key) {
  const section = raw?.[key];
  return section && typeof section === 'object' ? section : {};
}

function resolvePropertyImage(raw) {
  const imageList = raw.property_images
    ?? raw.propertyImages
    ?? raw.images
    ?? raw.media
    ?? [];

  if (typeof imageList === 'string') return imageList;

  if (Array.isArray(imageList) && imageList.length > 0) {
    const first = imageList[0];
    if (typeof first === 'string') return first;

    return pickString(
      first?.url,
      first?.image_url,
      first?.imageUrl,
      first?.path,
      first?.file_url,
      first?.fileUrl,
    );
  }

  return pickString(
    raw.image,
    raw.image_url,
    raw.imageUrl,
    raw.thumbnail,
    raw.cover_image,
    raw.coverImage,
  );
}

function resolvePropertyType(raw, groups) {
  return pickString(
    raw.propertyType,
    raw.property_type,
    raw.propertyTypeName,
    groups.property_residential_type,
    groups.property_commercial_type,
    groups.property_development_type,
    groups.property_layout_type,
    groups.property_construction_type,
    groups.property_house_type,
  );
}

function resolvePropertyTitle(raw, details, propertyType) {
  const explicitTitle = pickString(
    raw.title,
    raw.property_title,
    raw.propertyTitle,
    raw.name,
    details.property_title,
  );

  if (explicitTitle) return explicitTitle;

  const bedrooms = pickNumber(details.property_bedrooms, raw.property_bedrooms, raw.bedrooms);
  if (bedrooms > 0 && propertyType) {
    return `${bedrooms} BHK ${propertyType}`;
  }

  return propertyType || 'Property Listing';
}

/** Maps a single API property record to the UI card shape. */
export function mapPropertyRecord(raw = {}) {
  const location = getRecordSection(raw, 'property_location');
  const details = getRecordSection(raw, 'property_details');
  const groups = getRecordSection(raw, 'property_group_and_types');
  const propertyType = resolvePropertyType(raw, groups);
  const price = pickNumber(
    raw.price,
    details.property_price,
    raw.property_price,
    raw.propertyPrice,
  );
  const areaValue = details.property_area ?? raw.property_area ?? raw.area ?? raw.propertyArea;

  return {
    id: pickString(raw.id, raw.property_id, raw.propertyId, raw.reference_id, raw.referenceId),
    title: resolvePropertyTitle(raw, details, propertyType),
    village: pickString(location.property_village, raw.village, raw.property_village, raw.propertyVillage),
    district: pickString(location.property_district, raw.district, raw.property_district, raw.propertyDistrict),
    mandal: pickString(location.property_mandal, raw.mandal, raw.property_mandal, raw.propertyMandal),
    panchayati: pickString(
      location.property_panchayati,
      raw.panchayati,
      raw.property_panchayati,
      raw.propertyPanchayati,
    ),
    listingType: pickString(
      raw.listingType,
      raw.listing_type,
      raw.property_listing_type,
      raw.property_listing_type_name,
    ),
    verified: pickBoolean(raw.verified, raw.is_verified, raw.isVerified),
    propertyGroup: pickString(raw.propertyGroup, raw.property_group, raw.propertyGroupName),
    propertyType,
    price,
    priceLabel: formatPriceLabel(
      price,
      pickString(
        details.property_price_range,
        raw.priceLabel,
        raw.price_label,
        raw.property_price_label,
      ),
    ),
    area: areaValue == null || areaValue === '' ? '' : String(areaValue),
    areaUnit: pickString(
      details.property_area_unit,
      raw.areaUnit,
      raw.area_unit,
      raw.property_area_unit,
    ),
    facing: pickString(details.property_facing, raw.facing, raw.property_facing),
    furnishing: pickString(details.property_furnishing, raw.furnishing, raw.property_furnishing),
    totalFloors: pickNumber(
      details.property_total_floors,
      raw.totalFloors,
      raw.total_floors,
      raw.property_total_floors,
    ),
    floorNumber: pickNumber(
      details.property_floor_number,
      raw.floorNumber,
      raw.floor_number,
      raw.property_floor_number,
    ),
    propertyAge: pickString(details.property_age, raw.propertyAge, raw.property_age),
    image: resolvePropertyImage(raw),
  };
}

/**
 * API shape:
 * { status, message, data: { data: Property[], pagination: {...}, ...counts } }
 */
function extractPropertyList(data) {
  const inner = data?.data;

  if (Array.isArray(inner?.data)) return inner.data;
  if (Array.isArray(data?.properties)) return data.properties;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(inner?.properties)) return inner.properties;
  if (Array.isArray(inner?.items)) return inner.items;
  if (Array.isArray(inner?.results)) return inner.results;
  if (Array.isArray(inner)) return inner;
  if (Array.isArray(data)) return data;
  return [];
}

function extractPaginationMeta(data) {
  const inner = data?.data;

  return inner?.pagination
    ?? inner?.meta
    ?? data?.pagination
    ?? data?.meta
    ?? {};
}

function extractCategoryCountsRaw(data) {
  const inner = data?.data;

  return inner?.listing_type_counts
    ?? inner?.category_counts
    ?? inner?.counts?.listing_type
    ?? inner?.counts?.listingType
    ?? inner?.facets?.listing_type
    ?? inner?.facets?.listingType
    ?? inner?.meta?.listing_type_counts
    ?? inner?.meta?.category_counts
    ?? data?.listing_type_counts
    ?? data?.category_counts
    ?? null;
}

function normalizeCategoryCounts(rawCounts, paginationTotal, properties) {
  if (!rawCounts || typeof rawCounts !== 'object') {
    const counts = { ...EMPTY_CATEGORY_COUNTS, All: paginationTotal };

    properties.forEach((property) => {
      const category = property.listingType;
      if (Object.prototype.hasOwnProperty.call(counts, category)) {
        counts[category] += 1;
      }
    });

    if (paginationTotal > counts.All) {
      counts.All = paginationTotal;
    }

    return counts;
  }

  const counts = { ...EMPTY_CATEGORY_COUNTS };

  Object.entries(rawCounts).forEach(([key, value]) => {
    const normalizedKey = key === 'all' ? 'All' : key;
    const count = pickNumber(value);

    if (normalizedKey === 'All') {
      counts.All = count;
      return;
    }

    if (Object.prototype.hasOwnProperty.call(counts, normalizedKey)) {
      counts[normalizedKey] = count;
    }
  });

  if (counts.All === 0) {
    counts.All = paginationTotal || LISTING_CATEGORIES.reduce((sum, category) => sum + counts[category], 0);
  }

  return counts;
}

function normalizePagination(meta, payload, itemCount) {
  const page = pickNumber(meta.page, meta.current_page, meta.currentPage, payload.page) || 1;
  const limit = pickNumber(meta.limit, meta.per_page, meta.perPage, payload.limit) || 1;
  const totalFromMeta = meta.total ?? meta.total_count ?? meta.totalCount;
  const total = totalFromMeta == null || totalFromMeta === ''
    ? itemCount
    : pickNumber(totalFromMeta);
  const totalPages = pickNumber(
    meta.totalPages,
    meta.total_pages,
    meta.last_page,
    meta.lastPage,
  ) || Math.max(1, Math.ceil(total / limit));

  return { page, limit, total, totalPages };
}

function transformSearchResponse(data, payload) {
  const rawProperties = extractPropertyList(data);
  const properties = rawProperties.map(mapPropertyRecord);
  const pagination = normalizePagination(
    extractPaginationMeta(data),
    payload,
    properties.length,
  );
  const categoryCounts = normalizeCategoryCounts(
    extractCategoryCountsRaw(data),
    pagination.total,
    properties,
  );

  return { properties, pagination, categoryCounts };
}

/**
 * Searches properties and returns a normalized search result.
 */
export async function fetchPropertySearchResults(payload) {
  const data = await postPropertySearch(payload);
  return transformSearchResponse(data, payload);
}

export { transformSearchResponse };
