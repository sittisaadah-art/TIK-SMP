import React from 'react';
import { StudentProfileData } from '../../types';
import { Award, Zap, BookOpen, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface StudentProfileProps {
  profile: StudentProfileData;
  onNavigateTab: (tab: 'materi' | 'simulasi' | 'asesmen') => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ profile, onNavigateTab }) => {
  // Rank calculations
  const getRank = (xp: number) => {
    if (xp >= 500) return { title: 'Cyber Master IX', color: 'text-amber-400', nextTier: 'Maksimum Rank' };
    if (xp >= 250) return { title: 'Logic Architect VIII', color: 'text-purple-400', nextTier: '500 XP untuk Cyber Master' };
    return { title: 'Binary Pioneer VII', color: 'text-cyan-400', nextTier: '250 XP untuk Logic Architect' };
  };

  const rank = getRank(profile.xp);
  const xpPercent = Math.min(100, Math.round((profile.xp % 250) / 2.5));

  return (
    <div className="space-y-6">
      {/* Student HUD Profile Card */}
      <div className="bg-[#0b0e24] border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#060814] rounded-[10px] flex items-center justify-center text-cyan-300 font-mono font-extrabold text-2xl">
                {profile.name.charAt(0)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{profile.grade.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>@{profile.username}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
                {profile.name}
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <span>Cyber Rank:</span>
                <span className={`font-mono font-bold ${rank.color}`}>{rank.title}</span>
              </div>
            </div>
          </div>

          {/* XP & Level Status */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 min-w-[260px] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">PENGALAMAN (XP)</span>
              <span className="text-cyan-300 font-bold">{profile.xp} XP</span>
            </div>

            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-slate-500 text-right">
              {rank.nextTier}
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            LENCANA KOMPETENSI SIBER (CYBER BADGES)
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {profile.badges.filter((b) => b.unlockedAt).length} / {profile.badges.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {profile.badges.map((badge) => {
            const isUnlocked = !!badge.unlockedAt;

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-slate-900 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{badge.name}</span>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {badge.description}
                  </div>
                  {badge.unlockedAt && (
                    <div className="text-[10px] font-mono text-cyan-400/80 mt-1">
                      Dibuka: {badge.unlockedAt}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateTab('materi')}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-left transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
            <span>MODUL PEMBELAJARAN</span>
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
            {profile.completedLessons.length} Modul Selesai
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Lanjutkan belajar Kurikulum Merdeka</div>
        </button>

        <button
          onClick={() => onNavigateTab('simulasi')}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 rounded-xl text-left transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
            <span>LAB SIMULASI VIRTUAL</span>
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
            4 Lab Interaktif Siap Uji
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Biner, Gerbang 3D, Stack, Queue</div>
        </button>

        <button
          onClick={() => onNavigateTab('asesmen')}
          className="p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
            <span>ASESMEN & UJIAN</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
            {profile.quizAttempts.length} Latihan Dikerjakan
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Lihat riwayat skor & pembahasan</div>
        </button>
      </div>

      {/* Recent Quiz Attempts List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          RIWAYAT LATIHAN & ASESMEN TERAKHIR
        </span>

        {profile.quizAttempts.length === 0 ? (
          <div className="text-xs text-slate-500 font-mono py-4 text-center">
            Belum ada latihan yang diselesaikan. Buka menu Latihan & Ujian untuk memulai!
          </div>
        ) : (
          <div className="space-y-2">
            {profile.quizAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <div className="font-semibold text-white">{attempt.quizTitle}</div>
                  <div className="text-[11px] text-slate-500">{attempt.date} · {attempt.totalQuestions} Soal</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-400 text-sm">{attempt.score} / 100</div>
                  <div className="text-[10px] text-cyan-400">+{attempt.score} XP</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
