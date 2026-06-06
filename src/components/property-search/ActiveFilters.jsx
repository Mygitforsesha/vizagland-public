import { X } from 'lucide-react';

export function ActiveFilters({
  chips,
  onClearAll,
  variant = 'desktop',
}) {
  if (chips.length === 0) return null;

  if (variant === 'mobile') {
    return (
      <div
        className="flex flex-wrap items-center gap-2 justify-end"
        role="list"
        aria-label="Active filters"
      >
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={chip.onRemove}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium border-0 cursor-pointer hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            role="listitem"
            aria-label={`Remove filter ${chip.label}`}
          >
            {chip.label}
            <X size={12} aria-hidden />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2 mb-4"
      role="list"
      aria-label="Active filters"
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium border-0 cursor-pointer hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          role="listitem"
          aria-label={`Remove filter ${chip.label}`}
        >
          {chip.label}
          <X size={14} aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-accent text-sm font-semibold bg-transparent border-0 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1"
        aria-label="Clear all filters"
      >
        Clear All
      </button>
    </div>
  );
}