import { Plus, Trash2 } from 'lucide-react';
import FormTextField from '@/components/post-property/FormTextField';
import { formFieldCompactClass, formHintClass } from '@/components/post-property/formStyles';
import ThemedSearchableDropdown, {
  VILLAGE_DROPDOWN_TRIGGER_CLASS,
} from '@/components/shared/ThemedSearchableDropdown';
import { registrationTypeOptions } from '@/lib/registration/registrationTypeOptions';
import { cn } from '@/lib/utils';

function sanitizePhoneInput(value) {
  return value.replace(/\D/g, '').slice(0, 10);
}

export default function PropertyContactNumbersSection({
  contacts,
  updateField,
  validationErrors = {},
  showValidation = false,
}) {
  function updateContactRow(index, field, value) {
    const nextContacts = contacts.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row,
    );
    updateField('propertyContactNumbers', nextContacts);
  }

  function addContactRow() {
    updateField('propertyContactNumbers', [
      ...contacts,
      { registrationType: '', phoneNumber: '' },
    ]);
  }

  function removeContactRow(index) {
    if (index === 0) return;
    updateField(
      'propertyContactNumbers',
      contacts.filter((_, rowIndex) => rowIndex !== index),
    );
  }

  return (
    <div id="property-contact-numbers" className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
      {contacts.map((row, index) => {
        const rowErrors = validationErrors[index] ?? {};
        const showPhoneError = showValidation && Boolean(rowErrors.phoneNumber);

        return (
          <div
            key={`contact-row-${index}`}
            className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-start"
          >
            <div className={formFieldCompactClass}>
              <ThemedSearchableDropdown
                id={`property-contact-registration-type-${index}`}
                ariaLabel="Registration Type"
                hideLabel
                value={row.registrationType}
                onValueChange={(value) => updateContactRow(index, 'registrationType', value)}
                options={registrationTypeOptions}
                placeholder="Select Registration Type"
                searchPlaceholder="Search registration type..."
                triggerClassName={VILLAGE_DROPDOWN_TRIGGER_CLASS}
                className="w-full"
              />
            </div>

            <div>
              <FormTextField
                hideLabel
                id={`property-contact-phone-${index}`}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]*"
                value={row.phoneNumber}
                onChange={(event) =>
                  updateContactRow(index, 'phoneNumber', sanitizePhoneInput(event.target.value))
                }
                placeholder="Enter 10 Digit Mobile Number"
                hasError={showPhoneError}
              />
              {showPhoneError ? (
                <p className={cn(formHintClass, 'text-red-500/85')} role="alert">
                  {rowErrors.phoneNumber}
                </p>
              ) : null}
            </div>

            <div className="flex justify-end sm:justify-center sm:pt-0.5">
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => removeContactRow(index)}
                  aria-label={`Remove contact row ${index + 1}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              ) : (
                <span className="hidden h-10 w-10 sm:block" aria-hidden />
              )}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addContactRow}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border-0 bg-transparent px-0 py-1 text-sm font-semibold text-primary transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
      >
        <Plus className="size-4" aria-hidden />
        Add Another Contact
      </button>
    </div>
  );
}
