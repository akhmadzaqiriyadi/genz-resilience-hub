// src/pages/History.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth"; // <-- PERBAIKAN DI SINI
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

type TestHistoryItem = {
  id: string;
  created_at: string;
  quiz_slug: string;
  // Kepo Starter
  primary_persona_name?: string;
  primary_persona_emoji?: string;
  hybrid_persona_name?: string;
  hybrid_persona_emoji?: string;
  // Data Sorcerer
  scores?: Record<string, number>;
};

// Data pemetaan dari PDF (Faksi Primer, Sekunder, Tersier)
const roleMapping: Record<string, { code: string, roles: string[] }> = {
  IAR: { code: "IAR", roles: ["GenAI Developer"] },
  IAE: { code: "IAE", roles: ["Data Scientist"] },
  IRC: { code: "IRC", roles: ["Machine Learning Engineer"] },
  // Tambahkan semua 15 peran dari Tabel 1 di PDF di sini...
};


const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]); // Menggunakan any untuk fleksibilitas
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    let hasFetched = false; // Prevent double fetch

    if (user && !hasFetched) {
      const fetchHistory = async () => {
        hasFetched = true; // Mark as fetched immediately
        
        // Timeout protection (5 detik)
        timeoutId = setTimeout(() => {
          if (isMounted && loading) {
            console.error('⏱️ History fetch timeout - stopping');
            if (isMounted) setLoading(false);
          }
        }, 5000);

        if (!isMounted) return;
        
        console.log('📜 Fetching history for user:', user.id);
        setLoading(true);
        
        try {
          // Query yang lebih komprehensif dengan explicit foreign key relationship
          const { data, error } = await supabase
            .from('test_results')
            .select(`
              id,
              created_at,
              scores,
              primary_persona,
              secondary_persona,
              hybrid_persona_id,
              quiz:quizzes!inner(slug, title),
              primary_persona_data:personas!test_results_primary_persona_fkey(name, emoji),
              hybrid_persona_data:hybrid_personas(name, emoji)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error("❌ Error fetching test history:", error);
          } else if (data && isMounted) {
            console.log(`✅ Test history fetched: ${data.length} items`);
            setHistory(data);
          }
        } catch (error) {
          console.error("❌ Unexpected error fetching history:", error);
        } finally {
          if (isMounted) setLoading(false);
          clearTimeout(timeoutId);
        }
      };
      fetchHistory();
    } else if (!user) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user]);
  
  const getSorcererArchetype = (scores: Record<string, number>) => {
    if (!scores) return { name: "Hasil Tidak Ditemukan", emoji: "❓" };
    const sortedPillars = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const hollandCode = sortedPillars.slice(0, 3).join('');
    const primaryArchetype = roleMapping[hollandCode]?.roles[0] || "Arketipe Unik";
    // Tentukan emoji berdasarkan pilar teratas
    const emojiMap: Record<string, string> = { R: '🛠️', I: '🧠', A: '🎨', S: '❤️‍🔥', E: '⚡️', C: '🗂️' };
    return { name: primaryArchetype, emoji: emojiMap[sortedPillars[0]] || "✨" };
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Riwayat Tes Anda</h1>
        <p className="text-muted-foreground">Lihat kembali hasil tes yang pernah Anda ambil.</p>
      </div>

      {history.length === 0 ? (
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle>Belum Ada Riwayat</CardTitle>
            <CardDescription>Anda belum pernah menyelesaikan tes. Yuk, mulai sekarang!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/pre-test')}>Mulai Tes Pertama</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {history.map((item) => {
            const isSorcerer = item.quiz.slug === 'data-sorcerer-test';
            const resultDetails = isSorcerer
              ? getSorcererArchetype(item.scores)
              : {
                  name: item.hybrid_persona_data?.name || item.primary_persona_data?.name,
                  emoji: item.hybrid_persona_data?.emoji || item.primary_persona_data?.emoji
                };

            return (
              <Card key={item.id} className="shadow-soft hover:shadow-card transition-shadow">
                <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-4">
                  <div className="grid gap-1">
                    <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
                      <span className="text-3xl">{resultDetails.emoji || "✨"}</span>
                      {resultDetails.name || "Hasil Tes"}
                    </CardTitle>
                    <CardDescription>
                      {item.quiz.title} • {format(new Date(item.created_at), 'd MMM yyyy, HH:mm', { locale: id })}
                    </CardDescription>
                  </div>
                   {item.hybrid_persona_id && <Badge>Hybrid Persona</Badge>}
                </CardHeader>
                <CardFooter>
                   <Button variant="outline" className="ml-auto group" onClick={() => navigate(`/results?id=${item.id}&quiz=${item.quiz.slug}`)}>
                      Lihat Detail
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                   </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default History;