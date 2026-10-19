import React, { useState } from 'react';
import { BinaryConverter } from './BinaryConverter';
import { LogicGate3D } from './LogicGate3D';
import { StackQueueLab } from './StackQueueLab';
import { DataStructureVisualizer } from './DataStructureVisualizer';
import { soundEffects } from '../../utils/audio';
import { Binary, Cpu, Layers, GitBranch, Sparkles } from 'lucide-react';

interface SimulationHubProps {
  initialLab?: 'binary' | 'logic-gate' | 'stack-queue' | 'data-structure';
}

export const SimulationHub: React.FC<SimulationHubProps> = ({ initialLab = 'binary' }) => {
  const [activeLab, setActiveLab] = useState<'binary' | 'logic-gate' | 'stack-queue' | 'data-structure'>(initialLab);

  const labList = [
    {
      id: 'binary' as const,
      title: 'Konversi Biner & Bobot Bit',
      grade: 'Kelas VII & VIII',
      icon: Binary,
      description: 'Saklar 8-bit, pembagian 2 bertingkat, dan kode teks ASCII.',
    },
    {
      id: 'logic-gate' as const,
      title: '3D Gerbang Logika & Truth Table',
      grade: 'Kelas VIII',
      icon: Cpu,
      description: 'Sirkuit 3D AND, OR, NOT, NAND, NOR, XOR, XNOR & Half Adder.',
    },
    {
      id: 'stack-queue' as const,
      title: 'Animasi Stack (LIFO) & Queue (FIFO)',
      grade: 'Kelas VIII',
      icon: Layers,
      description: 'Push, Pop, Top, Enqueue, Dequeue, Front, Rear, dan kapasitas penuh.',
    },
    {
      id: 'data-structure' as const,
      title: 'Pohon (Tree), Graf & Larik',
      grade: 'Kelas VIII & IX',
      icon: GitBranch,
      description: 'Penelusuran In/Pre/Post-order, jaringan rute graf, dan indeks memori.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {labList.map((lab) => {
          const Icon = lab.icon;
          const isActive = activeLab === lab.id;

          return (
            <button
              key={lab.id}
              onClick={() => {
                setActiveLab(lab.id);
                soundEffects.playClick();
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-[#0b0e24] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                    {lab.grade}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight">{lab.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {lab.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className={isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                  {isActive ? '● Lab Sedang Aktif' : 'Buka Simulasi'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Simulation Sandbox */}
      <div>
        {activeLab === 'binary' && <BinaryConverter />}
        {activeLab === 'logic-gate' && <LogicGate3D />}
        {activeLab === 'stack-queue' && <StackQueueLab />}
        {activeLab === 'data-structure' && <DataStructureVisualizer />}
      </div>
    </div>
  );
};
