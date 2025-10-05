// src/pages/PreTest.tsx

import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const PreTest = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Pilih Tes yang Cocok Buat Kamu</h1>
          <p className="text-muted-foreground mt-2">Setiap fase hidupmu butuh jawaban yang beda. Kami punya semuanya.</p>
        </header>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Kepo Starter Pack - available */}
          <Card className="shadow-card animate-fade-in border-2 border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-foreground">Kepo Starter Pack</CardTitle>
                <Badge variant="outline" className="text-sm py-1 px-3 border-primary text-primary">GRATIS</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Buat Anak SMA/SMK</p>
              <p className="text-foreground text-sm">
                Coba-coba tes dasar untuk tau gambaran awal kepribadian dan minat belajarmu. Cocok buat yang masih nge-blank.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>Rekomendasi 3 Jurusan Teratas</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span>Analisis Kepribadian Ringkas</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full group"
                size="lg"
                onClick={() => navigate('/test')}
              >
                Coba Gratis
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>

          {/* Passion Pathfinder - disabled */}
          <Card className="shadow-card opacity-60 pointer-events-none border" role="group" aria-disabled="true">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-muted-foreground">Passion Pathfinder</CardTitle>
                <Badge variant="secondary" className="text-sm py-1 px-3">PALING LARIS</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Buat Calon Mahasiswa</p>
              <p className="text-muted-foreground text-sm">
                Tes mendalam untuk memetakan minat dan bakat terpendam. Dapatkan rekomendasi jurusan yang paling sesuai dengan potensimu.
              </p>
              <ul className="space-y-2 pt-2 text-muted-foreground">
                <li>● Peta Minat & Bakat Lengkap</li>
                <li>● Top 10 Rekomendasi Jurusan</li>
                <li>● Analisis Gaya Belajar</li>
              </ul>
            </CardContent>
            <CardFooter>
              <button className="w-full bg-muted text-muted-foreground py-2 rounded-md cursor-not-allowed" aria-disabled>
                Lihat Detail
              </button>
            </CardFooter>
          </Card>

          {/* Future Unlock - disabled */}
          <Card className="shadow-card opacity-60 pointer-events-none border" role="group" aria-disabled="true">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-muted-foreground">Future Unlock</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Buat Mahasiswa Aktif</p>
              <p className="text-muted-foreground text-sm">
                Bingung pilih peminatan di jurusanmu? Tes ini bantu kamu menemukan spesialisasi yang paling 'kamu banget' dan prospek kariernya.
              </p>
              <ul className="space-y-2 pt-2 text-muted-foreground">
                <li>● Rekomendasi Peminatan Jurusan</li>
                <li>● Profil Karier Sesuai Peminatan</li>
                <li>● Analisis Skill & Kompetensi</li>
              </ul>
            </CardContent>
            <CardFooter>
              <button className="w-full bg-muted text-muted-foreground py-2 rounded-md cursor-not-allowed" aria-disabled>
                Lihat Detail
              </button>
            </CardFooter>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">Setiap tes premium berisi 25 pertanyaan yang disusun secara profesional.</p>
      </div>
    </div>
  );
};

export default PreTest;
