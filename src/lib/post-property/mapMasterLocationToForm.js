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

export function applyMasterLocationToForm(updateField, location = {}) {
  LOCATION_FIELD_MAP.forEach(([formField, apiField]) => {
    updateField(formField, location[apiField] ?? '');
  });
}

export function clearLocationFields(updateField) {
  LOCATION_FIELD_MAP.forEach(([formField]) => {
    updateField(formField, '');
  });
}
