'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, LayoutDashboard, MessageSquare, Users, Award, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { parentKeys } from '@/core/constants/queryKeys';
import { parentApi } from '@/core/services/parentApi';
import styles from './ParentBottomNav.module.css';

export default function ParentBottomNav({ onLogout }: { onLogout?: () => void }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';

  const activeTab = searchParams.get('tab');

  const { data: meRaw } = useQuery({
    queryKey: parentKeys.me,
    queryFn: parentApi.me,
    staleTime: 5 * 60 * 1000,
  });
  const parentProfile = (meRaw as any)?.parent ?? null;
  const isSchoolLinked = !!parentProfile?.school;

  const navItems = [
    { label: 'Hub', icon: LayoutDashboard, href: 'parent' },
    { label: 'Learning', icon: BookOpen, href: 'parent/learning' },
    { label: 'Quizzes', icon: Award, href: 'parent/quizzes' },
    { label: 'Mentor', icon: MessageSquare, href: 'parent/mentor' },
    ...(!isSchoolLinked ? [{ label: 'Upgrades', icon: Sparkles, href: 'parent/profile?tab=plans' }] : []),
    { label: 'Profile', icon: Users, href: 'parent/profile' },
  ];

  const isActive = (href: string) => {
    if (href.includes('tab=')) {
      const tab = href.split('tab=')[1];
      return activeTab === tab;
    }
    const path = `/${locale}/${href}`;
    if (href === 'parent') {
      return pathname === path && !activeTab;
    }
    if (href === 'parent/profile') {
      return pathname.startsWith(path) && activeTab !== 'plans';
    }
    return pathname.startsWith(path);
  };

  const prefetch = (href: string) => {
    const target = href.includes('?') ? `/${locale}/${href}` : `/${locale}/${href}`;
    router.prefetch(target);
  };

  return (
    <nav className={styles.bottomBar} aria-label="Parent navigation">
      {navItems.map((item) => (
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
