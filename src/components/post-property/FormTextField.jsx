import { cn } from '@/lib/utils';
import {
  formControlClass,
  formControlErrorClass,
  formFieldClass,
  formFieldCompactClass,
  formHintClass,
  formLabelClass,
} from './formStyles';

export default function FormTextField({
  label,
  hideLabel = false,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  required,
  hasError = false,
  inputMode,
  maxLength,
  pattern,
}) {
  const fieldId =
    id ??
    (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined) ??
    `field-${placeholder?.replace(/\s+/g, '-').toLowerCase() ?? 'input'}`;
  const ariaLabel = label ?? placeholder;

  return (
    <div className={cn(hideLabel ? formFieldCompactClass : formFieldClass, className)}>
      {!hideLabel && label ? (
        <label htmlFor={fieldId} className={formLabelClass}>
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-label={ariaLabel}
        aria-invalid={hasError ? true : undefined}
        inputMode={inputMode}
        maxLength={maxLength}
        pattern={pattern}
        className={cn(formControlClass, hasError && formControlErrorClass, inputClassName)}
      />
    </div>
  );
}
