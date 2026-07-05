export default function AdvertisementPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`min-w-[2.25rem] rounded border px-2 py-1.5 text-sm font-medium ${
            pageNumber === page
              ? 'border-primary bg-primary text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:border-primary'
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
