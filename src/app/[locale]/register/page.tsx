'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useQuery } from '@tanstack/react-query';
import { Manrope } from 'next/font/google';
import {
  Mail, Phone, GraduationCap, ArrowRight, CheckCircle2, AlertCircle,
  ArrowLeft, ShieldCheck, User, Building, MapPin, Award, ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export default function RegisterPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [step, setStep] = useState<'type' | 'details' | 'setup' | 'submitting' | 'success'>('type');
  const [regType, setRegType] = useState<'parent' | 'school'>('parent');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    child_name: '', child_grade_id: '', child_gender: '', child_dob: '',
    school_name: '', address: '', city: '', board_name: '',
  });

  const { data: gradesData } = useQuery({
    queryKey: ['public', 'grades'],
    queryFn: () => fetch(`${BASE}/api/grades`).then(r => r.json()).then(d => d.data ?? []),
    staleTime: 10 * 60 * 1000,
  });
  const grades = Array.isArray(gradesData) ? gradesData : [];

  const handleNextStep = () => {
    setError('');
    if (step === 'type') { setStep('details'); return; }
    if (step === 'details') {
      if (!form.name.trim() || !form.email.trim()) { setError('Please fill in your name and email.'); return; }
      setStep('setup');
    }
  };

  const handlePrevStep = () => {
    setError('');
    if (step === 'details') setStep('type');
    else if (step === 'setup') setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (regType === 'parent') {
      if (!form.child_name.trim() || !form.child_grade_id || !form.child_gender || !form.child_dob) {
        setError("Please fill in your child's name, grade, gender, and date of birth.");
        return;
      }
      const dob = new Date(form.child_dob);
      const today = new Date();
      if (isNaN(dob.getTime())) {
        setError("Please enter a valid date of birth.");
        return;
      }
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      const selectedGrade = grades.find((g: any) => g.id === form.child_grade_id);
      const gradeName = selectedGrade ? selectedGrade.name : '';

      if (gradeName === 'LKG') {
        if (age < 3 || age >= 5) {
          setError("Child must be between 3 and 4 years old for LKG registration.");
          return;
        }
      } else if (gradeName === 'UKG') {
        if (age < 4 || age >= 6) {
          setError("Child must be between 4 and 5 years old for UKG registration.");
          return;
        }
      } else if (gradeName === 'Grade 1') {
        if (age < 5 || age >= 8) {
          setError("Child must be between 5 and 7 years old for Grade 1 registration.");
          return;
        }
      }
    } else {
      if (!form.school_name.trim()) { setError("Please enter your school's name."); return; }
    }
    setStep('submitting');
    try {
      const endpoint = regType === 'parent' ? `${BASE}/api/auth/register-parent` : `${BASE}/api/auth/register-school`;
      const body = regType === 'parent'
        ? {
            parent_name: form.name.trim(),
            parent_email: form.email.trim().toLowerCase(),
            parent_phone: form.phone.trim() || null,
            child_name: form.child_name.trim(),
            child_grade_id: form.child_grade_id || null,
            child_gender: form.child_gender || null,
            child_dob: form.child_dob || null,
            school_id: null
          }
        : { school_name: form.school_name.trim(), admin_name: form.name.trim(), admin_email: form.email.trim().toLowerCase(), admin_phone: form.phone.trim() || null, address: form.address.trim() || null, city: form.city.trim() || null, board_name: form.board_name.trim() || null };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('setup');
    }
  };

  const stepNum = step === 'type' ? 1 : step === 'details' ? 2 : 3;
  const stepLabel = step === 'type' ? 'Account Type' : step === 'details' ? 'Profile Details' : 'Curriculum Setup';
  const stepPct = step === 'type' ? '33%' : step === 'details' ? '66%' : '100%';
  const accentColor = regType === 'parent' ? '#f59e0b' : '#16a085';
  
  const activeInputClass = regType === 'parent'
    ? 'bg-amber-500/[0.03] border-amber-500/20 focus:bg-white focus:border-amber-500 focus:ring-amber-500/10'
    : 'bg-emerald-500/[0.03] border-emerald-500/20 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/10';

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
      
      {/* 2-Column Split Layout - flex-col-reverse swaps order on mobile so Form is first and branding is below */}
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
              Empower your students with ZHI LearnAI.
            </h2>
            <p className="text-slate-550 font-semibold leading-relaxed text-xs sm:text-sm xl:text-base px-3 sm:px-0">
              A comprehensive educational platform designed to make learning engaging, personalized, and interactive. Join thousands of parents and school networks.
            </p>
          </div>

          {/* Feature List Cards */}
          <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
            {[
              {
                title: "Gamified Learning System",
                desc: "Engaging interactive quizzes, badges, and levels designed to maintain student focus and drive.",
                icon: "award",
                color: "bg-amber-500/10 text-amber-600 border-amber-500/15"
              },
              {
                title: "Personalized AI Tutoring",
                desc: "Real-time automated guidance catering to student capabilities and individual learning curve.",
                icon: "graduation",
                color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/15"
              },
              {
                title: "School & Parent Reports",
                desc: "Complete insights on quiz attempts, learning time, success rate, and category performance.",
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

          {/* Live stats strip */}
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

        {/* RIGHT COLUMN: The Registration Card Shell (Appears at top on mobile, right side on desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          
          {/* Upper Nav Links for the card */}
          <div className="w-full max-w-xl flex items-center justify-between px-2 mb-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors">
              <ArrowLeft size={14} /> Home
            </Link>
            <Link href="/login" className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition-colors">
              Sign In <ChevronRight size={14} />
            </Link>
          </div>

          {/* The form wizard card */}
          <div className="w-full max-w-xl border rounded-[1.8rem] sm:rounded-[2.2rem] p-6 sm:p-10 backdrop-blur-xl" style={cardBackgroundStyle}>
            
            {/* Centered Header: Horizontal row for Logo + Text title, centered with big logo */}
            <div className="flex flex-row items-center gap-4 sm:gap-6 justify-center mb-6 pb-5 border-b border-slate-200/50">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                {/* Backdrop Glow behind logo */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-emerald-500/10 to-amber-500/10 blur-lg animate-pulse" />
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

            {/* Success screen */}
            {step === 'success' && (
              <div className="flex flex-col items-center text-center py-4">
                {/* Glowing Success Badge */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse scale-150" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 border border-emerald-400/30 flex items-center justify-center text-white shadow-[0_12px_30px_rgba(22,160,133,0.3)]">
                    <ShieldCheck size={38} />
                  </div>
                </div>

                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.25em] mb-1">Registration Received</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">Onboarding Initiated</h2>
                
                <div className="mt-4 mb-6 p-4.5 rounded-2xl bg-white/40 border border-slate-200/40 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
                  Thank you, <strong className="text-slate-900 font-extrabold">{form.name}</strong>! Your registration request for <strong className="text-slate-900 font-extrabold">{regType === 'parent' ? form.child_name : form.school_name}</strong> has been successfully received and queued for review.
                </div>

                {/* Pipeline / Next Steps */}
                <div className="w-full bg-gradient-to-b from-white/80 to-white/40 border border-slate-200/40 shadow-sm rounded-[2rem] p-6 mb-6 text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pb-2.5 border-b border-slate-100">Next Steps & Workflow</p>
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Validation & Verification', 
                        desc: 'Our administrators verify school credentials or parent details and approve the account.',
                        icon: ShieldCheck,
                        color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      },
                      { 
                        title: 'Credentials Email Dispatch', 
                        desc: 'Once approved, secure system login details are auto-generated and dispatched to your email.',
                        icon: Mail,
                        color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      },
                      { 
                        title: 'Interactive Curriculum Launch', 
                        desc: 'Sign in to access personalized adaptive quests, tutorials, rewards, and real-time reports.',
                        icon: GraduationCap,
                        color: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start group">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${item.color}`}>
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-wide">{item.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl py-3 px-5 mb-8 text-center max-w-sm">
                  <p className="text-[11px] text-slate-500 font-medium">
                    Onboarding updates will be sent to <strong className="text-emerald-700 font-bold">{form.email}</strong>
                  </p>
                </div>

                <Link href="/login" className="w-full flex items-center justify-center gap-2.5 min-h-[3.5rem] rounded-full text-white font-black text-sm tracking-wider uppercase transition-all duration-200 active:scale-[0.98]" style={primaryBtnStyle}>
                  Go to Login <ArrowRight size={16} />
                </Link>
              </div>
            )}

            {/* Submitting screen */}
            {step === 'submitting' && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-emerald-600 animate-spin mb-4" />
                <p className="text-sm font-bold text-slate-700">Submitting request to database...</p>
              </div>
            )}

            {/* Main Stepper Form */}
            {step !== 'success' && step !== 'submitting' && (
              <div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200/40 rounded-full mb-5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: stepPct,
                      background: `linear-gradient(90deg, #12312f, ${accentColor})`
                    }}
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-slate-455 uppercase tracking-widest">Step {stepNum} of 3</span>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{stepLabel}</span>
                </div>

                {/* Step 1: Select Type */}
                {step === 'type' && (
                  <div className="space-y-5">
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">Onboarding Pathway</h2>
                      <p className="text-xs text-slate-500 mt-1">Please select the type of account you want to register.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Parent Option Card */}
                      <button
                        type="button"
                        onClick={() => setRegType('parent')}
                        className="flex flex-col items-start p-5 border-2 rounded-2xl transition-all duration-350 hover:scale-[1.02] active:scale-[0.98] text-left"
                        style={{
                          borderColor: regType === 'parent' ? '#f59e0b' : 'rgba(245, 158, 11, 0.15)',
                          background: regType === 'parent' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.02)',
                          boxShadow: regType === 'parent' ? '0 12px 24px rgba(245,158,11,0.12)' : 'none'
                        }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm" style={{ background: '#f59e0b', color: '#ffffff' }}>
                          <User size={18} />
                        </div>
                        <span className="text-sm font-black text-slate-800">Home Study</span>
                        <span className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-semibold">
                          For individual home learning. Track individual student progress & scores.
                        </span>
                      </button>

                      {/* School Option Card */}
                      <button
                        type="button"
                        onClick={() => setRegType('school')}
                        className="flex flex-col items-start p-5 border-2 rounded-2xl transition-all duration-350 hover:scale-[1.02] active:scale-[0.98] text-left"
                        style={{
                          borderColor: regType === 'school' ? '#16a085' : 'rgba(22, 160, 133, 0.15)',
                          background: regType === 'school' ? 'rgba(22, 160, 133, 0.08)' : 'rgba(22, 160, 133, 0.02)',
                          boxShadow: regType === 'school' ? '0 12px 24px rgba(22, 160, 133, 0.12)' : 'none'
                        }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm" style={{ background: '#16a085', color: '#ffffff' }}>
                          <Building size={18} />
                        </div>
                        <span className="text-sm font-black text-slate-800">School Program</span>
                        <span className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-semibold">
                          For principals or school administrators looking to register their institution.
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Profile Details */}
                {step === 'details' && (
                  <div className="space-y-4">
                    <div className="text-center sm:text-left">
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">Profile Details</h2>
                      <p className="text-xs text-slate-500 mt-1">Provide your credentials to establish ownership of the account.</p>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-wider mb-1.5">Your Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Enter your full name"
                          className={`w-full py-3.5 px-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450 transition-all outline-none ${activeInputClass}`}
                          suppressHydrationWarning
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Email Address *</label>
                        <div className="relative flex items-center">
                          <Mail size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="you@domain.com"
                            className={`w-full py-3.5 pl-11 pr-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-455 transition-all outline-none ${activeInputClass}`}
                            suppressHydrationWarning
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Phone / Mobile</label>
                        <div className="relative flex items-center">
                          <Phone size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="Mobile connection number"
                            className={`w-full py-3.5 pl-11 pr-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450 transition-all outline-none ${activeInputClass}`}
                            suppressHydrationWarning
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Setup details */}
                {step === 'setup' && (
                  <div className="space-y-4">
                    {regType === 'parent' ? (
                      <>
                        <div className="text-center sm:text-left">
                          <h2 className="text-lg font-black text-slate-900 tracking-tight">Child Details</h2>
                          <p className="text-xs text-slate-500 mt-1">Link your child's name and grade level to generate lessons.</p>
                        </div>

                        <div className="space-y-3.5">
                          <div>
                            <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Child Name *</label>
                            <input
                              required
                              type="text"
                              value={form.child_name}
                              onChange={e => setForm(f => ({ ...f, child_name: e.target.value }))}
                              placeholder="Enter child's full name"
                              className={`w-full py-3.5 px-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450 transition-all outline-none ${activeInputClass}`}
                              suppressHydrationWarning
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Grade Level *</label>
                            <select
                              required
                              value={form.child_grade_id}
                              onChange={e => setForm(f => ({ ...f, child_grade_id: e.target.value }))}
                              className={`w-full py-3.5 px-4 border rounded-xl text-sm font-semibold text-slate-955 transition-all outline-none appearance-none ${activeInputClass}`}
                            >
                              <option value="">Select Grade</option>
                              {grades.map((g: any) => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Gender *</label>
                              <select
                                required
                                value={form.child_gender}
                                onChange={e => setForm(f => ({ ...f, child_gender: e.target.value }))}
                                className={`w-full py-3.5 px-4 border rounded-xl text-sm font-semibold text-slate-955 transition-all outline-none appearance-none ${activeInputClass}`}
                              >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Date of Birth *</label>
                              <input
                                required
                                type="date"
                                value={form.child_dob}
                                onChange={e => setForm(f => ({ ...f, child_dob: e.target.value }))}
                                className={`w-full py-3.5 px-4 border rounded-xl text-sm font-semibold text-slate-955 transition-all outline-none ${activeInputClass}`}
                                suppressHydrationWarning
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center sm:text-left">
                          <h2 className="text-lg font-black text-slate-900 tracking-tight">Institution Details</h2>
                          <p className="text-xs text-slate-500 mt-1">Onboard your school. Fill out official institution parameters.</p>
                        </div>

                        <div className="space-y-3.5">
                          <div>
                            <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">School / Institution Name *</label>
                            <div className="relative flex items-center">
                              <Building size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                              <input
                                required
                                type="text"
                                value={form.school_name}
                                onChange={e => setForm(f => ({ ...f, school_name: e.target.value }))}
                                placeholder="Official school name"
                                className={`w-full py-3.5 pl-11 pr-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-455 transition-all outline-none ${activeInputClass}`}
                                suppressHydrationWarning
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Board Affiliation</label>
                              <div className="relative flex items-center">
                                <Award size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                                <input
                                  type="text"
                                  value={form.board_name}
                                  onChange={e => setForm(f => ({ ...f, board_name: e.target.value }))}
                                  placeholder="e.g. CBSE, ICSE"
                                  className={`w-full py-3.5 pl-11 pr-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450 transition-all outline-none ${activeInputClass}`}
                                  suppressHydrationWarning
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">City</label>
                              <div className="relative flex items-center">
                                <MapPin size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
                                <input
                                  type="text"
                                  value={form.city}
                                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                                  placeholder="School Location City"
                                  className={`w-full py-3.5 pl-11 pr-4 border rounded-xl text-sm font-semibold text-slate-955 placeholder-slate-450 transition-all outline-none ${activeInputClass}`}
                                  suppressHydrationWarning
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-black text-slate-455 uppercase tracking-wider mb-1.5">Address</label>
                            <input
                              type="text"
                              value={form.address}
                              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                              placeholder="Complete physical street address"
                              className={`w-full py-3.5 px-4 border rounded-xl text-sm font-semibold text-slate-955 transition-all outline-none ${activeInputClass}`}
                              suppressHydrationWarning
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Error field */}
                {error && (
                  <div className="mt-5 bg-rose-50 border border-rose-100 rounded-xl p-3.5 flex items-center gap-2.5">
                    <AlertCircle size={16} className="text-rose-600 shrink-0" />
                    <p className="text-xs font-bold text-rose-700 leading-normal">{error}</p>
                  </div>
                )}

                {/* Action CTA */}
                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex gap-3">
                    {step !== 'type' && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-1 min-h-[3.25rem] inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white/50 text-slate-600 hover:bg-white/80 active:scale-[0.98] font-black uppercase tracking-wider text-xs transition-all duration-200"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    )}
                    
                    {step !== 'setup' ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1 min-h-[3.25rem] inline-flex items-center justify-center gap-1.5 rounded-full text-white active:scale-[0.98] font-black uppercase tracking-wider text-xs transition-all duration-200"
                        style={primaryBtnStyle}
                      >
                        Continue <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 min-h-[3.25rem] inline-flex items-center justify-center gap-1.5 rounded-full text-white active:scale-[0.98] font-black uppercase tracking-wider text-xs transition-all duration-200"
                        style={{
                          background: regType === 'parent' ? '#f59e0b' : '#16a085',
                          boxShadow: regType === 'parent' ? '0 12px 24px rgba(245, 158, 11, 0.18)' : '0 12px 24px rgba(22, 160, 133, 0.18)'
                        }}
                      >
                        Submit <CheckCircle2 size={14} />
                      </button>
                    )}
                  </div>

                  <p className="text-center text-xs font-bold text-slate-550 mt-2">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="transition-colors hover:opacity-80"
                      style={{ color: accentColor }}
                    >
                      Sign In
                    </Link>
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer Copy */}
      <p className="mt-12 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
        © 2026 ZHI LearnAI · Singapore · <span className="text-slate-500">v2.5.0</span>
      </p>

    </div>
  );
}
