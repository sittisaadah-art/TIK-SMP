import React, { useState } from 'react';
import { soundEffects } from '../../utils/audio';
import { GitBranch, Network, Grid, Play, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';

interface TreeNode {
  id: number;
  val: number;
  label: string;
  x: number;
  y: number;
  left?: number;
  right?: number;
}

const INITIAL_TREE_NODES: TreeNode[] = [
  { id: 1, val: 50, label: 'Root (50)', x: 260, y: 40, left: 2, right: 3 },
  { id: 2, val: 30, label: 'Kiri (30)', x: 140, y: 120, left: 4, right: 5 },
  { id: 3, val: 70, label: 'Kanan (70)', x: 380, y: 120, left: 6, right: 7 },
  { id: 4, val: 20, label: 'Leaf (20)', x: 80, y: 200 },
  { id: 5, val: 40, label: 'Leaf (40)', x: 200, y: 200 },
  { id: 6, val: 60, label: 'Leaf (60)', x: 320, y: 200 },
  { id: 7, val: 80, label: 'Leaf (80)', x: 440, y: 200 },
];

export const DataStructureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tree' | 'graph' | 'array'>('tree');

  // Tree traversal simulation state
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Array state
  const [arrayData, setArrayData] = useState<number[]>([14, 28, 42, 65, 89, 99]);
  const [searchTarget, setSearchTarget] = useState<number>(42);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);

  // Run tree traversal animation
  const runTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    if (isRunning) return;
    setIsRunning(true);
    setVisitedNodes([]);
    soundEffects.playClick();

    // Traversal sequences based on node IDs:
    // Inorder (Left, Root, Right): 4 (20), 2 (30), 5 (40), 1 (50), 6 (60), 3 (70), 7 (80)
    // Preorder (Root, Left, Right): 1, 2, 4, 5, 3, 6, 7
    // Postorder (Left, Right, Root): 4, 5, 2, 6, 7, 3, 1
    let sequence: number[] = [];
    if (type === 'inorder') sequence = [4, 2, 5, 1, 6, 3, 7];
    if (type === 'preorder') sequence = [1, 2, 4, 5, 3, 6, 7];
    if (type === 'postorder') sequence = [4, 5, 2, 6, 7, 3, 1];

    sequence.forEach((nodeId, idx) => {
      setTimeout(() => {
        setActiveNode(nodeId);
        setVisitedNodes((prev) => [...prev, nodeId]);
        soundEffects.playToggle(true);
        if (idx === sequence.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setActiveNode(null);
            soundEffects.playSuccess();
          }, 600);
        }
      }, idx * 700);
    });
  };

  const handleArraySearch = () => {
    soundEffects.playClick();
    const idx = arrayData.indexOf(searchTarget);
    setFoundIndex(idx !== -1 ? idx : -1);
    if (idx !== -1) soundEffects.playSuccess();
  };

  return (
    <div className="bg-[#0b0e24] border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>LAB STRUKTUR DATA NON-LINEAR & ARRAY</span>
            <span aria-hidden="true">·</span>
            <span>INFORMATIKA KELAS VIII & IX</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Visualisasi Pohon (Tree), Graf (Graph) & Array
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Jelajahi representasi data hierarkis, jaringan simpul graf navigasi rute, serta pemetaan memori larik berindeks.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => { setActiveTab('tree'); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'tree'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Binary Tree
          </button>
          <button
            onClick={() => { setActiveTab('graph'); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'graph'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Graf & Jaringan
          </button>
          <button
            onClick={() => { setActiveTab('array'); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'array'
                ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Larik (Array)
          </button>
        </div>
      </div>

      {activeTab === 'tree' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tree Canvas Stage */}
          <div className="lg:col-span-8 bg-[#060814] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[340px]">
            <svg viewBox="0 0 520 260" className="w-full max-w-[500px] h-auto overflow-visible">
              {/* Edges Lines */}
              <line x1="260" y1="40" x2="140" y2="120" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="260" y1="40" x2="380" y2="120" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="140" y1="120" x2="80" y2="200" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="140" y1="120" x2="200" y2="200" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="380" y1="120" x2="320" y2="200" stroke="#1e293b" strokeWidth="2.5" />
              <line x1="380" y1="120" x2="440" y2="200" stroke="#1e293b" strokeWidth="2.5" />

              {/* Tree Nodes */}
              {INITIAL_TREE_NODES.map((node) => {
                const isActive = activeNode === node.id;
                const isVisited = visitedNodes.includes(node.id);

                return (
                  <g key={node.id} className="cursor-pointer transition-transform duration-200">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill={isActive ? '#06b6d4' : isVisited ? '#0f766e' : '#0f172a'}
                      stroke={isActive ? '#22d3ee' : isVisited ? '#14b8a6' : '#334155'}
                      strokeWidth="2.5"
                      className="transition-colors duration-300"
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
                      textAnchor="middle"
                      fill={isActive ? '#000000' : '#ffffff'}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.val}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" /> Sedang Dikunjungi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" /> Sudah Dilewati
              </span>
            </div>
          </div>

          {/* Controls & Concepts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                SIMULASI PENELUSURAN (TRAVERSAL)
              </span>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => { setTraversalType('inorder'); runTraversal('inorder'); }}
                  disabled={isRunning}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono text-left flex items-center justify-between transition-colors"
                >
                  <span>1. In-order (Kiri, Akar, Kanan)</span>
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                </button>

                <button
                  onClick={() => { setTraversalType('preorder'); runTraversal('preorder'); }}
                  disabled={isRunning}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono text-left flex items-center justify-between transition-colors"
                >
                  <span>2. Pre-order (Akar, Kiri, Kanan)</span>
                  <Play className="w-3.5 h-3.5 text-purple-400" />
                </button>

                <button
                  onClick={() => { setTraversalType('postorder'); runTraversal('postorder'); }}
                  disabled={isRunning}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono text-left flex items-center justify-between transition-colors"
                >
                  <span>3. Post-order (Kiri, Kanan, Akar)</span>
                  <Play className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

              {/* Traversal Output Sequence */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs">
                <span className="text-slate-400">Urutan Kunjungan:</span>
                <div className="text-cyan-300 font-bold mt-1 tracking-wider min-h-[20px]">
                  {visitedNodes.length > 0
                    ? visitedNodes.map((id) => INITIAL_TREE_NODES.find((n) => n.id === id)?.val).join(' → ')
                    : 'Pilih traversal di atas'}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
              <strong className="text-slate-200">Aplikasi Nyata Pohon:</strong>
              <p>Struktur direktori folder di Windows/Mac/Linux (Root C:\Users) dan susunan dokumen HTML (DOM Tree).</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'graph' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#060814] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[340px]">
            {/* SVG Graph Network (Router nodes) */}
            <svg viewBox="0 0 500 240" className="w-full max-w-[480px] h-auto">
              {/* Lines */}
              <line x1="80" y1="120" x2="200" y2="60" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="80" y1="120" x2="200" y2="180" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="200" y1="60" x2="340" y2="60" stroke="#06b6d4" strokeWidth="2" />
              <line x1="200" y1="180" x2="340" y2="180" stroke="#06b6d4" strokeWidth="2" />
              <line x1="200" y1="60" x2="200" y2="180" stroke="#334155" strokeWidth="1.5" />
              <line x1="340" y1="60" x2="440" y2="120" stroke="#a855f7" strokeWidth="2" />
              <line x1="340" y1="180" x2="440" y2="120" stroke="#a855f7" strokeWidth="2" />

              {/* Node Circles */}
              <g>
                <circle cx="80" cy="120" r="24" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                <text x="80" y="125" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold" fontFamily="monospace">Client A</text>
              </g>
              <g>
                <circle cx="200" cy="60" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace">Router 1</text>
              </g>
              <g>
                <circle cx="200" cy="180" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="185" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace">Router 2</text>
              </g>
              <g>
                <circle cx="340" cy="60" r="22" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
                <text x="340" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace">Switch 1</text>
              </g>
              <g>
                <circle cx="340" cy="180" r="22" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
                <text x="340" y="185" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace">Switch 2</text>
              </g>
              <g>
                <circle cx="440" cy="120" r="24" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                <text x="440" y="125" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold" fontFamily="monospace">Server B</text>
              </g>
            </svg>

            <div className="text-xs font-mono text-slate-400 mt-2">
              Simpul (Verteks) = Perangkat Jaringan · Sisi (Edge) = Jalur Kabel Fiber Optik
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                GRAF & JARINGAN NAVIGASI
              </span>
              <h3 className="text-sm font-bold text-white">Beda Graf dan Pohon (Tree)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pohon adalah bentuk khusus dari graf yang <strong>tidak boleh memiliki siklus tertutup (cycle)</strong> dan memiliki satu akar utama. Sedangkan Graf dapat saling terhubung bebas dengan banyak jalur bolak-balik.
              </p>
            </div>

            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
              <strong className="text-slate-200">Aplikasi Nyata Graf:</strong>
              <p>• Google Maps & Waze (mencari rute tercepat dengan algoritma Dijkstra).</p>
              <p>• Rekomendasi pertemanan Instagram/TikTok (Social Graph Network).</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'array' && (
        <div className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                LARIK BERINDEKS (0-BASED INDEX ARRAY)
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Penyimpanan Data Bersebelahan di Memori Komputer
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(parseInt(e.target.value, 10) || 0)}
                className="w-24 bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white"
                placeholder="Cari angka"
              />
              <button
                onClick={handleArraySearch}
                className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded transition-colors"
              >
                Cari Nilai (Linear Search)
              </button>
            </div>
          </div>

          {/* Array visual cells */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {arrayData.map((val, idx) => {
              const isMatch = foundIndex === idx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    isMatch
                      ? 'bg-cyan-950 border-cyan-400 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-500">
                    Indeks [{idx}]
                  </div>
                  <div className={`text-2xl font-mono font-bold my-2 ${isMatch ? 'text-cyan-300' : 'text-white'}`}>
                    {val}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    Alamat: 0x{((idx + 1) * 4).toString(16).padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>

          {foundIndex !== null && (
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-200">
              {foundIndex >= 0 ? (
                <span>Ditemukan: Angka {searchTarget} berada di indeks ke-[{foundIndex}]!</span>
              ) : (
                <span>Angka {searchTarget} tidak ditemukan dalam larik ini.</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
