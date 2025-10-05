// src/pages/Results.tsx

import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { PersonaData, HybridPersonaData } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fungsi untuk download PDF
  const downloadPDF = async () => {
    if (!resultsRef.current || !result) return;
    
    setIsDownloading(true);
    
    try {
      // Load libraries dinamis
      const html2canvas = await import('html2canvas');
      const jsPDF = await import('jspdf');
      
      // Capture element sebagai canvas
      const canvas = await html2canvas.default(resultsRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // Convert canvas ke image
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF
      const pdf = new jsPDF.jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Download PDF
      const fileName = `GenZ-Resilience-${result.hybridPersona?.name || result.primaryPersona.name}-Results.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "PDF berhasil didownload!",
        description: "File PDF hasil tes telah tersimpan di perangkat Anda.",
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Gagal download PDF",
        description: "Terjadi kesalahan saat membuat PDF. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Fungsi untuk share results
  const shareResults = async () => {
    if (!result) return;
    
    setIsSharing(true);
    
    try {
      const shareData = {
        title: `GenZ Resilience Hub - Hasil Tes Kepribadian`,
        text: `Saya adalah ${result.hybridPersona?.name || `The ${result.primaryPersona.name}`}! Temukan persona kepribadian Anda di GenZ Resilience Hub.`,
        url: window.location.href
      };
      
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Berhasil dibagikan!",
          description: "Hasil tes telah dibagikan.",
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
        toast({
          title: "Link berhasil disalin!",
          description: "Link hasil tes telah disalin ke clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        const fallbackText = `Saya adalah ${result.hybridPersona?.name || `The ${result.primaryPersona.name}`}! Temukan persona kepribadian Anda di GenZ Resilience Hub.\n\n${window.location.href}`;
        await navigator.clipboard.writeText(fallbackText);
        toast({
          title: "Link berhasil disalin!",
          description: "Link hasil tes telah disalin ke clipboard.",
        });
      } catch (clipboardError) {
        toast({
          title: "Gagal membagikan",
          description: "Terjadi kesalahan saat membagikan hasil. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

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
      <div ref={resultsRef} className="container mx-auto px-4 max-w-4xl space-y-8">
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
            <Button 
              size="lg" 
              className="flex-1" 
              onClick={downloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2" />
              )}
              {isDownloading ? 'Membuat PDF...' : 'Download PDF'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1"
              onClick={shareResults}
              disabled={isSharing}
            >
              {isSharing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Share2 className="mr-2" />
              )}
              {isSharing ? 'Membagikan...' : 'Bagikan Hasil'}
            </Button>
            <Button size="lg" variant="ghost" className="flex-1" onClick={() => navigate('/')}>
              <Home className="mr-2" /> Kembali
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;
