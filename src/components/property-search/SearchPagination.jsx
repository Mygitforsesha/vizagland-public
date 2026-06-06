import { ChevronLeft, ChevronRight } from 'lucide-react';

export function SearchPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="Property search pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} aria-hidden />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg text-sm font-semibold border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            currentPage === page
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Next page"
      >
        <ChevronRight size={18} aria-hidden />
      </button>
    </nav>
  );
}
