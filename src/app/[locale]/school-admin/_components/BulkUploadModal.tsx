'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  FileSpreadsheet,
  Link2,
  KeyRound,
  ArrowLeft,
  Trash2,
  Eye,
  Search
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import styles from './AddStudentModal.module.css'; 
import bulkStyles from './BulkUploadModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onUploadComplete?: (result: any) => void;
};

interface CredentialRow {
  student_name: string;
  student_email: string;
  student_password: string;
  parent_email?: string;
  parent_status: 'created' | 'linked' | 'none';
}

interface UploadResult {
  success: number;
  linked_to_existing: number;
  failed: number;
  errors: string[];
  credentials: CredentialRow[];
  students?: any[];
}

export default function BulkUploadModal({ open, onClose, onUploadComplete }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  const [historyLogs, setHistoryLogs] = useState<any[]>([]);
  const [selectedHistoryRun, setSelectedHistoryRun] = useState<any | null>(null);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [historySearch, setHistorySearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setLoading(false);
      setError(null);
      setResult(null);
      setActiveTab('upload');
      setSelectedHistoryRun(null);
      setHistoryFilter('all');
      setHistorySearch('');
    }
  }, [open]);

  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      const raw = localStorage.getItem('zhi_bulk_upload_history');
      setHistoryLogs(raw ? JSON.parse(raw) : []);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const downloadTemplate = () => {
    const csvContent = [
      // Header row
      ['Full Name', 'Date of Birth (YYYY-MM-DD)', 'Grade Name', 'Section', 'Roll Number', 'Parent Name', 'Parent Email', 'Parent Phone'],
      // Instruction row — NOT to be uploaded, just guidance
      ['--- INSTRUCTIONS: Grade Name must exactly match one of: LKG | UKG | Grade 1 | Grade 2 | ... | Grade 10 ---', '', '', '', '', '', '', ''],
      // Sample data rows
      ['Ravi Kumar',    '2020-04-12', 'LKG',     'A', 'R101', 'Kumar S',        'parent.kumar@example.com',   '9876543210'],
      ['Meera Pillai',  '2019-08-25', 'UKG',     'B', 'R102', 'Pillai Rajan',   'parent.rajan@example.com',   '9090909090'],
      ['Arjun Sharma',  '2018-06-15', 'Grade 1', 'A', 'R103', 'Sharma Ganesh',  'parent.sharma@example.com',  '9123456789'],
      ['Divya Nair',    '2017-11-30', 'Grade 2', 'C', 'R104', 'Nair Suresh',    'parent.nair@example.com',    '9234567890'],
    ];
    const csv = csvContent.map(row => row.map((cell: string) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zhi_students_bulk_upload_template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadLoginSheet = () => {
    if (!result || !result.credentials) return;
    const csvContent = [
      ['Student Name', 'Student ID (Username)', 'Temporary Password', 'Parent Email', 'Parent Registration Status'],
      ...result.credentials.map(row => [
        row.student_name,
        row.student_email,
        row.student_password,
        row.parent_email || 'N/A',
        row.parent_status === 'created' ? 'Created New Account' : row.parent_status === 'linked' ? 'Linked to Existing' : 'No Parent Registered'
      ])
    ];
    const csv = csvContent.map(row => row.map((cell: string) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_credentials_sheet_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadErrorLog = () => {
    if (!result || !result.errors || result.errors.length === 0) return;
    const content = [
      "=== ZHI BULK STUDENT UPLOAD ERROR LOG ===",
      `Date: ${new Date().toLocaleString()}`,
      `Total Success: ${result.success}`,
      `Total Linked to Existing: ${result.linked_to_existing}`,
      `Total Failed: ${result.failed}`,
      "----------------------------------------",
      ...result.errors.map((err, i) => `${i + 1}. ${err}`)
    ].join("\r\n");

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk_upload_errors_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  interface LogTableRow {
    rowNum: number;
    studentName: string;
    grade: string;
    parentEmail?: string;
    status: 'Success' | 'Linked' | 'Failed';
    credentials?: {
      email: string;
      pass: string;
    };
    errorMsg?: string;
  }

  const downloadHistoryCredentials = (run: any) => {
    if (!run || !run.credentials) return;
    const csvContent = [
      ['Student Name', 'Student ID (Username)', 'Temporary Password', 'Parent Email', 'Parent Registration Status'],
      ...run.credentials.map((row: any) => [
        row.student_name,
        row.student_email,
        row.student_password,
        row.parent_email || 'N/A',
        row.parent_status === 'created' ? 'Created New Account' : row.parent_status === 'linked' ? 'Linked to Existing' : 'No Parent Registered'
      ])
    ];
    const csv = csvContent.map(row => row.map((cell: string) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_credentials_run_${run.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHistoryErrors = (run: any) => {
    if (!run || !run.errors || run.errors.length === 0) return;
    const content = [
      "=== ZHI BULK STUDENT UPLOAD ERROR LOG ===",
      `Date: ${new Date(run.timestamp).toLocaleString()}`,
      `Total Success: ${run.success}`,
      `Total Linked to Existing: ${run.linked || run.linked_to_existing || 0}`,
      `Total Failed: ${run.failed}`,
      "----------------------------------------",
      ...run.errors.map((err: string, i: number) => `${i + 1}. ${err}`)
    ].join("\r\n");

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk_upload_errors_run_${run.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteHistoryRun = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this log from history?")) return;
    const rawHistory = localStorage.getItem('zhi_bulk_upload_history');
    if (rawHistory) {
      const historyList = JSON.parse(rawHistory);
      const filtered = historyList.filter((item: any) => item.id !== id);
      localStorage.setItem('zhi_bulk_upload_history', JSON.stringify(filtered));
      setHistoryLogs(filtered);
      if (selectedHistoryRun?.id === id) {
        setSelectedHistoryRun(null);
      }
    }
  };

  const getLogTableRows = (run: any): LogTableRow[] => {
    if (!run || !run.students) return [];
    return run.students.map((student: any, idx: number) => {
      const rowNum = idx + 2;
      const errorMsg = run.errors?.find((e: string) => e.startsWith(`Row ${rowNum}:`)) || null;
      
      if (errorMsg) {
        return {
          rowNum,
          studentName: student.full_name || 'N/A',
          grade: student.grade_name || 'N/A',
          parentEmail: student.parent_email || 'N/A',
          status: 'Failed',
          errorMsg: errorMsg.replace(`Row ${rowNum}: `, '')
        };
      } else {
        const cred = run.credentials?.find((c: any) => c.student_name?.toLowerCase() === student.full_name?.toLowerCase());
        return {
          rowNum,
          studentName: student.full_name,
          grade: student.grade_name,
          parentEmail: student.parent_email || 'N/A',
          status: cred?.parent_status === 'linked' ? 'Linked' : 'Success',
          credentials: cred ? { email: cred.student_email, pass: cred.student_password } : undefined
        };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
      setResult(null);
    }
  };

  // Simple CSV parser supporting double quotes and headers mapping
  const parseCSV = (text: string) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_'));
    const nameIdx = headers.findIndex(h => h.includes('name') && !h.includes('parent'));
    const dobIdx = headers.findIndex(h => h.includes('dob') || h.includes('birth') || h.includes('date'));
    const gradeIdx = headers.findIndex(h => h.includes('grade'));
    const sectionIdx = headers.findIndex(h => h.includes('section'));
    const rollIdx = headers.findIndex(h => h.includes('roll'));
    const parentNameIdx = headers.findIndex(h => h.includes('parent_name') || (h.includes('parent') && h.includes('name')));
    const parentEmailIdx = headers.findIndex(h => h.includes('parent_email') || (h.includes('parent') && h.includes('email')));
    const parentPhoneIdx = headers.findIndex(h => h.includes('parent_phone') || (h.includes('parent') && h.includes('phone') || h.includes('mobile')));

    const parsed = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
      const cleanCols = cols.map(c => c.trim().replace(/^"|"$/g, '').trim());

      const fullName = nameIdx !== -1 && cleanCols[nameIdx] ? cleanCols[nameIdx] : '';
      const dob = dobIdx !== -1 && cleanCols[dobIdx] ? cleanCols[dobIdx] : '';
      const gradeName = gradeIdx !== -1 && cleanCols[gradeIdx] ? cleanCols[gradeIdx] : '';
      const section = sectionIdx !== -1 && cleanCols[sectionIdx] ? cleanCols[sectionIdx] : '';
      const rollNumber = rollIdx !== -1 && cleanCols[rollIdx] ? cleanCols[rollIdx] : '';
      const parentName = parentNameIdx !== -1 && cleanCols[parentNameIdx] ? cleanCols[parentNameIdx] : '';
      const parentEmail = parentEmailIdx !== -1 && cleanCols[parentEmailIdx] ? cleanCols[parentEmailIdx] : '';
      const parentPhone = parentPhoneIdx !== -1 && cleanCols[parentPhoneIdx] ? cleanCols[parentPhoneIdx] : '';

      if (fullName || gradeName) {
        parsed.push({
          full_name: fullName,
          date_of_birth: dob || undefined,
          grade_name: gradeName,
          section: section || undefined,
          roll_number: rollNumber || undefined,
          parent_name: parentName || undefined,
          parent_email: parentEmail || undefined,
          parent_phone: parentPhone || undefined
        });
      }
    }
    return parsed;
  };

  const handleUpload = async () => {
    if (!file || !user?.schoolId) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const text = await file.text();
      const studentsList = parseCSV(text);

      if (studentsList.length === 0) {
        setError('No valid student rows found. Please check template headers.');
        setLoading(false);
        return;
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('zhi_auth_token') : null;
      
      const res = await fetch(`${API_BASE}/api/school-admin/students/bulk`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ students: studentsList }),
        credentials: 'include'
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload.error || 'Failed to process bulk upload.');
      } else {
        setResult(payload.data ? { ...payload.data, students: studentsList } : null);
        
        if (payload.data) {
          const newHistoryItem = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            fileName: file?.name || 'students_upload.csv',
            success: payload.data.success || 0,
            linked: payload.data.linked_to_existing || 0,
            failed: payload.data.failed || 0,
            errors: payload.data.errors || [],
            credentials: payload.data.credentials || [],
            students: studentsList
          };
          const rawHistory = localStorage.getItem('zhi_bulk_upload_history');
          const historyList = rawHistory ? JSON.parse(rawHistory) : [];
          historyList.unshift(newHistoryItem);
          localStorage.setItem('zhi_bulk_upload_history', JSON.stringify(historyList));
          setHistoryLogs(historyList);

          if (onUploadComplete) {
            onUploadComplete(newHistoryItem);
          }
        }

        queryClient.invalidateQueries({ queryKey: ['school-admin', 'students'] });
        queryClient.invalidateQueries({ queryKey: ['school-admin', 'dashboard'] });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

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
            className={`${styles.modal} ${bulkStyles.bulkModal}`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <div className={styles.header}>
              <h2 className={styles.heading}>Bulk Upload Students</h2>
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.body}>
              {selectedHistoryRun ? (
                /* Interactive History Detail Table View */
                <div>
                  <div className={bulkStyles.detailHeader}>
                    <button
                      type="button"
                      className={bulkStyles.backBtn}
                      onClick={() => {
                        setSelectedHistoryRun(null);
                        setHistoryFilter('all');
                        setHistorySearch('');
                      }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <h3 className={bulkStyles.detailTitle}>{selectedHistoryRun.fileName}</h3>
                  </div>

                  <div className={bulkStyles.filterBar}>
                    <div className={bulkStyles.filterTabs}>
                      <button
                        type="button"
                        className={`${bulkStyles.filterTab} ${historyFilter === 'all' ? bulkStyles.filterTabActive : ''}`}
                        onClick={() => setHistoryFilter('all')}
                      >
                        All ({getLogTableRows(selectedHistoryRun).length})
                      </button>
                      <button
                        type="button"
                        className={`${bulkStyles.filterTab} ${historyFilter === 'success' ? bulkStyles.filterTabActive : ''}`}
                        onClick={() => setHistoryFilter('success')}
                      >
                        Success ({getLogTableRows(selectedHistoryRun).filter(r => r.status !== 'Failed').length})
                      </button>
                      <button
                        type="button"
                        className={`${bulkStyles.filterTab} ${historyFilter === 'failed' ? bulkStyles.filterTabActive : ''}`}
                        onClick={() => setHistoryFilter('failed')}
                      >
                        Failed ({getLogTableRows(selectedHistoryRun).filter(r => r.status === 'Failed').length})
                      </button>
                    </div>

                    <input
                      type="search"
                      placeholder="Search name..."
                      className={bulkStyles.detailSearch}
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                    />
                  </div>

                  <div className={bulkStyles.tableContainer}>
                    <table className={bulkStyles.detailTable}>
                      <thead>
                        <tr>
                          <th>Row</th>
                          <th>Student Info</th>
                          <th>Parent</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getLogTableRows(selectedHistoryRun)
                          .filter(r => {
                            if (historyFilter === 'success') return r.status !== 'Failed';
                            if (historyFilter === 'failed') return r.status === 'Failed';
                            return true;
                          })
                          .filter(r => {
                            if (!historySearch) return true;
                            const query = historySearch.toLowerCase();
                            return (
                              r.studentName.toLowerCase().includes(query) ||
                              r.parentEmail?.toLowerCase().includes(query) ||
                              (r.credentials?.email && r.credentials.email.toLowerCase().includes(query))
                            );
                          })
                          .map((row) => (
                            <tr key={row.rowNum}>
                              <td>{row.rowNum}</td>
                              <td>
                                <div>
                                  <strong>{row.studentName}</strong>
                                  <span style={{ fontSize: '0.64rem', color: '#64748b', display: 'block' }}>
                                    Grade: {row.grade}
                                  </span>
                                  {row.credentials && (
                                    <span style={{ fontSize: '0.64rem', color: '#0f766e', display: 'block', wordBreak: 'break-all' }}>
                                      UID: {row.credentials.email} | PW: {row.credentials.pass}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td style={{ fontSize: '0.68rem', color: '#475569' }}>
                                {row.parentEmail}
                              </td>
                              <td>
                                {row.status === 'Failed' ? (
                                  <div>
                                    <span className={bulkStyles.rowFailed}>Failed</span>
                                    <span className={bulkStyles.errorTooltip}>{row.errorMsg}</span>
                                  </div>
                                ) : (
                                  <span className={row.status === 'Linked' ? bulkStyles.rowSuccess : bulkStyles.rowSuccess} style={{ color: row.status === 'Linked' ? '#0f766e' : '#22c55e' }}>
                                    {row.status === 'Linked' ? 'Linked' : 'Created'}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      type="button"
                      className={bulkStyles.downloadBtn}
                      onClick={() => downloadHistoryCredentials(selectedHistoryRun)}
                      disabled={!selectedHistoryRun.credentials || selectedHistoryRun.credentials.length === 0}
                      style={{ flex: 1, height: '2.4rem' }}
                    >
                      <Download size={14} /> Download Credentials
                    </button>
                    {selectedHistoryRun.errors && selectedHistoryRun.errors.length > 0 && (
                      <button
                        type="button"
                        className={bulkStyles.templateBtn}
                        onClick={() => downloadHistoryErrors(selectedHistoryRun)}
                        style={{ flex: 1, justifyContent: 'center', height: '2.4rem' }}
                      >
                        <Download size={14} /> Download Errors
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* History List Tab / Upload CSV Tab Selection */
                <>
                  {/* Tabs navigation at the top, only if result is not currently showing */}
                  {!result && (
                    <div className={bulkStyles.tabs}>
                      <button
                        type="button"
                        className={`${bulkStyles.tab} ${activeTab === 'upload' ? bulkStyles.activeTab : ''}`}
                        onClick={() => setActiveTab('upload')}
                      >
                        Upload CSV
                      </button>
                      <button
                        type="button"
                        className={`${bulkStyles.tab} ${activeTab === 'history' ? bulkStyles.activeTab : ''}`}
                        onClick={() => setActiveTab('history')}
                      >
                        History Logs
                      </button>
                    </div>
                  )}

                  {activeTab === 'upload' ? (
                    !result ? (
                      /* Upload Panel */
                      <>
                        <div className={bulkStyles.infoBox}>
                          <p className={bulkStyles.infoText}>
                            Import multiple students and automatically link parent emails. System invitation messages containing passwords will be sent out instantly.
                          </p>
                          <button type="button" className={bulkStyles.templateBtn} onClick={downloadTemplate}>
                            <Download size={14} />
                            <span>Download CSV Template</span>
                          </button>
                        </div>

                        <div
                          className={`${bulkStyles.dropZone} ${file ? bulkStyles.hasFile : ''}`}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept=".csv"
                            onChange={handleFileChange}
                          />
                          {file ? (
                            <div className={bulkStyles.fileDetails}>
                              <FileSpreadsheet size={32} className={bulkStyles.sheetIcon} />
                              <p className={bulkStyles.fileName}>{file.name}</p>
                              <p className={bulkStyles.fileSize}>{(file.size / 1024).toFixed(1)} KB</p>
                              <button
                                type="button"
                                className={bulkStyles.changeFile}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFile(null);
                                }}
                              >
                                Change File
                              </button>
                            </div>
                          ) : (
                            <div className={bulkStyles.dropPrompt}>
                              <Upload size={32} className={bulkStyles.uploadIcon} />
                              <p className={bulkStyles.promptText}>Drag & drop CSV file here, or click to browse</p>
                              <p className={bulkStyles.promptHint}>Template contains parent detail columns</p>
                            </div>
                          )}
                        </div>

                        {error && (
                          <div className={styles.error} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{error}</span>
                          </div>
                        )}

                        <button
                          type="button"
                          className={styles.submitBtn}
                          onClick={handleUpload}
                          disabled={loading || !file}
                          style={{ marginTop: '1rem' }}
                        >
                          {loading ? (
                            <><Loader2 size={18} className={styles.spin} /> Processing Upload...</>
                          ) : (
                            'Start Upload'
                          )}
                        </button>
                      </>
                    ) : (
                      /* Result Panel */
                      <div className={bulkStyles.resultBox}>
                        <div className={styles.successIcon} style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#22c55e', margin: '0 auto 1rem' }}>
                          <CheckCircle2 size={36} />
                        </div>
                        <h3 className={bulkStyles.resultTitle}>Upload Complete!</h3>
                        <div className={bulkStyles.statsGridThree}>
                          <div className={bulkStyles.statItem}>
                            <span className={bulkStyles.statNum} style={{ color: '#22c55e' }}>{result.success}</span>
                            <span className={bulkStyles.statLabel}>Added Successfully</span>
                          </div>
                          <div className={bulkStyles.statItem}>
                            <span className={bulkStyles.statNum} style={{ color: '#0f766e' }}>{result.linked_to_existing}</span>
                            <span className={bulkStyles.statLabel}>Linked (Existing)</span>
                          </div>
                          <div className={bulkStyles.statItem}>
                            <span className={bulkStyles.statNum} style={{ color: result.failed > 0 ? '#ef4444' : '#64748b' }}>{result.failed}</span>
                            <span className={bulkStyles.statLabel}>Failed Rows</span>
                          </div>
                        </div>

                        <div className={bulkStyles.downloadBox}>
                          <div className={bulkStyles.downloadContent}>
                            <KeyRound size={20} color="#16a085" />
                            <div>
                              <h4 className={bulkStyles.downloadTitle}>Login Credentials Sheet</h4>
                              <p className={bulkStyles.downloadDesc}>Backup of student usernames & passwords generated in this upload</p>
                            </div>
                          </div>
                          <button type="button" className={bulkStyles.downloadBtn} onClick={downloadLoginSheet}>
                            <Download size={14} />
                            <span>Download Login Sheet</span>
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                          <button
                            type="button"
                            className={bulkStyles.templateBtn}
                            onClick={() => {
                              setSelectedHistoryRun({
                                id: 'current',
                                timestamp: new Date().toISOString(),
                                fileName: file?.name || 'students_upload.csv',
                                success: result.success,
                                linked: result.linked_to_existing,
                                failed: result.failed,
                                errors: result.errors,
                                credentials: result.credentials,
                                students: result.students
                              });
                            }}
                            style={{ flex: 1, justifyContent: 'center', height: '2.4rem' }}
                          >
                            <Eye size={14} /> View as Table
                          </button>
                          {result.errors && result.errors.length > 0 && (
                            <button
                              type="button"
                              className={bulkStyles.templateBtn}
                              onClick={downloadErrorLog}
                              style={{ flex: 1, justifyContent: 'center', height: '2.4rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
                            >
                              <Download size={14} /> Download Errors
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          className={styles.submitBtn}
                          onClick={() => {
                            setResult(null);
                            setFile(null);
                          }}
                          style={{ marginTop: '0.5rem' }}
                        >
                          Done
                        </button>
                      </div>
                    )
                  ) : (
                    /* History Logs List Panel */
                    <div className={bulkStyles.historyList}>
                      {historyLogs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                          <FileSpreadsheet size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                          <p style={{ fontSize: '0.8rem', fontWeight: 800 }}>No bulk upload history found.</p>
                          <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>Your uploads on this computer will be saved here.</p>
                        </div>
                      ) : (
                        historyLogs.map((run) => (
                          <div key={run.id} className={bulkStyles.historyCard}>
                            <div className={bulkStyles.historyHeader}>
                              <p className={bulkStyles.historyFile} title={run.fileName}>{run.fileName}</p>
                              <span className={bulkStyles.historyDate}>
                                {new Date(run.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <div className={bulkStyles.historyStats}>
                              <span style={{ color: '#22c55e' }}>Success: {run.success}</span>
                              <span style={{ color: '#0f766e' }}>Linked: {run.linked || run.linked_to_existing || 0}</span>
                              <span style={{ color: run.failed > 0 ? '#ef4444' : '#64748b' }}>Failed: {run.failed}</span>
                            </div>
                            <div className={bulkStyles.historyActions}>
                              <button
                                type="button"
                                className={bulkStyles.historyBtn}
                                onClick={() => setSelectedHistoryRun(run)}
                              >
                                <Eye size={12} /> View Table
                              </button>
                              <button
                                type="button"
                                className={bulkStyles.historyBtn}
                                onClick={() => downloadHistoryCredentials(run)}
                              >
                                <Download size={12} /> Credentials
                              </button>
                              {run.errors && run.errors.length > 0 && (
                                <button
                                  type="button"
                                  className={bulkStyles.historyBtn}
                                  onClick={() => downloadHistoryErrors(run)}
                                >
                                  <Download size={12} /> Errors
                                </button>
                              )}
                              <button
                                type="button"
                                className={`${bulkStyles.historyBtn} ${bulkStyles.historyBtnDel}`}
                                onClick={(e) => deleteHistoryRun(run.id, e)}
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
