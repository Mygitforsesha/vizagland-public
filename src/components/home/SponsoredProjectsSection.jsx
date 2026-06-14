import { motion, useReducedMotion } from 'framer-motion';
import { SponsoredProjectCard } from './SponsoredProjectCard';
import {
  getFadeUpItem,
  getSectionHeaderMotion,
  getStaggerContainer,
  viewportOnce,
} from './motionPresets';

const SPONSORED_PROJECTS = [
  {
    id: 'sponsored-luxury-villas',
    badge: 'Sponsored',
    badgeVariant: 'sponsored',
    headline: 'Luxury Villas Starting From ₹1.5 Cr',
    description: 'Premium gated community villas with world-class amenities.',
    features: [
      'Gated Community',
      'Club House',
      'Swimming Pool',
      'Near IT Hub',
    ],
    builder: 'Sri Sairam Builders',
    ctaLabel: 'Explore Project',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    href: '/listings',
  },
  {
    id: 'sponsored-vmrda-plots',
    badge: 'Investment Opportunity',
    badgeVariant: 'investment',
    headline: 'VMRDA Approved Plots',
    description: 'Limited inventory with high appreciation potential.',
    features: [
      'DTCP Approved',
      'Bank Loan Available',
      'Ready Registration',
    ],
    builder: 'AP Realty',
    ctaLabel: 'View Investment',
    image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    href: '/listings',
  },
];

export function SponsoredProjectsSection() {
  const reduceMotion = useReducedMotion();
  const containerVariants = getStaggerContainer(reduceMotion, 0.14);
  const itemVariants = getFadeUpItem(reduceMotion, 32);
  const headerVariants = getSectionHeaderMotion(reduceMotion);

  return (
    <section className="overflow-hidden bg-surface pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="mb-6"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h3 className="mb-1 text-2xl font-extrabold text-primary">Sponsored Projects</h3>
          <p className="m-0 text-sm text-gray-600">
            Exclusive projects from trusted builders
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {SPONSORED_PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="h-full px-0.5 py-1"
            >
              <SponsoredProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
