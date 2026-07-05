import { LATEST_UPDATES } from './advertisements/advertisementData';
import AdvertisementFeed from './advertisements/AdvertisementFeed';
import {
  AD_CATEGORY_SLUGS,
  getAdvertisementDetailPath,
  getAdvertisementListingPath,
} from '@/lib/advertisements/advertisementCategories';

const FEED_ITEMS = LATEST_UPDATES.map((item) => ({
  ...item,
  href: getAdvertisementDetailPath(AD_CATEGORY_SLUGS.latest, item.id),
}));

/** Preserved wrapper — same feed UI as Latest Ads on the homepage. */
export function LatestUpdatesSection({ fillHeight = false }) {
  return (
    <AdvertisementFeed
      ariaLabel="Latest regulations, news and infrastructure updates"
      eyebrow="Latest Updates"
      title="Regulations, News & Infrastructure"
      description="Policy changes and development updates across Visakhapatnam"
      items={FEED_ITEMS}
      viewAllLabel="View All Updates"
      viewAllHref={getAdvertisementListingPath(AD_CATEGORY_SLUGS.latest)}
      fillHeight={fillHeight}
    />
  );
}
