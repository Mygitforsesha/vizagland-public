import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Users, MapPin, Building } from 'lucide-react';

/** Homepage hero — search UI removed; remaining content unchanged. */
export function HeroSection() {
  return (
    <section className="relative h-full overflow-hidden bg-gradient-to-br from-primary via-[#1e4d6b] to-[#1a5e52] py-10 sm:py-16 lg:flex lg:flex-col lg:justify-center lg:py-20 rounded-lg">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M40 0L80 80H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative px-4">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-[#f0a96e]">
          <CheckCircle size={13} /> Verified Listings
        </div>
        <h2 className="mb-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-[38px]">
          Find Your <span className="text-[#f0a96e]">Perfect Property</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Across Visakhapatnam GVMC &amp; VMRDA area
        </h2>
        <p className="mb-6 max-w-md text-[13px] text-[#a8c4d8] sm:text-[15px]">
          Discover verified residential, commercial, and agricultural properties. Real data, real
          prices, real agents.
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] text-[#c8dce9]">
            <Shield size={12} /> Verified Properties
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] text-[#c8dce9]">
            <Users size={12} /> Trusted Agents
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] text-[#c8dce9]">
            <MapPin size={12} /> GVMC &amp; VMRDA Areas
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/listings" className="btn-primary inline-flex items-center gap-2 no-underline">
            <Building size={16} /> Browse All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
