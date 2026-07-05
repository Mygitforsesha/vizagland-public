export default function EmptyState({ onClear }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center">
      <p className="text-sm font-medium text-gray-700">No villages found.</p>
      <p className="mt-1 text-sm text-gray-500">Try another village name or clear the filters.</p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 h-9 rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 hover:border-primary hover:text-primary"
      >
        Clear Filters
      </button>
    </div>
  );
}
