'use client';

import { Manrope } from 'next/font/google';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  X, AlertTriangle, Users, Mail, Phone, GraduationCap, Building2,
  User, Search, CheckCircle2, XCircle, Clock, Eye, ArrowLeft, Hourglass, Fingerprint
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: 'Pending Review', class: styles.statusPending },
  approved: { label: 'Approved', class: styles.statusActive },
  rejected: { label: 'Rejected', class: styles.statusInactive },
};

const AVATAR_GRADIENTS = [
  ['#4f46e5', '#6366f1'],
  ['#12312f', '#1a4a47'],
  ['#0891b2', '#06b6d4'],
  ['#059669', '#10b981'],
];

function getAvatarGradient(isSchool: boolean, index: number) {
  if (isSchool) return `linear-gradient(135deg, ${AVATAR_GRADIENTS[0][0]}, ${AVATAR_GRADIENTS[0][1]})`;
  return `linear-gradient(135deg, ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length][0]}, ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length][1]})`;
}

export default function AdminApprovalsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [typeFilter, setTypeFilter] = useState<'all' | 'school' | 'parent'>('all');
  const [urlTypeParam, setUrlTypeParam] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [successModal, setSuccessModal] = useState<{ isSchool: boolean; name: string; email: string } | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ type: 'approve' | 'reject'; id: string; name: string; extraInfo: string; isSchool?: boolean } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const t = sp.get('type');
      if (t === 'school') { setTypeFilter('school'); setUrlTypeParam('school'); }
      else if (t === 'parent') { setTypeFilter('parent'); setUrlTypeParam('parent'); }
      else { setTypeFilter('all'); setUrlTypeParam(null); }
    }
  }, []);

  const { data: regData, isLoading } = useQuery({
    queryKey: ['admin', 'pending-registrations', 'all'],
    queryFn: () => fetch(`${BASE}/api/admin/pending-registrations`, { credentials: 'include' })
      .then(r => r.json()).then(d => d.data ?? []),
    enabled: !!user,
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, isSchool, isLinkRequest }: { id: string; isSchool?: boolean; isLinkRequest?: boolean }) => {
      const url = isLinkRequest
        ? `${BASE}/api/admin/pending-registrations/link-request/${id}`
        : isSchool
        ? `${BASE}/api/admin/pending-school-registrations/${id}`
        : `${BASE}/api/admin/pending-registrations/${id}`;
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
        credentials: 'include',
      }).then(r => r.json());
    },
    onSuccess: (data: any) => {
      setConfirmModal(null);
      if (data.data?.status === 'approved') {
        const isSchool = !!data.data.school_code;
        const email = isSchool
          ? data.data.admin_credentials?.email
          : data.data.parent_credentials?.email || data.data.child_credentials?.email;
        
        setSuccessModal({
          isSchool,
          name: isSchool ? 'School Admin' : data.data.child_credentials?.name || '',
          email: email || '',
        });
        
        const msg = isSchool
          ? 'Onboarding approved successfully!'
          : 'Approved successfully! Email dispatched.';
        setFeedback({ msg, type: 'success' });
        queryClient.invalidateQueries({ queryKey: ['admin', 'pending-registrations'] });
      } else if (data.error) setFeedback({ msg: data.error, type: 'error' });
    },
    onError: (err: Error) => setFeedback({ msg: err.message, type: 'error' }),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason, isSchool, isLinkRequest }: { id: string; reason: string; isSchool?: boolean; isLinkRequest?: boolean }) => {
      const url = isLinkRequest
        ? `${BASE}/api/admin/pending-registrations/link-request/${id}`
        : isSchool
        ? `${BASE}/api/admin/pending-school-registrations/${id}`
        : `${BASE}/api/admin/pending-registrations/${id}`;
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', rejection_reason: reason }),
        credentials: 'include',
      }).then(r => r.json());
    },
    onSuccess: (data: any) => {
      if (data.data?.status === 'rejected') {
        setFeedback({ msg: 'Registration rejected.', type: 'success' });
        setConfirmModal(null);
        queryClient.invalidateQueries({ queryKey: ['admin', 'pending-registrations'] });
      } else if (data.error) setFeedback({ msg: data.error, type: 'error' });
    },
    onError: (err: Error) => setFeedback({ msg: err.message, type: 'error' }),
  });

  const handleApprove = (reg: any) => setConfirmModal({
    type: 'approve',
    id: reg.id,
    name: reg.parent_name,
    extraInfo: reg.is_school ? reg.school_name : reg.child_name || '',
    isSchool: reg.is_school,
    isLinkRequest: reg.is_link_request
  } as any);

  const handleReject = (reg: any) => {
    setConfirmModal({
      type: 'reject',
      id: reg.id,
      name: reg.parent_name,
      extraInfo: reg.is_school ? reg.school_name : reg.child_name || '',
      isSchool: reg.is_school,
      isLinkRequest: reg.is_link_request
    } as any);
    setRejectionReason('');
  };

  const confirmAction = () => {
    if (!confirmModal) return;
    if (confirmModal.type === 'approve') {
      approveMutation.mutate({ id: confirmModal.id, isSchool: confirmModal.isSchool, isLinkRequest: (confirmModal as any).isLinkRequest });
    } else {
      rejectMutation.mutate({ id: confirmModal.id, reason: rejectionReason, isSchool: confirmModal.isSchool, isLinkRequest: (confirmModal as any).isLinkRequest });
    }
  };

  useEffect(() => {
    if (!loading && !user) router.push(`/${locale}/login`);
  }, [loading, user, router, locale]);

  const registrations = useMemo(() => (Array.isArray(regData) ? regData : []), [regData]);


  const filtered = useMemo(() => {
    return registrations.filter((r: any) => {
      if (r.status !== filter) return false;
      if (typeFilter === 'school' && !r.is_school) return false;
      if (typeFilter === 'parent' && r.is_school) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        r.parent_name?.toLowerCase().includes(q) ||
        r.parent_email?.toLowerCase().includes(q) ||
        r.parent_phone?.includes(q) ||
        r.child_name?.toLowerCase().includes(q) ||
        r.school_name?.toLowerCase().includes(q)
      );
    });
  }, [registrations, filter, typeFilter, search]);

  const stats = useMemo(() => {
    const pool = registrations.filter((r: any) => {
      if (typeFilter === 'school' && !r.is_school) return false;
      if (typeFilter === 'parent' && r.is_school) return false;
      return true;
    });
    const total = pool.length;
    const pending = pool.filter((r: any) => r.status === 'pending').length;
    const approved = pool.filter((r: any) => r.status === 'approved').length;
    const rejected = pool.filter((r: any) => r.status === 'rejected').length;
    return { total, pending, approved, rejected };
  }, [registrations, typeFilter]);

  const detailModal = useMemo(() => {
    if (!detailId) return null;
    return registrations.find((r: any) => r.id === detailId) || null;
  }, [detailId, registrations]);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (loading || !user) return null;
  if (!hasMounted) return null;

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <Link href={`/${locale}/admin`} className={styles.backLink}>
            <ArrowLeft size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> Back to dashboard
          </Link>
          <p className={styles.eyebrow} style={{ marginTop: '0.75rem' }}>Awaiting Approval</p>
          <h1 className={styles.title}>Registration Approvals</h1>
          <p className={styles.subtitle}>
            Process and verify onboarding requests from new parents and school administrations.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <section className={styles.kpiGrid}>
        <article className={styles.kpiCard}>
          <div className={styles.kpiIcon}><Users size={20} /></div>
          <div className={styles.kpiContent}>
            <p className={styles.kpiLabel}>Total Requests</p>
            <h2>{stats.total}</h2>
            <span className={styles.kpiMeta}>
              {stats.approved} approved • {stats.rejected} rejected
            </span>
          </div>
        </article>
        <article className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.kpiPurple}`}><Hourglass size={20} /></div>
          <div className={styles.kpiContent}>
            <p className={styles.kpiLabel}>Pending Review</p>
            <h2>{stats.pending}</h2>
            <span className={styles.kpiMeta}>Action required</span>
          </div>
        </article>
        <article className={styles.kpiCard}>
          <div className={`${styles.kpiIcon} ${styles.kpiGreen}`}><CheckCircle2 size={20} /></div>
          <div className={styles.kpiContent}>
            <p className={styles.kpiLabel}>Approved</p>
            <h2>{stats.approved}</h2>
            <span className={styles.kpiMeta}>Accounts active</span>
          </div>
        </article>
      </section>

      {/* Toast Feedback */}
      {feedback && (
        <div className={`${styles.toast} ${feedback.type === 'error' ? styles.toastError : styles.toastSuccess}`}>
          <AlertTriangle size={16} />
          <span style={{ marginLeft: '0.5rem' }}>{feedback.msg}</span>
          <button onClick={() => setFeedback(null)} className={styles.toastClose}>✕</button>
        </div>
      )}

      {/* Generated Success Modal Popup */}
      {successModal && (
        <div className={styles.modalOverlay} onClick={() => setSuccessModal(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()} style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(22, 163, 74, 0.1)',
              color: '#16a34a',
              marginBottom: '1.5rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            
            <h2 className={styles.modalTitle} style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>
              Onboarding Approved!
            </h2>
            
            <p className={styles.modalDesc} style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
              {successModal.isSchool 
                ? `The school registration has been approved. The access credentials and activation instructions have been successfully sent to ${successModal.email}.`
                : `The parent registration has been approved. Welcome emails containing login credentials for both parent and child have been successfully sent to ${successModal.email}.`}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className={styles.btnConfirmApprove}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: '1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(135deg, #12312f, #16a085 48%, #38bdf8)',
                  boxShadow: '0 10px 20px rgba(22, 160, 133, 0.15)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => setSuccessModal(null)}
              >
                Okay, Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <section className={styles.filterSection}>
        <div className={styles.filterRow}>
          {/* Search bar */}
          <div className={styles.searchGroup}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name, email, school, child..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && <button className={styles.closeButton} style={{ padding: '0.15rem' }} onClick={() => setSearch('')}><X size={14} /></button>}
          </div>

          {/* Request Type filter */}
          <div className={styles.filterGroup}>
            <User size={16} />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)}>
              <option value="all">All Request Types</option>
              <option value="school">🏫 School Registrations</option>
              <option value="parent">👤 Parent Registrations</option>
            </select>
          </div>

          {/* Status Segment */}
          <div className={styles.filterGroup}>
            <Clock size={16} />
            <select value={filter} onChange={e => setFilter(e.target.value as any)}>
              <option value="pending">Pending review</option>
              <option value="approved">Approved requests</option>
              <option value="rejected">Rejected requests</option>
            </select>
          </div>
        </div>
      </section>

      {/* Table list */}
      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            <h2>Requests Directory</h2>
            <span>{filtered.length} requests</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Applicant info</th>
                <th>Target Details</th>
                <th>Submitted On</th>
                <th>Status</th>
                <th className={styles.actionsCol}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((reg: any, index: number) => {
                  const initials = reg.is_school
                    ? reg.school_name?.slice(0, 2).toUpperCase()
                    : reg.parent_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '?';

                  return (
                    <tr
                      key={reg.id}
                      className={styles.tableRow}
                      onClick={() => setDetailId(reg.id)}
                    >
                      <td>
                        <div className={styles.cellUser}>
                          <div
                            className={styles.userAvatar}
                            style={{ background: getAvatarGradient(reg.is_school, index) }}
                          >
                            {initials}
                          </div>
                          <div className={styles.userInfo}>
                            <span className={styles.userName}>{reg.parent_name}</span>
                            <span className={styles.userMeta}>
                              <span className={`${styles.gradePill} ${reg.is_school ? styles.badgeSchool : reg.is_link_request ? styles.badgeLinkRequest : styles.badgeParent}`}>
                                {reg.is_school ? '🏫 School Admin' : reg.is_link_request ? '🔗 Link Request' : '👤 Parent'}
                              </span>
                              <span style={{ marginLeft: '0.25rem' }}>{reg.parent_email}</span>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.userInfo}>
                          {reg.is_school ? (
                            <>
                              <span className={styles.userName} style={{ fontSize: '0.9rem' }}>{reg.school_name}</span>
                              <span className={styles.userMeta}>
                                {reg.board_name && <span>{reg.board_name} board</span>}
                                {reg.city && <span> • {reg.city}</span>}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className={styles.userName} style={{ fontSize: '0.9rem' }}>Child: {reg.child_name}</span>
                              <span className={styles.userMeta}>
                                {reg.grade && <span>{reg.grade}</span>}
                                {reg.is_link_request && <span style={{ color: '#0f766e', fontWeight: 900, background: '#ccfbf1', padding: '0.05rem 0.25rem', borderRadius: '4px', marginLeft: '0.25rem', fontSize: '0.62rem' }}>Link Only</span>}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={styles.userMeta}>

                          {new Date(reg.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${statusConfig[reg.status]?.class}`}>
                          {statusConfig[reg.status]?.label}
                        </span>
                      </td>
                      <td className={styles.actionsCol} onClick={e => e.stopPropagation()}>
                        <div className={styles.actionMenu}>
                          <button
                            type="button"
                            className={styles.iconButton}
                            title="View full details"
                            onClick={() => setDetailId(reg.id)}
                          >
                            <Eye size={15} />
                          </button>
                          {reg.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                className={styles.iconButton}
                                style={{ color: '#16a34a', borderColor: 'rgba(22, 163, 74, 0.15)' }}
                                title="Approve registration"
                                onClick={() => handleApprove(reg)}
                              >
                                <CheckCircle2 size={15} />
                              </button>
                              <button
                                type="button"
                                className={styles.iconButtonDanger}
                                title="Reject registration"
                                onClick={() => handleReject(reg)}
                              >
                                <XCircle size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                      <Hourglass size={36} style={{ marginBottom: '0.75rem', opacity: 0.6 }} />
                      <h3 style={{ fontSize: '1rem', fontWeight: 950, color: '#102027', margin: '0 0 0.25rem' }}>
                        No registrations found
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                        All caught up with approvals under this filter configuration.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detail Slideout Drawer */}
      {detailModal && (
        <div className={styles.drawerOverlay} onClick={() => setDetailId(null)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitle}>
                <div
                  className={styles.drawerLogo}
                  style={{
                    background: detailModal.is_school
                      ? 'linear-gradient(135deg,#4f46e5,#6366f1)'
                      : 'linear-gradient(135deg,#12312f,#1a4a47)',
                  }}
                >
                  {detailModal.is_school ? '🏫' : '👤'}
                </div>
                <div>
                  <h2>{detailModal.is_school ? 'School Request' : 'Parent Request'}</h2>
                  <span className={`${styles.statusBadge} ${statusConfig[detailModal.status]?.class}`} style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                    {statusConfig[detailModal.status]?.label}
                  </span>
                </div>
              </div>
              <button className={styles.closeButton} onClick={() => setDetailId(null)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {/* Applicant Info */}
              <section className={styles.drawerSection}>
                <h3><User size={16} /> Contact Details</h3>
                <div className={styles.drawerGrid}>
                  <div><label>Name</label><p>{detailModal.parent_name}</p></div>
                  <div><label>Email</label><p>{detailModal.parent_email}</p></div>
                  <div><label>Phone</label><p>{detailModal.parent_phone || 'No phone provided'}</p></div>
                  <div><label>Submitted</label><p>{new Date(detailModal.created_at).toLocaleDateString('en-IN')}</p></div>
                </div>
              </section>

              {/* Target Parameter Info */}
              <section className={styles.drawerSection}>
                <h3>{detailModal.is_school ? <Building2 size={16} /> : <GraduationCap size={16} />} Target Details</h3>
                <div className={styles.drawerGrid}>
                  {detailModal.is_school ? (
                    <>
                      <div style={{ gridColumn: 'span 2' }}><label>School Name</label><p>{detailModal.school_name}</p></div>
                      <div><label>Board / Syllabus</label><p>{detailModal.board_name || 'N/A'}</p></div>
                      <div><label>City</label><p>{detailModal.city || 'N/A'}</p></div>
                      <div style={{ gridColumn: 'span 2' }}><label>Address</label><p>{detailModal.address || 'N/A'}</p></div>
                    </>
                  ) : (
                    <>
                      <div><label>Child Name</label><p>{detailModal.child_name}</p></div>
                      <div><label>Grade / Standard</label><p>{detailModal.grade || 'N/A'}</p></div>
                    </>
                  )}
                  {detailModal.status === 'rejected' && detailModal.rejection_reason && (
                    <div className={styles.rejectReasonBox}>
                      <label>Rejection Reason</label>
                      <p style={{ marginTop: '0.2rem' }}>✕ {detailModal.rejection_reason}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Actions at bottom of drawer */}
              {detailModal.status === 'pending' && (
                <div className={styles.drawerActions}>
                  <button
                    className={styles.btnApprove}
                    onClick={() => {
                      setDetailId(null);
                      handleApprove(detailModal);
                    }}
                  >
                    <CheckCircle2 size={16} /> Approve Onboarding
                  </button>
                  <button
                    className={styles.btnReject}
                    onClick={() => {
                      setDetailId(null);
                      handleReject(detailModal);
                    }}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className={styles.modalOverlay} onClick={() => setConfirmModal(null)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.kpiLabel} style={{ color: confirmModal.type === 'approve' ? '#16a34a' : '#be123c' }}>
                  {confirmModal.type === 'approve' ? 'Verify and Approve' : 'Reject Applicant'}
                </p>
                <h2 className={styles.modalTitle}>
                  {confirmModal.type === 'approve' ? 'Confirm Approval' : 'Rejection Details'}
                </h2>
              </div>
              <button className={styles.closeButton} onClick={() => setConfirmModal(null)}><X size={20} /></button>
            </div>

            <div className={styles.modalDesc}>
              {confirmModal.type === 'approve'
                ? `Are you sure you want to approve ${confirmModal.name}'s registration request? This will automatically generate authorization credentials.`
                : `Please provide a reason for rejecting the registration request from ${confirmModal.name}.`}
            </div>

            {confirmModal.type === 'reject' && (
              <div className={styles.formField}>
                <label>Rejection Reason *</label>
                <textarea
                  placeholder="e.g. Email address is invalid, or school registration documents are incomplete."
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  rows={4}
                  required
                />
              </div>
            )}

            <div className={styles.modalActionsButtons}>
              <button
                className={styles.credDismiss}
                style={{ flex: 1 }}
                onClick={() => setConfirmModal(null)}
              >
                Cancel
              </button>
              <button
                className={confirmModal.type === 'approve' ? styles.btnConfirmApprove : styles.btnConfirmReject}
                style={{ flex: 1 }}
                onClick={confirmAction}
                disabled={approveMutation.isPending || rejectMutation.isPending}
              >
                {approveMutation.isPending || rejectMutation.isPending
                  ? 'Processing...'
                  : confirmModal.type === 'approve'
                  ? 'Yes, Approve'
                  : 'Yes, Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
