import {
  LayoutGrid,
  ShoppingCart,
  Tag,
  Home as HomeIcon,
  FileText,
} from 'lucide-react';
import { buildSearchPayload } from '../../lib/property-search/buildSearchPayload';
import { ITEMS_PER_PAGE } from './usePropertySearch';
import { horizontalScrollClassName } from './horizontalScroll';

const CATEGORY_ORDER = ['All', 'Buy', 'Sell', 'Rent', 'Lease'];

const categoryConfig = {
  All: { label: 'All', icon: LayoutGrid },
  Buy: { label: 'For Buy', icon: ShoppingCart },
  Sell: { label: 'For Sale', icon: Tag },
  Rent: { label: 'For Rent', icon: HomeIcon },
  Lease: { label: 'For Lease', icon: FileText },
};

const PropertyCategoryTabs = ({ search }) => {
  const {
    searchFilters,
    handleFilterChange,
    categoryCounts,
  } = search;

  const activeCategory = searchFilters.listingType || 'All';

  function handleCategoryChange(cat) {
    const listingType = cat === 'All' ? '' : cat;

    console.log(
      'Search Payload:',
      buildSearchPayload({ ...searchFilters, listingType }, 1, ITEMS_PER_PAGE),
    );
    handleFilterChange('listingType', cat);
  }

  return (
    <div className={`flex items-center gap-0 lg:gap-1 ${horizontalScrollClassName}`}>
      {CATEGORY_ORDER.map((cat) => {
        const config = categoryConfig[cat];
        const Icon = config.icon;
        const count = categoryCounts[cat] ?? 0;

        return (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={`flex items-center gap-1 lg:gap-2 px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap border-b-2 lg:border-b-[3px] shrink-0 transition-all duration-200
              ${
                activeCategory === cat
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-600 hover:text-primary hover:border-gray-300'
              }`}
          >
            <Icon size={15} className="shrink-0" />

            {config.label}

            <span
              className={`hidden lg:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${
                  activeCategory === cat
                    ? 'bg-accent/10 text-accent'
                    : 'bg-gray-100 text-gray-500'
                }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PropertyCategoryTabs;
