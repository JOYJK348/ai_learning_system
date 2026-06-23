'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Manrope } from 'next/font/google';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Mail, Phone, User, Award, Sparkles, CheckCircle2,
  GraduationCap, Building2, Zap, BookOpen, Star, Crown,
  Calendar, Clock, AlertTriangle, Loader2, ChevronRight, HelpCircle, Bot, FilePlus, CalendarCheck, TrendingUp, Smartphone, Eye, Shield, CheckSquare
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
  free: <Zap size={22} />,
  focus: <Star size={22} />,
  premium: <Crown size={22} />,
  ultimate: <Sparkles size={22} />,
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
  core: <Zap size={14} />,
  assessment: <CheckSquare size={14} />,
  fun: <Zap size={14} />, // Replacing Gamepad2 for safety
  parent: <BookOpen size={14} />, // Replacing LayoutDashboard for safety
  ai: <Bot size={14} />,
  technical: <Shield size={14} />,
};

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  subjects_access: <BookOpen size={14} />,
  unit_tests: <CheckSquare size={14} />,
  games: <Zap size={14} />,
  activities: <Zap size={14} />,
  ai_doubt_solver: <Bot size={14} />,
  ai_worksheet: <FilePlus size={14} />,
  weekly_report: <Mail size={14} />,
  screen_time: <Clock size={14} />,
  performance_alerts: <BellIcon size={14} />,
  ai_planner: <CalendarCheck size={14} />,
  ai_parent_insights: <TrendingUp size={14} />,
  multi_profile: <User size={14} />,
  devices: <Smartphone size={14} />,
  ads: <Eye size={14} />,
  parent_dashboard: <BookOpen size={14} />,
};

function BellIcon(props: { size?: number }) {
  return <svg width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}

function formatLimit(limit: unknown): string {
  if (limit === 'unlimited') return 'Unlimited';
  if (limit === false) return '—';
  if (limit === true) return '✅';
  if (typeof limit === 'string') return limit;
  return String(limit);
}

function FeatureIcon({ code }: { code: string }) {
  return FEATURE_ICONS[code] || <HelpCircle size={14} />;
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  
  const locale = (params?.locale as string) || 'en';
  const initialTab = searchParams.get('tab') === 'plans' ? 'plans' : searchParams.get('tab') === 'my-plan' ? 'my-plan' : 'details';
  
  const { user, refreshUser, loading: authLoading } = useAuth();

  // Active child state synced with localStorage
  const [activeChildId, setActiveChildId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zhi_parent_active_child_id');
    }
    return null;
  });

  // Local tab state
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'my-plan' | 'plans'>(initialTab);

  // Local Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [subscribing, setSubscribing] = useState(false);

  // Redirect if not authenticated/authorized
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace(`/${locale}/login`);
      } else if (user.role !== 'parent') {
        const route = user.role === 'super_admin' ? 'admin' : user.role === 'school_admin' ? 'school-admin' : user.role;
        router.replace(`/${locale}/${route}`);
      }
    }
  }, [user, authLoading, router, locale]);

  // Fetch Parent Data
  const { data: meRaw, isLoading: meLoading } = useQuery({
    queryKey: parentKeys.me,
    queryFn: parentApi.me,
    enabled: !!user && user.role === 'parent',
    retry: false,
  });

  const parentProfile = (meRaw as any)?.parent ?? null;

  // Initialize form when data loads
  useEffect(() => {
    if (parentProfile) {
      setName(parentProfile.name || '');
      setPhone(parentProfile.phone || '');
    }
  }, [parentProfile]);

  // Fetch Children Data
  const { data: childrenData, isLoading: childrenLoading } = useQuery({
    queryKey: parentKeys.children,
    queryFn: parentApi.children,
    enabled: !!user && user.role === 'parent',
    retry: false,
  });

  const children = childrenData?.children ?? [];

  // Default active child synchronizer
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

  // Fetch Plans list
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: parentKeys.plans,
    queryFn: () => parentApi.plans(),
    staleTime: 5 * 60_000,
  });

  // Fetch active subscription details
  const { data: subscription, isLoading: subLoading } = useQuery({
    queryKey: parentKeys.subscription,
    queryFn: () => parentApi.subscription(),
    enabled: !!user,
    staleTime: 60_000,
    retry: false,
  });

  // Handle Form Submit
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!name.trim()) {
      setAlert({ type: 'error', message: 'Name is required' });
      return;
    }

    setIsSaving(true);
    try {
      const res = await parentApi.updateProfile({
        name: name.trim(),
        phone: phone.trim(),
      });
      if (res?.success) {
        setAlert({ type: 'success', message: 'Profile updated successfully!' });
        await refreshUser(); // Update header and global auth context name
      } else {
        setAlert({ type: 'error', message: 'Failed to update profile details.' });
      }
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Plan Subscription
  const handleSubscribe = async (planId: number) => {
    setSelectedPlanId(planId);
    setSubscribing(true);
    try {
      const result = await parentApi.subscribe(planId);
      if (result.amount > 0) {
        // Redirect to checkout order
        router.push(`/${locale}/parent/plans/checkout?order_id=${result.payment?.order_id}`);
      } else {
        // Free plan, refresh subscription data
        await queryClient.invalidateQueries({ queryKey: parentKeys.subscription });
        setActiveSubTab('my-plan');
        setAlert({ type: 'success', message: 'Plan changed successfully!' });
      }
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Subscription upgrade failed.' });
    } finally {
      setSubscribing(false);
    }
  };

  const isLoading = authLoading || meLoading || childrenLoading || subLoading;
  const currentPlanId = subscription?.plan_id;

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
        
        {/* Header */}
        <header className={styles.header}>
          <button 
            type="button" 
            className={styles.backBtn} 
            onClick={() => router.push(`/${locale}/parent`)}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className={styles.title}>Account Profile Settings</h1>
            <p className={styles.subtitle}>Manage your parent profile information, active membership, and view linked students.</p>
          </div>
        </header>

        {/* KPI Grid */}
        <section className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Membership</p>
            <h2 className={styles.kpiValue} style={{ color: '#2563eb', textTransform: 'capitalize' }}>
              {subscription?.plan?.name || 'Free Plan'}
            </h2>
          </div>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Linked Children</p>
            <h2 className={styles.kpiValue} style={{ color: '#7c3aed' }}>
              {children.length} {children.length === 1 ? 'Student' : 'Students'}
            </h2>
          </div>
          <div className={styles.kpiCard}>
            <p className={styles.kpiLabel}>Account Status</p>
            <h2 className={styles.kpiValue} style={{ color: '#16a34a' }}>
              Active
            </h2>
          </div>
        </section>

        {/* Tab Selection Bar */}
        <section className={styles.tabBar}>
          <button
            type="button"
            className={`${styles.tabButton} ${activeSubTab === 'details' ? styles.tabButtonActive : ''}`}
            onClick={() => { setActiveSubTab('details'); setAlert(null); }}
          >
            Profile & Kids
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${activeSubTab === 'my-plan' ? styles.tabButtonActive : ''}`}
            onClick={() => { setActiveSubTab('my-plan'); setAlert(null); }}
          >
            Active Plan
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${activeSubTab === 'plans' ? styles.tabButtonActive : ''}`}
            onClick={() => { setActiveSubTab('plans'); setAlert(null); }}
          >
            Upgrades
          </button>
        </section>

        {/* Main Tab Switch Content */}
        {activeSubTab === 'details' && (
          <section className={styles.mainGrid}>
            
            {/* Left Column: Account Details Edit Form */}
            <div className={styles.cardBox}>
              <div className={styles.cardHeader}>
                <User size={18} color="#12312f" />
                <h3>Personal Details</h3>
              </div>

              {alert && (
                <div className={`${styles.alert} ${alert.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                  {alert.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span>{alert.message}</span>
                </div>
              )}

              <div className={styles.profileAvatarSection}>
                <div className={styles.avatar}>
                  {(name || 'P').slice(0, 2).toUpperCase()}
                </div>
                <div className={styles.avatarLabel}>
                  <h4 className={styles.avatarName}>{name || 'Parent'}</h4>
                  <span className={styles.avatarRole}>Parent Guardian Account</span>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Full Name</label>
                  <div className={styles.inputFieldContainer}>
                    <User size={15} className={styles.inputIcon} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={styles.inputField}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Email Address (Linked to Account)</label>
                  <div className={styles.inputFieldContainer}>
                    <Mail size={15} className={styles.inputIcon} />
                    <input
                      type="email"
                      value={parentProfile?.email || ''}
                      disabled
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Phone Number</label>
                  <div className={styles.inputFieldContainer}>
                    <Phone size={15} className={styles.inputIcon} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className={styles.inputField}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving Changes...' : 'Save Settings'}
                </button>
              </form>
            </div>

            {/* Right Column: Linked Children Information */}
            <div className={styles.cardBox}>
              <div className={styles.cardHeader}>
                <Sparkles size={18} color="#ea580c" />
                <h3>Linked Students</h3>
              </div>

              <div className={styles.childrenSection}>
                {children.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
                    <User size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                    <p style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>No student profiles linked to this parent account.</p>
                  </div>
                ) : (
                  children.map((child: any) => {
                    const isActive = child.id === activeChildId;
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
                        <div className={styles.childHeader}>
                          <div className={styles.childAvatar}>
                            {(child.name || 'S').slice(0, 1).toUpperCase()}
                          </div>
                          <div className={child.school ? '' : styles.childMeta}>
                            <h4 className={styles.childName}>{child.name}</h4>
                            {child.school && <span className={styles.childSchool}>{child.school}</span>}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            {isActive && (
                              <span style={{ fontSize: '0.62rem', fontWeight: 900, background: '#12312f', color: '#fff', padding: '0.15rem 0.45rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Active
                              </span>
                            )}
                            <span className={styles.gradeBadge}>{child.grade || 'LKG'}</span>
                          </div>
                        </div>

                        <div className={styles.childStatsGrid}>
                          <div className={styles.childStatItem}>
                            <span className={styles.childStatValue} style={{ color: '#0284c7' }}>
                              {child.overall_progress || 0}%
                            </span>
                            <span className={styles.childStatLabel}>Progress</span>
                          </div>
                          <div className={styles.childStatItem}>
                            <span className={styles.childStatValue} style={{ color: '#ec4899' }}>
                              {child.badges_earned || 0}
                            </span>
                            <span className={styles.childStatLabel}>Badges</span>
                          </div>
                          <div className={styles.childStatItem}>
                            <span className={styles.childStatValue} style={{ color: '#eab308' }}>
                              {child.total_stars || 0}
                            </span>
                            <span className={styles.childStatLabel}>Stars</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </section>
        )}

        {activeSubTab === 'my-plan' && (
          <section style={{ padding: '1rem 1.25rem' }}>
            {!subscription ? (
              <div className={styles.cardBox} style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <Award size={36} style={{ color: '#94a3b8', margin: '0 auto 0.75rem' }} />
                <h4 style={{ margin: 0, fontWeight: 950 }}>No Active Subscription</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 1rem' }}>Upgrade to unlock all subjects, tests and features.</p>
                <button
                  type="button"
                  className={styles.saveBtn}
                  onClick={() => setActiveSubTab('plans')}
                  style={{ margin: '0 auto' }}
                >
                  Choose a Plan
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Active Plan Detail Box */}
                <div 
                  className={styles.planHero} 
                  style={{ borderColor: PLAN_COLORS[subscription?.plan?.code || 'free'] || '#12312f' }}
                >
                  <div 
                    className={styles.planHeroIcon} 
                    style={{ background: `${PLAN_COLORS[subscription?.plan?.code || 'free']}15`, color: PLAN_COLORS[subscription?.plan?.code || 'free'] }}
                  >
                    {PLAN_ICONS[subscription?.plan?.code || 'free']}
                  </div>
                  <div>
                    <h2 className={styles.planNameTitle}>{subscription?.plan?.name || 'Free Plan'}</h2>
                    <p className={styles.planPriceLabel}>
                      {subscription?.plan?.amount_monthly === 0 ? 'Free' : `₹${subscription?.plan?.amount_monthly || 0}/month`}
                    </p>
                  </div>
                  <span className={`${styles.statusBadge} ${subscription.status === 'trial' ? styles.statusTrial : styles.statusActive}`}>
                    {subscription.status === 'trial' ? 'Trial Plan' : 'Active Membership'}
                  </span>
                </div>

                {/* Dates Information Card */}
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <Calendar size={16} />
                    <div>
                      <p className={styles.detailLabel}>Activation Date</p>
                      <p className={styles.detailValue}>
                        {subscription?.start_date || parentProfile?.plan_started_at
                          ? new Date(subscription.start_date || parentProfile?.plan_started_at).toLocaleDateString('en-IN')
                          : 'Lifetime Active'}
                      </p>
                    </div>
                  </div>
                  {subscription?.trial_end && (
                    <div className={styles.detailItem}>
                      <Clock size={16} />
                      <div>
                        <p className={styles.detailLabel}>Trial End Date</p>
                        <p className={styles.detailValue}>{new Date(subscription.trial_end).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <AlertTriangle size={16} />
                    <div>
                      <p className={styles.detailLabel}>Expiry Date</p>
                      <p className={styles.detailValue}>
                        {subscription?.end_date || parentProfile?.plan_expires_at
                          ? new Date(subscription.end_date || parentProfile?.plan_expires_at).toLocaleDateString('en-IN')
                          : 'Never (Lifetime Access)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features List box */}
                <div className={styles.cardBox}>
                  <div className={styles.cardHeader}>
                    <CheckCircle2 size={18} color="#16a34a" />
                    <h3>Included Features</h3>
                  </div>

                  <div className={styles.featuresGrid}>
                    {(subscription?.plan?.features || []).map((f: any) => (
                      <div key={f.id} className={styles.featureRow}>
                        <CheckCircle2 size={14} color={f.limit === false ? '#cbd5e1' : '#16a34a'} />
                        <span style={f.limit === false ? { color: '#cbd5e1', textDecoration: 'line-through' } : {}}>{f.name}</span>
                        <span className={styles.featureRowValue}>
                          {f.limit === 'unlimited' ? '∞' : f.limit === true ? '✓' : f.limit === false ? '—' : String(f.limit)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    className={styles.planBtn}
                    onClick={() => setActiveSubTab('plans')}
                  >
                    Change / Upgrade Plan
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {activeSubTab === 'plans' && (
          <section>
            {alert && (
              <div style={{ margin: '0 1.25rem 1rem' }} className={`${styles.alert} ${alert.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                <AlertTriangle size={16} />
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
                  const featuresByCategory = plan.features.reduce<Record<string, typeof plan.features>>((acc, f) => {
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
                        <span className={styles.badge}>{plan.badge_label}</span>
                      )}

                      <div 
                        className={styles.planIcon} 
                        style={{ background: `${PLAN_COLORS[plan.code]}15`, color: PLAN_COLORS[plan.code] }}
                      >
                        {PLAN_ICONS[plan.code]}
                      </div>

                      <h2 className={styles.planName}>{plan.name}</h2>
                      <div className={styles.planPrice}>
                        <span className={styles.priceAmount}>₹{plan.amount_monthly}</span>
                        <span className={styles.pricePeriod}>/mo</span>
                      </div>

                      <p className={styles.planDesc}>{plan.description}</p>

                      <div className={styles.featureGroups}>
                        {Object.entries(featuresByCategory).map(([category, features]) => (
                          <div key={category} className={styles.featureGroup}>
                            <p className={styles.featureCategory}>
                              {CATEGORY_ICONS[category]}
                              {CATEGORY_LABELS[category] || category}
                            </p>
                            <div className={styles.featureList}>
                              {features.map((f) => (
                                <div key={f.id} className={styles.featureItem}>
                                  <FeatureIcon code={f.code} />
                                  <span className={styles.featureName}>{f.name}</span>
                                  <span className={`${styles.featureLimit} ${f.limit === false ? styles.featureDisabled : ''}`}>
                                    {formatLimit(f.limit)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className={`${styles.ctaBtn} ${isCurrent ? styles.ctaBtnCurrent : ''}`}
                        style={!isCurrent ? { background: PLAN_COLORS[plan.code] } : {}}
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={isCurrent || (subscribing && selectedPlanId === plan.id)}
                      >
                        {subscribing && selectedPlanId === plan.id ? (
                          <><Loader2 size={16} className={styles.spinner} /> Saving...</>
                        ) : isCurrent ? (
                          'Active Plan'
                        ) : plan.amount_monthly === 0 ? (
                          'Choose Free'
                        ) : (
                          <>Select Upgrade <ChevronRight size={14} /></>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}
