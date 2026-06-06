import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, CheckCircle } from 'lucide-react';
import { villages } from '../lib/data';

export function VillageSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function handleInput(val) {
    setQuery(val);
    if (!val.trim()) { setSuggestions([]); return; }
    setSuggestions(villages.filter(v => v.name.toLowerCase().includes(val.toLowerCase())));
  }

  function selectVillage(v) {
    setQuery(v.name);
    setSelectedVillage(v);
    setSuggestions([]);
  }

  function handleSearch() {
    if (!query.trim()) return;
    const found = villages.find(v => v.name.toLowerCase().includes(query.toLowerCase()));
    if (found) setSelectedVillage(found);
    setSuggestions([]);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-primary text-white text-[13px] font-bold px-4 py-3 flex items-center gap-2">
        <Search size={14} /> Search Village / Area
      </div>
      <div className="p-4">
        <div className="relative" ref={ref}>
          <div className="flex">
            <span className="bg-white border border-gray-200 border-r-0 rounded-l-md px-3 flex items-center">
              <MapPin size={15} className="text-accent" />
            </span>
            <input
              type="text"
              value={query}
              onChange={e => handleInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Type village, city, or area..."
              className="flex-1 border border-gray-200 border-l-0 border-r-0 py-2.5 px-3 text-[13px] outline-none focus:ring-0"
            />
            <button onClick={handleSearch} className="bg-accent text-white font-semibold text-[12px] px-3 rounded-r-md hover:bg-accent-hover transition-colors flex items-center gap-1">
              <Search size={13} /> Go
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="absolute z-50 w-full bg-white border border-gray-200 border-t-0 rounded-b-lg max-h-48 overflow-y-auto shadow-lg">
              {suggestions.map(v => (
                <div key={v.name} onClick={() => selectVillage(v)} className="flex items-center gap-2.5 px-3 py-2 cursor-pointer border-b border-gray-50 last:border-0 hover:bg-orange-50 transition-colors">
                  <MapPin size={13} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-primary text-[12px]">{v.name}</div>
                    <div className="text-[10px] text-gray-500">{v.mandal} - {v.gvmcvmrda}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-[11px] text-gray-500 mt-2 mb-0">Try: Vizag, Anandapuram, Gajuwaka...</p>

        {selectedVillage && (
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-teal font-semibold flex items-center gap-1">
                <CheckCircle size={12} /> {selectedVillage.name}
              </span>
              <button onClick={() => { setSelectedVillage(null); setQuery(''); }} className="text-gray-400 hover:text-gray-600 text-sm leading-none bg-transparent border-0 cursor-pointer">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Mandal', value: selectedVillage.mandal },
                { label: 'GVMC', value: selectedVillage.gvmc },
                { label: 'VMRDA', value: selectedVillage.vmrda },
                { label: 'Reg. Area', value: selectedVillage.registration },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[9px] font-bold uppercase text-gray-500 block">{f.label}</label>
                  <span className="text-[11px] text-gray-700 font-medium">{f.value}</span>
                </div>
              ))}
            </div>
            <Link to="/listings" className="inline-block mt-2 bg-primary text-white text-[11px] font-semibold px-3 py-1.5 rounded no-underline hover:bg-primary-dark transition-colors">
              View Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
