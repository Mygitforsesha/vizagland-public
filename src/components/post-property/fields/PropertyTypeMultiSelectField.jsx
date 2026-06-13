import { useMemo } from 'react';
import MultiSelectField from '../MultiSelectField';

export default function PropertyTypeMultiSelectField({
  value = [],
  onChange,
  options = [],
  label = 'Property Type',
  className,
}) {
  const typeOptions = useMemo(
    () =>
      options
        .filter((option) => option !== 'All')
        .map((option) => ({ label: option, value: option })),
    [options],
  );

  const selectedItems = useMemo(
    () => typeOptions.filter((option) => value.includes(option.value)),
    [typeOptions, value],
  );

  return (
    <div className={className}>
      <MultiSelectField
        label={label}
        options={typeOptions}
        value={selectedItems}
        onChange={(items) => onChange(items.map((item) => item.value))}
      />
    </div>
  );
}
