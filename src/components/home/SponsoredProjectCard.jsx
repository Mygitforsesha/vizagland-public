import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE_OUT } from './motionPresets';

const cardVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 24px 48px -12px rgba(0, 31, 84, 0.28)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 36px 64px -14px rgba(0, 31, 84, 0.42)',
  },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

export function SponsoredProjectCard({
  project,
}) {
  const {
    badge,
    badgeVariant = 'sponsored',
    headline,
    description,
    features = [],
    builder,
    ctaLabel,
    image,
    href = '/listings',
  } = project;

  const badgeClassName =
    badgeVariant === 'investment'
      ? 'bg-primary-light/95 text-white border border-white/20'
      : 'bg-accent text-white border border-white/25';

  const ctaClassName =
    badgeVariant === 'investment'
      ? 'bg-white text-primary transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white'
      : 'bg-accent text-white transition-colors duration-300 hover:bg-accent-hover';

  return (
    <motion.article
      className="relative h-full min-h-[360px] overflow-hidden rounded-[24px] font-sans"
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <motion.img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        variants={imageVariants}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        aria-hidden
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-[#001433] via-[#001F54]/88 to-[#001433]/35"
        aria-hidden
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#001433]/70 via-[#001433]/35 to-transparent"
        variants={overlayVariants}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[360px] h-full flex-col justify-between p-5 sm:p-6">
        <span
          className={`inline-flex w-fit max-w-full rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm ${badgeClassName}`}
        >
          {badge}
        </span>

        <div className="mt-auto pt-8">
          <h4 className="m-0 text-[1.35rem] font-extrabold leading-tight tracking-tight text-white sm:text-[1.55rem]">
            {headline}
          </h4>

          <p className="mt-2.5 mb-4 max-w-md text-[13px] leading-relaxed text-white/82 sm:text-sm">
            {description}
          </p>

          {features.length > 0 && (
            <ul className="m-0 mb-5 flex list-none flex-wrap gap-2 p-0">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-[2px] sm:text-xs"
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C66A00]">
            {builder}
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="inline-block w-full sm:w-auto"
          >
            <Link
              to={href}
              className={`inline-flex w-full items-center justify-center rounded-xl border border-transparent px-5 py-3.5 text-sm font-bold no-underline sm:min-w-[180px] sm:w-auto ${ctaClassName}`}
            >
              {ctaLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
