export const ROUTES = {
  home: '/',
  search: '/search',
  listings: '/listings',
  contact: '/contact',
  login: '/login',
  register: '/register',
  postProperty: '/post-property',
  propertyDetails: (id) => `/property/${id}`,
  advertisements: {
    villageWise: '/ads/village-wise',
    general: '/ads/general',
    latest: '/ads/latest',
    listing: (category) => `/ads/${category}`,
    details: (category, adId) => `/ads/${category}/${adId}`,
  },
};
