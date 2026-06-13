function isActiveString(value, key = '') {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  if (!trimmed || trimmed === 'All') return false;
  if (key === 'panchayati' && trimmed === 'N/A') return false;
  return true;
}

function isActiveBound(value) {
  if (value == null) return false;
  const trimmed = typeof value === 'string' ? value.trim() : String(value).trim();
  return Boolean(trimmed);
}

/**
 * Builds active filter chips from searchFilters.
 * Each chip: { id, label, onRemove }
 */
export function buildActiveFilterChips(searchFilters, handlers, labelHelpers = {}) {
  const {
    district,
    mandal,
    panchayati,
    propertyGroup,
    propertyType,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    areaUnit,
    bedrooms,
    bathrooms,
    furnishing,
    propertyAge,
    facing,
    approvedBy,
    amenities,
  } = searchFilters;

  const { removeKeys, removeArrayItem } = handlers;
  const { getPriceFilterLabel, getAreaFilterLabel } = labelHelpers;
  const chips = [];

  if (isActiveString(district, 'district')) {
    chips.push({
      id: 'district',
      label: district,
      onRemove: () => removeKeys('district'),
    });
  }

  if (isActiveString(mandal, 'mandal')) {
    chips.push({
      id: 'mandal',
      label: mandal,
      onRemove: () => removeKeys('mandal'),
    });
  }

  if (isActiveString(panchayati, 'panchayati')) {
    chips.push({
      id: 'panchayati',
      label: panchayati,
      onRemove: () => removeKeys('panchayati'),
    });
  }

  propertyGroup.forEach((group) => {
    chips.push({
      id: `propertyGroup-${group}`,
      label: group,
      onRemove: () => removeArrayItem('propertyGroup', group),
    });
  });

  propertyType.forEach((type) => {
    chips.push({
      id: `propertyType-${type}`,
      label: type,
      onRemove: () => removeArrayItem('propertyType', type),
    });
  });

  if (isActiveBound(minPrice) || isActiveBound(maxPrice)) {
    chips.push({
      id: 'price',
      label: getPriceFilterLabel?.(minPrice, maxPrice) ?? `${minPrice || '0'} – ${maxPrice || '∞'}`,
      onRemove: () => removeKeys('minPrice', 'maxPrice'),
    });
  }

  if (isActiveBound(minArea) || isActiveBound(maxArea)) {
    chips.push({
      id: 'area',
      label:
        getAreaFilterLabel?.(areaUnit, minArea, maxArea) ??
        `${minArea || '0'} – ${maxArea || '5000+'}`,
      onRemove: () => removeKeys('minArea', 'maxArea'),
    });
  }

  if (isActiveString(bedrooms, 'bedrooms')) {
    chips.push({
      id: 'bedrooms',
      label: `${bedrooms} Bedrooms`,
      onRemove: () => removeKeys('bedrooms'),
    });
  }

  if (isActiveString(bathrooms, 'bathrooms')) {
    chips.push({
      id: 'bathrooms',
      label: `${bathrooms} Bathrooms`,
      onRemove: () => removeKeys('bathrooms'),
    });
  }

  if (isActiveString(furnishing, 'furnishing')) {
    chips.push({
      id: 'furnishing',
      label: furnishing,
      onRemove: () => removeKeys('furnishing'),
    });
  }

  if (isActiveString(propertyAge, 'propertyAge')) {
    chips.push({
      id: 'propertyAge',
      label: propertyAge,
      onRemove: () => removeKeys('propertyAge'),
    });
  }

  facing.forEach((direction) => {
    chips.push({
      id: `facing-${direction}`,
      label: direction,
      onRemove: () => removeArrayItem('facing', direction),
    });
  });

  approvedBy.forEach((approval) => {
    chips.push({
      id: `approvedBy-${approval}`,
      label: approval,
      onRemove: () => removeArrayItem('approvedBy', approval),
    });
  });

  amenities.forEach((amenity) => {
    chips.push({
      id: `amenities-${amenity}`,
      label: amenity,
      onRemove: () => removeArrayItem('amenities', amenity),
    });
  });

  return chips;
}
