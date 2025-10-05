import { Answer, PillarScore, TestResult, PillarType } from '@/types/quiz';
import { questions } from '@/data/questions';

const pillarInfo = {
  mindset: {
    name: 'Pola Pikir',
    excellent: {
      description: 'Keren! Pola pikirmu sudah sangat kuat. Kamu melihat tantangan sebagai peluang untuk berkembang.',
      tips: [
        'Pertahankan mindset growth ini dengan terus mencatat pembelajaran dari setiap pengalaman',
        'Bagikan mindset positifmu dengan teman-teman untuk saling mendukung',
        'Tantang dirimu dengan project atau kegiatan baru yang stretch abilities-mu'
      ]
    },
    good: {
      description: 'Bagus! Kamu sudah punya fondasi mindset yang solid. Ada beberapa area yang bisa dikembangkan lebih lanjut.',
      tips: [
        'Praktikkan self-affirmation setiap pagi untuk memperkuat kepercayaan diri',
        'Baca buku atau artikel tentang growth mindset dan resiliensi',
        'Refleksikan setiap kegagalan: apa yang bisa dipelajari?'
      ]
    },
    'needs-improvement': {
      description: 'Mindsetmu masih bisa dikembangkan. Ini normal kok! Banyak orang perlu waktu untuk shift dari fixed ke growth mindset.',
      tips: [
        'Mulai dengan mengubah self-talk negatif menjadi pertanyaan: "Apa yang bisa aku pelajari?"',
        'Cari role model atau mentor yang bisa membagikan pengalaman mereka',
        'Set small wins setiap hari untuk membangun confidence secara bertahap'
      ]
    },
    'focus-area': {
      description: 'Ini adalah area fokus utama yang perlu kamu kembangkan. Pola pikir sangat mempengaruhi bagaimana kamu handle stress dan tantangan.',
      tips: [
        'Mulai jurnal gratitude: tulis 3 hal yang kamu syukuri setiap hari',
        'Practice reframing: ubah "Aku tidak bisa" menjadi "Aku belum bisa, tapi aku akan belajar"',
        'Cari support dari konselor atau psikolog jika merasa overwhelmed',
        'Ikuti workshop atau webinar tentang mental strength dan resiliensi'
      ]
    }
  },
  skills: {
    name: 'Keterampilan Aksi',
    excellent: {
      description: 'Luar biasa! Kamu sudah punya time management dan organizational skills yang solid.',
      tips: [
        'Eksplorasi productivity tools seperti Notion, Todoist, atau Google Calendar untuk optimize workflow',
        'Ajari teman-teman tentang teknik time management yang kamu pakai',
        'Challenge yourself dengan project yang lebih kompleks untuk level up skills'
      ]
    },
    good: {
      description: 'Bagus! Kamu sudah punya dasar yang baik. Tinggal konsisten dan refine sistem yang sudah kamu punya.',
      tips: [
        'Buat sistem to-do list yang konsisten (digital atau bullet journal)',
        'Coba teknik Pomodoro: 25 menit fokus, 5 menit break',
        'Review weekly: apa yang berhasil dan apa yang perlu diperbaiki?'
      ]
    },
    'needs-improvement': {
      description: 'Keterampilanmu dalam manage waktu dan tugas perlu diasah lebih lanjut. Ini skill yang bisa dipelajari!',
      tips: [
        'Start simple: buat priority list 3 hal penting setiap hari',
        'Set deadline pribadi 1-2 hari sebelum deadline sebenarnya',
        'Identifikasi distraction terbesar (social media?) dan set boundaries',
        'Gunakan habit tracker app untuk build consistency'
      ]
    },
    'focus-area': {
      description: 'Time management adalah area fokus utama. Di kuliah nanti, skill ini sangat critical untuk sukses.',
      tips: [
        'Buat schedule harian yang realistis dan stick to it selama 2 minggu',
        'Break down tugas besar jadi small actionable steps',
        'Set timer 15 menit untuk "just start" - ini akan help melawan prokrastinasi',
        'Cari accountability partner yang bisa saling mengingatkan',
        'Consider mengikuti workshop time management atau productivity'
      ]
    }
  },
  social: {
    name: 'Koneksi Sosial',
    excellent: {
      description: 'Wow! Support system dan kemampuan bersosialisasimu sudah sangat kuat. Ini adalah protective factor yang powerful.',
      tips: [
        'Pertahankan dan nurture hubungan-hubungan positif yang sudah ada',
        'Jadi connector: perkenalkan teman-temanmu satu sama lain',
        'Share pengalamanmu tentang building connections dengan yang lain'
      ]
    },
    good: {
      description: 'Bagus! Kamu punya foundation social connection yang solid. Ada ruang untuk expand circle lebih lanjut.',
      tips: [
        'Join komunitas atau club sesuai interest (online atau offline)',
        'Praktikkan active listening saat ngobrol dengan teman',
        'Reach out ke 1-2 orang setiap minggu untuk catch up'
      ]
    },
    'needs-improvement': {
      description: 'Koneksi sosialmu bisa diperkuat. Building support system itu penting untuk mental health.',
      tips: [
        'Start small: sapa 1 orang baru setiap hari',
        'Ikut kegiatan atau organisasi yang sesuai dengan interest',
        'Practice vulnerability: share perasaanmu dengan orang terpercaya',
        'Consider joining support group atau community online'
      ]
    },
    'focus-area': {
      description: 'Building social connection adalah area yang perlu fokus khusus. Feeling isolated bisa significantly impact well-being.',
      tips: [
        'Reach out ke keluarga atau old friend - reconnect dengan support system existing',
        'Pertimbangkan konseling untuk explore social anxiety jika ada',
        'Join online communities based on hobbies atau interests',
        'Set goal: attend 1 social event atau gathering setiap bulan',
        'Remember: asking for help adalah sign of strength, bukan weakness'
      ]
    }
  },
  wellbeing: {
    name: 'Kesejahteraan Diri',
    excellent: {
      description: 'Excellent! Kamu sudah punya self-care routine yang solid. Physical dan mental well-being adalah foundation untuk everything else.',
      tips: [
        'Maintain routine yang sudah ada - jangan compromise saat busy',
        'Explore mindfulness atau meditation untuk deepen self-awareness',
        'Share tips self-care-mu dengan teman yang mungkin struggling'
      ]
    },
    good: {
      description: 'Bagus! Kamu aware pentingnya kesejahteraan diri. Tinggal konsisten dengan routine yang sudah kamu bangun.',
      tips: [
        'Set sleep schedule yang konsisten (even di weekend)',
        'Jadwalkan minimal 30 menit setiap hari untuk aktivitas yang kamu enjoy',
        'Buat checklist self-care activities dan track progress'
      ]
    },
    'needs-improvement': {
      description: 'Kesejahteraan dirimu perlu lebih attention. Self-care bukan selfish - ini necessary untuk bisa perform well.',
      tips: [
        'Start dengan 1 habit: misalnya tidur 15 menit lebih awal',
        'Block time di kalender untuk me-time - treat it like important meeting',
        'Find 1 relaxation activity yang kamu nikmati (jalan, musik, art)',
        'Track energy level: identify apa yang drain vs yang recharge kamu'
      ]
    },
    'focus-area': {
      description: 'Kesejahteraan diri adalah area fokus utama. Tanpa physical dan mental energy, akan sulit untuk thrive di kuliah.',
      tips: [
        'Prioritaskan tidur 7-8 jam - set alarm untuk remind sleep time',
        'Start small dengan 10 menit stretching atau jalan santai setiap hari',
        'Kurangi screen time 30 menit sebelum tidur',
        'Identify stress triggers dan buat coping strategies',
        'Jangan ragu konsultasi dengan counselor atau healthcare professional jika perlu'
      ]
    }
  }
};

function getLevel(percentage: number): 'excellent' | 'good' | 'needs-improvement' | 'focus-area' {
  if (percentage >= 85) return 'excellent';
  if (percentage >= 70) return 'good';
  if (percentage >= 50) return 'needs-improvement';
  return 'focus-area';
}

export function calculateResults(answers: Answer[]): TestResult {
  const pillarScores: Record<PillarType, number> = {
    mindset: 0,
    skills: 0,
    social: 0,
    wellbeing: 0
  };

  const pillarCounts: Record<PillarType, number> = {
    mindset: 0,
    skills: 0,
    social: 0,
    wellbeing: 0
  };

  // Calculate scores for each pillar
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      // Reverse score if needed
      const score = question.isReversed ? (5 - answer.value) : answer.value;
      pillarScores[question.pillar] += score;
      pillarCounts[question.pillar]++;
    }
  });

  // Calculate percentages and create pillar score objects
  const pillarScoreObjects: PillarScore[] = Object.entries(pillarScores).map(([pillar, score]) => {
    const count = pillarCounts[pillar as PillarType];
    const maxScore = count * 4; // Maximum possible score
    const percentage = Math.round((score / maxScore) * 100);
    const level = getLevel(percentage);
    const info = pillarInfo[pillar as PillarType];

    return {
      pillar: pillar as PillarType,
      name: info.name,
      score,
      percentage,
      level,
      description: info[level].description,
      tips: info[level].tips
    };
  });

  // Calculate overall score
  const totalScore = Object.values(pillarScores).reduce((a, b) => a + b, 0);
  const maxTotalScore = answers.length * 4;
  const overallScore = Math.round((totalScore / maxTotalScore) * 100);

  // Determine profile type
  let profileType = '';
  let profileDescription = '';

  if (overallScore >= 85) {
    profileType = 'Sang Pejuang Tangguh 💪';
    profileDescription = 'Luar biasa! Kamu sudah punya fondasi resiliensi yang sangat kuat. Kamu siap menghadapi tantangan kuliah dengan confidence dan mental strength yang solid.';
  } else if (overallScore >= 70) {
    profileType = 'Sang Adaptor Hebat 🌟';
    profileDescription = 'Bagus sekali! Kamu punya resiliensi yang baik dengan beberapa area yang bisa dikembangkan lebih lanjut. Dengan sedikit improvement, kamu akan siap untuk thrive di kuliah!';
  } else if (overallScore >= 50) {
    profileType = 'Sang Pembelajar Potensial 🌱';
    profileDescription = 'Kamu dalam perjalanan yang baik! Ada beberapa area yang perlu fokus khusus, tapi kamu sudah menunjukkan kesadaran dan kemauan untuk berkembang.';
  } else {
    profileType = 'Sang Pembangun Fondasi 🏗️';
    profileDescription = 'Terima kasih sudah jujur dalam tes ini! Hasilmu menunjukkan ada beberapa area penting yang perlu dikembangkan sebelum kuliah. Tapi tenang, awareness ini adalah langkah pertama yang powerful!';
  }

  return {
    overallScore,
    pillarScores: pillarScoreObjects,
    profileType,
    profileDescription
  };
}
