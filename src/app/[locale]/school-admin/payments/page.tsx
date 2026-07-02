'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Manrope } from 'next/font/google';
import {
  CreditCard,
  Users,
  Shield,
  Clock,
  Zap,
  Video,
  BarChart3,
  Bot,
  Upload,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Wallet,
  AlertTriangle,
  Building2,
  PiggyBank,
  Sparkles,
  Crown,
  ArrowUpRight,
  Info,
  Timer,
  AlertOctagon,
  FileText,
  Printer,
  Download,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSchoolPayments, usePlansConfig } from '@/hooks/useSchoolPayments';
import type { PaymentsData, PlanItem } from '@/hooks/useSchoolPayments';
import UpgradeModal from '../_components/UpgradeModal';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

// Plans fetched from API. Fallback in usePlansConfig if backend unreachable.
// Edit prices/features in backend/src/config/plans.ts

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const ITEM = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function Badge({ status }: { status: string | null }) {
  if (!status) return null;
  const m: Record<string, { bg: string; fg: string }> = {
    active: { bg: '#dcfce7', fg: '#166534' },
    expired: { bg: '#fef2f2', fg: '#991b1b' },
    pending: { bg: '#fef3c7', fg: '#92400e' },
    cancelled: { bg: '#f1f5f9', fg: '#475569' },
  };
  const c = m[status] || { bg: '#f1f5f9', fg: '#475569' };
  return (
    <span className={styles.badge} style={{ background: c.bg, color: c.fg }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function CountdownTimer({ expiresAt, serverTime }: { expiresAt: string; serverTime: string }) {
  const offsetRef = useRef(Date.now() - new Date(serverTime).getTime());
  const calc = useCallback(() => {
    const remaining = new Date(expiresAt).getTime() - (Date.now() - offsetRef.current);
    if (remaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    const totalSec = Math.floor(remaining / 1000);
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
      expired: false,
    };
  }, [expiresAt]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  if (time.expired) {
    return <div className={styles.countdownExpired}>Plan Expired</div>;
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownBlock}>
        <span className={styles.countdownNum}>{String(time.days).padStart(2, '0')}</span>
        <span className={styles.countdownLbl}>Days</span>
      </div>
      <span className={styles.countdownSep}>:</span>
      <div className={styles.countdownBlock}>
        <span className={styles.countdownNum}>{String(time.hours).padStart(2, '0')}</span>
        <span className={styles.countdownLbl}>Hrs</span>
      </div>
      <span className={styles.countdownSep}>:</span>
      <div className={styles.countdownBlock}>
        <span className={styles.countdownNum}>{String(time.minutes).padStart(2, '0')}</span>
        <span className={styles.countdownLbl}>Min</span>
      </div>
      <span className={styles.countdownSep}>:</span>
      <div className={styles.countdownBlock}>
        <span className={styles.countdownNum}>{String(time.seconds).padStart(2, '0')}</span>
        <span className={styles.countdownLbl}>Sec</span>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, isError } = useSchoolPayments();
  const plans = usePlansConfig();
  const d = data as PaymentsData | undefined;
  const sub = d?.subscription;
  const usage = d?.usage;
  const revenue = d?.revenue;
  const transactions = d?.transactions || [];
  const serverTime = d?.server_time;
  const expired = sub?.plan_status === 'expired';
  const searchParams = useSearchParams();
  const isTrialExpiredRedirect = searchParams?.get('trial_expired') === '1';

  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const currentPlanPrice = sub && sub.plan_price > 0
    ? `₹${Number(sub.plan_price).toLocaleString('en-IN')}`
    : '₹0';

  const enabledCount = sub ? Object.values(sub.features).filter(Boolean).length : 0;
  const activeFeatures = sub ? Object.entries(sub.features).filter(([, v]) => v).map(([k]) => k) : [];

  const [localExpired, setLocalExpired] = useState(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    const expires = sub?.plan_expires_at;
    if (!expires || !serverTime) return;
    offsetRef.current = Date.now() - new Date(serverTime).getTime();
    const check = () => {
      const remaining = new Date(expires).getTime() - (Date.now() - offsetRef.current);
      if (remaining <= 0) setLocalExpired(true);
    };
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, [sub?.plan_expires_at, serverTime]);

  const isExpired = expired || localExpired;

  const [upgradeTarget, setUpgradeTarget] = useState<PlanItem | null>(null);

  const currentPlanTier = plans.find(p => p.type === sub?.plan_type) || plans[0];

  const kpis = [
    { label: 'Monthly Revenue', value: `₹${Number(revenue?.this_month || 0).toLocaleString('en-IN')}`, icon: TrendingUp, change: 'Current month' },
    { label: 'Total Revenue', value: `₹${Number(revenue?.total || 0).toLocaleString('en-IN')}`, icon: Wallet, change: 'All time' },
    { label: 'Student Capacity', value: `${usage?.current_students ?? 0} / ${usage?.max_students ?? 0}`, icon: Users, change: `${usage?.usage_percent ?? 0}% utilised` },
    { label: 'Active Features', value: `${enabledCount} / 6`, icon: Shield, change: `${enabledCount} of 6 enabled` },
  ];

  const isReallyLoading = isLoading || authLoading || (!data && !isError && !!user?.schoolId);

  if (isReallyLoading) {
    return (
      <div className={`${styles.shell} ${adminFont.variable}`}>
        <div className={styles.loading}>
          <div className={styles.loader} />
          <p className={styles.loadingText}>Loading plan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.shell} ${adminFont.variable}`}>
      <div className={styles.bgGlow} />
      <div className={styles.content}>

        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Plan & Billing</h1>
            <p className={styles.subtitle}>Your current plan, usage, and upgrade options</p>
          </div>
          {sub && (
            <div className={styles.headerRight}>
              <div className={styles.schoolBadge}>
                <Building2 size={15} />
                {sub.plan_type_name || 'School'} Plan
              </div>
            </div>
          )}
        </header>

        {!sub && !isLoading && (
          <div className={styles.prompt}>
            <div className={styles.promptIcon}><CreditCard size={28} /></div>
            <p>No plan data available yet</p>
          </div>
        )}

        {sub && (
          <motion.div variants={CONTAINER} initial="hidden" animate="show">


            {/* Trial expired redirect banner */}
            {isTrialExpiredRedirect && (
              <motion.div className={`${styles.alert} ${styles.alertRed}`} variants={ITEM} style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(185,28,28,0.05))', border: '1.5px solid rgba(220,38,38,0.25)', borderRadius: '0.85rem', padding: '1rem 1.25rem', marginBottom: '0.5rem' }}>
                <AlertOctagon size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 900, color: '#991b1b', fontSize: '0.82rem' }}>Your 7-Day Free Trial Has Ended</p>
                  <p style={{ margin: '0.2rem 0 0', fontWeight: 600, color: '#b91c1c', fontSize: '0.75rem', lineHeight: 1.4 }}>Please choose a plan below to continue accessing the school portal. Your data is safe and will be restored on upgrade.</p>
                </div>
              </motion.div>
            )}

            {/* Existing expired alert */}
            {isExpired && (
              <motion.div className={`${styles.alert} ${styles.alertRed}`} variants={ITEM}>
                <AlertOctagon size={16} />
                <span>Your plan has expired. Choose a plan below to restore access.</span>
              </motion.div>
            )}

            {/* Current Plan — with countdown */}
            <motion.div className={`${styles.currentCard} ${isExpired ? styles.currentExpired : ''}`} variants={ITEM}>
              {isExpired && <div className={styles.currentOverlay} />}
              <div className={styles.currentBg} />
              <div className={styles.currentGrid}>
                <div className={styles.currentLeft}>
                  <div className={styles.currentLabel}>Current Plan</div>
                  <div className={styles.currentName}>{sub.plan_type_name || 'School'} Plan</div>
                  <div className={styles.currentPriceRow}>
                    <span className={styles.currentPrice}>{currentPlanPrice}</span>
                    <span className={styles.currentPeriod}>/ month</span>
                  </div>
                  <div className={styles.currentMeta}>
                    <Badge status={isExpired ? 'expired' : sub.plan_status} />
                  </div>
                  <div className={styles.currentPills}>
                    {sub.discount_percent > 0 && <span className={styles.pill}>{sub.discount_percent}% discount</span>}
                    {sub.setup_fee > 0 && <span className={styles.pill}>₹{Number(sub.setup_fee).toLocaleString('en-IN')} setup fee</span>}
                    {sub.trial_days > 0 && <span className={styles.pill}>{sub.trial_days}-day trial</span>}
                  </div>
                </div>
                <div className={styles.currentRight}>
                  {sub.plan_expires_at && serverTime && !isExpired && (
                    <div className={styles.countdownCard}>
                      <div className={styles.countdownHeader}>
                        <Timer size={13} />
                        <span>Time Remaining</span>
                      </div>
                      <CountdownTimer expiresAt={sub.plan_expires_at} serverTime={serverTime} />
                    </div>
                  )}
                  {isExpired && (
                    <div className={styles.countdownCard}>
                      <div className={styles.countdownHeader}>
                        <AlertOctagon size={13} />
                        <span>Plan Expired</span>
                      </div>
                      <div className={styles.countdownExpiredBlock}>
                        <span className={styles.countdownExpiredIcon}>⏰</span>
                        <span className={styles.countdownExpiredText}>Access restricted</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Plan Selection */}
            <section className={styles.plansSection}>
              <div className={styles.plansHeader}>
                <Sparkles size={16} color="#12312f" />
                <h3>Available Plans</h3>
              </div>
              <div className={styles.plansGrid}>
                {plans.map((plan) => {
                  const isCurrent = plan.type === sub.plan_type;
                  const isUpgrade = plans.findIndex((p) => p.type === plan.type) > plans.findIndex((p) => p.type === sub.plan_type);
                  return (
                    <motion.div key={plan.type} className={`${styles.planCard} ${isCurrent ? styles.planCurrent : ''}`} variants={ITEM}>
                      {isCurrent && <span className={styles.planCurrentBadge}>Current Plan</span>}
                      <div className={styles.planCardTop}>
                        <Crown size={18} color={isCurrent ? '#12312f' : '#94a3b8'} />
                        <div className={styles.planCardName}>{plan.name}</div>
                        <div className={styles.planCardPrice}>
                          {plan.price}
                          <span className={styles.planCardPeriod}>{plan.period}</span>
                        </div>
                        <p className={styles.planCardDesc}>{plan.desc}</p>
                      </div>
                      <div className={styles.planCardFeatures}>
                        {plans.flatMap((t) => t.features).filter((f, i, arr) => arr.findIndex((x) => x.key === f.key) === i).map((f) => {
                          const has = isCurrent ? activeFeatures.includes(f.key) : plan.features.some((pf) => pf.key === f.key);
                          return (
                            <div key={f.key} className={`${styles.planFeat} ${!has ? styles.planFeatOff : ''}`}>
                              {has ? <CheckCircle2 size={12} color="#22c55e" /> : <XCircle size={12} color="#cbd5e1" />}
                              {f.label}
                            </div>
                          );
                        })}
                      </div>
                      {!isCurrent && (
                        <button
                          className={`${styles.planCta} ${isUpgrade ? styles.planCtaUp : styles.planCtaDown}`}
                          onClick={() => setUpgradeTarget(plan)}
                        >
                          {isUpgrade ? 'Upgrade' : 'Downgrade'}
                          <ArrowUpRight size={13} />
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* KPI Grid */}
            <section className={styles.kpiGrid}>
              {kpis.map((k, i) => (
                <motion.div key={k.label} variants={ITEM} className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <div className={styles.kpiIcon}><k.icon size={17} /></div>
                    <span className={styles.kpiChange}>{k.change}</span>
                  </div>
                  <p className={styles.kpiLabel}>{k.label}</p>
                  <h2 className={styles.kpiValue}>{k.value}</h2>
                </motion.div>
              ))}
            </section>

            {/* Usage */}
            {usage && (
              <motion.div className={styles.card} variants={ITEM}>
                <div className={styles.cardHdr}>
                  <Users size={16} color="#12312f" />
                  <h3>Usage</h3>
                </div>
                <div className={styles.progRow}>
                  <div className={styles.progLbl}>
                    <span>Students enrolled</span>
                    <span>{usage.current_students} / {usage.max_students}</span>
                  </div>
                  <div className={styles.progTrack}>
                    <div className={styles.progFill} style={{
                      width: `${Math.min(usage.usage_percent, 100)}%`,
                      background: usage.usage_percent > 100
                        ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                        : usage.usage_percent > 80
                          ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                          : 'linear-gradient(90deg, #22c55e, #16a34a)',
                    }} />
                  </div>
                  {usage.usage_percent > 100 && (
                    <div className={styles.progWarn}>
                      <AlertTriangle size={12} /> Exceeds limit by {usage.current_students - usage.max_students} students
                    </div>
                  )}
                </div>
                {usage.current_students > 0 && sub && sub.plan_price > 0 && (
                  <div className={styles.costRow}>
                    <PiggyBank size={13} color="#64748b" />
                    <span>₹{(sub.plan_price / usage.current_students).toFixed(2)} / student / month</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Timeline + Features */}
            <TimelineCard sub={sub} expired={isExpired} serverTime={serverTime} />
            <FeaturesCard plans={plans} activeFeatures={activeFeatures} enabledCount={enabledCount} />
            <InvoicesCard transactions={transactions} onViewInvoice={(t) => setSelectedInvoice(t)} />

          </motion.div>
        )}

      </div>

      {/* Upgrade Modal */}
      {sub && upgradeTarget && (
        <UpgradeModal
          open={!!upgradeTarget}
          onClose={() => setUpgradeTarget(null)}
          targetPlan={upgradeTarget}
          currentPlan={currentPlanTier}
          currentSub={sub}
        />
      )}

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        transaction={selectedInvoice}
        schoolName={user?.name || 'Partner School'}
      />
    </div>
  );
}

function TimelineCard({ sub, expired: isExpired, serverTime }: {
  sub: NonNullable<PaymentsData['subscription']>;
  expired: boolean;
  serverTime?: string;
}) {
  const entries = useMemo(() => {
    const e: { label: string; date: string }[] = [];
    if (sub.plan_started_at) {
      e.push({
        label: `${sub.plan_type_name || 'Current'} plan started`,
        date: new Date(sub.plan_started_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
    }
    if (sub.plan_expires_at && !isExpired) {
      e.push({
        label: 'Plan renewal',
        date: new Date(sub.plan_expires_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
    }
    e.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return e;
  }, [sub, isExpired]);

  return (
    <motion.div className={styles.card} variants={ITEM}>
      <div className={styles.cardHdr}>
        <Clock size={16} color="#12312f" />
        <h3>Timeline</h3>
      </div>
      {entries.length === 0 ? (
        <p className={styles.emptySmall}>No timeline events</p>
      ) : (
        <div className={styles.tl}>
          {entries.map((e, i) => (
            <div key={i} className={styles.tlItem}>
              <div className={styles.tlDot} />
              {i < entries.length - 1 && <div className={styles.tlLine} />}
              <div className={styles.tlBody}>
                <span className={styles.tlDate}>{e.date}</span>
                <span className={styles.tlLabel}>{e.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function FeaturesCard({ plans, activeFeatures, enabledCount }: { plans: PlanItem[]; activeFeatures: string[]; enabledCount: number }) {
  const allFeatures = plans.flatMap((t) => t.features)
    .filter((f, i, arr) => arr.findIndex((x) => x.key === f.key) === i);

  return (
    <motion.div className={styles.card} variants={ITEM}>
      <div className={styles.cardHdr}>
        <Shield size={16} color="#12312f" />
        <h3>Features</h3>
        <span className={styles.cardBadge}>{enabledCount} / 6</span>
      </div>
      <div className={styles.fList}>
        {allFeatures.map((f) => {
          const on = activeFeatures.includes(f.key);
          return (
            <div key={f.key} className={`${styles.fItem} ${!on ? styles.fOff : ''}`}>
              <div className={styles.fIcon} style={{ background: on ? '#dbeafe' : '#f1f5f9' }}>
                {on ? <CheckCircle2 size={13} color="#2563eb" /> : <XCircle size={13} color="#94a3b8" />}
              </div>
              <span className={styles.fLabel}>{f.label}</span>
              {on && <Info size={12} color="#94a3b8" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function InvoicesCard({ transactions, onViewInvoice }: { transactions: any[]; onViewInvoice: (t: any) => void }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const displayId = `INV-${new Date(t.created_at).toISOString().slice(0, 10).replace(/-/g, '')}-${t.id.slice(0, 4).toUpperCase()}`;
      const matchesSearch = 
        displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.plan_name_snapshot || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.gateway_payment_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        (t.payment_status_name || '').toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  return (
    <motion.div className={styles.card} variants={ITEM}>
      <div className={styles.cardHdr} style={{ marginBottom: '1rem' }}>
        <FileText size={16} color="#12312f" />
        <h3 style={{ flex: 1 }}>Billing & Invoice History</h3>
        <span className={styles.cardBadge}>{filteredTransactions.length} filtered / {transactions.length} total</span>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by Invoice ID, Plan, or Ref ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '15rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            fontSize: '0.72rem',
            fontWeight: 800,
            background: 'rgba(255, 255, 255, 0.9)',
            outline: 'none',
            color: '#0f172a'
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            fontSize: '0.72rem',
            fontWeight: 850,
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#334155',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="all">All Statuses</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className={styles.emptySmall}>No matching billing records found</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Invoice ID</th>
                <th className={styles.th}>Plan</th>
                <th className={styles.th}>Amount</th>
                <th className={styles.th}>Method</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => {
                const formattedDate = t.paid_at 
                  ? new Date(t.paid_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                  : new Date(t.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                const displayId = `INV-${new Date(t.created_at).toISOString().slice(0, 10).replace(/-/g, '')}-${t.id.slice(0, 4).toUpperCase()}`;
                return (
                  <tr key={t.id} className={styles.tr}>
                    <td className={styles.td}>{formattedDate}</td>
                    <td className={styles.td}>{displayId}</td>
                    <td className={styles.td}>{t.plan_name_snapshot || 'Standard Upgrade'}</td>
                    <td className={styles.td}>₹{Number(t.amount).toLocaleString('en-IN')}.00</td>
                    <td className={styles.td}>{t.payment_method || 'Online'}</td>
                    <td className={styles.td}>
                      <span className={styles.badge} style={{ background: t.payment_status_color || '#dcfce7', color: '#166534' }}>
                        {t.payment_status_name || 'Success'}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <button className={styles.invoiceBtn} onClick={() => onViewInvoice(t)}>
                        <FileText size={12} />
                        View Invoice
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

interface InvoiceDetailModalProps {
  open: boolean;
  onClose: () => void;
  transaction: any;
  schoolName: string;
}

function InvoiceDetailModal({ open, onClose, transaction, schoolName }: InvoiceDetailModalProps) {
  if (!open || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = transaction.paid_at 
    ? new Date(transaction.paid_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    : new Date(transaction.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  const invoiceNumber = `INV-${new Date(transaction.created_at).toISOString().slice(0, 10).replace(/-/g, '')}-${transaction.id.slice(0, 4).toUpperCase()}`;

  const basePrice = Math.round(Number(transaction.amount) / 1.18);
  const gst = Number(transaction.amount) - basePrice;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalPanel}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Tax Invoice / Receipt</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <XCircle size={18} />
          </button>
        </div>
        <div className={styles.invoiceContainer}>
          <div className={styles.invoicePaper}>
            <div className={styles.invoiceTop}>
              <div>
                <h4 className={styles.logoTitle}>Agaran AI Learning Portal</h4>
                <div className={styles.logoSub}>Modern Digital Schooling System</div>
              </div>
              <div className={styles.invoiceMeta}>
                <div className={styles.invoiceNum}>{invoiceNumber}</div>
                <div className={styles.invoiceDate}>Date: {formattedDate}</div>
              </div>
            </div>
            
            <div className={styles.invoiceAddresses}>
              <div className={styles.addressCol}>
                <div className={styles.addressTitle}>Billed From</div>
                <div className={styles.orgName}>Agaran AI Technologies</div>
                <div className={styles.addressDetail}>12, Gandhi Salai, T. Nagar</div>
                <div className={styles.addressDetail}>Chennai, Tamil Nadu - 600017</div>
                <div className={styles.addressDetail}>GSTIN: 33AAAAA0000A1Z5</div>
              </div>
              <div className={styles.addressCol}>
                <div className={styles.addressTitle}>Billed To</div>
                <div className={styles.orgName}>{schoolName}</div>
                <div className={styles.addressDetail}>School Administrator Portal</div>
                <div className={styles.addressDetail}>Registered Partner School</div>
              </div>
            </div>

            <table className={styles.invoiceItems}>
              <thead>
                <tr>
                  <th className={styles.itemTh} style={{ textAlign: 'left' }}>Description</th>
                  <th className={styles.itemTh} style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.itemTd}>
                    <div>{transaction.plan_name_snapshot || 'Standard Upgrade'}</div>
                    <div style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '0.1rem' }}>
                      Premium school platform subscription access.
                    </div>
                  </td>
                  <td className={styles.itemTd} style={{ textAlign: 'right' }}>
                    ₹{basePrice.toLocaleString('en-IN')}.00
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={styles.summarySection}>
              <div className={styles.summaryGrid}>
                <span className={styles.summaryLbl}>Subtotal:</span>
                <span className={styles.summaryVal}>₹{basePrice.toLocaleString('en-IN')}.00</span>
                
                <span className={styles.summaryLbl}>CGST (9%):</span>
                <span className={styles.summaryVal}>₹{Math.round(gst / 2).toLocaleString('en-IN')}.00</span>
                
                <span className={styles.summaryLbl}>SGST (9%):</span>
                <span className={styles.summaryVal}>₹{Math.round(gst / 2).toLocaleString('en-IN')}.00</span>
                
                <span className={styles.summaryTotalLbl}>Grand Total:</span>
                <span className={styles.summaryTotalVal}>₹{Number(transaction.amount).toLocaleString('en-IN')}.00</span>
              </div>
            </div>

            <div className={styles.invoiceFooter}>
              <p style={{ margin: 0 }}>Thank you for partnering with Agaran AI Learning Portal.</p>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.58rem' }}>This is a system generated e-invoice. No signature required.</p>
            </div>
          </div>
        </div>
        <div className={styles.invoiceModalFooter}>
          <button className={styles.printBtn} onClick={handlePrint}>
            <Printer size={14} />
            Print / Save PDF
          </button>
          <button className={styles.primaryBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

