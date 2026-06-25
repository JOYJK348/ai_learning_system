'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Manrope } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Printer,
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { adminKeys } from '@/core/constants/queryKeys';
import { adminApi } from '@/core/services/adminApi';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({ subsets: ['latin'], variable: '--admin-font', display: 'swap' });

type PaymentRecord = {
  id: string;
  amount: number;
  currency: string;
  plan: string;
  gateway: string;
  notes?: string;
  status: string;
  status_color: string;
  paid_at?: string;
  created_at: string;
};

type DetailedParent = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  plan_name?: string;
  payments: PaymentRecord[];
  total_paid: number;
  created_at: string;
};

export default function PaymentDetailPage() {
  const router = useRouter();
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || 'en';
  const parentId = (routeParams?.id as string) || '';
  const { user, loading } = useAuth();

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  const { data: parentDetail, isLoading, isError } = useQuery({
    queryKey: adminKeys.parentDetail(parentId),
    queryFn: () => adminApi.parentDetail(parentId) as Promise<DetailedParent>,
    enabled: !!parentId && !!user && hydrated,
  });

  if (!hydrated || loading) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}>Loading subscription invoice details...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (isLoading) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}>Loading subscription invoice details...</div>
      </main>
    );
  }

  if (isError || !parentDetail) {
    return (
      <main className={`${adminFont.variable} ${styles.shell}`}>
        <div className={styles.loading}>
          <AlertCircle size={40} style={{ color: '#ef4444', marginBottom: '1rem' }} />
          <p>Failed to load invoice details</p>
          <button className={styles.secondaryButton} onClick={() => router.push(`/${locale}/admin/payments`)}>
            Back to Payments
          </button>
        </div>
      </main>
    );
  }

  // Get latest successful or main payment details
  const paymentsList = parentDetail.payments || [];
  const latestPayment = paymentsList[0];
  const invoiceNumber = `INV-${parentId.slice(0, 8).toUpperCase()}-${new Date(parentDetail.created_at).getFullYear()}`;

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <a href={`/${locale}/admin/payments`} className={styles.backLink}>
            <ArrowLeft size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> Back to Payments
          </a>
          <h1 className={styles.title}>Invoice details</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.secondaryButton} onClick={handlePrint}>
            <Printer size={16} /> Print Invoice
          </button>
        </div>
      </div>

      {/* Invoice Layout */}
      <div className={styles.invoiceContainer}>
        {/* Paid Stamp */}
        {(latestPayment?.status === 'success' || paymentsList.length === 0) && (
          <div className={styles.paidStamp}>
            <span>PAID</span>
          </div>
        )}

        {/* Invoice Header */}
        <div className={styles.invoiceHeader}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoBadge}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <div>
              <h2 className={styles.logoText}>ZHI LEARN</h2>
              <p className={styles.logoSubtext}>E-Learning Portal</p>
            </div>
          </div>
          <div className={styles.invoiceTitleBlock}>
            <h3>TAX INVOICE</h3>
            <div className={styles.metaBadge}>{invoiceNumber}</div>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailsBlock}>
            <h4>Company Details:</h4>
            <p className={styles.companyName}>ZHI Learn Private Limited</p>
            <p>12, Knowledge Park, Outer Ring Road</p>
            <p>Bangalore, KA, India - 560103</p>
            <p>GSTIN: 29ZHILEARN7777F</p>
            <p>Email: billing@zhi.com</p>
          </div>
          <div className={styles.detailsBlock}>
            <h4>Billed To:</h4>
            <p className={styles.clientName}>{parentDetail.name}</p>
            {parentDetail.phone && <p>Phone: {parentDetail.phone}</p>}
            <p>Email: {parentDetail.email}</p>
          </div>
          <div className={styles.detailsBlock}>
            <h4>Invoice Info:</h4>
            <p><span className={styles.label}>Invoice Date:</span> {new Date(parentDetail.created_at).toLocaleDateString('en-IN')}</p>
            <p><span className={styles.label}>Payment Method:</span> {latestPayment?.gateway || 'Razorpay'}</p>
            <p><span className={styles.label}>Currency:</span> {latestPayment?.currency || 'INR'}</p>
            {latestPayment?.id && <p><span className={styles.label}>Transaction ID:</span> <span className={styles.mono}>{latestPayment.id.slice(0, 16)}</span></p>}
          </div>
        </div>

        {/* Items Table */}
        <div className={styles.tableSection}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>S.No</th>
                <th>Item Description</th>
                <th>Plan Code</th>
                <th>Billing Period</th>
                <th style={{ textAlign: 'right', width: '120px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentsList.length > 0 ? (
                paymentsList.map((payment, idx) => (
                  <tr key={payment.id}>
                    <td data-label="S.No" className={styles.mono}>{idx + 1}</td>
                    <td data-label="Item Description">
                      <span className={styles.itemName}>ZHI E-Learning Portal Access Subscription</span>
                      <span className={styles.itemSubtext}>B2C Portal Standard Access - Parent Plan Access</span>
                    </td>
                    <td data-label="Plan Code" className={styles.mono}>{payment.plan || parentDetail.plan_name || 'Paid Plan'}</td>
                    <td data-label="Billing Period">Monthly</td>
                    <td data-label="Amount" className={`${styles.amount} ${styles.mono}`} style={{ textAlign: 'right' }}>
                      ₹{parseFloat(String(payment.amount)).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td data-label="S.No" className={styles.mono}>1</td>
                  <td data-label="Item Description">
                    <span className={styles.itemName}>ZHI E-Learning Portal Access Subscription</span>
                    <span className={styles.itemSubtext}>B2C Portal Standard Access - Free Trial/Standard Access</span>
                  </td>
                  <td data-label="Plan Code" className={styles.mono}>{parentDetail.plan_name || 'Free Plan'}</td>
                  <td data-label="Billing Period">One-time</td>
                  <td data-label="Amount" className={`${styles.amount} ${styles.mono}`} style={{ textAlign: 'right' }}>₹0.00</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary and Signatures */}
        <div className={styles.invoiceFooterSection}>
          <div className={styles.termsNotes}>
            <h5>Terms & Conditions:</h5>
            <p>1. This is a computer-generated tax invoice and requires no physical signature.</p>
            <p>2. Subscriptions are billed in advance according to the selected plan cycle.</p>
            <p>3. For cancellation or refund queries, contact support@zhi.com within 7 days.</p>
          </div>

          <div className={styles.summaryBlock}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span className={styles.mono}>₹{(parentDetail.total_paid || 0).toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>CGST (0%):</span>
              <span className={styles.mono}>₹0.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span>SGST (0%):</span>
              <span className={styles.mono}>₹0.00</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryRowTotal}`}>
              <span>Total Paid:</span>
              <span className={styles.mono}>₹{(parentDetail.total_paid || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className={styles.footerNote}>
          <p className={styles.thankYouText}>Thank you for choosing ZHI Learn E-Learning Portal!</p>
          <p className={styles.supportContact}>If you have any billing queries, contact support@zhi.com or call +91-80-ZHILEARN</p>
        </div>
      </div>

      <div className={styles.bottomPad} />
    </main>
  );
}
