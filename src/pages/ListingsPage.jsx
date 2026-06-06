import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, Grid3x3 as Grid3X3, List, Headphones, ShoppingCart, Tag, Home as HomeIcon, FileText, ChevronDown, ChevronUp, BadgeCheck, SlidersHorizontal, X } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { VillageSearch } from '../components/VillageSearch';
import { DualRangeSlider } from '../components/DualRangeSlider';
import { properties } from '../lib/data';



const categoryConfig = {
  Buy: { label: 'For Buy', title: 'Buy Properties in Visakhapatnam', icon: ShoppingCart },
  Sell: { label: 'For Sale', title: 'Properties for Sale in Visakhapatnam', icon: Tag },
  Rent: { label: 'For Rent', title: 'Rental Properties in Visakhapatnam', icon: HomeIcon },
  Lease: { label: 'For Lease', title: 'Lease Properties in Visakhapatnam', icon: FileText },
};

const BUDGET_MIN = 100000;
const BUDGET_MAX = 30000000;
const RENT_BUDGET_MIN = 5000;
const RENT_BUDGET_MAX = 500000;

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState((searchParams.get('cat')) || 'Buy');
  const [filterType, setFilterType] = useState(searchParams.get('type') || '');
  const [filterCity, setFilterCity] = useState(searchParams.get('city') || '');
  const [budgetMin, setBudgetMin] = useState(BUDGET_MIN);
  const [budgetMax, setBudgetMax] = useState(BUDGET_MAX);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterBeds, setFilterBeds] = useState('');
  const [filterBaths, setFilterBaths] = useState('');
  const [filterParking, setFilterParking] = useState('');
  const [filterFurnishing, setFilterFurnishing] = useState('');
  const [filterFacing, setFilterFacing] = useState('');
  const [filterApproval, setFilterApproval] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchArea, setSearchArea] = useState('');
  const [searchHighlight, setSearchHighlight] = useState(false);
  const villageSearchRef = useRef(null);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat && categoryConfig[cat]) {
      setActiveCategory(cat);
    }
    const type = searchParams.get('type');
    if (type) setFilterType(type);
    const city = searchParams.get('city');
    if (city) setFilterCity(city);
    if (searchParams.get('focus') === 'search') {
      setTimeout(() => {
        villageSearchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setSearchHighlight(true);
        setTimeout(() => setSearchHighlight(false), 2500);
      }, 300);
    }
  }, [searchParams]);

  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    setSearchParams({ cat });
    resetFilters(false, cat);
  }

  function resetFilters(resetCategory = true, forCategory) {
    setFilterType('');
    setFilterCity('');
    const cat = forCategory || (resetCategory ? 'Buy' : activeCategory);
    const isRentLease = cat === 'Rent' || cat === 'Lease';
    setBudgetMin(isRentLease ? RENT_BUDGET_MIN : BUDGET_MIN);
    setBudgetMax(isRentLease ? RENT_BUDGET_MAX : BUDGET_MAX);
    setFilterVerified(false);
    setFilterBeds('');
    setFilterBaths('');
    setFilterParking('');
    setFilterFurnishing('');
    setFilterFacing('');
    setFilterApproval('');
    setSearchArea('');
    if (resetCategory) {
      setActiveCategory('Buy');
      setSearchParams({});
    }
  }

  const filtered = useMemo(() => {
    let result = properties.filter(p => p.category === activeCategory);

    if (searchArea) {
      const q = searchArea.toLowerCase();
      result = result.filter(p => p.location.toLowerCase().includes(q) || p.title.toLowerCase().includes(q));
    }
    if (filterType) result = result.filter(p => p.type === filterType);
    if (filterCity) result = result.filter(p => p.location.toLowerCase().includes(filterCity.toLowerCase()));
    if (filterVerified) result = result.filter(p => p.verified);
    if (filterBeds) result = result.filter(p => p.beds >= parseInt(filterBeds));
    if (filterBaths) result = result.filter(p => p.baths >= parseInt(filterBaths));
    if (filterParking) result = result.filter(p => (p.parking || 0) >= parseInt(filterParking));
    if (filterFurnishing) result = result.filter(p => p.furnishing === filterFurnishing);
    if (filterFacing) result = result.filter(p => p.facing === filterFacing);
    if (filterApproval) result = result.filter(p => p.approvalType === filterApproval);

    const isRentLease = activeCategory === 'Rent' || activeCategory === 'Lease';
    const bMin = isRentLease ? RENT_BUDGET_MIN : BUDGET_MIN;
    const bMax = isRentLease ? RENT_BUDGET_MAX : BUDGET_MAX;
    if (budgetMin > bMin || budgetMax < bMax) {
      result = result.filter(p => p.priceNumeric >= budgetMin && p.priceNumeric <= budgetMax);
    }

    switch (sortBy) {
      case 'price_low': result.sort((a, b) => a.priceNumeric - b.priceNumeric); break;
      case 'price_high': result.sort((a, b) => b.priceNumeric - a.priceNumeric); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }

    return result;
  }, [activeCategory, searchArea, filterType, filterCity, budgetMin, budgetMax, filterVerified, filterBeds, filterBaths, filterParking, filterFurnishing, filterFacing, filterApproval, sortBy]);

  const residentialFilterTypes = ['Residential Flats', 'Residential House', 'Builder Floor Apartment', 'Villas', 'Individual House', 'Group House', 'Pent House', 'Studio Apartment', 'Ready to Move', 'Under Construction', 'Pre Launch'];
  const commercialFilterTypes = ['Office', 'Commercial Space', 'Office in IT Park/SEZ', 'Shop', 'Showroom', 'Warehouse/Godown', 'Industrial Building', 'Industrial Shed', 'Factory'];
  const landFilterTypes = ['Residential Plot', 'Open Plots', 'Farm Plots', 'Approved Layout', 'Venture', 'Land', 'Industrial Land', 'Gated Community', 'Township'];

  const showResidentialFilters = filterType === '' || residentialFilterTypes.includes(filterType);
  const showCommercialFilters = commercialFilterTypes.includes(filterType);
  const showLandFilters = landFilterTypes.includes(filterType);
  const isRentLeaseCategory = activeCategory === 'Rent' || activeCategory === 'Lease';
  const sliderMin = isRentLeaseCategory ? RENT_BUDGET_MIN : BUDGET_MIN;
  const sliderMax = isRentLeaseCategory ? RENT_BUDGET_MAX : BUDGET_MAX;

  const handleBudgetChange = useCallback((newMin, newMax) => {
    setBudgetMin(newMin);
    setBudgetMax(newMax);
  }, []);

  const residentialTypes = ['Residential Flats', 'Residential House', 'Builder Floor Apartment', 'Individual House', 'Group House', 'Pent House', 'Studio Apartment'];
  const villaTypes = ['Villas'];
  const plotTypes = ['Residential Plot', 'Open Plots', 'Farm Plots', 'Approved Layout', 'Venture'];
  const commercialTypes = ['Office', 'Commercial Space', 'Office in IT Park/SEZ', 'Shop', 'Showroom', 'Warehouse/Godown', 'Industrial Land', 'Industrial Building', 'Industrial Shed', 'Factory', 'Land'];

  const quickChips = useMemo(() => {
    const catProperties = properties.filter(p => p.category === activeCategory);
    return [
      { label: 'Verified Only', count: catProperties.filter(p => p.verified).length, action: () => setFilterVerified(true), active: filterVerified },
      { label: 'Flats', count: catProperties.filter(p => residentialTypes.includes(p.type)).length, action: () => setFilterType('Residential Flats'), active: filterType === 'Residential Flats' },
      { label: 'Villas', count: catProperties.filter(p => villaTypes.includes(p.type)).length, action: () => setFilterType('Villas'), active: filterType === 'Villas' },
      { label: 'Plots', count: catProperties.filter(p => plotTypes.includes(p.type)).length, action: () => setFilterType('Residential Plot'), active: filterType === 'Residential Plot' },
      { label: 'Commercial', count: catProperties.filter(p => commercialTypes.includes(p.type)).length, action: () => setFilterType('Office'), active: filterType === 'Office' },
    ].filter(c => c.count > 0);
  }, [activeCategory, filterType, filterVerified]);

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-white text-xl font-bold m-0">{categoryConfig[activeCategory].title}</h2>
          <p className="text-blue-200 text-[13px] mt-1 mb-0">Verified Properties across Visakhapatnam GVMC & VMRDA area</p>
        </div>
      </div>

      {/* Full-width Village/Area Search */}
      <div
        ref={villageSearchRef}
        className={`w-full border-b border-gray-200 transition-all duration-700 ${searchHighlight ? 'bg-accent/5 shadow-lg ring-2 ring-inset ring-accent/40' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="max-w-2xl mx-auto">
            <VillageSearch />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-[56px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {(Object.keys(categoryConfig)).map(cat => {
              const config = categoryConfig[cat];
              const Icon = config.icon;
              const count = properties.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-[13px] font-semibold whitespace-nowrap border-b-[3px] transition-all duration-200 bg-transparent cursor-pointer ${
                    activeCategory === cat
                      ? 'border-accent text-accent'
                      : 'border-transparent text-gray-600 hover:text-primary hover:border-gray-300'
                  }`}
                >
                  <Icon size={15} />
                  {config.label}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-500'
                  }`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-[12px] text-gray-500">
            <a href="/" className="text-gray-500 no-underline hover:text-accent">Home</a>
            <span className="mx-1.5">/</span>
            <span className="text-gray-500">Properties</span>
            <span className="mx-1.5">/</span>
            <span className="text-gray-800 font-medium">{categoryConfig[activeCategory].label}</span>
          </nav>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="bg-white border-b border-gray-100 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1 flex-shrink-0">Quick:</span>
            {quickChips.map(chip => (
              <button
                key={chip.label}
                onClick={chip.action}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap border transition-all duration-150 cursor-pointer ${
                  chip.active
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-accent hover:text-accent'
                }`}
              >
                {chip.label}
                <span className={`text-[10px] font-bold ${chip.active ? 'text-white/80' : 'text-gray-400'}`}>({chip.count})</span>
              </button>
            ))}
            {(filterType || filterVerified || filterBeds || searchArea) && (
              <button
                onClick={() => resetFilters(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <X size={11} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 text-[13px] font-semibold text-primary bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 w-full justify-center cursor-pointer"
        >
          <SlidersHorizontal size={14} />
          {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          {mobileFiltersOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className={`lg:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="lg:sticky lg:top-[120px] space-y-4">

                {/* Main Filters */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-primary text-white text-[13px] font-bold px-4 py-3 flex items-center gap-2">
                    <Filter size={14} /> Filter Properties
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Search Area */}
                    <FilterSection title="Search Area">
                      <div className="relative">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={searchArea}
                          onChange={e => setSearchArea(e.target.value)}
                          placeholder="Search area, locality..."
                          className="w-full border border-gray-200 rounded-md pl-8 pr-3 py-2 text-[13px] outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </FilterSection>

                    {/* Property Type */}
                    <FilterSection title="Property Type">
                      <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent transition-colors">
                        <option value="">All Types</option>
                        <optgroup label="Residential">
                          <option value="Residential Flats">Residential Flats</option>
                          <option value="Residential Plot">Residential Plot</option>
                          <option value="Residential House">Residential House</option>
                          <option value="Builder Floor Apartment">Builder Floor Apartment</option>
                          <option value="Villas">Villas</option>
                          <option value="Group House">Group House</option>
                          <option value="Individual House">Individual House</option>
                          <option value="Pent House">Pent House</option>
                          <option value="Studio Apartment">Studio Apartment</option>
                        </optgroup>
                        <optgroup label="Commercial">
                          <option value="Office">Office</option>
                          <option value="Commercial Space">Commercial Space</option>
                          <option value="Office in IT Park/SEZ">Office in IT Park/SEZ</option>
                          <option value="Shop">Shop</option>
                          <option value="Showroom">Showroom</option>
                          <option value="Land">Land</option>
                          <option value="Warehouse/Godown">Warehouse/Godown</option>
                          <option value="Industrial Land">Industrial Land</option>
                          <option value="Industrial Building">Industrial Building</option>
                          <option value="Industrial Shed">Industrial Shed</option>
                          <option value="Factory">Factory</option>
                        </optgroup>
                        <optgroup label="Developments">
                          <option value="Open Plots">Open Plots</option>
                          <option value="Gated Community">Gated Community</option>
                          <option value="Township">Township</option>
                        </optgroup>
                        <optgroup label="Layout Developers">
                          <option value="Approved Layout">Approved Layout</option>
                          <option value="Venture">Venture</option>
                          <option value="Farm Plots">Farm Plots</option>
                        </optgroup>
                        <optgroup label="House / Villas / Apartment Developers">
                          <option value="Ready to Move">Ready to Move</option>
                          <option value="Under Construction">Under Construction</option>
                          <option value="Pre Launch">Pre Launch</option>
                        </optgroup>
                      </select>
                    </FilterSection>

                    {/* Area */}
                    <FilterSection title="Area">
                      <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-accent transition-colors">
                        <option value="">All Areas</option>
                        <option value="Madhurawada">Madhurawada</option>
                        <option value="PM Palem">PM Palem</option>
                        <option value="Rushikonda">Rushikonda</option>
                        <option value="Yendada">Yendada</option>
                        <option value="Kommadi">Kommadi</option>
                        <option value="Anandapuram">Anandapuram</option>
                        <option value="MVP Colony">MVP Colony</option>
                        <option value="Siripuram">Siripuram</option>
                        <option value="Waltair Uplands">Waltair Uplands</option>
                        <option value="Beach Road">Beach Road</option>
                        <option value="Seethammadhara">Seethammadhara</option>
                        <option value="HB Colony">HB Colony</option>
                        <option value="Lawsons Bay Colony">Lawsons Bay Colony</option>
                        <option value="Gajuwaka">Gajuwaka</option>
                        <option value="Kurmannapalem">Kurmannapalem</option>
                        <option value="Akkayyapalem">Akkayyapalem</option>
                        <option value="Dwaraka Nagar">Dwaraka Nagar</option>
                        <option value="NAD Junction">NAD Junction</option>
                        <option value="Marripalem">Marripalem</option>
                        <option value="Kancharapalem">Kancharapalem</option>
                        <option value="Railway New Colony">Railway New Colony</option>
                        <option value="Muralinagar">Muralinagar</option>
                        <option value="Arilova">Arilova</option>
                        <option value="Bheemunipatnam (Bheemili)">Bheemunipatnam (Bheemili)</option>
                        <option value="Tagarapuvalasa">Tagarapuvalasa</option>
                        <option value="Sabbavaram">Sabbavaram</option>
                        <option value="Pendurthi">Pendurthi</option>
                        <option value="Sujatha Nagar">Sujatha Nagar</option>
                        <option value="Vepagunta">Vepagunta</option>
                        <option value="Simhachalam">Simhachalam</option>
                        <option value="Parawada">Parawada</option>
                        <option value="Atchutapuram">Atchutapuram</option>
                        <option value="Bhogapuram">Bhogapuram</option>
                        <option value="Tallavalasa">Tallavalasa</option>
                        <option value="Jagadamba Junction">Jagadamba Junction</option>
                        <option value="Asilmetta">Asilmetta</option>
                      </select>
                    </FilterSection>

                    {/* Budget */}
                    <FilterSection title="Budget">
                      <DualRangeSlider
                        min={sliderMin}
                        max={sliderMax}
                        minValue={budgetMin}
                        maxValue={budgetMax}
                        onChange={handleBudgetChange}
                      />
                    </FilterSection>

                    {/* Verified */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="verified-filter"
                        checked={filterVerified}
                        onChange={e => setFilterVerified(e.target.checked)}
                        className="w-4 h-4 accent-accent rounded"
                      />
                      <label htmlFor="verified-filter" className="text-[12px] font-medium text-gray-700 flex items-center gap-1 cursor-pointer">
                        <BadgeCheck size={13} className="text-teal" /> Verified Properties Only
                      </label>
                    </div>

                    {/* Type-specific filters */}
                    {showResidentialFilters && !showCommercialFilters && !showLandFilters && (
                      <div className="border-t border-gray-100 pt-3 space-y-3">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide m-0">
                          Residential Filters
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-medium text-gray-500 block mb-1">Beds</label>
                            <select value={filterBeds} onChange={e => setFilterBeds(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                              <option value="">Any</option>
                              <option value="1">1+</option>
                              <option value="2">2+</option>
                              <option value="3">3+</option>
                              <option value="4">4+</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] font-medium text-gray-500 block mb-1">Bathrooms</label>
                            <select value={filterBaths} onChange={e => setFilterBaths(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                              <option value="">Any</option>
                              <option value="1">1+</option>
                              <option value="2">2+</option>
                              <option value="3">3+</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-gray-500 block mb-1">Parking</label>
                          <select value={filterParking} onChange={e => setFilterParking(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {showCommercialFilters && (
                      <div className="border-t border-gray-100 pt-3 space-y-3">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide m-0">Commercial Filters</p>
                        <div>
                          <label className="text-[11px] font-medium text-gray-500 block mb-1">Furnishing</label>
                          <select value={filterFurnishing} onChange={e => setFilterFurnishing(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                            <option value="">Any</option>
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-gray-500 block mb-1">Parking</label>
                          <select value={filterParking} onChange={e => setFilterParking(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="4">4+</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {showLandFilters && (
                      <div className="border-t border-gray-100 pt-3 space-y-3">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide m-0">Land/Plot Filters</p>
                        <div>
                          <label className="text-[11px] font-medium text-gray-500 block mb-1">Facing</label>
                          <select value={filterFacing} onChange={e => setFilterFacing(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                            <option value="">Any</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="North-East">North-East</option>
                            <option value="North-West">North-West</option>
                            <option value="South-East">South-East</option>
                            <option value="South-West">South-West</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-gray-500 block mb-1">Approval Type</label>
                          <select value={filterApproval} onChange={e => setFilterApproval(e.target.value)} className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] outline-none focus:border-accent">
                            <option value="">Any</option>
                            <option value="VMRDA">VMRDA</option>
                            <option value="GVMC">GVMC</option>
                            <option value="Panchayat">Panchayat</option>
                            <option value="Revenue">Revenue</option>
                            <option value="Industrial">Industrial</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button onClick={() => setMobileFiltersOpen(false)} className="flex-1 bg-primary text-white text-[12px] font-semibold py-2.5 rounded-md flex items-center justify-center gap-1 hover:bg-primary-dark transition-colors cursor-pointer">
                        <Search size={13} /> Apply
                      </button>
                      <button onClick={() => resetFilters(false)} className="flex-1 border border-gray-300 text-gray-600 text-[12px] font-semibold py-2.5 rounded-md flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors cursor-pointer">
                        <RotateCcw size={13} /> Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-5 flex-wrap gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-primary">{filtered.length}</span>
                  <span className="text-[13px] text-gray-500">properties found</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
onChange={e => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-accent bg-gray-50 font-medium cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors cursor-pointer border-0 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Grid3X3 size={14} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors cursor-pointer border-0 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <List size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                  <Search size={44} className="mx-auto text-gray-300 mb-3" />
                  <h4 className="text-lg font-bold text-gray-700 mb-1">No properties found</h4>
                  <p className="text-sm text-gray-500 mb-3">Try adjusting your filters or switching categories.</p>
                  <button onClick={() => resetFilters(false)} className="text-accent font-semibold text-sm hover:underline bg-transparent border-0 cursor-pointer">
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4'}>
                  {filtered.map(p => <PropertyCard key={p.id} property={p} viewMode={viewMode} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Help Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-50">
        <button className="inline-flex items-center gap-2 bg-accent text-white border-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold text-[12px] sm:text-[13px] shadow-lg shadow-accent/30 hover:bg-accent-hover transition-all duration-200 hover:scale-105 cursor-pointer">
          <Headphones size={14} className="sm:w-4 sm:h-4" /> Need Help?
        </button>
      </div>
    </>
  );
}

function FilterSection({ title, children }) {
  return (
    <div>
      <label className="text-[12px] font-semibold text-gray-600 block mb-1.5">{title}</label>
      {children}
    </div>
  );
}
