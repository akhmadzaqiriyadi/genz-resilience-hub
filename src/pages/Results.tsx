import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateResults } from "@/utils/calculateResults";
import { TestResult } from "@/types/quiz";
import { Download, Share2, Home, Brain, Target, Users, Heart } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult | null>(null);

  useEffect(() => {
    const answersJson = sessionStorage.getItem('testAnswers');
    if (!answersJson) {
      navigate('/');
      return;
    }

    const answers = JSON.parse(answersJson);
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
  }, [navigate]);

  if (!results) {
    return null;
  }

  const chartData = results.pillarScores.map(pillar => ({
    pillar: pillar.name,
    value: pillar.percentage
  }));

  const getPillarIcon = (pillarName: string) => {
    switch (pillarName) {
      case 'Pola Pikir': return Brain;
      case 'Keterampilan Aksi': return Target;
      case 'Koneksi Sosial': return Users;
      case 'Kesejahteraan Diri': return Heart;
      default: return Brain;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'needs-improvement': return 'text-warning';
      case 'focus-area': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getLevelBg = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-success/10 border-success/50';
      case 'good': return 'bg-primary/10 border-primary/50';
      case 'needs-improvement': return 'bg-warning/10 border-warning/50';
      case 'focus-area': return 'bg-destructive/10 border-destructive/50';
      default: return 'bg-muted';
    }
  };

  const handleDownload = () => {
    // TODO: Implement PDF download
    alert('Fitur download akan segera hadir!');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('Fitur share akan segera hadir!');
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8 lg:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-success/10 text-success px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Hasil Tesmu Sudah Siap!
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {results.profileType}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {results.profileDescription}
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 shadow-card border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Skor Resiliensi Keseluruhan</p>
            <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {results.overallScore}%
            </div>
            <div className="w-full max-w-md mx-auto h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                style={{ width: `${results.overallScore}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Radar Chart */}
        <Card className="p-8 mb-8 shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Profil Resiliensi 4 Pilar
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="pillar" 
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Radar 
                  name="Resiliensi" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pillar Details */}
        <div className="space-y-6 mb-8">
          {results.pillarScores.map((pillar, index) => {
            const Icon = getPillarIcon(pillar.name);
            return (
              <Card 
                key={pillar.pillar}
                className="p-6 shadow-soft border-2 hover:shadow-card transition-all animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{pillar.name}</h3>
                        <p className={`text-sm font-semibold ${getLevelColor(pillar.level)}`}>
                          {pillar.level === 'excellent' && '⭐ Luar Biasa'}
                          {pillar.level === 'good' && '✅ Bagus'}
                          {pillar.level === 'needs-improvement' && '📈 Perlu Ditingkatkan'}
                          {pillar.level === 'focus-area' && '🎯 Area Fokus Utama'}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border-2 ${getLevelBg(pillar.level)}`}>
                      <span className={`text-2xl font-bold ${getLevelColor(pillar.level)}`}>
                        {pillar.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${
                        pillar.level === 'excellent' ? 'bg-success' :
                        pillar.level === 'good' ? 'bg-primary' :
                        pillar.level === 'needs-improvement' ? 'bg-warning' :
                        'bg-destructive'
                      }`}
                      style={{ width: `${pillar.percentage}%` }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-foreground leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Tips */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-3">💡 Tips untuk Kamu:</p>
                    <ul className="space-y-2">
                      {pillar.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold flex-shrink-0">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <Card className="p-8 shadow-card border-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground text-center">
              Langkah Selanjutnya
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleDownload}
                className="w-full"
              >
                <Download className="mr-2" />
                Download Hasil (PDF)
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleShare}
                className="w-full"
              >
                <Share2 className="mr-2" />
                Bagikan ke Teman
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigate('/')}
                className="w-full"
              >
                <Home className="mr-2" />
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Resources */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-4">
            Ingin mengembangkan resiliensimu lebih lanjut?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="link">
              📚 Baca Artikel Resiliensi
            </Button>
            <Button variant="link">
              🎥 Tonton Video Tips
            </Button>
            <Button variant="link">
              🎧 Dengarkan Podcast
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
