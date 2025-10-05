// src/types/quiz.ts

// Tipe untuk jawaban (A, B, C, atau D)
export type AnswerValue = "A" | "B" | "C" | "D";

// Struktur data untuk satu pertanyaan yang diambil dari database
export interface Question {
  id: number;
  part: number;
  question_text: string;
  option_a_text: string;
  option_b_text: string;
  option_c_text: string;
  option_d_text: string;
}

// Struktur untuk setiap jawaban yang diberikan pengguna
export interface Answer {
  questionId: number;
  value: AnswerValue;
}

// Tipe untuk skor mentah, menghitung jumlah A, B, C, D
export type PersonaScores = {
  [key in AnswerValue]: number;
};

// Struktur data untuk hasil tes yang akan disimpan ke database dan ditampilkan
export interface TestResult {
  userId: string;
  primary_persona: string;
  secondary_persona?: string | null;
  hybrid_persona_id?: string | null;
  scores: PersonaScores;
  // Kita akan mengambil detail persona secara terpisah,
  // jadi tidak perlu menyimpannya di sini.
}

// Struktur data untuk tabel 'personas'
export interface PersonaData {
    id: string;
    name: string;
    emoji: string;
    title: string;
    vibe_description: string;
    superpowers: string[];
    kryptonite: string[];
    jurusan_s_tier: string[];
    jurusan_a_tier: string[];
    jurusan_hidden_gem: string[];
    career_classic: string[];
    career_modern: string[];
    career_boss: string[];
    motto: string;
}

// Struktur data untuk tabel 'hybrid_personas'
export interface HybridPersonaData {
    id: string;
    name: string;
    emoji: string;
    description: string;
    superpower_combo: string;
    perfect_roles: string[];
}
