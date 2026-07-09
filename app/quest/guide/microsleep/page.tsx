"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { IconArrowLeft, IconAlertTriangle, IconCheck, IconClock, IconBulb } from "@tabler/icons-react";
import Link from "next/link";

export default function MicrosleepGuidePage() {
  const causes = [
    "Kurang tidur (< 6 jam per hari)",
    "Berkendara larut malam (22:00 - 06:00)",
    "Mengemudi lebih dari 2 jam tanpa istirahat",
    "Mengonsumsi obat yang menyebabkan kantuk",
    "Makan terlalu banyak sebelum berkendara",
    "Ruangan kendaraan terlalu hangat dan nyaman",
  ];

  const preventionTips = [
    { title: "Tidur Cukup", desc: "Pastikan tidur 7-8 jam sebelum berkendara jarak jauh" },
    { title: "Istirahat Teratur", desc: "Berhenti dan regangkan tubuh setiap 2 jam" },
    { title: "Hindari Jam Kritis", desc: "Jangan mengemudi antara jam 02:00-05:00 dan 14:00-16:00" },
    { title: "Minum Kopi", desc: "Konsumsi kopi 30 menit sebelum perjalanan panjang" },
    { title: "Buka Jendela", desc: "Udara segar membantu menjaga kewaspadaan" },
    { title: "Gunakan Teknologi", desc: "Aktifkan Face Monitor untuk peringatan dini" },
  ];

  const warningSigns = [
    "Mata terasa berat dan ingin menutup",
    "Sulit fokus pada jalan",
    "Sering menguap",
    "Kepala terasa berat dan sering 'mengangguk'",
    "Keluar dari jalur tanpa sadar",
    "Lupa melewati jalan atau belokan",
  ];

  return (
    <div>
      <PageHeader
        title="Cara Menghindari Microsleep"
        description="Pelajari penyebab dan cara mencegah microsleep saat berkendara"
        breadcrumbs={[
          { label: "Quest", href: "/quest" },
          { label: "Guide & Tips", href: "/quest/guide" },
          { label: "Microsleep" },
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
              <IconAlertTriangle size={20} className="text-yellow-500" />
              Apa Itu Microsleep?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Microsleep adalah kondisi di mana otak <strong>&apos;mematikan&apos;</strong> diri sejenak selama beberapa detik hingga puluhan detik tanpa disadari. Kondisi ini sangat berbahaya saat berkendara karena Anda bisa kehilangan kendali kendaraan.
            </p>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-500">
                ⚠️ 20% kecelakaan fatal di Indonesia disebabkan oleh microsleep
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Paling banyak terjadi pada jam <strong>02:00-05:00</strong> dan <strong>14:00-16:00</strong>.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconAlertTriangle size={20} className="text-orange-500" />
              Penyebab Microsleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {causes.map((cause, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Badge variant="destructive" className="mt-0.5 shrink-0">{index + 1}</Badge>
                  <span className="text-sm">{cause}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBulb size={20} className="text-yellow-500" />
              Tanda-Tanda Microsleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {warningSigns.map((sign, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <IconAlertTriangle size={16} className="text-orange-500 shrink-0" />
                  <span className="text-sm">{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCheck size={20} className="text-green-500" />
              Cara Mencegah Microsleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preventionTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <IconCheck size={18} className="text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{tip.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconClock size={20} className="text-blue-500" />
            Pertolongan Pertama saat Microsleep
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 text-center">
              <p className="text-2xl font-bold text-blue-500">1</p>
              <p className="font-medium mt-2">Berhenti Segera</p>
              <p className="text-xs text-muted-foreground mt-1">Cari tempat aman untuk berhenti</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 text-center">
              <p className="text-2xl font-bold text-blue-500">2</p>
              <p className="font-medium mt-2">Tidur 15-20 Menit</p>
              <p className="text-xs text-muted-foreground mt-1">Power nap memulihkan kewaspadaan</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 text-center">
              <p className="text-2xl font-bold text-blue-500">3</p>
              <p className="font-medium mt-2">Minum Kopi</p>
              <p className="text-xs text-muted-foreground mt-1">Kafein butuh 30 menit untuk bereaksi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
