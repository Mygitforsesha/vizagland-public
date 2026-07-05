import GeneralAds from './GeneralAds';
import LatestAds from './LatestAds';
import VillageAds from './VillageAds';

export function AdvertisementSection() {
  return (
    <section className="border-t border-gray-200 bg-white pb-10 pt-2 sm:pb-12 sm:pt-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <div className="flex min-h-0 flex-col">
            <VillageAds />
          </div>
          <div className="flex min-h-0 flex-col">
            <GeneralAds />
          </div>
          <div className="flex min-h-0 flex-col">
            <LatestAds />
          </div>
        </div>
      </div>
    </section>
  );
}
