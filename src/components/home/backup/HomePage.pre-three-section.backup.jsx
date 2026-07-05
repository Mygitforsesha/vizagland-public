import { HeroSection } from '@/components/home/HeroSection';
import BrowseAreaSection from '@/components/home/browse-area/BrowseAreaSection';
import { RemainingHomeSections } from '@/components/home/RemainingHomeSections';

/**
 * Homepage snapshot before the three-section redesign
 * (Browse by Area + Hero + Advertisement only).
 * Saved: 2026-07-05
 */
export function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:pt-8">
        <BrowseAreaSection />
      </div>
      <HeroSection />
      <RemainingHomeSections />
    </>
  );
}
