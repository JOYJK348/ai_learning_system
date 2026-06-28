'use client';

import { useState, useMemo } from 'react';
import { Manrope } from 'next/font/google';
import {
  Users, Search, Plus, Phone, Mail, ChevronDown,
  Eye, Baby, CreditCard, Clock, UserCheck, GraduationCap, X,
} from 'lucide-react';
import { useSchoolParents } from '@/hooks/useSchoolParents';
import { useSchoolCurriculumOverview } from '@/hooks/useSchoolCurriculum';
import AddParentModal from '../_components/AddParentModal';
import ParentDetailModal from '../_components/ParentDetailModal';
import type { ParentDetail } from '../_components/ParentDetailModal';
import styles from './page.module.css';

const adminFont = Manrope({ subsets: ['latin'], variable: '--admin-font', display: 'swap' });

type ParentRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  plan_type: string;
  plan_type_name: string;
  plan_status: string | null;
  plan_status_name: string | null;
  approval_status: string;
  approval_status_name: string;
  status_id: number | null;
  plan_expires_at: string | null;
  created_at: string;
  children: { student_id: string; name: string; grade_name?: string; is_primary: boolean }[];
  children_count: number;
};

const AVATAR_COLORS = ['#12312f', '#1e293b', '#3b1f4e', '#1e3a5f', '#5c1f1f', '#1f4e3a'];
function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

export default function ParentsPage() {
  const { data: parentsRes, isLoading } = useSchoolParents();
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string[]>([]);
  const [detailParent, setDetailParent] = useState<ParentDetail | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const parents: ParentRow[] = parentsRes?.data ?? [];

  // Use curriculum overview so ALL school grades show, not just those linked to a parent
  const { data: curriculumRes } = useSchoolCurriculumOverview();
  const grades = useMemo(() => {
    if (curriculumRes?.grades?.length) {
      return curriculumRes.grades.map(g => g.name);
    }
    // Fallback: derive from children in parent list
    const s = new Set<string>();
    parents.forEach(p => p.children.forEach(c => { if (c.grade_name) s.add(c.grade_name); }));
    return Array.from(s).sort();
  }, [curriculumRes, parents]);

  const planTypes = useMemo(() => {
    const s = new Set<string>();
    parents.forEach(p => { if (p.plan_type_name) s.add(p.plan_type_name); });
    return Array.from(s).sort();
  }, [parents]);

  const toggleGrade = (g: string) =>
    setGradeFilter(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const filtered = useMemo(() => {
    let list = [...parents];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
    }
    if (planFilter) list = list.filter(p => p.plan_type_name === planFilter);
    if (gradeFilter.length > 0)
      list = list.filter(p => p.children.some(c => c.grade_name && gradeFilter.includes(c.grade_name)));
    return list;
  }, [parents, search, planFilter, gradeFilter]);

  const stats = useMemo(() => ({
    total: parents.length,
    totalChildren: parents.reduce((s, p) => s + p.children_count, 0),
    activePlans: parents.filter(p => p.plan_status === 'active').length,
    expiring: parents.filter(p => {
      if (!p.plan_expires_at) return false;
      const d = Math.ceil((new Date(p.plan_expires_at).getTime() - Date.now()) / 86400000);
      return d >= 0 && d <= 30;
    }).length,
  }), [parents]);

  if (isLoading && !parentsRes) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}><div className={styles.loader} /><p>Loading parents...</p></div>
      </main>
    );
  }

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerText}>
            <p className={styles.eyebrow}>Guardian directory</p>
            <h1 className={styles.title}>Parent Management</h1>
            <p className={styles.subtitle}>Manage guardians and their linked children across your school.</p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.primaryButton} onClick={() => setShowAddModal(true)}>
              <Plus size={16} /> Add Parent
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <section className={styles.kpiGrid}>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon1}`}><Users size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Total Parents</p>
              <h2 className={styles.kpiValue}>{stats.total}</h2>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon2}`}><Baby size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Linked Children</p>
              <h2 className={styles.kpiValue}>{stats.totalChildren}</h2>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon3}`}><CreditCard size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Active Plans</p>
              <h2 className={styles.kpiValue}>{stats.activePlans}</h2>
            </div>
          </article>
          <article className={styles.kpiCard}>
            <div className={`${styles.kpiIcon} ${styles.kpiIcon4}`}><Clock size={20} /></div>
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>Expiring Soon</p>
              <h2 className={styles.kpiValue}>{stats.expiring}</h2>
            </div>
          </article>
        </section>

        {/* Filter Bar */}
        <section className={styles.filterSection}>
          <div className={styles.filterRow}>
            {/* Search */}
            <div className={styles.searchGroup}>
              <Search size={16} />
              <input
                className={styles.searchInput}
                type="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" className={styles.clearBtn} onClick={() => setSearch('')}>
                  <span aria-hidden>×</span>
                </button>
              )}
            </div>

            {/* Grade pills */}
            <div className={styles.filterGroup}>
              <GraduationCap size={14} style={{ color: '#64748b', flexShrink: 0 }} />
              <div className={styles.gradePills}>
                {grades.map(g => (
                  <button
                    key={g}
                    type="button"
                    className={`${styles.gradePill} ${gradeFilter.includes(g) ? styles.gradePillActive : ''}`}
                    onClick={() => toggleGrade(g)}
                  >
                    {g}
                  </button>
                ))}
                {gradeFilter.length > 0 && (
                  <button type="button" className={styles.gradeClear} onClick={() => setGradeFilter([])} aria-label="Clear">
                    <X size={11} />
                  </button>
                )}
              </div>
            </div>

            {/* Plan select */}
            <div className={styles.filterGroup}>
              <CreditCard size={14} style={{ color: '#64748b', flexShrink: 0 }} />
              <div className={styles.selectWrap}>
                <select value={planFilter} onChange={e => setPlanFilter(e.target.value)}>
                  <option value="">All Plans</option>
                  {planTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                </select>
                <ChevronDown size={13} className={styles.chevron} />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><Users size={36} /></div>
            <h3 className={styles.emptyTitle}>No parents found</h3>
            <p className={styles.emptyText}>{search ? 'Try a different search term' : 'Add a parent to get started'}</p>
          </div>
        ) : (
          <section className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>
                <h2>All Parents</h2>
                <span>{filtered.length} parents</span>
              </div>
            </div>

            {/* Desktop table */}
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Parent</th>
                    <th>Contact</th>
                    <th>Children</th>
                    <th>Plan</th>
                    <th className={styles.actionsCol} />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const daysLeft = p.plan_expires_at
                      ? Math.ceil((new Date(p.plan_expires_at).getTime() - Date.now()) / 86400000)
                      : null;
                    const expiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30;
                    return (
                      <tr
                        key={p.id}
                        className={styles.tableRow}
                        onClick={() => setDetailParent(p)}
                      >
                        <td>
                          <div className={styles.cellParent}>
                            <div className={styles.avatar} style={{ background: AVATAR_COLORS[hashStr(p.name) % AVATAR_COLORS.length] }}>
                              {p.name.charAt(0)}
                            </div>
                            <div className={styles.nameGroup}>
                              <p className={styles.name}>{p.name}</p>
                              <p className={styles.meta}>
                                <UserCheck size={11} /> {p.approval_status_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.contactCell}>
                            <span className={styles.contactRow}><Mail size={12} />{p.email}</span>
                            {p.phone && <span className={styles.contactRow}><Phone size={12} />{p.phone}</span>}
                          </div>
                        </td>
                        <td>
                          <div className={styles.childrenCell}>
                            <span className={styles.childCount}>{p.children_count}</span>
                            <div className={styles.childTags}>
                              {p.children.slice(0, 3).map(c => (
                                <span key={c.student_id} className={styles.childTag}>{c.name}</span>
                              ))}
                              {p.children.length > 3 && <span className={styles.childMore}>+{p.children.length - 3}</span>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.planCell}>
                            <span className={styles.planBadge}>{p.plan_type_name}</span>
                            {expiringSoon && daysLeft !== null && (
                              <span className={styles.planExpiry}>{daysLeft}d left</span>
                            )}
                          </div>
                        </td>
                        <td className={styles.actionsCol} onClick={e => e.stopPropagation()}>
                          <button type="button" className={styles.iconButton} onClick={() => setDetailParent(p)} aria-label="View details">
                            <Eye size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className={styles.mobileCardList}>
              {filtered.map(p => {
                const daysLeft = p.plan_expires_at
                  ? Math.ceil((new Date(p.plan_expires_at).getTime() - Date.now()) / 86400000)
                  : null;
                const expiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30;
                return (
                  <div key={p.id} className={styles.parentCard} onClick={() => setDetailParent(p)}>
                    <div className={styles.avatar} style={{ background: AVATAR_COLORS[hashStr(p.name) % AVATAR_COLORS.length] }}>
                      {p.name.charAt(0)}
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTopRow}>
                        <p className={styles.name}>{p.name}</p>
                        <span className={styles.planBadge}>{p.plan_type_name}</span>
                      </div>
                      <span className={styles.contactRow} style={{ marginBottom: '0.35rem' }}><Mail size={11} />{p.email}</span>
                      <div className={styles.cardBottomRow}>
                        <div className={styles.childTags}>
                          {p.children.slice(0, 2).map(c => (
                            <span key={c.student_id} className={styles.childTag}>{c.name}</span>
                          ))}
                          {p.children.length > 2 && <span className={styles.childMore}>+{p.children.length - 2}</span>}
                          {p.children_count === 0 && <span className={styles.noChildren}>No children</span>}
                        </div>
                        {expiringSoon && daysLeft !== null && <span className={styles.planExpiry}>{daysLeft}d left</span>}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.cardViewBtn}
                      onClick={e => { e.stopPropagation(); setDetailParent(p); }}
                      aria-label="View details"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <div className={styles.bottomPad} />
      </div>

      <ParentDetailModal parent={detailParent!} open={detailParent !== null} onClose={() => setDetailParent(null)} />
      <AddParentModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </main>
  );
}
