import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GradeLevel, QuizQuestion, QuizAttempt } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { soundEffects } from '../../utils/audio';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  Clock, 
  BookOpenCheck,
  Zap
} from 'lucide-react';

interface AssessmentCenterProps {
  onRecordAttempt: (attempt: QuizAttempt) => void;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({ onRecordAttempt }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('kelas-8');
  const [assessmentType, setAssessmentType] = useState<'daily' | 'exam'>('daily');

  // Active quiz session state
  const [isInSession, setIsInSession] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Active pool of questions
  const activeQuestions = QUIZ_QUESTIONS.filter((q) => q.grade === selectedGrade);

  const startQuiz = () => {
    setIsInSession(true);
    setCurrentQIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    soundEffects.playClick();
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentQIndex]: optionIndex });
    soundEffects.playClick();
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        calculatedScore += 1;
      }
    });

    const finalPercent = Math.round((calculatedScore / activeQuestions.length) * 100);
    setScore(finalPercent);
    setIsSubmitted(true);
    soundEffects.playSuccess();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#A855F7', '#39FF14', '#FFE600'],
      });
    } catch {
      // Ignored if canvas blocked
    }

    // Record attempt for student and teacher logs
    const attempt: QuizAttempt = {
      id: Math.random().toString(),
      quizTitle: `${assessmentType === 'daily' ? 'Asesmen Harian' : 'Ujian Akhir'} ${selectedGrade.toUpperCase()}`,
      date: new Date().toLocaleDateString('id-ID'),
      grade: selectedGrade,
      score: finalPercent,
      totalQuestions: activeQuestions.length,
      timeSpentSeconds: 120,
      answers: activeQuestions.map((q, idx) => ({
        questionId: q.id,
        selectedIndex: userAnswers[idx] ?? -1,
        isCorrect: userAnswers[idx] === q.correctIndex,
      })),
    };
    onRecordAttempt(attempt);
  };

  return (
    <div className="bg-[#0b0e24] border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PUSAT ASESMEN & UJIAN ONLINE</span>
            <span aria-hidden="true">·</span>
            <span>PEMBAHASAN OTOMATIS KOMPREHENSIF</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Latihan Soal & Asesmen Informatika
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Uji pemahaman logika komputasimu secara objektif. Setiap jawaban disertai pembahasan langkah demi langkah setelah disubmit.
          </p>
        </div>

        {/* Grade switch */}
        {!isInSession && (
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
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
        )}
      </div>

      {!isInSession ? (
        /* LOBBY / SELECTION VIEW */
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Quiz Card */}
            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                  <span>ASESMEN HARIAN</span>
                  <span>{activeQuestions.length} Soal</span>
                </div>
                <h3 className="text-lg font-bold text-white">Daily Assessment Informatika</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Latihan soal rutin untuk menguji pemahaman konsep harian materi {selectedGrade.toUpperCase()}. Dilengkapi pembahasan otomatis langsung setelah dikerjakan.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Estimasi: 10-15 Menit</span>
                <button
                  onClick={() => {
                    setAssessmentType('daily');
                    startQuiz();
                  }}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Mulai Asesmen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Exam Assessment Card */}
            <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
                  <span>UJIAN AKHIR BAB</span>
                  <span>Evaluasi Komprehensif</span>
                </div>
                <h3 className="text-lg font-bold text-white">Ujian Terpadu & Standarisasi</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Simulasi ujian formal berbasis capaian pembelajaran Informatika Kurikulum Merdeka dengan pengelompokan tingkat kemahiran.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Hasil Tercatat di Rapor</span>
                <button
                  onClick={() => {
                    setAssessmentType('exam');
                    startQuiz();
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Mulai Ujian</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tips banner */}
          <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-xs text-slate-300 flex items-center gap-3">
            <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              <strong>Tips Belajar:</strong> Setelah menekan tombol <em>Submit Jawaban</em>, seluruh pembahasan soal akan otomatis terbuka untuk membantu memahami logika komputasi di balik setiap pertanyaan!
            </span>
          </div>
        </div>
      ) : (
        /* QUIZ TAKING & REVIEW SESSION */
        <div className="mt-6 space-y-6">
          {/* Progress Header & Question Numbers */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>SOAL {currentQIndex + 1} DARI {activeQuestions.length}</span>
              <span>·</span>
              <span className="text-cyan-400">{activeQuestions[currentQIndex]?.strand}</span>
              <span>·</span>
              <span className="text-purple-400">{activeQuestions[currentQIndex]?.difficulty}</span>
            </div>

            {/* Question Quick Jump Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {activeQuestions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = currentQIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentQIndex(idx);
                      soundEffects.playClick();
                    }}
                    className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all ${
                      isCurrent
                        ? 'bg-cyan-500 text-black ring-2 ring-cyan-300'
                        : isAnswered
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          {activeQuestions[currentQIndex] && (
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-xl space-y-5">
              <h3 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                {activeQuestions[currentQIndex].question}
              </h3>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {activeQuestions[currentQIndex].options.map((option, optIdx) => {
                  const isSelected = userAnswers[currentQIndex] === optIdx;
                  const isCorrect = activeQuestions[currentQIndex].correctIndex === optIdx;

                  let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-800/40 text-slate-300';
                  if (isSelected && !isSubmitted) {
                    borderClass = 'border-cyan-400 bg-cyan-950/60 text-white ring-1 ring-cyan-400';
                  } else if (isSubmitted) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/70 text-emerald-200 ring-1 ring-emerald-500 font-bold';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-rose-500/60 bg-rose-950/40 text-rose-300';
                    }
                  }

                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isSubmitted}
                      className={`w-full p-3.5 rounded-lg border text-left text-xs md:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-black/40 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-cyan-300">
                          {letter}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && isCorrect && (
                        <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Kunci Jawaban Benar
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* AUTOMATIC EXPLANATION (Pembahasan Otomatis Lengkap) */}
              {isSubmitted && (
                <div className="p-4 bg-slate-950 border border-cyan-500/40 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                    <span>PEMBAHASAN OTOMATIS LENGKAP:</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                    {activeQuestions[currentQIndex].explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                if (currentQIndex > 0) setCurrentQIndex(currentQIndex - 1);
                soundEffects.playClick();
              }}
              disabled={currentQIndex === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Soal Sebelumnya
            </button>

            <div className="flex items-center gap-3">
              {currentQIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentQIndex(currentQIndex + 1);
                    soundEffects.playClick();
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Soal Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : !isSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                >
                  <BookOpenCheck className="w-4 h-4" />
                  Submit Jawaban & Buka Pembahasan
                </button>
              ) : null}

              {isSubmitted && (
                <button
                  onClick={() => {
                    setIsInSession(false);
                    soundEffects.playClick();
                  }}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Kembali ke Menu Soal
                </button>
              )}
            </div>
          </div>

          {/* Summary Box when submitted */}
          {isSubmitted && (
            <div className="p-5 bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border border-cyan-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 text-xl font-bold font-mono">
                  {score}
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-300">HASIL PENILAIAN ASESMEN:</div>
                  <div className="text-sm font-bold text-white">
                    {score >= 80 ? 'Matrix Tersinkronisasi Sempurna! Pemahamanmu Sangat Tajam!' : 'Proses Belajar Berjalan Baik! Pemahaman Terus Berkembang!'}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 font-mono text-right">
                <div>Skor: {score} / 100</div>
                <div className="text-slate-400">XP Diperoleh: +{score} XP</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
