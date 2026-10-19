import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundEffects } from '../../utils/audio';
import { Sparkles, Eye, RotateCw, Lightbulb, Zap, HelpCircle } from 'lucide-react';

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

interface GateConfig {
  name: string;
  symbol: string;
  formula: string;
  color: string;
  description: string;
  inputsCount: 1 | 2;
  truthTable: { a: number; b?: number; out: number }[];
  calculate: (a: number, b: number) => number;
}

const GATES_CONFIG: Record<GateType, GateConfig> = {
  AND: {
    name: 'Gerbang AND (Konjungsi)',
    symbol: 'AND',
    formula: 'Y = A · B',
    color: '#06b6d4', // Cyan
    description: 'Output HANYA 1 jika SEMUA input (A dan B) bernilai 1. Ibarat dua saklar seri.',
    inputsCount: 2,
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 1 },
    ],
    calculate: (a, b) => (a === 1 && b === 1 ? 1 : 0),
  },
  OR: {
    name: 'Gerbang OR (Disjungsi)',
    symbol: 'OR',
    formula: 'Y = A + B',
    color: '#a855f7', // Purple
    description: 'Output bernilai 1 jika SALAH SATU atau KEDUA input bernilai 1. Ibarat dua saklar paralel.',
    inputsCount: 2,
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 1 },
    ],
    calculate: (a, b) => (a === 1 || b === 1 ? 1 : 0),
  },
  NOT: {
    name: 'Gerbang NOT (Inverter Pembalik)',
    symbol: 'NOT',
    formula: 'Y = ¬A (A̅)',
    color: '#f43f5e', // Rose
    description: 'Membalik nilai logika input. 1 menjadi 0, dan 0 menjadi 1.',
    inputsCount: 1,
    truthTable: [
      { a: 0, out: 1 },
      { a: 1, out: 0 },
    ],
    calculate: (a) => (a === 1 ? 0 : 1),
  },
  XOR: {
    name: 'Gerbang XOR (Exclusive OR)',
    symbol: 'XOR',
    formula: 'Y = A ⊕ B',
    color: '#eab308', // Amber
    description: 'Output bernilai 1 jika nilai input BERBEDA satu sama lain (A ≠ B). Kunci kalkulasi penjumlahan biner!',
    inputsCount: 2,
    truthTable: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 },
    ],
    calculate: (a, b) => (a !== b ? 1 : 0),
  },
  NAND: {
    name: 'Gerbang NAND (NOT AND)',
    symbol: 'NAND',
    formula: 'Y = ¬(A · B)',
    color: '#10b981', // Emerald
    description: 'Kebalikan dari gerbang AND. Output bernilai 0 HANYA JIKA kedua input bernilai 1.',
    inputsCount: 2,
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 },
    ],
    calculate: (a, b) => (a === 1 && b === 1 ? 0 : 1),
  },
  NOR: {
    name: 'Gerbang NOR (NOT OR)',
    symbol: 'NOR',
    formula: 'Y = ¬(A + B)',
    color: '#3b82f6', // Blue
    description: 'Kebalikan dari gerbang OR. Output bernilai 1 HANYA JIKA kedua input bernilai 0.',
    inputsCount: 2,
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 0 },
    ],
    calculate: (a, b) => (a === 0 && b === 0 ? 1 : 0),
  },
  XNOR: {
    name: 'Gerbang XNOR (Exclusive NOR)',
    symbol: 'XNOR',
    formula: 'Y = ¬(A ⊕ B)',
    color: '#ec4899', // Pink
    description: 'Output bernilai 1 jika kedua input bernilai SAMA (keduanya 0 atau keduanya 1). Penguji kesamaan logika.',
    inputsCount: 2,
    truthTable: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 1 },
    ],
    calculate: (a, b) => (a === b ? 1 : 0),
  },
};

export const LogicGate3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGate, setActiveGate] = useState<GateType>('AND');
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showHalfAdder, setShowHalfAdder] = useState<boolean>(false);

  // Calculate current output
  const config = GATES_CONFIG[activeGate];
  const output = config.calculate(inputA, inputB);

  // Half-adder outputs
  const halfAdderSum = inputA !== inputB ? 1 : 0; // XOR
  const halfAdderCarry = inputA === 1 && inputB === 1 ? 1 : 0; // AND

  // Three.js scene setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060814);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Grid board
    const gridHelper = new THREE.GridHelper(10, 20, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Ambient & directional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Group for the 3D circuit
    const circuitGroup = new THREE.Group();
    scene.add(circuitGroup);

    // Central Chip Gate (Box with beveled look)
    const gateGeo = new THREE.BoxGeometry(2.4, 0.6, 2.4);
    const gateMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.2,
      emissive: new THREE.Color(config.color),
      emissiveIntensity: 0.25,
    });
    const gateMesh = new THREE.Mesh(gateGeo, gateMat);
    gateMesh.position.set(0, 0.3, 0);
    circuitGroup.add(gateMesh);

    // Neon emblem on top of the gate
    const ringGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.color),
      emissive: new THREE.Color(config.color),
      emissiveIntensity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 0.62, 0);
    circuitGroup.add(ringMesh);

    // Input line A (Left wire)
    const wireAGeo = new THREE.CylinderGeometry(0.06, 0.06, 3, 16);
    const wireAMat = new THREE.MeshStandardMaterial({
      color: inputA ? 0x06b6d4 : 0x334155,
      emissive: inputA ? 0x06b6d4 : 0x000000,
      emissiveIntensity: inputA ? 1.5 : 0,
    });
    const wireA = new THREE.Mesh(wireAGeo, wireAMat);
    wireA.rotation.z = Math.PI / 2;
    wireA.position.set(-2.5, 0.3, -0.6);
    circuitGroup.add(wireA);

    // Input node A switch indicator
    const switchAGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const switchAMat = new THREE.MeshStandardMaterial({
      color: inputA ? 0x00f0ff : 0x1e293b,
      emissive: inputA ? 0x00f0ff : 0x000000,
      emissiveIntensity: inputA ? 2.0 : 0,
    });
    const switchA = new THREE.Mesh(switchAGeo, switchAMat);
    switchA.position.set(-4, 0.3, -0.6);
    circuitGroup.add(switchA);

    // Input line B (only if 2 inputs)
    let wireB: THREE.Mesh | null = null;
    let switchB: THREE.Mesh | null = null;
    if (config.inputsCount === 2) {
      const wireBGeo = new THREE.CylinderGeometry(0.06, 0.06, 3, 16);
      const wireBMat = new THREE.MeshStandardMaterial({
        color: inputB ? 0xa855f7 : 0x334155,
        emissive: inputB ? 0xa855f7 : 0x000000,
        emissiveIntensity: inputB ? 1.5 : 0,
      });
      wireB = new THREE.Mesh(wireBGeo, wireBMat);
      wireB.rotation.z = Math.PI / 2;
      wireB.position.set(-2.5, 0.3, 0.6);
      circuitGroup.add(wireB);

      const switchBGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const switchBMat = new THREE.MeshStandardMaterial({
        color: inputB ? 0xa855f7 : 0x1e293b,
        emissive: inputB ? 0xa855f7 : 0x000000,
        emissiveIntensity: inputB ? 2.0 : 0,
      });
      switchB = new THREE.Mesh(switchBGeo, switchBMat);
      switchB.position.set(-4, 0.3, 0.6);
      circuitGroup.add(switchB);
    }

    // Output Wire (Right wire)
    const outWireGeo = new THREE.CylinderGeometry(0.07, 0.07, 3, 16);
    const outWireMat = new THREE.MeshStandardMaterial({
      color: output ? 0x39ff14 : 0x334155,
      emissive: output ? 0x39ff14 : 0x000000,
      emissiveIntensity: output ? 1.8 : 0,
    });
    const outWire = new THREE.Mesh(outWireGeo, outWireMat);
    outWire.rotation.z = Math.PI / 2;
    outWire.position.set(2.5, 0.3, 0);
    circuitGroup.add(outWire);

    // Output Crystal / Bulb
    const bulbGeo = new THREE.OctahedronGeometry(0.45, 0);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: output ? 0x39ff14 : 0x1e293b,
      emissive: output ? 0x39ff14 : 0x000000,
      emissiveIntensity: output ? 2.5 : 0,
      metalness: 0.5,
      roughness: 0.1,
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(4, 0.45, 0);
    circuitGroup.add(bulb);

    // Interactive mouse rotation drag
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      circuitGroup.rotation.y += deltaX * 0.01;
      circuitGroup.rotation.x = Math.max(-0.4, Math.min(0.4, circuitGroup.rotation.x + deltaY * 0.01));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging) {
        circuitGroup.rotation.y += 0.004;
      }

      // Bulb float effect
      if (bulb) {
        bulb.rotation.y += 0.02;
        bulb.position.y = 0.45 + Math.sin(elapsedTime * 3) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, [activeGate, inputA, inputB, autoRotate, output]);

  return (
    <div className="bg-[#0b0e24] border border-purple-500/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <span>LAB 3D SISTEM KOMPUTER & LOGIKA</span>
            <span aria-hidden="true">·</span>
            <span>MATA PELAJARAN INFORMATIKA</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Simulasi 3D Gerbang Logika & Truth Table
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Putar sirkuit 3D, ubah sinyal saklar digital A dan B, dan amati pembentukan output biner seketika.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { setShowHalfAdder(!showHalfAdder); soundEffects.playClick(); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              showHalfAdder
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {showHalfAdder ? 'Mode Gerbang Tunggal' : 'Eksplorasi Half Adder (XOR + AND)'}
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-lg border transition-colors ${
              autoRotate
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle rotasi otomatis 3D"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Gate Selector Bar */}
      {!showHalfAdder && (
        <div className="flex flex-wrap items-center gap-2 mt-5">
          {(Object.keys(GATES_CONFIG) as GateType[]).map((gate) => {
            const isActive = activeGate === gate;
            return (
              <button
                key={gate}
                onClick={() => {
                  setActiveGate(gate);
                  soundEffects.playClick();
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-1 ring-purple-400'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {gate}
              </button>
            );
          })}
        </div>
      )}

      {/* Main 3D Canvas & Control Deck Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: 3D Canvas Stage */}
        <div className="lg:col-span-7 bg-[#060814] border border-slate-800 rounded-xl overflow-hidden relative flex flex-col justify-between">
          {/* Canvas viewport */}
          <div ref={mountRef} className="w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing relative" />

          {/* Interactive Overlay Switch Bar */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Input A Switch */}
              <button
                onClick={() => {
                  setInputA(inputA === 1 ? 0 : 1);
                  soundEffects.playToggle(inputA === 0);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                  inputA === 1
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-400/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Input A: {inputA}
              </button>

              {/* Input B Switch (if 2 inputs) */}
              {config.inputsCount === 2 && (
                <button
                  onClick={() => {
                    setInputB(inputB === 1 ? 0 : 1);
                    soundEffects.playToggle(inputB === 0);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                    inputB === 1
                      ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-400/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Input B: {inputB}
                </button>
              )}
            </div>

            {/* Output Indicator Badge */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">OUTPUT Y:</span>
              <div
                className={`px-3 py-1 rounded font-extrabold flex items-center gap-1.5 transition-all ${
                  output === 1
                    ? 'bg-lime-500 text-black shadow-lg shadow-lime-400/40 ring-2 ring-lime-400'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {output} {output === 1 ? '(MENYALA / HIGH)' : '(PADAM / LOW)'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Concept Deck & Truth Table */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {!showHalfAdder ? (
            <>
              {/* Gate Info Card */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400">DETAIL ARSITEKTUR</span>
                  <span className="text-xs font-mono text-slate-400">{config.formula}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{config.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {config.description}
                </p>
              </div>

              {/* Truth Table */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                    Tabel Kebenaran (Truth Table)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Baris Aktif Disorot</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-center font-mono text-xs">
                    <thead className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                      <tr>
                        <th className="py-2 px-3 text-cyan-400">Input A</th>
                        {config.inputsCount === 2 && <th className="py-2 px-3 text-purple-400">Input B</th>}
                        <th className="py-2 px-3 text-lime-400">Output Y</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {config.truthTable.map((row, idx) => {
                        const isCurrentActive =
                          row.a === inputA && (config.inputsCount === 1 || row.b === inputB);
                        return (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              isCurrentActive
                                ? 'bg-cyan-950/60 font-bold border-l-2 border-cyan-400 text-white'
                                : 'text-slate-400 hover:bg-slate-800/30'
                            }`}
                          >
                            <td className="py-2 px-3">{row.a}</td>
                            {config.inputsCount === 2 && <td className="py-2 px-3">{row.b}</td>}
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded ${
                                  row.out === 1
                                    ? 'bg-lime-950 text-lime-300 border border-lime-500/40'
                                    : 'bg-slate-800 text-slate-500'
                                }`}
                              >
                                {row.out}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Half Adder Explainer Card */
            <div className="p-4 bg-slate-900/80 border border-purple-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
                KOMBINASI: PENJUMLAH BINER (HALF ADDER)
              </div>
              <h3 className="text-base font-bold text-white">
                Bagaimana Komputer Melakukan Penjumlahan Biner?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Di dalam prosesor (ALU), dua bit dijumlahkan menggunakan kombinasi 2 gerbang logika:
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-amber-400">XOR Gate:</strong> Menghasilkan bit <strong>SUM (Hasil Jumlah)</strong>. 1 + 1 = 0 (dengan simpanan 1).
                </li>
                <li>
                  <strong className="text-cyan-400">AND Gate:</strong> Menghasilkan bit <strong>CARRY (Simpanan)</strong>. 1 + 1 menghasilkan Carry 1!
                </li>
              </ul>

              {/* Live Half Adder Calculator */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs space-y-1.5">
                <div className="text-slate-400">
                  Input: A = <span className="text-cyan-400 font-bold">{inputA}</span>, B = <span className="text-purple-400 font-bold">{inputB}</span>
                </div>
                <div className="text-white">
                  {inputA} + {inputB} = <span className="text-lime-300 font-bold">{inputA + inputB}</span> (Desimal)
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Carry (AND): </span>
                    <span className="text-cyan-300 font-bold">{halfAdderCarry}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Sum (XOR): </span>
                    <span className="text-amber-300 font-bold">{halfAdderSum}</span>
                  </div>
                  <div className="text-lime-400 font-bold">
                    Biner: {halfAdderCarry}{halfAdderSum}₂
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Real World Application note */}
          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg text-xs text-slate-400 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">Konteks Nyata:</strong> Setiap smartphone masa kini memuat lebih dari 15 Miliar transistor gerbang logika yang bekerja miliaran kali per detik untuk memproses game 3D dan video TikTok!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
