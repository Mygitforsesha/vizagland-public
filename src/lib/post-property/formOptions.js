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
  '6 - 10 Lakhs',
  '11 - 15 Lakhs',
  '16 - 20 Lakhs',
  '21 - 25 Lakhs',
  '26 - 30 Lakhs',
  '31 - 35 Lakhs',
  '36 - 40 Lakhs',
  '41 - 45 Lakhs',
  '46 - 50 Lakhs',
  '51 - 55 Lakhs',
  '56 - 60 Lakhs',
  '61 - 65 Lakhs',
  '66 - 70 Lakhs',
  '71 - 75 Lakhs',
  '76 - 80 Lakhs',
  '81 - 85 Lakhs',
  '86 - 90 Lakhs',
  '91 - 95 Lakhs',
  '96 Lakhs - 1 Crore',
  '1 - 1.5 Crore',
  '1.5 - 2 Crore',
  '2 - 2.5 Crore',
  '2.5 - 3 Crore',
  '3 - 3.5 Crore',
  '3.5 - 4 Crore',
  '4 - 4.5 Crore',
  '4.5 - 5 Crore & above',
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

export const propertyAgeOptions = toSelectOptions([
  'New',
  '1-5 Years',
  '5-10 Years',
  '10+ Years',
]);

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

export const floorNumberOptions = toSelectOptions([
  'Ground Floor',
  '1st Floor',
  '2nd Floor',
  '3rd Floor',
  '4+',
]);

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

export const bedRoomsOptions = toSelectOptions(['1', '2', '3']);

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
  { label: 'Plot', value: 'Plot', units: ['Sq.Yards'] },
  { label: 'House', value: 'House', units: ['Sq.Yards'] },
  { label: 'Builder Floor Apartment', value: 'Builder Floor Apartment', units: ['SFT'] },
  { label: 'Villas', value: 'Villas', units: ['Sq.Yards', 'SFT'] },
  { label: 'Group House', value: 'Group House', units: ['SFT'] },
  { label: 'Individual House', value: 'Individual House', units: ['Sq.Yards'] },
  { label: 'Pent House', value: 'Pent House', units: ['SFT'] },
  { label: 'Studio Apartment', value: 'Studio Apartment', units: ['SFT'] },
];

export const commercialTypeOptions = [
  { label: 'Office', value: 'Office', units: ['SFT'] },
  { label: 'Commercial Space', value: 'Commercial Space', units: ['SFT'] },
  { label: 'Office in IT Park/SEZ', value: 'Office in IT Park/SEZ', units: ['SFT'] },
  { label: 'Shop', value: 'Shop', units: ['SFT'] },
  { label: 'Showroom', value: 'Showroom', units: ['SFT'] },
  { label: 'Land', value: 'Land', units: ['Sq.Yards'] },
  { label: 'Warehouse/Godown', value: 'Warehouse/Godown', units: ['Sq.Yards'] },
  { label: 'Industrial Land', value: 'Industrial Land', units: ['Sq.Yards'] },
  { label: 'Industrial Building', value: 'Industrial Building', units: ['SFT'] },
  { label: 'Industrial Shed', value: 'Industrial Shed', units: ['SFT'] },
  { label: 'Factory', value: 'Factory', units: ['Acres', 'Cents'] },
  { label: 'Lease', value: 'Lease', units: ['SFT'] },
  { label: 'Rent', value: 'Rent', units: ['SFT'] },
];

export const developmentTypeOptions = [
  { label: 'Open Plots', value: 'Open Plots', units: ['Acres', 'Cents'] },
  { label: 'Gated Community', value: 'Gated Community', units: ['Acres', 'Cents'] },
  { label: 'Township', value: 'Township', units: ['Acres', 'Cents'] },
];

export const layoutTypeOptions = [
  { label: 'Approved Layout', value: 'Approved Layout', units: ['Acres', 'Cents'] },
  { label: 'Venture', value: 'Venture', units: ['Acres', 'Cents'] },
  { label: 'Farm Plots', value: 'Farm Plots', units: ['Acres', 'Cents'] },
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

const propertyTypeOptionGroups = [
  residentialTypeOptions,
  commercialTypeOptions,
  developmentTypeOptions,
  layoutTypeOptions,
];

const propertyTypeFieldKeys = [
  'selectedResidential',
  'selectedCommercial',
  'selectedDevelopments',
  'selectedLayout',
];

/**
 * Finds the selected property type config to drive dynamic area-unit options.
 */
export function findSelectedPropertyType(formState) {
  for (let index = 0; index < propertyTypeFieldKeys.length; index += 1) {
    const fieldKey = propertyTypeFieldKeys[index];
    const selectedValue = formState[fieldKey];

    if (!selectedValue) continue;

    const match = propertyTypeOptionGroups[index].find(
      (option) => option.value === selectedValue,
    );

    if (match) return match;
  }

  return null;
}

/**
 * Returns area-unit options based on the selected property type, or all units as fallback.
 */
export function getDynamicAreaUnitOptions(formState) {
  const selectedPropertyType = findSelectedPropertyType(formState);

  if (!selectedPropertyType?.units?.length) {
    return areaUnitOptions;
  }

  return selectedPropertyType.units.map((unit) => ({
    label: unit,
    value: unit,
  }));
}
