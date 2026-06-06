import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, TrendingUp, User } from 'lucide-react';

const items = [
  { to: '/search', label: 'Search', icon: Search },
  { to: '/listings', label: 'Saved', icon: Heart },
  { to: '/', label: 'Invest', icon: TrendingUp },
  { to: '/login', label: 'Profile', icon: User },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb"
      aria-label="Mobile navigation"
    >
      <ul className="flex list-none m-0 p-0">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            location.pathname === to ||
            (to === '/search' && location.pathname.startsWith('/search'));

          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium no-underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                  active ? 'text-accent' : 'text-gray-500'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 2}
                  aria-hidden
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}