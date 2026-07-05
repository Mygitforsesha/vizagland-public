import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildSearchPageUrl } from '@/lib/property-search/searchUrlSync';

export default function VillageCard({ village }) {
  const href = buildSearchPageUrl(village.name);

  return (
    <Link
      to={href}
      className="flex h-full min-h-0 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-2 py-2 no-underline hover:border-primary sm:gap-3 sm:px-2.5 sm:py-2.5"
    >
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start gap-1">
          <MapPin size={12} className="mt-0.5 shrink-0 text-accent" />
          <span className="truncate text-xs font-semibold leading-tight text-primary sm:text-sm">
            {village.name}
          </span>
        </div>
        <p className="mt-0.5 truncate pl-[1.125rem] text-[10px] leading-tight text-gray-500 sm:text-xs">
          {village.mandal}
        </p>
        {village.propertyCount > 0 ? (
          <p className="mt-0.5 truncate pl-[1.125rem] text-[10px] leading-tight text-gray-400 sm:text-xs">
            {village.propertyCount} properties
          </p>
        ) : null}
      </div>
      <ArrowRight size={14} className="shrink-0 text-gray-400 sm:size-4" />
    </Link>
  );
}
