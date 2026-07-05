import { AdvertisementSection } from '@/components/home/AdvertisementSection';
import BrowseByAreaSection from '@/components/home/browse-area/BrowseByAreaSection';

export function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:pt-8">
        <BrowseByAreaSection />
      </div>

      <AdvertisementSection />
    </>
  );
}
