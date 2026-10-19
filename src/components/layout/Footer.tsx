import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-[#050711] py-8 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400 font-bold">CYBERINFORMATIKA SMP</span>
          <span aria-hidden="true">·</span>
          <span>Kurikulum Merdeka Kelas VII, VIII, IX</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Laboratorium Pembelajaran Interaktif Digital</span>
          <span aria-hidden="true">·</span>
          <span>Hak Cipta © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
