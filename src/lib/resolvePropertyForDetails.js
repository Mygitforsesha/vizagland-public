import { properties } from './data';
import { searchProperties } from './searchData';

function mapSearchPropertyForDetails(searchProperty) {
  const bedroomMatch = searchProperty.title.match(/(\d+)\s*BHK/i);

  return {
    id: searchProperty.id,
    title: searchProperty.title,
    price: `₹ ${searchProperty.priceLabel}`,
    location: searchProperty.village,
    city: searchProperty.district,
    type: searchProperty.propertyType,
    category: searchProperty.listingType ?? searchProperty.category ?? 'Buy',
    beds: bedroomMatch ? Number(bedroomMatch[1]) : 0,
    baths: 0,
    area: `${searchProperty.area} ${searchProperty.areaUnit}`,
    image: searchProperty.image,
    tag: searchProperty.verified ? 'Verified' : 'Listed',
    facing: searchProperty.facing,
  };
}

/** Resolves a property for PropertyDetailsPage from listings or search catalogs. */
export function resolvePropertyForDetails(id) {
  if (!id) return null;

  const catalogProperty = properties.find((entry) => entry.id === id);
  if (catalogProperty) return catalogProperty;

  const searchProperty = searchProperties.find((entry) => entry.id === id);
  if (!searchProperty) return null;

  return mapSearchPropertyForDetails(searchProperty);
}
