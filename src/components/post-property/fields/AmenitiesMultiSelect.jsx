import { useMemo } from 'react';
import MultiSelectField from '../MultiSelectField';
import { amenityOptions } from '@/lib/post-property/formOptions';

/**
 * Multi-select amenities field.
 * Supports object map (search) or array value (forms).
 */
export default function AmenitiesMultiSelect({
  value,
  onChange,
  selectedMap,
  onToggle,
  label = 'Amenities',
  options = amenityOptions,
  className,
}) {
  const selectedItems = useMemo(() => {
    if (Array.isArray(value)) {
      if (value.length === 0) return [];
      if (typeof value[0] === 'string') {
        return options.filter((option) => value.includes(option.value));
      }
      return value;
    }
    if (!selectedMap) return [];

    return options.filter((option) => selectedMap[option.value]);
  }, [value, selectedMap, options]);

  function handleChange(items) {
    if (onChange) {
      onChange(items);
      return;
    }

    if (!onToggle) return;

    const nextValues = new Set(items.map((item) => item.value));
    options.forEach((option) => {
      const wasSelected = Boolean(selectedMap?.[option.value]);
      const isSelected = nextValues.has(option.value);
      if (wasSelected !== isSelected) onToggle(option.value);
    });
  }

  return (
    <div className={className}>
      <MultiSelectField
        label={label}
        options={options}
        value={selectedItems}
        onChange={handleChange}
      />
    </div>
  );
}
