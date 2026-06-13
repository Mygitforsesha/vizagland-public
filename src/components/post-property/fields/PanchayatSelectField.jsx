import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { villageData } from '@/lib/searchData';
import { fromEmptySelectValue, toEmptySelectValue, withAllOption } from './selectFieldUtils';

const defaultPanchayatOptions = withAllOption(
  ['All', ...new Set(villageData.map((village) => village.panchayati))],
  'All Panchayats',
);

export default function PanchayatSelectField({
  value,
  onValueChange,
  options = defaultPanchayatOptions,
  placeholder = 'Select Panchayat',
  className,
  allowAll = true,
}) {
  return (
    <PropertyTypeSelectField
      label="Panchayat"
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
