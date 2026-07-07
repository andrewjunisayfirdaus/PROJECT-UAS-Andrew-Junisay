"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { IconArrowLeft, IconMoon, IconCheck, IconEye, IconAlertTriangle } from "@tabler/icons-react";
import Link from "next/link";

export default function NightDrivingGuidePage() {
  const risks = [
    { title: "Visibilitas Rendah", desc: "Pandangan terbatas hanya pada area lampu kendaraan", icon: "👁️" },
    { title: "Kelelahan Lebih Cepat", desc: "Mata bekerja lebih keras sehingga cepat lelah", icon: "😴" },
    { title: "Risiko Microsleep", desc: "Tubuh cenderung mengantuk di malam hari", icon: "⚠️" },
    { title: "Hewan Liar", desc: "Risiko bertemu hewan yang menyeberang jalan", icon: "🦌" },
  ];

  const tips = [
    { title: "Gunakan Lampu Jarak Jauh", desc: "Nyalakan saat jalan kosong, matikan saat ada kendaraan berlawanan arah", priority: "high" },
    { title: "Pastikan Lampu Berfungsi", desc: "Periksa lampu utama, rem, dan sein sebelum berangkat", priority: "high" },
    { title: "Kurangi Kecepatan", desc: "Visibilitas rendah membutuhkan waktu reaksi lebih lama", priority: "high" },
    { title: "Jangan Mengejar Lampu", desc: "Jangan menatap lampu kendaraan lawan arah secara langsung", priority: "medium" },
    { title: "Gunakan Kaca Spion", desc: "Atur kaca spion anti-silau untuk mengurangi silau dari belakang", priority: "medium" },
    { title: "Istirahat Sebelum Lelah", desc: "Jangan menunggu sampai sangat mengantuk untuk berhenti", priority: "high" },
    { title: "Hindari Jam Kritis", desc: "Jangan mengemudi antara jam 02:00-05:00", priority: "high" },
    { title: "Siapkan Hiburan", desc: "Musik atau podcast可以帮助tetap terjaga (tapi tetap fokus)", priority: "low" },
  ];

  const checklist = [
    "Lampu utama berfungsi dengan baik",
    "Lampu rem berfungsi dengan baik",
    "Lampu sein berfungsi dengan baik",
    "Kaca spion terpasang dan teratur",
    "Kaca depan bersih dari noda",
    "Wiper dalam kondisi baik",
    "Sabuk pengaman terpasang",
    "Tangki bahan bakar terisi penuh",
  ];

  return (
    <div>
      <PageHeader
        title="Tips Berkendara Malam"
        description="Panduan lengkap berkendara aman di malam hari"
        breadcrumbs={[
          { label: "Profile", href: "/profile" },
          { label: "Guide & Tips", href: "/profile/guide" },
          { label: "Night Driving" },
        ]}
      />

      <Link href="/profile/guide">
        <Button variant="ghost" size="sm" className="mb-6">
          <IconArrowLeft size={16} className="mr-2" />
          Kembali ke Guide
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconMoon size={20} className="text-indigo-500" />
              Risiko Berkendara Malam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {risks.map((risk, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-2xl">{risk.icon}</span>
                  <div>
                    <p className="font-medium">{risk.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{risk.desc}</p>
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
              Tips Berkendara Malam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Badge variant={tip.priority === "high" ? "destructive" : tip.priority === "medium" ? "default" : "secondary"} className="mt-0.5 shrink-0">
                    {tip.priority === "high" ? "!" : tip.priority === "medium" ? "•" : "○"}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{tip.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconEye size={20} className="text-blue-500" />
              Tips Penglihatan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="font-medium text-sm mb-2">Jangan Menatap Lampu Lawan Arah</p>
              <p className="text-xs text-muted-foreground">
                Fokuskan pandangan ke tepi jalan untuk menghindari silau. Gunakan garis jalan sebagai panduan.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="font-medium text-sm mb-2">Atur Kaca Spion Anti-Silau</p>
              <p className="text-xs text-muted-foreground">
                Geser kaca spion tengah ke posisi anti-silau untuk mengurangi cahaya dari kendaraan di belakang.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="font-medium text-sm mb-2">Bersihkan Kaca Depan</p>
              <p className="text-xs text-muted-foreground">
                Kotoran pada kaca depan memantulkan cahaya dan menyebabkan silau. Bersihkan sebelum berangkat.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconAlertTriangle size={20} className="text-yellow-500" />
              Checklist Sebelum Berkendara Malam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {checklist.map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-5 h-5 rounded border-2 border-primary/50 flex items-center justify-center">
                    <IconCheck size={12} className="text-primary opacity-0 group-hover:opacity-100" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
