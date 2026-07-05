import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { areaUnitOptions } from '@/lib/post-property/formOptions';
import { fromEmptySelectValue, toEmptySelectValue, withAllOption } from './selectFieldUtils';

export default function AreaUnitSelectField({
  value,
  onValueChange,
  options = areaUnitOptions,
  placeholder = 'Select Area Unit',
  hideLabel = false,
  className,
  allowAll = false,
  allLabel = 'All Units',
}) {
  const resolvedOptions = allowAll ? withAllOption(options, allLabel) : options;

  return (
    <PropertyTypeSelectField
      label="Area Unit"
      hideLabel={hideLabel}
      placeholder={placeholder}
      value={allowAll ? toEmptySelectValue(value) : value || ''}
      onValueChange={(next) =>
        onValueChange(allowAll ? fromEmptySelectValue(next) : next)
      }
      options={resolvedOptions}
      className={className}
    />
  );
}
