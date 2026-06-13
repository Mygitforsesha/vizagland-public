import PropertyTypeSelectField from '../PropertyTypeSelectField';

export default function BudgetSelectField({
  value,
  onValueChange,
  options,
  placeholder = 'Any Budget',
  className,
}) {
  return (
    <PropertyTypeSelectField
      label="Budget"
      placeholder={placeholder}
      value={value === 0 || value === '' ? '' : String(value)}
      onValueChange={(next) => onValueChange(next ? parseInt(next, 10) : 0)}
      options={options}
      className={className}
    />
  );
}
