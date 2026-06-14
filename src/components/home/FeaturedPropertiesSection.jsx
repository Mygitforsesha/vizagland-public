import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PropertyCard } from '../PropertyCard';
import { properties } from '../../lib/data';
import {
  getFadeUpItem,
  getSectionHeaderMotion,
  getStaggerContainer,
  viewportOnce,
} from './motionPresets';

const FEATURED_LIMIT = 4;

export function FeaturedPropertiesSection() {
  const reduceMotion = useReducedMotion();
  const featuredProperties = properties.filter((property) => property.featured).slice(0, FEATURED_LIMIT);

  const containerVariants = getStaggerContainer(reduceMotion, 0.1);
  const itemVariants = getFadeUpItem(reduceMotion);
  const headerVariants = getSectionHeaderMotion(reduceMotion);

  return (
    <section className="overflow-hidden py-2 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="mb-6 flex flex-wrap items-end justify-between gap-2"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div>
            <div className="mb-1 text-[12px] font-bold uppercase tracking-wider text-accent">Handpicked</div>
            <h3 className="mb-1 text-2xl font-extrabold text-primary">Featured Properties</h3>
            <p className="text-sm text-gray-500">Verified properties across Visakhapatnam</p>
          </div>
          <Link
            to="/listings"
            className="flex items-center gap-1 text-[13px] font-semibold text-accent no-underline transition-colors duration-300 hover:text-accent-hover"
          >
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="h-full px-0.5 py-1"
            >
              <PropertyCard property={property} enableMotion />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
