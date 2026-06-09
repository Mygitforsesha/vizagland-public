import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  formFieldClass,
  formLabelClass,
  formSelectContentClass,
  formSelectTriggerClass,
} from './formStyles';

export default function PropertyTypeSelectField({
  label,
  placeholder,
  value,
  onValueChange,
  options,
  className,
}) {
  const fieldId = label.replace(/\s+/g, '-').toLowerCase();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(formFieldClass, open && 'z-[60]', className)}>
      <label htmlFor={fieldId} className={formLabelClass}>
        {label}
      </label>
      <Select
        open={open}
        onOpenChange={setOpen}
        value={value || undefined}
        onValueChange={onValueChange}
      >
        <SelectTrigger id={fieldId} className={formSelectTriggerClass} aria-label={label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={6}
          collisionPadding={16}
          className={formSelectContentClass}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer data-[highlighted]:bg-primary data-[highlighted]:text-white"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span>{option.label}</span>
                {option.units && (
                  <span className="text-xs opacity-80">{option.units.join(' / ')}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
