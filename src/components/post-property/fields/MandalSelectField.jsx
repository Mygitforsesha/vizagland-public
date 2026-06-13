import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { villageData } from '@/lib/searchData';
import { fromEmptySelectValue, toEmptySelectValue, withAllOption } from './selectFieldUtils';

const defaultMandalOptions = withAllOption(
  ['All', ...new Set(villageData.map((village) => village.mandal))],
  'All Mandals',
);

export default function MandalSelectField({
  value,
  onValueChange,
  options = defaultMandalOptions,
  placeholder = 'Select Mandal',
  className,
  allowAll = true,
}) {
  return (
    <PropertyTypeSelectField
      label="Mandal"
      placeholder={placeholder}
      value={allowAll ? toEmptySelectValue(value) : value || ''}
      onValueChange={(next) =>
        onValueChange(fromEmptySelectValue(next, { allValue: allowAll ? 'All' : '' }))
      }
      options={options}
      className={className}
    />
  );
}
