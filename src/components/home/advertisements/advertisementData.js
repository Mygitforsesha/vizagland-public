/**
 * Advertisement feed data — swap with API responses when available.
 */

const IMAGE_A = 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=400';
const IMAGE_B = 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400';
const IMAGE_C = 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400';
const IMAGE_D = 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=400';

export const LATEST_ADS_LISTING = [
  {
    id: 'update-vmrda-layout-rules',
    title: 'New VMRDA Layout Approval Rules',
    category: 'Regulation',
    description:
      'Updated guidelines streamline layout submissions with revised road width and open-space requirements for VMRDA jurisdictions.',
    image: IMAGE_A,
    location: 'VMRDA Jurisdiction',
    publishedDate: 'Published 2 days ago',
  },
  {
    id: 'update-registration-charges',
    title: 'Property Registration Charges Revised',
    category: 'Regulation',
    description:
      'Andhra Pradesh notifies revised stamp duty and registration fee slabs affecting urban and semi-urban property transfers.',
    image: IMAGE_B,
    location: 'Andhra Pradesh',
    publishedDate: 'Published 3 days ago',
  },
  {
    id: 'update-gvmc-master-plan',
    title: 'GVMC Master Plan Expansion',
    category: 'News',
    description:
      'Greater Visakhapatnam Municipal Corporation extends planning boundaries to cover fast-growing peripheral wards and corridors.',
    image: IMAGE_C,
    location: 'GVMC Area',
    publishedDate: 'Published 5 days ago',
  },
  {
    id: 'update-highway-connectivity',
    title: 'Highway Connectivity Boost',
    category: 'Infrastructure',
    description:
      'NH upgrade works near Vizag improve access to Anandapuram and Pendurthi, lifting demand for adjoining plotted developments.',
    image: IMAGE_D,
    location: 'NH Corridor',
    publishedDate: 'Published 1 week ago',
  },
  {
    id: 'latest-rushikonda-plots',
    title: 'Rushikonda Sea-View Plots',
    category: 'News',
    description: 'Premium plotted development with coastal access and approved layout plans.',
    image: IMAGE_A,
    location: 'Rushikonda',
    publishedDate: 'Published 1 week ago',
  },
  {
    id: 'latest-architect-consult',
    title: 'Architect Consultation Offer',
    category: 'Infrastructure',
    description: 'Free initial consultation for residential and commercial building plans.',
    image: IMAGE_C,
    location: 'Visakhapatnam',
    publishedDate: 'Published 2 weeks ago',
  },
  {
    id: 'latest-gajuwaka-commercial',
    title: 'Gajuwaka Commercial Space',
    category: 'News',
    description: 'Ground-floor commercial units available near industrial corridor.',
    image: IMAGE_D,
    location: 'Gajuwaka',
    publishedDate: 'Published 2 weeks ago',
  },
  {
    id: 'latest-vmrda-investment',
    title: 'VMRDA Investment Zone',
    category: 'Regulation',
    description: 'New investment zone notifications for plotted developments near Anandapuram.',
    image: IMAGE_B,
    location: 'Anandapuram',
    publishedDate: 'Published 3 weeks ago',
  },
  {
    id: 'latest-pendurthi-roads',
    title: 'Pendurthi Road Widening',
    category: 'Infrastructure',
    description: 'Infrastructure upgrade improves connectivity to peripheral residential layouts.',
    image: IMAGE_D,
    location: 'Pendurthi',
    publishedDate: 'Published 3 weeks ago',
  },
];

export const VILLAGE_ADS_LISTING = [
  {
    id: 'village-anandapuram-plots',
    title: 'Anandapuram Open Plots',
    category: 'Plots',
    description: 'DTCP approved open plots with registration support near Anandapuram corridor.',
    image: IMAGE_A,
    location: 'Anandapuram',
    publishedDate: 'Published 1 day ago',
  },
  {
    id: 'village-madhurawada-farm',
    title: 'Madhurawada Farm Lands',
    category: 'Farm Land',
    description: 'Agricultural land listings with clear title and village road access.',
    image: IMAGE_A,
    location: 'Madhurawada',
    publishedDate: 'Published 3 days ago',
  },
  {
    id: 'village-kommadi-layout',
    title: 'Kommadi Layout Promotion',
    category: 'Layout',
    description: 'Premium gated community layout plots with amenities and wide roads.',
    image: IMAGE_C,
    location: 'Kommadi',
    publishedDate: 'Published 4 days ago',
  },
  {
    id: 'village-pendurthi-builder',
    title: 'Pendurthi Local Builders',
    category: 'Business',
    description: 'Trusted local builders offering residential construction in Pendurthi area.',
    image: IMAGE_D,
    location: 'Pendurthi',
    publishedDate: 'Published 5 days ago',
  },
  {
    id: 'village-yendada-plots',
    title: 'Yendada Layout Plots',
    category: 'Plots',
    description: 'Residential plots with VMRDA alignment and clear documentation.',
    image: IMAGE_B,
    location: 'Yendada',
    publishedDate: 'Published 1 week ago',
  },
  {
    id: 'village-arilova-farm',
    title: 'Arilova Farm Land',
    category: 'Farm Land',
    description: 'Fertile agricultural parcels with borewell access and road frontage.',
    image: IMAGE_A,
    location: 'Arilova',
    publishedDate: 'Published 1 week ago',
  },
  {
    id: 'village-gajuwaka-business',
    title: 'Gajuwaka Local Business',
    category: 'Business',
    description: 'Local business promotions for property-related services in Gajuwaka.',
    image: IMAGE_D,
    location: 'Gajuwaka',
    publishedDate: 'Published 2 weeks ago',
  },
  {
    id: 'village-rushikonda-layout',
    title: 'Rushikonda Hill Layout',
    category: 'Layout',
    description: 'Hill-view layout plots with internal roads and drainage completed.',
    image: IMAGE_C,
    location: 'Rushikonda',
    publishedDate: 'Published 2 weeks ago',
  },
  {
    id: 'village-bheemili-plots',
    title: 'Bheemili Open Plots',
    category: 'Plots',
    description: 'Coastal corridor open plots with layout approval and registration support.',
    image: IMAGE_B,
    location: 'Bheemunipatnam',
    publishedDate: 'Published 3 weeks ago',
  },
];

export const GENERAL_ADS_LISTING = [
  {
    id: 'general-home-loan',
    title: 'Home Loan Assistance',
    category: 'Bank',
    description: 'Compare home loan offers from leading banks and NBFC partners.',
    image: IMAGE_B,
    location: 'Visakhapatnam',
    publishedDate: 'Published 2 days ago',
  },
  {
    id: 'general-interior-design',
    title: 'Interior Design Studio',
    category: 'Interior',
    description: 'Residential and commercial interior design with turnkey execution.',
    image: IMAGE_C,
    location: 'GVMC Area',
    publishedDate: 'Published 4 days ago',
  },
  {
    id: 'general-construction-materials',
    title: 'Construction Materials',
    category: 'Materials',
    description: 'Cement, steel, and building supplies with delivery across Vizag.',
    image: IMAGE_A,
    location: 'Visakhapatnam',
    publishedDate: 'Published 5 days ago',
  },
  {
    id: 'general-legal-services',
    title: 'Legal Documentation',
    category: 'Legal',
    description: 'Sale deeds, encumbrance certificates, and property registration support.',
    image: IMAGE_D,
    location: 'Visakhapatnam',
    publishedDate: 'Published 1 week ago',
  },
  {
    id: 'general-architect-services',
    title: 'Architect Services',
    category: 'Interior',
    description: 'Licensed architects for residential layouts and commercial buildings.',
    image: IMAGE_C,
    location: 'VMRDA Area',
    publishedDate: 'Published 1 week ago',
  },
  {
    id: 'general-builder-promo',
    title: 'Builder Promotion',
    category: 'Materials',
    description: 'Trusted builders offering turnkey construction packages.',
    image: IMAGE_A,
    location: 'Visakhapatnam',
    publishedDate: 'Published 2 weeks ago',
  },
  {
    id: 'general-loan-consult',
    title: 'Loan Consultation',
    category: 'Bank',
    description: 'Expert guidance for plot loans, home loans, and construction finance.',
    image: IMAGE_B,
    location: 'Andhra Pradesh',
    publishedDate: 'Published 2 weeks ago',
  },
  {
    id: 'general-structural-engineer',
    title: 'Structural Engineering',
    category: 'Legal',
    description: 'Structural design and certification for residential projects.',
    image: IMAGE_D,
    location: 'Visakhapatnam',
    publishedDate: 'Published 3 weeks ago',
  },
  {
    id: 'general-drone-survey',
    title: 'Drone Survey Services',
    category: 'Materials',
    description: 'DGPS and drone survey services for land verification and mapping.',
    image: IMAGE_A,
    location: 'GVMC & VMRDA',
    publishedDate: 'Published 3 weeks ago',
  },
];

/** Homepage feed previews — first four items per category. */
export const LATEST_UPDATES = LATEST_ADS_LISTING.slice(0, 4);
export const VILLAGE_ADS = VILLAGE_ADS_LISTING.slice(0, 4);
export const GENERAL_ADS = GENERAL_ADS_LISTING.slice(0, 4);
