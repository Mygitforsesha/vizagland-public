import { useEffect, useMemo, useState } from 'react';
import { searchMasterLocations } from '@/api/masterLocationApi';

const DEBOUNCE_MS = 300;

export function useMasterLocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    const timer = setTimeout(async () => {
      try {
        const data = await searchMasterLocations(trimmed);
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
        setError('Unable to load villages. Please try again.');
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  const options = useMemo(
    () =>
      results.map((location) => ({
        value: location.village,
        label: location.village,
        id: location.id,
        location,
      })),
    [results],
  );

  return {
    setQuery,
    options,
    loading,
    error,
  };
}
