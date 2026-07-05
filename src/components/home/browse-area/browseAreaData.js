import { villageData, searchProperties } from '@/lib/searchData';

export const BROWSE_PAGE_SIZE = 24;
export const ALL_MANDALS = 'All Mandals';
export const ALL_LETTERS = 'All';

/**
 * Village directory data for Browse by Area.
 * Swap this source when a dedicated villages API is available.
 */
export function getBrowseVillages() {
  return villageData.map((village) => ({
    name: village.name,
    mandal: village.mandal,
    district: village.district,
    panchayati: village.panchayati,
    propertyCount: searchProperties.filter((property) => property.village === village.name).length,
  }));
}

export function getMandalOptions(villages) {
  return [...new Set(villages.map((village) => village.mandal))].sort((a, b) =>
    a.localeCompare(b),
  );
}
