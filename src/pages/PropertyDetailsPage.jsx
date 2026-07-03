import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Calendar, Compass, Building, Phone, Mail, ArrowLeft, Share2, Heart, CheckCircle } from 'lucide-react';
import { resolvePropertyForDetails } from '../lib/resolvePropertyForDetails';
import { VillageSearch } from '../components/VillageSearch';

export function PropertyDetailsPage() {
  const { id } = useParams();
  const property = resolvePropertyForDetails(id);

  if (!property) {
    return (
      <>
        <div className="bg-primary py-5">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-white text-xl font-bold m-0">Property Not Found</h2>
          </div>
        </div>
        <section className="py-16 text-center">
          <p className="text-gray-500 text-lg mb-4">The property you are looking for does not exist.</p>
          <Link to="/listings" className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-semibold no-underline hover:bg-primary-dark transition-colors">
            Back to Listings
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-white text-xl font-bold m-0 flex items-center gap-2">
            <Building size={20} /> Property Details
          </h2>
          <p className="text-blue-200 text-[13px] mt-1 mb-0">{property.id} - {property.type}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-[12px] text-gray-500 flex items-center gap-1.5">
            <Link to="/" className="text-gray-500 no-underline hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/listings" className="text-gray-500 no-underline hover:text-accent">Properties</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{property.id}</span>
          </nav>
        </div>
      </div>

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">

              {/* Image */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="w-full h-52 sm:h-72 md:h-96 object-cover" />
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded uppercase tracking-wide text-white ${property.category === 'Buy' ? 'bg-teal' : property.category === 'Sell' ? 'bg-amber-500' : property.category === 'Lease' ? 'bg-primary' : 'bg-accent'}`}>
                    {property.tag}
                  </span>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                      <Heart size={15} />
                    </button>
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors shadow-sm">
                      <Share2 size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Title & Price */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h1 className="text-lg font-extrabold text-primary mb-1">{property.title}</h1>
                    <p className="text-[13px] text-gray-500 flex items-center gap-1 mb-0">
                      <MapPin size={13} className="text-accent" /> {property.location}, {property.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-accent">{property.price}</div>
                    <span className="text-[11px] text-gray-500">{(property.category === 'Rent' || property.category === 'Lease') ? 'per month' : 'total price'}</span>
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-primary mb-4">Property Overview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <DetailItem icon={Building} label="Type" value={property.type} />
                  <DetailItem icon={Maximize} label="Area" value={property.area} />
                  {property.beds > 0 && <DetailItem icon={Bed} label="Bedrooms" value={`${property.beds}`} />}
                  {property.baths > 0 && <DetailItem icon={Bath} label="Bathrooms" value={`${property.baths}`} />}
                  <DetailItem icon={Compass} label="Facing" value="East" />
                  <DetailItem icon={Calendar} label="Listed" value="2 days ago" />
                  <DetailItem icon={Building} label="Floors" value="G+2" />
                  <DetailItem icon={CheckCircle} label="Status" value="Available" />
                </div>
              </div>

              {/* Description */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-primary mb-3">Description</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  This {property.type.toLowerCase()} is located in the prime area of {property.location}, {property.city}.
                  It offers excellent connectivity to major roads and amenities.
                  {property.beds > 0 && ` The property features ${property.beds} spacious bedrooms and ${property.baths} well-designed bathrooms.`}
                  {' '}The total area is {property.area} with modern fixtures and fittings.
                  Ideal for {property.category === 'Rent' ? 'families looking for a comfortable living space' : 'buyers seeking a quality investment in a growing area'}.
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-primary mb-3">Amenities & Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['24/7 Water Supply', 'Power Backup', 'Covered Parking', 'Security', 'Lift', 'Park / Garden', 'Club House', 'Gym', 'Children Play Area'].map(amenity => (
                    <div key={amenity} className="flex items-center gap-2 text-[12px] text-gray-700">
                      <CheckCircle size={13} className="text-teal flex-shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-primary mb-3">Location</h3>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin size={24} className="mx-auto mb-2 text-accent" />
                    <p className="text-[13px] font-medium">{property.location}, {property.city}</p>
                    <p className="text-[11px]">Map view coming soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Search Village */}
              <VillageSearch />

              {/* Contact Owner */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-primary text-white text-[13px] font-bold px-4 py-3">Contact Owner / Agent</div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">AP</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-[13px]">Property Agent</div>
                      <div className="text-[11px] text-gray-500">Verified Agent</div>
                    </div>
                  </div>
                  <a href="tel:9618170406" className="flex items-center justify-center gap-2 w-full bg-teal text-white text-[13px] font-semibold py-2.5 rounded-lg no-underline hover:bg-teal/90 transition-colors">
                    <Phone size={14} /> Call Now
                  </a>
                  <a href="mailto:info@aprealestate.in" className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-700 text-[13px] font-semibold py-2.5 rounded-lg no-underline hover:bg-gray-50 transition-colors">
                    <Mail size={14} /> Send Email
                  </a>
                </div>
              </div>

              {/* Property Quick Info */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-700 text-white text-[13px] font-bold px-4 py-3">Quick Info</div>
                <div className="p-4 space-y-2.5">
                  {[
                    { label: 'Property ID', value: property.id },
                    { label: 'Type', value: property.type },
                    { label: 'Category', value: `For ${property.category}` },
                    { label: 'Area', value: property.area },
                    { label: 'City', value: property.city },
                    { label: 'Location', value: property.location },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-[12px] border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-gray-800 font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Listings */}
              <Link to="/listings" className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary text-[13px] font-semibold py-2.5 rounded-lg no-underline hover:bg-primary hover:text-white transition-colors">
                <ArrowLeft size={14} /> Back to Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}) {
return (
    <div className="flex items-start gap-2.5">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-primary" />
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase text-gray-500">{label}</div>
        <div className="text-[13px] font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  );
}
