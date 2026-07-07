import type { SleepRecord, UserProfile } from "@/lib/types";

export const sleepData: SleepRecord[] = [
  { id: "1", date: "2025-06-20", sleepTime: "22:30", wakeTime: "06:30", duration: 8, quality: "Excellent" },
  { id: "2", date: "2025-06-21", sleepTime: "23:00", wakeTime: "06:00", duration: 7, quality: "Good" },
  { id: "3", date: "2025-06-22", sleepTime: "00:30", wakeTime: "06:30", duration: 6, quality: "Fair" },
  { id: "4", date: "2025-06-23", sleepTime: "22:00", wakeTime: "06:00", duration: 8, quality: "Excellent" },
  { id: "5", date: "2025-06-24", sleepTime: "01:00", wakeTime: "05:30", duration: 4.5, quality: "Poor" },
  { id: "6", date: "2025-06-25", sleepTime: "22:45", wakeTime: "06:15", duration: 7.5, quality: "Good" },
  { id: "7", date: "2025-06-26", sleepTime: "23:15", wakeTime: "06:45", duration: 7.5, quality: "Good" },
];

export const fitTestData = {
  reactionInstructions: "Klik tombol segera setelah layar berubah hijau!",
  focusInstructions: "Hitung jumlah kotak biru dalam grid!",
  sleepinessQuestions: [
    "Seberapa mengantuk Anda saat ini?",
    "Seberapa sulit fokus pada jalan?",
    "Apakah mata Anda mulai terasa berat?",
    "Seberapa sering Anda menguap?",
    "Apakah Anda merasa ingin tidur?",
  ],
};

export const faceMonitorData = {
  blinkRate: 18,
  yawnEvents: [
    { time: "14:32", type: "yawn" },
    { time: "14:45", type: "yawn" },
    { time: "15:02", type: "yawn" },
  ],
};

export const defaultProfile: UserProfile = {
  name: "Andi Pratama",
  email: "andi.pratama@email.com",
  age: 28,
  gender: "Laki-laki",
  bloodType: "O",
  phone: "+62 812 3456 7890",
};

export const sosContacts = [
  { id: "1", name: "RSUD Kanujoso Djatikusumo", phone: "+62 542 123 456", relationship: "Rumah Sakit" },
  { id: "2", name: "Polisi", phone: "110", relationship: "Emergency" },
  { id: "3", name: "Ibu", phone: "+62 813 9876 5432", relationship: "Keluarga" },
  { id: "4", name: "Budi (Teman)", phone: "+62 857 1111 2222", relationship: "Teman" },
];

export const smartwatchData = {
  heartRate: 72,
  heartRateHistory: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    value: Math.floor(60 + Math.random() * 30),
  })),
  sleepScore: 78,
  steps: 8432,
  stepsGoal: 10000,
  stressLevel: 4,
  battery: 85,
  calories: 1847,
};

export const guideArticles = [
  {
    id: "1",
    title: "Cara Menghindari Microsleep",
    summary: "Microsleep adalah tidur singkat yang terjadi tanpa disadari. Pelajari cara menghindarinya saat berkendara.",
    content: "Microsleep adalah kondisi di mana otak 'mematikan' diri sejenak selama beberapa detik hingga puluhan detik. Kondisi ini sangat berbahaya saat berkendara karena Anda bisa kehilangan kendali kendaraan tanpa sadar.",
    tips: [
      "Pastikan tidur cukup 7-8 jam sebelum berkendara",
      "Istirahat minimal setiap 2 jam saat perjalanan jauh",
      "Hindari mengemudi larut malam (22:00 - 06:00)",
      "Minum kopi atau teh sebelum perjalanan panjang",
      "Jika merasa mengantuk, SEGERA berhenti dan tidur 15-20 menit",
      "Buka jendela untuk udara segar (tapi jangan andalkan ini saja)",
      "Gunakan fitur Face Monitor untuk memantau kantuk",
    ],
    category: "Safety",
    thumbnail: "",
  },
  {
    id: "2",
    title: "Tips Berkendara Malam",
    summary: "Berkendara malam hari memiliki risiko lebih tinggi. Berikut tips agar perjalanan malam Anda aman.",
    content: "Berkendara malam memiliki tantangan tersendiri: visibilitas rendah, kelelahan lebih cepat, dan risiko microsleep lebih tinggi. Data menunjukkan 40% kecelakaan fatal terjadi di malam hari.",
    tips: [
      "Gunakan lampu jarak jauh dengan bijak, matikan saat ada kendaraan dari arah berlawanan",
      "Pastikan semua lampu kendaraan berfungsi dengan baik",
      "Kurangi kecepatan karena visibilitas terbatas",
      "Jangan mengemudi setelah jam 10 malam jika tidak mendesak",
      "Siapkan musik atau podcast untuk tetap terjaga",
      "Hindari menatap lampu kendaraan lawan arah secara langsung",
      "Gunakan kaca spion anti-silau jika tersedia",
    ],
    category: "Tips",
    thumbnail: "",
  },
  {
    id: "3",
    title: "Waktu Istirahat Ideal",
    summary: "Mengetahui waktu istirahat yang tepat dapat membantu menjaga kewaspadaan saat berkendara.",
    content: "Istirahat yang teratur adalah kunci keselamatan saat berkendara jarak jauh. Tubuh manusia tidak dirancang untuk duduk dan fokus dalam waktu lama tanpa jeda.",
    tips: [
      "Istirahat minimal setiap 2 jam atau 150 km perjalanan",
      "Waktu istirahat terbaik: antara jam 10 pagi - 2 siang",
      "Hindari istirahat terlalu lama (maksimal 30 menit)",
      "Selama istirahat, KELUAR dari kendaraan dan regangkan tubuh",
      "Minum air putih minimal 500ml setiap kali istirahat",
      "Jangan gunakan HP saat istirahat untuk menjaga mata",
      "Cari rest area atau tempat yang aman untuk berhenti",
    ],
    category: "Health",
    thumbnail: "",
  },
  {
    id: "4",
    title: "Bahaya Mengemudi Saat Mengantuk",
    summary: "Mengantuk saat mengemudi sama berbahayanya dengan mabuk. Kenali tanda-tandanya.",
    content: "Mengantuk saat mengemudi menyebabkan 20% kecelakaan fatal di Indonesia. Efeknya sama berbahayanya dengan mengemudi dalam keadaan mabuk. Bahkan kedipan mata yang melambat sudah menjadi tanda bahaya.",
    tips: [
      "Kenali tanda-tanda: mata berat, sulit fokus, sering menguap",
      "Jika mata mulai terasa berat, SEGERA berhenti di tempat aman",
      "Tidur 20 menit dapat memulihkan kewaspadaan hingga 90%",
      "Gunakan alarm pengingat untuk beristirahat",
      "Hindari mengemudi setelah makan berat",
      "Jangan mengandalkan kopi sebagai solusi utama",
      "Waspadai jam kritis: 02:00-05:00 dan 14:00-16:00",
      "Gunakan fitur Face Monitor untuk peringatan dini",
    ],
    category: "Safety",
    thumbnail: "",
  },
];

export const trafficData = [
  { day: "Senin", trips: 3, hours: 4.5, drowsiness: 30 },
  { day: "Selasa", trips: 2, hours: 3.0, drowsiness: 20 },
  { day: "Rabu", trips: 4, hours: 5.5, drowsiness: 45 },
  { day: "Kamis", trips: 2, hours: 2.5, drowsiness: 15 },
  { day: "Jumat", trips: 5, hours: 6.0, drowsiness: 55 },
  { day: "Sabtu", trips: 3, hours: 4.0, drowsiness: 35 },
  { day: "Minggu", trips: 1, hours: 1.5, drowsiness: 10 },
];

export const mapMarkers = [
  { id: "1", name: "Posisi Anda", type: "user" as const, lat: -1.2379, lng: 116.8529, address: "Balikpapan" },
  { id: "2", name: "Rest Area KM 50", type: "rest-area" as const, lat: -1.2250, lng: 116.8700, address: "Jl. Tol Samarinda-Balikpapan" },
  { id: "3", name: "RSUD Kanujoso", type: "hospital" as const, lat: -1.2600, lng: 116.8400, address: "Jl. Pramuka No.1, Balikpapan" },
  { id: "4", name: "SPBU Pertamina", type: "gas-station" as const, lat: -1.2500, lng: 116.8600, address: "Jl. Jenderal Sudirman, Balikpapan" },
  { id: "5", name: "Rest Area KM 25", type: "rest-area" as const, lat: -1.2150, lng: 116.8300, address: "Jl. Tol Balikpapan-Samboja" },
  { id: "6", name: "RS Siloam Balikpapan", type: "hospital" as const, lat: -1.2700, lng: 116.8350, address: "Jl. MT Haryono, Balikpapan" },
  { id: "7", name: "Rest Area Balikpapan Barat", type: "rest-area" as const, lat: -1.2650, lng: 116.8200, address: "Jl. Soekarno-Hatta, Balikpapan Barat" },
  { id: "8", name: "Rest Area Gunung Bahagia", type: "rest-area" as const, lat: -1.2100, lng: 116.8800, address: "Jl. Gunung Bahagia, Balikpapan Utara" },
  { id: "9", name: "Rest Area Lamaru", type: "rest-area" as const, lat: -1.2550, lng: 116.8900, address: "Jl. Lamaru, Balikpapan Timur" },
  { id: "10", name: "Rest Area Sepinggan", type: "rest-area" as const, lat: -1.2700, lng: 116.8700, address: "Jl. Sepinggan Raya, Balikpapan Selatan" },
  { id: "11", name: "Rest Area Prapatan", type: "rest-area" as const, lat: -1.2450, lng: 116.8450, address: "Jl. Prapatan, Balikpapan Kota" },
  { id: "12", name: "Rest Area Manggar", type: "rest-area" as const, lat: -1.2800, lng: 116.8600, address: "Jl. Manggar, Balikpapan Timur" },
  { id: "13", name: "Rest Area Karang Joang", type: "rest-area" as const, lat: -1.2050, lng: 116.8100, address: "Jl. Karang Joang, Balikpapan Utara" },
  { id: "14", name: "Rest Area Batu Ampar", type: "rest-area" as const, lat: -1.2300, lng: 116.8900, address: "Jl. Batu Ampar, Balikpapan Kota" },
  { id: "15", name: "Rest Area Klandasan", type: "rest-area" as const, lat: -1.2600, lng: 116.8550, address: "Jl. Klandasan, Balikpapan Ilir" },
  { id: "16", name: "Rest Area Damai", type: "rest-area" as const, lat: -1.2200, lng: 116.8600, address: "Jl. Damai, Balikpapan Utara" },
  { id: "17", name: "SPBU Balikpapan Baru", type: "gas-station" as const, lat: -1.2350, lng: 116.8400, address: "Jl. Balikpapan Baru, Balikpapan" },
  { id: "18", name: "RS Mitra Keluarga", type: "hospital" as const, lat: -1.2400, lng: 116.8750, address: "Jl. Letjen S. Parman, Balikpapan" },
];

export const vulnerableData = {
  heatmap: Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => ({
      hour,
      day: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][day],
      level: Math.floor(Math.random() * 100),
    }))
  ).flat(),
  peakHours: [
    { hour: "00-03", incidents: 45 },
    { hour: "03-06", incidents: 65 },
    { hour: "06-09", incidents: 20 },
    { hour: "09-12", incidents: 15 },
    { hour: "12-15", incidents: 35 },
    { hour: "15-18", incidents: 25 },
    { hour: "18-21", incidents: 40 },
    { hour: "21-00", incidents: 55 },
  ],
  weeklyStats: { totalTrips: 20, avgDrowsiness: 30, alertsReceived: 5, safeTrips: 16 },
};

export const healthData = [
  { name: "Heart Rate", value: 72, unit: "bpm", trend: "stable" as const, trendValue: "Normal", icon: "IconHeartbeat" },
  { name: "Sleep Quality", value: 78, unit: "%", trend: "up" as const, trendValue: "+5% minggu ini", icon: "IconMoon" },
  { name: "Fatigue", value: 45, unit: "%", trend: "down" as const, trendValue: "-10% minggu ini", icon: "IconBattery" },
  { name: "Stress", value: 30, unit: "%", trend: "stable" as const, trendValue: "Rendah", icon: "IconBrain" },
  { name: "Hydration", value: 65, unit: "%", trend: "down" as const, trendValue: "Perlu minum lagi", icon: "IconDroplet" },
];

export const gameScores = [
  { id: "1", name: "Andi", game: "memory" as const, score: 12, date: "2025-06-26" },
  { id: "2", name: "Budi", game: "memory" as const, score: 15, date: "2025-06-25" },
  { id: "3", name: "Citra", game: "memory" as const, score: 18, date: "2025-06-24" },
  { id: "4", name: "Dina", game: "memory" as const, score: 22, date: "2025-06-23" },
  { id: "5", name: "Eka", game: "memory" as const, score: 25, date: "2025-06-22" },
  { id: "6", name: "Andi", game: "reaction" as const, score: 180, date: "2025-06-26" },
  { id: "7", name: "Budi", game: "reaction" as const, score: 220, date: "2025-06-25" },
  { id: "8", name: "Citra", game: "reaction" as const, score: 250, date: "2025-06-24" },
  { id: "9", name: "Dina", game: "reaction" as const, score: 300, date: "2025-06-23" },
  { id: "10", name: "Eka", game: "reaction" as const, score: 350, date: "2025-06-22" },
];

export const questChallenges = [
  { id: "1", title: "Tidur Tepat Waktu", description: "Tidur sebelum jam 23:00 selama 3 hari berturut-turut", progress: 2, target: 3, status: "active" as const, reward: "50 XP", type: "daily" as const },
  { id: "2", title: "Rutin Periksa", description: "Ambil Fit-to-Drive Test setiap pagi", progress: 5, target: 7, status: "active" as const, reward: "100 XP", type: "weekly" as const },
  { id: "3", title: "Sehat Selalu", description: "Minum minimal 8 gelas air sehari", progress: 6, target: 7, status: "active" as const, reward: "75 XP", type: "weekly" as const },
  { id: "4", title: "Jago Game", description: "Selesaikan semua mini game", progress: 3, target: 3, status: "completed" as const, reward: "200 XP", type: "weekly" as const },
  { id: "5", title: "Malam Aman", description: "Tidak berkendara setelah jam 22:00", progress: 0, target: 5, status: "locked" as const, reward: "150 XP", type: "weekly" as const },
];

export const badges = [
  { id: "1", name: "First Step", description: "Selesaikan uji pertama", icon: "IconRocket", earned: true },
  { id: "2", name: "Night Owl", description: "Tidur sebelum jam 23:00", icon: "IconMoon", earned: true },
  { id: "3", name: "Game Master", description: "Menangkan semua game", icon: "IconTrophy", earned: true },
  { id: "4", name: "Health Hero", description: "Sehat selama 7 hari", icon: "IconHeartbeat", earned: false },
  { id: "5", name: "Safe Driver", description: "30 hari tanpa alert", icon: "IconShieldCheck", earned: false },
  { id: "6", name: "Early Bird", description: "Bangun sebelum jam 6", icon: "IconSun", earned: false },
];

export const microsleepFacts = [
  { id: "1", title: "Apa Itu Microsleep?", description: "Microsleep adalah kondisi tidur singkat 1-10 detik yang terjadi tanpa disadari. Otak 'mematikan' diri sejenak, sangat berbahaya saat berkendara karena bisa menyebabkan kehilangan kendali kendaraan.", category: "Science" as const, thumbnail: "" },
  { id: "2", title: "Tanda-tanda Microsleep", description: "Mata berat dan terasa ingin menutup, sulit fokus pada jalan, sering menguap, kepala terasa berat dan sering 'mengangguk', keluar dari jalur tanpa sadar.", category: "Safety" as const, thumbnail: "" },
  { id: "3", title: "Faktor Risiko Microsleep", description: "Kurang tidur (< 6 jam), berkendara larut malam (22:00-06:00), mengemudi lebih dari 2 jam tanpa istirahat, mengonsumsi obat yang menyebabkan kantuk.", category: "Science" as const, thumbnail: "" },
  { id: "4", title: "Cara Mencegah Microsleep", description: "Tidur 7-8 jam, istirahat setiap 2 jam, hindari mengemudi larut malam, minum kopi sebelum perjalanan panjang, buka jendela untuk udara segar.", category: "Tips" as const, thumbnail: "" },
  { id: "5", title: "Mitos Microsleep", description: "Mitos: 'Buka jendela bisa mencegah microsleep'. Fakta: Membuka jendela hanya membantu sedikit. Cara terbaik adalah berhenti dan tidur sejenak.", category: "Science" as const, thumbnail: "" },
  { id: "6", title: "Data Kecelakaan Microsleep", description: "20% kecelakaan lalu lintas fatal di Indonesia disebabkan oleh microsleep. Paling banyak terjadi pada jam 02:00-05:00 dan 14:00-16:00.", category: "Safety" as const, thumbnail: "" },
];
