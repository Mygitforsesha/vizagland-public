import { HeroSection } from '@/components/home/HeroSection';
import { LatestUpdatesSection } from '@/components/home/LatestUpdatesSection';
import BrowseByAreaSection from '@/components/home/browse-area/BrowseByAreaSection';

/**
 * Homepage snapshot before Hero removal (Browse + Hero/Latest side-by-side).
 * Saved: 2026-07-05
 */
export function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:pt-8">
        <BrowseByAreaSection />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_3fr] lg:items-stretch lg:gap-6">
          <div className="min-h-0 lg:flex lg:flex-col">
            <HeroSection />
          </div>
          <div className="min-h-0 lg:flex lg:flex-col">
            <LatestUpdatesSection fillHeight />
          </div>
        </div>
      </div>
    </>
  );
}
