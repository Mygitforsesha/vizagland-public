import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, Users, Headphones, Eye, EyeOff, User, Phone, Mail, MapPin, X, Plus, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const REGISTRATION_TYPES = [
  { group: 'Role', items: ['Buyer', 'Seller', 'Owner Relative', 'Owner Friend', 'Realtor', 'Agent', 'Marketing Person', 'Promoter', 'Company', 'Builder', 'Developer'] },
  { group: 'Professional', items: ['Civil Engineer', 'Architect', 'Structural Engineer'] },
  { group: 'Membership', items: ['Diamond Member', 'Gold Member', 'Platinum Member', 'Bronze Member'] },
  { group: 'Media', items: ['Eenadu', 'Sakshi', 'Vaartha', 'Andhra Jyothi', 'Hindu', 'Indian Express'] },
  { group: 'Social Media', items: ['Facebook', 'Twitter', 'Instagram', 'YouTube', 'WhatsApp', 'Telegram', 'Social Media'] },
  { group: 'Other', items: ['Others'] },
];

function RegistrationTypeStep({
  selectedTypes,
  setSelectedTypes,
  customRoles,
  setCustomRoles,
  onContinue,
}) {
  const [customInput, setCustomInput] = useState('');
  const othersSelected = selectedTypes.includes('Others');

  function toggleType(type) {
    setSelectedTypes(
      selectedTypes.includes(type)
        ? selectedTypes.filter(t => t !== type)
        : [...selectedTypes, type]
    );
  }

  function addCustomRole() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    const normalized = trimmed.toLowerCase();
    const allExisting = [...selectedTypes.map(s => s.toLowerCase()), ...customRoles.map(s => s.toLowerCase())];
    if (allExisting.includes(normalized)) return;
    setCustomRoles([...customRoles, trimmed]);
    setCustomInput('');
  }

  function removeCustomRole(role) {
    setCustomRoles(customRoles.filter(r => r !== role));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); addCustomRole(); }
  }

  const hasSelection = selectedTypes.length > 0 || customRoles.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4">
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
          {REGISTRATION_TYPES.map(group => (
            <div key={group.group}>
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{group.group}</h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.items.map(type => {
                  const isSelected = selectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
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
            </div>
          ))}
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
                className="flex-1 border-2 border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
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
        {hasSelection && (
          <div className="mt-8 sticky bottom-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-gray-500">Selected:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedTypes.filter(t => t !== 'Others').map(t => (
                    <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-medium rounded-full">{t}</span>
                  ))}
                  {customRoles.map(r => (
                    <span key={r} className="px-2 py-0.5 bg-accent/10 text-accent text-[11px] font-medium rounded-full">{r}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={onContinue}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-red-700 text-white rounded-lg text-sm font-bold border-0 cursor-pointer hover:bg-red-800 transition-colors whitespace-nowrap shadow-sm w-full sm:w-auto justify-center"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Login link */}
        <div className="text-center mt-6 text-[13px] text-gray-500">
          Already have an account? <Link to="/login" className="text-red-700 font-bold no-underline">Login</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [customRoles, setCustomRoles] = useState([]);

  const [fullName, setFullName] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
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
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [captchaA] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [captchaB] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  function handleSendOtp() {
    if (mobile.length !== 10) { showToast('Enter a valid 10-digit mobile number first.', 'danger'); return; }
    setOtpSent(true);
    showToast('OTP sent to +91 ' + mobile, 'success');
  }

  function handleVerifyOtp() {
    if (otp.length < 4) { showToast('Please enter a valid OTP.', 'danger'); return; }
    setOtpVerified(true);
    showToast('Mobile number verified!', 'success');
  }

  function showToast(msg, type) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!fullName.trim()) { showToast('Please enter your full name.', 'danger'); return; }
    if (!dobDay || !dobMonth || !dobYear) { showToast('Please enter your date of birth.', 'danger'); return; }
    if (!gender) { showToast('Please select your gender.', 'danger'); return; }
    if (mobile.length !== 10) { showToast('Please enter a valid 10-digit mobile number.', 'danger'); return; }
    if (!otpVerified) { showToast('Please verify your mobile number with OTP.', 'danger'); return; }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email address.', 'danger'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters.', 'danger'); return; }
    if (password !== confirmPassword) { showToast('Passwords do not match.', 'danger'); return; }
    if (parseInt(captchaAnswer) !== captchaA + captchaB) { showToast('Incorrect captcha answer. Please try again.', 'danger'); return; }
    if (!agreed) { showToast('Please agree to the terms and conditions.', 'danger'); return; }

    setLoading(true);
    const roles = [...selectedTypes.filter(t => t !== 'Others'), ...customRoles];
    const signUpEmail = email.trim() || `${mobile}@placeholder.vizagland.com`;
    const { error } = await supabase.auth.signUp({
      email: signUpEmail,
      password,
      options: {
        data: {
          full_name: fullName,
          date_of_birth: `${parseInt(dobYear) > 30 ? '19' : '20'}${dobYear.padStart(2, '0')}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`,
          gender,
          mobile,
          registration_types: roles,
          village,
          nearby_location: nearbyLocation || customNearby,
          district,
          mandal,
          panchayati,
          gvmc,
          vmrda,
          registration_area: regArea,
          gvmc_vmrda: gvmcVmrda,
        },
      },
    });
    setLoading(false);

    if (error) { showToast(error.message, 'danger'); return; }
    showToast('Account created successfully! Redirecting...', 'success');
    setTimeout(() => navigate('/login'), 1500);
  }

  if (step === 1) {
    return (
      <RegistrationTypeStep
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        customRoles={customRoles}
        setCustomRoles={setCustomRoles}
        onContinue={() => setStep(2)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 sm:p-6">
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
                {[...selectedTypes.filter(t => t !== 'Others'), ...customRoles].map(t => (
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
          <div className="md:hidden flex flex-wrap gap-1.5 mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-[11px] text-gray-500 font-medium w-full mb-1">Registering as:</span>
            {[...selectedTypes.filter(t => t !== 'Others'), ...customRoles].map(t => (
              <span key={t} className="px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">{t}</span>
            ))}
            <button onClick={() => setStep(1)} className="text-[11px] text-red-600 font-medium bg-transparent border-0 cursor-pointer ml-auto">Change</button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" required className="w-full border-0 border-b-2 border-gray-200 py-2 pl-6 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Date of Birth (DD / MM / YY)</label>
              <div className="flex gap-2 sm:gap-3">
                <input type="text" value={dobDay} onChange={e => setDobDay(e.target.value.replace(/\D/g, ''))} maxLength={2} placeholder="DD" className="w-16 border-0 border-b-2 border-gray-200 py-2 text-sm text-center outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
                <input type="text" value={dobMonth} onChange={e => setDobMonth(e.target.value.replace(/\D/g, ''))} maxLength={2} placeholder="MM" className="w-16 border-0 border-b-2 border-gray-200 py-2 text-sm text-center outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
                <input type="text" value={dobYear} onChange={e => setDobYear(e.target.value.replace(/\D/g, ''))} maxLength={2} placeholder="YY" className="w-16 border-0 border-b-2 border-gray-200 py-2 text-sm text-center outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Gender</label>
              <div className="flex gap-3">
                {(['Male', 'Female']).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-[13px] font-medium cursor-pointer transition-all ${
                      gender === g
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${gender === g ? 'border-primary' : 'border-gray-300'}`}>
                      {gender === g && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Mobile Number</label>
              <div className="flex items-end gap-2 sm:gap-3">
                <div className="relative flex items-center flex-1">
                  <Phone size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-gray-500">+91</span>
                  <input type="tel" value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setOtpSent(false); setOtpVerified(false); }} maxLength={10} placeholder="10-digit mobile" required className="w-full border-0 border-b-2 border-gray-200 py-2 pl-16 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
                </div>
                {!otpVerified && (
                  <button type="button" onClick={handleSendOtp} disabled={mobile.length !== 10} className="text-[11px] sm:text-[12px] font-semibold text-primary border border-primary rounded-md px-2.5 sm:px-3 py-1.5 bg-transparent cursor-pointer hover:bg-primary/5 transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed">
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                )}
                {otpVerified && (
                  <span className="flex items-center gap-1 text-green-600 text-[12px] font-semibold whitespace-nowrap">
                    <CheckCircle size={14} /> Verified
                  </span>
                )}
              </div>
              {otpSent && !otpVerified && (
                <div className="flex items-end gap-2 sm:gap-3 mt-3 animate-fade-in">
                  <div className="flex-1">
                    <label className="text-[11px] text-gray-500 block mb-1">Enter OTP</label>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} maxLength={6} placeholder="Enter 4-6 digit OTP" className="w-full border-0 border-b-2 border-gray-200 py-2 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400 tracking-widest font-mono" />
                  </div>
                  <button type="button" onClick={handleVerifyOtp} disabled={otp.length < 4} className="text-[12px] font-semibold text-white bg-primary rounded-md px-3 sm:px-4 py-1.5 border-0 cursor-pointer hover:bg-primary-dark transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed">
                    Verify
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <Mail size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full border-0 border-b-2 border-gray-200 py-2 pl-6 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
              </div>
            </div>

            {/* Village Details */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-700 text-white text-[13px] font-bold px-4 py-2.5 flex items-center gap-2">
                <MapPin size={14} /> Village Details
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Village</label>
                    <input type="text" value={village} onChange={e => setVillage(e.target.value)} placeholder="Enter village name" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Nearby Location / Landmark</label>
                    <select value={nearbyLocation} onChange={e => setNearbyLocation(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary">
                      <option value="">Select Nearby Location</option>
                      {['Bus Stand', 'Railway Station', 'Highway', 'School', 'Hospital', 'Market'].map(loc => <option key={loc}>{loc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Add Nearby Location</label>
                    <input type="text" value={customNearby} onChange={e => setCustomNearby(e.target.value)} placeholder="Enter nearby location" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">District</label>
                    <input type="text" value={district} onChange={e => setDistrict(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Mandal</label>
                    <input type="text" value={mandal} onChange={e => setMandal(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Panchayati</label>
                    <input type="text" value={panchayati} onChange={e => setPanchayati(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">GVMC Zone, Ward Number</label>
                    <input type="text" value={gvmc} onChange={e => setGvmc(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">VMRDA</label>
                    <input type="text" value={vmrda} onChange={e => setVmrda(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Registration Area</label>
                    <input type="text" value={regArea} onChange={e => setRegArea(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">GVMC / VMRDA</label>
                    <input type="text" value={gvmcVmrda} onChange={e => setGvmcVmrda(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" required className="w-full border-0 border-b-2 border-gray-200 py-2 pr-10 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" required className="w-full border-0 border-b-2 border-gray-200 py-2 pr-10 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[12px] text-gray-500 block mb-1">Captcha</label>
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 text-sm font-bold text-gray-700 tracking-wide select-none">
                  {captchaA} + {captchaB} = ?
                </span>
                <input type="text" value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value.replace(/\D/g, ''))} maxLength={2} placeholder="Answer" className="w-20 border-0 border-b-2 border-gray-200 py-2 text-sm text-center outline-none focus:border-primary bg-transparent placeholder:text-gray-400" />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
              <label htmlFor="terms" className="text-[12px] text-gray-600 leading-relaxed cursor-pointer">
                I agree to the <a href="#" className="text-primary font-medium no-underline hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary font-medium no-underline hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-red-700 text-white border-0 rounded-lg py-3 text-[15px] font-bold cursor-pointer hover:bg-red-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-5 text-[13px] text-gray-500 md:hidden">
            Already have an account? <Link to="/login" className="text-red-700 font-bold no-underline">Login</Link>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[9999] sm:min-w-[280px] bg-white rounded-md shadow-lg border-l-4 px-4 py-3 flex items-center gap-2.5 text-[13px] animate-slide-down ${toast.type === 'success' ? 'border-green-600' : toast.type === 'danger' ? 'border-red-600' : 'border-amber-500'}`}>
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
