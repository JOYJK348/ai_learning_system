'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Upload, Building2, Mail, Phone, MapPin, Loader2, Trash2, CheckCircle2, MapPinned, Globe, User,
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { schoolAdminKeys } from '@/core/constants/queryKeys';
import styles from './StudentDetailModal.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

async function fetchSchoolMe() {
  const res = await fetch(`${API_BASE}/api/school-admin/me`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load settings');
  const json = await res.json();
  return json as { user: unknown; school: Record<string, unknown> | null };
}

export default function SchoolSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'location' | 'logo'>('general');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [website, setWebsite] = useState('');
  const [principalName, setPrincipalName] = useState('');
  const [principalPhone, setPrincipalPhone] = useState('');
  
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: meData, isLoading } = useQuery({
    queryKey: schoolAdminKeys.me(user?.schoolId),
    queryFn: fetchSchoolMe,
    enabled: open && !!user?.schoolId,
    staleTime: 300_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });

  useEffect(() => {
    if (open && meData?.school) {
      setName(String(meData.school.name || ''));
      setEmail(String(meData.school.email || ''));
      setPhone(String(meData.school.phone || ''));
      setAddress(String(meData.school.address || ''));
      setCity(String(meData.school.city || ''));
      setState(String(meData.school.state || ''));
      setPincode(String(meData.school.pincode || ''));
      setWebsite(String(meData.school.website || ''));
      setPrincipalName(String(meData.school.principal_name || ''));
      setPrincipalPhone(String(meData.school.principal_phone || ''));
      setLogoUrl((meData.school.logo_url as string) || null);
      setLogoPreview((meData.school.logo_url as string) || null);
    }
  }, [open, meData]);

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      setErrorMsg('');
      setActiveTab('general');
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
    setUploading(true);
    setStatus('idle');
    try {
      const form = new FormData();
      form.append('logo', file);
      const res = await fetch(`${API_BASE}/api/school-admin/settings/logo`, {
        method: 'POST', credentials: 'include', body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      if (json.logo_url) setLogoUrl(json.logo_url);
      queryClient.invalidateQueries({ queryKey: schoolAdminKeys.me(user?.schoolId) });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = async () => {
    setLogoPreview(null);
    setLogoUrl(null);
    try {
      await fetch(`${API_BASE}/api/school-admin/settings/logo`, {
        method: 'DELETE', credentials: 'include',
      });
      queryClient.invalidateQueries({ queryKey: schoolAdminKeys.me(user?.schoolId) });
    } catch { /* ignore */ }
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setStatus('idle');
    try {
      const res = await fetch(`${API_BASE}/api/school-admin/settings`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          address: address.trim() || null,
          city: city.trim() || null,
          state: state.trim() || null,
          pincode: pincode.trim() || null,
          website: website.trim() || null,
          principal_name: principalName.trim() || null,
          principal_phone: principalPhone.trim() || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStatus('saved');
      queryClient.invalidateQueries({ queryKey: schoolAdminKeys.me(user?.schoolId) });
      window.dispatchEvent(new CustomEvent('school-branding-updated'));
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
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
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            style={{ maxWidth: '32rem', width: '100%' }}
          >
            <div className={styles.header}>
              <h2 className={styles.heading}>School Settings</h2>
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Custom Tab Navigation Bar */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 1.5rem',
              gap: '1rem',
              overflowX: 'auto',
              background: '#fff',
              zIndex: 10
            }}>
              {[
                { id: 'general', label: 'General' },
                { id: 'contact', label: 'Contact & Admin' },
                { id: 'location', label: 'Address' },
                { id: 'logo', label: 'Logo & Branding' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    padding: '0.85rem 0.2rem',
                    fontSize: '0.72rem',
                    fontWeight: 850,
                    color: activeTab === t.id ? '#12312f' : '#64748b',
                    border: 'none',
                    background: 'none',
                    borderBottom: activeTab === t.id ? '2.5px solid #12312f' : '2.5px solid transparent',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className={styles.body} style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              {isLoading ? (
                <div className={styles.settingsLoading}>
                  <div className={styles.loader} />
                  <p>Loading settings...</p>
                </div>
              ) : (
                <>
                  {activeTab === 'general' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      {/* School Name */}
                      <div className={styles.section} style={{ marginBottom: '1.25rem' }}>
                        <h4 className={styles.sectionTitle}><Building2 size={15} color="#3b82f6" /> School Name</h4>
                        <div className={styles.inputWrap}>
                          <Building2 size={16} className={styles.inputIcon} />
                          <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter School name" />
                        </div>
                      </div>

                      {/* School Code (Read-only) */}
                      <div className={styles.section} style={{ marginBottom: '1.25rem' }}>
                        <h4 className={styles.sectionTitle} style={{ color: '#64748b' }}><Globe size={15} /> School Portal Identifier Code</h4>
                        <div className={styles.inputWrap} style={{ opacity: 0.7, background: '#f8fafc' }}>
                          <Globe size={16} className={styles.inputIcon} style={{ color: '#94a3b8' }} />
                          <input className={styles.input} value={String(meData?.school?.code || '')} disabled style={{ cursor: 'not-allowed', color: '#64748b' }} />
                        </div>
                        <p style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '0.25rem', fontWeight: 650 }}>This code is auto-generated and unique for your student portal routing.</p>
                      </div>

                      {/* Website */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}><Globe size={15} color="#06b6d4" /> Website URL</h4>
                        <div className={styles.inputWrap}>
                          <Globe size={16} className={styles.inputIcon} />
                          <input className={styles.input} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="www.yourschool.com" type="url" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'contact' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      {/* Contact Info */}
                      <div className={styles.section} style={{ marginBottom: '1.25rem' }}>
                        <h4 className={styles.sectionTitle}><Mail size={15} color="#10b981" /> Official Contact</h4>
                        <div className={styles.inputGrid}>
                          <div className={styles.inputWrap}>
                            <Mail size={16} className={styles.inputIcon} />
                            <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Contact Email" type="email" />
                          </div>
                          <div className={styles.inputWrap}>
                            <Phone size={16} className={styles.inputIcon} />
                            <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact Phone" type="tel" />
                          </div>
                        </div>
                      </div>

                      {/* Principal / Admin Info */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}><User size={15} color="#8b5cf6" /> Principal / Administrator Details</h4>
                        <div className={styles.inputGrid}>
                          <div className={styles.inputWrap}>
                            <User size={16} className={styles.inputIcon} />
                            <input className={styles.input} value={principalName} onChange={(e) => setPrincipalName(e.target.value)} placeholder="Principal Name" />
                          </div>
                          <div className={styles.inputWrap}>
                            <Phone size={16} className={styles.inputIcon} />
                            <input className={styles.input} value={principalPhone} onChange={(e) => setPrincipalPhone(e.target.value)} placeholder="Principal Direct Phone" type="tel" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'location' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      {/* Address */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}><MapPin size={15} color="#f59e0b" /> Physical Location Details</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div className={styles.inputWrap}>
                            <MapPin size={16} className={styles.inputIcon} />
                            <input className={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="School Address (Building/Street)" />
                          </div>
                          <div className={styles.inputRow}>
                            <div className={styles.inputWrap}>
                              <MapPinned size={16} className={styles.inputIcon} />
                              <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                            </div>
                            <div className={styles.inputWrap}>
                              <input className={styles.input} value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                            </div>
                          </div>
                          <div className={styles.inputWrap} style={{ maxWidth: '12rem' }}>
                            <input className={styles.input} value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Postal Pin Code" maxLength={8} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'logo' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      {/* Logo */}
                      <div className={styles.section}>
                        <h4 className={styles.sectionTitle}><Building2 size={15} color="#8b5cf6" /> Official School Logo & Mascot</h4>
                        <div className={styles.logoRow}>
                          <div className={styles.logoBox} style={{ background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: '1rem', width: '80px', height: '80px', display: 'grid', placeItems: 'center' }}>
                            {logoPreview ? (
                              <Image src={logoPreview} alt="Logo" width={72} height={72} style={{ objectFit: 'contain' }} unoptimized />
                            ) : (
                              <Building2 size={32} color="#cbd5e1" />
                            )}
                          </div>
                          <div className={styles.logoActions}>
                            <button type="button" className={styles.logoUploadBtn} onClick={() => fileRef.current?.click()} style={{ background: '#12312f', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>
                              {uploading ? <Loader2 size={14} className={styles.spin} /> : <Upload size={14} />}
                              {uploading ? 'Uploading...' : 'Upload Logo'}
                            </button>
                            {logoPreview && (
                              <button type="button" className={styles.logoRemoveBtn} onClick={handleRemoveLogo} style={{ border: '1px solid #ef4444', color: '#ef4444', background: '#fff' }}>
                                <Trash2 size={13} /> Remove logo
                              </button>
                            )}
                          </div>
                          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div style={{ marginTop: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                    {status === 'saved' && (
                      <div className={styles.statusSaved} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.55rem', borderRadius: '0.5rem', fontSize: '0.72rem', fontWeight: 800 }}>
                        <CheckCircle2 size={14} /> Saved changes successfully
                      </div>
                    )}

                    {status === 'error' && (
                      <div className={styles.statusError} style={{ marginBottom: '0.75rem', color: '#ef4444', background: '#fef2f2', border: '1px solid #fecaca', padding: '0.55rem', borderRadius: '0.5rem', fontSize: '0.72rem', fontWeight: 800 }}>
                        {errorMsg || 'Something went wrong'}
                      </div>
                    )}

                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={handleSave}
                      disabled={saving || !name.trim()}
                      style={{
                        background: '#12312f',
                        color: '#fff',
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 850,
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: saving || !name.trim() ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {saving ? <><Loader2 size={16} className={styles.spin} /> Saving changes...</> : 'Save Settings'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
