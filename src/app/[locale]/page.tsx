'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Play, ArrowRight, Brain, Globe, Shield, Sparkles, Star,
  GraduationCap, Heart, Settings, Eye, Zap, Layers,
  Mail, Phone, User, MessageCircle, X, Menu,
  ExternalLink, Video, AtSign, CheckCircle2,
  Wifi, Battery, Rocket, Activity, TrendingUp, Gamepad2, Quote
} from 'lucide-react';
import { useState } from 'react';

const C = {
  primary: '#013237',
  primLight: '#0a4a50',
  gold: '#D4AF37', // High-End Metallic Gold
  goldLight: '#F7EF8A', // Shiny Light Gold
  goldDark: '#9D7606',
  cyberBlue: '#00D2FF',
  cyberViolet: '#9D50BB',
};

/* ── Section label ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label">
      <Sparkles size={11} className="inline-block mr-1.5" />
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Portals', href: '#portals' },
    { label: 'Vision', href: '#vision' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>

      {/* ═══════ NAVBAR ═══════ */}
      <nav className="fixed top-0 inset-x-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-18 flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 transition-transform group-hover:scale-110">
              <Image src="/assets/img/logo.png" alt="Zhi Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-lg" style={{ color: C.primary }}>
                ZHI <span style={{ color: C.gold }}>LearnAI</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-semibold mt-0.5">Learn While Playing</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="btn-primary text-sm">
              Get Started <ArrowRight size={15} />
            </a>
          </div>

          <button className="md:hidden p-2 rounded-lg" style={{ color: C.primary }}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-5 py-5 space-y-4">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-slate-600 hover:text-[#013237] py-1">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary w-full justify-center text-sm mt-2">Get Started</a>
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[70dvh] md:min-h-[85dvh] flex items-center pt-28 md:pt-44 pb-16 overflow-hidden bg-white">

        {/* Professional Studio Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.4]"
            style={{ backgroundImage: 'radial-gradient(#013237 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-50/40 to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50/30 to-transparent blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-16">

            {/* ── LEFT: Text (Visionary Editorial) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-1 text-center lg:text-left lg:-mt-[110px]"
            >
              <div className="relative mb-6">
                <h1 className="font-extrabold tracking-[-0.05em] text-slate-900 leading-[1.1]"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', fontFamily: 'Inter, sans-serif' }}>
                  Stop Memorising. <br />
                  <span className="italic font-light tracking-tight text-[#013237]" style={{ fontFamily: 'serif' }}>Start Exploring.</span>
                </h1>
              </div>

              <div className="max-w-lg lg:mx-0 mx-auto mt-6">
                <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-10 text-justify">
                  <span className="text-slate-900 font-extrabold block mb-2 text-xl tracking-tight italic text-left" style={{ fontFamily: 'serif' }}>The End of Boring Learning.</span>
                  Boring textbooks make students lose interest. We replace them with a **3D animated playground**. With live AR labs and personal AI mentors, ZHI LearnAI helps your child master tough subjects through play. Turn your curriculum into an adventure today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
                <a href="#contact"
                  className="px-12 py-5 rounded-full text-white font-black text-[12px] uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-95 shadow-2xl"
                  style={{ background: C.primary, boxShadow: `0 20px 40px ${C.primary}30` }}>
                  Get Started
                </a>
                <a href="#demo"
                  className="px-12 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] border border-slate-200 bg-white/50 backdrop-blur transition-all hover:bg-white"
                  style={{ color: C.primary }}>
                  Watch Demo
                </a>
              </div>

              {/* ── NEW: Visionary Manifesto Card (Pain -> Solution) ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-8 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent blur-xl -z-10" />
                <div className="glass-morphism p-8 rounded-[2.5rem] border-white/40 shadow-premium max-w-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Quote size={80} className="text-[#9D7606]" />
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#9D7606] mb-4 block">ZHI PHILOSOPHY • THE MISSION</span>

                  <h3 className="text-2xl sm:text-3xl font-light italic text-slate-800 mb-4" style={{ fontFamily: 'serif' }}>
                    The End of <span className="font-bold not-italic">Boring.</span>
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed font-medium italic pr-12">
                    "Traditional textbooks are where curiosity goes to die. <br className="hidden sm:block" />
                    <span className="text-[#013237] font-bold not-italic">ZHI LearnAI is where it finds its wings."</span>
                  </p>
                </div>

                {/* Creative Dot Decoration */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Immersive AR Laptop Visual ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-2 w-full max-w-2xl mx-auto lg:max-w-none relative"
            >
              <div className="relative w-full flex items-center justify-center p-4">

                {/* ── THE MODERN LAPTOP ── */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-full -mt-[40px]"
                >
                  {/* Laptop Lid / Screen */}
                  <div className="relative mx-auto rounded-[2.2rem] p-1.5 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.6)]"
                    style={{
                      background: 'linear-gradient(145deg, #2d3e4f, #0f172a)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}>

                    <div className="relative aspect-[16/10] bg-black rounded-[1.8rem] overflow-hidden border border-white/5 shadow-inner">
                      {/* Image Content */}
                      <div className="absolute inset-0">
                        <Image src="/assets/img/hero.png" alt="Zhi AR Platform" fill className="object-cover opacity-95 transition-transform duration-700 hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      {/* Video Player overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-3xl flex items-center justify-center border border-white/20 text-white shadow-2xl group"
                        >
                          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/30 transition-colors group-hover:bg-white/20">
                            <Play size={24} fill="white" className="ml-1" />
                          </div>
                        </motion.button>
                      </div>

                    </div>
                  </div>

                  {/* ═══ PROJECTING ELEMENTS REMOVED FOR CLEAN LOOK ═══ */}

                  {/* Laptop Base */}
                  <div className="relative -mt-1.5 px-4">
                    <div className="h-2 w-full bg-[#1e293b] rounded-t-sm" />
                    <div
                      className="relative h-6 bg-gradient-to-b from-[#1e293b] to-[#0a0f18] rounded-b-[4rem] w-[110%] -left-[5%]"
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        clipPath: 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)'
                      }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2.5 bg-[#0f172a]/90 rounded-b-xl" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-cyan-500/10 blur-[40px] rounded-full" />
                  </div>

                  {/* ── NEW: Visual Engagement Cluster (High-End & Modern) ── */}
                  <div className="mt-14 relative w-full lg:max-w-xl">
                    <div className="flex flex-col sm:flex-row gap-6">

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex-1 glass-morphism p-8 rounded-[2.5rem] border-white/40 shadow-premium relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full -mr-10 -mt-10" />
                        <div className="flex items-center gap-4 mb-6">
                          {/* Professional HUD Badge */}
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#013237] rounded-xl rotate-45 shadow-lg shadow-[#013237]/30 border border-white/20" />
                            <span className="relative z-10 text-white font-medium italic text-base" style={{ fontFamily: 'serif' }}>Lvl 12</span>
                          </div>
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9D7606] mb-1">Play Mode: Active</p>
                            <h4 className="text-xl font-medium italic text-slate-900 leading-none" style={{ fontFamily: 'serif' }}>Geometry Mastery</h4>
                          </div>
                        </div>

                        {/* Segmented XP Progress Bar */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-end mb-1">
                            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">Current XP: <span className="text-slate-900 font-black" style={{ fontFamily: 'serif' }}>850</span></span>
                            <span className="text-[11px] font-black text-[#9D7606] uppercase">Next level: 13</span>
                          </div>

                          <div className="flex gap-1.5 h-3">
                            {[...Array(10)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: i < 8 ? 1 : 0.3, backgroundColor: i < 8 ? C.primary : '#CBD5E1' }}
                                transition={{ delay: 1 + (i * 0.1) }}
                                className="flex-1 rounded-sm shadow-sm"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* ── Reality Translator Card (Side by Side) ── */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex-1 glass-morphism p-8 rounded-[2.5rem] border-white/40 shadow-premium relative overflow-hidden group"
                      >
                         <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
                           style={{ backgroundImage: 'linear-gradient(90deg, #D4AF37 1px, transparent 1px), linear-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                         
                         <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-[#013237] flex items-center justify-center text-[#D4AF37] border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                <Eye size={24} />
                              </div>
                              <div>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9D7606]">Active Reality Engine</p>
                                <h4 className="text-xl font-medium italic text-slate-900 leading-none" style={{ fontFamily: 'serif' }}>See the Invisible.</h4>
                              </div>
                            </div>
                         </div>

                         <div className="space-y-4 mb-8 relative z-10">
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                               <span className="text-slate-700">Theory Complexity</span>
                               <span className="text-[#013237] font-black">Simplified</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                               <span className="text-slate-700">Memory Retention</span>
                               <span className="text-[#013237] font-black">100% Mastery</span>
                            </div>
                            <div className="h-[1px] w-full bg-slate-300/50 mt-2" />
                         </div>

                         {/* Pulse Line Decoration */}
                         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ═══════ THE ECOSYSTEM: COMPACT HUB ═══════ */}
      <section id="portals" className="-mt-8 py-24 bg-white relative overflow-hidden">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.3] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#013237 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="max-w-xl">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9D7606] mb-4 block">The Unified Architecture</span>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Intelligence for <span className="italic font-light text-[#013237]" style={{ fontFamily: 'serif' }}>Everyone.</span>
                 </h2>
              </div>
              <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed border-l-2 border-slate-100 pl-6">
                 A connected ecosystem bridging the gap between imagination and performance.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 'student',
                label: 'Explorer',
                title: 'Student Portal',
                desc: 'A gamified sanctuary where lessons become 3D adventures and AI tutors provide absolute clarity.',
                items: ['3D Worlds', 'AR Labs', 'AI Tutors'],
                color: '#013237',
                icon: <GraduationCap size={20} />,
                status: 'Live'
              },
              {
                id: 'parent',
                label: 'Intelligence',
                title: 'Parent Portal',
                desc: 'Real-time windows into growth, mapping breakthrough and defining the path forward.',
                items: ['Cognitive Maps', 'Activity Feed', 'Skill Tracking'],
                color: '#D4AF37',
                icon: <Heart size={20} />,
                status: 'Connected'
              },
              {
                id: 'school',
                label: 'Core',
                title: 'Institutional Portal',
                desc: 'Enterprise-grade orchestration for schools to manage complex curriculum and data.',
                items: ['Bulk Analytics', 'Content Control', 'Strategy Hub'],
                color: '#9D50BB',
                icon: <Shield size={20} />,
                status: 'Enterprise'
              }
            ].map((portal, i) => (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                {/* Compact Glass Card */}
                <div className="h-full glass-morphism p-8 rounded-[2rem] border-white/40 shadow-premium transition-all duration-500 hover:shadow-2xl hover:border-slate-200 bg-white/40 flex flex-col items-start overflow-hidden border">
                  
                  {/* Subtle Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full -mr-16 -mt-16 opacity-30 group-hover:opacity-50 transition-opacity" 
                       style={{ background: portal.color }} />

                  {/* Icon & Status */}
                  <div className="flex justify-between items-center w-full mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform"
                         style={{ background: portal.color }}>
                      {portal.icon}
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 border border-slate-100">
                       <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider font-inter">{portal.status}</span>
                    </div>
                  </div>

                  {/* Content Hub */}
                  <div className="relative z-10 flex-grow">
                    <h3 className="text-2xl font-light italic text-slate-900 mb-4" style={{ fontFamily: 'serif' }}>
                       {portal.title}
                    </h3>
                    <p className="text-slate-500 text-[14px] leading-relaxed mb-8 font-medium">
                      {portal.desc}
                    </p>

                    {/* Compact Feature Matrix */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {portal.items.map(item => (
                        <div key={item} className="px-3 py-1.5 rounded-lg bg-slate-50/80 border border-slate-100 text-[9px] font-black uppercase tracking-tight text-slate-600 transition-colors group-hover:bg-white group-hover:border-slate-200">
                           {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-6 border-t border-slate-100/60 w-full relative z-10 mt-auto">
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#013237] group-hover:gap-5 transition-all">
                      Open Portal <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES: IMMERSIVE ═══════ */}
      <section id="features" className="-mt-8 py-28 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Visual Side */}
            <div className="lg:col-span-6 relative order-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[3rem] overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent z-10" />
                <Image 
                  src="/assets/img/achievement.png" 
                  alt="AR Learning Feature" 
                  width={800} 
                  height={1000} 
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 order-2 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <SectionLabel>Innovation</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]" style={{ color: C.primary }}>
                  The technology <br /> that changes <br /> <span className="text-gradient-gold">everything.</span>
                </h2>

                <div className="space-y-10 mt-12">
                  {[
                    {
                      t: 'Cinematic Animations',
                      d: 'We don\'t just explain. we tell stories. Complex science and math turned into 4K animated epics.',
                      icon: Video,
                      color: C.cyberViolet
                    },
                    {
                      t: 'Neural AI Tutoring',
                      d: 'A personal AI companion trained on pedagogic principles to guide students without giving away answers.',
                      icon: Brain,
                      color: C.primary
                    },
                    {
                      t: 'Interactive AR Overlay',
                      d: 'Turn any physical space into a laboratory. Study the human heart or solar systems in true 1:1 scale.',
                      icon: Layers,
                      color: C.cyberBlue
                    }
                  ].map((f, i) => (
                    <motion.div
                      key={f.t}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:rotate-6 shadow-sm border border-slate-100 group-hover:shadow-md"
                        style={{ background: '#fff' }}>
                        <f.icon size={26} style={{ color: f.color }} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black mb-2 text-slate-800 tracking-tight">{f.t}</h4>
                        <p className="text-slate-500 leading-relaxed text-[15px]">{f.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════ VISION ROADMAP ═══════ */}
      <section id="vision" className="-mt-8 py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 text-center mb-16">
          <SectionLabel>Roadmap 2026</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: C.primary }}>The Future of AI Learning</h2>
          <p className="text-slate-400 max-w-xl mx-auto italic">"A Smart Nation starts with smart learners."</p>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { tag: 'Phase 2', title: 'Virtual AI Tutor', desc: 'Conversational AI that mimics a human private tutor in real-time.', icon: MessageCircle, bg: `rgba(157,80,187,0.08)`, hex: C.cyberViolet },
            { tag: 'Phase 3', title: 'AR Classrooms', desc: 'Bring science experiments home with AR visuals on any device.', icon: Eye, bg: `rgba(1,50,55,0.07)`, hex: C.primary },
            { tag: 'Phase 3', title: 'Gamified Quests', desc: 'Turn every lesson into an adventure with badges and leaderboards.', icon: Zap, bg: `rgba(0,210,255,0.08)`, hex: C.cyberBlue },
            { tag: 'Phase 4', title: 'Global Expansion', desc: 'Expanding curriculum to meet international school standards.', icon: Globe, bg: `rgba(212,175,55,0.08)`, hex: C.gold },
          ].map(r => (
            <div key={r.title} className="p-7 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: r.bg, color: r.hex }}>
                <r.icon size={24} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{r.tag}</div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: C.primary }}>{r.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="-mt-8 py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-5 border border-slate-100">
            <div className="lg:col-span-2 p-10 sm:p-12 text-white relative overflow-hidden" style={{ background: C.primary }}>
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold mb-4">Let's build the future together.</h3>
                <p className="mb-10 text-sm leading-relaxed opacity-70">Book a personalised demo for your school or institution.</p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <Mail size={18} style={{ color: C.goldLight }} />
                    <span className="text-sm font-medium">hello@zhilearnai.sg</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={18} style={{ color: C.goldLight }} />
                    <span className="text-sm font-medium">+65 6789 0123</span>
                  </div>
                </div>
              </div>
              <Image src="/assets/img/logo.png" alt="" width={300} height={300}
                className="absolute -bottom-20 -right-20 opacity-[0.04] scale-150 rotate-12" />
            </div>
            <div className="lg:col-span-3 p-10 sm:p-12">
              <form className="grid sm:grid-cols-2 gap-5" onSubmit={e => e.preventDefault()}>
                {[
                  { label: 'Full Name', type: 'text', placeholder: 'David Lim', span: 1 },
                  { label: 'Email Address', type: 'email', placeholder: 'you@school.edu.sg', span: 1 },
                ].map(f => (
                  <div key={f.label} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      suppressHydrationWarning
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:ring-2 focus:ring-[#013237]/5"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    suppressHydrationWarning
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:ring-2 focus:ring-[#013237]/5 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    suppressHydrationWarning
                    className="btn-primary w-full justify-center py-4 uppercase tracking-widest text-sm"
                  >
                    Submit Request <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-slate-100 bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/assets/img/logo.png" alt="Zhi Logo" width={32} height={32} />
              <span className="font-extrabold text-lg" style={{ color: C.primary }}>
                ZHI <span style={{ color: C.gold }}>LearnAI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-7">
              Building local intelligence through global educational standards and cutting-edge artificial intelligence.
            </p>
            <div className="flex gap-3">
              {[AtSign, MessageCircle, Video, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#013237] hover:text-[#013237] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-5 uppercase tracking-widest text-xs">Resources</h5>
            <ul className="space-y-3 text-sm text-slate-500">
              {['Student Guide', 'Parent Resources', 'Success Stories'].map(l => (
                <li key={l}><a href="#" className="hover:text-[#013237] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 mb-5 uppercase tracking-widest text-xs">Company</h5>
            <ul className="space-y-3 text-sm text-slate-500">
              {['About ZHI', 'Contact Us', 'Careers'].map(l => (
                <li key={l}><a href="#" className="hover:text-[#013237] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
          <div>© 2026 ZHI LearnAI. AI-Powered Learning Platform.</div>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="hover:text-[#013237] transition-colors uppercase tracking-wider">{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
