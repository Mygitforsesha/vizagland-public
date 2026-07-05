import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Shield, Users, Headphones, MapPin, Building, Home as HomeIcon, Map, ShoppingBag, Trees, Wrench, Loader2 } from 'lucide-react';
import { FeaturedPropertiesSection } from '../components/home/FeaturedPropertiesSection';
import { LatestUpdatesSection } from '../components/home/LatestUpdatesSection';
import { buildSearchPageUrl } from '../lib/property-search/searchUrlSync';
import { mapMasterLocationToDisplay } from '../lib/masterLocation/mapMasterLocationDisplay';
import { useMasterLocationSearch } from '../lib/post-property/useMasterLocationSearch';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
        <NoticeBar />
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          <div className="min-w-0 space-y-12">
            <CategoriesSection />
            <FeaturedPropertiesSection />
            <WhyChooseUs />
            <AreasSection />
          </div>
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <LatestUpdatesSection />
          </aside>
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const suggestionsRef = useRef(null);
  const { setQuery: setSearchQuery, options, loading, error } = useMasterLocationSearch();

  const selectedVillage = selectedLocation
    ? mapMasterLocationToDisplay(selectedLocation)
    : null;

  useEffect(() => {
    function handleClick(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function clearSearch() {
    setQuery('');
    setSearchQuery('');
    setSelectedLocation(null);
    setShowSuggestions(false);
  }

  function handleInput(val) {
    setQuery(val);
    setSearchQuery(val);

    if (!val.trim()) {
      setSelectedLocation(null);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);
  }

  function selectVillage(location) {
    setQuery(location.village);
    setSelectedLocation(location);
    setSearchQuery('');
    setShowSuggestions(false);
  }

  function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    setShowSuggestions(false);
    navigate(buildSearchPageUrl(trimmed));
  }

  const showDropdown = showSuggestions && query.trim().length > 0;

  return (
    <section className="bg-gradient-to-br from-primary via-[#1e4d6b] to-[#1a5e52] py-10 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M40 0L80 80H0z'/%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/40 text-[#f0a96e] text-[12px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
              <CheckCircle size={13} /> Verified Listings
            </div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-[38px] font-extrabold leading-tight mb-4">
              Find Your <span className="text-[#f0a96e]">Perfect Property</span><br className="hidden sm:block" /><span className="sm:hidden"> </span>Across Visakhapatnam GVMC &amp; VMRDA area
            </h2>
            <p className="text-[#a8c4d8] text-[13px] sm:text-[15px] mb-6 max-w-md">Discover verified residential, commercial, and agricultural properties. Real data, real prices, real agents.</p>
            <div className="flex gap-2 flex-wrap mb-5">
              <span className="bg-white/10 border border-white/15 text-[#c8dce9] text-[12px] px-3 py-1 rounded-full flex items-center gap-1.5"><Shield size={12} /> Verified Properties</span>
              <span className="bg-white/10 border border-white/15 text-[#c8dce9] text-[12px] px-3 py-1 rounded-full flex items-center gap-1.5"><Users size={12} /> Trusted Agents</span>
              <span className="bg-white/10 border border-white/15 text-[#c8dce9] text-[12px] px-3 py-1 rounded-full flex items-center gap-1.5"><MapPin size={12} /> GVMC &amp; VMRDA Areas</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to="/listings" className="btn-primary inline-flex items-center gap-2 no-underline">
                <Building size={16} /> Browse All Properties
              </Link>
            </div>
          </div>

          {/* Right - Search Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6">
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-1.5 block">Search Village / Area</label>
              <div className="relative" ref={suggestionsRef}>
                <div className="flex">
                  <span className="bg-white border border-gray-200 border-r-0 rounded-l-md px-3 flex items-center">
                    <MapPin size={16} className="text-accent" />
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={e => handleInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    placeholder="Type village, city, or area name..."
                    className="flex-1 border border-gray-200 border-l-0 border-r-0 py-2.5 px-3 text-[13px] outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-accent text-white font-semibold text-[13px] px-4 rounded-r-md hover:bg-accent-hover transition-colors flex items-center gap-1.5"
                  >
                    <Search size={14} /> Search
                  </button>
                </div>
                {showDropdown && (
                  <div className="absolute z-50 w-full bg-white border border-gray-200 border-t-0 rounded-b-lg max-h-56 overflow-y-auto shadow-lg">
                    {loading ? (
                      <div className="flex items-center gap-2 px-3.5 py-3 text-[13px] text-gray-500">
                        <Loader2 size={14} className="animate-spin text-accent flex-shrink-0" aria-hidden />
                        Searching...
                      </div>
                    ) : error ? (
                      <div className="px-3.5 py-3 text-[13px] text-gray-500">{error}</div>
                    ) : options.length === 0 ? (
                      <div className="px-3.5 py-3 text-[13px] text-gray-500">No locations found</div>
                    ) : (
                      options.map((option) => (
                        <div
                          key={option.id ?? option.value}
                          onClick={() => selectVillage(option.location)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer border-b border-gray-50 last:border-0 hover:bg-orange-50 transition-colors"
                        >
                          <MapPin size={14} className="text-accent flex-shrink-0" />
                          <div className="font-semibold text-primary text-[13px]">{option.label}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <p className="text-[12px] text-gray-500 mt-2 flex items-center gap-1">
                <span className="text-accent">*</span> Try: Vizag, Anandapuram, Gajuwaka, Vijayawada, Tirupati...
              </p>
            </div>

            {selectedVillage && (
              <div className="border-t border-gray-200 bg-gray-50 p-4 animate-slide-down">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] text-teal font-semibold flex items-center gap-1.5">
                    <CheckCircle size={14} /> Record found: <strong>{selectedVillage.name}</strong>
                  </span>
                  <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 text-lg leading-none bg-transparent border-0 cursor-pointer">&times;</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[
                    { label: 'Village', value: selectedVillage.name },
                    { label: 'Mandal', value: selectedVillage.mandal },
                    { label: 'Panchayati', value: selectedVillage.panchayat },
                    { label: 'GVMC', value: selectedVillage.gvmc },
                    { label: 'VMRDA', value: selectedVillage.vmrda },
                    { label: 'Reg. Area', value: selectedVillage.registration },
                    { label: 'GVMC/VMRDA', value: selectedVillage.gvmcvmrda },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-[10px] font-bold uppercase tracking-wide text-gray-500 block mb-0.5">{f.label}</label>
                      <input readOnly value={f.value} className="w-full border border-teal/40 bg-teal-light rounded px-2 py-1.5 text-[11px] sm:text-[12px] text-gray-700 truncate" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-accent text-white text-[12px] font-semibold px-4 py-2 rounded flex items-center gap-1.5 hover:bg-accent-hover transition-colors border-0 cursor-pointer"
                  >
                    <Search size={14} /> Search Properties
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { num: '4,820+', label: 'Properties Listed' },
    { num: '680+', label: 'Verified Agents' },
    { num: '13', label: 'Districts Covered' },
    { num: '24,000+', label: 'Successful Deals' },
  ];
  return (
    <div className="bg-white border-b border-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <span className="text-2xl font-extrabold text-primary block">{s.num}</span>
            <span className="text-[11px] text-gray-500 uppercase tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticeBar() {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 bg-white py-2.5">
      <span className="whitespace-nowrap rounded bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">NOTICE</span>
      <div className="overflow-hidden whitespace-nowrap text-[13px] text-gray-500">
        New property listings added daily &nbsp;&bull;&nbsp; Verified properties across Visakhapatnam &nbsp;&bull;&nbsp; Helpline: 96181 70406 ,  60393 80406
      </div>
    </div>
  );
}

function CategoriesSection() {
  const categories = [
    { name: 'Apartments', count: '1,240 listings', icon: Building, bg: 'bg-gray-100', color: 'text-primary', type: 'Apartment' },
    { name: 'Villas', count: '380 listings', icon: HomeIcon, bg: 'bg-orange-50', color: 'text-accent', type: 'Villa' },
    { name: 'Plots & Land', count: '920 listings', icon: Map, bg: 'bg-green-50', color: 'text-teal', type: 'Plot' },
    { name: 'Commercial', count: '560 listings', icon: ShoppingBag, bg: 'bg-blue-50', color: 'text-blue-500', type: 'Commercial' },
    { name: 'Farm Land', count: '340 listings', icon: Trees, bg: 'bg-amber-50', color: 'text-amber-600', type: 'Land' },
    { name: 'New Projects', count: '180 listings', icon: Wrench, bg: 'bg-sky-50', color: 'text-sky-500', type: '' },
  ];

  return (
    <section>
      <div className="mb-6 text-center">
        <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-accent">Browse by Category</div>
        <h3 className="text-2xl font-extrabold text-primary">What Are You Looking For?</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {categories.map(c => (
          <Link key={c.name} to={`/listings${c.type ? `?type=${c.type}` : ''}`} className="group rounded-xl border border-gray-200 bg-white p-4 text-center no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg">
            <div className={`mx-auto mb-2.5 flex h-[48px] w-[48px] items-center justify-center rounded-xl ${c.bg}`}>
              <c.icon size={20} className={c.color} />
            </div>
            <div className="text-[13px] font-bold text-primary">{c.name}</div>
            <div className="mt-0.5 text-[11px] text-gray-500">{c.count}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: CheckCircle, title: 'Verified Properties', desc: 'Every listing is legally vetted and verified before publishing.', bg: 'bg-gray-100', color: 'text-primary' },
    { icon: Shield, title: 'Secure & Transparent', desc: 'Documented transactions with full ownership history checks.', bg: 'bg-green-50', color: 'text-teal' },
    { icon: Users, title: 'Trusted Agents', desc: 'All agents are certified and verified professionals.', bg: 'bg-orange-50', color: 'text-accent' },
    { icon: Headphones, title: 'Dedicated Support', desc: 'Toll-free helpline and online support available every day.', bg: 'bg-sky-50', color: 'text-sky-500' },
  ];

  return (
    <section>
      <div className="mb-6 text-center">
        <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-accent">Our Promise</div>
        <h3 className="text-2xl font-extrabold text-primary">Why Choose Vizagland Real Estate?</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
          {items.map(i => (
            <div key={i.title} className="flex items-start gap-3.5 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-content-center flex-shrink-0 ${i.bg} flex items-center justify-center`}>
                <i.icon size={20} className={i.color} />
              </div>
              <div>
                <strong className="text-sm text-primary block mb-1">{i.title}</strong>
                <p className="text-[12px] text-gray-500 m-0 leading-relaxed">{i.desc}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function AreasSection() {
  const areas = [
    { name: 'Madhurawada', count: '120 Properties' },
    { name: 'Rushikonda', count: '95 Properties' },
    { name: 'Kommadi', count: '88 Properties' },
    { name: 'Gajuwaka', count: '76 Properties' },
    { name: 'Pendurthi', count: '72 Properties' },
    { name: 'Seethammadhara', count: '68 Properties' },
    { name: 'MVP Colony', count: '64 Properties' },
    { name: 'Beach Road', count: '58 Properties' },
    { name: 'Dwaraka Nagar', count: '54 Properties' },
    { name: 'Anandapuram', count: '48 Properties' },
    { name: 'PM Palem', count: '44 Properties' },
    { name: 'Yendada', count: '42 Properties' },
    { name: 'Siripuram', count: '38 Properties' },
    { name: 'NAD Junction', count: '36 Properties' },
    { name: 'Bheemunipatnam (Bheemili)', count: '32 Properties' },
    { name: 'Simhachalam', count: '30 Properties' },
    { name: 'Parawada', count: '28 Properties' },
    { name: 'Arilova', count: '26 Properties' },
  ];

  return (
    <section className="pb-4">
      <div className="mb-6">
        <div className="mb-1.5 text-[12px] font-bold uppercase tracking-wider text-accent">Explore</div>
        <h3 className="text-2xl font-extrabold text-primary">Browse by Area</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {areas.map(a => (
            <Link key={a.name} to={`/listings?city=${a.name}`} className="rounded-lg border-2 border-gray-200 bg-white p-2.5 text-center no-underline transition-all duration-200 hover:border-accent hover:bg-accent-light sm:p-3">
              <div className="text-[11px] sm:text-[13px] font-bold text-primary flex items-center justify-center gap-1">
                <MapPin size={11} className="text-accent flex-shrink-0" /> <span className="truncate">{a.name}</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">{a.count}</div>
            </Link>
          ))}
      </div>
    </section>
  );
}
