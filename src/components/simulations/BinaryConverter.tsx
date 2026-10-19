import React, { useState } from 'react';
import { soundEffects } from '../../utils/audio';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, Copy, Check } from 'lucide-react';

export const BinaryConverter: React.FC = () => {
  // 8-bit state [bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0]
  const [bits, setBits] = useState<number[]>([0, 0, 1, 0, 1, 0, 1, 0]); // default 42
  const [mode, setMode] = useState<'interactive' | 'division' | 'text'>('interactive');
  const [divisionInput, setDivisionInput] = useState<number>(42);
  const [textInput, setTextInput] = useState<string>('SMP');
  const [copied, setCopied] = useState<string | null>(null);

  // Challenge game state
  const [challengeTarget, setChallengeTarget] = useState<number>(37);
  const [challengeSolved, setChallengeSolved] = useState<boolean>(false);

  // Calculate decimal value from bits
  const decimalValue = bits.reduce((acc, bit, idx) => {
    const power = 7 - idx;
    return acc + (bit ? Math.pow(2, power) : 0);
  }, 0);

  const hexValue = decimalValue.toString(16).toUpperCase().padStart(2, '0');
  const octalValue = decimalValue.toString(8);
  const charValue = decimalValue >= 32 && decimalValue <= 126 ? String.fromCharCode(decimalValue) : '·';

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
    soundEffects.playToggle(newBits[index] === 1);

    // Check challenge
    const newDec = newBits.reduce((acc, bit, idx) => acc + (bit ? Math.pow(2, 7 - idx) : 0), 0);
    if (newDec === challengeTarget) {
      setChallengeSolved(true);
      soundEffects.playSuccess();
    } else {
      setChallengeSolved(false);
    }
  };

  const setAllBits = (val: 0 | 1) => {
    setBits(new Array(8).fill(val));
    soundEffects.playClick();
  };

  const handleDecimalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0 && val <= 255) {
      const newBits = val
        .toString(2)
        .padStart(8, '0')
        .split('')
        .map((b) => parseInt(b, 10));
      setBits(newBits);
      if (val === challengeTarget) {
        setChallengeSolved(true);
        soundEffects.playSuccess();
      } else {
        setChallengeSolved(false);
      }
    }
  };

  const generateNewChallenge = () => {
    const randomTarget = Math.floor(Math.random() * 128) + 1;
    setChallengeTarget(randomTarget);
    setChallengeSolved(false);
    soundEffects.playClick();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1800);
  };

  // Compute division steps for division visualizer
  const computeDivisionSteps = (num: number) => {
    const steps: { current: number; quotient: number; remainder: number }[] = [];
    let n = Math.max(0, Math.min(1024, num));
    if (n === 0) {
      steps.push({ current: 0, quotient: 0, remainder: 0 });
      return steps;
    }
    while (n > 0) {
      const q = Math.floor(n / 2);
      const r = n % 2;
      steps.push({ current: n, quotient: q, remainder: r });
      n = q;
    }
    return steps;
  };

  const divisionSteps = computeDivisionSteps(divisionInput);
  const divisionResultBinary = divisionSteps.map((s) => s.remainder).reverse().join('');

  return (
    <div className="bg-[#0b0e24] border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
      {/* Glow ambient */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>LAB SIMULASI BK & SK</span>
            <span aria-hidden="true">·</span>
            <span>SISTEM BILANGAN KOMPUTER</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Binary Converter & Bitwise Matrix
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Eksplorasi representasi data digital 8-bit, bobot eksponensial biner, dan alur pembagian dua bertingkat.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => { setMode('interactive'); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'interactive'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bit Interaktif
          </button>
          <button
            onClick={() => { setMode('division'); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'division'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Visual Alur Bagi 2
          </button>
          <button
            onClick={() => { setMode('text'); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'text'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Teks ASCII ke Biner
          </button>
        </div>
      </div>

      {mode === 'interactive' && (
        <div className="mt-6 space-y-6">
          {/* Challenge Box */}
          <div className="p-4 bg-slate-900/80 border border-cyan-500/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">TANTANGAN KILAT SISWA</div>
                <div className="text-sm font-semibold text-white">
                  Rangkai saklar bit hingga menghasilkan desimal: <span className="text-cyan-400 font-mono text-base px-1.5 py-0.5 bg-cyan-950/70 border border-cyan-500/40 rounded">{challengeTarget}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {challengeSolved ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-semibold rounded-md animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  Target Berhasil Dirangkai! (+50 XP)
                </div>
              ) : (
                <button
                  onClick={generateNewChallenge}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Ganti Angka Target
                </button>
              )}
            </div>
          </div>

          {/* Interactive 8-Bit Panel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Saklar Mikro 8-Bit (Klik tombol untuk toggle 0 atau 1)
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setAllBits(0)}
                  className="text-slate-400 hover:text-cyan-400 underline transition-colors"
                >
                  Reset Semua 0
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => setAllBits(1)}
                  className="text-slate-400 hover:text-cyan-400 underline transition-colors"
                >
                  Nyalakan Semua 1 (255)
                </button>
              </div>
            </div>

            {/* 8 Bits Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {bits.map((bit, idx) => {
                const power = 7 - idx;
                const weight = Math.pow(2, power);
                const isActive = bit === 1;

                return (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    className={`relative p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[110px] group ${
                      isActive
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {/* Weight power */}
                    <div className="text-[11px] font-mono text-slate-400">
                      2^{power}
                    </div>

                    {/* Weight value */}
                    <div className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                      {weight}
                    </div>

                    {/* Big Bit Display with LED ring */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-lg font-extrabold transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-black shadow-md shadow-cyan-400/50 scale-105'
                          : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {bit}
                    </div>

                    {/* Status label */}
                    <div className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {isActive ? 'ON' : 'OFF'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mathematical Sum Formula Breakdown */}
          <div className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto">
            <span className="text-cyan-400 font-semibold">Rumus Penjumlahan Bobot: </span>
            {bits.map((bit, idx) => {
              const weight = Math.pow(2, 7 - idx);
              return (
                <span key={idx}>
                  {idx > 0 && ' + '}
                  <span className={bit ? 'text-cyan-300 font-bold' : 'text-slate-600'}>
                    ({bit} × {weight})
                  </span>
                </span>
              );
            })}
            <span className="text-cyan-400 font-bold"> = {decimalValue}</span>
          </div>

          {/* Real-Time Conversion Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Decimal Card */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span>DESIMAL (Basis 10)</span>
                <button
                  onClick={() => copyToClipboard(decimalValue.toString(), 'dec')}
                  className="text-slate-500 hover:text-white"
                  title="Salin nilai"
                >
                  {copied === 'dec' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={decimalValue}
                  onChange={handleDecimalInput}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded px-2.5 py-1.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">Angka biasa sehari-hari</div>
            </div>

            {/* Binary Card */}
            <div className="p-4 bg-slate-900/80 border border-cyan-500/40 rounded-lg shadow-sm shadow-cyan-500/10">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-1">
                <span>BINER (Basis 2)</span>
                <button
                  onClick={() => copyToClipboard(bits.join(''), 'bin')}
                  className="text-slate-500 hover:text-white"
                  title="Salin nilai"
                >
                  {copied === 'bin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-lg font-mono font-bold text-cyan-300 py-1.5 tracking-wider truncate">
                {bits.join('')}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">Format logika 0 dan 1 mikroprosesor</div>
            </div>

            {/* Hexadecimal Card */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs text-purple-400 font-mono mb-1">
                <span>HEKSADESIMAL (Basis 16)</span>
                <button
                  onClick={() => copyToClipboard(`0x${hexValue}`, 'hex')}
                  className="text-slate-500 hover:text-white"
                  title="Salin nilai"
                >
                  {copied === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-lg font-mono font-bold text-purple-300 py-1.5">
                0x{hexValue}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">Alamat memori & kode warna web</div>
            </div>

            {/* Octal / ASCII Card */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-1">
                <span>ASCII & OKTAL</span>
                <span className="text-[10px] text-slate-500">Basis 8: {octalValue}</span>
              </div>
              <div className="text-lg font-mono font-bold text-amber-300 py-1.5 flex items-center gap-2">
                <span>Karakter:</span>
                <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/40 rounded text-amber-200">
                  {charValue === '·' ? '(Non-cetak)' : `'${charValue}'`}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">Kode simbol teks standar dunia</div>
            </div>
          </div>
        </div>
      )}

      {mode === 'division' && (
        <div className="mt-6 space-y-6">
          {/* Input control */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
            <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Ketik Angka Desimal yang Ingin Dikonversi ke Biner:
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="number"
                min="0"
                max="512"
                value={divisionInput}
                onChange={(e) => setDivisionInput(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full sm:w-48 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-400"
              />
              <div className="text-xs text-slate-400">
                Teknik ini membagi angka desimal berulang kali dengan 2, lalu mencatat sisa pembagian (0 atau 1).
              </div>
            </div>
          </div>

          {/* Division visual table */}
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Langkah</th>
                  <th className="p-3">Kalkulasi Pembagian</th>
                  <th className="p-3">Hasil Bagi (Quotient)</th>
                  <th className="p-3 text-cyan-400">Sisa Bagi (Remainder)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {divisionSteps.map((step, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 text-slate-500">#{idx + 1}</td>
                    <td className="p-3 text-slate-200">
                      {step.current} ÷ 2
                    </td>
                    <td className="p-3 text-slate-300 font-semibold">
                      {step.quotient}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        step.remainder === 1 ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {step.remainder}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Result explanation */}
          <div className="p-4 bg-cyan-950/40 border border-cyan-500/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-cyan-400 font-mono">BACA SISA BAGI DARI BAWAH KE ATAS:</div>
              <div className="text-xl font-mono font-bold text-white mt-1 tracking-widest">
                {divisionInput} desimal = <span className="text-cyan-300">{divisionResultBinary || '0'}</span> biner
              </div>
            </div>
            <div className="text-xs text-slate-400 max-w-sm">
              Sisa bagi yang didapat paling akhir menjadi Most Significant Bit (MSB / bit terdepan).
            </div>
          </div>
        </div>
      )}

      {mode === 'text' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
            <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Ketik Kata atau Kalimat untuk Melihat Terjemahan Biner di Komputer:
            </label>
            <input
              type="text"
              maxLength={15}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white font-mono text-base focus:outline-none focus:border-cyan-400"
              placeholder="Contoh: INFORMATIKA"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {textInput.split('').map((char, idx) => {
              const code = char.charCodeAt(0);
              const bin = code.toString(2).padStart(8, '0');
              const hex = code.toString(16).toUpperCase();
              return (
                <div key={idx} className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-mono">Huruf ke-{idx + 1}</span>
                    <div className="text-2xl font-bold text-white font-mono">{char}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs text-cyan-300 font-bold">{bin}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">ASCII: {code} · Hex: 0x{hex}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-bold">Rangkaian Biner Lengkap: </span>
            <span className="text-slate-100 tracking-wider">
              {textInput.split('').map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
