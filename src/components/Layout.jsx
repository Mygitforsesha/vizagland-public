import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, Home, Search, MapPin, Grid3x3 as Grid3X3, ChevronDown, ScrollText, Link2, Landmark, FileLock, Ligature as FileSignature, Map, TrendingUp, Handshake, FileSpreadsheet, Receipt, LayoutGrid, Hash } from 'lucide-react';

const SERVICE_ITEMS = [
  { label: 'Documentation', icon: ScrollText },
  { label: 'Link Document', icon: Link2 },
  { label: 'LPM', icon: Landmark },
  { label: 'Encumbrance Certificate (EC)', icon: FileLock },
  { label: 'GPA Document', icon: FileSignature },
  { label: 'Village Map', icon: Map },
  { label: 'Market Value', icon: TrendingUp },
  { label: 'Veelunama Document', icon: Handshake },
  { label: 'Adangal', icon: FileSpreadsheet },
  { label: 'Sale Deed', icon: Receipt },
  { label: 'FMB', icon: LayoutGrid },
  { label: '1B', icon: Hash },
];

export function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="relative z-50 bg-primary-dark text-white/90 text-xs py-1.5">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-2">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-gray-400"><Phone size={11} /> <span className="hidden sm:inline">96181 70406 ,  60393 80406 </span><span className="sm:hidden">Toll Free</span></span>
          <span className="hidden md:flex items-center gap-1 text-gray-400"><Mail size={11} /> vizaglandorg@gmail.com</span>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/login" className="px-3 py-1 rounded text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors no-underline">
            Login
          </Link>
          <Link to="/register" className="px-3 py-1 rounded text-[11px] font-semibold bg-accent hover:bg-accent-hover text-white transition-colors no-underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

function Header({ mobileOpen, setMobileOpen }) {
  const postPropertyLinkClass =
    'border-2 border-accent text-accent text-[11px] sm:text-[13px] font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md bg-transparent hover:bg-accent hover:text-white transition-colors no-underline';

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm lg:border-b lg:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 no-underline lg:flex-initial">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm sm:text-base flex-shrink-0">VL</div>
            <div className="min-w-0">
              <h1 className="text-primary font-extrabold text-base sm:text-lg leading-tight m-0">Nauka Global Engineer's Group</h1>
              <p className="text-gray-500 text-[11px] sm:text-[11px] m-0 leading-snug font-bold">GVMC & VMRDA Vizag LICENCED Civil  Structural Engineers , Architects Builders , Developers .Realtors ,DRONE,DGPS Surveyors, Group.</p>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link to="/post-property" className={postPropertyLinkClass}>
              Post Property
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="p-2 text-primary border-0 bg-transparent cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/post-property" className={postPropertyLinkClass}>
            Post Property
          </Link>
        </div>
      </div>
    </header>
  );
}

function Navigation({ mobileOpen, setMobileOpen }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/search', label: 'Property Search', icon: Search },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!servicesOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setServicesOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [servicesOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    const basePath = path.split('?')[0];
    return location.pathname === basePath || location.pathname.startsWith(basePath + '/');
  };

  return (
    <nav className="relative z-40 bg-white lg:border-b-2 lg:border-gray-200">
      <div className="relative z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-4">
        <div className="flex items-center justify-between lg:justify-start">
          <div
            className={`${mobileOpen ? 'block' : 'hidden'} lg:flex absolute lg:relative top-full left-0 right-0 bg-white lg:bg-transparent z-50 border-b lg:border-0 shadow-lg lg:shadow-none max-h-[70vh] overflow-y-auto lg:max-h-none lg:overflow-visible`}
          >
            <ul className="flex flex-col lg:flex-row list-none m-0 p-0">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-1.5 px-4 lg:px-3.5 py-3 lg:py-2.5 text-[13px] font-medium transition-colors no-underline ${isActive(to) ? 'text-accent font-bold border-b-2 border-accent' : 'text-gray-800 hover:text-accent'}`}
                  >
                    <Icon size={14} /> {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 px-4 lg:px-3.5 py-3 lg:py-2.5 text-[13px] font-semibold bg-transparent border-0 cursor-pointer transition-colors w-full lg:w-auto ${
                    servicesOpen ? 'text-accent' : 'text-primary hover:text-accent'
                  }`}
                >
                  <Grid3X3 size={14} />
                  Other Services
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ml-auto lg:ml-0 ${servicesOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>

      {servicesOpen && (
        <>
          <button
            type="button"
            aria-label="Close Other Services menu"
            className="fixed inset-0 z-30 cursor-default bg-black/10 lg:bg-black/5"
            onClick={() => setServicesOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-40 border-t-[3px] border-primary bg-white shadow-xl animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-5 sm:py-7">
              <div className="mb-5 border-b border-gray-200 pb-4">
                <h3 className="text-[15px] font-bold text-primary m-0">Other Services</h3>
                <p className="text-[12px] text-gray-500 mt-1.5 mb-0 leading-relaxed">
                  Land records, documentation, and property-related services across Visakhapatnam.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {SERVICE_ITEMS.map(({ label, icon: Icon }) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setServicesOpen(false);
                      setMobileOpen(false);
                    }}
                    className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-[13px] font-medium text-gray-800 no-underline transition-all duration-200 hover:border-primary/15 hover:bg-accent-light hover:text-primary hover:shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon size={16} aria-hidden />
                    </span>
                    <span className="leading-snug">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-400 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm">VL</div>
              <div>
                <div className="text-white font-bold text-[15px]">Vizagland Real Estate</div>
                <div className="text-[11px] text-gray-500">Visakhapatnam - Verified Properties</div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed">A trusted platform for buying, selling, and renting verified properties across Visakhapatnam GVMC &amp; VMRDA area.</p>
          </div>
          <div>
            <h5 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-white">Quick Links</h5>
            <ul className="list-none p-0 space-y-1">
              <li><Link to="/" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/listings" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/contact" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/login" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-white">Property Types</h5>
            <ul className="list-none p-0 space-y-1">
              <li><Link to="/listings?type=Apartment" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Apartments</Link></li>
              <li><Link to="/listings?type=Villa" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Villas</Link></li>
              <li><Link to="/listings?type=Plot" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Plots</Link></li>
              <li><Link to="/listings?type=Commercial" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Commercial</Link></li>
              <li><Link to="/listings?type=Land" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Farm Land</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-white">Contact Us</h5>
            <ul className="list-none space-y-2.5 p-0 text-[13px]">
              <li className="flex items-start gap-2"><MapPin size={14} className="flex-shrink-0 mt-0.5" /> Vizag Land Office, Visakhapatnam - 530003</li>
              <li className="flex items-center gap-2"><Phone size={14} className="flex-shrink-0" /> 96181 70406 ,  60393 80406 </li>
              <li className="flex items-center gap-2"><Mail size={14} className="flex-shrink-0" /> vizaglandorg@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-navy py-4 text-[12px] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 Vizagland Real Estate Portal. All rights reserved.</span>
          <div className="flex gap-3">
            <a href="#" className="text-gray-500 no-underline hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="text-gray-500 no-underline hover:text-white transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="text-gray-500 no-underline hover:text-white transition-colors">RTI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
