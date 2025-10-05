import { Question } from '@/types/quiz';

export const questions: Question[] = [
  // Pola Pikir (Mindset) - 5 pertanyaan
  {
    id: 1,
    pillar: 'mindset',
    text: 'Saat aku gagal dalam ujian, aku melihatnya sebagai kesempatan untuk belajar dan berkembang',
    isReversed: false
  },
  {
    id: 2,
    pillar: 'mindset',
    text: 'Aku yakin kemampuan dan kecerdasanku bisa terus berkembang dengan usaha',
    isReversed: false
  },
  {
    id: 3,
    pillar: 'mindset',
    text: 'Ketika menghadapi tugas yang sulit, aku cenderung menyerah dengan cepat',
    isReversed: true
  },
  {
    id: 4,
    pillar: 'mindset',
    text: 'Aku merasa tantangan baru adalah hal yang menarik, bukan menakutkan',
    isReversed: false
  },
  {
    id: 5,
    pillar: 'mindset',
    text: 'Kritik atau feedback membuatku merasa down dan tidak berharga',
    isReversed: true
  },

  // Keterampilan Aksi (Actionable Skills) - 5 pertanyaan
  {
    id: 6,
    pillar: 'skills',
    text: 'Aku membuat jadwal atau to-do list untuk menyelesaikan tugasku',
    isReversed: false
  },
  {
    id: 7,
    pillar: 'skills',
    text: 'Aku bisa memprioritaskan tugas-tugas penting vs yang tidak mendesak',
    isReversed: false
  },
  {
    id: 8,
    pillar: 'skills',
    text: 'Aku sering prokrastinasi dan menunda pekerjaan sampai deadline',
    isReversed: true
  },
  {
    id: 9,
    pillar: 'skills',
    text: 'Aku punya strategi untuk tetap fokus saat belajar (misal: teknik pomodoro)',
    isReversed: false
  },
  {
    id: 10,
    pillar: 'skills',
    text: 'Aku sulit membagi waktu antara belajar, hobi, dan istirahat',
    isReversed: true
  },

  // Koneksi Sosial (Social Connection) - 5 pertanyaan
  {
    id: 11,
    pillar: 'social',
    text: 'Aku punya teman atau keluarga yang bisa aku ajak bicara saat merasa stres',
    isReversed: false
  },
  {
    id: 12,
    pillar: 'social',
    text: 'Aku merasa nyaman meminta bantuan saat menghadapi kesulitan',
    isReversed: false
  },
  {
    id: 13,
    pillar: 'social',
    text: 'Aku cenderung menyimpan masalah sendiri dan tidak bercerita ke siapa pun',
    isReversed: true
  },
  {
    id: 14,
    pillar: 'social',
    text: 'Aku aktif terlibat dalam kegiatan kelompok atau organisasi',
    isReversed: false
  },
  {
    id: 15,
    pillar: 'social',
    text: 'Aku merasa kesepian dan tidak punya orang yang benar-benar mengerti aku',
    isReversed: true
  },

  // Kesejahteraan Diri (Well-being) - 5 pertanyaan
  {
    id: 16,
    pillar: 'wellbeing',
    text: 'Aku memastikan tidur cukup (7-8 jam) hampir setiap malam',
    isReversed: false
  },
  {
    id: 17,
    pillar: 'wellbeing',
    text: 'Aku punya kegiatan yang aku nikmati untuk relaksasi (olahraga, hobi, dll)',
    isReversed: false
  },
  {
    id: 18,
    pillar: 'wellbeing',
    text: 'Aku sering merasa kelelahan fisik dan mental',
    isReversed: true
  },
  {
    id: 19,
    pillar: 'wellbeing',
    text: 'Aku memperhatikan pola makan dan olahraga secara teratur',
    isReversed: false
  },
  {
    id: 20,
    pillar: 'wellbeing',
    text: 'Aku jarang punya waktu untuk diri sendiri atau me-time',
    isReversed: true
  }
];
