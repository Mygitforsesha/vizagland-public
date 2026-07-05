import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { validatePropertyAuthDetails } from '@/lib/post-property/validateLead';

const INPUT_CLASS =
  'w-full py-3 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-accent';

function sanitizeUsernameOrMobile(value) {
  if (/[a-zA-Z]/.test(value)) {
    return value;
  }

  return value.replace(/\D/g, '').slice(0, 10);
}

export default function PropertyLeadModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    usernameOrMobile: '',
    password: '',
    email: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const { isValid, errors: validationErrors } = validatePropertyAuthDetails(formData);
    setErrors(validationErrors);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);

      setFormData({
        usernameOrMobile: '',
        password: '',
        email: '',
      });
      setShowPassword(false);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSubmitting(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="relative shrink-0 border-b border-gray-100 px-5 pb-4 pt-5 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
          >
            <X size={18} />
          </button>

          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-light">
            <Phone size={16} className="text-accent" />
          </div>

          <h3 className="mt-3 text-lg font-bold text-primary sm:text-xl">Submit Property</h3>

          <p className="mt-1 text-[13px] text-gray-500 sm:text-sm">
            Sign in with your Vizag Land account to verify and submit your property.
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-gray-600 sm:text-xs">
              Username / 10 Digit Mobile Number
            </label>

            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                inputMode="text"
                autoComplete="username"
                placeholder="Enter Username or 10 Digit Mobile Number"
                value={formData.usernameOrMobile}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    usernameOrMobile: sanitizeUsernameOrMobile(event.target.value),
                  })
                }
                className={`${INPUT_CLASS} pl-10 pr-4`}
              />
            </div>

            {errors.usernameOrMobile ? (
              <p className="mt-1 text-[11px] text-red-500 sm:text-xs">{errors.usernameOrMobile}</p>
            ) : null}
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <label className="text-[11px] font-medium text-gray-600 sm:text-xs">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="flex cursor-pointer items-center gap-1 border-0 bg-transparent text-[11px] font-semibold text-gray-500 sm:text-xs"
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    password: event.target.value,
                  })
                }
                className={`${INPUT_CLASS} pl-10 pr-4`}
              />
            </div>

            {errors.password ? (
              <p className="mt-1 text-[11px] text-red-500 sm:text-xs">{errors.password}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-medium text-gray-600 sm:text-xs">
              Email
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                autoComplete="email"
                placeholder="Enter Email Address (Optional)"
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  })
                }
                className={`${INPUT_CLASS} pl-10 pr-4`}
              />
            </div>

            {errors.email ? (
              <p className="mt-1 text-[11px] text-red-500 sm:text-xs">{errors.email}</p>
            ) : null}

            <p className="mt-2 text-[11px] leading-snug text-gray-500 sm:text-xs">
              Use the registered Username / Mobile Number and Password to verify and submit your
              property.
            </p>

            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              Don&apos;t have an account?{' '}
              <Link to={ROUTES.register} className="font-semibold text-primary no-underline hover:text-accent">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="space-y-2 rounded-xl bg-accent-light p-3">
            <div className="flex items-center gap-2 text-[11px] text-gray-700 sm:text-xs">
              <ShieldCheck size={14} className="text-green-600" />
              Free Property Listing
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-700 sm:text-xs">
              <ShieldCheck size={14} className="text-green-600" />
              Verified by Vizag Land Team
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-700 sm:text-xs">
              <ShieldCheck size={14} className="text-green-600" />
              Response within 24–48 Hours
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>

          <p className="text-center text-[11px] text-gray-400">
            By submitting, you agree to be contacted regarding your property listing.
          </p>
        </div>
      </div>
    </div>
  );
}
