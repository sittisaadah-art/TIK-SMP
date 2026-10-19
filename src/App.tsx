/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LearningModule } from './components/learning/LearningModule';
import { SimulationHub } from './components/simulations/SimulationHub';
import { AssessmentCenter } from './components/assessment/AssessmentCenter';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { StudentProfile } from './components/dashboard/StudentProfile';
import { TechFacts } from './components/trivia/TechFacts';
import { soundEffects } from './utils/audio';
import { StudentProfileData, QuizAttempt } from './types';
import { 
  Sparkles, 
  ArrowRight, 
  Binary, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  UserCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'asesmen' | 'fakta' | 'profil' | 'guru'>('materi');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundEffects.getMuted());
  const [simTarget, setSimTarget] = useState<'binary' | 'logic-gate' | 'stack-queue' | 'data-structure'>('binary');

  // Student Profile State
  const [studentProfile, setStudentProfile] = useState<StudentProfileData>({
    name: 'Aura Zahra',
    username: 'auracyber8',
    avatarSeed: 'aura',
    grade: 'kelas-8',
    level: 3,
    xp: 340,
    completedLessons: ['k7-bk-1', 'k7-sk-1', 'k8-bk-1', 'k8-sk-1', 'k8-ap-1'],
    badges: [
      { id: 'b1', name: 'Binary Pioneer', description: 'Menyelesaikan tantangan saklar biner 8-bit', icon: 'Binary', unlockedAt: '12 Okt 2026' },
      { id: 'b2', name: 'Gate Hacker', description: 'Menguasai 7 gerbang logika & sirkuit Half Adder', icon: 'Cpu', unlockedAt: '14 Okt 2026' },
      { id: 'b3', name: 'Stack Master', description: 'Memahami prinsip LIFO & pencegahan stack overflow', icon: 'Layers', unlockedAt: '16 Okt 2026' },
      { id: 'b4', name: 'Queue Runner', description: 'Mensimulasikan antrean FIFO print spooler', icon: 'ArrowRight', unlockedAt: '17 Okt 2026' },
      { id: 'b5', name: 'Exam Champion', description: 'Mencapai skor di atas 90 pada Ujian Akhir', icon: 'Award', unlockedAt: 'Kemarin' },
    ],
    simulationMinutes: 48,
    quizAttempts: [
      {
        id: 'att-1',
        quizTitle: 'Asesmen Harian KELAS-8',
        date: '17 Okt 2026',
        grade: 'kelas-8',
        score: 92,
        totalQuestions: 6,
        timeSpentSeconds: 180,
        answers: [],
      },
      {
        id: 'att-2',
        quizTitle: 'Asesmen Harian KELAS-7',
        date: '15 Okt 2026',
        grade: 'kelas-7',
        score: 100,
        totalQuestions: 4,
        timeSpentSeconds: 120,
        answers: [],
      },
    ],
  });

  const handleToggleMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleTeacherMode = () => {
    soundEffects.playClick();
    const nextMode = !isTeacherMode;
    setIsTeacherMode(nextMode);
    setActiveTab(nextMode ? 'guru' : 'materi');
  };

  const handleOpenSimulation = (simType: 'binary' | 'logic-gate' | 'stack-queue' | 'data-structure') => {
    setSimTarget(simType);
    setActiveTab('simulasi');
    soundEffects.playClick();
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!studentProfile.completedLessons.includes(lessonId)) {
      setStudentProfile((prev) => ({
        ...prev,
        xp: prev.xp + 50,
        completedLessons: [...prev.completedLessons, lessonId],
      }));
    }
  };

  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    setStudentProfile((prev) => ({
      ...prev,
      xp: prev.xp + attempt.score,
      quizAttempts: [attempt, ...prev.quizAttempts],
    }));
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'guru') setIsTeacherMode(true);
        }}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={handleToggleTeacherMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-[#0c102b] via-[#080b1e] to-[#050713] p-6 sm:p-10">
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>INFORMATIKA SMP</span>
                  <span aria-hidden="true">·</span>
                  <span>KELAS VII, VIII, IX</span>
                  <span aria-hidden="true">·</span>
                  <span>KURIKULUM MERDEKA</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance leading-tight">
                  Pusat Pembelajaran Digital & Lab Simulasi Komputasi
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                  Jelajahi keajaiban logika komputer masa depan. Dari konversi biner saklar mikro, 3D gerbang logika interaktif, hingga visualisasi animasi struktur data Stack dan Queue.
                </p>
              </div>

              {/* Mode indicator & Primary Quick Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('simulasi');
                      soundEffects.playClick();
                    }}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs sm:text-sm font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Mulai Praktikum Simulasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('materi');
                      soundEffects.playClick();
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Jelajahi Modul Belajar</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                  <span>Aktif di: <strong className="text-white">{isTeacherMode ? 'Mode Guru (Pendidik)' : 'Mode Siswa (Interaktif)'}</strong></span>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={handleToggleTeacherMode}
                    className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    Ganti ke {isTeacherMode ? 'Mode Siswa' : 'Mode Guru'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-cyan-500/30 group">
              <img
                src="/src/assets/images/cyber_informatics_hero_1792392919335.jpg"
                alt="Cyber Informatics Virtual Academy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[220px] max-h-[340px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[11px] font-mono text-cyan-300 font-semibold">LAB INTERAKTIF DIGITAL</span>
                <span className="text-xs text-slate-200 mt-0.5">Eksplorasi Algoritma, Biner & Gerbang Logika 3D</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Quick-Launch Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleOpenSimulation('binary')}
            className="p-3.5 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-400/50 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Binary Converter</div>
              <div className="text-[11px] text-slate-400">Saklar 8-bit & Hex</div>
            </div>
          </button>

          <button
            onClick={() => handleOpenSimulation('logic-gate')}
            className="p-3.5 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-400/50 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">3D Gerbang Logika</div>
              <div className="text-[11px] text-slate-400">AND, OR, XOR & Truth Table</div>
            </div>
          </button>

          <button
            onClick={() => handleOpenSimulation('stack-queue')}
            className="p-3.5 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-400/50 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">Stack & Queue Lab</div>
              <div className="text-[11px] text-slate-400">LIFO vs FIFO Animasi</div>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab('asesmen');
              soundEffects.playClick();
            }}
            className="p-3.5 bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-400/50 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">Asesmen & Ujian</div>
              <div className="text-[11px] text-slate-400">Pembahasan Otomatis</div>
            </div>
          </button>
        </section>

        {/* Dynamic Section Render based on activeTab */}
        <section>
          {activeTab === 'materi' && (
            <LearningModule
              onOpenSimulation={handleOpenSimulation}
              completedLessons={studentProfile.completedLessons}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {activeTab === 'simulasi' && (
            <SimulationHub initialLab={simTarget} />
          )}

          {activeTab === 'asesmen' && (
            <AssessmentCenter onRecordAttempt={handleRecordQuizAttempt} />
          )}

          {activeTab === 'fakta' && (
            <TechFacts />
          )}

          {activeTab === 'profil' && (
            <StudentProfile
              profile={studentProfile}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                soundEffects.playClick();
              }}
            />
          )}

          {activeTab === 'guru' && (
            <TeacherDashboard />
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
