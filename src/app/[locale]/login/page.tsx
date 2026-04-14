'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Activity, Building2, ArrowLeft, Mail, Lock, ShieldCheck, UserPlus, LogIn, Sparkles } from 'lucide-react';
import Image from 'next/image';

const portals = [
  {
    id: 'student',
    title: 'Student explorer',
    desc: 'Child-safe learning sanctuary.',
    icon: Compass,
    accent: '#00D2FF',
    path: 'student',
    creds: { email: 'demo1@zhi.sg', pass: 'demo123', label: 'Student demo' }
  },
  {
    id: 'parent',
    title: 'Parent hub',
    desc: 'Track metrics & enrollment.',
    icon: Activity,
    accent: '#D4AF37',
    path: 'parent',
    creds: { email: 'kumar@parent.sg', pass: 'parent123', label: 'Parent demo' }
  },
  {
    id: 'school',
    title: 'Central Core',
    desc: 'System administration & logs.',
    icon: Building2,
    accent: '#9D50BB',
    path: 'admin',
    creds: { email: 'admin@zhilearn.sg', pass: 'admin123', label: 'Admin demo' }
  }
];

export default function LoginPage() {
  const [step, setStep] = useState<'selection' | 'auth'>('selection');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childGrade, setChildGrade] = useState('UKG');

  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';

  const handlePortalSwitch = (id: string) => {
    setSelectedPortal(id);
    setStep('auth');
    setIsRegister(false);
  };

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
       if (isRegister) {
          setIsSuccess(true);
          setIsLoading(false);
       } else {
          const portal = portals.find(p => p.id === selectedPortal);
          if (portal) router.push(`/${locale}/${portal.path}`);
       }
    }, 1500);
  };

  const activePortalInfo = portals.find(p => p.id === selectedPortal);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* ── AMBIENT GLASS BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -mr-48 -mt-48" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] -ml-48 -mb-48" />
         <div className="absolute inset-0 opacity-[0.03] grayscale brightness-0 pointer-events-none flex items-center justify-center">
            <Image src="/assets/img/logo.png" alt="" width={800} height={800} className="scale-150" />
         </div>
      </div>

      <div className="w-full max-w-7xl px-6 relative z-10 py-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {step === 'selection' ? (
            <motion.div key="selection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center w-full max-w-6xl">
               <div className="text-center mb-16">
                  <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Select Portal</h1>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Artificial Intelligence Learning Ecosystem</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8 w-full">
                  {portals.map((portal) => (
                    <div 
                      key={portal.id} 
                      onClick={() => handlePortalSwitch(portal.id)}
                      className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col items-center"
                    >
                       <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-all mb-8 shadow-inner">
                          <portal.icon size={28} />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 mb-2">{portal.title}</h3>
                       <p className="text-sm text-slate-500 font-medium mb-8 text-center px-4 leading-relaxed">{portal.desc}</p>
                       <div className="w-10 h-1 bg-slate-100 rounded-full group-hover:w-20 group-hover:bg-indigo-500 transition-all duration-500" />
                    </div>
                  ))}
               </div>
            </motion.div>
          ) : (
            <motion.div key="auth" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col md:flex-row items-center gap-10">
               
               {/* ── MAIN AUTH CARD ── */}
               <div className="w-full max-w-[500px] bg-white rounded-[4rem] p-12 md:p-16 shadow-3xl border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: activePortalInfo?.accent || '#000' }} />
                  
                  <button onClick={() => setStep('selection')} className="absolute top-10 left-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-indigo-600 transition-all">
                     <ArrowLeft size={16} /> Exit
                  </button>

                  <div className="flex flex-col items-center mb-12 mt-4 text-center">
                     <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center mb-6 text-slate-900 shadow-inner">
                        {isRegister ? <UserPlus size={28} /> : <LogIn size={28} />}
                     </div>
                     <h2 className="text-3xl font-black text-slate-900 mb-2">
                        {isRegister ? 'New Student' : 'Welcome Back'}
                     </h2>
                     <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        {isRegister ? 'Enrol your child in our global AI sanctuary.' : 'Secure access to your learning workspace.'}
                     </p>
                  </div>

                  {isSuccess ? (
                    <div className="py-10 text-center">
                       <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                          <ShieldCheck size={40} />
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 mb-2">Request Processed</h3>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10"> Administrative core is reviewing enrollment.</p>
                       <button onClick={() => setStep('selection')} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 shadow-xl transition-all">Finish Session</button>
                    </div>
                  ) : (
                    <form onSubmit={handleAction} className="space-y-6">
                       {isRegister && (
                         <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Parent Name</label>
                                  <input required type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Full Name" className="w-full px-5 py-4 border-2 border-transparent focus:border-indigo-100 bg-slate-50 focus:bg-white rounded-2xl outline-none text-sm transition-all" />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                                  <input required type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Full Name" className="w-full px-5 py-4 border-2 border-transparent focus:border-indigo-100 bg-slate-50 focus:bg-white rounded-2xl outline-none text-sm transition-all" />
                               </div>
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Grade Level</label>
                               <select value={childGrade} onChange={(e) => setChildGrade(e.target.value)} className="w-full px-5 py-4 bg-slate-50 border-none outline-none rounded-2xl text-sm appearance-none">
                                  <option>LKG</option> <option>UKG</option> <option>Class 1</option> <option>Class 2</option>
                               </select>
                            </div>
                         </div>
                       )}

                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Communication Key (Email)</label>
                          <div className="relative group">
                             <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-all" />
                             <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full pl-14 pr-5 py-4 border-2 border-transparent focus:border-indigo-100 bg-slate-50 focus:bg-white rounded-2xl outline-none text-sm transition-all" />
                          </div>
                       </div>

                       {!isRegister && (
                         <div className="space-y-1 animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Cipher (Password)</label>
                            <div className="relative group">
                               <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-all" />
                               <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-14 pr-5 py-4 border-2 border-transparent focus:border-indigo-100 bg-slate-50 focus:bg-white rounded-2xl outline-none text-sm tracking-widest transition-all" />
                            </div>
                         </div>
                       )}

                       <button type="submit" disabled={isLoading} className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all">
                          {isLoading ? 'Processing...' : (isRegister ? 'Submit Enrolment' : 'Authorize LogIn')}
                       </button>

                       <div className="pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2">
                             <span className="text-xs text-slate-400 font-medium">{isRegister ? 'Already an active user?' : 'Are you a new student?'}</span>
                             <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-colors">
                                {isRegister ? 'Sign In Now' : 'Enrol Here'}
                             </button>
                          </div>
                       </div>
                    </form>
                  )}
               </div>

               {/* ── SIDEBAR DEMO CREDENTIALS ── */}
               <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block w-[320px] space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900" />
                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-inner">
                           <Sparkles size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Demo Assistant</p>
                           <h4 className="font-black text-slate-900">Auth Credentials</h4>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <div 
                          onClick={() => { setEmail(activePortalInfo?.creds.email || ''); setPassword(activePortalInfo?.creds.pass || ''); }}
                          className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all group/item"
                        >
                           <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-3 leading-none">{activePortalInfo?.creds.label}</p>
                           <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                 <span className="text-xs font-bold text-slate-500">Login:</span>
                                 <span className="text-xs font-black text-slate-900 font-mono tracking-tight">{activePortalInfo?.creds.email}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-xs font-bold text-slate-500">Pass:</span>
                                 <span className="text-xs font-black text-slate-900 font-mono tracking-tight">{activePortalInfo?.creds.pass}</span>
                              </div>
                           </div>
                           <p className="mt-4 text-[9px] font-bold text-slate-300 uppercase italic text-center group-hover/item:text-indigo-400 transition-colors">Click to Auto-fill Form</p>
                        </div>

                        <div className="p-5 bg-slate-900 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                           <div className="relative z-10">
                              <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 leading-none">Pro Tip</p>
                              <p className="text-[11px] font-medium leading-relaxed opacity-80">Use the Enrol form to show how new parents are approved by the admin dashboard in real-time.</p>
                           </div>
                           <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10" />
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-slate-300 opacity-50">
                     <ShieldCheck size={14} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Secured Demo Environment</span>
                  </div>
               </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
