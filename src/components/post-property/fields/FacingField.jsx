import { cn } from '@/lib/utils';
import { facingOptions as postFacingOptions } from '@/lib/post-property/formOptions';
import { facingOptions as searchFacingOptions } from '@/lib/searchData';
import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { formFieldClass, formLabelClass } from '../formStyles';
import { fromEmptySelectValue, toEmptySelectValue } from './selectFieldUtils';

/**
 * Facing field — select mode (Post Property) or checkbox mode (Search filters).
 */
export default function FacingField({
  value,
  onValueChange,
  variant = 'select',
  options,
  label = 'Facing',
  placeholder = 'Select',
  className,
  allowAll = false,
}) {
  const resolvedOptions =
    options ??
    (variant === 'checkbox'
      ? searchFacingOptions.filter((facing) => facing !== 'All')
      : postFacingOptions);

  if (variant === 'checkbox') {
    const selected = value === 'All' ? '' : value;

    return (
      <div className={cn(formFieldClass, className)}>
        <span className={formLabelClass}>{label}</span>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label={label}>
          {resolvedOptions.map((option) => {
            const direction = typeof option === 'string' ? option : option.value;
            const checked = selected === direction;

            return (
              <label
                key={direction}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  checked
                    ? 'border-primary bg-primary/5 font-medium text-primary'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onValueChange(checked ? 'All' : direction)}
                  className="rounded border-gray-300 text-primary focus:ring-accent"
                  aria-label={`Facing ${direction}`}
                />
                {direction}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <PropertyTypeSelectField
      label={label}
      placeholder={placeholder}
      value={allowAll ? toEmptySelectValue(value) : value || ''}
      onValueChange={(next) =>
        onValueChange(allowAll ? fromEmptySelectValue(next, { allValue: 'All' }) : next)
      }
      options={
        Array.isArray(resolvedOptions) && typeof resolvedOptions[0] === 'string'
          ? resolvedOptions.map((facing) => ({ label: facing, value: facing }))
          : resolvedOptions
      }
      className={className}
    />
  );
}
