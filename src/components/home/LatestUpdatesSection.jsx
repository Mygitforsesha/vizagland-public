import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Landmark, Newspaper, Radio } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { getSectionHeaderMotion, viewportOnce } from './motionPresets';

const CATEGORY_CONFIG = {
  Regulation: {
    icon: FileText,
    badgeClass: 'bg-orange-50 text-accent border border-accent/15',
  },
  News: {
    icon: Newspaper,
    badgeClass: 'bg-gray-100 text-primary border border-primary/10',
  },
  Infrastructure: {
    icon: Landmark,
    badgeClass: 'bg-teal-light text-teal border border-teal/15',
  },
};

const LATEST_UPDATES = [
  {
    id: 'update-vmrda-layout-rules',
    title: 'New VMRDA Layout Approval Rules',
    category: 'Regulation',
    description: 'Updated guidelines streamline layout submissions with revised road width and open-space requirements for VMRDA jurisdictions.',
    image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '#',
  },
  {
    id: 'update-registration-charges',
    title: 'Property Registration Charges Revised',
    category: 'Regulation',
    description: 'Andhra Pradesh notifies revised stamp duty and registration fee slabs affecting urban and semi-urban property transfers.',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '#',
  },
  {
    id: 'update-gvmc-master-plan',
    title: 'GVMC Master Plan Expansion',
    category: 'News',
    description: 'Greater Visakhapatnam Municipal Corporation extends planning boundaries to cover fast-growing peripheral wards and corridors.',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '#',
  },
  {
    id: 'update-highway-connectivity',
    title: 'Highway Connectivity Boost',
    category: 'Infrastructure',
    description: 'NH upgrade works near Vizag improve access to Anandapuram and Pendurthi, lifting demand for adjoining plotted developments.',
    image: 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '#',
  },
];

const MARQUEE_ITEMS = [
  ...LATEST_UPDATES,
  ...LATEST_UPDATES.map((update) => ({ ...update, id: `${update.id}-dup` })),
];

function UpdateCard({ update }) {
  const { icon: CategoryIcon, badgeClass } = CATEGORY_CONFIG[update.category];

  return (
    <article className="group relative flex h-[128px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_24px_-8px_rgba(0,31,84,0.18)]">
      <div className="absolute inset-y-0 left-0 w-0.5 scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

      <div className="relative w-[80px] shrink-0 overflow-hidden">
        <img
          src={update.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3">
        <span
          className={`inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
        >
          <CategoryIcon size={10} />
          {update.category}
        </span>

        <h4 className="m-0 line-clamp-2 text-[12px] font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent">
          {update.title}
        </h4>

        <p className="m-0 line-clamp-2 text-[11px] leading-relaxed text-gray-500">
          {update.description}
        </p>

        <Link
          to={update.href}
          className="mt-0.5 inline-flex w-fit items-center gap-1 text-[11px] font-semibold text-accent no-underline transition-colors duration-200 hover:text-accent-hover"
        >
          Read More
          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function LatestUpdatesSection() {
  const reduceMotion = useReducedMotion();
  const headerVariants = getSectionHeaderMotion(reduceMotion);

  return (
    <section aria-label="Latest regulations, news and infrastructure updates">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_32px_-12px_rgba(0,31,84,0.12)]">
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />

        <motion.div
          className="border-b border-gray-100 bg-gradient-to-br from-primary/[0.03] via-white to-accent/[0.04] px-5 py-4"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="text-[12px] font-bold uppercase tracking-wider text-accent">
              Latest Updates
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal-light px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
              Live Feed
            </span>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-extrabold leading-snug text-primary">
              Regulations, News &amp; Infrastructure
            </h3>
            <p className="m-0 text-[13px] leading-relaxed text-gray-500">
              Policy changes and development updates across Visakhapatnam
            </p>
          </div>
        </motion.div>

        <div className="bg-surface px-4 py-4">
          <div
            className={`updates-marquee-container relative h-[480px] overflow-hidden rounded-xl border border-gray-100 bg-white/80 ${
              reduceMotion ? 'overflow-y-auto scrollbar-hide' : ''
            }`}
          >
            {!reduceMotion && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </>
            )}

            <div className={`flex flex-col gap-3 px-1 py-0.5 ${reduceMotion ? '' : 'updates-marquee-track'}`}>
              {MARQUEE_ITEMS.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <Radio size={12} className="text-accent/70" />
            <span>Hover to pause &middot; Updated daily</span>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white px-5 py-3.5">
          <Link
            to="#"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/10 bg-primary/[0.02] py-2.5 text-[13px] font-bold text-primary no-underline transition-all duration-300 hover:border-accent hover:bg-accent-light hover:text-accent"
          >
            View All Updates
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
