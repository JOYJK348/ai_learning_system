'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Manrope } from 'next/font/google';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Building2,
  Star,
  BookOpen,
  Zap,
  AlertTriangle,
  Trophy,
  BarChart3,
  Activity,
  ShieldCheck,
  Clock,
  CircleDollarSign,
  Library,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSchoolStudents, useSchoolDashboard } from '@/hooks/useSchoolStudents';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

type Kid = {
  id: string;
  student_id: string;
  full_name: string | null;
  grade_id: string | null;
  grade_name: string | null;
  section: string | null;
  roll_number: string | null;
  total_stars_earned: number;
  overall_progress: number;
  last_activity_at: string | null;
};

const AVATAR_GRADIENTS = [
  ['#12312f', '#1a4a47'],
  ['#1e293b', '#334155'],
  ['#3b1f4e', '#5b2d75'],
  ['#1e3a5f', '#2d5a8e'],
  ['#5c1f1f', '#8e2d2d'],
  ['#1f4e3a', '#2d755a'],
];

function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

function getAvatarGradient(name: string) {
  const g = AVATAR_GRADIENTS[hashName(name) % AVATAR_GRADIENTS.length];
  return `linear-gradient(135deg, ${g[0]}, ${g[1]})`;
}

export default function SchoolAdminPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { data: studentsRes, isLoading } = useSchoolStudents();
  const { data: dashboardRes } = useSchoolDashboard();

  const students: Kid[] = studentsRes?.data ?? [];
  const dashboard = dashboardRes?.data ?? {};

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

  const grades = useMemo(() => {
    // Prefer server-computed total_grades from dashboard (authoritative)
    return dashboard?.my_school?.total_grades ?? (
      (() => {
        const set = new Set<string>();
        students.forEach((s) => { if (s.grade_id) set.add(s.grade_id); });
        return set.size;
      })()
    );
  }, [students, dashboard]);

  const activeToday = useMemo(
    () => students.filter((s) => s.last_activity_at && Date.now() - new Date(s.last_activity_at).getTime() < 24 * 60 * 60 * 1000).length,
    [students],
  );

  const totalStars = useMemo(() => students.reduce((sum, s) => sum + (s.total_stars_earned || 0), 0), [students]);

  const needsAttention = useMemo(() => {
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;
    return students
      .filter((s) => s.overall_progress < 30 || (s.last_activity_at && now - new Date(s.last_activity_at).getTime() > week))
      .sort((a, b) => a.overall_progress - b.overall_progress)
      .slice(0, 5);
  }, [students]);

  const topPerformers = useMemo(() => {
    return [...students].sort((a, b) => b.total_stars_earned - a.total_stars_earned).slice(0, 5);
  }, [students]);

  const classPulse = useMemo(() => {
    // grade_names from dashboard: { grade_id -> grade_name }
    const gradeNames: Record<string, string> = dashboard?.grade_names ?? {};
    const map = new Map<string, { total: number; count: number }>();
    students.forEach((s) => {
      // Use grade_name from API response first, then dashboard grade_names map, then grade_id short
      const key = s.grade_name || (s.grade_id ? (gradeNames[s.grade_id] || `Grade ${s.grade_id.slice(0, 6)}`) : null);
      if (!key) return;
      const cur = map.get(key) ?? { total: 0, count: 0 };
      cur.total += s.overall_progress;
      cur.count += 1;
      map.set(key, cur);
    });
    return Array.from(map.entries())
      .map(([name, v]) => ({ name, avg: Math.round(v.total / v.count), count: v.count }))
      .sort((a, b) => b.avg - a.avg);
  }, [students, dashboard]);

  const getProgressColor = (val: number) => {
    if (val >= 70) return '#22c55e';
    if (val >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getProgressGradient = (val: number) => {
    if (val >= 70) return 'linear-gradient(90deg, #22c55e, #16a34a)';
    if (val >= 40) return 'linear-gradient(90deg, #f59e0b, #d97706)';
    return 'linear-gradient(90deg, #ef4444, #dc2626)';
  };

  const kpiValues = [
    {
      label: 'Students',
      value: dashboard?.my_school?.total_students ?? students.length,
      icon: GraduationCap,
      change: `${students.length} enrolled`,
    },
    {
      label: 'Active Today',
      value: activeToday,
      icon: Activity,
      change: `${students.length ? Math.round((activeToday / students.length) * 100) : 0}% active`,
    },
    {
      label: 'Stars Given',
      value: totalStars,
      icon: Star,
      change: `${students.length ? Math.round(totalStars / students.length) : 0} avg/student`,
    },
    {
      label: 'Classes',
      value: grades,
      icon: Building2,
      change: 'Unique grades',
    },
  ];

  if (isLoading && !studentsRes) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}>
          <div className={styles.loader} />
          <p style={{ fontSize: '0.82rem', fontWeight: 800, color: '#94a3b8', margin: 0 }}>Loading school dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>

        {/* ── Header ── */}
        <header className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{greeting}, {user?.name || 'School Admin'}</h1>
            <div className={styles.headerMeta}>
              <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <Clock size={11} />
                {currentDate}
              </span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span className={styles.liveDot} />
                Live
              </span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 850, color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={12} />
                {dashboard?.my_school?.name || 'School Admin'}
              </span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <Link href={`/${locale}/school-admin/students`} className={styles.addBtn}>
              <GraduationCap size={16} />
              <span>Students Roster</span>
            </Link>
          </div>
        </header>

        {/* ── KPI Cards ── */}
        <section className={styles.kpiGrid}>
          {kpiValues.map((k, i) => (
            <motion.div
              key={k.label}
              className={styles.kpiCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <div className={styles.kpiTop}>
                <div className={styles.kpiIcon}>
                  <k.icon size={17} />
                </div>
                <span className={styles.kpiChange}>{k.change}</span>
              </div>
              <p className={styles.kpiLabel}>{k.label}</p>
              <h2 className={styles.kpiValue}>
                {typeof k.value === 'number' ? k.value.toLocaleString('en-IN') : k.value}
              </h2>
            </motion.div>
          ))}
        </section>

        {/* ── Dashboard Grid ── */}
        <div className={styles.dashboardGrid}>

          {/* LEFT STACK */}
          <div className={styles.leftStack}>

            {/* Quick Actions Hub */}
            <section className={styles.insightBox}>
              <div className={styles.insightHeader}>
                <Zap size={17} color="#12312f" />
                <h3>Quick Actions Hub</h3>
                <span className={styles.insightCount}>Command Center</span>
              </div>
              <div className={styles.quickActionsGrid}>
                <Link href={`/${locale}/school-admin/students`} className={styles.actionCard}>
                  <div className={`${styles.actionIcon} ${styles.iconTeal}`}>
                    <GraduationCap size={20} />
                  </div>
                  <div className={styles.actionContent}>
                    <h4>Students Directory</h4>
                    <p>Manage students, roll numbers, and bulk student imports.</p>
                  </div>
                </Link>

                <Link href={`/${locale}/school-admin/curriculum`} className={styles.actionCard}>
                  <div className={`${styles.actionIcon} ${styles.iconBlue}`}>
                    <Library size={20} />
                  </div>
                  <div className={styles.actionContent}>
                    <h4>Curriculum & Quizzes</h4>
                    <p>Track quiz performance and syllabus completions by class.</p>
                  </div>
                </Link>

                <Link href={`/${locale}/school-admin/parents`} className={styles.actionCard}>
                  <div className={`${styles.actionIcon} ${styles.iconGold}`}>
                    <Users size={20} />
                  </div>
                  <div className={styles.actionContent}>
                    <h4>Parents Directory</h4>
                    <p>Review parent profiles and link children details.</p>
                  </div>
                </Link>

                <Link href={`/${locale}/school-admin/payments`} className={styles.actionCard}>
                  <div className={`${styles.actionIcon} ${styles.iconPink}`}>
                    <CircleDollarSign size={20} />
                  </div>
                  <div className={styles.actionContent}>
                    <h4>Plan & Billing</h4>
                    <p>View current school subscription details and pricing plans.</p>
                  </div>
                </Link>
              </div>
            </section>

            {/* Class Pulse */}
            {classPulse.length > 0 && (
              <section className={styles.insightBox}>
                <div className={styles.insightHeader}>
                  <BarChart3 size={17} color="#2563eb" />
                  <h3>Class Pulse</h3>
                  <span className={styles.insightCount}>Avg progress by grade</span>
                </div>
                <div className={styles.pulseList}>
                  {classPulse.map((cls) => {
                    const color = getProgressColor(cls.avg);
                    const gradient = getProgressGradient(cls.avg);
                    return (
                      <div key={cls.name} className={styles.pulseRow}>
                        <span className={styles.pulseLabel}>{cls.name}</span>
                        <span className={styles.pulseCount}>{cls.count} students</span>
                        <div className={styles.pulseBar}>
                          <div className={styles.pulseFill} style={{ width: `${cls.avg}%`, background: gradient }} />
                        </div>
                        <span className={styles.pulsePerc} style={{ color }}>{cls.avg}%</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT STACK */}
          <div className={styles.rightStack}>

            {/* Needs Attention */}
            {needsAttention.length > 0 && (
              <section className={styles.insightBox}>
                <div className={styles.insightHeader}>
                  <AlertTriangle size={17} color="#ea580c" />
                  <h3>Needs Attention</h3>
                  <span className={styles.insightCount}>{needsAttention.length} students</span>
                </div>
                <div className={styles.insightGrid}>
                  {needsAttention.map((s) => {
                    const inactive = s.last_activity_at
                      ? Date.now() - new Date(s.last_activity_at).getTime() > 7 * 24 * 60 * 60 * 1000
                      : true;
                    return (
                      <div key={s.id} className={styles.insightCard}>
                        <div className={styles.insightCardTop}>
                          <div className={styles.avatarSmall} style={{ background: getAvatarGradient(s.full_name ?? '') }}>
                            {(s.full_name ?? '?').charAt(0)}
                          </div>
                          <div>
                            <p className={styles.insightName}>{s.full_name}</p>
                            <p className={styles.insightMeta}>{s.grade_name} · {s.section}</p>
                          </div>
                        </div>
                        <div className={styles.insightTags}>
                          {s.overall_progress < 30 && <span className={styles.tagDanger}>Progress {s.overall_progress}%</span>}
                          {inactive && <span className={styles.tagWarning}>Inactive 7d+</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Top Performers */}
            {topPerformers.length > 0 && (
              <section className={styles.insightBox}>
                <div className={styles.insightHeader}>
                  <Trophy size={17} color="#f59e0b" />
                  <h3>Top Performers</h3>
                  <span className={styles.insightCount}>This week</span>
                </div>
                <div className={styles.insightGrid}>
                  {topPerformers.map((s, i) => (
                    <div key={s.id} className={styles.insightCard}>
                      <div className={styles.insightCardTop}>
                        <span className={styles.rank}>#{i + 1}</span>
                        <div className={styles.avatarSmall} style={{ background: getAvatarGradient(s.full_name ?? '') }}>
                          {(s.full_name ?? '?').charAt(0)}
                        </div>
                        <div>
                          <p className={styles.insightName}>{s.full_name}</p>
                          <p className={styles.insightMeta}>{s.grade_name} · {s.section}</p>
                        </div>
                      </div>
                      <div className={styles.insightStars}>
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{s.total_stars_earned}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className={styles.bottomPad} />
      </div>
    </main>
  );
}
