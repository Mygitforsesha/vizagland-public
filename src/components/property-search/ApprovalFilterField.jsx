import { cn } from '@/lib/utils';
import { formFieldClass, formLabelClass } from '@/components/post-property/formStyles';
import { approvalOptions } from '@/lib/post-property/formOptions';

/**
 * Search-only approval filter — multi-select checkbox grid.
 */
export function ApprovalFilterField({
  value = [],
  onChange,
  label = 'Approved By',
  options = approvalOptions,
  className,
}) {
  function toggle(approval) {
    onChange(
      value.includes(approval)
        ? value.filter((item) => item !== approval)
        : [...value, approval],
    );
  }

  return (
    <div className={cn(formFieldClass, className)}>
      <span className={formLabelClass}>{label}</span>
      <div className="grid grid-cols-2 gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const approval = option.value;
          const checked = value.includes(approval);

          return (
            <label
              key={approval}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                checked
                  ? 'border-primary bg-primary/5 font-medium text-primary'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(approval)}
                className="rounded border-gray-300 text-primary focus:ring-accent"
                aria-label={`Approved by ${option.label}`}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
