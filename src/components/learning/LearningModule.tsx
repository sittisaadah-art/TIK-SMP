import React, { useState } from 'react';
import { GradeLevel, StrandType, LessonTopic } from '../../types';
import { CURRICULUM_DATA, STRAND_METADATA } from '../../data/curriculumData';
import { soundEffects } from '../../utils/audio';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  Layers, 
  Binary, 
  Lightbulb,
  Search
} from 'lucide-react';

interface LearningModuleProps {
  onOpenSimulation: (simType: 'binary' | 'logic-gate' | 'stack-queue' | 'data-structure') => void;
  completedLessons: string[];
  onCompleteLesson: (lessonId: string) => void;
}

export const LearningModule: React.FC<LearningModuleProps> = ({
  onOpenSimulation,
  completedLessons,
  onCompleteLesson,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('kelas-8');
  const [selectedStrand, setSelectedStrand] = useState<StrandType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<LessonTopic | null>(null);

  // Filter lessons
  const filteredLessons = CURRICULUM_DATA.filter((lesson) => {
    const matchGrade = lesson.grade === selectedGrade;
    const matchStrand = selectedStrand === 'ALL' || lesson.strand === selectedStrand;
    const matchSearch =
      searchQuery.trim() === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchStrand && matchSearch;
  });

  const handleSelectLesson = (lesson: LessonTopic) => {
    setSelectedLesson(lesson);
    soundEffects.playClick();
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-[#0b0e24] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Grade tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          {(['kelas-7', 'kelas-8', 'kelas-9'] as GradeLevel[]).map((grade) => {
            const label = grade === 'kelas-7' ? 'Kelas VII' : grade === 'kelas-8' ? 'Kelas VIII' : 'Kelas IX';
            const isActive = selectedGrade === grade;
            return (
              <button
                key={grade}
                onClick={() => {
                  setSelectedGrade(grade);
                  soundEffects.playClick();
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik pembelajaran..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Strand Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => { setSelectedStrand('ALL'); soundEffects.playClick(); }}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
            selectedStrand === 'ALL'
              ? 'bg-cyan-950 border border-cyan-500 text-cyan-300'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          Semua Elemen ({CURRICULUM_DATA.filter((l) => l.grade === selectedGrade).length})
        </button>

        {(['BK', 'SK', 'TIK', 'JKI', 'AD', 'AP', 'DSI', 'PLB'] as StrandType[]).map((strand) => {
          const meta = STRAND_METADATA[strand];
          const isSelected = selectedStrand === strand;
          const count = CURRICULUM_DATA.filter((l) => l.grade === selectedGrade && l.strand === strand).length;
          if (count === 0) return null;

          return (
            <button
              key={strand}
              onClick={() => { setSelectedStrand(strand); soundEffects.playClick(); }}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-semibold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{strand}</span>
              <span className="text-[10px] text-slate-500">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Content Grid: Lesson Cards & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Cards List */}
        <div className={`space-y-3 ${selectedLesson ? 'lg:col-span-5' : 'lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-0'}`}>
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isCurrentSelected = selectedLesson?.id === lesson.id;

            return (
              <div
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrentSelected
                    ? 'bg-slate-900/90 border-cyan-400 ring-1 ring-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-[#0b0e24] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyan-400 font-semibold">{lesson.strand} · {lesson.grade.toUpperCase()}</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.estimatedMinutes} Menit
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight line-clamp-2">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {lesson.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                  {isCompleted ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tuntas Dipelajari
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono">Belum Selesai</span>
                  )}

                  {lesson.hasSimulation && (
                    <span className="text-purple-400 font-mono text-[11px] flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      Ada Lab Interaktif
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Reader View */}
        {selectedLesson && (
          <div className="lg:col-span-7 bg-[#0b0e24] border border-cyan-500/30 rounded-xl p-6 space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400">
                  {selectedLesson.strand} · {selectedLesson.grade.toUpperCase()} · MODUL PEMBELAJARAN
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight mt-1">
                  {selectedLesson.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedLesson(null)}
                className="text-xs text-slate-400 hover:text-white underline font-mono"
              >
                Tutup Pembaca
              </button>
            </div>

            {/* Simulation CTA banner if available */}
            {selectedLesson.hasSimulation && (
              <div className="p-4 bg-gradient-to-r from-cyan-950/70 to-purple-950/70 border border-cyan-500/40 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-cyan-300">LAB SIMULASI INTERAKTIF TERSEDIA</div>
                    <div className="text-xs text-slate-300">
                      Uji coba konsep teori ini langsung di simulasi visual praktikum!
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenSimulation(selectedLesson.hasSimulation!)}
                  className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Buka Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Key Concepts */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Konsep Kunci yang Dipelajari:
              </h4>
              <div className="space-y-2">
                {selectedLesson.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-200 flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prose Content */}
            <div className="space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
              {selectedLesson.contentMarkdown.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Real World Analogy Box */}
            <div className="p-4 bg-slate-900/90 border border-purple-500/30 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <Lightbulb className="w-4 h-4" />
                <span>Analogi Dunia Nyata:</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{selectedLesson.realWorldAnalogy}"
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <div className="text-xs font-mono text-slate-400">
                Status: {completedLessons.includes(selectedLesson.id) ? (
                  <span className="text-emerald-400 font-bold">Selesai (+50 XP Didapat)</span>
                ) : (
                  <span className="text-amber-400">Sedang Dipelajari</span>
                )}
              </div>

              <button
                onClick={() => {
                  onCompleteLesson(selectedLesson.id);
                  soundEffects.playSuccess();
                }}
                disabled={completedLessons.includes(selectedLesson.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  completedLessons.includes(selectedLesson.id)
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedLessons.includes(selectedLesson.id) ? 'Materi Tuntas' : 'Tandai Selesai & Klaim XP'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
