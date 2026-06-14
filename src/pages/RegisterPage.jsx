import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Shield, Users, Headphones, Eye, EyeOff, User, Phone, Mail, MapPin, X, Plus, ArrowRight, ChevronDown } from 'lucide-react';

const REGISTER_API_URL = 'https://trapezoid-reprimand-registry.ngrok-free.dev/api/auth/register';

const REGISTRATION_TYPES = [
  { group: 'Role', items: ['Buyer', 'Owner', 'Owner Relative', 'Owner Friend', 'Realtor', 'agent', 'employee','Marketing Person', 'Promoter', 'Company', 'Builder', 'Developer'] },
  { group: 'Professional', items: ['Civil Engineer', 'Architect', 'Structural Engineer'] },
  { group: 'Membership', items: ['Diamond Member', 'Gold Member', 'Platinum Member', 'Bronze Member'] },
  { group: 'Media', items: ['Eenadu', 'Sakshi', 'Vaartha', 'Andhra Jyothi', 'Hindu', 'Indian Express'] },
  { group: 'Social Media', items: ['Facebook', 'Twitter', 'Instagram', 'YouTube', 'WhatsApp', 'Telegram', 'Social Media'] },
  { group: 'Other', items: ['Others'] },
];

const REGISTRATION_GROUP_KEYS = {
  Membership: 'membership',
  Role: 'roles',
  Professional: 'professional',
  Media: 'media',
  'Social Media': 'socialMedia',
  Other: 'other',
};

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
      return formData.roles.length > 0 ? '' : FIELD_ERROR_MESSAGES.roles;
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
const VILLAGE_SELECT_CLASS = `${VILLAGE_CONTROL_CLASS} appearance-none pr-10 cursor-pointer`;
const VILLAGE_FIELD_CLASS = 'flex flex-col min-w-0';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[11px] text-red-600 mt-1" role="alert">
      {message}
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

const DOB_INPUT_CLASS = `flex-1 basis-0 min-w-0 ${FORM_INPUT_CLASS} text-center`;

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
  const othersSelected = formData.other.includes('Others');
  const customRoles = formData.other.filter(r => r !== 'Others');
  const showRolesError =
  (touched.roles || step1SubmitAttempted || submitAttempted) &&
  formData.roles.length === 0;
  function isTypeSelected(groupName, type) {
    const key = REGISTRATION_GROUP_KEYS[groupName];
    if (key === 'roles') return formData.roles.includes(type);
    return formData[key].includes(type);
  }

  function toggleType(groupName, type) {
    const key = REGISTRATION_GROUP_KEYS[groupName];
    setFormData(prev => {
      let next;
        if (key === 'roles') {
        next = { ...prev, roles: prev.roles.includes(type) ? prev.roles.filter(t => t !== type) : [...prev.roles, type] };
      } else {
        next = { ...prev, [key]: prev[key].includes(type) ? prev[key].filter(t => t !== type) : [...prev[key], type] };
      }
      onFieldChange(key, next);
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

  const hasSelection = getAllSelectedTypes(formData).length > 0 || formData.other.includes('Others');

  return (
    <div className="min-h-screen bg-surface py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-black text-sm">AP</div>
            <span className="font-bold text-lg text-gray-900">AP Real Estate</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">How would you like to register?</h1>
          <p className="text-[13px] text-gray-500">Select one or more options that describe you.</p>
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

        {/* Type Groups */}
        <div className="space-y-5 sm:space-y-6">
          {REGISTRATION_TYPES.map(group => {
            const isRolesGroup = group.group === 'Role';
            return (
            <div
              key={group.group}
              ref={isRolesGroup ? rolesSectionRef : undefined}
              tabIndex={isRolesGroup ? -1 : undefined}
              aria-invalid={isRolesGroup && showRolesError ? true : undefined}
              aria-describedby={isRolesGroup && showRolesError ? 'roles-error' : undefined}
              onBlur={isRolesGroup ? () => onFieldChange('roles', formData, true) : undefined}
              className={isRolesGroup && showRolesError ? 'p-2 -mx-2 rounded-lg border-2 border-red-500 bg-red-50' : isRolesGroup ? 'p-2 -mx-2' : undefined}
            >
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{group.group}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.items.map(type => {
                  const isSelected = isTypeSelected(group.group, type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleType(group.group, type)}
                      className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border-2 text-[12px] sm:text-[13px] font-medium cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/5 text-primary shadow-sm scale-[1.02]'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {type}
                    </button>
                  );
                })}
              </div>
              {isRolesGroup && (
                <FieldError id="roles-error" message={showRolesError ? FIELD_ERROR_MESSAGES.roles : ''} />
              )}
            </div>
            );
          })}
        </div>

        {/* Others custom input */}
        {othersSelected && (
          <div className="mt-6 p-4 bg-white border-2 border-dashed border-gray-200 rounded-xl animate-fade-in">
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
        <div className="mt-8 sticky bottom-4">
          <div className={`bg-white border rounded-xl shadow-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 ${showRolesError ? 'border-red-500' : 'border-gray-200'}`}>
            {hasSelection && (
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-gray-500">Selected:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {[    
                    ...formData.roles,
                    ...formData.professional,
                    ...formData.media,
                    ...formData.socialMedia,
                  ].map(t => (
                    <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-medium rounded-full">{t}</span>
                  ))}
                  {formData.other.includes('Others') && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-medium rounded-full">Others</span>
                  )}
                  {customRoles.map(r => (
                    <span key={r} className="px-2 py-0.5 bg-accent/10 text-accent text-[11px] font-medium rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={onContinue}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-700 text-white rounded-lg text-sm font-bold border-0 cursor-pointer hover:bg-red-800 transition-colors whitespace-nowrap shadow-sm w-full sm:w-auto justify-center"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Login link */}
        <div className="text-center mt-6 text-[13px] text-gray-500">
          Already have an account? <Link to="/login" className="text-red-700 font-bold no-underline">Login</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
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
    setTimeout(() => setToast(null), 4000);
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

    const payload = buildRegisterPayload();
    console.log('Register Payload:', payload);

    setIsSubmitting(true);
    try {
      const response = await axios.post(REGISTER_API_URL, payload);
      console.log('Register Response:', response.data);
      showToast('Registration successful.', 'success');
      resetForm();
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
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center text-white font-black text-base">AP</div>
            <div>
              <div className="text-white font-bold text-base leading-tight">AP Real Estate</div>
              <div className="text-blue-300 text-[11px]">Visakhapatnam - Verified Properties</div>
            </div>
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
                { icon: Headphones, text: '24x7 Support: 1800-425-4440' },
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
              <label className={FORM_LABEL_CLASS}>Date of Birth (DD / MM / YY)</label>
              <div className="flex gap-3 w-full max-w-[15rem] sm:max-w-[16.5rem]">
                <input
                  id="register-dob-day"
                  type="text"
                  inputMode="numeric"
                  value={dobDay}
                  onChange={e => setDobDay(e.target.value.replace(/\D/g, ''))}
                  maxLength={2}
                  placeholder="DD"
                  aria-label="Day"
                  className={DOB_INPUT_CLASS}
                />
                <input
                  id="register-dob-month"
                  type="text"
                  inputMode="numeric"
                  value={dobMonth}
                  onChange={e => setDobMonth(e.target.value.replace(/\D/g, ''))}
                  maxLength={2}
                  placeholder="MM"
                  aria-label="Month"
                  className={DOB_INPUT_CLASS}
                />
                <input
                  id="register-dob-year"
                  type="text"
                  inputMode="numeric"
                  value={dobYear}
                  onChange={e => setDobYear(e.target.value.replace(/\D/g, ''))}
                  maxLength={2}
                  placeholder="YY"
                  aria-label="Year"
                  className={DOB_INPUT_CLASS}
                />
              </div>
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
                    <div className="relative">
                      <select
                        id="register-nearby-location"
                        value={nearbyLocation}
                        onChange={e => setNearbyLocation(e.target.value)}
                        className={`${VILLAGE_SELECT_CLASS} ${nearbyLocation ? 'text-gray-900' : 'text-gray-400'}`}
                      >
                        <option value="">Select Nearby Location</option>
                        {NEARBY_LOCATION_OPTIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden />
                    </div>
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

          <div className="text-center mt-5 text-[13px] text-gray-500 md:hidden">
            Already have an account? <Link to="/login" className="text-red-700 font-bold no-underline">Login</Link>
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
