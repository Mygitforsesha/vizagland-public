import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check, CheckCircle, ChevronDown, Shield, Users, Headphones, Eye, EyeOff, User, Phone, Mail, MapPin, X, Plus, ArrowRight, Calendar, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ThemedSearchableDropdown, {
  ThemedDropdown,
  VILLAGE_DROPDOWN_TRIGGER_CLASS,
} from '@/components/shared/ThemedSearchableDropdown';
import { ROUTES } from '@/constants/routes';
import {
  registrationTypeOptions,
  registrationTypeRegistry,
} from '@/lib/registration/registrationTypeOptions';
import { captureUserLocation } from '@/services/locationService';

const REGISTER_API_URL = 'https://api.vizagland.com/api/auth/register';
const TOAST_DISPLAY_MS = 2000;

const EMPTY_REGISTRATION_TYPE_STATE = {
  membership: '',
  roles: [],
  professional: [],
  media: [],
  socialMedia: [],
  other: [],
};

function getSelectedRegistrationTypeValue(formData) {
  if (formData.membership) return formData.membership;

  for (const key of ['roles', 'professional', 'media', 'socialMedia', 'other']) {
    const selectedValue = formData[key]?.[0];
    if (selectedValue) return selectedValue;
  }

  return '';
}

function applyRegistrationTypeSelection(previousState, value) {
  const nextState = {
    ...previousState,
    ...EMPTY_REGISTRATION_TYPE_STATE,
  };

  if (!value) {
    return nextState;
  }

  const match = registrationTypeRegistry.get(value);
  if (!match) {
    return nextState;
  }

  if (match.stateKey === 'membership') {
    nextState.membership = value;
  } else {
    nextState[match.stateKey] = [value];
  }

  return nextState;
}

const INITIAL_FORM_DATA = {
  membership: '',
  roles: [],
  professional: [],
  media: [],
  socialMedia: [],
  other: [],
  name: '',
  phoneNumber: '',
  captcha: '',
  acceptedTerms: false,
};

const INITIAL_TOUCHED = {
  roles: false,
  name: false,
  phoneNumber: false,
  captcha: false,
  acceptedTerms: false,
};

const FIELD_ERROR_MESSAGES = {
  roles: 'Please select at least one role.',
  name: 'Full name is required.',
  phoneNumber: 'Please enter a valid 10-digit mobile number.',
  captcha: 'Please enter the correct captcha answer.',
  acceptedTerms: 'Please accept the Terms & Conditions.',
};

const VALIDATION_FIELD_ORDER = [
  'roles',
  'name',
  'phoneNumber',
  'captcha',
  'acceptedTerms'
];
function validateField(field, formData, captchaSum) {
  switch (field) {
    // case 'membership':
    //   return formData.membership ? '' : FIELD_ERROR_MESSAGES.membership;
    case 'roles':
      return hasRegistrationTypeSelection(formData) ? '' : FIELD_ERROR_MESSAGES.roles;
    case 'name':
      return formData.name.trim() ? '' : FIELD_ERROR_MESSAGES.name;
    case 'phoneNumber':
      return formData.phoneNumber.length === 10 ? '' : FIELD_ERROR_MESSAGES.phoneNumber;
    case 'captcha':
      if (!formData.captcha || parseInt(formData.captcha, 10) !== captchaSum) {
        return FIELD_ERROR_MESSAGES.captcha;
      }
      return '';
    case 'acceptedTerms':
      return formData.acceptedTerms ? '' : FIELD_ERROR_MESSAGES.acceptedTerms;
    default:
      return '';
  }
}

function validateAllFields(formData, captchaSum) {
  const errors = {};
  VALIDATION_FIELD_ORDER.forEach(field => {
    const error = validateField(field, formData, captchaSum);
    if (error) errors[field] = error;
  });
  return errors;
}

const NEARBY_LOCATION_OPTIONS = ['Bus Stand', 'Railway Station', 'Highway', 'School', 'Hospital', 'Market', 'Others'];

const FORM_LABEL_CLASS = 'text-[12px] text-gray-500 block mb-1.5';
const FORM_INPUT_CLASS = 'w-full h-10 border-0 border-b-2 border-gray-200 text-[13px] outline-none focus:border-primary bg-transparent placeholder:text-gray-400 transition-colors';
const FORM_FIELD_CLASS = 'flex flex-col';

const VILLAGE_LABEL_CLASS = 'text-[12px] text-gray-500 block mb-1.5 min-h-[2rem] leading-snug';
const VILLAGE_CONTROL_CLASS = 'w-full h-10 border border-gray-200 rounded-lg px-3 text-[13px] outline-none focus:border-primary bg-white transition-colors';
const VILLAGE_INPUT_CLASS = `${VILLAGE_CONTROL_CLASS} placeholder:text-gray-400`;
const VILLAGE_FIELD_CLASS = 'flex flex-col min-w-0';

const REGISTRATION_TYPE_FIELD_CLASS = `${VILLAGE_FIELD_CLASS} h-full`;

const REGISTRATION_TYPE_LABEL_CLASS =
  'mb-2 block min-h-[1rem] px-0 text-[11px] font-bold uppercase leading-tight tracking-wider text-gray-400';

const REGISTRATION_TYPE_ERROR_SLOT_CLASS = 'min-h-[1.125rem]';

const REGISTRATION_TYPE_ERROR_TRIGGER_CLASS =
  'border-gray-200 bg-red-500/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_3px_rgba(239,68,68,0.07)] ring-1 ring-red-500/15';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-red-500/85"
      role="alert"
    >
      <AlertCircle size={13} className="mt-px shrink-0" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

function getAllSelectedTypes(formData) {
  return [
    ...(formData.membership ? [formData.membership] : []),
    ...formData.roles,
    ...formData.professional,
    ...formData.media,
    ...formData.socialMedia,
    ...formData.other.filter(t => t !== 'Others'),
  ];
}

function hasRegistrationTypeSelection(formData) {
  return getAllSelectedTypes(formData).length > 0 || formData.other.includes('Others');
}

function trimString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function toNullableString(value) {
  const trimmed = trimString(value);
  return trimmed === '' ? null : trimmed;
}

function toNullableArray(arr) {
  return arr?.length ? arr : null;
}

const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function parseDobFromParts(day, month, year) {
  if (!trimString(day) || !trimString(month) || !trimString(year)) return null;

  const century = parseInt(year, 10) > 30 ? '19' : '20';
  const fullYear = parseInt(`${century}${year.padStart(2, '0')}`, 10);
  const parsedMonth = parseInt(month, 10) - 1;
  const parsedDay = parseInt(day, 10);

  if (!Number.isFinite(fullYear) || !Number.isFinite(parsedMonth) || !Number.isFinite(parsedDay)) {
    return null;
  }

  const date = new Date(fullYear, parsedMonth, parsedDay);
  if (
    date.getFullYear() !== fullYear
    || date.getMonth() !== parsedMonth
    || date.getDate() !== parsedDay
  ) {
    return null;
  }

  return date;
}

function formatDobDisplay(day, month, year) {
  if (!trimString(day) || !trimString(month) || !trimString(year)) return '';
  return `${day.padStart(2, '0')} / ${month.padStart(2, '0')} / ${year.padStart(2, '0')}`;
}

function dateToDobParts(date) {
  return {
    day: String(date.getDate()),
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear()).slice(-2),
  };
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function getDefaultDobViewDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 25);
  date.setDate(1);
  return startOfDay(date);
}

function getDobYearOptions(currentYear) {
  return Array.from({ length: 101 }, (_, index) => currentYear - index);
}

const CALENDAR_DROPDOWN_TRIGGER_CLASS =
  'h-8 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-2.5 text-[12px] font-semibold text-primary shadow-sm transition-colors hover:border-primary hover:bg-accent-light/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 data-[size=default]:h-8 [&_svg]:text-gray-400 data-[placeholder]:text-gray-400';

function DateOfBirthPicker({ day, month, year, onChange }) {
  const [open, setOpen] = useState(false);
  const selectedDate = parseDobFromParts(day, month, year);
  const [viewDate, setViewDate] = useState(() => selectedDate ?? getDefaultDobViewDate());
  const today = startOfDay(new Date());
  const currentYear = today.getFullYear();
  const minYear = currentYear - 100;
  const yearOptions = getDobYearOptions(currentYear);

  useEffect(() => {
    const parsed = parseDobFromParts(day, month, year);
    if (parsed) {
      setViewDate(parsed);
    }
  }, [day, month, year]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const displayValue = formatDobDisplay(day, month, year);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const canGoPrevious = viewYear > minYear || (viewYear === minYear && viewMonth > 0);
  const canGoNext = viewYear < currentYear
    || (viewYear === currentYear && viewMonth < today.getMonth());

  function clampViewDate(year, month) {
    let nextMonth = month;
    let nextYear = year;

    if (nextYear > currentYear) {
      nextYear = currentYear;
    }
    if (nextYear < minYear) {
      nextYear = minYear;
    }
    if (nextYear === currentYear && nextMonth > today.getMonth()) {
      nextMonth = today.getMonth();
    }

    return new Date(nextYear, nextMonth, 1);
  }

  function handleOpenChange(nextOpen) {
    setOpen(nextOpen);
    if (nextOpen && selectedDate) {
      setViewDate(selectedDate);
    }
  }

  function goToPreviousMonth() {
    if (!canGoPrevious) return;
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  }

  function goToNextMonth() {
    if (!canGoNext) return;
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  }

  function handleMonthChange(nextValue) {
    setViewDate(clampViewDate(viewYear, parseInt(nextValue, 10)));
  }

  function handleYearChange(nextValue) {
    setViewDate(clampViewDate(parseInt(nextValue, 10), viewMonth));
  }

  function handleSelectDay(dayValue) {
    const nextDate = new Date(viewYear, viewMonth, dayValue);
    if (nextDate > today) return;

    onChange(dateToDobParts(nextDate));
    setOpen(false);
  }

  function handleDayKeyDown(event, dayValue) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectDay(dayValue);
    }
  }

  const calendarCells = [];
  for (let index = 0; index < firstWeekday; index += 1) {
    calendarCells.push(null);
  }
  for (let dayValue = 1; dayValue <= daysInMonth; dayValue += 1) {
    calendarCells.push(dayValue);
  }

  const monthOptions = MONTH_LABELS.map((label, monthIndex) => ({
    value: String(monthIndex),
    label,
    disabled: viewYear === currentYear && monthIndex > today.getMonth(),
  }));

  const yearSelectOptions = yearOptions.map((yearOption) => ({
    value: String(yearOption),
    label: String(yearOption),
  }));

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id="register-dob"
          aria-label="Date of Birth"
          aria-expanded={open}
          aria-haspopup="dialog"
          className={`relative w-full max-w-[15rem] sm:max-w-[16.5rem] ${FORM_INPUT_CLASS} pl-0 pr-9 text-left ${displayValue ? 'text-gray-800' : 'text-gray-400'}`}
        >
          <span>{displayValue || 'DD / MM / YY'}</span>
          <Calendar size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[min(calc(100vw-2rem),20rem)] border border-gray-200 bg-white p-3 shadow-lg rounded-xl"
      >
        <div className="mb-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={goToPreviousMonth}
            disabled={!canGoPrevious}
            aria-label="Previous month"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
          >
            <ChevronLeft size={16} aria-hidden />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <ThemedDropdown
              ariaLabel="Select month"
              value={String(viewMonth)}
              onValueChange={handleMonthChange}
              options={monthOptions}
              triggerClassName={CALENDAR_DROPDOWN_TRIGGER_CLASS}
              className="flex-[1.4]"
            />

            <ThemedDropdown
              ariaLabel="Select year"
              value={String(viewYear)}
              onValueChange={handleYearChange}
              options={yearSelectOptions}
              triggerClassName={CALENDAR_DROPDOWN_TRIGGER_CLASS}
              className="flex-1"
            />
          </div>

          <button
            type="button"
            onClick={goToNextMonth}
            disabled={!canGoNext}
            aria-label="Next month"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
          >
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className="py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Choose date of birth">
          {calendarCells.map((dayValue, index) => {
            if (dayValue == null) {
              return <div key={`empty-${index}`} aria-hidden />;
            }

            const cellDate = new Date(viewYear, viewMonth, dayValue);
            const isFuture = cellDate > today;
            const isSelected = selectedDate
              && selectedDate.getFullYear() === viewYear
              && selectedDate.getMonth() === viewMonth
              && selectedDate.getDate() === dayValue;
            const isToday = cellDate.getTime() === today.getTime();

            return (
              <button
                key={`${viewYear}-${viewMonth}-${dayValue}`}
                type="button"
                role="gridcell"
                tabIndex={isSelected ? 0 : -1}
                disabled={isFuture}
                aria-label={`${dayValue} ${MONTH_LABELS[viewMonth]} ${viewYear}`}
                aria-selected={isSelected}
                aria-current={isToday ? 'date' : undefined}
                onClick={() => handleSelectDay(dayValue)}
                onKeyDown={(event) => handleDayKeyDown(event, dayValue)}
                className={`h-9 w-full rounded-lg text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  isSelected
                    ? 'bg-primary text-white'
                    : isFuture
                      ? 'cursor-not-allowed text-gray-300'
                      : isToday
                        ? 'border border-accent text-primary hover:bg-accent-light'
                        : 'text-gray-700 hover:bg-accent-light hover:text-primary'
                }`}
              >
                {dayValue}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function buildDateOfBirth(day, month, year) {
  if (!trimString(day) || !trimString(month) || !trimString(year)) return null;
  const century = parseInt(year, 10) > 30 ? '19' : '20';
  return `${century}${year.padStart(2, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function RegistrationTypeStep({
  formData,
  setFormData,
  onContinue,
  touched,
  step1SubmitAttempted,
  submitAttempted,
  rolesSectionRef,
  onFieldChange,
}) {
  const [customInput, setCustomInput] = useState('');
  const [shakeRolesField, setShakeRolesField] = useState(false);
  const othersSelected = formData.other.includes('Others');
  const customRoles = formData.other.filter(r => r !== 'Others');
  const selectedRegistrationType = getSelectedRegistrationTypeValue(formData);
  const showRolesError =
  (touched.roles || step1SubmitAttempted || submitAttempted) &&
  !hasRegistrationTypeSelection(formData);

  function selectRegistrationType(value) {
    setFormData(prev => {
      const next = applyRegistrationTypeSelection(prev, value);
      onFieldChange('roles', next);
      return next;
    });
  }

  function addCustomRole() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const normalized = trimmed.toLowerCase();
    const allExisting = getAllSelectedTypes(formData).map(s => s.toLowerCase());
    if (allExisting.includes(normalized)) return;
    setFormData(prev => ({ ...prev, other: [...prev.other, trimmed] }));
    setCustomInput('');
  }

  function removeCustomRole(role) {
    setFormData(prev => ({ ...prev, other: prev.other.filter(r => r !== role) }));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); addCustomRole(); }
  }

  function handleContinueClick() {
    if (!hasRegistrationTypeSelection(formData)) {
      setShakeRolesField(true);
      window.setTimeout(() => setShakeRolesField(false), 250);
    }
    onContinue();
  }

  const hasSelection = hasRegistrationTypeSelection(formData);

  return (
    <div className="min-h-screen bg-surface py-6 sm:py-8 px-3 sm:px-4 overflow-x-hidden">
      <div className="max-w-3xl mx-auto w-full min-w-0">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Link to={ROUTES.home} className="inline-flex items-center gap-2 no-underline">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-black text-sm">VL</div>
              <span className="font-bold text-lg text-gray-900">Vizagland Real Estate</span>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">How would you like to register?</h1>
          <p className="text-[13px] text-gray-500">Select your registration type.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</div>
            <span className="text-xs font-semibold text-primary">Select Type</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">2</div>
            <span className="text-xs font-medium text-gray-400">Your Details</span>
          </div>
        </div>

        <div
          ref={rolesSectionRef}
          tabIndex={-1}
          aria-invalid={showRolesError ? true : undefined}
          aria-describedby={showRolesError ? 'roles-error' : undefined}
          onBlur={() => onFieldChange('roles', formData, true)}
          className="w-full min-w-0"
        >
          <div className={shakeRolesField ? 'animate-validation-shake' : undefined}>
            <ThemedSearchableDropdown
              id="registration-type"
              ariaLabel="Registration Type"
              label="Registration Type"
              required
              hasError={showRolesError}
              value={selectedRegistrationType}
              onValueChange={selectRegistrationType}
              options={registrationTypeOptions}
              placeholder="Select Registration Type"
              searchPlaceholder="Search registration type..."
              triggerClassName={VILLAGE_DROPDOWN_TRIGGER_CLASS}
              wrapperClassName={REGISTRATION_TYPE_FIELD_CLASS}
              labelClassName={REGISTRATION_TYPE_LABEL_CLASS}
              className="w-full"
            />
          </div>
          <div className={REGISTRATION_TYPE_ERROR_SLOT_CLASS}>
            <FieldError id="roles-error" message={showRolesError ? FIELD_ERROR_MESSAGES.roles : ''} />
          </div>
        </div>

        {/* Others custom input */}
        {othersSelected && (
          <div className="mt-6 w-full rounded-xl border-2 border-dashed border-gray-200 bg-white p-4 animate-fade-in">
            <label className="text-xs font-semibold text-gray-600 block mb-2">Add custom roles</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a role and press Enter"
                className="flex-1 h-10 border-2 border-gray-200 rounded-lg px-3 text-[13px] outline-none focus:border-primary bg-white placeholder:text-gray-400 transition-colors"
              />
              <button
                type="button"
                onClick={addCustomRole}
                disabled={!customInput.trim()}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold border-0 cursor-pointer hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={14} /> Add
              </button>
            </div>
            {customRoles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {customRoles.map(role => (
                  <span key={role} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {role}
                    <button
                      type="button"
                      onClick={() => removeCustomRole(role)}
                      className="text-primary/60 hover:text-red-600 bg-transparent border-0 cursor-pointer p-0 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Selected summary & Continue */}
        <div className="sticky bottom-4 mt-8 w-full">
            <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg md:flex-row md:items-center md:justify-between">
            {hasSelection ? (
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium text-gray-500">Selected:</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {formData.membership && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">{formData.membership}</span>
                  )}
                  {[
                    ...formData.roles,
                    ...formData.professional,
                    ...formData.media,
                    ...formData.socialMedia,
                  ].map(t => (
                    <span key={t} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">{t}</span>
                  ))}
                  {formData.other.includes('Others') && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">Others</span>
                  )}
                  {customRoles.map(r => (
                    <span key={r} className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">{r}</span>
                  ))}
                </div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={handleContinueClick}
              className={`flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-red-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-800 md:px-6 md:py-3 ${
                hasSelection ? 'w-full md:w-auto' : 'w-full md:ml-auto md:w-auto'
              }`}
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Login link */}
        <div className="text-center mt-6 text-[13px] text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-red-700 font-bold no-underline hover:underline">
            Sign in
          </Link>
        </div>

        <div className="text-center mt-3 text-[13px] text-gray-500">
          <Link to={ROUTES.home} className="font-medium text-gray-600 no-underline hover:text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [step1SubmitAttempted, setStep1SubmitAttempted] = useState(false);

  // const membershipSectionRef = useRef(null);
  const rolesSectionRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const captchaRef = useRef(null);
  const termsRef = useRef(null);
  const pendingScrollFieldRef = useRef(null);

  const fieldRefs = {
    roles: rolesSectionRef,
    name: nameRef,
    phoneNumber: phoneRef,
    captcha: captchaRef,
    acceptedTerms: termsRef,
  };

  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [gender, setGender] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [village, setVillage] = useState('');
  const [nearbyLocation, setNearbyLocation] = useState('');
  const [customNearby, setCustomNearby] = useState('');
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [panchayati, setPanchayati] = useState('');
  const [gvmc, setGvmc] = useState('');
  const [vmrda, setVmrda] = useState('');
  const [regArea, setRegArea] = useState('');
  const [gvmcVmrda, setGvmcVmrda] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaA] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [captchaB] = useState(() => Math.floor(Math.random() * 9) + 1);
  const captchaSum = captchaA + captchaB;

  function updateFieldError(field, data = formData) {
    const error = validateField(field, data, captchaSum);
    setFieldErrors(prev => {
      if (!error) {
        if (!(field in prev)) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return { ...prev, [field]: error };
    });
  }

  function handleFieldChange(field, nextFormData, markTouched = false) {
    if (markTouched) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }

    setFieldErrors(prev => {
      const shouldValidate = markTouched
        || prev[field]
        || touched[field]
        || submitAttempted
        || (field === 'membership' && step1SubmitAttempted);

      if (!shouldValidate) return prev;

      const error = validateField(field, nextFormData, captchaSum);
      if (!error) {
        if (!(field in prev)) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return { ...prev, [field]: error };
    });
  }

  function handleBlur(field) {
    setTouched(prev => ({ ...prev, [field]: true }));
    updateFieldError(field);
  }

  function getVisibleError(field) {
    if (!fieldErrors[field]) return '';
    if (field === 'membership') {
      return (touched.membership || step1SubmitAttempted || submitAttempted) ? fieldErrors[field] : '';
    }
    return (touched[field] || submitAttempted) ? fieldErrors[field] : '';
  }

  function scrollToField(field) {
    if (field === 'membership' && step !== 1) {
      pendingScrollFieldRef.current = 'membership';
      setStep(1);
      return;
    }

    const el = fieldRefs[field]?.current;
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      if (field === 'acceptedTerms') {
        document.getElementById('terms')?.focus();
      } else {
        el.focus?.({ preventScroll: true });
      }
    }, 300);
  }

  function focusFirstInvalidField(errors) {
    const firstInvalid = VALIDATION_FIELD_ORDER.find(field => errors[field]);
    if (firstInvalid) scrollToField(firstInvalid);
  }

  useEffect(() => {
    if (step === 1 && pendingScrollFieldRef.current === 'membership') {
      const el = membershipSectionRef.current;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.focus(), 300);
        pendingScrollFieldRef.current = null;
      }
    }
  }, [step]);

  function handleStep1Continue() {
    setStep1SubmitAttempted(true);
  
    setTouched(prev => ({
      ...prev,
      roles: true,
    }));
  
    const error = validateField('roles', formData, captchaSum);
  
    if (error) {
      setFieldErrors(prev => ({
        ...prev,
        roles: error,
      }));
  
      scrollToField('roles');
      return;
    }
  
    updateFieldError('roles');
  
    setStep(2);
  }
  // Future use: send OTP functionality
  // function handleSendOtp() {
  //   if (formData.phoneNumber.length !== 10) { showToast('Enter a valid 10-digit mobile number first.', 'danger'); return; }
  //   setOtpSent(true);
  //   showToast('OTP sent to +91 ' + formData.phoneNumber, 'success');
  // }

  function handleVerifyOtp() {
    if (otp.length < 4) { showToast('Please enter a valid OTP.', 'danger'); return; }
    setOtpVerified(true);
    showToast('Mobile number verified!', 'success');
  }

  function showToast(msg, type) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), TOAST_DISPLAY_MS);
  }

  function buildRegisterPayload() {
    return {
      user_membership: toNullableString(formData.membership),
      user_roles: toNullableArray(formData.roles),
      user_professional: toNullableArray(formData.professional),
      user_media: toNullableArray(formData.media),
      user_socialMedia: toNullableArray(formData.socialMedia),
      user_other: toNullableArray(formData.other),
      user_full_name: trimString(formData.name),
      user_dateOfBirth: buildDateOfBirth(dobDay, dobMonth, dobYear),
      user_gender: toNullableString(gender),
      user_phone: trimString(formData.phoneNumber),
      user_email: toNullableString(email),
      user_village: toNullableString(village),
      user_nearbyLocation: toNullableString(nearbyLocation),
      user_customNearbyLocation: nearbyLocation === 'Others' ? toNullableString(customNearby) : null,
      user_district: toNullableString(district),
      user_mandal: toNullableString(mandal),
      user_panchayati: toNullableString(panchayati),
      user_gvmcZoneWardNumber: toNullableString(gvmc),
      user_vmrda: toNullableString(vmrda),
      user_registrationArea: toNullableString(regArea),
      user_gvmcVmrda: toNullableString(gvmcVmrda),
      user_password: toNullableString(password),
    };
  }

  function resetForm() {
    setStep(1);
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
    setTouched(INITIAL_TOUCHED);
    setSubmitAttempted(false);
    setStep1SubmitAttempted(false);
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    setGender('');
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setVillage('');
    setNearbyLocation('');
    setCustomNearby('');
    setDistrict('');
    setMandal('');
    setPanchayati('');
    setGvmc('');
    setVmrda('');
    setRegArea('');
    setGvmcVmrda('');
    setShowPassword(false);
    setShowConfirm(false);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitAttempted(true);
    setTouched({
      roles: true,
      name: true,
      phoneNumber: true,
      captcha: true,
      acceptedTerms: true,
    });

    const errors = validateAllFields(formData, captchaSum);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      focusFirstInvalidField(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const locationPayload = await captureUserLocation();
      const payload = {
        ...buildRegisterPayload(),
        ...locationPayload,
      };
      console.log('Register Payload:', payload);

      const response = await axios.post(REGISTER_API_URL, payload);
      console.log('Register Response:', response.data);

      if (response?.data?.status !== 'success') {
        showToast(
          response?.data?.message || 'Registration failed. Please try again.',
          'danger',
        );
        return;
      }

      showToast(
        response?.data?.message || 'Registration successful.',
        'success',
      );
      // Temporary redirect to Home Page — replace with the final post-registration flow when implemented.
      setTimeout(() => {
        navigate(ROUTES.home);
      }, TOAST_DISPLAY_MS);
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      showToast(message, 'danger');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === 1) {
    return (
      <RegistrationTypeStep
        formData={formData}
        setFormData={setFormData}
        onContinue={handleStep1Continue}
        touched={touched}
        step1SubmitAttempted={step1SubmitAttempted}
        submitAttempted={submitAttempted}
        rolesSectionRef={rolesSectionRef}
        onFieldChange={handleFieldChange}
      />
    );
  }

  const nameError = getVisibleError('name');
  const phoneError = getVisibleError('phoneNumber');
  const captchaError = getVisibleError('captcha');
  const termsError = getVisibleError('acceptedTerms');

  const selectedTypeSummary = [
    ...getAllSelectedTypes(formData),
    ...(formData.other.includes('Others') ? ['Others'] : []),
  ];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-3 sm:p-6">
      <div className="flex w-full max-w-[960px] min-h-[600px] bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Left Banner */}
        <div className="hidden md:flex w-[40%] bg-gradient-to-br from-primary to-primary-dark p-6 lg:p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-white/[0.04] -bottom-20 -right-20" />
          <div className="absolute w-[160px] h-[160px] rounded-full bg-accent/10 top-10 right-5" />

          <div className="flex items-center gap-3 relative z-10">
            <Link to={ROUTES.home} className="flex items-center gap-3 no-underline">
              <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-white font-black text-base">VL</div>
              <div>
                <div className="text-white font-bold text-base leading-tight">Vizagland Real Estate</div>
                <div className="text-blue-300 text-[11px]">Visakhapatnam - Verified Properties</div>
              </div>
            </Link>
          </div>

          <div className="relative z-10">
            <h2 className="text-white text-[22px] lg:text-[24px] font-extrabold leading-snug mb-4">
              Join <span className="text-accent">Thousands</span><br />of Happy Users
            </h2>
            <p className="text-blue-300 text-[13px] leading-relaxed mb-5">
              Create your account to access verified listings, save favorites, and connect with trusted agents.
            </p>
            <ul className="space-y-2.5">
              {[
                { icon: CheckCircle, text: 'Free Account - No hidden charges' },
                { icon: Shield, text: 'Verified & Secure Platform' },
                { icon: Users, text: 'Connect with Trusted Agents' },
                { icon: Headphones, text: '24x7 Support: 96181 70406 ,  60393 80406' },
              ].map(item => (
                <li key={item.text} className="flex items-center gap-2.5 text-blue-200 text-[13px]">
                  <item.icon size={15} className="text-accent flex-shrink-0" /> {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            {/* Selected types summary */}
            <div className="mb-4">
              <p className="text-blue-300 text-[11px] mb-1.5">Registering as:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedTypeSummary.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-white/10 text-blue-200 text-[10px] font-medium rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="w-full border border-white/25 text-white text-[13px] font-semibold py-2.5 rounded-lg bg-transparent cursor-pointer hover:bg-white/10 transition-colors"
            >
              Change Selection
            </button>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 p-5 sm:p-8 lg:p-10 flex flex-col justify-center overflow-y-auto">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center">
                <CheckCircle size={13} />
              </div>
              <span className="text-[11px] font-medium text-green-600">Type Selected</span>
            </div>
            <div className="w-6 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">2</div>
              <span className="text-[11px] font-semibold text-primary">Your Details</span>
            </div>
          </div>

          <h2 className="text-[20px] sm:text-[22px] font-extrabold text-gray-900 mb-1">Create Account</h2>
          <p className="text-[13px] text-gray-500 mb-5">Fill in your details to complete registration.</p>

          {/* Mobile selected types */}
          <div className="md:hidden flex flex-wrap gap-1.5 mb-4 p-3 bg-surface border border-gray-200 rounded-lg">
            <span className="text-[11px] text-gray-500 font-medium w-full mb-1">Registering as:</span>
            {selectedTypeSummary.map(t => (
              <span key={t} className="px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">{t}</span>
            ))}
            <button onClick={() => setStep(1)} className="text-[11px] text-red-600 font-medium bg-transparent border-0 cursor-pointer ml-auto">Change</button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-name" className={FORM_LABEL_CLASS}>Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={nameRef}
                  id="register-name"
                  type="text"
                  value={formData.name}
                  onChange={e => {
                    const next = { ...formData, name: e.target.value };
                    setFormData(next);
                    handleFieldChange('name', next);
                  }}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your full name"
                  aria-invalid={nameError ? true : undefined}
                  aria-describedby={nameError ? 'name-error' : undefined}
                  className={`${FORM_INPUT_CLASS} pl-6 ${nameError ? 'border-red-500 bg-red-50' : ''}`}
                />
              </div>
              <FieldError id="name-error" message={nameError} />
            </div>

            {/* Date of Birth */}
            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-dob" className={FORM_LABEL_CLASS}>Date of Birth (DD / MM / YY)</label>
              <DateOfBirthPicker
                day={dobDay}
                month={dobMonth}
                year={dobYear}
                onChange={({ day, month, year }) => {
                  setDobDay(day);
                  setDobMonth(month);
                  setDobYear(year);
                }}
              />
            </div>

            {/* Gender */}
            <div className={FORM_FIELD_CLASS}>
              <label className={FORM_LABEL_CLASS}>Gender</label>
              <div className="grid grid-cols-2 gap-3 w-full max-w-[15rem] sm:max-w-[16.5rem]" role="radiogroup" aria-label="Gender">
                {(['Male', 'Female']).map(g => (
                  <button
                    key={g}
                    type="button"
                    role="radio"
                    aria-checked={gender === g}
                    onClick={() => setGender(g)}
                    className={`flex items-center justify-center gap-2 h-10 w-full rounded-lg border-2 text-[13px] font-medium cursor-pointer transition-colors ${
                      gender === g
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center ${gender === g ? 'border-primary' : 'border-gray-300'}`}>
                      {gender === g && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-phone" className={FORM_LABEL_CLASS}>Mobile Number</label>
              <div className="flex items-end gap-3">
                <div className="relative flex items-center flex-1">
                  <Phone size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[13px] text-gray-500">+91</span>
                  <input
                    ref={phoneRef}
                    id="register-phone"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={e => {
                      const next = { ...formData, phoneNumber: e.target.value.replace(/\D/g, '') };
                      setFormData(next);
                      setOtpSent(false);
                      setOtpVerified(false);
                      handleFieldChange('phoneNumber', next);
                    }}
                    onBlur={() => handleBlur('phoneNumber')}
                    maxLength={10}
                    placeholder="10-digit mobile"
                    aria-invalid={phoneError ? true : undefined}
                    aria-describedby={phoneError ? 'phone-error' : undefined}
                    className={`${FORM_INPUT_CLASS} pl-16 ${phoneError ? 'border-red-500 bg-red-50' : ''}`}
                  />
                </div>
                {/* Future use: OTP verification button */}
                {/* {!otpVerified && (
                  <button type="button" onClick={handleSendOtp} disabled={formData.phoneNumber.length !== 10} className="text-[11px] sm:text-[12px] font-semibold text-primary border border-primary rounded-md px-2.5 sm:px-3 py-1.5 bg-transparent cursor-pointer hover:bg-primary/5 transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed">
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                )} */}
                {otpVerified && (
                  <span className="flex items-center gap-1 text-green-600 text-[12px] font-semibold whitespace-nowrap">
                    <CheckCircle size={14} /> Verified
                  </span>
                )}
              </div>
              {otpSent && !otpVerified && (
                <div className="flex items-end gap-3 mt-3 animate-fade-in">
                  <div className="flex-1">
                    <label className={`${FORM_LABEL_CLASS} text-[11px]`}>Enter OTP</label>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} maxLength={6} placeholder="Enter 4-6 digit OTP" className={`${FORM_INPUT_CLASS} tracking-widest font-mono`} />
                  </div>
                  <button type="button" onClick={handleVerifyOtp} disabled={otp.length < 4} className="h-10 text-[13px] font-semibold text-white bg-primary rounded-lg px-3 sm:px-4 border-0 cursor-pointer hover:bg-primary-dark transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed">
                    Verify
                  </button>
                </div>
              )}
              <FieldError id="phone-error" message={phoneError} />
            </div>

            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-email" className={FORM_LABEL_CLASS}>Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <Mail size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="register-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className={`${FORM_INPUT_CLASS} pl-6`} />
              </div>
            </div>

            {/* Village Details */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-primary text-white text-[13px] font-bold px-4 py-2.5 flex items-center gap-2">
                <MapPin size={14} /> Village Details
              </div>
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-village" className={VILLAGE_LABEL_CLASS}>Village</label>
                    <input id="register-village" type="text" value={village} onChange={e => setVillage(e.target.value)} placeholder="Enter village name" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-nearby-location" className={VILLAGE_LABEL_CLASS}>Nearby Location / Landmark</label>
                    <ThemedDropdown
                      id="register-nearby-location"
                      ariaLabel="Nearby Location / Landmark"
                      value={nearbyLocation}
                      onValueChange={setNearbyLocation}
                      placeholder="Nearby Location"
                      triggerClassName={VILLAGE_DROPDOWN_TRIGGER_CLASS}
                      options={NEARBY_LOCATION_OPTIONS.map((location) => ({
                        value: location,
                        label: location,
                      }))}
                    />
                    {nearbyLocation === 'Others' && (
                      <div className="mt-3 animate-fade-in">
                        <label htmlFor="register-custom-nearby" className={VILLAGE_LABEL_CLASS}>Add Nearby Location</label>
                        <input id="register-custom-nearby" type="text" value={customNearby} onChange={e => setCustomNearby(e.target.value)} placeholder="Enter nearby location" className={VILLAGE_INPUT_CLASS} />
                      </div>
                    )}
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-district" className={VILLAGE_LABEL_CLASS}>District</label>
                    <input id="register-district" type="text" value={district} onChange={e => setDistrict(e.target.value)} placeholder="Enter district" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-mandal" className={VILLAGE_LABEL_CLASS}>Mandal</label>
                    <input id="register-mandal" type="text" value={mandal} onChange={e => setMandal(e.target.value)} placeholder="Enter mandal" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-panchayati" className={VILLAGE_LABEL_CLASS}>Panchayati</label>
                    <input id="register-panchayati" type="text" value={panchayati} onChange={e => setPanchayati(e.target.value)} placeholder="Enter panchayati" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-gvmc" className={VILLAGE_LABEL_CLASS}>GVMC Zone, Ward Number</label>
                    <input id="register-gvmc" type="text" value={gvmc} onChange={e => setGvmc(e.target.value)} placeholder="Zone, ward number" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-vmrda" className={VILLAGE_LABEL_CLASS}>VMRDA</label>
                    <input id="register-vmrda" type="text" value={vmrda} onChange={e => setVmrda(e.target.value)} placeholder="Enter VMRDA" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-reg-area" className={VILLAGE_LABEL_CLASS}>Registration Area</label>
                    <input id="register-reg-area" type="text" value={regArea} onChange={e => setRegArea(e.target.value)} placeholder="Enter registration area" className={VILLAGE_INPUT_CLASS} />
                  </div>
                  <div className={VILLAGE_FIELD_CLASS}>
                    <label htmlFor="register-gvmc-vmrda" className={VILLAGE_LABEL_CLASS}>GVMC / VMRDA</label>
                    <input id="register-gvmc-vmrda" type="text" value={gvmcVmrda} onChange={e => setGvmcVmrda(e.target.value)} placeholder="GVMC or VMRDA" className={VILLAGE_INPUT_CLASS} />
                  </div>
                </div>
              </div>
            </div>

            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-password" className={FORM_LABEL_CLASS}>Password</label>
              <div className="relative">
                <input id="register-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className={`${FORM_INPUT_CLASS} pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-confirm-password" className={FORM_LABEL_CLASS}>Confirm Password</label>
              <div className="relative">
                <input id="register-confirm-password" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className={`${FORM_INPUT_CLASS} pr-10`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className={FORM_FIELD_CLASS}>
              <label htmlFor="register-captcha" className={FORM_LABEL_CLASS}>Captcha</label>
              <div className={`flex items-center gap-3 ${captchaError ? 'rounded-lg border border-red-500 bg-red-50 p-2 -mx-2' : ''}`}>
                <span className="inline-flex h-10 items-center bg-gray-100 border border-gray-200 rounded-lg px-4 text-[13px] font-bold text-gray-700 tracking-wide select-none">
                  {captchaA} + {captchaB} = ?
                </span>
                <input
                  ref={captchaRef}
                  id="register-captcha"
                  type="text"
                  value={formData.captcha}
                  onChange={e => {
                    const next = { ...formData, captcha: e.target.value.replace(/\D/g, '') };
                    setFormData(next);
                    handleFieldChange('captcha', next);
                  }}
                  onBlur={() => handleBlur('captcha')}
                  maxLength={2}
                  placeholder="Answer"
                  aria-invalid={captchaError ? true : undefined}
                  aria-describedby={captchaError ? 'captcha-error' : undefined}
                  className={`w-20 ${FORM_INPUT_CLASS} text-center ${captchaError ? 'border-red-500 bg-red-50' : ''}`}
                />
              </div>
              <FieldError id="captcha-error" message={captchaError} />
            </div>

            <div
              ref={termsRef}
              tabIndex={-1}
              className={`flex items-start gap-2 pt-1 rounded-md outline-none ${termsError ? 'border border-red-500 bg-red-50 p-2 -mx-2' : ''}`}
            >
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptedTerms}
                onChange={e => {
                  const next = { ...formData, acceptedTerms: e.target.checked };
                  setFormData(next);
                  handleFieldChange('acceptedTerms', next, true);
                }}
                onBlur={() => handleBlur('acceptedTerms')}
                aria-invalid={termsError ? true : undefined}
                aria-describedby={termsError ? 'terms-error' : undefined}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="terms" className="text-[12px] text-gray-600 leading-relaxed cursor-pointer">
                I agree to the <a href="#" className="text-primary font-medium no-underline hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary font-medium no-underline hover:underline">Privacy Policy</a>
              </label>
            </div>
            <FieldError id="terms-error" message={termsError} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-red-700 text-white border-0 rounded-lg py-3 text-[15px] font-bold transition-colors ${isSubmitting ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:bg-red-800'}`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-5 text-[13px] text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-red-700 font-bold no-underline hover:underline">
              Sign in
            </Link>
          </div>

          <div className="text-center mt-3 text-[13px] text-gray-500">
            <Link to={ROUTES.home} className="font-medium text-gray-600 no-underline hover:text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
         // <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[9999] sm:min-w-[280px] bg-white rounded-md shadow-lg border-l-4 px-4 py-3 flex items-center gap-2.5 text-[13px] animate-slide-down ${toast.type === 'success' ? 'border-green-600' : toast.type === 'danger' ? 'border-red-600' : 'border-amber-500'}`}>
        <div className={`fixed top-5 right-5 z-[99999]
sm:min-w-[340px]
sm:max-w-[420px]
bg-white
rounded-xl
shadow-xl
border-l-4
px-5
py-4
flex
items-center
gap-3
text-[13px]
animate-slide-down
${toast.type === 'success' ? 'border-green-600' : toast.type === 'danger' ? 'border-red-600' : 'border-amber-500'}`}>
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
