import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { propertyGroups } from '@/lib/searchData';
import { fromEmptySelectValue, toEmptySelectValue, withAllOption } from './selectFieldUtils';

const defaultPropertyGroupOptions = withAllOption(
  ['All', ...Object.keys(propertyGroups)],
  'All Groups',
);

export default function PropertyGroupSelectField({
  value,
  onValueChange,
  options = defaultPropertyGroupOptions,
  placeholder = 'Select Property Group',
  className,
  allowAll = true,
}) {
  return (
    <PropertyTypeSelectField
      label="Property Group"
      placeholder={placeholder}
      value={allowAll ? toEmptySelectValue(value) : value || ''}
      onValueChange={(next) =>
        onValueChange(fromEmptySelectValue(next, { allValue: allowAll ? 'All' : '' }))
      }
      options={options}
      className={className}
    />
  );
}
