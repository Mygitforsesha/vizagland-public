import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Shield,
  Users,
  Headphones,
  MapPin,
  Building,
  Home as HomeIcon,
  Map,
  ShoppingBag,
  Trees,
  Wrench,
} from 'lucide-react';
import { FeaturedPropertiesSection } from '@/components/home/FeaturedPropertiesSection';
import { LatestUpdatesSection } from '@/components/home/LatestUpdatesSection';

export function RemainingHomeSections() {
  return (
    <>
      <StatsStrip />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8">
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

function StatsStrip() {
  const stats = [
    { num: '4,820+', label: 'Properties Listed' },
    { num: '680+', label: 'Verified Agents' },
    { num: '13', label: 'Districts Covered' },
    { num: '24,000+', label: 'Successful Deals' },
  ];

  return (
    <div className="border-b border-gray-200 bg-white py-5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="block text-2xl font-extrabold text-primary">{stat.num}</span>
            <span className="text-[11px] uppercase tracking-wide text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticeBar() {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 bg-white py-2.5">
      <span className="whitespace-nowrap rounded bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
        NOTICE
      </span>
      <div className="overflow-hidden whitespace-nowrap text-[13px] text-gray-500">
        New property listings added daily &nbsp;&bull;&nbsp; Verified properties across Visakhapatnam
        &nbsp;&bull;&nbsp; Helpline: 96181 70406 , 60393 80406
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
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/listings${category.type ? `?type=${category.type}` : ''}`}
            className="group rounded-xl border border-gray-200 bg-white p-4 text-center no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
          >
            <div className={`mx-auto mb-2.5 flex h-[48px] w-[48px] items-center justify-center rounded-xl ${category.bg}`}>
              <category.icon size={20} className={category.color} />
            </div>
            <div className="text-[13px] font-bold text-primary">{category.name}</div>
            <div className="mt-0.5 text-[11px] text-gray-500">{category.count}</div>
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
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3.5 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
              <item.icon size={20} className={item.color} />
            </div>
            <div>
              <strong className="mb-1 block text-sm text-primary">{item.title}</strong>
              <p className="m-0 text-[12px] leading-relaxed text-gray-500">{item.desc}</p>
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
        {areas.map((area) => (
          <Link
            key={area.name}
            to={`/listings?city=${area.name}`}
            className="rounded-lg border-2 border-gray-200 bg-white p-2.5 text-center no-underline transition-all duration-200 hover:border-accent hover:bg-accent-light sm:p-3"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-primary sm:text-[13px]">
              <MapPin size={11} className="shrink-0 text-accent" />
              <span className="truncate">{area.name}</span>
            </div>
            <div className="mt-0.5 text-[10px] text-gray-500 sm:text-[11px]">{area.count}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
