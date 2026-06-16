import { ROUTES } from '../../constants/routes';
import { villageData } from '../searchData';

export const CAT_QUERY_PARAM = 'cat';
export const DISTRICT_QUERY_PARAM = 'district';
export const MANDAL_QUERY_PARAM = 'mandal';
export const VILLAGE_QUERY_PARAM = 'village';
export const PAGE_QUERY_PARAM = 'page';

/** @deprecated Legacy param — read for backward compatibility only. */
export const SEARCH_QUERY_PARAM = 'search';

const VALID_CATEGORIES = ['Buy', 'Sell', 'Rent', 'Lease'];

const SYNCABLE_URL_KEYS = [
  CAT_QUERY_PARAM,
  DISTRICT_QUERY_PARAM,
  MANDAL_QUERY_PARAM,
  VILLAGE_QUERY_PARAM,
  PAGE_QUERY_PARAM,
];

function isActiveUrlValue(value) {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  return Boolean(trimmed) && trimmed !== 'All' && trimmed !== 'N/A';
}

export function parsePageParam(searchParams) {
  const raw = searchParams.get(PAGE_QUERY_PARAM);
  const page = Number.parseInt(raw ?? '1', 10);
  if (!Number.isFinite(page) || page < 1) return 1;
  return page;
}

export function getSyncableUrlSignature(searchParams) {
  return SYNCABLE_URL_KEYS.map((key) => `${key}=${searchParams.get(key) ?? ''}`).join('&');
}

export function mergeSearchParams(current, updates) {
  const next = new URLSearchParams(current);

  Object.entries(updates).forEach(([key, value]) => {
    if (value == null || value === '' || value === false) {
      next.delete(key);
      return;
    }

    next.set(key, String(value));
  });

  return next;
}

const EMPTY_LOCATION_FILTERS = {
  selectedVillage: '',
  district: '',
  mandal: '',
  panchayati: '',
};

function villageToLocationFilters(village) {
  return {
    selectedVillage: village.name,
    district: village.district || '',
    mandal: village.mandal || '',
    panchayati: village.panchayati || '',
  };
}

function resolveVillageParam(villageParam, data) {
  if (!villageParam) {
    return { ...EMPTY_LOCATION_FILTERS };
  }

  const exact = data.find(
    (village) => village.name.toLowerCase() === villageParam.toLowerCase(),
  );
  if (exact) {
    return villageToLocationFilters(exact);
  }

  return {
    ...EMPTY_LOCATION_FILTERS,
    selectedVillage: villageParam,
  };
}

/**
 * Reads shareable URL params into search state fields.
 */
export function parseSyncableStateFromUrl(searchParams, data = villageData) {
  const legacySearch = searchParams.get(SEARCH_QUERY_PARAM)?.trim() || '';
  const villageParam =
    searchParams.get(VILLAGE_QUERY_PARAM)?.trim() || legacySearch;
  const cat = searchParams.get(CAT_QUERY_PARAM)?.trim() || '';
  const districtParam = searchParams.get(DISTRICT_QUERY_PARAM)?.trim() || '';
  const mandalParam = searchParams.get(MANDAL_QUERY_PARAM)?.trim() || '';
  const page = parsePageParam(searchParams);

  const listingType = VALID_CATEGORIES.includes(cat) ? cat : '';
  const locationFilters = resolveVillageParam(villageParam, data);

  if (districtParam) {
    locationFilters.district = districtParam;
  }
  if (mandalParam) {
    locationFilters.mandal = mandalParam;
  }

  return {
    page,
    villageQuery: villageParam,
    listingType,
    ...locationFilters,
  };
}

/**
 * Builds URL updates for shareable search params.
 */
export function buildSyncableUrlUpdates({
  listingType,
  district,
  mandal,
  selectedVillage,
  villageQuery = '',
  page = 1,
}) {
  const villageValue = (selectedVillage || villageQuery || '').trim();

  return {
    [CAT_QUERY_PARAM]: VALID_CATEGORIES.includes(listingType) ? listingType : null,
    [DISTRICT_QUERY_PARAM]: isActiveUrlValue(district) ? district.trim() : null,
    [MANDAL_QUERY_PARAM]: isActiveUrlValue(mandal) ? mandal.trim() : null,
    [VILLAGE_QUERY_PARAM]: isActiveUrlValue(villageValue) ? villageValue : null,
    [PAGE_QUERY_PARAM]: page > 1 ? page : null,
    [SEARCH_QUERY_PARAM]: null,
  };
}

/**
 * Maps a free-text search query to structured location filters when possible.
 * Falls back to keyword mode when no structured match is found.
 */
export function resolveSearchQueryToFilters(query, data) {
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      filters: { ...EMPTY_LOCATION_FILTERS },
      mode: 'empty',
    };
  }

  const lower = trimmed.toLowerCase();

  const exactVillage = data.find(
    (village) => village.name.toLowerCase() === lower,
  );
  if (exactVillage) {
    return {
      filters: villageToLocationFilters(exactVillage),
      mode: 'location',
    };
  }

  const matchingVillages = data.filter((village) =>
    village.name.toLowerCase().includes(lower),
  );
  if (matchingVillages.length === 1) {
    return {
      filters: villageToLocationFilters(matchingVillages[0]),
      mode: 'location',
    };
  }

  if (lower === 'vizag' || lower === 'visakhapatnam') {
    return {
      filters: {
        ...EMPTY_LOCATION_FILTERS,
        district: 'Visakhapatnam',
      },
      mode: 'location',
    };
  }

  const exactDistrict = [...new Set(data.map((village) => village.district))].find(
    (district) => district.toLowerCase() === lower,
  );
  if (exactDistrict) {
    return {
      filters: {
        ...EMPTY_LOCATION_FILTERS,
        district: exactDistrict,
      },
      mode: 'location',
    };
  }

  const exactMandal = [...new Set(data.map((village) => village.mandal))].find(
    (mandal) => mandal.toLowerCase() === lower,
  );
  if (exactMandal) {
    return {
      filters: {
        ...EMPTY_LOCATION_FILTERS,
        mandal: exactMandal,
      },
      mode: 'location',
    };
  }

  return {
    filters: {
      ...EMPTY_LOCATION_FILTERS,
      selectedVillage: trimmed,
    },
    mode: 'keyword',
  };
}

export function buildSearchPageUrl(keyword) {
  const trimmed = keyword?.trim() || '';
  if (!trimmed) return ROUTES.search;

  const { filters } = resolveSearchQueryToFilters(trimmed, villageData);
  const params = mergeSearchParams(
    new URLSearchParams(),
    buildSyncableUrlUpdates({
      listingType: '',
      district: filters.district,
      mandal: filters.mandal,
      selectedVillage: filters.selectedVillage,
      villageQuery: filters.selectedVillage || trimmed,
      page: 1,
    }),
  );
  const queryString = params.toString();
  return queryString ? `${ROUTES.search}?${queryString}` : ROUTES.search;
}

export function buildSearchPageUrlFromParams(searchParams, updates) {
  const params = mergeSearchParams(searchParams, updates);
  const queryString = params.toString();
  return queryString ? `${ROUTES.search}?${queryString}` : ROUTES.search;
}

/** @deprecated Use parseSyncableStateFromUrl().villageQuery */
export function parseSearchKeyword(searchParams) {
  return parseSyncableStateFromUrl(searchParams).villageQuery;
}
