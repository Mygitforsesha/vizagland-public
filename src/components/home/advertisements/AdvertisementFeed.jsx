import { ArrowRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import AdvertisementCard from '@/components/advertisements/AdvertisementCard';
import { getSectionHeaderMotion, viewportOnce } from '../motionPresets';

export function buildMarqueeItems(items) {
  return [...items, ...items.map((item) => ({ ...item, id: `${item.id}-dup` }))];
}

export default function AdvertisementFeed({
  ariaLabel,
  eyebrow,
  title,
  description,
  items,
  viewAllLabel = 'View All',
  viewAllHref = '#',
  showLiveBadge = true,
  footerHint = 'Hover to pause · Updated daily',
  fillHeight = false,
  className = '',
}) {
  const reduceMotion = useReducedMotion();
  const headerVariants = getSectionHeaderMotion(reduceMotion);
  const marqueeItems = buildMarqueeItems(items);

  return (
    <section aria-label={ariaLabel} className={`h-full ${className}`}>
      <div
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_32px_-12px_rgba(0,31,84,0.12)] ${
          fillHeight ? 'lg:min-h-0' : ''
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />

        <motion.div
          className="border-b border-gray-100 bg-gradient-to-br from-primary/[0.03] via-white to-accent/[0.04] px-5 py-4"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="text-[12px] font-bold uppercase tracking-wider text-accent">{eyebrow}</div>
            {showLiveBadge ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal-light px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
                </span>
                Live Feed
              </span>
            ) : null}
          </div>

          <div>
            <h3 className="mb-1 text-lg font-extrabold leading-snug text-primary">{title}</h3>
            <p className="m-0 text-[13px] leading-relaxed text-gray-500">{description}</p>
          </div>
        </motion.div>

        <div className={`bg-surface px-4 py-4 ${fillHeight ? 'lg:flex lg:min-h-0 lg:flex-1 lg:flex-col' : ''}`}>
          <div
            className={`updates-marquee-container relative h-[480px] overflow-hidden rounded-xl border border-gray-100 bg-white/80 ${
              fillHeight ? 'lg:h-auto lg:min-h-0 lg:flex-1' : ''
            } ${reduceMotion ? 'overflow-y-auto scrollbar-hide' : ''}`}
          >
            {!reduceMotion && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </>
            )}

            <div className={`flex flex-col gap-3 px-1 py-0.5 ${reduceMotion ? '' : 'updates-marquee-track'}`}>
              {marqueeItems.map((item) => (
                <AdvertisementCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <Radio size={12} className="text-accent/70" />
            <span>{footerHint}</span>
          </div>
        </div>

        <div className="mt-auto border-t border-gray-100 bg-white px-5 py-3.5">
          <Link
            to={viewAllHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/10 bg-primary/[0.02] py-2.5 text-[13px] font-bold text-primary no-underline transition-all duration-300 hover:border-accent hover:bg-accent-light hover:text-accent"
          >
            {viewAllLabel}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
