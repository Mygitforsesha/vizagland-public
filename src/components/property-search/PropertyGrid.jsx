import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import { PropertySearchCard } from './PropertyCard';
import { ITEMS_PER_PAGE } from './usePropertySearch';

function getGridLayoutClass(variant, viewMode) {
  if (viewMode === 'list' && variant === 'desktop') {
    return 'flex flex-col gap-4';
  }

  if (variant === 'mobile') {
    return 'grid grid-cols-1 gap-4';
  }

  if (viewMode === 'grid') {
    return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5';
  }

  return 'grid grid-cols-1 gap-4';
}

function SkeletonCard({ variant = 'desktop', viewMode = 'grid' }) {
  if (viewMode === 'list' && variant === 'desktop') {
    return (
      <div
        className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col sm:flex-row animate-pulse"
        aria-hidden
      >
        <div className="relative sm:w-72 flex-shrink-0">
          <div className="w-full h-48 sm:min-h-[12rem] sm:h-full bg-gray-200" />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <div className="h-6 bg-gray-200 rounded w-28" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
            <div className="h-3.5 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-9 bg-gray-200 rounded-lg w-32" />
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <article
        className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse"
        aria-hidden
      >
        <div className="h-52 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-32" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="h-3.5 bg-gray-200 rounded w-2/3" />
          <div className="flex flex-wrap gap-4 pt-0.5">
            <div className="h-3.5 bg-gray-200 rounded w-14" />
            <div className="h-3.5 bg-gray-200 rounded w-20" />
            <div className="h-3.5 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full animate-pulse"
      aria-hidden
    >
      <div className="h-48 bg-gray-200" />
      <div className="p-4 flex flex-col flex-1">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-3.5 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
          <div className="h-8 bg-gray-200 rounded-md" />
          <div className="h-8 bg-gray-200 rounded-md" />
          <div className="h-8 bg-gray-200 rounded-md" />
          <div className="h-8 bg-gray-200 rounded-md" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </article>
  );
}

function PropertyGridSkeleton({ variant, viewMode }) {
  const layoutClass = getGridLayoutClass(variant, viewMode);

  return (
    <div
      className={layoutClass}
      role="status"
      aria-busy="true"
      aria-label="Loading properties"
    >
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <SkeletonCard key={index} variant={variant} viewMode={viewMode} />
      ))}
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
    return <PropertyGridSkeleton variant={variant} viewMode={viewMode} />;
  }

  if (totalCount === 0) {
    return (
      <div
        className="bg-white rounded-2xl border border-gray-200 p-10 lg:p-12 text-center max-w-lg mx-auto shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={28} className="text-gray-400" aria-hidden />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">No properties found</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm mx-auto">
          Try adjusting your filters or clear them to browse all available listings.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 text-primary text-sm font-semibold bg-white cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Reset Filters
          </button>
        )}
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

  return (
    <div className={getGridLayoutClass(variant, viewMode)}>
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
