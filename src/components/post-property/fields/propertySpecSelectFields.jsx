import {
  balconiesOptions,
  bathroomsOptions,
  bedRoomsOptions,
  floorNumberOptions,
  furnishingOptions,
  parkingOptions,
  propertyAgeOptions,
  totalFloorsOptions,
} from '@/lib/post-property/formOptions';
import FilterSelectField from './FilterSelectField';

function createSpecSelectField({
  label,
  defaultOptions,
  placeholder,
  allLabel,
}) {
  return function SpecSelectField({
    value,
    onValueChange,
    options = defaultOptions,
    allowAll = false,
    className,
    hideLabel = false,
    placeholder: placeholderOverride,
    ...rest
  }) {
    return (
      <FilterSelectField
        label={label}
        hideLabel={hideLabel}
        placeholder={placeholderOverride ?? (allowAll ? allLabel : placeholder)}
        value={value}
        onValueChange={onValueChange}
        options={options}
        allowAll={allowAll}
        allLabel={allLabel}
        className={className}
        {...rest}
      />
    );
  };
}

export const PropertyAgeSelectField = createSpecSelectField({
  label: 'Property Age',
  defaultOptions: propertyAgeOptions,
  placeholder: 'Select',
  allLabel: 'Any Age',
});

export const FurnishingSelectField = createSpecSelectField({
  label: 'Furnishing',
  defaultOptions: furnishingOptions,
  placeholder: 'Select',
  allLabel: 'Any Furnishing',
});

export const BedroomsSelectField = createSpecSelectField({
  label: 'Bed Rooms',
  defaultOptions: bedRoomsOptions,
  placeholder: 'Select',
  allLabel: 'Any',
});

export const BathroomsSelectField = createSpecSelectField({
  label: 'Bathrooms',
  defaultOptions: bathroomsOptions,
  placeholder: 'Select',
  allLabel: 'Any',
});

export const BalconiesSelectField = createSpecSelectField({
  label: 'Balconies',
  defaultOptions: balconiesOptions,
  placeholder: 'Select',
  allLabel: 'Any',
});

export const ParkingSelectField = createSpecSelectField({
  label: 'Parking',
  defaultOptions: parkingOptions,
  placeholder: 'Select',
  allLabel: 'Any',
});

export const TotalFloorsSelectField = createSpecSelectField({
  label: 'Total Floors',
  defaultOptions: totalFloorsOptions,
  placeholder: 'Select',
  allLabel: 'Any',
});

export const FloorNumberSelectField = createSpecSelectField({
  label: 'Floor Number',
  defaultOptions: floorNumberOptions,
  placeholder: 'Select',
  allLabel: 'Any',
});
