// src/pages/Index.tsx

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Zap, MapPin} from "lucide-react";
import heroSvg from "/hero.png";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      image: "/images/pilar/pilar1.svg",
      title: "Pola Pikir",
      description: "Ukur mindset growth dan resiliensi mentalmu",
    },
    {
      image: "/images/pilar/pilar2.svg",
      title: "Keterampilan Aksi",
      description: "Evaluasi kemampuan time management dan goal setting",
    },
    {
      image: "/images/pilar/pilar3.svg",
      title: "Koneksi Sosial",
      description: "Cek support system dan kemampuan bersosialisasi",
    },
    {
      image: "/images/pilar/pilar4.svg",
      title: "Kesejahteraan Diri",
      description: "Analisis kesehatan mental dan self-care routine",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: Play,
      title: "Pilih & Ikuti Tes",
      description:
        "Pilih paket tes yang paling sesuai dengan kegalauanmu saat ini. Jawab 25 pertanyaan dengan jujur, santai aja!",
    },
    {
      number: "02",
      icon: Zap,
      title: "Dapatkan Hasil Instan",
      description:
        "Begitu selesai, laporan lengkap dan detail langsung muncul di layarmu. Gak perlu nunggu berhari-hari.",
    },
    {
      number: "03",
      icon: MapPin,
      title: "Rencanakan Langkahmu",
      description:
        "Gunakan hasil analisis dan rekomendasi dari kami sebagai panduan untuk mengambil keputusan penting soal masa depanmu.",
    },
  ];

  const faqs = [
    {
      question: "Seberapa akurat hasil tes di sini?",
      answer:
        "Sangat akurat! Tes kami disusun berdasarkan teori-teori psikologi yang teruji (seperti Holland Codes, Big Five Personality, dll) dan divalidasi oleh tim psikolog profesional kami. Tentu saja, keakuratan hasil juga tergantung pada kejujuranmu saat menjawab.",
    },
    {
      question: "Apa bedanya tes gratis dan berbayar?",
      answer:
        "Tes gratis (Kepo Starter Pack) memberikan gambaran umum dan ringkas. Tes berbayar memberikan analisis yang jauh lebih mendalam, laporan komprehensif, dan rekomendasi yang lebih spesifik dan personal.",
    },
    {
      question: "Berapa lama waktu untuk mengerjakan satu tes?",
      answer:
        "Rata-rata sekitar 15-20 menit. Tidak ada batasan waktu, jadi kamu bisa mengerjakannya dengan santai agar bisa menjawab dengan maksimal.",
    },
    {
      question: "Apakah data saya aman?",
      answer:
        "Tentu saja. Kami sangat menjaga privasi dan kerahasiaan datamu. Semua hasil tes bersifat personal dan tidak akan dibagikan kepada pihak ketiga tanpa seizinmu.",
    },
  ];

  const whyChooseUs = [
    {
      title: "Dibuat oleh Profesional",
      description:
        "Soal-soal kami disusun oleh psikolog berpengalaman, jadi hasilnya dijamin akurat dan bisa dipertanggungjawabkan.",
    },
    {
      title: "Relevan buat Gen Z",
      description:
        "Bahasa dan studi kasusnya nyambung banget sama kehidupanmu. Gak kaku, gak ngebosenin!",
    },
    {
      title: "Hasil Cepat & Detail",
      description:
        "Gak perlu nunggu lama. Hasil tes lengkap dengan rekomendasi praktis langsung jadi setelah kamu selesai.",
    },
  ];

  const satisfactionData = [
    { name: "Sangat Puas", value: 80, key: "sangat-puas" },
    { name: "Puas", value: 15, key: "puas" },
    { name: "Cukup Puas", value: 5, key: "cukup-puas" },
  ];

  const chartConfig = {
    "sangat-puas": { label: "Sangat Puas", color: "hsl(200 100% 45%)" },
    puas: { label: "Puas", color: "hsl(200 100% 70%)" },
    "cukup-puas": { label: "Cukup Puas", color: "hsl(200 50% 65%)" },
  } satisfies ChartConfig;

  // Fungsi untuk render label dengan nama dan persentase
  const renderCustomLabel = (entry: any) => {
    return `${entry.name} ${entry.value}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                Stop Galau. <br />{" "}
                <span className="text-sky-400">Pahami Dirimu,</span>
                <br />
                Tentukan Masa Depanmu.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Psikotes online berbasis sains yang dirancang khusus buat Gen Z.
                Temukan jurusan, karier, dan potensi tersembunyimu lewat cara
                yang seru dan relevan.
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                className="bg-sky-400 hover:bg-sky-500 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                onClick={() => navigate("/pre-test")}
              >
                Mulai tes sekarang
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg font-semibold rounded-full transition-all hover:text-secondary"
                onClick={() => navigate("/pre-test")}
              >
                Pelajari lebih lanjut
              </Button>
            </div>
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
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
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              4 Pilar Resiliensi yang Diukur
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tes komprehensif yang menganalisis berbagai aspek kesiapan
              mentalmu untuk kuliah
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-card transition-all hover:-translate-y-1 animate-fade-in h-64 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[60%]">
                    {feature.description}
                  </p>
                </div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute -bottom-2 -right-12 w-64 h-auto object-contain z-0 opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Pilih testGenZ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Kenapa Pilih testGenZ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Kami bukan psikotes biasa. Kami teman seperjuanganmu.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <img src="/cheklist.svg" alt="checklist" className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-b-xl rounded-r-xl shadow-soft border border-border flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex flex-col items-center justify-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[350px] w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={satisfactionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    strokeWidth={5}
                    label={renderCustomLabel}
                    labelLine={true}
                  >
                    {satisfactionData.map((entry) => (
                      <Cell
                        key={entry.key}
                        fill={`var(--color-${entry.key})`}
                      />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="-mt-4"
                  />
                </PieChart>
              </ChartContainer>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Diagram Kepuasan Pengguna
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Langkah Simpel Section */}
      <section className="container mx-auto px-4 py-20 dark:bg-slate-900/50">
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
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/60 to-primary/20 -translate-x-4 z-0"></div>
                )}
                <div className="relative bg-card p-8 rounded-2xl shadow-soft border border-border hover:shadow-card transition-all group-hover:-translate-y-2 z-10 h-full flex flex-col">
                  <div className="absolute -top-4 -left-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold text-primary-foreground">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
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
          <div className="text-center mt-12">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/pre-test")}
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
          <div className="bg-white/50 rounded-2xl shadow-soft border border-border p-6 lg:p-8">
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
            <Button variant="outline" onClick={() => navigate("/about")}>
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;