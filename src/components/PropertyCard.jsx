import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, BadgeCheck, Car } from 'lucide-react';
import { EASE_OUT } from './home/motionPresets';

const gridCardVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 10px 30px -12px rgba(0, 31, 84, 0.16)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 20px 44px -12px rgba(0, 31, 84, 0.28)',
  },
};

const gridImageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const categoryColors = {
  Buy: 'bg-teal',
  Sell: 'bg-primary-light',
  Rent: 'bg-accent',
  Lease: 'bg-primary',
};

function CategoryBadge({ tag, category }) {
  return (
    <span
      className={`absolute top-3 left-3 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_4px_12px_rgba(0,31,84,0.25)] ${categoryColors[category] || 'bg-teal'}`}
    >
      {tag}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-teal shadow-sm backdrop-blur-sm">
      <BadgeCheck size={12} strokeWidth={2.5} aria-hidden />
      Verified
    </span>
  );
}

function PropertyIdBadge({ id }) {
  return (
    <span className="shrink-0 rounded-md border border-primary/10 bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-light">
      {id}
    </span>
  );
}

function PropertySpecs({ property }) {
  const hasBedBath = property.beds > 0 || property.baths > 0;

  if (hasBedBath || property.parking) {
    return (
      <div className="flex min-h-[52px] flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
        {property.beds > 0 && (
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Bed size={14} className="text-gray-400" aria-hidden />
            {property.beds} Beds
          </span>
        )}
        {property.baths > 0 && (
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Bath size={14} className="text-gray-400" aria-hidden />
            {property.baths} Baths
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Maximize size={14} className="text-gray-400" aria-hidden />
          {property.area}
        </span>
        {property.parking > 0 && (
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Car size={14} className="text-gray-400" aria-hidden />
            {property.parking} Parking
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-[52px] flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
      <span className="inline-flex items-center gap-1.5 font-medium">
        <Maximize size={14} className="text-gray-400" aria-hidden />
        {property.area}
      </span>
      {property.facing && (
        <span className="rounded-md border border-gray-200 bg-surface px-2 py-0.5 text-[11px] font-semibold text-primary-light">
          {property.facing} Facing
        </span>
      )}
    </div>
  );
}

export function PropertyCard({
  property,
  viewMode = 'grid',
  enableMotion = false,
}) {
  if (viewMode === 'list') {
    return <ListCard property={property} />;
  }
  return <GridCard property={property} enableMotion={enableMotion} />;
}

function GridCard({ property, enableMotion }) {
  const CardRoot = enableMotion ? motion.div : 'div';
  const ImageRoot = enableMotion ? motion.img : 'img';

  const cardMotionProps = enableMotion
    ? {
        initial: 'rest',
        animate: 'rest',
        whileHover: 'hover',
        variants: gridCardVariants,
        transition: { duration: 0.3, ease: EASE_OUT },
      }
    : {};

  const imageMotionProps = enableMotion
    ? {
        variants: gridImageVariants,
        transition: { duration: 0.45, ease: EASE_OUT },
      }
    : {};

  return (
    <CardRoot
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white ${
        enableMotion ? '' : 'shadow-[0_10px_30px_-12px_rgba(0,31,84,0.16)]'
      }`}
      {...cardMotionProps}
    >
      <div className="relative overflow-hidden">
        <ImageRoot
          src={property.image}
          alt={property.title}
          className="h-56 w-full object-cover"
          {...imageMotionProps}
        />
        <CategoryBadge tag={property.tag} category={property.category} />
        {property.verified && <VerifiedBadge />}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="text-xl font-extrabold leading-tight tracking-tight text-primary">
            {property.price}
          </span>
          <PropertyIdBadge id={property.id} />
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-gray-900">
          {property.title}
        </h3>

        <p className="mb-3 flex items-start gap-1.5 text-xs leading-relaxed text-gray-600">
          <MapPin size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <span className="line-clamp-2">
            {property.location}, {property.city}
          </span>
        </p>

        <div className="mt-auto border-t border-gray-100 pt-3">
          <PropertySpecs property={property} />

          {enableMotion ? (
            <motion.div
              className="mt-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
            >
              <Link
                to={`/property/${property.id}`}
                className="block w-full rounded-lg border border-primary bg-primary py-2.5 text-center text-xs font-bold text-white no-underline transition-colors duration-300 hover:border-accent hover:bg-accent"
              >
                View Details
              </Link>
            </motion.div>
          ) : (
            <Link
              to={`/property/${property.id}`}
              className="mt-3 block w-full rounded-lg border border-primary bg-primary py-2.5 text-center text-xs font-bold text-white no-underline hover:bg-primary-dark"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </CardRoot>
  );
}

function ListCard({ property }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_-12px_rgba(0,31,84,0.16)] sm:flex-row">
      <div className="relative shrink-0 sm:w-64">
        <img
          src={property.image}
          alt={property.title}
          className="h-56 w-full object-cover sm:h-full sm:min-h-[220px]"
        />
        <CategoryBadge tag={property.tag} category={property.category} />
        {property.verified && <VerifiedBadge />}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <span className="text-xl font-extrabold leading-tight tracking-tight text-primary">
              {property.price}
            </span>
            <PropertyIdBadge id={property.id} />
          </div>

          <h3 className="mb-2 text-sm font-bold leading-snug text-gray-900 sm:text-[15px]">
            {property.title}
          </h3>

          <p className="mb-3 flex items-start gap-1.5 text-xs text-gray-600 sm:text-[13px]">
            <MapPin size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            {property.location}, {property.city}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-600 sm:text-[13px]">
            {property.beds > 0 && (
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Bed size={14} className="text-gray-400" aria-hidden />
                {property.beds} Beds
              </span>
            )}
            {property.baths > 0 && (
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Bath size={14} className="text-gray-400" aria-hidden />
                {property.baths} Baths
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Maximize size={14} className="text-gray-400" aria-hidden />
              {property.area}
            </span>
            {property.parking > 0 && (
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Car size={14} className="text-gray-400" aria-hidden />
                {property.parking} Parking
              </span>
            )}
            {property.facing && (
              <span className="rounded-md border border-gray-200 bg-surface px-2 py-0.5 text-[11px] font-semibold text-primary-light">
                {property.facing} Facing
              </span>
            )}
            {property.furnishing && (
              <span className="rounded-md border border-gray-200 bg-surface px-2 py-0.5 text-[11px] font-semibold text-primary-light">
                {property.furnishing}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Link
            to={`/property/${property.id}`}
            className="inline-block rounded-lg border border-primary bg-primary px-5 py-2.5 text-xs font-bold text-white no-underline hover:bg-primary-dark"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
