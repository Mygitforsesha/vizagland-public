import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORY_CONFIG, DEFAULT_BADGE } from '@/components/advertisements/advertisementCardConfig';

export default function AdvertisementCard({ item, showMeta = false, className = '' }) {
  const { icon: CategoryIcon, badgeClass } = CATEGORY_CONFIG[item.category] ?? DEFAULT_BADGE;

  const content = (
    <>
      <div className="absolute inset-y-0 left-0 w-0.5 scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

      <div className="relative w-[80px] shrink-0 overflow-hidden sm:w-[80px]">
        <img
          src={item.image}
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
          {item.category}
        </span>

        <h4 className="m-0 line-clamp-2 text-[12px] font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent">
          {item.title}
        </h4>

        <p className="m-0 line-clamp-2 text-[11px] leading-relaxed text-gray-500">{item.description}</p>

        {showMeta && item.location ? (
          <p className="m-0 truncate text-[10px] text-gray-400">{item.location}</p>
        ) : null}

        {showMeta && item.publishedDate ? (
          <p className="m-0 text-[10px] text-gray-400">{item.publishedDate}</p>
        ) : null}

        <span className="mt-0.5 inline-flex w-fit items-center gap-1 text-[11px] font-semibold text-accent transition-colors duration-200 group-hover:text-accent-hover">
          Read More
          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </>
  );

  const cardClassName = `group relative flex h-[128px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_24px_-8px_rgba(0,31,84,0.18)] ${className}`;

  if (item.href) {
    return (
      <Link to={item.href} className={`${cardClassName} no-underline`}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
