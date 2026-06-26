'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Manrope } from 'next/font/google';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Mail, Phone, User, Award, Sparkles, CheckCircle2,
  GraduationCap, Building2, Zap, BookOpen, Star, Crown,
  Calendar, Clock, AlertTriangle, Loader2, ChevronRight,
  HelpCircle, Bot, FilePlus, CalendarCheck, TrendingUp,
  Smartphone, Eye, Shield, CheckSquare, X, Users, ShieldCheck,
} from 'lucide-react';
import { parentApi } from '@/core/services/parentApi';
import { parentKeys } from '@/core/constants/queryKeys';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const PLAN_ICONS: Record<string, React.ReactNode> = {
  free: <Zap size={20} />,
  focus: <Star size={20} />,
  premium: <Crown size={20} />,
  ultimate: <Sparkles size={20} />,
};

const PLAN_COLORS: Record<string, string> = {
  free: '#64748b',
  focus: '#2563eb',
  premium: '#7c3aed',
  ultimate: '#d97706',
};

const CATEGORY_LABELS: Record<string, string> = {
  core: 'Core Learning',
  assessment: 'Assessment & Exams',
  fun: 'Fun Zone',
  parent: 'Parent Portal',
  ai: 'AI Features',
  technical: 'Technical',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  core: <Zap size={12} />,
  assessment: <CheckSquare size={12} />,
  fun: <Star size={12} />,
  parent: <BookOpen size={12} />,
  ai: <Bot size={12} />,
  technical: <Shield size={12} />,
};

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  subjects_access: <BookOpen size={13} />,
  unit_tests: <CheckSquare size={13} />,
  games: <Zap size={13} />,
  activities: <Zap size={13} />,
  ai_doubt_solver: <Bot size={13} />,
  ai_worksheet: <FilePlus size={13} />,
  weekly_report: <Mail size={13} />,
  screen_time: <Clock size={13} />,
  performance_alerts: <BellIcon size={13} />,
  ai_planner: <CalendarCheck size={13} />,
  ai_parent_insights: <TrendingUp size={13} />,
  multi_profile: <User size={13} />,
  devices: <Smartphone size={13} />,
  ads: <Eye size={13} />,
  parent_dashboard: <BookOpen size={13} />,
};

function BellIcon(props: { size?: number }) {
  return (
    <svg width={props.size || 13} height={props.size || 13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function formatLimit(limit: unknown): string {
  if (limit === 'unlimited') return '∞';
  if (limit === false) return '—';
  if (limit === true) return '✓';
  if (typeof limit === 'string') return limit;
  return String(limit);
}

function FeatureIcon({ code }: { code: string }) {
  return <>{FEATURE_ICONS[code] || <HelpCircle size={13} />}</>;
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const locale = (params?.locale as string) || 'en';
  const initialTab =
    searchParams.get('tab') === 'plans'
      ? 'plans'
      : searchParams.get('tab') === 'my-plan'
      ? 'my-plan'
      : 'details';

  const { user, refreshUser, loading: authLoading } = useAuth();

  const [activeChildId, setActiveChildId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zhi_parent_active_child_id');
    }
    return null;
  });

  const [activeSubTab, setActiveSubTab] = useState<'details' | 'my-plan' | 'plans'>(initialTab);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [subscribing, setSubscribing] = useState(false);

  // Child Link Modal
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [childName, setChildName] = useState('');
  const [childGradeId, setChildGradeId] = useState('');
  const [childGender, setChildGender] = useState<'boy' | 'girl'>('boy');
  const [childDob, setChildDob] = useState('');
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);
  const [linkAlert, setLinkAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Queries
  const { data: gradesListRaw } = useQuery({
    queryKey: ['public', 'grades'],
    queryFn: async () => {
      const res = await fetch('/api/grades');
      const payload = await res.json();
      return payload.data || [];
    },
    staleTime: 10 * 60 * 1000,
  });
  const gradesList = (gradesListRaw || []) as Array<{ id: string; name: string; age_range?: string }>;

  // Parse age range string like "3-4 years" → { min: 3, max: 4 }
  function parseAgeRange(ageRange?: string): { min: number; max: number } | null {
    if (!ageRange) return null;
    const match = ageRange.match(/(\d+)-(\d+)/);
    if (!match) return null;
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }

  function getChildAgeFromDob(dob: string): number | null {
    if (!dob) return null;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  const selectedGrade = gradesList.find((g) => g.id === childGradeId);
  const selectedGradeAgeRange = selectedGrade ? parseAgeRange(selectedGrade.age_range) : null;
  const currentChildAge = childDob ? getChildAgeFromDob(childDob) : null;

  // Age mismatch check (only warn if both dob and grade selected)
  const ageValidationError: string | null = (() => {
    if (!childDob || !selectedGradeAgeRange || currentChildAge === null) return null;
    const { min, max } = selectedGradeAgeRange;
    if (currentChildAge < min || currentChildAge > max) {
      return `${selectedGrade?.name} requires age ${min}–${max} years. Your child is ${currentChildAge} years old.`;
    }
    return null;
  })();

  const { data: linkReqsRaw, refetch: refetchLinkRequests } = useQuery({
    queryKey: ['parent', 'link-requests'],
    queryFn: () => parentApi.getLinkRequests(),
    enabled: !!user && user.role === 'parent',
    staleTime: 30 * 1000,
  });
  const linkRequests = (linkReqsRaw as any)?.data || [];

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace(`/${locale}/login`);
      } else if (user.role !== 'parent') {
        const route =
          user.role === 'super_admin'
            ? 'admin'
            : user.role === 'school_admin'
            ? 'school-admin'
            : user.role;
        router.replace(`/${locale}/${route}`);
      }
    }
  }, [user, authLoading, router, locale]);

  const { data: meRaw, isLoading: meLoading } = useQuery({
    queryKey: parentKeys.me,
    queryFn: parentApi.me,
    enabled: !!user && user.role === 'parent',
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const parentProfile = (meRaw as any)?.parent ?? null;

  useEffect(() => {
    if (parentProfile) {
      setName(parentProfile.name || '');
      setPhone(parentProfile.phone || '');
    }
  }, [parentProfile]);

  const { data: childrenData, isLoading: childrenLoading } = useQuery({
    queryKey: parentKeys.children,
    queryFn: parentApi.children,
    enabled: !!user && user.role === 'parent',
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const children = childrenData?.children ?? [];

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

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: parentKeys.plans,
    queryFn: () => parentApi.plans(),
    staleTime: 5 * 60_000,
  });

  const { data: subscription, isLoading: subLoading } = useQuery({
    queryKey: parentKeys.subscription,
    queryFn: () => parentApi.subscription(),
    enabled: !!user,
    staleTime: 60_000,
    retry: false,
  });

  // Handlers
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    if (!name.trim()) {
      setAlert({ type: 'error', message: 'Name is required' });
      return;
    }
    setIsSaving(true);
    try {
      const res = await parentApi.updateProfile({ name: name.trim(), phone: phone.trim() });
      if (res?.success) {
        setAlert({ type: 'success', message: 'Profile updated successfully!' });
        await refreshUser();
      } else {
        setAlert({ type: 'error', message: 'Failed to update profile details.' });
      }
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddChildRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkAlert(null);
    if (!childName.trim()) {
      setLinkAlert({ type: 'error', message: 'Student Name is required' });
      return;
    }
    if (!childGradeId) {
      setLinkAlert({ type: 'error', message: 'Please select a Grade level' });
      return;
    }
    // Block submit if DOB provided but age doesn't match selected grade
    if (ageValidationError) {
      setLinkAlert({ type: 'error', message: ageValidationError });
      return;
    }
    setIsSubmittingLink(true);
    try {
      await parentApi.submitLinkRequest({
        name: childName.trim(),
        grade_id: childGradeId,
        gender: childGender,
        dob: childDob || undefined,
      });
      setLinkAlert({ type: 'success', message: 'Request submitted! Admin will review and send approval email.' });
      setChildName('');
      setChildGradeId('');
      setChildDob('');
      refetchLinkRequests();
      setTimeout(() => {
        setShowLinkModal(false);
        setLinkAlert(null);
      }, 2200);
    } catch (err: any) {
      setLinkAlert({ type: 'error', message: err.message || 'Failed to submit registration request' });
    } finally {
      setIsSubmittingLink(false);
    }
  };

  const handleSubscribe = async (planId: number, planName?: string, amount?: number) => {
    setSelectedPlanId(planId);
    setSubscribing(true);
    setAlert(null);
    try {
      if (!amount || amount === 0) {
        await parentApi.subscribe(planId);
        await queryClient.invalidateQueries({ queryKey: parentKeys.subscription });
        setActiveSubTab('my-plan');
        setAlert({ type: 'success', message: 'Free plan activated successfully!' });
        return;
      }
      const orderData = await parentApi.createPaymentOrder(planId, 'monthly');
      await new Promise<void>((resolve, reject) => {
        const loadRazorpay = () =>
          new Promise<void>((res) => {
            if ((window as any).Razorpay) { res(); return; }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => res();
            document.body.appendChild(script);
          });
        loadRazorpay().then(() => {
          const options = {
            key: orderData.key_id,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'Zhi Learning',
            description: `${orderData.plan.name} Plan - Monthly`,
            order_id: orderData.razorpay_order_id,
            prefill: { name: parentProfile?.name || '', email: parentProfile?.email || '' },
            theme: { color: '#12312f' },
            modal: { ondismiss: () => reject(new Error('Payment cancelled by user')) },
            handler: async (response: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }) => {
              try {
                await parentApi.verifyPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
                resolve();
              } catch (verifyErr: any) {
                reject(verifyErr);
              }
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.on('payment.failed', (resp: any) => {
            reject(new Error(resp?.error?.description || 'Payment failed'));
          });
          rzp.open();
        });
      });
      await queryClient.invalidateQueries({ queryKey: parentKeys.subscription });
      setActiveSubTab('my-plan');
      setAlert({ type: 'success', message: `🎉 Payment successful! Welcome to ${orderData.plan.name}!` });
    } catch (err: any) {
      const msg = err.message || 'Payment failed. Please try again.';
      if (msg !== 'Payment cancelled by user') {
        setAlert({ type: 'error', message: msg });
      }
    } finally {
      setSubscribing(false);
      setSelectedPlanId(null);
    }
  };

  const isLoading = authLoading || meLoading || childrenLoading || subLoading;
  const currentPlanId = subscription?.plan_id;
  const initials = (name || 'P').slice(0, 2).toUpperCase();
  const planCode = subscription?.plan?.code || 'free';

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader} />
      </div>
    );
  }

  if (!user || user.role !== 'parent') return null;

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.content}>

        {/* ── HERO BANNER ── */}
        <div className={styles.heroBanner}>
          <button
            type="button"
            className={styles.heroBackBtn}
            onClick={() => router.push(`/${locale}/parent`)}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={16} />
          </button>

          <div className={styles.heroAvatar}>
            {initials}
            <span className={styles.heroAvatarBadge} aria-hidden="true" />
          </div>

          <div className={styles.heroInfo}>
            <h1 className={styles.heroName}>{name || 'Parent'}</h1>
            <p className={styles.heroRole}>Parent Guardian Account</p>
            <div className={styles.heroPillRow}>
              <span className={styles.heroPill}>
                <Mail size={10} />
                {parentProfile?.email || '—'}
              </span>
              <span className={`${styles.heroPill} ${styles.heroPillAccent}`}>
                <ShieldCheck size={10} />
                {subscription?.plan?.name || 'Free Plan'}
              </span>
            </div>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className={styles.kpiStrip}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><Crown size={14} /></div>
            <p className={styles.kpiLabel}>Membership</p>
            <h2 className={styles.kpiValue} style={{ color: '#12312f', textTransform: 'capitalize' }}>
              {subscription?.plan?.name || 'Free'}
            </h2>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><Users size={14} /></div>
            <p className={styles.kpiLabel}>Students</p>
            <h2 className={styles.kpiValue}>
              {children.length}
            </h2>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon}><ShieldCheck size={14} /></div>
            <p className={styles.kpiLabel}>Status</p>
            <h2 className={styles.kpiValue} style={{ color: '#16a34a' }}>Active</h2>
          </div>
        </div>

        {/* ── TAB BAR ── */}
        <div className={styles.tabWrap}>
          <div className={styles.tabBar}>
            {([
              { key: 'details', label: 'Profile & Kids', icon: <User size={13} /> },
              { key: 'my-plan', label: 'Active Plan', icon: <Crown size={13} /> },
              { key: 'plans',   label: 'Upgrades',    icon: <Sparkles size={13} /> },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                type="button"
                id={`profile-tab-${tab.key}`}
                className={`${styles.tabBtn} ${activeSubTab === tab.key ? styles.tabBtnActive : ''}`}
                onClick={() => { setActiveSubTab(tab.key); setAlert(null); }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════ TAB: DETAILS ══════════════ */}
        {activeSubTab === 'details' && (
          <div className={styles.sectionPad}>
            <div className={styles.detailsGrid}>

              {/* Left — Personal Info Edit */}
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={`${styles.cardHeadIcon} ${styles.cardHeadIconGreen}`}>
                    <User size={16} />
                  </span>
                  <h3 className={styles.cardTitle}>Personal Details</h3>
                </div>

                {alert && (
                  <div className={`${styles.alert} ${alert.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                    {alert.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                    <span>{alert.message}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className={styles.formGroup}>
                  <div className={styles.inputWrap}>
                    <label className={styles.label}>Full Name</label>
                    <div className={styles.inputRow}>
                      <User size={14} className={styles.inputIcon} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputWrap}>
                    <label className={styles.label}>Email Address (Linked Account)</label>
                    <div className={styles.inputRow}>
                      <Mail size={14} className={styles.inputIcon} />
                      <input
                        type="email"
                        value={parentProfile?.email || ''}
                        disabled
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.inputWrap}>
                    <label className={styles.label}>Phone Number</label>
                    <div className={styles.inputRow}>
                      <Phone size={14} className={styles.inputIcon} />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.primaryBtn} disabled={isSaving}>
                    {isSaving ? (
                      <><Loader2 size={15} className={styles.spinner} /> Saving…</>
                    ) : (
                      <><CheckCircle2 size={15} /> Save Changes</>
                    )}
                  </button>
                </form>
              </div>

              {/* Right — Linked Students */}
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={`${styles.cardHeadIcon} ${styles.cardHeadIconOrange}`}>
                    <GraduationCap size={16} />
                  </span>
                  <h3 className={styles.cardTitle}>Linked Students</h3>
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8' }}>
                    {children.length} / linked
                  </span>
                </div>

                <div className={styles.childrenList}>
                  {children.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}><Users size={22} /></div>
                      <p className={styles.emptyText}>No students linked yet</p>
                      <p className={styles.emptySubText}>
                        Register your child below — admin will approve and send credentials via email.
                      </p>
                    </div>
                  ) : (
                    children.map((child: any) => {
                      const isActive = child.id === activeChildId;
                      const isGirl = child.gender === 'girl';
                      return (
                        <div
                          key={child.id}
                          className={`${styles.childCard} ${isActive ? styles.childCardActive : ''}`}
                          onClick={() => {
                            localStorage.setItem('zhi_parent_active_child_id', child.id);
                            setActiveChildId(child.id);
                            router.push(`/${locale}/parent`);
                          }}
                        >
                          <div className={`${styles.childAvatar} ${isGirl ? styles.childAvatarGirl : ''}`}>
                            {(child.name || 'S').slice(0, 1).toUpperCase()}
                          </div>
                          <div className={styles.childInfo}>
                            <h4 className={styles.childName}>{child.name}</h4>
                            {child.school && (
                              <p className={styles.childSub}>
                                <Building2 size={10} style={{ display: 'inline', marginRight: '0.2rem' }} />
                                {child.school}
                              </p>
                            )}
                            <div className={styles.childStatsRow}>
                              <div className={styles.childStatCell}>
                                <span className={styles.childStatVal} style={{ color: '#0284c7' }}>
                                  {child.overall_progress || 0}%
                                </span>
                                <span className={styles.childStatLbl}>Progress</span>
                              </div>
                              <div className={styles.childStatCell}>
                                <span className={styles.childStatVal} style={{ color: '#ec4899' }}>
                                  {child.badges_earned || 0}
                                </span>
                                <span className={styles.childStatLbl}>Badges</span>
                              </div>
                              <div className={styles.childStatCell}>
                                <span className={styles.childStatVal} style={{ color: '#eab308' }}>
                                  {child.total_stars || 0}
                                </span>
                                <span className={styles.childStatLbl}>Stars</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.childBadgeRow}>
                            {isActive && <span className={styles.activePill}>Active</span>}
                            <span className={styles.gradePill}>{child.grade || 'LKG'}</span>
                            <ChevronRight size={14} color="#94a3b8" />
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Pending Link Requests */}
                  {linkRequests.length > 0 && (
                    <div className={styles.pendingSection}>
                      <h5 className={styles.pendingTitle}>
                        <Clock size={13} color="#f59e0b" />
                        Pending Approval ({linkRequests.length})
                      </h5>
                      {linkRequests.map((req: any) => (
                        <div key={req.id} className={styles.pendingItem}>
                          <div>
                            <p className={styles.pendingName}>{req.name}</p>
                            <p className={styles.pendingSub}>
                              {req.grade_name || 'LKG'} · <span style={{ textTransform: 'capitalize' }}>{req.gender}</span>
                            </p>
                          </div>
                          <span className={`${styles.statusTag} ${
                            req.status === 'rejected'
                              ? styles.statusRejected
                              : req.status === 'approved'
                              ? styles.statusApproved
                              : styles.statusPending
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Child CTA */}
                  <button
                    type="button"
                    id="open-link-student-modal"
                    className={styles.addChildBtn}
                    onClick={() => setShowLinkModal(true)}
                  >
                    <FilePlus size={16} />
                    Register / Link New Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ TAB: MY PLAN ══════════════ */}
        {activeSubTab === 'my-plan' && (
          <div className={styles.sectionPad}>
            {!subscription ? (
              <div className={styles.card}>
                <div className={styles.noSubCard}>
                  <Award size={42} color="#94a3b8" />
                  <p className={styles.emptyText}>No Active Subscription</p>
                  <p className={styles.emptySubText}>
                    Upgrade to unlock all subjects, tests, AI features and more.
                  </p>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    style={{ marginTop: '0.5rem', width: 'auto' }}
                    onClick={() => setActiveSubTab('plans')}
                  >
                    <Sparkles size={15} /> Browse Plans
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Plan Hero Card */}
                <div
                  className={styles.planHeroCard}
                  style={{ borderColor: PLAN_COLORS[planCode] || '#12312f' }}
                >
                  <div
                    className={styles.planHeroIcon}
                    style={{
                      background: `${PLAN_COLORS[planCode]}15`,
                      color: PLAN_COLORS[planCode],
                    }}
                  >
                    {PLAN_ICONS[planCode]}
                  </div>
                  <div>
                    <h2 className={styles.planHeroName}>{subscription?.plan?.name || 'Free Plan'}</h2>
                    <p className={styles.planHeroPrice}>
                      {subscription?.plan?.amount_monthly === 0
                        ? 'Free forever'
                        : `₹${subscription?.plan?.amount_monthly || 0}/month`}
                    </p>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${
                      subscription.status === 'trial' ? styles.statusTrial : styles.statusActive
                    }`}
                  >
                    {subscription.status === 'trial' ? (
                      <><Clock size={11} /> Trial</>
                    ) : (
                      <><CheckCircle2 size={11} /> Active</>
                    )}
                  </span>
                </div>

                {/* Dates */}
                <div className={styles.planDatesGrid}>
                  <div className={styles.planDateItem}>
                    <Calendar size={16} />
                    <div>
                      <p className={styles.planDateLabel}>Activation Date</p>
                      <p className={styles.planDateValue}>
                        {subscription?.start_date || parentProfile?.plan_started_at
                          ? new Date(
                              subscription.start_date || parentProfile?.plan_started_at
                            ).toLocaleDateString('en-IN')
                          : 'Lifetime Active'}
                      </p>
                    </div>
                  </div>
                  {subscription?.trial_end && (
                    <div className={styles.planDateItem}>
                      <Clock size={16} />
                      <div>
                        <p className={styles.planDateLabel}>Trial End Date</p>
                        <p className={styles.planDateValue}>
                          {new Date(subscription.trial_end).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className={styles.planDateItem}>
                    <AlertTriangle size={16} />
                    <div>
                      <p className={styles.planDateLabel}>Expiry Date</p>
                      <p className={styles.planDateValue}>
                        {subscription?.end_date || parentProfile?.plan_expires_at
                          ? new Date(
                              subscription.end_date || parentProfile?.plan_expires_at
                            ).toLocaleDateString('en-IN')
                          : 'Never (Lifetime)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Included Features */}
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className={`${styles.cardHeadIcon} ${styles.cardHeadIconBlue}`}>
                      <CheckCircle2 size={16} />
                    </span>
                    <h3 className={styles.cardTitle}>Included Features</h3>
                    <button
                      type="button"
                      className={styles.cardAction}
                      onClick={() => setActiveSubTab('plans')}
                    >
                      Upgrade Plan →
                    </button>
                  </div>

                  <div className={styles.featuresGrid}>
                    {(subscription?.plan?.features || []).map((f: any) => (
                      <div key={f.id} className={styles.featureRow}>
                        <CheckCircle2
                          size={14}
                          color={f.limit === false ? '#cbd5e1' : '#16a34a'}
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          className={`${styles.featureRowName} ${
                            f.limit === false ? styles.featureRowDisabled : ''
                          }`}
                        >
                          {f.name}
                        </span>
                        <span className={styles.featureRowVal}>
                          {f.limit === 'unlimited'
                            ? '∞'
                            : f.limit === true
                            ? '✓'
                            : f.limit === false
                            ? '—'
                            : String(f.limit)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB: UPGRADES ══════════════ */}
        {activeSubTab === 'plans' && (
          <div className={styles.sectionPad}>
            {alert && (
              <div
                className={`${styles.alert} ${
                  alert.type === 'success' ? styles.alertSuccess : styles.alertError
                }`}
                style={{ marginBottom: '1rem' }}
              >
                {alert.type === 'success' ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <AlertTriangle size={15} />
                )}
                <span>{alert.message}</span>
              </div>
            )}

            {plansLoading ? (
              <div className={styles.loading}>
                <div className={styles.loader} />
              </div>
            ) : (
              <div className={styles.plansGrid}>
                {(plans || []).map((plan) => {
                  const isCurrent = plan.id === currentPlanId;
                  const featuresByCategory = plan.features.reduce<
                    Record<string, typeof plan.features>
                  >((acc, f) => {
                    if (!acc[f.category]) acc[f.category] = [];
                    acc[f.category].push(f);
                    return acc;
                  }, {});

                  return (
                    <div
                      key={plan.id}
                      className={`${styles.planCard} ${isCurrent ? styles.planCardCurrent : ''}`}
                    >
                      {plan.badge_label && (
                        <span className={styles.planBadge}>{plan.badge_label}</span>
                      )}

                      <div
                        className={styles.planIcon}
                        style={{
                          background: `${PLAN_COLORS[plan.code]}15`,
                          color: PLAN_COLORS[plan.code],
                        }}
                      >
                        {PLAN_ICONS[plan.code]}
                      </div>

                      <h2 className={styles.planName}>{plan.name}</h2>
                      <div className={styles.planPriceRow}>
                        <span className={styles.priceNum}>₹{plan.amount_monthly}</span>
                        <span className={styles.pricePer}>/mo</span>
                      </div>
                      <p className={styles.planDesc}>{plan.description}</p>

                      <div className={styles.featureGroups}>
                        {Object.entries(featuresByCategory).map(([category, features]) => (
                          <div key={category}>
                            <p className={styles.featureCategory}>
                              {CATEGORY_ICONS[category]}
                              {CATEGORY_LABELS[category] || category}
                            </p>
                            <div className={styles.featureList}>
                              {features.map((f) => (
                                <div key={f.id} className={styles.featureItem}>
                                  <FeatureIcon code={f.code} />
                                  <span
                                    className={`${styles.featureName} ${
                                      f.limit === false ? styles.featureDisabled : ''
                                    }`}
                                  >
                                    {f.name}
                                  </span>
                                  <span
                                    className={`${styles.featureLimit} ${
                                      f.limit === false ? styles.featureDisabled : ''
                                    }`}
                                  >
                                    {formatLimit(f.limit)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        id={`subscribe-plan-${plan.id}`}
                        type="button"
                        className={`${styles.ctaBtn} ${isCurrent ? styles.ctaBtnCurrent : ''}`}
                        style={!isCurrent ? { background: PLAN_COLORS[plan.code] } : {}}
                        onClick={() => handleSubscribe(plan.id, plan.name, plan.amount_monthly)}
                        disabled={isCurrent || (subscribing && selectedPlanId === plan.id)}
                      >
                        {subscribing && selectedPlanId === plan.id ? (
                          <><Loader2 size={15} className={styles.spinner} /> Processing…</>
                        ) : isCurrent ? (
                          <><CheckCircle2 size={14} /> Current Plan</>
                        ) : plan.amount_monthly === 0 ? (
                          'Choose Free'
                        ) : (
                          <>Upgrade Now <ChevronRight size={14} /></>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ══════════════ LINK CHILD MODAL ══════════════ */}
      {showLinkModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowLinkModal(false);
              setLinkAlert(null);
            }
          }}
        >
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <span className={`${styles.cardHeadIcon} ${styles.cardHeadIconGreen}`}>
                <FilePlus size={16} />
              </span>
              <h3 className={styles.modalTitle}>Register New Student</h3>
              <button
                type="button"
                id="close-link-modal"
                className={styles.modalCloseBtn}
                onClick={() => { setShowLinkModal(false); setLinkAlert(null); }}
              >
                <X size={16} />
              </button>
            </div>

            {linkAlert && (
              <div
                className={`${styles.alert} ${
                  linkAlert.type === 'success' ? styles.alertSuccess : styles.alertError
                }`}
              >
                {linkAlert.type === 'success' ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <AlertTriangle size={15} />
                )}
                <span>{linkAlert.message}</span>
              </div>
            )}

            <form onSubmit={handleAddChildRequest} className={styles.modalForm}>
              <div className={styles.inputWrap}>
                <label className={styles.label}>Child's Full Name</label>
                <div className={styles.inputRow}>
                  <User size={14} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Enter child's full name"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputWrap}>
                <label className={styles.label}>Grade Level</label>
                <select
                  value={childGradeId}
                  onChange={(e) => setChildGradeId(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Select Grade</option>
                  {gradesList.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}{g.age_range ? ` (${g.age_range})` : ''}
                    </option>
                  ))}
                </select>
                {selectedGrade?.age_range && (
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.68rem', fontWeight: 800, color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem' }}>ℹ️</span>
                    {selectedGrade.name} is for children aged <strong style={{ color: '#12312f', marginLeft: '0.2rem' }}>{selectedGrade.age_range}</strong>
                  </p>
                )}
              </div>

              <div className={styles.inputWrap}>
                <label className={styles.label}>Gender</label>
                <div className={styles.genderRow}>
                  <label className={`${styles.genderPill} ${childGender === 'boy' ? styles.genderPillActive : ''}`}>
                    <input
                      type="radio"
                      checked={childGender === 'boy'}
                      onChange={() => setChildGender('boy')}
                      name="childGender"
                    />
                    👦 Boy
                  </label>
                  <label className={`${styles.genderPill} ${childGender === 'girl' ? styles.genderPillActive : ''}`}>
                    <input
                      type="radio"
                      checked={childGender === 'girl'}
                      onChange={() => setChildGender('girl')}
                      name="childGender"
                    />
                    👧 Girl
                  </label>
                </div>
              </div>

              <div className={styles.inputWrap}>
                <label className={styles.label}>
                  Date of Birth
                  {selectedGradeAgeRange && (
                    <span style={{ marginLeft: '0.4rem', fontWeight: 700, color: '#94a3b8', fontSize: '0.65rem' }}>
                      (Age {selectedGradeAgeRange.min}–{selectedGradeAgeRange.max} expected)
                    </span>
                  )}
                </label>
                <div className={styles.inputRow}>
                  <Calendar size={14} className={styles.inputIcon} />
                  <input
                    type="date"
                    value={childDob}
                    onChange={(e) => setChildDob(e.target.value)}
                    className={styles.input}
                    style={ageValidationError ? { borderColor: '#f87171' } : (currentChildAge !== null && !ageValidationError ? { borderColor: '#4ade80' } : {})}
                  />
                </div>
                {/* Real-time age feedback */}
                {childDob && currentChildAge !== null && (
                  ageValidationError ? (
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.68rem', fontWeight: 800, color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      ⚠️ {ageValidationError}
                    </p>
                  ) : selectedGradeAgeRange ? (
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.68rem', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      ✅ Age {currentChildAge} years — matches {selectedGrade?.name || 'selected grade'}
                    </p>
                  ) : (
                    <p style={{ margin: '0.3rem 0 0', fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>
                      Child is {currentChildAge} years old
                    </p>
                  )
                )}
              </div>

              <button
                type="submit"
                id="submit-link-request"
                className={styles.primaryBtn}
                disabled={isSubmittingLink}
                style={{ width: '100%', alignSelf: 'stretch' }}
              >
                {isSubmittingLink ? (
                  <><Loader2 size={15} className={styles.spinner} /> Submitting…</>
                ) : (
                  <><FilePlus size={15} /> Submit Registration Request</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
