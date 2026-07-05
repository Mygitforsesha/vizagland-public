import { useMemo } from 'react';
import ThemedSearchableDropdown, {
  VILLAGE_DROPDOWN_TRIGGER_CLASS,
} from '@/components/shared/ThemedSearchableDropdown';
import { ALL_MANDALS } from './browseAreaData';

export default function MandalFilter({ value, options, onChange }) {
  const mandalOptions = useMemo(
    () => [
      { value: ALL_MANDALS, label: ALL_MANDALS },
      ...options.map((mandal) => ({ value: mandal, label: mandal })),
    ],
    [options],
  );

  return (
    <ThemedSearchableDropdown
      id="browse-mandal"
      ariaLabel="Select Mandal"
      label="Select Mandal"
      value={value}
      onValueChange={onChange}
      options={mandalOptions}
      placeholder={ALL_MANDALS}
      searchPlaceholder="Search mandal..."
      emptyMessage="No Mandals Found"
      autoFocusSearch
      triggerClassName={VILLAGE_DROPDOWN_TRIGGER_CLASS}
      wrapperClassName="relative flex min-h-0 w-full min-w-0 flex-col sm:flex-1 lg:w-52 lg:flex-none"
      labelClassName="mb-1 block text-xs font-medium text-gray-600"
    />
  );
}
