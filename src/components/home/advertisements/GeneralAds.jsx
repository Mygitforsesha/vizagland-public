import AdvertisementFeed from './AdvertisementFeed';
import { GENERAL_ADS } from './advertisementData';
import {
  AD_CATEGORY_SLUGS,
  getAdvertisementDetailPath,
  getAdvertisementListingPath,
} from '@/lib/advertisements/advertisementCategories';

const FEED_ITEMS = GENERAL_ADS.map((item) => ({
  ...item,
  href: getAdvertisementDetailPath(AD_CATEGORY_SLUGS.general, item.id),
}));

export default function GeneralAds() {
  return (
    <AdvertisementFeed
      ariaLabel="General advertisements"
      eyebrow="General"
      title="General Ads"
      description="General advertisements across all categories."
      items={FEED_ITEMS}
      viewAllLabel="View All"
      viewAllHref={getAdvertisementListingPath(AD_CATEGORY_SLUGS.general)}
    />
  );
}
