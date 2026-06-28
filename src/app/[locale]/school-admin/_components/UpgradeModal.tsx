'use client';

import { useState } from 'react';
import { Crown, ArrowUpRight, CheckCircle2, XCircle, Clock, Shield, AlertTriangle, Sparkles, CreditCard, Building, Info } from 'lucide-react';
import { useCreateSchoolOrder, useVerifySchoolPayment, useSubmitOfflinePayment } from '@/hooks/useSchoolPayments';
import type { SubscriptionInfo } from '@/hooks/useSchoolPayments';

type PlanInfo = {
  type: string; name: string; price: string; period: string;
  features: { key: string; label: string }[];
};

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  targetPlan: PlanInfo;
  currentPlan: PlanInfo;
  currentSub: SubscriptionInfo;
}

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function UpgradeModal({ open, onClose, targetPlan, currentPlan, currentSub }: UpgradeModalProps) {
  const [paymentMode, setPaymentMode] = useState<'online' | 'offline'>('online');
  const [referenceCode, setReferenceCode] = useState('');

  const createOrder = useCreateSchoolOrder();
  const verifyPayment = useVerifySchoolPayment();
  const submitOffline = useSubmitOfflinePayment();

  if (!open) return null;

  const isUpgrade = targetPlan.type === 'school' || (targetPlan.type === 'paid' && currentSub.plan_type === 'free');

  const handleOnlinePayment = async () => {
    try {
      const order = await createOrder.mutateAsync(targetPlan.type);
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert('Failed to load Razorpay payment SDK. Please try again.');
        return;
      }

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Agaran AI Learning Portal',
        description: `Upgrade subscription to ${order.plan_name}`,
        order_id: order.razorpay_order_id,
        handler: async (response: any) => {
          try {
            await verifyPayment.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          } catch (err) {
            console.error('Payment verification failed:', err);
          }
        },
        theme: { color: '#12312f' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Order creation failed:', err);
    }
  };

  const handleOfflinePayment = async () => {
    if (!referenceCode.trim()) {
      alert('Please enter your transaction reference code/ID');
      return;
    }
    try {
      await submitOffline.mutateAsync({
        planType: targetPlan.type,
        referenceCode: referenceCode.trim(),
      });
    } catch (err) {
      console.error('Offline submission failed:', err);
    }
  };

  const isPending = createOrder.isPending || verifyPayment.isPending || submitOffline.isPending;
  const isError = createOrder.isError || verifyPayment.isError || submitOffline.isError;
  const errorMessage = (createOrder.error?.message || verifyPayment.error?.message || submitOffline.error?.message || 'Transaction failed');
  const isSuccess = verifyPayment.isSuccess || submitOffline.isSuccess;

  const newFeatures = targetPlan.features.filter(
    f => !currentPlan.features.some(cf => cf.key === f.key)
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)',
      }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '28rem',
        background: '#fff', borderRadius: '1.25rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.5rem 1rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
        }}>
          <div style={{
            width: '2.5rem', height: '2.5rem', borderRadius: '0.7rem',
            background: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>
            <Crown size={18} color="#2563eb" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 950, color: '#0f172a' }}>
              {isUpgrade ? 'Upgrade Plan' : 'Change Plan'}
            </h3>
            <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
              {isUpgrade
                ? `Switch from ${currentPlan.name} to ${targetPlan.name}`
                : `Move from ${currentPlan.name} to ${targetPlan.name}`}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.25rem', color: '#94a3b8', borderRadius: '0.3rem',
          }}>
            <XCircle size={18} />
          </button>
        </div>

        {/* Body (Scrollable if content overflows) */}
        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          <div style={{
            display: 'flex', gap: '0.75rem', marginBottom: '1rem',
          }}>
            {/* Current */}
            <div style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.7rem',
              border: '1px solid #e2e8f0', background: '#f8fafc',
            }}>
              <div style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', marginBottom: '0.2rem' }}>
                Current
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#475569' }}>{currentPlan.name}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8' }}>{currentPlan.price}{currentPlan.period}</div>
            </div>
            {/* Arrow */}
            <div style={{ display: 'grid', placeItems: 'center', color: '#94a3b8' }}>
              <ArrowUpRight size={20} />
            </div>
            {/* Target */}
            <div style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.7rem',
              border: '2px solid #12312f', background: 'rgba(18, 49, 47, 0.03)',
            }}>
              <div style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#12312f', marginBottom: '0.2rem' }}>
                New Plan
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#12312f' }}>{targetPlan.name}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#12312f' }}>{targetPlan.price}{targetPlan.period}</div>
            </div>
          </div>

          {/* New features */}
          {newFeatures.length > 0 && (
            <div style={{ marginBottom: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: '0.4rem' }}>
                You'll unlock
              </div>
              {newFeatures.map(f => (
                <div key={f.key} style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.25rem 0', fontSize: '0.72rem', fontWeight: 700, color: '#166534',
                }}>
                  <Sparkles size={12} color="#22c55e" />
                  {f.label}
                </div>
              ))}
            </div>
          )}

          {/* Payment Mode Selector Tabs */}
          {!isSuccess && (
            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '0.5rem', marginBottom: '1rem', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setPaymentMode('online')}
                style={{
                  flex: 1, padding: '0.6rem', fontSize: '0.75rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                  background: paymentMode === 'online' ? '#12312f' : '#fff',
                  color: paymentMode === 'online' ? '#fff' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.15s'
                }}
              >
                <CreditCard size={14} />
                Online UPI/Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('offline')}
                style={{
                  flex: 1, padding: '0.6rem', fontSize: '0.75rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                  background: paymentMode === 'offline' ? '#12312f' : '#fff',
                  color: paymentMode === 'offline' ? '#fff' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.15s'
                }}
              >
                <Building size={14} />
                Bank Transfer
              </button>
            </div>
          )}

          {/* Mode Contents */}
          {!isSuccess && paymentMode === 'online' && (
            <div style={{
              padding: '0.65rem 0.75rem', borderRadius: '0.5rem',
              background: '#eff6ff', border: '1px solid #bfdbfe',
              display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
              marginBottom: '0.5rem',
            }}>
              <Info size={14} color="#1d4ed8" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#1e40af' }}>
                Instant activation through Razorpay. UPI, Card, Net Banking supported.
              </div>
            </div>
          )}

          {!isSuccess && paymentMode === 'offline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Bank details card */}
              <div style={{
                background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.7rem'
              }}>
                <div style={{ fontWeight: 900, color: '#475569', textTransform: 'uppercase', fontSize: '0.58rem', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Bank Transfer Details (NEFT/RTGS)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0.25rem', fontWeight: 750, color: '#334155' }}>
                  <span>Bank Name:</span><span style={{ color: '#0f172a' }}>HDFC Bank Ltd.</span>
                  <span>A/C Name:</span><span style={{ color: '#0f172a' }}>Agaran AI Learning Portal</span>
                  <span>A/C No:</span><span style={{ color: '#0f172a', letterSpacing: '0.02em' }}>50200084319488</span>
                  <span>IFSC Code:</span><span style={{ color: '#0f172a' }}>HDFC0000004</span>
                  <span>Branch:</span><span style={{ color: '#0f172a' }}>Chennai T. Nagar</span>
                </div>
              </div>

              {/* Reference ID input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 850, color: '#475569' }}>Transaction Reference ID / UTR</label>
                <input
                  type="text"
                  placeholder="Enter Bank Transfer transaction ID"
                  value={referenceCode}
                  onChange={(e) => setReferenceCode(e.target.value)}
                  style={{
                    padding: '0.55rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1',
                    fontSize: '0.75rem', fontWeight: 700, outline: 'none', color: '#0f172a'
                  }}
                />
              </div>
            </div>
          )}

          {/* Loading / Error states */}
          {isPending && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.75rem 0', fontSize: '0.8rem', fontWeight: 800, color: '#12312f',
            }}>
              <div style={{
                width: '1.2rem', height: '1.2rem', border: '2px solid #e2e8f0',
                borderTopColor: '#12312f', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
              }} />
              Processing your request...
            </div>
          )}

          {isError && (
            <div style={{
              padding: '0.65rem 0.75rem', borderRadius: '0.5rem',
              background: '#fef2f2', border: '1px solid #fecaca',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.72rem', fontWeight: 700, color: '#991b1b',
              marginTop: '0.75rem'
            }}>
              <AlertTriangle size={14} />
              {errorMessage}
            </div>
          )}

          {isSuccess && (
            <div style={{
              padding: '1.25rem', borderRadius: '0.75rem',
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              textAlign: 'center',
            }}>
              <CheckCircle2 size={32} color="#22c55e" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#166534' }}>
                {submitOffline.isSuccess ? 'Reference Submitted!' : 'Upgrade Successful!'}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', marginTop: '0.25rem', lineHeight: '1.4' }}>
                {submitOffline.isSuccess 
                  ? 'Our team is verifying your bank transfer. Subscription will unlock shortly.' 
                  : 'Your Standard subscription is now fully active.'}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem', borderTop: '1px solid #f1f5f9',
          display: 'flex', gap: '0.6rem',
        }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '0.6rem', borderRadius: '0.5rem',
            border: '1px solid #e2e8f0', background: '#fff',
            fontSize: '0.72rem', fontWeight: 850, color: '#64748b',
            cursor: 'pointer',
          }}>
            {isSuccess ? 'Close' : 'Cancel'}
          </button>
          {!isSuccess && (
            <button
              onClick={paymentMode === 'online' ? handleOnlinePayment : handleOfflinePayment}
              disabled={isPending}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '0.5rem',
                border: 'none',
                background: isPending ? '#94a3b8' : '#12312f',
                fontSize: '0.72rem', fontWeight: 850, color: '#fff',
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
              }}
            >
              {paymentMode === 'online' ? 'Pay Online (Razorpay)' : 'Submit Reference'}
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

