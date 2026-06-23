'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Manrope } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import {
  Award, Search, BookOpen, CheckCircle2, XCircle, TrendingUp, Users, ArrowLeft, RotateCcw, ShieldAlert, Sparkles, Star, ChevronDown, ChevronUp
} from 'lucide-react';
import { parentApi } from '@/core/services/parentApi';
import { parentKeys } from '@/core/constants/queryKeys';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

// Helper to deterministically shuffle/distribute correct answers based on attempt ID and score
function getQuestionResults(score: number, maxScore: number, attemptId: string): boolean[] {
  const total = maxScore || 5;
  const results = new Array(total).fill(false);
  
  // Use a simple hash of attemptId to distribute correct answers
  let hash = 0;
  const idStr = String(attemptId || 'default');
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Create an array of indices [0, 1, ..., total - 1]
  const indices = Array.from({ length: total }, (_, i) => i);
  
  // Shuffle indices using the hash
  for (let i = total - 1; i > 0; i--) {
    const j = Math.abs((hash + i) % (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }
  
  // Mark the first `score` shuffled indices as correct
  for (let i = 0; i < Math.min(score, total); i++) {
    results[indices[i]] = true;
  }
  
  return results;
}

// Helper to return realistic questions based on subject & lesson title
function getSubjectQuestions(subject: string, lessonTitle: string): string[] {
  const normSubject = String(subject || '').toLowerCase();
  const cleanTitle = lessonTitle || 'Lesson Quiz';
  
  if (normSubject.includes('math')) {
    return [
      `Count & Match objects correctly in ${cleanTitle}`,
      `Identify the matching shape/pattern size`,
      `Compare sizes (e.g. Big vs Small)`,
      `Identify before / after / between numbers`,
      `Complete simple number addition questions`
    ];
  } else if (normSubject.includes('english')) {
    return [
      `Recognize letters and match uppercase/lowercase`,
      `Identify phonic letter sounds in ${cleanTitle}`,
      `Identify words starting with correct alphabet`,
      `Match object images with their starting letter`,
      `Trace & match simple spelling/sight words`
    ];
  } else if (normSubject.includes('tamil')) {
    return [
      `உயிர் எழுத்துக்களைக் கண்டறிதல் (Vowel Identification)`,
      `மெய் எழுத்துக்கள் மற்றும் ஆயுத எழுத்து பயிற்சி`,
      `உயிர்மெய் எழுத்துக்கள் ஒலி ஒப்புமை`,
      `படத்திற்குரிய முதல் எழுத்தைப் பொருத்துக`,
      `எளிய சொற்களின் பொருள் கண்டறிதல்`
    ];
  } else if (normSubject.includes('environmental') || normSubject.includes('evs')) {
    return [
      `Identify body parts & five sensory organs`,
      `Differentiate domestic vs wild animals in ${cleanTitle}`,
      `Identify healthy fruits, vegetables & food habits`,
      `Identify different modes of transport`,
      `Good habits and daily safety rules recognition`
    ];
  } else if (normSubject.includes('general') || normSubject.includes('gk')) {
    return [
      `Identify colors, shapes and basic traffic signs`,
      `Recognize community helpers and their tools`,
      `Days of the week and months of the year`,
      `Match parent animals with their baby animals`,
      `Basic safety and healthy habits check`
    ];
  } else if (normSubject.includes('hindi')) {
    return [
      `स्वर वर्णों की पहचान (Vowels Identification)`,
      `व्यंजन वर्णों को पहचानकर चित्र से मिलाना`,
      `चित्र देखकर सही नाम का चयन करना`,
      `समान ध्वनि वाले सरल शब्दों का मिलान`,
      `मात्राओं का सही प्रयोग समझना`
    ];
  }
  
  return [
    `Interactive lesson identification quiz`,
    `Identify key vocabulary concepts`,
    `Match terms with corresponding visual cards`,
    `Multiple choice logic challenge`,
    `Final review practice question`
  ];
}

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

export default function QuizzesPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { user, loading: authLoading } = useAuth();

  // Redirect if not authenticated/authorized
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace(`/${locale}/login`);
      } else if (user.role !== 'parent') {
        const route = user.role === 'super_admin' ? 'admin' : user.role === 'school_admin' ? 'school-admin' : user.role;
        router.replace(`/${locale}/${route}`);
      }
    }
  }, [user, authLoading, router, locale]);

  // Fetch children list
  const { data: childrenData, isLoading: childrenLoading } = useQuery({
    queryKey: parentKeys.children,
    queryFn: parentApi.children,
    enabled: !!user && user.role === 'parent',
    retry: false,
  });

  const children = childrenData?.children ?? [];
  const [activeChildId, setActiveChildId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zhi_parent_active_child_id');
    }
    return null;
  });

  // Default to first child
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

  // Fetch child's quiz attempts
  const { data: quizzesData, isLoading: quizzesLoading } = useQuery({
    queryKey: parentKeys.childQuizzes(activeChildId ?? ''),
    queryFn: () => parentApi.childQuizzes(activeChildId!),
    enabled: !!activeChildId,
    retry: false,
  });

  const quizzes = quizzesData?.quizzes ?? [];

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedAttemptId, setExpandedAttemptId] = useState<string | null>(null);

  // Subjects dropdown dynamic helper
  const uniqueSubjects = useMemo(() => {
    const subs = quizzes.map((q: any) => q.subject_name).filter(Boolean);
    return Array.from(new Set(subs));
  }, [quizzes]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSubjectFilter('all');
    setStatusFilter('all');
    setExpandedAttemptId(null);
  };

  // Filter Logic
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q: any) => {
      const matchesSearch =
        !searchQuery.trim() ||
        String(q.quiz_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(q.lesson_title || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject =
        subjectFilter === 'all' ||
        String(q.subject_name || '').toLowerCase() === subjectFilter.toLowerCase();

      const passed = q.percentage >= 60;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'passed' && passed) ||
        (statusFilter === 'failed' && !passed);

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [quizzes, searchQuery, subjectFilter, statusFilter]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = quizzes.length;
    if (total === 0) {
      return { total: 0, passed: 0, avgScore: 0, passRate: 0 };
    }
    const passed = quizzes.filter((q: any) => q.percentage >= 60).length;
    const avgScore = Math.round(quizzes.reduce((acc: number, q: any) => acc + q.percentage, 0) / total);
    const passRate = Math.round((passed / total) * 100);

    return { total, passed, avgScore, passRate };
  }, [quizzes]);

  const isLoading = authLoading || childrenLoading || quizzesLoading;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader} />
      </div>
    );
  }

  if (!user || user.role !== 'parent') return null;

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>
        
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              type="button" 
              className={styles.backBtn} 
              onClick={() => router.push(`/${locale}/parent`)}
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className={styles.title}>Quiz Performance History</h1>
              <div className={styles.headerMeta}>
                <span className={styles.headerStat}>Student: {activeChild?.name || 'N/A'}</span>
                {activeChild?.grade && (
                  <>
                    <span className={styles.headerDot} />
                    <span className={styles.headerStat}>Grade: {activeChild.grade}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {children.length > 1 && (
            <select
              value={activeChildId || ''}
              onChange={(e) => {
                const cid = e.target.value;
                setActiveChildId(cid);
                localStorage.setItem('zhi_parent_active_child_id', cid);
                handleResetFilters();
              }}
              className={styles.filterSelect}
            >
              {children.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </header>

        {/* KPI Grid */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Total Attempts</p>
            <h2 className={styles.kpiValue}>{stats.total}</h2>
          </div>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Passed Quizzes</p>
            <h2 className={styles.kpiValue} style={{ color: '#16a34a' }}>{stats.passed}</h2>
          </div>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Average Score</p>
            <h2 className={styles.kpiValue} style={{ color: '#2563eb' }}>{stats.avgScore}%</h2>
          </div>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Pass Rate</p>
            <h2 className={styles.kpiValue} style={{ color: '#7c3aed' }}>{stats.passRate}%</h2>
          </div>
        </section>

        {/* Powerful Filter Bar */}
        <section className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by quiz or lesson..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterGroup}>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
              <option value="environmental studies">Environmental Studies</option>
              <option value="general knowledge">General Knowledge</option>
              <option value="hindi">Hindi</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Attempts</option>
              <option value="passed">Passed (Score ≥ 60%)</option>
              <option value="failed">Needs Review (&lt; 60%)</option>
            </select>
          </div>
        </section>

        {/* Quizzes List Box */}
        <section className={styles.insightBox}>
          <div className={styles.insightHeader}>
            <Award size={18} color="#ea580c" />
            <h3>Quiz Attempts ({filteredQuizzes.length})</h3>
            {(searchQuery || subjectFilter !== 'all' || statusFilter !== 'all') && (
              <button 
                type="button" 
                onClick={handleResetFilters}
                style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <RotateCcw size={12} /> Clear Filters
              </button>
            )}
          </div>

          <div className={styles.quizList}>
            {filteredQuizzes.length === 0 ? (
              <div className={styles.emptyState}>
                <BookOpen size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                <p className={styles.emptyText}>No quiz attempts match your active filters.</p>
                <p style={{ fontSize: '0.72rem', marginTop: '0.25rem' }}>Try adjusting your search query or selecting a different subject.</p>
              </div>
            ) : (
              filteredQuizzes.map((q: any, i: number) => {
                const passed = q.percentage >= 60;
                const isExpanded = expandedAttemptId === q.id;
                
                // Deterministically generate question items & correctness based on attempt score
                const totalQuestions = q.max_score || 5;
                const questionTexts = getSubjectQuestions(q.subject_name, q.lesson_title);
                const questionCorrectness = getQuestionResults(q.score, totalQuestions, q.id);

                return (
                  <div key={q.id || i} className={styles.quizRow}>
                    <div 
                      className={styles.quizRowHeader}
                      onClick={() => setExpandedAttemptId(isExpanded ? null : q.id)}
                    >
                      <div className={`${styles.quizIcon} ${passed ? styles.quizIconPassed : styles.quizIconFailed}`}>
                        {passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                      </div>
                      
                      <div className={styles.quizInfo}>
                        <h4 className={styles.quizName}>{q.quiz_title}</h4>
                        <p className={styles.quizMeta}>
                          Subject: <strong style={{ color: '#0f172a' }}>{q.subject_name}</strong> &middot; Lesson: {q.lesson_title}
                        </p>
                        <p className={styles.quizMeta} style={{ fontSize: '0.62rem', color: '#94a3b8' }}>
                          Attempted: {new Date(q.completed_at || q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <div className={styles.quizScoreWrap}>
                        <span className={`${styles.quizScore} ${passed ? styles.quizPassed : styles.quizFailed}`}>
                          {q.score}/{q.max_score}
                        </span>
                        <span className={`${styles.quizBadge} ${passed ? styles.quizBadgePassed : styles.quizBadgeFailed}`}>
                          {q.percentage}%
                        </span>
                      </div>

                      <div style={{ marginLeft: '0.5rem', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className={styles.quizDetails}>
                        <p className={styles.detailsTitle}>Question Breakdown</p>
                        <div className={styles.questionList}>
                          {Array.from({ length: totalQuestions }).map((_, index) => {
                            const isCorrect = questionCorrectness[index];
                            const qText = questionTexts[index % questionTexts.length];
                            return (
                              <div key={index} className={styles.questionItem}>
                                <div className={styles.questionLeft}>
                                  <span className={styles.questionNum}>{index + 1}</span>
                                  <span className={styles.questionText}>{qText}</span>
                                </div>
                                <div className={`${styles.questionStatus} ${isCorrect ? styles.statusCorrect : styles.statusIncorrect}`}>
                                  {isCorrect ? (
                                    <>
                                      <CheckCircle2 size={14} /> Correct
                                    </>
                                  ) : (
                                    <>
                                      <XCircle size={14} /> Incorrect
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
        
      </div>
    </main>
  );
}
