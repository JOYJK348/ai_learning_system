'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, LayoutDashboard, MessageSquare, Users } from 'lucide-react';
import styles from './ParentBottomNav.module.css';

const allNavItems = [
  { label: 'Hub', icon: LayoutDashboard, href: 'parent' },
  { label: 'Quizzes', icon: BookOpen, href: 'parent/quizzes' },
  { label: 'Mentor', icon: MessageSquare, href: 'parent/mentor' },
  { label: 'Profile', icon: Users, href: 'parent/profile' },
];

export default function ParentBottomNav({ onLogout }: { onLogout?: () => void }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';

  const activeTab = searchParams.get('tab');

  const isActive = (href: string) => {
    if (href.includes('tab=')) {
      const tab = href.split('tab=')[1];
      return activeTab === tab;
    }
    const path = `/${locale}/${href}`;
    if (href === 'parent') {
      return pathname === path && !activeTab;
    }
    return pathname.startsWith(path);
  };

  const prefetch = (href: string) => {
    const target = href.includes('?') ? `/${locale}/${href}` : `/${locale}/${href}`;
    router.prefetch(target);
  };

  return (
    <nav className={styles.bottomBar} aria-label="Parent navigation">
      {allNavItems.map((item) => (
        <Link
          key={item.label}
          href={`/${locale}/${item.href}`}
          className={`${styles.bottomItem} ${isActive(item.href) ? styles.bottomItemActive : ''}`}
          onPointerEnter={() => prefetch(item.href)}
          onFocus={() => prefetch(item.href)}
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
