'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Manrope } from 'next/font/google';
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Crown,
  Timer,
  TrendingUp,
  GraduationCap,
  CreditCard,

  ShieldCheck,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  RefreshCw,
  Bell,
  Wallet,
  BadgeCheck,
  BookOpen,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

type SchoolDetail = {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  plan_type: string;
  plan_name: string;
  plan_type_id: number;
  plan_price: number;
  setup_fee: number;
  discount_percent: number;
  trial_days: number;
  status: string;
  status_name: string;
  plan_status: string;
  plan_status_name: string;
  plan_status_color: string;
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  student_count: number;
  student_limit: number;
  revenue_this_month: number;
  revenue_total: number;
  plan_start_date: string;
  plan_end_date: string;
  days_until_expiry: number;
  features: Record<string, boolean>;
  last_paid_amount: number;
  last_paid_at: string | null;
  last_payment_method: string | null;
  payments: { amount: number; paid_at: string; method: string; status_id: number }[];
  created_at: string;
  updated_at: string;
};

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const locale = 'en';
  const { user, loading: authLoading } = useAuth();

  const { data: school, isLoading } = useQuery({
    queryKey: ['admin', 'schools', 'detail', id],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/admin/schools/${id}`, { credentials: 'include', headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load school');
      return json.data as SchoolDetail;
    },
    enabled: !!id && !!user,
  });

  if (isLoading || authLoading) {
    return (
      <div className={`${styles.shell} ${adminFont.variable}`}>
        <div className={styles.loading}>
          <div className={styles.loader} />
          <p className={styles.loadingText}>Loading school details...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className={`${styles.shell} ${adminFont.variable}`}>
        <div className={styles.emptyState}>
          <Building2 size={40} />
          <p>School not found</p>
          <Link href={`/${locale}/admin/schools`} className={styles.backLink} style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            <ArrowLeft size={14} /> Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = school.plan_type === 'paid' || school.plan_type === 'school';
  const isTrial = school.plan_type === 'trial';
  const planBadgeClass = isPaid ? styles.badgePaid : isTrial ? styles.badgeTrial : styles.badgeFree;

  const statusBadgeClass =
    school.status === 'active' ? styles.badgeActive :
    school.status === 'expired' || school.status === 'trial_expired' ? styles.badgeExpired :
    styles.badgeInactive;

  const expiryPercent = school.days_until_expiry > 0
    ? Math.min(100, (school.days_until_expiry / 365) * 100) : 0;
  const timelineColor = school.days_until_expiry <= 7 ? styles.timelineRed :
    school.days_until_expiry <= 30 ? styles.timelineAmber : styles.timelineGreen;

  const featuresList = [
    { key: 'videos', label: 'Video Lessons' },
    { key: 'quizzes', label: 'Quizzes & Tests' },
    { key: 'activities', label: 'Interactive Activities' },
    { key: 'reports', label: 'Progress Reports' },
    { key: 'ai_tutor', label: 'AI Tutor' },
    { key: 'bulk_import', label: 'Bulk Student Import' },
  ];

  return (
    <div className={`${styles.shell} ${adminFont.variable}`}>
      <div className={styles.bgGlow} />

      <Link href={`/${locale}/admin`} className={styles.backLink}>
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.schoolIcon}>
            <Building2 size={22} />
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.schoolName}>
              {school.name}
              <span className={`${styles.badge} ${planBadgeClass}`}>
                <Crown size={10} /> {school.plan_name}
              </span>
              <span className={`${styles.badge} ${statusBadgeClass}`}>
                <BadgeCheck size={10} /> {school.status_name || school.status}
              </span>
            </h1>
            <div className={styles.schoolMeta}>
              {school.code && <>#{school.code} &middot; </>}
              {school.city && <>{school.city}{school.state ? `, ${school.state}` : ''} &middot; </>}
              {school.student_count} students
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={`${styles.actionBtn} ${styles.actionBtnOutline}`}>
            <RefreshCw size={14} /> Renew
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnOutline}`}>
            <Bell size={14} /> Remind
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
            <Pencil size={14} /> Edit
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconTeal}`}>
            <Users size={18} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Students</div>
            <div className={styles.statValue}>{school.student_count}</div>
            <div className={styles.statSub}>/ {school.student_limit} limit</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconAmber}`}>
            <Timer size={18} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Plan Expiry</div>
            <div className={styles.statValue}>
              {school.days_until_expiry > 0 ? `${school.days_until_expiry} days` : school.days_until_expiry === 0 ? 'Today' : 'Expired'}
            </div>
            <div className={styles.statSub}>
              {school.plan_end_date ? new Date(school.plan_end_date).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
            <Wallet size={18} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Plan Price</div>
            <div className={styles.statValue}>₹{(school.plan_price || 0).toLocaleString('en-IN')}/mo</div>
            <div className={styles.statSub}>{isPaid ? 'Paid Plan' : isTrial ? `${school.trial_days}-day Trial` : 'Free'}</div>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className={styles.detailGrid}>
        {/* Left: Contact + Plan + Features */}
        <div>
          {/* Contact */}
          <div className={styles.card} style={{ marginBottom: '1.25rem' }}>
            <div className={styles.cardHdr}>
              <h3><Building2 size={14} /> Contact Information</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Mail size={12} color="#94a3b8" /> {school.email || '—'}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={12} color="#94a3b8" /> {school.phone || '—'}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Address</div>
                  <div className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={12} color="#94a3b8" /> {school.address || '—'}{school.city ? `, ${school.city}` : ''}{school.state ? `, ${school.state}` : ''}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Pincode</div>
                  <div className={styles.infoValue}>{school.pincode || '—'}</div>
                </div>
                {school.website && (
                  <div className={styles.infoItem} style={{ gridColumn: '1 / -1' }}>
                    <div className={styles.infoLabel}>Website</div>
                    <div className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Globe size={12} color="#94a3b8" /> {school.website}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plan & Billing */}
          <div className={styles.card}>
            <div className={styles.cardHdr}>
              <h3><CreditCard size={14} /> Plan & Billing</h3>
              <span className={`${styles.badge} ${planBadgeClass}`}>
                <Crown size={10} /> {school.plan_name} — ₹{school.plan_price.toLocaleString('en-IN')}/mo
              </span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.planTimeline}>
                <div className={styles.timelineBar}>
                  <div className={`${styles.timelineFill} ${timelineColor}`} style={{ width: `${expiryPercent}%` }} />
                </div>
                <div className={styles.timelineDates}>
                  <span>Started: {school.plan_start_date ? new Date(school.plan_start_date).toLocaleDateString() : 'N/A'}</span>
                  <span>Expires: {school.plan_end_date ? new Date(school.plan_end_date).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>

              <div className={styles.infoGrid} style={{ marginTop: '1rem' }}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Setup Fee</div>
                  <div className={styles.infoValue}>₹{(school.setup_fee || 0).toLocaleString('en-IN')}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Discount</div>
                  <div className={styles.infoValue}>{school.discount_percent || 0}%</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Last Payment</div>
                  <div className={styles.infoValue}>
                    {school.last_paid_at
                      ? `₹${(school.last_paid_amount || 0).toLocaleString('en-IN')} (${new Date(school.last_paid_at).toLocaleDateString()})`
                      : 'No payments yet'}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>Payment Method</div>
                  <div className={styles.infoValue}>{school.last_payment_method || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className={styles.card} style={{ marginTop: '1.25rem' }}>
            <div className={styles.cardHdr}>
              <h3><ShieldCheck size={14} /> Enabled Features</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.featuresGrid}>
                {featuresList.map(f => {
                  const enabled = !!school.features?.[f.key];
                  return (
                    <div key={f.key} className={`${styles.featureItem} ${enabled ? styles.featureOn : styles.featureOff}`}>
                      {enabled ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {f.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Admin + Payments */}
        <div>
          {/* School Admin */}
          <div className={styles.card} style={{ marginBottom: '1.25rem' }}>
            <div className={styles.cardHdr}>
              <h3><User size={14} /> School Admin</h3>
            </div>
            <div className={styles.cardBody}>
              {school.admin_name ? (
                <>
                  <div className={styles.adminCard}>
                    <div className={styles.adminAvatar}>
                      {school.admin_name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.adminInfo}>
                      <div className={styles.adminName}>{school.admin_name}</div>
                      <div className={styles.adminMeta}>
                        <Mail size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.2rem' }} />
                        {school.admin_email}
                      </div>
                      {school.admin_phone && (
                        <div className={styles.adminMeta}>
                          <Phone size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.2rem' }} />
                          {school.admin_phone}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.emptyState}>
                  <User size={24} />
                  <p>No admin assigned</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className={styles.card}>
            <div className={styles.cardHdr}>
              <h3><Wallet size={14} /> Payment History</h3>
              {school.payments?.length > 0 && (
                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8' }}>
                  Last {school.payments.length}
                </span>
              )}
            </div>
            <div className={styles.cardBody}>
              {school.payments && school.payments.length > 0 ? (
                school.payments.map((p, i) => (
                  <div key={i} className={styles.paymentItem}>
                    <div className={styles.paymentInfo}>
                      <div className={styles.paymentAmount}>
                        ₹{(p.amount || 0).toLocaleString('en-IN')}
                      </div>
                      <div className={styles.paymentMeta}>
                        {p.paid_at ? new Date(p.paid_at).toLocaleDateString() : 'Pending'}
                      </div>
                    </div>
                    <div className={styles.paymentMethod}>
                      {p.method || (p.status_id === 2 ? 'Verified' : 'Pending')}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Wallet size={24} />
                  <p>No payment history</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card} style={{ marginTop: '1.25rem' }}>
            <div className={styles.cardHdr}>
              <h3><TrendingUp size={14} /> Quick Actions</h3>
            </div>
            <div className={styles.cardBody}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href={`/${locale}/admin/schools/${id}/students`} className={`${styles.actionBtn} ${styles.actionBtnOutline}`} style={{ width: '100%', justifyContent: 'center' }}>
                  <GraduationCap size={14} /> View Students ({school.student_count})
                </Link>
                <a href={`mailto:${school.admin_email || school.email}`} className={`${styles.actionBtn} ${styles.actionBtnOutline}`} style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                  <Mail size={14} /> Contact Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}