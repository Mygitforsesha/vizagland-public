import { Link } from 'react-router-dom';
import {
  MapPin,
  Maximize,
  Compass,
  Building2,
  Layers,
  Bed,
  Heart,
  BadgeCheck,
} from 'lucide-react';
import { extractBhk, formatPropertyId } from './usePropertySearch';

export function PropertySearchCard({
  property,
  variant = 'desktop',
  isWishlisted,
  onToggleWishlist,
}) {
  const bhk = extractBhk(property.title, property.propertyType);
  const floorLabel =
    property.totalFloors > 0
      ? `Floor ${property.floorNumber}/${property.totalFloors}`
      : null;

  if (variant === 'mobile') {
    return (
      <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-52 object-cover"
          />
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            <BadgeCheck size={12} aria-hidden />
            Verified
          </span>
          <button
            type="button"
            onClick={onToggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center border-0 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-accent text-accent' : 'text-gray-600'}
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xl font-extrabold text-accent m-0 mb-1">₹ {property.priceLabel}</p>
          <h3 className="text-base font-bold text-primary m-0 mb-1.5 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 m-0 mb-3">
            <MapPin size={14} className="text-gray-400 flex-shrink-0" aria-hidden />
            {property.village}, {property.district}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {bhk && (
              <span className="flex items-center gap-1.5">
                <Bed size={15} className="text-gray-400" aria-hidden />
                {bhk}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Maximize size={15} className="text-gray-400" aria-hidden />
              {property.area} {property.areaUnit}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass size={15} className="text-gray-400" aria-hidden />
              {property.facing}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 flex items-center gap-1 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
          <BadgeCheck size={11} aria-hidden />
          Verified
        </span>
        <span className="absolute top-3 left-[5.5rem] bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
          {formatPropertyId(property.id)}
        </span>
        <button
          type="button"
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center border-0 cursor-pointer shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-accent text-accent' : 'text-gray-500'}
          />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xl font-extrabold text-accent m-0 mb-1">₹ {property.priceLabel}</p>
        <h3 className="text-[15px] font-bold text-primary m-0 mb-1.5 line-clamp-1 group-hover:text-primary-light transition-colors">
          {property.title}
        </h3>
        <p className="text-[13px] text-gray-500 flex items-center gap-1 m-0 mb-3">
          <MapPin size={13} className="text-accent flex-shrink-0" aria-hidden />
          {property.village}, {property.district}
        </p>
        <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-600 mb-4 flex-1">
          {bhk && (
            <span className="flex items-center gap-1.5 bg-surface rounded-md px-2 py-1.5">
              <Bed size={12} className="text-gray-400" aria-hidden />
              {bhk}
            </span>
          )}
          <span className="flex items-center gap-1.5 bg-surface rounded-md px-2 py-1.5">
            <Maximize size={12} className="text-gray-400" aria-hidden />
            {property.area} {property.areaUnit}
          </span>
          <span className="flex items-center gap-1.5 bg-surface rounded-md px-2 py-1.5">
            <Compass size={12} className="text-gray-400" aria-hidden />
            {property.facing}
          </span>
          {floorLabel ? (
            <span className="flex items-center gap-1.5 bg-surface rounded-md px-2 py-1.5">
              <Layers size={12} className="text-gray-400" aria-hidden />
              {floorLabel}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-surface rounded-md px-2 py-1.5">
              <Building2 size={12} className="text-gray-400" aria-hidden />
              {property.propertyType}
            </span>
          )}
        </div>
        <Link
          to={`/property/${property.id}`}
          className="block w-full text-center bg-primary text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors hover:bg-primary-dark no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
