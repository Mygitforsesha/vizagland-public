import PropertyTypeSelectField from '../PropertyTypeSelectField';
import { approvalOptions } from '@/lib/post-property/formOptions';
import FilterSelectField from './FilterSelectField';

export default function ApprovalField({
  value,
  onValueChange,
  label = 'Approval Authority',
  placeholder = 'Select Approval Type',
  options = approvalOptions,
  className,
  allowAll = false,
  allLabel = 'Any Approval',
}) {
  return (
    <FilterSelectField
      label={label}
      placeholder={allowAll ? allLabel : placeholder}
      value={value}
      onValueChange={onValueChange}
      options={options}
      allowAll={allowAll}
      allLabel={allLabel}
      className={className}
    />
  );
}
