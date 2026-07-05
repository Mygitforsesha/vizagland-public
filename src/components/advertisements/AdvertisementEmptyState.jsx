import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function AdvertisementEmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-12 text-center">
      <p className="text-base font-semibold text-gray-800">No Advertisements Found</p>
      <p className="mt-2 text-sm text-gray-500">
        There are currently no advertisements available in this category.
      </p>
      <Link
        to={ROUTES.home}
        className="mt-5 inline-flex h-10 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-primary no-underline hover:border-primary"
      >
        Back to Home
      </Link>
    </div>
  );
}
