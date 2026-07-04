'use client';

import React from 'react';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import {
  ArrowLeft,
  Printer,
  Building2,
  Crown,
  CheckCircle2,
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

export default function SchoolInvoicePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = React.use(params);
  const { user, loading: authLoading } = useAuth();

  const { data: school, isLoading } = useQuery({
    queryKey: ['admin', 'schools', 'detail', id],
    queryFn: async () => {
      const token = sessionStorage.getItem('zhi_auth_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API_BASE}/api/admin/schools/${id}`, { credentials: 'include', headers });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load school');
      return json.data as any;
    },
    enabled: !!id && !!user,
  });

  if (isLoading || authLoading) {
    return (
      <div className={`${styles.shell} ${adminFont.variable}`}>
        <div className={styles.loading}>
          <div className={styles.loader} />
          <p className={styles.loadingText}>Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className={`${styles.shell} ${adminFont.variable}`}>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <Building2 size={40} />
          <p style={{ fontWeight: 800, marginTop: '0.5rem' }}>School not found</p>
        </div>
      </div>
    );
  }

  const invNumber = `INV-SCH-${school.code || school.id.slice(0, 6).toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;
  const latestPayment = school.payments?.[0];
  const totalPaid = (school.payments || []).reduce((s: number, p: any) => s + Number(p.amount || 0), 0);

  return (
    <div className={`${styles.shell} ${adminFont.variable}`}>
      <div className={styles.bgGlow} />

      <Link href={`/${locale}/admin/schools/${id}`} className={styles.backLink}>
        <ArrowLeft size={14} /> Back to School Detail
      </Link>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Invoice</h1>
        <button className={styles.printBtn} onClick={() => window.print()}>
          <Printer size={14} /> Print / Download PDF
        </button>
      </div>

      <div className={styles.invoiceCard}>
        {latestPayment && <div className={styles.paidStamp}>PAID</div>}

        <div className={styles.invHdr}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className={styles.invLogo}>A</div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#0f172a' }}>Agaran AI Learning Portal</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b' }}>School Invoice</div>
            </div>
          </div>
          <div className={styles.invTitle}>
            <h2>INVOICE</h2>
            <p>{invNumber}</p>
          </div>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailBlock}>
            <div className={styles.detailLabel}>Billed To</div>
            <div className={styles.detailValue}>
              {school.name}<br />
              {school.address && <>{school.address}<br /></>}
              {school.city && <>{school.city}{school.state ? `, ${school.state}` : ''}{school.pincode ? ` - ${school.pincode}` : ''}<br /></>}
              {school.email}<br />
              {school.phone}
            </div>
          </div>
          <div className={styles.detailBlock}>
            <div className={styles.detailLabel}>Plan</div>
            <div className={styles.detailValue}>
              <Crown size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.2rem', color: '#f59e0b' }} />
              {school.plan_name || 'Free'} Plan<br />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>
                {school.student_count} / {school.student_limit || 100} Students
              </span>
            </div>
          </div>
          <div className={styles.detailBlock}>
            <div className={styles.detailLabel}>Invoice Info</div>
            <div className={styles.detailValue}>
              Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}<br />
              Status: {latestPayment ? <span style={{ color: '#16a34a' }}>Paid</span> : 'Pending'}<br />
              Period: {school.plan_start_date ? new Date(school.plan_start_date).toLocaleDateString() : 'N/A'} — {school.plan_end_date ? new Date(school.plan_end_date).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {school.payments && school.payments.length > 0 ? (
              school.payments.map((p: any, i: number) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {school.plan_name} Plan Subscription
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8' }}>
                      {p.paid_at ? new Date(p.paid_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Pending'}
                      {p.method ? ` — ${p.method}` : ''}
                    </div>
                  </td>
                  <td>1</td>
                  <td>₹{(Number(p.amount) || 0).toLocaleString('en-IN')}</td>
                  <td style={{ fontWeight: 950 }}>₹{(Number(p.amount) || 0).toLocaleString('en-IN')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>1</td>
                <td>
                  {school.plan_name} Plan — {school.student_limit || 100} Students
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8' }}>
                    {school.plan_start_date ? new Date(school.plan_start_date).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
                <td>1</td>
                <td>₹{(school.plan_price || 0).toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 950 }}>₹{(school.plan_price || 0).toLocaleString('en-IN')}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{Math.max(totalPaid || school.plan_price || 0, 0).toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Discount</span>
            <span>{school.discount_percent || 0}%</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.summaryRowTotal}`}>
            <span>Total</span>
            <span>₹{(totalPaid || school.plan_price || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <CheckCircle2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem', color: '#22c55e' }} />
          Payment processed securely via Razorpay<br />
          Agaran AI Learning Portal — Empowering Education Through Technology
          <div style={{ marginTop: '0.3rem', fontSize: '0.55rem' }}>
            {school.name} · {school.email} · {school.phone}
          </div>
        </div>
      </div>
    </div>
  );
}