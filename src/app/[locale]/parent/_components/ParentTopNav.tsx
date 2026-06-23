'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './ParentTopNav.module.css';

export default function ParentTopNav({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const locale = (params?.locale as string) || 'en';

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    } else {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      router.push(`/${locale}/login`);
    }
  };

  const parentName = mounted && user?.name ? user.name : 'Parent';
  const initials = parentName.slice(0, 2).toUpperCase();

  return (
    <header className={styles.topbar}>
      <div 
        className={styles.brandIdentity}
        onClick={() => router.push(`/${locale}/parent`)}
        style={{ cursor: 'pointer' }}
      >
        <Image src="/assets/img/logo-removebg-preview.png" alt="ZHI" width={44} height={44} className={styles.logo} />
        <div>
          <p className={styles.brandTitle}>ZHI Learn</p>
          <p className={styles.brandMeta}>Parent Portal</p>
        </div>
      </div>
      <div className={styles.profile}>
        <button type="button" className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button type="button" className={styles.logoutButton} onClick={handleLogout} aria-label="Sign out">
          <LogOut size={18} />
        </button>
        <div 
          className={styles.profileText}
          onClick={() => router.push(`/${locale}/parent/profile`)}
          style={{ cursor: 'pointer' }}
        >
          <p className={styles.profileName}>{parentName}</p>
          <p className={styles.brandMeta}>Online</p>
        </div>
        <div 
          className={styles.avatar}
          onClick={() => router.push(`/${locale}/parent/profile`)}
          style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #12312f, #1e524f)', color: '#fff', fontWeight: 800 }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
