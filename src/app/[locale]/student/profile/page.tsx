'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  BookOpen, Star, User, Award, LogOut, Lock, Unlock,
  ChevronRight, Globe, Bell, CreditCard, Settings, Edit3, Calendar
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';

const SUBJECT_COLORS = [
  { bg: 'bg-rose-100',    border: 'border-rose-300',    text: 'text-rose-700',   fill: 'bg-rose-500',   emoji: '🔤' },
  { bg: 'bg-rose-100',    border: 'border-rose-300',    text: 'text-rose-700',   fill: 'bg-rose-500',   emoji: '➕' },
  { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700',fill: 'bg-emerald-500',emoji: '🌿' },
  { bg: 'bg-amber-100',   border: 'border-amber-300',   text: 'text-amber-700',  fill: 'bg-amber-500',  emoji: '💡' },
  { bg: 'bg-purple-100',  border: 'border-purple-300',  text: 'text-purple-700', fill: 'bg-purple-500', emoji: '🌐' },
  { bg: 'bg-pink-100',    border: 'border-pink-300',    text: 'text-pink-700',   fill: 'bg-pink-500',   emoji: '📖' },
];

export default function StudentProfile() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || 'en';
  const [isParentMode, setIsParentMode] = useState(false);
  const { logout } = useAuth();
  const { subjects, studentProfile, studentLoading } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profileSubjects = subjects.map((s, idx) => ({
    id: s.id,
    title: s.name,
    color: SUBJECT_COLORS[idx % SUBJECT_COLORS.length],
    progress: s.chapters.length > 0
      ? Math.round(s.chapters.filter(c => (c.completion_percentage ?? 0) >= 100).length / s.chapters.length * 100)
      : 0,
    totalChapters: s.chapters.length,
    doneChapters: s.chapters.filter(c => (c.completion_percentage ?? 0) >= 100).length,
  }));

  const overallProgress = profileSubjects.length > 0
    ? Math.round(profileSubjects.reduce((sum, s) => sum + s.progress, 0) / profileSubjects.length)
    : 0;

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}/login`);
  };

  if (!mounted || studentLoading) {
    return (
      <div className="relative min-h-screen font-sans overflow-hidden bg-sky-400 flex items-center justify-center">
        <div className="text-2xl font-black text-white">Loading your adventure...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen select-none overflow-hidden bg-sky-400 kids-font pb-24">
      {/* Playful Google Font */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;700;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Sky Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-sky-400 to-emerald-300" />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/30 blur-[130px] rounded-full" />
      </div>

      {/* Static Clouds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span className="absolute top-[8%] left-[10%] text-7xl opacity-30">☁️</span>
        <span className="absolute top-[20%] right-[15%] text-9xl opacity-20">☁️</span>
        <span className="absolute top-[50%] left-[5%] text-6xl opacity-30">☁️</span>
      </div>

      {/* ── TOP NAV BAR ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <button
          onClick={() => router.push(`/${locale}/student/Home`)}
          className="flex items-center gap-2 px-6 py-3 bg-white/40 backdrop-blur-xl text-indigo-950 font-black text-xs uppercase tracking-widest rounded-2xl border border-white/60 hover:bg-white/60 transition-all shadow-xl active:scale-95 [touch-action:none]"
        >
          ← Home
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsParentMode(p => !p)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-black text-xs uppercase tracking-widest border-2 shadow transition-all
              ${isParentMode
                ? 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700'
                : 'bg-white/80 text-indigo-950 border-white hover:bg-white'
              }`}
          >
            {isParentMode ? <Unlock size={13} /> : <Lock size={13} />}
            {isParentMode ? 'Kid View' : 'Parent Access'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/80 text-rose-600 font-black text-xs uppercase tracking-widest border-2 border-white shadow hover:bg-white transition-all"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT CONTAINER ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* 1. HERO QUEST GREETING BANNER */}
        <div className="py-10 mb-8 w-full border-b-8 border-white/10 relative">
          <div className="relative w-full flex items-center">
            {/* Skewed white reflection overlay */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/20 to-transparent skew-x-[-20deg] transform translate-x-32 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6">
              <div className="text-center md:text-left flex-1 space-y-6">
                
                {/* Yellow Capsule Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl select-none">
                  ⭐ MY WORLD
                </div>

                <h1 className="text-4xl sm:text-7xl font-black text-indigo-950 tracking-tighter leading-tight font-sans">
                  Adventure Profile,<br />
                  <span className="text-indigo-800">{(studentProfile?.name || 'Explorer').toUpperCase()}!</span>
                </h1>
                
                <p className="text-indigo-900/60 font-bold text-lg">See all your achievements and learning stats here! 🌟🦕</p>
              </div>

              {/* Avatar Mascot with Indigo Glow backdrop */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 select-none flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-600/10 blur-[60px] rounded-full" />
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-indigo-50 relative">
                  <img 
                    src="/assets/avatars/agnika_avatar.png" 
                    className="w-full h-full object-cover" 
                    alt="Explorer Avatar"
                    onError={e => { (e.target as HTMLImageElement).src = '/assets/avatars/owl-removebg-preview.png'; }}
                  />
                  <div className="absolute bottom-2 right-4 bg-amber-400 w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shadow-lg z-10">
                    <span className="text-3xl">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS & PROGRESS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Subject Progress */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 px-2 mb-2">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white" size={18} />
              </div>
              <h3 className="font-black text-indigo-950 text-xl uppercase tracking-widest leading-none">
                Subject Progress
              </h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {profileSubjects.map((sub) => (
                <div 
                  key={sub.id} 
                  className="bg-white/80 hover:bg-white border-4 border-white rounded-[2.25rem] p-6 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 flex items-center gap-4"
                >
                  <div className={`w-14 h-14 rounded-2xl ${sub.color.bg} ${sub.color.border} border-2 flex items-center justify-center text-3xl shrink-0 shadow-inner`}>
                    {sub.color.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-lg sm:text-xl text-indigo-950 truncate">{sub.title}</span>
                      <span className={`font-black text-xs sm:text-sm ${sub.color.text} bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm shrink-0`}>
                        {sub.progress}%
                      </span>
                    </div>
                    <div className="h-3.5 bg-slate-100/80 rounded-full overflow-hidden border-2 border-slate-200/80">
                      <div
                        className={`h-full ${sub.color.fill} rounded-full transition-all duration-700`}
                        style={{ width: `${sub.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-extrabold mt-1.5 block">
                      {sub.doneChapters}/{sub.totalChapters} chapters complete
                    </span>
                  </div>
                </div>
              ))}
              {profileSubjects.length === 0 && (
                <p className="text-slate-400 text-sm font-bold text-center py-4 bg-white/40 rounded-2xl border-2 border-white/50">No subjects loaded yet.</p>
              )}
            </div>
          </div>

          {/* Column 2: Account & Settings */}
          <div className="space-y-6">
            
            {/* Account Card */}
            <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] border-4 border-white shadow-2xl p-8">
              <h3 className="font-black text-indigo-950 text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                <User size={20} className="text-indigo-600" /> Explorer Info
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <User size={18} className="text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Name</span>
                    <span className="text-base font-black text-indigo-950">{studentProfile?.name || 'Explorer'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <Award size={18} className="text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Grade</span>
                    <span className="text-base font-black text-indigo-950">{studentProfile?.grade_name || 'LKG'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <Calendar size={18} className="text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Adventure Started</span>
                    <span className="text-base font-black text-indigo-950">2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Settings (Collapsible) */}
            {isParentMode && (
              <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] border-4 border-white shadow-2xl p-8">
                <h3 className="font-black text-indigo-950 text-xl uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Settings size={20} className="text-indigo-600" /> Parent Settings
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Edit Child Profile', icon: Edit3, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
                    { label: 'Language: English', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                    { label: 'Notifications', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
                    { label: 'Subscription', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
                  ].map((opt, i) => (
                    <button
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${opt.border} ${opt.bg} hover:shadow-md active:scale-[0.98] transition-all text-left`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                        <opt.icon size={18} className={opt.color} />
                      </div>
                      <span className="font-black text-indigo-950 text-sm">{opt.label}</span>
                      <ChevronRight size={16} className="ml-auto text-slate-350" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
