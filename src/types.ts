export type GradeLevel = 'kelas-7' | 'kelas-8' | 'kelas-9';

export type StrandType = 
  | 'BK'   // Berpikir Komputasional
  | 'SK'   // Sistem Komputer
  | 'TIK'  // Teknologi Informasi & Komunikasi
  | 'JKI'  // Jaringan Komputer & Internet
  | 'AD'   // Analisis Data
  | 'AP'   // Algoritma & Pemrograman
  | 'DSI'  // Dampak Sosial Informatika
  | 'PLB'; // Praktik Lintas Bidang

export interface LessonTopic {
  id: string;
  grade: GradeLevel;
  strand: StrandType;
  title: string;
  estimatedMinutes: number;
  summary: string;
  keyConcepts: string[];
  contentMarkdown: string[];
  realWorldAnalogy: string;
  hasSimulation?: 'binary' | 'logic-gate' | 'stack-queue' | 'data-structure';
}

export interface QuizQuestion {
  id: string;
  grade: GradeLevel;
  topicId: string;
  strand: StrandType;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Dasar' | 'Menengah' | 'Tantangan';
}

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  date: string;
  grade: GradeLevel;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface StudentProfileData {
  name: string;
  username: string;
  avatarSeed: string;
  grade: GradeLevel;
  level: number;
  xp: number;
  completedLessons: string[];
  badges: { id: string; name: string; description: string; icon: string; unlockedAt?: string }[];
  simulationMinutes: number;
  quizAttempts: QuizAttempt[];
}

export interface StudentProgressRecord {
  id: string;
  studentName: string;
  grade: GradeLevel;
  classGroup: string;
  completedLessonsCount: number;
  totalLessons: number;
  averageScore: number;
  lastActive: string;
  status: 'Aktif Belajar' | 'Perlu Pendampingan' | 'Unggul';
  strugglingTopics: string[];
}

export interface TechFact {
  id: string;
  title: string;
  category: 'Sejarah Komputer' | 'Algoritma & Kode' | 'Hardware & Chip' | 'Masa Depan AI' | 'Internet & Cyber';
  content: string;
  genZQuote: string;
  iconName: string;
}
