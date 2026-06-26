'use client';

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Bell, LogOut } from 'lucide-react';
import styles from './ParentTopNav.module.css';

export default function ParentTopNav({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      router.push(`/${locale}/login`);
    }
  };

  return (
    <header className={styles.topbar}>
      <div 
        className={styles.brandIdentity}
        onClick={() => router.push(`/${locale}/parent`)}
        style={{ cursor: 'pointer' }}
      >
        <Image 
          src="/assets/img/logo-removebg-preview.png" 
          alt="ZHI" 
          width={40} 
          height={40} 
          className={styles.logo} 
        />
        <div className={styles.brandText}>
          <p className={styles.brandTitle}>ZHI Learn</p>
          <p className={styles.brandMeta}>Parent Portal</p>
        </div>
      </div>
      
      <div className={styles.profile}>
        <button type="button" className={styles.iconButton} aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button type="button" className={styles.logoutButton} onClick={handleLogout} aria-label="Sign out">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
