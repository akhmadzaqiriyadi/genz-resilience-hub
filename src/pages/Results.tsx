// src/pages/Results.tsx

import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { PersonaData, HybridPersonaData } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Download,
  Share2,
  Home,
  Twitter,
  Instagram,
  Copy,
} from "lucide-react";

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

  // Helper function untuk generate share text
  const getShareText = () => {
    if (!result) return "";
    const personaEmoji =
      result.hybridPersona?.emoji || result.primaryPersona.emoji;
    const personaName =
      result.hybridPersona?.name || result.primaryPersona.name;
    return `${personaEmoji} Gue ${personaName} ternyata! 

Lo persona apa? Gas coba tes di sini! �

https://www.testgenz.com/`;
  };

  // Fungsi untuk share ke Twitter
  const shareToTwitter = () => {
    if (!result) return;
    const text = encodeURIComponent(getShareText());
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");

    toast({
      title: "Twitter ready!",
      description: "Udah kebuka nih, tinggal tweet aja!",
    });
  };

  // Fungsi untuk copy text saja
  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      toast({
        title: "Udah ke-copy!",
        description: "Teks sharing udah masuk clipboard, tinggal paste aja!",
      });
    } catch (error) {
      toast({
        title: "Waduh gagal copy",
        description: "Ada error nih, coba lagi yuk!",
        variant: "destructive",
      });
    }
  };

  // Fungsi untuk download PDF
  const downloadPDF = async () => {
    if (!resultsRef.current || !result) return;

    setIsDownloading(true);

    try {
      // Load libraries dinamis
      const html2canvas = await import("html2canvas");
      const jsPDF = await import("jspdf");

      // Capture element sebagai canvas dengan konfigurasi optimal
      const canvas = await html2canvas.default(resultsRef.current, {
        scale: 3, // Tingkatkan scale untuk kualitas lebih baik
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: resultsRef.current.scrollWidth,
        height: resultsRef.current.scrollHeight,
        windowWidth: resultsRef.current.scrollWidth,
        windowHeight: resultsRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Convert canvas ke image dengan kualitas tinggi
      const imgData = canvas.toDataURL("image/png", 1.0);

      // Create PDF dengan margin yang sesuai
      const pdf = new jsPDF.default({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Kalkulasi dimensi dengan margin
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // Margin 10mm
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = pdfHeight - margin * 2;

      // Hitung rasio untuk maintain aspect ratio
      const canvasAspectRatio = canvas.height / canvas.width;
      let imgWidth = contentWidth;
      let imgHeight = contentWidth * canvasAspectRatio;

      // Jika tinggi melebihi satu halaman, scale down
      if (imgHeight > contentHeight) {
        imgHeight = contentHeight;
        imgWidth = imgHeight / canvasAspectRatio;
      }

      // Center image jika lebih kecil dari content area
      const xOffset = margin + (contentWidth - imgWidth) / 2;
      const yOffset = margin;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(
        imgData,
        "PNG",
        xOffset,
        yOffset + position,
        imgWidth,
        imgHeight
      );
      heightLeft -= contentHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position -= contentHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          xOffset,
          yOffset + position,
          imgWidth,
          imgHeight
        );
        heightLeft -= contentHeight;
      }

      // Download PDF dengan nama yang lebih bersih
      const personaName = (
        result.hybridPersona?.name || result.primaryPersona.name
      )
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      const fileName = `GenZ-Resilience-${personaName}-Results.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF berhasil didownload!",
        description: "File PDF hasil tes telah tersimpan di perangkat Anda.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Gagal download PDF",
        description: "Terjadi kesalahan saat membuat PDF. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Fungsi untuk share results (hanya persona, bukan hasil pribadi)
  const shareResults = async () => {
    if (!result) return;

    setIsSharing(true);

    try {
      const personaName =
        result.hybridPersona?.name || result.primaryPersona.name;
      const personaEmoji =
        result.hybridPersona?.emoji || result.primaryPersona.emoji;

      // Share data yang aman (tanpa hasil pribadi)
      const shareData = {
        title: `GenZ Resilience Hub - Tes Kepribadian`,
        text: `${personaEmoji} Gue ${
          result.hybridPersona?.name
            ? `${result.hybridPersona.name}`
            : `${result.primaryPersona.name}`
        } ternyata! 

        Lo persona apa? Gas coba tes di sini! 🚀`,
        url: "https://www.testgenz.com/", // Link ke homepage, bukan hasil pribadi
      };

      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Berhasil di-share!",
          description: "Persona lo udah ke-share nih, data tetep aman!",
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n\n${shareData.url}`
        );
        toast({
          title: "Teks berhasil disalin!",
          description: "Teks sharing telah disalin ke clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback: copy to clipboard
      try {
        const personaName =
          result.hybridPersona?.name || result.primaryPersona.name;
        const personaEmoji =
          result.hybridPersona?.emoji || result.primaryPersona.emoji;

        const fallbackText = `${personaEmoji} Gue ${
          result.hybridPersona?.name || result.primaryPersona.name
        } ternyata! 

Lo persona apa? Gas coba tes di sini! �

https://www.testgenz.com/`;

        await navigator.clipboard.writeText(fallbackText);
        toast({
          title: "Teks berhasil disalin!",
          description: "Teks sharing telah disalin ke clipboard.",
        });
      } catch (clipboardError) {
        toast({
          title: "Gagal membagikan",
          description: "Terjadi kesalahan saat membagikan. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  useEffect(() => {
    const resultId = searchParams.get("id");
    if (!resultId) {
      navigate("/");
      return;
    }

    const fetchResults = async () => {
      // 1. Ambil data hasil tes dari test_results
      const { data: testResultData, error: testResultError } = await supabase
        .from("test_results")
        .select("*")
        .eq("id", resultId)
        .single();

      if (testResultError) {
        console.error("Error fetching test result:", testResultError);
        navigate("/"); // Arahkan pulang jika hasil tidak ditemukan
        return;
      }

      // 2. Ambil detail persona utama
      const { data: primaryPersonaData, error: primaryError } = await supabase
        .from("personas")
        .select("*")
        .eq("id", testResultData.primary_persona)
        .single();

      if (primaryError) throw primaryError;

      let secondaryPersonaData: PersonaData | undefined = undefined;
      if (testResultData.secondary_persona) {
        const { data } = await supabase
          .from("personas")
          .select("*")
          .eq("id", testResultData.secondary_persona)
          .single();
        secondaryPersonaData = data as PersonaData;
      }

      let hybridPersonaData: HybridPersonaData | undefined = undefined;
      if (testResultData.hybrid_persona_id) {
        const { data } = await supabase
          .from("hybrid_personas")
          .select("*")
          .eq("id", testResultData.hybrid_persona_id)
          .single();
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
      <div
        ref={resultsRef}
        className="container mx-auto px-4 max-w-4xl space-y-8"
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        {/* Header Hasil */}
        <div className="text-center space-y-4 animate-fade-in">
          <span className="text-7xl">
            {hybridPersona?.emoji || primaryPersona.emoji}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            You are{" "}
            {hybridPersona?.name
              ? `a ${hybridPersona.name}`
              : `The ${primaryPersona.name}`}
            !
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {hybridPersona?.description || primaryPersona.vibe_description}
          </p>
        </div>

        {/* Konten detail hybrid atau primary */}
        {hybridPersona ? (
          <Card className="shadow-card border-2 animate-fade-in">
            <CardHeader>
              <CardTitle>Your Superpower Combo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{hybridPersona.superpower_combo}</p>
            </CardContent>
            <CardHeader>
              <CardTitle>Perfect Roles for You</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {hybridPersona.perfect_roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="shadow-card border-2 animate-fade-in">
              <CardHeader>
                <CardTitle>Your Superpowers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {primaryPersona.superpowers.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-card border-2 animate-fade-in">
              <CardHeader>
                <CardTitle>Your Kryptonite</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {primaryPersona.kryptonite.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-card border-2 animate-fade-in">
              <CardHeader>
                <CardTitle>Jurusan Tier List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">S-Tier (Pasti Cocok)</h3>
                    <p>{primaryPersona.jurusan_s_tier.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">A-Tier (Patut Dicoba)</h3>
                    <p>{primaryPersona.jurusan_a_tier.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Hidden Gem (Jarang Dilirik)
                    </h3>
                    <p>{primaryPersona.jurusan_hidden_gem.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Tombol Aksi - Hide saat download PDF */}
        <Card 
          className={`p-4 sm:p-6 shadow-card border-2 animate-fade-in ${isDownloading ? 'hidden' : ''}`}
        >
          <div className="space-y-4">
            {/* Tombol utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-medium"
                onClick={downloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isDownloading ? "Membuat PDF..." : "Download PDF"}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-medium"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" /> Kembali
              </Button>
            </div>

            {/* Bagian Share */}
            <div className="border-t pt-4">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 text-center px-2">
                Flex persona lo ke temen-temen! (data pribadi aman kok)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-10 sm:h-11 text-xs sm:text-sm"
                  onClick={shareResults}
                  disabled={isSharing}
                >
                  {isSharing ? (
                    <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  ) : (
                    <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  <span className="hidden sm:inline">{isSharing ? "Sharing..." : "Share"}</span>
                  <span className="sm:hidden">{isSharing ? "..." : "Share"}</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-10 sm:h-11 text-xs sm:text-sm"
                  onClick={shareToTwitter}
                >
                  <Twitter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Twitter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-10 sm:h-11 text-xs sm:text-sm"
                  onClick={copyShareText}
                >
                  <Copy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Copy Text</span>
                  <span className="sm:hidden">Copy</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center px-2 leading-relaxed">
                🔒 Tenang bestie, data lo aman - cuma persona doang yang di-share
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;
