'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Manrope } from 'next/font/google';
import {
  GraduationCap,
  Star,
  Search,
  Plus,
  Users,
  Activity,
  TrendingUp,
  Clock,
  ChevronDown,
  Eye,
  Download,
  Upload,
  Trash2,
  CheckSquare,
  Square,
  AlertTriangle,
  ArrowLeft,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { useSchoolStudents, useBulkDeleteStudents } from '@/hooks/useSchoolStudents';
import { useAuth } from '@/context/AuthContext';
import StudentDetailModal from '../_components/StudentDetailModal';
import AddStudentModal from '../_components/AddStudentModal';
import BulkUploadModal from '../_components/BulkUploadModal';
import type { StudentDetail } from '../_components/StudentDetailModal';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

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
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getAvatarGradient(name: string) {
  const g = AVATAR_GRADIENTS[hashName(name) % AVATAR_GRADIENTS.length];
  return `linear-gradient(135deg, ${g[0]}, ${g[1]})`;
}

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

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};

const ROW_ITEM = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function StudentsPage() {
  const { user } = useAuth();
  const { data: studentsRes, isLoading } = useSchoolStudents();
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [detailStudent, setDetailStudent] = useState<StudentDetail | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'stars' | 'last_active'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const bulkDelete = useBulkDeleteStudents();
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'logs'>('list');
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [selectedLogRun, setSelectedLogRun] = useState<any | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [logSearch, setLogSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && user?.schoolId) {
      const key = `zhi_bulk_upload_history_${user.schoolId}`;
      const raw = localStorage.getItem(key);
      setHistoryLogs(raw ? JSON.parse(raw) : []);
    }
  }, [activeView, showBulkModal, user]);

  interface LogTableRow {
    rowNum: number;
    studentName: string;
    grade: string;
    parentEmail?: string;
    status: 'Success' | 'Linked' | 'Failed';
    credentials?: {
      email: string;
      pass: string;
    };
    errorMsg?: string;
  }

  const getLogTableRows = (run: any): LogTableRow[] => {
    if (!run || !run.students) return [];
    return run.students.map((student: any, idx: number) => {
      const rowNum = idx + 2;
      const errorMsg = run.errors?.find((e: string) => e.startsWith(`Row ${rowNum}:`)) || null;
      
      if (errorMsg) {
        return {
          rowNum,
          studentName: student.full_name || 'N/A',
          grade: student.grade_name || 'N/A',
          parentEmail: student.parent_email || 'N/A',
          status: 'Failed',
          errorMsg: errorMsg.replace(`Row ${rowNum}: `, '')
        };
      } else {
        const cred = run.credentials?.find((c: any) => c.student_name?.toLowerCase() === student.full_name?.toLowerCase());
        return {
          rowNum,
          studentName: student.full_name,
          grade: student.grade_name,
          parentEmail: student.parent_email || 'N/A',
          status: cred?.parent_status === 'linked' ? 'Linked' : 'Success',
          credentials: cred ? { email: cred.student_email, pass: cred.student_password } : undefined
        };
      }
    });
  };

  const downloadLogCredentials = (run: any) => {
    if (!run || !run.credentials) return;
    const csvContent = [
      ['Student Name', 'Student ID (Username)', 'Temporary Password', 'Parent Email', 'Parent Registration Status'],
      ...run.credentials.map((row: any) => [
        row.student_name,
        row.student_email,
        row.student_password,
        row.parent_email || 'N/A',
        row.parent_status === 'created' ? 'Created New Account' : row.parent_status === 'linked' ? 'Linked to Existing' : 'No Parent Registered'
      ])
    ];
    const csv = csvContent.map(row => row.map((cell: any) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_credentials_run_${run.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadLogErrors = (run: any) => {
    if (!run || !run.errors || run.errors.length === 0) return;
    const content = [
      "=== ZHI BULK STUDENT UPLOAD ERROR LOG ===",
      `Date: ${new Date(run.timestamp).toLocaleString()}`,
      `Total Success: ${run.success}`,
      `Total Linked to Existing: ${run.linked || run.linked_to_existing || 0}`,
      `Total Failed: ${run.failed}`,
      "----------------------------------------",
      ...run.errors.map((err: string, i: number) => `${i + 1}. ${err}`)
    ].join("\r\n");

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk_upload_errors_run_${run.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteLogRun = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.schoolId) return;
    if (!confirm("Are you sure you want to delete this log from history?")) return;
    const key = `zhi_bulk_upload_history_${user.schoolId}`;
    const rawHistory = localStorage.getItem(key);
    if (rawHistory) {
      const historyList = JSON.parse(rawHistory);
      const filtered = historyList.filter((item: any) => item.id !== id);
      localStorage.setItem(key, JSON.stringify(filtered));
      setHistoryLogs(filtered);
      if (selectedLogRun?.id === id) {
        setSelectedLogRun(null);
      }
    }
  };

  const handleUploadComplete = (runData: any) => {
    setActiveView('logs');
    setSelectedLogRun(runData);
    setShowBulkModal(false);
  };

  const students: Kid[] = studentsRes?.data ?? [];

  const grades = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => { if (s.grade_name) set.add(s.grade_name); });
    return Array.from(set).sort();
  }, [students]);

  const sections = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.grade_name === gradeFilter && s.section) set.add(s.section);
    });
    return Array.from(set).sort();
  }, [students, gradeFilter]);

  const filtered = useMemo(() => {
    let list = [...students];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => (s.full_name ?? '').toLowerCase().includes(q));
    }
    if (gradeFilter) list = list.filter((s) => s.grade_name === gradeFilter);
    if (sectionFilter) list = list.filter((s) => s.section === sectionFilter);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = (a.full_name ?? '').localeCompare(b.full_name ?? '');
      else if (sortBy === 'progress') cmp = a.overall_progress - b.overall_progress;
      else if (sortBy === 'stars') cmp = a.total_stars_earned - b.total_stars_earned;
      else if (sortBy === 'last_active') {
        const aT = a.last_activity_at ? new Date(a.last_activity_at).getTime() : 0;
        const bT = b.last_activity_at ? new Date(b.last_activity_at).getTime() : 0;
        cmp = aT - bT;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [students, searchQuery, gradeFilter, sectionFilter, sortBy, sortDir]);

  const stats = useMemo(() => {
    const activeToday = students.filter(
      (s) => s.last_activity_at && Date.now() - new Date(s.last_activity_at).getTime() < 24 * 60 * 60 * 1000
    ).length;
    const avgProgress = students.length
      ? Math.round(students.reduce((s, k) => s + k.overall_progress, 0) / students.length)
      : 0;
    const avgStars = students.length
      ? Math.round(students.reduce((s, k) => s + (k.total_stars_earned || 0), 0) / students.length)
      : 0;
    return { total: students.length, activeToday, avgProgress, avgStars };
  }, [students]);

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(field); setSortDir('asc'); }
  };

  const sortArrow = (field: typeof sortBy) => {
    if (sortBy !== field) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
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

  const handleBulkDelete = async () => {
    try {
      await bulkDelete.mutateAsync(Array.from(selectedIds));
      setSelectedIds(new Set());
      setShowBulkDeleteConfirm(false);
    } catch {
      // handled by mutation
    }
  };

  const exportCSV = useCallback((ids?: Set<string>) => {
    const rows = ids && ids.size > 0
      ? students.filter((s) => ids.has(s.id))
      : students;

    const csvRows = [
      ['Name', 'Grade', 'Section', 'Progress (%)', 'Stars', 'Last Active'],
      ...rows.map((s) => [
        s.full_name ?? '',
        s.grade_name ?? '',
        s.section ?? '',
        String(s.overall_progress),
        String(s.total_stars_earned),
        s.last_activity_at ? new Date(s.last_activity_at).toLocaleString('en-IN') : 'Never',
      ]),
    ];

    const csv = csvRows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [students]);

  const selectedCount = selectedIds.size;

  if (isLoading && !studentsRes) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}>
          <div className={styles.loader} />
          <p>Loading students...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Student directory</p>
            <h1 className={styles.title}>Student management</h1>
            <p className={styles.subtitle}>
              Manage and monitor all enrolled students, track progress, stars, and activity metrics.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => setShowBulkModal(true)}
            >
              <Upload size={15} />
              <span>Bulk Upload</span>
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={16} />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Stats KPI Cards */}
        <section className={styles.kpiGrid}>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon1}`}>
              <Users size={20} />
            </div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Total Students</p>
              <h2 className={styles.kpiValue}>{stats.total}</h2>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon2}`}>
              <Activity size={20} />
            </div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Active Today</p>
              <h2 className={styles.kpiValue}>{stats.activeToday}</h2>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon3}`}>
              <TrendingUp size={20} />
            </div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Avg Progress</p>
              <h2 className={styles.kpiValue}>{stats.avgProgress}%</h2>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon4}`}>
              <Star size={20} />
            </div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Avg Stars</p>
              <h2 className={styles.kpiValue}>{stats.avgStars}</h2>
            </div>
          </article>
        </section>

        {/* Search + Filters + Export + Logs Toggle Segmented Control */}
        <section className={styles.filterSection}>
          <div className={styles.filterRow}>
            {/* Search */}
            <div className={styles.searchGroup}>
              <Search size={16} />
              <input
                className={styles.searchInput}
                type="search"
                placeholder={
                  activeView === 'logs'
                    ? selectedLogRun
                      ? "Search uploaded students..."
                      : "Search log by file name..."
                    : "Search by name..."
                }
                value={activeView === 'logs' ? logSearch : searchQuery}
                onChange={(e) => {
                  if (activeView === 'logs') {
                    setLogSearch(e.target.value);
                  } else {
                    setSearchQuery(e.target.value);
                  }
                }}
              />
              {(activeView === 'logs' ? logSearch : searchQuery) && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => {
                    if (activeView === 'logs') {
                      setLogSearch('');
                    } else {
                      setSearchQuery('');
                    }
                  }}
                >
                  <span aria-hidden>&times;</span>
                </button>
              )}
            </div>

            {/* Grade Select */}
            <div className={styles.filterGroup}>
              <div className={styles.selectWrap}>
                <select value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setSectionFilter(''); }} disabled={activeView === 'logs'}>
                  <option value="">All Grades</option>
                  {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronDown size={14} className={styles.chevron} />
              </div>
            </div>

            {/* Section Select */}
            <div className={styles.filterGroup}>
              <div className={styles.selectWrap}>
                <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)} disabled={activeView === 'logs' || !gradeFilter}>
                  <option value="">All Sections</option>
                  {sections.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} className={styles.chevron} />
              </div>
            </div>

            {/* Export */}
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                if (selectedCount > 0) exportCSV(selectedIds);
                else exportCSV();
              }}
              disabled={activeView === 'logs'}
              title={selectedCount > 0 ? `Export ${selectedCount} selected` : 'Export all'}
            >
              <Download size={15} />
              {selectedCount > 0 ? `Export (${selectedCount})` : 'Export'}
            </button>
            
            {/* Segmented Toggle Control */}
            <div className={styles.segmentedControl}>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${activeView === 'list' ? styles.segmentedBtnActive : ''}`}
                onClick={() => { setActiveView('list'); setSelectedLogRun(null); }}
              >
                Students
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${activeView === 'logs' ? styles.segmentedBtnActive : ''}`}
                onClick={() => setActiveView('logs')}
              >
                Import Logs
              </button>
            </div>
          </div>

          {/* Bulk Action Bar */}
          {activeView === 'list' && selectedCount > 0 && (
            <div className={styles.bulkBar}>
              <span className={styles.bulkCount}>{selectedCount} selected</span>
              <button
                type="button"
                className={styles.bulkDeleteBtn}
                onClick={() => setShowBulkDeleteConfirm(true)}
              >
                <Trash2 size={14} />
                Delete Selected
              </button>
              <button
                type="button"
                className={styles.bulkDeselectBtn}
                onClick={() => setSelectedIds(new Set())}
              >
                Deselect All
              </button>
            </div>
          )}
        </section>

        {activeView === 'list' && (
          <section className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>
                <h2>All Students</h2>
                <span>{filtered.length} students</span>
              </div>
            </div>

            {/* ── Desktop table (≥768 px) ── */}
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
                      const isOnline = s.last_activity_at
                        ? Date.now() - new Date(s.last_activity_at).getTime() < 30 * 60 * 1000
                        : false;
                      const pc = getProgressColor(s.overall_progress);
                      const pg = getProgressGradient(s.overall_progress);
                      const isSelected = selectedIds.has(s.id);
                      return (
                        <tr
                          key={s.id}
                          className={`${styles.tableRow} ${isSelected ? styles.rowSelected : ''}`}
                          onClick={() => { if (!isSelected && !selectedIds.size) setDetailStudent(s as StudentDetail); }}
                        >
                          <td className={styles.checkboxCol} onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(s.id)} />
                          </td>
                          <td>
                            <div className={styles.cellStudent}>
                              <div className={styles.avatar} style={{ background: getAvatarGradient(s.full_name ?? '') }}>
                                {(s.full_name ?? '?').charAt(0)}
                              </div>
                              <div className={styles.nameGroup}>
                                <p className={styles.name}>{s.full_name}</p>
                                <p className={styles.meta}>
                                  <span className={styles.gradePill}>{s.grade_name}</span>
                                  {s.section && <><span className={styles.dot}>·</span>{s.section}</>}
                                </p>
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
                          <td>
                            <div className={styles.cellStars}>
                              <Star size={13} fill="#f59e0b" color="#f59e0b" />
                              <span className={styles.starsVal}>{s.total_stars_earned}</span>
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
                          <td className={styles.actionsCol} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.actionMenu}>
                              <button type="button" className={styles.iconButton} onClick={() => setDetailStudent(s as StudentDetail)} aria-label="View details">
                                <Eye size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan={6}>
                      <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}><GraduationCap size={36} /></div>
                        <h3 className={styles.emptyTitle}>No students found</h3>
                        <p className={styles.emptyText}>{searchQuery || gradeFilter ? 'Try adjusting your search or filters' : 'Add your first student to get started'}</p>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Mobile card list (<768 px) ── */}
            <div className={styles.mobileCardList}>
              {filtered.length > 0 ? filtered.map((s) => {
                const isOnline = s.last_activity_at
                  ? Date.now() - new Date(s.last_activity_at).getTime() < 30 * 60 * 1000
                  : false;
                const pc = getProgressColor(s.overall_progress);
                const pg = getProgressGradient(s.overall_progress);
                const isSelected = selectedIds.has(s.id);
                return (
                  <div
                    key={s.id}
                    className={`${styles.studentCard} ${isSelected ? styles.cardSelected : ''}`}
                    onClick={() => { if (!isSelected && !selectedIds.size) setDetailStudent(s as StudentDetail); }}
                  >
                    <div className={styles.cardCheckbox} onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(s.id)} />
                    </div>
                    <div className={styles.avatar} style={{ background: getAvatarGradient(s.full_name ?? '') }}>
                      {(s.full_name ?? '?').charAt(0)}
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTopRow}>
                        <div className={styles.nameGroup} style={{ flex: 1, minWidth: 0 }}>
                          <p className={styles.name}>{s.full_name}</p>
                          <p className={styles.meta}>
                            <span className={styles.gradePill}>{s.grade_name}</span>
                            {s.section && <><span className={styles.dot}>·</span>{s.section}</>}
                          </p>
                        </div>
                        <span className={`${styles.statusDot} ${isOnline ? styles.online : ''}`}>
                          <span className={styles.pulse} />
                          {isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <div className={styles.cardBottomRow}>
                        <div className={styles.cellProgress}>
                          <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${s.overall_progress}%`, background: pg }} />
                          </div>
                          <span className={styles.progressPct} style={{ color: pc }}>{s.overall_progress}%</span>
                        </div>
                        <div className={styles.cellStars}>
                          <Star size={12} fill="#f59e0b" color="#f59e0b" />
                          <span className={styles.starsVal}>{s.total_stars_earned}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.cardViewBtn}
                      onClick={(e) => { e.stopPropagation(); setDetailStudent(s as StudentDetail); }}
                      aria-label="View details"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                );
              }) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><GraduationCap size={36} /></div>
                  <h3 className={styles.emptyTitle}>No students found</h3>
                  <p className={styles.emptyText}>{searchQuery || gradeFilter ? 'Try adjusting your search or filters' : 'Add your first student to get started'}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Import Logs History view */}
        {activeView === 'logs' && (
          selectedLogRun ? (
            /* Interactive Log Detail Table View */
            <div className={styles.logDetailView}>
              <div className={styles.detailBackBar}>
                <button
                  type="button"
                  className={styles.backTabBtn}
                  onClick={() => {
                    setSelectedLogRun(null);
                    setLogFilter('all');
                    setLogSearch('');
                  }}
                >
                  <ArrowLeft size={16} /> Back to Logs
                </button>
                <h3 className={styles.detailRunTitle}>{selectedLogRun.fileName}</h3>
              </div>

              <div className={styles.logFilterToolbar}>
                <div className={styles.logFilterTabs}>
                  <button
                    type="button"
                    className={`${styles.logFilterTab} ${logFilter === 'all' ? styles.logFilterTabActive : ''}`}
                    onClick={() => setLogFilter('all')}
                  >
                    All ({getLogTableRows(selectedLogRun).length})
                  </button>
                  <button
                    type="button"
                    className={`${styles.logFilterTab} ${logFilter === 'success' ? styles.logFilterTabActive : ''}`}
                    onClick={() => setLogFilter('success')}
                  >
                    Success ({getLogTableRows(selectedLogRun).filter(r => r.status !== 'Failed').length})
                  </button>
                  <button
                    type="button"
                    className={`${styles.logFilterTab} ${logFilter === 'failed' ? styles.logFilterTabActive : ''}`}
                    onClick={() => setLogFilter('failed')}
                  >
                    Failed ({getLogTableRows(selectedLogRun).filter(r => r.status === 'Failed').length})
                  </button>
                </div>
              </div>

              {/* Desktop table */}
              <div className={styles.logTableWrap}>
                <table className={styles.logTableMain}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Info</th>
                      <th>Parent</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLogTableRows(selectedLogRun)
                      .filter(r => {
                        if (logFilter === 'success') return r.status !== 'Failed';
                        if (logFilter === 'failed') return r.status === 'Failed';
                        return true;
                      })
                      .filter(r => {
                        if (!logSearch) return true;
                        const query = logSearch.toLowerCase();
                        return (
                          r.studentName.toLowerCase().includes(query) ||
                          r.parentEmail?.toLowerCase().includes(query) ||
                          (r.credentials?.email && r.credentials.email.toLowerCase().includes(query))
                        );
                      })
                      .map((row) => (
                        <tr key={row.rowNum}>
                          <td>{row.rowNum}</td>
                          <td>
                            <div className={styles.logRowInfo}>
                              <span className={styles.logRowStudentName}>{row.studentName}</span>
                              <span style={{ fontSize: '0.62rem', color: '#64748b' }}>Grade: {row.grade}</span>
                              {row.credentials && (
                                <span className={styles.logRowCreds}>User: {row.credentials.email} | Pass: {row.credentials.pass}</span>
                              )}
                            </div>
                          </td>
                          <td style={{ fontSize: '0.7rem', color: '#475569' }}>{row.parentEmail}</td>
                          <td>
                            {row.status === 'Failed' ? (
                              <div>
                                <span className={styles.logFailed}>Failed</span>
                                <span className={styles.logErrorMsg}>{row.errorMsg}</span>
                              </div>
                            ) : (
                              <span className={row.status === 'Linked' ? styles.logLinked : styles.logSuccess}>
                                {row.status === 'Linked' ? 'Linked' : 'Created'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className={styles.logMobileList}>
                {getLogTableRows(selectedLogRun)
                  .filter(r => {
                    if (logFilter === 'success') return r.status !== 'Failed';
                    if (logFilter === 'failed') return r.status === 'Failed';
                    return true;
                  })
                  .filter(r => {
                    if (!logSearch) return true;
                    const query = logSearch.toLowerCase();
                    return (
                      r.studentName.toLowerCase().includes(query) ||
                      r.parentEmail?.toLowerCase().includes(query) ||
                      (r.credentials?.email && r.credentials.email.toLowerCase().includes(query))
                    );
                  })
                  .map((row) => (
                    <div key={row.rowNum} className={styles.logMobileRow}>
                      <div className={styles.logMobileRowNum}>{row.rowNum}</div>
                      <div className={styles.logMobileRowBody}>
                        <span className={styles.logMobileRowName}>{row.studentName}</span>
                        <span className={styles.logMobileRowMeta}>Grade: {row.grade} · Parent: {row.parentEmail}</span>
                        {row.credentials && (
                          <span className={styles.logMobileRowCreds}>
                            {row.credentials.email} / {row.credentials.pass}
                          </span>
                        )}
                        {row.status === 'Failed' ? (
                          <><span className={styles.logFailed}>✗ Failed</span>
                          <span className={styles.logErrorMsg}>{row.errorMsg}</span></>
                        ) : (
                          <span className={row.status === 'Linked' ? styles.logLinked : styles.logSuccess}>
                            {row.status === 'Linked' ? '✓ Linked' : '✓ Created'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className={styles.logDownloadRow}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={() => downloadLogCredentials(selectedLogRun)}
                  disabled={!selectedLogRun.credentials || selectedLogRun.credentials.length === 0}
                >
                  <Download size={14} /> Download Credentials
                </button>
                {selectedLogRun.errors && selectedLogRun.errors.length > 0 && (
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => downloadLogErrors(selectedLogRun)}
                  >
                    <Download size={14} /> Download Errors
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* History Logs List */
            <div className={styles.historyLogsGrid}>
              {historyLogs.filter(run => !logSearch || (run.fileName || '').toLowerCase().includes(logSearch.toLowerCase())).length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1.5rem', color: '#64748b' }}>
                  <FileSpreadsheet size={44} style={{ margin: '0 auto 0.85rem', opacity: 0.28, color: '#16a085', display: 'block' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 950, color: '#1e293b', margin: 0 }}>
                    {logSearch ? 'No matching logs found' : 'No bulk upload history'}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.3rem', fontWeight: 700 }}>
                    {logSearch ? 'Try a different search query' : 'CSV upload runs will appear here automatically.'}
                  </p>
                </div>
              ) : (
                historyLogs
                  .filter(run => !logSearch || (run.fileName || '').toLowerCase().includes(logSearch.toLowerCase()))
                  .map((run) => (
                    <div key={run.id} className={styles.logCard}>
                      <div className={styles.logCardHeader}>
                        <h4 className={styles.logCardTitle} title={run.fileName}>{run.fileName}</h4>
                        <span className={styles.logCardDate}>
                          {new Date(run.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={styles.logCardStats}>
                        <span className={`${styles.logStat} ${styles.logStatSuccess}`}>
                          <CheckCircle2 size={11} /> {run.success} Added
                        </span>
                        <span className={`${styles.logStat} ${styles.logStatLinked}`}>
                          {run.linked || run.linked_to_existing || 0} Linked
                        </span>
                        {run.failed > 0 && (
                          <span className={`${styles.logStat} ${styles.logStatFailed}`}>
                            {run.failed} Failed
                          </span>
                        )}
                      </div>
                      <div className={styles.logCardActions}>
                        <button type="button" className={styles.logActionBtn} onClick={() => setSelectedLogRun(run)}>
                          <Eye size={12} /> View
                        </button>
                        <button type="button" className={styles.logActionBtn} onClick={() => downloadLogCredentials(run)}>
                          <Download size={12} /> Credentials
                        </button>
                        {run.errors && run.errors.length > 0 && (
                          <button type="button" className={styles.logActionBtn} onClick={() => downloadLogErrors(run)}>
                            <Download size={12} /> Errors
                          </button>
                        )}
                        <button type="button" className={`${styles.logActionBtn} ${styles.logActionBtnDel}`} onClick={(e) => deleteLogRun(run.id, e)}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )
        )}

        <div className={styles.bottomPad} />
      </div>

      <StudentDetailModal
        student={detailStudent!}
        open={detailStudent !== null}
        onClose={() => setDetailStudent(null)}
      />
      <AddStudentModal open={showAddModal} onClose={() => setShowAddModal(false)} />
      <BulkUploadModal open={showBulkModal} onClose={() => setShowBulkModal(false)} onUploadComplete={handleUploadComplete} />

      {/* Bulk Delete Confirmation */}
      {showBulkDeleteConfirm && (
        <>
          <div
            className={styles.bulkConfirmOverlay}
            onClick={() => setShowBulkDeleteConfirm(false)}
          />
          <div className={styles.bulkConfirmBox}>
            <div className={styles.bulkConfirmIcon}>
              <AlertTriangle size={28} color="#ef4444" />
            </div>
            <h3 className={styles.bulkConfirmTitle}>Delete {selectedCount} students?</h3>
            <p className={styles.bulkConfirmText}>
              This will permanently remove all selected students and their associated data.
            </p>
            <div className={styles.bulkConfirmActions}>
              <button
                type="button"
                className={styles.bulkCancelBtn}
                onClick={() => setShowBulkDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.bulkConfirmDeleteBtn}
                onClick={handleBulkDelete}
                disabled={bulkDelete.isPending}
              >
                {bulkDelete.isPending ? 'Deleting...' : `Delete ${selectedCount}`}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
