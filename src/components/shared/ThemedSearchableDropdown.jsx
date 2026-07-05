import { useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { filterOptionsByPrefix } from '@/components/post-property/SearchableSelectField';

export const VILLAGE_DROPDOWN_TRIGGER_CLASS =
  'h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-[13px] font-medium text-gray-900 shadow-sm transition-colors hover:border-primary hover:bg-accent-light/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 data-[size=default]:h-10 [&_svg]:text-gray-400 data-[placeholder]:text-gray-400';

export const THEMED_DROPDOWN_CONTENT_CLASS =
  'z-[260] max-h-52 rounded-xl border border-gray-200 bg-white p-1 shadow-lg';

export const THEMED_DROPDOWN_ITEM_CLASS =
  'rounded-md py-2 pl-2.5 pr-8 text-[13px] text-gray-700 transition-colors focus:bg-accent-light focus:text-primary data-[state=checked]:bg-primary/10 data-[state=checked]:font-semibold data-[state=checked]:text-primary [&_svg]:text-primary';

const DEFAULT_FIELD_CLASS = 'relative flex min-w-0 flex-col min-h-0';
const DEFAULT_LABEL_CLASS =
  'mb-2 block min-h-[1rem] px-0 text-[11px] font-bold uppercase leading-tight tracking-wider text-gray-400';
const ERROR_TRIGGER_CLASS =
  'border-gray-200 bg-red-500/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_3px_rgba(239,68,68,0.07)] ring-1 ring-red-500/15';

export function ThemedDropdown({
  id,
  ariaLabel,
  value,
  onValueChange,
  options,
  placeholder,
  triggerClassName,
  className = '',
}) {
  return (
    <Select value={value || undefined} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        className={`${triggerClassName} ${className}`}
      >
        <SelectValue placeholder={placeholder} className="truncate" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="start"
        sideOffset={4}
        className={THEMED_DROPDOWN_CONTENT_CLASS}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={THEMED_DROPDOWN_ITEM_CLASS}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function ThemedSearchableDropdown({
  id,
  ariaLabel,
  label,
  hideLabel = false,
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage = 'No results found.',
  autoFocusSearch = false,
  triggerClassName = VILLAGE_DROPDOWN_TRIGGER_CLASS,
  className = '',
  required = false,
  hasError = false,
  onOpenChange,
  wrapperClassName = DEFAULT_FIELD_CLASS,
  labelClassName = DEFAULT_LABEL_CLASS,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(
    () => filterOptionsByPrefix(options, search),
    [options, search],
  );

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? value;

  const showErrorState = hasError && !open;
  const resolvedAriaLabel = ariaLabel ?? label ?? placeholder;

  function handleOpenChange(nextOpen) {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) setSearch('');
  }

  return (
    <div className={`${wrapperClassName} ${open ? 'z-[60]' : ''} ${className}`}>
      {!hideLabel && label ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={id}
            aria-label={resolvedAriaLabel}
            aria-expanded={open}
            aria-invalid={showErrorState ? true : undefined}
            className={`${triggerClassName} flex items-center justify-between gap-2 text-left transition-all duration-200 ${
              showErrorState ? ERROR_TRIGGER_CLASS : ''
            }`}
          >
            <span className={`truncate ${!value ? 'text-gray-400' : ''}`}>
              {value ? selectedLabel : placeholder}
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={6}
          onOpenAutoFocus={(event) => {
            if (!autoFocusSearch) event.preventDefault();
          }}
          className={`${THEMED_DROPDOWN_CONTENT_CLASS} z-[260] w-[var(--radix-popover-trigger-width)] p-0`}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="max-h-72">
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onValueChange(option.value);
                      handleOpenChange(false);
                    }}
                    className={`cursor-pointer ${value === option.value ? 'bg-primary/10 font-semibold text-primary' : ''}`}
                  >
                    <span className="truncate">{option.label}</span>
                    {value === option.value && (
                      <Check className="ml-auto size-4 text-primary" aria-hidden />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
