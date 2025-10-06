// src/pages/Loading.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { processTestAnswers } from "@/utils/calculateResults";
import { Answer } from "@/types/quiz";

const Loading = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("Menganalisis jawabanmu...");

  useEffect(() => {
    const calculateAndSave = async () => {
      const answersJson = sessionStorage.getItem('testAnswers');
      const quizSlug = sessionStorage.getItem('quizSlug');

      console.log('🚀 Loading page - Data check:', {
        hasAnswers: !!answersJson,
        hasQuizSlug: !!quizSlug,
        hasUser: !!user,
        answersLength: answersJson ? JSON.parse(answersJson).length : 0
      });

      if (!answersJson || !quizSlug || !user) {
        console.error('❌ Missing required data:', { answersJson: !!answersJson, quizSlug: !!quizSlug, user: !!user });
        navigate('/');
        return;
      }

      const answers: Answer[] = JSON.parse(answersJson);
      console.log('📝 Parsed answers:', answers);

      try {
        setMessage("Menghitung persona unikmu...");
        
        console.log('🎯 Calling processTestAnswers with:', { answersCount: answers.length, userId: user.id, quizSlug });
        const resultId = await processTestAnswers(answers, user.id, quizSlug);
        console.log('✅ Got result ID:', resultId);

        setMessage("Menyiapkan hasil akhir...");
        
        // Hapus kedua data dari session storage setelah berhasil
        sessionStorage.removeItem('testAnswers');
        sessionStorage.removeItem('quizSlug');

        // Arahkan ke halaman hasil dengan ID dan slug kuis
        setTimeout(() => {
          navigate(`/results?id=${resultId}&quiz=${quizSlug}`);
        }, 1000);

      } catch (error) {
        console.error("❌ Failed to process results:", error);
        // Tampilkan error detail ke console
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        navigate('/test');
      }
    };

    calculateAndSave();
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative">
          <Loader2 className="w-24 h-24 text-primary animate-spin" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Sebentar ya...
          </h2>
          <p className="text-xl text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;