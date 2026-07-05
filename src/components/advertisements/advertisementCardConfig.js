import {
  Building,
  FileText,
  Landmark,
  MapPin,
  Newspaper,
  ShoppingBag,
  Trees,
  Wallet,
} from 'lucide-react';

export const CATEGORY_CONFIG = {
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
  Layout: {
    icon: MapPin,
    badgeClass: 'bg-orange-50 text-accent border border-accent/15',
  },
  Plots: {
    icon: MapPin,
    badgeClass: 'bg-teal-light text-teal border border-teal/15',
  },
  'Farm Land': {
    icon: Trees,
    badgeClass: 'bg-green-50 text-teal border border-teal/15',
  },
  Business: {
    icon: ShoppingBag,
    badgeClass: 'bg-gray-100 text-primary border border-primary/10',
  },
  Bank: {
    icon: Wallet,
    badgeClass: 'bg-sky-50 text-primary border border-primary/10',
  },
  Interior: {
    icon: Building,
    badgeClass: 'bg-orange-50 text-accent border border-accent/15',
  },
  Materials: {
    icon: Landmark,
    badgeClass: 'bg-teal-light text-teal border border-teal/15',
  },
  Legal: {
    icon: FileText,
    badgeClass: 'bg-gray-100 text-primary border border-primary/10',
  },
};

export const DEFAULT_BADGE = {
  icon: Newspaper,
  badgeClass: 'bg-gray-100 text-primary border border-primary/10',
};
