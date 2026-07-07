"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { IconArrowLeft, IconAlertTriangle, IconCheck, IconBrain, IconClock } from "@tabler/icons-react";
import Link from "next/link";

export default function DrowsyDrivingGuidePage() {
  const stats = [
    { value: "20%", label: "Kecelakaan fatal disebabkan mengantuk", color: "red" },
    { value: "3-4x", label: "Risiko kecelakaan lebih tinggi", color: "orange" },
    { value: "20 detik", label: "Waktu tidur microsleep rata-rata", color: "yellow" },
    { value: "80%", label: "Pengemudi pernah merasa mengantuk", color: "blue" },
  ];

  const warningSigns = [
    { level: "awal", signs: ["Mata terasa lelah", "Sering menguap", "Sulit mempertahankan fokus"] },
    { level: "sedang", signs: ["Mata mulai berat", "Kepala sering mengangguk", "Lupa detail perjalanan"] },
    { level: "kritis", signs: ["Mata ingin menutup", "Keluar dari jalur", "Tidak ingat beberapa detik terakhir"] },
  ];

  const solutions = [
    { title: "Berhenti dan Tidur", desc: "Tidur 15-20 menit是最有效的恢复方式", time: "20 menit", priority: "urgent" },
    { title: "Minum Kopi", desc: "Kafein butuh 30 menit untuk bereaksi. Minum 1-2 cangkir.", time: "30 menit", priority: "medium" },
    { title: "Ganti Pengemudi", desc: "Jika bepergian dengan orang lain, ganti pengemudi yang segar.", time: "segera", priority: "urgent" },
    { title: "Cari Udara Segar", desc: "Buka jendela atau keluar kendaraan sebentar.", time: "5 menit", priority: "low" },
    { title: "Cuci Muka", desc: "Basuh muka dengan air dingin untuk menyegarkan diri.", time: "2 menit", priority: "low" },
    { title: "Dengarkan Musik", desc: "Putar musik ceria atau podcast menarik.", time: "segera", priority: "low" },
  ];

  const criticalHours = [
    { time: "02:00 - 05:00", risk: "Sangat Tinggi", desc: "Tubuh dalam fase tidur paling dalam" },
    { time: "14:00 - 16:00", risk: "Tinggi", desc: "Post-lunch dip, tubuh ingin istirahat" },
    { time: "22:00 - 00:00", risk: "Sedang", desc: "Mulai memasuki jam kantuk" },
  ];

  const preventionSteps = [
    "Tidur 7-8 jam sebelum berkendara jarak jauh",
    "Istirahat setiap 2 jam atau 150 km",
    "Hindari mengemudi setelah makan berat",
    "Jangan mengandalkan kopi sebagai solusi utama",
    "Gunakan fitur Face Monitor untuk peringatan dini",
    "Siapkan alternatif transportasi jika lelah",
    "Rencanakan perjalanan dengan jadwal istirahat",
  ];

  return (
    <div>
      <PageHeader
        title="Bahaya Mengemudi Saat Mengantuk"
        description="Kenali tanda-tanda dan cara mengatasi kantuk saat berkendara"
        breadcrumbs={[
          { label: "Profile", href: "/profile" },
          { label: "Guide & Tips", href: "/profile/guide" },
          { label: "Drowsy Driving" },
        ]}
      />

      <Link href="/profile/guide">
        <Button variant="ghost" size="sm" className="mb-6">
          <IconArrowLeft size={16} className="mr-2" />
          Kembali ke Guide
        </Button>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${
                stat.color === "red" ? "text-red-500" :
                stat.color === "orange" ? "text-orange-500" :
                stat.color === "yellow" ? "text-yellow-500" :
                "text-blue-500"
              }`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconAlertTriangle size={20} className="text-red-500" />
              Tanda-Tanda Mengantuk
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {warningSigns.map((level, index) => (
              <div key={index} className={`p-4 rounded-xl ${
                level.level === "awal" ? "bg-yellow-500/10 border border-yellow-500/20" :
                level.level === "sedang" ? "bg-orange-500/10 border border-orange-500/20" :
                "bg-red-500/10 border border-red-500/20"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold capitalize">{level.level}</p>
                  <Badge variant={level.level === "kritis" ? "destructive" : "default"}>
                    {level.level === "awal" ? "Perhatian" : level.level === "sedang" ? "Waspada" : "Bahaya"}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {level.signs.map((sign, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <IconAlertTriangle size={12} className={
                        level.level === "kritis" ? "text-red-500" : "text-current"
                      } />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCheck size={20} className="text-green-500" />
              Solusi saat Mengantuk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Badge variant={solution.priority === "urgent" ? "destructive" : solution.priority === "medium" ? "default" : "secondary"} className="mt-0.5 shrink-0">
                    {solution.priority === "urgent" ? "!" : "•"}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{solution.title}</p>
                      <Badge variant="outline" className="text-xs">{solution.time}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{solution.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconClock size={20} className="text-purple-500" />
              Jam Kritis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalHours.map((hour, index) => (
                <div key={index} className={`p-4 rounded-xl ${
                  hour.risk === "Sangat Tinggi" ? "bg-red-500/10 border border-red-500/20" :
                  hour.risk === "Tinggi" ? "bg-orange-500/10 border border-orange-500/20" :
                  "bg-yellow-500/10 border border-yellow-500/20"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">{hour.time}</p>
                    <Badge variant={hour.risk === "Sangat Tinggi" ? "destructive" : "default"}>
                      {hour.risk}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{hour.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-sm font-medium">Data Kecelakaan:</p>
              <p className="text-xs text-muted-foreground mt-1">
                Puncak kecelakaan akibat microsleep terjadi pada <strong>02:00-05:00</strong> (45% kasus) dan <strong>14:00-16:00</strong> (25% kasus).
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBrain size={20} className="text-blue-500" />
              Pencegahan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {preventionSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <IconCheck size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
