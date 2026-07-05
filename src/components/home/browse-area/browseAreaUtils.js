import { ALL_LETTERS, ALL_MANDALS, BROWSE_PAGE_SIZE } from './browseAreaData';

export const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function hasActiveBrowseFilters({ search, mandal, letter }) {
  return Boolean(
    search?.trim() || (mandal && mandal !== ALL_MANDALS) || (letter && letter !== ALL_LETTERS),
  );
}

export function filterBrowseVillages(villages, { search, mandal, letter }) {
  let result = [...villages];

  const trimmedSearch = search?.trim().toLowerCase();
  if (trimmedSearch) {
    result = result.filter((village) => village.name.toLowerCase().includes(trimmedSearch));
  }

  if (mandal && mandal !== ALL_MANDALS) {
    result = result.filter((village) => village.mandal === mandal);
  }

  if (letter && letter !== ALL_LETTERS) {
    result = result.filter((village) => village.name.toUpperCase().startsWith(letter));
  }

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAvailableLetters(villages, { search, mandal }) {
  let scoped = [...villages];

  const trimmedSearch = search?.trim().toLowerCase();
  if (trimmedSearch) {
    scoped = scoped.filter((village) => village.name.toLowerCase().includes(trimmedSearch));
  }

  if (mandal && mandal !== ALL_MANDALS) {
    scoped = scoped.filter((village) => village.mandal === mandal);
  }

  return new Set(
    scoped.map((village) => village.name.charAt(0).toUpperCase()).filter(Boolean),
  );
}

export function paginateVillages(villages, page, pageSize = BROWSE_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(villages.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: villages.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    totalItems: villages.length,
  };
}

export function formatResultCount({ pageCount, filteredCount, totalCount, filtersActive }) {
  if (filtersActive) {
    const label = filteredCount === 1 ? 'Village' : 'Villages';
    return `Showing ${filteredCount} ${label}`;
  }

  return `Showing ${pageCount} of ${totalCount} Villages`;
}
