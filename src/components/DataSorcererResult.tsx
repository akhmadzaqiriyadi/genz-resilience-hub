// src/components/DataSorcererResult.tsx

import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RiaPillar } from "@/types/quiz";

// Definisikan tipe data untuk props
interface DataSorcererResultProps {
  scores: Record<RiaPillar, number>;
}

// Data pemetaan dari PDF (Faksi Primer, Sekunder, Tersier)
const roleMapping: Record<string, { code: string, roles: string[] }> = {
  IAR: { code: "IAR", roles: ["GenAI Developer"] },
  IAE: { code: "IAE", roles: ["Data Scientist"] },
  IRC: { code: "IRC", roles: ["Machine Learning Engineer"] },
  // Tambahkan semua 15 peran dari Tabel 1 di PDF di sini...
  // Contoh:
  // ISA: { code: "ISA", roles: ["UX Researcher"] },
  // ARI: { code: "ARI", roles: ["UI Designer"] },
};

const DataSorcererResult = ({ scores }: DataSorcererResultProps) => {
  // Urutkan skor dari tertinggi ke terendah
  const sortedPillars = (Object.keys(scores) as RiaPillar[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  
  const hollandCode = sortedPillars.slice(0, 3).join('');
  const primaryArchetype = roleMapping[hollandCode]?.roles[0] || "Arketipe Unik";

  // Data untuk grafik radar
  const chartData = Object.entries(scores).map(([pillar, score]) => ({
    pillar,
    score,
  }));

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          Congrats! Arketipe Al-mu adalah
          <br />
          <span className="text-primary">{primaryArchetype} ({hollandCode})</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Kamu adalah seorang Codebreaker sejati dengan sentuhan kreatif. Kamu tidak hanya mencari kebenaran dalam data, tapi juga bisa membangun cerita dan model yang *game-changing*.
        </p>
      </div>

      <Card className="shadow-card border-2">
        <CardHeader>
          <CardTitle>Spektrum Kekuatan RIASEC-mu</CardTitle>
          <CardDescription>
            Grafik ini memvisualisasikan profil minatmu. Semakin jauh titik dari pusat, semakin kuat minatmu di area tersebut.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-4">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
            <RadarChart data={chartData}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <PolarGrid />
              <PolarAngleAxis dataKey="pillar" />
              <PolarRadiusAxis angle={30} domain={[0, Math.max(...Object.values(scores), 10)]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Placeholder untuk Hybrid Roles */}
      <Card className="shadow-card border-2">
         <CardHeader>
           <CardTitle>3 Peran Hibrida Teratas</CardTitle>
           <CardDescription>
             Selain arketipe utamamu, ini dia 3 combo peran lain yang paling cocok dengan *vibe* kamu.
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            {/* Logika untuk menghitung dan menampilkan peran hibrida akan ditambahkan di sini */}
            <p className="text-muted-foreground">Fitur peran hibrida akan segera hadir untuk melengkapi hasilmu!</p>
         </CardContent>
      </Card>

    </div>
  );
};

export default DataSorcererResult;