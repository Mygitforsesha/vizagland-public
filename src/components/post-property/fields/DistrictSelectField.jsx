import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { villageData } from '@/lib/searchData';
import { fromEmptySelectValue, toEmptySelectValue, withAllOption } from './selectFieldUtils';

const defaultDistrictOptions = withAllOption(
  ['All', ...new Set(villageData.map((village) => village.district))],
  'All Districts',
);

export default function DistrictSelectField({
  value,
  onValueChange,
  options = defaultDistrictOptions,
  placeholder = 'Select District',
  className,
  allowAll = true,
}) {
  return (
    <PropertyTypeSelectField
      label="District"
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
