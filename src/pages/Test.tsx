import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "@/components/QuestionCard";
import { questions } from "@/data/questions";
import { Answer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, value }];
    setAnswers(newAnswers);

    // Check if this was the last question
    if (currentQuestionIndex === questions.length - 1) {
      // Store answers in sessionStorage
      sessionStorage.setItem('testAnswers', JSON.stringify(newAnswers));
      // Navigate to loading page
      navigate('/loading');
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Remove last answer
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8 lg:py-16">
      <div className="container mx-auto">
        {/* Back Button */}
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

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default Test;
