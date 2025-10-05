// src/pages/Test.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "@/components/QuestionCard";
import { Answer, Question, AnswerValue } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error("Error fetching questions:", error);
        // Mungkin tampilkan pesan error ke pengguna di sini
      } else {
        setQuestions(data);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestionIndex].id, value }];
    setAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      sessionStorage.setItem('testAnswers', JSON.stringify(newAnswers));
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
      navigate('/pre-test'); // Kembali ke halaman pre-test
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
          <div className="text-center">
            <p>Tidak ada pertanyaan yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
