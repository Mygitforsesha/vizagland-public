const LOCATION_FIELD_MAP = [
  ['village', 'village'],
  ['nearbyLocation', 'nearby_location'],
  ['customNearby', 'custom_nearby_location'],
  ['district', 'district'],
  ['mandal', 'mandal'],
  ['panchayati', 'panchayati'],
  ['gvmc', 'gvmc_zone'],
  ['vmrda', 'vmrda'],
  ['regArea', 'registration_office'],
  ['gvmcVmrda', 'authority'],
];

function toFormFieldValue(value) {
  return value == null ? '' : String(value);
}

export function resolveNearbyLocationOptions(options, selectedValue) {
  const value = selectedValue?.trim();
  if (!value) return options;

  const exists = options.some((option) => option.value === value);
  if (exists) return options;

  return [...options, { label: value, value }];
}

export function applyMasterLocationToForm(updateField, location = {}) {
  LOCATION_FIELD_MAP.forEach(([formField, apiField]) => {
    updateField(formField, toFormFieldValue(location[apiField]));
  });
}

export function clearLocationFields(updateField) {
  LOCATION_FIELD_MAP.forEach(([formField]) => {
    updateField(formField, '');
  });
}
