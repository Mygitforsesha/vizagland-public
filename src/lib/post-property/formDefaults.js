/**
 * Initial values for every Post Property form field.
 * Add or remove fields here — keep in sync with buildPropertyPayload().
 */
export const INITIAL_POST_PROPERTY_FORM_STATE = {
  // Property Approval
  approvedBy: '',

  // Village Details
  village: '',
  nearbyLocation: '',
  customNearby: '',
  district: '',
  mandal: '',
  panchayati: '',
  gvmc: '',
  vmrda: '',
  regArea: '',
  gvmcVmrda: '',

  // Property Group & Types
  selectedResidential: '',
  selectedCommercial: '',
  selectedDevelopments: '',
  selectedLayout: '',
  selectedHouseDev: '',
  selectedConstruction: '',

  // Property Details
  priceValue: '',
  priceRange: '',
  areaValue: '',
  areaUnit: '',
  pricePerSqft: '',
  propertyAge: '',
  facing: '',
  totalFloors: '',
  floorNumber: '',
  furnishing: '',
  propertyUnder: '',
  lpNo: '',
  plotNo: '',
  year: '',
  bedRooms: '',

  // Other Services
  selectedOtherService: '',

  // Media
  propertyImages: [],
  propertyDocuments: [],
};
