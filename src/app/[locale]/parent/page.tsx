'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Manrope } from 'next/font/google';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import {
  BookOpen, Clock, TrendingUp, Zap, Award, Users, X, Mail, Phone, GraduationCap, Building2, CheckCircle2, Lock, Unlock, ChevronDown, ChevronUp
} from 'lucide-react';
import { parentApi } from '@/core/services/parentApi';
import { parentKeys } from '@/core/constants/queryKeys';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const update = () => {
      const remaining = new Date(expiresAt).getTime() - Date.now();
      if (remaining <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      const totalSec = Math.floor(remaining / 1000);
      const days = Math.floor(totalSec / (3600 * 24));
      const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;
      setTime({ days, hours, minutes, seconds, expired: false });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (time.expired) return <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#fca5a5' }}>Expired</span>;

  return (
    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.45rem', borderRadius: '0.4rem', minWidth: '1.8rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#fff' }}>{String(time.days).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Days</span>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'rgba(255, 255, 255, 0.3)' }}>:</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.45rem', borderRadius: '0.4rem', minWidth: '1.8rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#fff' }}>{String(time.hours).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Hrs</span>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'rgba(255, 255, 255, 0.3)' }}>:</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.45rem', borderRadius: '0.4rem', minWidth: '1.8rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#fff' }}>{String(time.minutes).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Min</span>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 950, color: 'rgba(255, 255, 255, 0.3)' }}>:</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.15)', padding: '0.25rem 0.45rem', borderRadius: '0.4rem', minWidth: '1.8rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#fff' }}>{String(time.seconds).padStart(2, '0')}</span>
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Sec</span>
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const activeTab = searchParams.get('tab');

  // Prevent background scrolling when a drawer (Quizzes/Profile) is open
  useEffect(() => {
    if (activeTab) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeTab]);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const closeDrawer = () => {
    router.push(`/${locale}/parent`);
  };



  const handleRedirectToLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('zhi_auth_user');
      document.cookie = 'zhi_user_role=; path=/; max-age=0';
      window.location.href = `/${locale}/login?session_closed=1`;
    }
  };
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  const { data: meRaw, error: meError, isLoading: meLoading } = useQuery({
    queryKey: parentKeys.me, queryFn: parentApi.me, staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const parentProfile = (meRaw as any)?.parent ?? null;

  const { data: childrenData, error: childrenError, isLoading: childrenLoading } = useQuery({
    queryKey: parentKeys.children, queryFn: parentApi.children, staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const children = childrenData?.children ?? [];
  const [activeChildId, setActiveChildId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zhi_parent_active_child_id');
    }
    return null;
  });

  useEffect(() => {
    if (children.length > 0) {
      if (!activeChildId) {
        setActiveChildId(children[0].id);
        localStorage.setItem('zhi_parent_active_child_id', children[0].id);
      } else if (!children.some((c: any) => c.id === activeChildId)) {
        setActiveChildId(children[0].id);
        localStorage.setItem('zhi_parent_active_child_id', children[0].id);
      }
    }
  }, [children, activeChildId]);

  const activeChild = children.find((c: any) => c.id === activeChildId) ?? null;

  const { data: progressData, error: progressError, isLoading: progressLoading } = useQuery({
    queryKey: parentKeys.childProgress(activeChildId ?? ''),
    queryFn: () => parentApi.childProgress(activeChildId!),
    enabled: !!activeChildId, staleTime: 0,
    retry: false,
  });

  const { data: quizzesData, error: quizzesError } = useQuery({
    queryKey: parentKeys.childQuizzes(activeChildId ?? ''),
    queryFn: () => parentApi.childQuizzes(activeChildId!),
    enabled: !!activeChildId,
    staleTime: 0,          // Always refetch — show latest quiz attempts immediately
    refetchInterval: 30_000, // Auto-refresh every 30s while parent is viewing
    retry: false,
  });

  const { data: chapterData, error: chapterError, isLoading: chapterLoading } = useQuery({
    queryKey: parentKeys.childChapterProgress(activeChildId ?? ''),
    queryFn: () => parentApi.childChapterProgress(activeChildId!),
    enabled: !!activeChildId, staleTime: 0,
    retry: false,
  });

  const childProgress = progressData as any;
  const quizzes = quizzesData?.quizzes ?? [];
  const chapterProgress = Array.isArray(chapterData) ? chapterData : [];

  const isDashboardLoading =
    meLoading ||
    childrenLoading ||
    (activeChildId ? (progressLoading || chapterLoading) : false);

  const currentDate = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
    [],
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const kpiValues = useMemo(() => {
    const completed = childProgress?.lesson_progress?.completed_lessons || 0;
    const streak = childProgress?.student?.current_streak_days || 0;
    const badges = childProgress?.student?.badges_earned || 0;
    const quizAttempts = quizzes.length;

    return [
      {
        label: 'Lessons Completed',
        value: completed,
        change: 'Keep it up!',
        icon: BookOpen,
      },
      {
        label: 'Learning Streak',
        value: `${streak} Days`,
        change: streak > 0 ? 'Active streak!' : 'Start learning!',
        icon: Zap,
      },
      {
        label: 'Badges Earned',
        value: badges,
        change: 'Superstar status',
        icon: Award,
      },
      {
        label: 'Quiz Attempts',
        value: quizAttempts,
        change: 'Total trials',
        icon: GraduationCap,
      },
    ];
  }, [childProgress, quizzes]);

  // Track authentication / forbidden errors
  useEffect(() => {
    const isAuthError = (err: any) => {
      if (!err) return false;
      const msg = String(err.message || '').toLowerCase();
      return msg.includes('forbidden') || msg.includes('unauthorized') || msg.includes('failed to load') || msg.includes('login') || msg.includes('token');
    };

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('zhi_auth_token') : null;
    if (!token) return;

    if (
      (isAuthError(meError) ||
      isAuthError(childrenError) ||
      isAuthError(progressError) ||
      isAuthError(quizzesError) ||
      isAuthError(chapterError)) &&
      (user && user.role === 'parent')
    ) {
      setShowSessionExpired(true);
    }
  }, [meError, childrenError, progressError, quizzesError, chapterError, user]);

  useEffect(() => {
    if (activeChildId) {
      // Prefetch child specific data in the background to warm the cache!
      queryClient.prefetchQuery({
        queryKey: parentKeys.childProgress(activeChildId),
        queryFn: () => parentApi.childProgress(activeChildId),
        staleTime: 60_000,
      });
      queryClient.prefetchQuery({
        queryKey: parentKeys.childQuizzes(activeChildId),
        queryFn: () => parentApi.childQuizzes(activeChildId),
        staleTime: 60_000,
      });
      queryClient.prefetchQuery({
        queryKey: parentKeys.childChapterProgress(activeChildId),
        queryFn: () => parentApi.childChapterProgress(activeChildId),
        staleTime: 60_000,
      });
    }
  }, [activeChildId, queryClient]);



  // Toggle state for subject details in the syllabus area
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({});

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // Math to get overall stats
  const totalLessonsAll = chapterProgress.reduce((sum: number, s: any) => sum + (s.chapters?.reduce((acc: number, c: any) => acc + (c.total_lessons || 0), 0) || 0), 0);
  const completedLessonsAll = chapterProgress.reduce((sum: number, s: any) => sum + (s.chapters?.reduce((acc: number, c: any) => acc + (c.completed_lessons || 0), 0) || 0), 0);
  const overallPercentage = totalLessonsAll > 0 ? Math.round((completedLessonsAll / totalLessonsAll) * 100) : 0;

  // Simplified smiley & status messages for uneducated parents
  const getStatusSmiley = (pct: number) => {
    if (pct === 100) return { emoji: '🏆', text: 'Syllabus Finished!', subtext: 'Excellent job!', color: '#16a34a' };
    if (pct >= 70) return { emoji: '✨', text: 'Almost Completed!', subtext: 'Very close to finishing!', color: '#10b981' };
    if (pct >= 30) return { emoji: '🚀', text: 'Doing Great!', subtext: 'Learning every day!', color: '#d97706' };
    return { emoji: '🌱', text: 'Getting Started!', subtext: 'Beginning the journey!', color: '#2563eb' };
  };

  const statusObj = getStatusSmiley(overallPercentage);

  // Subject theme generator (unified brand teal theme)
  const getSubjectTheme = (name: string) => {
    return { 
      bg: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)', 
      border: 'rgba(20, 184, 166, 0.15)', 
      text: '#12312f', 
      fill: 'linear-gradient(90deg, #14b8a6, #0f766e)', 
      accent: '#99f6e4' 
    };
  };

  const recentQuizzes = quizzes.slice(0, 3);

  const timelineActivities = useMemo(() => {
    const list: Array<{
      id: string;
      type: 'quiz' | 'lesson' | 'badge' | 'streak';
      title: string;
      desc: string;
      time: string;
      theme: 'green' | 'orange' | 'blue';
      date: Date;
    }> = [];

    // 1. Quizzes
    quizzes.forEach((q: any) => {
      list.push({
        id: `quiz-${q.id || Math.random()}`,
        type: 'quiz',
        title: `Quiz: ${q.quiz_title}`,
        desc: `Scored ${q.score}/${q.max_score} (${q.percentage}%) in ${q.subject_name}.`,
        time: new Date(q.completed_at || q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        theme: q.percentage >= 60 ? 'green' : 'orange',
        date: new Date(q.completed_at || q.created_at),
      });
    });

    // 2. Completed Chapters
    chapterProgress.forEach((subject: any) => {
      if (subject.chapters) {
        subject.chapters.forEach((chapter: any) => {
          if (chapter.is_complete) {
            list.push({
              id: `chap-${chapter.id || Math.random()}`,
              type: 'lesson',
              title: `Chapter Finished!`,
              desc: `Completed "${chapter.name}" in ${subject.name}.`,
              time: 'Recently',
              theme: 'green',
              date: new Date(Date.now() - 3600000), 
            });
          }
        });
      }
    });

    // 3. Streaks
    const streak = childProgress?.student?.current_streak_days || 0;
    if (streak > 0) {
      list.push({
        id: 'streak-status',
        type: 'streak',
        title: `Learning Streak!`,
        desc: `${streak} days active streak. Outstanding work!`,
        time: 'Active',
        theme: 'orange',
        date: new Date(),
      });
    }

    // Sort by date (descending)
    return list.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  }, [quizzes, chapterProgress, childProgress]);

  if (isDashboardLoading && !showSessionExpired) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <div className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>
              Hello, <span style={{ color: '#16a085' }}>{parentProfile?.name || 'Parent'}</span>!
            </h1>
            <div className={styles.headerMeta}>
              <span className={styles.headerDate}>{currentDate}</span>
              <span className={styles.headerDot} />
              <span className={styles.headerLive}>
                <span className={styles.liveDot} />
                {isDashboardLoading ? 'Syncing' : 'System Live'}
              </span>
              {activeChild && (
                <>
                  <span className={styles.headerDot} />
                  <span className={styles.headerRole}>
                    🎓 {activeChild.name} ({activeChild.grade || 'LKG'})
                  </span>
                  <span className={styles.headerDot} />
                  <span className={styles.progressHeaderBadge}>
                    {overallPercentage}% Completed
                  </span>
                </>
              )}
            </div>
          </div>
          {children.length > 1 ? (
            <div className={styles.headerActions}>
              <div className={styles.filterGroup}>
                <Users size={16} />
                <select
                  value={activeChildId || ''}
                  onChange={(e) => {
                    const cid = e.target.value;
                    setActiveChildId(cid);
                    localStorage.setItem('zhi_parent_active_child_id', cid);
                  }}
                  className={styles.selectInput}
                >
                  {children.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
        </header>

        {/* Status box row */}
        {activeChild && (
          <div className={styles.statusBoxRow}>
            <span style={{ fontSize: '1.25rem' }}>{statusObj.emoji}</span>
            <div>
              <p className={styles.statusBoxTitle}>{activeChild.name} is {statusObj.text.toLowerCase()}</p>
              <p className={styles.statusBoxSub}>{statusObj.subtext}</p>
            </div>
          </div>
        )}

        {/* KPI Grid */}
        <section className={styles.kpiGrid}>
          {kpiValues.map((k, i) => (
            <div key={k.label} className={styles.kpiCard}>
              <div className={styles.kpiTop}>
                <div className={styles.kpiIcon}>
                  <k.icon size={17} />
                </div>
                <span className={styles.kpiChange}>{k.change}</span>
              </div>
              <p className={styles.kpiLabel}>{k.label}</p>
              <h2 className={styles.kpiValue}>{k.value}</h2>
            </div>
          ))}
        </section>

        {/* Dashboard Main Grid */}
        <div className={styles.dashboardGrid}>
          <div className={styles.leftStack}>
            <section className={styles.insightBox}>
              <div className={styles.insightHeader}>
                <BookOpen size={18} color="#12312f" />
                <h3>Learning Pathways</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 650, marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                View step-by-step progress roadmaps of the curriculum.
              </p>
              
              {chapterProgress.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '0.5rem 0 1.5rem', width: '100%' }}>
                  {chapterProgress.map((sub: any) => {
                    const theme = getSubjectTheme(sub.name);
                    const totalLessons = sub.chapters?.reduce((sum: number, c: any) => sum + (c.total_lessons || 0), 0) || 0;
                    const completedLessons = sub.chapters?.reduce((sum: number, c: any) => sum + (c.completed_lessons || 0), 0) || 0;
                    const subPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                    
                    return (
                      <div key={sub.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#f8fafc', padding: '0.85rem 1.15rem', borderRadius: '1rem', border: '1px solid rgba(15, 23, 42, 0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e293b' }}>{sub.name}</span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 900, color: theme.text }}>{subPct}%</span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.05)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: 'inherit', width: `${subPct}%`, background: theme.fill }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', fontWeight: 650, color: '#64748b', margin: '1rem 0' }}>No subjects loaded</p>
              )}

              <button className={styles.brandActionBtn} style={{ marginTop: 'auto', width: 'fit-content' }} onClick={() => router.push('/' + locale + '/parent/learning')}>
                Open Learning Map →
              </button>
            </section>
          </div>

              <div className={styles.rightStack}>
                {/* Recent Activities Milestone Timeline */}
                <section className={styles.insightBox}>
                  <div className={styles.insightHeader}>
                    <Zap size={18} color="#ea580c" />
                    <h3>Recent Milestones</h3>
                  </div>
                  {timelineActivities.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textAlign: 'center', padding: '1rem 0' }}>No milestone records yet</p>
                  ) : (
                    <div className={styles.timelineContainer}>
                      {timelineActivities.map((act) => (
                        <div key={act.id} className={`${styles.timelineItem} ${act.theme === 'green' ? styles.timelineItemGreen : act.theme === 'orange' ? styles.timelineItemOrange : styles.timelineItemBlue}`}>
                          <div className={styles.timelineDot} />
                          <div className={styles.timelineContent}>
                            <div className={styles.timelineHeaderRow}>
                              <h4 className={styles.timelineTitle}>{act.title}</h4>
                              <span className={styles.timelineTime}>{act.time}</span>
                            </div>
                            <p className={styles.timelineBodyText}>{act.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ 
                    marginTop: 'auto', 
                    background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', 
                    border: '1px solid rgba(22, 163, 74, 0.12)', 
                    padding: '0.85rem 1.15rem', 
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '0.65rem',
                    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.02)',
                    width: '100%'
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>💡</span>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 850, color: '#166534' }}>Parent Tip</p>
                      <p style={{ margin: '0.15rem 0 0', fontSize: '0.7rem', fontWeight: 650, color: '#14532d', lineHeight: 1.35 }}>
                        Encourage {activeChild?.name || 'your child'} to practice daily to maintain their learning streak and unlock new milestones!
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
      </div>

      {/* Quizzes Drawer */}
      {activeTab === 'quizzes' && (
        <div className={styles.drawerOverlay} onClick={closeDrawer}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitle}>
                <div className={styles.drawerLogo}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2>Quiz History</h2>
                  <span className={styles.activeChildBadge} style={{ marginTop: '0.2rem', padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}>
                    {activeChild?.name}
                  </span>
                </div>
              </div>
              <button className={styles.closeButton} onClick={closeDrawer}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.drawerBody}>
              {/* Summary Cards */}
              <div className={styles.childGrid}>
                <div className={styles.childStat}>
                  <BookOpen size={16} color="#2563eb" />
                  <div>
                    <p className={styles.childStatValue}>{quizzes.length}</p>
                    <p className={styles.childStatLabel}>Total Attempts</p>
                  </div>
                </div>
                <div className={styles.childStat}>
                  <Award size={16} color="#16a34a" />
                  <div>
                    <p className={styles.childStatValue} style={{ color: '#16a34a' }}>
                      {quizzes.filter((q: any) => q.passed).length}
                    </p>
                    <p className={styles.childStatLabel}>Passed</p>
                  </div>
                </div>
                <div className={styles.childStat}>
                  <X size={16} color="#dc2626" />
                  <div>
                    <p className={styles.childStatValue} style={{ color: '#dc2626' }}>
                      {quizzes.length - quizzes.filter((q: any) => q.passed).length}
                    </p>
                    <p className={styles.childStatLabel}>Failed</p>
                  </div>
                </div>
                <div className={styles.childStat}>
                  <TrendingUp size={16} color="#b45309" />
                  <div>
                    <p className={styles.childStatValue}>
                      {quizzes.length > 0 ? Math.round(quizzes.reduce((s: number, q: any) => s + q.percentage, 0) / quizzes.length) : 0}%
                    </p>
                    <p className={styles.childStatLabel}>Avg Score</p>
                  </div>
                </div>
              </div>

              <section className={styles.drawerSection} style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.06)' }}>
                <h3>Attempts Log</h3>
                {quizzes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    <BookOpen size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.4 }} />
                    <p>No quiz attempts yet</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {quizzes.map((q: any, i: number) => {
                      const passed = q.percentage >= 60;
                      return (
                        <div key={q.id || i} className={styles.quizRowDetailed}>
                          <div className={styles.quizHeaderDetail}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 950 }}>{q.quiz_title} ({q.subject_name})</span>
                            <span className={`${styles.quizBadge} ${passed ? styles.quizBadgePassed : styles.quizBadgeFailed}`}>
                              {passed ? 'Pass' : 'Fail'}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 800 }}>
                            Lesson: {q.lesson_title}
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', fontWeight: 750 }}>
                            <span>Score: {q.score}/{q.max_score} ({q.percentage}%)</span>
                            <span>{q.time_taken_seconds ? Math.round(q.time_taken_seconds / 60) + ' min' : 'N/A'}</span>
                          </div>

                          <div className={styles.progressTrack} style={{ height: '0.35rem', marginTop: '0.2rem' }}>
                            <div className={styles.progressFill} style={{ width: `${q.percentage}%`, background: passed ? '#16a34a' : '#dc2626' }} />
                          </div>

                          <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, marginTop: '0.2rem' }}>
                            {new Date(q.completed_at || q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Profile Drawer */}
      {activeTab === 'profile' && (
        <div className={styles.drawerOverlay} onClick={closeDrawer}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitle}>
                <div className={styles.drawerLogo}>
                  <Users size={20} />
                </div>
                <div>
                  <h2>Profile Details</h2>
                </div>
              </div>
              <button className={styles.closeButton} onClick={closeDrawer}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.drawerBody}>
              {/* Parent Profile Section */}
              <section className={styles.drawerSection} style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.06)' }}>
                <h3>Parent Account</h3>
                <div className={styles.profileCard}>
                  <div className={styles.profileAvatar}>
                    {(parentProfile?.name || 'P').slice(0, 2).toUpperCase()}
                  </div>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileName}>{parentProfile?.name || 'Parent'}</p>
                    <div className={styles.profileRow}>
                      <Mail size={14} />
                      <span>{parentProfile?.email || 'N/A'}</span>
                    </div>
                    {parentProfile?.phone && (
                      <div className={styles.profileRow}>
                        <Phone size={14} />
                        <span>{parentProfile?.phone}</span>
                      </div>
                    )}
                    <div className={styles.profileRow}>
                      <Award size={14} />
                      <span>Plan: {parentProfile?.plan_type === 'free' ? 'Free Plan' : (parentProfile?.plan_type || 'Free')}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Timer banner here inside profile drawer if they are individual parents */}
                {parentProfile?.plan_expires_at && !parentProfile?.school && (!activeChild || !activeChild.school) && (
                  <div style={{
                    background: 'linear-gradient(135deg, #12312f, #1e4d4a)',
                    color: '#fff',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '0.85rem',
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: '0 4px 15px rgba(18, 49, 47, 0.08)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1rem' }}>⏳</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 900 }}>Premium Access Active</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)' }}>Time Remaining:</span>
                      <CountdownTimer expiresAt={parentProfile.plan_expires_at} />
                    </div>
                  </div>
                )}
              </section>

              {/* Active Child Details Section */}
              {activeChild && (
                <section className={styles.drawerSection} style={{ background: '#fff', border: '1px solid rgba(15,23,42,0.06)' }}>
                  <h3>Active Child: {activeChild.name}</h3>
                  <div className={styles.childGrid}>
                    <div className={styles.childStat}>
                      <GraduationCap size={16} color="#2563eb" />
                      <div>
                        <p className={styles.childStatValue}>{activeChild.grade || 'LKG'}</p>
                        <p className={styles.childStatLabel}>Grade</p>
                      </div>
                    </div>
                    <div className={styles.childStat}>
                      <Building2 size={16} color="#16a34a" />
                      <div>
                        <p className={styles.childStatValue}>{activeChild.school || 'N/A'}</p>
                        <p className={styles.childStatLabel}>School</p>
                      </div>
                    </div>
                    <div className={styles.childStat}>
                      <Zap size={16} color="#ea580c" />
                      <div>
                        <p className={styles.childStatValue}>{childProgress?.student?.current_streak_days || 0}d</p>
                        <p className={styles.childStatLabel}>Streak</p>
                      </div>
                    </div>
                    <div className={styles.childStat}>
                      <BookOpen size={16} color="#06b6d4" />
                      <div>
                        <p className={styles.childStatValue}>{childProgress?.lesson_progress?.completed_lessons || 0}</p>
                        <p className={styles.childStatLabel}>Lessons</p>
                      </div>
                    </div>
                    <div className={styles.childStat}>
                      <Award size={16} color="#ec4899" />
                      <div>
                        <p className={styles.childStatValue}>{childProgress?.student?.badges_earned || 0}</p>
                        <p className={styles.childStatLabel}>Badges</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
      {showSessionExpired && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>🔒</div>
            <h2 className={styles.modalTitle}>Session Expired</h2>
            <p className={styles.modalText}>
              Your session has expired. Please log in again to access the Parent Portal.
            </p>
            <button className={styles.modalButton} onClick={handleRedirectToLogin}>
              Log In Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
