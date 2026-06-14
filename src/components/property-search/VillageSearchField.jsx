import { useEffect, useRef } from 'react';
import { Search, X, MapPin } from 'lucide-react';

const variantStyles = {
  mobile: {
    wrapper: 'relative min-w-0 flex-1',
    input:
      'h-11 w-full bg-white rounded-xl pl-10 pr-10 text-sm border border-gray-200 shadow-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
    placeholder: 'Visakhapatnam',
    iconSize: 18,
    clearSize: 16,
  },
  desktop: {
    wrapper: 'relative w-[280px] max-w-[320px] shrink-0',
    input:
      'h-[42px] w-full bg-white rounded-full pl-10 pr-10 text-sm border border-gray-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
    placeholder: 'Search village, locality...',
    iconSize: 18,
    clearSize: 16,
  },
};

export function VillageSearchField({ search, variant = 'mobile', className = '' }) {
  const {
    villageQuery,
    setVillageQuery,
    setShowVillageSuggestions,
    showVillageSuggestions,
    villageSuggestions,
    handleSelectVillage,
    clearLocationFilters,
  } = search;

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const styles = variantStyles[variant];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowVillageSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowVillageSuggestions]);

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <Search
        size={styles.iconSize}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        aria-hidden
      />

      <input
        ref={inputRef}
        type="search"
        value={villageQuery}
        onChange={(e) => {
          setVillageQuery(e.target.value);
          setShowVillageSuggestions(true);

          if (!e.target.value.trim()) {
            clearLocationFilters();
          }
        }}
        onFocus={() => setShowVillageSuggestions(true)}
        placeholder={styles.placeholder}
        className={styles.input}
        aria-label="Search location or village"
      />

      {villageQuery && (
        <button
          type="button"
          onClick={() => {
            setVillageQuery('');
            clearLocationFilters();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border-0 bg-transparent cursor-pointer p-0"
          aria-label="Clear search"
        >
          <X size={styles.clearSize} />
        </button>
      )}

      {showVillageSuggestions && villageQuery.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50"
        >
          {villageSuggestions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No villages found</div>
          ) : (
            villageSuggestions.slice(0, 6).map((v) => (
              <button
                key={v.name}
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSelectVillage(v);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 border-0 bg-transparent cursor-pointer flex items-center gap-2 text-gray-700"
              >
                <MapPin size={12} className="text-gray-400" aria-hidden />
                {v.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
