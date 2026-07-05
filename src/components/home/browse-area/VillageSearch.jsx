export default function VillageSearch({ value, onChange }) {
  return (
    <div className="w-full min-w-0 lg:flex-1">
      <label htmlFor="browse-village-search" className="mb-1 block text-xs font-medium text-gray-600">
        Search Village
      </label>
      <input
        id="browse-village-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search Village..."
        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none focus:border-primary"
        autoComplete="off"
      />
    </div>
  );
}
