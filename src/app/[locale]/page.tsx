'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Play, ArrowRight, CheckCircle2, BookOpen, Brain, BarChart3,
  Globe, Shield, Sparkles, Star, ChevronRight,
  GraduationCap, Heart, Settings, Eye, Zap, Layers,
  Mail, Phone, User, MessageSquare, MessageCircle, X, Menu,
  ExternalLink, Video, AtSign
} from 'lucide-react';
import { useState } from 'react';

/* === Animation variants === */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/* === SectionLabel === */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label">
      <Sparkles size={12} className="inline-block mr-2" />
      {children}
    </span>
  );
}

/* === HOME PAGE === */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Portals', href: '#portals' },
    { label: 'Vision', href: '#vision' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image src="/assets/img/logo.png" alt="Zhi Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-emerald-900">ZHI <span className="text-amber-600">LearnAI</span></span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Smart Nation Ready</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="nav-link text-sm uppercase tracking-wide">{l.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="btn-primary py-2.5 px-6 rounded-lg text-sm">
              GET STARTED <ArrowRight size={16} />
            </a>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 overflow-hidden min-h-[85vh] flex items-center">
        {/* Blurred Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950">
          <Image 
            src="/assets/img/hero.png" 
            alt="Hero Background" 
            fill 
            className="object-cover scale-105 blur-[6px] opacity-80"
            priority
          />
          {/* Subtle dark gradient overlay to make text pop while keeping image very visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-white" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="text-center w-full max-w-5xl mx-auto mt-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 bg-slate-900/50 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                <Sparkles size={14} className="text-amber-400" />
                Singapore's #1 AI Learning Platform
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold mb-6 leading-[1.1] text-white tracking-tight drop-shadow-lg">
                Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">Next Generation</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-md">
                Experience MOE-aligned, story-driven animated lessons enhanced with 
                Personalised AI Tutoring. Designed for Singaporean learners from LKG to Class 12.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="#how-it-works" className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-1 text-base">
                  Explore platform <ArrowRight size={18} />
                </a>
                <a href="#demo" className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-2xl font-bold border border-white/20 shadow-xl transition-all hover:-translate-y-1 text-base">
                  <Video size={18} className="text-emerald-400" /> Watch demo
                </a>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements for Advanced Aesthetic */}
          <div className="mt-10 lg:mt-16 relative max-w-5xl mx-auto h-[250px] hidden md:block">
             {/* Left floating card */}
             <motion.div 
               animate={{ y: [0, -15, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 left-4 lg:left-10 bg-slate-900/60 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/10 w-[280px]"
             >
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                   <Brain size={24} className="text-emerald-400" />
                 </div>
                 <div>
                   <div className="text-sm font-extrabold text-white">AI Tutor Mode</div>
                   <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                     Active Now
                   </div>
                 </div>
               </div>
               <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2 shadow-inner">
                 <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-3/4 rounded-full"></div>
               </div>
               <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                 <span>Personalising path</span>
                 <span className="text-emerald-400">75%</span>
               </div>
             </motion.div>

             {/* Right floating card */}
             <motion.div 
               animate={{ y: [0, 20, 0] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-16 right-4 lg:right-10 bg-slate-900/60 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/10 w-[260px]"
             >
               <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center shadow-md ${i % 2 === 0 ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
                         <User size={12} className={i % 2 === 0 ? 'text-amber-400' : 'text-emerald-400'} />
                       </div>
                     ))}
                   </div>
                   <div className="text-xs font-extrabold text-white">50,000+ Trust</div>
                 </div>
                 <div className="text-xs font-medium text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-white/5 shadow-inner italic">
                   "The platform feels like a real private tutor for my child."
                 </div>
               </div>
             </motion.div>

             {/* Center verification badges */}
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 lg:gap-10"
             >
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-[20px] bg-slate-900/60 backdrop-blur-xl shadow-2xl border border-white/10 flex items-center justify-center text-emerald-400 transform rotate-3 group-hover:rotate-0 transition-transform">
                    <Shield size={28} />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-slate-300 uppercase bg-slate-900/60 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/10">PDPA Compliant</span>
                </div>
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-[20px] bg-slate-900/60 backdrop-blur-xl shadow-2xl border border-white/10 flex items-center justify-center text-emerald-400 transform -rotate-3 group-hover:rotate-0 transition-transform">
                    <CheckCircle2 size={28} />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-slate-300 uppercase bg-slate-900/60 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/10">MOE Standards</span>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 px-6 max-w-7xl mx-auto -mt-12 md:-mt-20 mb-6">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8 md:p-14 relative overflow-hidden">
          {/* Subtle glow inside the stat card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {[
              { label: 'Active Students', val: '50K+', color: 'text-emerald-700', bg: 'bg-emerald-100/50 border border-emerald-200' },
              { label: 'Animated Lessons', val: '1,200+', color: 'text-blue-700', bg: 'bg-blue-100/50 border border-blue-200' },
              { label: 'User Satisfaction', val: '98%', color: 'text-amber-600', bg: 'bg-amber-100/50 border border-amber-200' },
              { label: 'Daily Doubts Solved', val: '10K+', color: 'text-purple-700', bg: 'bg-purple-100/50 border border-purple-200' },
            ].map((s, i) => (
              <motion.div 
                key={s.label} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center flex flex-col items-center group"
              >
                <div className="text-5xl md:text-6xl font-black mb-4 text-slate-800 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 drop-shadow-sm">
                  {s.val}
                </div>
                <div className={`px-4 py-2 flex items-center justify-center rounded-full ${s.bg} ${s.color} text-[11px] font-black uppercase tracking-widest shadow-sm transition-all group-hover:shadow-md`}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who uses this - Collaborative Learning Section with BG Image */}
      <section id="portals" className="relative pt-10 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/img/group.png" 
            alt="Students collaborating" 
            fill 
            className="object-cover opacity-[0.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="section-label">Portals</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">A Unified Learning Experience</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Tools tailored for every participant in the education journey.</p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Student Portal', 
              icon: GraduationCap, 
              desc: 'Access animated lessons, quizzes, and ask doubts to our 24/7 AI Tutor.', 
              features: ['Animated Lessons', 'AI Doubt Solving', 'Progress Gamification']
            },
            { 
              title: 'Parent Portal', 
              icon: Heart, 
              desc: 'Monitor your child\'s learning journey with real-time reports and activity tracking.', 
              features: ['Performance Metrics', 'Lesson Completion', 'Skill Gap Analysis']
            },
            { 
              title: 'Admin Portal', 
              icon: Settings, 
              desc: 'Comprehensive content management and deep analytics for schools and admins.', 
              features: ['User Management', 'Content QC', 'Platform Analytics']
            },
          ].map((p, i) => (
            <motion.div 
              key={p.title} 
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
              className="premium-card flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                <p.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">{p.title}</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">{p.desc}</p>
              <ul className="space-y-3 mt-auto w-full">
                {p.features.map(f => (
                  <li key={f} className="text-xs font-semibold text-slate-400 bg-slate-50 py-2 rounded-lg border border-slate-100">{f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 bg-emerald-950 text-white relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-800/20 rounded-full blur-[120px] -mr-64 -mt-64" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block text-amber-500 font-bold tracking-[0.2em] text-xs mb-6 uppercase">Why we lead the market</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Advanced technology meets Singaporean pedagogy</h2>
              <div className="space-y-8">
                {[
                  { title: 'Animated Micro-Lessons', desc: 'Complex concepts simplified through story-based 3D/2D animations.', icon: Video },
                  { title: 'AI-Driven Personalisation', desc: 'Proprietary algorithms that identify student weaknesses before they do.', icon: Brain },
                  { title: 'Bilingual Support', desc: 'Content delivered in English & Tamil/Hindi - suited for local requirements.', icon: Globe },
                ].map(f => (
                  <div key={f.title} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-amber-500">
                      <f.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{f.title}</h4>
                      <p className="text-emerald-100/60 leading-relaxed text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="image-overlay relative rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
                <Image 
                  src="/assets/img/achievement.png" 
                  alt="Student success" 
                  width={700} 
                  height={800} 
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500 rounded-full flex flex-col items-center justify-center text-emerald-950 font-bold shadow-2xl z-20">
                <div className="text-xs uppercase tracking-tighter">Achievement</div>
                <div className="text-3xl">100%</div>
                <div className="text-[10px] text-center px-4 leading-none pt-1">Student Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Roadmap Section */}
      <section id="vision" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <SectionLabel>Roadmap 2026</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Future of AI Learning</h2>
          <p className="text-slate-500 max-w-2xl mx-auto lg:text-lg italic">"A Smart Nation starts with smart learners."</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: 'Phase 2', title: 'Virtual AI Tutor', desc: 'Real-time conversational bot that mimics a human private tutor.', icon: MessageCircle, color: 'text-amber-600 bg-amber-50' },
            { tag: 'Phase 3', title: 'AR Classrooms', desc: 'Bring science experiments home with augmented reality visuals.', icon: Eye, color: 'text-emerald-600 bg-emerald-50' },
            { tag: 'Phase 3', title: 'Gamified Quest', desc: 'Turn learning into an adventure with badges and global leaderboards.', icon: Zap, color: 'text-indigo-600 bg-indigo-50' },
            { tag: 'Phase 4', title: 'ASEAN Expansion', desc: 'Expanding curriculum to meet international school standards.', icon: Globe, color: 'text-rose-600 bg-rose-50' },
          ].map(r => (
            <div key={r.title} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${r.color}`}>
                <r.icon size={28} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{r.tag}</div>
              <h3 className="text-xl font-bold mb-3">{r.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Get Demo Section */}
      <section id="contact" className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-5 border border-slate-100">
            <div className="lg:col-span-2 bg-emerald-950 p-12 text-white relative">
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Let's build the future together.</h3>
                <p className="text-emerald-100/70 mb-12">Book a personalised demo for your school or institution.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail size={20} className="text-amber-500" />
                    <span className="text-sm font-medium">hello@zhilearnai.sg</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={20} className="text-amber-500" />
                    <span className="text-sm font-medium">+65 6789 0123</span>
                  </div>
                </div>
              </div>
              <Image 
                src="/assets/img/logo.png" 
                alt="Zhi bg" 
                width={300} 
                height={300} 
                className="absolute -bottom-20 -right-20 opacity-[0.03] scale-150 rotate-12"
              />
            </div>
            
            <div className="lg:col-span-3 p-12">
              <form className="grid sm:grid-cols-2 gap-6" onSubmit={e => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <input type="text" placeholder="David Lim" className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 text-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <input type="email" placeholder="you@school.edu.sg" className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 text-sm transition-colors" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact Reason</label>
                  <select className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 text-sm transition-colors">
                    <option>School Demo Request</option>
                    <option>Partnership Enquiry</option>
                    <option>General Support</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea rows={4} placeholder="Tell us how we can help..." className="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 text-sm transition-colors" />
                </div>
                <div className="sm:col-span-2 pt-4">
                  <button className="btn-primary w-full justify-center py-5 uppercase tracking-widest text-sm">Submit Request <ArrowRight size={18} /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Image src="/assets/img/logo.png" alt="Zhi Logo" width={32} height={32} />
              <span className="font-bold text-lg text-emerald-950">ZHI <span className="text-amber-600">LearnAI</span></span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm mb-8">Building local intelligence through global educational standards and cutting-edge artificial intelligence.</p>
            <div className="flex gap-4">
              {[AtSign, MessageCircle, Video, ExternalLink].map((I, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-950 hover:border-emerald-950 transition-all">
                  <I size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Resources</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-950">Student Guide</a></li>
              <li><a href="#" className="hover:text-emerald-950">Parent Resources</a></li>
              <li><a href="#" className="hover:text-emerald-950">MOE Standards</a></li>
              <li><a href="#" className="hover:text-emerald-950">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Company</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-950">About ZHI</a></li>
              <li><a href="#" className="hover:text-emerald-950">Smart Nation</a></li>
              <li><a href="#" className="hover:text-emerald-950">Contact Us</a></li>
              <li><a href="#" className="hover:text-emerald-950">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
          <div>© 2026 ZHI LearnAI Singapore. MOE Aligned Learning Platform.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-950">PRIVACY POLICY</a>
            <a href="#" className="hover:text-emerald-950">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-emerald-950">PDPA COMPLIANCE</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
