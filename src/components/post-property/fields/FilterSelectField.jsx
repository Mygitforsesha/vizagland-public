import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { fromEmptySelectValue, toEmptySelectValue, withAllOption } from './selectFieldUtils';

function resolveOptions(options, allowAll, allLabel) {
  if (!allowAll) return options;

  const hasAllOption = options.some((option) => {
    const value = typeof option === 'string' ? option : option.value;
    return value === 'All' || value === '';
  });

  if (hasAllOption) {
    return withAllOption(options, allLabel);
  }

  return [{ label: allLabel, value: 'All' }, ...options];
}

/**
 * Shared select field for Post Property and search filters.
 * Set allowAll for optional "any" selection in search UIs.
 */
export default function FilterSelectField({
  label,
  hideLabel = false,
  placeholder,
  value,
  onValueChange,
  options,
  className,
  allowAll = false,
  allLabel = 'Any',
}) {
  const resolvedOptions = resolveOptions(options, allowAll, allLabel);

  return (
    <PropertyTypeSelectField
      label={label}
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
