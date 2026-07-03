import { useCallback, useMemo, useState } from 'react';
import { INITIAL_POST_PROPERTY_FORM_STATE } from './formDefaults';
import { getDynamicAreaUnitOptions } from './formOptions';

/**
 * Manages Post Property form state.
 * Returns a flat formState object consumed by buildPropertyPayload().
 */
export function usePostPropertyForm() {
  const [formState, setFormState] = useState(INITIAL_POST_PROPERTY_FORM_STATE);

  const updateField = useCallback((fieldName, value) => {
    setFormState((previousState) => {
      const nextState = {
        ...previousState,
        [fieldName]: value,
      };

      if (fieldName === 'propertyCategory' && value !== previousState.propertyCategory) {
        nextState.areaUnit = '';
      }

      return nextState;
    });
  }, []);

  const getFormState = useCallback(() => formState, [formState]);

  const dynamicAreaUnitOptions = useMemo(
    () => getDynamicAreaUnitOptions(formState),
    [formState],
  );

  return {
    formState,
    updateField,
    getFormState,
    dynamicAreaUnitOptions,
  };
}
