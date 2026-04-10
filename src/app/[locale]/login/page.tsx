'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Activity, Building2, ArrowRight, ArrowLeft, Mail, Lock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const portals = [
  {
    id: 'student',
    title: 'Student Explorer',
    desc: 'Enter the 3D sanctuary.',
    icon: Compass,
    accent: '#00D2FF',
    path: 'student'
  },
  {
    id: 'parent',
    title: 'Parent Intelligence',
    desc: 'Track AI neural progress.',
    icon: Activity,
    accent: '#D4AF37',
    path: 'parent'
  },
  {
    id: 'school',
    title: 'Core Ecosystem',
    desc: 'Institutional control grid.',
    icon: Building2,
    accent: '#9D50BB',
    path: 'admin'
  }
];

export default function LoginPage() {
  const [step, setStep] = useState<'selection' | 'auth'>('selection');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const portalParam = params.get('portal');
      if (portalParam && portals.some(p => p.id === portalParam)) {
        setSelectedPortal(portalParam);
        setStep('auth');
      }
    }
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';

  const handleContinue = () => {
    if (selectedPortal) setStep('auth');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const portal = portals.find(p => p.id === selectedPortal);
      if (portal) router.push(`/${locale}/${portal.path}`);
    }, 1500);
  };

  const activePortalInfo = portals.find(p => p.id === selectedPortal);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center relative overflow-hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
      
      {/* ── TECHNICAL STRUCTURAL BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
         {/* Blueprint Grid */}
         <div className="absolute inset-0 opacity-40 mix-blend-multiply z-10" 
              style={{ backgroundImage: 'linear-gradient(#f1f5f9 1.5px, transparent 1.5px), linear-gradient(90deg, #f1f5f9 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
         
         {/* Center ambient glow */}
         <div className="w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-80 absolute z-0" />
         
         {/* Massive Blurred Logo Watermark */}
         <div className="absolute z-0 opacity-[0.03] scale-[2] sm:scale-[2.5] md:scale-[3.5] blur-[3px]">
            <Image src="/assets/img/logo.png" alt="" width={600} height={600} className="object-contain" priority />
         </div>
      </div>

      {/* ── TOP NAV LOGO ── */}
      <div className="absolute top-8 left-8 sm:left-12 z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push(`/${locale}`)}>
          <Image src="/assets/img/logo.png" alt="Zhi Logo" width={32} height={32} className="object-contain transition-transform group-hover:scale-110" />
          <span className="font-extrabold text-xl tracking-[0.1em] text-[#013237]">
            ZHI <span className="text-[#D4AF37]">LearnAI</span>
          </span>
        </div>
      </div>

      <div className="w-full max-w-5xl px-4 sm:px-6 relative z-10 flex flex-col items-center justify-center min-h-screen py-16 md:py-24">
        <AnimatePresence mode="wait">
          
          {step === 'selection' ? (
            /* ════════════════════════════════════
               STEP 1: CRISP CARD SELECTION
               ════════════════════════════════════ */
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-14">
                 <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Select your Platform
                 </h1>
                 <p className="text-slate-500 text-[15px] font-medium">
                    Choose your designated workspace to proceed.
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
                {portals.map((portal, idx) => {
                  const isSelected = selectedPortal === portal.id;
                  const Icon = portal.icon;
                  
                  return (
                    <motion.div
                      key={portal.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      onClick={() => {
                        setSelectedPortal(portal.id);
                        setTimeout(() => setStep('auth'), 200);
                      }}
                      className="relative group cursor-pointer h-full"
                    >
                      {/* PURE WHITE HIGHLIGHTED CARD */}
                      <div className={`h-full relative overflow-hidden rounded-[2rem] p-6 sm:p-8 transition-all duration-300 flex flex-col items-center text-center
                        bg-white ring-1
                        ${isSelected 
                           ? 'ring-[#013237] shadow-[0_30px_60px_-15px_rgba(1,50,55,0.15)] ring-offset-4 ring-offset-slate-50 -translate-y-2' 
                           : 'ring-slate-200 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:ring-slate-300'
                        }`}
                      >
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                           ${isSelected ? 'bg-[#013237] text-white shadow-xl' : 'bg-slate-50 text-slate-600 group-hover:bg-slate-100'}`}>
                            <Icon size={28} strokeWidth={2} />
                         </div>
                         <h3 className={`text-lg font-bold tracking-tight mb-2 transition-colors ${isSelected ? 'text-[#013237]' : 'text-slate-800'}`}>
                           {portal.title}
                         </h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed">
                           {portal.desc}
                         </p>
                         
                         {/* Selection Dot */}
                         <div className="mt-6">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                               ${isSelected ? 'border-[#013237] bg-[#013237]' : 'border-slate-200 bg-white'}`}>
                               {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Auto-progression replaces the Continue button */}
            </motion.div>

          ) : (

            /* ════════════════════════════════════
               STEP 2: HIGHLIGHTED PURE WHITE AUTH 
               ════════════════════════════════════ */
            <motion.div 
              key="auth"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[440px] mx-auto relative"
            >
              {/* THE WHITE CARD: High contrast pure white on slate-50 background */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.03)] relative overflow-hidden">
                
                {/* Visual Accent Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: activePortalInfo?.accent || '#013237' }} />

                <button 
                  onClick={() => setStep('selection')}
                  disabled={isLoading}
                  className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#013237] hover:bg-slate-100 hover:border-slate-200 transition-all z-10"
                >
                   <ArrowLeft size={14} strokeWidth={2.5} />
                   <span className="text-[11px] font-bold uppercase tracking-widest mt-[1px]">Back</span>
                </button>

                <div className="flex flex-col items-center mb-8 mt-5">
                   <div className="w-14 h-14 rounded-full bg-[#F8FAFC] ring-1 ring-slate-100 flex items-center justify-center mb-5 text-[#013237]">
                      {activePortalInfo && <activePortalInfo.icon size={26} strokeWidth={1.5} />}
                   </div>
                   <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 text-center">
                      Welcome back
                   </h2>
                   <p className="text-[13px] text-slate-500 mt-2 font-medium">
                      Please enter your details to sign in.
                   </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                     <label className="text-[12px] font-bold text-slate-700 ml-1">Email address</label>
                     <div className="relative group">
                        <Mail size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-[50%] text-slate-400 group-focus-within:text-[#013237] transition-colors" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. user@zhilearn.sg"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-300 focus:border-[#013237] focus:ring-4 focus:ring-[#013237]/5"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between items-center ml-1 mr-1">
                        <label className="text-[12px] font-bold text-slate-700">Password</label>
                        <a href="#" className="text-[12px] font-semibold text-[#013237] hover:underline">Forgot password?</a>
                     </div>
                     <div className="relative group">
                        <Lock size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-[50%] text-slate-400 group-focus-within:text-[#013237] transition-colors" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-300 focus:border-[#013237] focus:ring-4 focus:ring-[#013237]/5 tracking-[0.2em]"
                        />
                     </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-bold text-[14px] text-white hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
                    style={{ backgroundColor: '#013237', boxShadow: '0 10px 20px -5px rgba(1,50,55,0.25)' }}
                  >
                    {isLoading ? (
                       <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                       <>Sign In to Platform</>
                    )}
                  </button>
                  
                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
                     <ShieldCheck size={14} />
                     <span className="text-[11px] font-semibold">Secured by ZHI Biometrics</span>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
