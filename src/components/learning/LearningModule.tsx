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

            {/* Special Section: Buku Teks Informatika SMP Kelas VIII Hal. 62 */}
            {selectedLesson.id === 'k8-ap-1' && (
              <div className="p-5 bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#070a1a] border border-cyan-500/40 rounded-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>BUKU TEKS INFORMATIKA SMP/MTs KELAS VIII · HALAMAN 62</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
                    Gambar 2.16 Ilustrasi Tumpukan LIFO
                  </span>
                </div>

                {/* Paragraf Pengantar Sesuai Buku */}
                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                  "Konsep stack ini dalam kehidupan sehari-hari mirip dengan tumpukan buku. Yang mana apabila buku yang terakhir diletakkan di atas tumpukan, maka yang terakhir yang dapat diambil terlebih dahulu, kemudian dilanjut dengan tumpukan berikutnya. Terdapat beberapa operasi pada stack sebagai berikut."
                </p>

                {/* Diagram Bola Masuk Tabung & Urutan Keluar */}
                <div className="bg-[#050713] border border-slate-800 rounded-xl p-5 flex flex-col items-center">
                  <div className="text-center font-mono text-xs text-slate-300 mb-4">
                    Bola dimasukkan kedalam tabung sesuai dengan urutan dari nomor 1 sampai dengan 4:
                  </div>

                  {/* Urutan Masuk Bola */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold font-mono text-sm shadow-md shadow-blue-500/30">
                      1
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-bold font-mono text-sm shadow-md shadow-amber-400/30">
                      2
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono text-sm shadow-md shadow-emerald-500/30">
                      3
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-600 text-white font-bold font-mono text-sm shadow-md shadow-rose-600/30">
                      4
                    </div>
                    <span className="text-xs font-mono text-cyan-400 pl-1">➔ Masuk ke Tabung</span>
                  </div>

                  {/* Tabung Silinder dan Panah Keluar */}
                  <div className="flex items-center justify-center gap-6 w-full max-w-lg">
                    {/* Tabung Vertikal */}
                    <div className="w-24 border-2 border-slate-600 border-t-0 rounded-b-2xl p-2 bg-slate-900/60 flex flex-col-reverse gap-2 shadow-inner">
                      {/* Bola 1 */}
                      <div className="flex items-center justify-center w-full h-12 rounded-full bg-blue-600 text-white font-bold font-mono text-sm shadow-inner">
                        1
                      </div>
                      {/* Bola 2 */}
                      <div className="flex items-center justify-center w-full h-12 rounded-full bg-amber-400 text-slate-950 font-bold font-mono text-sm shadow-inner">
                        2
                      </div>
                      {/* Bola 3 */}
                      <div className="flex items-center justify-center w-full h-12 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono text-sm shadow-inner">
                        3
                      </div>
                      {/* Bola 4 (TOP) */}
                      <div className="flex items-center justify-center w-full h-12 rounded-full bg-rose-600 text-white font-bold font-mono text-sm shadow-inner ring-2 ring-rose-400">
                        4
                      </div>
                    </div>

                    {/* Panah Urutan Keluar */}
                    <div className="flex flex-col justify-between h-56 py-1 space-y-2 text-xs font-mono">
                      {/* Keluar 1: Bola 4 */}
                      <div className="flex items-center gap-2 text-rose-300">
                        <ArrowRight className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="font-semibold">Menjadi Urutan Pertama yang akan diambil/dikeluarkan</span>
                      </div>
                      {/* Keluar 2: Bola 3 */}
                      <div className="flex items-center gap-2 text-emerald-300">
                        <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold">Menjadi Urutan Kedua yang akan diambil/dikeluarkan</span>
                      </div>
                      {/* Keluar 3: Bola 2 */}
                      <div className="flex items-center gap-2 text-amber-300">
                        <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold">Menjadi Urutan Ketiga yang akan diambil/dikeluarkan</span>
                      </div>
                      {/* Keluar 4: Bola 1 */}
                      <div className="flex items-center gap-2 text-blue-300">
                        <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="font-semibold">Menjadi Urutan Keempat yang akan diambil/dikeluarkan</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mt-4 text-center">
                    Gambar 2.16 Ilustrasi Tumpukan LIFO (Last In First Out)
                  </div>
                </div>

                {/* Tabel Operasi Pada Stack Sesuai Buku Halaman 62 */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    Tabel Operasi Pada Stack (Buku Teks Hal. 62):
                  </div>
                  <div className="overflow-x-auto border border-slate-800 rounded-lg">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                        <tr>
                          <th className="py-2.5 px-3 w-32">Nama Operasi</th>
                          <th className="py-2.5 px-3">Penjelasan Resmi Buku Paket</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3">
                            <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-sky-400/50 text-sky-300 font-mono font-bold inline-block">
                              Push
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-200">
                            <strong>Push</strong> merupakan operasi yang digunakan untuk menambahkan elemen baru ke dalam stack pada posisi teratas.
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3">
                            <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-400/50 text-amber-300 font-mono font-bold inline-block">
                              Pop
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-200">
                            <strong>Pop</strong> merupakan operasi yang digunakan untuk menghapus elemen teratas dari stack dan mengembalikan nilainya.
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3">
                            <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-400/50 text-rose-300 font-mono font-bold inline-block">
                              isEmpty/Top
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-200">
                            <strong>isEmpty atau Top</strong> merupakan operasi yang digunakan untuk mengecek elemen teratas dari stack tanpa menghapusnya.
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3">
                            <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 font-mono font-bold inline-block">
                              isEmpty
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-200">
                            <strong>isEmpty</strong> merupakan operasi yang digunakan untuk memeriksa apakah stack kosong atau tidak.
                          </td>
                        </tr>

                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3">
                            <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-400/50 text-purple-300 font-mono font-bold inline-block">
                              Size
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-200">
                            <strong>Size</strong> merupakan operasi yang digunakan untuk mengembalikan jumlah elemen dalam stack.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Manfaat Nyata Stack Sesuai Paragraf Akhir Halaman 62 */}
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <div className="text-cyan-400 font-mono font-semibold">
                    Manfaat Stack Dalam Komputer dan Kehidupan Sehari-hari:
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    "Konsep stack sangat bermanfaat dalam bidang komputer maupun dalam kehidupan sehari hari, misalnya penggunaan <strong>undo</strong> dalam aplikasi, <strong>penyimpanan data pada alamat memori komputer</strong>, <strong>perhitungan ekspresi dalam aritmetika</strong>, <strong>pengurutan barang</strong>, <strong>navigasi browser</strong>, dan <strong>pengelolaan buku pada perpustakaan</strong>."
                  </p>
                </div>
              </div>
            )}

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
