import AdvertisementFeed from './AdvertisementFeed';
import { VILLAGE_ADS } from './advertisementData';
import {
  AD_CATEGORY_SLUGS,
  getAdvertisementDetailPath,
  getAdvertisementListingPath,
} from '@/lib/advertisements/advertisementCategories';

const FEED_ITEMS = VILLAGE_ADS.map((item) => ({
  ...item,
  href: getAdvertisementDetailPath(AD_CATEGORY_SLUGS.villageWise, item.id),
}));

export default function VillageAds() {
  return (
    <AdvertisementFeed
      ariaLabel="Village wise advertisements"
      eyebrow="Village Wise"
      title="Village Wise Ads"
      description="Advertisements specific to villages and local areas."
      items={FEED_ITEMS}
      viewAllLabel="View All"
      viewAllHref={getAdvertisementListingPath(AD_CATEGORY_SLUGS.villageWise)}
    />
  );
}
