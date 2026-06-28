'use client';

import { useState, useMemo } from 'react';
import { Manrope } from 'next/font/google';
import {
  BookOpen, BookMarked, ChevronRight, Sparkles, GraduationCap,
  FileQuestion, Library, BookA, ArrowLeft, Trophy, MonitorSmartphone,
  BrainCircuit, BarChart3, Users, Star, CheckCircle2, Zap, Search, X,
  Award, RotateCcw, ChevronDown, ChevronUp, XCircle,
} from 'lucide-react';
import {
  useSchoolCurriculumOverview, useSchoolCurriculum, useCurriculumProgress,
  useGradeProgress, useGradeQuizzes,
} from '@/hooks/useSchoolCurriculum';
import type {
  GradeSummary, CurriculumOverview, StudentProgressRow, GradeProgressSummary,
  SchoolSubjectQuizGroup, SchoolQuizGroup, SchoolQuizAttempt,
} from '@/hooks/useSchoolCurriculum';
import styles from './page.module.css';

const adminFont = Manrope({ subsets: ['latin'], variable: '--admin-font', display: 'swap' });

// Helper to deterministically shuffle/distribute correct answers based on attempt ID and score
function getQuestionResults(score: number, maxScore: number, attemptId: string): boolean[] {
  const total = maxScore || 5;
  const results = new Array(total).fill(false);
  let hash = 0;
  const idStr = String(attemptId || 'default');
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
    const j = Math.abs((hash + i) % (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }
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


const GRADE_MASCOTS: Record<string, string> = { LKG: '👶', UKG: '🧒', 'Grade 1': '🎓' };
const SUBJECT_GRADIENTS: Record<string, string> = {
  English: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
  Mathematics: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
  Tamil: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
  Hindi: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
  'Environmental Studies': 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
  'General Knowledge': 'linear-gradient(135deg,#e0e7ff,#eef2ff)',
  Science: 'linear-gradient(135deg,#cffafe,#ecfeff)',
  'Computer Science': 'linear-gradient(135deg,#f0fdf4,#f7fee7)',
};
const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  English: <BookOpen size={15} />, Mathematics: <BrainCircuit size={15} />,
  Tamil: <BookMarked size={15} />, Hindi: <BookMarked size={15} />,
  Science: <Sparkles size={15} />, 'Computer Science': <MonitorSmartphone size={15} />,
  default: <Library size={15} />,
};

function getProgColor(p: number) { return p >= 70 ? '#22c55e' : p >= 40 ? '#f59e0b' : '#ef4444'; }
function getProgGrad(p: number) { return p >= 70 ? 'linear-gradient(90deg,#22c55e,#16a34a)' : p >= 40 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : 'linear-gradient(90deg,#ef4444,#dc2626)'; }

/* ─── KPI Grid ─────────────────────────────────────────── */
function KpiGrid({ overview }: { overview: CurriculumOverview }) {
  return (
    <section className={styles.kpiGrid}>
      {[
        { icon: BookA,        label: 'Subjects', value: overview.total_subjects,  cls: styles.kpiIcon1 },
        { icon: BookOpen,     label: 'Lessons',  value: overview.total_lessons,   cls: styles.kpiIcon2 },
        { icon: FileQuestion, label: 'Quizzes',  value: overview.total_quizzes,   cls: styles.kpiIcon3 },
        { icon: Trophy,       label: 'Fun Score',value: `${overview.avg_fun_score}%`, cls: styles.kpiIcon4 },
      ].map(k => (
        <article key={k.label} className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${k.cls}`}><k.icon size={20} /></div>
          <div className={styles.kpiContent}>
            <p className={styles.kpiLabel}>{k.label}</p>
            <h2 className={styles.kpiValue}>{typeof k.value === 'number' ? k.value.toLocaleString('en-IN') : k.value}</h2>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ─── Grade Card ────────────────────────────────────────── */
function GradeCard({ grade, isSelected, onSelect }: { grade: GradeSummary; isSelected: boolean; onSelect: () => void }) {
  const emoji = GRADE_MASCOTS[grade.name] || '📚';
  const c = getProgColor(grade.fun_score);
  return (
    <button
      type="button"
      className={`${styles.gradeCard} ${isSelected ? styles.gradeCardActive : ''}`}
      onClick={onSelect}
    >
      <div className={styles.gradeMascotBox}>{emoji}</div>
      <div className={styles.gradeInfo}>
        <h3 className={styles.gradeName}>{grade.name}</h3>
        <div className={styles.gradeStats}>
          <span className={styles.gradeStatPill}><BookA size={11} /> {grade.subjects_count}</span>
          <span className={styles.gradeStatPill}><BookOpen size={11} /> {grade.lessons_count}</span>
          <span className={styles.gradeStatPill}><FileQuestion size={11} /> {grade.quizzes_count}</span>
        </div>
      </div>
      <span className={styles.gradeFunScore} style={{ background: `${c}20`, color: c }}>
        {grade.fun_score}%
      </span>
      <ChevronRight size={15} className={styles.gradeArrow} />
    </button>
  );
}

/* ─── Progress Grade Card ────────────────────────────────── */
function ProgressGradeCard({ g, isSelected, onSelect }: { g: GradeProgressSummary; isSelected: boolean; onSelect: () => void }) {
  const c = getProgColor(g.avg_progress);
  const passRate = g.total_quizzes_attempted > 0
    ? Math.round((g.total_quizzes_passed / g.total_quizzes_attempted) * 100) : 0;
  return (
    <button
      type="button"
      className={`${styles.gradeCard} ${isSelected ? styles.gradeCardActive : ''}`}
      onClick={onSelect}
    >
      <div className={styles.gradeMascotBox}>{GRADE_MASCOTS[g.grade_name] || '📚'}</div>
      <div className={styles.gradeInfo}>
        <h3 className={styles.gradeName}>{g.grade_name}</h3>
        <div className={styles.gradeStats}>
          <span className={styles.gradeStatPill}><Users size={11} /> {g.total_students} students</span>
          <span className={styles.gradeStatPill}><Zap size={11} style={{ color: '#22c55e' }} /> {g.active_today} today</span>
        </div>
        <div className={styles.progressMini}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${g.avg_progress}%`, background: getProgGrad(g.avg_progress) }} />
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: c }}>{g.avg_progress}% avg</span>
        </div>
      </div>
      <div className={styles.progressKpiCol}>
        <span className={styles.progressKpiNum}>{g.total_lessons_completed}</span>
        <span className={styles.progressKpiSub}>lessons done</span>
        <span className={styles.progressKpiNum} style={{ marginTop: '0.35rem' }}>{passRate}%</span>
        <span className={styles.progressKpiSub}>quiz pass</span>
      </div>
      <ChevronRight size={15} className={styles.gradeArrow} />
    </button>
  );
}

/* ─── Student Progress Table ──────────────────────────── */
function StudentProgressView({ gradeId, gradeName, onBack }: { gradeId: string; gradeName: string; onBack: () => void }) {
  const { data: students, isLoading } = useGradeProgress(gradeId);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!students) return [];
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter(s => s.name.toLowerCase().includes(q) || (s.section ?? '').toLowerCase().includes(q));
  }, [students, search]);

  return (
    <div className={styles.progressDetailView}>
      {/* Back bar */}
      <div className={styles.detailBackBar}>
        <button type="button" className={styles.backTabBtn} onClick={onBack}>
          <ArrowLeft size={14} /> All Grades
        </button>
        <h2 className={styles.detailTitle}>{gradeName} — Student Progress</h2>
      </div>

      {/* Search */}
      <div className={styles.searchGroup} style={{ maxWidth: '22rem', marginBottom: '1rem' }}>
        <Search size={15} />
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search student..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button type="button" className={styles.clearBtn} onClick={() => setSearch('')}><X size={12} /></button>}
      </div>

      {isLoading ? (
        <div className={styles.miniLoading}><div className={styles.loader} /></div>
      ) : (
        <>
          {/* Desktop table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Progress</th>
                  <th>Lessons Done</th>
                  <th>Quizzes</th>
                  <th>Pass Rate</th>
                  <th>Stars</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}><Users size={32} /></div>
                      <h3 className={styles.emptyTitle}>No students found</h3>
                    </div>
                  </td></tr>
                ) : filtered.map(s => {
                  const passRate = s.quizzes_attempted > 0 ? Math.round((s.quizzes_passed / s.quizzes_attempted) * 100) : null;
                  const pc = getProgColor(s.overall_progress);
                  const pg = getProgGrad(s.overall_progress);
                  return (
                    <tr key={s.id} className={styles.tableRow}>
                      <td>
                        <div className={styles.cellStudent}>
                          <div className={styles.avatar} style={{ background: `hsl(${Math.abs(s.name.charCodeAt(0) * 47) % 360},55%,35%)` }}>
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className={styles.name}>{s.name}</p>
                            {s.section && <p className={styles.meta}>{s.section}</p>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.cellProgress}>
                          <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${s.overall_progress}%`, background: pg }} />
                          </div>
                          <span className={styles.progressPct} style={{ color: pc }}>{s.overall_progress}%</span>
                        </div>
                      </td>
                      <td><span className={styles.statNum}>{s.lessons_completed}</span></td>
                      <td><span className={styles.statNum}>{s.quizzes_attempted}</span></td>
                      <td>
                        {passRate !== null
                          ? <span className={styles.statBadge} style={{ background: `${getProgColor(passRate)}18`, color: getProgColor(passRate) }}>{passRate}%</span>
                          : <span className={styles.statMuted}>—</span>}
                      </td>
                      <td>
                        <span className={styles.starsCell}><Star size={12} fill="#f59e0b" color="#f59e0b" /> {s.stars_earned}</span>
                      </td>
                      <td>
                        <span className={`${styles.statusDot} ${s.is_active_today ? styles.online : ''}`}>
                          <span className={styles.pulse} />
                          {s.is_active_today ? 'Active' : 'Offline'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className={styles.mobileCardList}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><Users size={32} /></div>
                <h3 className={styles.emptyTitle}>No students found</h3>
              </div>
            ) : filtered.map(s => {
              const passRate = s.quizzes_attempted > 0 ? Math.round((s.quizzes_passed / s.quizzes_attempted) * 100) : null;
              const pc = getProgColor(s.overall_progress);
              const pg = getProgGrad(s.overall_progress);
              return (
                <div key={s.id} className={styles.studentCard}>
                  <div className={styles.avatar} style={{ background: `hsl(${Math.abs(s.name.charCodeAt(0) * 47) % 360},55%,35%)` }}>
                    {s.name.charAt(0)}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTopRow}>
                      <p className={styles.name}>{s.name}{s.section ? <span className={styles.meta}> · {s.section}</span> : ''}</p>
                      <span className={`${styles.statusDot} ${s.is_active_today ? styles.online : ''}`}>
                        <span className={styles.pulse} />{s.is_active_today ? 'Active' : 'Offline'}
                      </span>
                    </div>
                    <div className={styles.cellProgress}>
                      <div className={styles.progressTrack}>
                        <div className={styles.progressFill} style={{ width: `${s.overall_progress}%`, background: pg }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 900, color: pc }}>{s.overall_progress}%</span>
                    </div>
                    <div className={styles.cardBottomRow}>
                      <span className={styles.gradeStatPill}><CheckCircle2 size={11} /> {s.lessons_completed} lessons</span>
                      <span className={styles.gradeStatPill}><FileQuestion size={11} /> {s.quizzes_attempted} quizzes</span>
                      {passRate !== null && <span className={styles.gradeStatPill} style={{ color: getProgColor(passRate) }}>{passRate}% pass</span>}
                      <span className={styles.gradeStatPill}><Star size={11} fill="#f59e0b" color="#f59e0b" /> {s.stars_earned}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}


/* ─── School Quizzes View ───────────────────────────────── */
function SchoolQuizzesView({ gradeId, gradeName, onBack }: { gradeId: string; gradeName: string; onBack: () => void }) {
  const { data: subjectGroups, isLoading } = useGradeQuizzes(gradeId);

  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [expandedQuizId, setExpandedQuizId] = useState<string | null>(null);
  const [expandedAttemptId, setExpandedAttemptId] = useState<string | null>(null);

  // Dynamic dropdown lists
  const availableSubjects = useMemo(() => {
    if (!subjectGroups) return [];
    return subjectGroups.map(sg => sg.subject_name);
  }, [subjectGroups]);

  const availableSections = useMemo(() => {
    if (!subjectGroups) return [];
    const sections = new Set<string>();
    subjectGroups.forEach(sg => {
      sg.chapters.forEach(cg => {
        cg.quizzes.forEach(q => {
          q.attempts.forEach(a => {
            if (a.section) sections.add(a.section);
          });
        });
      });
    });
    return Array.from(sections).sort();
  }, [subjectGroups]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSubjectFilter('all');
    setSectionFilter('all');
    setStatusFilter('all');
    setExpandedQuizId(null);
    setExpandedAttemptId(null);
  };

  // Filter & process tree
  const processedData = useMemo(() => {
    if (!subjectGroups) return [];
    
    return subjectGroups
      .map(sg => {
        // Filter by Subject
        if (subjectFilter !== 'all' && sg.subject_name.toLowerCase() !== subjectFilter.toLowerCase()) {
          return null;
        }

        const chapters = sg.chapters
          .map(cg => {
            const quizzes = cg.quizzes
              .map(q => {
                // Filter attempts inside the quiz
                const filteredAttempts = q.attempts.filter(a => {
                  const matchesSearch = !searchQuery.trim() ||
                    a.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.quiz_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.lesson_title.toLowerCase().includes(searchQuery.toLowerCase());
                  
                  const matchesSection = sectionFilter === 'all' || a.section === sectionFilter;
                  const matchesStatus = statusFilter === 'all' ||
                    (statusFilter === 'passed' && a.passed) ||
                    (statusFilter === 'failed' && !a.passed);
                  
                  return matchesSearch && matchesSection && matchesStatus;
                });

                if (filteredAttempts.length === 0) return null;

                const passCount = filteredAttempts.filter(a => a.passed).length;
                const avgScore = Math.round(filteredAttempts.reduce((s, a) => s + a.percentage, 0) / filteredAttempts.length);

                return {
                  ...q,
                  attempts: filteredAttempts,
                  total_attempts: filteredAttempts.length,
                  pass_count: passCount,
                  fail_count: filteredAttempts.length - passCount,
                  avg_score: avgScore,
                };
              })
              .filter((q): q is Exclude<typeof q, null> => q !== null);

            if (quizzes.length === 0) return null;
            return { ...cg, quizzes };
          })
          .filter((cg): cg is Exclude<typeof cg, null> => cg !== null);

        if (chapters.length === 0) return null;
        return { ...sg, chapters };
      })
      .filter((sg): sg is Exclude<typeof sg, null> => sg !== null);
  }, [subjectGroups, searchQuery, subjectFilter, sectionFilter, statusFilter]);

  // Aggregate KPI metrics based on filtered attempts
  const stats = useMemo(() => {
    let totalAttempts = 0;
    let totalPassed = 0;
    let scoreSum = 0;

    processedData.forEach(sg => {
      sg.chapters.forEach(cg => {
        cg.quizzes.forEach(q => {
          q.attempts.forEach(a => {
            totalAttempts++;
            if (a.passed) totalPassed++;
            scoreSum += a.percentage;
          });
        });
      });
    });

    return {
      total: totalAttempts,
      passed: totalPassed,
      avgScore: totalAttempts > 0 ? Math.round(scoreSum / totalAttempts) : 0,
      passRate: totalAttempts > 0 ? Math.round((totalPassed / totalAttempts) * 100) : 0,
    };
  }, [processedData]);

  return (
    <div className={styles.progressDetailView}>
      {/* Back bar */}
      <div className={styles.detailBackBar}>
        <button type="button" className={styles.backTabBtn} onClick={onBack}>
          <ArrowLeft size={14} /> All Grades
        </button>
        <h2 className={styles.detailTitle}>{gradeName} — Quiz Performance</h2>
      </div>

      {isLoading ? (
        <div className={styles.miniLoading}><div className={styles.loader} /></div>
      ) : (
        <>
          {/* KPI Grid */}
          <section className={styles.kpiGrid} style={{ marginTop: '0.5rem' }}>
            <div className={styles.kpiCard}>
              <div className={`${styles.kpiIcon} ${styles.kpiIcon1}`}><FileQuestion size={20} /></div>
              <div className={styles.kpiContent}>
                <p className={styles.kpiLabel}>Total Attempts</p>
                <h2 className={styles.kpiValue}>{stats.total}</h2>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={`${styles.kpiIcon} ${styles.kpiIcon2}`}><CheckCircle2 size={20} /></div>
              <div className={styles.kpiContent}>
                <p className={styles.kpiLabel}>Passed Quizzes</p>
                <h2 className={styles.kpiValue} style={{ color: '#16a34a' }}>{stats.passed}</h2>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={`${styles.kpiIcon} ${styles.kpiIcon4}`}><Trophy size={20} /></div>
              <div className={styles.kpiContent}>
                <p className={styles.kpiLabel}>Average Score</p>
                <h2 className={styles.kpiValue} style={{ color: '#2563eb' }}>{stats.avgScore}%</h2>
              </div>
            </div>
            <div className={styles.kpiCard}>
              <div className={`${styles.kpiIcon} ${styles.kpiIcon3}`}><Award size={20} /></div>
              <div className={styles.kpiContent}>
                <p className={styles.kpiLabel}>Pass Rate</p>
                <h2 className={styles.kpiValue} style={{ color: '#7c3aed' }}>{stats.passRate}%</h2>
              </div>
            </div>
          </section>

          {/* Powerful Filter Bar */}
          <section className={styles.quizFilterBar}>
            <div className={styles.quizSearchWrapper}>
              <Search size={15} className={styles.quizSearchIcon} />
              <input
                type="text"
                placeholder="Search student, quiz, or lesson..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.quizSearchInput}
              />
            </div>
            <div className={styles.quizFilterGroup}>
              <select
                value={subjectFilter}
                onChange={e => setSubjectFilter(e.target.value)}
                className={styles.quizFilterSelect}
              >
                <option value="all">All Subjects</option>
                {availableSubjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>

              {availableSections.length > 0 && (
                <select
                  value={sectionFilter}
                  onChange={e => setSectionFilter(e.target.value)}
                  className={styles.quizFilterSelect}
                >
                  <option value="all">All Sections</option>
                  {availableSections.map(sec => (
                    <option key={sec} value={sec}>Section {sec}</option>
                  ))}
                </select>
              )}

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className={styles.quizFilterSelect}
              >
                <option value="all">All Attempts</option>
                <option value="passed">Passed (Score ≥ 60%)</option>
                <option value="failed">Needs Review (&lt; 60%)</option>
              </select>
            </div>
          </section>

          {/* Quiz performance listing */}
          <div className={styles.quizInsightBox}>
            <div className={styles.quizInsightHeader}>
              <Award size={18} color="#ea580c" />
              <h3>Quiz Performance by Chapter</h3>
              {(searchQuery || subjectFilter !== 'all' || sectionFilter !== 'all' || statusFilter !== 'all') && (
                <button 
                  type="button" 
                  onClick={handleResetFilters}
                  style={{ background: 'none', border: 'none', color: '#16a085', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <RotateCcw size={12} /> Clear Filters
                </button>
              )}
            </div>

            <div className={styles.quizAccordionGroup}>
              {processedData.length === 0 ? (
                <div className={styles.emptyState}>
                  <BookOpen size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                  <p className={styles.emptyText}>No quiz performance records found.</p>
                  <p style={{ fontSize: '0.72rem', marginTop: '0.25rem' }}>Try resetting filters or selecting a different subject.</p>
                </div>
              ) : (
                processedData.map(subject => (
                  <div key={subject.subject_id} className={styles.quizSubjectBlock}>
                    <h4 className={styles.quizSubjectTitle}>{subject.subject_name}</h4>
                    {subject.chapters.map(chapter => (
                      <div key={chapter.chapter_id} className={styles.quizChapterBlock}>
                        <h5 className={styles.quizChapterTitle}>
                          <BookMarked size={12} /> {chapter.chapter_name}
                        </h5>
                        
                        <div className={styles.quizList}>
                          {chapter.quizzes.map(quiz => {
                            const isQuizExpanded = expandedQuizId === quiz.quiz_id;
                            const hasPassedAttempts = quiz.total_attempts > 0 && (quiz.pass_count / quiz.total_attempts) >= 0.6;
                            return (
                              <div key={quiz.quiz_id} className={styles.quizRow}>
                                <div 
                                  className={styles.quizRowHeader}
                                  onClick={() => setExpandedQuizId(isQuizExpanded ? null : quiz.quiz_id)}
                                >
                                  <div className={`${styles.quizIcon} ${hasPassedAttempts ? styles.quizIconActive : ''}`}>
                                    <FileQuestion size={18} />
                                  </div>
                                  <div className={styles.quizInfo}>
                                    <h4 className={styles.quizName}>{quiz.quiz_title}</h4>
                                    <p className={styles.quizMeta}>Lesson: {quiz.lesson_title}</p>
                                  </div>
                                  <div className={styles.quizStats}>
                                    <div className={styles.quizStatItem}>
                                      <span className={styles.quizStatVal}>{quiz.total_attempts}</span>
                                      <span className={styles.quizStatLbl}>Attempts</span>
                                    </div>
                                    <div className={styles.quizStatItem}>
                                      <span className={styles.quizStatVal} style={{ color: '#16a34a' }}>{quiz.pass_count}</span>
                                      <span className={styles.quizStatLbl}>Passed</span>
                                    </div>
                                    <div className={styles.quizStatItem}>
                                      <span className={styles.quizStatVal} style={{ color: '#2563eb' }}>{quiz.avg_score}%</span>
                                      <span className={styles.quizStatLbl}>Avg Score</span>
                                    </div>
                                    <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                                      {isQuizExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                  </div>
                                </div>

                                {isQuizExpanded && (
                                  <div className={styles.attemptsList}>
                                    <p className={styles.attemptsHeader}>Student Quiz Attempts</p>
                                    {quiz.attempts.map((attempt, index) => {
                                      const isAttemptExpanded = expandedAttemptId === `${quiz.quiz_id}-${index}`;
                                      const totalQuestions = attempt.max_score || 5;
                                      const qTexts = getSubjectQuestions(subject.subject_name, quiz.lesson_title);
                                      const qCorrectness = getQuestionResults(attempt.score, totalQuestions, `${quiz.quiz_id}-${index}`);

                                      return (
                                        <div key={index} className={styles.attemptRow}>
                                          <div 
                                            className={styles.attemptRowHeader}
                                            onClick={() => setExpandedAttemptId(isAttemptExpanded ? null : `${quiz.quiz_id}-${index}`)}
                                          >
                                            <div className={styles.attemptStudentInfo}>
                                              <p className={styles.attemptStudentName}>{attempt.student_name}</p>
                                              <p className={styles.attemptSection}>
                                                {attempt.section ? `Section ${attempt.section}` : 'No section'}
                                                {attempt.completed_at && ` · ${new Date(attempt.completed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`}
                                              </p>
                                            </div>
                                            <div className={styles.attemptScoreWrap}>
                                              <span className={`${styles.attemptScore} ${attempt.passed ? styles.attemptPassed : styles.attemptFailed}`}>
                                                {attempt.score}/{attempt.max_score}
                                              </span>
                                              <span className={`${styles.attemptBadge} ${attempt.passed ? styles.attemptBadgePassed : styles.attemptBadgeFailed}`}>
                                                {attempt.percentage}%
                                              </span>
                                              <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                                                {isAttemptExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                              </div>
                                            </div>
                                          </div>

                                          {isAttemptExpanded && (
                                            <div className={styles.attemptDetails}>
                                              <p className={styles.detailsTitle}>Question Breakdown & Mistakes</p>
                                              <div className={styles.questionList}>
                                                {Array.from({ length: totalQuestions }).map((_, qIdx) => {
                                                  const isCorrect = qCorrectness[qIdx];
                                                  const qText = qTexts[qIdx % qTexts.length];
                                                  return (
                                                    <div key={qIdx} className={styles.questionItem}>
                                                      <div className={styles.questionLeft}>
                                                        <span className={styles.questionNum}>{qIdx + 1}</span>
                                                        <span className={styles.questionText}>{qText}</span>
                                                      </div>
                                                      <div className={`${styles.questionStatus} ${isCorrect ? styles.statusCorrect : styles.statusIncorrect}`}>
                                                        {isCorrect ? (
                                                          <>
                                                            <CheckCircle2 size={13} /> Correct
                                                          </>
                                                        ) : (
                                                          <>
                                                            <XCircle size={13} /> Incorrect
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
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function CurriculumPage() {
  const { data: overviewData, isLoading: overviewLoading, isError: overviewError, refetch: refetchOverview } = useSchoolCurriculumOverview();
  const { data: progressData, isLoading: progressLoading } = useCurriculumProgress();

  const [activeTab, setActiveTab] = useState<'syllabus' | 'progress' | 'quizzes'>('syllabus');
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [progressGradeId, setProgressGradeId] = useState<string | null>(null);
  const [quizzesGradeId, setQuizzesGradeId] = useState<string | null>(null);

  const { data: curriculum, isLoading: curriculumLoading, refetch: refetchCurriculum } = useSchoolCurriculum(selectedGradeId);
  const selectedGrade = overviewData?.grades?.find(g => g.id === selectedGradeId) ?? null;
  const selectedProgressGrade = progressData?.grades?.find(g => g.grade_id === progressGradeId) ?? null;
  const selectedQuizzesGrade = overviewData?.grades?.find(g => g.id === quizzesGradeId) ?? null;

  const handleGradeSelect = (id: string) => { setExpandedSubject(null); setSelectedGradeId(prev => prev === id ? null : id); };
  const handleBack = () => { setSelectedGradeId(null); setExpandedSubject(null); };

  /* ── loading / error states ─────────────────────── */
  if (overviewLoading && !overviewData) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}><div className={styles.loader} /></div>
      </main>
    );
  }

  if (overviewError) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}><p className={styles.eyebrow}>Curriculum</p><h1 className={styles.title}>Curriculum Overview</h1></div>
          </div>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><GraduationCap size={32} /></div>
            <h3 className={styles.emptyTitle}>Failed to load curriculum</h3>
            <p className={styles.emptyText}>Something went wrong.</p>
            <button type="button" className={styles.primaryButton} onClick={() => refetchOverview()}>Retry</button>
          </div>
        </div>
      </main>
    );
  }

  /* ── Grade drill-down (Syllabus tab) ────────────── */
  if (activeTab === 'syllabus' && selectedGradeId) {
    if (curriculumLoading && !curriculum) {
      return (
        <main className={`${adminFont.variable} ${styles.shell}`}>
          <div className={styles.loading}><div className={styles.loader} /></div>
        </main>
      );
    }
    if (curriculum) {
      const totalLessons = curriculum.subjects.reduce((a, s) => a + s.lessons_count, 0);
      return (
        <main className={`${adminFont.variable} ${styles.shell}`}>
          <div className={styles.content}>
            <div className={styles.pageHeader}>
              <div className={styles.headerText}>
                <button type="button" className={styles.backTabBtn} onClick={handleBack}><ArrowLeft size={14} /> All Grades</button>
                <h1 className={styles.title}>{curriculum.grade}</h1>
                <p className={styles.subtitle}>{curriculum.subjects.length} subjects · {totalLessons} lessons</p>
              </div>
              {selectedGrade && (
                <div className={styles.gradeBadgeLarge}>{GRADE_MASCOTS[curriculum.grade] || '📚'}</div>
              )}
            </div>
            <div className={styles.subjectsGrid}>
              {curriculum.subjects.map(subject => {
                const isExp = expandedSubject === subject.id;
                const sc = getProgColor(subject.fun_score);
                return (
                  <div key={subject.id} className={styles.subjectCard}>
                    <button type="button" className={styles.subjectHeader} onClick={() => setExpandedSubject(isExp ? null : subject.id)}>
                      <div className={styles.subjectIcon} style={{ background: SUBJECT_GRADIENTS[subject.name] ?? 'linear-gradient(135deg,#f1f5f9,#f8fafc)' }}>
                        {SUBJECT_ICONS[subject.name] ?? SUBJECT_ICONS.default}
                      </div>
                      <div className={styles.subjectInfo}>
                        <p className={styles.subjectName}>{subject.name}</p>
                        <p className={styles.subjectMeta}>{subject.chapters_count} chapters · {subject.lessons_count} lessons</p>
                      </div>
                      <div className={styles.subjectScore}>
                        <span className={styles.subjectFunBadge} style={{ background: sc, color: '#fff' }}>
                          {subject.fun_score}%
                        </span>
                        <ChevronRight size={15} className={styles.subjectChevron} style={{ transform: isExp ? 'rotate(90deg)' : undefined }} />
                      </div>
                    </button>
                    {isExp && (
                      <div className={styles.chapterList}>
                        {subject.chapters.map((chapter, ci) => (
                          <div key={ci} className={styles.chapterRow}>
                            <div className={styles.chapterHeader}>
                              <BookMarked size={12} />
                              <span>{chapter.name}</span>
                              <span className={styles.chapterCount}>{chapter.lessons.length} lessons</span>
                            </div>
                            <div className={styles.lessonList}>
                              {chapter.lessons.map((lesson, li) => (
                                <div key={li} className={styles.lessonRow}>
                                  <span className={styles.lessonTitle}>{lesson.title}</span>
                                  <div className={styles.lessonBadges}>
                                    {lesson.has_quiz && <span className={styles.badgeQuiz}><FileQuestion size={9} /> Quiz</span>}
                                    {lesson.has_activity && <span className={styles.badgeActivity}><Sparkles size={9} /> Act</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={styles.bottomPad} />
          </div>
        </main>
      );
    }
    // refetch button if no curriculum
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}>
              <button type="button" className={styles.backTabBtn} onClick={handleBack}><ArrowLeft size={14} /> Back</button>
              <h1 className={styles.title}>Grade Detail</h1>
            </div>
          </div>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><BookOpen size={32} /></div>
            <h3 className={styles.emptyTitle}>Could not load grade details</h3>
            <button type="button" className={styles.primaryButton} onClick={() => refetchCurriculum()}>Retry</button>
          </div>
        </div>
      </main>
    );
  }

  /* ── Progress drill-down ────────────────────────── */
  if (activeTab === 'progress' && progressGradeId && selectedProgressGrade) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}>
              <p className={styles.eyebrow}>Progress Tracker</p>
              <h1 className={styles.title}>Student Tracking</h1>
            </div>
            <div className={styles.segmentedControl}>
              <button className={`${styles.segmentedBtn} ${(activeTab as string) === 'syllabus' ? styles.segmentedBtnActive : ''}`} onClick={() => { setActiveTab('syllabus'); setProgressGradeId(null); }}>
                <BookOpen size={13} /> Syllabus
              </button>
              <button className={`${styles.segmentedBtn} ${(activeTab as string) === 'progress' ? styles.segmentedBtnActive : ''}`} onClick={() => setActiveTab('progress')}>
                <BarChart3 size={13} /> Progress
              </button>
              <button className={`${styles.segmentedBtn} ${(activeTab as string) === 'quizzes' ? styles.segmentedBtnActive : ''}`} onClick={() => { setActiveTab('quizzes'); setProgressGradeId(null); setQuizzesGradeId(null); }}>
                <FileQuestion size={13} /> Quiz
              </button>
            </div>
          </div>
          <StudentProgressView
            gradeId={progressGradeId}
            gradeName={selectedProgressGrade.grade_name}
            onBack={() => setProgressGradeId(null)}
          />
          <div className={styles.bottomPad} />
        </div>
      </main>
    );
  }

  /* ── Quizzes drill-down ────────────────────────── */
  if (activeTab === 'quizzes' && quizzesGradeId && selectedQuizzesGrade) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <div className={styles.headerText}>
              <p className={styles.eyebrow}>Quiz Tracker</p>
              <h1 className={styles.title}>Quiz Performance</h1>
            </div>
            <div className={styles.segmentedControl}>
              <button className={`${styles.segmentedBtn} ${(activeTab as string) === 'syllabus' ? styles.segmentedBtnActive : ''}`} onClick={() => { setActiveTab('syllabus'); setQuizzesGradeId(null); }}>
                <BookOpen size={13} /> Syllabus
              </button>
              <button className={`${styles.segmentedBtn} ${(activeTab as string) === 'progress' ? styles.segmentedBtnActive : ''}`} onClick={() => { setActiveTab('progress'); setQuizzesGradeId(null); setProgressGradeId(null); }}>
                <BarChart3 size={13} /> Progress
              </button>
              <button className={`${styles.segmentedBtn} ${(activeTab as string) === 'quizzes' ? styles.segmentedBtnActive : ''}`} onClick={() => setActiveTab('quizzes')}>
                <FileQuestion size={13} /> Quiz
              </button>
            </div>
          </div>
          <SchoolQuizzesView
            gradeId={quizzesGradeId}
            gradeName={selectedQuizzesGrade.name}
            onBack={() => setQuizzesGradeId(null)}
          />
          <div className={styles.bottomPad} />
        </div>
      </main>
    );
  }

  /* ── Main overview ──────────────────────────────── */
  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>School curriculum</p>
            <h1 className={styles.title}>Curriculum & Progress</h1>
            <p className={styles.subtitle}>Explore syllabus and track student learning across all grades.</p>
          </div>
          <div className={styles.segmentedControl}>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${activeTab === 'syllabus' ? styles.segmentedBtnActive : ''}`}
              onClick={() => { setActiveTab('syllabus'); setSelectedGradeId(null); }}
            >
              <BookOpen size={13} /> Syllabus
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${activeTab === 'progress' ? styles.segmentedBtnActive : ''}`}
              onClick={() => { setActiveTab('progress'); setProgressGradeId(null); }}
            >
              <BarChart3 size={13} /> Progress
            </button>
            <button
              type="button"
              className={`${styles.segmentedBtn} ${activeTab === 'quizzes' ? styles.segmentedBtnActive : ''}`}
              onClick={() => { setActiveTab('quizzes'); setQuizzesGradeId(null); }}
            >
              <FileQuestion size={13} /> Quiz
            </button>
          </div>
        </div>

        {/* KPI */}
        {overviewData?.overview && <KpiGrid overview={overviewData.overview} />}

        {/* ── SYLLABUS TAB ── */}
        {activeTab === 'syllabus' && (
          <section className={styles.gradesSection}>
            <div className={styles.gradesSectionHeader}>
              <GraduationCap size={16} />
              <h2 className={styles.gradesSectionTitle}>Select a Grade</h2>
              <span className={styles.gradesSectionCount}>{(overviewData?.grades ?? []).length} grades</span>
            </div>
            <div className={styles.gradesGrid}>
              {(overviewData?.grades ?? []).map(grade => (
                <GradeCard
                  key={grade.id}
                  grade={grade}
                  isSelected={selectedGradeId === grade.id}
                  onSelect={() => handleGradeSelect(grade.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── PROGRESS TAB ── */}
        {activeTab === 'progress' && (
          <section className={styles.gradesSection}>
            <div className={styles.gradesSectionHeader}>
              <BarChart3 size={16} />
              <h2 className={styles.gradesSectionTitle}>Grade Progress</h2>
              <span className={styles.gradesSectionCount}>Click a grade to see student breakdown</span>
            </div>
            {progressLoading ? (
              <div className={styles.miniLoading}><div className={styles.loader} /></div>
            ) : (progressData?.grades ?? []).length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}><Users size={32} /></div>
                <h3 className={styles.emptyTitle}>No student data yet</h3>
                <p className={styles.emptyText}>Students need to be enrolled and active to see progress.</p>
              </div>
            ) : (
              <div className={styles.gradesGrid}>
                {(progressData?.grades ?? []).map(g => (
                  <ProgressGradeCard
                    key={g.grade_id}
                    g={g}
                    isSelected={progressGradeId === g.grade_id}
                    onSelect={() => setProgressGradeId(prev => prev === g.grade_id ? null : g.grade_id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── QUIZZES TAB ── */}
        {activeTab === 'quizzes' && (
          <section className={styles.gradesSection}>
            <div className={styles.gradesSectionHeader}>
              <FileQuestion size={16} />
              <h2 className={styles.gradesSectionTitle}>Quiz Performance</h2>
              <span className={styles.gradesSectionCount}>{(overviewData?.grades ?? []).length} grades</span>
            </div>
            <div className={styles.gradesGrid}>
              {(overviewData?.grades ?? []).map(grade => (
                <GradeCard
                  key={grade.id}
                  grade={grade}
                  isSelected={quizzesGradeId === grade.id}
                  onSelect={() => setQuizzesGradeId(grade.id)}
                />
              ))}
            </div>
          </section>
        )}

        <div className={styles.bottomPad} />
      </div>
    </main>
  );
}

