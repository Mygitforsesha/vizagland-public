import { ArrowUpDown, LayoutGrid, List } from 'lucide-react';

const sortLabels = {
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'area-asc': 'Area: Low to High',
};

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
        className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-primary cursor-pointer shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Sort properties"
        onClick={() => {
          const order = ['newest', 'price-asc', 'price-desc', 'area-asc'];
          const idx = order.indexOf(sortBy);
          onSortChange(order[(idx + 1) % order.length]);
        }}
      >
        <ArrowUpDown size={20} aria-hidden />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className="hidden sm:flex items-center rounded-lg border border-gray-200 overflow-hidden"
        role="group"
        aria-label="View mode"
      >
        <button
          type="button"
          onClick={() => onViewModeChange('grid')}
          className={`p-2 border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
            viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === 'grid'}
        >
          <LayoutGrid size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('list')}
          className={`p-2 border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
            viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
        >
          <List size={18} aria-hidden />
        </button>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-medium whitespace-nowrap">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer"
          aria-label="Sort properties"
        >
          {(Object.keys(sortLabels)).map((key) => (
            <option key={key} value={key}>
              {sortLabels[key]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
