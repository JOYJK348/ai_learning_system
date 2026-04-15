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
import { useParams } from 'next/navigation';

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
  const params = useParams();
  const locale = params?.locale || 'en';
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
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-semibold mt-0.5">AI-Powered Learning. Game-Like Experience.</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`/${locale}/login`} className="btn-primary text-sm">
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
            <a href={`/${locale}/login`} className="btn-primary w-full justify-center text-sm mt-2">Get Started</a>
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
                  The Learning Experience<br />
                  <span className="italic font-light tracking-tight text-[#013237]" style={{ fontFamily: 'serif' }}>Every Child Deserves.</span>
                </h1>
              </div>

              <div className="max-w-lg lg:mx-0 mx-auto mt-6">
                <p className="text-[15px] sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-10 text-justify">
                  <span className="text-slate-900 font-extrabold block mb-2 text-xl tracking-tight italic text-left" style={{ fontFamily: 'serif' }}>An AI Learning Platform Built for Children.</span>
                  ZHI LearnAI gives your child a structured, curriculum-aligned learning environment that feels nothing like studying. Through AI-guided game quests, animated lessons, and interactive challenges, children build genuine subject mastery — independently, confidently, and joyfully.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
                <a href={`/${locale}/login`}
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

                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#9D7606] mb-4 block">ZHI LearnAI • For Singapore Parents</span>

                  <h3 className="text-2xl sm:text-3xl font-light italic text-slate-800 mb-4" style={{ fontFamily: 'serif' }}>
                    What exactly does this <span className="font-bold not-italic">platform do?</span>
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed font-medium pr-12">
                    Your child logs in and enters an <span className="text-slate-700 font-semibold not-italic">interactive game world</span> covering Maths, Science, English and more — guided by an AI companion at every step.
                    <br className="hidden sm:block" /><br className="hidden sm:block" />
                    <span className="text-[#013237] font-bold not-italic">No tuition fees. No nagging. Just a child who genuinely wants to learn.</span>
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
      <section id="portals" className="-mt-8 py-16 md:py-24 bg-white relative overflow-hidden">
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
                    <a href={`/${locale}/login?portal=${portal.id}`} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#013237] group-hover:gap-5 transition-all w-full">
                      Open Portal <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES: IMMERSIVE ═══════ */}
      <section id="features" className="-mt-8 py-16 md:py-28 relative overflow-hidden bg-white">
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
      <section id="vision" className="-mt-8 py-16 md:py-28 relative overflow-hidden"
        style={{ background: C.primary }}>

        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">

          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              style={{ background: 'rgba(212,175,55,0.15)', color: C.goldLight, border: '1px solid rgba(212,175,55,0.25)' }}>
              <Sparkles size={10} /> What&apos;s Coming Next
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              The Future of{' '}
              <span className="italic font-light" style={{ fontFamily: 'serif', color: C.goldLight }}>Play-Based Learning.</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
              &ldquo;The best kind of learning is the kind kids ask to do again.&rdquo;
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative items-stretch">

            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[1px] z-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(0,210,255,0.3), rgba(212,175,55,0.3), transparent)' }} />

            {[
              {
                tag: 'Phase 1', num: '01',
                title: 'Live AI Buddy',
                desc: 'A conversational AI friend that talks, hints, and cheers your child on — just like a real tutor, without the pressure.',
                icon: MessageCircle,
                accent: C.cyberViolet,
                glow: 'rgba(157,80,187,0.25)',
              },
              {
                tag: 'Phase 2', num: '02',
                title: 'AR Learning Worlds',
                desc: 'Step inside science experiments. Explore the solar system, dissect a cell, or build a volcano — all from home.',
                icon: Eye,
                accent: C.cyberBlue,
                glow: 'rgba(0,210,255,0.2)',
              },
              {
                tag: 'Phase 3', num: '03',
                title: 'Multiplayer Quests',
                desc: 'Kids collaborate with friends to solve challenges and climb leaderboards — social learning through friendly play.',
                icon: Gamepad2,
                accent: C.goldLight,
                glow: 'rgba(247,239,138,0.15)',
              },
              {
                tag: 'Phase 4', num: '04',
                title: 'Global Curriculum',
                desc: 'Supporting school syllabuses across Singapore, Malaysia, India and beyond — same fun, local content.',
                icon: Globe,
                accent: C.gold,
                glow: 'rgba(212,175,55,0.2)',
              },
            ].map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                whileHover={{ y: -8 }}
                className="relative group h-full"
              >
                {/* Glow behind card */}
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: r.glow }} />

                <div className="relative rounded-2xl overflow-hidden border transition-all duration-500 group-hover:border-white/20 flex flex-col h-full"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>

                  {/* Colored top strip */}
                  <div className="h-1 w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${r.accent}, transparent)` }} />

                  <div className="p-7 flex flex-col flex-1 relative">

                    {/* Ghost number — absolute background */}
                    <div className="absolute bottom-4 right-4 text-[7rem] font-black leading-none select-none pointer-events-none"
                      style={{ color: 'rgba(255,255,255,0.05)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.05em', lineHeight: 1 }}>
                      {r.num}
                    </div>

                    {/* Phase badge + icon row */}
                    <div className="flex items-center justify-between mb-7 relative z-10">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
                        {r.tag}
                      </span>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: `${r.accent}20`, color: r.accent, border: `1px solid ${r.accent}30` }}>
                        <r.icon size={20} />
                      </div>
                    </div>

                    {/* Title + Desc */}
                    <div className="flex-1 relative z-10">
                      <h3 className="text-white font-extrabold text-lg mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {r.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {r.desc}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-6 h-[1px] w-8 rounded-full transition-all duration-500 group-hover:w-full relative z-10"
                      style={{ background: r.accent }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.3em]">Phase 1 is live now &mdash; Join thousands of Singapore learners today</p>
          </motion.div>

        </div>
      </section>


      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="-mt-8 py-16 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-50/50 to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-50/40 to-transparent blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">

          {/* Section Header */}
          <div className="text-center mb-14">
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-3" style={{ color: C.primary, fontFamily: 'Inter, sans-serif' }}>
              Ready to make learning <span className="italic font-light" style={{ fontFamily: 'serif' }}>joyful?</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Book a personalised demo and discover why Singapore parents and schools choose ZHI LearnAI.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* ── LEFT: Contact Info Panel ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Contact Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.primary }}>
                    <MessageCircle size={15} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Direct Contact</span>
                </div>
                <h3 className="text-xl font-extrabold mb-1 mt-3" style={{ color: C.primary }}>Ready to make learning fun?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-7">
                  Book a free demo and see your child light up while they learn through play.
                </p>

                <div className="space-y-4">
                  <a href="mailto:hello@zhilearnai.sg"
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#013237]/20 hover:bg-white transition-all group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: `${C.primary}12`, color: C.primary }}>
                      <Mail size={17} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Email Us</p>
                      <p className="text-sm font-semibold text-slate-700">hello@zhilearnai.sg</p>
                    </div>
                  </a>

                  <a href="tel:+6567890123"
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#013237]/20 hover:bg-white transition-all group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: `${C.gold}18`, color: C.goldDark }}>
                      <Phone size={17} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Call Us</p>
                      <p className="text-sm font-semibold text-slate-700">+65 6789 0123</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">Why Parents Trust Us</p>
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, label: 'MOE Syllabus Aligned', color: C.primary },
                    { icon: Shield, label: 'PDPA Compliant & Secure', color: C.cyberBlue },
                    { icon: Star, label: 'Singapore-Based Platform', color: C.goldDark },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon size={15} style={{ color }} />
                      <span className="text-sm font-medium text-slate-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form Panel ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-10">
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Book a Demo</p>
                  <h4 className="text-xl font-extrabold text-slate-900">Tell us about yourself</h4>
                </div>

                <form className="space-y-5" onSubmit={e => e.preventDefault()}>

                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="David Lim"
                          suppressHydrationWarning
                          className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 placeholder:text-slate-300 text-slate-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="you@school.edu.sg"
                          suppressHydrationWarning
                          className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 placeholder:text-slate-300 text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone + Role */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contact Number</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="+65 9123 4567"
                          suppressHydrationWarning
                          className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 placeholder:text-slate-300 text-slate-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Role</label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          suppressHydrationWarning
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 text-slate-600 appearance-none"
                        >
                          <option value="" disabled>Select your role...</option>
                          {['Parent / Guardian', 'Student', 'Educator', 'Institution Lead'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Grade + School */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Student Grade Level</label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          suppressHydrationWarning
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 text-slate-600 appearance-none"
                        >
                          <option value="" disabled>Select grade level...</option>
                          {['Primary School', 'Secondary School', 'Pre-University / JC', 'Other'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">School / Institution</label>
                      <div className="relative">
                        <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Raffles Institution"
                          suppressHydrationWarning
                          className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 placeholder:text-slate-300 text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message <span className="normal-case tracking-normal text-slate-300 font-normal">(optional)</span></label>
                    <textarea
                      rows={4}
                      placeholder="Tell us how we can help your child or school..."
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm transition-all focus:border-[#013237] focus:bg-white focus:ring-2 focus:ring-[#013237]/8 resize-none placeholder:text-slate-300"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    suppressHydrationWarning
                    className="w-full py-4 rounded-xl text-white font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.98] shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primLight})`, boxShadow: `0 12px 30px ${C.primary}35` }}
                  >
                    Book Your Free Demo <ArrowRight size={15} />
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    No commitment required. We&apos;ll get back to you within 24 hours.
                  </p>
                </form>
              </div>
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
