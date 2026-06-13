/**
 * Initial values for all property search filters.
 * Single source of truth.
 */
export const INITIAL_SEARCH_FILTERS = {
  // Location
  selectedVillage: '',
  district: '',
  mandal: '',
  panchayati: '',

  // Listing
  listingType: '',

  // Property
  propertyGroup: [],
  propertyType: [],

  // Price
  minPrice: '',
  maxPrice: '',

  // Area
  minArea: '',
  maxArea: '',
  areaUnit: '',

  // Specifications
  bedrooms: '',
  bathrooms: '',
  balconies: '',
  parking: '',
  propertyAge: '',
  furnishing: '',
  amenities: [],

  // Building Details
  totalFloors: '',
  floorNumber: '',

  // Facing
  facing: [],

  // Approval
  approvedBy: [],

  // Quick filters (Verified, Flats, Villas, Plots, Commercial)
  quickFilters: [],

  // Sorting
  sortBy: 'newest',
};