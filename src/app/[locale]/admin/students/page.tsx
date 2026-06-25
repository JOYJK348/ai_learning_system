'use client';

import { useState, useMemo, useEffect } from 'react';
import { Manrope } from 'next/font/google';
import Link from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  GraduationCap,
  Star,
  Search,
  Users,
  Activity,
  TrendingUp,
  Eye,
  AlertTriangle,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  User,
  Shield,
  Building2,
  ArrowLeft,
  Download
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { adminKeys } from '@/core/constants/queryKeys';
import { adminApi } from '@/core/services/adminApi';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({ subsets: ['latin'], variable: '--admin-font', display: 'swap' });

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

type Kid = {
  id: string;
  name: string;
  email?: string;
  grade_name?: string;
  photo_url?: string;
  overall_progress: number;
  total_stars: number;
  badges_count: number;
  current_streak_days: number;
  last_active?: string;
  created_at: string;
  section?: string | null;
  parent_name?: string;
  parent_id?: string | null;
  school_name?: string;
};

export default function StudentsPage() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  // Fetch Students
  const { data: studentsRes, isLoading, isError, error } = useQuery({
    queryKey: adminKeys.students,
    queryFn: async () => {
      const data = await adminApi.students();
      if (!data) return [];
      const raw = (data as any)?.data ?? data ?? [];
      return Array.isArray(raw) ? raw : [];
    },
    staleTime: 60_000,
    enabled: !!user,
  });

  // Fetch All Schools dynamically to populate the dropdown
  const { data: schoolsRes } = useQuery({
    queryKey: ['admin', 'schools', 'list'],
    queryFn: async () => {
      const data = await adminApi.schools();
      if (!data) return [];
      const raw = (data as any)?.data ?? data ?? [];
      return Array.isArray(raw) ? raw : [];
    },
    staleTime: 60_000,
    enabled: !!user,
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const students: Kid[] = studentsRes ?? [];
  const schoolsList = useMemo(() => Array.isArray(schoolsRes) ? schoolsRes : [], [schoolsRes]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'stars' | 'last_active'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailStudent, setDetailStudent] = useState<Kid | null>(null);
  
  // Power Filters State
  const [gradeFilter, setGradeFilter] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [progressFilter, setProgressFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [regTypeFilter, setRegTypeFilter] = useState('');

  const gradeOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach(s => { if (s.grade_name) set.add(s.grade_name); });
    return Array.from(set).sort();
  }, [students]);

  const filtered = useMemo(() => {
    let list = [...students];
    if (gradeFilter) list = list.filter(s => s.grade_name === gradeFilter);
    if (schoolFilter) list = list.filter(s => s.school_name === schoolFilter);
    
    if (regTypeFilter) {
      if (regTypeFilter === 'school') list = list.filter(s => !!s.school_name);
      else if (regTypeFilter === 'individual') list = list.filter(s => !s.school_name);
    }

    if (progressFilter) {
      if (progressFilter === 'low') list = list.filter(s => s.overall_progress < 40);
      else if (progressFilter === 'mid') list = list.filter(s => s.overall_progress >= 40 && s.overall_progress < 70);
      else if (progressFilter === 'high') list = list.filter(s => s.overall_progress >= 70);
    }
    
    if (statusFilter) {
      list = list.filter(s => {
        const isOnline = s.last_active
          ? Date.now() - new Date(s.last_active).getTime() < 30 * 60 * 1000
          : false;
        return statusFilter === 'online' ? isOnline : !isOnline;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => (s.name ?? '').toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = (a.name ?? '').localeCompare(b.name ?? '');
      else if (sortBy === 'progress') cmp = a.overall_progress - b.overall_progress;
      else if (sortBy === 'stars') cmp = a.total_stars - b.total_stars;
      else if (sortBy === 'last_active') {
        const aT = a.last_active ? new Date(a.last_active).getTime() : 0;
        const bT = b.last_active ? new Date(b.last_active).getTime() : 0;
        cmp = aT - bT;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [students, searchQuery, sortBy, sortDir, gradeFilter, schoolFilter, progressFilter, statusFilter, regTypeFilter]);

  const stats = useMemo(() => {
    const pool = students;
    const activeToday = pool.filter(
      (s) => s.last_active && Date.now() - new Date(s.last_active).getTime() < 24 * 60 * 60 * 1000,
    ).length;
    const avgProgress = pool.length
      ? Math.round(pool.reduce((s, k) => s + k.overall_progress, 0) / pool.length)
      : 0;
    const avgStars = pool.length
      ? Math.round(pool.reduce((s, k) => s + (k.total_stars || 0), 0) / pool.length)
      : 0;

    // Count school vs individual
    const schoolCount = pool.filter(s => !!s.school_name).length;
    const individualCount = pool.length - schoolCount;

    return { total: pool.length, activeToday, avgProgress, avgStars, schoolCount, individualCount };
  }, [students]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((s) => s.id)));
    }
  };

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

  const resetFilters = () => {
    setGradeFilter('');
    setSchoolFilter('');
    setProgressFilter('');
    setStatusFilter('');
    setRegTypeFilter('');
    setSearchQuery('');
  };

  const selectedCount = selectedIds.size;
  const filtersActive = gradeFilter || schoolFilter || progressFilter || statusFilter || regTypeFilter || searchQuery;

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Grade', 'School Name', 'Progress (%)', 'Stars', 'Badges', 'Streak (days)', 'Status', 'Joined Date'];
    const rows = filtered.map(s => {
      const isOnline = s.last_active
        ? Date.now() - new Date(s.last_active).getTime() < 30 * 60 * 1000
        : false;
      return [
        `"${(s.name || '').replace(/"/g, '""')}"`,
        `"${(s.email || '').replace(/"/g, '""')}"`,
        `"${(s.grade_name || '').replace(/"/g, '""')}"`,
        `"${(s.school_name || 'Individual').replace(/"/g, '""')}"`,
        s.overall_progress,
        s.total_stars,
        s.badges_count,
        s.current_streak_days,
        isOnline ? 'Online' : 'Offline',
        s.created_at ? new Date(s.created_at).toISOString().split('T')[0] : 'N/A'
      ];
    });
    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!hydrated || !user) return null;

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <a href={`/${locale}/admin`} className={styles.backLink}>
            <ArrowLeft size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> Back to dashboard
          </a>
          <p className={styles.eyebrow} style={{ marginTop: '0.75rem' }}>Student directory</p>
          <h1 className={styles.title}>Student management</h1>
          <p className={styles.subtitle}>
            Monitor all students across your platform. Track progress, stars, and activity metrics.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.primaryButton} onClick={exportCSV}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <section className={`${styles.kpiGrid} ${styles.kpiGridStudents}`}>
          <article className={styles.kpiCard}>
            <div className={styles.kpiIcon}><Users size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Total Students</p>
              <h2>{stats.total}</h2>
              <span className={styles.kpiMeta}>
                {stats.schoolCount} school • {stats.individualCount} individual
              </span>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiGreen}`}><Activity size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Active Today</p>
              <h2>{stats.activeToday}</h2>
              <span className={styles.kpiMeta}>Active in last 24h</span>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiPurple}`}><TrendingUp size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Avg Progress</p>
              <h2>{stats.avgProgress}%</h2>
              <span className={styles.kpiMeta}>Platform average</span>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiGold}`}><Star size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Avg Stars</p>
              <h2>{stats.avgStars}</h2>
              <span className={styles.kpiMeta}>Earned per student</span>
            </div>
          </article>
        </section>
      )}

      {/* Power Filters */}
      <section className={styles.filterSection}>
        <div className={styles.filterRow}>
          {/* Search */}
          <div className={styles.searchGroup}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* School/Individual Segment */}
          <div className={styles.filterGroup}>
            <User size={16} />
            <select 
              value={regTypeFilter} 
              onChange={(e) => {
                const val = e.target.value;
                setRegTypeFilter(val);
                if (val === 'individual') {
                  setSchoolFilter('');
                }
              }}
            >
              <option value="">All Account Types</option>
              <option value="school">🏫 School Linked</option>
              <option value="individual">👤 Individual B2C</option>
            </select>
          </div>

          {/* School Name Dropdown (only shown if not filtered to Individual) */}
          {regTypeFilter !== 'individual' && (
            <div className={styles.filterGroup}>
              <Building2 size={16} />
              <select 
                value={schoolFilter} 
                onChange={(e) => setSchoolFilter(e.target.value)}
              >
                <option value="">All Schools</option>
                {schoolsList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          )}

          {/* Grade Dropdown */}
          <div className={styles.filterGroup}>
            <Filter size={16} />
            <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
              <option value="">All Grades</option>
              {gradeOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Performance/Progress Dropdown */}
          <div className={styles.filterGroup}>
            <TrendingUp size={16} />
            <select value={progressFilter} onChange={(e) => setProgressFilter(e.target.value)}>
              <option value="">All Progress Levels</option>
              <option value="high">Excellent (≥ 70%)</option>
              <option value="mid">Average (40% - 69%)</option>
              <option value="low">Needs Attention (&lt; 40%)</option>
            </select>
          </div>

          {/* Online/Offline Status Dropdown */}
          <div className={styles.filterGroup}>
            <Shield size={16} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="online">Online Now</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* Sort Menu */}
          <div className={styles.sortGroup}>
            <span>Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="name">Name</option>
              <option value="progress">Progress</option>
              <option value="stars">Stars</option>
              <option value="last_active">Active Status</option>
            </select>
            <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>
              {sortDir === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Action bar for active selection or filters */}
        {(selectedCount > 0 || filtersActive) && (
          <div className={styles.bulkBar}>
            {selectedCount > 0 && <span>{selectedCount} selected</span>}
            {selectedCount > 0 && (
              <button onClick={() => setSelectedIds(new Set())}><X size={14} /> Clear Selection</button>
            )}
            {filtersActive && (
              <button onClick={resetFilters} className={styles.secondaryButton} style={{ marginLeft: selectedCount > 0 ? '0' : 'auto', color: '#be123c', borderColor: 'rgba(244, 63, 94, 0.15)', background: 'rgba(244, 63, 94, 0.05)' }}>
                <RefreshCwIcon /> Reset Filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* Table */}
      {isError ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}><AlertTriangle size={40} /></div>
          <h3 className={styles.emptyTitle}>Failed to load students</h3>
          <p className={styles.emptyText}>{(error as any)?.message || 'Check console for details'}</p>
        </div>
      ) : isLoading ? (
        <div className={styles.emptyState}>
          <div className={styles.loader} />
          <p className={styles.emptyText}>Loading students...</p>
        </div>
      ) : (
        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <div className={styles.tableTitle}>
              <h2>All Students</h2>
              <span>{filtered.length} students</span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkboxCol}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.size === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Student</th>
                  <th>Progress</th>
                  <th>Stars</th>
                  <th>Status</th>
                  <th className={styles.actionsCol}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((s) => {
                    const isOnline = s.last_active
                      ? Date.now() - new Date(s.last_active).getTime() < 30 * 60 * 1000
                      : false;
                    const pc = getProgressColor(s.overall_progress);
                    const pg = getProgressGradient(s.overall_progress);
                    const isSelected = selectedIds.has(s.id);

                    return (
                      <tr 
                        key={s.id}
                        className={`${styles.tableRow} ${isSelected ? styles.expanded : ''}`}
                      >
                        <td className={styles.checkboxCol}>
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleSelect(s.id)}
                          />
                        </td>
                        <td>
                          <div className={styles.cellStudent}>
                            <div className={styles.avatar} style={{ background: getAvatarGradient(s.name ?? '') }}>
                              {(s.name ?? '?').charAt(0)}
                            </div>
                            <div className={styles.nameGroup}>
                              <span className={styles.schoolName}>{s.name}</span>
                              <span className={styles.schoolMeta}>
                                <span className={styles.gradePill}>{s.grade_name || 'No Grade'}</span>
                                {s.school_name ? (
                                  <span className={styles.gradePill} style={{ background: 'rgba(18, 49, 47, 0.06)', color: '#12312f', marginLeft: '0.25rem' }}>
                                    🏫 {s.school_name}
                                  </span>
                                ) : (
                                  <span className={styles.gradePill} style={{ background: 'rgba(100, 116, 139, 0.08)', color: '#475569', marginLeft: '0.25rem' }}>
                                    👤 Individual
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.cellProgress}>
                            <div className={styles.progressTrack} style={{ width: '6rem' }}>
                              <div className={styles.progressFill} style={{ width: `${s.overall_progress}%`, background: pg }} />
                            </div>
                            <span className={styles.progressPct} style={{ color: pc }}>{s.overall_progress}%</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.cellStars}>
                            <Star size={13} fill="#f59e0b" color="#f59e0b" />
                            <span className={styles.starsVal}>{s.total_stars}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.cellStatus}>
                            <span className={`${styles.statusDot} ${isOnline ? styles.online : ''}`}>
                              <span className={styles.pulse} />
                              {isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </td>
                        <td className={styles.actionsCol}>
                          <div className={styles.actionMenu}>
                            <button type="button" className={styles.iconButton} aria-label="View details" onClick={() => setDetailStudent(s)}>
                              <Eye size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}><GraduationCap size={40} /></div>
                        <h3 className={styles.emptyTitle}>No students found</h3>
                        <p className={styles.emptyText}>
                          Try adjusting or resetting your filter configurations.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Drawer */}
      {detailStudent && (
        <div className={styles.drawerOverlay} onClick={() => setDetailStudent(null)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitle}>
                <div className={styles.drawerLogo} style={{background: getAvatarGradient(detailStudent.name)}}>
                  {detailStudent.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h2>{detailStudent.name}</h2>
                  <span className={styles.planBadge} style={{background:'rgba(99,102,241,0.1)',color:'#4f46e5'}}>{detailStudent.grade_name || 'No Grade'}</span>
                </div>
              </div>
              <button className={styles.closeButton} onClick={() => setDetailStudent(null)}><X size={20} /></button>
            </div>
            <div className={styles.drawerBody}>
              <section className={styles.drawerSection}>
                <h3><User size={16} /> Student Details</h3>
                <div className={styles.drawerGrid}>
                  <div><label>Email</label><p>{detailStudent.email || 'No email'}</p></div>
                  <div><label>Grade</label><p>{detailStudent.grade_name || 'No Grade'}</p></div>
                  <div>
                    <label>Account Type</label>
                    <p>{detailStudent.school_name ? `🏫 School (${detailStudent.school_name})` : '👤 Individual B2C'}</p>
                  </div>
                  <div><label>Parent</label><p>{detailStudent.parent_name || 'Not linked'}</p></div>
                  <div><label>Joined</label><p>{new Date(detailStudent.created_at).toLocaleDateString('en-IN')}</p></div>
                  <div><label>Last Active</label><p>{detailStudent.last_active ? new Date(detailStudent.last_active).toLocaleDateString('en-IN') : 'Never'}</p></div>
                </div>
              </section>

              <section className={styles.drawerSection}>
                <h3><TrendingUp size={16} /> Performance</h3>
                <div className={styles.revenueCards}>
                  <div className={styles.revenueCard}>
                    <span>Progress</span>
                    <strong>{detailStudent.overall_progress}%</strong>
                    <div className={styles.timelineBar} style={{marginTop:'0.35rem'}}>
                      <div className={styles.timelineProgress} style={{width: detailStudent.overall_progress + '%', background: detailStudent.overall_progress >= 70 ? '#22c55e' : detailStudent.overall_progress >= 40 ? '#f59e0b' : '#ef4444'}} />
                    </div>
                  </div>
                  <div className={styles.revenueCard}>
                    <span>Stars</span>
                    <strong>{detailStudent.total_stars}</strong>
                  </div>
                  <div className={styles.revenueCard}>
                    <span>Badges</span>
                    <strong>{detailStudent.badges_count}</strong>
                  </div>
                  <div className={styles.revenueCard}>
                    <span>Streak</span>
                    <strong>{detailStudent.current_streak_days}d</strong>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Inline Icon to avoid import breaks
function RefreshCwIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M16 3h5v5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 21H3v-5" />
    </svg>
  );
}
