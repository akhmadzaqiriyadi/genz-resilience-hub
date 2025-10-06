// src/types/quiz.ts

// Tipe untuk jawaban (A, B, C, atau D)
export type AnswerValue = "A" | "B" | "C" | "D";

// Tipe untuk pilar RIASEC dari Data Sorcerer Test
export type RiaPillar = "R" | "I" | "A" | "S" | "E" | "C";

// Struktur data untuk satu pertanyaan yang diambil dari database
export interface Question {
  id: number;
  pillar?: string; 
  part?: number;
  text?: string;
  question_text?: string;
  option_a_text?: string;
  option_b_text?: string;
  option_c_text?: string;
  option_d_text?: string;
  isReversed?: boolean; 
}

// Struktur untuk setiap jawaban yang diberikan pengguna
export interface Answer {
  questionId: number;
  value: AnswerValue;
  questionIndex: number; // <-- INI PERUBAHANNYA
}

// Struktur data untuk hasil tes yang akan disimpan
export interface TestResult {
  userId: string;
  quiz_id: string;
  primary_persona?: string | null;
  secondary_persona?: string | null;
  hybrid_persona_id?: string | null;
  scores: Record<string, number>; 
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