/** Property types grouped for quick-filter chips (aligned with ListingsPage). */

const FLAT_PROPERTY_TYPES = [
  'Residential Flats',
  'Residential House',
  'Builder Floor Apartment',
  'Individual House',
  'Group House',
  'Pent House',
  'Studio Apartment',
  'Ready to Move',
  'Duplex',
  'Penthouse',
  'Gated Community',
];

const VILLA_PROPERTY_TYPES = ['Villas'];

const PLOT_PROPERTY_TYPES = [
  'Residential Plot',
  'Open Plots',
  'Farm Plots',
  'Approved Layout',
  'Venture',
  'Farm Land',
  'Agricultural Plot',
];

const COMMERCIAL_PROPERTY_TYPES = [
  'Office',
  'Commercial Space',
  'Office in IT Park/SEZ',
  'Shop',
  'Showroom',
  'Warehouse/Godown',
  'Industrial Land',
  'Industrial Building',
  'Industrial Shed',
  'Factory',
  'Land',
];

export const QUICK_FILTER_OPTIONS = [
  { id: 'verified', label: 'Verified', matches: (property) => property.verified === true },
  {
    id: 'flats',
    label: 'Flats',
    matches: (property) => FLAT_PROPERTY_TYPES.includes(property.propertyType),
  },
  {
    id: 'villas',
    label: 'Villas',
    matches: (property) => VILLA_PROPERTY_TYPES.includes(property.propertyType),
  },
  {
    id: 'plots',
    label: 'Plots',
    matches: (property) => PLOT_PROPERTY_TYPES.includes(property.propertyType),
  },
  {
    id: 'commercial',
    label: 'Commercial',
    matches: (property) =>
      COMMERCIAL_PROPERTY_TYPES.includes(property.propertyType) ||
      property.propertyGroup === 'Commercial' ||
      property.propertyGroup === 'Industrial',
  },
];

const TYPE_QUICK_FILTER_IDS = QUICK_FILTER_OPTIONS.filter(
  (option) => option.id !== 'verified',
).map((option) => option.id);

function getQuickFilterMatcher(id) {
  return QUICK_FILTER_OPTIONS.find((option) => option.id === id)?.matches;
}

/** Apply active quick filters. Verified is AND; type chips are OR among themselves. */
export function filterPropertiesByQuickFilters(properties, quickFilters = []) {
  if (!quickFilters.length) return properties;

  const activeTypeFilters = quickFilters.filter((id) => TYPE_QUICK_FILTER_IDS.includes(id));
  const wantsVerified = quickFilters.includes('verified');

  return properties.filter((property) => {
    if (wantsVerified && property.verified !== true) return false;

    if (activeTypeFilters.length === 0) return true;

    return activeTypeFilters.some((id) => {
      const matcher = getQuickFilterMatcher(id);
      return matcher ? matcher(property) : false;
    });
  });
}

/** Build chip data with counts from the current result set (before quick filters). */
export function buildQuickFilterChips(properties, activeQuickFilters = []) {
  return QUICK_FILTER_OPTIONS.map((option) => ({
    id: option.id,
    label: option.label,
    count: properties.filter(option.matches).length,
    active: activeQuickFilters.includes(option.id),
  }));
}
