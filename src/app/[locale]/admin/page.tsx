'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  ChevronRight, 
  Play, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  LayoutDashboard,
  Search,
  Bell,
  Calendar,
  Filter,
  Download,
  MoreHorizontal,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useData } from '@/context/DataContext';

type Tab = 'dashboard' | 'categories' | 'lessons' | 'students' | 'settings';

export default function AdminPortal() {
  const { 
    categories, 
    lessons: allLessons, 
    students,
    registrations,
    addLesson, 
    deleteLesson, 
    toggleStudentStatus,
    approveRegistration 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stats
  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Lessons', value: Object.values(allLessons).flat().length, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Live Categories', value: categories.length, icon: Layers, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Pending Regs', value: registrations.length, icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const SidebarItem = ({ id, label, icon: Icon }: { id: Tab; label: string; icon: any }) => (
    <button
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        activeTab === id 
        ? 'bg-slate-900 text-white shadow-sm' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={18} strokeWidth={activeTab === id ? 2.5 : 2} />
      {(isSidebarOpen || isMobileMenuOpen) && <span className="font-bold text-sm tracking-tight">{label}</span>}
      {activeTab === id && (isSidebarOpen || isMobileMenuOpen) && (
        <motion.div layoutId="activeInd" className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 relative">
      
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ─── PROFESSIONAL SIDEBAR ─── */}
      <aside className={`bg-white border-r border-slate-200 p-6 flex flex-col transition-all duration-300 fixed lg:sticky top-0 h-screen z-50 
        ${isSidebarOpen ? 'w-64' : 'w-24'} 
        ${isMobileMenuOpen ? 'left-0' : '-left-full lg:left-0'}`}>
        
        <div className="flex items-center justify-between mb-10 px-2 lg:block">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">Z</div>
             {(isSidebarOpen || isMobileMenuOpen) && (
               <div>
                 <p className="font-black text-slate-900 tracking-tight leading-none text-base">ZHI Learn</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Administrator IP</p>
               </div>
             )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 p-2"><X size={20} /></button>
        </div>

        <nav className="flex-1 space-y-1.5">
          <SidebarItem id="dashboard" label="Overview" icon={LayoutDashboard} />
          <SidebarItem id="categories" label="Content Hub" icon={Layers} />
          <SidebarItem id="lessons" label="Lesson CMS" icon={BookOpen} />
          <SidebarItem id="students" label="Student Directory" icon={Users} />
          <SidebarItem id="settings" label="System Settings" icon={Settings} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-4">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all font-bold text-xs uppercase tracking-widest">
            <LogOut size={18} />
            {(isSidebarOpen || isMobileMenuOpen) && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 min-w-0">
        
        {/* CLEAN TOP NAVBAR */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
           <div className="flex items-center gap-4 lg:gap-6 flex-1">
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"><Menu size={20} /></button>
             <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/50 transition-all group">
                <Search size={16} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input type="text" placeholder="Search for lessons..." className="bg-transparent border-none outline-none text-sm w-full font-bold placeholder:text-slate-300" />
             </div>
           </div>

           <div className="flex items-center gap-2 sm:gap-4 pl-4">
              <button className="hidden sm:flex w-10 h-10 items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Bell size={20} /></button>
              <div className="h-10 w-[1px] bg-slate-100 hidden sm:block" />
              <div className="flex items-center gap-3 pl-2">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900 leading-none">Admin User</p>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Super User</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-sm" />
              </div>
           </div>
        </header>

        <div className="p-4 lg:p-10">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <motion.div key="dash" initial={{ opacity: 1, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                 <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Platform Overview</h1>
                    <p className="text-slate-500 font-medium">System is working perfectly — all neural links are active.</p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                       <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:shadow-xl transition-all">
                          <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 ring-1 ring-slate-100`}>
                             <stat.icon size={24} />
                          </div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                       </div>
                    ))}
                 </div>
                 
                 <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden mb-10 shadow-2xl">
                    <div className="relative z-10">
                       <h2 className="text-3xl font-black mb-4">Neural Insight: System Health 100%</h2>
                       <p className="text-slate-400 max-w-xl font-medium leading-relaxed">No anomalies detected in the AI core. Student engagement is up by 14% this week. All curriculum deployments are synchronized across active portals.</p>
                       <div className="flex gap-4 mt-8">
                          <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Review Reports</button>
                          <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">View Audit Log</button>
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 w-[400px] h-full bg-white/[0.03] -mr-32 rotate-12" />
                 </div>
              </motion.div>
            )}

            {/* 2. CONTENT HUB */}
            {activeTab === 'categories' && (
              <motion.div key="cat" initial={{ opacity: 1, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                 <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                   <div>
                     <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Content Hub</h1>
                     <p className="text-slate-500 font-medium">Management grid for curriculum categorization.</p>
                   </div>
                   <button className="bg-slate-900 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                    <Plus size={18} /> Create Category
                   </button>
                 </header>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {categories.map((cat: any) => {
                     return (
                       <div key={cat.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
                          <div className="flex items-center justify-between mb-8">
                             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 text-2xl group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                                {cat.title === 'Alphabets' && 'A'}
                                {cat.title === 'Numbers' && '1'}
                                {cat.title === 'Colors' && '🎨'}
                                {cat.title === 'Animals' && '🦁'}
                                {!['Alphabets', 'Numbers', 'Colors', 'Animals'].includes(cat.title) && '✨'}
                             </div>
                             <button className="text-slate-300 hover:text-slate-600 transition-colors"><MoreHorizontal size={20} /></button>
                          </div>
                          <h3 className="font-black text-slate-900 text-xl mb-1">{cat.title}</h3>
                          <p className="text-xs font-bold text-slate-400 mb-8">{cat.lessons || 0} Professional Lessons</p>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery Level</span>
                             <span className="text-sm font-black text-indigo-600">{cat.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-50 h-2 rounded-full mt-3 overflow-hidden">
                             <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${cat.progress}%` }} />
                          </div>
                       </div>
                     );
                   })}
                 </div>
              </motion.div>
            )}

            {/* 3. LESSON MANAGEMENT */}
            {activeTab === 'lessons' && (
              <motion.div key="less" initial={{ opacity: 1, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Lesson Repository</h1>
                    <p className="text-slate-500 font-medium leading-relaxed">Direct management of instructional content units.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                     <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                        <button className="p-2.5 bg-slate-900 text-white rounded-lg shadow-md"><Layers size={16} /></button>
                        <button className="p-2.5 text-slate-400 hover:text-indigo-600 transition-colors"><BarChart3 size={16} /></button>
                     </div>
                     <button className="bg-slate-900 text-white flex-1 sm:flex-none px-6 py-4 rounded-xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl">
                       <Plus size={18} /> Publish Lesson
                     </button>
                  </div>
                </header>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                           <th className="py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Module</th>
                           <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                           <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                           <th className="py-6 px-10 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {Object.entries(allLessons).flatMap(([catId, lessList]) => 
                           lessList.map(lesson => (
                              <tr key={lesson.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-6 px-10">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg">{lesson.emoji || '📚'}</div>
                                      <span className="font-black text-slate-900 text-sm">{lesson.title}</span>
                                   </div>
                                </td>
                                <td className="py-6 px-8">
                                   <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 uppercase tracking-wider">{catId}</span>
                                </td>
                                <td className="py-6 px-8">
                                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-[9px]">{lesson.status}</span>
                                   </div>
                                </td>
                                <td className="py-6 px-10 text-right">
                                   <div className="flex items-center justify-end gap-3">
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all"><Eye size={18} /></button>
                                      <button onClick={() => deleteLesson(catId, lesson.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                   </div>
                                </td>
                              </tr>
                           ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. STUDENT DIRECTORY */}
            {activeTab === 'students' && (
              <motion.div key="stud" initial={{ opacity: 1, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Student Registry</h1>
                    <p className="text-slate-500 font-medium">Full database of active learners and progress telemetry.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                     <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all">
                        <Filter size={14} /> Filter List
                     </button>
                     <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                        <Download size={14} /> Export CRM
                     </button>
                  </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                   {students.map((student: any) => (
                      <div key={student.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => toggleStudentStatus(student.id)} className={`p-2 rounded-xl transition-all ${student.status === 'active' ? 'text-slate-400 hover:text-rose-600 bg-slate-50' : 'text-emerald-500 bg-emerald-50'}`}>
                               <Trash2 size={16} />
                            </button>
                         </div>
                         <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 font-black text-xl mb-4 border-2 border-white shadow-inner">
                               {student.name.charAt(0)}
                            </div>
                            <h3 className="font-black text-slate-900 mb-1">{student.name}</h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest mb-6">
                               {student.status}
                            </div>
                            
                            <div className="w-full pt-6 border-t border-slate-50">
                               <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Growth</span>
                                  <span className="text-[11px] font-black text-indigo-500">{student.progress}%</span>
                               </div>
                               <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${student.progress}%` }} />
                                </div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 5. SETTINGS & REGISTRATIONS */}
            {activeTab === 'settings' && (
              <motion.div key="set" initial={{ opacity: 1, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                 <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">System Control</h1>
                    <p className="text-slate-500 font-medium leading-relaxed">Identity management and administrative permission matrix.</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white rounded-[3rem] p-10 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
                       <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8">
                          <Bell size={22} className="text-indigo-600" />
                          Registration Pipeline
                       </h2>
                       <div className="space-y-6">
                          {registrations.length === 0 ? (
                             <div className="py-20 text-center">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Pending Requests</p>
                             </div>
                          ) : (
                             registrations.map((reg: any) => (
                                <div key={reg.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-slate-100/50 transition-all">
                                   <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🏠</div>
                                      <div>
                                         <p className="font-black text-slate-900 leading-tight">{reg.parentName}</p>
                                         <p className="text-[11px] font-bold text-slate-400 mt-1 whitespace-nowrap">Student: <span className="text-indigo-600">{reg.studentName}</span> • {reg.email}</p>
                                      </div>
                                   </div>
                                   <div className="flex gap-2 w-full sm:w-auto">
                                      <button className="flex-1 sm:flex-none px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Ignore</button>
                                      <button onClick={() => approveRegistration(reg.id)} className="flex-1 sm:flex-none px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all leading-none">Authorize Access</button>
                                   </div>
                                </div>
                             ))
                          )}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Pro Security</p>
                          <h3 className="text-2xl font-black mb-4 leading-tight">Biometric and MFA Protocols Active</h3>
                          <p className="text-slate-400 font-medium text-sm leading-relaxed mb-10">Advanced identity protection is currently shielding {students.length} active sessions across Singapore and Global endpoints.</p>
                          <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">System Diagnostic</button>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
