import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Maximize, Compass, Building2, Layers, ChevronLeft, ChevronRight, X, Home, SlidersHorizontal, ChevronDown } from 'lucide-react';
import {
  searchProperties, villageData, priceRanges, areaRangesByUnit, areaUnits, propertyAges, facingOptions, furnishingOptions, propertyGroups, listingTypes,
} from '../lib/searchData';

const ITEMS_PER_PAGE = 6;

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="flex gap-3 mt-3">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-9 bg-gray-200 rounded mt-3" />
      </div>
    </div>
  );
}

export function PropertySearchPage() {
  const [selectedVillage, setSelectedVillage] = useState('');
  const [villageQuery, setVillageQuery] = useState('');
  const [showVillageSuggestions, setShowVillageSuggestions] = useState(false);
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [panchayati, setPanchayati] = useState('');
  const [listingType, setListingType] = useState('All');
  const [propertyGroup, setPropertyGroup] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [areaRange, setAreaRange] = useState(0);
  const [areaUnit, setAreaUnit] = useState('All');
  const [propertyAge, setPropertyAge] = useState('All');
  const [facing, setFacing] = useState('All');
  const [totalFloors, setTotalFloors] = useState('All');
  const [floorNumber, setFloorNumber] = useState('All');
  const [furnishing, setFurnishing] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const villageInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
          villageInputRef.current && !villageInputRef.current.contains(e.target)) {
        setShowVillageSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availablePropertyTypes = useMemo(() => {
    if (propertyGroup === 'All') return ['All'];
    return ['All', ...propertyGroups[propertyGroup]];
  }, [propertyGroup]);

  const villageSuggestions = useMemo(() => {
    if (!villageQuery.trim()) return villageData;
    const q = villageQuery.toLowerCase();
    return villageData.filter(v => v.name.toLowerCase().includes(q));
  }, [villageQuery]);

  function handleSelectVillage(v) {
    setSelectedVillage(v.name);
    setVillageQuery(v.name);
    setDistrict(v.district);
    setMandal(v.mandal);
    setPanchayati(v.panchayati);
    setShowVillageSuggestions(false);
    setCurrentPage(1);
    triggerLoading();
  }

  function triggerLoading() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }

function handleFilterChange(setter, value) {
      setter(value);
    setCurrentPage(1);
    triggerLoading();
  }

  function handlePropertyGroupChange(value) {
    setPropertyGroup(value);
    setPropertyType('All');
    setAreaUnit('All');
    setAreaRange(0);
    setCurrentPage(1);
    triggerLoading();
  }

  const availableAreaUnits = useMemo(() => {
    if (propertyGroup === 'Agricultural') return ['All', 'sq.yds', 'Acres'];
    if (propertyGroup === 'Residential') return ['All', 'sq.ft'];
    return areaUnits;
  }, [propertyGroup]);

  function resetFilters() {
    setSelectedVillage('');
    setVillageQuery('');
    setDistrict('');
    setMandal('');
    setPanchayati('');
    setListingType('All');
    setPropertyGroup('All');
    setPropertyType('All');
    setPriceRange(0);
    setAreaRange(0);
    setAreaUnit('All');
    setPropertyAge('All');
    setFacing('All');
    setTotalFloors('All');
    setFloorNumber('All');
    setFurnishing('All');
    setCurrentPage(1);
    triggerLoading();
  }

  const filtered = useMemo(() => {
    let result = searchProperties;

    if (selectedVillage) {
      result = result.filter(p => p.village === selectedVillage);
    }
    if (district && district !== 'All') {
      result = result.filter(p => p.district === district);
    }
    if (mandal && mandal !== 'All') {
      result = result.filter(p => p.mandal === mandal);
    }
    if (panchayati && panchayati !== 'All' && panchayati !== 'N/A') {
      result = result.filter(p => p.panchayati === panchayati);
    }
    if (listingType !== 'All') {
      result = result.filter(p => p.listingType === listingType);
    }
    if (propertyGroup !== 'All') {
      result = result.filter(p => p.propertyGroup === propertyGroup);
    }
    if (propertyType !== 'All') {
      result = result.filter(p => p.propertyType === propertyType);
    }
    if (priceRange > 0) {
      const range = priceRanges[priceRange];
      result = result.filter(p => p.price >= range.min && p.price <= range.max);
    }
    if (areaRange > 0) {
      const unitKey = areaUnit === 'All' ? 'sq.ft' : areaUnit;
      const ranges = areaRangesByUnit[unitKey];
      if (ranges && ranges[areaRange]) {
        const range = ranges[areaRange];
        result = result.filter(p => {
          const numericArea = parseFloat(p.area.replace(/,/g, ''));
          return numericArea >= range.min && numericArea <= range.max;
        });
      }
    }
    if (areaUnit !== 'All') {
      result = result.filter(p => p.areaUnit === areaUnit);
    }
    if (propertyAge !== 'All') {
      result = result.filter(p => p.propertyAge === propertyAge);
    }
    if (facing !== 'All') {
      result = result.filter(p => p.facing === facing);
    }
    if (totalFloors !== 'All') {
      const tf = parseInt(totalFloors);
      result = result.filter(p => p.totalFloors === tf);
    }
    if (floorNumber !== 'All') {
      const fn = parseInt(floorNumber);
      result = result.filter(p => p.floorNumber === fn);
    }
    if (furnishing !== 'All') {
      result = result.filter(p => p.furnishing === furnishing);
    }

    return result;
  }, [selectedVillage, district, mandal, panchayati, listingType, propertyGroup, propertyType, priceRange, areaRange, areaUnit, propertyAge, facing, totalFloors, floorNumber, furnishing]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedResults = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const uniqueFloors = [...new Set(searchProperties.map(p => p.totalFloors).filter(f => f > 0))].sort((a, b) => a - b);
  const uniqueFloorNumbers = [...new Set(searchProperties.map(p => p.floorNumber).filter(f => f > 0))].sort((a, b) => a - b);

  const hasActiveFilters = selectedVillage || listingType !== 'All' || propertyGroup !== 'All' || propertyType !== 'All' || priceRange > 0 || areaRange > 0 || areaUnit !== 'All' || propertyAge !== 'All' || facing !== 'All' || totalFloors !== 'All' || floorNumber !== 'All' || furnishing !== 'All';

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white text-2xl font-bold m-0 flex items-center gap-3">
            <Search size={24} /> Property Search
          </h1>
          <p className="text-blue-200 text-sm mt-2 mb-0">Find your perfect property using filters below</p>
        </div>
      </div>

      {/* Sticky Filter Section */}
      <div className="sticky top-[56px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          {/* Mobile toggle button */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer mb-2"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <SlidersHorizontal size={14} className="text-accent" />
              Search & Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-accent rounded-full" />
              )}
            </span>
            <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Collapsible filter content */}
          <div className={`${filtersOpen ? 'block' : 'hidden'} sm:block`}>
          {/* Village Search - Mandatory */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-accent" />
              <span className="text-sm font-semibold text-gray-700">Select Village</span>
              {selectedVillage && (
                <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full font-medium">
                  {selectedVillage}
                </span>
              )}
            </div>
            <div className="relative max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={villageInputRef}
                type="text"
                value={villageQuery}
                onChange={e => {
                  setVillageQuery(e.target.value);
                  setShowVillageSuggestions(true);
                  if (!e.target.value.trim()) {
                    setSelectedVillage('');
                    setDistrict('');
                    setMandal('');
                    setPanchayati('');
                  }
                }}
                onFocus={() => setShowVillageSuggestions(true)}
                placeholder="Type village name to search..."
                className="w-full border-2 border-gray-200 rounded-lg pl-9 pr-10 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
              {villageQuery && (
                <button
                  onClick={() => { setVillageQuery(''); setSelectedVillage(''); setDistrict(''); setMandal(''); setPanchayati(''); setShowVillageSuggestions(true); triggerLoading(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer p-0"
                >
                  <X size={14} />
                </button>
              )}
              {showVillageSuggestions && (
                <div ref={suggestionsRef} className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
                  {villageSuggestions.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">No villages found</div>
                  ) : (
                    villageSuggestions.map(v => (
                      <button
                        key={v.name}
                        onClick={() => handleSelectVillage(v)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-between ${
                          selectedVillage === v.name ? 'bg-accent/10 text-accent font-medium' : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                          {v.name}
                        </span>
                        <span className="text-[11px] text-gray-400">{v.mandal}, {v.district}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <FilterDropdown label="District" value={district || 'All'} onChange={v => handleFilterChange(setDistrict, v)} options={['All', ...new Set(villageData.map(v => v.district))]} />
            <FilterDropdown label="Mandal" value={mandal || 'All'} onChange={v => handleFilterChange(setMandal, v)} options={['All', ...new Set(villageData.map(v => v.mandal))]} />
            <FilterDropdown label="Panchayati" value={panchayati || 'All'} onChange={v => handleFilterChange(setPanchayati, v)} options={['All', ...new Set(villageData.map(v => v.panchayati))]} />
            <FilterDropdown label="Listing Type" value={listingType} onChange={v => handleFilterChange(setListingType, v)} options={listingTypes} />
            <FilterDropdown label="Property Group" value={propertyGroup} onChange={handlePropertyGroupChange} options={['All', ...Object.keys(propertyGroups)]} />
            <FilterDropdown label="Property Type" value={propertyType} onChange={v => handleFilterChange(setPropertyType, v)} options={availablePropertyTypes} />
            <div>
              <label className="text-[11px] font-semibold text-gray-500 block mb-1">Price Range</label>
              <select
                value={priceRange}
                onChange={e => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); triggerLoading(); }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-accent transition-colors bg-white cursor-pointer"
              >
                {priceRanges.map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-500 block mb-1">Area Range</label>
              <select
                value={areaRange}
                onChange={e => { setAreaRange(parseInt(e.target.value)); setCurrentPage(1); triggerLoading(); }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-accent transition-colors bg-white cursor-pointer"
              >
                {(areaRangesByUnit[areaUnit === 'All' ? 'sq.ft' : areaUnit] || []).map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
            </div>
            <FilterDropdown label="Area Unit" value={areaUnit} onChange={v => { setAreaRange(0); handleFilterChange(setAreaUnit, v); }} options={availableAreaUnits} />
            <FilterDropdown label="Property Age" value={propertyAge} onChange={v => handleFilterChange(setPropertyAge, v)} options={propertyAges} />
            <FilterDropdown label="Facing" value={facing} onChange={v => handleFilterChange(setFacing, v)} options={facingOptions} />
            <FilterDropdown label="Total Floors" value={totalFloors} onChange={v => handleFilterChange(setTotalFloors, v)} options={['All', ...uniqueFloors.map(String)]} />
            <FilterDropdown label="Floor Number" value={floorNumber} onChange={v => handleFilterChange(setFloorNumber, v)} options={['All', ...uniqueFloorNumbers.map(String)]} />
            <FilterDropdown label="Furnishing" value={furnishing} onChange={v => handleFilterChange(setFurnishing, v)} options={furnishingOptions} />
          </div>

          {/* Search Button */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 gap-3">
            <div className="text-sm text-gray-600 hidden sm:block">
              <span className="font-bold text-primary">{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'} found
              {selectedVillage && <span className="text-gray-400"> in <span className="font-medium text-gray-700">{selectedVillage}</span></span>}
            </div>
            <button
              onClick={() => { setFiltersOpen(false); triggerLoading(); }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent border-0 rounded-lg px-5 py-2 hover:bg-accent/90 transition-colors cursor-pointer"
            >
              <Search size={14} /> Search
            </button>
          </div>
          </div>{/* end collapsible wrapper */}

          {/* Mobile result count - always visible */}
          <div className="sm:hidden flex items-center justify-between mt-2 text-sm text-gray-600">
            <span>
              <span className="font-bold text-primary">{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'} found
              {selectedVillage && <span className="text-gray-400"> in <span className="font-medium text-gray-700">{selectedVillage}</span></span>}
            </span>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <section className="py-8 bg-gray-50 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No Properties Found</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                No properties match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={resetFilters}
                className="text-accent font-semibold text-sm hover:underline bg-transparent border-0 cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Property Grid */}
          {!isLoading && filtered.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {paginatedResults.map(property => (
                  <div key={property.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="relative overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-[11px] font-bold px-2.5 py-1 rounded-md">
                        {property.id}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16" />
                      <span className="absolute bottom-3 left-3 text-white text-lg font-extrabold">
                        ₹{property.priceLabel}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-[14px] font-bold text-gray-800 mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 flex items-center gap-1 mb-3">
                        <MapPin size={12} className="text-accent flex-shrink-0" /> {property.village}, {property.district}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 mb-3">
                        <span className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1.5">
                          <Maximize size={11} className="text-gray-400" /> {property.area} {property.areaUnit}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1.5">
                          <Compass size={11} className="text-gray-400" /> {property.facing}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1.5">
                          <Home size={11} className="text-gray-400" /> {property.furnishing}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1.5">
                          <Building2 size={11} className="text-gray-400" />
                          {property.totalFloors > 0 ? `Floor ${property.floorNumber}/${property.totalFloors}` : 'Plot'}
                        </span>
                      </div>

                      <Link
                        to={`/property/${property.id}`}
                        className="block w-full text-center bg-primary text-white text-[12px] font-semibold py-2.5 rounded-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-md no-underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); triggerLoading(); }}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); triggerLoading(); }}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); triggerLoading(); }}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FilterDropdown({
  label,
  value,
  onChange,
  options,
}) {
return (
    <div>
      <label className="text-[11px] font-semibold text-gray-500 block mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-accent transition-colors bg-white cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}