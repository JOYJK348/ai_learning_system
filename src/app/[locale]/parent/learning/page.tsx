'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { parentKeys } from '@/core/constants/queryKeys';
import { parentApi } from '@/core/services/parentApi';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, ChevronUp, ChevronDown, X, Users, ArrowLeft } from 'lucide-react';
import styles from '../page.module.css';

export default function ParentLearningPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { user } = useAuth();

  const { data: childrenData, isLoading: childrenLoading } = useQuery({
    queryKey: parentKeys.children,
    queryFn: parentApi.children,
    staleTime: 5 * 60 * 1000,
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

  const { data: chapterData, isLoading: chapterLoading } = useQuery({
    queryKey: parentKeys.childChapterProgress(activeChildId ?? ''),
    queryFn: () => parentApi.childChapterProgress(activeChildId!),
    enabled: !!activeChildId,
    staleTime: 60_000,
    retry: false,
  });

  const chapterProgress = Array.isArray(chapterData) ? chapterData : [];

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

  const [roadmapSubjectId, setRoadmapSubjectId] = useState<string | null>(null);
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({});

  // Prevent background scrolling when roadmap drawer is open
  useEffect(() => {
    if (roadmapSubjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [roadmapSubjectId]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const isLoading = childrenLoading || (activeChildId ? chapterLoading : false);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader} />
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Loading Learning Map...</p>
      </div>
    );
  }

  return (
    <main className={styles.shell} style={{ paddingBottom: '7rem' }}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <a href={`/${locale}/parent`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none', marginBottom: '0.5rem' }}>
              <ArrowLeft size={14} /> Back to dashboard
            </a>
            <h1 className={styles.title}>Learning Map</h1>
            <div className={styles.headerMeta}>
              {activeChild && (
                <span className={styles.headerRole}>
                  🎓 {activeChild.name} ({activeChild.grade || 'LKG'})
                </span>
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

        <div style={{ padding: '0 1.25rem', marginTop: '1rem' }}>
          {chapterProgress.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: '#fff', borderRadius: '2rem', border: '1px solid rgba(15,23,42,0.06)' }}>
              <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
              <p style={{ fontWeight: 650 }}>No curriculum roadmaps available yet.</p>
            </div>
          ) : (
            <div className={styles.subjectsGridVisual}>
              {chapterProgress.map((subject: any) => {
                const subCompleted = subject.chapters?.filter((c: any) => c.is_complete).length || 0;
                const subTotal = subject.chapters?.length || 0;
                const pct = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;
                const theme = getSubjectTheme(subject.name);
                const emoji = subject.name.toLowerCase().includes('tamil') ? '📚' :
                              subject.name.toLowerCase().includes('math') ? '✏️' :
                              subject.name.toLowerCase().includes('english') ? '🌟' : '🚀';
                
                return (
                  <div
                    key={subject.id}
                    className={styles.subjectCardVisual}
                    style={{ background: theme.bg, borderColor: theme.border }}
                    onClick={() => setRoadmapSubjectId(subject.id)}
                  >
                    <div className={styles.subjectCardVisualHeader}>
                      <div className={styles.subjectCardIcon}>
                        {emoji}
                      </div>
                      <span className={styles.kpiChange} style={{ color: theme.text, fontWeight: 900 }}>
                        {pct}% Done
                      </span>
                    </div>
                    <div className={styles.subjectCardVisualBody}>
                      <h4 style={{ color: theme.text }}>{subject.name}</h4>
                      <p>{subCompleted} of {subTotal} chapters done</p>
                      <div className={styles.subjectCardProgressTrack}>
                        <div
                          className={styles.subjectCardProgressFill}
                          style={{ width: `${pct}%`, background: theme.fill }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Learning Roadmap Drawer */}
      {/* Learning Roadmap Drawer */}
      {roadmapSubjectId && (() => {
        const subject = chapterProgress.find((s: any) => s.id === roadmapSubjectId) as any;
        if (!subject) return null;
        const theme = getSubjectTheme(subject.name);
        const emoji = subject.name.toLowerCase().includes('tamil') ? '📚' :
                      subject.name.toLowerCase().includes('math') ? '✏️' :
                      subject.name.toLowerCase().includes('english') ? '🌟' : '🚀';
        
        return (
          <div className={styles.drawerOverlay} onClick={() => setRoadmapSubjectId(null)}>
            <div className={styles.drawer} style={{ 
              background: 'linear-gradient(160deg, #f0fdfa 0%, #ffffff 60%)'
            }} onClick={(e) => e.stopPropagation()}>
              <div className={styles.drawerHeader} style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(16px)' }}>
                <div className={styles.drawerTitle}>
                  <div className={styles.drawerLogo} style={{ background: theme.bg, color: theme.text, fontSize: '1.25rem' }}>
                    {emoji}
                  </div>
                  <div>
                    <h2 style={{ color: theme.text }}>{subject.name} Roadmap</h2>
                    <span className={styles.activeChildBadge} style={{ marginTop: '0.2rem', padding: '0.1rem 0.5rem', fontSize: '0.7rem', background: 'rgba(255,255,255,0.6)', border: `1px solid ${theme.border}` }}>
                      {activeChild?.name}'s Study Progress
                    </span>
                  </div>
                </div>
                <button className={styles.closeButton} onClick={() => setRoadmapSubjectId(null)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className={styles.drawerBody}>
                <div className={styles.roadmapMilestones}>
                  {subject.chapters?.map((chapter: any, index: number) => {
                    const isComplete = chapter.is_complete;
                    const isActive = chapter.completion_percentage > 0 && !isComplete;
                    const isChapterExpanded = expandedChapterIds[chapter.id] ?? isActive;
                    
                    return (
                      <div
                        key={chapter.id || index}
                        className={`${styles.roadmapMilestone} ${
                          isComplete ? styles.roadmapMilestoneComplete : 
                          isActive ? styles.roadmapMilestoneActive : styles.roadmapMilestoneLocked
                        }`}
                      >
                        <div className={styles.roadmapNode} style={
                          isComplete ? { background: theme.bg, color: theme.text, borderColor: '#ffffff', boxShadow: `0 4px 10px rgba(0,0,0,0.06)` } :
                          isActive ? { background: '#ffffff', color: theme.text, borderColor: theme.text, transform: 'scale(1.08)', boxShadow: `0 4px 12px ${theme.border}` } :
                          { background: '#f8fafc', color: '#cbd5e1', borderColor: '#f1f5f9' }
                        }>
                          {isComplete ? '✅' : index + 1}
                        </div>
                        
                        <div className={styles.roadmapMilestoneContent} style={
                          isComplete ? { background: theme.bg, borderColor: theme.border } :
                          isActive ? { background: '#ffffff', borderColor: theme.text, boxShadow: `0 8px 24px rgba(0,0,0,0.03)` } :
                          { background: 'rgba(248, 250, 252, 0.45)', borderColor: 'rgba(15, 23, 42, 0.02)' }
                        }>
                          <div
                            className={styles.roadmapMilestoneHeader}
                            onClick={() => toggleChapter(chapter.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div>
                              <h4 className={styles.roadmapMilestoneTitle} style={isComplete ? { color: theme.text } : {}}>{chapter.name}</h4>
                              <span className={styles.roadmapMilestoneLessonsCount} style={isComplete ? { color: theme.text, opacity: 0.8 } : {}}>
                                {chapter.completed_lessons} of {chapter.total_lessons} lessons completed ({chapter.completion_percentage}%)
                              </span>
                            </div>
                            <span>
                              {isChapterExpanded ? <ChevronUp size={16} color={isComplete ? theme.text : "#64748b"} /> : <ChevronDown size={16} color={isComplete ? theme.text : "#64748b"} />}
                            </span>
                          </div>
                          
                          {isChapterExpanded && chapter.lessons && (
                            <div className={styles.roadmapLessonsList} style={{ borderTop: `1px dashed ${isComplete ? theme.border : 'rgba(15, 23, 42, 0.06)'}` }}>
                              {chapter.lessons.length === 0 ? (
                                <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>No lessons inside chapter</p>
                              ) : (
                                chapter.lessons.map((lesson: any, lIdx: number) => (
                                  <div key={lesson.id || lIdx} className={styles.roadmapLessonItem} style={{ background: isComplete ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.85)' }}>
                                    <span className={styles.roadmapLessonTitle}>
                                      {lesson.status === 'completed' ? '🟢 ' : lesson.status === 'in_progress' ? '🔵 ' : '⚪ '}
                                      {lesson.title}
                                    </span>
                                    <span
                                      className={styles.roadmapLessonScore}
                                      style={{ color: lesson.status === 'completed' ? '#16a34a' : '#64748b' }}
                                    >
                                      {lesson.status === 'completed' 
                                        ? 'Done'
                                        : lesson.status === 'in_progress' ? 'Learning' : 'Locked'
                                      }
                                    </span>
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}

function roadmapMilestoneClass(isComplete: boolean, isActive: boolean) {
  if (isComplete) return styles.roadmapNode + ' ' + styles.roadmapMilestoneComplete;
  if (isActive) return styles.roadmapNode + ' ' + styles.roadmapMilestoneActive;
  return styles.roadmapNode + ' ' + styles.roadmapMilestoneLocked;
}
