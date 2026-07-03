import axios from 'axios';

const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

const EMPTY_USER_LOCATION_PAYLOAD = {
  user_latitude: null,
  user_longitude: null,
  user_road: null,
  user_colony: null,
  user_suburb: null,
  user_village: null,
  user_mandal: null,
  user_district: null,
  user_state: null,
  user_pincode: null,
  user_country: null,
};

function pickString(...values) {
  for (const value of values) {
    if (value == null) continue;
    const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function toNullable(value) {
  const trimmed = pickString(value);
  return trimmed || null;
}

function logGeolocationError(error) {
  const codeLabels = {
    1: 'PERMISSION_DENIED',
    2: 'POSITION_UNAVAILABLE',
    3: 'TIMEOUT',
  };

  console.warn('[locationService] Geolocation unavailable:', {
    code: error?.code,
    label: codeLabels[error?.code] ?? 'UNKNOWN',
    message: error?.message ?? 'Unknown geolocation error',
  });
}

/**
 * Reads browser coordinates via the Geolocation API.
 * Returns null when unsupported, denied, or unavailable — never throws.
 */
export function getCurrentCoordinates() {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    console.warn('[locationService] Geolocation is not supported in this browser');
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        logGeolocationError(error);
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}

/**
 * Reverse-geocodes coordinates using OpenStreetMap Nominatim (free).
 */
export async function reverseGeocode(latitude, longitude) {
  const response = await axios.get(NOMINATIM_REVERSE_URL, {
    params: {
      format: 'jsonv2',
      lat: latitude,
      lon: longitude,
      addressdetails: 1,
    },
    headers: {
      Accept: 'application/json',
    },
    timeout: 10000,
  });

  console.log('[locationService] Nominatim reverse geocode response:', response.data);
  console.log('[locationService] Nominatim address:', response.data?.address);

  return response.data?.address ?? {};
}

function isAndhraPradesh(state) {
  return /andhra\s*pradesh/i.test(pickString(state));
}

/**
 * Maps Nominatim address fields to VizagLand location fields with fallbacks.
 *
 * Andhra Pradesh (OSM/Nominatim):
 * - state_district → revenue district (e.g. Anakapalli, Visakhapatnam)
 * - county         → mandal (e.g. Chodavaram, Visakhapatnam Rural)
 * - village        → village/hamlet name (e.g. Vadapalem)
 */
export function normalizeNominatimAddress(address = {}) {
  const state = pickString(address.state);
  const pincode = pickString(address.postcode);
  const country = pickString(address.country);

  const road = pickString(
    address.road,
    address.pedestrian,
    address.footway,
    address.path,
    address.cycleway,
  );

  const colony = pickString(
    address.neighbourhood,
    address.quarter,
    address.locality,
    address.residential,
  );

  const suburb = pickString(address.suburb, address.city_district, address.borough);

  let village;
  let mandal;
  let district;

  if (isAndhraPradesh(state)) {
    // AP admin hierarchy: District → Mandal → Village
    district = pickString(address.state_district, address.region);
    mandal = pickString(address.county, address.municipality);
    village = pickString(
      address.village,
      address.hamlet,
      address.isolated_dwelling,
      address.town,
      address.city,
    );
  } else {
    // Generic fallback for non-AP locations
    district = pickString(
      address.state_district,
      address.county,
      address.city_district,
      address.region,
    );
    mandal = pickString(address.county, address.municipality, address.state_district);
    village = pickString(
      address.village,
      address.hamlet,
      address.isolated_dwelling,
      address.town,
      address.city,
    );
  }

  return {
    road,
    colony,
    suburb,
    village,
    mandal,
    district,
    state,
    pincode,
    country,
  };
}

function buildUserLocationPayload(latitude, longitude, address = {}) {
  const normalized = normalizeNominatimAddress(address);

  return {
    user_latitude: latitude ?? null,
    user_longitude: longitude ?? null,
    user_road: toNullable(normalized.road),
    user_colony: toNullable(normalized.colony),
    user_suburb: toNullable(normalized.suburb),
    user_village: toNullable(normalized.village),
    user_mandal: toNullable(normalized.mandal),
    user_district: toNullable(normalized.district),
    user_state: toNullable(normalized.state),
    user_pincode: toNullable(normalized.pincode),
    user_country: toNullable(normalized.country),
  };
}

/**
 * Captures user location for Login/Register payloads.
 * Never throws — returns null location fields when unavailable.
 */
export async function captureUserLocation() {
  try {
    const coordinates = await getCurrentCoordinates();

    if (!coordinates) {
      return { ...EMPTY_USER_LOCATION_PAYLOAD };
    }

    const { latitude, longitude } = coordinates;

    try {
      const address = await reverseGeocode(latitude, longitude);
      const payload = buildUserLocationPayload(latitude, longitude, address);
      console.log('[locationService] Captured user location:', payload);
      return payload;
    } catch (error) {
      console.warn('[locationService] Reverse geocoding failed:', {
        message: error?.message,
        status: error?.response?.status,
      });
      return { ...EMPTY_USER_LOCATION_PAYLOAD };
    }
  } catch (error) {
    console.warn('[locationService] captureUserLocation failed:', error?.message ?? error);
    return { ...EMPTY_USER_LOCATION_PAYLOAD };
  }
}
