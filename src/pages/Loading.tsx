// src/pages/Loading.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { processTestAnswers } from "@/utils/calculateResults";
import { Answer } from "@/types/quiz";

const Loading = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [message, setMessage] = useState("Menganalisis jawabanmu...");

  useEffect(() => {
    const calculateAndSave = async () => {
      const answersJson = sessionStorage.getItem('testAnswers');
      
      if (!answersJson || !user) {
        // Jika tidak ada jawaban atau pengguna, kembali ke awal
        navigate('/');
        return;
      }

      const answers: Answer[] = JSON.parse(answersJson);

      try {
        setMessage("Menghitung persona unikmu...");
        // Panggil fungsi baru untuk memproses jawaban dan menyimpan ke DB
        const resultId = await processTestAnswers(answers, user.id);

        setMessage("Menyiapkan hasil akhir...");
        
        // Hapus data dari session storage setelah berhasil disimpan
        sessionStorage.removeItem('testAnswers');

        // Arahkan ke halaman hasil dengan ID hasil tes yang baru
        setTimeout(() => {
          navigate(`/results?id=${resultId}`);
        }, 1000);

      } catch (error) {
        console.error("Failed to process results:", error);
        // Arahkan ke halaman error atau kembali ke test
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
