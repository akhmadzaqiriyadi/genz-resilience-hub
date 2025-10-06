// src/components/KepoStarterResult.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonaData, HybridPersonaData } from "@/types/quiz";
import { Twitter, Copy, Share2 } from "lucide-react";

// Tipe data untuk props
type FullResult = {
  primaryPersona?: PersonaData;
  secondaryPersona?: PersonaData;
  hybridPersona?: HybridPersonaData;
};

interface KepoStarterResultProps {
  result: FullResult;
}

const KepoStarterResult = ({ result }: KepoStarterResultProps) => {
  const { toast } = useToast();
  const { primaryPersona, hybridPersona } = result;

  if (!primaryPersona) {
    return <p className="text-center text-destructive">Data persona tidak ditemukan.</p>;
  }

  // Helper function untuk generate share text
  const getShareText = () => {
    if (!result) return "";
    const personaEmoji = hybridPersona?.emoji || primaryPersona.emoji;
    const personaName = hybridPersona?.name || primaryPersona.name;
    return `POV: Ternyata persona gue ${personaEmoji} ${hybridPersona ? `a ${personaName}` : `The ${personaName}`}.

Kira-kira relate gak ya? Coba tes & liat punya lo! 👇

https://www.testgenz.com/`;
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(getShareText());
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
    toast({ title: "Twitter ready!", description: "Udah kebuka nih, tinggal tweet aja!" });
  };
  
  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      toast({ title: "Udah ke-copy!", description: "Teks sharing udah masuk clipboard, tinggal paste aja!" });
    } catch (error) {
      toast({ title: "Waduh gagal copy", description: "Ada error nih, coba lagi yuk!", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Hasil */}
      <div className="text-center space-y-4">
        <span className="text-7xl">
          {hybridPersona?.emoji || primaryPersona.emoji}
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          You are {hybridPersona?.name ? `a ${hybridPersona.name}` : `The ${primaryPersona.name}`}!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {hybridPersona?.description || primaryPersona.vibe_description}
        </p>
      </div>

      {/* Konten detail hybrid atau primary */}
      {hybridPersona ? (
        <Card className="shadow-card border-2">
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
              {hybridPersona.perfect_roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="shadow-card border-2">
            <CardHeader>
              <CardTitle>Your Superpowers ✨</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {primaryPersona.superpowers.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-card border-2">
            <CardHeader>
              <CardTitle>Your Kryptonite  kryptonite 🔋</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {primaryPersona.kryptonite.map((k) => <li key={k}>{k}</li>)}
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-card border-2">
            <CardHeader>
              <CardTitle>Jurusan Tier List 🎓</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">S-Tier (Pasti Cocok)</h3>
                  <p className="text-muted-foreground">{primaryPersona.jurusan_s_tier.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">A-Tier (Patut Dicoba)</h3>
                  <p className="text-muted-foreground">{primaryPersona.jurusan_a_tier.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Hidden Gem (Jarang Dilirik)</h3>
                  <p className="text-muted-foreground">{primaryPersona.jurusan_hidden_gem.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Bagian Share */}
      <div className="border-t pt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">
          Flex persona lo ke temen-temen! (data pribadi aman kok)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button size="lg" variant="outline" onClick={shareToTwitter}>
            <Twitter className="mr-2 h-4 w-4" />
            Share di Twitter
          </Button>
          <Button size="lg" variant="outline" onClick={copyShareText}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Teks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KepoStarterResult;