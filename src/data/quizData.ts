import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- KELAS VII ---
  {
    id: 'q-k7-1',
    grade: 'kelas-7',
    topicId: 'k7-bk-1',
    strand: 'BK',
    question: 'Di antara 4 pilar Berpikir Komputasional, pilar yang bertugas memecah masalah besar menjadi bagian-bagian yang lebih kecil dan mudah diselesaikan disebut...',
    options: ['Dekomposisi', 'Abstraksi', 'Pengenalan Pola', 'Algoritma'],
    correctIndex: 0,
    explanation: 'Pembahasan: Dekomposisi (Decomposition) adalah teknik memecah masalah yang kompleks atau sistem besar menjadi bagian-bagian yang lebih kecil dan terkelola secara bertahap. Sedangkan Abstraksi menyaring detail tak penting, Pengenalan Pola mencari kesamaan, dan Algoritma menyusun langkah solusi.',
    difficulty: 'Dasar'
  },
  {
    id: 'q-k7-2',
    grade: 'kelas-7',
    topicId: 'k7-sk-1',
    strand: 'SK',
    question: 'Manakah di bawah ini yang merupakan perangkat keras komputer yang bersifat Volatile (data sementara hilang saat daya listrik mati)?',
    options: ['Solid State Drive (SSD)', 'Random Access Memory (RAM)', 'Hard Disk Drive (HDD)', 'Flashdisk USB'],
    correctIndex: 1,
    explanation: 'Pembahasan: RAM (Random Access Memory) adalah memori utama yang bersifat "volatile", artinya data yang tersimpan hanya bertahan selama perangkat dialiri daya listrik. Sebaliknya, SSD, HDD, dan Flashdisk bersifat "non-volatile" (permanen).',
    difficulty: 'Dasar'
  },
  {
    id: 'q-k7-3',
    grade: 'kelas-7',
    topicId: 'k7-ap-1',
    strand: 'AP',
    question: 'Dalam pemrograman Scratch/Blockly, jika kita ingin membuat karakter kucing melompat sebanyak 10 kali secara otomatis tanpa menulis blok 10 kali, struktur logika apa yang paling efisien digunakan?',
    options: ['Percabangan If-Else', 'Perulangan (Loop / Repeat)', 'Variabel Global', 'Blok Sensor'],
    correctIndex: 1,
    explanation: 'Pembahasan: Perulangan (Looping / Repeat) dirancang khusus untuk mengeksekusi sekumpulan instruksi secara berulang sesuai jumlah iterasi yang ditentukan, menjaga kode tetap ringkas dan efisien.',
    difficulty: 'Menengah'
  },
  {
    id: 'q-k7-4',
    grade: 'kelas-7',
    topicId: 'k7-jki-1',
    strand: 'JKI',
    question: 'Ketika kamu menyambungkan laptop ke internet menggunakan koneksi data internet dari smartphone pribadi, metode koneksi tersebut dinamakan...',
    options: ['Tethering / Mobile Hotspot', 'Fiber Optic LAN', 'Dial-Up Modem', 'Peer-to-Peer Bluetooth Mesh'],
    correctIndex: 0,
    explanation: 'Pembahasan: Tethering atau Mobile Hotspot adalah fitur pada smartphone untuk membagikan koneksi paket data seluler ke perangkat lain di sekitarnya via Wi-Fi nirkabel.',
    difficulty: 'Dasar'
  },

  // --- KELAS VIII ---
  {
    id: 'q-k8-1',
    grade: 'kelas-8',
    topicId: 'k8-bk-1',
    strand: 'BK',
    question: 'Berapakah nilai desimal dari bilangan biner 8-bit berikut: 00010110 ?',
    options: ['18', '22', '26', '30'],
    correctIndex: 1,
    explanation: 'Pembahasan Langkah Demi Langkah:\nDeretan bit: 00010110\nBobot posisi:\nBit-4 (nilai 16): 1 x 16 = 16\nBit-2 (nilai 4): 1 x 4 = 4\nBit-1 (nilai 2): 1 x 2 = 2\nJumlahkan: 16 + 4 + 2 = 22. Jadi bilangan biner 00010110 setara dengan desimal 22!',
    difficulty: 'Menengah'
  },
  {
    id: 'q-k8-2',
    grade: 'kelas-8',
    topicId: 'k8-sk-1',
    strand: 'SK',
    question: 'Gerbang logika yang HANYA menghasilkan output logika 1 jika kedua inputnya bernilai 1 adalah gerbang...',
    options: ['OR', 'AND', 'XOR', 'NOT'],
    correctIndex: 1,
    explanation: 'Pembahasan: Gerbang AND (Konjungsi Logika) memerlukan SEMUA input bernilai 1 (True) agar output bernilai 1. Jika salah satu atau kedua input 0, maka output gerbang AND adalah 0. Sedangkan gerbang OR menghasilkan 1 jika salah satu saja input 1.',
    difficulty: 'Dasar'
  },
  {
    id: 'q-k8-3',
    grade: 'kelas-8',
    topicId: 'k8-sk-1',
    strand: 'SK',
    question: 'Diberikan input A = 1 dan B = 0 pada gerbang XOR (Exclusive OR). Berapakah output logika yang dihasilkan?',
    options: ['0', '1', 'Tidak terdefinisi', 'High-Z (Floating)'],
    correctIndex: 1,
    explanation: 'Pembahasan: Prinsip gerbang XOR adalah "Eksklusif Berbeda". Output akan bernilai 1 jika kedua input memiliki nilai yang BERBEDA (A=1, B=0 atau A=0, B=1). Jika kedua input bernilai sama (1 & 1, atau 0 & 0), maka outputnya adalah 0. Karena A=1 dan B=0 berbeda, outputnya adalah 1.',
    difficulty: 'Menengah'
  },
  {
    id: 'q-k8-4',
    grade: 'kelas-8',
    topicId: 'k8-ap-1',
    strand: 'AP',
    question: 'Perhatikan urutan operasi Stack berikut: Push("Data_A"), Push("Data_B"), Push("Data_C"), Pop(). Elemen apakah yang sekarang berada di posisi paling atas (TOP) dari Stack?',
    options: ['Data_A', 'Data_B', 'Data_C', 'Stack kosong'],
    correctIndex: 1,
    explanation: 'Pembahasan Alur Eksekusi:\n1. Push("Data_A") -> Stack: [Data_A]\n2. Push("Data_B") -> Stack: [Data_A, Data_B]\n3. Push("Data_C") -> Stack: [Data_A, Data_B, Data_C]\n4. Operasi Pop() mengeluarkan elemen teratas yang terakhir masuk (LIFO), yaitu "Data_C".\nSekarang elemen teratas (TOP) adalah "Data_B"!',
    difficulty: 'Menengah'
  },
  {
    id: 'q-k8-5',
    grade: 'kelas-8',
    topicId: 'k8-ap-1',
    strand: 'AP',
    question: 'Manakah contoh penerapan nyata struktur data Queue (Antrean - FIFO: First In First Out) di dunia komputasi sehari-hari?',
    options: [
      'Fitur Undo (Ctrl+Z) pada aplikasi pengolah kata',
      'Tombol Back pada web browser',
      'Antrean dokumen cetak pada printer (Print Spooler)',
      'Tumpukan kartu remi di meja permainan'
    ],
    correctIndex: 2,
    explanation: 'Pembahasan: Antrean cetak printer (Print Spooler) bekerja dengan sistem FIFO: dokumen yang dikirim paling awal oleh pengguna akan dicetak pertama kali. Sedangkan tombol Undo dan Back browser menggunakan Stack (LIFO: tindakan terakhir yang dibatalkan pertama kali).',
    difficulty: 'Dasar'
  },
  {
    id: 'q-k8-6',
    grade: 'kelas-8',
    topicId: 'k8-jki-1',
    strand: 'JKI',
    question: 'Dalam topologi jaringan, topologi yang menghubungkan semua komputer ke satu perangkat pusat konsentrator seperti Switch atau Hub disebut topologi...',
    options: ['Bus', 'Ring', 'Star (Bintang)', 'Mesh'],
    correctIndex: 2,
    explanation: 'Pembahasan: Topologi Star (Bintang) menempatkan switch/hub di titik sentral di mana seluruh kabel node workstation bermuara. Keunggulannya: jika satu kabel komputer putus, komputer lainnya tetap terhubung normal.',
    difficulty: 'Dasar'
  },

  // --- KELAS IX ---
  {
    id: 'q-k9-1',
    grade: 'kelas-9',
    topicId: 'k9-bk-1',
    strand: 'BK',
    question: 'Pada struktur data Pohon (Tree), simpul paling atas yang tidak memiliki induk (parent) disebut...',
    options: ['Leaf Node (Daun)', 'Root Node (Akar)', 'Edge (Sisi)', 'Subtree'],
    correctIndex: 1,
    explanation: 'Pembahasan: Simpul puncak yang menjadi asal-mula seluruh percabangan pohon tanpa memiliki induk disebut "Root Node" (Akar). Sebaliknya, node di ujung cabang yang tidak memiliki anak disebut Leaf (Daun).',
    difficulty: 'Dasar'
  },
  {
    id: 'q-k9-2',
    grade: 'kelas-9',
    topicId: 'k9-sk-1',
    strand: 'SK',
    question: 'Pada perangkat Internet of Things (IoT) seperti dispenser otomatis pendeteksi tangan, komponen yang berfungsi mendeteksi jarak tangan pengguna adalah...',
    options: ['Aktuator', 'Sensor Ultrasonik/Inframerah', 'Mikrofon Analog', 'Heatsink'],
    correctIndex: 1,
    explanation: 'Pembahasan: Sensor Ultrasonik atau Inframerah bertugas membaca besaran fisik jarak objek di depan dispenser lalu mengirimkan data digital ke mikrokontroler. Setelah itu mikrokontroler menyalakan pompa motor (aktuator).',
    difficulty: 'Menengah'
  },
  {
    id: 'q-k9-3',
    grade: 'kelas-9',
    topicId: 'k9-ap-1',
    strand: 'AP',
    question: 'Perhatikan potongan kode Python berikut:\n\ndef kali_dua(angka):\n    return angka * 2\n\nhasil = kali_dua(7) + 5\n\nBerapakah nilai variabel hasil akhir?',
    options: ['12', '14', '19', '24'],
    correctIndex: 2,
    explanation: 'Pembahasan: Fungsi kali_dua menerima parameter 7, lalu menghitung 7 * 2 = 14. Nilai 14 kemudian ditambahkan dengan 5: 14 + 5 = 19!',
    difficulty: 'Tantangan'
  },
  {
    id: 'q-k9-4',
    grade: 'kelas-9',
    topicId: 'k9-dsi-1',
    strand: 'DSI',
    question: 'Tindakan kejahatan siber di mana pelaku mengirim email palsu menyerupai bank resmi untuk mencuri password atau data kartu kredit disebut...',
    options: ['Data Mining', 'Phishing', 'Open Source Licensing', 'Cryptocurrency Staking'],
    correctIndex: 1,
    explanation: 'Pembahasan: Phishing adalah metode penipuan digital (social engineering) di mana penyerang menyamar sebagai pihak terpercaya agar korban terpancing memberikan kredensial rahasia secara sukarela.',
    difficulty: 'Dasar'
  }
];

export const MOCK_STUDENT_ROSTER = [
  {
    id: 'std-1',
    studentName: 'Aura Zahra',
    grade: 'kelas-8' as const,
    classGroup: '8-Cyber A',
    completedLessonsCount: 6,
    totalLessons: 8,
    averageScore: 92,
    lastActive: '10 menit yang lalu',
    status: 'Unggul' as const,
    strugglingTopics: ['Gerbang XOR']
  },
  {
    id: 'std-2',
    studentName: 'Bima Satria',
    grade: 'kelas-8' as const,
    classGroup: '8-Cyber A',
    completedLessonsCount: 5,
    totalLessons: 8,
    averageScore: 84,
    lastActive: '1 jam yang lalu',
    status: 'Aktif Belajar' as const,
    strugglingTopics: ['Konversi Biner ke Hex']
  },
  {
    id: 'std-3',
    studentName: 'Clarissa Putri',
    grade: 'kelas-8' as const,
    classGroup: '8-Cyber B',
    completedLessonsCount: 7,
    totalLessons: 8,
    averageScore: 96,
    lastActive: 'Kemarin',
    status: 'Unggul' as const,
    strugglingTopics: []
  },
  {
    id: 'std-4',
    studentName: 'Dafiq Pratama',
    grade: 'kelas-8' as const,
    classGroup: '8-Cyber B',
    completedLessonsCount: 3,
    totalLessons: 8,
    averageScore: 72,
    lastActive: '3 hari yang lalu',
    status: 'Perlu Pendampingan' as const,
    strugglingTopics: ['Stack & Queue FIFO/LIFO', 'Gerbang Logika']
  },
  {
    id: 'std-5',
    studentName: 'Elsa Nathania',
    grade: 'kelas-7' as const,
    classGroup: '7-Alpha',
    completedLessonsCount: 5,
    totalLessons: 6,
    averageScore: 90,
    lastActive: '2 jam yang lalu',
    status: 'Unggul' as const,
    strugglingTopics: []
  },
  {
    id: 'std-6',
    studentName: 'Farhan Maulana',
    grade: 'kelas-9' as const,
    classGroup: '9-Quantum',
    completedLessonsCount: 6,
    totalLessons: 7,
    averageScore: 88,
    lastActive: '30 menit yang lalu',
    status: 'Aktif Belajar' as const,
    strugglingTopics: ['Pohon Biner']
  }
];
