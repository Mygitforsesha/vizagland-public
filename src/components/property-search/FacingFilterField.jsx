import { cn } from '@/lib/utils';
import { formFieldClass, formLabelClass } from '@/components/post-property/formStyles';
import { facingOptions as searchFacingOptions } from '@/lib/searchData';

/**
 * Search-only facing filter — multi-select checkbox grid.
 */
export function FacingFilterField({
  value = [],
  onChange,
  label = 'Facing',
  className,
}) {
  const options = searchFacingOptions.filter((facing) => facing !== 'All');

  function toggle(direction) {
    onChange(
      value.includes(direction)
        ? value.filter((item) => item !== direction)
        : [...value, direction],
    );
  }

  return (
    <div className={cn(formFieldClass, className)}>
      <span className={formLabelClass}>{label}</span>
      <div className="grid grid-cols-2 gap-2" role="group" aria-label={label}>
        {options.map((direction) => {
          const checked = value.includes(direction);

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
                onChange={() => toggle(direction)}
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
