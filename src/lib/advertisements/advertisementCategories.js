export const AD_CATEGORY_SLUGS = {
  villageWise: 'village-wise',
  general: 'general',
  latest: 'latest',
};

export const AD_LIST_PAGE_SIZE = 8;

export const AD_CATEGORIES = {
  [AD_CATEGORY_SLUGS.villageWise]: {
    slug: AD_CATEGORY_SLUGS.villageWise,
    title: 'Village Wise Ads',
    subtitle: 'Browse all advertisements in this category.',
    breadcrumbLabel: 'Village Wise Ads',
    dataKey: 'village',
  },
  [AD_CATEGORY_SLUGS.general]: {
    slug: AD_CATEGORY_SLUGS.general,
    title: 'General Ads',
    subtitle: 'Browse all advertisements in this category.',
    breadcrumbLabel: 'General Ads',
    dataKey: 'general',
  },
  [AD_CATEGORY_SLUGS.latest]: {
    slug: AD_CATEGORY_SLUGS.latest,
    title: 'Latest Ads',
    subtitle: 'Browse all advertisements in this category.',
    breadcrumbLabel: 'Latest Ads',
    dataKey: 'latest',
  },
};

export function getAdCategoryConfig(slug) {
  return AD_CATEGORIES[slug] ?? null;
}

export function getAdvertisementListingPath(slug) {
  return `/ads/${slug}`;
}

export function getAdvertisementDetailPath(categorySlug, adId) {
  return `/ads/${categorySlug}/${adId}`;
}

export function paginateItems(items, page, pageSize = AD_LIST_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    totalItems: items.length,
  };
}
