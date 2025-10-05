// src/pages/About.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Heart, Brain, Award, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Analisis Mendalam",
      description: "Tes berdasarkan penelitian psikologi modern untuk mengukur resiliensi mental Gen Z"
    },
    {
      icon: Target,
      title: "Hasil Akurat",
      description: "Algoritma canggih yang memberikan insight tentang kekuatan dan area pengembangan"
    },
    {
      icon: Users,
      title: "Dukungan Komunitas",
      description: "Bergabung dengan ribuan Gen Z lainnya dalam perjalanan pengembangan diri"
    },
    {
      icon: Heart,
      title: "Pendekatan Holistik",
      description: "Menilai berbagai aspek kehidupan untuk memberikan gambaran menyeluruh"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Pengguna Aktif" },
    { number: "95%", label: "Tingkat Kepuasan" },
    { number: "4.8/5", label: "Rating Aplikasi" },
    { number: "24/7", label: "Dukungan" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Tentang <span className="text-primary">testGenZ</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Platform pertama di Indonesia yang khusus dirancang untuk mengukur dan meningkatkan 
            resiliensi mental Gen Z dalam menghadapi tantangan hidup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="hero">
              <Link to="/test">Mulai Tes Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Misi Kami
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Kami percaya bahwa setiap Gen Z memiliki potensi luar biasa untuk berkembang 
                dan menghadapi tantangan hidup dengan resiliensi yang kuat. TestGenZ hadir 
                sebagai teman perjalanan yang membantu kamu memahami diri sendiri lebih dalam.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dengan pendekatan yang fun, modern, dan berbasis sains, kami membantu 
                mengidentifikasi kekuatan unik setiap individu dan memberikan roadmap 
                pengembangan yang personal.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-primary p-8 rounded-2xl shadow-card">
                <div className="grid grid-cols-2 gap-6 text-center text-primary-foreground">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold mb-2">{stat.number}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Mengapa Pilih testGenZ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami menggabungkan teknologi terdepan dengan pemahaman mendalam tentang 
              karakteristik unik generasi Z
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl p-12 shadow-card">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Lightbulb className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Visi Kami
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Menjadi platform #1 di Indonesia yang membantu Gen Z membangun fondasi 
              mental yang kuat untuk meraih impian dan menghadapi masa depan dengan 
              percaya diri. Kami ingin setiap anak muda Indonesia memiliki tools dan 
              insights yang dibutuhkan untuk berkembang maksimal.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-2xl p-12 text-center shadow-card">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Siap Memulai Perjalanan?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Bergabunglah dengan ribuan Gen Z lainnya yang sudah memulai perjalanan 
              pengembangan diri mereka
            </p>
            <Button asChild size="xl" variant="secondary">
              <Link to="/register">Daftar Gratis Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
