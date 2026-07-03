import { useMemo, useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  formFieldClass,
  formLabelClass,
  formSelectContentClass,
  formSelectItemSelectedClass,
  formSelectTriggerClass,
} from './formStyles';

/** Case-insensitive prefix filter for searchable dropdown options. */
export function filterOptionsByPrefix(options, query) {
  const trimmed = query.trim();
  if (!trimmed) return options;
  const q = trimmed.toLowerCase();
  return options.filter(
    (option) =>
      String(option.label).toLowerCase().startsWith(q) ||
      String(option.value).toLowerCase().startsWith(q),
  );
}

export default function SearchableSelectField({
  label,
  placeholder,
  searchPlaceholder,
  value,
  onValueChange,
  onOptionSelect,
  onSearchChange,
  options,
  loading = false,
  emptyMessage = 'No results found.',
  errorMessage = null,
  clearable = false,
  className,
}) {
  const fieldId = label.replace(/\s+/g, '-').toLowerCase();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    if (onSearchChange) return options;
    return filterOptionsByPrefix(options, search);
  }, [options, search, onSearchChange]);

  function handleSearchChange(nextSearch) {
    setSearch(nextSearch);
    onSearchChange?.(nextSearch);
  }

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? value;

  function handleOpenChange(nextOpen) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSearch('');
      onSearchChange?.('');
    }
  }

  return (
    <div className={cn(formFieldClass, open && 'z-[60]', className)}>
      <label htmlFor={fieldId} className={formLabelClass}>
        {label}
      </label>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={fieldId}
            aria-label={label}
            aria-expanded={open}
            className={cn(
              formSelectTriggerClass,
              'flex items-center justify-between gap-2 text-left',
            )}
          >
            <span className={cn('truncate', !value && 'text-gray-400')}>
              {value ? selectedLabel : placeholder}
            </span>
            <span className="flex shrink-0 items-center gap-1">
              {clearable && value ? (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Clear ${label}`}
                  className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onValueChange('');
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      onValueChange('');
                    }
                  }}
                >
                  <X className="size-3.5" aria-hidden />
                </span>
              ) : null}
              <ChevronDown
                className={cn(
                  'size-4 shrink-0 text-gray-400 transition-transform',
                  open && 'rotate-180',
                )}
                aria-hidden
              />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={6}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            formSelectContentClass,
            'w-[var(--radix-popover-trigger-width)] p-0',
          )}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder ?? `Search ${label}...`}
              value={search}
              onValueChange={handleSearchChange}
            />
            <CommandList className="max-h-72">
              <CommandEmpty>
                {loading
                  ? 'Searching...'
                  : errorMessage || emptyMessage}
              </CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.id ?? option.value}
                    value={option.value}
                    onSelect={() => {
                      onValueChange(option.value);
                      onOptionSelect?.(option);
                      handleOpenChange(false);
                    }}
                    className={cn(
                      'cursor-pointer',
                      value === option.value && formSelectItemSelectedClass,
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {value === option.value && (
                      <Check className="ml-auto size-4 text-accent" aria-hidden />
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
