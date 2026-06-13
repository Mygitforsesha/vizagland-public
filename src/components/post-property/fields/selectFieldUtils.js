/** Shared helpers for select field components. */
export function withAllOption(items, allLabel) {
  return items.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return item;
    }

    return {
      label: item === 'All' ? allLabel : item,
      value: item,
    };
  });
}

/** Normalizes empty / "All" values for clearable selects. */
export function toEmptySelectValue(value, allValue = 'All') {
  if (!value || value === allValue) return '';
  return value;
}

/** Maps cleared select back to "All" or empty string. */
export function fromEmptySelectValue(value, { allValue = 'All', emptyValue = '' } = {}) {
  if (!value) return allValue === '' ? emptyValue : allValue;
  return value;
}
