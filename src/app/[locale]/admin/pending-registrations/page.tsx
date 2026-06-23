'use client';

import { Manrope } from 'next/font/google';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  X, AlertTriangle, Users, Mail, Phone, GraduationCap, Building2,
  User, BookOpen, ShieldCheck, Ban, Search, ChevronRight,
  CheckCircle2, XCircle, Fingerprint,
  CalendarDays, BadgeCheck, BadgeX, Loader2, Hourglass, Building, MapPin, Award
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', dot: styles.dotPending },
  approved: { label: 'Approved', color: '#16a34a', bg: 'rgba(22,163,74,0.08)', dot: styles.dotApproved },
  rejected: { label: 'Rejected', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', dot: styles.dotRejected },
};

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
  const [credentials, setCredentials] = useState<any>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ type: 'approve' | 'reject'; id: string; name: string; extraInfo: string; isSchool?: boolean } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const t = sp.get('type');
      if (t === 'school') { setTypeFilter('school'); setUrlTypeParam('school'); }
      else if (t === 'parent') { setTypeFilter('parent'); setUrlTypeParam('parent'); }
    }
  }, []);

  const { data: regData, isLoading } = useQuery({
    queryKey: ['admin', 'pending-registrations', 'all'],
    queryFn: () => fetch(`${BASE}/api/admin/pending-registrations`, { credentials: 'include' })
      .then(r => r.json()).then(d => d.data ?? []),
    enabled: !!user,
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, isSchool }: { id: string; isSchool?: boolean }) => {
      const url = isSchool
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
        setCredentials(data.data);
        setFeedback({ msg: 'Onboarding approved! Credentials generated below.', type: 'success' });
        queryClient.invalidateQueries({ queryKey: ['admin', 'pending-registrations'] });
      } else if (data.error) setFeedback({ msg: data.error, type: 'error' });
    },
    onError: (err: Error) => setFeedback({ msg: err.message, type: 'error' }),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason, isSchool }: { id: string; reason: string; isSchool?: boolean }) => {
      const url = isSchool
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
    isSchool: reg.is_school
  });

  const handleReject = (reg: any) => {
    setConfirmModal({
      type: 'reject',
      id: reg.id,
      name: reg.parent_name,
      extraInfo: reg.is_school ? reg.school_name : reg.child_name || '',
      isSchool: reg.is_school
    });
    setRejectionReason('');
  };

  const confirmAction = () => {
    if (!confirmModal) return;
    if (confirmModal.type === 'approve') {
      approveMutation.mutate({ id: confirmModal.id, isSchool: confirmModal.isSchool });
    } else {
      rejectMutation.mutate({ id: confirmModal.id, reason: rejectionReason, isSchool: confirmModal.isSchool });
    }
  };

  useEffect(() => {
    if (!loading && !user) router.push(`/${locale}/login`);
  }, [loading, user, router, locale]);

  if (loading) return <div className={styles.shell}><div className={styles.loading}><Loader2 size={32} className={styles.spinner} /></div></div>;
  if (!user) return null;

  const registrations = Array.isArray(regData) ? regData : [];
  const filtered = registrations.filter((r: any) => {
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
  const counts = {
    pending: registrations.filter((r: any) => {
      if (r.status !== 'pending') return false;
      if (typeFilter === 'school' && !r.is_school) return false;
      if (typeFilter === 'parent' && r.is_school) return false;
      return true;
    }).length,
    approved: registrations.filter((r: any) => {
      if (r.status !== 'approved') return false;
      if (typeFilter === 'school' && !r.is_school) return false;
      if (typeFilter === 'parent' && r.is_school) return false;
      return true;
    }).length,
    rejected: registrations.filter((r: any) => {
      if (r.status !== 'rejected') return false;
      if (typeFilter === 'school' && !r.is_school) return false;
      if (typeFilter === 'parent' && r.is_school) return false;
      return true;
    }).length,
  };

  const detailModal = detailId ? registrations.find((r: any) => r.id === detailId) : null;

  return (
    <div className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.content}>

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.badge}>⏳ Pending</div>
            <h1 className={styles.title}>Registrations</h1>
            <p className={styles.subtitle}><Users size={12} /> {registrations.length} total · {counts.pending} awaiting review</p>
          </div>
          <div className={styles.headerStat}>
            <span className={styles.statNum}>{counts.pending}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </header>

        {/* Request Type Selector Tabs */}
        {!urlTypeParam && (
          <div className="flex gap-1.5 bg-slate-100/60 p-1 rounded-2xl w-fit mb-6 border border-slate-200/20 font-sans">
            {[
              { id: 'all', label: 'All Requests' },
              { id: 'school', label: 'Schools Only' },
              { id: 'parent', label: 'Parents Only' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id as any)}
                className={`px-4.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                  typeFilter === t.id
                    ? 'bg-white text-[#12312f] shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input type="text" placeholder="Search by name, email, phone, school..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
          {search && <button className={styles.searchClear} onClick={() => setSearch('')}><X size={14} /></button>}
        </div>

        <div className={styles.filterRow}>
          {(['pending', 'approved', 'rejected'] as const).map(f => {
            const cfg = statusConfig[f];
            return (
              <button key={f} className={`${styles.filterChip} ${filter === f ? styles.filterChipActive : ''}`} onClick={() => setFilter(f)}
                style={filter === f ? { background: cfg.bg, borderColor: cfg.color, color: cfg.color } : {}}>
                <span className={`${styles.statusDot} ${cfg.dot}`} />
                <span>{cfg.label}</span>
                <span className={styles.filterCount}>{counts[f]}</span>
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className={`${styles.toast} ${feedback.type === 'error' ? styles.toastError : styles.toastSuccess}`}>
            <AlertTriangle size={14} />
            <span>{feedback.msg}</span>
            <button onClick={() => setFeedback(null)} className={styles.toastClose}>✕</button>
          </div>
        )}

        {credentials && (
          <div className={styles.credCard}>
            <p className={styles.credTitle}>✅ Credentials Generated</p>
            <p className={styles.credNote}>{credentials.school_code ? 'Share these details with the school Principal / Administrator' : 'Share these with the parent'}</p>
            <div className={styles.credGrid}>
              {credentials.school_code ? (
                <div className={styles.credBox} style={{ gridColumn: 'span 2' }}>
                  <p className={styles.credBoxTitle}>School Admin Account</p>
                  <div className={styles.credRow}><Building2 size={11} /> School Code: <strong>{credentials.school_code}</strong></div>
                  <div className={styles.credRow}><Mail size={11} /> {credentials.admin_credentials?.email}</div>
                  <div className={styles.credRow}><Fingerprint size={11} /> <strong>{credentials.admin_credentials?.password}</strong></div>
                </div>
              ) : (
                <>
                  <div className={styles.credBox}>
                    <p className={styles.credBoxTitle}>Parent Login</p>
                    <div className={styles.credRow}><Mail size={11} /> {credentials.parent_credentials?.email}</div>
                    <div className={styles.credRow}><Fingerprint size={11} /> <strong>{credentials.parent_credentials?.password}</strong></div>
                  </div>
                  <div className={styles.credBox}>
                    <p className={styles.credBoxTitle}>Child ({credentials.child_credentials?.name})</p>
                    <div className={styles.credRow}><Mail size={11} /> {credentials.child_credentials?.email}</div>
                    <div className={styles.credRow}><Fingerprint size={11} /> <strong>{credentials.child_credentials?.password}</strong></div>
                  </div>
                </>
              )}
            </div>
            <button 
              className={styles.credCopyBtn} 
              onClick={() => { 
                const text = credentials.school_code
                  ? `School Code: ${credentials.school_code}\nAdmin Email: ${credentials.admin_credentials?.email}\nPassword: ${credentials.admin_credentials?.password}`
                  : `Parent Email: ${credentials.parent_credentials?.email}\nPassword: ${credentials.parent_credentials?.password}\nChild Email: ${credentials.child_credentials?.email}\nPassword: ${credentials.child_credentials?.password}`;
                navigator.clipboard.writeText(text); 
                setFeedback({ msg: 'Copied!', type: 'success' }); 
              }}
            >
              📋 Copy All Details
            </button>
            <button className={styles.credDismiss} onClick={() => { setCredentials(null); setFeedback(null); }}>Dismiss</button>
          </div>
        )}

        {isLoading ? (
          <div className={styles.stateWrap}><Loader2 size={28} className={styles.spinner} /><p>Loading registrations...</p></div>
        ) : filtered.length === 0 ? (
          <div className={styles.stateWrap}>
            <div className={styles.stateIcon}>{filter === 'pending' ? <Hourglass size={28} /> : filter === 'approved' ? <BadgeCheck size={28} /> : <BadgeX size={28} />}</div>
            <p className={styles.stateTitle}>No {filter} registrations</p>
            <p className={styles.stateSub}>All clear here!</p>
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((reg: any, idx: number) => {
              const initials = reg.is_school 
                ? reg.school_name?.slice(0, 2).toUpperCase() 
                : reg.parent_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '?';
              return (
                <motion.div
                  key={reg.id} className={styles.card}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                  onClick={() => setDetailId(reg.id)} whileTap={{ scale: 0.98 }}
                >
                  <div className={`${styles.cardBar} ${reg.status === 'approved' ? styles.cardBarApproved : reg.status === 'rejected' ? styles.cardBarRejected : ''}`} />
                  <div className={styles.cardMain}>
                    <div className={styles.cardTop}>
                      <div className={styles.cardAvatar} style={{ background: reg.is_school ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : reg.status === 'approved' ? 'linear-gradient(135deg,#16a34a,#22c55e)' : reg.status === 'rejected' ? 'linear-gradient(135deg,#dc2626,#ef4444)' : 'linear-gradient(135deg,#12312f,#1a4a47)' }}>{initials}</div>
                      <div className={styles.cardTopInfo}>
                        <p className={styles.cardName}>{reg.parent_name} {reg.is_school && <span className={styles.gradeTag} style={{ background: '#e0e7ff', color: '#4f46e5', fontWeight: 800 }}>School Admin</span>}</p>
                        <div className={styles.cardStatus}>
                          <span className={`${styles.statusDot} ${statusConfig[reg.status]?.dot}`} />
                          <span style={{ color: statusConfig[reg.status]?.color }}>{statusConfig[reg.status]?.label}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className={styles.cardChevron} />
                    </div>
                    <div className={styles.cardPills}>
                      <span className={styles.pill}><Mail size={10} /> {reg.parent_email}</span>
                      {reg.parent_phone && <span className={styles.pill}><Phone size={10} /> {reg.parent_phone}</span>}
                    </div>
                    <div className={styles.cardBottom}>
                      {reg.is_school ? (
                        <div className={styles.cardChild}>
                          <Building2 size={11} />
                          <span>{reg.school_name}</span>
                          {reg.board_name && <span className={styles.gradeTag}>{reg.board_name}</span>}
                          {reg.city && <span className={styles.gradeTag}>{reg.city}</span>}
                        </div>
                      ) : (
                        <div className={styles.cardChild}>
                          <GraduationCap size={11} />
                          <span>{reg.child_name}</span>
                          {reg.grade && <span className={styles.gradeTag}>{reg.grade}</span>}
                        </div>
                      )}
                      <span className={styles.cardDate}><CalendarDays size={10} />{new Date(reg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {filter === 'rejected' && reg.rejection_reason && <div className={styles.rejectReason}>✕ {reg.rejection_reason}</div>}
                    {filter === 'pending' && (
                      <div className={styles.cardActions} onClick={e => e.stopPropagation()}>
                        <button className={styles.actionApprove} onClick={() => handleApprove(reg)}><CheckCircle2 size={14} /> Approve</button>
                        <button className={styles.actionReject} onClick={() => handleReject(reg)}><XCircle size={14} /> Reject</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirmModal && (
        <>
          <div className={styles.overlay} onClick={() => setConfirmModal(null)} />
          <div className={styles.modal}>
            <div className={styles.modalHandle} />
            <div className={styles.modalTop}>
              <div className={confirmModal.type === 'approve' ? styles.modalIconApprove : styles.modalIconReject}>
                {confirmModal.type === 'approve' ? <ShieldCheck size={24} /> : <Ban size={24} />}
              </div>
              <h3 className={styles.modalTitle}>{confirmModal.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}</h3>
              <p className={styles.modalDesc}>
                {confirmModal.type === 'approve'
                  ? confirmModal.isSchool 
                    ? `Onboard and authorize ${confirmModal.extraInfo} with Admin credentials for ${confirmModal.name}.`
                    : `Create accounts for ${confirmModal.name} (parent) and ${confirmModal.extraInfo} (student).`
                  : `Reject ${confirmModal.name}'s registration request for ${confirmModal.extraInfo}.`}
              </p>
            </div>
            {confirmModal.type === 'reject' && (
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Rejection Reason</label>
                <textarea className={styles.modalTextarea} placeholder="Enter reason..." value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} rows={3} />
              </div>
            )}
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setConfirmModal(null)}>Cancel</button>
              <button className={confirmModal.type === 'approve' ? styles.modalBtnApprove : styles.modalBtnReject} onClick={confirmAction}
                disabled={approveMutation.isPending || rejectMutation.isPending}>
                {(approveMutation.isPending || rejectMutation.isPending) ? 'Processing...' : confirmModal.type === 'approve' ? 'Yes, Approve' : 'Yes, Reject'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {detailModal && (
        <>
          <div className={styles.overlay} onClick={() => setDetailId(null)} />
          <div className={styles.detailModal}>
            <div className={styles.detailHandle} />
            <button className={styles.detailClose} onClick={() => setDetailId(null)}><X size={18} /></button>
            <div className={styles.detailHead}>
              <div className={styles.detailAvatar} style={{ background: detailModal.is_school ? '#4f46e5' : '#12312f' }}>
                {detailModal.is_school ? detailModal.school_name?.charAt(0).toUpperCase() : detailModal.parent_name?.charAt(0).toUpperCase()}
              </div>
              <div className={styles.detailHeadInfo}>
                <h2 className={styles.detailName}>{detailModal.is_school ? detailModal.school_name : detailModal.parent_name}</h2>
                <span className={styles.detailStatusBadge} style={{ background: statusConfig[detailModal.status]?.bg, color: statusConfig[detailModal.status]?.color }}>
                  <span className={`${styles.statusDot} ${statusConfig[detailModal.status]?.dot}`} /> {statusConfig[detailModal.status]?.label}
                </span>
              </div>
            </div>
            <div className={styles.detailBody}>
              <div className={styles.detailGroup}>
                <div className={styles.detailGroupTitle}>
                  {detailModal.is_school ? <Building size={13} /> : <User size={13} />} 
                  {detailModal.is_school ? ' Administrator' : ' Parent'}
                </div>
                <div className={styles.detailGroupContent}>
                  <div className={styles.detailItem}><span className={styles.detailLabel}>Contact Name</span><span className={styles.detailValue}>{detailModal.parent_name}</span></div>
                  <div className={styles.detailItem}><span className={styles.detailLabel}>Email</span><span className={styles.detailValue}>{detailModal.parent_email}</span></div>
                  {detailModal.parent_phone && <div className={styles.detailItem}><span className={styles.detailLabel}>Phone</span><span className={styles.detailValue}>{detailModal.parent_phone}</span></div>}
                </div>
              </div>
              
              {detailModal.is_school ? (
                <div className={styles.detailGroup}>
                  <div className={styles.detailGroupTitle}><Building2 size={13} /> Institution Parameters</div>
                  <div className={styles.detailGroupContent}>
                    {detailModal.board_name && <div className={styles.detailItem}><span className={styles.detailLabel}>Board / Syllabus</span><span className={styles.detailValue}>{detailModal.board_name}</span></div>}
                    {detailModal.city && <div className={styles.detailItem}><span className={styles.detailLabel}>City</span><span className={styles.detailValue}>{detailModal.city}</span></div>}
                    {detailModal.address && <div className={styles.detailItem}><span className={styles.detailLabel}>Address</span><span className={styles.detailValue}>{detailModal.address}</span></div>}
                  </div>
                </div>
              ) : (
                <div className={styles.detailGroup}>
                  <div className={styles.detailGroupTitle}><GraduationCap size={13} /> Child</div>
                  <div className={styles.detailGroupContent}>
                    <div className={styles.detailItem}><span className={styles.detailLabel}>Name</span><span className={styles.detailValue}>{detailModal.child_name}</span></div>
                    {detailModal.grade && <div className={styles.detailItem}><span className={styles.detailLabel}>Grade</span><span className={styles.detailValue}>{detailModal.grade}</span></div>}
                  </div>
                </div>
              )}
              
              <div className={styles.detailGroup}>
                <div className={styles.detailGroupTitle}><CalendarDays size={13} /> Registration Info</div>
                <div className={styles.detailGroupContent}>
                  <div className={styles.detailItem}><span className={styles.detailLabel}>Submitted</span><span className={styles.detailValue}>{new Date(detailModal.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></div>
                </div>
              </div>
            </div>
            {detailModal.status === 'pending' && (
              <div className={styles.detailFoot}>
                <button className={styles.detailApproveBtn} onClick={() => { setDetailId(null); handleApprove(detailModal); }}><CheckCircle2 size={16} /> Approve</button>
                <button className={styles.detailRejectBtn} onClick={() => { setDetailId(null); handleReject(detailModal); }}><XCircle size={16} /> Reject</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
