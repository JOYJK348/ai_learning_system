'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES, LESSONS } from '@/constants/dashboardData';

// Types for our store
export type Category = {
  id: string;
  title: string;
  icon: any;
  color: string;
  border: string;
  progress: number;
  lessons: number;
};

export type Lesson = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  text: string;
  border: string;
  status: 'completed' | 'not-started';
  quiz?: any;
};

export type Student = {
  id: number;
  name: string;
  class: string;
  progress: number;
  lastActive: string;
  status: 'Online' | 'Offline';
  isActive: boolean; // For deactivation logic
};

export type RegistrationRequest = {
  id: string;
  parentName: string;
  studentName: string;
  email: string;
  status: 'pending' | 'approved';
};

type DataContextType = {
  categories: Category[];
  lessons: Record<string, Lesson[]>;
  students: Student[];
  registrations: RegistrationRequest[];
  addCategory: (cat: Category) => void;
  addLesson: (catId: string, lesson: Lesson) => void;
  deleteLesson: (catId: string, lessonId: string) => void;
  updateProgress: (catId: string, lessonId: string, status: 'completed' | 'not-started') => void;
  toggleStudentStatus: (id: number) => void;
  approveRegistration: (id: string) => void;
};

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Rahul Kumar', class: 'UKG', progress: 64, lastActive: '2h ago', status: 'Online', isActive: true },
  { id: 2, name: 'Arjun Singh', class: 'LKG', progress: 93, lastActive: '1d ago', status: 'Offline', isActive: true },
  { id: 3, name: 'Priya Dharshini', class: 'Class 1', progress: 94, lastActive: '5m ago', status: 'Online', isActive: true },
  { id: 4, name: 'Sara Khan', class: 'UKG', progress: 3, lastActive: '3d ago', status: 'Offline', isActive: true },
  { id: 5, name: 'David Raj', class: 'Class 2', progress: 36, lastActive: '12h ago', status: 'Offline', isActive: true },
  { id: 6, name: 'Meera Nair', class: 'UKG', progress: 2, lastActive: '1w ago', status: 'Offline', isActive: true },
  { id: 10, name: 'Lily Grace', class: 'LKG', progress: 77, lastActive: '8h ago', status: 'Offline', isActive: true },
  { id: 7, name: 'Kevin Thomas', class: 'Class 1', progress: 94, lastActive: '1h ago', status: 'Online', isActive: true },
  { id: 8, name: 'Aisha Fatima', class: 'LKG', progress: 91, lastActive: '4h ago', status: 'Online', isActive: true },
  { id: 9, name: 'Rohan Varma', class: 'UKG', progress: 94, lastActive: 'Just now', status: 'Online', isActive: true },
];

const INITIAL_REGISTRATIONS: RegistrationRequest[] = [
  { id: 'reg1', parentName: 'Deepak J', studentName: 'Vicky', email: 'deepak@example.com', status: 'pending' },
  { id: 'reg2', parentName: 'Mano B', studentName: 'Kavin', email: 'mano@example.com', status: 'pending' },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>(LESSONS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [registrations, setRegistrations] = useState<RegistrationRequest[]>(INITIAL_REGISTRATIONS);

  // Persistence logic (Phase 1: LocalStorage)
  useEffect(() => {
    const savedCats = localStorage.getItem('zhi_categories');
    const savedLessons = localStorage.getItem('zhi_lessons');
    const savedStudents = localStorage.getItem('zhi_students');
    const savedRegs = localStorage.getItem('zhi_regs');

    if (savedCats) setCategories(JSON.parse(savedCats));
    if (savedLessons) setLessons(JSON.parse(savedLessons));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedRegs) setRegistrations(JSON.parse(savedRegs));
  }, []);

  const saveToStorage = (newCats: Category[], newLessons: Record<string, Lesson[]>, newStudents: Student[], newRegs: RegistrationRequest[]) => {
    localStorage.setItem('zhi_categories', JSON.stringify(newCats));
    localStorage.setItem('zhi_lessons', JSON.stringify(newLessons));
    localStorage.setItem('zhi_students', JSON.stringify(newStudents));
    localStorage.setItem('zhi_regs', JSON.stringify(newRegs));
  };

  const addCategory = (cat: Category) => {
    const updated = [...categories, cat];
    setCategories(updated);
    saveToStorage(updated, lessons, students, registrations);
  };

  const addLesson = (catId: string, lesson: Lesson) => {
    const updatedLessons = { ...lessons };
    if (!updatedLessons[catId]) updatedLessons[catId] = [];
    updatedLessons[catId] = [...updatedLessons[catId], lesson];
    
    // Update count in category
    const updatedCats = categories.map(c => 
      c.id === catId ? { ...c, lessons: (c.lessons || 0) + 1 } : c
    );

    setLessons(updatedLessons);
    setCategories(updatedCats);
    saveToStorage(updatedCats, updatedLessons, students, registrations);
  };

  const deleteLesson = (catId: string, lessonId: string) => {
    const updatedLessons = { ...lessons };
    if (updatedLessons[catId]) {
      updatedLessons[catId] = updatedLessons[catId].filter(l => l.id !== lessonId);
    }
    
    const updatedCats = categories.map(c => 
      c.id === catId ? { ...c, lessons: Math.max(0, (c.lessons || 0) - 1) } : c
    );

    setLessons(updatedLessons);
    setCategories(updatedCats);
    saveToStorage(updatedCats, updatedLessons, students, registrations);
  };

  const updateProgress = (catId: string, lessonId: string, status: 'completed' | 'not-started') => {
    const updatedLessons = { ...lessons };
    if (updatedLessons[catId]) {
      updatedLessons[catId] = updatedLessons[catId].map(l => 
        l.id === lessonId ? { ...l, status } : l
      );

      // Re-calculate category progress
      const total = updatedLessons[catId].length;
      const completed = updatedLessons[catId].filter(l => l.status === 'completed').length;
      const newProgress = Math.round((completed / total) * 100);

      const updatedCats = categories.map(c => 
        c.id === catId ? { ...c, progress: newProgress } : c
      );

      setLessons(updatedLessons);
      setCategories(updatedCats);
      saveToStorage(updatedCats, updatedLessons, students, registrations);
    }
  };

  const toggleStudentStatus = (id: number) => {
    const updated = students.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    setStudents(updated);
    saveToStorage(categories, lessons, updated, registrations);
  };

  const approveRegistration = (id: string) => {
    const reg = registrations.find(r => r.id === id);
    if (!reg) return;

    // Remove from registrations
    const updatedRegs = registrations.filter(r => r.id !== id);
    
    // Add to students
    const newStudent: Student = {
        id: Date.now(),
        name: reg.studentName,
        class: 'Pending Approval',
        progress: 0,
        lastActive: 'Never',
        status: 'Offline',
        isActive: true
    };
    
    const updatedStudents = [...students, newStudent];
    
    setRegistrations(updatedRegs);
    setStudents(updatedStudents);
    saveToStorage(categories, lessons, updatedStudents, updatedRegs);
    alert(`Account Created for ${reg.parentName}! \nMail ID: ${reg.email} \nPassword: child123 (Temporary)`);
  };

  return (
    <DataContext.Provider value={{ 
        categories, lessons, students, registrations,
        addCategory, addLesson, deleteLesson, updateProgress,
        toggleStudentStatus, approveRegistration
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
