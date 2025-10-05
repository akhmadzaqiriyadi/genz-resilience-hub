// src/utils/calculateResults.ts

import { Answer, AnswerValue, PersonaScores, TestResult } from "@/types/quiz";
import { supabase } from "@/lib/supabaseClient";

// Fungsi untuk menghitung jumlah setiap jawaban (A, B, C, D)
function calculatePersonaScores(answers: Answer[]): PersonaScores {
  const scores: PersonaScores = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(answer => {
    scores[answer.value]++;
  });
  return scores;
}

// Fungsi utama untuk memproses jawaban dan menentukan persona
export async function processTestAnswers(answers: Answer[], userId: string): Promise<string> {
  // 1. Hitung skor mentah
  const scores = calculatePersonaScores(answers);

  // 2. Urutkan skor dari yang tertinggi ke terendah
  const sortedScores = (Object.keys(scores) as AnswerValue[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const primaryPersona = sortedScores[0];
  const secondaryPersona = sortedScores[1];
  let hybridPersonaId: string | null = null;

  // 3. Cek apakah ini adalah persona hybrid (jika selisih skor <= 2)
  if (scores[primaryPersona] - scores[secondaryPersona] <= 2) {
    // Urutkan ID persona secara alfabetis untuk konsistensi (A+B, bukan B+A)
    hybridPersonaId = [primaryPersona, secondaryPersona].sort().join('+');
  }

  // 4. Siapkan data untuk disimpan ke database
  const resultData: Omit<TestResult, 'userId'> = {
    primary_persona: primaryPersona,
    secondary_persona: secondaryPersona,
    hybrid_persona_id: hybridPersonaId,
    scores: scores,
  };

  // 5. Simpan hasil ke tabel test_results di Supabase
  const { data, error } = await supabase
    .from('test_results')
    .insert({ ...resultData, user_id: userId })
    .select('id') // Ambil ID dari baris yang baru saja dibuat
    .single();

  if (error) {
    console.error("Error saving test result:", error);
    throw error;
  }
  
  // Simpan juga setiap jawaban ke tabel test_answers
  const answersToInsert = answers.map(answer => ({
      result_id: data.id,
      question_id: answer.questionId,
      answer_value: answer.value,
  }));

  const { error: answersError } = await supabase.from('test_answers').insert(answersToInsert);

  if (answersError) {
      console.error("Error saving answers:", answersError);
      // Anda bisa memilih untuk melanjutkan meskipun jawaban detail gagal disimpan
  }

  // 6. Kembalikan ID hasil tes yang baru dibuat
  return data.id;
}
