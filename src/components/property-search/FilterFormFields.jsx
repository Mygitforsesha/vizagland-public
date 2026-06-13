import { SidebarFilterFields } from './SidebarFilterFields';
import { AdvancedFilterPanel } from './AdvancedFilterPanel';
import { getSidebarFilterProps } from './getSidebarFilterProps';
import { getAdvancedFilterProps } from './getAdvancedFilterProps';

export { FacingCheckboxes } from './FacingCheckboxes';

/**
 * Full filter form — sidebar essentials plus advanced sections.
 */
export function FilterFormFields({ search, showExtended = true }) {
  return (
    <div className="space-y-6">
      <SidebarFilterFields {...getSidebarFilterProps(search)} />
      {showExtended && <AdvancedFilterPanel {...getAdvancedFilterProps(search)} />}
    </div>
  );
}
