// src/components/QuestionCard.tsx

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question, AnswerValue } from "@/types/quiz"; // Perbarui impor

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: AnswerValue) => void;
}

// Opsi jawaban sekarang dinamis
const options: { value: AnswerValue; labelKey: keyof Question }[] = [
  { value: "A", labelKey: "option_a_text" },
  { value: "B", labelKey: "option_b_text" },
  { value: "C", labelKey: "option_c_text" },
  { value: "D", labelKey: "option_d_text" },
];

const QuestionCard = ({ question, currentIndex, totalQuestions, onAnswer }: QuestionCardProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 animate-fade-in">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Pertanyaan {currentIndex + 1} dari {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-4 sm:p-6 lg:p-8 shadow-card border-2">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <div className="inline-block mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                Bagian {question.part}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-relaxed">
              {question.question_text}
            </h2>
          </div>

          <div className="grid gap-3">
            {options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="lg"
                className="justify-start text-left h-auto py-3 px-4 sm:py-4 sm:px-6 font-semibold text-sm sm:text-base transition-all hover:scale-[1.02] border-2 hover:bg-primary/10 hover:border-primary hover:text-primary w-full whitespace-normal min-h-[3rem] sm:min-h-[3.5rem]"
                onClick={() => onAnswer(option.value)}
              >
                <div className="flex items-start gap-2 sm:gap-4 w-full">
                  <span className="font-bold text-primary flex-shrink-0 mt-0.5">{option.value}.</span>
                  <span className="text-left leading-relaxed flex-1">{question[option.labelKey]}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Pilih jawaban yang paling kamu banget!
      </p>
    </div>
  );
};

export default QuestionCard;
