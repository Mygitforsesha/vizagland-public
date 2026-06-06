import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import { PropertySearchCard } from './PropertyCard';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-9 bg-gray-200 rounded mt-3" />
      </div>
    </div>
  );
}

export function PropertyGrid({
  isLoading,
  results,
  totalCount,
  viewMode,
  variant,
  wishlist,
  onToggleWishlist,
  onResetFilters,
}) {
  if (isLoading) {
    const cols =
      variant === 'mobile'
        ? 'grid-cols-1'
        : viewMode === 'list'
          ? 'grid-cols-1'
          : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
    return (
      <div className={`grid ${cols} gap-4`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={28} className="text-gray-400" aria-hidden />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">No Properties Found</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          No properties match your current filters. Try adjusting your search criteria.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-accent font-semibold text-sm hover:underline bg-transparent border-0 cursor-pointer"
        >
          Reset all filters
        </button>
      </div>
    );
  }

  if (viewMode === 'list' && variant === 'desktop') {
    return (
      <div className="flex flex-col gap-4">
        {results.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col sm:flex-row"
          >
            <div className="relative sm:w-72 flex-shrink-0">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 sm:h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xl font-extrabold text-accent m-0">₹ {property.priceLabel}</p>
                <h3 className="text-base font-bold text-primary mt-1">{property.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {property.village}, {property.district}
                </p>
              </div>
              <Link
                to={`/property/${property.id}`}
                className="mt-3 inline-block w-fit bg-primary text-white text-sm font-semibold px-5 py-2 rounded-lg no-underline hover:bg-primary-dark"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const gridClass =
    variant === 'mobile'
      ? 'grid grid-cols-1 gap-4'
      : viewMode === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
        : 'grid grid-cols-1 gap-4';

  return (
    <div className={gridClass}>
      {results.map((property) => (
        <PropertySearchCard
          key={property.id}
          property={property}
          variant={variant}
          isWishlisted={wishlist.has(property.id)}
          onToggleWishlist={() => onToggleWishlist(property.id)}
        />
      ))}
    </div>
  );
}
