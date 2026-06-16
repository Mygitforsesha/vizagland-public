import { useState } from 'react';
import { ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formSelectContentClass } from '@/components/post-property/formStyles';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'area-asc', label: 'Area: Small → Large' },
];

const sortOrder = sortOptions.map((option) => option.value);

const sortLabels = Object.fromEntries(
  sortOptions.map((option) => [option.value, option.label]),
);

const sortTriggerClass =
  'h-9 min-h-0 min-w-[11rem] rounded-xl border border-gray-200 bg-white pl-9 pr-2 text-[13px] font-semibold text-primary shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 data-[size=default]:h-9 data-[placeholder]:text-gray-400';

const sortItemClass =
  'cursor-pointer text-[13px] data-[highlighted]:bg-primary data-[highlighted]:text-white data-[state=checked]:bg-accent/10 data-[state=checked]:font-semibold data-[state=checked]:text-accent';

function SortDropdown({ sortBy, onSortChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative', open && 'z-[60]')}>
      <ArrowUpDown
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
        aria-hidden
      />
      <Select
        open={open}
        onOpenChange={setOpen}
        value={sortBy}
        onValueChange={onSortChange}
      >
        <SelectTrigger className={sortTriggerClass} aria-label="Sort properties">
          <SelectValue placeholder="Newest" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={6}
          collisionPadding={16}
          align="end"
          className={formSelectContentClass}
        >
          {sortOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={sortItemClass}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SortControls({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  compact = false,
}) {
  if (compact) {
    return (
      <button
        type="button"
        className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-primary cursor-pointer shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Sort properties (${sortLabels[sortBy] ?? 'Newest'})`}
        onClick={() => {
          const idx = sortOrder.indexOf(sortBy);
          onSortChange(sortOrder[(idx + 1) % sortOrder.length]);
        }}
      >
        <ArrowUpDown size={18} aria-hidden />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="hidden sm:flex items-center rounded-xl border border-gray-200 bg-white p-0.5 shadow-sm"
        role="group"
        aria-label="View mode"
      >
        <button
          type="button"
          onClick={() => onViewModeChange('grid')}
          className={`flex h-8 w-8 items-center justify-center rounded-[10px] border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            viewMode === 'grid' ? 'bg-primary text-white' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-primary'
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === 'grid'}
        >
          <LayoutGrid size={16} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          className={`flex h-8 w-8 items-center justify-center rounded-[10px] border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            viewMode === 'list' ? 'bg-primary text-white' : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-primary'
          }`}
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
        >
          <List size={16} aria-hidden />
        </button>
      </div>

      <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
    </div>
  );
}
