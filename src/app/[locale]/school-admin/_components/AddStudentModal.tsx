'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Phone,
  BookOpen,
  Hash,
  ChevronDown,
  Copy,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useCreateStudent, useSchoolStudents } from '@/hooks/useSchoolStudents';
import type { CreateStudentResult } from '@/hooks/useSchoolStudents';
import styles from './AddStudentModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddStudentModal({ open, onClose }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [copied, setCopied] = useState<'none' | 'student_user' | 'student_pass' | 'parent_user' | 'parent_pass'>('none');

  const { data: studentsRes } = useSchoolStudents();
  const createStudent = useCreateStudent();

  const students = studentsRes?.data ?? [];

  // Fetch all available grades from the public API (not derived from existing students)
  const [gradeOptions, setGradeOptions] = useState<Array<{ id: string; name: string; code: string }>>([]);
  useEffect(() => {
    fetch('/api/grades')
      .then((r) => r.json())
      .then((payload) => {
        const raw = (payload.data || []) as Array<{ id: string; name: string; code: string; sort_order?: number }>;
        setGradeOptions(raw);
      })
      .catch(() => {/* fallback: keep empty */});
  }, []);

  const sections = useMemo(() => {
    const set = new Set<string>();
    (students as Array<{ grade_id: string | null; section: string | null }>).forEach((s) => {
      if (s.grade_id === grade && s.section) set.add(s.section);
    });
    return Array.from(set).sort();
  }, [students, grade]);

  useEffect(() => {
    if (!open) {
      setStep('form');
      setFullName('');
      setGrade('');
      setSection('');
      setRollNumber('');
      setParentName('');
      setParentEmail('');
      setParentPhone('');
      setCopied('none');
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !grade || !parentEmail || !parentPhone) return;
    try {
      await createStudent.mutateAsync({
        full_name: fullName,
        grade_id: grade,
        section: section || undefined,
        roll_number: rollNumber || undefined,
        parent_name: parentName || undefined,
        parent_email: parentEmail,
        parent_phone: parentPhone,
      });
      setStep('success');
    } catch {
      // error handled by mutation state
    }
  };

  const resultData = createStudent.data as any;

  const handleCopy = (field: typeof copied, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied('none'), 2000);
    });
  };

  const isLoading = createStudent.isPending;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <div className={styles.header}>
              <h2 className={styles.heading}>
                {step === 'form' ? 'Add New Student' : 'Student Created'}
              </h2>
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {step === 'form' ? (
              <form className={styles.body} onSubmit={handleSubmit}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a085', marginBottom: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.25rem' }}>
                  Student Details
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Student Full Name</label>
                  <div className={styles.inputWrap}>
                    <User size={16} className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      placeholder="e.g. Ravi Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Grade</label>
                    <div className={styles.selectWrap}>
                      <BookOpen size={16} className={styles.inputIcon} />
                      <select
                        className={styles.select}
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                      >
                        <option value="">— Select Grade —</option>
                        {gradeOptions.map((g) => {
                          const emoji = g.code === 'lkg' ? '🌱' : g.code === 'ukg' ? '🌿' :
                            g.code?.startsWith('grade-') ? `${g.code.replace('grade-', '')}` + '️⃣' : '📚';
                          return (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown size={16} className={styles.chevron} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Section <span className={styles.hint}>(optional)</span></label>
                    <div className={styles.selectWrap}>
                      <Hash size={16} className={styles.inputIcon} />
                      <select
                        className={styles.select}
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        disabled={!grade}
                      >
                        <option value="">Select</option>
                        {sections.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={16} className={styles.chevron} />
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Roll Number <span className={styles.hint}>(optional)</span></label>
                  <div className={styles.inputWrap}>
                    <Hash size={16} className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      placeholder="e.g. 101"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a085', marginTop: '1.25rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.25rem' }}>
                  Parent Details & Credentials Delivery
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Parent Full Name <span className={styles.hint}>(optional)</span></label>
                  <div className={styles.inputWrap}>
                    <User size={16} className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      placeholder="e.g. Kumar"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Parent Email <span className={styles.hint}>(required for login & emails)</span></label>
                  <div className={styles.inputWrap}>
                    <Mail size={16} className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="e.g. parent@example.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Parent Phone <span className={styles.hint}>(used to generate passwords)</span></label>
                  <div className={styles.inputWrap}>
                    <Phone size={16} className={styles.inputIcon} />
                    <input
                      className={styles.input}
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {createStudent.error && (
                  <div className={styles.error}>
                    {createStudent.error.message}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading || !fullName || !grade || !parentEmail || !parentPhone}
                >
                  {isLoading ? (
                    <><Loader2 size={18} className={styles.spin} /> Creating...</>
                  ) : (
                    'Create Student & Parent'
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.body}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={40} color="#22c55e" />
                </div>
                <p className={styles.successText}>Student and Parent profiles linked successfully!</p>
                <p className={styles.successSub} style={{ marginBottom: '1rem' }}>
                  An onboarding email has been sent to <strong>{resultData?.parent_email}</strong>.
                </p>

                <div style={{ fontSize: '0.74rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#16a085', marginBottom: '0.4rem' }}>
                  Student Learning Space
                </div>
                <div className={styles.credBox} style={{ marginBottom: '1.25rem' }}>
                  <div className={styles.credRow}>
                    <Mail size={16} />
                    <div className={styles.credContent}>
                      <p className={styles.credLabel}>Student ID (Username)</p>
                      <p className={styles.credValue}>{resultData?.username}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy('student_user', resultData?.username || '')}
                      aria-label="Copy student username"
                    >
                      {copied === 'student_user' ? <CheckCircle2 size={16} color="#22c55e" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className={styles.credRow}>
                    <Eye size={16} />
                    <div className={styles.credContent}>
                      <p className={styles.credLabel}>Student Password</p>
                      <p className={styles.credValue}>{resultData?.password}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy('student_pass', resultData?.password || '')}
                      aria-label="Copy student password"
                    >
                      {copied === 'student_pass' ? <CheckCircle2 size={16} color="#22c55e" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.74rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#16a085', marginBottom: '0.4rem' }}>
                  Parent Control Panel
                </div>
                <div className={styles.credBox} style={{ marginBottom: '1.5rem' }}>
                  <div className={styles.credRow}>
                    <Mail size={16} />
                    <div className={styles.credContent}>
                      <p className={styles.credLabel}>Parent Username</p>
                      <p className={styles.credValue}>{resultData?.parent_email}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopy('parent_user', resultData?.parent_email || '')}
                      aria-label="Copy parent username"
                    >
                      {copied === 'parent_user' ? <CheckCircle2 size={16} color="#22c55e" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className={styles.credRow}>
                    <Eye size={16} />
                    <div className={styles.credContent}>
                      <p className={styles.credLabel}>Parent Password</p>
                      <p className={styles.credValue}>
                        {resultData?.parent_status === 'linked' ? '(Linked to existing account)' : resultData?.parent_password}
                      </p>
                    </div>
                    {resultData?.parent_status !== 'linked' && (
                      <button
                        type="button"
                        className={styles.copyBtn}
                        onClick={() => handleCopy('parent_pass', resultData?.parent_password || '')}
                        aria-label="Copy parent password"
                      >
                        {copied === 'parent_pass' ? <CheckCircle2 size={16} color="#22c55e" /> : <Copy size={16} />}
                      </button>
                    )}
                  </div>
                </div>

                <button type="button" className={styles.submitBtn} onClick={onClose}>
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
