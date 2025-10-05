import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Users, Heart, Target } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Pola Pikir",
      description: "Ukur mindset growth dan resiliensi mentalmu"
    },
    {
      icon: Target,
      title: "Keterampilan Aksi",
      description: "Evaluasi kemampuan time management dan goal setting"
    },
    {
      icon: Users,
      title: "Koneksi Sosial",
      description: "Cek support system dan kemampuan bersosialisasi"
    },
    {
      icon: Heart,
      title: "Kesejahteraan Diri",
      description: "Analisis kesehatan mental dan self-care routine"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    Tes Resiliensi Gen Z
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Siap Hadapi Tantangan Kuliah?
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Cek level resiliensimu di sini! Tes singkat ini akan membantumu mengenali kekuatan mentalmu dan memberikanmu starter pack untuk menjadi mahasiswa tangguh.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => navigate('/test')}
                  className="group"
                >
                  Mulai Tes Sekarang
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="font-semibold"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">2,500+</span> siswa telah mengikuti tes
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img 
                  src={heroImage} 
                  alt="Mahasiswa yang beragam dan ceria di kampus" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">20 Pertanyaan</p>
                    <p className="text-sm text-muted-foreground">Selesai dalam 5 menit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              4 Pilar Resiliensi yang Diukur
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tes komprehensif yang menganalisis berbagai aspek kesiapan mentalmu untuk kuliah
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-card transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-2xl p-12 text-center shadow-card">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Yuk, Mulai Perjalananmu!
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Gratis, cepat, dan langsung dapat hasil lengkap dengan tips personalisasi
            </p>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => navigate('/test')}
              className="group"
            >
              Ambil Tes Sekarang
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
