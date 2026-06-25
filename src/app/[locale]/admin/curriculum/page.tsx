'use client';

import { useParams, useRouter } from 'next/navigation';
import { Manrope } from 'next/font/google';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Folder,
  FolderOpen,
  FileVideo,
  ArrowLeft,
  Home,
  AlertTriangle,
  Play,
  Layers,
  Crown,
  Award,
  Activity,
  Search,
  Tag,
  Info,
  Clock,
  Video,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { adminKeys } from '@/core/constants/queryKeys';
import { adminApi } from '@/core/services/adminApi';
import styles from './page.module.css';

const adminFont = Manrope({
  subsets: ['latin'],
  variable: '--admin-font',
  display: 'swap',
});

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

type Level = 'boards' | 'grades' | 'subjects' | 'chapters' | 'lessons';
type CurriculumItem = Record<string, any>;

const levelConfig: Record<Level, { label: string; parentLabel?: string; api: string; placeholder: string }> = {
  boards: { label: 'Board', api: 'boards', placeholder: 'State board, CBSE, IBSE' },
  grades: { label: 'Grade', parentLabel: 'Board', api: 'grades', placeholder: 'Grade 1, Grade 5, Grade 9' },
  subjects: { label: 'Subject', parentLabel: 'Grade', api: 'subjects', placeholder: 'Math, Science, English' },
  chapters: { label: 'Chapter', parentLabel: 'Subject', api: 'chapters', placeholder: 'Numbers, Plant Biology, Grammar' },
  lessons: { label: 'Lesson', parentLabel: 'Chapter', api: 'lessons', placeholder: 'YouTube URL or video title' },
};

const statusOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 2 },
];

function getPreviewImage(videoId: string | null | undefined) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

function normalizeYoutubeId(url: string | null | undefined) {
  if (!url) return '';
  const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? url;
}

export default function CurriculumAdminPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { user, loading } = useAuth();

  const [activeLevel, setActiveLevel] = useState<Level>('boards');
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CurriculumItem | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | number>>({
    name: '',
    code: '',
    description: '',
    age_range: '',
    title: '',
    youtube_video_id: '',
    thumbnail_url: '',
    duration_seconds: '',
    status_id: 1,
  });

  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/login`);
    }
  }, [loading, locale, router, user]);

  const queryClient = useQueryClient();

  const { data: boards = [] as CurriculumItem[] } = useQuery<CurriculumItem[]>({
    queryKey: [...adminKeys.boards],
    queryFn: () => adminApi.boards() as Promise<CurriculumItem[]>,
    enabled: !loading && Boolean(user),
    staleTime: 60_000,
  });

  const { data: grades = [] as CurriculumItem[] } = useQuery<CurriculumItem[]>({
    queryKey: [...adminKeys.grades, selectedBoardId, user?.id],
    queryFn: () => adminApi.grades(selectedBoardId) as Promise<CurriculumItem[]>,
    enabled: !!selectedBoardId,
    staleTime: 60_000,
  });

  const { data: subjects = [] as CurriculumItem[] } = useQuery<CurriculumItem[]>({
    queryKey: [...adminKeys.subjects, selectedGradeId, user?.id],
    queryFn: () => adminApi.subjects(selectedGradeId) as Promise<CurriculumItem[]>,
    enabled: !!selectedGradeId,
    staleTime: 60_000,
  });

  const { data: chapters = [] as CurriculumItem[] } = useQuery<CurriculumItem[]>({
    queryKey: [...adminKeys.chapters, selectedSubjectId, user?.id],
    queryFn: () => adminApi.chapters(selectedSubjectId) as Promise<CurriculumItem[]>,
    enabled: !!selectedSubjectId,
    staleTime: 60_000,
  });

  const { data: lessons = [] as CurriculumItem[] } = useQuery<CurriculumItem[]>({
    queryKey: [...adminKeys.lessons, selectedChapterId, user?.id],
    queryFn: () => adminApi.lessons(selectedChapterId) as Promise<CurriculumItem[]>,
    enabled: !!selectedChapterId,
    staleTime: 60_000,
  });

  const currentItems = useMemo(() => {
    switch (activeLevel) {
      case 'boards': return boards;
      case 'grades': return grades;
      case 'subjects': return subjects;
      case 'chapters': return chapters;
      case 'lessons': return lessons;
      default: return [];
    }
  }, [activeLevel, boards, grades, subjects, chapters, lessons]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return currentItems;
    return currentItems.filter((item) => {
      const nameMatch = (item.name || '').toLowerCase().includes(q);
      const titleMatch = (item.title || '').toLowerCase().includes(q);
      const codeMatch = (item.code || '').toLowerCase().includes(q);
      const descMatch = (item.description || '').toLowerCase().includes(q);
      return nameMatch || titleMatch || codeMatch || descMatch;
    });
  }, [currentItems, searchQuery]);

  const activeParentId = useMemo(() => {
    switch (activeLevel) {
      case 'grades': return selectedBoardId;
      case 'subjects': return selectedGradeId;
      case 'chapters': return selectedSubjectId;
      case 'lessons': return selectedChapterId;
      default: return '';
    }
  }, [activeLevel, selectedBoardId, selectedGradeId, selectedSubjectId, selectedChapterId]);

  const parentLabel = levelConfig[activeLevel].parentLabel;
  const canAddCurrent = activeLevel === 'boards' || Boolean(activeParentId);
  const primaryLabel = levelConfig[activeLevel].label;

  // Folder navigation helpers
  const exploreBoard = (id: string) => {
    setSelectedBoardId(id);
    setActiveLevel('grades');
    setSearchQuery('');
  };

  const exploreGrade = (id: string) => {
    setSelectedGradeId(id);
    setActiveLevel('subjects');
    setSearchQuery('');
  };

  const exploreSubject = (id: string) => {
    setSelectedSubjectId(id);
    setActiveLevel('chapters');
    setSearchQuery('');
  };

  const exploreChapter = (id: string) => {
    setSelectedChapterId(id);
    setActiveLevel('lessons');
    setSearchQuery('');
  };

  const handleRowExplore = (item: CurriculumItem) => {
    switch (activeLevel) {
      case 'boards': exploreBoard(item.id); break;
      case 'grades': exploreGrade(item.id); break;
      case 'subjects': exploreSubject(item.id); break;
      case 'chapters': exploreChapter(item.id); break;
    }
  };

  // Interactive Breadcrumbs Trail
  const breadcrumbsList = useMemo(() => {
    const list = [{
      id: 'boards',
      label: 'Root (Boards)',
      active: activeLevel === 'boards',
      onClick: () => {
        setActiveLevel('boards');
        setSelectedBoardId('');
        setSelectedGradeId('');
        setSelectedSubjectId('');
        setSelectedChapterId('');
        setSearchQuery('');
      }
    }];

    if (selectedBoardId) {
      const board = boards.find((b) => b.id === selectedBoardId);
      list.push({
        id: 'grades',
        label: board?.name || 'Board',
        active: activeLevel === 'grades',
        onClick: () => {
          setActiveLevel('grades');
          setSelectedGradeId('');
          setSelectedSubjectId('');
          setSelectedChapterId('');
          setSearchQuery('');
        }
      });
    }

    if (selectedGradeId) {
      const grade = grades.find((g) => g.id === selectedGradeId);
      list.push({
        id: 'subjects',
        label: grade?.name || 'Grade',
        active: activeLevel === 'subjects',
        onClick: () => {
          setActiveLevel('subjects');
          setSelectedSubjectId('');
          setSelectedChapterId('');
          setSearchQuery('');
        }
      });
    }

    if (selectedSubjectId) {
      const subject = subjects.find((s) => s.id === selectedSubjectId);
      list.push({
        id: 'chapters',
        label: subject?.name || 'Subject',
        active: activeLevel === 'chapters',
        onClick: () => {
          setActiveLevel('chapters');
          setSelectedChapterId('');
          setSearchQuery('');
        }
      });
    }

    if (selectedChapterId) {
      const chapter = chapters.find((c) => c.id === selectedChapterId);
      list.push({
        id: 'lessons',
        label: chapter?.name || 'Chapter',
        active: activeLevel === 'lessons',
        onClick: () => {
          setActiveLevel('lessons');
          setSearchQuery('');
        }
      });
    }

    return list;
  }, [activeLevel, selectedBoardId, selectedGradeId, selectedSubjectId, selectedChapterId, boards, grades, subjects, chapters]);

  const openForm = (item?: CurriculumItem) => {
    setEditingItem(item ?? null);
    setFormOpen(true);
    if (item) {
      setFormValues({
        name: item.name ?? '',
        code: item.code ?? '',
        description: item.description ?? '',
        age_range: item.age_range ?? '',
        title: item.title ?? item.name ?? '',
        youtube_video_id: item.youtube_video_id ?? '',
        thumbnail_url: item.thumbnail_url ?? '',
        duration_seconds: item.duration_seconds ?? '',
        status_id: item.status_id ?? 1,
      });
    } else {
      setFormValues({
        name: '',
        code: '',
        description: '',
        age_range: '',
        title: '',
        youtube_video_id: '',
        thumbnail_url: '',
        duration_seconds: '',
        status_id: 1,
      });
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingItem(null);
  };

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 3500);
  };

  const saveResource = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!primaryLabel) return;
    if (!canAddCurrent) {
      showFeedback(`Select ${parentLabel?.toLowerCase()} first.`);
      return;
    }

    setIsSaving(true);
    const api = levelConfig[activeLevel].api;
    const method = editingItem ? 'PUT' : 'POST';
    const endpoint = editingItem ? `${API_BASE}/api/admin/${api}/${editingItem.id}` : `${API_BASE}/api/admin/${api}`;

    const payload: Record<string, unknown> = {
      name: formValues.name,
      code: formValues.code,
      description: formValues.description,
      age_range: formValues.age_range,
      title: formValues.title,
      youtube_video_id: normalizeYoutubeId(String(formValues.youtube_video_id || '')).trim() || undefined,
      thumbnail_url: formValues.thumbnail_url,
      duration_seconds: Number(formValues.duration_seconds) || undefined,
      status_id: Number(formValues.status_id) || undefined,
    };

    if (activeLevel === 'grades') payload.board_id = selectedBoardId;
    if (activeLevel === 'subjects') payload.grade_id = selectedGradeId;
    if (activeLevel === 'chapters') payload.subject_id = selectedSubjectId;
    if (activeLevel === 'lessons') payload.chapter_id = selectedChapterId;

    if (activeLevel !== 'lessons') {
      payload.title = formValues.name;
    }

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        showFeedback(data?.error ?? 'Could not save item');
      } else {
        showFeedback(`${primaryLabel} ${editingItem ? 'updated' : 'created'} successfully`);
        closeForm();
        queryClient.invalidateQueries({ queryKey: adminKeys.boards });
        queryClient.invalidateQueries({ queryKey: adminKeys.grades });
        queryClient.invalidateQueries({ queryKey: adminKeys.subjects });
        queryClient.invalidateQueries({ queryKey: adminKeys.chapters });
        queryClient.invalidateQueries({ queryKey: adminKeys.lessons });
      }
    } catch (error) {
      showFeedback('Save failed, try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteResource = async (item: CurriculumItem) => {
    const confirm = window.confirm(`Delete ${primaryLabel} “${item.name || item.title}”?`);
    if (!confirm) return;
    const api = levelConfig[activeLevel].api;
    try {
      const response = await fetch(`${API_BASE}/api/admin/${api}/${item.id}`, { method: 'DELETE', credentials: 'include' });
      const data = await response.json();
      if (!response.ok) {
        showFeedback(data?.error ?? 'Delete failed');
      } else {
        showFeedback(`${primaryLabel} deleted`);
        queryClient.invalidateQueries({ queryKey: adminKeys.boards });
        queryClient.invalidateQueries({ queryKey: adminKeys.grades });
        queryClient.invalidateQueries({ queryKey: adminKeys.subjects });
        queryClient.invalidateQueries({ queryKey: adminKeys.chapters });
        queryClient.invalidateQueries({ queryKey: adminKeys.lessons });
      }
    } catch (error) {
      showFeedback('Delete failed, try again.');
    }
  };

  const swapOrder = async (index: number, direction: 'up' | 'down') => {
    const list = [...filteredItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const source = list[index];
    const target = list[targetIndex];
    const sourceOrder = Number(source.sort_order ?? index + 1);
    const targetOrder = Number(target.sort_order ?? targetIndex + 1);
    const api = levelConfig[activeLevel].api;

    const first = await fetch(`${API_BASE}/api/admin/${api}/${source.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: targetOrder }), credentials: 'include',
    });
    const second = await fetch(`${API_BASE}/api/admin/${api}/${target.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: sourceOrder }), credentials: 'include',
    });
    if (first.ok && second.ok) {
      queryClient.invalidateQueries({ queryKey: adminKeys.boards });
      queryClient.invalidateQueries({ queryKey: adminKeys.grades });
      queryClient.invalidateQueries({ queryKey: adminKeys.subjects });
      queryClient.invalidateQueries({ queryKey: adminKeys.chapters });
      queryClient.invalidateQueries({ queryKey: adminKeys.lessons });
      showFeedback(`${primaryLabel} reordered`);
    }
  };

  if (!hydrated || loading || !user) return null;

  return (
    <main className={`${adminFont.variable} ${styles.shell}`}>
      <div className={styles.bgGlow} />

      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <a href={`/${locale}/admin`} className={styles.backLink}>
              <ArrowLeft size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> Back to dashboard
            </a>
            <p className={styles.eyebrow} style={{ marginTop: '0.75rem' }}>Management</p>
            <h1 className={styles.title}>Curriculum Explorer</h1>
            <p className={styles.subtitle}>
              Configure your courses, grades, subjects, chapters, and lessons in a gorgeous visual tree layout.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => openForm()}
              disabled={!canAddCurrent}
            >
              <Plus size={16} /> Create {primaryLabel}
            </button>
          </div>
        </div>

        {/* Directory Path Breadcrumbs Bar */}
        <section className={styles.explorerPathSection}>
          <div className={styles.pathLabelRow}>
            <Home size={12} className={styles.homeIcon} />
            <span className={styles.pathLabel}>PATH DIRECTORY</span>
          </div>
          <div className={styles.trailContainer}>
            {breadcrumbsList.map((crumb, idx) => (
              <div key={crumb.id} className={styles.trailItem}>
                {idx > 0 && <span className={styles.trailSeparator}>›</span>}
                <button
                  type="button"
                  className={`${styles.trailButton} ${crumb.active ? styles.trailButtonActive : ''}`}
                  onClick={crumb.onClick}
                >
                  {crumb.id === 'boards' ? <Home size={13} style={{ marginRight: '6px' }} /> : <Folder size={13} style={{ marginRight: '6px' }} />}
                  {crumb.label}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Unified Table Workspace - Matches Schools Page Layout */}
        <section className={styles.workspaceContainer}>
          <div className={styles.panelTitleBar}>
            <div>
              <h2>{primaryLabel} Directory</h2>
              <p>Select folders or video lessons under the active branch to explore.</p>
            </div>
            
            <div className={styles.titleBarActions}>
              <div className={styles.searchGroup}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={`Search ${primaryLabel.toLowerCase()}s...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>

          {!canAddCurrent && parentLabel && (
            <div className={styles.warningAlert}>
              <AlertTriangle size={16} />
              <span>Please select a {parentLabel.toLowerCase()} from the breadcrumbs directory above to view or add details.</span>
            </div>
          )}

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>{primaryLabel} Details</th>
                  <th>Code / Video ID</th>
                  <th>Status</th>
                  <th className={styles.actionsCell} style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const isLesson = activeLevel === 'lessons';
                    return (
                      <tr 
                        key={item.id} 
                        className={`${styles.tableRow} ${activeLevel !== 'lessons' ? styles.tableRowFolder : ''}`}
                        onDoubleClick={() => activeLevel !== 'lessons' && handleRowExplore(item)}
                      >
                        <td>
                          <div className={styles.itemCell}>
                            <div className={`${styles.itemIconBadge} ${isLesson ? styles.iconLesson : styles.iconFolder}`}>
                              {isLesson ? <FileVideo size={16} /> : <Folder size={16} />}
                            </div>
                            <div className={styles.itemInfo}>
                              <span className={styles.itemName}>{item.name || item.title}</span>
                              <span className={styles.itemDescription}>
                                {item.description || item.age_range || 'No description available'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.monoText}>
                            {item.code || (item.youtube_video_id ? `YT: ${item.youtube_video_id}` : '—')}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.statusPill} ${item.status_id === 1 ? styles.statusActive : styles.statusInactive}`}>
                            {item.status_id === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className={styles.actionsCell}>
                          <div className={styles.actionRow} onClick={(e) => e.stopPropagation()}>
                            {activeLevel !== 'lessons' && (
                              <button
                                type="button"
                                className={`${styles.iconButton} ${styles.exploreBtn}`}
                                onClick={() => handleRowExplore(item)}
                                title={`Open ${primaryLabel}`}
                              >
                                <FolderOpen size={14} /> <span style={{ marginLeft: '4px', fontSize: '0.75rem', fontWeight: 800 }}>Explore</span>
                              </button>
                            )}
                            {['grades', 'chapters', 'lessons'].includes(activeLevel) && (
                              <>
                                <button
                                  type="button"
                                  className={styles.iconButton}
                                  onClick={() => swapOrder(index, 'up')}
                                  disabled={index === 0}
                                  title="Move Up"
                                >
                                  <ArrowUp size={14} />
                                </button>
                                <button
                                  type="button"
                                  className={styles.iconButton}
                                  onClick={() => swapOrder(index, 'down')}
                                  disabled={index === filteredItems.length - 1}
                                  title="Move Down"
                                >
                                  <ArrowDown size={14} />
                                </button>
                              </>
                            )}
                            <button
                              type="button"
                              className={styles.iconButton}
                              onClick={() => openForm(item)}
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              className={styles.iconButtonDanger}
                              onClick={() => deleteResource(item)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className={styles.emptyState}>
                      <FolderOpen size={32} style={{ marginBottom: '0.5rem', color: '#cbd5e1' }} />
                      <p>{activeParentId ? `No ${primaryLabel.toLowerCase()}s found in this directory.` : `Please select a folder path to load details.`}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {/* Modal Dialog Form */}
      {formOpen && (
        <div className={styles.modalOverlay} onClick={closeForm}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.panelEyebrow}>Resource settings</p>
                <h2 className={styles.modalTitle}>{editingItem ? 'Edit' : 'Create New'} {primaryLabel}</h2>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeForm} aria-label="Close dialog">
                ✕
              </button>
            </div>
            
            <form onSubmit={saveResource} className={styles.formGrid}>
              <div className={styles.formSection}>
                <h3 className={styles.formSectionTitle}>
                  {activeLevel === 'boards' && <Crown size={16} />}
                  {activeLevel === 'grades' && <GraduationCap size={16} />}
                  {activeLevel === 'subjects' && <BookOpen size={16} />}
                  {activeLevel === 'chapters' && <Layers size={16} />}
                  {activeLevel === 'lessons' && <FileVideo size={16} />}
                  {primaryLabel} Details
                </h3>

                {/* BOARD FORM */}
                {activeLevel === 'boards' && (
                  <>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Board Name *</label>
                        <input
                          value={formValues.name}
                          onChange={(event) => setFormValues({ ...formValues, name: event.target.value, title: event.target.value })}
                          placeholder="e.g. Central Board of Secondary Education"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Short Code *</label>
                        <input
                          value={formValues.code}
                          onChange={(event) => setFormValues({ ...formValues, code: event.target.value })}
                          placeholder="e.g. CBSE"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Status</label>
                        <select
                          value={formValues.status_id}
                          onChange={(event) => setFormValues({ ...formValues, status_id: Number(event.target.value) })}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={styles.formFieldWide} style={{ marginTop: '0.75rem' }}>
                      <label>Description</label>
                      <textarea
                        rows={3}
                        value={formValues.description}
                        onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
                        placeholder="Brief details about the board curriculum..."
                      />
                    </div>
                  </>
                )}

                {/* GRADE FORM */}
                {activeLevel === 'grades' && (
                  <>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Grade Name *</label>
                        <input
                          value={formValues.name}
                          onChange={(event) => setFormValues({ ...formValues, name: event.target.value, title: event.target.value })}
                          placeholder="e.g. Grade 5 or LKG"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Short Code</label>
                        <input
                          value={formValues.code}
                          onChange={(event) => setFormValues({ ...formValues, code: event.target.value })}
                          placeholder="e.g. G5"
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Target Age Range</label>
                        <input
                          value={formValues.age_range}
                          onChange={(event) => setFormValues({ ...formValues, age_range: event.target.value })}
                          placeholder="e.g. 5-6 years"
                        />
                      </div>
                    </div>
                    <div className={styles.formRow} style={{ marginTop: '0.75rem' }}>
                      <div className={styles.formFieldWide}>
                        <label>Description</label>
                        <textarea
                          rows={3}
                          value={formValues.description}
                          onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
                          placeholder="Brief description about the learning goals of this grade..."
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Status</label>
                        <select
                          value={formValues.status_id}
                          onChange={(event) => setFormValues({ ...formValues, status_id: Number(event.target.value) })}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* SUBJECT FORM */}
                {activeLevel === 'subjects' && (
                  <>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Subject Name *</label>
                        <input
                          value={formValues.name}
                          onChange={(event) => setFormValues({ ...formValues, name: event.target.value, title: event.target.value })}
                          placeholder="e.g. Mathematics"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Subject Code</label>
                        <input
                          value={formValues.code}
                          onChange={(event) => setFormValues({ ...formValues, code: event.target.value })}
                          placeholder="e.g. MATH"
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Status</label>
                        <select
                          value={formValues.status_id}
                          onChange={(event) => setFormValues({ ...formValues, status_id: Number(event.target.value) })}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={styles.formFieldWide} style={{ marginTop: '0.75rem' }}>
                      <label>Description</label>
                      <textarea
                        rows={3}
                        value={formValues.description}
                        onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
                        placeholder="Key domains covered in this subject..."
                      />
                    </div>
                  </>
                )}

                {/* CHAPTER FORM */}
                {activeLevel === 'chapters' && (
                  <>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Chapter Title *</label>
                        <input
                          value={formValues.name}
                          onChange={(event) => setFormValues({ ...formValues, name: event.target.value, title: event.target.value })}
                          placeholder="e.g. Introduction to Fractions"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Chapter Code / Unit</label>
                        <input
                          value={formValues.code}
                          onChange={(event) => setFormValues({ ...formValues, code: event.target.value })}
                          placeholder="e.g. CH-01"
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Status</label>
                        <select
                          value={formValues.status_id}
                          onChange={(event) => setFormValues({ ...formValues, status_id: Number(event.target.value) })}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={styles.formFieldWide} style={{ marginTop: '0.75rem' }}>
                      <label>Description / Objectives</label>
                      <textarea
                        rows={3}
                        value={formValues.description}
                        onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
                        placeholder="What students will learn in this chapter..."
                      />
                    </div>
                  </>
                )}

                {/* LESSON FORM */}
                {activeLevel === 'lessons' && (
                  <>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Lesson Title *</label>
                        <input
                          value={formValues.name}
                          onChange={(event) => setFormValues({ ...formValues, name: event.target.value, title: event.target.value })}
                          placeholder="e.g. Dividing Fractions Tutorial"
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>YouTube Video URL or ID *</label>
                        <input
                          value={formValues.youtube_video_id}
                          onChange={(event) => setFormValues({ ...formValues, youtube_video_id: event.target.value })}
                          placeholder="e.g. https://youtu.be/..."
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Duration (seconds)</label>
                        <input
                          value={formValues.duration_seconds}
                          onChange={(event) => setFormValues({ ...formValues, duration_seconds: event.target.value })}
                          placeholder="e.g. 360"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className={styles.formRow} style={{ marginTop: '0.75rem' }}>
                      <div className={styles.formFieldWide}>
                        <label>Lesson Description</label>
                        <textarea
                          rows={3}
                          value={formValues.description}
                          onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
                          placeholder="Brief notes about the lesson topic..."
                        />
                      </div>
                      <div className={styles.formField}>
                        <label>Status</label>
                        <select
                          value={formValues.status_id}
                          onChange={(event) => setFormValues({ ...formValues, status_id: Number(event.target.value) })}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* ACTIONS */}
              <div className={styles.formActions}>
                <button type="button" className={styles.secondaryButton} onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryButton} disabled={isSaving}>
                  {editingItem ? 'Save Settings' : `Create ${primaryLabel}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {feedback && <div className={styles.toast}>{feedback}</div>}
    </main>
  );
}
