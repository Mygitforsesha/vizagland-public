import { cn } from '@/lib/utils';
import { formControlClass, formFieldClass, formLabelClass } from './formStyles';

export default function FormTextField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  required,
}) {
  const fieldId = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={cn(formFieldClass, className)}>
      <label htmlFor={fieldId} className={formLabelClass}>
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(formControlClass, inputClassName)}
      />
    </div>
  );
}
