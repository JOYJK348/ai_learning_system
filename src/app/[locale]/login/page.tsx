'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/routing';
import { useAuth } from '@/context/AuthContext';
import { Manrope } from 'next/font/google';
import { Mail, Lock, ShieldCheck, AlertCircle, ArrowLeft, Award, GraduationCap, ChevronRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childGrade, setChildGrade] = useState('UKG');
  const [errorMessage, setErrorMessage] = useState('');
  const [trialExpired, setTrialExpired] = useState(false);
  const [sessionClosed, setSessionClosed] = useState(false);

  // Forgot password states
  const [forgotMode, setForgotMode] = useState<'identity' | 'otp' | null>(null);
  const [forgotIdentity, setForgotIdentity] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [obscuredRecipient, setObscuredRecipient] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { user, login, registerParent, loading: authLoading, error: authError } = useAuth();

  useEffect(() => {
    if (window.location.search.includes('expired=1')) {
      setTrialExpired(true);
    }
    if (window.location.search.includes('session_closed=1')) {
      setSessionClosed(true);
    }
    if (window.location.search) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  useEffect(() => {
    if (authError) setErrorMessage(authError);
  }, [authError]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetSuccessMessage('');
    setIsLoading(true);

    if (!forgotIdentity.trim()) {
      setErrorMessage('Please enter your email or username.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/auth/forgot-password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: forgotIdentity.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setObscuredRecipient(data.recipient || forgotIdentity.trim());
      setForgotMode('otp');
      setErrorMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (!forgotOtp.trim() || !forgotNewPassword || !forgotConfirmPassword) {
      setErrorMessage('Please fill all fields.');
      setIsLoading(false);
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/auth/forgot-password/verify-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity: forgotIdentity.trim(),
          otp: forgotOtp.trim(),
          newPassword: forgotNewPassword
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');

      setResetSuccessMessage('Password reset successfully! You can now log in with your new password.');
      setForgotMode(null);
      setForgotIdentity('');
      setForgotOtp('');
      setForgotNewPassword('');
      setForgotConfirmPassword('');
      setErrorMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (isRegister) {
      if (!parentName.trim() || !email.trim() || !password.trim()) {
        setErrorMessage('Please fill all registration fields.');
        setIsLoading(false);
        return;
      }

      const ok = await registerParent({
        name: parentName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: ''
      });

      setIsLoading(false);
      if (ok) {
        setIsSuccess(true);
        setErrorMessage('');
      } else {
        setErrorMessage(authError || 'Registration failed.');
      }
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email and password are required.');
      setIsLoading(false);
      return;
    }

    const loggedIn = await login(email.trim().toLowerCase(), password);
    setIsLoading(false);

    if (loggedIn) {
      const route = loggedIn.role === 'super_admin' ? 'admin' : loggedIn.role === 'school_admin' ? 'school-admin' : loggedIn.role;
      router.replace(`/${route}`);
    } else {
      setErrorMessage(authError || 'Invalid email or password.');
    }
  };

  useEffect(() => {
    if (user && !authLoading) {
      const route = user.role === 'super_admin' ? 'admin' : user.role === 'school_admin' ? 'school-admin' : user.role;
      router.replace(`/${route}`);
    }
  }, [user, authLoading, router]);

  const shellStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: `
      radial-gradient(circle at 8% 4%,  rgba(125,211,252,0.34), transparent 24rem),
      radial-gradient(circle at 88% 6%, rgba(251,207,232,0.46), transparent 28rem),
      radial-gradient(circle at 52% 42%,rgba(187,247,208,0.34), transparent 26rem),
      linear-gradient(135deg, #f8fbff 0%, #f7fff8 45%, #fff7ed 100%)
    `,
    fontFamily: 'var(--admin-font), "Segoe UI", system-ui, sans-serif',
    fontFeatureSettings: '"cv02","cv03","cv04","ss01"',
  };

  const cardBackgroundStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(239, 246, 255, 0.92), rgba(236, 253, 245, 0.92))',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(22, 160, 133, 0.12)',
    boxShadow: '0 30px 60px rgba(18, 49, 47, 0.08)',
  };

  const primaryBtnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #12312f, #16a085 48%, #38bdf8)',
    boxShadow: '0 12px 24px rgba(22, 160, 133, 0.18)',
  };

  return (
    <div className={`${adminFont.variable} w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 overflow-x-hidden`} style={shellStyle}>
      
      {/* 2-Column Split Layout - Form is first on mobile, branding below */}
      <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center justify-center">
        
        {/* LEFT COLUMN: Brand Presentation (Appears at bottom on mobile, left side on desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-8 pr-0 lg:pr-4 mt-8 lg:mt-0">
          
          {/* Subtle separator line for mobile view */}
          <div className="w-full h-px bg-slate-200/80 lg:hidden mb-2" />

          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-700 text-xs font-black uppercase tracking-wider mx-auto lg:mx-0 w-fit">
              <Award size={14} /> Leading AI-Driven Portal
            </div>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 leading-tight tracking-tight px-2 sm:px-0">
              Welcome back to ZHI LearnAI.
            </h2>
            <p className="text-slate-505 text-slate-500 font-semibold leading-relaxed text-xs sm:text-sm xl:text-base px-3 sm:px-0">
              Sign in to access your customized dashboard, complete learning activities, view dynamic charts, and proceed with your educational progress.
            </p>
          </div>

          {/* Feature List Cards */}
          <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
            {[
              {
                title: "Gamified Learning System",
                desc: "Interactive educational lessons and challenges designed to keep student learning loops engaging and rewarding.",
                icon: "award",
                color: "bg-amber-500/10 text-amber-600 border-amber-500/15"
              },
              {
                title: "AI-Powered Adaptive Curriculum",
                desc: "Smart pathways adjusting lesson difficulties to students' individual milestones automatically.",
                icon: "graduation",
                color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15"
              },
              {
                title: "Multi-Role Dashboards",
                desc: "Bespoke portals for students, parents, and school administrators to check attempts and schedules in real-time.",
                icon: "reports",
                color: "bg-blue-500/10 text-blue-600 border-blue-500/15"
              }
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl sm:rounded-2xl bg-white/40 border border-slate-200/50 backdrop-blur-sm hover:bg-white/60 transition-colors duration-200 text-left">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${f.color}`}>
                  {f.icon === 'award' && <Award size={18} />}
                  {f.icon === 'graduation' && <GraduationCap size={18} />}
                  {f.icon === 'reports' && <ShieldCheck size={18} />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-800">{f.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-1 font-medium">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* System stats info */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-slate-200/60 text-center lg:text-left px-2 sm:px-0">
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900">15k+</p>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Active Students</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900">200+</p>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Partner Schools</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-slate-900">98%</p>
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Login Card Shell (Appears at top on mobile, right side on desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          
          {/* Upper Nav Link */}
          <div className="w-full max-w-md flex items-center justify-between px-2 mb-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors">
              <ArrowLeft size={14} /> Home
            </Link>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-md border rounded-[1.8rem] sm:rounded-[2.2rem] p-6 sm:p-10 backdrop-blur-xl" style={cardBackgroundStyle}>
            
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 rounded-t-[1.8rem] sm:rounded-t-[2.2rem]" />

            {isSuccess ? (
              <div className="flex flex-col items-center text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-55 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-3">Request Submitted</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 px-4">
                  Your enrolment data has been received. The admin team will review and approve your account shortly.
                </p>
                <button
                  onClick={() => { setIsSuccess(false); setIsRegister(false); }}
                  className="w-full min-h-[3.25rem] rounded-full text-white font-black text-sm tracking-wide transition-all active:scale-[0.98] uppercase"
                  style={primaryBtnStyle}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                {/* Centered Header: Horizontal row for Logo + Text title, centered with big logo */}
                <div className="flex flex-row items-center gap-4 sm:gap-6 justify-center mb-6 pb-5 border-b border-slate-200/50 pt-4">
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                    {/* Backdrop Glow behind logo */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-lg animate-pulse" />
                    <Image
                      src="/assets/img/logo-removebg-preview.png"
                      alt="ZHI LearnAI Logo"
                      fill
                      className="object-contain relative z-10"
                      priority
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <h1 className="text-xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                      ZHI <span className="text-emerald-600">LearnAI</span>
                    </h1>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mt-1.5 leading-none">
                      Learn While Playing
                    </p>
                  </div>
                </div>
                {resetSuccessMessage && (
                  <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-3.5 mb-4 flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <p className="text-xs font-bold text-emerald-700 leading-normal">{resetSuccessMessage}</p>
                  </div>
                )}

                {forgotMode === 'identity' ? (
                  <form onSubmit={handleSendOtp} className="space-y-4" suppressHydrationWarning>
                    <div className="text-center sm:text-left mb-2">
                      <h2 className="text-base font-black text-slate-900 tracking-tight">Recover Credentials</h2>
                      <p className="text-xs text-slate-500 mt-1">Enter your email address or username to receive a security OTP.</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Email or Username</label>
                      <div className="relative flex items-center">
                        <Mail size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                          suppressHydrationWarning
                          required
                          type="text"
                          value={forgotIdentity}
                          onChange={e => setForgotIdentity(e.target.value)}
                          placeholder="e.g. parent@mail.com or child.1234@zhi.app"
                          className="w-full py-3.5 pl-11 pr-4 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="bg-rose-500/10 border border-rose-500/15 rounded-xl p-3.5 flex items-center gap-2.5">
                        <AlertCircle size={16} className="text-rose-600 shrink-0" />
                        <p className="text-xs font-bold text-rose-700 leading-normal">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full min-h-[3.25rem] rounded-full text-white font-black text-sm tracking-wider transition-all active:scale-[0.98] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                      style={primaryBtnStyle}
                    >
                      {isLoading ? 'Working...' : 'Send OTP'}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setForgotMode(null); setErrorMessage(''); }}
                      className="w-full text-center text-xs font-black text-slate-500 hover:text-slate-750 transition-colors uppercase tracking-wider mt-2"
                    >
                      Back to Sign In
                    </button>
                  </form>
                ) : forgotMode === 'otp' ? (
                  <form onSubmit={handleVerifyReset} className="space-y-4" suppressHydrationWarning>
                    <div className="text-center sm:text-left mb-2">
                      <h2 className="text-base font-black text-slate-900 tracking-tight">Verify & Reset</h2>
                      <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl p-3 mt-1.5">
                        <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed">
                          An OTP has been sent to the registered email address: <strong className="font-extrabold">{obscuredRecipient}</strong>
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Enter 6-Digit OTP</label>
                      <input
                        suppressHydrationWarning
                        required
                        type="text"
                        maxLength={6}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={forgotOtp}
                        onChange={e => setForgotOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="123456"
                        className="w-full py-3.5 px-4 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-400 text-center tracking-[0.5em] text-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">New Password</label>
                      <div className="relative flex items-center">
                        <Lock size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                          suppressHydrationWarning
                          required
                          type={showNewPassword ? "text" : "password"}
                          value={forgotNewPassword}
                          onChange={e => setForgotNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full py-3.5 pl-11 pr-11 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                      <div className="relative flex items-center">
                        <Lock size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                          suppressHydrationWarning
                          required
                          type={showConfirmPassword ? "text" : "password"}
                          value={forgotConfirmPassword}
                          onChange={e => setForgotConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full py-3.5 pl-11 pr-11 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="bg-rose-500/10 border border-rose-500/15 rounded-xl p-3.5 flex items-center gap-2.5">
                        <AlertCircle size={16} className="text-rose-600 shrink-0" />
                        <p className="text-xs font-bold text-rose-700 leading-normal">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full min-h-[3.25rem] rounded-full text-white font-black text-sm tracking-wider transition-all active:scale-[0.98] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                      style={primaryBtnStyle}
                    >
                      {isLoading ? 'Working...' : 'Reset Password'}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setForgotMode('identity'); setErrorMessage(''); }}
                      className="w-full text-center text-xs font-black text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-wider mt-2"
                    >
                      Change Username / Email
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                    {isRegister && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Parent Name</label>
                          <input
                            suppressHydrationWarning
                            required
                            type="text"
                            value={parentName}
                            onChange={e => setParentName(e.target.value)}
                            placeholder="Full name"
                            className="w-full py-3.5 px-4 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-950 placeholder-slate-450"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Child Name</label>
                          <input
                            suppressHydrationWarning
                            required
                            type="text"
                            value={childName}
                            onChange={e => setChildName(e.target.value)}
                            placeholder="Full name"
                            className="w-full py-3.5 px-4 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Grade</label>
                          <select
                            value={childGrade}
                            onChange={e => setChildGrade(e.target.value)}
                            className="w-full py-3.5 px-4 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none rounded-xl text-sm font-semibold text-slate-955"
                          >
                            <option>LKG</option>
                            <option>UKG</option>
                            <option>Grade 1</option>
                            <option>Grade 2</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Email Address</label>
                      <div className="relative flex items-center">
                        <Mail size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                          suppressHydrationWarning
                          required
                          type="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                            setTrialExpired(false);
                            setSessionClosed(false);
                          }}
                          placeholder="you@example.com"
                          className="w-full py-3.5 pl-11 pr-4 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider">Password</label>
                        {!isRegister && (
                          <button
                            suppressHydrationWarning
                            type="button"
                            onClick={() => {
                              setForgotMode('identity');
                              setErrorMessage('');
                              setResetSuccessMessage('');
                              setTrialExpired(false);
                              setSessionClosed(false);
                            }}
                            className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider"
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <Lock size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                          suppressHydrationWarning
                          required
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={e => {
                            setPassword(e.target.value);
                            setTrialExpired(false);
                            setSessionClosed(false);
                          }}
                          placeholder="••••••••"
                          className="w-full py-3.5 pl-11 pr-11 bg-emerald-500/[0.03] border border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450"
                        />
                        <button
                          suppressHydrationWarning
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>



                    {trialExpired && (
                      <div className="bg-rose-500/10 border border-rose-500/15 rounded-xl p-4 text-center">
                        <p className="text-xs font-black text-rose-700 uppercase tracking-widest mb-1">Trial / Plan Expired</p>
                        <p className="text-xs text-rose-600 font-semibold leading-relaxed">Your school trial or parent subscription has expired. Please contact your administrator or parent to renew.</p>
                      </div>
                    )}

                    {sessionClosed && (
                      <div className="bg-amber-500/10 border border-amber-500/15 rounded-xl p-4 text-center">
                        <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">Session Ended</p>
                        <p className="text-xs text-amber-600 font-semibold leading-relaxed">Your session has expired. Please log in again to continue.</p>
                      </div>
                    )}

                    {errorMessage && (
                      <div className="bg-rose-500/10 border border-rose-500/15 rounded-xl p-3.5 flex items-center gap-2.5">
                        <AlertCircle size={16} className="text-rose-600 shrink-0" />
                        <p className="text-xs font-bold text-rose-700 leading-normal">{errorMessage}</p>
                      </div>
                    )}

                    {/* Login submit CTA */}
                    <button
                      suppressHydrationWarning
                      type="submit"
                      disabled={isLoading}
                      className="w-full min-h-[3.25rem] rounded-full text-white font-black text-sm tracking-wider transition-all active:scale-[0.98] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                      style={primaryBtnStyle}
                    >
                      {isLoading ? 'Working...' : isRegister ? 'Register' : 'Sign In'}
                    </button>
                  </form>
                )}

                {/* Toggle Registration link */}
                <p className="mt-6 text-center text-xs font-bold text-slate-555">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="font-black text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Create an Account
                  </Link>
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer Copy */}
      <p className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        © 2026 ZHI LearnAI · Singapore · <span className="text-slate-500">v2.5.0</span>
      </p>

    </div>
  );
}
