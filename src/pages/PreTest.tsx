// src/pages/PreTest.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PreTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [keyError, setKeyError] = useState("");

  const handleSorcererTestClick = () => {
    setIsDialogOpen(true);
  };

  const handleAccessKeySubmit = () => {
    // Validasi kunci akses (hardcoded untuk sekarang, bisa diganti dengan API call)
    if (accessKey.toUpperCase() === "SOCINT25") {
      setKeyError("");
      setIsDialogOpen(false);
      navigate('/test?quiz=data-sorcerer-test');
    } else {
      setKeyError("Kunci akses salah. Coba lagi!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">Pilih Tes yang Cocok Buat Kamu</h1>
            <p className="text-muted-foreground mt-2">Setiap fase hidupmu butuh jawaban yang beda. Kami punya semuanya.</p>
          </header>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Kepo Starter Pack */}
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
                  onClick={() => navigate('/test?quiz=kepo-starter-pack')}
                >
                  Coba Gratis
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Data Sorcerer Test */}
            <Card className="shadow-card animate-fade-in border-2 border-amber-500/20 ring-2 ring-amber-400">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-foreground">Data Sorcerer Test</CardTitle>
                  <Badge variant="destructive" className="text-sm py-1 px-3 bg-amber-500 text-white border-amber-500">KHUSUS</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">Untuk Calon Internship</p>
                <p className="text-foreground text-sm">
                  Tes peminatan untuk mengungkap "sihir teknologi" dalam dirimu. Temukan peran idealmu di dunia AI dan Data.
                </p>
                 <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>Pemetaan Faksi RIASEC</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>Rekomendasi Peran Hibrida</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full group bg-amber-500 hover:bg-amber-600"
                  size="lg"
                  onClick={handleSorcererTestClick}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Mulai Tes
                </Button>
              </CardFooter>
            </Card>

            {/* Passion Pathfinder - disabled */}
            <Card className="shadow-card opacity-60 pointer-events-none border" role="group" aria-disabled="true">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-muted-foreground">Passion Pathfinder</CardTitle>
                   <Badge variant="secondary" className="text-sm py-1 px-3">SEGERA HADIR</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                 <p className="text-sm font-semibold text-muted-foreground">Buat Calon Mahasiswa</p>
                <p className="text-muted-foreground text-sm">
                  Tes mendalam untuk memetakan minat dan bakat terpendam. Dapatkan rekomendasi jurusan yang paling sesuai dengan potensimu.
                </p>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" size="lg" disabled>
                    Segera Hadir
                 </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog untuk Kunci Akses */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Masukkan Kunci Akses</DialogTitle>
            <DialogDescription>
              Tes ini khusus untuk undangan. Silakan masukkan kunci yang telah diberikan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              id="access-key"
              placeholder="Contoh: DSCINT20"
              value={accessKey}
              onChange={(e) => {
                setAccessKey(e.target.value);
                setKeyError("");
              }}
              className={keyError ? "border-destructive" : ""}
            />
            {keyError && <p className="text-sm text-destructive">{keyError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleAccessKeySubmit}>Lanjutkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreTest;