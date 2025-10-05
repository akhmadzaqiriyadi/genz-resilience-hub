import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
}

const options = [
  { value: 4, label: "Sangat Setuju", color: "bg-success/10 hover:bg-success/20 border-success/50" },
  { value: 3, label: "Setuju", color: "bg-primary/10 hover:bg-primary/20 border-primary/50" },
  { value: 2, label: "Kurang Setuju", color: "bg-warning/10 hover:bg-warning/20 border-warning/50" },
  { value: 1, label: "Tidak Setuju", color: "bg-destructive/10 hover:bg-destructive/20 border-destructive/50" },
];

const QuestionCard = ({ question, currentIndex, totalQuestions, onAnswer }: QuestionCardProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 animate-fade-in">
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
      <Card className="p-8 shadow-card border-2">
        <div className="space-y-8">
          <div>
            <div className="inline-block mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {question.pillar === 'mindset' && 'Pola Pikir'}
                {question.pillar === 'skills' && 'Keterampilan Aksi'}
                {question.pillar === 'social' && 'Koneksi Sosial'}
                {question.pillar === 'wellbeing' && 'Kesejahteraan Diri'}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-relaxed">
              {question.text}
            </h2>
          </div>

          <div className="grid gap-3">
            {options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="lg"
                className={`${option.color} justify-start text-left h-auto py-4 px-6 font-semibold text-base transition-all hover:scale-[1.02] border-2`}
                onClick={() => onAnswer(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Helper text */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Pilih jawaban yang paling sesuai dengan kondisimu saat ini
      </p>
    </div>
  );
};

export default QuestionCard;
