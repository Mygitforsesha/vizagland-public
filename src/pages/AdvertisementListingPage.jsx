import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AdvertisementEmptyState from '@/components/advertisements/AdvertisementEmptyState';
import AdvertisementGrid from '@/components/advertisements/AdvertisementGrid';
import AdvertisementPagination from '@/components/advertisements/AdvertisementPagination';
import Breadcrumb, { buildAdvertisementBreadcrumb } from '@/components/advertisements/Breadcrumb';
import { ROUTES } from '@/constants/routes';
import {
  getAdCategoryConfig,
  paginateItems,
} from '@/lib/advertisements/advertisementCategories';
import { getAdvertisementsByCategory } from '@/lib/advertisements/getAdvertisementsByCategory';

export function AdvertisementListingPage() {
  const { category = '' } = useParams();
  const categoryConfig = getAdCategoryConfig(category);
  const [currentPage, setCurrentPage] = useState(1);

  const allAds = useMemo(
    () => (categoryConfig ? getAdvertisementsByCategory(category) : []),
    [category, categoryConfig],
  );

  const { items: pagedAds, totalPages, page } = useMemo(
    () => paginateItems(allAds, currentPage),
    [allAds, currentPage],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, category]);

  if (!categoryConfig) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const breadcrumbItems = buildAdvertisementBreadcrumb(categoryConfig.breadcrumbLabel);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary sm:text-3xl">{categoryConfig.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{categoryConfig.subtitle}</p>
      </div>

      {allAds.length === 0 ? (
        <AdvertisementEmptyState />
      ) : (
        <>
          <AdvertisementGrid items={pagedAds} />
          <AdvertisementPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export function AdvertisementDetailsPage() {
  const { category = '', adId = '' } = useParams();
  const categoryConfig = getAdCategoryConfig(category);
  const ads = useMemo(
    () => (categoryConfig ? getAdvertisementsByCategory(category) : []),
    [category, categoryConfig],
  );
  const ad = ads.find((item) => item.id === adId);

  if (!categoryConfig || !ad) {
    return <Navigate to={categoryConfig ? `/ads/${category}` : ROUTES.home} replace />;
  }

  const breadcrumbItems = [
    ...buildAdvertisementBreadcrumb(categoryConfig.breadcrumbLabel).slice(0, -1),
    { label: categoryConfig.breadcrumbLabel, href: `/ads/${category}` },
    { label: ad.title },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <Breadcrumb items={breadcrumbItems} />

      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img src={ad.image} alt="" className="h-48 w-full object-cover sm:h-56" />
        <div className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-accent">{ad.category}</p>
          <h1 className="mt-2 text-xl font-extrabold text-primary sm:text-2xl">{ad.title}</h1>
          {ad.location ? <p className="mt-2 text-sm text-gray-500">{ad.location}</p> : null}
          {ad.publishedDate ? <p className="mt-1 text-xs text-gray-400">{ad.publishedDate}</p> : null}
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{ad.description}</p>
        </div>
      </article>

      <div className="mt-6">
        <Link
          to={`/ads/${category}`}
          className="text-sm font-semibold text-primary no-underline hover:underline"
        >
          Back to {categoryConfig.title}
        </Link>
      </div>
    </div>
  );
}
