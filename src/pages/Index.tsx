import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Users, Heart, Target, Play, Zap, MapPin } from "lucide-react";
import heroSvg from "/hero.svg";

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

  const steps = [
    {
      number: "01",
      icon: Play,
      title: "Pilih & Ikuti Tes",
      description: "Pilih paket tes yang paling sesuai dengan kegalauanmu saat ini. Jawab 25 pertanyaan dengan jujur, santai aja!"
    },
    {
      number: "02",
      icon: Zap,
      title: "Dapatkan Hasil Instan",
      description: "Begitu selesai, laporan lengkap dan detail langsung muncul di layarmu. Gak perlu nunggu berhari-hari."
    },
    {
      number: "03",
      icon: MapPin,
      title: "Rencanakan Langkahmu",
      description: "Gunakan hasil analisis dan rekomendasi dari kami sebagai panduan untuk mengambil keputusan penting soal masa depanmu."
    }
  ];

  const faqs = [
    {
      question: "Seberapa akurat hasil tes di sini?",
      answer: "Sangat akurat! Tes kami disusun berdasarkan teori-teori psikologi yang teruji (seperti Holland Codes, Big Five Personality, dll) dan divalidasi oleh tim psikolog profesional kami. Tentu saja, keakuratan hasil juga tergantung pada kejujuranmu saat menjawab."
    },
    {
      question: "Apa bedanya tes gratis dan berbayar?",
      answer: "Tes gratis (Kepo Starter Pack) memberikan gambaran umum dan ringkas. Tes berbayar memberikan analisis yang jauh lebih mendalam, laporan komprehensif, dan rekomendasi yang lebih spesifik dan personal."
    },
    {
      question: "Berapa lama waktu untuk mengerjakan satu tes?",
      answer: "Rata-rata sekitar 15-20 menit. Tidak ada batasan waktu, jadi kamu bisa mengerjakannya dengan santai agar bisa menjawab dengan maksimal."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Tentu saja. Kami sangat menjaga privasi dan kerahasiaan datamu. Semua hasil tes bersifat personal dan tidak akan dibagikan kepada pihak ketiga tanpa seizinmu."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Hero Heading */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
                Stop Galau. <span className="text-sky-400">Pahami Dirimu,</span>
                <br />
                Tentukan Masa Depanmu.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Psikotes online berbasis sains yang dirancang khusus buat Gen Z. Temukan jurusan, karier, 
                dan potensi tersembunyimu lewat cara yang seru dan relevan.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button 
                className="bg-sky-400 hover:bg-sky-500 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                onClick={() => navigate('/pre-test')}
              >
                Mulai tes sekarang
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg font-semibold rounded-full transition-all hover:text-secondary"
                onClick={() => navigate('/pre-test')}
              >
                Pelajari lebih lanjut
              </Button>
            </div>

            {/* Hero Illustration */}
            <div className="relative mt-12 animate-fade-in border-b-2 border-primary" style={{ animationDelay: '0.4s' }}>
              <div className="relative max-w-6xl mx-auto">
                <img 
                  src={heroSvg} 
                  alt="Diverse group of happy students celebrating together" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-50">
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
                className="bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-card transition-all hover:-translate-y-1 animate-fade-in h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Langkah Simpel Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Cuma 3 Langkah Simpel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gak ribet, gak pake lama. Langsung dapet pencerahan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/60 to-primary/20 -translate-x-4 z-0"></div>
                )}
                
                <div className="relative bg-card p-8 rounded-2xl shadow-soft border border-border hover:shadow-card transition-all group-hover:-translate-y-2 z-10 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4 flex-grow flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/pre-test')}
              className="group"
            >
              Mulai Langkah Pertama
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Yang Sering Ditanyain (FAQ)
            </h2>
            <p className="text-lg text-muted-foreground">
              Masih ada yang bikin penasaran? Cek di sini.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-soft border border-border p-6 lg:p-8">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 py-2 hover:bg-muted/50 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Masih ada pertanyaan lain? Jangan ragu untuk bertanya!
            </p>
            <Button 
              variant="outline"
              onClick={() => navigate('/about')}
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
