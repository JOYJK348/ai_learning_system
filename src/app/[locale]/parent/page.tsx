'use client';

import React, { useState, useEffect } from 'react';
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

export default function ParentDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const activeTab = searchParams.get('tab');
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const closeDrawer = () => {
    router.push(`/${locale}/parent`);
  };



  const handleRedirectToLogin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('zhi_auth_user');
      document.cookie = 'zhi_user_role=; path=/; max-age=0';
      window.location.href = `/${locale}/login?expired=1`;
    }
  };
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  const { data: meRaw, error: meError } = useQuery({
    queryKey: parentKeys.me, queryFn: parentApi.me, staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const parentProfile = (meRaw as any)?.parent ?? null;

  const { data: childrenData, error: childrenError } = useQuery({
    queryKey: parentKeys.children, queryFn: parentApi.children, staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const children = childrenData?.children ?? [];
  const [activeChildId, setActiveChildId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeChildId && children.length > 0) setActiveChildId(children[0].id);
  }, [children, activeChildId]);

  const activeChild = children.find((c: any) => c.id === activeChildId) ?? null;

  const { data: progressData, error: progressError } = useQuery({
    queryKey: parentKeys.childProgress(activeChildId ?? ''),
    queryFn: () => parentApi.childProgress(activeChildId!),
    enabled: !!activeChildId, staleTime: 60_000,
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

  const { data: chapterData, error: chapterError } = useQuery({
    queryKey: parentKeys.childChapterProgress(activeChildId ?? ''),
    queryFn: () => parentApi.childChapterProgress(activeChildId!),
    enabled: !!activeChildId, staleTime: 60_000,
    retry: false,
  });

  const childProgress = progressData as any;
  const quizzes = quizzesData?.quizzes ?? [];
  const chapterProgress = Array.isArray(chapterData) ? chapterData : [];

  // Track authentication / forbidden errors
  useEffect(() => {
    const isAuthError = (err: any) => {
      if (!err) return false;
      const msg = String(err.message || '').toLowerCase();
      return msg.includes('forbidden') || msg.includes('unauthorized') || msg.includes('failed to load') || msg.includes('login') || msg.includes('token');
    };

    if (
      (isAuthError(meError) ||
      isAuthError(childrenError) ||
      isAuthError(progressError) ||
      isAuthError(quizzesError) ||
      isAuthError(chapterError)) &&
      (!user || user.role === 'parent')
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
  const totalChapters = chapterProgress.reduce((sum: number, s: any) => sum + (s.chapters?.length || 0), 0);
  const completedChapters = chapterProgress.reduce((sum: number, s: any) => sum + (s.chapters?.filter((c: any) => c.is_complete).length || 0), 0);
  const overallPercentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  // Simplified smiley & status messages for uneducated parents
  const getStatusSmiley = (pct: number) => {
    if (pct === 100) return { emoji: '🏆', text: 'Syllabus Finished!', subtext: 'Excellent job!', color: '#16a34a' };
    if (pct >= 70) return { emoji: '✨', text: 'Almost Completed!', subtext: 'Very close to finishing!', color: '#10b981' };
    if (pct >= 30) return { emoji: '🚀', text: 'Doing Great!', subtext: 'Learning every day!', color: '#d97706' };
    return { emoji: '🌱', text: 'Getting Started!', subtext: 'Beginning the journey!', color: '#2563eb' };
  };

  const statusObj = getStatusSmiley(overallPercentage);

  // Subject theme generator
  const getSubjectTheme = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('tamil')) return { bg: 'linear-gradient(135deg, #fef2f2, #fee2e2)', border: 'rgba(239, 68, 68, 0.15)', text: '#dc2626', fill: 'linear-gradient(90deg, #ef4444, #dc2626)', accent: '#fca5a5' };
    if (n.includes('math')) return { bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: 'rgba(245, 158, 11, 0.15)', text: '#b45309', fill: 'linear-gradient(90deg, #f59e0b, #d97706)', accent: '#fcd34d' };
    if (n.includes('english')) return { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: 'rgba(59, 130, 246, 0.15)', text: '#1d4ed8', fill: 'linear-gradient(90deg, #3b82f6, #2563eb)', accent: '#bfdbfe' };
    return { bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: 'rgba(34, 197, 94, 0.15)', text: '#15803d', fill: 'linear-gradient(90deg, #10b981, #059669)', accent: '#bbf7d0' };
  };

  const recentQuizzes = quizzes.slice(0, 4);

  return (
    <div className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <p className={styles.eyebrow}>Parent Portal</p>
            <h1 className={styles.title}>
              Hello, <span style={{ color: '#16a085' }}>{parentProfile?.name || 'Parent'}</span>!
            </h1>
            <p className={styles.subtitle}>
              Here is an easy look at how your child is studying and learning.
            </p>
          </div>
          {children.length > 1 ? (
            <div className={styles.headerActions}>
              <div className={styles.filterGroup}>
                <Users size={16} />
                <select
                  value={activeChildId || ''}
                  onChange={(e) => setActiveChildId(e.target.value)}
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
          ) : children.length === 1 ? (
            <div className={styles.headerActions}>
              <span className={styles.activeChildBadge}>
                <Users size={14} /> Student: {children[0].name}
              </span>
            </div>
          ) : null}
        </div>

        {/* Dashboard Main Grid */}
        <div className={styles.dashboardGrid}>
          <div className={styles.leftStack}>
            {/* Subject Textbooks / Syllabus Board */}
            <section className={styles.insightBox}>
              <div className={styles.insightHeader}>
                <BookOpen size={18} color="#12312f" />
                <h3>Syllabus & Textbook Chapters</h3>
                <span className={styles.insightCount}>{chapterProgress.length} Subjects</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 650, marginTop: '-0.8rem', marginBottom: '1.2rem' }}>
                Click on any subject card to see which chapters are completed!
              </p>

              {chapterProgress.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  <BookOpen size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.4 }} />
                  <p>Loading syllabus progress...</p>
                </div>
              ) : (
                <div className={styles.subjectCardGrid}>
                  {chapterProgress.map((subject: any) => {
                    const subCompleted = subject.chapters?.filter((c: any) => c.is_complete).length || 0;
                    const subTotal = subject.chapters?.length || 0;
                    const pct = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;
                    const theme = getSubjectTheme(subject.name);
                    const isExpanded = expandedSubjectId === subject.id;
                    const smileyInfo = getStatusSmiley(pct);

                    return (
                      <div
                        key={subject.id}
                        className={styles.subjectTile}
                        style={{ background: theme.bg, borderColor: theme.border }}
                      >
                        {/* Header Box */}
                        <div
                          className={styles.subjectTileHeader}
                          onClick={() => setExpandedSubjectId(isExpanded ? null : subject.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className={styles.subjectTileInfo}>
                            <h4 style={{ color: theme.text, margin: 0, fontSize: '1rem', fontWeight: 950 }}>
                              {subject.name}
                            </h4>
                            <p style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, margin: '0.15rem 0 0' }}>
                              {subCompleted} of {subTotal} chapters completed ({pct}%)
                            </p>
                          </div>
                          <div className={styles.subjectTileStatus}>
                            <span style={{ fontSize: '1.1rem', marginRight: '0.35rem' }}>{smileyInfo.emoji}</span>
                            {isExpanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                          </div>
                        </div>

                        {/* Progress line */}
                        <div className={styles.subjectProgressLineTrack} style={{ background: theme.accent + '66' }}>
                          <div className={styles.subjectProgressLineFill} style={{ width: `${pct}%`, background: theme.fill }} />
                        </div>

                        {/* Expandable Chapters List */}
                        {isExpanded && subject.chapters && (
                          <div className={styles.subjectChaptersList}>
                            {subject.chapters.map((chapter: any, cIdx: number) => {
                              const isChapterExpanded = expandedChapterIds[chapter.id];
                              return (
                                <div key={chapter.id || cIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                  <div
                                    className={styles.chapterItemRow}
                                    onClick={() => toggleChapter(chapter.id)}
                                    role="button"
                                    tabIndex={0}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <div className={styles.chapterItemLeft}>
                                      {chapter.is_complete ? (
                                        <CheckCircle2 size={16} className={styles.completeCheckIcon} />
                                      ) : chapter.completion_percentage > 0 ? (
                                        <Unlock size={15} style={{ color: '#3b82f6', flexShrink: 0 }} />
                                      ) : (
                                        <Lock size={15} style={{ color: '#94a3b8', flexShrink: 0 }} />
                                      )}
                                      <div>
                                        <p className={styles.chapterItemName}>{chapter.name}</p>
                                        <span className={styles.chapterItemLessonsMeta}>
                                          {chapter.completed_lessons} of {chapter.total_lessons} lessons done
                                        </span>
                                      </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      <span className={styles.chapterItemPct} style={{ color: chapter.is_complete ? '#16a34a' : '#64748b' }}>
                                        {chapter.completion_percentage}%
                                      </span>
                                      {isChapterExpanded ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                                    </div>
                                  </div>

                                  {/* Expanded Lessons list */}
                                  {isChapterExpanded && chapter.lessons && (
                                    <div className={styles.lessonsList}>
                                      {chapter.lessons.length === 0 ? (
                                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', paddingLeft: '2rem', margin: '0.2rem 0' }}>No lessons found</p>
                                      ) : (
                                        chapter.lessons.map((lesson: any, lIdx: number) => (
                                          <div key={lesson.id || lIdx} className={styles.lessonItemRow}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                                              <span style={{ fontSize: '0.8rem' }}>
                                                {lesson.status === 'completed' ? '🟢' : lesson.status === 'in_progress' ? '🔵' : '⚪'}
                                              </span>
                                              <span className={styles.lessonItemTitle}>{lesson.title}</span>
                                            </div>
                                            <span style={{ fontSize: '0.68rem', color: lesson.status === 'completed' ? '#16a34a' : '#64748b', fontWeight: 800 }}>
                                              {lesson.status === 'completed'
                                                ? (typeof lesson.quiz_score === 'number'
                                                    ? `Score: ${lesson.quiz_score}/${lesson.quiz_max_score || 5}`
                                                    : 'Read'
                                                  )
                                                : lesson.status === 'in_progress'
                                                ? 'Learning'
                                                : 'Not Started'
                                              }
                                            </span>
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <div className={styles.rightStack}>
            {/* Simple Quiz Attempts */}
            <section className={styles.insightBox}>
              <div className={styles.insightHeader}>
                <Award size={18} color="#ea580c" />
                <h3>Recent Quizzes</h3>
                <span className={styles.insightCount}>{quizzes.length} Attempts</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 650, marginTop: '-0.8rem', marginBottom: '1rem' }}>
                Quizzes show how well your child remembers lessons.
              </p>

              <div className={styles.quizListSimple}>
                {recentQuizzes.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textAlign: 'center', padding: '1rem 0' }}>No quizzes attempts yet</p>
                ) : (
                  recentQuizzes.map((q: any, i: number) => {
                    const passed = q.percentage >= 60;
                    return (
                      <div key={q.id || i} className={styles.quizAttemptRow}>
                        <div className={styles.quizAttemptIcon} style={{ background: passed ? '#dcfce7' : '#fee2e2' }}>
                          {passed ? '🌟' : '✏️'}
                        </div>
                        <div className={styles.quizAttemptInfo}>
                          <p className={styles.quizAttemptTitle} style={{ fontWeight: 950, color: '#0f172a' }}>
                            {q.quiz_title}
                          </p>
                          <p style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 800, margin: '0.1rem 0' }}>
                            Subject: {q.subject_name} ({q.lesson_title})
                          </p>
                          <p className={styles.quizAttemptSub}>
                            {new Date(q.completed_at || q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            {' · '}
                            {passed ? <span style={{ color: '#16a34a', fontWeight: 900 }}>Passed</span> : <span style={{ color: '#b45309', fontWeight: 900 }}>Needs Review</span>}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className={styles.quizAttemptScore} style={{ color: passed ? '#16a34a' : '#b45309' }}>
                            {q.score}/{q.max_score}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
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
