import { FacingFilterField } from './FacingFilterField';

/** @deprecated Use FacingFilterField */
export function FacingCheckboxes({ selected, onChange }) {
  return <FacingFilterField value={selected} onChange={onChange} />;
}

export { FacingFilterField };
