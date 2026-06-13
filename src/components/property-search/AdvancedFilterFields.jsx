import { AdvancedFilterPanel } from './AdvancedFilterPanel';
import { getAdvancedFilterProps } from './getAdvancedFilterProps';

/** @deprecated Use AdvancedFilterPanel */
export function AdvancedFilterFields({ search }) {
  return <AdvancedFilterPanel {...getAdvancedFilterProps(search)} />;
}

export { AdvancedFilterPanel };

/** @deprecated Use AdvancedFilterPanel */
export { AdvancedFilterPanel as AdvancedSearchPanel } from './AdvancedFilterPanel';
