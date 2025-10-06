// src/pages/Results.tsx

import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { PersonaData, HybridPersonaData, RiaPillar } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Download, Home } from "lucide-react";

// Impor kedua komponen hasil
import DataSorcererResult from "@/components/DataSorcererResult"; 
import KepoStarterResult from "@/components/KepoStarterResult";

// Tipe data untuk hasil gabungan
type FullResult = {
  scores: Record<string, number>;
  primaryPersona?: PersonaData;
  secondaryPersona?: PersonaData;
  hybridPersona?: HybridPersonaData;
};

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("id");
  const quizSlug = searchParams.get("quiz");

  const [result, setResult] = useState<FullResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!resultId || !quizSlug) {
      navigate("/");
      return;
    }

    let isMounted = true; // Guard untuk mencegah state update setelah unmount
    let timeoutId: NodeJS.Timeout;

    const fetchResults = async () => {
      // Timeout protection (5 detik)
      timeoutId = setTimeout(() => {
        if (isMounted && loading) {
          console.error('⏱️ Fetch timeout - stopping');
          setLoading(false);
          toast({
            title: "Timeout",
            description: "Gagal memuat hasil tes. Silakan coba lagi.",
            variant: "destructive"
          });
        }
      }, 5000);

      if (!isMounted) return;
      setLoading(true);
      console.log('📊 Fetching results for:', { resultId, quizSlug });
      
      try {
        const { data: testResultData, error: testResultError } = await supabase.from("test_results").select("*").eq("id", resultId).single();

        if (testResultError) {
          console.error("❌ Error fetching test result:", testResultError);
          if (isMounted) navigate("/");
          return;
        }

        console.log('✅ Test result data:', testResultData);
        let finalResult: FullResult = { scores: testResultData.scores };

        if (quizSlug === 'kepo-starter-pack' && testResultData.primary_persona) {
          console.log('🎭 Fetching Kepo Starter personas...');
          const { data: primaryPersonaData, error: primaryError } = await supabase.from("personas").select("*").eq("id", testResultData.primary_persona).single();
          if (primaryError) {
            console.error("❌ Error fetching primary persona:", primaryError);
          } else {
            console.log('✅ Primary persona:', primaryPersonaData);
            finalResult.primaryPersona = primaryPersonaData;
          }
          
          if (testResultData.hybrid_persona_id) {
            const { data: hybridPersonaData, error: hybridError } = await supabase.from("hybrid_personas").select("*").eq("id", testResultData.hybrid_persona_id).single();
            if (hybridError) {
              console.error("❌ Error fetching hybrid persona:", hybridError);
            } else {
              console.log('✅ Hybrid persona:', hybridPersonaData);
              finalResult.hybridPersona = hybridPersonaData;
            }
          }
        }
        
        console.log('✅ Final result:', finalResult);
        if (isMounted) {
          setResult(finalResult);
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Unexpected error:', error);
        if (isMounted) {
          setLoading(false);
          navigate("/");
        }
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchResults();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [resultId, quizSlug, navigate, toast]);
  
  const downloadPDF = async () => {
    setIsDownloading(true);
    toast({ title: "Fitur download sedang dalam pengembangan." });
    setTimeout(() => setIsDownloading(false), 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  if (!result) return <div className="min-h-screen flex items-center justify-center"><p>Hasil tes tidak ditemukan.</p></div>;

  return (
    <div className="min-h-screen bg-gradient-hero py-8 lg:py-16">
      <div ref={resultsRef} className="container mx-auto px-4 max-w-4xl bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 rounded-2xl shadow-card">
        {/* Router Tampilan Hasil */}
        {quizSlug === 'data-sorcerer-test' ? (
          <DataSorcererResult scores={result.scores as Record<RiaPillar, number>} />
        ) : (
          <KepoStarterResult result={result} />
        )}

        {/* Tombol Aksi Umum */}
        <div className={`mt-8 pt-6 border-t ${isDownloading ? 'hidden' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Button size="lg" className="w-full h-12" onClick={downloadPDF} disabled={isDownloading}>
                {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                {isDownloading ? "Membuat PDF..." : "Download Hasil"}
              </Button>
              <Button size="lg" variant="outline" className="w-full h-12" onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" /> Kembali ke Home
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;