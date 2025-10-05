// src/pages/Results.tsx

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { PersonaData, HybridPersonaData } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, Share2, Home } from "lucide-react";

// Tipe data untuk hasil gabungan
type FullResult = {
  primaryPersona: PersonaData;
  secondaryPersona?: PersonaData;
  hybridPersona?: HybridPersonaData;
  scores: Record<string, number>;
};

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<FullResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resultId = searchParams.get('id');
    if (!resultId) {
      navigate('/');
      return;
    }

    const fetchResults = async () => {
      // 1. Ambil data hasil tes dari test_results
      const { data: testResultData, error: testResultError } = await supabase
        .from('test_results')
        .select('*')
        .eq('id', resultId)
        .single();

      if (testResultError) {
        console.error("Error fetching test result:", testResultError);
        navigate('/'); // Arahkan pulang jika hasil tidak ditemukan
        return;
      }
      
      // 2. Ambil detail persona utama
      const { data: primaryPersonaData, error: primaryError } = await supabase
        .from('personas')
        .select('*')
        .eq('id', testResultData.primary_persona)
        .single();
        
      if (primaryError) throw primaryError;
      
      let secondaryPersonaData: PersonaData | undefined = undefined;
      if (testResultData.secondary_persona) {
          const { data } = await supabase.from('personas').select('*').eq('id', testResultData.secondary_persona).single();
          secondaryPersonaData = data as PersonaData;
      }

      let hybridPersonaData: HybridPersonaData | undefined = undefined;
      if (testResultData.hybrid_persona_id) {
          const { data } = await supabase.from('hybrid_personas').select('*').eq('id', testResultData.hybrid_persona_id).single();
          hybridPersonaData = data as HybridPersonaData;
      }

      setResult({
          primaryPersona: primaryPersonaData,
          secondaryPersona: secondaryPersonaData,
          hybridPersona: hybridPersonaData,
          scores: testResultData.scores,
      });

      setLoading(false);
    };

    fetchResults();
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Hasil tes tidak ditemukan.</p>
      </div>
    );
  }

  const { primaryPersona, hybridPersona } = result;

  return (
    <div className="min-h-screen bg-gradient-hero py-8 lg:py-16">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        {/* Header Hasil */}
        <div className="text-center space-y-4 animate-fade-in">
           <span className="text-7xl">{hybridPersona?.emoji || primaryPersona.emoji}</span>
           <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
             You are {hybridPersona?.name ? `a ${hybridPersona.name}` : `The ${primaryPersona.name}`}!
           </h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
             {hybridPersona?.description || primaryPersona.vibe_description}
           </p>
        </div>
        
        {/* Konten detail hybrid atau primary */}
        {hybridPersona ? (
             <Card className="shadow-card border-2 animate-fade-in">
                <CardHeader><CardTitle>Your Superpower Combo</CardTitle></CardHeader>
                <CardContent><p>{hybridPersona.superpower_combo}</p></CardContent>
                <CardHeader><CardTitle>Perfect Roles for You</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                        {hybridPersona.perfect_roles.map(role => <li key={role}>{role}</li>)}
                    </ul>
                </CardContent>
            </Card>
        ) : (
            <>
            <Card className="shadow-card border-2 animate-fade-in"><CardHeader><CardTitle>Your Superpowers</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5 space-y-1">{primaryPersona.superpowers.map(p => <li key={p}>{p}</li>)}</ul></CardContent></Card>
            <Card className="shadow-card border-2 animate-fade-in"><CardHeader><CardTitle>Your Kryptonite</CardTitle></CardHeader><CardContent><ul className="list-disc pl-5 space-y-1">{primaryPersona.kryptonite.map(k => <li key={k}>{k}</li>)}</ul></CardContent></Card>
            <Card className="shadow-card border-2 animate-fade-in"><CardHeader><CardTitle>Jurusan Tier List</CardTitle></CardHeader><CardContent><div className="space-y-4"><div><h3 className="font-semibold">S-Tier (Pasti Cocok)</h3><p>{primaryPersona.jurusan_s_tier.join(', ')}</p></div><div><h3 className="font-semibold">A-Tier (Patut Dicoba)</h3><p>{primaryPersona.jurusan_a_tier.join(', ')}</p></div><div><h3 className="font-semibold">Hidden Gem (Jarang Dilirik)</h3><p>{primaryPersona.jurusan_hidden_gem.join(', ')}</p></div></div></CardContent></Card>
            </>
        )}


        {/* Tombol Aksi */}
        <Card className="p-6 shadow-card border-2 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1"><Download className="mr-2" /> Download PDF</Button>
            <Button size="lg" variant="outline" className="flex-1"><Share2 className="mr-2" /> Bagikan Hasil</Button>
            <Button size="lg" variant="ghost" className="flex-1" onClick={() => navigate('/')}><Home className="mr-2" /> Kembali</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;
