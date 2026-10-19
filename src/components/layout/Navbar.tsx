import React from 'react';
import { soundEffects } from '../../utils/audio';
import { Volume2, VolumeX, Shield, User, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: 'materi' | 'simulasi' | 'asesmen' | 'fakta' | 'profil' | 'guru';
  onSelectTab: (tab: 'materi' | 'simulasi' | 'asesmen' | 'fakta' | 'profil' | 'guru') => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isTeacherMode,
  onToggleTeacherMode,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#060814]/90 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            onSelectTab('materi');
            soundEffects.playClick();
          }}
          className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-cyan-400 font-mono group-hover:text-cyan-300 transition-colors">
            CYBER<span className="text-purple-400">INFORMATIKA</span>
          </span>
          <span className="text-[11px] font-mono text-slate-500 uppercase">SMP</span>
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              onSelectTab('materi');
              soundEffects.playClick();
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'materi'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Materi Pembelajaran
          </button>

          <button
            onClick={() => {
              onSelectTab('simulasi');
              soundEffects.playClick();
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'simulasi'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Simulasi Interaktif
          </button>

          <button
            onClick={() => {
              onSelectTab('asesmen');
              soundEffects.playClick();
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'asesmen'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Latihan Soal & Ujian
          </button>

          <button
            onClick={() => {
              onSelectTab('fakta');
              soundEffects.playClick();
            }}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'fakta'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Fakta Cyber
          </button>

          {!isTeacherMode ? (
            <button
              onClick={() => {
                onSelectTab('profil');
                soundEffects.playClick();
              }}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'profil'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Profil & Rapor Siswa
            </button>
          ) : (
            <button
              onClick={() => {
                onSelectTab('guru');
                soundEffects.playClick();
              }}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'guru'
                  ? 'text-purple-400 border-b-2 border-purple-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Dashboard Guru
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound toggle button */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Mode Switcher Button */}
          <button
            onClick={onToggleTeacherMode}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              isTeacherMode
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
            }`}
          >
            {isTeacherMode ? (
              <>
                <Shield className="w-3.5 h-3.5" />
                <span>Mode Guru</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5" />
                <span>Mode Siswa</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
