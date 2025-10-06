// src/utils/calculateResults.ts

import { Answer, RiaPillar, AnswerValue } from "@/types/quiz";
import { supabase } from "@/lib/supabaseClient";

// --- LOGIKA UNTUK "KEPO STARTER PACK" ---
function calculatePersonaScores(answers: Answer[]) {
  const scores: Record<AnswerValue, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(answer => {
    if (scores[answer.value] !== undefined) {
      scores[answer.value]++;
    }
  });
  return scores;
}

async function processKepoStarter(answers: Answer[], userId: string, quizId: string): Promise<string> {
  const scores = calculatePersonaScores(answers);
  const sortedScores = (Object.keys(scores) as AnswerValue[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const primaryPersona = sortedScores[0];
  const secondaryPersona = sortedScores[1];
  let hybridPersonaId: string | null = null;

  if (scores[primaryPersona] - scores[secondaryPersona] <= 2) {
    hybridPersonaId = [primaryPersona, secondaryPersona].sort().join('+');
  }

  const resultData = {
    user_id: userId,
    quiz_id: quizId,
    primary_persona: primaryPersona,
    secondary_persona: secondaryPersona,
    hybrid_persona_id: hybridPersonaId,
    scores: scores,
  };

  const { data, error } = await supabase
    .from('test_results')
    .insert(resultData)
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

// --- LOGIKA UNTUK "DATA SORCERER TEST" ---
const sorcererQuestionMapping: { [key: number]: { a: RiaPillar, b: RiaPillar, c: RiaPillar } } = {
  1: { a: 'R', b: 'I', c: 'A' }, 2: { a: 'R', b: 'I', c: 'S' }, 3: { a: 'R', b: 'I', c: 'A' },
  4: { a: 'R', b: 'C', c: 'A' }, 5: { a: 'R', b: 'I', c: 'A' }, 6: { a: 'R', b: 'I', c: 'C' },
  7: { a: 'R', b: 'I', c: 'S' }, 8: { a: 'R', b: 'I', c: 'A' }, 9: { a: 'C', b: 'I', c: 'A' },
  10: { a: 'I', b: 'S', c: 'E' }, 11: { a: 'I', b: 'A', c: 'E' }, 12: { a: 'I', b: 'S', c: 'A' },
  13: { a: 'I', b: 'S', c: 'E' }, 14: { a: 'I', b: 'R', c: 'S' }, 15: { a: 'I', b: 'C', c: 'A' },
  16: { a: 'I', b: 'E', c: 'I' }, 17: { a: 'I', b: 'I', c: 'E' }, 18: { a: 'C', b: 'A', c: 'E' },
  19: { a: 'A', b: 'S', c: 'R' }, 20: { a: 'A', b: 'C', c: 'S' }, 21: { a: 'A', b: 'I', c: 'R' },
  22: { a: 'A', b: 'I', c: 'E' }, 23: { a: 'A', b: 'S', c: 'I' }, 24: { a: 'A', b: 'S', c: 'E' },
  25: { a: 'A', b: 'S', c: 'E' }, 26: { a: 'A', b: 'I', c: 'S' }, 27: { a: 'S', b: 'I', c: 'A' },
  28: { a: 'S', b: 'I', c: 'C' }, 29: { a: 'S', b: 'I', c: 'C' }, 30: { a: 'S', b: 'I', c: 'E' },
  31: { a: 'S', b: 'I', c: 'E' }, 32: { a: 'S', b: 'I', c: 'E' }, 33: { a: 'S', b: 'I', c: 'E' },
  34: { a: 'S', b: 'I', c: 'C' }, 35: { a: 'I', b: 'E', c: 'C' }, 36: { a: 'E', b: 'I', c: 'R' },
  37: { a: 'E', b: 'I', c: 'A' }, 38: { a: 'E', b: 'I', c: 'S' }, 39: { a: 'E', b: 'I', c: 'A' },
  40: { a: 'E', b: 'I', c: 'C' }, 41: { a: 'E', b: 'I', c: 'R' }, 42: { a: 'E', b: 'I', c: 'C' },
  43: { a: 'C', b: 'A', c: 'S' }, 44: { a: 'C', b: 'R', c: 'I' }, 45: { a: 'C', b: 'A', c: 'S' },
  46: { a: 'C', b: 'A', c: 'S' }, 47: { a: 'C', b: 'R', c: 'A' }, 48: { a: 'C', b: 'S', c: 'R' },
  49: { a: 'C', b: 'A', c: 'I' }, 50: { a: 'C', b: 'A', c: 'I' }
};

function calculateSorcererScores(answers: Answer[]) {
    const scores: Record<RiaPillar, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    answers.forEach(ans => {
        const questionNumber = ans.questionIndex + 1;
        const answerValue = ans.value.toLowerCase() as 'a' | 'b' | 'c';

        if (sorcererQuestionMapping[questionNumber] && sorcererQuestionMapping[questionNumber][answerValue]) {
            const pillar = sorcererQuestionMapping[questionNumber][answerValue];
            scores[pillar] += 2;
        }
    });
    return scores;
}

// --- INI PERUBAHAN UTAMANYA ---
async function processDataSorcerer(answers: Answer[], userId: string, quizId: string): Promise<string> {
    const scores = calculateSorcererScores(answers);
    
    // Hapus `primary_persona` dari objek ini
    const resultData = {
        user_id: userId,
        quiz_id: quizId,
        scores: scores,
        // primary_persona, secondary_persona, dan hybrid_persona_id dibiarkan kosong (null)
        // karena tidak relevan untuk tes ini.
    };

    const { data, error } = await supabase
        .from('test_results')
        .insert(resultData)
        .select('id')
        .single();

    if (error) throw error;
    return data.id;
}
// --- AKHIR PERUBAHAN ---

// --- FUNGSI UTAMA YANG MEMILIH LOGIKA ---
export async function processTestAnswers(answers: Answer[], userId:string, quizSlug: string): Promise<string> {
    const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('slug', quizSlug)
        .single();
    
    if (quizError || !quizData) {
        throw new Error(`Quiz with slug "${quizSlug}" not found.`);
    }
    const quizId = quizData.id;

    let resultId: string;
    if (quizSlug === 'data-sorcerer-test') {
        resultId = await processDataSorcerer(answers, userId, quizId);
    } else {
        resultId = await processKepoStarter(answers, userId, quizId);
    }

    const answersToInsert = answers.map(answer => ({
        result_id: resultId,
        question_id: answer.questionId,
        answer_value: answer.value,
    }));
    
    await supabase.from('test_answers').insert(answersToInsert);

    return resultId;
}