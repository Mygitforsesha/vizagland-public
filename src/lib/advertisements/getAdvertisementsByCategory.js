import {
  GENERAL_ADS_LISTING,
  LATEST_ADS_LISTING,
  VILLAGE_ADS_LISTING,
} from '@/components/home/advertisements/advertisementData';
import {
  AD_CATEGORIES,
  getAdvertisementDetailPath,
} from './advertisementCategories';

const LISTING_DATA = {
  village: VILLAGE_ADS_LISTING,
  general: GENERAL_ADS_LISTING,
  latest: LATEST_ADS_LISTING,
};

export function getAdvertisementsByCategory(slug) {
  const config = AD_CATEGORIES[slug];
  if (!config) return [];

  const items = LISTING_DATA[config.dataKey] ?? [];
  return items.map((item) => ({
    ...item,
    href: getAdvertisementDetailPath(slug, item.id),
  }));
}
