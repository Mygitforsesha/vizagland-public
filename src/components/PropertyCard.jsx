import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, BadgeCheck, Car } from 'lucide-react';

const categoryColors = {
  Buy: 'bg-teal',
  Sell: 'bg-amber-500',
  Rent: 'bg-accent',
  Lease: 'bg-primary',
};

export function PropertyCard({
  property,
  viewMode = 'grid',
}) {  if (viewMode === 'list') {
    return <ListCard property={property} />;
  }
  return <GridCard property={property} />;
}

function GridCard({ property }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 group">
      <div className="relative">
        <img src={property.image} alt={property.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide text-white ${categoryColors[property.category] || 'bg-teal'}`}>
          {property.tag}
        </span>
        {property.verified && (
          <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-teal text-[10px] font-bold px-2 py-1 rounded flex items-center gap-0.5">
            <BadgeCheck size={11} /> Verified
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-12" />
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-lg font-extrabold text-primary">{property.price}</span>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{property.id}</span>
        </div>
        <h3 className="text-[13px] font-semibold text-gray-800 mb-1 line-clamp-1">{property.title}</h3>
        <p className="text-[12px] text-gray-500 flex items-center gap-1 mb-0">
          <MapPin size={12} /> {property.location}, {property.city}
        </p>
        {(property.beds > 0 || property.baths > 0 || property.parking) && (
          <div className="flex gap-3 text-[12px] text-gray-500 border-t border-gray-100 pt-2.5 mt-2.5 flex-wrap">
            {property.beds > 0 && <span className="flex items-center gap-1"><Bed size={13} /> {property.beds} Beds</span>}
            {property.baths > 0 && <span className="flex items-center gap-1"><Bath size={13} /> {property.baths} Baths</span>}
            <span className="flex items-center gap-1"><Maximize size={13} /> {property.area}</span>
            {property.parking && property.parking > 0 && <span className="flex items-center gap-1"><Car size={13} /> {property.parking}</span>}
          </div>
        )}
        {property.beds === 0 && property.baths === 0 && (
          <div className="flex gap-3 text-[12px] text-gray-500 border-t border-gray-100 pt-2.5 mt-2.5">
            <span className="flex items-center gap-1"><Maximize size={13} /> {property.area}</span>
            {property.facing && <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded">{property.facing} Facing</span>}
          </div>
        )}
        <Link to={`/property/${property.id}`} className="block w-full mt-2.5 bg-primary text-white text-[12px] font-semibold py-2 rounded-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-md text-center no-underline">
          View Details
        </Link>
      </div>
    </div>
  );
}

function ListCard({ property }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg group flex flex-col sm:flex-row">
      <div className="relative sm:w-64 flex-shrink-0">
        <img src={property.image} alt={property.title} className="w-full h-48 sm:h-full object-cover" />
        <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide text-white ${categoryColors[property.category] || 'bg-teal'}`}>
          {property.tag}
        </span>
        {property.verified && (
          <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-teal text-[10px] font-bold px-2 py-1 rounded flex items-center gap-0.5">
            <BadgeCheck size={11} /> Verified
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
            <span className="text-xl font-extrabold text-primary">{property.price}</span>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{property.id}</span>
          </div>
          <h3 className="text-[14px] font-semibold text-gray-800 mb-1">{property.title}</h3>
          <p className="text-[12px] text-gray-500 flex items-center gap-1 mb-2">
            <MapPin size={12} /> {property.location}, {property.city}
          </p>
          <div className="flex gap-4 text-[12px] text-gray-500 flex-wrap">
            {property.beds > 0 && <span className="flex items-center gap-1"><Bed size={13} /> {property.beds} Beds</span>}
            {property.baths > 0 && <span className="flex items-center gap-1"><Bath size={13} /> {property.baths} Baths</span>}
            <span className="flex items-center gap-1"><Maximize size={13} /> {property.area}</span>
            {property.parking && property.parking > 0 && <span className="flex items-center gap-1"><Car size={13} /> {property.parking} Parking</span>}
            {property.facing && <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded">{property.facing} Facing</span>}
            {property.furnishing && <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded">{property.furnishing}</span>}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Link to={`/property/${property.id}`} className="bg-primary text-white text-[12px] font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:bg-primary-dark no-underline inline-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
