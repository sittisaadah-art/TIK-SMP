import React, { useState } from 'react';
import { TECH_FACTS } from '../../data/factsData';
import { soundEffects } from '../../utils/audio';
import { Sparkles, RefreshCw, Zap, Lightbulb, Compass, Share2, Check } from 'lucide-react';

export const TechFacts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFact = TECH_FACTS[currentIndex];

  const handleNextFact = () => {
    soundEffects.playClick();
    setCurrentIndex((prev) => (prev + 1) % TECH_FACTS.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${currentFact.title}: ${currentFact.content}`);
    setCopied(true);
    soundEffects.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0b0e24] border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>FAKTA UNIK & TRIVIA INFORMATIKA</span>
            <span aria-hidden="true">·</span>
            <span>GEN Z CYBER KNOWLEDGE</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Cyber Tech Bites & Fakta Menakjubkan
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Tahukah kamu rahasia di balik sejarah komputasi, transistor mikro, dan asal usul bug pertama di dunia?
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Bagikan Fakta'}</span>
          </button>

          <button
            onClick={handleNextFact}
            className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Fakta Berikutnya</span>
          </button>
        </div>
      </div>

      {/* Active Featured Card */}
      <div className="mt-6 p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 to-[#070914] border border-cyan-500/30 rounded-2xl relative space-y-5 shadow-xl shadow-cyan-500/5">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold rounded-lg">
            {currentFact.category}
          </span>
          <span className="text-xs font-mono text-slate-500">
            Fakta #{currentIndex + 1} dari {TECH_FACTS.length}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
          {currentFact.title}
        </h3>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          {currentFact.content}
        </p>

        {/* Gen Z Vibe Quote */}
        <div className="p-4 bg-slate-950/80 border border-purple-500/30 rounded-xl flex items-center gap-3">
          <Zap className="w-5 h-5 text-purple-400 shrink-0" />
          <div className="text-xs sm:text-sm font-mono text-purple-200 italic">
            "{currentFact.genZQuote}"
          </div>
        </div>
      </div>

      {/* Mini Trivia Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {TECH_FACTS.map((fact, idx) => (
          <button
            key={fact.id}
            onClick={() => {
              setCurrentIndex(idx);
              soundEffects.playClick();
            }}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              currentIndex === idx
                ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] font-mono text-cyan-400 uppercase">{fact.category}</div>
            <div className="text-xs font-bold text-white mt-1 line-clamp-1">{fact.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
