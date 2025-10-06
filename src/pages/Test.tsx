// src/pages/Test.tsx

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuestionCard from "@/components/QuestionCard";
import { Answer, Question, AnswerValue } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Test = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizSlug = searchParams.get("quiz");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (!quizSlug) {
      navigate('/pre-test');
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);

      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('slug', quizSlug)
        .single();
      
      if (quizError || !quizData) {
        console.error("Error fetching quiz ID:", quizError);
        navigate('/pre-test');
        return;
      }
      
      const quizId = quizData.id;

      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('id', { ascending: true });
      
      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        setQuestions(data);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [quizSlug, navigate]);

  const handleAnswer = (value: AnswerValue) => {
    // --- INI PERUBAHANNYA ---
    const newAnswers = [
      ...answers,
      {
        questionId: questions[currentQuestionIndex].id,
        value,
        questionIndex: currentQuestionIndex, // Simpan indeks pertanyaan saat ini
      },
    ];
    // --- AKHIR PERUBAHAN ---
    
    setAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      sessionStorage.setItem('testAnswers', JSON.stringify(newAnswers));
      sessionStorage.setItem('quizSlug', quizSlug || '');
      navigate('/loading');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/pre-test');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-hero py-8 lg:py-16">
      <div className="container mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            {currentQuestionIndex > 0 ? 'Pertanyaan Sebelumnya' : 'Kembali'}
          </Button>
        </div>

        {currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        ) : (
          !loading && (
            <div className="text-center p-8 bg-card rounded-lg shadow-card">
              <h2 className="text-2xl font-bold mb-4">Oops!</h2>
              <p className="text-muted-foreground">
                Sepertinya kami tidak dapat menemukan pertanyaan untuk tes ini.
              </p>
              <Button onClick={() => navigate('/pre-test')} className="mt-6">Kembali ke Pemilihan Tes</Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Test;