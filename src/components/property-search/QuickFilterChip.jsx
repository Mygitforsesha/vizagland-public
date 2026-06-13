import { X } from 'lucide-react';
import { horizontalScrollClassName } from './horizontalScroll';

export function QuickFilterChips({ chips = [], onToggle, onClear }) {
  return (
    <div className={`flex items-center gap-2 lg:gap-3 ${horizontalScrollClassName}`}>
      <span className="hidden lg:inline text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase whitespace-nowrap shrink-0">
        Popular Filters
      </span>

      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onToggle?.(chip.id)}
          aria-pressed={chip.active}
          className={`flex items-center gap-1.5 px-3 py-1.5 lg:px-3 lg:py-1.5 text-[12px] rounded-xl font-medium whitespace-nowrap border transition-all duration-150 shrink-0
            ${
              chip.active
                ? 'bg-accent text-white border-accent shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-accent hover:text-accent'
            }`}
        >
          {chip.label}

          <span
            className={`text-[11px] font-bold ${
              chip.active ? 'text-white/80' : 'text-gray-400'
            }`}
          >
            ({chip.count})
          </span>
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-1 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl text-[12px] lg:text-[13px] font-medium text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 whitespace-nowrap shrink-0"
      >
        <X size={12} />
        Clear
      </button>
    </div>
  );
}
