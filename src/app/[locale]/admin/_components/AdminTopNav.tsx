'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Bell, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './AdminTopNav.module.css';

export default function AdminTopNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const handleLogout = async () => {
    await logout();
    // Use window.location.replace so the entire Next.js history stack is cleared.
    // This prevents the back button from returning to the previous user's dashboard.
    window.location.replace(`/${locale}/login?session_closed=1`);
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.brandIdentity}>
        <Image 
          src="/assets/img/logo-removebg-preview.png" 
          alt="ZHI" 
          width={40} 
          height={40} 
          className={styles.logo} 
        />
        <div className={styles.brandText}>
          <p className={styles.brandTitle}>ZHI Learn</p>
          <p className={styles.brandMeta}>Super Admin</p>
        </div>
      </div>
      
      <div className={styles.search}>
        <Search size={16} />
        <input placeholder="Search students, schools, payments..." type="search" />
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
