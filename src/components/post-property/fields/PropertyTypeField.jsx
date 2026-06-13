import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { fromEmptySelectValue, toEmptySelectValue } from './selectFieldUtils';

export default function PropertyTypeField({
  value,
  onValueChange,
  options,
  placeholder = 'All Types',
  className,
  allowAll = true,
}) {
  return (
    <PropertyTypeSelectField
      label="Property Type"
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
