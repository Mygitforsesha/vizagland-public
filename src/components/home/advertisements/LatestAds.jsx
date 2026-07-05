import AdvertisementFeed from './AdvertisementFeed';
import { LATEST_UPDATES } from './advertisementData';
import {
  AD_CATEGORY_SLUGS,
  getAdvertisementDetailPath,
  getAdvertisementListingPath,
} from '@/lib/advertisements/advertisementCategories';

const FEED_ITEMS = LATEST_UPDATES.map((item) => ({
  ...item,
  href: getAdvertisementDetailPath(AD_CATEGORY_SLUGS.latest, item.id),
}));

/**
 * Latest Ads — reuses the existing Latest Updated feed design, data, and behavior.
 */
export default function LatestAds() {
  return (
    <AdvertisementFeed
      ariaLabel="Latest published advertisements"
      eyebrow="Latest Ads"
      title="Latest Ads"
      description="Latest published advertisements."
      items={FEED_ITEMS}
      viewAllLabel="View All"
      viewAllHref={getAdvertisementListingPath(AD_CATEGORY_SLUGS.latest)}
    />
  );
}
