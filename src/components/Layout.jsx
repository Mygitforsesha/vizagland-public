import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, Home, Search, MapPin, Grid3x3 as Grid3X3, ChevronDown, ScrollText, Link2, Landmark, FileLock, Ligature as FileSignature, Map, TrendingUp, Handshake, FileSpreadsheet, Receipt, LayoutGrid, Hash } from 'lucide-react';

export function Layout({ children }) {  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-primary-dark text-white/90 text-xs py-1.5">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-2">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-gray-400"><Phone size={11} /> <span className="hidden sm:inline">1800-425-4440 (Toll Free)</span><span className="sm:hidden">Toll Free</span></span>
          <span className="hidden md:flex items-center gap-1 text-gray-400"><Mail size={11} /> support@vizagland.com</span>
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

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm sm:text-base flex-shrink-0">VL</div>
          <div>
            <h1 className="text-primary font-extrabold text-base sm:text-lg leading-tight m-0">VIZAG LAND</h1>
            <p className="text-gray-500 text-[10px] sm:text-[11px] m-0">Your dream priority</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/post-property" className="border-2 border-accent text-accent text-[11px] sm:text-[13px] font-semibold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-md bg-transparent hover:bg-accent hover:text-white transition-colors no-underline">
            Post Property
          </Link>
        </div>
      </div>
    </header>
  );
}

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/search', label: 'Property Search', icon: Search },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    const basePath = path.split('?')[0];
    return location.pathname === basePath || location.pathname.startsWith(basePath + '/');
  };

  return (
    <nav className="bg-white border-b-2 border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-start">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-primary border-0 bg-transparent cursor-pointer">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className={`${mobileOpen ? 'block' : 'hidden'} lg:flex absolute lg:relative top-full left-0 right-0 bg-white lg:bg-transparent z-40 border-b lg:border-0 shadow-lg lg:shadow-none max-h-[70vh] overflow-y-auto lg:max-h-none lg:overflow-visible`}>
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
              <li className="relative lg:static">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1.5 px-4 lg:px-3.5 py-3 lg:py-2.5 text-[13px] font-semibold text-primary bg-transparent border-0 cursor-pointer hover:text-accent transition-colors w-full lg:w-auto"
                >
                  <Grid3X3 size={14} /> Other Services <ChevronDown size={12} className={`transition-transform ml-auto lg:ml-0 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="lg:absolute left-0 right-0 lg:top-full bg-white lg:border-t-[3px] lg:border-primary lg:rounded-b-lg lg:shadow-xl p-4 lg:p-6 z-50 lg:min-w-[280px]">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-3 pb-2 border-b border-gray-200">Other Services</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                      {[
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
                      ].map(({ label, icon: Icon }) => (
                        <a key={label} href="#" onClick={() => { setServicesOpen(false); setMobileOpen(false); }} className="flex items-center gap-2 text-[13px] text-gray-800 no-underline p-2 rounded hover:bg-accent-light transition-colors">
                          <Icon size={14} className="text-primary flex-shrink-0" /> {label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {servicesOpen && <div className="fixed inset-0 z-30 lg:block hidden" onClick={() => setServicesOpen(false)} />}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-400 pt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm">AP</div>
              <div>
                <div className="text-white font-bold text-[15px]">AP Real Estate</div>
                <div className="text-[11px] text-gray-500">Visakhapatnam - Verified Properties</div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed">A trusted platform for buying, selling, and renting verified properties across Visakhapatnam GVMC &amp; VMRDA area.</p>
          </div>
          <div>
            <h5 className="text-white text-sm font-bold mb-3 pb-2 border-b border-white/10">Quick Links</h5>
            <ul className="list-none p-0 space-y-1">
              <li><Link to="/" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/listings" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/contact" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/login" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-sm font-bold mb-3 pb-2 border-b border-white/10">Property Types</h5>
            <ul className="list-none p-0 space-y-1">
              <li><Link to="/listings?type=Apartment" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Apartments</Link></li>
              <li><Link to="/listings?type=Villa" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Villas</Link></li>
              <li><Link to="/listings?type=Plot" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Plots</Link></li>
              <li><Link to="/listings?type=Commercial" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Commercial</Link></li>
              <li><Link to="/listings?type=Land" className="text-gray-400 no-underline text-[13px] hover:text-white transition-colors">Farm Land</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-sm font-bold mb-3 pb-2 border-b border-white/10">Contact Us</h5>
            <ul className="list-none p-0 space-y-2 text-[13px]">
              <li className="flex items-start gap-2"><MapPin size={14} className="flex-shrink-0 mt-0.5" /> Vizag Land Office, Visakhapatnam - 530003</li>
              <li className="flex items-center gap-2"><Phone size={14} className="flex-shrink-0" /> 1800-425-4440 (Toll Free)</li>
              <li className="flex items-center gap-2"><Mail size={14} className="flex-shrink-0" /> support@aprealestate.in</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-navy mt-9 py-3.5 text-[12px] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 AP Real Estate Portal. All rights reserved.</span>
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
