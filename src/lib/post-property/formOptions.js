/** Converts string arrays into { label, value } select options. */
export function toSelectOptions(values) {
  return values.map((value) => ({ label: value, value }));
}

/** Converts numeric ranges into { label, value } select options. */
export function toNumericSelectOptions(count, startAt = 1) {
  return Array.from({ length: count }, (_, index) => {
    const value = String(startAt + index);
    return { label: value, value };
  });
}

export const approvalOptions = toSelectOptions([
  "Don't know",
  'Panchayati',
  'GVMC',
  'VMRDA',
  'DTCP',
  'RERA',
  'Un Approved',
]);

export const nearbyLocationOptions = toSelectOptions([
  'Bus Stand',
  'Railway Station',
  'Highway',
  'School',
  'Hospital',
  'Market',
]);

export const priceRangeOptions = toSelectOptions([
  'Below 5 Lakhs',
  '5 - 10 Lakhs',
  '10 - 15 Lakhs',
  '15 - 20 Lakhs',
  '20 - 25 Lakhs',
  '25 - 30 Lakhs',
  '30 - 35 Lakhs',
  '35 - 40 Lakhs',
  '40 - 45 Lakhs',
  '45 - 50 Lakhs',
  '50 - 60 Lakhs',
  '60 - 70 Lakhs',
  '70 - 80 Lakhs',
  '80 - 90 Lakhs',
  '90 Lakhs - 1 Crore',
  '1 - 1.5 Crore',
  '1.5 - 2 Crore',
  '2 - 3 Crore',
  '3 - 5 Crore',
  '5 - 10 Crore',
  '10 - 20 Crore',
  '20 - 50 Crore',
  '50 Crore+',
]);

export const areaUnitOptions = toSelectOptions([
  'Sq.Ft',
  'Sq.Yds',
  'Sq.Mts',
  'Acres',
  'Cents',
  'Grounds',
  'Gunthas',
  'Hectare',
]);

export const pricePerSqftOptions = toSelectOptions([
  'Below 1000',
  '1000 - 3000',
  '3000 - 5000',
  '5000+',
]);

function formatOrdinalFloor(floor) {
  const suffix =
    floor % 10 === 1 && floor % 100 !== 11
      ? 'st'
      : floor % 10 === 2 && floor % 100 !== 12
        ? 'nd'
        : floor % 10 === 3 && floor % 100 !== 13
          ? 'rd'
          : 'th';

  return `${floor}${suffix} Floor`;
}

function buildFloorNumberOptions() {
  const options = [{ label: 'Ground Floor', value: 'Ground Floor' }];

  for (let floor = 1; floor <= 50; floor += 1) {
    const label = formatOrdinalFloor(floor);
    options.push({ label, value: label });
  }

  options.push({ label: '50+ Floors', value: '50+ Floors' });
  return options;
}

function buildPropertyAgeOptions() {
  const options = [
    { label: 'New / Under Construction', value: 'New / Under Construction' },
    { label: '1 Year', value: '1 Year' },
  ];

  for (let year = 2; year <= 50; year += 1) {
    const label = `${year} Years`;
    options.push({ label, value: label });
  }

  options.push({ label: '50+ Years', value: '50+ Years' });
  return options;
}

function buildBedRoomsOptions() {
  return [...toNumericSelectOptions(10), { label: '10+', value: '10+' }];
}

export const propertyAgeOptions = buildPropertyAgeOptions();

export const facingOptions = toSelectOptions([
  'East',
  'West',
  'North',
  'South',
  'North-East',
  'North-West',
  'South-East',
  'South-West',
]);

export const totalFloorsOptions = toNumericSelectOptions(50);

export const floorNumberOptions = buildFloorNumberOptions();

export const furnishingOptions = toSelectOptions([
  'Furnished',
  'Semi-Furnished',
  'Unfurnished',
]);

export const amenityOptions = toSelectOptions([
  'Parking',
  'Lift',
  'Power Backup',
  'Gym',
  'Swimming Pool',
  'Security',
  'Club House',
]);

export const propertyUnderOptions = toSelectOptions(['Government', 'Private']);

export const bedRoomsOptions = buildBedRoomsOptions();

export const bathroomsOptions = toNumericSelectOptions(5);

export const balconiesOptions = toNumericSelectOptions(4);

export const parkingOptions = toSelectOptions(['0', '1', '2', '3', '4+']);

export const lpPlotOptions = toNumericSelectOptions(1000);

const currentYear = new Date().getFullYear();
export const yearOptions = Array.from({ length: 101 }, (_, index) => {
  const value = String(currentYear - index);
  return { label: value, value };
});

export const residentialTypeOptions = [
  { label: 'Flats', value: 'Flats', units: ['SFT'] },
  { label: 'Plot', value: 'Plot', units: ['Sq.Yards'], categoryLabel: 'Plots' },

  { label: 'Projects Bulk Plot', value: 'Projects Bulk Plot', units: ['Sq.Yards'], categoryLabel: 'Projects Bulk Plots' },
  { label: 'House', value: 'House', units: ['Sq.Yards'] },
  { label: 'Builder Floor Apartment', value: 'Builder Floor Apartment', units: ['SFT'] },
  { label: 'Villas', value: 'Villas', units: ['Sq.Yards', 'SFT'], displayUnits: ['Sq.Yards', 'SFT'] },
  { label: 'Group House', value: 'Group House', units: ['SFT'] },
  { label: 'Individual House', value: 'Individual House', units: ['Sq.Yards'] },
  { label: 'Pent House', value: 'Pent House', units: ['SFT'] },
  { label: 'Studio Apartment', value: 'Studio Apartment', units: ['SFT'] },
];

export const commercialTypeOptions = [
  { label: 'Office', value: 'Office', units: ['SFT'] },
  { label: 'Commercial Space', value: 'Commercial Space', units: ['SFT'] },
  { label: 'Office in IT Park/SEZ', value: 'Office in IT Park/SEZ', units: ['SFT'] },
  { label: 'Shop', value: 'Shop', units: ['SFT'], displayUnits: ['SFT', 'Sq.Yards'] },
  { label: 'Showroom', value: 'Showroom', units: ['SFT'] },
  { label: 'Land', value: 'Land', units: ['Sq.Yards'], displayUnits: ['Sq.Yards', 'Cents', 'Acres'] },
  { label: 'Warehouse/Godown', value: 'Warehouse/Godown', units: ['Sq.Yards'] },
  { label: 'Industrial Land', value: 'Industrial Land', units: ['Sq.Yards'] },
  {
    label: 'Industrial Building',
    value: 'Industrial Building',
    units: ['SFT'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
  {
    label: 'Industrial Shed',
    value: 'Industrial Shed',
    units: ['SFT'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
  {
    label: 'Factory',
    value: 'Factory',
    units: ['Acres', 'Cents'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
  {
    label: 'Lease',
    value: 'Lease',
    units: ['SFT'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
  {
    label: 'Rent',
    value: 'Rent',
    units: ['SFT'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
];

export const developmentTypeOptions = [
  {
    label: 'Open Plots',
    value: 'Open Plots',
    units: ['Acres', 'Cents'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
  {
    label: 'Gated Community',
    value: 'Gated Community',
    units: ['Acres', 'Cents'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
    categoryLabel: 'Gated Community Flats',
  },
  {
    label: 'Township',
    value: 'Township',
    units: ['Acres', 'Cents'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
  },
];

export const layoutTypeOptions = [
  { label: 'Approved Layout', value: 'Approved Layout', units: ['Acres', 'Cents'] },
  { label: 'Venture', value: 'Venture', units: ['Acres', 'Cents'], categoryLabel: 'For Venture Development' },
  {
    label: 'Farm Plots',
    value: 'Farm Plots',
    units: ['Acres', 'Cents'],
    displayUnits: ['SFT', 'Sq.Yards', 'Cents', 'Acres'],
    categoryLabel: 'Firm Development Plots',
  },
];

export const propertyStatusOptions = toSelectOptions([
  'Ready to Move',
  'Under Construction',
  'Pre Launch',
]);

export const constructionTypeOptions = toSelectOptions([
  'Individual House',
  'Group House',
  'Apartments',
  'Highrise Apartments',
  'Villas',
  'Warehouse',
  'Factories',
  'Compound Walls',
  'Layout Civil Works',
  'Roads',
  'Parks',
  'Electricity',
  'Drainage',
  'Interior Design',
]);

const PROPERTY_CATEGORY_SOURCES = [
  { payloadField: 'property_residential_type', options: residentialTypeOptions },
  { payloadField: 'property_commercial_type', options: commercialTypeOptions },
  { payloadField: 'property_development_type', options: developmentTypeOptions },
  { payloadField: 'property_layout_type', options: layoutTypeOptions },
];

const PROPERTY_CATEGORY_DISPLAY_ORDER = [
  'Flats',
  'Plot',
  'Projects Bulk Plot',
  'House',
  'Builder Floor Apartment',
  'Villas',
  'Group House',
  'Individual House',
  'Pent House',
  'Studio Apartment',
  'Office',
  'Commercial Space',
  'Office in IT Park/SEZ',
  'Shop',
  'Showroom',
  'Land',
  'Warehouse/Godown',
  'Industrial Land',
  'Industrial Building',
  'Industrial Shed',
  'Factory',
  'Lease',
  'Rent',
  'Open Plots',
  'Gated Community',
  'Township',
  'Approved Layout',
  'Venture',
  'Farm Plots',
];

const EMPTY_PROPERTY_GROUP_AND_TYPES = {
  property_residential_type: '',
  property_commercial_type: '',
  property_development_type: '',
  property_layout_type: '',
  property_construction_status: '',
  property_construction_type: '',
};

function formatPropertyCategoryDisplayLabel(option) {
  const displayUnits = option.displayUnits ?? option.units;
  const baseLabel = option.categoryLabel ?? option.value;

  if (!displayUnits?.length) {
    return baseLabel;
  }

  return `${baseLabel} (${displayUnits.join(' / ')})`;
}

function buildPropertyCategoryRegistry() {
  const byValue = new Map();

  for (const { payloadField, options } of PROPERTY_CATEGORY_SOURCES) {
    for (const option of options) {
      if (byValue.has(option.value)) continue;

      byValue.set(option.value, {
        label: formatPropertyCategoryDisplayLabel(option),
        value: option.value,
        payloadField,
        units: option.units,
        displayUnits: option.displayUnits ?? option.units,
      });
    }
  }

  return byValue;
}

const propertyCategoryRegistry = buildPropertyCategoryRegistry();

/** Client-defined property category options in display order. */
export const propertyCategoryOptions = PROPERTY_CATEGORY_DISPLAY_ORDER.map((value) => {
  const option = propertyCategoryRegistry.get(value);
  return option ? { label: option.label, value: option.value } : null;
}).filter(Boolean);

export function findPropertyCategoryOption(value) {
  if (!value) return null;
  return propertyCategoryRegistry.get(value) ?? null;
}

/** Maps the unified propertyCategory selection into property_group_and_types payload fields. */
export function buildPropertyGroupAndTypesPayload(propertyCategory = '') {
  const selectedOption = findPropertyCategoryOption(propertyCategory);

  if (!selectedOption) {
    return { ...EMPTY_PROPERTY_GROUP_AND_TYPES };
  }

  return {
    ...EMPTY_PROPERTY_GROUP_AND_TYPES,
    [selectedOption.payloadField]: selectedOption.value,
  };
}

export const otherServiceOptions = toSelectOptions([
  'Documentation',
  'Encumbrance Certificate (EC)',
  'Market Value',
  'Sale Deed',
  'Link Document',
  'GPA Document',
  'Veelunama Document',
  'FMB',
  'LPM',
  'Village Map',
  'Adangal',
  '1B',
]);

/**
 * Finds the selected property type config to drive dynamic area-unit options.
 */
export function findSelectedPropertyType(formState) {
  return findPropertyCategoryOption(formState.propertyCategory);
}

/**
 * Returns area-unit options based on the selected property category label units,
 * or the full default list when no units are defined.
 */
export function getDynamicAreaUnitOptions(formState) {
  const selectedPropertyType = findSelectedPropertyType(formState);
  const areaUnits = selectedPropertyType?.displayUnits?.length
    ? selectedPropertyType.displayUnits
    : selectedPropertyType?.units;

  if (!areaUnits?.length) {
    return areaUnitOptions;
  }

  return areaUnits.map((unit) => ({
    label: unit,
    value: unit,
  }));
}
