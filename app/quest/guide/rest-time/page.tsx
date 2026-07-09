"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { IconArrowLeft, IconClock, IconCheck, IconCoffee, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";

export default function RestTimeGuidePage() {
  const restSchedule = [
    { time: "0-2 jam", action: "Mulai perjalanan", status: "active" },
    { time: "2 jam", action: "Istirahat pertama (15 menit)", status: "warning" },
    { time: "4 jam", action: "Istirahat kedua (20 menit)", status: "warning" },
    { time: "6 jam", action: "Istirahat makan (30 menit)", status: "critical" },
    { time: "8 jam", action: "Istirahat panjang atau akhiri perjalanan", status: "critical" },
  ];

  const restActivities = [
    { title: "Regangkan Tubuh", desc: "Berdiri dan regangkan kaki, tangan, serta punggung", icon: "🧍", time: "5 menit" },
    { title: "Minum Air", desc: "Minum minimal 500ml air putih untuk menghidrasi tubuh", icon: "💧", time: "2 menit" },
    { title: "Jalan Sebentar", desc: "Berjalan-jalan di sekitar area istirahat", icon: "🚶", time: "5 menit" },
    { title: "Lihat Pemandangan", desc: "Alihkan pandangan dari jalan untuk mengistirahatkan mata", icon: "👁️", time: "3 menit" },
  ];

  const bestTimes = [
    { time: "10:00 - 14:00", desc: "Waktu ideal untuk istirahat makan siang", level: "best" },
    { time: "16:00 - 18:00", desc: "Waktu istirahat sore yang baik", level: "good" },
    { time: "06:00 - 08:00", desc: "Istirahat setelah perjalanan pagi", level: "good" },
    { time: "02:00 - 05:00", desc: "HINDARI berkendara di jam ini", level: "danger" },
  ];

  const restAreas = [
    "Rest Area KM 25 - Jl. Tol Balikpapan-Samboja",
    "Rest Area KM 50 - Jl. Tol Samarinda-Balikpapan",
    "SPBU Pertamina - Jl. Jenderal Sudirman",
    "Rumah Makan di pinggir jalan utama",
  ];

  return (
    <div>
      <PageHeader
        title="Waktu Istirahat Ideal"
        description="Panduan waktu istirahat untuk perjalanan jarak jauh"
        breadcrumbs={[
          { label: "Quest", href: "/quest" },
          { label: "Guide & Tips", href: "/quest/guide" },
          { label: "Rest Time" },
        ]}
      />

      <Link href="/quest/guide">
        <Button variant="ghost" size="sm" className="mb-6">
          <IconArrowLeft size={16} className="mr-2" />
          Kembali ke Guide
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconClock size={20} className="text-blue-500" />
              Jadwal Istirahat Ideal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-20 text-center p-2 rounded-lg ${
                    schedule.status === "active" ? "bg-green-500/20 text-green-500" :
                    schedule.status === "warning" ? "bg-yellow-500/20 text-yellow-500" :
                    "bg-red-500/20 text-red-500"
                  }`}>
                    <p className="text-sm font-bold">{schedule.time}</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">{schedule.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCoffee size={20} className="text-amber-500" />
              Aktivitas Saat Istirahat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {restActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.title}</p>
                      <Badge variant="secondary">{activity.time}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCheck size={20} className="text-green-500" />
              Waktu Terbaik & Terburuk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bestTimes.map((time, index) => (
                <div key={index} className={`p-4 rounded-xl ${
                  time.level === "best" ? "bg-green-500/10 border border-green-500/20" :
                  time.level === "good" ? "bg-blue-500/10 border border-blue-500/20" :
                  "bg-red-500/10 border border-red-500/20"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">{time.time}</p>
                    <Badge variant={time.level === "best" ? "default" : time.level === "good" ? "secondary" : "destructive"}>
                      {time.level === "best" ? "Terbaik" : time.level === "good" ? "Bagus" : "Hindari"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{time.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconMapPin size={20} className="text-purple-500" />
              Tempat Istirahat Terdekat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {restAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <IconMapPin size={16} className="text-purple-500 shrink-0" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-sm font-medium mb-2">Tips Memilih Tempat Istirahat:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Pilih tempat yang aman dan terang</li>
                <li>• Pastikan ada toilet dan tempat makan</li>
                <li>• Parkir di tempat yang luas</li>
                <li>• Hindari berhenti di bahu jalan</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
