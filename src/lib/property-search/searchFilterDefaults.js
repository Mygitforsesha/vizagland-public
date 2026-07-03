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
  nearbyLocation: '',
  customNearby: '',
  gvmc: '',
  vmrda: '',
  regArea: '',
  gvmcVmrda: '',

  // Listing
  listingType: '',

  // Property Group & Types
  propertyCategory: '',
  propertyGroup: [],
  propertyType: [],

  // Price
  minPrice: '',
  maxPrice: '',
  pricePerSqft: '',
  priceValue: '',
  propertyPriceRange: '',

  // Area
  minArea: '',
  maxArea: '',
  areaUnit: '',

  // Property Details
  lpNo: '',
  year: '',
  plotNo: '',
  propertyFlatDoorNo: '',
  propertyUnder: '',

  // Specifications
  bedrooms: '',
  bathrooms: '',
  balconies: '',
  parking: '',
  propertyAge: '',
  furnishing: '',

  // Building Details
  totalFloors: '',
  floorNumber: '',

  // Facing & Approval
  facing: [],
  approvedBy: [],

  // Amenities
  amenities: [],

  // Other Services
  selectedOtherService: '',

  // Quick filters (Verified, Flats, Villas, Plots, Commercial)
  quickFilters: [],

  // Sorting
  sortBy: 'newest',
};
