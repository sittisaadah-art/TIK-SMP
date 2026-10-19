import React, { useState } from 'react';
import { MOCK_STUDENT_ROSTER } from '../../data/quizData';
import { StudentProgressRecord, QuizQuestion } from '../../types';
import { soundEffects } from '../../utils/audio';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  PlusCircle, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3,
  BookOpen
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<StudentProgressRecord[]>(MOCK_STUDENT_ROSTER);
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectIndex, setNewCorrectIndex] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [newStrand, setNewStrand] = useState<string>('BK');
  const [questionCreatedSuccess, setQuestionCreatedSuccess] = useState<boolean>(false);

  // Filter students
  const filteredStudents = students.filter((std) => {
    const matchClass = selectedClass === 'ALL' || std.classGroup === selectedClass;
    const matchName = std.studentName.toLowerCase().includes(searchStudent.toLowerCase());
    return matchClass && matchName;
  });

  // Analytics summary
  const averageClassScore = Math.round(
    students.reduce((acc, curr) => acc + curr.averageScore, 0) / students.length
  );
  const totalCompletedLessons = students.reduce((acc, curr) => acc + curr.completedLessonsCount, 0);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some((o) => !o.trim())) return;

    soundEffects.playSuccess();
    setQuestionCreatedSuccess(true);
    setTimeout(() => {
      setQuestionCreatedSuccess(false);
      setShowAddQuestionModal(false);
      setNewQuestionText('');
      setNewOptions(['', '', '', '']);
      setNewExplanation('');
    }, 1500);
  };

  const handleExportCSV = () => {
    soundEffects.playClick();
    const headers = 'ID,Nama Siswa,Kelas,Rata-rata Skor,Modul Selesai,Status\n';
    const rows = students
      .map(
        (s) =>
          `"${s.id}","${s.studentName}","${s.classGroup}",${s.averageScore},${s.completedLessonsCount},"${s.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Laporan_Progres_Informatika_SMP.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0b0e24] border border-purple-500/30 rounded-xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <span>MODE GURU & PENDIDIK</span>
            <span aria-hidden="true">·</span>
            <span>DASHBOARD PEMANTAUAN PROGRES KOMPREHENSIF</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Pusat Kendali Akademik Informatika SMP
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Pantau tingkat ketuntasan kompetensi siswa, analisis materi yang memerlukan pendampingan, dan kelola bank soal.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Soal Asesmen</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>TOTAL SISWA TERDAFTAR</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-2">{students.length} Siswa</div>
          <div className="text-[11px] text-slate-500 mt-1">3 Rombel Aktif (7, 8, 9)</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>RATA-RATA NILAI KELAS</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">{averageClassScore} / 100</div>
          <div className="text-[11px] text-emerald-400/80 mt-1">+4.2% Melampaui Target KKTP</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>MODUL PEMBELAJARAN TUNTAS</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-2">{totalCompletedLessons} Modul</div>
          <div className="text-[11px] text-slate-500 mt-1">Akumulasi penyelesaian kelas</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>LAB PALING DIMINATI</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-300 truncate mt-2">3D Gerbang Logika</div>
          <div className="text-[11px] text-slate-500 mt-1">Diikuti Stack & Queue Lab</div>
        </div>
      </div>

      {/* Concept Mastery Heatmap & Difficult Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Difficult Topics Watchlist */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
              MATERI YANG PERLU DITINGKATKAN
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Deteksi Diagnostik</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Gerbang Logika XOR & XNOR</div>
                <div className="text-[11px] text-slate-400">Beberapa siswa terkecoh kondisi input ganda (1 dan 1)</div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                68% Paham
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Konversi Biner ke Heksadesimal</div>
                <div className="text-[11px] text-slate-400">Pengelompokan 4 bit (nibble) memerlukan pengulangan</div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                74% Paham
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Perbedaan LIFO Stack vs FIFO Queue</div>
                <div className="text-[11px] text-slate-400">Memerlukan latihan praktik visual berulang</div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                85% Paham
              </span>
            </div>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              DAFTAR SISWA & KEMAJUAN ASESMEN
            </span>

            <div className="flex items-center gap-2">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none"
              >
                <option value="ALL">Semua Kelas</option>
                <option value="8-Cyber A">8-Cyber A</option>
                <option value="8-Cyber B">8-Cyber B</option>
                <option value="7-Alpha">7-Alpha</option>
                <option value="9-Quantum">9-Quantum</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Cari siswa..."
                  className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-2 py-1 text-xs text-white placeholder-slate-500 focus:outline-none w-32 sm:w-40"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Nama Siswa</th>
                  <th className="py-2.5 px-3">Kelas</th>
                  <th className="py-2.5 px-3">Rata-rata</th>
                  <th className="py-2.5 px-3">Modul</th>
                  <th className="py-2.5 px-3">Status Belajar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {std.studentName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {std.classGroup}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-cyan-300">{std.averageScore}</span>
                      <span className="text-slate-500">/100</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {std.completedLessonsCount} / {std.totalLessons}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          std.status === 'Unggul'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : std.status === 'Aktif Belajar'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0e24] border border-purple-500/50 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-purple-400" />
                Tambah Soal Asesmen Baru
              </h3>
              <button
                onClick={() => setShowAddQuestionModal(false)}
                className="text-xs text-slate-400 hover:text-white font-mono"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Pertanyaan Soal:</label>
                <textarea
                  rows={2}
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Ketik soal pilihan ganda Informatika..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Elemen / Strand:</label>
                  <select
                    value={newStrand}
                    onChange={(e) => setNewStrand(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  >
                    <option value="BK">Berpikir Komputasional (BK)</option>
                    <option value="SK">Sistem Komputer (SK)</option>
                    <option value="AP">Algoritma & Pemrograman (AP)</option>
                    <option value="JKI">Jaringan Komputer (JKI)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Kunci Jawaban Benar:</label>
                  <select
                    value={newCorrectIndex}
                    onChange={(e) => setNewCorrectIndex(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  >
                    <option value={0}>Pilihan A</option>
                    <option value={1}>Pilihan B</option>
                    <option value={2}>Pilihan C</option>
                    <option value={3}>Pilihan D</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-400 font-mono">Pilihan Jawaban (A, B, C, D):</label>
                {newOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 text-slate-400 font-mono">{String.fromCharCode(65 + idx)}.</span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const copy = [...newOptions];
                        copy[idx] = e.target.value;
                        setNewOptions(copy);
                      }}
                      placeholder={`Opsi ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Pembahasan Otomatis Lengkap:</label>
                <textarea
                  rows={2}
                  required
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Tuliskan alasan mengapa jawaban tersebut benar dan penjelasan logikanya..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              {questionCreatedSuccess && (
                <div className="p-2.5 bg-emerald-950 border border-emerald-500/50 rounded-lg text-emerald-300 flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  Soal berhasil disimpan ke Bank Soal Informatika!
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded font-mono"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
