import { LessonTopic, StrandType } from '../types';

export const CURRICULUM_DATA: LessonTopic[] = [
  // --- KELAS VII ---
  {
    id: 'k7-bk-1',
    grade: 'kelas-7',
    strand: 'BK',
    title: 'Pengantar Berpikir Komputasional & Dekomposisi',
    estimatedMinutes: 20,
    summary: 'Mengenal 4 pilar Computational Thinking: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma.',
    keyConcepts: [
      'Dekomposisi: Memecah masalah rumit menjadi bagian-bagian kecil yang lebih mudah dikelola.',
      'Pengenalan Pola: Menemukan kesamaan atau keteraturan pada permasalahan serupa.',
      'Abstraksi: Memilah informasi esensial dan mengabaikan detail yang tidak relevan.',
      'Algoritma: Menyusun langkah-langkah logis dan terurut untuk menyelesaikan masalah.'
    ],
    contentMarkdown: [
      'Berpikir Komputasional (BK) bukan berarti kamu harus berpikir seperti robot, melainkan cara memecahkan masalah kompleks secara sistematis agar dapat diselesaikan oleh manusia atau komputer.',
      'Contoh nyata: Saat merencanakan proyek festival sekolah, kamu tidak langsung mengerjakan semuanya sekaligus. Kamu memecah (dekomposisi) tugas menjadi: divisi panggung, konsumsi, tiket, dan publikasi media sosial.',
      'Dengan abstraksi, panitia tiket tidak perlu memusingkan resep makanan konsumsi; mereka hanya fokus pada alur pendaftaran pengunjung!'
    ],
    realWorldAnalogy: 'Sama seperti menyusun playlist Spotify berdasarkan vibe atau genre musik, kamu mengenali pola lagu yang cocok untuk suasana santai belajar.'
  },
  {
    id: 'k7-sk-1',
    grade: 'kelas-7',
    strand: 'SK',
    title: 'Perangkat Keras & Arsitektur Komputer Dasar',
    estimatedMinutes: 25,
    summary: 'Memahami 4 komponen utama perangkat keras: Perangkat Masukan (Input), Pemroses (CPU), Penyimpan (Storage/RAM), dan Keluaran (Output).',
    keyConcepts: [
      'Input Device: Keyboard, Mouse, Touchscreen, Mikrofon, Scanner.',
      'Processing Unit (CPU): Otak komputer yang menjalankan instruksi aritmetika & logika (ALU & CU).',
      'Storage: RAM (memori sementara/volatile) vs SSD/HDD (memori permanen/non-volatile).',
      'Output Device: Monitor, Speaker, Printer, Proyektor.'
    ],
    contentMarkdown: [
      'Semua sistem komputer di dunia, mulai dari smartwatch hingga superkomputer tercanggih, bekerja dengan siklus: Input -> Process -> Output -> Storage (IPOS).',
      'RAM bertindak seperti meja kerja tempat kamu meletakkan buku yang sedang kamu baca saat ini. Sedangkan SSD adalah lemari perpustakaan tempat menyimpan buku selamanya walau lampu padam.'
    ],
    realWorldAnalogy: 'Koki restoran membaca pesanan (Input), memasak di wajan (Process), menaruh bahan di meja racik (RAM), menyajikan makanan lezat ke pelanggan (Output).'
  },
  {
    id: 'k7-tik-1',
    grade: 'kelas-7',
    strand: 'TIK',
    title: 'Manajemen Berkas & Cloud Storage Modern',
    estimatedMinutes: 15,
    summary: 'Menerapkan struktur folder berjenjang, ekstensi file (.docx, .pdf, .jpg, .py), serta kolaborasi cloud computing.',
    keyConcepts: [
      'Struktur Folder Hierarkis (Root, Parent Folder, Subfolder).',
      'Ekstensi Berkas: Penanda format data agar sistem operasi mengenali aplikasi yang tepat.',
      'Cloud Storage: Penyimpanan data di server jarak jauh yang dapat diakses kapan pun via internet.'
    ],
    contentMarkdown: [
      'File tanpa pengorganisasian yang rapi bagaikan kamar berantakan. Dengan menata folder per mata pelajaran dan tahun ajaran, proses pencarian data menjadi instan dan produktif.',
      'Penggunaan penyimpanan awan (Cloud Storage) mempermudah pengerjaan tugas kelompok secara real-time tanpa takut file hilang saat laptop rusak.'
    ],
    realWorldAnalogy: 'Laci loker sekolah dengan sekat label warna untuk buku tugas, formulir, dan catatan ujian.'
  },
  {
    id: 'k7-jki-1',
    grade: 'kelas-7',
    strand: 'JKI',
    title: 'Koneksi Internet, Wi-Fi, dan Tethering',
    estimatedMinutes: 20,
    summary: 'Mekanisme transmisi data nirkabel, gelombang radio Wi-Fi, tethering hotspot ponsel, dan enkripsi keamanan.',
    keyConcepts: [
      'Wi-Fi (Wireless Fidelity): Standar komunikasi nirkabel berbasis frekuensi gelombang radio 2.4 GHz dan 5 GHz.',
      'Tethering & Mobile Hotspot: Berbagi koneksi data seluler smartphone ke perangkat lain (laptop/tablet).',
      'Enkripsi WPA2/WPA3: Penguncian sandi data agar tidak disadap oleh pihak luar di jaringan publik.'
    ],
    contentMarkdown: [
      'Ketika kamu terhubung ke Wi-Fi sekolah, data video dan chat diubah menjadi gelombang radio oleh antena router, lalu diteruskan ke kabel fiber optik bawah laut.',
      'Tips Aman: Hindari login akun perbankan atau email penting di jaringan Wi-Fi umum terbuka tanpa enkripsi sandi!'
    ],
    realWorldAnalogy: 'Seperti radio walkie-talkie berkecepatan miliaran gelombang per detik yang mengirim pesan rahasia dengan kode pengaman sandi.'
  },
  {
    id: 'k7-ap-1',
    grade: 'kelas-7',
    strand: 'AP',
    title: 'Algoritma & Pemrograman Visual (Scratch / Blockly)',
    estimatedMinutes: 25,
    summary: 'Logika dasar pemrograman visual: Blok Sequence (Urutan), Loop (Perulangan), dan Conditional (Percabangan If-Else).',
    keyConcepts: [
      'Sequence: Blok instruksi dijalankan berurutan dari atas ke bawah.',
      'Perulangan (Loop): Mengulangi instruksi berkali-kali tanpa menulis ulang (Repeat X times / Forever).',
      'Percabangan (If-Else): Mengambil keputusan berdasarkan kondisi True (Benar) atau False (Salah).'
    ],
    contentMarkdown: [
      'Pemrograman visual menyederhanakan sintaks teks menjadi puzzle blok warna-warni sehingga kita bisa fokus 100% pada logika alur berpikir algoritma.',
      'Contoh alur game: IF (Karakter menyentuh koin) THEN (Tambah Skor +10) ELSE (Tetap berjalan).'
    ],
    realWorldAnalogy: 'Resep membuat mie instan: didihkan air -> masukkan mie -> jika suka pedas, tambahkan cabai -> sajikan di mangkuk.'
  },

  // --- KELAS VIII ---
  {
    id: 'k8-bk-1',
    grade: 'kelas-8',
    strand: 'BK',
    title: 'Representasi Data: Sistem Bilangan Biner & Desimal',
    estimatedMinutes: 30,
    summary: 'Mengapa komputer menggunakan biner (0 dan 1)? Menguasai konversi Desimal ke Biner, Biner ke Desimal, dan Heksadesimal.',
    keyConcepts: [
      'Bit (Binary Digit): Satuan terkecil data digital bernilai 0 (Off / Low Voltage) atau 1 (On / High Voltage).',
      'Byte: Kumpulan 8 bit yang dapat mewakili angka 0 hingga 255 atau satu karakter huruf (ASCII).',
      'Bobot Posisi Biner: 2^7(128), 2^6(64), 2^5(32), 2^4(16), 2^3(8), 2^2(4), 2^1(2), 2^0(1).'
    ],
    contentMarkdown: [
      'Komputer terbuat dari jutaan transistor saklar mikro. Saklar ini hanya mengenal 2 kondisi fisik: Mati (0) atau Hidup (1). Oleh karena itu seluruh teks, musik MP3, game 3D, dan video 4K diolah dalam deretan biner.',
      'Konversi Biner ke Desimal: Cukup jumlahkan nilai bobot posisi bit bernilai 1. Misalnya biner 1011 = 8 + 0 + 2 + 1 = 11 desimal!',
      'Gunakan simulasi interaktif Binary Converter di lab kami untuk mencoba langsung tombol bit dan konversi desimal!'
    ],
    realWorldAnalogy: 'Seperti 8 buah saklar lampu di panggung konser: tiap kombinasi lampu nyala/mati menghasilkan kode warna cahaya berbeda.',
    hasSimulation: 'binary'
  },
  {
    id: 'k8-sk-1',
    grade: 'kelas-8',
    strand: 'SK',
    title: 'Gerbang Logika Dasar (Logic Gates)',
    estimatedMinutes: 30,
    summary: 'Mekanisme gerbang logika digital: AND, OR, NOT, NAND, NOR, XOR, dan XNOR pembentuk sirkuit terpadu komputer.',
    keyConcepts: [
      'Gerbang AND: Menghasilkan output 1 HANYA JIKA kedua input bernilai 1.',
      'Gerbang OR: Menghasilkan output 1 jika SALAH SATU atau KEDUA input bernilai 1.',
      'Gerbang NOT: Pembalik logika (Inverter). Input 1 menghasilkan 0, input 0 menghasilkan 1.',
      'Gerbang XOR (Exclusive OR): Menghasilkan output 1 jika kedua input BERBEDA (0 dan 1).'
    ],
    contentMarkdown: [
      'Gerbang logika adalah pondasi dari semua chip prosesor modern! Jutaan gerbang logika dirangkai membentuk ALU (Arithmetic Logic Unit) untuk melakukan penjumlahan, pengurangan, dan kalkulasi grafis.',
      'Tabel Kebenaran (Truth Table) adalah tabel pemetaan semua kemungkinan input terhadap hasil output sirkuit.',
      'Jelajahi lab 3D Gerbang Logika kami untuk melihat aliran sinyal laser digital secara real-time!'
    ],
    realWorldAnalogy: 'Pintu brankas bank otomatis: Pintu baru terbuka jika (Kunci Kartu Benar) AND (Sandi PIN Benar).',
    hasSimulation: 'logic-gate'
  },
  {
    id: 'k8-ap-1',
    grade: 'kelas-8',
    strand: 'AP',
    title: 'Struktur Data Linear: Stack (Tumpukan LIFO) & Operasi-Operasinya',
    estimatedMinutes: 35,
    summary: 'Materi resmi Informatika SMP/MTs Kelas VIII Hal. 62: Memahami konsep tumpukan LIFO melalui ilustrasi bola 1-4 dalam tabung, tumpukan buku, serta 5 operasi utama stack (Push, Pop, isEmpty/Top, isEmpty, Size).',
    keyConcepts: [
      'Ilustrasi Tabung Bola LIFO: Bola dimasukkan ke tabung urut nomor 1 (biru), 2 (kuning), 3 (hijau), hingga 4 (merah). Saat dikeluarkan, Bola 4 yang terakhir masuk menjadi yang pertama diambil.',
      'Push: Operasi yang digunakan untuk menambahkan elemen baru ke dalam stack pada posisi teratas.',
      'Pop: Operasi yang digunakan untuk menghapus elemen teratas dari stack dan mengembalikan nilainya.',
      'isEmpty/Top: Operasi yang digunakan untuk mengecek elemen teratas dari stack tanpa menghapusnya.',
      'isEmpty: Operasi yang digunakan untuk memeriksa apakah stack kosong atau tidak.',
      'Size: Operasi yang digunakan untuk mengembalikan jumlah elemen dalam stack.'
    ],
    contentMarkdown: [
      'Konsep stack ini dalam kehidupan sehari-hari mirip dengan tumpukan buku. Yang mana apabila buku yang terakhir diletakkan di atas tumpukan, maka yang terakhir yang dapat diambil terlebih dahulu, kemudian dilanjut dengan tumpukan berikutnya.',
      'Gambar 2.16 Ilustrasi Tumpukan LIFO (Last In First Out): Ketika bola dimasukkan ke dalam tabung sesuai dengan urutan dari nomor 1 sampai dengan 4, maka Bola 4 menjadi urutan pertama yang akan diambil/dikeluarkan, disusul Bola 3 (kedua), Bola 2 (ketiga), dan Bola 1 (keempat/terakhir).',
      'Manfaat Stack dalam Komputer dan Kehidupan: Penggunaan fitur Undo (membatalkan aksi terakhir) dalam aplikasi, penyimpanan data pada alamat memori komputer (call stack), perhitungan ekspresi dalam aritmetika (notasi postfix), pengurutan barang di gudang, navigasi riwayat tombol Back browser, dan pengelolaan buku pada perpustakaan.'
    ],
    realWorldAnalogy: 'Tumpukan buku di meja belajar atau bola nomor 1-4 yang dimasukkan ke tabung silinder transparan (Buku Paket Informatika SMP Kelas VIII Hal. 62).',
    hasSimulation: 'stack-queue'
  },
  {
    id: 'k8-jki-1',
    grade: 'kelas-8',
    strand: 'JKI',
    title: 'Topologi Jaringan Komputer & IP Address',
    estimatedMinutes: 25,
    summary: 'Mempelajari cara menghubungkan komputer: Topologi Star, Bus, Ring, Mesh, serta alamat IP sebagai tanda pengenal perangkat.',
    keyConcepts: [
      'Topologi Star: Semua komputer terhubung ke satu pusat switch/hub. Paling populer dan stabil.',
      'Topologi Mesh: Setiap perangkat terhubung ke beberapa jalur sekaligus untuk redundansi tinggi.',
      'IP Address (IPv4): 4 blok angka desimal (0-255) yang menjadi identitas unik perangkat di jaringan (contoh: 192.168.1.1).'
    ],
    contentMarkdown: [
      'Bayangkan internet seperti kota raksasa. IP Address adalah nomor rumah dan nama jalan komputermu, sedangkan Router adalah kantor pos yang mengantarkan paket data ke alamat tujuan.'
    ],
    realWorldAnalogy: 'Alamat pengiriman paket belanja online: tanpa kode pos dan nama jalan yang jelas, kurir tidak tahu harus mengantar ke mana.'
  },

  // --- KELAS IX ---
  {
    id: 'k9-bk-1',
    grade: 'kelas-9',
    strand: 'BK',
    title: 'Struktur Data Non-Linear: Tree (Pohon) & Graf (Graph)',
    estimatedMinutes: 30,
    summary: 'Memahami representasi data relasional non-linear: Node akar, cabang, daun pada Pohon serta verteks dan sisi pada Graf.',
    keyConcepts: [
      'Tree (Pohon): Struktur hierarkis yang memiliki satu Root Node (Akar), Parent, Child, dan Leaf (Daun). Tidak boleh ada siklus tertutup.',
      'Binary Tree: Setiap node memiliki maksimal 2 anak (Left Child & Right Child).',
      'Graph: Kumpulan simpul (Vertex) yang dihubungkan oleh sisi (Edge). Digunakan memodelkan peta navigasi GPS dan jaringan sosial.'
    ],
    contentMarkdown: [
      'Sistem berkas di komputermu (C:\\Users\\Dokumen) adalah struktur Tree hierarkis.',
      'Aplikasi Google Maps dan Waze menggunakan Graph dan algoritma Dijkstra untuk menemukan rute terpendek tercepat di tengah kemacetan jalan raya.'
    ],
    realWorldAnalogy: 'Pohon silsilah keluarga besar (Tree) vs Peta jalur penerbangan maskapai antar-bandara internasional (Graph).',
    hasSimulation: 'data-structure'
  },
  {
    id: 'k9-sk-1',
    grade: 'kelas-9',
    strand: 'SK',
    title: 'Sistem Tertanam (Embedded System) & IoT',
    estimatedMinutes: 25,
    summary: 'Komputer khusus mini dalam kehidupan modern: Mikrokontroler, Sensor suhu/cahaya, dan Aktuator motor/lampu.',
    keyConcepts: [
      'Embedded System: Sistem komputasi dengan fungsi spesifik di dalam perangkat elektronik.',
      'Sensor: Mengubah besaran fisik dunia nyata (suhu, jarak, detak jantung) menjadi sinyal listrik biner.',
      'Aktuator: Komponen mekanik/elektronik yang menghasilkan aksi nyata (motor servo berputar, lampu menyala, katup air terbuka).'
    ],
    contentMarkdown: [
      'Smart AC di kamarmu tidak menggunakan CPU komputer berukuran besar, melainkan chip mikrokontroler hemat daya yang membaca sensor suhu lalu mengendalikan kompresor.',
      'Revolusi Internet of Things (IoT) memungkinkan mesin cuci, lampu rumah, dan kulkas berkomunikasi otomatis lewat internet!'
    ],
    realWorldAnalogy: 'Mata manusia sebagai sensor penerima cahaya, otak sebagai pemroses sinyal, dan tangan sebagai aktuator yang bergerak.'
  },
  {
    id: 'k9-ap-1',
    grade: 'kelas-9',
    strand: 'AP',
    title: 'Pemrograman Teks & Fungsi Modular (Python / JavaScript)',
    estimatedMinutes: 30,
    summary: 'Transisi dari blok visual ke bahasa kode teks: Variabel bertipe, Fungsi dengan parameter dan return value, serta debugging.',
    keyConcepts: [
      'Sintaks Teks: Penulisan kode dengan aturan tanda baca dan indentasi yang presisi.',
      'Fungsi (Function): Blok kode yang dinamai dan dapat dipanggil berulang kali untuk efisiensi.',
      'Debugging: Proses mencari dan memperbaiki kesalahan logika (bug) di dalam program.'
    ],
    contentMarkdown: [
      'Di kelas IX kamu beralih ke bahasa pemrograman berbasis teks seperti Python. Python banyak dipakai oleh insinyur kecerdasan buatan (AI) dan ilmuwan data di seluruh dunia.',
      'Dengan membagi program menjadi fungsi-fungsi kecil, kode menjadi sangat rapi, mudah dibaca, dan mudah dikembangkan bersama tim.'
    ],
    realWorldAnalogy: 'Fungsi seperti tombol "Blender" di dapur: kamu memasukkan buah (input parameter), mesin memproses, dan menghasilkan jus segar (return value).'
  },
  {
    id: 'k9-dsi-1',
    grade: 'kelas-9',
    strand: 'DSI',
    title: 'Kecerdasan Buatan (AI), Etika Digital & Keamanan Siber',
    estimatedMinutes: 25,
    summary: 'Memahami cara kerja AI, Machine Learning, bias algoritma, privasi data pribadi, dan pertahanan terhadap phishing.',
    keyConcepts: [
      'Machine Learning: Komputer belajar mengenali pola dari jutaan data tanpa diprogram secara kaku.',
      'Etika AI & Plagiarisme: Menghargai hak cipta dan menggunakan AI sebagai alat bantu berpikir, bukan mencontek tugas secara buta.',
      'Social Engineering & Phishing: Modus penipuan siber yang memancing korban memberikan sandi atau kode OTP.'
    ],
    contentMarkdown: [
      'Kecerdasan buatan bukan sulap! AI bekerja dengan kalkulasi probabilitas matematika dan statistik tingkat tinggi yang membaca triliunan parameter.',
      'Sebagai generasi muda Gen Z yang bijak, kamu harus kritis terhadap hoaks buatan AI (deepfake) dan selalu mengamankan akun dengan autentikasi dua faktor (2FA).'
    ],
    realWorldAnalogy: 'Seperti detektif yang melatih anjing pelacak dengan ratusan aroma berbeda hingga mampu mengenali jejak secara instan.'
  }
];

export const STRAND_METADATA: Record<StrandType, { name: string; color: string; description: string }> = {
  BK: { name: 'Berpikir Komputasional', color: 'cyan', description: 'Metode memecahkan masalah sistematis dengan algoritma & dekomposisi' },
  SK: { name: 'Sistem Komputer', color: 'purple', description: 'Mekanisme hardware, CPU, memori, transistor & gerbang logika' },
  TIK: { name: 'Teknologi Informasi & Komunikasi', color: 'blue', description: 'Pemanfaatan aplikasi, manajemen berkas & cloud digital' },
  JKI: { name: 'Jaringan Komputer & Internet', color: 'emerald', description: 'Protokol, IP address, topologi kabel & keamanan siber' },
  AD: { name: 'Analisis Data', color: 'amber', description: 'Pengolahan lembar kerja, visualisasi grafik & interpretasi data' },
  AP: { name: 'Algoritma & Pemrograman', color: 'rose', description: 'Struktur data stack, queue, alur percabangan & coding' },
  DSI: { name: 'Dampak Sosial Informatika', color: 'indigo', description: 'Etika digital, hak cipta, keamanan privasi & revolusi AI' },
  PLB: { name: 'Praktik Lintas Bidang', color: 'teal', description: 'Proyek kolaborasi teknologi menyelesaikan masalah riil' }
};
