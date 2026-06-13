import { useMemo } from 'react';
import MultiSelectField from '../MultiSelectField';
import { propertyGroups } from '@/lib/searchData';

const propertyGroupOptions = Object.keys(propertyGroups).map((group) => ({
  label: group,
  value: group,
}));

export default function PropertyGroupMultiSelectField({
  value = [],
  onChange,
  label = 'Property Group',
  className,
}) {
  const selectedItems = useMemo(
    () => propertyGroupOptions.filter((option) => value.includes(option.value)),
    [value],
  );

  return (
    <div className={className}>
      <MultiSelectField
        label={label}
        options={propertyGroupOptions}
        value={selectedItems}
        onChange={(items) => onChange(items.map((item) => item.value))}
      />
    </div>
  );
}
