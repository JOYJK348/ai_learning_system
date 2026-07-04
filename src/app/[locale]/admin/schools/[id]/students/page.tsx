'use client';

import React from 'react';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  BadgeCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

type Student = {
  id: string;
  student_id: string;
  full_name: string;
  email: string;
  roll_number: string;
  section: string;
  grade: string;
  admission_date: string;
  status: string;
};

type SchoolInfo = {
  name: string;
  student_count: number;
  code: string;
};

export default function SchoolStudentsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = React.use(params);
  const { user, loading: authLoading } = useAuth();

  const { data: students, isLoading } = useQuery({
    queryKey: ['admin', 'schools', id, 'students'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/admin/schools/${id}/students`, { credentials: 'include', headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load students');
      return json.data as Student[];
    },
    enabled: !!id && !!user,
  });

  const { data: school } = useQuery({
    queryKey: ['admin', 'schools', 'detail', id],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/admin/schools/${id}`, { credentials: 'include', headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load school');
      return json.data as SchoolInfo;
    },
    enabled: !!id && !!user,
  });

  if (authLoading || isLoading) {
    return (
      <div className={`${styles.shell} ${adminFont.variable}`}>
        <div className={styles.loading}>
          <div className={styles.loader} />
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.shell} ${adminFont.variable}`}>
      <Link href={`/${locale}/admin/schools/${id}`} className={styles.backLink}>
        <ArrowLeft size={14} /> Back to {school?.name || 'School'}
      </Link>

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>
            <GraduationCap size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem', color: '#6366f1' }} />
            Students
          </h1>
          <p className={styles.subtitle}>
            {school?.name} &middot; {school?.code ? `#${school.code}` : ''}
          </p>
        </div>
        <div className={styles.studentCount}>
          <Users size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
          {students?.length || 0} student{(students?.length || 0) !== 1 ? 's' : ''}
        </div>
      </div>

      {!students || students.length === 0 ? (
        <div className={styles.emptyState}>
          <Users size={40} />
          <p>No students found in this school</p>
          <Link href={`/${locale}/admin/schools/${id}`} className={styles.backLink} style={{ justifyContent: 'center' }}>
            <ArrowLeft size={14} /> Back to School
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Student</th>
                <th>Roll No</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Admission Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id}>
                  <td className={styles.mono} data-label="#">{i + 1}</td>
                  <td data-label="Student">
                    <div className={styles.nameCell}>
                      <div className={styles.avatar}>
                        {s.full_name.charAt(0).toUpperCase()}
                      </div>
                      <span className={styles.nameText}>{s.full_name}</span>
                    </div>
                  </td>
                  <td className={styles.mono} data-label="Roll No">{s.roll_number}</td>
                  <td data-label="Grade"><BookOpen size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem', color: '#94a3b8' }} />{s.grade}</td>
                  <td data-label="Section">{s.section}</td>
                  <td data-label="Admission Date" className={styles.mono}>
                    <Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem', color: '#94a3b8' }} />
                    {s.admission_date}
                  </td>
                  <td data-label="Status">
                    <span className={`${styles.badgeStatus} ${s.status === 'Active' ? styles.badgeActive : styles.badgeInactive}`}>
                      <BadgeCheck size={10} />
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
