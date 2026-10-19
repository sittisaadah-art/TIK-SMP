import React, { useState } from 'react';
import { soundEffects } from '../../utils/audio';
import { 
  Layers, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp, 
  Trash2, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface DataPacket {
  id: string;
  label: string;
  color: string;
  timestamp: string;
}

const PRESET_PACKETS = [
  { label: 'Data_Alpha', color: 'from-cyan-500 to-blue-600' },
  { label: 'Token_Byte', color: 'from-purple-500 to-indigo-600' },
  { label: 'Matrix_Node', color: 'from-emerald-400 to-teal-600' },
  { label: 'Cyber_Key', color: 'from-amber-400 to-orange-600' },
  { label: 'Pixel_Vector', color: 'from-rose-500 to-pink-600' },
  { label: 'Quantum_Bit', color: 'from-violet-500 to-fuchsia-600' },
];

export const StackQueueLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'queue'>('stack');
  const [stackMode, setStackMode] = useState<'textbook-balls' | 'cyber'>('textbook-balls');

  // STACK STATE (max capacity 5)
  const MAX_STACK = 5;
  const [stackItems, setStackItems] = useState<DataPacket[]>([
    { id: '1', label: 'Bola 1', color: 'from-blue-600 to-blue-700', timestamp: '10:00:01' },
    { id: '2', label: 'Bola 2', color: 'from-amber-400 to-amber-500', timestamp: '10:00:05' },
    { id: '3', label: 'Bola 3', color: 'from-emerald-500 to-emerald-600', timestamp: '10:00:12' },
    { id: '4', label: 'Bola 4', color: 'from-rose-600 to-rose-700', timestamp: '10:00:18' },
  ]);
  const [stackPeekActive, setStackPeekActive] = useState<boolean>(false);
  const [stackInputLabel, setStackInputLabel] = useState<string>('');
  const [stackNotification, setStackNotification] = useState<string | null>(null);

  // QUEUE STATE (max capacity 5)
  const MAX_QUEUE = 5;
  const [queueItems, setQueueItems] = useState<DataPacket[]>([
    { id: 'q1', label: 'Doc_Print1', color: 'from-cyan-500 to-blue-600', timestamp: '10:01:00' },
    { id: 'q2', label: 'Doc_Print2', color: 'from-purple-500 to-indigo-600', timestamp: '10:01:08' },
  ]);
  const [queueFrontActive, setQueueFrontActive] = useState<boolean>(false);
  const [queueRearActive, setQueueRearActive] = useState<boolean>(false);
  const [queueInputLabel, setQueueInputLabel] = useState<string>('');
  const [queueNotification, setQueueNotification] = useState<string | null>(null);

  // Activity Log
  const [logs, setLogs] = useState<{ id: string; time: string; msg: string; type: 'stack' | 'queue' }[]>([
    { id: 'l1', time: '10:00:12', msg: 'Sistem diinisialisasi: Stack & Queue siap beroperasi.', type: 'stack' },
  ]);

  const addLog = (msg: string, type: 'stack' | 'queue') => {
    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    setLogs((prev) => [{ id: Math.random().toString(), time, msg, type }, ...prev.slice(0, 7)]);
  };

  // Quick preset: Load Bola 1 - 4 sesuai Buku Teks Hal. 62
  const loadTextbookBallsPreset = () => {
    setStackMode('textbook-balls');
    setStackItems([
      { id: '1', label: 'Bola 1', color: 'from-blue-600 to-blue-700', timestamp: '10:00:01' },
      { id: '2', label: 'Bola 2', color: 'from-amber-400 to-amber-500', timestamp: '10:00:05' },
      { id: '3', label: 'Bola 3', color: 'from-emerald-500 to-emerald-600', timestamp: '10:00:12' },
      { id: '4', label: 'Bola 4', color: 'from-rose-600 to-rose-700', timestamp: '10:00:18' },
    ]);
    setStackNotification('Berhasil memuat 4 bola (1-4) sesuai Gambar 2.16 Buku Paket Hal. 62.');
    addLog('STACK PRESET: Memuat Bola 1 (Biru), Bola 2 (Kuning), Bola 3 (Hijau), Bola 4 (Merah).', 'stack');
    soundEffects.playSuccess();
  };

  // --- STACK ACTIONS ---
  const handleStackPush = () => {
    if (stackItems.length >= MAX_STACK) {
      setStackNotification('Kapasitas Penuh (Stack Overflow)! Elemen tidak dapat dimasukkan lagi.');
      soundEffects.playPop();
      return;
    }

    let label = stackInputLabel.trim();
    let color = PRESET_PACKETS[stackItems.length % PRESET_PACKETS.length].color;

    if (stackMode === 'textbook-balls') {
      const nextNum = stackItems.length + 1;
      label = `Bola ${nextNum}`;
      if (nextNum === 1) color = 'from-blue-600 to-blue-700';
      else if (nextNum === 2) color = 'from-amber-400 to-amber-500';
      else if (nextNum === 3) color = 'from-emerald-500 to-emerald-600';
      else if (nextNum === 4) color = 'from-rose-600 to-rose-700';
      else color = 'from-purple-600 to-purple-700';
    } else {
      label = label || PRESET_PACKETS[stackItems.length % PRESET_PACKETS.length].label;
    }

    const newItem: DataPacket = {
      id: Math.random().toString(),
      label,
      color,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    };

    setStackItems((prev) => [...prev, newItem]);
    setStackInputLabel('');
    setStackNotification(`Push Berhasil: [${newItem.label}] ditambahkan ke posisi teratas stack (TOP)!`);
    addLog(`STACK PUSH: [${newItem.label}] masuk ke posisi TOP (Index ${stackItems.length}).`, 'stack');
    soundEffects.playPush();
  };

  const handleStackPop = () => {
    if (stackItems.length === 0) {
      setStackNotification('Stack Kosong (Stack Underflow)! Tidak ada elemen untuk diambil.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems((prev) => prev.slice(0, prev.length - 1));
    setStackPeekActive(false);
    setStackNotification(`Pop Berhasil: [${popped.label}] dihapus dari posisi teratas (TOP) dan nilainya dikembalikan!`);
    addLog(`STACK POP: [${popped.label}] keluar dari TOP (LIFO).`, 'stack');
    soundEffects.playPop();
  };

  const handleStackTop = () => {
    if (stackItems.length === 0) {
      setStackNotification('Stack Kosong! Tidak ada elemen di posisi teratas.');
      return;
    }
    const topItem = stackItems[stackItems.length - 1];
    setStackPeekActive(true);
    setStackNotification(`Operasi isEmpty/Top: Elemen teratas saat ini adalah [${topItem.label}] (dicek tanpa menghapusnya).`);
    addLog(`STACK TOP/PEEK: Menilik elemen puncak -> [${topItem.label}].`, 'stack');
    soundEffects.playClick();
    setTimeout(() => setStackPeekActive(false), 2500);
  };

  const handleStackIsEmptyCheck = () => {
    const empty = stackItems.length === 0;
    setStackNotification(
      `Operasi isEmpty: Status stack saat ini adalah ${
        empty ? 'TRUE (Kosong, 0 elemen)' : `FALSE (Berisi ${stackItems.length} elemen)`
      }.`
    );
    addLog(`STACK isEmpty: ${empty ? 'TRUE (Kosong)' : `FALSE (${stackItems.length} elemen)`}.`, 'stack');
    soundEffects.playClick();
  };

  const handleStackSizeCheck = () => {
    setStackNotification(
      `Operasi Size: Mengembalikan jumlah elemen dalam stack saat ini = ${stackItems.length} elemen.`
    );
    addLog(`STACK SIZE: Mengembalikan jumlah elemen = ${stackItems.length}.`, 'stack');
    soundEffects.playClick();
  };

  const handleStackClear = () => {
    setStackItems([]);
    setStackPeekActive(false);
    setStackNotification('Stack telah dikosongkan (Clear).');
    addLog('STACK CLEAR: Seluruh elemen stack dihapus.', 'stack');
    soundEffects.playClick();
  };

  // --- QUEUE ACTIONS ---
  const handleQueueEnqueue = () => {
    if (queueItems.length >= MAX_QUEUE) {
      setQueueNotification('Antrean Penuh (Queue isFull = True)! Tidak bisa enqueue.');
      soundEffects.playPop();
      return;
    }
    const label = queueInputLabel.trim() || `Paket_${queueItems.length + 1}`;
    const color = PRESET_PACKETS[queueItems.length % PRESET_PACKETS.length].color;
    const newItem: DataPacket = {
      id: Math.random().toString(),
      label,
      color,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    };

    setQueueItems((prev) => [...prev, newItem]);
    setQueueInputLabel('');
    setQueueNotification(`Enqueue Berhasil: [${newItem.label}] masuk di posisi REAR (belakang antrean).`);
    addLog(`QUEUE ENQUEUE: [${newItem.label}] masuk di REAR.`, 'queue');
    soundEffects.playPush();
  };

  const handleQueueDequeue = () => {
    if (queueItems.length === 0) {
      setQueueNotification('Antrean Kosong (Queue isEmpty = True)! Tidak ada elemen untuk dequeue.');
      return;
    }
    const dequeued = queueItems[0];
    setQueueItems((prev) => prev.slice(1));
    setQueueFrontActive(false);
    setQueueRearActive(false);
    setQueueNotification(`Dequeue Berhasil: [${dequeued.label}] dilayani dan keluar dari FRONT (FIFO)!`);
    addLog(`QUEUE DEQUEUE: [${dequeued.label}] keluar dari FRONT.`, 'queue');
    soundEffects.playPop();
  };

  const handleQueueFront = () => {
    if (queueItems.length === 0) {
      setQueueNotification('Queue Kosong! Tidak ada elemen di Front.');
      return;
    }
    setQueueFrontActive(true);
    setQueueRearActive(false);
    setQueueNotification(`Front Pointer: Elemen terdepan yang akan dilayani pertama kali adalah [${queueItems[0].label}].`);
    addLog(`QUEUE FRONT: Menilik elemen terdepan -> [${queueItems[0].label}].`, 'queue');
    soundEffects.playClick();
    setTimeout(() => setQueueFrontActive(false), 2000);
  };

  const handleQueueRear = () => {
    if (queueItems.length === 0) {
      setQueueNotification('Queue Kosong! Tidak ada elemen di Rear.');
      return;
    }
    setQueueRearActive(true);
    setQueueFrontActive(false);
    const lastItem = queueItems[queueItems.length - 1];
    setQueueNotification(`Rear Pointer: Elemen paling belakang yang baru masuk adalah [${lastItem.label}].`);
    addLog(`QUEUE REAR: Menilik elemen terbelakang -> [${lastItem.label}].`, 'queue');
    soundEffects.playClick();
    setTimeout(() => setQueueRearActive(false), 2000);
  };

  const handleQueueClear = () => {
    setQueueItems([]);
    setQueueFrontActive(false);
    setQueueRearActive(false);
    setQueueNotification('Queue telah dikosongkan.');
    addLog('QUEUE CLEAR: Seluruh antrean dikosongkan.', 'queue');
    soundEffects.playClick();
  };

  return (
    <div className="bg-[#0b0e24] border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>LAB STRUKTUR DATA ALGORITMA (AP)</span>
            <span aria-hidden="true">·</span>
            <span>INFORMATIKA SMP</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
            Simulasi Interaktif Stack (LIFO) & Queue (FIFO)
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Pelajari perbedaan mendasar tumpukan data LIFO dan antrean data FIFO lengkap dengan operasi push, pop, top, enqueue, dequeue, front, rear.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => { setActiveTab('stack'); soundEffects.playClick(); }}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeTab === 'stack'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Stack (Tumpukan / LIFO)
          </button>
          <button
            onClick={() => { setActiveTab('queue'); soundEffects.playClick(); }}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              activeTab === 'queue'
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Queue (Antrean / FIFO)
          </button>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Interactive Visual Chamber */}
        <div className="lg:col-span-7 bg-[#060814] border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[460px]">
          {activeTab === 'stack' ? (
            /* STACK CHAMBER */
            <div className="flex flex-col h-full justify-between">
              {/* Stack Status Bar & Theme Switch */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">KAPASITAS:</span>
                  <span className="text-white font-bold">{stackItems.length} / {MAX_STACK}</span>
                  <span className="text-slate-600">·</span>
                  <button
                    onClick={loadTextbookBallsPreset}
                    className="text-[11px] text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Reset ke Gambar 2.16 (Bola 1-4)
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded p-0.5">
                  <button
                    onClick={() => setStackMode('textbook-balls')}
                    className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                      stackMode === 'textbook-balls'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Buku Paket Hal. 62
                  </button>
                  <button
                    onClick={() => setStackMode('cyber')}
                    className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                      stackMode === 'cyber'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cyber Blocks
                  </button>
                </div>
              </div>

              {/* Vertical Stack Visual Tube */}
              <div className="my-auto py-4 flex flex-col items-center justify-center relative">
                {stackMode === 'textbook-balls' && (
                  <div className="text-xs font-mono text-slate-300 mb-3 text-center">
                    Bola dimasukkan kedalam tabung sesuai dengan urutan dari nomor 1 sampai dengan 4:
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">3</span>
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">4</span>
                      <span className="text-cyan-400 text-[11px]">➔ Masuk Tabung</span>
                    </div>
                  </div>
                )}

                {/* Cylinder Tube & Side Order Arrows Container */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-lg">
                  {/* The Transparent Cylindrical Tube */}
                  <div className="w-24 border-2 border-slate-600 border-t-0 rounded-b-2xl p-2 bg-slate-900/60 flex flex-col-reverse gap-2 min-h-[250px] justify-start shadow-inner">
                    {stackItems.length === 0 ? (
                      <div className="text-center py-16 text-slate-600 font-mono text-xs">
                        [Tabung Kosong - Lakukan PUSH untuk memasukkan elemen]
                      </div>
                    ) : (
                      stackItems.map((item, idx) => {
                        const isTop = idx === stackItems.length - 1;
                        const ballNumber = idx + 1;
                        let ballBg = 'bg-blue-600 text-white';
                        if (ballNumber === 2) ballBg = 'bg-amber-400 text-slate-950';
                        else if (ballNumber === 3) ballBg = 'bg-emerald-500 text-slate-950';
                        else if (ballNumber === 4) ballBg = 'bg-rose-600 text-white';
                        else if (ballNumber === 5) ballBg = 'bg-purple-600 text-white';

                        return (
                          <div
                            key={item.id}
                            className={`relative transition-all duration-300 flex items-center justify-center ${
                              stackMode === 'textbook-balls'
                                ? `w-20 h-12 rounded-full font-mono text-base font-bold shadow-md mx-auto ${ballBg} ${
                                    isTop && stackPeekActive ? 'ring-4 ring-cyan-300 scale-105' : ''
                                  }`
                                : `w-full p-2.5 rounded-lg bg-gradient-to-r ${item.color} text-white font-mono text-xs font-bold shadow-md ${
                                    isTop && stackPeekActive ? 'ring-4 ring-cyan-300 scale-105' : ''
                                  }`
                            }`}
                          >
                            <span>{stackMode === 'textbook-balls' ? ballNumber : item.label}</span>

                            {/* Top indicator tag */}
                            {isTop && (
                              <div className="absolute -top-3 right-0 flex items-center gap-0.5 text-[9px] bg-black/70 px-1.5 py-0.5 rounded border border-white/20 text-cyan-200">
                                <ArrowDown className="w-2.5 h-2.5" />
                                TOP
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Side Order Indicator Arrows (Matches Gambar 2.16) */}
                  <div className="flex flex-col-reverse justify-between h-[240px] py-1 text-[11px] font-mono">
                    {/* Bola 1 (Bottom) */}
                    <div className={`flex items-center gap-1.5 transition-opacity ${stackItems.length >= 1 ? 'text-blue-300' : 'text-slate-600'}`}>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Menjadi Urutan Keempat yang akan diambil/dikeluarkan</span>
                    </div>

                    {/* Bola 2 */}
                    <div className={`flex items-center gap-1.5 transition-opacity ${stackItems.length >= 2 ? 'text-amber-300' : 'text-slate-600'}`}>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Menjadi Urutan Ketiga yang akan diambil/dikeluarkan</span>
                    </div>

                    {/* Bola 3 */}
                    <div className={`flex items-center gap-1.5 transition-opacity ${stackItems.length >= 3 ? 'text-emerald-300' : 'text-slate-600'}`}>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Menjadi Urutan Kedua yang akan diambil/dikeluarkan</span>
                    </div>

                    {/* Bola 4 (Top) */}
                    <div className={`flex items-center gap-1.5 transition-opacity ${stackItems.length >= 4 ? 'text-rose-300' : 'text-slate-600'}`}>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="font-semibold">Menjadi Urutan Pertama yang akan diambil/dikeluarkan</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 mt-3 text-center">
                  Gambar 2.16 Ilustrasi Tumpukan LIFO (Last In First Out) - Buku Paket Hal. 62
                </div>
              </div>

              {/* Notification Banner */}
              {stackNotification && (
                <div className="p-2.5 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{stackNotification}</span>
                </div>
              )}
            </div>
          ) : (
            /* QUEUE CHAMBER */
            <div className="flex flex-col h-full justify-between">
              {/* Queue Status Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">KAPASITAS:</span>
                  <span className="text-white font-bold">{queueItems.length} / {MAX_QUEUE}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>isEmpty: <strong className={queueItems.length === 0 ? 'text-emerald-400' : 'text-slate-400'}>{queueItems.length === 0 ? 'TRUE' : 'FALSE'}</strong></span>
                  <span>·</span>
                  <span>isFull: <strong className={queueItems.length >= MAX_QUEUE ? 'text-rose-400' : 'text-slate-400'}>{queueItems.length >= MAX_QUEUE ? 'TRUE' : 'FALSE'}</strong></span>
                </div>
              </div>

              {/* Horizontal Conveyor Visual */}
              <div className="my-auto py-8">
                {/* Conveyor Labels */}
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-2 px-2">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <ArrowRight className="w-4 h-4" />
                    <span>FRONT (Keluar / Dequeue)</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <span>REAR (Masuk / Enqueue)</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Conveyor Tunnel */}
                <div className="border-y-2 border-dashed border-cyan-500/40 bg-slate-900/40 p-4 rounded-xl min-h-[110px] flex items-center justify-start gap-3 overflow-x-auto">
                  {queueItems.length === 0 ? (
                    <div className="w-full text-center text-slate-600 font-mono text-xs py-6">
                      [Antrean Kosong - Lakukan ENQUEUE untuk menambahkan paket]
                    </div>
                  ) : (
                    queueItems.map((item, idx) => {
                      const isFront = idx === 0;
                      const isRear = idx === queueItems.length - 1;
                      return (
                        <div
                          key={item.id}
                          className={`min-w-[130px] p-3 rounded-lg bg-gradient-to-r ${item.color} text-white font-mono text-xs font-bold shadow-md transition-all flex flex-col justify-between h-20 ${
                            isFront && queueFrontActive
                              ? 'ring-4 ring-emerald-300 scale-105'
                              : ''
                          } ${
                            isRear && queueRearActive
                              ? 'ring-4 ring-purple-300 scale-105'
                              : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded">
                              #{idx}
                            </span>
                            {isFront && (
                              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400">
                                FRONT
                              </span>
                            )}
                            {isRear && !isFront && (
                              <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-400">
                                REAR
                              </span>
                            )}
                          </div>
                          <div className="truncate">{item.label}</div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="text-center font-mono text-[11px] text-slate-500 mt-2">
                  Arah Aliran Data: Masuk dari Kanan (Rear), Dilayani dan Keluar dari Kiri (Front)
                </div>
              </div>

              {/* Notification Banner */}
              {queueNotification && (
                <div className="p-2.5 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{queueNotification}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Controller Deck & Concept Guide */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {activeTab === 'stack' ? (
            /* STACK CONTROLS SESUAI BUKU PAKET HAL. 62 */
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    5 OPERASI RESMI STACK (HAL. 62)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Informatika Kelas VIII</span>
                </div>

                {/* Input label for custom push */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={14}
                    value={stackInputLabel}
                    onChange={(e) => setStackInputLabel(e.target.value)}
                    placeholder={stackMode === 'textbook-balls' ? `Bola ${stackItems.length + 1} (Otomatis)` : 'Nama elemen baru'}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={handleStackPush}
                    disabled={stackItems.length >= MAX_STACK}
                    className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title="Push: Menambahkan elemen baru ke dalam stack pada posisi teratas"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    Push
                  </button>
                </div>

                {/* 5 Textbook operations buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Pop */}
                  <button
                    onClick={handleStackPop}
                    disabled={stackItems.length === 0}
                    className="p-2.5 bg-amber-950/60 hover:bg-amber-900/60 disabled:opacity-50 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Pop: Menghapus elemen teratas dari stack dan mengembalikan nilainya"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
                    Pop
                  </button>

                  {/* isEmpty / Top */}
                  <button
                    onClick={handleStackTop}
                    disabled={stackItems.length === 0}
                    className="p-2.5 bg-rose-950/60 hover:bg-rose-900/60 disabled:opacity-50 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="isEmpty/Top: Mengecek elemen teratas dari stack tanpa menghapusnya"
                  >
                    <Eye className="w-3.5 h-3.5 text-rose-400" />
                    isEmpty/Top
                  </button>

                  {/* isEmpty */}
                  <button
                    onClick={handleStackIsEmptyCheck}
                    className="p-2.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="isEmpty: Memeriksa apakah stack kosong atau tidak"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    isEmpty
                  </button>

                  {/* Size */}
                  <button
                    onClick={handleStackSizeCheck}
                    className="p-2.5 bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Size: Mengembalikan jumlah elemen dalam stack"
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    Size ({stackItems.length})
                  </button>
                </div>

                {/* Reset / Clear */}
                <div className="pt-1 flex items-center justify-between border-t border-slate-800 text-xs">
                  <button
                    onClick={handleStackClear}
                    disabled={stackItems.length === 0}
                    className="text-slate-400 hover:text-rose-400 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Kosongkan Stack
                  </button>

                  <span className="text-[11px] font-mono text-slate-500">
                    Status: {stackItems.length === 0 ? 'isEmpty = True' : `${stackItems.length} Elemen`}
                  </span>
                </div>
              </div>

              {/* LIFO Concept Card Sesuai Buku Halaman 62 */}
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  KONSEP STACK BUKU TEKS SMP KELAS VIII
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Konsep stack ini dalam kehidupan sehari-hari mirip dengan tumpukan buku. Yang mana apabila buku yang terakhir diletakkan di atas tumpukan, maka yang terakhir yang dapat diambil terlebih dahulu."
                </p>
                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 space-y-1">
                  <div>• <strong>Undo Aplikasi:</strong> Membatalkan aksi terakhir yang baru dilakukan.</div>
                  <div>• <strong>Memori Komputer:</strong> Menyimpan alamat memori eksekusi (Call Stack).</div>
                  <div>• <strong>Aritmetika:</strong> Perhitungan ekspresi matematika (notasi postfix).</div>
                  <div>• <strong>Navigasi Browser:</strong> Tombol Back kembali ke halaman terakhir dikunjungi.</div>
                </div>
              </div>
            </div>
          ) : (
            /* QUEUE CONTROLS */
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  KONTROL OPERASI QUEUE
                </span>

                {/* Input label */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={14}
                    value={queueInputLabel}
                    onChange={(e) => setQueueInputLabel(e.target.value)}
                    placeholder="Nama paket (opsional)"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={handleQueueEnqueue}
                    disabled={queueItems.length >= MAX_QUEUE}
                    className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    ENQUEUE
                  </button>
                </div>

                {/* Operational button grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleQueueDequeue}
                    disabled={queueItems.length === 0}
                    className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    DEQUEUE (Depan)
                  </button>

                  <button
                    onClick={handleQueueFront}
                    disabled={queueItems.length === 0}
                    className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    LIHAT FRONT
                  </button>

                  <button
                    onClick={handleQueueRear}
                    disabled={queueItems.length === 0}
                    className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    LIHAT REAR
                  </button>

                  <button
                    onClick={handleQueueClear}
                    disabled={queueItems.length === 0}
                    className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 border border-slate-700 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    CLEAR QUEUE
                  </button>
                </div>
              </div>

              {/* FIFO Concept Card */}
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  PRINSIP FIFO (FIRST IN, FIRST OUT)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Elemen yang <strong>pertama kali masuk</strong> akan menjadi elemen <strong>pertama yang dilayani dan keluar</strong>.
                </p>
                <div className="text-xs text-slate-400 border-t border-slate-800/80 pt-2 space-y-1">
                  <div>• <strong>Print Spooler:</strong> Tugas print yang dikirim duluan akan dicetak pertama.</div>
                  <div>• <strong>Video Buffer:</strong> Data frame video yang diunduh duluan akan diputar lebih awal.</div>
                </div>
              </div>
            </div>
          )}

          {/* Real-Time Algorithmic Execution Log */}
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 uppercase">Catatan Eksekusi Algoritma:</span>
              <span>{logs.length} entri</span>
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto text-[11px] font-mono">
              {logs.map((log) => (
                <div key={log.id} className="text-slate-400 flex items-start gap-2">
                  <span className="text-slate-600 shrink-0">[{log.time}]</span>
                  <span className="text-slate-300 truncate">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
