import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 ? <ChevronRight size={14} className="shrink-0 text-gray-300" /> : null}
              {isLast || !item.href ? (
                <span className={isLast ? 'font-semibold text-primary' : ''}>{item.label}</span>
              ) : (
                <Link to={item.href} className="text-gray-500 no-underline hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function buildAdvertisementBreadcrumb(categoryLabel) {
  return [
    { label: 'Home', href: ROUTES.home },
    { label: 'Advertisements' },
    { label: categoryLabel },
  ];
}
