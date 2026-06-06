import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, Users, Headphones, Eye, EyeOff, RefreshCw, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';


function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < 5; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [loginMethod, setLoginMethod] = useState('otp');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function handleSendOtp() {
    if (mobile.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'danger');
      return;
    }
    setOtpSent(true);
    showToast(`OTP sent to +91 ${mobile}`, 'success');
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (mobile.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'danger');
      return;
    }
    if (loginMethod === 'otp' && otp.length < 4) {
      showToast('Please enter a valid OTP.', 'danger');
      return;
    }
    if (loginMethod === 'password') {
      if (!email.trim()) {
        showToast('Please enter your registered email.', 'danger');
        return;
      }
      if (!password) {
        showToast('Please enter your password.', 'danger');
        return;
      }
    }
    if (captcha !== captchaInput.toUpperCase().trim()) {
      showToast('Captcha does not match. Please try again.', 'danger');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    setLoading(true);
    if (loginMethod === 'otp') {
      setTimeout(() => {
        setLoading(false);
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => navigate('/'), 1200);
      }, 800);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        showToast(error.message, 'danger');
        return;
      }
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => navigate('/'), 1200);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 sm:p-6">
      <div className="flex w-full max-w-[900px] min-h-[540px] bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Left Banner */}
        <div className="hidden md:flex w-[42%] bg-gradient-to-br from-primary to-primary-dark p-6 lg:p-10 flex-col justify-between relative overflow-hidden">
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
            <h2 className="text-white text-[22px] lg:text-[26px] font-extrabold leading-snug mb-4">Find Your<br /><span className="text-accent">Dream Property</span><br />In Visakhapatnam</h2>
            <p className="text-blue-300 text-[13px] leading-relaxed mb-5">Thousands of verified listings across GVMC &amp; VMRDA areas. Trusted by buyers, owners, and agents.</p>
            <ul className="space-y-2.5">
              {[
                { icon: CheckCircle, text: 'Verified Listings' },
                { icon: Shield, text: 'Secure Portal' },
                { icon: Users, text: 'Trusted Agents' },
                { icon: Headphones, text: '24x7 Support: 1800-425-4440' },
              ].map(item => (
                <li key={item.text} className="flex items-center gap-2.5 text-blue-200 text-[13px]">
                  <item.icon size={15} className="text-accent flex-shrink-0" /> {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 text-center">
            <p className="text-blue-300 text-[12px] mb-2">Don't have an account?</p>
            <Link to="/register" className="block border border-white/25 text-white text-[13px] font-semibold py-2.5 rounded-lg no-underline hover:bg-white/10 transition-colors">
              Create New Account
            </Link>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 p-5 sm:p-8 lg:p-11 flex flex-col justify-center">
          <h2 className="text-[20px] sm:text-[22px] font-extrabold text-gray-900 mb-1">Login</h2>
          <p className="text-[12px] sm:text-[13px] text-gray-500 mb-4 sm:mb-6">Welcome back! Please login to continue.</p>

          <form onSubmit={handleLogin}>
            {/* Mobile Number */}
            <div className="mb-5">
              <label className="text-[12px] text-gray-500 block mb-1">Mobile Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-gray-500">+91</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setOtpSent(false); }}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full border-0 border-b-2 border-gray-200 py-2 pl-16 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Method Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 py-2.5 rounded-md text-[12px] sm:text-[13px] font-semibold border-0 cursor-pointer transition-all ${
                  loginMethod === 'otp'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Login with OTP
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className={`flex-1 py-2.5 rounded-md text-[12px] sm:text-[13px] font-semibold border-0 cursor-pointer transition-all ${
                  loginMethod === 'password'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Login with Password
              </button>
            </div>

            {/* OTP Section */}
            {loginMethod === 'otp' && (
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[12px] text-gray-500">OTP</label>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={mobile.length !== 10}
                    className="text-primary text-[12px] font-semibold bg-transparent border-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {otpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full border-0 border-b-2 border-gray-200 py-2 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400 tracking-widest font-mono"
                />
                {otpSent && (
                  <div className="text-[11px] text-teal mt-1 flex items-center gap-1">
                    <CheckCircle size={12} /> OTP sent to +91 {mobile}
                  </div>
                )}
              </div>
            )}

            {/* Password Section */}
            {loginMethod === 'password' && (
              <div className="space-y-4 mb-5">
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="w-full border-0 border-b-2 border-gray-200 py-2 pl-6 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] text-gray-500">Password</label>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 text-[12px] font-semibold bg-transparent border-0 cursor-pointer flex items-center gap-1">
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />} {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-0 border-b-2 border-gray-200 py-2 text-sm outline-none focus:border-primary bg-transparent placeholder:text-gray-400"
                  />
                  <div className="text-right mt-1.5">
                    <a href="#" className="text-[12px] text-gray-500 no-underline hover:text-primary">Forgot Password?</a>
                  </div>
                </div>
              </div>
            )}

            {/* Captcha */}
            <div className="mb-5">
              <label className="text-[12px] text-gray-500 block mb-1.5">Captcha</label>
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <div className="px-2.5 sm:px-3.5 py-1.5 rounded-md border-2 border-blue-300 font-mono text-base sm:text-lg font-extrabold tracking-[3px] sm:tracking-[5px] text-blue-800 select-none line-through decoration-wavy decoration-red-500 bg-blue-100">{captcha}</div>
                <button type="button" onClick={() => { setCaptcha(generateCaptcha()); setCaptchaInput(''); }} className="text-blue-500 hover:rotate-180 transition-transform duration-300 bg-transparent border-0 cursor-pointer p-0">
                  <RefreshCw size={18} />
                </button>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={e => setCaptchaInput(e.target.value)}
                  maxLength={5}
                  placeholder="Enter captcha"
                  required
                  className="w-[100px] sm:w-[130px] border-2 border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-red-700 text-white border-0 rounded-lg py-3 text-[15px] font-bold cursor-pointer hover:bg-red-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-5 text-[13px] text-gray-500">
            New to AP Real Estate? <Link to="/register" className="text-red-700 font-bold no-underline">Sign Up</Link>
          </div>

          {/* Mobile-only: link to register */}
          <div className="md:hidden text-center mt-3">
            <Link to="/register" className="text-[12px] text-primary font-semibold no-underline">Create New Account</Link>
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
